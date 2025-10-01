import { Archivo } from "./archivo";
import { TipoArchivo } from "../Enum/tipoArchivo";

export class Video extends Archivo {
  private duracion: number;
  private resolucion: string;

  constructor(
    nombre: string,
    tamanio: number,
    formato: TipoArchivo,
    duracion: number,
    resolucion: string
  ) {
    super(nombre, tamanio, formato);
    this.duracion = duracion;
    this.resolucion = resolucion;
  }

  abrir(): boolean {
    console.log(`Abriendo video: ${this.nombre}`);
    return this.reproducir();
  }

  reproducir(): boolean {
    console.log(
      `Reproduciendo video de ${this.duracion} segundos en ${this.resolucion}`
    );
    return true;
  }

  getDuracion(): number {
    return this.duracion;
  }

  getResolucion(): string {
    return this.resolucion;
  }
}
