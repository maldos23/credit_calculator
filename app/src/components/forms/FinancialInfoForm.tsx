import React from 'react';
import type { FinancialInfoStep } from '@/types';

interface FinancialInfoFormProps {
  data: Partial<FinancialInfoStep>;
  onUpdate: (data: Partial<FinancialInfoStep>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const FinancialInfoForm: React.FC<FinancialInfoFormProps> = ({
  data,
  onUpdate,
  onNext,
  onPrev,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.monthly_income && data.monthly_debt !== undefined && data.credit_score && data.active_defaults !== undefined) {
      onNext();
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const isValid = data.monthly_income && 
                  data.monthly_income > 0 &&
                  data.monthly_debt !== undefined && 
                  data.credit_score && 
                  data.credit_score >= 300 && 
                  data.credit_score <= 850 &&
                  data.active_defaults !== undefined;

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor="monthly_income">Ingresos Mensuales * (MXN)</label>
        <div className="control">
          <input
            id="monthly_income"
            className="input"
            type="number"
            min="1"
            step="0.01"
            value={data.monthly_income || ''}
            onChange={(e) => onUpdate({ monthly_income: parseFloat(e.target.value) || 0 })}
            placeholder="Ej: 25000"
            required
          />
        </div>
        {data.monthly_income && (
          <p className="help is-info">
            {formatCurrency(data.monthly_income)} mensual
          </p>
        )}
      </div>

      <div className="field">
        <label className="label" htmlFor="monthly_debt">Deudas Mensuales (MXN)</label>
        <div className="control">
          <input
            id="monthly_debt"
            className="input"
            type="number"
            min="0"
            step="0.01"
            value={data.monthly_debt || ''}
            onChange={(e) => onUpdate({ monthly_debt: parseFloat(e.target.value) || 0 })}
            placeholder="Ej: 5000"
          />
        </div>
        {data.monthly_debt !== undefined && data.monthly_debt > 0 && (
          <p className="help is-info">
            {formatCurrency(data.monthly_debt)} mensual en deudas
          </p>
        )}
      </div>

      <div className="field">
        <label className="label" htmlFor="credit_score">Score Crediticio * (300-850)</label>
        <div className="control">
          <input
            id="credit_score"
            className="input"
            type="number"
            min="300"
            max="850"
            value={data.credit_score || ''}
            onChange={(e) => onUpdate({ credit_score: parseInt(e.target.value) || 0 })}
            placeholder="Ej: 700"
            required
          />
        </div>
        {data.credit_score && (data.credit_score < 300 || data.credit_score > 850) && (
          <p className="help is-danger">
            El score crediticio debe estar entre 300 y 850
          </p>
        )}
      </div>

      <div className="field">
        <label className="label" htmlFor="active_defaults">¿Tienes incumplimientos activos? *</label>
        <div className="control">
          <div className="select is-fullwidth">
            <select
              id="active_defaults"
              value={data.active_defaults !== undefined ? data.active_defaults.toString() : ''}
              onChange={(e) => onUpdate({ active_defaults: e.target.value === 'true' })}
            >
              <option value="">Selecciona una opción</option>
              <option value="false">No</option>
              <option value="true">Sí</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field is-grouped is-grouped-right">
        <div className="control">
          <button 
            type="button" 
            className="button is-light" 
            onClick={onPrev}
          >
            Anterior
          </button>
        </div>
        <div className="control">
          <button 
            type="submit" 
            disabled={!isValid} 
            className={`button is-bbva`}
          >
            Siguiente
          </button>
        </div>
      </div>
    </form>
  );
};