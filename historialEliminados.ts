import { Archivo } from "./Archivos/archivo";

export class HistorialEliminados {
  private archivosEliminados: Map<Archivo, Date>;

  constructor() {
    this.archivosEliminados = new Map();
  }

  agregarAlHistorial(archivo: Archivo, fechaEliminacion: Date): void {
    this.archivosEliminados.set(archivo, fechaEliminacion);
    console.log(
      `Archivo ${archivo.getNombre()} agregado al historial de eliminados`
    );
  }

  obtenerHistorialCompleto(): Archivo[] {
    return Array.from(this.archivosEliminados.keys());
  }

  obtenerHistorialPorFecha(fecha: Date): Archivo[] {
    const resultado: Archivo[] = [];
    this.archivosEliminados.forEach((fechaEliminacion, archivo) => {
      if (fechaEliminacion.toDateString() === fecha.toDateString()) {
        resultado.push(archivo);
      }
    });
    return resultado;
  }
}
