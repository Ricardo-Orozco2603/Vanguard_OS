document.addEventListener("DOMContentLoaded", () => {
    
    // 1. ASIGNACIÓN E INYECCIÓN DE ICONOS VECTORIALES (LUCIDE)
    lucide.createIcons();

    // 2. SISTEMA DE RUTAS DINÁMICAS (HUD TABS)
    const navButtons = document.querySelectorAll(".nav-item");
    const viewSections = document.querySelectorAll(".view-section");

    navButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetViewId = button.getAttribute("data-target");

            // Limpieza de estados previos
            navButtons.forEach(btn => btn.classList.remove("active"));
            viewSections.forEach(view => view.classList.remove("active"));

            // Despliegue de la sección objetivo
            button.classList.add("active");
            const targetView = document.getElementById(targetViewId);
            if (targetView) {
                targetView.classList.add("active");
            }
        });
    });

    // 3. TELEMETRÍA DEL OPERADOR (ESTADO GLOBAL CONTROLADO)
    const Operador = {
        nombre: "L. RODRÍGUEZ",
        rango: "Operador Elite",
        division: "SENTINEL",
        nivel: 4,
        xpActual: 720,
        xpTarget: 1000,
        rachaDias: 12
    };

    function refreshOperationalHUD() {
        document.getElementById("op-name").innerText = Operador.nombre;
        document.getElementById("op-rango").innerText = Operador.rango.toUpperCase();
        document.getElementById("op-division").innerHTML = `<i data-lucide="shield" class="icon-inline"></i> DIV: ${Operador.division}`;
        document.getElementById("op-nivel").innerText = Operador.nivel < 10 ? `0${Operador.nivel}` : Operador.nivel;
        document.getElementById("op-racha").innerText = Operador.rachaDias;
        document.getElementById("xp-actual").innerText = Operador.xpActual;
        document.getElementById("xp-target").innerText = Operador.xpTarget;
        
        const porcentajeXp = (Operador.xpActual / Operador.xpTarget) * 100;
        
        setTimeout(() => {
            document.getElementById("xp-bar-inner").style.width = `${porcentajeXp}%`;
        }, 150);
        
        lucide.createIcons();
    }

    refreshOperationalHUD();

    // 4. PLAN SEMANAL DE ENTRENAMIENTO (OPERACIONES)
    // 3 días BJJ · 3 días Entreno (Pesas) · 1 día Descanso
    const planSemanal = [
        { dia: "LUN", tipo: "BJJ",      titulo: "Grappling / Newaza",     detalle: "Técnica de suelo, drilling y rolling posicional.", icono: "swords",   foco: "TÉCNICA" },
        { dia: "MAR", tipo: "ENTRENO",  titulo: "Fuerza · Tren Superior", detalle: "Press, dominadas y trabajo de empuje/tracción.",  icono: "dumbbell", foco: "FUERZA" },
        { dia: "MIÉ", tipo: "BJJ",      titulo: "Sparring / Randori",     detalle: "Combate libre, transiciones y control de ritmo.",  icono: "swords",   foco: "COMBATE" },
        { dia: "JUE", tipo: "ENTRENO",  titulo: "Fuerza · Tren Inferior", detalle: "Sentadilla, peso muerto y trabajo de cadena posterior.", icono: "dumbbell", foco: "POTENCIA" },
        { dia: "VIE", tipo: "BJJ",      titulo: "Competición / Drills",   detalle: "Simulación de combate y sumisiones de alto porcentaje.", icono: "swords", foco: "INTENSIDAD" },
        { dia: "SÁB", tipo: "ENTRENO",  titulo: "Acondicionamiento",      detalle: "Metabólico, core y movilidad funcional completa.", icono: "activity", foco: "RESISTENCIA" },
        { dia: "DOM", tipo: "DESCANSO", titulo: "Recuperación Activa",    detalle: "Movilidad ligera, descanso y regeneración muscular.", icono: "moon", foco: "RECARGA" }
    ];

    const tipoConfig = {
        "BJJ":      { clase: "type-bjj",      label: "BJJ" },
        "ENTRENO":  { clase: "type-entreno",  label: "ENTRENO" },
        "DESCANSO": { clase: "type-descanso", label: "DESCANSO" }
    };

    function renderPlanSemanal() {
        const contenedor = document.getElementById("train-week");
        if (!contenedor) return;

        // Día actual (0 = Domingo ... mapeado a nuestro array Lun-Dom)
        const jsDay = new Date().getDay();
        const indexHoy = jsDay === 0 ? 6 : jsDay - 1;

        contenedor.innerHTML = planSemanal.map((d, i) => {
            const cfg = tipoConfig[d.tipo];
            const esHoy = i === indexHoy;
            return `
                <div class="train-day ${cfg.clase} ${esHoy ? "is-today" : ""}">
                    <div class="train-day-side">
                        <span class="train-day-name">${d.dia}</span>
                        ${esHoy ? '<span class="train-today-tag">HOY</span>' : ""}
                    </div>
                    <div class="train-day-icon">
                        <i data-lucide="${d.icono}"></i>
                    </div>
                    <div class="train-day-body">
                        <div class="train-day-top">
                            <span class="train-day-title">${d.titulo}</span>
                            <span class="train-badge">${cfg.label}</span>
                        </div>
                        <p class="train-day-detail">${d.detalle}</p>
                        <span class="train-day-foco">FOCO // ${d.foco}</span>
                    </div>
                </div>
            `;
        }).join("");

        lucide.createIcons();
    }

    renderPlanSemanal();
});
