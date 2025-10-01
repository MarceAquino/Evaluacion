import { Archivo } from "./archivo";
import { TipoArchivo } from "../Enum/tipoArchivo";

export class SONIDO extends Archivo {
  private duracion: number;

  constructor(
    nombre: string,
    tamanio: number,
    formato: TipoArchivo,
    duracion: number
  ) {
    super(nombre, tamanio, formato);
    this.duracion = duracion;
  }

  abrir(): boolean {
    console.log(`Abriendo SONIDO: ${this.nombre}`);
    return this.reproducir();
  }

  reproducir(): boolean {
    console.log(`Reproduciendo SONIDO de ${this.duracion} segundos`);
    return true;
  }

  getDuracion(): number {
    return this.duracion;
  }
}
