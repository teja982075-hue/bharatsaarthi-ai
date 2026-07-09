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

        # Search by scheme name
        if scheme["name"].lower() in question:
            return {
                "scheme": scheme["name"],
                "category": scheme["category"],
                "description": scheme["description"],
                "eligibility": scheme["eligibility"],
                "benefits": scheme["benefits"],
                "documents": scheme["documents"],
                "official_website": scheme["official_website"]
            }

        # Search by keywords
        for keyword in scheme.get("keywords", []):
            if keyword.lower() in question:
                return {
                    "scheme": scheme["name"],
                    "category": scheme["category"],
                    "description": scheme["description"],
                    "eligibility": scheme["eligibility"],
                    "benefits": scheme["benefits"],
                    "documents": scheme["documents"],
                    "official_website": scheme["official_website"]
                }

    return {
        "message": "No matching scheme found"
    }


