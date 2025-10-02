import { Archivo } from "./archivo";
import { TipoArchivo } from "../Enum/tipoArchivo";

/**
 * CLASE IMAGEN - Implementación específica para archivos de imagen
 *
 * Esta clase extiende la clase abstracta Archivo y proporciona
 * funcionalidad específica para manejar archivos de imagen.
 *
 * Características específicas:
 * - Almacena resolución de la imagen
 * - Implementa método de apertura específico para imágenes
 * - Proporciona funcionalidad de visualización
 */
export class Imagen extends Archivo {
  private resolucion: string;

  /**
   * Constructor para archivos de imagen
   *
   * @param nombre - Nombre del archivo de imagen
   * @param tamanio - Tamaño del archivo en bytes
   * @param formato - Tipo de archivo (debe ser TipoArchivo.IMAGEN)
   * @param resolucion - Resolución de la imagen (ej: "1920x1080")
   */
  constructor(
    nombre: string,
    tamanio: number,
    formato: TipoArchivo,
    resolucion: string
  ) {
    super(nombre, tamanio, formato);
    this.resolucion = resolucion;
  }

  /**
   * Implementación específica del método abstracto abrir()
   * Define cómo se abre un archivo de imagen
   *
   * @returns {boolean} true si la imagen se abrió correctamente
   */
  abrir(): boolean {
    console.log(`Abriendo imagen: ${this.nombre}`);
    this.mostrarImagen();
    return true;
  }

  /**
   * Método específico para mostrar información de la imagen
   * Simula la visualización de la imagen con su resolución
   */
  mostrarImagen(): void {
    console.log(`Mostrando imagen con resolución: ${this.resolucion}`);
  }

  /**
   * Obtiene la resolución de la imagen
   *
   * @returns {string} Resolución de la imagen
   */
  getResolucion(): string {
    return this.resolucion;
  }
}
