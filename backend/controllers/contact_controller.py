from flask import jsonify
from models.contact_model import (
    create_contact,
    get_all_contacts,
    get_contact_by_id,
    update_contact_status,
    delete_contact
)


def submit_contact(data):
    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone", "")

    # Frontend sends "service", backend also accepts "subject"
    subject = data.get("service") or data.get("subject")

    message = data.get("message")

    if not name or not email or not subject or not message:
        return jsonify({
            "success": False,
            "message": "Name, Email, Service and Message are required."
        }), 400

    create_contact(
        name=name,
        email=email,
        phone=phone,
        subject=subject,
        message=message
    )

    return jsonify({
        "success": True,
        "message": "Contact message submitted successfully."
    })
def view_contacts():
    contacts = get_all_contacts()

    return jsonify({
        "success": True,
        "contacts": contacts
    })


def view_single_contact(contact_id):
    contact = get_contact_by_id(contact_id)

    if not contact:
        return jsonify({
            "success": False,
            "message": "Contact message not found."
        }), 404

    return jsonify({
        "success": True,
        "contact": contact
    })


def edit_contact_status(contact_id, data):
    contact = get_contact_by_id(contact_id)

    if not contact:
        return jsonify({
            "success": False,
            "message": "Contact message not found."
        }), 404

    status = data.get("status", "New")
    update_contact_status(contact_id, status)

    return jsonify({
        "success": True,
        "message": "Contact status updated successfully."
    })


def remove_contact(contact_id):
    contact = get_contact_by_id(contact_id)

    if not contact:
        return jsonify({
            "success": False,
            "message": "Contact message not found."
        }), 404

    delete_contact(contact_id)

    return jsonify({
        "success": True,
        "message": "Contact message deleted successfully."
    })