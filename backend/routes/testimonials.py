from flask import Blueprint, request
from flask_jwt_extended import jwt_required

from controllers.testimonial_controller import (
    add_testimonial,
    view_testimonials,
    view_single_testimonial,
    edit_testimonial,
    remove_testimonial,
    upload_testimonial_image,
)

testimonials_bp = Blueprint("testimonials", __name__)


# Upload Image
@testimonials_bp.route("/upload", methods=["POST"])
@jwt_required()
def upload_testimonial_image_route():
    return upload_testimonial_image(request)


# Add Testimonial
@testimonials_bp.route("/", methods=["POST"])
@jwt_required()
def create_testimonial_route():
    return add_testimonial(request.json)


# View All Testimonials
@testimonials_bp.route("/", methods=["GET"])
def get_testimonials_route():
    return view_testimonials()


# View Single Testimonial
@testimonials_bp.route("/<int:testimonial_id>", methods=["GET"])
def get_single_testimonial_route(testimonial_id):
    return view_single_testimonial(testimonial_id)


# Update Testimonial
@testimonials_bp.route("/<int:testimonial_id>", methods=["PUT"])
@jwt_required()
def update_testimonial_route(testimonial_id):
    return edit_testimonial(testimonial_id, request.json)


# Delete Testimonial
@testimonials_bp.route("/<int:testimonial_id>", methods=["DELETE"])
@jwt_required()
def delete_testimonial_route(testimonial_id):
    return remove_testimonial(testimonial_id)