from fastapi import APIRouter, Request
from services.consent import log_consent, has_consent

router = APIRouter(
    prefix="/consent",
    tags=["Compliance"]
)

@router.post("/")
async def give_consent(payload: dict, request: Request):
    log_consent(payload["user_id"], request.client.host)
    return {"status": "Consent Logged"}

@router.get("/{user_id}")
async def check_consent(user_id: str):
    return {"consent": has_consent(user_id)}
