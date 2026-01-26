from fastapi import APIRouter
from schemas import BorrowerApplication
from services.weightedsystem import calculate_score_logic # Import here
from services.sentiment_analysis import vibe_check

router = APIRouter(prefix="/scoring")

@router.post("/calculate")
async def get_score(data: BorrowerApplication):
    # Call the service
    final_score, insights = calculate_score_logic(
        data.epfo_months, 
        data.utility_repayment_rate
    )
    
    # Analyze sentiment
    sentiment = vibe_check(data.some_text_field)  # Replace with the actual text field
    
    return {
        "user_id": data.user_id,
        "lender_id": data.lender_id,
        "score": final_score,
        "transparency_report": insights,
        "sentiment": sentiment
    }