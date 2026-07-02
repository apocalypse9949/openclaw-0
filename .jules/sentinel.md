
## 2024-05-18 - [CRITICAL] Fix command injection in credential store
**Vulnerability:** \`cli-credentials.ts\` used \`execSync\` to run shell commands to interact with macOS Keychain. Although variables were mostly controlled by the application, any manipulation of the shell string formatting (e.g. backtick expansion \`$()\` in token values stored by \`writeClaudeCliKeychainCredentials\`) could result in command injection due to shell execution properties of \`execSync\`.
**Learning:** Shell strings executed via \`execSync\` (which uses \`/bin/sh\`) are inherently vulnerable to command injection if any argument contains untrusted or improperly sanitized shell meta-characters.
**Prevention:** Use \`execFileSync\` (or \`spawn\`/\`execFile\`) which accepts arguments as an array instead of a single string. This bypasses the shell completely, ensuring arguments are passed safely without risk of shell interpolation.
