"""
Configuration settings for the credit evaluation API.
"""

import os
from typing import Dict, Any


class PolicySettings:
    """Credit policy configuration."""
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


class Messages:
    """Application messages and text constants."""
    MESSAGES = {
        "non_negative": "Must be non-negative.",
        "invalid_input": "Invalid input. Try again.",
        "min_value": "Must be >= {min}.",
        "max_value": "Must be <= {max}.",
        "header": "=== Credit Pre-evaluator (demo) ===",
        "name": "Name: ",
        "age": "Age: ",
        "income": "Monthly income (MXN): ",
        "debt": "Current monthly debt (MXN): ",
        "employment_type": "Employment type (EMPLOYEE/SELF_EMPLOYED): ",
        "experience": "Work experience (months): ",
        "score": "Credit score (300-850): ",
        "amount": "Requested amount (MXN): ",
        "term": "Term (months): ",
        "defaults": "Active defaults? (Y/N): ",
        "result_header": "\n--- Result ---",
        "folio": "Reference: {folio}",
        "decision": "Decision: {decision}",
        "reasons": "Reasons:",
        "reason_item": " - {reason}",
        "details_item": " {key}: {value}",
        "separator": "-----------------\n",
        "another": "Evaluate another application? (Y/N): "
    }


class Settings:
    """Application settings with environment variable support."""
    def __init__(self):
        self.app_name: str = os.getenv("APP_NAME", "BBVA Credit Pre-evaluator API")
        self.version: str = os.getenv("VERSION", "1.0.0")
        self.description: str = os.getenv("DESCRIPTION", "API for credit application pre-evaluation")
        self.debug: bool = os.getenv("DEBUG", "false").lower() == "true"
        self.host: str = os.getenv("HOST", "0.0.0.0")
        self.port: int = int(os.getenv("PORT", "8000"))  # Vercel assigns PORT dynamically


# Global settings instances
settings = Settings()
policy = PolicySettings()
messages = Messages()