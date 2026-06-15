## 2024-05-18 - SQL Injection via PRAGMA statements
**Vulnerability:** Constructing `PRAGMA table_info(...)` or `PRAGMA index_list(...)` queries via string interpolation with dynamic table names introduces SQL injection risks.
**Learning:** SQLite's `PRAGMA` statements do not support standard parameter binding (`?`), which leads to developers relying on unsafe string interpolation.
**Prevention:** Use SQLite's table-valued functions (e.g., `SELECT * FROM pragma_table_info(?)` or `SELECT * FROM pragma_index_list(?)`) to securely pass schema identifiers as bound parameters.
