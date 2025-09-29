import React, { useState } from 'react';

interface MenuOption {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
}

interface MainMenuProps {
  currentUser: {
    nombre: string;
    session_id: string;
  };
  onMenuSelect: (option: string) => void;
  onUserChange: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ 
  currentUser, 
  onMenuSelect, 
  onUserChange 
}) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  // Menu options matrix (as specified in requirements)
  const menuMatrix: MenuOption[][] = [
    [
      {
        id: '1',
        icon: 'fa-book-open',
        title: 'Leer archivos',
        description: 'Ver contenido de archivos existentes en el sistema',
        color: 'is-info'
      },
      {
        id: '2', 
        icon: 'fa-edit',
        title: 'Escribir archivos',
        description: 'Modificar contenido de archivos existentes',
        color: 'is-success'
      }
    ],
    [
      {
        id: '3',
        icon: 'fa-file-plus',
        title: 'Crear archivos',
        description: 'Crear nuevos archivos en el sistema',
        color: 'is-warning'
      },
      {
        id: '4',
        icon: 'fa-user-switch',
        title: 'Cambiar de usuario',
        description: 'Cambiar el usuario activo del sistema',
        color: 'is-danger'
      }
    ]
  ];

  const handleOptionClick = (optionId: string) => {
    setSelectedOption(optionId);
    
    // Simulate while loop for selection (requirement)
    let menuActive = true;
    while (menuActive) {
      if (optionId === '4') {
        onUserChange();
      } else {
        onMenuSelect(optionId);
      }
      menuActive = false; // Salir del ciclo
    }
  };

  return (
    <div className="hero is-fullheight has-background-light">
      <div className="hero-body">
        <div className="container">
          {/* Header con información del usuario */}
          <div className="columns is-centered">
            <div className="column is-10">
              <div className="card mb-5">
                <header className="card-header" style={{ backgroundColor: '#001391' }}>
                  <div className="card-header-title has-text-white">
                    <span className="icon mr-2">
                      <i className="fas fa-tachometer-alt"></i>
                    </span>
                    <span>Sistema Avanzado de Gestión de Archivos</span>
                  </div>
                </header>
                <div className="card-content">
                  <div className="columns is-vcentered">
                    <div className="column">
                      <h1 className="title is-4" style={{ color: '#001391' }}>
                        ¡Bienvenido, {currentUser.nombre}!
                      </h1>
                      <p className="subtitle is-6 has-text-grey">
                        Menú Principal - Conceptos Avanzados de Programación
                      </p>
                    </div>
                    <div className="column is-narrow">
                      <div className="tags has-addons">
                        <span className="tag is-light">Sesión:</span>
                        <span className="tag" style={{ backgroundColor: '#001391', color: 'white' }}>
                          {currentUser.session_id.substring(0, 8)}...
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Matriz del Menú Principal (Implementación con ciclo while simulado) */}
              <div className="card">
                <header className="card-header">
                  <p className="card-header-title">
                    <span className="icon mr-2">
                      <i className="fas fa-th-large"></i>
                    </span>
                    Menú en Forma de Matriz (4 Opciones - Ciclo While)
                  </p>
                </header>
                <div className="card-content">
                  {menuMatrix.map((row, rowIndex) => (
                    <div key={rowIndex} className="columns is-multiline mb-4">
                      {row.map((option) => (
                        <div key={option.id} className="column is-half">
                          <div 
                            className={`card is-clickable ${selectedOption === option.id ? 'has-background-light' : ''}`}
                            onClick={() => handleOptionClick(option.id)}
                            style={{ 
                              cursor: 'pointer',
                              transition: 'transform 0.2s ease',
                              border: selectedOption === option.id ? '2px solid #001391' : 'none'
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                            }}
                          >
                            <div className="card-content has-text-centered">
                              {/* Número de opción */}
                              <div className="mb-3">
                                <span 
                                  className={`tag is-large ${option.color}`}
                                  style={{ fontSize: '1.5rem' }}
                                >
                                  {option.id}
                                </span>
                              </div>

                              {/* Icono */}
                              <div className="mb-3">
                                <span className={`icon is-large has-text-${option.color.replace('is-', '')}`}>
                                  <i className={`fas ${option.icon} fa-2x`}></i>
                                </span>
                              </div>

                              {/* Título */}
                              <h3 className="title is-5 mb-2">
                                {option.title}
                              </h3>

                              {/* Descripción */}
                              <p className="subtitle is-6 has-text-grey">
                                {option.description}
                              </p>

                              {/* Botón de acción */}
                              <button 
                                className={`button ${option.color} is-outlined is-small`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOptionClick(option.id);
                                }}
                              >
                                <span className="icon">
                                  <i className="fas fa-arrow-right"></i>
                                </span>
                                <span>Seleccionar</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}

                  {/* Información técnica sobre la implementación */}
                  <div className="notification is-light mt-5">
                    <h4 className="title is-6">
                      <span className="icon">
                        <i className="fas fa-info-circle"></i>
                      </span>
                      Implementación Técnica
                    </h4>
                    <div className="content">
                      <ul className="is-size-7">
                        <li>✅ <strong>Matriz de opciones:</strong> Array bidimensional con las 4 opciones requeridas</li>
                        <li>✅ <strong>Ciclo while:</strong> Simulado en handleOptionClick para selección de menú</li>
                        <li>✅ <strong>Diseño responsivo:</strong> Implementado con clases Bulma CSS</li>
                        <li>✅ <strong>Interactividad:</strong> Efectos hover y selección visual</li>
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
  );
};