import type { CreditApplicationRequest, CreditEvaluationResponse, PolicyInfo } from '@/types';

const API_BASE_URL = 'http://localhost:8000';

class CreditAPI {
  async evaluateApplication(application: CreditApplicationRequest): Promise<CreditEvaluationResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/evaluate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(application),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error evaluating application:', error);
      throw new Error('Error al evaluar la solicitud de crédito');
    }
  }

  async getPolicyInfo(): Promise<PolicyInfo> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/policy`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching policy info:', error);
      throw new Error('Error al obtener información de políticas');
    }
  }

  async checkHealth(): Promise<{ status: string; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error checking health:', error);
      throw new Error('Error al verificar el estado del servidor');
    }
  }
}

export const creditAPI = new CreditAPI();