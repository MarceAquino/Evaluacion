import { Accion } from "../FabricaAcciones/accion";
import { Archivo } from "../Archivos/archivo";
import { EstadoAccion } from "../Enum/estadoAccion";
import { SistemaOperativo } from "../sistemaOperativo";

export class Copiar extends Accion {
  private destino: string;
  private sistemaOperativo: SistemaOperativo;

  constructor(archivo: Archivo, destino: string, sistemaOperativo: SistemaOperativo) {
    super(archivo);
    this.destino = destino;
    this.sistemaOperativo = sistemaOperativo;
  }

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

  // Validar espacio
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


  ejecutar(): boolean {
    try {
      this.cambiarEstado(EstadoAccion.ESPERA);

      // Validación de parámetros básicos
      if (!this.validarParametros()) {
        this.cambiarEstado(EstadoAccion.ERROR);
        return false;
      }

      this.cambiarEstado(EstadoAccion.PROCESO);
      
      console.log(
        `Copiando archivo ${this.archivo.getNombre()} (${this.archivo.getTamanio()} bytes) a ${this.destino}`
      );

      // Crear la estructura del archivo en el sistema
      if (!this.sistemaOperativo.crearEstructuraArchivo(this.archivo)) {
        console.error("Error: No se pudo crear la estructura del archivo");
        this.cambiarEstado(EstadoAccion.ERROR);
        return false;
      }

      // Aquí iría la lógica real de copia de datos
      // Simulamos una copia exitosa
      console.log(`✓ Archivo copiado exitosamente a ${this.destino}`);

      this.cambiarEstado(EstadoAccion.FINALIZADA);
      return true;

    } catch (error) {
      console.error(`Error durante la copia: ${error}`);
      this.cambiarEstado(EstadoAccion.ERROR);
      return false;
    }
  }

  getDestino(): string {
    return this.destino;
  }
}