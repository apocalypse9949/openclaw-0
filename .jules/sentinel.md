## 2025-05-18 - [Fix Command Injection in CLI Credentials Reader]
**Vulnerability:** Shell execution of macOS `security` tool allowed arbitrary code execution due to unfiltered dynamic parameters in string interpolation within `execSync`.
**Learning:** Even when reading configurations, dynamic path inputs (`codexHome`) converted to hashes can be subject to manipulation. Avoid passing any string interpolations to shell execution functions (`exec`, `execSync`).
**Prevention:** Use `execFileSync` or `execFile` with separate string arrays for binary names and arguments.
