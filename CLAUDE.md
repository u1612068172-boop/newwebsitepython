# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Flask website for two Portuguese restaurants in Setúbal — **Peixe no Largo** (seafood, slug `casa-da-peixe` — slug kept for URL/image-file stability) and **Lapicanha** (premium grill, slug `lapicanha`). Deployed to Vercel as a Python serverless function; runs locally via Flask's dev server.

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

- **`app.py`** — the whole Flask app: routes, DB helpers, reservations, orders, Stripe Checkout, and email/SMS notification helpers. A single module. `init_db()` runs at import time (inside a `try/except`) so Vercel cold starts have both tables ready.
- **`data.py`** — restaurants are **hardcoded** as the `RESTAURANTS` dict (id → full config: menu sections, gallery, hours, theme colors, contact info). Templates consume this dict directly. **To add/edit menu items, gallery images, hours, or theme colors, edit `data.py` — there is no CMS and no database-backed content.**
- **`api/index.py`** — Vercel entry point. Re-exports `app` from the root `app.py` after adding the project root to `sys.path`. `vercel.json` routes everything except `/static/*` to this file.
- **`templates/`** — Jinja templates extending `base.html`. Every template has access to `all_restaurants` and `current_year` via the `inject_globals` context processor in `app.py`, so nav/footer don't need to pass them explicitly.
- **`static/`** — single `css/style.css`, `js/main.js`, and `js/translations.js`; restaurant images live under `static/images/` and are referenced by relative path strings inside `data.py`.

### Dual-backend persistence (SQLite ↔ Postgres)

The DB layer in `app.py` switches backend based on the `DATABASE_URL` env var:

- **Unset (local dev)** → SQLite at `reservations.db` in the repo root, `?` placeholders, `sqlite3.Row` rows (dict-style access).
- **Set (prod on Vercel, Neon/Postgres)** → `psycopg` connection, `%s` placeholders, tuple rows (positional access).

The `_PH` and `_ID_COL` module-level constants encode these differences; **any new SQL must use `_PH` for parameter placeholders** rather than hardcoding `?` or `%s`, or it will break in one of the two environments. When reading rows back you must also branch on `USE_POSTGRES` (see `order_success` for the pattern) because Postgres rows are tuples while SQLite rows are dict-like.

Two tables are created on import: `reservations` and `orders`.

### Ordering flow (Stripe Checkout)

`/restaurant/<slug>/order` handles cart submission. The flow is:

1. Cart items arrive as a JSON blob in the `cart_items` form field (built client-side in `main.js`).
2. `_parse_price()` strips `€`, handles `/KG` and `price / price` (single/double portion) strings from `data.py` menu entries — any new price format needs a matching parser update.
3. A Stripe Checkout Session is created with line items in EUR cents; the full order (including `cart_items` JSON) is passed via `metadata` and also inserted into `orders` with `status='awaiting_payment'` and the Stripe session id.
4. On redirect back to `/order/success?session_id=…`, the app verifies `payment_status == "paid"`, flips the row to `confirmed`, then fires `send_order_email` + `send_order_sms` to the restaurant owner.

Notifications are best-effort: both helpers swallow exceptions and no-op when their credentials env vars are missing, so local dev works without SMTP/Twilio configured.

### Multi-language

`static/js/translations.js` holds a `TRANSLATIONS` dict keyed by locale (`en`, `pt`, `es`, `fr`). Translation is applied client-side in `main.js` — there is no server-side i18n. User-facing copy added to templates should use the `data-i18n` attribute pattern already in use and add a matching key to every locale in `translations.js`.

### Routes

Content pages are keyed by restaurant `slug` (`/restaurant/<slug>`, `/menu`, `/gallery`, `/contact`, `/order`). `get_restaurant(slug)` returns `None` for unknown slugs → `abort(404)`. The reservations route (`/reservations` and `/restaurant/<slug>/reservations`) handles both `GET` and `POST`; form validation is inline in `app.py` and errors are surfaced via `flash()`.

### Deployment

`vercel.json` uses the legacy `builds`/`routes` format with `@vercel/python` for `api/index.py` and `@vercel/static` for `static/**`. Expected Vercel env vars: `SECRET_KEY`, `DATABASE_URL`, `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `SMTP_*`, `TWILIO_*`. Local dev uses the `dev-secret-change-me` fallback and an empty Stripe key (so `/order` POSTs will fail until keys are set).
