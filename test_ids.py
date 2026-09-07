import cloudinary
import cloudinary.api

cloudinary.config(
  cloud_name = "sr2xqwbr",
  api_key = "871534231345616",
  api_secret = "mdiUcGmHcSekgMGy5ZswO_29GS4"
)

resources = []
next_cursor = None
while True:
    res = cloudinary.api.resources(max_results=100, next_cursor=next_cursor)
    resources.extend(res.get('resources', []))
    next_cursor = res.get('next_cursor')
    if not next_cursor:
        break

for r in resources:
    pid = r['public_id']
    if '1' in pid or '2' in pid:
        print(f"{pid} -> {r['secure_url']}")
