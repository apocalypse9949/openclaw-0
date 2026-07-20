## 2024-05-27 - SQL Injection in PRAGMA SQLite Queries
**Vulnerability:** Parameterized identifiers for `PRAGMA table_info` and `PRAGMA index_list` via template literals pose an SQL injection risk, as `PRAGMA` statements do not support dynamic parameters.
**Learning:** Node.js SQLite (`node:sqlite`) provides a table-valued function interface `SELECT * FROM pragma_table_info(?)` which allows secure binding for parameters.
**Prevention:** Always use parameterized queries (`SELECT * FROM pragma_*`) to fetch pragma data securely in SQLite instead of string interpolation.
