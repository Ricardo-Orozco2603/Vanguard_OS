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
});