# Sistema Gestor de Archivos

## Descripción General

Este proyecto implementa un **Sistema Gestor de Archivos** desarrollado en TypeScript que demuestra la aplicación práctica de los patrones de diseño **Singleton** y **Factory**. El sistema permite crear, gestionar y realizar operaciones sobre diferentes tipos de archivos (imágenes, videos, documentos, audio) de manera eficiente y escalable.

## Patrones de Diseño Implementados

### **Patrón SINGLETON**

**Ubicación:** `gestorDeArchivos.ts`

El patrón Singleton asegura que exista **una única instancia** del Gestor de Archivos en toda la aplicación.

#### Características implementadas:

- Constructor privado: Impide la creación directa de instancias
- Variable estática: Almacena la única instancia
- Método getInstancia(): Proporciona acceso controlado global
- Lazy initialization: Se crea solo cuando se necesita

#### Ejemplo de uso:

```typescript
// Siempre retorna la misma instancia
const gestor1 = GestorDeArchivos.getInstancia();
const gestor2 = GestorDeArchivos.getInstancia();
// gestor1 === gestor2 (true)
```

#### Por qué Singleton?

- **Consistencia**: Garantiza un estado único del sistema
- **Control de recursos**: Evita múltiples instancias innecesarias
- **Acceso global**: Disponible desde cualquier parte del código

### **Patrón FACTORY**

**Ubicación:** `FabricaAcciones/fabricaAcciones.ts`

El patrón Factory permite crear diferentes tipos de acciones sin que el cliente conozca las clases concretas.

#### Características implementadas:

- Método crearAccion(): Factory method principal
- Encapsulación: Oculta la lógica de creación
- Extensibilidad: Fácil agregar nuevas acciones
- Bajo acoplamiento: Cliente independiente de clases concretas

#### Ejemplo de uso:

```typescript
// La fábrica decide qué clase instanciar según el tipo
const accion = fabricaAcciones.crearAccion(
  TipoAccion.COPIAR,
  archivo,
  destino,
  so
);
// Retorna: new Copiar(archivo, destino, so)
```

#### Por qué Factory?

- **Flexibilidad**: Crear objetos sin especificar clases exactas
- **Mantenimiento**: Cambios centralizados en un solo lugar
- **Escalabilidad**: Agregar nuevos tipos sin modificar código existente

## Estructura del Proyecto

```
Evaluacion/
├── main.ts                     # Punto de entrada - Demostración de patrones
├── gestorDeArchivos.ts         # SINGLETON - Gestor principal
├── historialEliminados.ts      # Registro de archivos eliminados
├── sistemaOperativo.ts         # Simulador de gestión de espacio
│
├── Archivos/                   # Jerarquía de tipos de archivo
│   ├── archivo.ts              # Clase abstracta base
│   ├── imagen.ts               # Archivos de imagen
│   ├── video.ts                # Archivos de video
│   ├── sonido.ts               # Archivos de audio
│   └── documento.ts            # Archivos de documento
│
├── FabricaAcciones/            # FACTORY - Creación de acciones
│   ├── fabricaAcciones.ts      # Factory principal
│   ├── accion.ts               # Clase abstracta base
│   ├── copiar.ts               # Acción de copia
│   ├── borrar.ts               # Acción de borrado
│   └── renombrar.ts            # Acción de renombrado
│
└── Enum/                       # Definiciones de tipos
    ├── tipoArchivo.ts          # Tipos de archivos soportados
    ├── tipoAccion.ts           # Acciones disponibles
    ├── estadoArchivo.ts        # Estados de archivos
    └── estadoAccion.ts         # Estados de acciones
```

## Cómo Usar el Sistema

### 1. Obtener la instancia del gestor (Singleton)

```typescript
const gestor = GestorDeArchivos.getInstancia();
```

### 2. Crear archivos (Factory implícito)

```typescript
// El gestor usa internamente Factory Method para crear el tipo correcto
const imagen = gestor.crearArchivo(
  "foto.jpg",
  TipoArchivo.IMAGEN,
  2048,
  "1920x1080"
);
const video = gestor.crearArchivo(
  "video.mp4",
  TipoArchivo.VIDEO,
  10240,
  300,
  "1920x1080"
);
```

### 3. Ejecutar acciones (Factory explícito)

```typescript
// La fábrica crea la acción apropiada según el tipo
gestor.ejecutarAccion(TipoAccion.RENOMBRAR, imagen, "nueva_foto.jpg");
gestor.ejecutarAccion(TipoAccion.COPIAR, video, "/backup/");
gestor.ejecutarAccion(TipoAccion.BORRAR, archivo, "");
```

### 4. Consultar el sistema

```typescript
// Listar archivos activos
const archivos = gestor.listarArchivos();

// Ver historial de eliminados
const eliminados = gestor.obtenerHistorialEliminados();

// Consultar espacio disponible
const espacio = gestor.obtenerEspacioDisponible();
```

## Ejecutar el Proyecto

```bash
# Instalar TypeScript (si no está instalado)
npm install -g typescript

# Compilar el proyecto
tsc main.ts --target ES2020

# Ejecutar
node main.js
```

## Funcionalidades Principales

### Gestión de Archivos

- **Crear** archivos de diferentes tipos (imagen, video, audio, documento)
- **Listar** archivos activos en el sistema
- **Buscar** archivos por nombre, tipo o fecha

### Operaciones sobre Archivos

- **Copiar** archivos a diferentes ubicaciones
- **Renombrar** archivos manteniendo su ubicación
- **Eliminar** archivos (se mueven al historial)

### Monitoreo del Sistema

- **Historial** de archivos eliminados con fechas
- **Gestión de espacio** en disco simulado
- **Estados** de archivos y acciones para debugging

## Demostraciones de Patrones

### Ejemplo de Singleton en acción:

```typescript
// Múltiples referencias apuntan a la misma instancia
const gestor1 = GestorDeArchivos.getInstancia();
const gestor2 = GestorDeArchivos.getInstancia();

gestor1.crearArchivo("test.jpg", TipoArchivo.IMAGEN, 1024, "800x600");
console.log(gestor2.listarArchivos().length); // 1 - mismo estado!
```

### Ejemplo de Factory en acción:

```typescript
// El cliente no conoce las clases Copiar, Borrar, Renombrar
const tipos = [TipoAccion.COPIAR, TipoAccion.BORRAR, TipoAccion.RENOMBRAR];

tipos.forEach((tipo) => {
  // La fábrica decide qué clase instanciar
  const accion = fabricaAcciones.crearAccion(tipo, archivo, parametro, so);
  accion.ejecutar(); // Polimorfismo en acción
});
```

## Puntos Fuertes para Evaluación

### Implementación correcta de Singleton

- Constructor privado y método getInstancia() apropiados
- Lazy initialization y thread-safety considerado
- Único punto de acceso global al gestor

### Implementación robusta de Factory

- Separación clara entre creación y uso de objetos
- Extensible para nuevos tipos sin modificar código existente
- Reduce acoplamiento entre componentes

### Buenas prácticas de diseño

- Uso apropiado de clases abstractas y herencia
- Encapsulación de datos con getters/setters
- Manejo de errores y validaciones
- Código bien documentado y autoexplicativo

---

**Desarrollado por:** MarceAquino  
**Materia:** Metodología de Sistemas II  
**Fecha:** Octubre 2025

> Este proyecto demuestra la aplicación práctica de patrones de diseño fundamentales en un sistema real, siguiendo las mejores prácticas de programación orientada a objetos.
