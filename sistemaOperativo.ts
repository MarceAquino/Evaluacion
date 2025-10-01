import { Archivo } from "./Archivos/archivo";

export class SistemaOperativo {
  private espacioDisponible: number;
  private espacioTotal: number;

  constructor(espacioTotal: number) {
    this.espacioTotal = espacioTotal;
    this.espacioDisponible = espacioTotal;
  }

  private verificarEspacio(tamanio: number): boolean {
    return this.espacioDisponible >= tamanio;
  }

  private mostrarAviso(mensaje: string): void {
    console.warn(`[Sistema Operativo] ${mensaje}`);
  }

  crearEstructuraArchivo(archivo: Archivo): boolean {
    if (!this.verificarEspacio(archivo.getTamanio())) {
      this.mostrarAviso(
        `No hay espacio suficiente para crear ${archivo.getNombre()}`
      );
      return false;
    }
    this.espacioDisponible -= archivo.getTamanio();
    console.log(
      `Archivo ${archivo.getNombre()} creado. Espacio disponible: ${
        this.espacioDisponible
      } bytes`
    );
    return true;
  }

  liberarEspacio(tamanio: number): void {
    this.espacioDisponible += tamanio;
    console.log(
      `Espacio liberado: ${tamanio} bytes. Disponible: ${this.espacioDisponible} bytes`
    );
  }

  obtenerEspacioDisponible(): number {
    return this.espacioDisponible;
  }

  getEspacioTotal(): number {
    return this.espacioTotal;
  }
}
