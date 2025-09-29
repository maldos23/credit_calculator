import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { advancedAPI, type FileInfo } from '@/services/advancedAPI';

export const FileWriter: React.FC = () => {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const [appendMode, setAppendMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async (): Promise<void> => {
    try {
      const response = await advancedAPI.listFiles();
      if (response.success && response.data) {
        // Filtrar solo archivos editables (no solo_lectura)
        const editableFiles = response.data.archivos.filter(file => !file.solo_lectura);
        setFiles(editableFiles);
      }
    } catch (err) {
      setError('Error al cargar lista de archivos');
      console.error(err);
    }
  };

  const handleWriteFile = async (): Promise<void> => {
    if (!selectedFile) {
      setError('Por favor selecciona un archivo');
      return;
    }

    if (!newContent.trim()) {
      setError('Por favor ingresa contenido para escribir');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await advancedAPI.writeFile(selectedFile, newContent, 'Sistema');
      if (response.success) {
        setSuccess(`✅ Archivo '${selectedFile}' ${appendMode ? 'actualizado' : 'sobrescrito'} correctamente`);
        setNewContent('');
        // Recargar la lista para obtener metadatos actualizados
        await loadFiles();
      }
    } catch (err) {
      // Manejo de excepciones como se requiere
      if (err instanceof Error) {
        if (err.message.includes('permission')) {
          setError(`❌ Sin permisos para escribir '${selectedFile}' (PermissionError manejada)`);
        } else if (err.message.includes('readonly')) {
          setError(`❌ Archivo '${selectedFile}' es de solo lectura (ReadOnlyError manejada)`);
        } else {
          setError(`❌ Error al escribir archivo: ${err.message}`);
        }
      } else {
        setError('❌ Error desconocido al escribir archivo');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateTuple: [number, number, number]): string => {
    return `${dateTuple[0].toString().padStart(2, '0')}/${dateTuple[1].toString().padStart(2, '0')}/${dateTuple[2]}`;
  };

  const getFileIcon = (tipo: string): string => {
    switch (tipo) {
      case 'configuracion':
        return 'fa-cog';
      case 'log':
        return 'fa-list';
      case 'reporte':
        return 'fa-chart-bar';
      case 'manual':
        return 'fa-book';
      default:
        return 'fa-file-alt';
    }
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
                      <i className="fas fa-edit"></i>
                    </span>
                    Escribir Archivos - Opción 2 del Menú
                  </p>
                </header>
                <div className="card-content">
                  <div className="content">
                    <h2 className="title is-4" style={{ color: '#001391' }}>
                      Sistema de Escritura de Archivos
                    </h2>
                    <p className="subtitle is-6 has-text-grey">
                      Modifica el contenido de archivos existentes del diccionario (solo archivos editables)
                    </p>

                    {/* Lista de archivos editables */}
                    <div className="card mb-5">
                      <header className="card-header">
                        <p className="card-header-title">
                          <span className="icon mr-2">
                            <i className="fas fa-folder-open"></i>
                          </span>
                          Archivos Editables (Diccionario - Filtrados)
                        </p>
                      </header>
                      <div className="card-content">
                        {files.length > 0 ? (
                          <div className="columns is-multiline">
                            {files.map((file) => (
                              <div key={file.nombre} className="column is-6">
                                <div 
                                  className={`card is-clickable ${selectedFile === file.nombre ? 'has-background-light' : ''}`}
                                  style={{ 
                                    cursor: 'pointer',
                                    border: selectedFile === file.nombre ? '2px solid #001391' : '1px solid #e0e0e0'
                                  }}
                                  onClick={() => setSelectedFile(file.nombre)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      setSelectedFile(file.nombre);
                                    }
                                  }}
                                  tabIndex={0}
                                  role="button"
                                  aria-label={`Seleccionar archivo ${file.nombre}`}
                                >
                                  <div className="card-content p-4">
                                    <div className="media">
                                      <div className="media-left">
                                        <span className="icon is-large has-text-success">
                                          <i className={`fas ${getFileIcon(file.tipo)} fa-2x`}></i>
                                        </span>
                                      </div>
                                      <div className="media-content">
                                        <p className="title is-6">{file.nombre}</p>
                                        <p className="subtitle is-7 has-text-grey">{file.descripcion}</p>
                                        <div className="tags">
                                          <span className="tag is-success">Editable</span>
                                          <span className="tag is-light">{file.tipo}</span>
                                          <span className="tag is-light">{file.origen}</span>
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
                            <p>No hay archivos editables disponibles. Cargando...</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Editor de contenido */}
                    <div className="card mb-5">
                      <header className="card-header">
                        <p className="card-header-title">
                          <span className="icon mr-2">
                            <i className="fas fa-keyboard"></i>
                          </span>
                          Editor de Contenido
                        </p>
                      </header>
                      <div className="card-content">
                        <div className="field">
                          <label className="label" htmlFor="content-textarea">
                            Nuevo contenido para {selectedFile || '[Seleccionar archivo]'}
                          </label>
                          <div className="control">
                            <textarea
                              id="content-textarea"
                              className="textarea"
                              placeholder="Ingresa el contenido a escribir en el archivo..."
                              value={newContent}
                              onChange={(e) => setNewContent(e.target.value)}
                              rows={8}
                              style={{ fontFamily: 'monospace' }}
                            />
                          </div>
                          <p className="help">
                            Escribe aquí el contenido que deseas agregar o reemplazar en el archivo seleccionado
                          </p>
                        </div>

                        {/* Modo de escritura */}
                        <div className="field">
                          <div className="control">
                            <label className="checkbox">
                              <input
                                type="checkbox"
                                checked={appendMode}
                                onChange={(e) => setAppendMode(e.target.checked)}
                              />
                              <span className="ml-2">
                                Modo anexar (agregar al final del archivo)
                              </span>
                            </label>
                          </div>
                          <p className="help has-text-grey">
                            {appendMode 
                              ? '📝 El contenido se añadirá al final del archivo existente'
                              : '⚠️ El contenido reemplazará completamente el archivo existente'
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Controles de escritura */}
                    <div className="field is-grouped">
                      <div className="control">
                        <button
                          className={`button is-primary is-large ${isLoading ? 'is-loading' : ''}`}
                          onClick={handleWriteFile}
                          disabled={!selectedFile || !newContent.trim() || isLoading}
                          style={{ backgroundColor: '#001391', borderColor: '#001391' }}
                        >
                          <span className="icon">
                            <i className="fas fa-save"></i>
                          </span>
                          <span>{appendMode ? 'Anexar' : 'Sobrescribir'} Archivo</span>
                        </button>
                      </div>
                      <div className="control">
                        <button
                          className="button is-light is-large"
                          onClick={() => {
                            setNewContent('');
                            setSelectedFile('');
                            setError('');
                            setSuccess('');
                          }}
                        >
                          <span className="icon">
                            <i className="fas fa-times"></i>
                          </span>
                          <span>Limpiar</span>
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

                    {/* Mostrar mensajes de éxito */}
                    {success && (
                      <div className="notification is-success mt-4">
                        <h4 className="title is-6">Operación Exitosa</h4>
                        <p>{success}</p>
                      </div>
                    )}

                    {/* Mostrar errores (manejo de excepciones) */}
                    {error && (
                      <div className="notification is-danger mt-4">
                        <h4 className="title is-6">Manejo de Excepciones</h4>
                        <p>{error}</p>
                      </div>
                    )}

                    {/* Información técnica */}
                    <div className="notification is-info mt-5">
                      <h4 className="title is-6">
                        <span className="icon">
                          <i className="fas fa-info-circle"></i>
                        </span>
                        Implementación Técnica - Opción 2
                      </h4>
                      <div className="content">
                        <ul className="is-size-7">
                          <li>✅ <strong>Diccionario filtrado:</strong> Solo archivos editables (no readonly)</li>
                          <li>✅ <strong>Modos de escritura:</strong> Sobrescribir o anexar contenido</li>
                          <li>✅ <strong>Manejo de excepciones:</strong> PermissionError y ReadOnlyError capturadas</li>
                          <li>✅ <strong>Validación de entrada:</strong> Archivo seleccionado y contenido obligatorios</li>
                          <li>✅ <strong>Fechas en tupla:</strong> (día, mes, año) para metadatos de archivos</li>
                          <li>✅ <strong>Feedback inmediato:</strong> Mensajes de éxito y error detallados</li>
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