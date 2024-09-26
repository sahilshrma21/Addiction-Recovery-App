from fastapi import APIRouter, HTTPException
from config.db import *
from models.user_model import *
from passlib.context import CryptContext

user_router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

@user_router.post("/user/user-register", tags=["User Collection"])
def user_register(user_details: UserRegister):
    user_present = user_collection.find_one({"email": user_details.email})
    if user_present:
        raise HTTPException(status_code=409, detail="Email Already Exists")
    
    if len(str(user_details.contact)) != 10:
        raise HTTPException(status_code=400, detail="Mobile Number should be of 10 digits")
    
    if len(user_details.password) <= 6:
        raise HTTPException(status_code=400, detail="Password should be at least 6 characters long")
    
    # Hash the password before storing
    hashed_password = hash_password(user_details.password)
    user_details.password = hashed_password

    inserted_id = user_collection.insert_one(dict(user_details)).inserted_id
    return {"message": "User Registered Successfully", "id": str(inserted_id)}

@user_router.post("/user/user-login", tags=["User Collection"])
def user_login(user_login: UserLogin):
    user_present = user_collection.find_one({"email": user_login.email})
    if not user_present:
        raise HTTPException(status_code=401, detail="Invalid Credentials")
    
    # Verify the password
    if not verify_password(user_login.password, user_present["password"]):
        raise HTTPException(status_code=401, detail="Invalid Credentials")

    return {"message": "User Logged in Successfully"}
