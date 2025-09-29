# 🐳 Docker Configuration for BBVA Credit Calculator API

## Archivos Docker

- **`Dockerfile`**: Configuración básica para desarrollo
- **`Dockerfile.prod`**: Configuración optimizada para producción
- **`docker-compose.yml`**: Orquestación para desarrollo local
- **`.dockerignore`**: Archivos excluidos del build
- **`start.sh`**: Script de inicio para producción

## 🚀 Comandos Docker

### Desarrollo Local

```bash
# Build de la imagen
docker build -t bbva-credit-api .

# Ejecutar contenedor
docker run -p 8000:8000 bbva-credit-api

# Usar docker-compose (recomendado)
docker-compose up --build
```

### Producción

```bash
# Build optimizado para producción
docker build -f Dockerfile.prod -t bbva-credit-api:prod .

# Ejecutar en producción
docker run -p 8000:8000 \
  -e APP_NAME="BBVA Credit Calculator API" \
  -e DEBUG=false \
  -e WORKERS=4 \
  bbva-credit-api:prod
```

## 🔧 Variables de Entorno

### Configuración de la Aplicación
- `APP_NAME`: Nombre de la aplicación
- `VERSION`: Versión de la API
- `DEBUG`: Modo debug (true/false)
- `HOST`: Host del servidor (default: 0.0.0.0)
- `PORT`: Puerto del servidor (default: 8000)

### Configuración de Producción
- `WORKERS`: Número de workers de Gunicorn (default: 4)
- `LOG_LEVEL`: Nivel de logs (debug, info, warning, error)

## 🏥 Health Check

El contenedor incluye un health check en:
- **URL**: `http://localhost:8000/api/v1/health`
- **Intervalo**: 30 segundos
- **Timeout**: 30 segundos
- **Reintentos**: 3

## 📁 Volúmenes

El contenedor crea y monta:
- `/app/file_manager`: Gestión de archivos
- `/app/resumen_manager`: Gestión de resúmenes

## 🔒 Seguridad

- Usuario no-root (`app`) para mayor seguridad
- Multi-stage build para imagen más pequeña
- Variables de entorno para configuración sensible
- Health checks para monitoreo

## 🌐 Deploy Options

### Docker Hub
```bash
docker tag bbva-credit-api:prod username/bbva-credit-api:latest
docker push username/bbva-credit-api:latest
```

### Railway / Render / Fly.io
- Usar `Dockerfile.prod`
- Configurar variables de entorno
- Puerto automático detectado

### AWS ECS / Google Cloud Run
- Compatible con container orchestration
- Auto-scaling habilitado
- Health checks integrados