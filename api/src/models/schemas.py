from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any


class CreditApplicationRequest(BaseModel):
    """Request model for credit application evaluation."""
    name: str = Field(..., min_length=1, description="Applicant's full name")
    age: int = Field(..., ge=18, le=120, description="Applicant's age")
    monthly_income: float = Field(..., ge=0, description="Monthly income in MXN")
    monthly_debt: float = Field(..., ge=0, description="Current monthly debt in MXN")
    employment_type: str = Field(..., description="EMPLOYEE or SELF_EMPLOYED")
    months_of_experience: int = Field(..., ge=0, description="Work experience in months")
    credit_score: int = Field(..., ge=300, le=850, description="Credit score")
    amount: float = Field(..., ge=0, description="Requested loan amount in MXN")
    term: int = Field(..., ge=1, description="Loan term in months")
    active_defaults: bool = Field(..., description="Has active payment defaults")


class CreditEvaluationResponse(BaseModel):
    """Response model for credit evaluation."""
    reference: str = Field(..., description="Unique reference for the evaluation")
    decision: str = Field(..., description="APPROVED, COUNTEROFFER, or REJECTED")
    reasons: List[str] = Field(default=[], description="List of reasons for the decision")
    details: Dict[str, Any] = Field(default={}, description="Additional evaluation details")


class HealthCheckResponse(BaseModel):
    """Health check response model."""
    status: str
    message: str