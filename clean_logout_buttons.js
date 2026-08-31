const fs = require('fs');
const path = require('path');

// Usamos una ruta relativa robusta basada en __dirname para evitar errores de directorios absolutos fijos
const publicDir = path.join(__dirname, 'public');

const files = [
    'index.html',
    'ordeno.html',
    'unidad.html',
    'inventario.html',
    'salud.html',
    'reportes.html',
    'historial.html',
    'usuarios.html'
];

// Estructura limpia exacta con sus clases, atributos y colores originales
const singleButtonWithAvatar = `<button @click="logout" class="w-10 h-10 rounded-full hover:bg-error/10 text-on-surface-variant hover:text-error transition-colors flex items-center justify-center cursor-pointer" title="Cerrar Sesión">
    <span class="material-symbols-outlined text-[20px]" data-icon="logout">logout</span>
  </button>
  <a href="usuarios.html" class="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container flex items-center justify-center bg-primary text-on-primary text-sm font-bold active:scale-95 transition-transform duration-150 shadow-sm">
    <img v-if="currentUser && currentUser.avatar && (currentUser.avatar.startsWith('http') || currentUser.avatar.startsWith('data:'))" alt="User profile" class="w-full h-full object-cover" :src="currentUser.avatar"/>
    <span v-else>{{ currentUser ? currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'US' }}</span>
  </a>`;

files.forEach(file => {
    const filePath = path.join(publicDir, file);

    // Validamos que el archivo realmente exista antes de intentar leerlo para evitar que el script se detenga
    if (!fs.existsSync(filePath)) {
        console.log(`El archivo no existe: ${file}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/\r\n/g, '\n'); // Normalizar saltos de línea de Windows a Linux

    // Expresión regular robusta para detectar botones de cierre de sesión duplicados previos al enlace de usuarios
    const pattern = /(?:<button @click="logout"[\s\S]*?<\/button>\s*)+<a href="usuarios\.html"[\s\S]*?<\/a>/g;

    // IMPORTANTE: Al usar banderas globales (/g) en RegExp, es una buena práctica reiniciar el lastIndex
    pattern.lastIndex = 0;

    if (pattern.test(content)) {
        // Reiniciamos nuevamente el índice antes de hacer el replace definitivo
        pattern.lastIndex = 0;
        content = content.replace(pattern, singleButtonWithAvatar);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Cleaned logout buttons for: ${file}`);
    } else {
        console.log(`No duplicated logout buttons found for: ${file}`);
    }
});
