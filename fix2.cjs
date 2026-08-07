const fs = require("fs");
const glob = require("glob");

const files = glob.sync(".github/workflows/*.yml");

files.forEach((file) => {
  let content = fs.readFileSync(file, "utf8");
  content = content.replace(
    /continue-on-error: true\n\s+continue-on-error: true/g,
    "continue-on-error: true",
  );
  fs.writeFileSync(file, content);
});
