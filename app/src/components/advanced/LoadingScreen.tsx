import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  duration?: number; // duration in milliseconds, default 5000 (5 seconds)
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onLoadingComplete, 
  duration = 5000 
}) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('Cargando programa...');
  const [dots, setDots] = useState('');

  const loadingMessages = [
    'Cargando programa...',
    'Inicializando módulos avanzados...',
    'Preparando sistema de archivos...',
    'Configurando gestión de usuarios...',
    'Estableciendo conexiones...',
    '¡Sistema listo!'
  ];

  useEffect(() => {
    const totalSteps = 100;
    const interval = duration / totalSteps;
    let currentStep = 0;

    const progressTimer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / totalSteps) * 100, 100);
      setProgress(newProgress);

      // Cambiar mensaje basado en progreso
      const messageIndex = Math.floor((newProgress / 100) * (loadingMessages.length - 1));
      setCurrentMessage(loadingMessages[messageIndex]);

      if (currentStep >= totalSteps) {
        clearInterval(progressTimer);
        setTimeout(() => {
          onLoadingComplete();
        }, 500);
      }
    }, interval);

    // Ellipsis dots animation
    const dotsTimer = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 300);

    return () => {
      clearInterval(progressTimer);
      clearInterval(dotsTimer);
    };
  }, [duration, onLoadingComplete]);

  return (
    <div className="hero is-fullheight" style={{ backgroundColor: '#001391' }}>
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half">
              <div className="card">
                <div className="card-content has-text-centered">
                  {/* Logo/Icon */}
                  <div className="mb-5">
                    <span className="icon is-large has-text-bbva">
                      <i className="fas fa-cogs fa-3x fa-spin"></i>
                    </span>
                  </div>

                  {/* Main title */}
                  <h1 className="title is-3 has-text-bbva mb-4">
                    Sistema Avanzado de Gestión
                  </h1>

                  {/* Mensaje de carga con puntos animados */}
                  <div className="notification is-light mb-5">
                    <h2 className="subtitle is-4">
                      {currentMessage}{dots}
                    </h2>
                  </div>

                  {/* Barra de progreso */}
                  <div className="mb-5">
                    <progress 
                      className="progress is-large" 
                      value={progress} 
                      max="100"
                      style={{
                        backgroundColor: '#e0e0e0',
                        height: '20px'
                      }}
                    >
                      {Math.round(progress)}%
                    </progress>
                    <p className="has-text-grey mt-2">
                      {Math.round(progress)}% completado
                    </p>
                  </div>

                  {/* System information */}
                  <div className="content">
                    <div className="columns is-multiline">
                      <div className="column is-6">
                        <div className="box has-background-light">
                          <span className="icon-text">
                            <span className="icon has-text-success">
                              <i className="fas fa-check-circle"></i>
                            </span>
                            <span className="is-size-7">
                              <strong>Concatenación de cadenas</strong>
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="column is-6">
                        <div className="box has-background-light">
                          <span className="icon-text">
                            <span className="icon has-text-success">
                              <i className="fas fa-check-circle"></i>
                            </span>
                            <span className="is-size-7">
                              <strong>Gestión con tuplas</strong>
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="column is-6">
                        <div className="box has-background-light">
                          <span className="icon-text">
                            <span className="icon has-text-success">
                              <i className="fas fa-check-circle"></i>
                            </span>
                            <span className="is-size-7">
                              <strong>Diccionario de archivos</strong>
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="column is-6">
                        <div className="box has-background-light">
                          <span className="icon-text">
                            <span className="icon has-text-success">
                              <i className="fas fa-check-circle"></i>
                            </span>
                            <span className="is-size-7">
                              <strong>Manejo de excepciones</strong>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mensaje de tiempo */}
                  <p className="is-size-7 has-text-grey">
                    <span className="icon">
                      <i className="fas fa-clock"></i>
                    </span>
                    Tiempo máximo de carga: 5 segundos (como se especifica)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};