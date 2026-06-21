import type { DatabaseSync } from "node:sqlite";
import { formatErrorMessage } from "./error-utils.js";

function isQuoted(s: string): boolean {
  if (s.length < 2) {
    return false;
  }
  const first = s[0];
  const last = s[s.length - 1];
  if (first === '"' && last === '"') {
    return !s.slice(1, s.length - 1).replace(/""/g, "").includes('"');
  }
  if (first === "`" && last === "`") {
    return !s.slice(1, s.length - 1).includes("`");
  }
  if (first === "[" && last === "]") {
    return !s.slice(1, s.length - 1).includes("]");
  }
  return false;
}

function quoteIdentifier(identifier: string): string {
  if (isQuoted(identifier)) {
    return identifier;
  }
  return `"${identifier.replace(/"/g, '""')}"`;
}

function splitIdentifiers(s: string): string[] {
  const parts = [];
  let current = "";
  let inQuotes = false;
  let quoteChar = "";

  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (!inQuotes) {
      if (c === '"' || c === "`" || c === "[") {
        inQuotes = true;
        quoteChar = c === "[" ? "]" : c;
        current += c;
      } else if (c === ".") {
        parts.push(current);
        current = "";
      } else {
        current += c;
      }
    } else {
      current += c;
      if (c === quoteChar) {
        if (quoteChar === '"' && i + 1 < s.length && s[i + 1] === '"') {
          current += s[i + 1];
          i++;
        } else {
          inQuotes = false;
        }
      }
    }
  }
  parts.push(current);
  return parts;
}

function quoteTable(table: string): string {
  return splitIdentifiers(table)
    .map((part) => quoteIdentifier(part))
    .join(".");
}

export function ensureMemoryIndexSchema(params: {
  db: DatabaseSync;
  embeddingCacheTable: string;
  cacheEnabled: boolean;
  ftsTable: string;
  ftsEnabled: boolean;
  ftsTokenizer?: "unicode61" | "trigram";
}): { ftsAvailable: boolean; ftsError?: string } {
  params.db.exec(`
    CREATE TABLE IF NOT EXISTS meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);
  params.db.exec(`
    CREATE TABLE IF NOT EXISTS files (
      path TEXT PRIMARY KEY,
      source TEXT NOT NULL DEFAULT 'memory',
      hash TEXT NOT NULL,
      mtime INTEGER NOT NULL,
      size INTEGER NOT NULL
    );
  `);
  params.db.exec(`
    CREATE TABLE IF NOT EXISTS chunks (
      id TEXT PRIMARY KEY,
      path TEXT NOT NULL,
      source TEXT NOT NULL DEFAULT 'memory',
      start_line INTEGER NOT NULL,
      end_line INTEGER NOT NULL,
      hash TEXT NOT NULL,
      model TEXT NOT NULL,
      text TEXT NOT NULL,
      embedding TEXT NOT NULL,
      updated_at INTEGER NOT NULL
    );
  `);
  if (params.cacheEnabled) {
    const quotedCacheTable = quoteTable(params.embeddingCacheTable);
    params.db.exec(`
      CREATE TABLE IF NOT EXISTS ${quotedCacheTable} (
        provider TEXT NOT NULL,
        model TEXT NOT NULL,
        provider_key TEXT NOT NULL,
        hash TEXT NOT NULL,
        embedding TEXT NOT NULL,
        dims INTEGER,
        updated_at INTEGER NOT NULL,
        PRIMARY KEY (provider, model, provider_key, hash)
      );
    `);
    params.db.exec(
      `CREATE INDEX IF NOT EXISTS idx_embedding_cache_updated_at ON ${quotedCacheTable}(updated_at);`,
    );
  }

  let ftsAvailable = false;
  let ftsError: string | undefined;
  if (params.ftsEnabled) {
    try {
      const tokenizer = params.ftsTokenizer ?? "unicode61";
      const tokenizeClause = tokenizer === "trigram" ? `, tokenize='trigram case_sensitive 0'` : "";
      const quotedFtsTable = quoteTable(params.ftsTable);
      params.db.exec(
        `CREATE VIRTUAL TABLE IF NOT EXISTS ${quotedFtsTable} USING fts5(\n` +
          `  text,\n` +
          `  id UNINDEXED,\n` +
          `  path UNINDEXED,\n` +
          `  source UNINDEXED,\n` +
          `  model UNINDEXED,\n` +
          `  start_line UNINDEXED,\n` +
          `  end_line UNINDEXED\n` +
          `${tokenizeClause});`,
      );
      ftsAvailable = true;
    } catch (err) {
      const message = formatErrorMessage(err);
      ftsAvailable = false;
      ftsError = message;
    }
  }

  ensureColumn(params.db, "files", "source", "TEXT NOT NULL DEFAULT 'memory'");
  ensureColumn(params.db, "chunks", "source", "TEXT NOT NULL DEFAULT 'memory'");
  params.db.exec(`CREATE INDEX IF NOT EXISTS idx_chunks_path ON chunks(path);`);
  params.db.exec(`CREATE INDEX IF NOT EXISTS idx_chunks_source ON chunks(source);`);

  return { ftsAvailable, ...(ftsError ? { ftsError } : {}) };
}

function ensureColumn(
  db: DatabaseSync,
  table: "files" | "chunks",
  column: string,
  definition: string,
): void {
  const parts = splitIdentifiers(table);
  const quotedTable = parts.map(quoteIdentifier).join(".");
  const tableName = parts[parts.length - 1];
  const schemaPrefix =
    parts.length > 1
      ? parts
          .slice(0, parts.length - 1)
          .map(quoteIdentifier)
          .join(".") + "."
      : "";

  const rows = db
    .prepare(`PRAGMA ${schemaPrefix}table_info(${quoteIdentifier(tableName)})`)
    .all() as Array<{ name: string }>;
  if (rows.some((row) => row.name === column)) {
    return;
  }
  const quotedColumn = quoteIdentifier(column);
  db.exec(`ALTER TABLE ${quotedTable} ADD COLUMN ${quotedColumn} ${definition}`);
}
