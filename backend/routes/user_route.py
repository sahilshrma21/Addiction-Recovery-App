from fastapi import APIRouter, HTTPException, Depends, status
import jwt
from datetime import datetime, timedelta
from typing import Optional
from pydantic import BaseModel
from config.db import user_collection
from models.user_model import UserRegister, UserLogin, UserProfile
from passlib.context import CryptContext
import re
import uuid
# JWT configurations


# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
user_router = APIRouter()

# Helper functions for hashing and verifying passwords
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# User registration route
@user_router.post("/user/user-register", tags=["User Collection"])
def user_register(user_details: UserRegister):
    user_dict = dict(user_details)
    user_present = user_collection.find_one({"email": user_details.email})
    if user_present:
        raise HTTPException(status_code=409, detail="Email Already Exists")
    
    if len(str(user_details.contact)) != 10:
        raise HTTPException(status_code=400, detail="Mobile Number should be of 10 digits")
    
    if len(user_details.password) <= 6:
        raise HTTPException(status_code=400, detail="Password should be at least 6 characters long")
    if not re.search(r"(\w{1,})@([a-z]+).([a-z]+)", user_details.email):
        raise HTTPException(status_code=400, detail="Invalid Email Address")
    
    user_dict.update(
        {
            "token":str(uuid.uuid4()),
            "verified":False,
            "height": None,
            "weight": None,
            "addiction_type": None,
            "time_spent": None,
            "quantity_consumed": None,
            "recovery_goal": None,
            "start_date": None,
            "end_date": None
        }
    )
    # Hash the password before storing
    hashed_password = hash_password(user_details.password)
    user_dict["password"] = hashed_password

    inserted_id = user_collection.insert_one(user_dict).inserted_id
    return {"message": "User Registered Successfully", "id": str(inserted_id)}
# User login route
@user_router.post("/user/user-login", tags=["User Collection"])
def user_login(user_login: UserLogin):
    user_present = user_collection.find_one({"email": user_login.email})
    if not user_present:
        raise HTTPException(status_code=401, detail="Invalid Credentials")

    # Verify the password
    if not verify_password(user_login.password, user_present["password"]):
        raise HTTPException(status_code=401, detail="Invalid Credentials")
    
    return {"message": "User Logged in Successfully"}
# Token verification route
@user_router.get("/user/verify-token", tags=["User Collection"])
def verify_user_token(token: str):
    user_info = user_collection.find_one({"token":token})
    if user_info is None:
        raise HTTPException(status_code=401, detail="Invalid Token")
    if user_info["verified"]:
        return{"message":"Already Verified!"}
    user_collection.find_one_and_update({"token":token},{"$set":{"verified":True}})
    return {"message": "User Verified Successfully"}

# User profile model
# class UserProfile(BaseModel):
#     name: str
#     dob: str  # DD/MM/YYYY format
#     height: float  # in cm
#     weight: float  # in kg
#     addiction: str  # Type of addiction (e.g., alcohol, smoking, drugs)
#     consumption_per_day: float  # Amount of substance consumed per day
#     started_addiction: int  # Year when they started the addiction
#     goal: Optional[str] = None  # Recovery goal (e.g., reduce, quit)

# Profile submission route (protected with token)
@user_router.post("/user/fill-profile/{Token}", tags=["User Collection"])
def fill_user_profile(user_profile: UserProfile, Token: str):
    try:
        user_info = user_collection.find_one({"token":Token})
        if user_info is None:
            raise HTTPException(status_code=401, detail="Invalid Token")
        if not user_info["verified"]:
            raise HTTPException(status_code=401,detail="Please Verify your email")
        
        update_result = user_collection.update_one({"token":Token},{"$set":dict(user_profile)})

        return{
            "message":f"Update Result:{update_result.acknowledged}"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
