import uuid
from src.models.application import Application, Result
from src.utils.validators import ApplicationValidator
from src.utils.calculators import CreditCalculator
from src.core.config import policy


class CreditEvaluator:
    """Main class to evaluate credit applications."""

    @staticmethod
    def evaluate(application: Application) -> Result:
        """
        Evaluate a credit application and return decision with details.
        
        Args:
            application: Credit application data
            
        Returns:
            Result object with decision, reasons, and details
        """
        reference = str(uuid.uuid4())[:8].upper()
        reasons = []

        # Basic validation
        is_valid, basic_checks = ApplicationValidator.validate(application)
        if not is_valid:
            reasons.extend(basic_checks)

        # Calculate interest rate based on credit score
        rate = CreditCalculator.calculate_rate_by_score(application.credit_score)
        if rate is None:
            reasons.append("Credit score below minimum threshold (600)")

        # If basic validation fails, reject immediately
        if reasons:
            return Result(reference, "REJECTED", reasons, {})

        # Calculate loan details
        payment = CreditCalculator.calculate_monthly_payment(application.amount, rate, application.term)
        current_dti = application.monthly_debt / application.monthly_income if application.monthly_income > 0 else 1.0
        total_dti = (application.monthly_debt + payment) / application.monthly_income if application.monthly_income > 0 else 1.0

        # Check current DTI limit
        if current_dti > policy.CURRENT_DTI_MAX:
            reasons.append("Current DTI exceeds 40%")
            return Result(reference, "REJECTED", reasons, {
                "annual_rate": rate,
                "monthly_payment": payment,
                "current_dti": round(current_dti, 4),
                "total_dti": round(total_dti, 4)
            })

        # Check affordability and total DTI
        if payment > policy.MAX_AFFECTATION * application.monthly_income or total_dti > policy.TOTAL_DTI_MAX:
            # Try to find a counteroffer
            proposal = CreditCalculator.find_counteroffer(
                application.monthly_income, 
                application.monthly_debt, 
                rate, 
                application.term, 
                application.amount
            )
            
            if proposal:
                term2, amount2, payment2 = proposal
                return Result(reference, "COUNTEROFFER", ["Terms adjustment required"], {
                    "annual_rate": rate,
                    "proposed_term": term2,
                    "maximum_amount": amount2,
                    "estimated_payment": payment2
                })
            else:
                reasons.append("Unable to find viable counteroffer within DTI/affordability limits")
                return Result(reference, "REJECTED", reasons, {
                    "annual_rate": rate,
                    "monthly_payment": payment,
                    "total_dti": round(total_dti, 4)
                })

        # Application approved
        return Result(reference, "APPROVED", [], {
            "annual_rate": rate,
            "monthly_payment": payment,
            "current_dti": round(current_dti, 4),
            "total_dti": round(total_dti, 4)
        })