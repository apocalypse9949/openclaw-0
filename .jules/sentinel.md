## 2025-02-18 - Prevent Command Injection in CLI Credentials

**Vulnerability:** Shell execution (`execSync`) was used when interacting with the macOS `security` tool. This allowed user-supplied or external input (like auth keys or account strings) to potentially execute arbitrary commands via shell interpretation.
**Learning:** Functions that manage CLI credentials should not use shell evaluation. Input strings such as `account` or service names should be treated exclusively as arguments to prevent unexpected command substitution.
**Prevention:** Avoid `exec` and `execSync` whenever external inputs or data constructs are part of the command. Instead, use array-based variants like `execFile` and `execFileSync` to pass arguments to the target binary safely, removing the risk of shell evaluation entirely.
