from dataclasses import dataclass
from typing import Optional, Tuple, Dict
import math
import uuid

# --- Policy Configuration (educational values) ---
MIN_AGE = 18
MAX_AGE = 69
MIN_INCOME = 7500.0
MIN_AMOUNT = 10_000.0
MAX_AMOUNT = 300_000.0
MIN_TERM = 12
MAX_TERM = 60
CURRENT_DTI_MAX = 0.40
TOTAL_DTI_MAX = 0.50
MAX_AFFECTATION = 0.30  # payment/income

MESSAGES = {
    "non_negative": "Debe ser no negativo.",
    "invalid_input": "Entrada inválida. Intenta de nuevo.",
    "min_value": "Debe ser ≥ {min}.",
    "max_value": "Debe ser ≤ {max}.",
    "header": "=== Pre-evaluador de crédito (demo) ===",
    "name": "Nombre: ",
    "age": "Edad: ",
    "income": "Ingreso mensual (MXN): ",
    "debt": "Deuda mensual vigente (MXN): ",
    "employment_type": "Tipo de empleo (EMPLEADO/INDEPENDIENTE): ",
    "experience": "Antigüedad laboral (meses): ",
    "score": "Score (300-850): ",
    "amount": "Monto solicitado (MXN): ",
    "term": "Plazo (meses): ",
    "defaults": "¿Moras(Incumpliminetos) activas? (S/N): ",
    "result_header": "\n--- Resultado ---",
    "folio": "Folio: {folio}",
    "decision": "Decisión: {decision}",
    "reasons": "Motivos:",
    "reason_item": " - {reason}",
    "details_item": " {key}: {value}",
    "separator": "-----------------\n",
    "another": "¿Evaluar otra solicitud? (S/N): "
}

@dataclass
class Application:
    name: str
    age: int
    monthly_income: float
    monthly_debt: float
    employment_type: str  # "EMPLOYEE" | "SELF-EMPLOYED"
    months_of_experience: int
    credit_score: int        # 300-850
    amount: float
    term: int        # months
    active_defaults: bool

@dataclass
class Result:
    reference: str
    decision: str  # "APPROVED" | "COUNTEROFFER" | "REJECTED"
    reasons: list
    details: Dict[str, float | str]

class ApplicationValidator:
    """Class to validate the basic data of an application."""

    @staticmethod
    def validate(application: Application) -> Tuple[bool, list]:
        reasons = []
        if not (MIN_AGE <= application.age <= MAX_AGE):
            reasons.append("Edad fuera de rango")
        if application.monthly_income < MIN_INCOME:
            reasons.append("Ingreso insuficiente")
        employment_type = application.employment_type.strip().upper()
        if (employment_type == "EMPLOYEE" and application.months_of_experience < 6) or \
           (employment_type == "SELF-EMPLOYED" and application.months_of_experience < 12):
            reasons.append("Antigüedad laboral insuficiente")
        if application.active_defaults:
            reasons.append("Moras activas")
        if not (MIN_AMOUNT <= application.amount <= MAX_AMOUNT):
            reasons.append("Monto fuera de política")
        if not (MIN_TERM <= application.term <= MAX_TERM):
            reasons.append("Plazo fuera de política")
        return (len(reasons) == 0, reasons)

class CreditCalculator:
    """Class to perform credit-related calculations."""

    @staticmethod
    def calculate_rate_by_score(score: int) -> Optional[float]:
        if score < 600:
            return None
        if score >= 720:
            return 0.18
        if score >= 660:
            return 0.24
        return 0.32

    @staticmethod
    def calculate_monthly_payment(amount: float, annual_rate: float, term_months: int) -> float:
        i = annual_rate / 12.0
        if i <= 0:
            return round(amount / term_months, 2)
        factor = (i * (1 + i) ** term_months) / ((1 + i) ** term_months - 1)
        return round(amount * factor, 2)

    @staticmethod
    def find_counteroffer(income: float, debt: float, annual_rate: float,
                          initial_term: int, requested_amount: float) -> Optional[Tuple[int, float, float]]:
        max_possible_amount = 0.0
        best_term = initial_term
        best_payment = 0.0

        for term in range(initial_term, MAX_TERM + 1, 6):
            lo, hi = 0.0, min(requested_amount, MAX_AMOUNT)
            viable = False
            for _ in range(40):  # binary precision
                mid = (lo + hi) / 2
                payment = CreditCalculator.calculate_monthly_payment(mid, annual_rate, term)
                total_dti = (debt + payment) / income if income > 0 else 1.0
                if payment <= MAX_AFFECTATION * income and total_dti <= TOTAL_DTI_MAX:
                    viable = True
                    lo = mid
                else:
                    hi = mid
            viable_amount = lo
            if viable and viable_amount >= MIN_AMOUNT and viable_amount > max_possible_amount:
                max_possible_amount = viable_amount
                best_term = term
                best_payment = CreditCalculator.calculate_monthly_payment(max_possible_amount, annual_rate, best_term)

        if max_possible_amount >= MIN_AMOUNT:
            return best_term, round(max_possible_amount, 2), best_payment
        return None

class CreditEvaluator:
    """Main class to evaluate credit applications."""

    @staticmethod
    def evaluate(application: Application) -> Result:
        reference = str(uuid.uuid4())[:8].upper()
        reasons = []

        ok, basic_checks = ApplicationValidator.validate(application)
        if not ok:
            reasons.extend(basic_checks)

        rate = CreditCalculator.calculate_rate_by_score(application.credit_score)
        if rate is None:
            reasons.append("Score inferior a 600")

        if reasons:
            return Result(reference, "REJECTED", reasons, {})

        payment = CreditCalculator.calculate_monthly_payment(application.amount, rate, application.term)
        current_dti = application.monthly_debt / application.monthly_income if application.monthly_income > 0 else 1.0
        total_dti = (application.monthly_debt + payment) / application.monthly_income if application.monthly_income > 0 else 1.0

        if current_dti > CURRENT_DTI_MAX:
            reasons.append("DTI actual > 40%")
            return Result(reference, "REJECTED", reasons, {
                "tasa_anual": rate, "cuota": payment, "dti_actual": round(current_dti, 4), "dti_total": round(total_dti, 4)
            })

        if payment > MAX_AFFECTATION * application.monthly_income or total_dti > TOTAL_DTI_MAX:
            proposal = CreditCalculator.find_counteroffer(application.monthly_income, application.monthly_debt, rate, application.term, application.amount)
            if proposal:
                term2, amount2, payment2 = proposal
                return Result(reference, "COUNTEROFFER", ["Ajuste de condiciones requerido"], {
                    "tasa_anual": rate, "plazo_propuesto": term2, "monto_maximo": amount2,
                    "cuota_estim": payment2
                })
            else:
                reasons.append("No se logró una contraoferta que cumpla DTI/afectación")
                return Result(reference, "REJECTED", reasons, {
                    "tasa_anual": rate, "cuota": payment, "dti_total": round(total_dti, 4)
                })

        return Result(reference, "APPROVED", [], {
            "tasa_anual": rate,
            "cuota": payment,
            "dti_actual": round(current_dti, 4),
            "dti_total": round(total_dti, 4)
        })

class ConsoleInterface:
    """Class to handle user interaction in the console."""

    @staticmethod
    def request_float(message: str) -> float:
        while True:
            try:
                value = float(input(message).replace(",", ""))
                if value < 0:
                    print(MESSAGES["non_negative"])
                    continue
                return value
            except Exception:
                print(MESSAGES["invalid_input"])

    @staticmethod
    def request_int(message: str, minimum: Optional[int] = None, maximum: Optional[int] = None) -> int:
        while True:
            try:
                value = int(input(message))
                if minimum is not None and value < minimum:
                    print(MESSAGES["min_value"].format(min=minimum)); continue
                if maximum is not None and value > maximum:
                    print(MESSAGES["max_value"].format(max=maximum)); continue
                return value
            except Exception:
                print(MESSAGES["invalid_input"])

    @staticmethod
    def execute():
        print(MESSAGES["header"])
        while True:
            name = input(MESSAGES["name"]).strip()
            age = ConsoleInterface.request_int(MESSAGES["age"], 0, 120)
            income = ConsoleInterface.request_float(MESSAGES["income"])
            debt = ConsoleInterface.request_float(MESSAGES["debt"])
            employment_type = input(MESSAGES["employment_type"]).strip().upper()
            experience = ConsoleInterface.request_int(MESSAGES["experience"], 0, 600)
            score = ConsoleInterface.request_int(MESSAGES["score"], 300, 850)
            amount = ConsoleInterface.request_float(MESSAGES["amount"])
            term = ConsoleInterface.request_int(MESSAGES["term"], 1, 360)
            defaults = input(MESSAGES["defaults"]).strip().upper().startswith("S")

            application = Application(name, age, income, debt, employment_type, experience, score, amount, term, defaults)
            result = CreditEvaluator.evaluate(application)

            print(MESSAGES["result_header"])
            print(MESSAGES["folio"].format(folio=result.reference))
            print(MESSAGES["decision"].format(decision=result.decision))
            if result.reasons:
                print(MESSAGES["reasons"])
                for reason in result.reasons:
                    print(MESSAGES["reason_item"].format(reason=reason))
            if result.details:
                for key, value in result.details.items():
                    print(MESSAGES["details_item"].format(key=key, value=value))
            print(MESSAGES["separator"])

            another = input(MESSAGES["another"]).strip().upper()
            if another != "S":
                break

if __name__ == "__main__":
    ConsoleInterface.execute()