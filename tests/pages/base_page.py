"""
Livora Interiors - Python Page Object Model (POM) Base Page
"""

class BasePage:
    def __init__(self, client):
        self.client = client

    def get(self, path):
        return self.client.get(path)

    def post_json(self, path, data):
        return self.client.post(path, json=data)
