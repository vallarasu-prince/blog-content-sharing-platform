import os


TITLE = "Blogeee"

## MongoDB Config
MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
MONGODB_DB = 'blog'
MONGO_URI = 'mongodb://localhost:27017'

## Cloudinary Config
CLOUD_NAME =""
API_KEY= ""
API_SECRET= ""

## Razorpay Config
RAZORPAY_KEY = ""
RAZORPAY_SECRET = ""

## OpenAI Config
OPENAI_KEY = ""

## File paths
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
POST_UPLOAD_FOLDER = os.path.join(ROOT_DIR, "uploads", "posts")