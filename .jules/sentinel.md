## 2024-05-16 - Command Injection via execSync with Keychain Access

**Vulnerability:** Found `execSync` being used to query the macOS keychain (`security find-generic-password`) with shell string interpolation for account names and service strings in `src/agents/cli-credentials.ts`. Even if partial variables are controlled or hashed, `execSync` is inherently vulnerable to shell interpretation rules (e.g. `$()`, backticks) and shouldn't be used for CLI credential processes.
**Learning:** Shell string interpolation via `execSync` must be avoided altogether when invoking utilities like macOS `security`. It's safer to always use `execFileSync` passing arguments as an array, eliminating shell interpretation risk, matching the existing robust implementation for `writeClaudeCliKeychainCredentials`.
**Prevention:** Replace all `execSync` calls with `execFileSync` passing arrays for arguments when invoking command line utilities like `security`.
