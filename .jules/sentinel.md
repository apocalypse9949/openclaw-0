## 2025-02-21 - Fix Command Injection in CLI Credentials MacOS Keychain access
**Vulnerability:** Command Injection via string interpolation in \`execSync\` for the macOS \`security\` tool (using \`security find-generic-password\`).
**Learning:** Using \`execSync\` or \`exec\` with concatenated string arguments executes the string inside a shell, opening up command injection.
**Prevention:** Instead of \`execSync\`, use \`execFileSync\` passing the command arguments as a proper array. This avoids shell interpretation and safely executes the command, mitigating command injection vulnerabilities even if parameters involve unsanitized variables.
