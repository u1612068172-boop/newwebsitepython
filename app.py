"""Picanha para Familia & Lapicanha - Flask website.

Manages two Portuguese restaurants in Setúbal:
- Picanha para Familia (seafood)
- Lapicanha (premium grill)
"""
import json
import os
import smtplib
import sqlite3
from datetime import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path

import stripe
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

# Stripe configuration
stripe.api_key = os.environ.get("STRIPE_SECRET_KEY", "")
STRIPE_PUBLISHABLE_KEY = os.environ.get("STRIPE_PUBLISHABLE_KEY", "")

# Email (SMTP) configuration
SMTP_HOST = os.environ.get("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USER = os.environ.get("SMTP_USER", "")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD", "")
SMTP_FROM = os.environ.get("SMTP_FROM", "")

# Twilio SMS configuration
TWILIO_ACCOUNT_SID = os.environ.get("TWILIO_ACCOUNT_SID", "")
TWILIO_AUTH_TOKEN = os.environ.get("TWILIO_AUTH_TOKEN", "")
TWILIO_FROM_NUMBER = os.environ.get("TWILIO_FROM_NUMBER", "")

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
    cur.execute(
        f"""
        CREATE TABLE IF NOT EXISTS orders (
            id {_ID_COL},
            restaurant_id TEXT NOT NULL,
            order_type TEXT NOT NULL,
            customer_name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            delivery_address TEXT,
            items TEXT NOT NULL,
            total_amount REAL NOT NULL,
            special_requests TEXT,
            status TEXT DEFAULT 'pending',
            stripe_session_id TEXT,
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


# ---------------------------------------------------------------------------
# Notification helpers (Email + SMS)
# ---------------------------------------------------------------------------

def send_order_email(order_data, restaurant):
    """Send order notification email to the restaurant owner."""
    if not SMTP_USER or not SMTP_PASSWORD:
        return
    try:
        items = json.loads(order_data["items"])
        items_html = "".join(
            f"<tr><td>{it['name']}</td><td>{it['qty']}</td>"
            f"<td>{it['price']}</td></tr>"
            for it in items
        )
        body = f"""
        <h2>New Order Received!</h2>
        <p><strong>Restaurant:</strong> {restaurant['name']}</p>
        <p><strong>Order Type:</strong> {order_data['order_type'].title()}</p>
        <p><strong>Customer:</strong> {order_data['customer_name']}</p>
        <p><strong>Email:</strong> {order_data['email']}</p>
        <p><strong>Phone:</strong> {order_data.get('phone', 'N/A')}</p>
        {"<p><strong>Delivery Address:</strong> " + order_data['delivery_address'] + "</p>" if order_data.get('delivery_address') else ""}
        <h3>Items Ordered</h3>
        <table border="1" cellpadding="6" cellspacing="0">
            <tr><th>Item</th><th>Qty</th><th>Price</th></tr>
            {items_html}
        </table>
        <p><strong>Total: &euro;{order_data['total_amount']:.2f}</strong></p>
        {"<p><strong>Special Requests:</strong> " + order_data['special_requests'] + "</p>" if order_data.get('special_requests') else ""}
        """
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"New Order - {restaurant['name']} - {order_data['order_type'].title()}"
        msg["From"] = SMTP_FROM or SMTP_USER
        msg["To"] = restaurant.get("orders_email") or restaurant["email"]
        msg.attach(MIMEText(body, "html"))

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(msg)
    except Exception:
        pass


def send_customer_receipt(order_data, restaurant, order_id):
    """Send order receipt email to the customer."""
    if not SMTP_USER or not SMTP_PASSWORD:
        return
    try:
        items = json.loads(order_data["items"])
        items_html = "".join(
            f"<tr><td style='padding:6px;border-bottom:1px solid #eee;'>{it['name']}</td>"
            f"<td style='padding:6px;border-bottom:1px solid #eee;text-align:center;'>{it['qty']}</td>"
            f"<td style='padding:6px;border-bottom:1px solid #eee;text-align:right;'>{it['price']}</td></tr>"
            for it in items
        )
        order_type_label = order_data["order_type"].replace("-", " ").title()
        delivery_block = ""
        if order_data.get("delivery_address"):
            delivery_block = (
                f"<p><strong>Delivery Address:</strong> "
                f"{order_data['delivery_address']}</p>"
            )
        special_block = ""
        if order_data.get("special_requests"):
            special_block = (
                f"<p><strong>Special Requests:</strong> "
                f"{order_data['special_requests']}</p>"
            )
        body = f"""
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
            <div style="background:#722F37;color:#F5E9D4;padding:24px;text-align:center;border-radius:8px 8px 0 0;">
                <h1 style="margin:0;font-size:28px;">Order Confirmed!</h1>
                <p style="margin:8px 0 0;opacity:0.9;">Thank you for ordering from {restaurant['name']}</p>
            </div>
            <div style="background:#fff;border:1px solid #ddd;border-top:none;padding:24px;border-radius:0 0 8px 8px;">
                <p>Hi {order_data['customer_name']},</p>
                <p>We've received your order and your payment has been confirmed.
                The restaurant has been notified and will begin preparing your order shortly.</p>

                <div style="background:#F5E9D4;padding:16px;border-radius:6px;margin:20px 0;">
                    <p style="margin:4px 0;"><strong>Order #:</strong> {order_id}</p>
                    <p style="margin:4px 0;"><strong>Order Type:</strong> {order_type_label}</p>
                    <p style="margin:4px 0;"><strong>Restaurant:</strong> {restaurant['name']}</p>
                    {delivery_block}
                </div>

                <h3 style="color:#722F37;border-bottom:2px solid #C9A961;padding-bottom:8px;">Items Ordered</h3>
                <table style="width:100%;border-collapse:collapse;">
                    <tr style="background:#F5E9D4;">
                        <th style="padding:8px;text-align:left;">Item</th>
                        <th style="padding:8px;text-align:center;">Qty</th>
                        <th style="padding:8px;text-align:right;">Price</th>
                    </tr>
                    {items_html}
                </table>
                <p style="text-align:right;font-size:18px;font-weight:bold;margin:16px 0;color:#722F37;">
                    Total Paid: &euro;{order_data['total_amount']:.2f}
                </p>
                {special_block}

                <hr style="border:none;border-top:1px solid #ddd;margin:24px 0;">

                <h3 style="color:#722F37;">Restaurant Contact</h3>
                <p style="margin:4px 0;"><strong>Phone:</strong> {restaurant['phone']}</p>
                <p style="margin:4px 0;"><strong>Email:</strong> {restaurant['email']}</p>
                <p style="margin:4px 0;"><strong>Address:</strong> {restaurant['address_line_1']}, {restaurant['address_line_2']}</p>

                <p style="margin-top:24px;color:#666;font-size:13px;">
                    If you have any questions about your order, please contact the restaurant directly.
                </p>
            </div>
        </div>
        """
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"Your order #{order_id} from {restaurant['name']}"
        msg["From"] = SMTP_FROM or SMTP_USER
        msg["To"] = order_data["email"]
        msg.attach(MIMEText(body, "html"))

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(msg)
    except Exception:
        pass


def send_order_sms(order_data, restaurant):
    """Send order notification SMS to the restaurant owner."""
    if not TWILIO_ACCOUNT_SID or not TWILIO_AUTH_TOKEN:
        return
    try:
        from twilio.rest import Client
        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        items = json.loads(order_data["items"])
        items_text = ", ".join(f"{it['name']} x{it['qty']}" for it in items)
        body = (
            f"New {order_data['order_type']} order at {restaurant['name']}! "
            f"Customer: {order_data['customer_name']}. "
            f"Items: {items_text}. "
            f"Total: EUR {order_data['total_amount']:.2f}"
        )
        client.messages.create(
            body=body,
            from_=TWILIO_FROM_NUMBER,
            to=restaurant["phone"],
        )
    except Exception:
        pass


# ---------------------------------------------------------------------------
# Order routes
# ---------------------------------------------------------------------------

def _parse_price(price_str):
    """Extract numeric euro value from a price string like '17.00€' or '14.90€ / 21.90€'."""
    cleaned = price_str.split("/")[0].strip().replace("€", "").replace(",", ".")
    # Handle per-KG prices — just use the number
    cleaned = cleaned.replace("/KG", "").strip()
    try:
        return float(cleaned)
    except ValueError:
        return 0.0


@app.route("/restaurant/<slug>/order", methods=["GET", "POST"])
def order(slug):
    r = get_restaurant(slug)
    if not r:
        abort(404)

    if request.method == "POST":
        customer_name = request.form.get("customer_name", "").strip()
        email = request.form.get("email", "").strip()
        phone = request.form.get("phone", "").strip()
        order_type = request.form.get("order_type", "").strip()
        delivery_address = request.form.get("delivery_address", "").strip()
        special_requests = request.form.get("special_requests", "").strip()
        cart_json = request.form.get("cart_items", "").strip()

        errors = []
        if not customer_name:
            errors.append("Name is required.")
        if not email or "@" not in email:
            errors.append("A valid email is required.")
        if order_type not in ("takeaway", "delivery", "dine-in"):
            errors.append("Please select an order type.")
        if order_type == "delivery" and not delivery_address:
            errors.append("Delivery address is required for delivery orders.")

        try:
            cart_items = json.loads(cart_json) if cart_json else []
        except json.JSONDecodeError:
            cart_items = []
            errors.append("Invalid cart data.")

        if not cart_items:
            errors.append("Your cart is empty. Please add items to order.")

        # Calculate total from cart items
        total = sum(
            _parse_price(item.get("price", "0")) * int(item.get("qty", 1))
            for item in cart_items
        )

        if errors:
            for err in errors:
                flash(err, "error")
            return render_template(
                "order.html",
                r=r,
                stripe_key=STRIPE_PUBLISHABLE_KEY,
                form=request.form,
            )

        # Create Stripe Checkout session
        line_items = []
        for item in cart_items:
            price_cents = int(_parse_price(item["price"]) * 100)
            if price_cents <= 0:
                continue
            line_items.append({
                "price_data": {
                    "currency": "eur",
                    "product_data": {"name": item["name"]},
                    "unit_amount": price_cents,
                },
                "quantity": int(item.get("qty", 1)),
            })

        if not line_items:
            flash("No valid items in cart.", "error")
            return render_template(
                "order.html",
                r=r,
                stripe_key=STRIPE_PUBLISHABLE_KEY,
                form=request.form,
            )

        # Store order data in the session for retrieval after payment
        order_data = {
            "restaurant_id": r["id"],
            "order_type": order_type,
            "customer_name": customer_name,
            "email": email,
            "phone": phone,
            "delivery_address": delivery_address,
            "items": json.dumps(cart_items),
            "total_amount": total,
            "special_requests": special_requests,
        }

        try:
            checkout_session = stripe.checkout.Session.create(
                payment_method_types=["card"],
                line_items=line_items,
                mode="payment",
                success_url=request.host_url.rstrip("/") + url_for("order_success") + "?session_id={CHECKOUT_SESSION_ID}",
                cancel_url=request.host_url.rstrip("/") + url_for("order_cancel", slug=r["id"]),
                customer_email=email,
                metadata={
                    "restaurant_id": r["id"],
                    "order_type": order_type,
                    "customer_name": customer_name,
                    "phone": phone,
                    "delivery_address": delivery_address,
                    "special_requests": special_requests,
                    "items": json.dumps(cart_items),
                },
            )
        except stripe.error.StripeError as e:
            flash(f"Payment error: {str(e)}", "error")
            return render_template(
                "order.html",
                r=r,
                stripe_key=STRIPE_PUBLISHABLE_KEY,
                form=request.form,
            )

        # Save the order with stripe session ID (status: awaiting_payment)
        db = get_db()
        cur = db.cursor()
        placeholders = ", ".join([_PH] * 12)
        cur.execute(
            f"""INSERT INTO orders
               (restaurant_id, order_type, customer_name, email, phone,
                delivery_address, items, total_amount, special_requests,
                status, stripe_session_id, created_at)
               VALUES ({placeholders})""",
            (
                r["id"],
                order_type,
                customer_name,
                email,
                phone,
                delivery_address,
                json.dumps(cart_items),
                total,
                special_requests,
                "awaiting_payment",
                checkout_session.id,
                datetime.utcnow().isoformat(),
            ),
        )
        db.commit()
        cur.close()

        return redirect(checkout_session.url)

    return render_template(
        "order.html",
        r=r,
        stripe_key=STRIPE_PUBLISHABLE_KEY,
        form={},
    )


@app.route("/order/success")
def order_success():
    session_id = request.args.get("session_id")
    if not session_id:
        return redirect(url_for("home"))

    try:
        checkout_session = stripe.checkout.Session.retrieve(session_id)
    except Exception:
        flash("Could not verify payment.", "error")
        return redirect(url_for("home"))

    if checkout_session.payment_status != "paid":
        flash("Payment not completed.", "error")
        return redirect(url_for("home"))

    # Update order status in DB
    db = get_db()
    cur = db.cursor()
    cur.execute(
        f"UPDATE orders SET status = 'confirmed' WHERE stripe_session_id = {_PH}",
        (session_id,),
    )
    db.commit()

    # Fetch order data for confirmation page and notifications
    cur.execute(
        f"SELECT * FROM orders WHERE stripe_session_id = {_PH}",
        (session_id,),
    )
    row = cur.fetchone()
    cur.close()

    if row:
        if USE_POSTGRES:
            order_data = {
                "restaurant_id": row[1],
                "order_type": row[2],
                "customer_name": row[3],
                "email": row[4],
                "phone": row[5],
                "delivery_address": row[6],
                "items": row[7],
                "total_amount": row[8],
                "special_requests": row[9],
            }
            order_id = row[0]
        else:
            order_data = {
                "restaurant_id": row["restaurant_id"],
                "order_type": row["order_type"],
                "customer_name": row["customer_name"],
                "email": row["email"],
                "phone": row["phone"],
                "delivery_address": row["delivery_address"],
                "items": row["items"],
                "total_amount": row["total_amount"],
                "special_requests": row["special_requests"],
            }
            order_id = row["id"]

        restaurant = get_restaurant(order_data["restaurant_id"])

        # Send notifications
        if restaurant:
            send_order_email(order_data, restaurant)
            send_order_sms(order_data, restaurant)
            send_customer_receipt(order_data, restaurant, order_id)

        items = json.loads(order_data["items"])
        return render_template(
            "order_success.html",
            order_id=order_id,
            order_data=order_data,
            items=items,
            restaurant=restaurant,
        )

    flash("Order not found.", "error")
    return redirect(url_for("home"))


@app.route("/order/cancel/<slug>")
def order_cancel(slug):
    r = get_restaurant(slug)
    if not r:
        abort(404)
    flash("Payment was cancelled. Your order has not been placed.", "error")
    return redirect(url_for("order", slug=slug))


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
