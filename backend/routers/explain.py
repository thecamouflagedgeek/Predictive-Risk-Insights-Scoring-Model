from fastapi import APIRouter
from services.explain_simple import generate_explanations

router = APIRouter(
    prefix="/explain",
    tags=["Explainability"]
)

@router.post("/")
async def explain_score(payload: dict):
    reasons = generate_explanations(payload)
    return {"reasons": reasons}
