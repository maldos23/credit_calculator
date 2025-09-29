# BBVA Credit Calculator - Vercel Deploy

Esta aplicación está configurada para desplegarse en Vercel como una aplicación fullstack.

# BBVA Credit Calculator - Vercel Deploy

Esta aplicación está configurada para desplegarse en Vercel como una aplicación fullstack con configuraciones separadas.

## Estructura:
- Frontend: React + Vite (app/) - con su propio vercel.json
- Backend: FastAPI Python (api/) - con su propio vercel.json

## Configuraciones por carpeta:

### Frontend (app/vercel.json):
- Framework: Vite
- Build: npm run build
- Output: dist/
- Variables: VITE_API_URL configurada

### Backend (api/vercel.json):
- Runtime: Python 3.9
- Entry: main.py
- Routing: Manejo de rutas API

# BBVA Credit Calculator - Vercel Deploy

Esta aplicación está configurada para desplegarse en Vercel como una aplicación fullstack con configuraciones separadas.

## Estructura:
- Frontend: React + Vite (app/) - con su propio vercel.json
- Backend: FastAPI Python (api/) - con su propio vercel.json

## Configuraciones por carpeta:

### Frontend (app/vercel.json):
- Framework: Vite
- Build: npm run build
- Output: dist/
- Variables: VITE_API_URL configurada

### Backend (api/vercel.json):
- Runtime: Python 3.9
- Entry: main.py
- Routing: Manejo de rutas API
- **Puerto Dinámico**: Configurado para usar variable `PORT` de Vercel

## Variables de Entorno:

### Frontend:
- `VITE_API_URL`: URL del API (automática en producción)

### Backend:
- `PORT`: Puerto asignado automáticamente por Vercel
- `APP_NAME`: Nombre de la aplicación
- `VERSION`: Versión de la API
- `DEBUG`: Modo debug (false en producción)
- `HOST`: Host del servidor (0.0.0.0)

## Configuración de Puerto:
- **Desarrollo Local**: Puerto 8000 por defecto (configurable con `PORT=xxxx`)
- **Producción Vercel**: Puerto asignado automáticamente por la plataforma
- **Override Local**: `PORT=3001 python main.py`

## Deploy:
1. Conectar repositorio GitHub a Vercel
2. Vercel detectará automáticamente las dos configuraciones
3. Frontend y Backend se despliegan como un sistema fullstack
4. **Puerto asignado automáticamente** por Vercel en serverless functions
5. Deploy 🚀