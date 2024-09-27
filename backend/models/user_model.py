from pydantic import BaseModel,Field
from typing import Optional
from datetime import datetime
class UserRegister(BaseModel):
    first_name : str
    last_name:str
    email: str
    contact:int
    password: str

class UserLogin(BaseModel):
    email:str
    password:str

class UserProfile(BaseModel):
    height: int
    weight: int
    addiction_type: str  # E.g., Alcohol, Smoking, Gaming, etc.
    time_spent: float = Field(..., description="Time spent on the addiction per day in hours")
    quantity_consumed: float = Field(..., description="Quantity of the substance or activity per day")
    recovery_goal: Optional[str] = Field(None, description="User's goal for addiction recovery")
    start_date: Optional[datetime] = Field(None, description="Date when the user started recovery")
    end_date: Optional[datetime] = Field(None, description="Date when the user aims to fully recover")
    