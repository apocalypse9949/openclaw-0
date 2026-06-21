import os
import glob

def fix_workflows():
    workflow_dir = ".github/workflows"
    for filepath in glob.glob(os.path.join(workflow_dir, "*.yml")):
        with open(filepath, 'r') as f:
            content = f.read()

        # Replace 'app-id:' with 'client-id:' as indicated by the warnings
        if 'app-id:' in content:
            new_content = content.replace('app-id:', 'client-id:')
            with open(filepath, 'w') as f:
                f.write(new_content)
            print(f"Fixed {filepath}")

if __name__ == "__main__":
    fix_workflows()
