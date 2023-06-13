from root.config import  MONGO_URI, MONGODB_DB
from pymongo import MongoClient


def MongoDB():
    client = MongoClient(MONGO_URI)
    db = client[MONGODB_DB]
    return db
