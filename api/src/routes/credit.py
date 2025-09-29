from fastapi import APIRouter, HTTPException
from src.models.schemas import CreditApplicationRequest, CreditEvaluationResponse
from src.models.application import Application
from src.utils.evaluator import CreditEvaluator

router = APIRouter(prefix="/api/v1", tags=["credit"])


@router.post("/evaluate", response_model=CreditEvaluationResponse)
async def evaluate_credit_application(request: CreditApplicationRequest):
    """
    Evaluate a credit application and return the decision.
    
    Args:
        request: Credit application data
        
    Returns:
        Credit evaluation response with decision, reasons, and details
        
    Raises:
        HTTPException: If validation fails or processing error occurs
    """
    try:
        # Convert Pydantic model to dataclass
        application = Application(
            name=request.name,
            age=request.age,
            monthly_income=request.monthly_income,
            monthly_debt=request.monthly_debt,
            employment_type=request.employment_type.upper(),
            months_of_experience=request.months_of_experience,
            credit_score=request.credit_score,
            amount=request.amount,
            term=request.term,
            active_defaults=request.active_defaults
        )
        
        # Evaluate application
        result = CreditEvaluator.evaluate(application)
        
        # Return response
        return CreditEvaluationResponse(
            reference=result.reference,
            decision=result.decision,
            reasons=result.reasons,
            details=result.details
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.get("/policy")
async def get_policy_info():
    """
    Get current credit policy information.
    
    Returns:
        Dictionary with policy limits and requirements
    """
    from src.core.config import policy
    
    return {
        "age_limits": {
            "min": policy.MIN_AGE,
            "max": policy.MAX_AGE
        },
        "income_requirements": {
            "min_monthly_income": policy.MIN_INCOME
        },
        "loan_limits": {
            "min_amount": policy.MIN_AMOUNT,
            "max_amount": policy.MAX_AMOUNT,
            "min_term": policy.MIN_TERM,
            "max_term": policy.MAX_TERM
        },
        "dti_limits": {
            "current_dti_max": policy.CURRENT_DTI_MAX,
            "total_dti_max": policy.TOTAL_DTI_MAX,
            "max_payment_affectation": policy.MAX_AFFECTATION
        },
        "employment_experience": {
            "employee_min_months": 6,
            "self_employed_min_months": 12
        },
        "credit_score_limits": {
            "min_score": 600,
            "max_score": 850
        }
    }