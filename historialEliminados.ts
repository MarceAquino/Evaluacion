import { Archivo } from "./Archivos/archivo";

/**
 * CLASE HISTORIAL ELIMINADOS - Registro de archivos eliminados
 *
 * Esta clase mantiene un registro histórico de todos los archivos que han sido
 * eliminados del sistema, junto con sus fechas de eliminación.
 *
 * Características importantes:
 * - Utiliza Map para asociar archivos con fechas de eliminación
 * - Proporciona funcionalidad de auditoría del sistema
 * - Permite recuperar información de archivos eliminados
 * - Facilita búsquedas por fecha de eliminación
 */
export class HistorialEliminados {
  // Map que asocia cada archivo eliminado con su fecha de eliminación
  private archivosEliminados: Map<Archivo, Date>;

  /**
   * Constructor que inicializa el registro de archivos eliminados
   */
  constructor() {
    this.archivosEliminados = new Map();
  }

  /**
   * Agrega un archivo al historial de eliminados
   * Registra el archivo y la fecha/hora exacta de eliminación
   *
   * @param archivo - Archivo que fue eliminado
   * @param fechaEliminacion - Fecha y hora de la eliminación
   */
  agregarAlHistorial(archivo: Archivo, fechaEliminacion: Date): void {
    this.archivosEliminados.set(archivo, fechaEliminacion);
    console.log(
      `Archivo ${archivo.getNombre()} agregado al historial de eliminados`
    );
  }

  /**
   * Obtiene la lista completa de archivos eliminados
   * Retorna solo los archivos, sin las fechas de eliminación
   *
   * @returns {Archivo[]} Array con todos los archivos eliminados
   */
  obtenerHistorialCompleto(): Archivo[] {
    return Array.from(this.archivosEliminados.keys());
  }

  /**
   * Busca archivos eliminados en una fecha específica
   * Útil para auditorías y reportes por fecha
   *
   * @param fecha - Fecha a buscar (se compara solo la fecha, no la hora)
   * @returns {Archivo[]} Array de archivos eliminados en esa fecha
   */
  obtenerHistorialPorFecha(fecha: Date): Archivo[] {
    const resultado: Archivo[] = [];

    // Itera sobre el Map buscando coincidencias de fecha
    this.archivosEliminados.forEach((fechaEliminacion, archivo) => {
      // Compara solo la fecha (día/mes/año) ignorando la hora
      if (fechaEliminacion.toDateString() === fecha.toDateString()) {
        resultado.push(archivo);
      }
    });

    return resultado;
  }
}
