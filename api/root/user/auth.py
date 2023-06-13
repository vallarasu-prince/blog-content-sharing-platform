from flask_jwt_extended import create_access_token
from flask_restful import Resource
from flask import request
from root.libs.user_utils import dateTimeMeta, timestamp, uniqueId
from root.user.__schema__ import RegisterSchema
from root import mongo, bcrypt
from flask_jwt_extended import jwt_required, get_jwt_identity


#mongo
mdb = mongo
class Login(Resource):
    def post(self):
        data = request.get_json()
        email = data['email']
        password = data['password']

        authData = mdb.users.find_one({"email":email, "password": password})

        if authData and '_id' in authData:
            uid = authData['_id']

            access_token = create_access_token(identity=uid , expires_delta=False)

            return{
                "status": 1,
                "class" : "success",
                "message" : "Login Successfully",
                "token" : access_token,
                "type": 'account',
                "currentAuthority": 'admin',
                "payload" : {
                    "access" : authData["access"],
                     "token" : access_token,
                }
            }
        else:
            return{
                "status": 0,
                "class" : "error",
                "message" : "Invalid Email or Password"
            }
   


class Register(Resource):
    def post(self) :
        input = request.get_json(silent=True)
        form = RegisterSchema().load(input)

        generateUserId = uniqueId(form.get("username"))
        currentTime = timestamp()
        createdAt = dateTimeMeta(currentTime, 'created')


        data = {
            "_id" : generateUserId,
            "access" : "user",
            **form,
            **createdAt
        }

        mdb.users.insert_one(data)

        if data and '_id' in data:
            uid = data['_id']

            access_token = create_access_token(identity=uid , expires_delta=False)

            return{
                "status": 1,
                "class" : "success",
                "message" : "Registered Successfully",
                "payload" : {
                    "access" : data["access"],
                     "token" : access_token,
                }
            }
     