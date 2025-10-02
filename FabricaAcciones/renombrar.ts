import { Accion } from "../FabricaAcciones/accion";
import { Archivo } from "../Archivos/archivo";
import { EstadoAccion } from "../Enum/estadoAccion";

/**
 * CLASE RENOMBRAR - Implementación concreta del patrón Factory
 *
 * Esta clase representa una acción específica de renombrado de archivos.
 * Extiende la clase abstracta Accion y proporciona implementación
 * específica para la operación de cambio de nombre.
 *
 * Características:
 * - Valida que el nuevo nombre sea diferente al actual
 * - Actualiza directamente el nombre del archivo
 * - Maneja estados de la operación para control
 */
export class Renombrar extends Accion {
  private nuevoNombre: string;

  /**
   * Constructor de la acción Renombrar
   *
   * @param archivo - Archivo a renombrar
   * @param nuevoNombre - Nuevo nombre para el archivo
   */
  constructor(archivo: Archivo, nuevoNombre: string) {
    super(archivo);
    this.nuevoNombre = nuevoNombre;
  }

  /**
   * Valida los parámetros para el renombrado
   * Implementación del método abstracto de la clase padre
   *
   * Verifica:
   * - Que el archivo existe
   * - Que el nuevo nombre no esté vacío
   * - Que el nuevo nombre sea diferente al actual
   *
   * @returns {boolean} true si los parámetros son válidos
   */
  validarParametros(): boolean {
    if (!this.archivo) return false;

    const nombreActual = this.archivo.getNombre();
    if (!this.nuevoNombre || this.nuevoNombre.trim().length === 0) return false;

    // El nuevo nombre debe ser diferente al actual
    if (this.nuevoNombre === nombreActual) return false;

    return true;
  }

  /**
   * Ejecuta la operación de renombrado del archivo
   * Implementación del método abstracto de la clase padre
   *
   * Proceso:
   * 1. Cambia estado a ESPERA
   * 2. Valida parámetros
   * 3. Cambia estado a PROCESO
   * 4. Realiza el cambio de nombre usando el setter del archivo
   * 5. Cambia estado a FINALIZADA o ERROR según el resultado
   *
   * @returns {boolean} true si el renombrado fue exitoso, false en caso contrario
   */
  ejecutar(): boolean {
    try {
      this.cambiarEstado(EstadoAccion.ESPERA);

      if (!this.validarParametros()) {
        console.error("Error en validación: nuevo nombre inválido");
        this.cambiarEstado(EstadoAccion.ERROR);
        return false;
      }

      this.cambiarEstado(EstadoAccion.PROCESO);
      const nombreAnterior = this.archivo.getNombre();

      // Realizar el cambio de nombre utilizando el método del archivo
      this.archivo.setNombre(this.nuevoNombre);

      console.log(
        `Archivo renombrado de ${nombreAnterior} a ${this.nuevoNombre}`
      );

      this.cambiarEstado(EstadoAccion.FINALIZADA);
      return true;
    } catch (error) {
      console.error(`Error durante el renombrado: ${error}`);
      this.cambiarEstado(EstadoAccion.ERROR);
      return false;
    }
  }

  /**
   * Obtiene el nuevo nombre que se asignará al archivo
   *
   * @returns {string} Nuevo nombre del archivo
   */
  getNuevoNombre(): string {
    return this.nuevoNombre;
  }
}
