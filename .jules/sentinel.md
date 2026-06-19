## 2024-05-24 - [CRITICAL] SQLite PRAGMA statement injection

**Vulnerability:** SQL Injection in SQLite `PRAGMA table_info` and `PRAGMA index_list`. Dynamic tables and indices were using string interpolation in statements rather than parameterized queries, potentially exposing system state or causing bypasses.
**Learning:** `PRAGMA table_info` does not support parameter binding natively. Instead, the SQLite table-valued functions must be used, e.g., `SELECT * FROM pragma_table_info(?)`.
**Prevention:** Use `SELECT * FROM pragma_table_info(?)` or `SELECT * FROM pragma_index_list(?)` to enforce parameter binding when building SQLite PRAGMA calls with variables dynamically.
