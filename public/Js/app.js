// public/js/app.js

document.addEventListener('DOMContentLoaded', () => {
  // Corregido: Uso de comillas invertidas (backticks) para la interpolación de ${PORT}
  console.log(`pwa_el_manantial running`);

  // Mostrar indicador visual de estado de red
  actualizarEstadoRed();
  window.addEventListener('online', actualizarEstadoRed);
  window.addEventListener('offline', actualizarEstadoRed);
});

function actualizarEstadoRed() {
  const indicador = document.getElementById('status-conexion');
  if (indicador) {
    if (navigator.onLine) {
      indicador.textContent = "Online 🟢";
      indicador.style.color = "green";
    } else {
      indicador.textContent = "Modo Offline 🟠";
      indicador.style.color = "orange";
    }
  }
}

// Función auxiliar para redirecciones seguras
function irA(vista) {
  // Si tus archivos están en la raíz del dominio o del servidor, usa rutas directas:
  window.location.href = vista;
  
  // O si prefieres mantener la estructura con subcarpeta, asegúrate de que coincida con tu servidor:
  // window.location.href = `/public/${vista}`;
}

