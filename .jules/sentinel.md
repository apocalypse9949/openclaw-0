## 2024-05-24 - Command Injection in Credential Management

**Vulnerability:** `execSync` was used with string concatenation (e.g., `security find-generic-password -s "Codex Auth" -a "${account}" -w`) to retrieve credentials from the macOS keychain. If the `account` variable or the target command string contains shell characters, it can result in command injection.
**Learning:** Using `execSync` is fundamentally insecure when variables are interpolated, as it executes the command in a shell.
**Prevention:** Always use `execFileSync` or `spawn` with an array of arguments, preventing the shell from interpreting the parameters.
