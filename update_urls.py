import cloudinary
import cloudinary.api
import os
import re

cloudinary.config(
  cloud_name = "sr2xqwbr",
  api_key = "871534231345616",
  api_secret = "mdiUcGmHcSekgMGy5ZswO_29GS4"
)

def get_all_resources():
    resources = []
    next_cursor = None
    while True:
        res = cloudinary.api.resources(max_results=100, next_cursor=next_cursor)
        resources.extend(res.get('resources', []))
        next_cursor = res.get('next_cursor')
        if not next_cursor:
            break
    return resources

print("Fetching Cloudinary resources...")
resources = get_all_resources()

# Create a mapping from "assets/images/<public_id>.png" -> secure_url
mapping = {}
for r in resources:
    pid = r['public_id']
    url = r['secure_url']
    # If the user uploaded exactly the same names
    mapping[f"assets/images/{pid}.png"] = url
    # some files might have spaces or parenthesis that got url encoded or changed in public_id?
    # Cloudinary usually keeps spaces or changes them to underscores. Let's see.

files_to_update = [
    "assets/js/data/projectsData.js",
    "assets/js/page-objects/HomePage.js",
    "index.html",
    "about.html",
    "services.html",
    "portfolio.html",
    "contact.html"
]

for filepath in files_to_update:
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r') as f:
        content = f.read()
    
    updated = False
    for local_path, url in mapping.items():
        if local_path in content:
            content = content.replace(local_path, url)
            updated = True
    
    # Also handle the fact that Cloudinary might have stripped parenthesis or spaces.
    # We will do a generic regex replace if needed, but let's try direct replace first.

    if updated:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")

print("Done.")
