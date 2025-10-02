import { Archivo } from "./archivo";
import { TipoArchivo } from "../Enum/tipoArchivo";

/**
 * CLASE SONIDO - Implementación específica para archivos de audio
 *
 * Extiende la clase abstracta Archivo con funcionalidades específicas
 * para manejar archivos de audio con duración.
 */
export class SONIDO extends Archivo {
  private duracion: number; // Duración en segundos

  /**
   * Constructor para archivos de sonido
   *
   * @param nombre - Nombre del archivo de audio
   * @param tamanio - Tamaño del archivo en bytes
   * @param formato - Tipo de archivo (debe ser TipoArchivo.SONIDO)
   * @param duracion - Duración del audio en segundos
   */
  constructor(
    nombre: string,
    tamanio: number,
    formato: TipoArchivo,
    duracion: number
  ) {
    super(nombre, tamanio, formato);
    this.duracion = duracion;
  }

  /**
   * Implementación específica del método abstracto abrir()
   * Define cómo se abre un archivo de audio
   *
   * @returns {boolean} true si el audio se abrió y reprodujo correctamente
   */
  abrir(): boolean {
    console.log(`Abriendo SONIDO: ${this.nombre}`);
    return this.reproducir();
  }

  /**
   * Método específico para reproducir el audio
   * Simula la reproducción mostrando la duración
   *
   * @returns {boolean} true si la reproducción fue exitosa
   */
  reproducir(): boolean {
    console.log(`Reproduciendo SONIDO de ${this.duracion} segundos`);
    return true;
  }

  /**
   * Obtiene la duración del audio
   *
   * @returns {number} Duración en segundos
   */
  getDuracion(): number {
    return this.duracion;
  }
}
