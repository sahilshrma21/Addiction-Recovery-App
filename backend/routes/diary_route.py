import os
from fastapi import HTTPException,APIRouter
from pydantic import BaseModel
from bson import ObjectId
from datetime import datetime
import speech_recognition as sr
from pymongo import MongoClient

# MongoDB setup
MONGO_URI = "mongodb+srv://rohitsingh692004:gItvbSL4gGwtlXEb@cluster0.tac6wmj.mongodb.net/?retryWrites=true&w=majority&diary_routerName=Cluster0"
client = MongoClient(MONGO_URI)
db = client['Addiction_Recovery']
collection = db['audio_transcripts']

# Initialize FastAPI
diary_router = APIRouter(prefix="/diary", tags=["Diary"])
# Initialize speech recognizer
recognizer = sr.Recognizer()

# Pydantic models
class DiaryEntry(BaseModel):
    text: str

class UpdateDiaryEntry(BaseModel):
    text: str

# API Endpoints

# POST: Create a new diary entry (audio transcription to text)
@diary_router.post("/diary-entry")
async def create_diary_entry():
    # Capture audio from microphone
    with sr.Microphone() as source:
        recognizer.adjust_for_ambient_noise(source)
        try:
            print("Speak now...")
            audio = recognizer.listen(source, timeout=5)
            # Recognize speech
            text = recognizer.recognize_google(audio, language="en-IN")
            print(f"Recognized Text: {text}")
        except sr.WaitTimeoutError:
            raise HTTPException(status_code=408, detail="Timeout error: No speech detected.")
        except sr.UnknownValueError:
            raise HTTPException(status_code=400, detail="Speech was not recognized.")
        except sr.RequestError as e:
            raise HTTPException(status_code=500, detail=f"API error: {e}")

    # Save the text to MongoDB
    diary_entry = {
        "recognized_text": text,
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    result = collection.insert_one(diary_entry)
    
    return {"message": "Diary entry created", "id": str(result.inserted_id)}

# GET: Retrieve a single diary entry by ID
@diary_router.get("/diary-entry/{entry_id}")
async def get_diary_entry(entry_id: str):
    entry = collection.find_one({"_id": ObjectId(entry_id)})
    if not entry:
        raise HTTPException(status_code=404, detail="Entry not found")
    
    return {
        "id": str(entry["_id"]),
        "recognized_text": entry["recognized_text"],
        "timestamp": entry["timestamp"]
    }

# GET: Retrieve all diary entries
@diary_router.get("/diary-entries")
async def get_all_diary_entries():
    entries = collection.find()
    all_entries = [{"id": str(entry["_id"]), "recognized_text": entry["recognized_text"], "timestamp": entry["timestamp"]} for entry in entries]
    return all_entries

# PUT: Update a diary entry by ID
@diary_router.put("/diary-entry/{entry_id}")
async def update_diary_entry(entry_id: str, update: UpdateDiaryEntry):
    updated_entry = collection.find_one_and_update(
        {"_id": ObjectId(entry_id)},
        {"$set": {"recognized_text": update.text}},
        return_document=True
    )
    if not updated_entry:
        raise HTTPException(status_code=404, detail="Entry not found")
    
    return {"message": "Diary entry updated", "updated_entry": update.text}

# DELETE: Delete a diary entry by ID
@diary_router.delete("/diary-entry/{entry_id}")
async def delete_diary_entry(entry_id: str):
    result = collection.delete_one({"_id": ObjectId(entry_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Entry not found")
    
    return {"message": "Diary entry deleted"}

# To run the server: uvicorn main:diary_router --reload
