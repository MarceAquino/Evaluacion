import { Archivo } from "./archivo";
import { TipoArchivo } from "../Enum/tipoArchivo";

export class Documentacion extends Archivo {
  private numeroPaginas: number;

  constructor(
    nombre: string,
    tamanio: number,
    formato: TipoArchivo,
    numeroPaginas: number
  ) {
    super(nombre, tamanio, formato);
    this.numeroPaginas = numeroPaginas;
  }

  abrir(): boolean {
    console.log(
      `Abriendo documento: ${this.nombre} (${this.numeroPaginas} páginas)`
    );
    return true;
  }

  editar(): boolean {
    console.log(`Editando documento: ${this.nombre}`);
    return true;
  }

  getNumeroPaginas(): number {
    return this.numeroPaginas;
  }
}
