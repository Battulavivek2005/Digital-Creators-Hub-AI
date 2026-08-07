import bcrypt
from flask_jwt_extended import create_access_token

from models.user_model import create_admin, get_admin_by_email


def register_admin(full_name, email, password, role="admin"):
    existing_admin = get_admin_by_email(email)

    if existing_admin:
        return {
            "success": False,
            "message": "Email already exists."
        }

    # Hash Password using bcrypt
    password_hash = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    create_admin(
        full_name,
        email,
        password_hash,
        role
    )

    return {
        "success": True,
        "message": "Admin created successfully."
    }


def login_admin(email, password):
    admin = get_admin_by_email(email)

    if not admin:
        return {
            "success": False,
            "message": "Invalid email or password."
        }

    stored_password = admin["password_hash"]

    # Verify Password
    if not bcrypt.checkpw(
        password.encode("utf-8"),
        stored_password.encode("utf-8")
    ):
        return {
            "success": False,
            "message": "Invalid email or password."
        }

    # Generate JWT Token
    access_token = create_access_token(
        identity=str(admin["id"]),
        additional_claims={
            "email": admin["email"],
            "role": admin["role"]
        }
    )

    return {
        "success": True,
        "message": "Login successful.",
        "access_token": access_token,
        "admin": {
            "id": admin["id"],
            "full_name": admin["full_name"],
            "email": admin["email"],
            "role": admin["role"]
        }
    }