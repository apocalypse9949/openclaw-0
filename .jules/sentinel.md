## 2026-06-20 - [Command Injection via execSync in Security Tools]
**Vulnerability:** Found uses of `execSync` running the `security` macOS CLI tool with string interpolation of variables like `account` and `codexHome` (`readCodexKeychainAuthRecord` and `readClaudeCliKeychainCredentials`). This pattern introduces a significant command injection risk.
**Learning:** Even internal security-focused scripts interacting with OS keychains can be vulnerable to command injection if input parameters are improperly sanitized and interpolated into shell strings via `execSync`.
**Prevention:** Always use `execFileSync` or similar methods that accept arguments as an array instead of a single formatted string, completely bypassing shell evaluation to safely execute binaries.
