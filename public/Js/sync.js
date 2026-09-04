// ==========================================
// MÓDULO DE SINCRONIZACIÓN Y SOPORTE OFFLINE
// ==========================================

let isSyncing = false;

/**
 * 1. Guardar acción pendiente cuando no hay internet
 */
function guardarAccionPendiente(endpoint, metodo, datos) {
  let pendientes = JSON.parse(localStorage.getItem('elmanantial_sync_queue') || '[]');
  
  pendientes.push({
    endpoint: endpoint,
    method: metodo,
    body: datos,
    date: new Date().toISOString()
  });

  localStorage.setItem('elmanantial_sync_queue', JSON.stringify(pendientes));
  console.log("Acción guardada localmente para sincronizar después:", endpoint);
}

/**
 * 2. Sincronizar datos acumulados al reconectar (Concurrencia controlada)
 */
async function sincronizarDatosPendientes() {
  if (isSyncing) return;
  isSyncing = true;

  try {
    let pendientes = JSON.parse(localStorage.getItem('elmanantial_sync_queue') || '[]');
    if (pendientes.length === 0) return;

    console.log(`Intentando sincronizar ${pendientes.length} elementos pendientes...`);
    let sincronizadosExitosamente = [];

    for (let i = 0; i < pendientes.length; i++) {
      let item = pendientes[i];
      try {
        let respuesta = await fetch(item.endpoint, {
          method: item.method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item.body)
        });

        if (respuesta.ok) {
          sincronizadosExitosamente.push(i);
          console.log(`Sincronizado con éxito: ${item.endpoint}`);
        } else {
          console.warn(`El servidor rechazó la sincronización de ${item.endpoint}`);
        }
      } catch (error) {
        console.log("Aún sin conexión estable con el servidor. Se reintentará luego.");
        break; // Detener el ciclo si se pierde la red en pleno proceso
      }
    }

    // Limpiar de la cola los elementos que ya se subieron con éxito
    if (sincronizadosExitosamente.length > 0) {
      let nuevaCola = pendientes.filter((_, index) => !sincronizadosExitosamente.includes(index));
      localStorage.setItem('elmanantial_sync_queue', JSON.stringify(nuevaCola));
      
      if (nuevaCola.length === 0) {
        console.log("¡Sincronización completa! Todos los datos están al día.");
      }
    }

  } finally {
    isSyncing = false; // Liberar el bloqueo al terminar (éxito o error)
  }
}

// 3. Escuchar cambios de red automáticamente
window.addEventListener('online', () => {
  console.log("¡Conexión a internet restablecida!");
  sincronizarDatosPendientes();
});

// 4. Sincronizar al iniciar la aplicación si hay internet
window.addEventListener('load', () => {
  if (navigator.onLine) {
    sincronizarDatosPendientes();
  }
});


// ==========================================
// EJEMPLO DE USO EN TUS PETICIONES (MÉTODOS VUE)
// ==========================================

/* 
  Coloca este bloque dentro de la función de envío de tu componente Vue 
  (por ejemplo, al registrar un evento clínico o un ordeño).
*/

async function enviarDatosConRespaldo(endpoint, datos) {
  try {
    let res = await fetch(endpoint, { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos) 
    });
    
    if (!res.ok) throw new Error("Error en servidor");
    
    alert("Guardado en servidor con éxito.");
  } catch (err) {
    // Si falla porque no hay red o el servidor no responde, se guarda localmente
    guardarAccionPendiente(endpoint, 'POST', datos);
    alert("Sin conexión. El registro se guardó localmente y se sincronizará al recuperar el internet.");
  }
}

