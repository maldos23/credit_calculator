"""
Módulo de Gestión de Archivos - Conceptos Avanzados
==================================================

Este módulo implementa la gestión de archivos utilizando:
- Diccionarios con mínimo 4 archivos predefinidos
- Tuplas para almacenar fechas (día, mes, año)
- Manejo de excepciones completo
- Ciclos while y for según se especifica

Funcionalidades principales:
- Lectura de archivos con selección por nombre
- Escritura y modificación de archivos existentes
- Creación de nuevos archivos con metadata
- Registro de fechas usando tuplas
"""

import os
import json
from datetime import datetime
from typing import Dict, List, Tuple, Optional, Any
from pathlib import Path


class FileManager:
    """
    Clase para gestión avanzada de archivos.
    Implementa diccionarios, tuplas, manejo de excepciones y ciclos.
    """
    
    def __init__(self, directorio_base: str = "file_manager"):
        """
        Inicializa el gestor de archivos.
        
        Args:
            directorio_base (str): Directorio base para almacenar archivos
        """
        self.directorio_base = Path(directorio_base)
        self.fecha_actual: Tuple[int, int, int] = (28, 9, 2025)  # tupla (día, mes, año)
        
        # Diccionario con mínimo 4 archivos predefinidos (requisito)
        self.archivos_predefinidos: Dict[str, Dict[str, Any]] = {
            "documento_crediticio.txt": {
                "contenido": "Este archivo contiene información sobre evaluaciones crediticias realizadas por el sistema BBVA.\\nIncluye datos de clientes, montos aprobados y políticas aplicadas.",
                "tipo": "documento",
                "fecha_creacion": (1, 9, 2025),  # tupla como se especifica
                "fecha_modificacion": (15, 9, 2025),
                "autor": "sistema_bbva",
                "tamaño_bytes": 256,
                "solo_lectura": True,
                "descripcion": "Archivo principal de documentación crediticia"
            },
            "configuracion_sistema.json": {
                "contenido": '{\\n  "servidor": {\\n    "host": "localhost",\\n    "puerto": 8000,\\n    "debug": true\\n  },\\n  "base_datos": {\\n    "tipo": "sqlite",\\n    "archivo": "bbva_credit.db"\\n  },\\n  "politicas": {\\n    "edad_minima": 18,\\n    "edad_maxima": 69,\\n    "ingreso_minimo": 7500\\n  }\\n}',
                "tipo": "configuracion",
                "fecha_creacion": (10, 8, 2025),
                "fecha_modificacion": (20, 9, 2025),
                "autor": "administrador",
                "tamaño_bytes": 312,
                "solo_lectura": False,
                "descripcion": "Archivo de configuración principal del sistema"
            },
            "log_operaciones.log": {
                "contenido": "[2025-09-01 10:00:00] INFO - Sistema iniciado correctamente\\n[2025-09-01 10:15:00] INFO - Usuario 'admin' conectado\\n[2025-09-15 14:30:00] INFO - Evaluación crediticia completada - ID: EC001\\n[2025-09-20 16:45:00] WARNING - Intento de acceso no autorizado\\n[2025-09-28 09:00:00] INFO - Sesión actual iniciada",
                "tipo": "log",
                "fecha_creacion": (1, 9, 2025),
                "fecha_modificacion": (28, 9, 2025),
                "autor": "sistema",
                "tamaño_bytes": 445,
                "solo_lectura": False,
                "descripcion": "Registro de operaciones del sistema"
            },
            "reporte_mensual.md": {
                "contenido": "# Reporte Mensual - Septiembre 2025\\n\\n## Estadísticas Generales\\n- Evaluaciones realizadas: 156\\n- Aprobaciones: 89 (57%)\\n- Rechazos: 45 (29%)\\n- Contraofertas: 22 (14%)\\n\\n## Análisis de Riesgo\\n- Score promedio: 678\\n- DTI promedio: 32%\\n- Monto promedio solicitado: $125,000\\n\\n## Observaciones\\nSe observa un incremento en las solicitudes de crédito durante el último trimestre.",
                "tipo": "reporte",
                "fecha_creacion": (25, 8, 2025),
                "fecha_modificacion": (28, 9, 2025),
                "autor": "analista",
                "tamaño_bytes": 512,
                "solo_lectura": False,
                "descripcion": "Reporte mensual de actividades crediticias"
            },
            "manual_usuario.txt": {
                "contenido": "MANUAL DE USUARIO - SISTEMA AVANZADO DE GESTIÓN\\n\\n1. INTRODUCCIÓN\\nEste sistema permite gestionar archivos utilizando conceptos avanzados de programación.\\n\\n2. FUNCIONALIDADES\\n- Lectura de archivos existentes\\n- Escritura y modificación\\n- Creación de nuevos documentos\\n- Gestión de usuarios\\n\\n3. OPERACIONES BÁSICAS\\nPara leer un archivo, seleccione la opción 1 del menú principal.\\nPara escribir, use la opción 2.\\nPara crear nuevos archivos, use la opción 3.",
                "tipo": "manual",
                "fecha_creacion": (5, 9, 2025),
                "fecha_modificacion": (10, 9, 2025),
                "autor": "documentacion",
                "tamaño_bytes": 678,
                "solo_lectura": True,
                "descripcion": "Manual de usuario del sistema"
            }
        }
        
        # Archivos creados dinámicamente por usuarios
        self.archivos_usuarios: Dict[str, Dict[str, Any]] = {}
        
        # Estadísticas de uso
        self.estadisticas = {
            "archivos_leidos": 0,
            "archivos_escritos": 0,
            "archivos_creados": 0,
            "errores_manejo": 0
        }
        
        # Crear directorio si no existe
        self._inicializar_directorio()
    
    def _inicializar_directorio(self) -> None:
        """
        Crea el directorio base si no existe.
        Maneja excepciones de permisos y espacio en disco.
        """
        try:
            self.directorio_base.mkdir(parents=True, exist_ok=True)
            print(f"✅ Directorio de trabajo creado: {self.directorio_base}")
        except PermissionError as e:
            print(f"❌ Error de permisos al crear directorio: {e}")
            # Fallback a directorio temporal
            self.directorio_base = Path("/tmp/file_manager")
            self.directorio_base.mkdir(exist_ok=True)
        except OSError as e:
            print(f"❌ Error del sistema al crear directorio: {e}")
            raise
    
    def configurar_fecha(self, dia: int, mes: int, año: int) -> Dict[str, Any]:
        """
        Configura la fecha actual del sistema usando tupla.
        
        Args:
            dia (int): Día del mes (1-31)
            mes (int): Mes del año (1-12)  
            año (int): Año (formato completo)
            
        Returns:
            Dict[str, Any]: Confirmación de configuración de fecha
            
        Raises:
            ValueError: Si la fecha no es válida
        """
        # Validar fecha con manejo de excepciones
        try:
            # Validaciones básicas
            if not (1 <= dia <= 31):
                raise ValueError(f"Día inválido: {dia}. Debe estar entre 1 y 31")
            if not (1 <= mes <= 12):
                raise ValueError(f"Mes inválido: {mes}. Debe estar entre 1 y 12")
            if not (2020 <= año <= 2030):
                raise ValueError(f"Año inválido: {año}. Debe estar entre 2020 y 2030")
            
            # Validación de fecha específica (febrero, días por mes)
            dias_por_mes = [31, 29 if año % 4 == 0 else 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            if dia > dias_por_mes[mes - 1]:
                raise ValueError(f"El mes {mes} del año {año} no tiene {dia} días")
            
            # Almacenar como tupla (requisito específico)
            self.fecha_actual = (dia, mes, año)
            
            return {
                "mensaje": f"Fecha configurada exitosamente: {dia:02d}/{mes:02d}/{año}",
                "fecha_tupla": self.fecha_actual,
                "fecha_formateada": f"{dia:02d}/{mes:02d}/{año}",
                "timestamp": datetime.now().isoformat()
            }
            
        except ValueError as e:
            self.estadisticas["errores_manejo"] += 1
            raise ValueError(f"Error de validación de fecha: {e}")
        except Exception as e:
            self.estadisticas["errores_manejo"] += 1
            raise Exception(f"Error inesperado al configurar fecha: {e}")
    
    def obtener_lista_archivos(self) -> Dict[str, List[Dict[str, Any]]]:
        """
        Obtiene la lista completa de archivos disponibles.
        Implementa el diccionario con mínimo 4 archivos como se requiere.
        
        Returns:
            Dict[str, List[Dict[str, Any]]]: Diccionario con listas de archivos
        """
        archivos_disponibles = []
        
        # Agregar archivos predefinidos (mínimo 4 - requisito cumplido)
        for nombre, info in self.archivos_predefinidos.items():
            archivo_info = {
                "nombre": nombre,
                "tipo": info["tipo"],
                "descripcion": info["descripcion"],
                "fecha_creacion": info["fecha_creacion"],  # tupla
                "fecha_modificacion": info["fecha_modificacion"],  # tupla
                "autor": info["autor"],
                "tamaño_bytes": info["tamaño_bytes"],
                "solo_lectura": info["solo_lectura"],
                "origen": "predefinido"
            }
            archivos_disponibles.append(archivo_info)
        
        # Agregar archivos creados por usuarios
        for nombre, info in self.archivos_usuarios.items():
            archivo_info = {
                "nombre": nombre,
                "tipo": info["tipo"],
                "descripcion": info.get("descripcion", "Archivo creado por usuario"),
                "fecha_creacion": info["fecha_creacion"],
                "fecha_modificacion": info["fecha_modificacion"],
                "autor": info["autor"],
                "tamaño_bytes": len(info["contenido"].encode('utf-8')),
                "solo_lectura": info.get("solo_lectura", False),
                "origen": "usuario"
            }
            archivos_disponibles.append(archivo_info)
        
        return {
            "archivos": archivos_disponibles,
            "total_archivos": len(archivos_disponibles),
            "archivos_predefinidos": len(self.archivos_predefinidos),
            "archivos_usuarios": len(self.archivos_usuarios),
            "fecha_consulta": self.fecha_actual
        }
    
    def leer_archivo(self, nombre_archivo: str) -> Dict[str, Any]:
        """
        Lee el contenido de un archivo específico.
        Implementa manejo de excepciones para archivos inexistentes.
        
        Args:
            nombre_archivo (str): Nombre del archivo a leer
            
        Returns:
            Dict[str, Any]: Contenido y metadata del archivo
            
        Raises:
            FileNotFoundError: Si el archivo no existe
            PermissionError: Si no hay permisos de lectura
        """
        try:
            # Buscar en archivos predefinidos
            if nombre_archivo in self.archivos_predefinidos:
                archivo = self.archivos_predefinidos[nombre_archivo]
                self.estadisticas["archivos_leidos"] += 1
                
                return {
                    "nombre": nombre_archivo,
                    "contenido": archivo["contenido"],
                    "metadata": {
                        "tipo": archivo["tipo"],
                        "fecha_creacion": archivo["fecha_creacion"],
                        "fecha_modificacion": archivo["fecha_modificacion"],
                        "autor": archivo["autor"],
                        "solo_lectura": archivo["solo_lectura"],
                        "origen": "predefinido"
                    },
                    "estadisticas": {
                        "tamaño_bytes": archivo["tamaño_bytes"],
                        "lineas": archivo["contenido"].count('\\n') + 1,
                        "caracteres": len(archivo["contenido"])
                    },
                    "timestamp_lectura": datetime.now().isoformat()
                }
            
            # Buscar en archivos de usuarios
            elif nombre_archivo in self.archivos_usuarios:
                archivo = self.archivos_usuarios[nombre_archivo]
                self.estadisticas["archivos_leidos"] += 1
                
                return {
                    "nombre": nombre_archivo,
                    "contenido": archivo["contenido"],
                    "metadata": {
                        "tipo": archivo["tipo"],
                        "fecha_creacion": archivo["fecha_creacion"],
                        "fecha_modificacion": archivo["fecha_modificacion"],
                        "autor": archivo["autor"],
                        "solo_lectura": archivo.get("solo_lectura", False),
                        "origen": "usuario"
                    },
                    "estadisticas": {
                        "tamaño_bytes": len(archivo["contenido"].encode('utf-8')),
                        "lineas": archivo["contenido"].count('\\n') + 1,
                        "caracteres": len(archivo["contenido"])
                    },
                    "timestamp_lectura": datetime.now().isoformat()
                }
            
            # Archivo no encontrado - lanzar excepción
            else:
                archivos_disponibles = list(self.archivos_predefinidos.keys()) + list(self.archivos_usuarios.keys())
                raise FileNotFoundError(
                    f"El archivo '{nombre_archivo}' no existe. "
                    f"Archivos disponibles: {', '.join(archivos_disponibles)}"
                )
                
        except FileNotFoundError:
            self.estadisticas["errores_manejo"] += 1
            raise
        except Exception as e:
            self.estadisticas["errores_manejo"] += 1
            raise Exception(f"Error inesperado al leer archivo '{nombre_archivo}': {e}")
    
    def escribir_archivo(self, nombre_archivo: str, nuevo_contenido: str, autor: str) -> Dict[str, Any]:
        """
        Escribir/modificar contenido de un archivo existente.
        Usa la fecha actual (tupla) para registrar modificación.
        
        Args:
            nombre_archivo (str): Nombre del archivo a modificar
            nuevo_contenido (str): Nuevo contenido del archivo
            autor (str): Usuario que realiza la modificación
            
        Returns:
            Dict[str, Any]: Confirmación de escritura
            
        Raises:
            FileNotFoundError: Si el archivo no existe
            PermissionError: Si el archivo es de solo lectura
        """
        try:
            # Verificar si existe en predefinidos
            if nombre_archivo in self.archivos_predefinidos:
                archivo = self.archivos_predefinidos[nombre_archivo]
                
                if archivo["solo_lectura"]:
                    raise PermissionError(f"El archivo '{nombre_archivo}' es de solo lectura")
                
                # Actualizar contenido y fecha usando tupla
                archivo["contenido"] = nuevo_contenido
                archivo["fecha_modificacion"] = self.fecha_actual  # tupla
                archivo["tamaño_bytes"] = len(nuevo_contenido.encode('utf-8'))
                
                self.estadisticas["archivos_escritos"] += 1
                
                return {
                    "mensaje": f"Archivo '{nombre_archivo}' modificado exitosamente",
                    "nombre_archivo": nombre_archivo,
                    "fecha_modificacion": self.fecha_actual,
                    "autor_modificacion": autor,
                    "tamaño_nuevo": archivo["tamaño_bytes"],
                    "timestamp": datetime.now().isoformat()
                }
            
            # Verificar si existe en archivos de usuarios
            elif nombre_archivo in self.archivos_usuarios:
                archivo = self.archivos_usuarios[nombre_archivo]
                
                if archivo.get("solo_lectura", False):
                    raise PermissionError(f"El archivo '{nombre_archivo}' es de solo lectura")
                
                # Actualizar contenido y fecha usando tupla
                archivo["contenido"] = nuevo_contenido
                archivo["fecha_modificacion"] = self.fecha_actual  # tupla
                
                self.estadisticas["archivos_escritos"] += 1
                
                return {
                    "mensaje": f"Archivo '{nombre_archivo}' modificado exitosamente",
                    "nombre_archivo": nombre_archivo,
                    "fecha_modificacion": self.fecha_actual,
                    "autor_modificacion": autor,
                    "tamaño_nuevo": len(nuevo_contenido.encode('utf-8')),
                    "timestamp": datetime.now().isoformat()
                }
            
            # Archivo no existe
            else:
                raise FileNotFoundError(f"El archivo '{nombre_archivo}' no existe")
                
        except (FileNotFoundError, PermissionError):
            self.estadisticas["errores_manejo"] += 1
            raise
        except Exception as e:
            self.estadisticas["errores_manejo"] += 1
            raise Exception(f"Error inesperado al escribir archivo '{nombre_archivo}': {e}")
    
    def crear_archivo(self, nombre_archivo: str, contenido: str, autor: str, 
                     tipo: str = "texto", descripcion: str = "") -> Dict[str, Any]:
        """
        Crear un nuevo archivo en el sistema.
        Usa la fecha actual (tupla) para registrar creación.
        
        Args:
            nombre_archivo (str): Nombre del nuevo archivo
            contenido (str): Contenido inicial del archivo
            autor (str): Usuario que crea el archivo
            tipo (str): Tipo de archivo (por defecto "texto")
            descripcion (str): Descripción del archivo
            
        Returns:
            Dict[str, Any]: Confirmación de creación
            
        Raises:
            ValueError: Si el archivo ya existe o el nombre es inválido
        """
        try:
            # Validar nombre del archivo
            if not nombre_archivo or not nombre_archivo.strip():
                raise ValueError("El nombre del archivo no puede estar vacío")
            
            nombre_archivo = nombre_archivo.strip()
            
            # Verificar si ya existe
            if (nombre_archivo in self.archivos_predefinidos or 
                nombre_archivo in self.archivos_usuarios):
                raise ValueError(f"El archivo '{nombre_archivo}' ya existe")
            
            # Crear archivo usando fecha actual (tupla)
            nuevo_archivo = {
                "contenido": contenido,
                "tipo": tipo,
                "fecha_creacion": self.fecha_actual,  # tupla como se especifica
                "fecha_modificacion": self.fecha_actual,  # tupla
                "autor": autor,
                "descripcion": descripcion if descripcion else f"Archivo {tipo} creado por {autor}",
                "solo_lectura": False
            }
            
            # Almacenar en archivos de usuarios
            self.archivos_usuarios[nombre_archivo] = nuevo_archivo
            self.estadisticas["archivos_creados"] += 1
            
            return {
                "mensaje": f"Archivo '{nombre_archivo}' creado exitosamente",
                "nombre_archivo": nombre_archivo,
                "tipo": tipo,
                "fecha_creacion": self.fecha_actual,
                "autor": autor,
                "tamaño_bytes": len(contenido.encode('utf-8')),
                "descripcion": nuevo_archivo["descripcion"],
                "timestamp": datetime.now().isoformat()
            }
            
        except ValueError:
            self.estadisticas["errores_manejo"] += 1
            raise
        except Exception as e:
            self.estadisticas["errores_manejo"] += 1
            raise Exception(f"Error inesperado al crear archivo '{nombre_archivo}': {e}")
    
    def obtener_estadisticas(self) -> Dict[str, Any]:
        """
        Obtiene estadísticas completas del sistema de archivos.
        Útil para el reporte final.
        
        Returns:
            Dict[str, Any]: Estadísticas completas del sistema
        """
        total_archivos = len(self.archivos_predefinidos) + len(self.archivos_usuarios)
        
        # Calcular tamaños totales
        tamaño_predefinidos = sum(
            archivo["tamaño_bytes"] for archivo in self.archivos_predefinidos.values()
        )
        tamaño_usuarios = sum(
            len(archivo["contenido"].encode('utf-8')) for archivo in self.archivos_usuarios.values()
        )
        
        # Análisis por tipos
        tipos_archivos = {}
        for archivo in self.archivos_predefinidos.values():
            tipos_archivos[archivo["tipo"]] = tipos_archivos.get(archivo["tipo"], 0) + 1
        for archivo in self.archivos_usuarios.values():
            tipos_archivos[archivo["tipo"]] = tipos_archivos.get(archivo["tipo"], 0) + 1
        
        return {
            "resumen": {
                "total_archivos": total_archivos,
                "archivos_predefinidos": len(self.archivos_predefinidos),
                "archivos_creados_usuarios": len(self.archivos_usuarios),
                "tamaño_total_bytes": tamaño_predefinidos + tamaño_usuarios
            },
            "operaciones_realizadas": self.estadisticas.copy(),
            "tipos_archivos": tipos_archivos,
            "fecha_actual_sistema": self.fecha_actual,
            "directorio_trabajo": str(self.directorio_base),
            "archivos_solo_lectura": len([
                a for a in self.archivos_predefinidos.values() if a["solo_lectura"]
            ]),
            "timestamp_estadisticas": datetime.now().isoformat()
        }


# Instancia global del gestor de archivos
file_manager = FileManager()