
## 2023-10-27 - Command Injection via execSync with Keychain Access
**Vulnerability:** The use of `execSync` with string interpolation for system commands (specifically `security` utility for macOS keychain) created a risk for command injection. A crafted account string could potentially execute arbitrary commands.
**Learning:** Security utilities and other shell commands should always use argument arrays and `execFileSync` to avoid shell interpretation and expansion vulnerabilities, especially when dealing with user-controlled or dynamically generated input.
**Prevention:** Standardize on `execFileSync` or `spawnSync` instead of `execSync` for shell command execution. Add linting rules to prevent `execSync` usage with string concatenation.
