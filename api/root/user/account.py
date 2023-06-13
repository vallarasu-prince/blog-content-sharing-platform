from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_restful import Resource
from root import mongo



mdb = mongo

class CurrentUser(Resource):
    @jwt_required(optional=True)
    def get(self):

        if not get_jwt_identity():
            return {
                "status": 0,
                "class" : "danger",
                "message" : "Please login !"
            }

        uid = get_jwt_identity()

        filter = { "_id": uid }

        data = mdb.users.find_one(filter)
        

        if data is None:
            return {
                "status": 0,
                "class" : "danger",
                "message" : "Please login !"
            }

        return {
            "status":1,
            "class":"success",
            "message":"Details fetched successfully !",
            "payload" : data
        }
