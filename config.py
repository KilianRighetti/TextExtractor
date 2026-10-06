import os
from dotenv import load_dotenv

load_dotenv()

OCR_API_KEY = os.getenv("OCR_API_KEY")
OCR_BASE_URL = os.getenv("OCR_BASE_URL")

UPLOAD_FOLDER = "uploads"

ALLOWED_EXTENSIONS = {"bmp", "jpg", "jpeg", "png", "tif", "tiff", "webp"}