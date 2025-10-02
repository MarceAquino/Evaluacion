import { Archivo } from "./archivo";
import { TipoArchivo } from "../Enum/tipoArchivo";

/**
 * CLASE DOCUMENTACION - Implementación específica para archivos de documento
 *
 * Extiende la clase abstracta Archivo con funcionalidades específicas
 * para manejar documentos con número de páginas y capacidad de edición.
 */
export class Documentacion extends Archivo {
  private numeroPaginas: number; // Número de páginas del documento

  /**
   * Constructor para archivos de documento
   *
   * @param nombre - Nombre del archivo de documento
   * @param tamanio - Tamaño del archivo en bytes
   * @param formato - Tipo de archivo (debe ser TipoArchivo.DOCUMENTO)
   * @param numeroPaginas - Número de páginas del documento
   */
  constructor(
    nombre: string,
    tamanio: number,
    formato: TipoArchivo,
    numeroPaginas: number
  ) {
    super(nombre, tamanio, formato);
    this.numeroPaginas = numeroPaginas;
  }

  /**
   * Implementación específica del método abstracto abrir()
   * Define cómo se abre un archivo de documento
   *
   * @returns {boolean} true si el documento se abrió correctamente
   */
  abrir(): boolean {
    console.log(
      `Abriendo documento: ${this.nombre} (${this.numeroPaginas} páginas)`
    );
    return true;
  }

  /**
   * Método específico para editar el documento
   * Simula la funcionalidad de edición
   *
   * @returns {boolean} true si la edición fue exitosa
   */
  editar(): boolean {
    console.log(`Editando documento: ${this.nombre}`);
    return true;
  }

  /**
   * Obtiene el número de páginas del documento
   *
   * @returns {number} Número de páginas
   */
  getNumeroPaginas(): number {
    return this.numeroPaginas;
  }
}
