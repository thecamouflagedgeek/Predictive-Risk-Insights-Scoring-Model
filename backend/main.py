from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import scoring

# Initialize the FastAPI App
app = FastAPI(
    title="Multi-modal Credit Engine",
    description="AI-driven credit scoring for thin-file borrowers using EPFO and Alternative data.",
    version="1.0.0"
)

# 1. Setup CORS (Cross-Origin Resource Sharing)
# This allows your Borrower and Lender frontend apps to talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace "*" with your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Include Feature Routers
# As you build more features (Fraud, Sentiment, etc.), you just add their routers here
app.include_router(scoring.router)

# 3. Basic Health Check
@app.get("/", tags=["Health"])
async def health_check():
    """
    Checks if the API is alive.
    """
    return {
        "status": "online",
        "message": "Credit Engine API is active",
        "supported_features": [
            "Alternative Credit Scoring",
            "EPFO Verification Logic",
            "Transparency Insights"
        ]
    }

# This section allows you to run it directly using 'python app/main.py'
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)