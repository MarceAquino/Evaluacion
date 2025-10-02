/**
 * ENUM ESTADOACCION - Estados del ciclo de vida de una acción
 *
 * Define los diferentes estados por los que puede pasar una acción
 * durante su ejecución en el sistema.
 *
 * Facilita el tracking y debugging de operaciones sobre archivos.
 */
export enum EstadoAccion {
  /** Acción en cola esperando ser ejecutada */
  ESPERA = "ESPERA",

  /** Acción creada pero no iniciada */
  CREADA = "CREADA",

  /** Acción en proceso de ejecución */
  PROCESO = "PROCESO",

  /** Acción completada exitosamente */
  FINALIZADA = "FINALIZADA",

  /** Acción terminada con error */
  ERROR = "ERROR",
}
