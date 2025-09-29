import React from 'react';
import type { PersonalInfoStep } from '@/types';

interface PersonalInfoFormProps {
  data: Partial<PersonalInfoStep>;
  onUpdate: (data: Partial<PersonalInfoStep>) => void;
  onNext: () => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  data,
  onUpdate,
  onNext,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.name && data.age) {
      onNext();
    }
  };

  const isValid = data.name && data.age && data.age >= 18 && data.age <= 120;

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor="name">Nombre Completo *</label>
        <div className="control">
          <input
            id="name"
            className="input"
            type="text"
            value={data.name || ''}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="Ingresa tu nombre completo"
            required
          />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="age">Edad *</label>
        <div className="control">
          <input
            id="age"
            className="input"
            type="number"
            min="18"
            max="120"
            value={data.age || ''}
            onChange={(e) => onUpdate({ age: parseInt(e.target.value) || 0 })}
            placeholder="Ingresa tu edad"
            required
          />
        </div>
        {data.age && (data.age < 18 || data.age > 120) && (
          <p className="help is-danger">La edad debe estar entre 18 y 120 años</p>
        )}
      </div>

      <div className="field is-grouped is-grouped-right">
        <div className="control">
          <button 
            type="submit" 
            disabled={!isValid} 
            className="button is-bbva"
          >
            Siguiente
          </button>
        </div>
      </div>
    </form>
  );
};