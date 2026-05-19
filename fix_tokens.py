import glob

for file in glob.glob(".github/workflows/*.yml"):
    with open(file, "r") as f:
        content = f.read()

    content = content.replace("client-id:", "app-id:")
    content = content.replace("app-id:", "client-id:")

    with open(file, "w") as f:
        f.write(content)
