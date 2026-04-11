"""Original's Casa de Peixe & Lapicanha - Flask website.

Manages two Portuguese restaurants in Setúbal:
- Original's Casa de Peixe (seafood)
- Lapicanha (premium grill)
"""
import os
import sqlite3
from datetime import datetime
from pathlib import Path

from flask import (
    Flask,
    abort,
    flash,
    g,
    redirect,
    render_template,
    request,
    url_for,
)

from data import RESTAURANTS, all_restaurants, get_restaurant

app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-secret-change-me")

# When DATABASE_URL (Neon/Postgres) is configured we persist reservations
# there. Otherwise fall back to a local SQLite file for dev.
DATABASE_URL = os.environ.get("DATABASE_URL")
USE_POSTGRES = bool(DATABASE_URL)
DB_PATH = Path(__file__).parent / "reservations.db"


# ---------------------------------------------------------------------------
# Database helpers (SQLite for reservations)
# ---------------------------------------------------------------------------

def _connect():
    if USE_POSTGRES:
        import psycopg
        return psycopg.connect(DATABASE_URL)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def get_db():
    if "db" not in g:
        g.db = _connect()
    return g.db


@app.teardown_appcontext
def close_db(error):
    db = g.pop("db", None)
    if db is not None:
        db.close()


# SQL placeholder style — Postgres uses %s, SQLite uses ?
_PH = "%s" if USE_POSTGRES else "?"
_ID_COL = "SERIAL PRIMARY KEY" if USE_POSTGRES else "INTEGER PRIMARY KEY AUTOINCREMENT"


def init_db():
    conn = _connect()
    cur = conn.cursor()
    cur.execute(
        f"""
        CREATE TABLE IF NOT EXISTS reservations (
            id {_ID_COL},
            restaurant_id TEXT NOT NULL,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            date TEXT NOT NULL,
            time TEXT NOT NULL,
            guests INTEGER NOT NULL,
            special_requests TEXT,
            status TEXT DEFAULT 'pending',
            created_at TEXT NOT NULL
        )
        """
    )
    conn.commit()
    cur.close()
    conn.close()


# Ensure table exists on import so serverless cold starts work immediately.
try:
    init_db()
except Exception:
    pass


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.route("/")
def home():
    return render_template("index.html", restaurants=all_restaurants())


@app.route("/restaurant/<slug>")
def restaurant(slug):
    r = get_restaurant(slug)
    if not r:
        abort(404)
    return render_template("restaurant.html", r=r)


@app.route("/restaurant/<slug>/menu")
def menu(slug):
    r = get_restaurant(slug)
    if not r:
        abort(404)
    return render_template("menu.html", r=r)


@app.route("/restaurant/<slug>/gallery")
def gallery(slug):
    r = get_restaurant(slug)
    if not r:
        abort(404)
    return render_template("gallery.html", r=r)


@app.route("/restaurant/<slug>/contact")
def contact(slug):
    r = get_restaurant(slug)
    if not r:
        abort(404)
    return render_template("contact.html", r=r)


@app.route("/reservations", methods=["GET", "POST"])
@app.route("/restaurant/<slug>/reservations", methods=["GET", "POST"])
def reservations(slug=None):
    selected = get_restaurant(slug) if slug else None

    if request.method == "POST":
        restaurant_id = request.form.get("restaurant_id", "").strip()
        name = request.form.get("name", "").strip()
        email = request.form.get("email", "").strip()
        phone = request.form.get("phone", "").strip()
        date = request.form.get("date", "").strip()
        time = request.form.get("time", "").strip()
        guests = request.form.get("guests", "").strip()
        special = request.form.get("special_requests", "").strip()

        errors = []
        if restaurant_id not in RESTAURANTS:
            errors.append("Please choose a valid restaurant.")
        if not name:
            errors.append("Name is required.")
        if not email or "@" not in email:
            errors.append("A valid email is required.")
        if not date:
            errors.append("Date is required.")
        if not time:
            errors.append("Time is required.")
        try:
            guests_int = int(guests)
            if guests_int < 1 or guests_int > 30:
                raise ValueError
        except ValueError:
            errors.append("Number of guests must be between 1 and 30.")
            guests_int = 1

        if errors:
            for err in errors:
                flash(err, "error")
            return render_template(
                "reservations.html",
                restaurants=all_restaurants(),
                selected=selected,
                form=request.form,
            )

        db = get_db()
        cur = db.cursor()
        placeholders = ", ".join([_PH] * 9)
        cur.execute(
            f"""INSERT INTO reservations
               (restaurant_id, name, email, phone, date, time, guests,
                special_requests, status, created_at)
               VALUES ({placeholders})""",
            (
                restaurant_id,
                name,
                email,
                phone,
                date,
                time,
                guests_int,
                special,
                "pending",
                datetime.utcnow().isoformat(),
            ),
        )
        db.commit()
        cur.close()
        flash(
            f"Thank you, {name}! Your reservation at "
            f"{RESTAURANTS[restaurant_id]['name']} has been received. "
            f"We will confirm by email shortly.",
            "success",
        )
        return redirect(url_for("reservations"))

    return render_template(
        "reservations.html",
        restaurants=all_restaurants(),
        selected=selected,
        form={},
    )


@app.route("/about")
def about():
    return render_template("about.html", restaurants=all_restaurants())


@app.errorhandler(404)
def not_found(e):
    return render_template("404.html"), 404


# ---------------------------------------------------------------------------
# Context processor so every template has the restaurant list for nav
# ---------------------------------------------------------------------------

@app.context_processor
def inject_globals():
    return {
        "all_restaurants": all_restaurants(),
        "current_year": datetime.utcnow().year,
    }


if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
