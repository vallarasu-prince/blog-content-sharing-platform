from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from root import mongo
from root.libs.auth import auth_required

mdb = mongo

class DashboardUtils(Resource):
    @auth_required()
    def get(self, user, uid):
            
        usersCount = mdb.users.count_documents({})
        postsCount = mdb.posts.count_documents({})

        return {
            "status": 1,
            "class": "success",
            "message": "success",
            "payload": {
                "stats": [
                    {
                        "label": "Users",
                        "key": "users",
                        "count": usersCount
                    },
                    {
                        "label": "Posts",
                        "key": "posts",
                        "count": postsCount
                    }
                ]
        }
    }
        