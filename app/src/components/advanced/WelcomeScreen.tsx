import React, { useState } from 'react';

interface WelcomeScreenProps {
  onUserLogin: (userData: any) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onUserLogin }) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Por favor, ingresa tu nombre o nickname');
      return;
    }

    if (username.length < 2 || username.length > 20) {
      setError('El nombre debe tener entre 2 y 20 caracteres');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/advanced';
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: username }),
      });

      const data = await response.json();

      if (data.success) {
        setWelcomeMessage(data.data.mensaje);
        setTimeout(() => {
          onUserLogin(data.data);
        }, 2000); // Mostrar mensaje por 2 segundos antes de continuar
      } else {
        setError('Error al iniciar sesión');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="hero is-fullheight" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half">
              <div className="card">
                <header className="card-header" style={{ backgroundColor: '#001391' }}>
                  <p className="card-header-title has-text-white">
                    🎯 Sistema Avanzado de Gestión de Archivos
                  </p>
                </header>
                <div className="card-content">
                  {!welcomeMessage ? (
                    <>
                      <div className="content has-text-centered mb-5">
                        <h1 className="title is-3" style={{ color: '#001391' }}>
                          ¡Bienvenido!
                        </h1>
                        <p className="subtitle is-5 has-text-grey">
                          Sistema con conceptos avanzados de programación
                        </p>
                      </div>

                      <form onSubmit={handleLogin}>
                        <div className="field">
                          <label className="label" style={{ color: '#001391' }}>
                            Ingresa tu nombre o nickname
                          </label>
                          <div className="control has-icons-left">
                            <input
                              className={`input is-medium ${error ? 'is-danger' : ''}`}
                              type="text"
                              placeholder="Tu nombre aquí..."
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              disabled={isLoading}
                              maxLength={20}
                            />
                            <span className="icon is-left">
                              <i className="fas fa-user"></i>
                            </span>
                          </div>
                          {error && (
                            <p className="help is-danger">{error}</p>
                          )}
                        </div>

                        <div className="field">
                          <div className="control">
                            <button
                              className={`button is-large is-fullwidth ${isLoading ? 'is-loading' : ''}`}
                              type="submit"
                              style={{
                                backgroundColor: '#001391',
                                color: 'white',
                                borderColor: '#001391'
                              }}
                              disabled={isLoading}
                            >
                              {isLoading ? 'Conectando...' : 'Ingresar al Sistema'}
                            </button>
                          </div>
                        </div>
                      </form>

                      <div className="content has-text-centered mt-5">
                        <p className="is-size-7 has-text-grey">
                          <span className="icon-text">
                            <span className="icon">
                              <i className="fas fa-info-circle"></i>
                            </span>
                            <span>
                              Este sistema implementa concatenación de cadenas, tuplas, 
                              diccionarios y manejo de excepciones
                            </span>
                          </span>
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="content has-text-centered">
                      <div className="notification is-success">
                        <h2 className="title is-4">¡Conexión Exitosa!</h2>
                        <div className="box" style={{ backgroundColor: '#f8f9fa' }}>
                          <pre style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>
                            {welcomeMessage}
                          </pre>
                        </div>
                        <p className="subtitle is-6 mt-3">
                          Preparando sistema avanzado...
                        </p>
                        <progress className="progress is-success" max="100">
                          90%
                        </progress>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Info cards */}
              <div className="columns is-multiline mt-4">
                <div className="column is-half">
                  <div className="card">
                    <div className="card-content has-text-centered">
                      <span className="icon is-large has-text-success">
                        <i className="fas fa-code fa-2x"></i>
                      </span>
                      <p className="subtitle is-6 mt-2">
                        <strong>Conceptos Implementados</strong><br/>
                        Concatenación, Tuplas, Diccionarios
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="card">
                    <div className="card-content has-text-centered">
                      <span className="icon is-large has-text-info">
                        <i className="fas fa-database fa-2x"></i>
                      </span>
                      <p className="subtitle is-6 mt-2">
                        <strong>Gestión de Archivos</strong><br/>
                        Leer, Escribir, Crear con fechas
                      </p>
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
};