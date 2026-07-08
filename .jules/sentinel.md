## 2025-02-18 - Fix Command Injection in CLI Credentials

**Vulnerability:** `src/agents/cli-credentials.ts` used `execSync` with shell string concatenation to call the macOS `security` CLI tool to read keychain credentials, allowing potential command injection.
**Learning:** Shell evaluation (e.g., via backticks or ``within template literals) happens when using`execSync`, even for variables like account hashes, making it inherently risky when calling shell binaries.
**Prevention:** Always use `execFileSync`or`spawnSync` with an array of arguments to directly call executables, avoiding shell parsing completely.
