## 2024-05-24 - Parameterized PRAGMA Statements in SQLite
**Vulnerability:** SQL Injection via PRAGMA string interpolation
**Learning:** PRAGMA statements in SQLite do not support parameter binding (e.g. `PRAGMA table_info(?)` throws a syntax error). As a result, code often interpolates the table name directly (e.g. `` `PRAGMA table_info(${tableName})` ``), creating a SQL injection risk if the table name is maliciously crafted.
**Prevention:** Use SQLite table-valued PRAGMA functions instead, which do support parameters. Replace `PRAGMA table_info(${table})` with `SELECT * FROM pragma_table_info(?)` and pass the table name safely via the driver's parameter mechanisms.
