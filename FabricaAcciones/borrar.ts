import { Accion } from "./accion";
import { Archivo } from "../Archivos/archivo";
import { EstadoAccion } from "../Enum/estadoAccion";

/**
 * CLASE BORRAR - Implementación concreta del patrón Factory
 *
 * Esta clase representa una acción específica de eliminación de archivos.
 * Extiende la clase abstracta Accion y proporciona implementación
 * específica para la operación de borrado.
 *
 * Características:
 * - Operación irreversible que elimina archivos del sistema
 * - Maneja estados de la operación para tracking
 * - Validación simple pero efectiva
 */
export class Borrar extends Accion {
  /**
   * Constructor de la acción Borrar
   *
   * @param archivo - Archivo a eliminar del sistema
   */
  constructor(archivo: Archivo) {
    super(archivo);
  }

  /**
   * Valida que el archivo existe antes de intentar borrarlo
   * Implementación del método abstracto de la clase padre
   *
   * @returns {boolean} true si el archivo es válido para borrar
   */
  validarParametros(): boolean {
    // Validar que el archivo existe
    return !!this.archivo;
  }

  /**
   * Ejecuta la operación de borrado del archivo
   * Implementación del método abstracto de la clase padre
   *
   * Proceso:
   * 1. Cambia estado a ESPERA
   * 2. Valida que el archivo existe
   * 3. Cambia estado a PROCESO
   * 4. Ejecuta el borrado (simulado)
   * 5. Cambia estado a FINALIZADA o ERROR según el resultado
   *
   * @returns {boolean} true si el borrado fue exitoso, false en caso contrario
   */
  ejecutar(): boolean {
    try {
      // Pasar a ESPERA mientras validamos
      this.cambiarEstado(EstadoAccion.ESPERA);

      if (!this.validarParametros()) {
        console.error("Error en validación: archivo inválido");
        this.cambiarEstado(EstadoAccion.ERROR);
        return false;
      }

      // Validaciones pasaron, iniciar proceso
      this.cambiarEstado(EstadoAccion.PROCESO);
      console.log(`Borrando archivo: ${this.archivo.getNombre()}`);

      // Simular operación de borrado
      // Aquí iría la lógica real de borrado del sistema de archivos

      this.cambiarEstado(EstadoAccion.FINALIZADA);
      return true;
    } catch (error) {
      console.error(`Error durante el borrado: ${error}`);
      this.cambiarEstado(EstadoAccion.ERROR);
      return false;
    }
  }
}
