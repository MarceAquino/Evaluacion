import { SistemaOperativo } from "./../sistemaOperativo";
import { Archivo } from "../Archivos/archivo";
import { Accion } from "./accion";
import { TipoAccion } from "../Enum/tipoAccion";
import { Borrar } from "./borrar";
import { Copiar } from "./copiar";
import { Renombrar } from "./renombrar";

/**
 * PATRÓN FACTORY - FabricaDeAcciones
 *
 * Esta clase implementa el patrón Factory Method para crear diferentes tipos de acciones
 * sobre archivos de manera dinámica según el tipo solicitado.
 *
 * Características del Factory implementado:
 * - Encapsula la lógica de creación de objetos complejos
 * - Permite agregar nuevos tipos de acciones sin modificar código cliente
 * - Centraliza la creación de objetos relacionados (acciones)
 * - Proporciona una interfaz común para crear diferentes tipos de acciones
 *
 * Ventajas del patrón:
 * - Bajo acoplamiento: el cliente no conoce las clases concretas
 * - Fácil extensión: nuevas acciones se pueden agregar fácilmente
 * - Principio de responsabilidad única: cada acción maneja su propia lógica
 */
export class FabricaDeAcciones {
  /**
   * Método Factory que crea acciones específicas según el tipo solicitado
   *
   * Este es el corazón del patrón Factory: un método que decide qué clase
   * instanciar basándose en un parámetro de entrada.
   *
   * @param tipo - Tipo de acción a crear (definido en enum TipoAccion)
   * @param archivo - Archivo sobre el cual se ejecutará la acción
   * @param parametro - Parámetro adicional específico para cada acción
   * @param sistemaOperativo - Referencia al sistema operativo (necesario para algunas acciones)
   * @returns {Accion} Instancia de la acción concreta correspondiente
   * @throws {Error} Si el tipo de acción no está soportado
   */
  crearAccion(
    tipo: TipoAccion,
    archivo: Archivo,
    parametro: string,
    sistemaOperativo: SistemaOperativo
  ): Accion {
    // Switch que actúa como Factory Method
    // Cada case retorna una instancia de una clase concreta que implementa Accion
    switch (tipo) {
      case TipoAccion.COPIAR:
        // Crea una acción de copia que requiere destino y sistema operativo
        return new Copiar(archivo, parametro, sistemaOperativo);

      case TipoAccion.RENOMBRAR:
        // Crea una acción de renombrado que requiere el nuevo nombre
        return new Renombrar(archivo, parametro);

      case TipoAccion.BORRAR:
        // Crea una acción de borrado que solo requiere el archivo
        return new Borrar(archivo);

      default:
        // Manejo de tipos no soportados - principio de fail-fast
        throw new Error(`Tipo de acción no soportado: ${tipo}`);
    }
  }
}
