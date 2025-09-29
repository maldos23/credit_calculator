# API Pre-evaluador de Crédito BBVA

Un sistema de pre-evaluación de solicitudes de crédito basado en FastAPI que proporciona decisiones automatizadas de crédito basadas en reglas de negocio configurables.

## Características

- **Evaluación de Solicitudes de Crédito**: Evaluación automatizada de solicitudes de crédito con decisiones de aprobación, contraoferta o rechazo
- **Gestión de Políticas**: Políticas de crédito y reglas de negocio configurables
- **API RESTful**: API REST limpia con documentación OpenAPI
- **Validación de Datos**: Validación comprensiva de entrada usando modelos Pydantic
- **Monitoreo de Salud**: Endpoints integrados de verificación de salud

## Estructura del Proyecto

```
api/
├── app/
│   ├── core/
│   │   ├── __init__.py
│   │   └── config.py          # Configuración y ajustes de políticas
│   ├── models/
│   │   ├── __init__.py
│   │   ├── application.py     # Modelos de datos para aplicaciones
│   │   └── schemas.py         # Esquemas Pydantic para la API
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── credit.py          # Endpoints de evaluación de crédito
│   │   └── health.py          # Endpoints de verificación de salud
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── calculators.py     # Utilidades de cálculo de crédito
│   │   ├── evaluator.py       # Lógica principal de evaluación
│   │   └── validators.py      # Validación de aplicaciones
│   └── __init__.py
├── app_server.py              # Punto de entrada de la aplicación FastAPI
├── main.py                    # Aplicación de consola original
├── requirements.txt           # Dependencias de Python
└── README.es.md               # Este archivo
```

## Requisitos

- Python 3.13+
- FastAPI
- Uvicorn
- Pydantic

## Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd bbva-prevealuator-credit/api
```

2. Crea un entorno virtual:
```bash
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
```

3. Instala las dependencias:
```bash
pip install -r requirements.txt
```

## Ejecutando la Aplicación

### Modo Desarrollo
```bash
python app_server.py
```
o
```bash
uvicorn app_server:app --reload --host 0.0.0.0 --port 8000
```

### Modo Producción
```bash
uvicorn app_server:app --host 0.0.0.0 --port 8000
```

La API estará disponible en:
- **API**: http://localhost:8000
- **Documentación Interactiva**: http://localhost:8000/docs
- **Documentación ReDoc**: http://localhost:8000/redoc

## Endpoints de la API

### Verificación de Salud
- `GET /api/v1/health` - Verifica el estado de salud de la API

### Evaluación de Crédito
- `POST /api/v1/evaluate` - Evalúa una solicitud de crédito
- `GET /api/v1/policy` - Obtiene información de la política de crédito actual

## Ejemplos de Uso

### Verificación de Salud
```bash
curl http://localhost:8000/api/v1/health
```

### Evaluación de Solicitud de Crédito
```bash
curl -X POST "http://localhost:8000/api/v1/evaluate" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Juan Pérez",
       "age": 35,
       "monthly_income": 25000,
       "monthly_debt": 5000,
       "employment_type": "EMPLOYEE",
       "months_of_experience": 24,
       "credit_score": 720,
       "amount": 150000,
       "term": 36,
       "active_defaults": false
     }'
```

### Obtener Información de Políticas
```bash
curl http://localhost:8000/api/v1/policy
```

## Reglas de Política de Crédito

El sistema evalúa las solicitudes basándose en los siguientes criterios:

- **Edad**: 18-69 años
- **Ingresos**: Mínimo 7,500 MXN mensuales
- **Monto del Préstamo**: 10,000 - 300,000 MXN
- **Plazo del Préstamo**: 12-60 meses
- **Experiencia Laboral**: 
  - Empleados: mínimo 6 meses
  - Trabajadores independientes: mínimo 12 meses
- **Puntaje Crediticio**: Mínimo 600
- **Límites DTI**:
  - DTI actual: ≤ 40%
  - DTI total (incluyendo nuevo préstamo): ≤ 50%
- **Capacidad de Pago**: ≤ 30% de los ingresos
- **Estado de Incumplimiento**: No se permiten incumplimientos activos

## Tipos de Decisión

1. **APPROVED**: La solicitud cumple con todos los criterios
2. **COUNTEROFFER**: Se ofrecen términos alternativos cuando la solicitud original no cumple con los límites de DTI/capacidad de pago
3. **REJECTED**: La solicitud falla en uno o más criterios básicos

## Configuración

Los ajustes de la aplicación pueden configurarse a través de variables de entorno o el archivo `app/core/config.py`:

- `APP_NAME`: Nombre de la aplicación
- `VERSION`: Versión de la API
- `DESCRIPTION`: Descripción de la API
- `DEBUG`: Habilitar modo debug
- `HOST`: Host del servidor
- `PORT`: Puerto del servidor

## Desarrollo

### Ejecutar Pruebas
```bash
python -m pytest tests/
```

### Calidad del Código
```bash
# Formatear código
black app/

# Verificar linting
flake8 app/

# Verificación de tipos
mypy app/
```

## Contribuyendo

1. Fork el repositorio
2. Crea una rama de característica
3. Haz tus cambios
4. Agrega pruebas si es aplicable
5. Envía un pull request

## Licencia

Este proyecto es para propósitos educativos.