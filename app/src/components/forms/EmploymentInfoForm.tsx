import React from 'react';
import type { EmploymentInfoStep } from '@/types';

interface EmploymentInfoFormProps {
  data: Partial<EmploymentInfoStep>;
  onUpdate: (data: Partial<EmploymentInfoStep>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const EmploymentInfoForm: React.FC<EmploymentInfoFormProps> = ({
  data,
  onUpdate,
  onNext,
  onPrev,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.employment_type && data.months_of_experience) {
      onNext();
    }
  };

  const minExperience = data.employment_type === 'EMPLOYEE' ? 6 : 12;
  const isValid = data.employment_type && 
                  data.months_of_experience && 
                  data.months_of_experience >= minExperience;

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor="employment_type">Tipo de Empleo *</label>
        <div className="control">
          <div className="select is-fullwidth">
            <select
              id="employment_type"
              value={data.employment_type || ''}
              onChange={(e) =>
                onUpdate({ 
                  employment_type: e.target.value as 'EMPLOYEE' | 'SELF_EMPLOYED',
                  months_of_experience: undefined 
                })
              }
            >
              <option value="">Selecciona tu tipo de empleo</option>
              <option value="EMPLOYEE">Empleado</option>
              <option value="SELF_EMPLOYED">Trabajador Independiente</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="months_of_experience">
          Meses de Experiencia *
          {data.employment_type && (
            <span className="has-text-grey">
              {' '}(mínimo {minExperience} meses)
            </span>
          )}
        </label>
        <div className="control">
          <input
            id="months_of_experience"
            className="input"
            type="number"
            min={minExperience}
            value={data.months_of_experience || ''}
            onChange={(e) => onUpdate({ months_of_experience: parseInt(e.target.value) || 0 })}
            placeholder="Ingresa los meses de experiencia"
            required
          />
        </div>
        {data.months_of_experience && data.months_of_experience < minExperience && (
          <p className="help is-danger">
            Se requieren mínimo {minExperience} meses de experiencia para {
              data.employment_type === 'EMPLOYEE' ? 'empleados' : 'trabajadores independientes'
            }
          </p>
        )}
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