"""
Livora Interiors - Python Page Object Model (POM) Portfolio Page
"""

from .base_page import BasePage

class PortfolioPage(BasePage):
    PATH = "/portfolio"

    def load(self):
        return self.get(self.PATH)

    def verify_portfolio_sections(self, html_content):
        return "Design Portfolio" in html_content and "portfolio-search-input" in html_content
