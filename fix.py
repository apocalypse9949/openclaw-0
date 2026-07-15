import re

with open("src/agents/cli-credentials.test.ts", "r") as f:
    content = f.read()

# Fix mock again for the failing tests
content = content.replace(
    """    execFileSyncMock.mockImplementation((file: unknown, args: unknown) => {
      const argv = Array.isArray(args) ? args.map(String) : [];
      if (!argv.includes("Codex Auth")) { return ""; }
      return JSON.stringify({""",
    """    execFileSyncMock.mockImplementation((file: unknown, args: unknown) => {
      const argv = Array.isArray(args) ? args.map(String) : [];
      expect(argv).toContain("Codex Auth");
      return JSON.stringify({"""
)

with open("src/agents/cli-credentials.test.ts", "w") as f:
    f.write(content)
