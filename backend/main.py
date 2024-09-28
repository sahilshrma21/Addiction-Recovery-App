from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.user_route import user_router
from routes.diary_route import diary_router


app = FastAPI(title = "Addiction Recovery",
              docs_url="/api")

origins = ["http://localhost:5173/"]

@app.get("/")
def read_root():
    return {"message":"Welcome to Addiction Recovery App"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(user_router)
app.include_router(diary_router)