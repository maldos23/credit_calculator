from dataclasses import dataclass
from typing import Dict, Union


@dataclass
class Application:
    """Data model for credit application."""
    name: str
    age: int
    monthly_income: float
    monthly_debt: float
    employment_type: str  # "EMPLOYEE" | "SELF-EMPLOYED"
    months_of_experience: int
    credit_score: int        # 300-850
    amount: float
    term: int               # months
    active_defaults: bool


@dataclass
class Result:
    """Data model for credit evaluation result."""
    reference: str
    decision: str  # "APPROVED" | "COUNTEROFFER" | "REJECTED"
    reasons: list
    details: Dict[str, Union[float, str]]