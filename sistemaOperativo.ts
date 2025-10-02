import { Archivo } from "./Archivos/archivo";

/**
 * CLASE SISTEMAOPERATIVO - Simulador de gestión de espacio en disco
 *
 * Esta clase simula las funcionalidades básicas de gestión de espacio
 * de un sistema operativo real. Controla el espacio disponible y
 * la creación/eliminación de archivos.
 *
 * Características:
 * - Gestión de espacio total y disponible
 * - Validación de espacio antes de crear archivos
 * - Liberación de espacio al eliminar archivos
 * - Sistema de avisos para operaciones del SO
 */
export class SistemaOperativo {
  private espacioDisponible: number;
  private espacioTotal: number;

  /**
   * Constructor del sistema operativo
   *
   * @param espacioTotal - Espacio total del disco en bytes
   */
  constructor(espacioTotal: number) {
    this.espacioTotal = espacioTotal;
    this.espacioDisponible = espacioTotal; // Inicialmente todo el espacio está disponible
  }

  /**
   * Verifica si hay espacio suficiente para un archivo de cierto tamaño
   * Método privado usado internamente para validaciones
   *
   * @param tamanio - Tamaño requerido en bytes
   * @returns {boolean} true si hay espacio suficiente
   */
  private verificarEspacio(tamanio: number): boolean {
    return this.espacioDisponible >= tamanio;
  }

  /**
   * Muestra avisos del sistema operativo
   * Método privado para comunicar mensajes del SO
   *
   * @param mensaje - Mensaje a mostrar
   */
  private mostrarAviso(mensaje: string): void {
    console.warn(`[Sistema Operativo] ${mensaje}`);
  }

  /**
   * Crea la estructura de un archivo en el sistema
   * Verifica espacio disponible y reserva el espacio necesario
   *
   * @param archivo - Archivo a crear en el sistema
   * @returns {boolean} true si el archivo se creó exitosamente
   */
  crearEstructuraArchivo(archivo: Archivo): boolean {
    // Verificar si hay espacio suficiente
    if (!this.verificarEspacio(archivo.getTamanio())) {
      this.mostrarAviso(
        `No hay espacio suficiente para crear ${archivo.getNombre()}`
      );
      return false;
    }

    // Reservar espacio para el archivo
    this.espacioDisponible -= archivo.getTamanio();
    console.log(
      `Archivo ${archivo.getNombre()} creado. Espacio disponible: ${
        this.espacioDisponible
      } bytes`
    );
    return true;
  }

  /**
   * Libera espacio cuando se elimina un archivo
   * Devuelve el espacio ocupado al pool disponible
   *
   * @param tamanio - Tamaño del archivo eliminado en bytes
   */
  liberarEspacio(tamanio: number): void {
    this.espacioDisponible += tamanio;
    console.log(
      `Espacio liberado: ${tamanio} bytes. Disponible: ${this.espacioDisponible} bytes`
    );
  }

  /**
   * Obtiene el espacio actualmente disponible
   *
   * @returns {number} Espacio disponible en bytes
   */
  obtenerEspacioDisponible(): number {
    return this.espacioDisponible;
  }

  /**
   * Obtiene el espacio total del disco
   *
   * @returns {number} Espacio total en bytes
   */
  getEspacioTotal(): number {
    return this.espacioTotal;
  }
}
