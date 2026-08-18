from flask_jwt_extended import jwt_required
from flask import Blueprint, request

from controllers.contact_controller import (
    submit_contact,
    view_contacts,
    view_single_contact,
    edit_contact_status,
    remove_contact
)

contact_bp = Blueprint("contact", __name__)


# =========================================================
# PUBLIC - Submit Contact Form
# =========================================================

@contact_bp.route("/", methods=["POST"])
def create_contact_route():
    return submit_contact(request.json)


# =========================================================
# ADMIN - View All Contact Messages
# =========================================================

@contact_bp.route("/", methods=["GET"])
@jwt_required()
def get_contacts_route():
    return view_contacts()


# =========================================================
# ADMIN - View Single Contact Message
# =========================================================

@contact_bp.route("/<int:contact_id>", methods=["GET"])
@jwt_required()
def get_single_contact_route(contact_id):
    return view_single_contact(contact_id)


# =========================================================
# ADMIN - Update Contact Status
# =========================================================

@contact_bp.route("/<int:contact_id>", methods=["PUT"])
@jwt_required()
def update_contact_route(contact_id):
    return edit_contact_status(contact_id, request.json)


# =========================================================
# ADMIN - Delete Contact Message
# =========================================================

@contact_bp.route("/<int:contact_id>", methods=["DELETE"])
@jwt_required()
def delete_contact_route(contact_id):
    return remove_contact(contact_id)