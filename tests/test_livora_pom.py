"""
Livora Interiors - Python Page Object Model (POM) Test Suite
Tests all pages, health checks, and API endpoints using Page Object Models
"""

import pytest
from app import app
from tests.pages import HomePage, PortfolioPage, ServicesPage, AboutPage, ContactPage


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def test_home_page_pom(client):
    """Test Home Page via HomePage POM"""
    home = HomePage(client)
    res = home.load()
    assert res.status_code == 200
    html = res.data.decode("utf-8")
    assert home.verify_designer_branding(html)
    assert home.verify_freelance_advisor_badge(html)


def test_portfolio_page_pom(client):
    """Test Portfolio Page via PortfolioPage POM"""
    portfolio = PortfolioPage(client)
    res = portfolio.load()
    assert res.status_code == 200
    html = res.data.decode("utf-8")
    assert portfolio.verify_portfolio_sections(html)


def test_services_page_pom(client):
    """Test Services Page via ServicesPage POM"""
    services = ServicesPage(client)
    res = services.load()
    assert res.status_code == 200
    html = res.data.decode("utf-8")
    assert services.verify_freelance_advisory_section(html)


def test_about_page_pom(client):
    """Test About Page via AboutPage POM"""
    about = AboutPage(client)
    res = about.load()
    assert res.status_code == 200
    html = res.data.decode("utf-8")
    assert about.verify_founder_bio(html)


def test_contact_page_and_inquiry_api_pom(client):
    """Test Contact Page & Inquiry API via ContactPage POM"""
    contact = ContactPage(client)
    res = contact.load()
    assert res.status_code == 200
    html = res.data.decode("utf-8")
    assert contact.verify_contact_info(html)

    # Test API inquiry submission
    payload = {
        "name": "Sarah Jenkins",
        "email": "sarah@example.com",
        "phone": "+910000000000",
        "service": "Freelance Design Advisory",
        "timeline": "1 - 2 Months",
        "notes": "Looking for luxury living room and master suite spatial advisory."
    }
    api_res = contact.submit_inquiry_api(payload)
    assert api_res.status_code == 201
    json_data = api_res.get_json()
    assert json_data["success"] is True
    assert "inquiry_id" in json_data


def test_health_check(client):
    """Test Render Web Service Health Check"""
    res = client.get("/health")
    assert res.status_code == 200
    data = res.get_json()
    assert data["status"] == "healthy"
    assert data["designer"] == "Bindhu"
