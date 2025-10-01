import { SistemaOperativo } from './../sistemaOperativo';
import { Archivo } from "../Archivos/archivo";
import { Accion } from "./accion";
import { TipoAccion } from "../Enum/tipoAccion";
import { Borrar } from "./borrar";
import { Copiar } from "./copiar";
import { Renombrar } from "./renombrar";


export class FabricaDeAcciones {
  crearAccion(tipo: TipoAccion, archivo: Archivo, parametro: string, sistemaOperativo:SistemaOperativo): Accion {
    switch (tipo) {
      case TipoAccion.COPIAR:
        return new Copiar(archivo, parametro,sistemaOperativo);
      case TipoAccion.RENOMBRAR:
        return new Renombrar(archivo, parametro);
      case TipoAccion.BORRAR:
        return new Borrar(archivo);
      default:
        throw new Error(`Tipo de acción no soportado: ${tipo}`);
    }
  }
}
