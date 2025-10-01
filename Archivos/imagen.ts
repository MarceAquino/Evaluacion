import { Archivo } from "./archivo";
import { TipoArchivo } from "../Enum/tipoArchivo";

export class Imagen extends Archivo {
  private resolucion: string;

  constructor(
    nombre: string,
    tamanio: number,
    formato: TipoArchivo,
    resolucion: string
  ) {
    super(nombre, tamanio, formato);
    this.resolucion = resolucion;
  }

  abrir(): boolean {
    console.log(`Abriendo imagen: ${this.nombre}`);
    this.mostrarImagen();
    return true;
  }

  mostrarImagen(): void {
    console.log(`Mostrando imagen con resolución: ${this.resolucion}`);
  }

  getResolucion(): string {
    return this.resolucion;
  }
}
