// Types for the credit application
export interface CreditApplicationRequest {
  name: string;
  age: number;
  monthly_income: number;
  monthly_debt: number;
  employment_type: 'EMPLOYEE' | 'SELF_EMPLOYED';
  months_of_experience: number;
  credit_score: number;
  amount: number;
  term: number;
  active_defaults: boolean;
}

export interface CreditEvaluationResponse {
  reference: string;
  decision: 'APPROVED' | 'COUNTEROFFER' | 'REJECTED';
  reasons: string[];
  details: Record<string, unknown>;
}

export interface PolicyInfo {
  age_limits: {
    min: number;
    max: number;
  };
  income_requirements: {
    min_monthly_income: number;
  };
  loan_limits: {
    min_amount: number;
    max_amount: number;
    min_term: number;
    max_term: number;
  };
  dti_limits: {
    current_dti_max: number;
    total_dti_max: number;
    max_payment_affectation: number;
  };
  employment_experience: {
    employee_min_months: number;
    self_employed_min_months: number;
  };
  credit_score_limits: {
    min_score: number;
    max_score: number;
  };
}

// Form step types
export interface PersonalInfoStep {
  name: string;
  age: number;
}

export interface EmploymentInfoStep {
  employment_type: 'EMPLOYEE' | 'SELF_EMPLOYED';
  months_of_experience: number;
}

export interface FinancialInfoStep {
  monthly_income: number;
  monthly_debt: number;
  credit_score: number;
  active_defaults: boolean;
}

export interface CreditDetailsStep {
  amount: number;
  term: number;
}

export interface FormData extends PersonalInfoStep, EmploymentInfoStep, FinancialInfoStep, CreditDetailsStep {}

export type FormStep = 'personal' | 'employment' | 'financial' | 'credit' | 'result';

export interface FormState {
  currentStep: FormStep;
  data: Partial<FormData>;
  result?: CreditEvaluationResponse;
  isLoading: boolean;
  error?: string;
}