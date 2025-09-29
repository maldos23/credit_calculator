/**
 * Servicio API para el Sistema Avanzado de Gestión de Archivos
 * Conecta el frontend con los endpoints del backend implementados
 */

const API_BASE_URL = 'http://localhost:8000/advanced';

// Tipos para las respuestas de la API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface UserSession {
  mensaje: string;
  session_id: string;
  usuario_info: {
    nombre_completo: string;
    tipo: string;
    descripcion: string;
    ultima_conexion: string;
    sesiones_totales: number;
  };
  timestamp: string;
}

export interface FileInfo {
  nombre: string;
  tipo: string;
  descripcion: string;
  fecha_creacion: [number, number, number]; // tupla (día, mes, año)
  fecha_modificacion: [number, number, number];
  autor: string;
  tamaño_bytes: number;
  solo_lectura: boolean;
  origen: 'predefinido' | 'usuario';
}

export interface FileContent {
  nombre: string;
  contenido: string;
  metadata: {
    tipo: string;
    fecha_creacion: [number, number, number];
    fecha_modificacion: [number, number, number];
    autor: string;
    solo_lectura: boolean;
    origen: string;
  };
  estadisticas: {
    tamaño_bytes: number;
    lineas: number;
    caracteres: number;
  };
  timestamp_lectura: string;
}

export interface DateConfig {
  fecha_tupla: [number, number, number];
  fecha_formateada: string;
  componentes: {
    dia: number;
    mes: number;
    año: number;
  };
}

export interface SystemStatus {
  timestamp: string;
  version: string;
  modulos_cargados: string[];
  usuario_actual: any;
  estadisticas_usuarios: any;
  estadisticas_archivos: any;
  fecha_sistema_tupla: [number, number, number];
  configuraciones: any;
}

class AdvancedAPIService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Error en la API');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // ===== GESTIÓN DE USUARIOS =====
  
  async loginUser(nombre: string): Promise<ApiResponse<UserSession>> {
    return this.request<UserSession>('/users/login', {
      method: 'POST',
      body: JSON.stringify({ nombre }),
    });
  }

  async changeUser(nombre_nuevo: string): Promise<ApiResponse<any>> {
    return this.request('/users/change', {
      method: 'POST',
      body: JSON.stringify({ nombre_nuevo }),
    });
  }

  async getCurrentUser(): Promise<ApiResponse<any>> {
    return this.request('/users/current');
  }

  async getUserStats(): Promise<ApiResponse<any>> {
    return this.request('/users/stats');
  }

  // ===== GESTIÓN DE FECHAS =====

  async configureDate(dia: number, mes: number, año: number): Promise<ApiResponse<any>> {
    return this.request('/date/configure', {
      method: 'POST',
      body: JSON.stringify({ dia, mes, año }),
    });
  }

  async getCurrentDate(): Promise<ApiResponse<DateConfig>> {
    return this.request<DateConfig>('/date/current');
  }

  // ===== GESTIÓN DE ARCHIVOS =====

  async listFiles(): Promise<ApiResponse<{ archivos: FileInfo[] }>> {
    return this.request<{ archivos: FileInfo[] }>('/files/list');
  }

  async readFile(nombre_archivo: string): Promise<ApiResponse<FileContent>> {
    return this.request<FileContent>('/files/read', {
      method: 'POST',
      body: JSON.stringify({ nombre_archivo }),
    });
  }

  async writeFile(
    nombre_archivo: string,
    contenido: string,
    autor: string
  ): Promise<ApiResponse<any>> {
    return this.request('/files/write', {
      method: 'POST',
      body: JSON.stringify({ nombre_archivo, contenido, autor }),
    });
  }

  async createFile(
    nombre_archivo: string,
    contenido: string,
    autor: string,
    tipo: string = 'texto',
    descripcion?: string
  ): Promise<ApiResponse<any>> {
    return this.request('/files/create', {
      method: 'POST',
      body: JSON.stringify({ nombre_archivo, contenido, autor, tipo, descripcion }),
    });
  }

  async getFileStats(): Promise<ApiResponse<any>> {
    return this.request('/files/stats');
  }

  // ===== SISTEMA =====

  async simulateLoading(): Promise<ApiResponse<any>> {
    return this.request('/system/loading', {
      method: 'POST',
    });
  }

  async getSystemStatus(): Promise<ApiResponse<SystemStatus>> {
    return this.request<SystemStatus>('/system/status');
  }

  // ===== GESTIÓN DE USUARIOS =====

  async listUsers(): Promise<ApiResponse<{ usuarios: UserSession[] }>> {
    return this.request<{ usuarios: UserSession[] }>('/users/list');
  }

  // ===== GENERACIÓN DE REPORTES =====

  async generateReport(
    tipo: string,
    incluir_usuarios: boolean,
    incluir_archivos: boolean,
    incluir_fechas: boolean,
    incluir_estadisticas: boolean
  ): Promise<ApiResponse<{ contenido: string; url_descarga?: string }>> {
    return this.request<{ contenido: string; url_descarga?: string }>('/reports/generate', {
      method: 'POST',
      body: JSON.stringify({
        tipo,
        incluir_usuarios,
        incluir_archivos,
        incluir_fechas,
        incluir_estadisticas
      }),
    });
  }

  async downloadReport(filename: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/reports/download/${filename}`);
      
      if (!response.ok) {
        throw new Error('Error al descargar reporte');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading report:', error);
      throw error;
    }
  }
}

// Exportar instancia única
export const advancedAPI = new AdvancedAPIService();