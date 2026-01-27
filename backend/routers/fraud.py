from fastapi import APIRouter
from services.fraud_simple import log_application, check_loan_stacking

router = APIRouter(
    prefix="/fraud",
    tags=["Fraud Detection"]
)

@router.post("/log")
async def log(payload: dict):
    log_application(payload["phone"], payload["pan"])
    return {"status": "logged"}

@router.post("/check")
async def check(payload: dict):
    return check_loan_stacking(payload["phone"], payload["pan"])
