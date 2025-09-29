import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';

// Componentes existentes del sistema de crédito
import { FormLayout } from '@/components/FormLayout';
import { PersonalInfoForm } from '@/components/forms/PersonalInfoForm';
import { EmploymentInfoForm } from '@/components/forms/EmploymentInfoForm';
import { FinancialInfoForm } from '@/components/forms/FinancialInfoForm';
import { CreditDetailsForm } from '@/components/forms/CreditDetailsForm';
import { ResultScreen } from '@/components/ResultScreen';
import { useFormWizard } from '@/hooks/useFormWizard';

// Componentes del sistema avanzado
import { WelcomeScreen } from '@/components/advanced/WelcomeScreen';
import { LoadingScreen } from '@/components/advanced/LoadingScreen';
import { MainMenu } from '@/components/advanced/MainMenu';
import { InactivityControl } from '@/components/advanced/InactivityControl';

// Componentes para gestión de archivos
import { DateConfiguration } from '@/components/advanced/DateConfiguration';
import { FileReader } from '@/components/advanced/FileReader';
import { FileWriter } from '@/components/advanced/FileWriter';
import { FileCreator } from '@/components/advanced/FileCreator';
import { ReportGenerator } from '@/components/advanced/ReportGenerator';
import { SystemStatus } from '@/components/advanced/SystemStatus';

// Componente wrapper para LoadingScreen con navegación
function LoadingScreenWithNavigation() {
  const navigate = useNavigate();
  
  const handleLoadingComplete = () => {
    navigate('/advanced/menu');
  };
  
  return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
}

// Componente wrapper para WelcomeScreen con navegación
function WelcomeScreenWithNavigation() {
  const navigate = useNavigate();
  
  const handleUserLogin = (_userName: string) => {
    navigate('/advanced/loading');
  };
  
  return <WelcomeScreen onUserLogin={handleUserLogin} />;
}

function CreditSystemApp() {
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

function HomePage() {
  return (
    <div className="hero is-fullheight" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-8">
              <div className="card">
                <header className="card-header" style={{ backgroundColor: '#001391' }}>
                  <p className="card-header-title has-text-white">
                    🏦 BBVA - Sistemas Integrados
                  </p>
                </header>
                <div className="card-content">
                  <div className="content has-text-centered">
                    <h1 className="title is-2" style={{ color: '#001391' }}>
                      Bienvenido a BBVA
                    </h1>
                    <p className="subtitle is-4 has-text-grey">
                      Selecciona el sistema que deseas utilizar
                    </p>
                  </div>

                  <div className="columns is-multiline mt-5">
                    <div className="column is-half">
                      <div className="card">
                        <div className="card-content has-text-centered">
                          <span className="icon is-large has-text-info mb-3">
                            <i className="fas fa-calculator fa-3x"></i>
                          </span>
                          <h3 className="title is-4">Pre-evaluador de Crédito</h3>
                          <p className="subtitle is-6 has-text-grey mb-4">
                            Sistema para evaluar solicitudes crediticias con IA
                          </p>
                          <Link to="/credit" className="button is-info is-large">
                            <span className="icon">
                              <i className="fas fa-arrow-right"></i>
                            </span>
                            <span>Acceder</span>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="column is-half">
                      <div className="card">
                        <div className="card-content has-text-centered">
                          <span className="icon is-large has-text-success mb-3">
                            <i className="fas fa-cogs fa-3x"></i>
                          </span>
                          <h3 className="title is-4">Sistema Avanzado</h3>
                          <p className="subtitle is-6 has-text-grey mb-4">
                            Gestión de archivos con conceptos de programación avanzada
                          </p>
                          <Link to="/advanced" className="button is-success is-large">
                            <span className="icon">
                              <i className="fas fa-rocket"></i>
                            </span>
                            <span>Acceder</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="notification is-light mt-5">
                    <div className="columns">
                      <div className="column">
                        <h4 className="title is-6">🎯 Pre-evaluador de Crédito</h4>
                        <ul className="is-size-7">
                          <li>✅ Evaluación crediticia inteligente</li>
                          <li>✅ Interfaz moderna con Bulma CSS</li>
                          <li>✅ Integración con políticas BBVA</li>
                          <li>✅ Resultados instantáneos</li>
                        </ul>
                      </div>
                      <div className="column">
                        <h4 className="title is-6">🚀 Sistema Avanzado</h4>
                        <ul className="is-size-7">
                          <li>✅ Concatenación de cadenas</li>
                          <li>✅ Gestión con tuplas y diccionarios</li>
                          <li>✅ Manejo completo de excepciones</li>
                          <li>✅ Reportes automáticos en Markdown/PDF</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Página principal con selección de sistemas */}
        <Route path="/" element={<HomePage />} />
        
        {/* Sistema de crédito existente */}
        <Route path="/credit" element={<CreditSystemApp />} />
        
        {/* Sistema avanzado - Rutas principales */}
        <Route path="/advanced" element={<Navigate to="/advanced/welcome" replace />} />
        <Route path="/advanced/welcome" element={<WelcomeScreenWithNavigation />} />
        <Route path="/advanced/loading" element={<LoadingScreenWithNavigation />} />
        <Route path="/advanced/menu" element={
          <InactivityControl onTimeout={() => {}} onContinue={() => {}}>
            <MainMenu 
              currentUser={{ nombre: 'Usuario', session_id: '12345' }}
              onMenuSelect={() => {}}
              onUserChange={() => {}}
            />
          </InactivityControl>
        } />
        
        {/* Sistema avanzado - Configuración */}
        <Route path="/advanced/dates" element={<DateConfiguration />} />
        
        {/* Sistema avanzado - Gestión de archivos */}
        <Route path="/advanced/files/read" element={<FileReader />} />
        <Route path="/advanced/files/write" element={<FileWriter />} />
        <Route path="/advanced/files/create" element={<FileCreator />} />
        
        {/* Sistema avanzado - Reportes y estado */}
        <Route path="/advanced/reports" element={<ReportGenerator />} />
        <Route path="/advanced/status" element={<SystemStatus />} />
        
        {/* Redirect para rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;