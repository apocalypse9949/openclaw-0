## Sentinel Journal

## 2025-05-02 - Fixed Command Injection Vulnerability in CLI Credentials
**Vulnerability:** `readCodexKeychainAuthRecord` and `readClaudeCliKeychainCredentials` use `execSyncImpl` to execute `security find-generic-password`, but constructed the arguments using template strings allowing command injection vulnerabilities.
**Learning:** `execSync` executes through a shell and parses arguments using shell semantics, which makes it inherently vulnerable to command injection when variables are interpolated.
**Prevention:** Use `execFileSyncImpl` with an array of arguments to bypass the shell, passing the arguments safely to the executable.
