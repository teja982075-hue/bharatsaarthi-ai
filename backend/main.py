from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

# CORS fix (frontend + backend connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load schemes once
with open("data/schemes.json", "r", encoding="utf-8") as file:
    schemes = json.load(file)


# Request model
class Question(BaseModel):
    question: str


# Home route
@app.get("/")
def home():
    return {
        "message": "Welcome to BharatSaarthi AI",
        "status": "Backend is running successfully!"
    }


# Health check
@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


# Main API
@app.post("/ask")
def ask_question(data: Question):

    question = data.question.lower()

    for scheme in schemes:
        if scheme["name"].lower() in question:
            return {
                "scheme": scheme.get("name", ""),
                "category": scheme.get("category", ""),
                "description": scheme.get("description", ""),
                "eligibility": scheme.get("eligibility", ""),
                "benefits": scheme.get("benefits", ""),
                "documents": scheme.get("documents", []),
                "official_website": scheme.get("official_website", "")
            }

    return {
        "scheme": None,
        "message": "No matching scheme found"
    }


