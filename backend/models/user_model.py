from pydantic import BaseModel

class UserRegister(BaseModel):
    first_name : str
    last_name:str
    email: str
    contact:int
    password: str

class UserLogin(BaseModel):
    email:str
    password:str