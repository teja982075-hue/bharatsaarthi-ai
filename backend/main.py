from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {
        "message": "Welcome to BharatSaarthi AI",
        "status": "Backend is running successfully!"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }