(function() {
  const STORAGE_KEY = 'elmanantial_local_db_v3';

  const defaultDb = {
    users: [
      { id: 1, name: "Fracisco Molina", role: "Administrador", status: "Activo", email: "admin@elmanantial.com", password: "admin123", avatar: "ADMIN" },
      { id: 2, name: "Dra. Maria Mendoza", role: "Veterinario", status: "Activo", email: "veterinario@elmanantial.com", password: "vet123", avatar: "VET" },
      { id: 3, name: "Jose Sanchez", role: "Operario", status: "Activo", email: "jose@elmanantial.com", password: "ope123", avatar: "JS" },
      { id: 4, name: "Miguel Hernández", role: "Obrero", status: "Activo", email: "miguel@elmanantial.com", password: "obm123", avatar: "MH" },
      { id: 5, name: "Juan Rodríguez", role: "Obrero", status: "Activo", email: "juan@elmanantial.com", password: "obj123", avatar: "JR"},
      { id: 6, name: "Pedro Rojas", role: "Obrero", status: "Activo", email: "pedro@elmanantial.com", password: "obp123", avatar: "PR"},
      { id: 7, name: "Luis Berrios", role: "Obrero", status: "Activo", email: "luis@elmanantial.com", password: "obl123", avatar: "LB"},
    ],
    inventory: [
      { id: 1, name: "Concentrado Lechero 22%", category: "feed", stock: 2450, unit: "kg", status: "OK" },
      { id: 2, name: "Sales Minerales Premium", category: "feed", stock: 45, unit: "kg", status: "BAJO" },
      { id: 3, name: "Vacuna Antiaftosa (Frasco 50 ds)", category: "medicine", stock: 2, unit: "unidades", status: "CRÍTICO" },
      { id: 4, name: "Antibiótico Oxitetraciclina", category: "medicine", stock: 12, unit: "frascos", status: "OK" },
      { id: 5, name: "Sellador de Pezones (GET-ordeño)", category: "hygiene", stock: 15, unit: "galones", status: "BAJO" }
    ],
    units: [
      { id: 1, name: "El Manantial", owner: "Administración Central", animalCount: 210, productionToday: 1450, healthAvg: "Excelente", status: "Activa", image: "ADMIN" }
    ],
    milkingRecords: [
      { id: 1, unitName: "Lote A - Potrero El Sol", liters: 45.5, shift: "Mañana", time: "06:45 AM", status: "VERIFICADO", date: "2026-05-23" },
      { id: 2, unitName: "Lote B - Hacienda", liters: 32.8, shift: "Mañana", time: "07:12 AM", status: "VERIFICADO", date: "2026-05-23" },
      { id: 3, unitName: "Lote A - Potrero El Sol", liters: 28.0, shift: "Mañana", time: "07:45 AM", status: "VERIFICADO", date: "2026-05-23" },
      { id: 4, unitName: "Lote B - Hacienda", liters: 12.2, shift: "Mañana", time: "05:30 AM", status: "PENDIENTE", date: "2026-05-23" }
    ],
    animals: [
      {
        id: "L-402",
        name: "Clarabel",
        breed: "Holstein",
        age: 4.5,
        weight: 580,
        status: "Saludable",
        productionTotal: 12450,
        lastVaccination: "15 Oct 2023",
        pregnancyStatus: "Confirmado (3m)",
        image: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=200&auto=format&fit=crop",
        notes: "Animal muestra excelente recuperación post-parto. Se recomienda mantener suplementación mineral."
      },
      {
        id: "J-115",
        name: "Margarita",
        breed: "Jersey",
        age: 3.0,
        weight: 480,
        status: "En Tratamiento",
        productionTotal: 8900,
        lastVaccination: "20 Sep 2023",
        pregnancyStatus: "No preñada",
        image: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=200&auto=format&fit=crop",
        notes: "En tratamiento por mastitis leve en ubre anterior derecha."
      },
      {
        id: "G-089",
        name: "Estrella",
        breed: "Guernsey",
        age: 6.0,
        weight: 510,
        status: "Bajo Observación",
        productionTotal: 15400,
        lastVaccination: "05 Ago 2023",
        pregnancyStatus: "Confirmado (5m)",
        image: "https://images.unsplash.com/photo-1527153857715-3908f2ae5e61?q=80&w=200&auto=format&fit=crop",
        notes: "Chequeo mensual de gestación y monitoreo de cojera leve."
      }
    ],
    healthEvents: [
      { id: 1, animalId: "L-402", type: "Vacunación", details: "Aftosa (Lote: #AFT-2023-09)", veterinarian: "Dra. Mendoza", date: "15 Oct 2023" },
      { id: 2, animalId: "L-402", type: "Tratamiento", details: "Mastitis Leve (Cefalexina - 5 días) - Finalizado con éxito", veterinarian: "Dra. Mendoza", date: "22 Ago 2023" }
    ],
    checkups: [
      { id: 1, title: "Vacunación Aftosa", target: "Lote A - Corrales Norte", priority: "Urgente", date: "24 Oct" },
      { id: 2, title: "Control de Mastitis", target: "Lote B", priority: "Programado", date: "27 Oct" }
    ]
  };

  function readLocalDb() {
    let dbStr = localStorage.getItem(STORAGE_KEY);
    if (!dbStr) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultDb));
      return JSON.parse(JSON.stringify(defaultDb));
    }
    try {
      const db = JSON.parse(dbStr);
      let modified = false;

      defaultDb.users.forEach(defUser => {
        const userIndex = db.users.findIndex(u => u.email.toLowerCase() === defUser.email.toLowerCase());
        if (userIndex === -1) {
          db.users.push(defUser);
          modified = true;
        } else {
          if (db.users[userIndex].password !== defUser.password) {
            db.users[userIndex].password = defUser.password;
            modified = true;
          }
        }
      });

      if (modified) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
      }
      return db;
    } catch (e) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultDb));
      return JSON.parse(JSON.stringify(defaultDb));
    }
  }

  function writeLocalDb(db) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  }

  if (window.location.protocol === 'file:' || window.location.hostname.endsWith('github.io') || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    const originalFetch = window.fetch;

    window.fetch = function(input, init) {
      let url = typeof input === 'string' ? input : input.url;
      if (url.startsWith('http://') || url.startsWith('https://')) {
        const parsed = new URL(url);
        url = parsed.pathname;
      }

      if (!url.includes('/api/')) {
        return originalFetch(input, init);
      }

      const db = readLocalDb();
      const method = init && init.method ? init.method.toUpperCase() : 'GET';
      let requestBody = null;
      if (init && init.body) {
        try {
          requestBody = JSON.parse(init.body);
        } catch (e) {
          requestBody = init.body;
        }
      }

      let responseData = null;
      let responseStatus = 200;

      try {
        if (url === '/api/login' && (method === 'POST' || method === 'GET')) {
          let { email, password } = requestBody || {};
          
          if (!email && url.includes('?')) {
            const urlParams = new URLSearchParams(input.split('?')[1]);
            email = urlParams.get('email');
            password = urlParams.get('password');
          }

          // Limpiar espacios o mayúsculas accidentales al tipear en escritorio
          const cleanEmail = email ? email.trim().toLowerCase() : '';
          const cleanPass = password ? password.trim() : '';

          const user = db.users.find(u => u.email.toLowerCase() === cleanEmail && u.password === cleanPass);
          if (!user) {
            responseData = { error: "Credenciales incorrectas" };
            responseStatus = 401;
          } else if (user.status !== 'Activo') {
            responseData = { error: "Su cuenta ha sido desactivada." };
            responseStatus = 403;
          } else {
            // Guardar sesión actual en localStorage para prevenir cierres al cambiar de pestaña/sección
            localStorage.setItem('elmanantial_current_user', JSON.stringify(user));
            responseData = user;
          }
        } 
        // NUEVO: Soportar endpoints comunes de verificación de sesión al navegar por Inicio, Ordeño o Finca
        else if (url === '/api/session' || url === '/api/auth' || url === '/api/me') {
          const storedUser = localStorage.getItem('elmanantial_current_user');
          if (storedUser) {
            responseData = JSON.parse(storedUser);
          } else {
            // Fallback al primer usuario o error si no hay sesión
            responseData = db.users[0];
          }
        }
        else if (url.startsWith('/api/users/') && method === 'DELETE') {
          const id = parseInt(url.split('/').pop());
          const index = db.users.findIndex(u => u.id === id);
          if (index !== -1) {
            db.users.splice(index, 1);
            writeLocalDb(db);
            responseData = { message: "User deleted successfully" };
          } else {
            responseData = { error: "User not found" };
            responseStatus = 404;
          }
        }
        else if (url.startsWith('/api/users/') && method === 'GET') {
          const id = parseInt(url.split('/').pop());
          const user = db.users.find(u => u.id === id);
          if (user) {
            responseData = user;
          } else {
            responseData = { error: "User not found" };
            responseStatus = 404;
          }
        } 
        else if (url.startsWith('/api/users/') && url.endsWith('/status') && method === 'PUT') {
          const id = parseInt(url.split('/')[3]);
          const user = db.users.find(u => u.id === id);
          if (user) {
            user.status = requestBody.status;
            writeLocalDb(db);
            responseData = user;
          } else {
            responseData = { error: "User not found" };
            responseStatus = 404;
          }
        } 
        else if (url.startsWith('/api/users/') && method === 'PUT') {
          const id = parseInt(url.split('/').pop());
          const user = db.users.find(u => u.id === id);
          if (user) {
            user.name = requestBody.name || user.name;
            user.email = requestBody.email || user.email;
            user.password = requestBody.password || user.password;
            user.avatar = requestBody.avatar || user.avatar;
            user.role = requestBody.role || user.role;
            writeLocalDb(db);
            responseData = user;
          } else {
            responseData = { error: "User not found" };
            responseStatus = 404;
          }
        } 
        else if (url === '/api/users' && method === 'GET') {
          responseData = db.users;
        } 
        else if (url === '/api/users' && method === 'GET') {
          const newUser = {
            id: db.users.length > 0 ? Math.max(...db.users.map(u => u.id)) + 1 : 1,
            name: requestBody.name,
            role: requestBody.role,
            status: requestBody.status || "Activo",
            email: requestBody.email || (requestBody.name.split(' ')[0].toLowerCase() + "@elmanantial.com"),
            password: requestBody.password || "12345",
            avatar: requestBody.avatar || requestBody.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
          };
          db.users.push(newUser);
          writeLocalDb(db);
          responseData = newUser;
          responseStatus = 201;
        } 
        else if (url === '/api/dashboard' && method === 'GET') {
          const todayLiters = db.milkingRecords.reduce((sum, rec) => sum + rec.liters, 0);
          const activeUnitsCount = db.units.filter(u => u.status === 'Activa').length;
          const criticalItemsCount = db.inventory.filter(i => i.status === 'CRÍTICO').length;

          responseData = {
            todayLiters: parseFloat(todayLiters.toFixed(1)),
            activeUnits: activeUnitsCount,
            criticalStockAlerts: criticalItemsCount,
            milkingRecords: db.milkingRecords.slice(0, 5),
            healthyPercentage: db.animals.length > 0 ? Math.round((db.animals.filter(a => a.status === 'Saludable').length / db.animals.length) * 100) : 100,
            units: db.units
          };
        } 
        else if (url === '/api/inventory' && method === 'GET') {
          responseData = db.inventory;
        } 
        else if (url === '/api/inventory' && method === 'POST') {
          const newItem = {
            id: db.inventory.length > 0 ? Math.max(...db.inventory.map(i => i.id)) + 1 : 1,
            name: requestBody.name,
            category: requestBody.category,
            stock: parseFloat(requestBody.stock),
            unit: requestBody.unit || "kg",
            status: requestBody.status || "OK"
          };
          db.inventory.push(newItem);
          writeLocalDb(db);
          responseData = newItem;
          responseStatus = 201;
        } 
        else if (url === '/api/units' && method === 'GET') {
          responseData = db.units;
        } 
        else if (url === '/api/milking' && method === 'GET') {
          responseData = db.milkingRecords;
        } 
        else if (url === '/api/milking' && method === 'POST') {
          const now = new Date();
          let hours = now.getHours();
          const minutes = String(now.getMinutes()).padStart(2, '0');
          const ampm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12 || 12;
          const timeStr = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
          const dateStr = now.toISOString().split('T')[0];

          const newRecord = {
            id: db.milkingRecords.length > 0 ? Math.max(...db.milkingRecords.map(m => m.id)) + 1 : 1,
            unitName: requestBody.unitName,
            liters: parseFloat(requestBody.liters),
            shift: requestBody.shift === 'morning' ? 'Mañana' : 'Tarde',
            time: timeStr,
            status: "VERIFICADO",
            date: dateStr
          };
          db.milkingRecords.unshift(newRecord);
          writeLocalDb(db);
          responseData = newRecord;
          responseStatus: 201;
        } 
        else if (url === '/api/animals' && method === 'GET') {
          responseData = db.animals;
        } 
        else if (url === '/api/health-summary' && method === 'GET') {
          responseData = {
            healthyPercentage: 100,
            inTreatment: 0,
            underObservation: 0,
            birthsThisMonth: 0,
            checkups: db.checkups,
            animals: db.animals,
            healthEvents: db.healthEvents
          };
        } 
        else if (url === '/api/reports' && method === 'GET') {
          responseData = {
            totalLiters: 1450,
            avgLitersPerCow: 18.4,
            projectionNextMonth: 1566,
            chartData: [],
            ranking: [{ rank: 1, name: "Lote A", liters: "800" }, { rank: 2, name: "Lote B", liters: "650" }],
            records: db.milkingRecords
          };
        } 
        else {
          responseData = { error: "Not found" };
          responseStatus = 404;
        }
      } catch (err) {
        responseData = { error: "Internal server error mock" };
        responseStatus = 500;
      }

      const responseInit = {
        status: responseStatus,
        statusText: responseStatus === 200 || responseStatus === 201 ? 'OK' : 'Error',
        headers: { 'Content-Type': 'application/json' }
      };

      return Promise.resolve(new Response(JSON.stringify(responseData), responseInit));
    };
  }
})();
