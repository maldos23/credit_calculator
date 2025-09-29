from typing import Tuple, Optional
from src.models.application import Application
from src.core.config import policy


class ApplicationValidator:
    """Class to validate the basic data of an application."""

    @staticmethod
    def validate(application: Application) -> Tuple[bool, list]:
        """Validate application data against business rules."""
        reasons = []
        
        if not (policy.MIN_AGE <= application.age <= policy.MAX_AGE):
            reasons.append("Age outside acceptable range")
        
        if application.monthly_income < policy.MIN_INCOME:
            reasons.append("Insufficient income")
        
        employment_type = application.employment_type.strip().upper()
        if (employment_type == "EMPLOYEE" and application.months_of_experience < 6) or \
           (employment_type == "SELF_EMPLOYED" and application.months_of_experience < 12):
            reasons.append("Insufficient work experience")
        
        if application.active_defaults:
            reasons.append("Active payment defaults")
        
        if not (policy.MIN_AMOUNT <= application.amount <= policy.MAX_AMOUNT):
            reasons.append("Amount outside policy limits")
        
        if not (policy.MIN_TERM <= application.term <= policy.MAX_TERM):
            reasons.append("Term outside policy limits")
        
        return (len(reasons) == 0, reasons)