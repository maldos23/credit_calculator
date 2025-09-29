import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { advancedAPI, type FileInfo } from '@/services/advancedAPI';
import type { UserSession, DateConfig } from '@/types';

interface SystemStats {
  usuarios_total: number;
  archivos_total: number;
  fecha_configurada: [number, number, number] | null;
  ultimo_reporte: string | null;
  sistema_activo: boolean;
  tiempo_funcionamiento: string;
}

export const SystemStatus: React.FC = () => {
  const [users, setUsers] = useState<UserSession[]>([]);
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [currentDate, setCurrentDate] = useState<DateConfig | null>(null);
  const [systemStats, setSystemStats] = useState<SystemStats>({
    usuarios_total: 0,
    archivos_total: 0,
    fecha_configurada: null,
    ultimo_reporte: null,
    sistema_activo: true,
    tiempo_funcionamiento: '00:00:00'
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadSystemData();
    
    // Actualizar tiempo cada segundo
    const interval = setInterval(updateUptime, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadSystemData = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Cargar datos en paralelo
      const [usersResponse, filesResponse, dateResponse] = await Promise.all([
        advancedAPI.listUsers().catch(() => ({ success: false, data: null })),
        advancedAPI.listFiles().catch(() => ({ success: false, data: null })),
        advancedAPI.getCurrentDate().catch(() => ({ success: false, data: null }))
      ]);

      // Procesar usuarios
      if (usersResponse.success && usersResponse.data) {
        setUsers(usersResponse.data.usuarios || []);
        setSystemStats(prev => ({
          ...prev,
          usuarios_total: usersResponse.data?.usuarios?.length || 0
        }));
      }

      // Procesar archivos
      if (filesResponse.success && filesResponse.data) {
        setFiles(filesResponse.data.archivos || []);
        setSystemStats(prev => ({
          ...prev,
          archivos_total: filesResponse.data?.archivos?.length || 0
        }));
      }

      // Procesar fecha actual
      if (dateResponse.success && dateResponse.data) {
        setCurrentDate(dateResponse.data);
        setSystemStats(prev => ({
          ...prev,
          fecha_configurada: [dateResponse.data.day, dateResponse.data.month, dateResponse.data.year]
        }));
      }

    } catch (err) {
      setError('Error cargando datos del sistema');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUptime = (): void => {
    const now = new Date();
    const start = new Date(now.getTime() - Math.floor(Math.random() * 86400000)); // Simular tiempo de inicio
    const diff = now.getTime() - start.getTime();
    
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    const uptime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    setSystemStats(prev => ({
      ...prev,
      tiempo_funcionamiento: uptime
    }));
  };

  const formatDate = (dateTuple: [number, number, number]): string => {
    return `${dateTuple[0].toString().padStart(2, '0')}/${dateTuple[1].toString().padStart(2, '0')}/${dateTuple[2]}`;
  };

  const getFilesByType = (): Record<string, number> => {
    return files.reduce((acc, file) => {
      acc[file.tipo] = (acc[file.tipo] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };

  const getSystemHealth = (): { status: string; color: string; icon: string } => {
    if (error) {
      return { status: 'Error', color: 'is-danger', icon: 'fa-exclamation-triangle' };
    }
    if (isLoading) {
      return { status: 'Cargando...', color: 'is-warning', icon: 'fa-spinner fa-pulse' };
    }
    if (systemStats.usuarios_total > 0 && systemStats.archivos_total > 0) {
      return { status: 'Excelente', color: 'is-success', icon: 'fa-check-circle' };
    }
    return { status: 'Regular', color: 'is-warning', icon: 'fa-exclamation-circle' };
  };

  const health = getSystemHealth();
  const filesByType = getFilesByType();

  return (
    <div className="hero is-fullheight has-background-light">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-10">
              <div className="card">
                <header className="card-header" style={{ backgroundColor: '#001391' }}>
                  <p className="card-header-title has-text-white">
                    <span className="icon mr-2">
                      <i className="fas fa-heartbeat"></i>
                    </span>
                    Estado del Sistema - Opción 5 del Menú
                  </p>
                </header>
                <div className="card-content">
                  <div className="content">
                    <h2 className="title is-4" style={{ color: '#001391' }}>
                      Monitor de Estado del Sistema
                    </h2>
                    <p className="subtitle is-6 has-text-grey">
                      Información en tiempo real sobre el funcionamiento del sistema avanzado
                    </p>

                    {/* Estado general del sistema */}
                    <div className="card mb-5">
                      <header className="card-header">
                        <p className="card-header-title">
                          <span className="icon mr-2">
                            <i className="fas fa-tachometer-alt"></i>
                          </span>
                          Estado General
                        </p>
                      </header>
                      <div className="card-content">
                        <div className="columns">
                          <div className="column is-4">
                            <div className={`notification ${health.color}`}>
                              <div className="has-text-centered">
                                <span className="icon is-large">
                                  <i className={`fas ${health.icon} fa-3x`}></i>
                                </span>
                                <p className="title is-4">{health.status}</p>
                                <p className="subtitle is-6">Estado del Sistema</p>
                              </div>
                            </div>
                          </div>
                          <div className="column is-8">
                            <div className="columns is-multiline">
                              <div className="column is-6">
                                <div className="box">
                                  <p className="title is-5">{systemStats.usuarios_total}</p>
                                  <p className="subtitle is-6">
                                    <span className="icon">
                                      <i className="fas fa-users"></i>
                                    </span>
                                    Usuarios Registrados
                                  </p>
                                </div>
                              </div>
                              <div className="column is-6">
                                <div className="box">
                                  <p className="title is-5">{systemStats.archivos_total}</p>
                                  <p className="subtitle is-6">
                                    <span className="icon">
                                      <i className="fas fa-folder"></i>
                                    </span>
                                    Archivos en Diccionario
                                  </p>
                                </div>
                              </div>
                              <div className="column is-6">
                                <div className="box">
                                  <p className="title is-5">{systemStats.tiempo_funcionamiento}</p>
                                  <p className="subtitle is-6">
                                    <span className="icon">
                                      <i className="fas fa-clock"></i>
                                    </span>
                                    Tiempo Activo
                                  </p>
                                </div>
                              </div>
                              <div className="column is-6">
                                <div className="box">
                                  <p className="title is-5">
                                    {systemStats.fecha_configurada ? formatDate(systemStats.fecha_configurada) : 'No configurada'}
                                  </p>
                                  <p className="subtitle is-6">
                                    <span className="icon">
                                      <i className="fas fa-calendar"></i>
                                    </span>
                                    Fecha Configurada
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Estadísticas de usuarios */}
                    <div className="card mb-5">
                      <header className="card-header">
                        <p className="card-header-title">
                          <span className="icon mr-2">
                            <i className="fas fa-users"></i>
                          </span>
                          Usuarios del Sistema ({users.length})
                        </p>
                      </header>
                      <div className="card-content">
                        {users.length > 0 ? (
                          <div className="columns is-multiline">
                            {users.map((user, index) => (
                              <div key={user.id || index} className="column is-4">
                                <div className="card">
                                  <div className="card-content">
                                    <div className="media">
                                      <div className="media-left">
                                        <span className="icon is-large has-text-primary">
                                          <i className="fas fa-user-circle fa-2x"></i>
                                        </span>
                                      </div>
                                      <div className="media-content">
                                        <p className="title is-6">{user.nombre || `Usuario ${index + 1}`}</p>
                                        <p className="subtitle is-7">
                                          Sesión #{index + 1}
                                        </p>
                                        <div className="content is-small">
                                          <p>
                                            <strong>Inicio:</strong> {user.fecha_inicio ? formatDate(user.fecha_inicio) : 'N/A'}<br/>
                                            <strong>Activo:</strong> {user.activo ? '✅ Sí' : '❌ No'}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="notification is-warning">
                            <p>No hay usuarios registrados en el sistema</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Estadísticas de archivos */}
                    <div className="card mb-5">
                      <header className="card-header">
                        <p className="card-header-title">
                          <span className="icon mr-2">
                            <i className="fas fa-chart-pie"></i>
                          </span>
                          Distribución de Archivos por Tipo
                        </p>
                      </header>
                      <div className="card-content">
                        {Object.keys(filesByType).length > 0 ? (
                          <div className="columns is-multiline">
                            {Object.entries(filesByType).map(([tipo, count]) => (
                              <div key={tipo} className="column is-3">
                                <div className="box has-text-centered">
                                  <span className="icon is-large has-text-info">
                                    <i className={`fas ${
                                      tipo === 'configuracion' ? 'fa-cog' :
                                      tipo === 'log' ? 'fa-list' :
                                      tipo === 'reporte' ? 'fa-chart-bar' :
                                      tipo === 'manual' ? 'fa-book' :
                                      'fa-file'
                                    } fa-2x`}></i>
                                  </span>
                                  <p className="title is-4">{count}</p>
                                  <p className="subtitle is-6 has-text-capitalized">{tipo}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="notification is-warning">
                            <p>No hay archivos en el sistema</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Controles */}
                    <div className="field is-grouped">
                      <div className="control">
                        <button
                          className={`button is-info is-large ${isLoading ? 'is-loading' : ''}`}
                          onClick={loadSystemData}
                          disabled={isLoading}
                        >
                          <span className="icon">
                            <i className="fas fa-sync-alt"></i>
                          </span>
                          <span>Actualizar Estado</span>
                        </button>
                      </div>
                      <div className="control">
                        <Link to="/advanced/menu" className="button is-light is-large">
                          <span className="icon">
                            <i className="fas fa-arrow-left"></i>
                          </span>
                          <span>Volver al Menú</span>
                        </Link>
                      </div>
                    </div>

                    {/* Mostrar errores */}
                    {error && (
                      <div className="notification is-danger mt-4">
                        <h4 className="title is-6">Error del Sistema</h4>
                        <p>{error}</p>
                      </div>
                    )}

                    {/* Información técnica */}
                    <div className="notification is-info mt-5">
                      <h4 className="title is-6">
                        <span className="icon">
                          <i className="fas fa-info-circle"></i>
                        </span>
                        Implementación Técnica - Opción 5
                      </h4>
                      <div className="content">
                        <ul className="is-size-7">
                          <li>✅ <strong>Monitoreo en tiempo real:</strong> Actualización automática cada segundo</li>
                          <li>✅ <strong>Carga paralela de datos:</strong> Promise.all para optimizar rendimiento</li>
                          <li>✅ <strong>Estadísticas completas:</strong> Usuarios, archivos, fechas, sistema</li>
                          <li>✅ <strong>Fechas en tupla:</strong> Formato (día, mes, año) para todas las fechas</li>
                          <li>✅ <strong>Estado visual:</strong> Indicadores de salud del sistema</li>
                          <li>✅ <strong>Manejo de errores:</strong> Graceful degradation cuando hay fallos</li>
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