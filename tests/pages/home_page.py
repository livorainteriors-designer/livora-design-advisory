"""
Livora Interiors - Python Page Object Model (POM) Home Page
"""

from .base_page import BasePage

class HomePage(BasePage):
    PATH = "/"

    def load(self):
        return self.get(self.PATH)

    def verify_designer_branding(self, html_content):
        return "Livora Interiors" in html_content and "Bindhu" in html_content

    def verify_freelance_advisor_badge(self, html_content):
        return "Freelance Interior Architect" in html_content and "Design Advisor" in html_content
