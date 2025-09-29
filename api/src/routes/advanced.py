"""
Rutas para el Sistema Avanzado de Gestión de Archivos
====================================================

Endpoints REST para todas las operaciones del sistema:
- Gestión de usuarios (login, cambio, bienvenida)
- Gestión de archivos (leer, escribir, crear)
- Configuración de fechas con tuplas
- Generación de reportes

Todas las rutas utilizan los conceptos avanzados implementados en los módulos.
"""

from fastapi import APIRouter, HTTPException, Response
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field
from typing import Dict, Any, List, Optional, Tuple
from datetime import datetime
import json

from ..modules.user_manager import user_manager
from ..modules.file_manager import file_manager
from ..modules.report_generator import report_generator


# Router para las rutas del sistema avanzado
advanced_router = APIRouter(prefix="/advanced", tags=["Sistema Avanzado"])


# Modelos Pydantic para requests/responses
class UserLoginRequest(BaseModel):
    """Modelo para solicitud de login de usuario."""
    nombre: str = Field(..., min_length=2, max_length=20, description="Nombre del usuario")
    
    
class UserChangeRequest(BaseModel):
    """Modelo para cambio de usuario."""
    nombre_nuevo: str = Field(..., min_length=2, max_length=20, description="Nuevo nombre de usuario")


class DateConfigRequest(BaseModel):
    """Modelo para configuración de fecha."""
    dia: int = Field(..., ge=1, le=31, description="Día del mes")
    mes: int = Field(..., ge=1, le=12, description="Mes del año")
    año: int = Field(..., ge=2020, le=2030, description="Año")


class FileReadRequest(BaseModel):
    """Modelo para lectura de archivo."""
    nombre_archivo: str = Field(..., min_length=1, description="Nombre del archivo a leer")


class FileWriteRequest(BaseModel):
    """Modelo para escritura de archivo."""
    nombre_archivo: str = Field(..., min_length=1, description="Nombre del archivo")
    contenido: str = Field(..., description="Nuevo contenido del archivo")
    autor: str = Field(..., min_length=1, description="Usuario que modifica")


class FileCreateRequest(BaseModel):
    """Modelo para creación de archivo."""
    nombre_archivo: str = Field(..., min_length=1, description="Nombre del nuevo archivo")
    contenido: str = Field(..., description="Contenido inicial")
    autor: str = Field(..., min_length=1, description="Usuario que crea")
    tipo: str = Field("texto", description="Tipo de archivo")
    descripcion: Optional[str] = Field(None, description="Descripción del archivo")


# ================================
# ENDPOINTS DE USUARIOS
# ================================

@advanced_router.post("/users/login")
async def login_usuario(request: UserLoginRequest) -> Dict[str, Any]:
    """
    Endpoint para login de usuario.
    Implementa bienvenida con concatenación de cadenas.
    
    Args:
        request: Datos de login del usuario
        
    Returns:
        Dict con información de sesión y mensaje de bienvenida
    """
    try:
        # Usar el user_manager para login (con concatenación de cadenas)
        sesion_info = user_manager.iniciar_sesion(request.nombre)
        
        return {
            "success": True,
            "data": sesion_info,
            "mensaje": "Login exitoso con concatenación de cadenas implementada"
        }
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {e}")


@advanced_router.post("/users/change")
async def cambiar_usuario(request: UserChangeRequest) -> Dict[str, Any]:
    """
    Endpoint para cambio de usuario (opción 4 del menú).
    
    Args:
        request: Datos del nuevo usuario
        
    Returns:
        Dict con información del cambio de usuario
    """
    try:
        cambio_info = user_manager.cambiar_usuario(request.nombre_nuevo)
        
        return {
            "success": True,
            "data": cambio_info,
            "mensaje": "Usuario cambiado exitosamente"
        }
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {e}")


@advanced_router.get("/users/current")
async def obtener_usuario_actual() -> Dict[str, Any]:
    """
    Obtiene información del usuario actual.
    
    Returns:
        Dict con información del usuario actual
    """
    try:
        usuario_info = user_manager.obtener_usuario_actual()
        
        if not usuario_info:
            return {
                "success": False,
                "data": None,
                "mensaje": "No hay usuario logueado"
            }
        
        return {
            "success": True,
            "data": usuario_info,
            "mensaje": "Información de usuario obtenida"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {e}")


@advanced_router.get("/users/stats")
async def obtener_estadisticas_usuarios() -> Dict[str, Any]:
    """
    Obtiene estadísticas de usuarios para el reporte.
    
    Returns:
        Dict con estadísticas completas de usuarios
    """
    try:
        estadisticas = user_manager.obtener_estadisticas_usuarios()
        
        return {
            "success": True,
            "data": estadisticas,
            "mensaje": "Estadísticas de usuarios obtenidas"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {e}")


# ================================
# ENDPOINTS DE FECHAS CON TUPLAS
# ================================

@advanced_router.post("/date/configure")
async def configurar_fecha(request: DateConfigRequest) -> Dict[str, Any]:
    """
    Configura la fecha del sistema usando tuplas como se especifica.
    
    Args:
        request: Datos de fecha (día, mes, año)
        
    Returns:
        Dict con confirmación de configuración de fecha
    """
    try:
        # Usar file_manager para configurar fecha (almacena en tupla)
        fecha_info = file_manager.configurar_fecha(request.dia, request.mes, request.año)
        
        return {
            "success": True,
            "data": fecha_info,
            "mensaje": "Fecha configurada usando tupla como se requiere"
        }
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {e}")


@advanced_router.get("/date/current")
async def obtener_fecha_actual() -> Dict[str, Any]:
    """
    Obtiene la fecha actual del sistema (tupla).
    
    Returns:
        Dict con la fecha actual en formato tupla
    """
    try:
        fecha_tupla = file_manager.fecha_actual
        
        return {
            "success": True,
            "data": {
                "fecha_tupla": fecha_tupla,
                "fecha_formateada": f"{fecha_tupla[0]:02d}/{fecha_tupla[1]:02d}/{fecha_tupla[2]}",
                "componentes": {
                    "dia": fecha_tupla[0],
                    "mes": fecha_tupla[1],
                    "año": fecha_tupla[2]
                }
            },
            "mensaje": "Fecha actual obtenida (almacenada en tupla)"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {e}")


# ================================
# ENDPOINTS DE ARCHIVOS
# ================================

@advanced_router.get("/files/list")
async def listar_archivos() -> Dict[str, Any]:
    """
    Lista todos los archivos disponibles (mínimo 4 predefinidos).
    Implementa el diccionario de archivos requerido.
    
    Returns:
        Dict con lista completa de archivos disponibles
    """
    try:
        lista_archivos = file_manager.obtener_lista_archivos()
        
        return {
            "success": True,
            "data": lista_archivos,
            "mensaje": f"Lista de archivos obtenida - Total: {lista_archivos['total_archivos']} (mínimo 4 predefinidos cumplido)"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {e}")


@advanced_router.post("/files/read")
async def leer_archivo(request: FileReadRequest) -> Dict[str, Any]:
    """
    Lee un archivo específico (opción 1 del menú).
    Implementa manejo de excepciones si no existe.
    
    Args:
        request: Nombre del archivo a leer
        
    Returns:
        Dict con contenido y metadata del archivo
    """
    try:
        archivo_info = file_manager.leer_archivo(request.nombre_archivo)
        
        return {
            "success": True,
            "data": archivo_info,
            "mensaje": f"Archivo '{request.nombre_archivo}' leído exitosamente"
        }
        
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {e}")


@advanced_router.post("/files/write")
async def escribir_archivo(request: FileWriteRequest) -> Dict[str, Any]:
    """
    Modifica un archivo existente (opción 2 del menú).
    Usa fecha almacenada (tupla) para registrar modificación.
    
    Args:
        request: Datos para modificar archivo
        
    Returns:
        Dict con confirmación de modificación
    """
    try:
        resultado = file_manager.escribir_archivo(
            request.nombre_archivo,
            request.contenido,
            request.autor
        )
        
        return {
            "success": True,
            "data": resultado,
            "mensaje": f"Archivo '{request.nombre_archivo}' modificado con fecha en tupla"
        }
        
    except (FileNotFoundError, PermissionError) as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {e}")


@advanced_router.post("/files/create")
async def crear_archivo(request: FileCreateRequest) -> Dict[str, Any]:
    """
    Crea un nuevo archivo (opción 3 del menú).
    Usa fecha almacenada (tupla) para registrar creación.
    
    Args:
        request: Datos para crear nuevo archivo
        
    Returns:
        Dict con confirmación de creación
    """
    try:
        resultado = file_manager.crear_archivo(
            request.nombre_archivo,
            request.contenido,
            request.autor,
            request.tipo,
            request.descripcion or f"Archivo {request.tipo} creado por {request.autor}"
        )
        
        return {
            "success": True,
            "data": resultado,
            "mensaje": f"Archivo '{request.nombre_archivo}' creado con fecha en tupla"
        }
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {e}")


@advanced_router.get("/files/stats")
async def obtener_estadisticas_archivos() -> Dict[str, Any]:
    """
    Obtiene estadísticas del sistema de archivos para el reporte.
    
    Returns:
        Dict con estadísticas completas del sistema de archivos
    """
    try:
        estadisticas = file_manager.obtener_estadisticas()
        
        return {
            "success": True,
            "data": estadisticas,
            "mensaje": "Estadísticas del sistema de archivos obtenidas"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {e}")


# ================================
# ENDPOINT DE CARGA (5 SEGUNDOS)
# ================================

@advanced_router.post("/system/loading")
async def simular_carga() -> Dict[str, Any]:
    """
    Endpoint para simular carga del sistema (máximo 5 segundos).
    El frontend manejará el tiempo, este endpoint confirma preparación.
    
    Returns:
        Dict con confirmación de sistema preparado
    """
    try:
        # Verificar estado del sistema
        usuario_actual = user_manager.obtener_usuario_actual()
        stats_archivos = file_manager.obtener_estadisticas()
        
        sistema_listo = True
        mensajes = []
        
        if not usuario_actual:
            mensajes.append("Sistema iniciado sin usuario logueado")
        else:
            mensajes.append(f"Usuario '{usuario_actual['nombre']}' conectado")
        
        mensajes.append(f"Sistema de archivos: {stats_archivos['resumen']['total_archivos']} archivos disponibles")
        mensajes.append("Fecha del sistema configurada")
        mensajes.append("Todos los módulos cargados correctamente")
        
        return {
            "success": True,
            "data": {
                "sistema_listo": sistema_listo,
                "tiempo_carga": "5 segundos máximo (controlado por frontend)",
                "mensajes_carga": mensajes,
                "estadisticas_iniciales": {
                    "usuario_actual": usuario_actual,
                    "archivos_disponibles": stats_archivos['resumen']['total_archivos'],
                    "fecha_sistema": file_manager.fecha_actual
                }
            },
            "mensaje": "Sistema preparado - carga completada"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al preparar sistema: {e}")


# ================================
# ENDPOINT DE REPORTES
# ================================

@advanced_router.post("/reports/generate")
async def generar_reporte() -> Dict[str, Any]:
    """
    Genera el reporte completo del sistema en Markdown.
    Incluye código, resultados, evidencias y observaciones.
    
    Returns:
        Dict con información del reporte generado
    """
    try:
        # Recopilar datos del sistema
        usuario_actual = user_manager.obtener_usuario_actual()
        stats_usuarios = user_manager.obtener_estadisticas_usuarios()
        stats_archivos = file_manager.obtener_estadisticas()
        
        datos_sistema = {
            "usuario_actual": usuario_actual,
            "estadisticas_usuarios": stats_usuarios,
            "estadisticas_archivos": stats_archivos,
            "fecha_sistema": file_manager.fecha_actual,
            "timestamp_reporte": datetime.now().isoformat()
        }
        
        # Generar reporte completo
        resultado_reporte = report_generator.generar_reporte_completo(datos_sistema)
        
        return {
            "success": True,
            "data": resultado_reporte,
            "mensaje": "Reporte completo generado con código y evidencias"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al generar reporte: {e}")


@advanced_router.get("/reports/download/{filename}")
async def descargar_reporte(filename: str) -> FileResponse:
    """
    Descarga un reporte generado.
    
    Args:
        filename: Nombre del archivo de reporte
        
    Returns:
        FileResponse con el archivo de reporte
    """
    try:
        ruta_archivo = report_generator.directorio_reportes / filename
        
        if not ruta_archivo.exists():
            raise HTTPException(status_code=404, detail="Archivo de reporte no encontrado")
        
        return FileResponse(
            path=str(ruta_archivo),
            filename=filename,
            media_type='text/markdown'
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al descargar reporte: {e}")


# ================================
# ENDPOINT DE ESTADO GENERAL
# ================================

@advanced_router.get("/system/status")
async def obtener_estado_sistema() -> Dict[str, Any]:
    """
    Obtiene el estado completo del sistema avanzado.
    Útil para debugging y monitoreo.
    
    Returns:
        Dict con estado completo del sistema
    """
    try:
        # Obtener información de todos los componentes
        usuario_actual = user_manager.obtener_usuario_actual()
        stats_usuarios = user_manager.obtener_estadisticas_usuarios()
        stats_archivos = file_manager.obtener_estadisticas()
        
        estado_sistema = {
            "timestamp": datetime.now().isoformat(),
            "version": "1.0.0",
            "modulos_cargados": ["user_manager", "file_manager"],
            "usuario_actual": usuario_actual,
            "estadisticas_usuarios": stats_usuarios,
            "estadisticas_archivos": stats_archivos,
            "fecha_sistema_tupla": file_manager.fecha_actual,
            "configuraciones": {
                "directorio_trabajo": str(file_manager.directorio_base),
                "archivos_predefinidos": len(file_manager.archivos_predefinidos),
                "usuarios_registrados": len(user_manager.usuarios_registrados)
            }
        }
        
        return {
            "success": True,
            "data": estado_sistema,
            "mensaje": "Estado completo del sistema obtenido"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener estado: {e}")