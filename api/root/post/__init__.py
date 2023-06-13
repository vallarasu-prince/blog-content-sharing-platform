from flask import Blueprint
from flask_restful import Api

post_bp = Blueprint('post', __name__, url_prefix='/server/api')
post_api = Api(post_bp)

from . import __routes__
