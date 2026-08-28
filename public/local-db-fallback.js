<!DOCTYPE html>
<html class="dark" lang="es"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script src="local-db-fallback.js"></script>
<link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;600;700&amp;family=Hanken+Grotesk:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "on-error-container": "#93000a",
                    "on-primary-container": "#9dd090",
                    "on-secondary-fixed-variant": "#454747",
                    "outline": "#72796e",
                    "primary": "#154212",
                    "secondary-container": "#dfe0e0",
                    "outline-variant": "#c2c9bb",
                    "surface": "#f8f9ff",
                    "on-surface-variant": "#42493e",
                    "secondary": "#5d5f5f",
                    "tertiary-fixed": "#ffd9e4",
                    "on-background": "#0d1c2e",
                    "on-tertiary-container": "#ffaac8",
                    "surface-container": "#e6eeff",
                    "on-secondary": "#ffffff",
                    "surface-container-high": "#dce9ff",
                    "surface-tint": "#3b6934",
                    "inverse-on-surface": "#eaf1ff",
                    "inverse-surface": "#233144",
                    "secondary-fixed-dim": "#c6c6c7",
                    "tertiary": "#60233e",
                    "primary-container": "#2d5a27",
                    "secondary-fixed": "#e2e2e2",
                    "surface-container-highest": "#d5e3fc",
                    "on-tertiary-fixed-variant": "#71314c",
                    "primary-fixed-dim": "#a1d494",
                    "on-tertiary-fixed": "#3b0520",
                    "on-secondary-container": "#616363",
                    "on-error": "#ffffff",
                    "surface-variant": "#d5e3fc",
                    "on-secondary-fixed": "#1a1c1c",
                    "on-primary": "#ffffff",
                    "on-primary-fixed-variant": "#23501e",
                    "surface-container-lowest": "#ffffff",
                    "error": "#ba1a1a",
                    "surface-bright": "#f8f9ff",
                    "surface-dim": "#ccdbf3",
                    "tertiary-container": "#7c3a55",
                    "on-primary-fixed": "#002201",
                    "tertiary-fixed-dim": "#ffb0cc",
                    "background": "#f8f9ff",
                    "on-surface": "#0d1c2e",
                    "on-tertiary": "#ffffff",
                    "surface-container-low": "#eff4ff",
                    "inverse-primary": "#a1d494",
                    "primary-fixed": "#bcf0ae",
                    "error-container": "#ffdad6"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "lg": "40px",
                    "gutter": "24px",
                    "md": "24px",
                    "margin-mobile": "16px",
                    "margin-desktop": "32px",
                    "xl": "64px",
                    "sm": "12px",
                    "xs": "4px",
                    "base": "8px"
            },
            "fontFamily": {
                    "label-md": ["Hanken Grotesk"],
                    "body-sm": ["Hanken Grotesk"],
                    "headline-lg": ["Work Sans"],
                    "data-tabular": ["Hanken Grotesk"],
                    "display-lg": ["Work Sans"],
                    "label-lg": ["Hanken Grotesk"],
                    "body-lg": ["Hanken Grotesk"],
                    "body-md": ["Hanken Grotesk"],
                    "headline-md": ["Work Sans"]
            }
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        html.dark body {
            background-color: #0b0f19 !important;
            color: #e2e8f0 !important;
        }
        html.dark header, html.dark nav {
            background-color: #0b0f19 !important;
            border-color: #1e293b !important;
        }
        html.dark .card-custom {
            background-color: #131b2e !important;
            border-color: #1e293b !important;
            color: #e2e8f0 !important;
        }
        html.dark input, html.dark select {
            background-color: #131b2e !important;
            border-color: #1e293b !important;
            color: #e2e8f0 !important;
        }
    </style>
  </head>
<body class="font-body-md text-body-md overflow-x-hidden text-on-surface bg-[#0b0f19]" id="app">

<!-- Main Content Area -->
<main class="pt-16 pb-24 md:pb-8">
<!-- Top App Bar (Ajustada exactamente con el tamaño y diseño de la referencia) -->
<header class="flex justify-between items-center w-full h-16 bg-[#0b0f19] border-b border-[#1e293b] fixed top-0 left-0 z-50">
<div class="flex items-center h-full min-w-0 flex-1">
    <div class="w-16 md:w-20 flex justify-center items-center h-full border-r border-[#1e293b]/30 flex-shrink-0">
        <div @click="showSidebar = !showSidebar" class="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-[#00c875] flex items-center justify-center text-slate-950 cursor-pointer hover:brightness-110 active:scale-95 transition-all shadow-sm">
            <span class="material-symbols-outlined font-bold" data-icon="agriculture">agriculture</span>
        </div>
    </div>
    <h2 class="font-headline-md text-lg md:text-headline-md font-bold text-[#00c875] ml-3 md:ml-4 whitespace-nowrap truncate">El Manantial</h2>
</div>

<div class="flex items-center gap-3 pr-4 md:pr-8">
  <button @click="toggleTheme" class="w-10 h-10 rounded-full hover:bg-slate-800 text-slate-300 transition-colors flex items-center justify-center cursor-pointer" :title="isDarkMode ? 'Modo Claro' : 'Modo Oscuro'">
    <span class="material-symbols-outlined text-[20px]">{{ isDarkMode ? 'light_mode' : 'dark_mode' }}</span>
  </button>
  <button @click="logout" class="w-10 h-10 rounded-full hover:bg-red-500/10 text-slate-300 hover:text-red-400 transition-colors flex items-center justify-center cursor-pointer" title="Cerrar Sesión">
    <span class="material-symbols-outlined text-[20px]" data-icon="logout">logout</span>
  </button>
  <a href="usuarios.html" class="w-10 h-10 rounded-full overflow-hidden border-2 border-[#00c875] flex items-center justify-center bg-[#00c875] text-slate-950 text-sm font-bold active:scale-95 transition-transform duration-150 shadow-sm flex-shrink-0">
    <img v-if="profileForm.avatar && (profileForm.avatar.startsWith('http') || profileForm.avatar.startsWith('data:'))" alt="Perfil" class="w-full h-full object-cover" :src="profileForm.avatar"/>
    <span v-else>{{ profileForm.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() }}</span>
  </a>
</div>
</header>

<div class="px-margin-mobile md:px-margin-desktop py-8 max-w-7xl mx-auto relative">
    <!-- Título de la sección -->
    <h1 class="font-headline-lg text-2xl font-bold text-[#00c875] mb-6">Configuración de Usuarios</h1>

    <!-- Buscador móvil -->
    <div class="relative mb-6 md:hidden">
        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
        <input type="text" placeholder="Buscar por nombre o cargo..." class="w-full pl-10 pr-4 py-3 bg-[#131b2e] card-custom border border-[#1e293b] rounded-xl focus:outline-none focus:border-[#00c875] text-slate-200">
    </div>

    <!-- Tarjeta de Usuario Actual (Admin) -->
    <div class="bg-[#131b2e] card-custom border border-[#1e293b] rounded-2xl p-6 mb-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div class="flex items-center gap-4">
            <img :src="profileForm.avatar" alt="Admin User" class="w-16 h-16 rounded-full object-cover border-2 border-[#00c875]">
            <div>
                <div class="flex items-center gap-2">
                    <h3 class="font-headline-md text-xl font-bold text-[#00c875]">{{ profileForm.name }}</h3>
                </div>
                <p class="text-slate-400 text-sm mt-0.5">{{ profileForm.role }} • {{ profileForm.email }}</p>
                <span class="inline-block mt-2 bg-[#00c875]/20 text-[#00c875] px-2.5 py-0.5 rounded-full text-xs font-semibold">Sesión Activa</span>
            </div>
        </div>
        <!-- Botones de Configuración y Cerrar Sesión -->
        <div class="flex items-center gap-3 w-full md:w-auto">
            <button @click="showConfigModal = true" class="flex-1 md:flex-none w-full md:w-48 h-16 flex items-center justify-center gap-3 px-4 bg-[#131b2e] hover:bg-slate-800 text-slate-200 rounded-2xl text-sm font-semibold transition-all border border-[#1e293b] shadow-sm cursor-pointer">
                <span class="material-symbols-outlined text-xl">settings</span>
                <span class="flex flex-col text-left leading-tight">
                    <span>Configuración</span>
                </span>
            </button>
            <button @click="logout" class="flex-1 md:flex-none w-full md:w-48 h-16 flex items-center justify-center gap-3 px-4 bg-[#131b2e] hover:bg-red-950/40 text-red-400 rounded-2xl text-sm font-semibold transition-all border border-red-900/50 shadow-sm cursor-pointer">
                <span class="material-symbols-outlined text-xl">logout</span>
                <span class="flex flex-col text-left leading-tight">
                    <span>Cerrar</span>
                    <span>Sesión</span>
                </span>
            </button>
        </div>
    </div>

    <!-- Sección: Filtrar por Rol -->
    <div class="mb-8">
        <div class="flex items-center gap-2 mb-4">
            <span class="material-symbols-outlined text-[#00c875] text-sm">security</span>
            <h2 class="font-headline-md font-bold text-[#00c875] text-xs uppercase tracking-wider">Filtrar por Rol</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Rol Admin -->
            <div class="bg-[#131b2e] card-custom border border-[#1e293b] rounded-2xl p-5 relative hover:shadow-md transition-all">
                <div class="flex justify-between items-start mb-2">
                    <div class="w-10 h-10 rounded-xl bg-[#00c875]/10 flex items-center justify-center text-[#00c875]">
                        <span class="material-symbols-outlined">admin_panel_settings</span>
                    </div>
                    <span class="bg-[#00c875]/20 text-[#00c875] px-3 py-1 rounded-full text-xs font-semibold">Acceso Total</span>
                </div>
                <h3 class="font-headline-md font-bold text-white text-lg">Admin</h3>
                <p class="text-slate-400 text-sm mt-1">Gestión completa de inventario, finanzas, usuarios y logs.</p>
            </div>

            <!-- Rol Veterinario -->
            <div class="bg-[#131b2e] card-custom border border-[#1e293b] rounded-2xl p-5 relative hover:shadow-md transition-all">
                <div class="flex justify-between items-start mb-2">
                    <div class="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400">
                        <span class="material-symbols-outlined">medical_services</span>
                    </div>
                    <span class="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-xs font-semibold">Salud Animal</span>
                </div>
                <h3 class="font-headline-md font-bold text-white text-lg">Veterinario</h3>
                <p class="text-slate-400 text-sm mt-1">Acceso a historias clínicas, vacunas y control sanitario.</p>
            </div>

            <!-- Rol Operario -->
            <div class="bg-[#131b2e] card-custom border border-[#1e293b] rounded-2xl p-5 relative hover:shadow-md transition-all">
                <div class="flex justify-between items-start mb-2">
                    <div class="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300">
                        <span class="material-symbols-outlined">agriculture</span>
                    </div>
                    <span class="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs font-semibold">Producción</span>
                </div>
                <h3 class="font-headline-md font-bold text-white text-lg">Operario</h3>
                <p class="text-slate-400 text-sm mt-1">Registro diario de ordeño, alimentación y movimientos de ganado.</p>
            </div>

            <!-- Mostrar Todos -->
            <div class="bg-[#131b2e] card-custom border-2 border-[#00c875] rounded-2xl p-5 relative shadow-sm">
                <div class="flex justify-between items-start mb-2">
                    <div class="w-10 h-10 rounded-xl bg-[#00c875] text-slate-950 flex items-center justify-center font-bold">
                        <span class="material-symbols-outlined">group</span>
                    </div>
                    <span class="bg-[#00c875] text-slate-950 px-3 py-1 rounded-full text-xs font-bold">Todo el Personal</span>
                </div>
                <h3 class="font-headline-md font-bold text-white text-lg">Mostrar Todos</h3>
                <p class="text-slate-400 text-sm mt-1">Visualizar la lista completa de personal registrado en El Manantial.</p>
            </div>
        </div>
    </div>

    <!-- Sección: Lista de Usuarios -->
    <div>
        <div class="flex items-center gap-2 mb-4">
            <span class="material-symbols-outlined text-[#00c875] text-sm">group</span>
            <h2 class="font-headline-md font-bold text-[#00c875] text-xs uppercase tracking-wider">Lista de Usuarios</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Dra. Maria Mendoza -->
            <div class="bg-[#131b2e] card-custom border border-[#1e293b] rounded-2xl p-4 flex items-center justify-between shadow-sm">
                <div class="flex items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1594824813511-2094c979d50a?q=80&w=200&auto=format&fit=crop" alt="Maria Mendoza" class="w-12 h-12 rounded-full object-cover">
                    <div>
                        <h4 class="font-bold text-white">Dra. Maria Mendoza</h4>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded text-[10px] font-bold">VETERINARIO</span>
                            <span class="flex items-center gap-1 text-xs text-[#00c875] font-medium"><span class="w-2 h-2 rounded-full bg-[#00c875] inline-block"></span> Activo</span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-2 text-slate-400">
                    <button class="p-2 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer" title="Editar"><span class="material-symbols-outlined text-sm">sync</span></button>
                    <button class="p-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors cursor-pointer" title="Eliminar"><span class="material-symbols-outlined text-sm">delete</span></button>
                </div>
            </div>

            <!-- Jose Sanchez -->
            <div class="bg-[#131b2e] card-custom border border-[#1e293b] rounded-2xl p-4 flex items-center justify-between shadow-sm">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-full bg-[#00c875]/20 text-[#00c875] flex items-center justify-center font-bold text-lg">JS</div>
                    <div>
                        <h4 class="font-bold text-white">Jose Sanchez</h4>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] font-bold">OPERARIO</span>
                            <span class="flex items-center gap-1 text-xs text-[#00c875] font-medium"><span class="w-2 h-2 rounded-full bg-[#00c875] inline-block"></span> Activo</span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-2 text-slate-400">
                    <button class="p-2 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer" title="Editar"><span class="material-symbols-outlined text-sm">sync</span></button>
                    <button class="p-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors cursor-pointer" title="Eliminar"><span class="material-symbols-outlined text-sm">delete</span></button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Botón flotante para agregar -->
<button class="fixed right-6 bottom-20 z-50 w-14 h-14 bg-[#00c875] hover:bg-emerald-600 text-slate-950 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer">
    <span class="material-symbols-outlined text-2xl font-bold">add</span>
</button>

<!-- Modal de Configuración de Perfil -->
<div v-if="showConfigModal" class="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
    <div class="bg-[#131b2e] border border-[#1e293b] rounded-2xl p-6 max-w-lg w-full shadow-2xl">
        <div class="flex justify-between items-center mb-6">
            <h3 class="font-headline-md text-xl font-bold text-[#00c875] flex items-center gap-2">
                <span class="material-symbols-outlined">settings</span> Configuración
            </h3>
            <button @click="showConfigModal = false" class="text-slate-400 hover:text-white transition-colors cursor-pointer">
                <span class="material-symbols-outlined">close</span>
            </button>
        </div>
        
        <!-- Formulario -->
        <form @submit.prevent="saveProfile" class="space-y-4">
            <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Nombre Completo</label>
                <input type="text" v-model="profileForm.name" class="w-full px-4 py-2.5 bg-[#0b0f19] border border-[#1e293b] rounded-xl text-sm text-slate-200 focus:outline-none focus:border-[#00c875]" required>
            </div>
            <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Correo Electrónico</label>
                <input type="email" v-model="profileForm.email" class="w-full px-4 py-2.5 bg-[#0b0f19] border border-[#1e293b] rounded-xl text-sm text-slate-200 focus:outline-none focus:border-[#00c875]" required>
            </div>
            <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Rol / Cargo</label>
                <input type="text" v-model="profileForm.role" class="w-full px-4 py-2.5 bg-[#0b0f19] border border-[#1e293b] rounded-xl text-sm text-slate-200 focus:outline-none focus:border-[#00c875]" disabled>
            </div>
            <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Nueva Contraseña</label>
                <div class="relative">
                    <input :type="showPassword ? 'text' : 'password'" v-model="profileForm.password" placeholder="••••••••" class="w-full px-4 py-2.5 bg-[#0b0f19] border border-[#1e293b] rounded-xl text-sm text-slate-200 focus:outline-none focus:border-[#00c875]">
                    <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer">
                        <span class="material-symbols-outlined text-xl">{{ showPassword ? 'visibility' : 'visibility_off' }}</span>
                    </button>
                </div>
            </div>

            <!-- Botones de Acción -->
            <div class="flex flex-row gap-3 pt-4">
                <button type="button" @click="clearForm" class="flex-1 h-14 flex items-center justify-center gap-2 px-2 bg-[#131b2e] hover:bg-slate-800 text-slate-300 rounded-2xl text-sm font-semibold transition-all border border-[#1e293b] shadow-sm cursor-pointer whitespace-nowrap">
                    <span class="material-symbols-outlined text-lg">brush</span>
                    <span>Limpiar</span>
                </button>
                <button type="button" @click="showConfigModal = false" class="flex-1 h-14 flex items-center justify-center gap-2 px-2 bg-[#131b2e] hover:bg-slate-800 text-slate-300 rounded-2xl text-sm font-semibold transition-all border border-[#1e293b] shadow-sm cursor-pointer whitespace-nowrap">
                    <span>Cancelar</span>
                </button>
                <button type="submit" class="flex-1 h-14 flex flex-col items-center justify-center px-2 bg-[#00c875] hover:bg-emerald-600 text-slate-950 rounded-2xl text-sm font-bold transition-all shadow-sm cursor-pointer leading-tight whitespace-nowrap">
                    <span>Guardar</span>
                    <span>Cambios</span>
                </button>
            </div>
        </form>
    </div>
</div>
</main>

<!-- Bottom Nav Bar -->
<nav class="fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-1 py-2 bg-[#0b0f19] border-t border-[#1e293b] shadow-lg transition-colors">
    <a class="flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 text-slate-400 hover:text-[#00c875]" href="index.html">
      <span class="material-symbols-outlined text-[20px]">analytics</span>
      <span class="text-[10px] mt-0.5 leading-none">Inicio</span>
    </a>
    <a class="flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 text-slate-400 hover:text-[#00c875]" href="ordeno.html">
      <span class="material-symbols-outlined text-[20px]">opacity</span>
      <span class="text-[10px] mt-0.5 leading-none">Ordeño</span>
    </a>
    <a class="flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 text-slate-400 hover:text-[#00c875]" href="unidad.html">
      <span class="material-symbols-outlined text-[20px]">location_on</span>
      <span class="text-[10px] mt-0.5 leading-none">Finca</span>
    </a>
    <a class="flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 text-slate-400 hover:text-[#00c875]" href="inventario.html">
      <span class="material-symbols-outlined text-[20px]">inventory</span>
      <span class="text-[10px] mt-0.5 leading-none">Inventario</span>
    </a>
    <a class="flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 text-slate-400 hover:text-[#00c875]" href="salud.html">
      <span class="material-symbols-outlined text-[20px]">health_and_safety</span>
      <span class="text-[10px] mt-0.5 leading-none">Salud</span>
    </a>
    <a class="flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 text-slate-400 hover:text-[#00c875]" href="reportes.html">
      <span class="material-symbols-outlined text-[20px]">description</span>
      <span class="text-[10px] mt-0.5 leading-none">Reportes</span>
    </a>
    <a class="flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 text-[#00c875] font-bold" href="usuarios.html">
      <span class="material-symbols-outlined text-[20px]">group</span>
      <span class="text-[10px] mt-0.5 leading-none">Perfil</span>
    </a>
</nav>

<script>
        const { createApp } = Vue;
        createApp({
            data() {
                return {
                    isDarkMode: true,
                    showSidebar: false,
                    showConfigModal: false,
                    showPassword: false,
                    currentUser: null,
                    profileForm: {
                        name: 'Admin User',
                        email: 'admin@elmanantial.com',
                        role: 'Administrador',
                        password: '',
                        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
                    }
                };
            },
            mounted() {
                const userStr = localStorage.getItem('loggedInUser');
                if (userStr) {
                    this.currentUser = JSON.parse(userStr);
                    this.profileForm.name = this.currentUser.name || 'Admin User';
                    this.profileForm.email = this.currentUser.email || 'admin@elmanantial.com';
                    this.profileForm.role = this.currentUser.role || 'Administrador';
                    this.profileForm.avatar = this.currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop';
                }
            },
            methods: {
                toggleTheme() {
                    this.isDarkMode = !this.isDarkMode;
                },
                logout() {
                    localStorage.removeItem('loggedInUser');
                    window.location.href = 'login.html';
                },
                clearForm() {
                    this.profileForm.name = '';
                    this.profileForm.email = '';
                    this.profileForm.password = '';
                },
                saveProfile() {
                    if(this.currentUser) {
                        this.currentUser.name = this.profileForm.name;
                        this.currentUser.email = this.profileForm.email;
                        if(this.profileForm.password) {
                            this.currentUser.password = this.profileForm.password;
                        }
                        localStorage.setItem('loggedInUser', JSON.stringify(this.currentUser));
                    }
                    this.showConfigModal = false;
                }
            }
        }).mount('#app');
    </script>
</body></html>
