from flask import Blueprint, request
from flask_jwt_extended import jwt_required

from controllers.service_controller import (
    add_service,
    view_services,
    view_single_service,
    edit_service,
    remove_service
)

services_bp = Blueprint("services", __name__)


# Add Service (Admin Only)
@services_bp.route("/", methods=["POST"])
@jwt_required()
def create_service_route():
    return add_service(request.json)


# View All Services (Public)
@services_bp.route("/", methods=["GET"])
def get_services_route():
    return view_services()


# View Single Service (Public)
@services_bp.route("/<int:service_id>", methods=["GET"])
def get_single_service_route(service_id):
    return view_single_service(service_id)


# Update Service (Admin Only)
@services_bp.route("/<int:service_id>", methods=["PUT"])
@jwt_required()
def update_service_route(service_id):
    return edit_service(service_id, request.json)


# Delete Service (Admin Only)
@services_bp.route("/<int:service_id>", methods=["DELETE"])
@jwt_required()
def delete_service_route(service_id):
    return remove_service(service_id)