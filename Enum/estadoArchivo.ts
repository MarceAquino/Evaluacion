/**
 * ENUM ESTADOARCHIVO - Estados posibles de un archivo
 *
 * Define los diferentes estados que puede tener un archivo en el sistema.
 * Permite controlar la visibilidad y accesibilidad de los archivos.
 */
export enum EstadoArchivo {
  /** Archivo visible y accesible normalmente */
  VISIBLE = "VISIBLE",

  /** Archivo oculto pero presente en el sistema */
  OCULTO = "OCULTO",
}
