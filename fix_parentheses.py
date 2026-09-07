import re
import os

with open("assets/js/data/projectsData.js", "r") as f:
    content = f.read()

# Replace any lingering assets/images/X (Y).png with Cloudinary URL
# by mapping the expected public_id to X_Y.
# We'll just run a regex that finds assets/images/(.*?).png
# Then replace spaces and parentheses with _ in the filename part
# and generate the secure URL format.

def replacer(match):
    original_path = match.group(0)
    filename = match.group(1)
    
    # Check if the filename contains space + parenthesis
    if " (" in filename or "(" in filename:
        clean_name = filename.replace(" (", "_").replace(")", "").replace("(", "_").replace(" ", "_")
        return f"https://res.cloudinary.com/sr2xqwbr/image/upload/{clean_name}.png"
    return original_path

new_content = re.sub(r'assets/images/(.*?)\.png', replacer, content)

with open("assets/js/data/projectsData.js", "w") as f:
    f.write(new_content)
print("Fixed parentheses.")
