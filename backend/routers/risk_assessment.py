from fastapi import APIRouter
from pydantic import BaseModel
from schemas import BorrowerApplication
from services.risk_assessment import calculate_risk_assessment

router = APIRouter(prefix="/risk")

# Request model for risk assessment
class RiskAssessmentRequest(BaseModel):
    user_id: str
    lender_id: str
    score: int
    epfo_months: int
    utility_repayment_rate: float
    sentiment: str = None
    document_risk_level: str = None

@router.post("/assess")
async def assess_risk(data: BorrowerApplication, document_risk_level: str = None):
    """
    Assess the overall risk profile of a borrower.
    
    Takes the same data as scoring endpoint plus optional document risk level.
    Returns comprehensive risk assessment with recommendations.
    """
    
    # Perform risk assessment (document_risk_level would typically come from document service)
    risk_assessment = calculate_risk_assessment(
        score=600,  # Will be calculated from score endpoint in real flow
        epfo_months=data.epfo_months,
        utility_repayment_rate=data.utility_repayment_rate,
        sentiment=None,  # Will be analyzed from comments
        document_risk_level=document_risk_level
    )
    
    return {
        "user_id": data.user_id,
        "lender_id": data.lender_id,
        "risk_assessment": risk_assessment
    }


@router.post("/assess-full")
async def assess_risk_full(request: RiskAssessmentRequest):
    """
    Full risk assessment endpoint that takes pre-calculated score and sentiment.
    More useful when called after scoring endpoint has already processed the data.
    """
    
    risk_assessment = calculate_risk_assessment(
        score=request.score,
        epfo_months=request.epfo_months,
        utility_repayment_rate=request.utility_repayment_rate,
        sentiment=request.sentiment,
        document_risk_level=request.document_risk_level
    )
    
    return {
        "user_id": request.user_id,
        "lender_id": request.lender_id,
        "risk_assessment": risk_assessment
    }
