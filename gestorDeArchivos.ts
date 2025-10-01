import { Archivo } from "./Archivos/archivo";
import { FabricaDeAcciones } from "./FabricaAcciones/fabricaAcciones";
import { SistemaOperativo } from "./sistemaOperativo";
import { HistorialEliminados } from "./historialEliminados";
import { TipoArchivo } from "./Enum/tipoArchivo";
import { TipoAccion } from "./Enum/tipoAccion";
import { Video } from "./Archivos/video";
import { Documentacion } from "./Archivos/documento";
import { SONIDO } from "./Archivos/sonido";
import { Imagen } from "./Archivos/imagen";

export class GestorDeArchivos {
  private static instancia: GestorDeArchivos;
  private archivos: Archivo[];
  private fabricaAcciones: FabricaDeAcciones;
  private sistemaOperativo: SistemaOperativo;
  private historialEliminados: HistorialEliminados;

  private constructor() {
    this.archivos = [];
    this.fabricaAcciones = new FabricaDeAcciones();
    this.sistemaOperativo = new SistemaOperativo(100); 
    this.historialEliminados = new HistorialEliminados();
  }

  static getInstancia(): GestorDeArchivos {
    if (!GestorDeArchivos.instancia) {
      GestorDeArchivos.instancia = new GestorDeArchivos();
    }
    return GestorDeArchivos.instancia;
  }

  crearArchivo(
    nombre: string,
    formato: TipoArchivo,
    tamanio: number,
    ...params: any[]
  ): Archivo | null {
    let archivo: Archivo;

    switch (formato) {
      case TipoArchivo.IMAGEN:
        archivo = new Imagen(nombre, tamanio, TipoArchivo.IMAGEN, params[0] || "1920x1080");
        break;
      case TipoArchivo.VIDEO:
        archivo = new Video(
          nombre,
          tamanio,
          TipoArchivo.VIDEO,
          params[0] || 120,
          params[1] || "1920x1080"
        );
        break;
      case TipoArchivo.SONIDO:
        archivo = new SONIDO(nombre, tamanio, TipoArchivo.SONIDO, params[0] || 180);
        break;
      case TipoArchivo.DOCUMENTO:
        archivo = new Documentacion(nombre, tamanio, TipoArchivo.DOCUMENTO, params[0] || 10);
        break;
      default:
        console.error("Tipo de archivo no soportado");
        return null;
    }

    if (this.sistemaOperativo.crearEstructuraArchivo(archivo)) {
      this.archivos.push(archivo);
      console.log(`Archivo ${nombre} creado exitosamente`);
      return archivo;
    }

    return null;
  }

  
  ejecutarAccion(tipo: TipoAccion, archivo: Archivo, parametro?: string): boolean {
    try {
      const accion = this.fabricaAcciones.crearAccion(tipo, archivo, parametro || "",this.sistemaOperativo);
      const resultado = accion.ejecutar();

      if (resultado) {
        switch (tipo) {

          case TipoAccion.BORRAR:
            break;

          case TipoAccion.RENOMBRAR:
            break;

          case TipoAccion.COPIAR:
            break;
        }
      }

      return resultado;
    } catch (error) {
      console.error(`Error ejecutando acción: ${error}`);
      return false;
    }
  }

  buscarEnParalelo(nombre?: string, tipo?: TipoArchivo, fecha?: Date): Archivo[] {
    return this.archivos.filter((archivo) => {
      let cumple = true;
      if (nombre) cumple = cumple && archivo.getNombre().includes(nombre);
      if (tipo) cumple = cumple && archivo.getFormato().toLowerCase().includes(tipo.toLowerCase());
      if (fecha) {
        const fechaArchivo = archivo.getFechaCreacion().toDateString();
        const fechaBusqueda = fecha.toDateString();
        cumple = cumple && fechaArchivo === fechaBusqueda;
      }
      return cumple;
    });
  }

  listarArchivos(): Archivo[] {
    return [...this.archivos];
  }

  obtenerHistorialEliminados(): Archivo[] {
    return this.historialEliminados.obtenerHistorialCompleto();
  }

  obtenerEspacioDisponible(): number {
    return this.sistemaOperativo.obtenerEspacioDisponible();
  }
}
