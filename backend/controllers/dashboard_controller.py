from flask import jsonify
from models.dashboard_model import get_dashboard_counts


def dashboard_summary():
    data = get_dashboard_counts()

    return jsonify({
        "success": True,
        "dashboard": data
    })