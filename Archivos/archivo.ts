import { TipoArchivo } from "../Enum/tipoArchivo";
import { EstadoArchivo } from "../Enum/estadoArchivo";

/**
 * CLASE ABSTRACTA ARCHIVO - Base para jerarquía de archivos
 *
 * Esta clase abstracta define la estructura común para todos los tipos de archivos
 * en el sistema. Implementa atributos y comportamientos compartidos.
 *
 * Características del diseño:
 * - Clase abstracta que no puede ser instanciada directamente
 * - Define propiedades comunes a todos los archivos
 * - Utiliza método abstracto para forzar implementación específica
 * - Encapsula datos mediante getters y setters
 */
export abstract class Archivo {
  // Propiedades protegidas - accesibles por subclases
  protected nombre: string;
  protected fechaCreacion: Date;
  protected tamanio: number;
  protected formato: TipoArchivo;
  protected estado: EstadoArchivo;

  /**
   * Constructor base para todos los tipos de archivo
   * Inicializa las propiedades comunes
   *
   * @param nombre - Nombre del archivo incluyendo extensión
   * @param tamanio - Tamaño del archivo en bytes
   * @param formato - Tipo de archivo (enum TipoArchivo)
   */
  constructor(nombre: string, tamanio: number, formato: TipoArchivo) {
    this.nombre = nombre;
    this.fechaCreacion = new Date();
    this.tamanio = tamanio;
    this.formato = formato;
    this.estado = EstadoArchivo.VISIBLE; // Estado inicial por defecto
  }

  /**
   * Método abstracto que debe ser implementado por cada tipo de archivo
   * Define el comportamiento específico para abrir cada tipo de archivo
   *
   * @returns {boolean} true si el archivo se abrió correctamente, false en caso contrario
   */
  abstract abrir(): boolean;

  /**
   * Cambia el estado del archivo (visible, oculto, etc.)
   *
   * @param nuevoEstado - Nuevo estado del archivo
   */
  cambiarEstado(nuevoEstado: EstadoArchivo): void {
    this.estado = nuevoEstado;
  }

  /**
   * Muestra información completa del archivo en consola
   * Útil para debugging y monitoreo del sistema
   */
  obtenerInfo(): void {
    console.log(`Archivo: ${this.nombre}`);
    console.log(`Fecha creación: ${this.fechaCreacion.toISOString()}`);
    console.log(`Tamaño: ${this.tamanio} bytes`);
    console.log(`Formato: ${this.formato}`);
    console.log(`Estado: ${this.estado}`);
  }

  // === MÉTODOS GETTER Y SETTER ===
  // Proporcionan acceso controlado a las propiedades privadas

  /**
   * Obtiene el nombre del archivo
   * @returns {string} Nombre del archivo
   */
  getNombre(): string {
    return this.nombre;
  }

  /**
   * Establece un nuevo nombre para el archivo
   * @param nombre - Nuevo nombre del archivo
   */
  setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  /**
   * Obtiene el tamaño del archivo
   * @returns {number} Tamaño en bytes
   */
  getTamanio(): number {
    return this.tamanio;
  }

  /**
   * Obtiene la fecha de creación del archivo
   * @returns {Date} Fecha de creación
   */
  getFechaCreacion(): Date {
    return this.fechaCreacion;
  }

  /**
   * Obtiene el formato/tipo del archivo
   * @returns {string} Formato del archivo
   */
  getFormato(): string {
    return this.formato;
  }
}
