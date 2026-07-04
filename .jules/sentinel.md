
## 2024-05-30 - [SQL Injection via PRAGMA Statement Interpolation]
**Vulnerability:** SQL Injection in SQLite when constructing `PRAGMA table_info(...)` or `PRAGMA index_list(...)` using unparameterized string interpolation. Even if attempting to manually quote identifiers, the raw parameter syntax is much safer and simpler.
**Learning:** `PRAGMA` statements in SQLite do not directly support parameter binding (e.g., `PRAGMA table_info(?)`), leading developers to use string interpolation. This creates a critical SQL injection risk.
**Prevention:** Use SQLite's table-valued functions for pragmas which fully support parameter binding natively. Instead of `PRAGMA table_info(${table})`, use `SELECT * FROM pragma_table_info(?)`. This completely eliminates the SQL injection vector and simplifies the code by removing the need for manual identifier quoting logic.
