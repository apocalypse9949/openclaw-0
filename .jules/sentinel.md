## 2024-05-18 - [Command Injection via execSync in cli-credentials]
**Vulnerability:** Command injection vulnerability in `readCodexKeychainAuthRecord` and `readClaudeCliKeychainCredentials` where untrusted environment variables or internal state strings could potentially evaluate shell commands within `execSync`.
**Learning:** `execSync` executes commands in a shell, allowing string interpolation vulnerabilities. This existed because the migration from `execSync` to safer array-based `execFileSync` was incomplete in the CLI credentials module.
**Prevention:** Always use `execFileSync`, `execFile`, or `spawn` instead of `exec` or `execSync` when executing processes with dynamically constructed arguments. Pass arguments as an array to avoid shell evaluation entirely.
