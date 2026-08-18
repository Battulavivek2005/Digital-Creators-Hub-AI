import os
from dotenv import load_dotenv

# Load environment variables from backend/.env
load_dotenv()

# Base directory of the backend project
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# SQLite Database Path
DATABASE_PATH = os.path.join(
    BASE_DIR,
    "database",
    "digital_creators_hub.db"
)

# Flask Secret Key
SECRET_KEY = os.getenv("SECRET_KEY")

# JWT Secret Key
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

# Upload Folder
UPLOAD_FOLDER = os.path.join(
    BASE_DIR,
    "uploads"
)

# Make sure required secrets exist
if not SECRET_KEY:
    raise RuntimeError("SECRET_KEY is not configured in backend/.env")

if not JWT_SECRET_KEY:
    raise RuntimeError("JWT_SECRET_KEY is not configured in backend/.env")