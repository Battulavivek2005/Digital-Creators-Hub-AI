from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from datetime import timedelta
import os

from config import SECRET_KEY, JWT_SECRET_KEY, UPLOAD_FOLDER

# Import Blueprints
from routes.auth import auth_bp
from routes.services import services_bp
from routes.portfolio import portfolio_bp
from routes.testimonials import testimonials_bp
from routes.contact import contact_bp
from routes.dashboard import dashboard_bp

app = Flask(__name__)

# Configuration
app.config["SECRET_KEY"] = SECRET_KEY
app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=8)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Initialize JWT
jwt = JWTManager(app)

# Enable CORS
CORS(app)

# Create uploads folder automatically
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(services_bp, url_prefix="/api/services")
app.register_blueprint(portfolio_bp, url_prefix="/api/portfolio")
app.register_blueprint(testimonials_bp, url_prefix="/api/testimonials")
app.register_blueprint(contact_bp, url_prefix="/api/contact")
app.register_blueprint(dashboard_bp, url_prefix="/api/dashboard")


@app.route("/")
def home():
    return jsonify({
        "project": "Digital Creators Hub API",
        "version": "1.0",
        "status": "Running Successfully"
    })


@app.route("/health")
def health():
    return jsonify({
        "status": "OK",
        "message": "Backend is working successfully."
    })


# Serve uploaded images
@app.route("/uploads/<path:filename>")
def uploaded_file(filename):
    return send_from_directory(
        app.config["UPLOAD_FOLDER"],
        filename
    )


if __name__ == "__main__":
    app.run(debug=True, port=5000)