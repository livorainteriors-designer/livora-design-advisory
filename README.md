# Livora Interiors — Luxury Interior Architecture & Design Advisory

> **Founder & Principal Designer**: Bindhu  
> **Aesthetic**: Inspired by Studio McGee (Warm Neutrals, Earthy Textures, Refined Bronze & Timeless Simplicity)  
> **Contact Email**: `livorainteriors.co@gmail.com`  
> **Instagram**: `@livorainteriors.co`  
> **Backend**: Python (Flask + Gunicorn) & Modular Frontend with **Page Object Model (POM)** structure

---

## 🏛️ Project Overview

**Livora Interiors** is a high-end web platform crafted for Bindhu's interior design practice and strategic freelance advisory. The site features:

1. **Luxury Editorial Design**: Cormorant Garamond serif headings, warm alabaster linen backgrounds (`#FAF8F5`), and brushed brass/bronze accents.
2. **Freelance Design Advisory Concept**: Dedicated service tiers for 1-on-1 virtual design consultations, 3D visualization sprints, and space planning guidance.
3. **Comprehensive Work Samples**: 60+ photorealistic 3D renders categorized into Living Lounges, Master Suites, Kitchens, Executive Cabins, and Wardrobes.
4. **Cinematic 3D Video Walkthroughs**: Built-in video players showcasing architectural simulations.
5. **Interactive Before & After Slider**: Demonstrates transition from concept layouts to 4K photorealistic renders.
6. **Consultation & Direct Booking Modal**: Multi-field project inquiry form integrated with **Direct WhatsApp Chat** and email notifications.
7. **Python Backend & Page Object Model (POM)**: Flask API routes, health checks, and a full Python POM test suite in `tests/`.

---

## 📂 Architecture & Page Object Model (POM)

```
Livora_Interiors/
│
├── app.py                          # Flask Python Application & REST API
├── wsgi.py                         # WSGI Production Entry Point
├── Procfile                        # Gunicorn Process Definition
├── requirements.txt                # Python Dependencies (Flask, Gunicorn, pytest)
├── render.yaml                     # Render Python Web Service Deployment Blueprint
│
├── index.html                      # Luxury Landing Page
├── portfolio.html                  # Curated Filterable Portfolio Gallery & Lightbox
├── services.html                   # Freelance Advisory & Full-Scope Interior Services
├── about.html                      # Designer Story, Philosophy & 3D Tech Stack
├── contact.html                    # Inquiry Form, WhatsApp Direct & Instagram Feed
│
├── tests/                          # Python Page Object Model (POM) Test Suite
│   ├── pages/
│   │   ├── base_page.py            # Base POM abstraction
│   │   ├── home_page.py            # Home Page Object Model
│   │   ├── portfolio_page.py       # Portfolio Page Object Model
│   │   ├── services_page.py        # Services Page Object Model
│   │   ├── about_page.py           # About Page Object Model
│   │   └── contact_page.py         # Contact Page Object Model
│   └── test_livora_pom.py          # Automated POM Test Suite
│
└── assets/
    ├── css/
    │   ├── variables.css           # Studio McGee palette tokens & typography
    │   ├── global.css              # Reset, typography, animations, buttons
    │   ├── components.css          # Navbar, cards, lightbox, before/after, modals
    │   └── pages.css               # Page-specific grids & responsive layouts
    │
    ├── js/
    │   ├── main.js                 # Global application bootstrap
    │   ├── core/App.js             # Core coordinator & POM loader
    │   ├── page-objects/           # Client-side Page Object Model Controllers
    │   ├── components/             # Reusable UI Components (Navbar, Lightbox, Modals)
    │   └── data/                   # Centralized Data Stores (company, projects, services)
    │
    ├── images/                     # Optimized brand logo & render gallery
    └── videos/                     # 3D Architectural video walkthroughs
```

---

## 🐍 Running Locally with Python

1. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Start the local server:
   ```bash
   python app.py
   ```
   Open your browser at `http://localhost:5000`.

3. Run the automated Page Object Model (POM) tests:
   ```bash
   pytest
   ```

---

## 🚀 How to Deploy Live on Render (Python Web Service)

1. Push this folder to your GitHub/GitLab repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Livora Interiors Python site"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/livora-interiors.git
   git push -u origin main
   ```

2. In [Render.com](https://render.com):
   - Click **New +** -> **Web Service**.
   - Connect your GitHub repository.
   - Configure the following settings (if not automatically loaded from `render.yaml`):
     - **Environment**: `Python`
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `gunicorn wsgi:app`
   - Click **Create Web Service**.

Render will deploy your site with automatic HTTPS, continuous deployment on push, and custom domain support!

---

© 2026 **Livora Interiors**. Designed & Curated for **Bindhu**.
