# 🏦 Sistema BBVA de Pre-evaluación Crediticia con Conceptos Avanzados

[![Deploy Status](https://img.shields.io/badge/Frontend-Vercel-success.svg)](https://app-rouge-one.vercel.app)
[![Deploy Status](https://img.shields.io/badge/API-Railway-success.svg)](https://bbva-credit-api-production.up.railway.app)
[![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20FastAPI-blue.svg)](#stack-tecnológico)

> Sistema completo de pre-evaluación crediticia con módulo avanzado de gestión de archivos, implementando conceptos de programación avanzada: **diccionarios**, **tuplas**, **excepciones**, **concatenación de cadenas** y **generación de reportes**.

---

## 🌐 1. ENDPOINTS DE API (Railway)

### **🏥 Sistema de Salud**
- [`GET` https://bbva-credit-api-production.up.railway.app/api/v1/health](https://bbva-credit-api-production.up.railway.app/api/v1/health)
  - **Descripción**: Verificar estado de salud de la API
  - **Respuesta**: Estado del servidor y métricas básicas

### **💳 Sistema de Crédito BBVA**
- [`POST` https://bbva-credit-api-production.up.railway.app/api/v1/credit/evaluate](https://bbva-credit-api-production.up.railway.app/api/v1/credit/evaluate)
  - **Descripción**: Evaluar solicitud de crédito con algoritmos BBVA
  - **Parámetros**: Información personal, laboral y financiera
  
- [`GET` https://bbva-credit-api-production.up.railway.app/api/v1/credit/policy](https://bbva-credit-api-production.up.railway.app/api/v1/credit/policy)
  - **Descripción**: Obtener políticas de crédito vigentes
  - **Respuesta**: Criterios de evaluación y límites

### **👥 Gestión de Usuarios (Sistema Avanzado)**
- [`POST` https://bbva-credit-api-production.up.railway.app/api/v1/advanced/users/login](https://bbva-credit-api-production.up.railway.app/api/v1/advanced/users/login)
  - **Descripción**: Login de usuario con **concatenación de cadenas**
  - **Concepto**: Implementa bienvenida personalizada con concatenación
  
- [`POST` https://bbva-credit-api-production.up.railway.app/api/v1/advanced/users/change](https://bbva-credit-api-production.up.railway.app/api/v1/advanced/users/change)
  - **Descripción**: Cambio de usuario activo del sistema
  - **Funcionalidad**: Gestión de sesiones con validación

- [`GET` https://bbva-credit-api-production.up.railway.app/api/v1/advanced/users/current](https://bbva-credit-api-production.up.railway.app/api/v1/advanced/users/current)
  - **Descripción**: Obtener información del usuario actual
  - **Respuesta**: Datos de sesión activa

- [`GET` https://bbva-credit-api-production.up.railway.app/api/v1/advanced/users/stats](https://bbva-credit-api-production.up.railway.app/api/v1/advanced/users/stats)
  - **Descripción**: Estadísticas completas de usuarios registrados
  - **Uso**: Generación de reportes del sistema

### **📅 Gestión de Fechas con Tuplas**
- [`POST` https://bbva-credit-api-production.up.railway.app/api/v1/advanced/date/configure](https://bbva-credit-api-production.up.railway.app/api/v1/advanced/date/configure)
  - **Descripción**: Configurar fecha del sistema usando **tuplas**
  - **Concepto**: Almacenamiento en formato `(día, mes, año)`
  
- [`GET` https://bbva-credit-api-production.up.railway.app/api/v1/advanced/date/current](https://bbva-credit-api-production.up.railway.app/api/v1/advanced/date/current)
  - **Descripción**: Obtener fecha actual del sistema
  - **Respuesta**: Fecha en formato tupla y componentes separados

### **📁 Sistema de Archivos con Diccionarios**
- [`GET` https://bbva-credit-api-production.up.railway.app/api/v1/advanced/files/list](https://bbva-credit-api-production.up.railway.app/api/v1/advanced/files/list)
  - **Descripción**: Listar **diccionario** de archivos predefinidos (mínimo 4)
  - **Concepto**: Implementa estructura de diccionario con metadata completa
  
- [`POST` https://bbva-credit-api-production.up.railway.app/api/v1/advanced/files/read](https://bbva-credit-api-production.up.railway.app/api/v1/advanced/files/read)
  - **Descripción**: Leer contenido de archivo específico
  - **Excepciones**: `FileNotFoundError` si el archivo no existe
  
- [`POST` https://bbva-credit-api-production.up.railway.app/api/v1/advanced/files/write](https://bbva-credit-api-production.up.railway.app/api/v1/advanced/files/write)
  - **Descripción**: Modificar archivo existente con fecha en tupla
  - **Excepciones**: `PermissionError` para archivos de solo lectura
  
- [`POST` https://bbva-credit-api-production.up.railway.app/api/v1/advanced/files/create](https://bbva-credit-api-production.up.railway.app/api/v1/advanced/files/create)
  - **Descripción**: Crear nuevo archivo en el diccionario
  - **Excepciones**: `ValueError` para nombres inválidos
  
- [`GET` https://bbva-credit-api-production.up.railway.app/api/v1/advanced/files/stats](https://bbva-credit-api-production.up.railway.app/api/v1/advanced/files/stats)
  - **Descripción**: Estadísticas completas del sistema de archivos
  - **Uso**: Dashboard de monitoreo y reportes

### **📊 Sistema de Reportes**
- [`POST` https://bbva-credit-api-production.up.railway.app/api/v1/advanced/reports/generate](https://bbva-credit-api-production.up.railway.app/api/v1/advanced/reports/generate)
  - **Descripción**: Generar reporte completo del sistema en Markdown
  - **Contenido**: Código, resultados, evidencias y observaciones
  
- [`GET` https://bbva-credit-api-production.up.railway.app/api/v1/advanced/reports/download/{filename}](https://bbva-credit-api-production.up.railway.app/api/v1/advanced/reports/download/)
  - **Descripción**: Descargar reporte generado
  - **Formato**: Archivos .md y .pdf

### **⚡ Sistema de Carga y Estado**
- [`POST` https://bbva-credit-api-production.up.railway.app/api/v1/advanced/system/loading](https://bbva-credit-api-production.up.railway.app/api/v1/advanced/system/loading)
  - **Descripción**: Simular carga del sistema (máximo 5 segundos)
  - **Funcionalidad**: Verificación de estado antes de acceso
  
- [`GET` https://bbva-credit-api-production.up.railway.app/api/v1/advanced/system/status](https://bbva-credit-api-production.up.railway.app/api/v1/advanced/system/status)
  - **Descripción**: Estado completo del sistema avanzado
  - **Uso**: Monitoreo, debugging y métricas en tiempo real

---

## 🖥️ 2. PANTALLAS DEL FRONTEND

### **🏠 Página Principal**
**Ruta**: [`/`](https://app-rouge-one.vercel.app/) → [`https://app-rouge-one.vercel.app/`](https://app-rouge-one.vercel.app/)
- **Descripción**: Página de inicio con selección dual de sistemas
- **Funcionalidad**: Acceso a Sistema de Crédito BBVA o Sistema Avanzado
- **Componentes**: Navegación principal, diseño responsivo con Bulma CSS

### **💳 Sistema de Crédito BBVA**
**Ruta**: [`/credit`](https://app-rouge-one.vercel.app/credit) → [`https://app-rouge-one.vercel.app/credit`](https://app-rouge-one.vercel.app/credit)
- **Descripción**: Formulario multi-paso de pre-evaluación crediticia
- **Funcionalidad**: Captura de información personal, laboral y financiera
- **Validación**: Formularios con React Hook Form + Zod
- **Resultado**: Evaluación instantánea con criterios BBVA

### **🎯 Sistema Avanzado - Menú Principal**
**Ruta**: [`/advanced/menu`](https://app-rouge-one.vercel.app/advanced/menu) → [`https://app-rouge-one.vercel.app/advanced/menu`](https://app-rouge-one.vercel.app/advanced/menu)
- **Descripción**: Dashboard principal con 6 opciones de programación avanzada
- **Diseño**: Matriz de opciones con iconos Font Awesome
- **Navegación**: Acceso directo a todos los módulos del sistema

### **📖 Módulo 1: Lectura de Archivos**
**Ruta**: [`/advanced/files/read`](https://app-rouge-one.vercel.app/advanced/files/read) → [`https://app-rouge-one.vercel.app/advanced/files/read`](https://app-rouge-one.vercel.app/advanced/files/read)
- **Descripción**: Interfaz para leer archivos del diccionario predefinido
- **Conceptos**: Visualización de diccionarios, fechas en tuplas
- **Manejo de Errores**: Excepciones `FileNotFoundError` con mensajes amigables
- **Metadata**: Autor, fecha de creación, tamaño, permisos

### **✏️ Módulo 2: Escritura de Archivos**
**Ruta**: [`/advanced/files/write`](https://app-rouge-one.vercel.app/advanced/files/write) → [`https://app-rouge-one.vercel.app/advanced/files/write`](https://app-rouge-one.vercel.app/advanced/files/write)
- **Descripción**: Editor para modificar archivos existentes
- **Validación**: Verificación de permisos de escritura
- **Excepciones**: Manejo de `PermissionError` y archivos de solo lectura
- **Fecha**: Registro automático con tupla de modificación

### **📝 Módulo 3: Creación de Archivos**
**Ruta**: [`/advanced/files/create`](https://app-rouge-one.vercel.app/advanced/files/create) → [`https://app-rouge-one.vercel.app/advanced/files/create`](https://app-rouge-one.vercel.app/advanced/files/create)
- **Descripción**: Formulario para crear nuevos archivos
- **Tipos**: 5 tipos predefinidos (texto, configuración, log, datos, temporal)
- **Validación**: Nombres únicos, formatos válidos
- **Vista Previa**: Confirmación antes de crear

### **📊 Módulo 4: Generación de Reportes**
**Ruta**: [`/advanced/reports`](https://app-rouge-one.vercel.app/advanced/reports) → [`https://app-rouge-one.vercel.app/advanced/reports`](https://app-rouge-one.vercel.app/advanced/reports)
- **Descripción**: Interfaz de generación de reportes completos
- **Formatos**: Markdown (.md) y PDF (.pdf)
- **Contenido**: Sistema completo, usuarios, archivos, estadísticas
- **Descarga**: Botón de descarga directa con integración backend

### **⚡ Módulo 5: Estado del Sistema**
**Ruta**: [`/advanced/status`](https://app-rouge-one.vercel.app/advanced/status) → [`https://app-rouge-one.vercel.app/advanced/status`](https://app-rouge-one.vercel.app/advanced/status)
- **Descripción**: Dashboard de monitoreo en tiempo real
- **Métricas**: Usuarios activos, archivos disponibles, estadísticas
- **Actualización**: Datos refrescados cada segundo
- **Indicadores**: Estado de salud del sistema con colores

### **📅 Módulo 6: Configuración de Fechas**
**Ruta**: [`/advanced/dates`](https://app-rouge-one.vercel.app/advanced/dates) → [`https://app-rouge-one.vercel.app/advanced/dates`](https://app-rouge-one.vercel.app/advanced/dates)
- **Descripción**: Configurador de fecha del sistema con tuplas
- **Validación**: Días (1-31), meses (1-12), años (2020-2030)
- **Formato**: Input separado por componentes de tupla
- **Persistencia**: Almacenamiento automático en formato `(día, mes, año)`

### **⏳ Pantalla de Carga**
**Ruta**: [`/advanced/loading`](https://app-rouge-one.vercel.app/advanced/loading) → [`https://app-rouge-one.vercel.app/advanced/loading`](https://app-rouge-one.vercel.app/advanced/loading) (automática)
- **Descripción**: Animación de carga "Preparando sistema avanzado..."
- **Duración**: Máximo 5 segundos con barra de progreso
- **Funcionalidad**: Verificación de estado del sistema antes de acceso
- **Navegación**: Redirección automática al menú principal

### **🔒 Control de Inactividad**
**Componente**: Activo en todas las rutas avanzadas
- **Descripción**: Timer de inactividad de 10 minutos
- **Funcionalidad**: Modal de confirmación antes de logout automático
- **Reset**: Cualquier interacción del usuario resetea el contador

---

## 🛠️ 3. STACK TECNOLÓGICO

### **🖥️ FRONTEND**
- **⚛️ Framework**: React 19.1.1 con TypeScript 5.8.3
- **🎨 CSS Framework**: Bulma 1.0.4 + React Bulma Components 4.1.0
- **🧭 Routing**: React Router DOM 7.9.3
- **📋 Formularios**: React Hook Form 7.63.0 + Zod 4.1.11
- **🔗 HTTP Client**: Fetch API nativo con servicios personalizados
- **⚡ Build Tool**: Vite (Rolldown) 7.1.12
- **🎯 Linting**: ESLint 9.36.0 + TypeScript ESLint 8.44.0
- **🎭 Icons**: Font Awesome 7.0.1
- **📱 UI Components**: Radix UI (Label, Progress, Select)
- **🔧 Dev Tools**: Node.js, TypeScript, Vite Dev Server

### **� BACKEND**
- **🐍 Framework**: FastAPI 0.104.1
- **⚡ Server**: Uvicorn 0.24.0 + Gunicorn 21.2.0 (Producción)
- **📊 Validation**: Pydantic 2.5.0 + Pydantic Settings 2.1.0
- **🔧 Utils**: Python Multipart 0.0.6, HTTPTools 0.6.1
- **📝 Logging**: Python JSON Logger 2.0.7
- **🔍 Monitoring**: Health checks con Requests 2.31.0
- **🐳 Container**: Docker con multi-stage builds
- **⚙️ Runtime**: Python 3.9 en contenedor Alpine Linux

### **🚀 DEPLOYMENT & DEVOPS**
- **🌐 Frontend Deploy**: Vercel (Configurado)
- **☁️ Backend Deploy**: Railway con Docker
- **🐳 Containerization**: 
  - **Dockerfile.prod**: Multi-stage build optimizado
  - **docker-compose.yml**: Desarrollo local
  - **start.sh**: Script de inicialización
- **⚙️ Process Manager**: Gunicorn con múltiples workers Uvicorn
- **🔍 Health Checks**: Endpoint `/api/v1/health` con métricas
- **🌍 CORS**: Configuración dinámica por variables de entorno

### **🔒 SEGURIDAD & CONFIGURACIÓN**
- **🌍 CORS**: Políticas dinámicas basadas en dominios permitidos
- **🔐 Environment Variables**: 
  - Desarrollo: `.env`
  - Producción: `.env.production`, `railway.toml`
- **🛡️ Validation**: Esquemas Pydantic para todas las APIs
- **⚠️ Error Handling**: Manejo global de excepciones
- **📊 Monitoring**: Logs estructurados y métricas de salud

### **📁 ARQUITECTURA DE ARCHIVOS**
```
bbva-prevealuator-credit/
├── api/                          # Backend FastAPI
│   ├── src/
│   │   ├── modules/             # Módulos conceptos avanzados
│   │   ├── routes/              # Endpoints REST API  
│   │   └── core/                # Configuración y utilidades
│   ├── Dockerfile.prod          # Contenedor producción
│   └── railway.toml             # Config Railway
├── app/                         # Frontend React
│   ├── src/
│   │   ├── components/          # Componentes React
│   │   ├── services/            # API clients
│   │   └── hooks/               # Custom hooks
│   ├── vercel.json              # Config Vercel
│   └── .env.production          # Variables producción
└── README.md                    # Documentación
```

### **🔗 INTEGRACIONES**
- **API Communication**: REST con JSON
- **State Management**: React hooks nativos
- **Form Validation**: React Hook Form + Zod schemas
- **Error Boundaries**: Manejo global de errores React
- **Loading States**: Componentes de loading personalizados
- **Responsive Design**: Bulma CSS Grid System
- **Cross-Platform**: Compatible con navegadores modernos

---

## ✅ **CONCEPTOS AVANZADOS IMPLEMENTADOS**

### 📚 **Diccionarios** 
- **Módulo**: `file_manager.py`
- **Uso**: Estructura de archivos con metadata completa
- **Pantalla**: `/advanced/files/read`

### 📅 **Tuplas**
- **Formato**: `(día: int, mes: int, año: int)`
- **Uso**: Fechas de creación, modificación, configuración
- **Pantalla**: `/advanced/dates`

### ⚠️ **Excepciones**
- **Tipos**: FileNotFoundError, PermissionError, ValueError
- **Manejo**: Mensajes amigables en frontend
- **Pantallas**: Todos los módulos de archivos

### 🔗 **Concatenación de Cadenas**
- **Módulo**: `user_manager.py`
- **Uso**: Mensajes de bienvenida personalizados
- **Endpoint**: `/advanced/users/login`

### 📊 **Reportes**
- **Formatos**: Markdown y PDF
- **Contenido**: Sistema completo con evidencias
- **Pantalla**: `/advanced/reports`

---

## 🚀 4. GUÍA DE INSTALACIÓN Y EJECUCIÓN

### **📋 Requisitos Previos**
Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu sistema:

#### **🐍 1. Instalar Python (Versión 3.9 o superior)**

**Windows:**
1. Ve a [python.org](https://www.python.org/downloads/)
2. Descarga Python 3.9+ (recomendado 3.11)
3. Ejecuta el instalador y marca "Add Python to PATH"
4. Verifica la instalación:
   ```bash
   python --version
   pip --version
   ```

**macOS:**
```bash
# Opción 1: Con Homebrew (recomendado)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install python@3.11

# Opción 2: Descargar desde python.org
# Visita https://www.python.org/downloads/macos/
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install python3.11 python3.11-pip python3.11-venv
python3.11 --version
```

#### **⚡ 2. Instalar Node.js (Versión 18 o superior)**

**Windows:**
1. Ve a [nodejs.org](https://nodejs.org/)
2. Descarga la versión LTS
3. Ejecuta el instalador
4. Verifica la instalación:
   ```bash
   node --version
   npm --version
   ```

**macOS:**
```bash
# Opción 1: Con Homebrew
brew install node@18

# Opción 2: Con nvm (recomendado)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

**Linux:**
```bash
# Opción 1: NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Opción 2: Con nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
```

#### **🔧 3. Instalar Git**
```bash
# Windows: Descargar desde https://git-scm.com/
# macOS: brew install git
# Linux: sudo apt install git
git --version
```

---

### **📥 Paso 1: Clonar el Repositorio**

```bash
# Clonar el proyecto
git clone https://github.com/maldos23/credit_calculator.git

# Navegar al directorio
cd credit_calculator
```

---

### **🐍 Paso 2: Configurar y Ejecutar el Backend (API)**

#### **2.1 Preparar el entorno Backend**
```bash
# Navegar al directorio del backend
cd api

# Crear entorno virtual de Python
python -m venv venv

# Activar el entorno virtual
# Windows:
venv\Scripts\activate

# macOS/Linux:
source venv/bin/activate
```

#### **2.2 Instalar dependencias del Backend**
```bash
# Actualizar pip
pip install --upgrade pip

# Instalar dependencias
pip install -r requirements.txt
```

#### **2.3 Configurar variables de entorno**
```bash
# Crear archivo .env (copiar desde .env.example si existe)
touch .env

# Agregar configuración básica (editar con tu editor favorito)
cat > .env << EOF
APP_NAME="BBVA Credit Calculator API"
VERSION="1.0.0"
DEBUG=true
HOST=0.0.0.0
PORT=8000
CORS_ORIGINS=http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000
CORS_METHODS=GET,POST,PUT,DELETE,OPTIONS
CORS_HEADERS=Accept,Accept-Language,Authorization,Content-Language,Content-Type,Origin
CORS_CREDENTIALS=true
EOF
```

#### **2.4 Ejecutar el Backend**
```bash
# Opción 1: Desarrollo con recarga automática
python main.py

# Opción 2: Con uvicorn directamente
uvicorn app_server:app --host 0.0.0.0 --port 8000 --reload

# El backend estará disponible en:
# http://localhost:8000
# Documentación API: http://localhost:8000/docs
```

#### **2.5 Verificar que el Backend funciona**
```bash
# Probar el endpoint de salud
curl http://localhost:8000/api/v1/health

# Deberías ver: {"status":"healthy","message":"BBVA Credit Pre-evaluator API is running"}
```

---

### **⚛️ Paso 3: Configurar y Ejecutar el Frontend**

#### **3.1 Abrir una nueva terminal y navegar al frontend**
```bash
# Nueva terminal (mantén el backend corriendo)
cd app  # desde la raíz del proyecto
```

#### **3.2 Instalar dependencias del Frontend**
```bash
# Instalar todas las dependencias
npm install

# Si tienes problemas, puedes intentar:
npm install --legacy-peer-deps
```

#### **3.3 Configurar variables de entorno del Frontend**
```bash
# Crear archivo .env para desarrollo
cat > .env << EOF
VITE_API_URL=http://localhost:8000
ENVIRONMENT=development
DEBUG=true
EOF

# Crear archivo .env.production para producción
cat > .env.production << EOF
VITE_API_URL=https://bbva-credit-api-production.up.railway.app
ENVIRONMENT=production
DEBUG=false
EOF
```

#### **3.4 Ejecutar el Frontend**
```bash
# Modo desarrollo con recarga automática
npm run dev

# El frontend estará disponible en:
# https://app-rouge-one.vercel.app (Producción) o http://localhost:5173 (Desarrollo)
```

#### **3.5 Verificar que el Frontend funciona**
1. Abre tu navegador en [`https://app-rouge-one.vercel.app`](https://app-rouge-one.vercel.app) (Producción) o `http://localhost:5173` (Desarrollo)
2. Deberías ver la página principal del Sistema BBVA
3. Puedes navegar entre "Sistema de Crédito" y "Sistema Avanzado"

---

### **🔍 Paso 4: Verificar Integración Completa**

#### **4.1 Probar Sistema de Crédito**
1. Ve a [`https://app-rouge-one.vercel.app/credit`](https://app-rouge-one.vercel.app/credit)
2. Llena el formulario de evaluación
3. Verifica que se conecte con el backend

#### **4.2 Probar Sistema Avanzado**
1. Ve a [`https://app-rouge-one.vercel.app/advanced/menu`](https://app-rouge-one.vercel.app/advanced/menu)
2. Prueba cada una de las 6 opciones:
   - Lectura de archivos
   - Escritura de archivos
   - Creación de archivos
   - Generación de reportes
   - Estado del sistema
   - Configuración de fechas

---

### **🐳 Paso 5: (Opcional) Ejecutar con Docker**

#### **5.1 Instalar Docker**
- **Windows/Mac**: Descargar Docker Desktop desde [docker.com](https://www.docker.com/products/docker-desktop)
- **Linux**: 
  ```bash
  curl -fsSL https://get.docker.com -o get-docker.sh
  sudo sh get-docker.sh
  ```

#### **5.2 Ejecutar Backend con Docker**
```bash
cd api

# Construir imagen
docker build -f Dockerfile.prod -t bbva-credit-api .

# Ejecutar contenedor
docker run -p 8000:8000 bbva-credit-api
```

#### **5.3 Ejecutar todo con Docker Compose**
```bash
# Desde la raíz del proyecto
docker-compose up --build

# Para ejecutar en segundo plano:
docker-compose up -d --build
```

---

### **🚨 Solución de Problemas Comunes**

#### **Python/Backend Issues:**
```bash
# Error de permisos en Windows
pip install --user -r requirements.txt

# Error de módulos en macOS/Linux
python3 -m pip install -r requirements.txt

# Problemas con el puerto 8000
lsof -ti:8000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :8000   # Windows
```

#### **Node.js/Frontend Issues:**
```bash
# Limpiar caché de npm
npm cache clean --force

# Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install

# Problemas con el puerto 5173
npx kill-port 5173
```

#### **CORS Issues:**
- Verifica que el backend esté corriendo en `http://localhost:8000`
- Confirma que el `.env` del frontend tenga `VITE_API_URL=http://localhost:8000`
- Revisa que no tengas bloqueos de firewall

---

### **✅ Checklist de Verificación**

Antes de considerar que todo está funcionando:

- [ ] **Backend**: `curl http://localhost:8000/api/v1/health` retorna status 200
- [ ] **Frontend**: [`https://app-rouge-one.vercel.app`](https://app-rouge-one.vercel.app) carga correctamente
- [ ] **Navegación**: Puedes navegar entre las rutas principales
- [ ] **API Integration**: El frontend puede comunicarse con el backend
- [ ] **Sistema Avanzado**: Las 6 opciones del menú avanzado funcionan
- [ ] **Formularios**: Los formularios se pueden llenar y enviar
- [ ] **Conceptos Avanzados**: Diccionarios, tuplas, excepciones se ven en funcionamiento

---

**🎉 ¡Felicidades! Ahora tienes el Sistema BBVA completo funcionando localmente con todos los conceptos avanzados implementados.**

