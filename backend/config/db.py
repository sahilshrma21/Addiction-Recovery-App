from pymongo import MongoClient
from pydantic import BaseModel

client = MongoClient(
    "mongodb+srv://rohitsingh692004:gItvbSL4gGwtlXEb@cluster0.tac6wmj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)

db = client.Addiction_Recovery
user_collection = db["user_collection"]