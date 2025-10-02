import { Archivo } from "../Archivos/archivo";
import { EstadoAccion } from "../Enum/estadoAccion";

/**
 * PATRÓN FACTORY - Clase base abstracta Accion
 *
 * Esta clase abstracta define la interfaz común para todas las acciones
 * que pueden ejecutarse sobre archivos. Es parte del patrón Factory Method.
 *
 * Características importantes:
 * - Define la estructura común de todas las acciones
 * - Utiliza métodos abstractos para forzar implementación en subclases
 * - Maneja el estado y metadatos comunes de las acciones
 * - Proporciona plantilla base para el comportamiento de acciones
 */
export abstract class Accion {
  protected estado: EstadoAccion;
  protected fechaInicio: Date;
  protected archivo: Archivo;

  /**
   * Constructor base para todas las acciones
   * Inicializa los atributos comunes a todas las acciones
   *
   * @param archivo - Archivo sobre el cual se ejecutará la acción
   */
  constructor(archivo: Archivo) {
    this.archivo = archivo;
    this.estado = EstadoAccion.CREADA;
    this.fechaInicio = new Date();
  }

  /**
   * Método abstracto que debe ser implementado por cada acción concreta
   * Define el comportamiento específico de cada tipo de acción
   *
   * @returns {boolean} true si la acción se ejecutó correctamente, false en caso contrario
   */
  abstract ejecutar(): boolean;

  /**
   * Método abstracto para validar parámetros específicos de cada acción
   * Cada subclase define sus propios criterios de validación
   *
   * @returns {boolean} true si los parámetros son válidos, false en caso contrario
   */
  abstract validarParametros(): boolean;

  /**
   * Cambia el estado de la acción y registra el cambio
   *
   * @param nuevoEstado - Nuevo estado de la acción
   */
  cambiarEstado(nuevoEstado: EstadoAccion): void {
    this.estado = nuevoEstado;
    console.log(`Estado de acción cambiado a: ${nuevoEstado}`);
  }

  /**
   * Obtiene el estado actual de la acción
   *
   * @returns {EstadoAccion} Estado actual de la acción
   */
  obtenerEstado(): EstadoAccion {
    return this.estado;
  }
}
