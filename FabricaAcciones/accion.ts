import { Archivo } from "../Archivos/archivo";
import { EstadoAccion } from "../Enum/estadoAccion";

export abstract class Accion {
  protected estado: EstadoAccion;
  protected fechaInicio: Date;
  protected archivo: Archivo;

  constructor(archivo: Archivo) {
    this.archivo = archivo;
    this.estado = EstadoAccion.CREADA;
    this.fechaInicio = new Date();
  }

  abstract ejecutar(): boolean;
  
  
  abstract validarParametros(): boolean;

  cambiarEstado(nuevoEstado: EstadoAccion): void {
    this.estado = nuevoEstado;
    console.log(`Estado de acción cambiado a: ${nuevoEstado}`);
  }

  obtenerEstado(): EstadoAccion {
    return this.estado;
  }
}