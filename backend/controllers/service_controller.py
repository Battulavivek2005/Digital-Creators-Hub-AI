from flask import jsonify
from models.service_model import (
    create_service,
    get_all_services,
    get_service_by_id,
    update_service,
    delete_service
)


def add_service(data):
    title = data.get("title")
    description = data.get("description")
    icon = data.get("icon", "")
    image = data.get("image", "")

    if not title or not description:
        return jsonify({
            "success": False,
            "message": "Title and Description are required."
        }), 400

    create_service(title, description, icon, image)

    return jsonify({
        "success": True,
        "message": "Service added successfully."
    })


def view_services():
    services = get_all_services()

    return jsonify({
        "success": True,
        "services": services
    })


def view_single_service(service_id):
    service = get_service_by_id(service_id)

    if not service:
        return jsonify({
            "success": False,
            "message": "Service not found."
        }), 404

    return jsonify({
        "success": True,
        "service": service
    })


def edit_service(service_id, data):
    service = get_service_by_id(service_id)

    if not service:
        return jsonify({
            "success": False,
            "message": "Service not found."
        }), 404

    update_service(
        service_id,
        data.get("title"),
        data.get("description"),
        data.get("icon"),
        data.get("image"),
        data.get("status", "Active")
    )

    return jsonify({
        "success": True,
        "message": "Service updated successfully."
    })


def remove_service(service_id):
    service = get_service_by_id(service_id)

    if not service:
        return jsonify({
            "success": False,
            "message": "Service not found."
        }), 404

    delete_service(service_id)

    return jsonify({
        "success": True,
        "message": "Service deleted successfully."
    })