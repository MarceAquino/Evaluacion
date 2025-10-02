import { Accion } from "../FabricaAcciones/accion";
import { Archivo } from "../Archivos/archivo";
import { EstadoAccion } from "../Enum/estadoAccion";
import { SistemaOperativo } from "../sistemaOperativo";

/**
 * CLASE COPIAR - Implementación concreta del patrón Factory
 *
 * Esta clase representa una acción específica de copia de archivos.
 * Extiende la clase abstracta Accion y proporciona implementación
 * específica para la operación de copiado.
 *
 * Características:
 * - Valida espacio disponible antes de copiar
 * - Maneja estados de la operación
 * - Integra con el sistema operativo para gestión de espacio
 */
export class Copiar extends Accion {
  private destino: string;
  private sistemaOperativo: SistemaOperativo;

  /**
   * Constructor de la acción Copiar
   *
   * @param archivo - Archivo a copiar
   * @param destino - Ruta de destino donde copiar el archivo
   * @param sistemaOperativo - Sistema operativo para gestión de espacio
   */
  constructor(
    archivo: Archivo,
    destino: string,
    sistemaOperativo: SistemaOperativo
  ) {
    super(archivo);
    this.destino = destino;
    this.sistemaOperativo = sistemaOperativo;
  }

  /**
   * Valida los parámetros necesarios para ejecutar la copia
   * Implementación del método abstracto de la clase padre
   *
   * Verifica:
   * - Existencia del archivo
   * - Validez del nombre del archivo
   * - Validez del destino
   * - Espacio disponible suficiente
   * - Permisos de lectura y escritura
   *
   * @returns {boolean} true si todos los parámetros son válidos
   */
  validarParametros(): boolean {
    // Validar archivo
    if (!this.archivo) {
      console.error("Error: Archivo no existe");
      return false;
    }

    // Validar nombre
    const nombre = this.archivo.getNombre();
    if (!nombre || nombre.trim().length === 0) {
      console.error("Error: Nombre de archivo inválido");
      return false;
    }

    // Validar destino
    if (!this.destino || this.destino.trim().length === 0) {
      console.error("Error: Destino inválido");
      return false;
    }

    // Validar espacio - Característica importante para gestión de recursos
    const tamanioArchivo = this.archivo.getTamanio();
    const espacioDisponible = this.sistemaOperativo.obtenerEspacioDisponible();
    if (espacioDisponible < tamanioArchivo) {
      console.error(
        `Error: Espacio insuficiente. Necesario: ${tamanioArchivo} bytes, Disponible: ${espacioDisponible} bytes`
      );
      return false;
    }

    // Validar permisos
    console.log("Verificando permisos de lectura y escritura...");
    // Aquí podrías poner lógica real de permisos
    const permisosOk = true;
    if (!permisosOk) {
      console.error("Error: Permisos insuficientes para realizar la operación");
      return false;
    }

    return true;
  }

  /**
   * Ejecuta la operación de copia del archivo
   * Implementación del método abstracto de la clase padre
   *
   * Proceso:
   * 1. Cambia estado a ESPERA
   * 2. Valida parámetros
   * 3. Cambia estado a PROCESO
   * 4. Ejecuta la copia utilizando el sistema operativo
   * 5. Cambia estado a FINALIZADA o ERROR según el resultado
   *
   * @returns {boolean} true si la copia fue exitosa, false en caso contrario
   */
  ejecutar(): boolean {
    try {
      // Inicio del proceso de copia
      this.cambiarEstado(EstadoAccion.ESPERA);

      // Validación de parámetros básicos
      if (!this.validarParametros()) {
        this.cambiarEstado(EstadoAccion.ERROR);
        return false;
      }

      // Cambio a estado de procesamiento
      this.cambiarEstado(EstadoAccion.PROCESO);

      console.log(
        `Copiando archivo ${this.archivo.getNombre()} (${this.archivo.getTamanio()} bytes) a ${
          this.destino
        }`
      );

      // Crear la estructura del archivo en el sistema utilizando el SO
      if (!this.sistemaOperativo.crearEstructuraArchivo(this.archivo)) {
        console.error("Error: No se pudo crear la estructura del archivo");
        this.cambiarEstado(EstadoAccion.ERROR);
        return false;
      }

      // Aquí iría la lógica real de copia de datos
      // Simulamos una copia exitosa
      console.log(`✓ Archivo copiado exitosamente a ${this.destino}`);

      // Operación completada exitosamente
      this.cambiarEstado(EstadoAccion.FINALIZADA);
      return true;
    } catch (error) {
      console.error(`Error durante la copia: ${error}`);
      this.cambiarEstado(EstadoAccion.ERROR);
      return false;
    }
  }

  /**
   * Obtiene el destino de la copia
   *
   * @returns {string} Ruta de destino
   */
  getDestino(): string {
    return this.destino;
  }
}
