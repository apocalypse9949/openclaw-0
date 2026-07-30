## 2026-07-30 - SQLite PRAGMA SQL Injection

**Vulnerability:** SQL injection when querying SQLite PRAGMA information dynamically via string interpolation (e.g., `PRAGMA table_info(${tableName})`).
**Learning:** PRAGMA statements do not natively support direct parameter binding. When dynamic schema queries are needed based on user input or state variables, relying on string concatenation or even simple identifier quoting mechanisms can be dangerous or error-prone.
**Prevention:** Use parameterized table-valued functions (e.g., `SELECT * FROM pragma_table_info(?)` or `SELECT * FROM pragma_index_list(?)`) instead of direct PRAGMA string interpolation. This securely handles parameter binding without manual identifier quoting.
