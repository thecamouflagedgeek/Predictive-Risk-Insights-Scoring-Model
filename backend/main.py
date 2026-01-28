from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import scoring, sentiment, document, explain, fraud, consent, risk_assessment

app = FastAPI(
    title="Multi-modal Credit Engine",
    description="AI-driven credit scoring for thin-file borrowers using EPFO and Alternative data.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(scoring.router)
app.include_router(sentiment.router)
app.include_router(document.router)
app.include_router(explain.router)
app.include_router(fraud.router)
app.include_router(consent.router)
app.include_router(risk_assessment.router)


# 3. Basic Health Check
@app.get("/", tags=["Health"])
async def health_check():
    """
    Checks if the API is alive.
    """
    return {
        "status": "online",
        "message": "PRISM Backend",
        "supported_features": [
            "Alternative Credit Scoring",
            "EPFO Verification Logic",
            "Transparency Insights"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)