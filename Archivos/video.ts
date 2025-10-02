import { Archivo } from "./archivo";
import { TipoArchivo } from "../Enum/tipoArchivo";

/**
 * CLASE VIDEO - Implementación específica para archivos de video
 *
 * Extiende la clase abstracta Archivo con funcionalidades específicas
 * para manejar archivos de video con duración y resolución.
 */
export class Video extends Archivo {
  private duracion: number; // Duración en segundos
  private resolucion: string; // Resolución del video

  /**
   * Constructor para archivos de video
   *
   * @param nombre - Nombre del archivo de video
   * @param tamanio - Tamaño del archivo en bytes
   * @param formato - Tipo de archivo (debe ser TipoArchivo.VIDEO)
   * @param duracion - Duración del video en segundos
   * @param resolucion - Resolución del video (ej: "1920x1080")
   */
  constructor(
    nombre: string,
    tamanio: number,
    formato: TipoArchivo,
    duracion: number,
    resolucion: string
  ) {
    super(nombre, tamanio, formato);
    this.duracion = duracion;
    this.resolucion = resolucion;
  }

  /**
   * Implementación específica del método abstracto abrir()
   * Define cómo se abre un archivo de video
   *
   * @returns {boolean} true si el video se abrió y reprodujo correctamente
   */
  abrir(): boolean {
    console.log(`Abriendo video: ${this.nombre}`);
    return this.reproducir();
  }

  /**
   * Método específico para reproducir el video
   * Simula la reproducción mostrando duración y resolución
   * 
   * @returns {boolean} true si la reproducción fue exitosa
  /**
   * Método específico para reproducir el video
   * Simula la reproducción mostrando duración y resolución
   * 
   * @returns {boolean} true si la reproducción fue exitosa
   */
  reproducir(): boolean {
    console.log(
      `Reproduciendo video de ${this.duracion} segundos en ${this.resolucion}`
    );
    return true;
  }

  /**
   * Obtiene la duración del video
   *
   * @returns {number} Duración en segundos
   */
  getDuracion(): number {
    return this.duracion;
  }

  /**
   * Obtiene la resolución del video
   *
   * @returns {string} Resolución del video
   */
  getResolucion(): string {
    return this.resolucion;
  }
}
