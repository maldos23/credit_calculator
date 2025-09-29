from typing import Optional, Tuple
import math
from src.core.config import policy


class CreditCalculator:
    """Class to perform credit-related calculations."""

    @staticmethod
    def calculate_rate_by_score(score: int) -> Optional[float]:
        """Calculate annual interest rate based on credit score."""
        if score < 600:
            return None
        if score >= 720:
            return 0.18
        if score >= 660:
            return 0.24
        return 0.32

    @staticmethod
    def calculate_monthly_payment(amount: float, annual_rate: float, term_months: int) -> float:
        """Calculate monthly payment using standard loan formula."""
        i = annual_rate / 12.0
        if i <= 0:
            return round(amount / term_months, 2)
        factor = (i * (1 + i) ** term_months) / ((1 + i) ** term_months - 1)
        return round(amount * factor, 2)

    @staticmethod
    def find_counteroffer(income: float, debt: float, annual_rate: float,
                          initial_term: int, requested_amount: float) -> Optional[Tuple[int, float, float]]:
        """
        Find alternative loan terms that meet DTI and affordability requirements.
        Returns tuple of (term, amount, payment) if viable counteroffer found.
        """
        max_possible_amount = 0.0
        best_term = initial_term
        best_payment = 0.0

        for term in range(initial_term, policy.MAX_TERM + 1, 6):
            lo, hi = 0.0, min(requested_amount, policy.MAX_AMOUNT)
            viable = False
            
            # Binary search for maximum viable amount for this term
            for _ in range(40):  # Binary search iterations for precision
                mid = (lo + hi) / 2
                payment = CreditCalculator.calculate_monthly_payment(mid, annual_rate, term)
                total_dti = (debt + payment) / income if income > 0 else 1.0
                
                if payment <= policy.MAX_AFFECTATION * income and total_dti <= policy.TOTAL_DTI_MAX:
                    viable = True
                    lo = mid
                else:
                    hi = mid
            
            viable_amount = lo
            if viable and viable_amount >= policy.MIN_AMOUNT and viable_amount > max_possible_amount:
                max_possible_amount = viable_amount
                best_term = term
                best_payment = CreditCalculator.calculate_monthly_payment(max_possible_amount, annual_rate, best_term)

        if max_possible_amount >= policy.MIN_AMOUNT:
            return best_term, round(max_possible_amount, 2), best_payment
        return None