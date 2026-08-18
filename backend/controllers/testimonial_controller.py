import os
import uuid

from flask import jsonify, current_app, request

from models.testimonial_model import (
    create_testimonial,
    get_all_testimonials,
    get_testimonial_by_id,
    update_testimonial,
    delete_testimonial
)


def add_testimonial(data):
    client_name = data.get("client_name")
    company = data.get("company")
    designation = data.get("designation", "")
    review = data.get("review")
    rating = data.get("rating", 5)
    image = data.get("image", "")

    if not client_name or not company or not review:
        return jsonify({
            "success": False,
            "message": "Client Name, Company and Review are required."
        }), 400

    create_testimonial(
        client_name,
        company,
        designation,
        review,
        rating,
        image
    )

    return jsonify({
        "success": True,
        "message": "Testimonial added successfully."
    })


def view_testimonials():
    testimonials = get_all_testimonials()

    return jsonify({
        "success": True,
        "testimonials": testimonials
    })


def view_single_testimonial(testimonial_id):
    testimonial = get_testimonial_by_id(testimonial_id)

    if not testimonial:
        return jsonify({
            "success": False,
            "message": "Testimonial not found."
        }), 404

    return jsonify({
        "success": True,
        "testimonial": testimonial
    })


def edit_testimonial(testimonial_id, data):
    testimonial = get_testimonial_by_id(testimonial_id)

    if not testimonial:
        return jsonify({
            "success": False,
            "message": "Testimonial not found."
        }), 404

    update_testimonial(
        testimonial_id,
        data.get("client_name"),
        data.get("company"),
        data.get("designation"),
        data.get("review"),
        data.get("rating"),
        data.get("image"),
        data.get("status", "Active")
    )

    return jsonify({
        "success": True,
        "message": "Testimonial updated successfully."
    })


def remove_testimonial(testimonial_id):
    testimonial = get_testimonial_by_id(testimonial_id)

    if not testimonial:
        return jsonify({
            "success": False,
            "message": "Testimonial not found."
        }), 404

    delete_testimonial(testimonial_id)

    return jsonify({
        "success": True,
        "message": "Testimonial deleted successfully."
    })


def upload_testimonial_image(request):
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