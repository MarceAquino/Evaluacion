/**
 * ENUM TIPOARCHIVO - Tipos de archivos soportados por el sistema
 *
 * Define los diferentes tipos de archivos que el sistema puede manejar.
 * Utilizado por el patrón Factory para determinar qué clase instanciar.
 *
 * Cada valor representa una categoría específica de archivo con
 * características y comportamientos particulares.
 */
export enum TipoArchivo {
  /** Archivos de video (mp4, avi, mkv, etc.) */
  VIDEO = "VIDEO",

  /** Archivos de imagen (jpg, png, gif, etc.) */
  IMAGEN = "IMAGEN",

  /** Archivos de documentos (pdf, doc, txt, etc.) */
  DOCUMENTO = "DOCUMENTO",

  /** Archivos de audio (mp3, wav, flac, etc.) */
  SONIDO = "SONIDO",
}
