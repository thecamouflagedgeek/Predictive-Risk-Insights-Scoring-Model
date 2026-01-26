from fastapi import APIRouter
from pydantic import BaseModel
from services.sentiment_analysis import vibe_check

router = APIRouter(prefix="/sentiment")


class SentimentRequest(BaseModel):
    text: str


@router.post("/vibe-check")
async def analyze_sentiment(request: SentimentRequest):
    """
    Analyze the sentiment of the provided text using the Vibe Check feature.
    
    Returns:
    - 'Red Flag': More red flag words detected
    - 'Green Flag': More green flag words detected
    - 'Neutral': Equal red and green flags or none detected
    """
    sentiment = vibe_check(request.text)
    
    return {
        "text": request.text,
        "sentiment": sentiment,
        "message": f"Sentiment analysis complete: {sentiment}"
    }
