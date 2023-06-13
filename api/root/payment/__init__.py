from flask import Blueprint
from flask_restful import Api

payment_bp = Blueprint('payment', __name__, url_prefix='/server/api')
payment_api = Api(payment_bp)

from . import __routes__