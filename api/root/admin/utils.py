from flask_restful import Resource
from root import mongo
from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity


#mongo
mdb = mongo
class LazySelect(Resource):
    @jwt_required()
    def get(self):
        form = request.get_json()

        category = form.get('category')

        uid = get_jwt_identity()

        LazySelectList = []

        items = mdb[category].find({})
        for item in items:
            LazySelectList.append(item)


        return{
            "status": 1,
            "class" : "success",
            "message" : "Projects List",
            "payload" : LazySelectList
        }


def getUserType(uid):
    user = mdb.users.find_one({"_id": uid})
    return user["ut"]