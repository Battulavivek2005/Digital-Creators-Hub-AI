import os
import uuid

from flask import current_app, jsonify, request
from models.portfolio_model import (
    create_portfolio,
    get_all_portfolios,
    get_portfolio_by_id,
    update_portfolio,
    delete_portfolio
)


def add_portfolio(data):
    title = data.get("title")
    description = data.get("description")
    category = data.get("category")
    image = data.get("image", "")
    project_url = data.get("project_url", "")
    featured = data.get("featured", "No")

    if not title or not description or not category:
        return jsonify({
            "success": False,
            "message": "Title, Description and Category are required."
        }), 400

    create_portfolio(
        title,
        description,
        category,
        image,
        project_url,
        featured
    )

    return jsonify({
        "success": True,
        "message": "Portfolio project added successfully."
    })


def view_portfolios():
    portfolios = get_all_portfolios()

    return jsonify({
        "success": True,
        "portfolios": portfolios
    })


def view_single_portfolio(portfolio_id):
    portfolio = get_portfolio_by_id(portfolio_id)

    if not portfolio:
        return jsonify({
            "success": False,
            "message": "Portfolio project not found."
        }), 404

    return jsonify({
        "success": True,
        "portfolio": portfolio
    })


def edit_portfolio(portfolio_id, data):
    portfolio = get_portfolio_by_id(portfolio_id)

    if not portfolio:
        return jsonify({
            "success": False,
            "message": "Portfolio project not found."
        }), 404

    update_portfolio(
        portfolio_id,
        data.get("title"),
        data.get("description"),
        data.get("category"),
        data.get("image"),
        data.get("project_url"),
        data.get("featured", "No"),
        data.get("status", "Active")
    )

    return jsonify({
        "success": True,
        "message": "Portfolio project updated successfully."
    })


def remove_portfolio(portfolio_id):
    portfolio = get_portfolio_by_id(portfolio_id)

    if not portfolio:
        return jsonify({
            "success": False,
            "message": "Portfolio project not found."
        }), 404

    delete_portfolio(portfolio_id)

    return jsonify({
        "success": True,
        "message": "Portfolio project deleted successfully."
    })


def upload_portfolio_image(request):
    if "image" not in request.files:
        return jsonify({
            "success": False,
            "message": "No image selected."
        }), 400

    image = request.files["image"]

    if image.filename == "":
        return jsonify({
            "success": False,
            "message": "No image selected."
        }), 400

    if "." not in image.filename:
        return jsonify({
            "success": False,
            "message": "Invalid image file."
        }), 400

    extension = image.filename.rsplit(".", 1)[1].lower()

    filename = f"{uuid.uuid4()}.{extension}"

    filepath = os.path.join(
        current_app.config["UPLOAD_FOLDER"],
        filename
    )

    image.save(filepath)

    image_url = f"{request.host_url.rstrip('/')}/uploads/{filename}"

    return jsonify({
        "success": True,
        "image": filename,
        "image_url": image_url
    })