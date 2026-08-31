"""
Livora Interiors - Flask Web Application & API Service
Founder & Principal Designer: Bindhu
"""

from flask import Flask, render_template, send_from_directory, request, jsonify, session, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
import os
import json
from datetime import datetime, timezone
from dotenv import load_dotenv

# Load environment variables from .env if present
load_dotenv()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__, static_folder="assets", static_url_path="/assets", template_folder=BASE_DIR)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "livora-secret-key-2026")

# Configure Database
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL", "sqlite:///livora.db")
if app.config["SQLALCHEMY_DATABASE_URI"] and app.config["SQLALCHEMY_DATABASE_URI"].startswith("postgres://"):
    app.config["SQLALCHEMY_DATABASE_URI"] = app.config["SQLALCHEMY_DATABASE_URI"].replace("postgres://", "postgresql://", 1)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# In-memory storage for inquiries
INQUIRIES_LOG = []

# ==========================================
# Database Models
# ==========================================
class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    service_type = db.Column(db.String(100), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    review_text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "service_type": self.service_type,
            "rating": self.rating,
            "review_text": self.review_text,
            "created_at": self.created_at.isoformat()
        }

class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(500), nullable=False)
    description = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "id": self.id,
            "url": self.url,
            "description": self.description,
            "created_at": self.created_at.isoformat()
        }

# Create tables within app context
with app.app_context():
    db.create_all()


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
# Admin Routes
# ==========================================
@app.route("/admin/login", methods=["GET", "POST"])
def admin_login():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        
        expected_user = os.environ.get("ADMIN_USERNAME", "admin")
        expected_pass = os.environ.get("ADMIN_PASSWORD", "admin")
        
        if username == expected_user and password == expected_pass:
            session["is_admin"] = True
            return redirect(url_for("admin_dashboard"))
        else:
            return render_template("login.html", error="Invalid credentials")
            
    return render_template("login.html", error=None)

@app.route("/admin/logout")
def admin_logout():
    session.pop("is_admin", None)
    return redirect(url_for("admin_login"))

@app.route("/admin")
@app.route("/admin/dashboard")
def admin_dashboard():
    if not session.get("is_admin"):
        return redirect(url_for("admin_login"))
    reviews = Review.query.order_by(Review.created_at.desc()).all()
    images = Image.query.order_by(Image.created_at.desc()).all()
    return render_template("admin.html", reviews=reviews, images=images)


# ==========================================
# REST API Endpoints
# ==========================================
@app.route("/health")
def health():
    return jsonify({"status": "healthy"}), 200

@app.route("/api/reviews", methods=["GET"])
def get_reviews():
    reviews = Review.query.order_by(Review.created_at.desc()).all()
    return jsonify([r.to_dict() for r in reviews]), 200

@app.route("/api/reviews", methods=["POST"])
def submit_review():
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "error": "Invalid data format"}), 400
        
    name = data.get("name")
    service_type = data.get("service_type")
    rating = data.get("rating")
    review_text = data.get("review_text")
    
    if not all([name, service_type, rating, review_text]):
        return jsonify({"success": False, "error": "All fields are required"}), 400
        
    try:
        rating = int(rating)
        if rating < 1 or rating > 5:
            raise ValueError
    except ValueError:
        return jsonify({"success": False, "error": "Rating must be an integer between 1 and 5"}), 400

    new_review = Review(
        name=name,
        service_type=service_type,
        rating=rating,
        review_text=review_text
    )
    db.session.add(new_review)
    db.session.commit()
    
    return jsonify({"success": True, "review": new_review.to_dict()}), 201

@app.route("/api/reviews/<int:review_id>", methods=["DELETE"])
def delete_review(review_id):
    if not session.get("is_admin"):
        return jsonify({"success": False, "error": "Unauthorized"}), 401
        
    review = Review.query.get(review_id)
    if not review:
        return jsonify({"success": False, "error": "Review not found"}), 404
        
    db.session.delete(review)
    db.session.commit()
    return jsonify({"success": True})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"Livora Interiors Python server running on http://localhost:{port}")
    app.run(host="0.0.0.0", port=port, debug=True)
