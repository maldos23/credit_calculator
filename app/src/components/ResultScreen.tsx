import React from 'react';
import type { CreditEvaluationResponse } from '@/types';

interface ResultScreenProps {
  result: CreditEvaluationResponse;
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ result, onRestart }) => {
  const getStatusConfig = (decision: string) => {
    switch (decision) {
      case 'APPROVED':
        return {
          icon: '✅',
          title: '¡Felicidades! Tu crédito ha sido aprobado',
          subtitle: 'Has cumplido con todos los requisitos',
          notificationClass: 'is-bbva-success',
          textClass: 'has-text-success',
        };
      case 'COUNTEROFFER':
        return {
          icon: '⚠️',
          title: 'Tenemos una contraoferta para ti',
          subtitle: 'Podemos ofrecerte condiciones alternativas',
          notificationClass: 'is-bbva-warning',
          textClass: 'has-text-warning',
        };
      case 'REJECTED':
        return {
          icon: '❌',
          title: 'Tu solicitud no ha sido aprobada',
          subtitle: 'En esta ocasión no podemos procesar tu solicitud',
          notificationClass: 'is-bbva-danger',
          textClass: 'has-text-danger',
        };
      default:
        return {
          icon: '📋',
          title: 'Resultado de evaluación',
          subtitle: '',
          notificationClass: 'is-info',
          textClass: 'has-text-info',
        };
    }
  };

  const config = getStatusConfig(result.decision);

  const getTitleText = () => {
    if (result.decision === 'APPROVED') {
      return 'Factores que favorecieron tu aprobación';
    } else if (result.decision === 'COUNTEROFFER') {
      return 'Consideraciones para la contraoferta';
    } else {
      return 'Razones de la decisión';
    }
  };

  return (
    <div className="content">
      {/* Status Notification */}
      <div className={`notification ${config.notificationClass} has-text-centered`}>
        <div className="is-size-1 mb-4">{config.icon}</div>
        <h2 className="title is-3">{config.title}</h2>
        <p className="subtitle is-5">{config.subtitle}</p>
      </div>

      {/* Reference Number */}
      <div className="card mb-5">
        <header className="card-header">
          <p className="card-header-title">Número de Referencia</p>
        </header>
        <div className="card-content">
          <p className="title is-3 has-text-bbva is-family-monospace">
            {result.reference}
          </p>
          <p className="subtitle is-6 has-text-grey">
            Guarda este número para futuras consultas
          </p>
        </div>
      </div>

      {/* Reasons */}
      {result.reasons && result.reasons.length > 0 && (
        <div className="card mb-5">
          <header className="card-header">
            <p className="card-header-title">
              {getTitleText()}
            </p>
          </header>
          <div className="card-content">
            <div className="content">
              <ul>
                {result.reasons.map((reason) => (
                  <li key={reason} className="mb-2">
                    <span className="has-text-bbva mr-2">•</span>
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Additional Details */}
      {result.details && Object.keys(result.details).length > 0 && (
        <div className="card mb-5">
          <header className="card-header">
            <p className="card-header-title">Detalles Adicionales</p>
          </header>
          <div className="card-content">
            <div className="columns is-multiline">
              {Object.entries(result.details).map(([key, value]) => (
                <div key={key} className="column is-half">
                  <p className="has-text-weight-semibold has-text-grey is-capitalized">
                    {key.replace(/_/g, ' ')}:
                  </p>
                  <p className="is-size-5">
                    {typeof value === 'number' 
                      ? value.toFixed(2)
                      : String(value)
                    }
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Next Steps */}
      <div className="card mb-5">
        <header className="card-header">
          <p className="card-header-title">Próximos Pasos</p>
        </header>
        <div className="card-content">
          <div className="content">
            {result.decision === 'APPROVED' && (
              <div>
                <p className="mb-3">Para continuar con tu crédito:</p>
                <ol>
                  <li>Un ejecutivo se comunicará contigo en las próximas 24 horas</li>
                  <li>Prepara tu documentación (identificación, comprobantes de ingresos)</li>
                  <li>3. Revisa los términos y condiciones finales</li>
                </ol>
              </div>
            )}
            
            {result.decision === 'COUNTEROFFER' && (
              <div>
                <p className="mb-3">Para evaluar nuestra contraoferta:</p>
                <ol>
                  <li>Un ejecutivo te contactará para explicar las nuevas condiciones</li>
                  <li>Podrás revisar monto y plazo alternativos</li>
                  <li>Decide si aceptas la contraoferta</li>
                </ol>
              </div>
            )}

            {result.decision === 'REJECTED' && (
              <div>
                <p className="mb-3">Opciones disponibles:</p>
                <ol>
                  <li>Mejora tu historial crediticio y vuelve a aplicar</li>
                  <li>Considera un monto menor</li>
                  <li>Consulta con un asesor sobre alternativas</li>
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="has-text-centered">
        <button onClick={onRestart} className="button is-outlined is-bbva is-medium">
          <span className="icon mr-2">
            <i className="fas fa-redo"></i>
          </span>
          <span>Nueva Evaluación</span>
        </button>
      </div>
    </div>
  );
};