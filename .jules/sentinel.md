## 2025-02-26 - Command Injection via execSync
**Vulnerability:** Use of `execSync` instead of `execFileSync` in `readClaudeCliKeychainCredentials` and `readCodexKeychainAuthRecord` allowed for command injection via unsanitized arguments.
**Learning:** Shell evaluation via `execSync` is a common pitfall when running macOS `security` utilities since arguments are formatted as a single command string.
**Prevention:** Always use `execFileSync` with array arguments to prevent shell interpolation, especially when dealing with external processes.
