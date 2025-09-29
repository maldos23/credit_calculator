import React from 'react';
import type { CreditDetailsStep } from '@/types';

interface CreditDetailsFormProps {
  data: Partial<CreditDetailsStep>;
  onUpdate: (data: Partial<CreditDetailsStep>) => void;
  onSubmit: () => Promise<void>;
  onPrev: () => void;
  isLoading: boolean;
}

export const CreditDetailsForm: React.FC<CreditDetailsFormProps> = ({
  data,
  onUpdate,
  onSubmit,
  onPrev,
  isLoading,
}) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (data.amount && data.term) {
      await onSubmit();
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const calculateMonthlyPayment = (amount: number, term: number) => {
    // Usando una tasa de ejemplo del 12% anual (1% mensual)
    const monthlyRate = 0.01;
    const payment = (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / 
                   (Math.pow(1 + monthlyRate, term) - 1);
    return payment;
  };

  const isValid = data.amount && 
                  data.amount > 0 &&
                  data.term && 
                  data.term > 0;

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor="amount">Monto Solicitado * (MXN)</label>
        <div className="control">
          <input
            id="amount"
            className="input"
            type="number"
            min="1"
            step="0.01"
            value={data.amount || ''}
            onChange={(e) => onUpdate({ amount: parseFloat(e.target.value) || 0 })}
            placeholder="Ej: 100000"
            required
          />
        </div>
        {data.amount && (
          <p className="help is-info">
            {formatCurrency(data.amount)}
          </p>
        )}
      </div>

      <div className="field">
        <label className="label" htmlFor="term">Plazo en Meses *</label>
        <div className="control">
          <input
            id="term"
            className="input"
            type="number"
            min="1"
            max="360"
            value={data.term || ''}
            onChange={(e) => onUpdate({ term: parseInt(e.target.value) || 0 })}
            placeholder="Ej: 24"
            required
          />
        </div>
        {data.term && data.term > 0 && (
          <p className="help is-info">
            {data.term} meses ({Math.round(data.term / 12 * 10) / 10} años)
          </p>
        )}
      </div>

      {data.amount && data.term && (
        <div className="notification is-light">
          <h4 className="title is-5 has-text-bbva">Estimación de Pago Mensual</h4>
          <p className="title is-3 has-text-bbva">
            {formatCurrency(calculateMonthlyPayment(data.amount, data.term))}
          </p>
          <p className="subtitle is-6 has-text-grey">
            *Estimación con tasa referencial del 12% anual
          </p>
        </div>
      )}

      <div className="field is-grouped is-grouped-right">
        <div className="control">
          <button 
            type="button" 
            className="button is-light" 
            onClick={onPrev} 
            disabled={isLoading}
          >
            Anterior
          </button>
        </div>
        <div className="control">
          <button 
            type="submit" 
            disabled={!isValid || isLoading} 
            className={`button is-bbva ${isLoading ? 'is-loading' : ''}`}
          >
            {isLoading ? 'Evaluando...' : 'Evaluar Crédito'}
          </button>
        </div>
      </div>
    </form>
  );
};