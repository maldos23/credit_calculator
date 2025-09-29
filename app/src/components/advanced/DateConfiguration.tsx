import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { advancedAPI } from '@/services/advancedAPI';

export const DateConfiguration: React.FC = () => {
  const [dia, setDia] = useState<number>(28);
  const [mes, setMes] = useState<number>(9);
  const [año, setAño] = useState<number>(2025);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [currentDate, setCurrentDate] = useState<[number, number, number] | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await advancedAPI.configureDate(dia, mes, año);
      
      if (response.success && response.data) {
        setCurrentDate(response.data.fecha_tupla);
        setMessage(`✅ Fecha configurada: ${response.data.fecha_formateada}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="hero is-fullheight has-background-light">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-6">
              <div className="card">
                <header className="card-header" style={{ backgroundColor: '#001391' }}>
                  <p className="card-header-title has-text-white">
                    <span className="icon mr-2">
                      <i className="fas fa-calendar-alt"></i>
                    </span>
                    Configuración de Fecha del Sistema
                  </p>
                </header>
                <div className="card-content">
                  <div className="content">
                    <h2 className="title is-4" style={{ color: '#001391' }}>
                      Configurar Fecha con Tuplas
                    </h2>
                    <p className="subtitle is-6 has-text-grey">
                      La fecha se almacenará como tupla (día, mes, año) según los requisitos
                    </p>

                    {currentDate && (
                      <div className="notification is-success mb-4">
                        <h4 className="title is-6">Fecha Actual del Sistema:</h4>
                        <p><strong>Tupla:</strong> ({currentDate[0]}, {currentDate[1]}, {currentDate[2]})</p>
                        <p><strong>Formato:</strong> {currentDate[0].toString().padStart(2, '0')}/{currentDate[1].toString().padStart(2, '0')}/{currentDate[2]}</p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      <div className="columns">
                        <div className="column is-4">
                          <div className="field">
                            <label className="label">Día</label>
                            <div className="control">
                              <input
                                className="input"
                                type="number"
                                min="1"
                                max="31"
                                value={dia}
                                onChange={(e) => setDia(Number(e.target.value))}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="column is-4">
                          <div className="field">
                            <label className="label">Mes</label>
                            <div className="control">
                              <div className="select is-fullwidth">
                                <select value={mes} onChange={(e) => setMes(Number(e.target.value))}>
                                  <option value={1}>01 - Enero</option>
                                  <option value={2}>02 - Febrero</option>
                                  <option value={3}>03 - Marzo</option>
                                  <option value={4}>04 - Abril</option>
                                  <option value={5}>05 - Mayo</option>
                                  <option value={6}>06 - Junio</option>
                                  <option value={7}>07 - Julio</option>
                                  <option value={8}>08 - Agosto</option>
                                  <option value={9}>09 - Septiembre</option>
                                  <option value={10}>10 - Octubre</option>
                                  <option value={11}>11 - Noviembre</option>
                                  <option value={12}>12 - Diciembre</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="column is-4">
                          <div className="field">
                            <label className="label">Año</label>
                            <div className="control">
                              <input
                                className="input"
                                type="number"
                                min="2020"
                                max="2030"
                                value={año}
                                onChange={(e) => setAño(Number(e.target.value))}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="field is-grouped">
                        <div className="control">
                          <button 
                            className={`button is-primary ${isLoading ? 'is-loading' : ''}`}
                            type="submit"
                            disabled={isLoading}
                            style={{ backgroundColor: '#001391', borderColor: '#001391' }}
                          >
                            <span className="icon">
                              <i className="fas fa-save"></i>
                            </span>
                            <span>Configurar Fecha</span>
                          </button>
                        </div>
                        <div className="control">
                          <Link to="/advanced/menu" className="button is-light">
                            <span className="icon">
                              <i className="fas fa-arrow-left"></i>
                            </span>
                            <span>Volver al Menú</span>
                          </Link>
                        </div>
                      </div>
                    </form>

                    {message && (
                      <div className={`notification ${message.includes('✅') ? 'is-success' : 'is-danger'} mt-4`}>
                        {message}
                      </div>
                    )}

                    <div className="notification is-info mt-5">
                      <h4 className="title is-6">
                        <span className="icon">
                          <i className="fas fa-info-circle"></i>
                        </span>
                        Información Técnica
                      </h4>
                      <div className="content">
                        <ul className="is-size-7">
                          <li>✅ <strong>Formato requerido:</strong> dd/mm/aaaa</li>
                          <li>✅ <strong>Almacenamiento:</strong> Como tupla (día, mes, año)</li>
                          <li>✅ <strong>Validación:</strong> Rangos apropiados para cada campo</li>
                          <li>✅ <strong>Uso:</strong> Se utiliza para crear y modificar archivos</li>
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
};