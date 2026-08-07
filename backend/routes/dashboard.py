from flask import Blueprint
from flask_jwt_extended import jwt_required

from controllers.dashboard_controller import dashboard_summary

dashboard_bp = Blueprint("dashboard", __name__)


@dashboard_bp.route("/", methods=["GET"])
@jwt_required()
def get_dashboard():
    return dashboard_summary()