/**
 * MAIN.TS - DEMOSTRACIÓN DE PATRONES SINGLETON Y FACTORY
 *
 * Este archivo demuestra el uso práctico de los patrones de diseño implementados:
 *
 * 1. PATRÓN SINGLETON:
 *    - Se obtiene la única instancia del GestorDeArchivos
 *    - No importa cuántas veces se llame getInstancia(), siempre será la misma instancia
 *
 * 2. PATRÓN FACTORY:
 *    - El gestor utiliza factories para crear archivos y acciones
 *    - No necesitamos conocer las clases concretas, solo los tipos
 *
 * FLUJO DE LA APLICACIÓN:
 * 1. Obtener instancia única del gestor (Singleton)
 * 2. Crear diferentes tipos de archivos (Factory de archivos)
 * 3. Ejecutar acciones sobre archivos (Factory de acciones)
 * 4. Demostrar funcionalidades del sistema
 */

import { TipoArchivo } from "./Enum/tipoArchivo";
import { TipoAccion } from "./Enum/tipoAccion";
import { GestorDeArchivos } from "./gestorDeArchivos";

// === DEMOSTRACIÓN DEL PATRÓN SINGLETON ===
// Obtener la única instancia del gestor de archivos
// Esta llamada puede hacerse desde cualquier parte del código y siempre retornará la misma instancia
const gestor = GestorDeArchivos.getInstancia();

// === DEMOSTRACIÓN DEL PATRÓN FACTORY PARA ARCHIVOS ===
console.log("\n=== CREANDO ARCHIVOS ===");

// El método crearArchivo actúa como Factory Method
// Según el TipoArchivo, internamente crea la instancia apropiada (Imagen, Video, etc.)
const img1 = gestor.crearArchivo(
  "foto1.jpg", // Nombre del archivo
  TipoArchivo.IMAGEN, // Tipo que determina qué clase instanciar
  2048, // Tamaño en bytes
  "1920x1080" // Parámetro específico: resolución para imágenes
);

const video1 = gestor.crearArchivo(
  "video1.mp4",
  TipoArchivo.VIDEO,
  10240, // 10KB
  300, // Duración en segundos
  "1920x1080" // Resolución del video
);

const SONIDO1 = gestor.crearArchivo(
  "cancion.mp3",
  TipoArchivo.SONIDO,
  5120, // 5KB
  240 // Duración en segundos
);

const doc1 = gestor.crearArchivo(
  "reporte.pdf",
  TipoArchivo.DOCUMENTO,
  1024, // 1KB
  15 // Número de páginas
);

// === LISTADO DE ARCHIVOS CREADOS ===
console.log("\n=== LISTANDO ARCHIVOS ===");
const archivos = gestor.listarArchivos();
archivos.forEach((a) =>
  console.log(`- ${a.getNombre()} (${a.getTamanio()} bytes)`)
);

// === DEMOSTRACIÓN DEL PATRÓN FACTORY PARA ACCIONES ===
console.log("\n=== EJECUTANDO ACCIONES ===");

if (img1) {
  // La fábrica de acciones crea la acción apropiada según el TipoAccion
  gestor.ejecutarAccion(
    TipoAccion.RENOMBRAR, // Tipo de acción determina qué clase crear
    img1, // Archivo objetivo
    "foto_vacaciones.jpg" // Parámetro específico: nuevo nombre
  );

  gestor.ejecutarAccion(
    TipoAccion.COPIAR, // Otra acción diferente
    img1,
    "/backup/" // Parámetro específico: destino de copia
  );
}

// === FUNCIONALIDAD DE BÚSQUEDA ===
console.log("\n=== BUSCANDO ARCHIVOS ===");
const resultados = gestor.buscarEnParalelo("foto");
console.log(
  `Encontrados ${resultados.length} archivos con 'foto' en el nombre`
);

// === DEMOSTRACIÓN DE ELIMINACIÓN Y HISTORIAL ===
console.log("\n=== ELIMINANDO ARCHIVO ===");
if (SONIDO1) {
  // Factory de acciones crea una acción de tipo BORRAR
  gestor.ejecutarAccion(TipoAccion.BORRAR, SONIDO1, "");
}

console.log("\n=== HISTORIAL ARCHIVOS MODIFICADOS ===");
const archivosMod = gestor.listarArchivos();
archivosMod.forEach((a) =>
  console.log(`- ${a.getNombre()} (${a.getTamanio()} bytes)`)
);

// === HISTORIAL DE ARCHIVOS ELIMINADOS ===
console.log("\n=== HISTORIAL ELIMINADOS ===");
const eliminados = gestor.obtenerHistorialEliminados();
console.log(`Archivos eliminados: ${eliminados.length}`);

// === INFORMACIÓN DEL SISTEMA ===
console.log("\n=== ESPACIO EN DISCO ===");
console.log(`Espacio disponible: ${gestor.obtenerEspacioDisponible()} bytes`);
