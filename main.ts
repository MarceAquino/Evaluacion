import { TipoArchivo } from "./Enum/tipoArchivo";
import { TipoAccion } from "./Enum/tipoAccion";
import { GestorDeArchivos } from "./gestorDeArchivos";

// Obtener instancia del gestor
const gestor = GestorDeArchivos.getInstancia();

// Crear archivos
console.log("\n=== CREANDO ARCHIVOS ===");
const img1 = gestor.crearArchivo(
  "foto1.jpg",
  TipoArchivo.IMAGEN,
  2048,
  "1920x1080"
);
const video1 = gestor.crearArchivo(
  "video1.mp4",
  TipoArchivo.VIDEO,
  10240,
  300,
  "1920x1080"
);
const SONIDO1 = gestor.crearArchivo(
  "cancion.mp3",
  TipoArchivo.SONIDO,
  5120,
  240
);
const doc1 = gestor.crearArchivo(
  "reporte.pdf",
  TipoArchivo.DOCUMENTO,
  1024,
  15
);

// Listar archivos
console.log("\n=== LISTANDO ARCHIVOS ===");
const archivos = gestor.listarArchivos();
archivos.forEach((a) =>
  console.log(`- ${a.getNombre()} (${a.getTamanio()} bytes)`)
);

// Ejecutar acciones
console.log("\n=== EJECUTANDO ACCIONES ===");
if (img1) {
  gestor.ejecutarAccion(TipoAccion.RENOMBRAR, img1, "foto_vacaciones.jpg");
  gestor.ejecutarAccion(TipoAccion.COPIAR, img1, "/backup/");
}

// Buscar archivos
console.log("\n=== BUSCANDO ARCHIVOS ===");
const resultados = gestor.buscarEnParalelo("foto");
console.log(
  `Encontrados ${resultados.length} archivos con 'foto' en el nombre`
);

// Eliminar archivo
console.log("\n=== ELIMINANDO ARCHIVO ===");
if (SONIDO1) {
  gestor.ejecutarAccion(TipoAccion.BORRAR, SONIDO1, "");
}


console.log("\n=== HISTORIAL ARCHIVOS MODIFICADOS ===");
const archivosMod = gestor.listarArchivos();
archivosMod.forEach((a) =>
  console.log(`- ${a.getNombre()} (${a.getTamanio()} bytes)`)
);

// Ver historial eliminados
console.log("\n=== HISTORIAL ELIMINADOS ===");
const eliminados = gestor.obtenerHistorialEliminados();
console.log(`Archivos eliminados: ${eliminados.length}`);

// Espacio disponible
console.log("\n=== ESPACIO EN DISCO ===");
console.log(`Espacio disponible: ${gestor.obtenerEspacioDisponible()} bytes`);
