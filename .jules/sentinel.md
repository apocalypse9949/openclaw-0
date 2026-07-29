## 2024-05-31 - Fix SQL injection in SQLite PRAGMA queries

**Vulnerability:** String interpolation used in `PRAGMA table_info(...)` and `PRAGMA index_list(...)` across `src/infra/state-migrations.ts`, `src/state/openclaw-state-db.ts`, and `src/state/sqlite-schema-shape.test-support.ts` was vulnerable to SQL injection because `PRAGMA` statements do not support standard parameter binding, prompting authors to use string concatenation.
**Learning:** SQLite supports querying PRAGMAs securely via parameterized table-valued functions (e.g., `SELECT * FROM pragma_table_info(?)`), eliminating the need for string concatenation, external quoting utilities, or SQL injection risks.
**Prevention:** Always use table-valued function equivalents of PRAGMAs (e.g., `pragma_table_info`, `pragma_index_list`, `pragma_foreign_key_list`) with standard parameterized binding `(?)` when a variable is required, rather than string interpolation with raw `PRAGMA ...(...)`.
