import { Archivo } from "./Archivos/archivo";
import { FabricaDeAcciones } from "./FabricaAcciones/fabricaAcciones";
import { SistemaOperativo } from "./sistemaOperativo";
import { HistorialEliminados } from "./historialEliminados";
import { TipoArchivo } from "./Enum/tipoArchivo";
import { TipoAccion } from "./Enum/tipoAccion";
import { Video } from "./Archivos/video";
import { Documentacion } from "./Archivos/documento";
import { SONIDO } from "./Archivos/sonido";
import { Imagen } from "./Archivos/imagen";

/**
 * PATRÓN SINGLETON - GestorDeArchivos
 *
 * Esta clase implementa el patrón Singleton para asegurar que solo exista
 * una única instancia del gestor de archivos en toda la aplicación.
 *
 * Características del Singleton implementado:
 * - Constructor privado: impide la creación directa de instancias
 * - Variable estática privada: almacena la única instancia
 * - Método estático público: proporciona acceso controlado a la instancia
 * - Lazy initialization: la instancia se crea solo cuando se necesita
 */
export class GestorDeArchivos {
  // Variable estática que almacena la única instancia de la clase
  private static instancia: GestorDeArchivos;

  // Propiedades de la instancia única
  private archivos: Archivo[];
  private fabricaAcciones: FabricaDeAcciones;
  private sistemaOperativo: SistemaOperativo;
  private historialEliminados: HistorialEliminados;

  /**
   * Constructor privado - Característica clave del patrón Singleton
   * Al ser privado, impide que se puedan crear instancias desde fuera de la clase
   * Solo puede ser llamado desde dentro de la propia clase
   */
  private constructor() {
    this.archivos = [];
    this.fabricaAcciones = new FabricaDeAcciones();
    this.sistemaOperativo = new SistemaOperativo(100 * 1024 * 1024); // 100MB de espacio
    this.historialEliminados = new HistorialEliminados();
  }

  /**
   * Método estático para obtener la única instancia - Punto de acceso global
   * Implementa "Lazy Initialization": crea la instancia solo si no existe
   *
   * @returns {GestorDeArchivos} La única instancia del gestor de archivos
   */
  static getInstancia(): GestorDeArchivos {
    // Si no existe la instancia, la crea (solo ocurre una vez)
    if (!GestorDeArchivos.instancia) {
      GestorDeArchivos.instancia = new GestorDeArchivos();
    }
    // Siempre retorna la misma instancia
    return GestorDeArchivos.instancia;
  }

  /**
   * Método para crear archivos utilizando el patrón Factory Method
   * Delega la creación específica según el tipo de archivo
   *
   * @param nombre - Nombre del archivo a crear
   * @param formato - Tipo de archivo (usando enum TipoArchivo)
   * @param tamanio - Tamaño del archivo en bytes
   * @param params - Parámetros adicionales específicos para cada tipo de archivo
   * @returns {Archivo | null} El archivo creado o null si hubo error
   */
  crearArchivo(
    nombre: string,
    formato: TipoArchivo,
    tamanio: number,
    ...params: any[]
  ): Archivo | null {
    let archivo: Archivo;

    // Switch que actúa como Factory Method para crear diferentes tipos de archivo
    switch (formato) {
      case TipoArchivo.IMAGEN:
        archivo = new Imagen(
          nombre,
          tamanio,
          TipoArchivo.IMAGEN,
          params[0] || "1920x1080"
        );
        break;
      case TipoArchivo.VIDEO:
        archivo = new Video(
          nombre,
          tamanio,
          TipoArchivo.VIDEO,
          params[0] || 120,
          params[1] || "1920x1080"
        );
        break;
      case TipoArchivo.SONIDO:
        archivo = new SONIDO(
          nombre,
          tamanio,
          TipoArchivo.SONIDO,
          params[0] || 180
        );
        break;
      case TipoArchivo.DOCUMENTO:
        archivo = new Documentacion(
          nombre,
          tamanio,
          TipoArchivo.DOCUMENTO,
          params[0] || 10
        );
        break;
      default:
        console.error("Tipo de archivo no soportado");
        return null;
    }

    // Verifica si hay espacio disponible antes de crear el archivo
    if (this.sistemaOperativo.crearEstructuraArchivo(archivo)) {
      this.archivos.push(archivo);
      console.log(`Archivo ${nombre} creado exitosamente`);
      return archivo;
    }

    return null;
  }

  /**
   * Ejecuta acciones sobre archivos utilizando el patrón Factory para crear acciones
   * Delega la creación de acciones a la FabricaDeAcciones
   *
   * @param tipo - Tipo de acción a ejecutar (BORRAR, COPIAR, RENOMBRAR)
   * @param archivo - Archivo sobre el cual ejecutar la acción
   * @param parametro - Parámetro adicional según la acción (opcional)
   * @returns {boolean} true si la acción se ejecutó correctamente, false en caso contrario
   */
  ejecutarAccion(
    tipo: TipoAccion,
    archivo: Archivo,
    parametro?: string
  ): boolean {
    try {
      // Utiliza la fábrica para crear la acción específica
      const accion = this.fabricaAcciones.crearAccion(
        tipo,
        archivo,
        parametro || "",
        this.sistemaOperativo
      );
      const resultado = accion.ejecutar();

      // Manejo específico según el tipo de acción ejecutada
      if (resultado) {
        switch (tipo) {
          case TipoAccion.BORRAR:
            // Elimina el archivo del arreglo de archivos activos
            const index = this.archivos.indexOf(archivo);
            if (index > -1) {
              this.archivos.splice(index, 1);
              // Registra en el historial de eliminados
              this.historialEliminados.agregarAlHistorial(archivo, new Date());
              // Libera el espacio ocupado
              this.sistemaOperativo.liberarEspacio(archivo.getTamanio());
              console.log(`✓ Archivo eliminado del sistema`);
            }
            break;

          case TipoAccion.RENOMBRAR:
            // La acción de renombrar se maneja internamente en la clase Renombrar
            break;

          case TipoAccion.COPIAR:
            // La acción de copiar se maneja internamente en la clase Copiar
            break;
        }
      }

      return resultado;
    } catch (error) {
      console.error(`Error ejecutando acción: ${error}`);
      return false;
    }
  }

  /**
   * Busca archivos en el sistema por múltiples criterios de forma simultánea
   * Implementa búsqueda paralela para optimizar el rendimiento
   *
   * @param nombre - Nombre o parte del nombre del archivo (opcional)
   * @param tipo - Tipo de archivo a buscar (opcional)
   * @param fecha - Fecha de creación específica (opcional)
   * @returns {Archivo[]} Arreglo de archivos que cumplen los criterios
   */
  buscarEnParalelo(
    nombre?: string,
    tipo?: TipoArchivo,
    fecha?: Date
  ): Archivo[] {
    return this.archivos.filter((archivo) => {
      let cumple = true;
      // Filtro por nombre (búsqueda parcial)
      if (nombre) cumple = cumple && archivo.getNombre().includes(nombre);
      // Filtro por tipo de archivo
      if (tipo)
        cumple =
          cumple &&
          archivo.getFormato().toLowerCase().includes(tipo.toLowerCase());
      // Filtro por fecha de creación
      if (fecha) {
        const fechaArchivo = archivo.getFechaCreacion().toDateString();
        const fechaBusqueda = fecha.toDateString();
        cumple = cumple && fechaArchivo === fechaBusqueda;
      }
      return cumple;
    });
  }

  /**
   * Obtiene una copia de todos los archivos activos en el sistema
   * Utiliza spread operator para evitar modificaciones externas
   *
   * @returns {Archivo[]} Copia del arreglo de archivos
   */
  listarArchivos(): Archivo[] {
    return [...this.archivos];
  }

  /**
   * Obtiene el historial completo de archivos eliminados
   * Delega la funcionalidad al objeto HistorialEliminados
   *
   * @returns {Archivo[]} Arreglo de archivos eliminados
   */
  obtenerHistorialEliminados(): Archivo[] {
    return this.historialEliminados.obtenerHistorialCompleto();
  }

  /**
   * Consulta el espacio disponible en el sistema operativo
   * Delega la funcionalidad al objeto SistemaOperativo
   *
   * @returns {number} Espacio disponible en bytes
   */
  obtenerEspacioDisponible(): number {
    return this.sistemaOperativo.obtenerEspacioDisponible();
  }
}
