"""
Livora Interiors - Python Page Object Model (POM) About Page
"""

from .base_page import BasePage

class AboutPage(BasePage):
    PATH = "/about"

    def load(self):
        return self.get(self.PATH)

    def verify_founder_bio(self, html_content):
        return "Bindhu" in html_content and "Three Pillars of Livora" in html_content
