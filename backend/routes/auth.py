from flask import Blueprint, request, jsonify
from controllers.auth_controller import register_admin, login_admin

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    result = register_admin(
        data["full_name"],
        data["email"],
        data["password"],
        data.get("role", "admin")
    )

    return jsonify(result)


@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    result = login_admin(
        data["email"],
        data["password"]
    )

    return jsonify(result)


@auth_bp.route("/", methods=["GET"])
def home():
    return jsonify({
        "module": "Authentication",
        "status": "Ready"
    })