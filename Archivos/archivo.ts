import { TipoArchivo } from "../Enum/tipoArchivo";
import { EstadoArchivo } from "../Enum/estadoArchivo";

export abstract class Archivo {
  protected nombre: string;
  protected fechaCreacion: Date;
  protected tamanio: number;
  protected formato: TipoArchivo;
  protected estado: EstadoArchivo;

  constructor(nombre: string, tamanio: number, formato: TipoArchivo) {
    this.nombre = nombre;
    this.fechaCreacion = new Date();
    this.tamanio = tamanio;
    this.formato = formato;
    this.estado = EstadoArchivo.VISIBLE;
  }

  abstract abrir(): boolean;

  cambiarEstado(nuevoEstado: EstadoArchivo): void {
    this.estado = nuevoEstado;
  }

  obtenerInfo(): void {
    console.log(`Archivo: ${this.nombre}`);
    console.log(`Fecha creación: ${this.fechaCreacion.toISOString()}`);
    console.log(`Tamaño: ${this.tamanio} bytes`);
    console.log(`Formato: ${this.formato}`);
    console.log(`Estado: ${this.estado}`);
  }



  getNombre(): string {
    return this.nombre;
  }

  setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  getTamanio(): number {
    return this.tamanio;
  }

  getFechaCreacion(): Date {
    return this.fechaCreacion;
  }

  getFormato(): string {
    return this.formato;
  }
}
