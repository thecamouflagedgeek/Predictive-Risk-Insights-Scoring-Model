from pydantic import BaseModel

class BorrowerApplication(BaseModel):
    user_id: str
    lender_id: str
    epfo_months: int          # Months of employment consistency
    utility_repayment_rate: float  # 0.0 to 1.0 (1.0 = 100% on time)
    consent_given: bool
    comments: str  # Text input for sentiment analysis