import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { advancedAPI } from '@/services/advancedAPI';

interface NewFileData {
  nombre: string;
  contenido: string;
  tipo: 'configuracion' | 'log' | 'reporte' | 'manual' | 'datos';
  descripcion: string;
}

export const FileCreator: React.FC = () => {
  const [formData, setFormData] = useState<NewFileData>({
    nombre: '',
    contenido: '',
    tipo: 'datos',
    descripcion: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.nombre.trim()) {
      setError('❌ El nombre del archivo es obligatorio');
      return false;
    }

    if (!formData.contenido.trim()) {
      setError('❌ El contenido del archivo no puede estar vacío');
      return false;
    }

    if (!formData.descripcion.trim()) {
      setError('❌ La descripción del archivo es obligatoria');
      return false;
    }

    // Validar formato de nombre de archivo
    const nombreValido = /^[a-zA-Z0-9_.-]+\.(txt|md|json|log|cfg)$/;
    if (!nombreValido.test(formData.nombre)) {
      setError('❌ Nombre inválido. Use formato: archivo.extension (txt|md|json|log|cfg)');
      return false;
    }

    return true;
  };

  const handleCreateFile = async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await advancedAPI.createFile(
        formData.nombre,
        formData.contenido,
        'Sistema', // autor
        formData.tipo,
        formData.descripcion
      );

      if (response.success) {
        setSuccess(`✅ Archivo '${formData.nombre}' creado exitosamente`);
        // Limpiar formulario
        setFormData({
          nombre: '',
          contenido: '',
          tipo: 'datos',
          descripcion: ''
        });
      }
    } catch (err) {
      // Manejo de excepciones como se requiere
      if (err instanceof Error) {
        if (err.message.includes('FileExistsError')) {
          setError(`❌ El archivo '${formData.nombre}' ya existe (FileExistsError manejada)`);
        } else if (err.message.includes('PermissionError')) {
          setError(`❌ Sin permisos para crear archivo (PermissionError manejada)`);
        } else if (err.message.includes('InvalidNameError')) {
          setError(`❌ Nombre de archivo inválido (InvalidNameError manejada)`);
        } else {
          setError(`❌ Error al crear archivo: ${err.message}`);
        }
      } else {
        setError('❌ Error desconocido al crear archivo');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeDescription = (tipo: string): string => {
    switch (tipo) {
      case 'configuracion':
        return 'Archivos de configuración del sistema (.cfg, .json)';
      case 'log':
        return 'Archivos de registro de eventos (.log, .txt)';
      case 'reporte':
        return 'Reportes y documentos (.md, .txt)';
      case 'manual':
        return 'Documentación y manuales (.md, .txt)';
      case 'datos':
        return 'Archivos de datos generales (.txt, .json)';
      default:
        return 'Tipo de archivo personalizado';
    }
  };

  return (
    <div className="hero is-fullheight has-background-light">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-8">
              <div className="card">
                <header className="card-header" style={{ backgroundColor: '#001391' }}>
                  <p className="card-header-title has-text-white">
                    <span className="icon mr-2">
                      <i className="fas fa-plus-circle"></i>
                    </span>
                    Crear Archivos - Opción 3 del Menú
                  </p>
                </header>
                <div className="card-content">
                  <div className="content">
                    <h2 className="title is-4" style={{ color: '#001391' }}>
                      Sistema de Creación de Archivos
                    </h2>
                    <p className="subtitle is-6 has-text-grey">
                      Crea nuevos archivos para agregar al diccionario del sistema
                    </p>

                    {/* Formulario de creación */}
                    <div className="card mb-5">
                      <header className="card-header">
                        <p className="card-header-title">
                          <span className="icon mr-2">
                            <i className="fas fa-file-plus"></i>
                          </span>
                          Formulario de Nuevo Archivo
                        </p>
                      </header>
                      <div className="card-content">
                        {/* Nombre del archivo */}
                        <div className="field">
                          <label className="label" htmlFor="file-name-input">
                            Nombre del archivo *
                          </label>
                          <div className="control has-icons-left">
                            <input
                              id="file-name-input"
                              className="input"
                              type="text"
                              name="nombre"
                              value={formData.nombre}
                              onChange={handleInputChange}
                              placeholder="ejemplo: mi_archivo.txt"
                            />
                            <span className="icon is-small is-left">
                              <i className="fas fa-file"></i>
                            </span>
                          </div>
                          <p className="help has-text-grey">
                            Incluye la extensión: .txt, .md, .json, .log, .cfg
                          </p>
                        </div>

                        {/* Tipo de archivo */}
                        <div className="field">
                          <label className="label" htmlFor="file-type-select">
                            Tipo de archivo *
                          </label>
                          <div className="control has-icons-left">
                            <div className="select is-fullwidth">
                              <select
                                id="file-type-select"
                                name="tipo"
                                value={formData.tipo}
                                onChange={handleInputChange}
                              >
                                <option value="datos">Datos generales</option>
                                <option value="configuracion">Configuración</option>
                                <option value="log">Registro (Log)</option>
                                <option value="reporte">Reporte</option>
                                <option value="manual">Manual</option>
                              </select>
                            </div>
                            <span className="icon is-small is-left">
                              <i className="fas fa-tags"></i>
                            </span>
                          </div>
                          <p className="help has-text-grey">
                            {getTypeDescription(formData.tipo)}
                          </p>
                        </div>

                        {/* Descripción */}
                        <div className="field">
                          <label className="label" htmlFor="file-description-input">
                            Descripción *
                          </label>
                          <div className="control">
                            <input
                              id="file-description-input"
                              className="input"
                              type="text"
                              name="descripcion"
                              value={formData.descripcion}
                              onChange={handleInputChange}
                              placeholder="Breve descripción del contenido del archivo"
                            />
                          </div>
                          <p className="help has-text-grey">
                            Describe el propósito o contenido del archivo
                          </p>
                        </div>

                        {/* Contenido del archivo */}
                        <div className="field">
                          <label className="label" htmlFor="file-content-textarea">
                            Contenido del archivo *
                          </label>
                          <div className="control">
                            <textarea
                              id="file-content-textarea"
                              className="textarea"
                              name="contenido"
                              value={formData.contenido}
                              onChange={handleInputChange}
                              placeholder="Escribe aquí el contenido inicial del archivo..."
                              rows={10}
                              style={{ fontFamily: 'monospace' }}
                            />
                          </div>
                          <p className="help has-text-grey">
                            Contenido inicial que tendrá el archivo al crearse
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Vista previa */}
                    {formData.nombre && formData.contenido && (
                      <div className="card mb-5">
                        <header className="card-header">
                          <p className="card-header-title">
                            <span className="icon mr-2">
                              <i className="fas fa-eye"></i>
                            </span>
                            Vista Previa
                          </p>
                        </header>
                        <div className="card-content">
                          <div className="content">
                            <div className="columns">
                              <div className="column is-4">
                                <strong>Nombre:</strong> {formData.nombre}<br/>
                                <strong>Tipo:</strong> {formData.tipo}<br/>
                                <strong>Descripción:</strong> {formData.descripcion}<br/>
                                <strong>Tamaño:</strong> {new Blob([formData.contenido]).size} bytes
                              </div>
                              <div className="column is-8">
                                <div className="box" style={{ backgroundColor: '#f5f5f5' }}>
                                  <p className="has-text-weight-bold mb-2">Contenido:</p>
                                  <pre style={{
                                    whiteSpace: 'pre-wrap',
                                    fontSize: '0.85rem',
                                    maxHeight: '200px',
                                    overflow: 'auto'
                                  }}>
                                    {formData.contenido}
                                  </pre>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Controles */}
                    <div className="field is-grouped">
                      <div className="control">
                        <button
                          className={`button is-success is-large ${isLoading ? 'is-loading' : ''}`}
                          onClick={handleCreateFile}
                          disabled={isLoading}
                        >
                          <span className="icon">
                            <i className="fas fa-plus"></i>
                          </span>
                          <span>Crear Archivo</span>
                        </button>
                      </div>
                      <div className="control">
                        <button
                          className="button is-light is-large"
                          onClick={() => {
                            setFormData({
                              nombre: '',
                              contenido: '',
                              tipo: 'datos',
                              descripcion: ''
                            });
                            setError('');
                            setSuccess('');
                          }}
                        >
                          <span className="icon">
                            <i className="fas fa-eraser"></i>
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
                        <h4 className="title is-6">Archivo Creado</h4>
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
                        Implementación Técnica - Opción 3
                      </h4>
                      <div className="content">
                        <ul className="is-size-7">
                          <li>✅ <strong>Formulario completo:</strong> Nombre, tipo, descripción, contenido</li>
                          <li>✅ <strong>Validación:</strong> Formato de archivo y campos obligatorios</li>
                          <li>✅ <strong>Manejo de excepciones:</strong> FileExistsError, PermissionError, InvalidNameError</li>
                          <li>✅ <strong>Vista previa:</strong> Muestra archivo antes de crear</li>
                          <li>✅ <strong>Tipos predefinidos:</strong> 5 categorías de archivos disponibles</li>
                          <li>✅ <strong>Integración con diccionario:</strong> Archivos se añaden al sistema</li>
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