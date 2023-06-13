from datetime import datetime
from random import randint, random
from time import time

from root import mongo, bcrypt

mdb = mongo

def userCreator(data, currentTime=None):

        _id = uniqueId(data=data)
        photourl = data.get("photourl")
        username = data.get("username")
        firstname = data.get("firstname")
        lastname = data.get("lastname")
        mobile = data.get("mobile")
        email = data.get("email")
        gender = data.get("gender")
        password = data.get("password")
        status = 1
        currentTime = currentTime

        # pw_hash = bcrypt.generate_password_hash(password).decode("utf-8")

        userData = {

            "_id" : _id,
            "photourl" : photourl,
            "username" : username,
            "ut": "user",
            "firstname" : firstname,
            "lastname" : lastname,
            "mobile" : mobile,
            "email" : email,
            "gender" : gender,
            "password": password,
            "createdAt": currentTime,
            "status" : status


        }


        mdb.users.insert_one(userData)
            
        return{
                "status": 1,
                "class": "success",
                "message": "Registered Successfully"
            }


def uniqueId(data):
    id = randint(0, 2000000)
    _id = f"{data}_{id}"

    return _id


import calendar
import datetime
 
# Date to timestamp
def timestamp():
    date = datetime.datetime.utcnow()
    timestamp = calendar.timegm(date.utctimetuple())
    ts = int(timestamp)
    return ts

# Create a timestamp converter function
def datefromtimestamp(timestamp, format="%Y-%m-%d %H:%M:%S"):
    from datetime import datetime
    date = datetime.utcfromtimestamp(timestamp).strftime(format)
    return date

def dateTimeMeta(data, prefix="created"):
    data = {
         f"{prefix}AtUnix" : data,
         f"{prefix}At" : datefromtimestamp(data, "%d/%m/%Y"),
    }
    return data



