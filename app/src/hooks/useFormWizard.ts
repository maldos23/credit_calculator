import { useState, useCallback } from 'react';
import type { FormState, FormData, FormStep, CreditApplicationRequest } from '@/types';
import { creditAPI } from '@/services/creditAPI';

export const useFormWizard = () => {
  const [state, setState] = useState<FormState>({
    currentStep: 'personal',
    data: {},
    isLoading: false,
  });

  const updateData = useCallback((stepData: Partial<FormData>) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, ...stepData },
    }));
  }, []);

  const nextStep = useCallback(() => {
    const stepFlow: FormStep[] = ['personal', 'employment', 'financial', 'credit', 'result'];
    const currentIndex = stepFlow.indexOf(state.currentStep);
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < stepFlow.length) {
      setState(prev => ({
        ...prev,
        currentStep: stepFlow[nextIndex],
      }));
    }
  }, [state.currentStep]);

  const prevStep = useCallback(() => {
    const stepFlow: FormStep[] = ['personal', 'employment', 'financial', 'credit'];
    const currentIndex = stepFlow.indexOf(state.currentStep);
    const prevIndex = currentIndex - 1;
    
    if (prevIndex >= 0) {
      setState(prev => ({
        ...prev,
        currentStep: stepFlow[prevIndex],
      }));
    }
  }, [state.currentStep]);

  const submitApplication = useCallback(async () => {
    const { data } = state;
    
    // Validate that all required fields are present
    const requiredFields: (keyof FormData)[] = [
      'name', 'age', 'employment_type', 'months_of_experience',
      'monthly_income', 'monthly_debt', 'credit_score', 'active_defaults',
      'amount', 'term'
    ];

    const missingFields = requiredFields.filter(field => data[field] === undefined || data[field] === null);
    
    if (missingFields.length > 0) {
      throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
    }

    const application: CreditApplicationRequest = {
      name: data.name!,
      age: data.age!,
      employment_type: data.employment_type!,
      months_of_experience: data.months_of_experience!,
      monthly_income: data.monthly_income!,
      monthly_debt: data.monthly_debt!,
      credit_score: data.credit_score!,
      active_defaults: data.active_defaults!,
      amount: data.amount!,
      term: data.term!,
    };

    setState(prev => ({ ...prev, isLoading: true, error: undefined }));

    try {
      const result = await creditAPI.evaluateApplication(application);
      setState(prev => ({
        ...prev,
        result,
        currentStep: 'result',
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Error desconocido',
        isLoading: false,
      }));
    }
  }, [state]);

  const reset = useCallback(() => {
    setState({
      currentStep: 'personal',
      data: {},
      isLoading: false,
    });
  }, []);

  const goToStep = useCallback((step: FormStep) => {
    setState(prev => ({
      ...prev,
      currentStep: step,
    }));
  }, []);

  return {
    state,
    updateData,
    nextStep,
    prevStep,
    submitApplication,
    reset,
    goToStep,
  };
};