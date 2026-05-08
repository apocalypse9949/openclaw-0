## 2024-05-24 - [CRITICAL] Prevent Command Injection in Keychain Reads

**Vulnerability:** The macOS `security` utility was being executed using `execSync` with string interpolation for command arguments. This pattern is vulnerable to command injection if an attacker can manipulate variables like `account` or `CLAUDE_CLI_KEYCHAIN_SERVICE` to include shell metacharacters.
**Learning:** Even seemingly static or internally derived values used in string-interpolated shell commands can pose a risk. `execSync` evaluates the entire string using a shell by default, allowing backticks or `$()` to execute arbitrary code.
**Prevention:** Always use `execFileSync` (or `execFile`/`spawn`) and pass arguments as an array instead of a single formatted string. This ensures that the arguments are passed directly to the executable without shell interpretation, neutralizing shell injection vulnerabilities.
