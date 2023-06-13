from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from root import  mongo
from functools import wraps

mdb = mongo

def auth_required(**kwargs):
    isOptional = kwargs.get("isOptional", False)
    def wrapper(f):
        @jwt_required()
        @wraps(f)
        def decorated_function(*args, **kwargs):
            verify_jwt_in_request(optional=isOptional)
            uid = get_jwt_identity()
            user = mdb.users.find_one({"_id": uid})
        
            return f(*args, **kwargs, uid=uid, user=user)
        return decorated_function
    return wrapper

