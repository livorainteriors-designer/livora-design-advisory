"""
Livora Interiors - Flask Web Application & API Service
Founder & Principal Designer: Bindhu
"""

from flask import Flask, render_template, send_from_directory, request, jsonify
import os
import json
from datetime import datetime, timezone

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__, static_folder="assets", static_url_path="/assets")
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "livora-secret-key-2026")

# In-memory storage for inquiries (can be backed by DB/Email dispatch)
INQUIRIES_LOG = []


# ==========================================
# Static Page Routes
# ==========================================

@app.route("/")
@app.route("/index.html")
@app.route("/home")
def index():
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/portfolio")
@app.route("/portfolio.html")
def portfolio():
    return send_from_directory(BASE_DIR, "portfolio.html")


@app.route("/services")
@app.route("/services.html")
def services():
    return send_from_directory(BASE_DIR, "services.html")


@app.route("/about")
@app.route("/about.html")
def about():
    return send_from_directory(BASE_DIR, "about.html")


@app.route("/contact")
@app.route("/contact.html")
def contact():
    return send_from_directory(BASE_DIR, "contact.html")


# ==========================================
# REST API Endpoints
# ==========================================

@app.route("/health")
def health():
    """Health check endpoint for Render Web Service monitoring"""
    return jsonify({"status": "healthy", "service": "Livora Interiors", "designer": "Bindhu", "time": datetime.now(timezone.utc).isoformat()}), 200


@app.route("/api/company", methods=["GET"])
def get_company_data():
    """Return company & designer master data"""
    return jsonify({
        "name": "Livora Interiors",
        "founder": "Bindhu",
        "role": "Principal Interior Designer & Strategic Design Advisor",
        "email": "livorainteriors.co@gmail.com",
        "instagram": "livorainteriors.co",
        "aesthetic": "Studio McGee Warm Modernism & Timeless Elegance"
    }), 200


@app.route("/api/inquiry", methods=["POST"])
def submit_inquiry():
    """Handle project & freelance advisory inquiries"""
    data = request.get_json() or request.form.to_dict()

    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone", "")
    service = data.get("service", "Freelance Design Advisory")
    timeline = data.get("timeline", "1 - 2 Months")
    budget = data.get("budget", "Flexible")
    notes = data.get("notes") or data.get("message", "")

    if not name or not email:
        return jsonify({"success": False, "error": "Name and Email are required fields."}), 400

    inquiry_record = {
        "id": f"INQ-{len(INQUIRIES_LOG) + 1:04d}",
        "name": name,
        "email": email,
        "phone": phone,
        "service": service,
        "timeline": timeline,
        "budget": budget,
        "notes": notes,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    INQUIRIES_LOG.append(inquiry_record)

    return jsonify({
        "success": True,
        "message": "Thank you! Your project inquiry has been received by Bindhu.",
        "inquiry_id": inquiry_record["id"]
    }), 201


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"Livora Interiors Python server running on http://localhost:{port}")
    app.run(host="0.0.0.0", port=port, debug=False)

