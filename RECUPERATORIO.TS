/*
  ===============================================
  NOTA IMPORTANTE:
  Esta correcion es una reinterpretacion del Factory.
  Trabajo realizado en poco tiempo por Marcelo Aquino.
  Si esto esta mal o sigue sin cumplir con lo que se espera,
  me hago plenamente responsable.
  
  Solo se refactorizo el factory, no se tomo en cuenta 
  todo el resto del sistema porque no llego a refactorizar 
  todo el codigo anterior.
  
  ===============================================
  ESTRUCTURA ANTES vs AHORA
  ===============================================
  
  ANTES (1 FACTORY GENERAL):
  - Total de factories: 1
  - FabricaGeneral con 1 switch gigante
  - TODO centralizado en un único lugar
  
  AHORA (4 FACTORIES):
  - Total de factories: 4
  - 1 FabricaGeneral (coordina y delega)
  - 3 Factories especializadas (cada una experta en su accion)
  
  ===============================================
  POR QUE ESTO ES MEJOR
  ===============================================
  
  1. SEPARACIÓN DE RESPONSABILIDADES (SRP)
     - Cada factory tiene 1 única responsabilidad
     - FabricaCopiar solo crea AccionCopiar
     - FabricaBorrar solo crea AccionBorrar
     - FabricaRenombrar solo crea AccionRenombrar
  
  2. EXTENSIBILIDAD
     - Agregar nueva acción = crear nueva factory (sin tocar las existentes)
     - Código abierto para extensión, cerrado para modificación
     - Cero riesgo de romper lo que ya funciona
  
  3. MANTENIBILIDAD
     - Cada factory es pequeña, legible, enfocada
     - Debugging mas fácil: errores aislados
     - Lógica específica por acción, sin contaminar otras
  
  4. TESTEO
     - Cada factory puede ser testeada independientemente
     - Tests más simples y específicos
     - Mock objects más fáciles de crear
  
  5. ESCALABILIDAD
     - Sistema listo para crecer
     - Nuevas factories pueden tener lógica compleja sin afectar otras
     - Arquitectura profesional y ordenada
  
  ===============================================

(EL PRIMER FACTORY POR UN TEMA DE SIMPLICIDAD ME SIGUE PARECIENDO EL MAS UTIL PARA EL EJEMPLO. 
ESTE ME PARECE QUE SUMA UNA COMPLEJIDAD INNECESARIA PARA ESTE SISTEMA QUE ES TAN PEQUENIO.)
EL CODIGO NO ES FUNCIONAL SOLAMENTE PARA QUE VEA ESTA NUEVA INTERPRETACION 
SE PRODIA INTEGRAR PERO EL TP FUE ENCARADO DE OTRA MANERA EN UN PRINCIPIO
CAMBIARLO A ESTA ALTURA ES REHACER COMPLETAMNETE TODOS LOS DIAGRAMAS.
*/

// ==================== INTERFAZ BASE ====================
interface Accion {
  ejecutar(): void;
  validar(): boolean;
  obtenerDescripcion(): string;
}

// ==================== ACCIONES CONCRETAS ====================

class AccionCopiar implements Accion {
  constructor(private origen: string, private destino: string) {}

  validar(): boolean {
    if (!this.origen || !this.destino) {
      console.log("Error: origen o destino invalido");
      return false;
    }
    console.log("Validacion exitosa: archivos validos");
    return true;
  }

  ejecutar(): void {
    console.log(`Copiando: ${this.origen} -> ${this.destino}`);
  }

  obtenerDescripcion(): string {
    return "Accion de copia de archivos";
  }
}

class AccionBorrar implements Accion {
  constructor(private archivo: string) {}

  validar(): boolean {
    if (!this.archivo) {
      console.log("Error: archivo invalido");
      return false;
    }
    console.log("Validacion exitosa: archivo valido");
    return true;
  }

  ejecutar(): void {
    console.log(`Borrando: ${this.archivo}`);
  }

  obtenerDescripcion(): string {
    return "Accion de borrado de archivos";
  }
}

class AccionRenombrar implements Accion {
  constructor(private actual: string, private nuevo: string) {}

  validar(): boolean {
    if (!this.actual || !this.nuevo) {
      console.log("Error: nombres invalidos");
      return false;
    }
    console.log("Validacion exitosa: nombres validos");
    return true;
  }

  ejecutar(): void {
    console.log(`Renombrando: ${this.actual} -> ${this.nuevo}`);
  }

  obtenerDescripcion(): string {
    return "Accion de renombrado de archivos";
  }
}

// ==================== FACTORIES ESPECIALIZADAS ====================

class FabricaCopiar {
  static crear(origen: string, destino: string): AccionCopiar {
    console.log("[FabricaCopiar] Creando accion de copia...");
    const accion = new AccionCopiar(origen, destino);
    if (!accion.validar()) {
      throw new Error("Validacion fallida en FabricaCopiar");
    }
    console.log("[FabricaCopiar] Accion creada correctamente\n");
    return accion;
  }
}

class FabricaBorrar {
  static crear(archivo: string): AccionBorrar {
    console.log("[FabricaBorrar] Creando accion de borrado...");
    const accion = new AccionBorrar(archivo);
    if (!accion.validar()) {
      throw new Error("Validacion fallida en FabricaBorrar");
    }
    console.log("[FabricaBorrar] Accion creada correctamente\n");
    return accion;
  }
}

class FabricaRenombrar {
  static crear(actual: string, nuevo: string): AccionRenombrar {
    console.log("[FabricaRenombrar] Creando accion de renombrado...");
    const accion = new AccionRenombrar(actual, nuevo);
    if (!accion.validar()) {
      throw new Error("Validacion fallida en FabricaRenombrar");
    }
    console.log("[FabricaRenombrar] Accion creada correctamente\n");
    return accion;
  }
}

// ==================== FACTORY GENERAL ====================

class FabricaGeneral {
  static crear(tipo: string, ...args: any[]): Accion {
    console.log(`[FabricaGeneral] Coordinando creacion de accion: ${tipo}`);
    
    switch(tipo) {
      case "copiar":
        return FabricaCopiar.crear(args[0], args[1]);
      
      case "borrar":
        return FabricaBorrar.crear(args[0]);
      
      case "renombrar":
        return FabricaRenombrar.crear(args[0], args[1]);
      
      default:
        throw new Error(`Tipo de accion no soportado: ${tipo}`);
    }
  }
}

// ==================== EJEMPLO DE USO ====================

function principal(): void {
  console.log("=".repeat(60));
  console.log("DEMOSTRACION: PATRON FACTORY CON 4 FACTORIES");
  console.log("=".repeat(60));
  
  console.log("\n--- EJEMPLO 1: Usando FabricaGeneral (coordina) ---\n");
  try {
    const accion1 = FabricaGeneral.crear("copiar", "documento.txt", "backup.txt");
    accion1.ejecutar();
  } catch (e) {
    console.log("Error:", e instanceof Error ? e.message : "");
  }
  
  console.log("\n--- EJEMPLO 2: Usando FabricaBorrar (especializada) ---\n");
  try {
    const accion2 = FabricaBorrar.crear("tempfile.txt");
    accion2.ejecutar();
  } catch (e) {
    console.log("Error:", e instanceof Error ? e.message : "");
  }
  
  console.log("\n--- EJEMPLO 3: Usando FabricaRenombrar (especializada) ---\n");
  try {
    const accion3 = FabricaRenombrar.crear("archivo_viejo.txt", "archivo_nuevo.txt");
    accion3.ejecutar();
  } catch (e) {
    console.log("Error:", e instanceof Error ? e.message : "");
  }
  
  console.log("\n--- EJEMPLO 4: Usando FabricaCopiar (especializada) ---\n");
  try {
    const accion4 = FabricaCopiar.crear("foto.jpg", "fotos/foto_copia.jpg");
    accion4.ejecutar();
  } catch (e) {
    console.log("Error:", e instanceof Error ? e.message : "");
  }
  
  console.log("\n" + "=".repeat(60));
  console.log("RESUMEN: 4 factories (1 general + 3 especializadas)");
  console.log("=".repeat(60));
}

// Ejecutar demostracion
principal();