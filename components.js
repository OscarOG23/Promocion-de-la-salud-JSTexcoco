/* ================================================
   COMPONENTS.JS — Navbar y Footer compartidos
   Se inyecta en todas las páginas HTML.
   Modifica este archivo para cambiar el menú
   en todo el sitio de una sola vez.
   ================================================ */

(function () {
  /* ── 1. HTML del navbar ── */
  const TOP_BAR = `
  <div class="top-bar">
    <div class="container top-bar-inner">
      <span><strong>ISEM</strong> — Instituto de Salud del Estado de México</span>
      <a href="tel:5959531884" class="top-bar-contact">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.3 19.79 19.79 0 01.22 2.62 2 2 0 012.2.5H5.1a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.41a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
        595 953 1884 · 595 953 1945
      </a>
    </div>
  </div>`;

  const CHEVRON = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>`;

  const NAV_HTML = `
  ${TOP_BAR}
  <header class="navbar" id="navbar">
    <div class="container navbar-inner">
      <a href="index.html" class="brand">
        <div class="brand-icon">
          <img src="assets/img/logo-ps.png" alt="Promoción a la Salud ISEM"
               onerror="this.style.display='none';this.parentElement.textContent='PS'">
        </div>
        <div class="brand-text">
          <span class="brand-main">Promoción a la Salud</span>
          <span class="brand-sub">Jurisdicción Sanitaria Texcoco</span>
        </div>
      </a>

      <nav class="nav-links" id="nav-links">
        <a href="index.html" class="nav-link" data-page="index">Inicio</a>

        <div class="nav-dropdown">
          <button class="nav-link dropdown-toggle" data-page="promocion">
            Promoción de la Salud ${CHEVRON}
          </button>
          <div class="dropdown-menu">
            <a href="promocion.html#determinantes" class="dropdown-item">Determinantes Sociales</a>
            <a href="promocion.html#paquete"        class="dropdown-item">Paquete Garantizado</a>
            <a href="promocion.html#material"       class="dropdown-item">Material Educativo</a>
            <a href="promocion.html#campanas"       class="dropdown-item">Campañas</a>
            <a href="promocion.html#estilos"        class="dropdown-item">Estilos de Vida</a>
            <a href="promocion.html#alimentacion"   class="dropdown-item">Alimentación</a>
            <a href="promocion.html#actividad"      class="dropdown-item">Actividad Física</a>
            <a href="promocion.html#evidencias"     class="dropdown-item">Evidencias</a>
          </div>
        </div>

        <div class="nav-dropdown">
          <button class="nav-link dropdown-toggle" data-page="adicciones">
            Adicciones ${CHEVRON}
          </button>
          <div class="dropdown-menu">
            <a href="adicciones.html#prevencion"    class="dropdown-item">Prevención</a>
            <a href="adicciones.html#riesgo"        class="dropdown-item">Factores de Riesgo</a>
            <a href="adicciones.html#tamizajes"     class="dropdown-item">Tamizajes</a>
            <a href="adicciones.html#capacitacion"  class="dropdown-item">Capacitación</a>
            <a href="adicciones.html#evidencias"    class="dropdown-item">Evidencias</a>
            <a href="adicciones.html#reportes"      class="dropdown-item">Reportes</a>
          </div>
        </div>

        <div class="nav-dropdown">
          <button class="nav-link dropdown-toggle" data-page="salud-mental">
            Salud Mental ${CHEVRON}
          </button>
          <div class="dropdown-menu">
            <a href="salud-mental.html#bienestar"   class="dropdown-item">Promoción del Bienestar</a>
            <a href="salud-mental.html#suicidio"    class="dropdown-item">Prevención del Suicidio</a>
            <a href="salud-mental.html#violencia"   class="dropdown-item">Violencia</a>
            <a href="salud-mental.html#estres"      class="dropdown-item">Estrés y Ansiedad</a>
            <a href="salud-mental.html#infancias"   class="dropdown-item">Infancias y Adolescencia</a>
            <a href="salud-mental.html#evidencias"  class="dropdown-item">Evidencias y Reportes</a>
          </div>
        </div>

        <div class="nav-dropdown">
          <button class="nav-link dropdown-toggle" data-page="entornos">
            Entornos Saludables ${CHEVRON}
          </button>
          <div class="dropdown-menu">
            <a href="entornos.html#escuelas"        class="dropdown-item">Escuelas</a>
            <a href="entornos.html#comunidades"     class="dropdown-item">Comunidades</a>
            <a href="entornos.html#laborales"       class="dropdown-item">Espacios Laborales (ELHT)</a>
            <a href="entornos.html#unidades"        class="dropdown-item">Unidades de Salud</a>
            <a href="entornos.html#evidencias"      class="dropdown-item">Evidencias</a>
          </div>
        </div>

        <a href="biblioteca.html"  class="nav-link" data-page="biblioteca">Biblioteca</a>
        <a href="reportes.html"    class="nav-link" data-page="reportes">Reportes</a>
        <a href="directorio.html"  class="nav-link" data-page="directorio">Directorio</a>
      </nav>

      <button class="menu-toggle" id="menu-toggle" aria-label="Menú" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>`;

  /* ── 2. HTML del footer ── */
  const FOOTER_HTML = `
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <div class="brand-icon small">
          <img src="assets/img/logo-ps.png" alt="Promoción a la Salud"
               onerror="this.style.display='none';this.parentElement.textContent='PS'">
        </div>
        <div>
          <strong>Promoción a la Salud</strong>
          <span>Jurisdicción Sanitaria Texcoco · ISEM</span>
        </div>
      </div>
      <div class="footer-links">
        <a href="index.html">Inicio</a>
        <a href="promocion.html">Promoción</a>
        <a href="adicciones.html">Adicciones</a>
        <a href="salud-mental.html">Salud Mental</a>
        <a href="entornos.html">Entornos</a>
        <a href="biblioteca.html">Biblioteca</a>
        <a href="reportes.html">Reportes</a>
        <a href="directorio.html">Directorio</a>
      </div>
      <div class="footer-legal">
        <span>© 2025 Jurisdicción Sanitaria Texcoco — ISEM</span>
        <span>Gobierno del Estado de México</span>
      </div>
    </div>
  </footer>`;

  /* ── 3. Inyección ── */
  const navEl    = document.getElementById('site-nav');
  const footerEl = document.getElementById('site-footer');
  if (navEl)    navEl.innerHTML    = NAV_HTML;
  if (footerEl) footerEl.innerHTML = FOOTER_HTML;

  /* ── 4. Marcar el link activo según la página actual ── */
  const filename = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  document.querySelectorAll('.nav-link[data-page], .dropdown-toggle[data-page]').forEach(link => {
    if (link.dataset.page === filename) link.classList.add('active');
  });
})();
