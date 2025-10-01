import { Accion } from "./accion";
import { Archivo } from "../Archivos/archivo";
import { EstadoAccion } from "../Enum/estadoAccion";

export class Borrar extends Accion {
  constructor(archivo: Archivo) {
    super(archivo);
  }

  validarParametros(): boolean {
    // Validar que el archivo existe
    return !!this.archivo ;
  }

  ejecutar(): boolean {
    try {
      // Pasar a ESPERA mientras validamos
      this.cambiarEstado(EstadoAccion.ESPERA);
      
      if (!this.validarParametros()) {
        console.error("Error en validación: archivo inválido");
        this.cambiarEstado(EstadoAccion.ERROR);
        return false;
      }

      // Validaciones pasaron, iniciar proceso
      this.cambiarEstado(EstadoAccion.PROCESO);
      console.log(`Borrando archivo: ${this.archivo.getNombre()}`);
      
      // Simular operación de borrado
      // Aquí iría la lógica real de borrado
      
      this.cambiarEstado(EstadoAccion.FINALIZADA);
      return true;
    } catch (error) {
      console.error(`Error durante el borrado: ${error}`);
      this.cambiarEstado(EstadoAccion.ERROR);
      return false;
    }
  }
}