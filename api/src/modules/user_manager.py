"""
User Management Module - Advanced Concepts
==========================================

This module implements user management using string concatenation
and string operators as specified in the project requirements.

Features:
- User registration with validation
- Generation of personalized welcome messages
- Active session management
- String concatenation for dynamic messages
"""

from datetime import datetime
from typing import Dict, Optional
import uuid
import re


class UserManager:
    """
    Class for advanced user management.
    Implements string concatenation and string operators.
    """
    
    def __init__(self):
        """
        Initialize the user manager.
        
        Attributes:
            usuarios_registrados (Dict): Dictionary of registered users
            sesiones_activas (Dict): Dictionary of active sessions
            usuario_actual (Optional[str]): Currently logged in user
        """
        self.usuarios_registrados: Dict[str, Dict] = {}
        self.sesiones_activas: Dict[str, Dict] = {}
        self.usuario_actual: Optional[str] = None
        
        # Create some example users
        self._inicializar_usuarios_ejemplo()
    
    def _inicializar_usuarios_ejemplo(self) -> None:
        """
        Initialize example users for demonstration.
        Uses string concatenation to create descriptions.
        """
        usuarios_ejemplo = [
            {"nombre": "admin", "tipo": "administrador"},
            {"nombre": "guest", "tipo": "invitado"},
            {"nombre": "demo_user", "tipo": "demostración"}
        ]
        
        for usuario in usuarios_ejemplo:
            nombre = usuario["nombre"]
            tipo = usuario["tipo"]
            
            # String concatenation for description
            descripcion = "Usuario " + tipo + " del " + "sistema " + "avanzado"
            
            self.usuarios_registrados[nombre] = {
                "nombre_completo": nombre,
                "tipo": tipo,
                "descripcion": descripcion,
                "fecha_registro": datetime.now().isoformat(),
                "ultima_conexion": None,
                "sesiones_totales": 0
            }
    
    def validar_nombre_usuario(self, nombre: str) -> tuple[bool, str]:
        """
        Validate username using string operators.
        
        Args:
            nombre (str): Name to validate
            
        Returns:
            tuple[bool, str]: (is_valid, error_message)
        """
        # Clean input
        nombre = nombre.strip()
        
        # Validations with string operators
        if not nombre:
            mensaje_error = "El " + "nombre " + "no puede estar " + "vacío"
            return False, mensaje_error
        
        if len(nombre) < 2:
            mensaje_error = "El " + "nombre " + "debe tener al menos " + "2 caracteres"
            return False, mensaje_error
        
        if len(nombre) > 20:
            mensaje_error = "El " + "nombre " + "no puede tener más de " + "20 caracteres"
            return False, mensaje_error
        
        # Check valid characters
        if not re.match("^[a-zA-Z0-9_-]+$", nombre):
            mensaje_error = "El " + "nombre " + "solo puede contener " + "letras, números, guiones y guiones bajos"
            return False, mensaje_error
        
        return True, ""
    
    def registrar_usuario(self, nombre: str, tipo: str = "usuario") -> Dict:
        """
        Registra un nuevo usuario en el sistema.
        Utiliza concatenación de cadenas para mensajes personalizados.
        
        Args:
            nombre (str): Nombre del usuario
            tipo (str): Tipo de usuario (por defecto "usuario")
            
        Returns:
            Dict: Información de registro del usuario
            
        Raises:
            ValueError: Si el nombre no es válido o ya existe
        """
        # Validar nombre
        es_valido, mensaje_error = self.validar_nombre_usuario(nombre)
        if not es_valido:
            raise ValueError(mensaje_error)
        
        # Verificar si ya existe
        if nombre in self.usuarios_registrados:
            mensaje_error = "El usuario " + nombre + " ya está " + "registrado"
            raise ValueError(mensaje_error)
        
        # Crear descripción con concatenación
        descripcion_base = "Usuario " + tipo + " registrado en "
        descripcion_fecha = "el sistema " + "avanzado de gestión"
        descripcion_completa = descripcion_base + descripcion_fecha
        
        # Registrar usuario
        usuario_info = {
            "nombre_completo": nombre,
            "tipo": tipo,
            "descripcion": descripcion_completa,
            "fecha_registro": datetime.now().isoformat(),
            "ultima_conexion": None,
            "sesiones_totales": 0
        }
        
        self.usuarios_registrados[nombre] = usuario_info
        
        # Generar mensaje de confirmación con concatenación
        mensaje_confirmacion = "¡Usuario " + nombre + " registrado " + "exitosamente!"
        
        return {
            "mensaje": mensaje_confirmacion,
            "usuario": usuario_info,
            "timestamp": datetime.now().isoformat()
        }
    
    def generar_mensaje_bienvenida(self, nombre: str) -> str:
        """
        Genera mensaje de bienvenida personalizado usando concatenación de cadenas.
        
        Args:
            nombre (str): Nombre del usuario
            
        Returns:
            str: Mensaje de bienvenida personalizado
        """
        # Obtener información del usuario
        usuario_info = self.usuarios_registrados.get(nombre)
        
        if not usuario_info:
            # Mensaje para usuario no registrado
            saludo = "¡Hola " + nombre + "!"
            presentacion = " Bienvenido al " + "Sistema Avanzado" + " de "
            funcionalidad = "Gestión de Archivos" + " con " + "Conceptos de Programación"
            mensaje_base = saludo + presentacion + funcionalidad
            
            info_adicional = "\\n" + "Como usuario " + "nuevo, " + "tendrás acceso a todas las "
            caracteristicas = "funcionalidades " + "del sistema."
            mensaje_completo = mensaje_base + info_adicional + caracteristicas
        else:
            # Mensaje personalizado para usuario registrado
            saludo = "¡Bienvenido de nuevo " + nombre + "!"
            tipo_usuario = " (Usuario " + usuario_info["tipo"] + ")"
            presentacion = "\\n" + "Has accedido al " + "Sistema Avanzado"
            funcionalidad = " de " + "Gestión de Archivos"
            
            # Información de sesión
            sesiones = str(usuario_info["sesiones_totales"])
            info_sesion = "\\n" + "Sesiones anteriores: " + sesiones
            
            mensaje_completo = saludo + tipo_usuario + presentacion + funcionalidad + info_sesion
        
        # Agregar timestamp con concatenación
        fecha_actual = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
        timestamp = "\\n" + "Sesión iniciada: " + fecha_actual
        mensaje_final = mensaje_completo + timestamp
        
        return mensaje_final
    
    def iniciar_sesion(self, nombre: str) -> Dict:
        """
        Inicia sesión para un usuario.
        
        Args:
            nombre (str): Nombre del usuario
            
        Returns:
            Dict: Información de la sesión iniciada
            
        Raises:
            ValueError: Si las credenciales no son válidas
        """
        # Validar nombre
        es_valido, mensaje_error = self.validar_nombre_usuario(nombre)
        if not es_valido:
            raise ValueError(mensaje_error)
        
        # Registrar automáticamente si no existe (como se pide en los requisitos)
        if nombre not in self.usuarios_registrados:
            self.registrar_usuario(nombre, "invitado")
        
        # Actualizar información del usuario
        usuario_info = self.usuarios_registrados[nombre]
        usuario_info["ultima_conexion"] = datetime.now().isoformat()
        usuario_info["sesiones_totales"] += 1
        
        # Crear sesión
        session_id = str(uuid.uuid4())
        session_info = {
            "session_id": session_id,
            "usuario": nombre,
            "inicio_sesion": datetime.now().isoformat(),
            "activa": True
        }
        
        self.sesiones_activas[session_id] = session_info
        self.usuario_actual = nombre
        
        # Generar mensaje de bienvenida
        mensaje_bienvenida = self.generar_mensaje_bienvenida(nombre)
        
        return {
            "mensaje": mensaje_bienvenida,
            "session_id": session_id,
            "usuario_info": usuario_info,
            "timestamp": datetime.now().isoformat()
        }
    
    def cambiar_usuario(self, nombre_nuevo: str) -> Dict:
        """
        Cambia el usuario actual del sistema.
        Implementa la funcionalidad "Cambiar de usuario" requerida.
        
        Args:
            nombre_nuevo (str): Nombre del nuevo usuario
            
        Returns:
            Dict: Información del cambio de usuario
        """
        usuario_anterior = self.usuario_actual
        
        # Cerrar sesión anterior si existe
        if usuario_anterior:
            self._cerrar_sesiones_usuario(usuario_anterior)
        
        # Iniciar nueva sesión
        nueva_sesion = self.iniciar_sesion(nombre_nuevo)
        
        # Generar mensaje de cambio con concatenación
        if usuario_anterior:
            mensaje_cambio = "Usuario cambiado de " + usuario_anterior + " a " + nombre_nuevo
        else:
            mensaje_cambio = "Usuario " + nombre_nuevo + " ha iniciado " + "sesión"
        
        return {
            "mensaje_cambio": mensaje_cambio,
            "usuario_anterior": usuario_anterior,
            "usuario_nuevo": nombre_nuevo,
            "sesion_info": nueva_sesion,
            "timestamp": datetime.now().isoformat()
        }
    
    def _cerrar_sesiones_usuario(self, nombre: str) -> None:
        """
        Cierra todas las sesiones activas de un usuario.
        
        Args:
            nombre (str): Nombre del usuario
        """
        sesiones_a_cerrar = []
        for session_id, session_info in self.sesiones_activas.items():
            if session_info["usuario"] == nombre and session_info["activa"]:
                sesiones_a_cerrar.append(session_id)
        
        for session_id in sesiones_a_cerrar:
            self.sesiones_activas[session_id]["activa"] = False
            self.sesiones_activas[session_id]["fin_sesion"] = datetime.now().isoformat()
    
    def obtener_usuario_actual(self) -> Optional[Dict]:
        """
        Obtiene información del usuario actual.
        
        Returns:
            Optional[Dict]: Información del usuario actual o None
        """
        if not self.usuario_actual:
            return None
        
        return {
            "nombre": self.usuario_actual,
            "info": self.usuarios_registrados.get(self.usuario_actual),
            "sesiones_activas": len([s for s in self.sesiones_activas.values() 
                                   if s["usuario"] == self.usuario_actual and s["activa"]])
        }
    
    def obtener_estadisticas_usuarios(self) -> Dict:
        """
        Obtiene estadísticas generales de usuarios.
        Útil para el reporte final.
        
        Returns:
            Dict: Estadísticas de usuarios del sistema
        """
        total_usuarios = len(self.usuarios_registrados)
        usuarios_activos = len([u for u in self.usuarios_registrados.values() 
                               if u["ultima_conexion"]])
        sesiones_totales = sum(u["sesiones_totales"] for u in self.usuarios_registrados.values())
        sesiones_activas = len([s for s in self.sesiones_activas.values() if s["activa"]])
        
        # Concatenación de cadenas para descripciones
        descripcion_sistema = "Sistema " + "avanzado " + "de " + "gestión " + "de " + "usuarios"
        
        return {
            "descripcion": descripcion_sistema,
            "total_usuarios_registrados": total_usuarios,
            "usuarios_con_sesiones": usuarios_activos,
            "total_sesiones_historicas": sesiones_totales,
            "sesiones_actualmente_activas": sesiones_activas,
            "usuario_actual": self.usuario_actual,
            "timestamp": datetime.now().isoformat()
        }


# Instancia global del gestor de usuarios
user_manager = UserManager()