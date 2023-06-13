from flask_restful import Resource
from flask_jwt_extended import  get_jwt_identity
from root import  mongo
from flask import Flask, request as flask_request
from root.admin.__schema__ import AddUserSchema
from root.libs.auth import auth_required
from root.libs.user_utils import dateTimeMeta, timestamp, uniqueId


mdb = mongo


class UsersList(Resource):
    @auth_required()
    def get(self, uid, user):
        data = []

        for user in mdb.users.find({}):
            data.append(user) 

        return {
            "status":1,
            "class": "success",
            "message" :"users data fetched successfully",
            "payload": data

        }   

class AddUser(Resource):
    @auth_required()
    def post(self, uid, user):
        input = flask_request.get_json()

        form = AddUserSchema().load(input)
        userId = form.get('_id')

        username = form.get("username")
        photoUrl = form.get("photoUrl") if form.get("photoUrl") else "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"

        currentTime = timestamp()
        createdAt = dateTimeMeta(currentTime, 'created') if userId == "new" else dateTimeMeta(currentTime, 'updated')

        if userId == "new":
            email = form.get("email")
            user = mdb.users.find_one({"email": email})

            if user:
                return {
                    "status": 0,
                    "class": "danger",
                    "message": "Email Already Exists",
                    "payload": {}
                }

        if userId == "new":
            data = {
                "_id": uniqueId(username),
                "photoUrl": photoUrl,
                **form,
                **createdAt
            }

            mdb.users.insert_one(data)

            return{
                "status": 1,
                "class": "success",
                "message": "User Added Successfully",
                "payload": {}

            }
        
        mdb.users.update_one({'_id': form.get("_id")}, {'$set': form})

        return {
            "status": 1,
            "class": "success",
            "message": "User Details Updated Successfully",
            "payload": {}
        } 