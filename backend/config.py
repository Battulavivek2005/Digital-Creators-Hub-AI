import os

# Base directory of the backend project
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# SQLite Database Path
DATABASE_PATH = os.path.join(BASE_DIR, "database", "digital_creators_hub.db")

# Flask Secret Key
SECRET_KEY = "digital_creators_hub_secret_key"

# JWT Secret Key
JWT_SECRET_KEY = "dch_jwt_secret_key_2026"

# Upload Folder
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")