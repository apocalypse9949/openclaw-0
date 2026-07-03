## 2024-05-24 - [CRITICAL] Fix command injection in macOS keychain utility calls
**Vulnerability:** Command injection when invoking macOS `security` utility using `execSync` with unsanitized arguments.
**Learning:** `execSync` is vulnerable to shell metacharacters and `execFileSync` should be used with an argument array for shell execution safety, particularly for credential management.
**Prevention:** Use `execFileSync` passing an array of arguments rather than interpolating strings for system commands, especially when involving user input or credentials.
