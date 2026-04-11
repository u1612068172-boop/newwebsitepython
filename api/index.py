"""Vercel serverless entry point.

Vercel's @vercel/python builder looks for a WSGI `app` object in this file.
We simply re-export the Flask app defined in the project root.
"""
import os
import sys

# Make project root importable so `from app import app` works
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from app import app  # noqa: E402,F401
