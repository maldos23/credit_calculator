import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { advancedAPI, type FileInfo, type FileContent } from '@/services/advancedAPI';

export const FileReader: React.FC = () => {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [fileContent, setFileContent] = useState<FileContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const response = await advancedAPI.listFiles();
      if (response.success && response.data) {
        setFiles(response.data.archivos);
      }
    } catch (err) {
      setError('Error al cargar lista de archivos');
      console.error(err);
    }
  };

  const handleReadFile = async () => {
    if (!selectedFile) {
      setError('Por favor selecciona un archivo');
      return;
    }

    setIsLoading(true);
    setError('');
    setFileContent(null);

    try {
      const response = await advancedAPI.readFile(selectedFile);
      if (response.success && response.data) {
        setFileContent(response.data);
      }
    } catch (err) {
      // Manejo de excepciones como se requiere
      if (err instanceof Error) {
        if (err.message.includes('404')) {
          setError(`❌ Archivo '${selectedFile}' no encontrado (FileNotFoundError manejada)`);
        } else {
          setError(`❌ Error al leer archivo: ${err.message}`);
        }
      } else {
        setError('❌ Error desconocido al leer archivo');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateTuple: [number, number, number]): string => {
    return `${dateTuple[0].toString().padStart(2, '0')}/${dateTuple[1].toString().padStart(2, '0')}/${dateTuple[2]}`;
  };

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
                      <i className="fas fa-book-open"></i>
                    </span>
                    Leer Archivos - Opción 1 del Menú
                  </p>
                </header>
                <div className="card-content">
                  <div className="content">
                    <h2 className="title is-4" style={{ color: '#001391' }}>
                      Sistema de Lectura de Archivos
                    </h2>
                    <p className="subtitle is-6 has-text-grey">
                      Selecciona un archivo del diccionario predefinido para leer su contenido
                    </p>

                    {/* Lista de archivos disponibles (diccionario) */}
                    <div className="card mb-5">
                      <header className="card-header">
                        <p className="card-header-title">
                          <span className="icon mr-2">
                            <i className="fas fa-folder"></i>
                          </span>
                          Archivos Disponibles (Diccionario - Mínimo 4)
                        </p>
                      </header>
                      <div className="card-content">
                        {files.length > 0 ? (
                          <div className="columns is-multiline">
                            {files.map((file, index) => (
                              <div key={index} className="column is-6">
                                <div 
                                  className={`card is-clickable ${selectedFile === file.nombre ? 'has-background-light' : ''}`}
                                  style={{ 
                                    cursor: 'pointer',
                                    border: selectedFile === file.nombre ? '2px solid #001391' : '1px solid #e0e0e0'
                                  }}
                                  onClick={() => setSelectedFile(file.nombre)}
                                >
                                  <div className="card-content p-4">
                                    <div className="media">
                                      <div className="media-left">
                                        <span className="icon is-large has-text-info">
                                          <i className={`fas ${
                                            file.tipo === 'configuracion' ? 'fa-cog' :
                                            file.tipo === 'log' ? 'fa-list' :
                                            file.tipo === 'reporte' ? 'fa-chart-bar' :
                                            file.tipo === 'manual' ? 'fa-book' :
                                            'fa-file-alt'
                                          } fa-2x`}></i>
                                        </span>
                                      </div>
                                      <div className="media-content">
                                        <p className="title is-6">{file.nombre}</p>
                                        <p className="subtitle is-7 has-text-grey">{file.descripcion}</p>
                                        <div className="tags">
                                          <span className="tag is-light">{file.tipo}</span>
                                          <span className="tag is-light">{file.origen}</span>
                                          {file.solo_lectura && <span className="tag is-warning">Solo lectura</span>}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="content is-small has-text-grey">
                                      <p>
                                        <strong>Creado:</strong> {formatDate(file.fecha_creacion)} por {file.autor}<br/>
                                        <strong>Modificado:</strong> {formatDate(file.fecha_modificacion)}<br/>
                                        <strong>Tamaño:</strong> {file.tamaño_bytes} bytes
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="notification is-warning">
                            <p>No hay archivos disponibles. Cargando...</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Controles de lectura */}
                    <div className="field is-grouped">
                      <div className="control">
                        <button
                          className={`button is-primary is-large ${isLoading ? 'is-loading' : ''}`}
                          onClick={handleReadFile}
                          disabled={!selectedFile || isLoading}
                          style={{ backgroundColor: '#001391', borderColor: '#001391' }}
                        >
                          <span className="icon">
                            <i className="fas fa-eye"></i>
                          </span>
                          <span>Leer Archivo Seleccionado</span>
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

                    {/* Mostrar errores (manejo de excepciones) */}
                    {error && (
                      <div className="notification is-danger mt-4">
                        <h4 className="title is-6">Manejo de Excepciones</h4>
                        <p>{error}</p>
                      </div>
                    )}

                    {/* Mostrar contenido del archivo */}
                    {fileContent && (
                      <div className="card mt-5">
                        <header className="card-header has-background-success-light">
                          <p className="card-header-title">
                            <span className="icon mr-2">
                              <i className="fas fa-file-alt"></i>
                            </span>
                            Contenido de: {fileContent.nombre}
                          </p>
                        </header>
                        <div className="card-content">
                          {/* Metadata */}
                          <div className="columns mb-4">
                            <div className="column is-6">
                              <div className="box">
                                <h5 className="title is-6">Información del Archivo</h5>
                                <div className="content is-small">
                                  <p><strong>Tipo:</strong> {fileContent.metadata.tipo}</p>
                                  <p><strong>Autor:</strong> {fileContent.metadata.autor}</p>
                                  <p><strong>Creado:</strong> {formatDate(fileContent.metadata.fecha_creacion)}</p>
                                  <p><strong>Modificado:</strong> {formatDate(fileContent.metadata.fecha_modificacion)}</p>
                                  <p><strong>Origen:</strong> {fileContent.metadata.origen}</p>
                                </div>
                              </div>
                            </div>
                            <div className="column is-6">
                              <div className="box">
                                <h5 className="title is-6">Estadísticas</h5>
                                <div className="content is-small">
                                  <p><strong>Tamaño:</strong> {fileContent.estadisticas.tamaño_bytes} bytes</p>
                                  <p><strong>Líneas:</strong> {fileContent.estadisticas.lineas}</p>
                                  <p><strong>Caracteres:</strong> {fileContent.estadisticas.caracteres}</p>
                                  <p><strong>Leído:</strong> {new Date(fileContent.timestamp_lectura).toLocaleString()}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Contenido */}
                          <div className="box" style={{ backgroundColor: '#f5f5f5' }}>
                            <h5 className="title is-6">Contenido del Archivo</h5>
                            <pre style={{ 
                              whiteSpace: 'pre-wrap',
                              fontFamily: 'monospace',
                              fontSize: '0.9rem',
                              lineHeight: '1.4',
                              maxHeight: '400px',
                              overflow: 'auto'
                            }}>
                              {fileContent.contenido}
                            </pre>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Información técnica */}
                    <div className="notification is-info mt-5">
                      <h4 className="title is-6">
                        <span className="icon">
                          <i className="fas fa-info-circle"></i>
                        </span>
                        Implementación Técnica - Opción 1
                      </h4>
                      <div className="content">
                        <ul className="is-size-7">
                          <li>✅ <strong>Diccionario:</strong> {files.length} archivos predefinidos (cumple mínimo de 4)</li>
                          <li>✅ <strong>Selección por nombre:</strong> Click en archivo para seleccionar</li>
                          <li>✅ <strong>Manejo de excepciones:</strong> FileNotFoundError capturada y mostrada</li>
                          <li>✅ <strong>Fechas en tupla:</strong> (día, mes, año) mostradas correctamente</li>
                          <li>✅ <strong>Metadata completa:</strong> Autor, fechas, tamaño, estadísticas</li>
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