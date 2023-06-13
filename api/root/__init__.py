from flask_jwt_extended import JWTManager
from root.config import API_KEY, API_SECRET, CLOUD_NAME
from root.db import MongoDB
from flask_restful import Api
from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt

import cloudinary
import cloudinary.uploader

api = Api()

mongo = MongoDB()
bcrypt = Bcrypt()

cloud = cloudinary.uploader.upload


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!

    cloudinary.config(cloud_name = CLOUD_NAME, api_key= API_KEY, api_secret=API_SECRET)

    cors = CORS(app, resources={r"/*": {"origins": "*"}})

    from root.user import user_bp
    app.register_blueprint(user_bp)

    from root.admin import users_bp
    app.register_blueprint(users_bp)

    from root.payment import payment_bp
    app.register_blueprint(payment_bp)

    from root.post import post_bp
    app.register_blueprint(post_bp)
    
    api.init_app(app)
    jwt = JWTManager(app)
    
    if __name__ == '__main__':
        app.run(debug=True)

    return app