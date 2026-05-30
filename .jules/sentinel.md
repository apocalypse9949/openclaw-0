## 2025-02-14 - Fix SQL injection in memory index schema

**Vulnerability:** SQL injection vulnerability in `ensureMemoryIndexSchema` (`packages/memory-host-sdk/src/host/memory-schema.ts`) due to direct string interpolation of table names (`params.embeddingCacheTable` and `params.ftsTable`) into SQLite `db.exec()` queries without sanitization.
**Learning:** Even when dealing with schema components like table names that cannot be parameterized via prepared statements, direct string interpolation is unsafe if the name comes from an external or potentially untrusted source.
**Prevention:** Always sanitize or properly quote identifiers (e.g., table or column names) before interpolating them into SQL queries. For SQLite schema-qualified names, each part must be split by `.` and double-quoted, with internal double-quotes doubled up (e.g., `"schema"."table"`).
