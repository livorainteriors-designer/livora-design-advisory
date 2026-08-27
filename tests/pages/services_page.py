"""
Livora Interiors - Python Page Object Model (POM) Services Page
"""

from .base_page import BasePage

class ServicesPage(BasePage):
    PATH = "/services"

    def load(self):
        return self.get(self.PATH)

    def verify_freelance_advisory_section(self, html_content):
        return "Freelance Interior Design & Strategic Spatial Advisor" in html_content
