## 2024-05-18 - [Fix Command Injection in CLI Credentials]
**Vulnerability:** Command injection vulnerability in `readCodexKeychainAuthRecord` and `readClaudeCliKeychainCredentials` via `execSync` combined with string interpolation of unescaped variables like `account`.
**Learning:** Shell evaluation (e.g. `$()`) can occur when using `exec` or `execSync` with strings, even when basic escaping is assumed.
**Prevention:** Use `execFileSync` or `execFile` with an array of arguments to bypass the shell entirely, which natively prevents parameter expansion and command injection.
