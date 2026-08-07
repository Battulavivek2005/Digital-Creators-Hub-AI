from flask import Blueprint, request
from flask_jwt_extended import jwt_required

from controllers.portfolio_controller import (
    add_portfolio,
    view_portfolios,
    view_single_portfolio,
    edit_portfolio,
    remove_portfolio,
    upload_portfolio_image
)

portfolio_bp = Blueprint("portfolio", __name__)


# Upload Image
@portfolio_bp.route("/upload", methods=["POST"])
@jwt_required()
def upload_portfolio_image_route():
    return upload_portfolio_image(request)


# Add Portfolio
@portfolio_bp.route("/", methods=["POST"])
@jwt_required()
def create_portfolio_route():
    return add_portfolio(request.json)


# View All
@portfolio_bp.route("/", methods=["GET"])
def get_portfolios_route():
    return view_portfolios()


# View Single
@portfolio_bp.route("/<int:portfolio_id>", methods=["GET"])
def get_single_portfolio_route(portfolio_id):
    return view_single_portfolio(portfolio_id)


# Update
@portfolio_bp.route("/<int:portfolio_id>", methods=["PUT"])
@jwt_required()
def update_portfolio_route(portfolio_id):
    return edit_portfolio(portfolio_id, request.json)


# Delete
@portfolio_bp.route("/<int:portfolio_id>", methods=["DELETE"])
@jwt_required()
def delete_portfolio_route(portfolio_id):
    return remove_portfolio(portfolio_id)