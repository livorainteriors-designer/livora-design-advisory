import cloudinary
import cloudinary.api

cloudinary.config(
  cloud_name = "sr2xqwbr",
  api_key = "871534231345616",
  api_secret = "mdiUcGmHcSekgMGy5ZswO_29GS4"
)

try:
    result = cloudinary.api.resources(max_results=5)
    print("Successfully connected to Cloudinary!")
    for res in result.get('resources', []):
        print(f"{res['public_id']} -> {res['secure_url']}")
except Exception as e:
    print("Error:", str(e))
