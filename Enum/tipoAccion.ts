/**
 * ENUM TIPOACCION - Acciones disponibles sobre archivos
 *
 * Define los tipos de acciones que se pueden ejecutar sobre los archivos
 * en el sistema. Utilizado por el patrón Factory para crear acciones específicas.
 *
 * Cada valor representa una operación específica que puede realizarse
 * sobre un archivo del sistema.
 */
export enum TipoAccion {
  /** Eliminar archivo del sistema y moverlo al historial */
  BORRAR = "BORRAR",

  /** Crear una copia del archivo en otra ubicación */
  COPIAR = "COPIAR",

  /** Cambiar el nombre del archivo manteniendo su ubicación */
  RENOMBRAR = "RENOMBRAR",
}
