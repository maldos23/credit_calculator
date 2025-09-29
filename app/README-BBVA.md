# BBVA Pre-evaluador de Crédito

Una aplicación web moderna construida con React, Vite, TypeScript y Shadcn/ui que permite a los usuarios pre-evaluar su elegibilidad para un crédito de BBVA mediante un formulario interactivo multi-paso.

## 🚀 Características

- **Formulario Multi-paso**: Captura información en 4 pasos secuenciales
- **Validación en Tiempo Real**: Validaciones instantáneas y mensajes de ayuda
- **Diseño Responsivo**: Optimizado para desktop y mobile
- **Integración con API**: Conexión directa con el backend de evaluación
- **Diseño BBVA**: Paleta de colores y estética oficial de BBVA
- **Experiencia de Usuario**: Indicadores de progreso y navegación intuitiva

## 📋 Pasos del Formulario

### 1. Información Personal
- Nombre completo
- Edad (18-120 años)

### 2. Información Laboral
- Tipo de empleo (Empleado/Trabajador Independiente)
- Meses de experiencia (mínimo 6 meses para empleados, 12 para independientes)

### 3. Información Financiera
- Ingresos mensuales
- Deudas mensuales actuales
- Score crediticio (300-850)
- Estado de incumplimientos activos

### 4. Detalles del Crédito
- Monto solicitado
- Plazo en meses
- Vista previa del pago mensual estimado

## 🛠 Tecnologías Utilizadas

- **React 18**: Biblioteca para interfaces de usuario
- **TypeScript**: Superset tipado de JavaScript
- **Vite**: Herramienta de construcción rápida
- **Tailwind CSS**: Framework de utilidades CSS
- **Shadcn/ui**: Componentes de UI reutilizables
- **Lucide React**: Iconos modernos
- **Fetch API**: Comunicación con el backend

## 🏗 Arquitectura

La aplicación sigue una arquitectura escalable y modular:

```
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes base de Shadcn/ui
│   ├── forms/          # Componentes de formulario por paso
│   ├── FormLayout.tsx  # Layout principal con navegación
│   └── ResultScreen.tsx # Pantalla de resultados
├── hooks/              # Custom hooks
│   └── useFormWizard.ts # Lógica del formulario multi-paso
├── services/           # Servicios de API
│   └── creditAPI.ts    # Integración con backend
├── types/              # Definiciones de TypeScript
│   └── index.ts        # Interfaces y tipos
├── lib/                # Utilidades
│   └── utils.ts        # Funciones helper
└── App.tsx             # Componente principal
```

## 🎨 Diseño

### Paleta de Colores BBVA
- **Azul Primario**: `#001391` (BBVA Blue)
- **Fondo**: Blanco con gradiente sutil
- **Acentos**: Grises y azules claros

### Componentes UI
- Cards con sombras suaves
- Inputs con validación visual
- Botones con estados hover/disabled
- Indicador de progreso circular
- Iconos contextuales para resultados

## 🔧 Instalación y Uso

### Prerrequisitos
- Node.js 18+
- npm o yarn
- Backend API ejecutándose en `http://localhost:8000`

### Instalación
```bash
cd app
npm install
```

### Desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Construcción para Producción
```bash
npm run build
```

## 🔗 Integración con API

La aplicación se conecta con el backend mediante los siguientes endpoints:

- `POST /api/v1/evaluate` - Evaluar solicitud de crédito
- `GET /api/v1/policy` - Obtener información de políticas
- `GET /health` - Verificar estado del servidor

### Configuración de API

Para cambiar la URL base del API, modifica la constante en `src/services/creditAPI.ts`:

```typescript
const API_BASE_URL = 'http://localhost:8000';
```

## 📱 Experiencia del Usuario

### Flujo de Navegación
1. **Inicio**: Pantalla de bienvenida con marca BBVA
2. **Formulario**: 4 pasos con validación progresiva
3. **Evaluación**: Loading state durante el procesamiento
4. **Resultado**: Pantalla personalizada según decisión:
   - ✅ **Aprobado**: Mensaje de congratulación y próximos pasos
   - ⚠️ **Contraoferta**: Explicación de condiciones alternativas
   - ❌ **Rechazado**: Razones y recomendaciones para mejorar

### Características de Usabilidad
- **Indicador de Progreso**: Muestra paso actual y porcentaje completado
- **Validación Inmediata**: Feedback en tiempo real sobre errores
- **Navegación Flexible**: Botones Anterior/Siguiente habilitados según validación
- **Responsive Design**: Adaptado para móviles y tablets
- **Accesibilidad**: Labels apropiados y navegación por teclado

---

Desarrollado con ❤️ para BBVA México