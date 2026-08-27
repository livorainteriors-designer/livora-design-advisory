"""
Livora Interiors - Python Page Object Model (POM) Contact Page
"""

from .base_page import BasePage

class ContactPage(BasePage):
    PATH = "/contact"
    INQUIRY_API = "/api/inquiry"

    def load(self):
        return self.get(self.PATH)

    def verify_contact_info(self, html_content):
        return "livorainteriors.co@gmail.com" in html_content and "livorainteriors.co" in html_content

    def submit_inquiry_api(self, payload):
        return self.post_json(self.INQUIRY_API, payload)
