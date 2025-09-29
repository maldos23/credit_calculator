import { FormLayout } from '@/components/FormLayout';
import { PersonalInfoForm } from '@/components/forms/PersonalInfoForm';
import { EmploymentInfoForm } from '@/components/forms/EmploymentInfoForm';
import { FinancialInfoForm } from '@/components/forms/FinancialInfoForm';
import { CreditDetailsForm } from '@/components/forms/CreditDetailsForm';
import { ResultScreen } from '@/components/ResultScreen';
import { useFormWizard } from '@/hooks/useFormWizard';

function App() {
  const { state, updateData, nextStep, prevStep, submitApplication, reset } = useFormWizard();

  const getStepContent = () => {
    switch (state.currentStep) {
      case 'personal':
        return (
          <PersonalInfoForm
            data={state.data}
            onUpdate={updateData}
            onNext={nextStep}
          />
        );
      case 'employment':
        return (
          <EmploymentInfoForm
            data={state.data}
            onUpdate={updateData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 'financial':
        return (
          <FinancialInfoForm
            data={state.data}
            onUpdate={updateData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 'credit':
        return (
          <CreditDetailsForm
            data={state.data}
            onUpdate={updateData}
            onSubmit={submitApplication}
            onPrev={prevStep}
            isLoading={state.isLoading}
          />
        );
      case 'result':
        return state.result ? (
          <ResultScreen
            result={state.result}
            onRestart={reset}
          />
        ) : (
          <div>Error: No hay resultado disponible</div>
        );
      default:
        return <div>Paso no encontrado</div>;
    }
  };

  const getStepTitle = () => {
    switch (state.currentStep) {
      case 'personal':
        return 'Información Personal';
      case 'employment':
        return 'Información Laboral';
      case 'financial':
        return 'Información Financiera';
      case 'credit':
        return 'Detalles del Crédito';
      case 'result':
        return 'Resultado de la Evaluación';
      default:
        return 'Pre-evaluador de Crédito';
    }
  };

  const getStepSubtitle = () => {
    switch (state.currentStep) {
      case 'personal':
        return 'Cuéntanos un poco sobre ti';
      case 'employment':
        return 'Información sobre tu situación laboral';
      case 'financial':
        return 'Detalles sobre tus ingresos y deudas';
      case 'credit':
        return 'Especifica el monto y plazo deseado';
      case 'result':
        return 'Aquí está el resultado de tu evaluación';
      default:
        return '';
    }
  };

  // Error display
  if (state.error) {
    return (
      <FormLayout
        currentStep={state.currentStep}
        title="Error"
        subtitle="Ha ocurrido un problema"
      >
        <div className="has-text-centered">
          <div className="notification is-danger mb-4">
            <p>{state.error}</p>
          </div>
          <button
            onClick={reset}
            className="button is-bbva"
          >
            Intentar de nuevo
          </button>
        </div>
      </FormLayout>
    );
  }

  return (
    <FormLayout
      currentStep={state.currentStep}
      title={getStepTitle()}
      subtitle={getStepSubtitle()}
    >
      {getStepContent()}
    </FormLayout>
  );
}

export default App;
