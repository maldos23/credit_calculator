#!/bin/bash

# Production startup script for FastAPI with Gunicorn

set -e

# Default values
HOST=${HOST:-"0.0.0.0"}
PORT=${PORT:-8000}
WORKERS=${WORKERS:-4}
LOG_LEVEL=${LOG_LEVEL:-"info"}

echo "🚀 Starting BBVA Credit Calculator API..."
echo "📍 Host: $HOST"
echo "🔌 Port: $PORT"
echo "👥 Workers: $WORKERS"
echo "📊 Log Level: $LOG_LEVEL"

# Create necessary directories
mkdir -p /app/file_manager
mkdir -p /app/resumen_manager

# Start the application with Gunicorn
exec gunicorn main:app \
    --workers $WORKERS \
    --worker-class uvicorn.workers.UvicornWorker \
    --bind $HOST:$PORT \
    --log-level $LOG_LEVEL \
    --access-logfile - \
    --error-logfile - \
    --preload