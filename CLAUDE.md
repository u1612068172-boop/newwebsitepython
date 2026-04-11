# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Flask website for two Portuguese restaurants in Setúbal — **Original's Casa de Peixe** (seafood, slug `casa-da-peixe`) and **Lapicanha** (premium grill, slug `lapicanha`). Deployed to Vercel as a Python serverless function; runs locally via Flask's dev server.

## Commands

Windows bash (this repo lives on Windows). A `venv/` directory is already present at the repo root.

```bash
# Activate the existing virtualenv (Windows)
source venv/Scripts/activate

# Install / refresh deps
pip install -r requirements.txt

# Run the dev server (http://127.0.0.1:5000)
python app.py
```

There is no test suite, linter config, or build step. Don't invent one — if the user asks for tests, confirm first.

## Architecture

The app is intentionally tiny: three Python files plus Jinja templates and static assets. The big-picture pieces that aren't obvious from one file:

- **`app.py`** — the whole Flask app: routes, DB helpers, reservation form handling. A single module. The `init_db()` call runs at import time (inside a `try/except`) so Vercel cold starts have the table ready.
- **`data.py`** — restaurants are **hardcoded** as the `RESTAURANTS` dict (id → full config: menu sections, gallery, hours, theme colors, policies, contact info). Templates consume this dict directly. **To add/edit menu items, gallery images, hours, or theme colors, edit `data.py` — there is no CMS and no database-backed content.**
- **`api/index.py`** — Vercel entry point. Re-exports `app` from the root `app.py` after adding the project root to `sys.path`. `vercel.json` routes everything except `/static/*` to this file.
- **`templates/`** — Jinja templates extending `base.html`. Every template has access to `all_restaurants` and `current_year` via the `inject_globals` context processor in `app.py`, so the nav/footer don't need to pass them explicitly.
- **`static/`** — single `css/style.css` and `js/main.js`; restaurant images live under `static/images/` and are referenced by relative path strings inside `data.py`.

### Reservation persistence (dual-backend)

Reservations are the only dynamic data. The DB layer in `app.py` switches backend based on the `DATABASE_URL` env var:

- **Unset (local dev)** → SQLite at `reservations.db` in the repo root, `?` placeholders.
- **Set (prod on Vercel, Neon/Postgres)** → `psycopg` connection, `%s` placeholders.

The `_PH` and `_ID_COL` module-level constants encode these differences; any new SQL must use `_PH` for parameter placeholders rather than hardcoding `?` or `%s`, or it will break in one of the two environments. Schema is a single `reservations` table created on import.

### Routes

Most routes are content pages keyed by a restaurant `slug` (`/restaurant/<slug>`, `/restaurant/<slug>/menu`, `/gallery`, `/contact`). `get_restaurant(slug)` returns `None` for unknown slugs → `abort(404)`. The reservations route (`/reservations` and `/restaurant/<slug>/reservations`) handles both `GET` and `POST`; form validation is inline in `app.py` and errors are surfaced via `flash()`.

### Deployment

`vercel.json` uses the legacy `builds`/`routes` format with `@vercel/python` for `api/index.py` and `@vercel/static` for `static/**`. `SECRET_KEY` and `DATABASE_URL` are expected as Vercel env vars. Local dev uses the `dev-secret-change-me` fallback.
