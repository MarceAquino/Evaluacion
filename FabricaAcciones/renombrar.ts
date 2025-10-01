import { Accion } from "../FabricaAcciones/accion";
import { Archivo } from "../Archivos/archivo";
import { EstadoAccion } from "../Enum/estadoAccion";

export class Renombrar extends Accion {
  private nuevoNombre: string;

  constructor(archivo: Archivo, nuevoNombre: string) {
    super(archivo);
    this.nuevoNombre = nuevoNombre;
  }

  validarParametros(): boolean {
    if (!this.archivo) return false;

    const nombreActual = this.archivo.getNombre();
    if (!this.nuevoNombre || this.nuevoNombre.trim().length === 0) return false;

    if (this.nuevoNombre === nombreActual) return false;

    return true;
  }

  ejecutar(): boolean {
    try {
      this.cambiarEstado(EstadoAccion.ESPERA);

      if (!this.validarParametros()) {
        console.error("Error en validación: nuevo nombre inválido");
        this.cambiarEstado(EstadoAccion.ERROR);
        return false;
      }

      this.cambiarEstado(EstadoAccion.PROCESO);
      const nombreAnterior = this.archivo.getNombre();

      // Realizar el cambio de nombre
      this.archivo.setNombre(this.nuevoNombre);

      console.log(
        `Archivo renombrado de ${nombreAnterior} a ${this.nuevoNombre}`
      );

      this.cambiarEstado(EstadoAccion.FINALIZADA);
      return true;
    } catch (error) {
      console.error(`Error durante el renombrado: ${error}`);
      this.cambiarEstado(EstadoAccion.ERROR);
      return false;
    }
  }

  getNuevoNombre(): string {
    return this.nuevoNombre;
  }
}
