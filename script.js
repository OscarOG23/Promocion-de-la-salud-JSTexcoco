/* ================================================
   PROMOCIÓN A LA SALUD — JS Premium
   ================================================ */

// ── Reduced motion preference ──────────────────
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Scroll progress bar ────────────────────────
const scrollBar = document.createElement('div');
scrollBar.id = 'scroll-progress';
document.body.prepend(scrollBar);

function updateScrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  scrollBar.style.width = pct + '%';
}

// ── Navbar: scroll effect + clase activa ───────
const navbar  = document.getElementById('navbar');
const heroBg  = document.querySelector('.hero-bg-pattern');

// Un solo oyente para todo lo que depende del scroll, agrupado en un
// frame: antes había dos y el paralaje escribía `transform` en cada
// evento, forzando un recálculo de estilo por evento.
let scrollPendiente = false;
window.addEventListener('scroll', () => {
  if (scrollPendiente) return;
  scrollPendiente = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 20);
    updateScrollProgress();
    if (heroBg && !prefersReducedMotion) {
      heroBg.style.transform = `translateY(${y * 0.18}px)`;
    }
    scrollPendiente = false;
  });
}, { passive: true });

// ── Menú: hamburguesa + desplegables ───────────
const menuToggle  = document.getElementById('menu-toggle');
const navLinks    = document.getElementById('nav-links');
const dropToggles = [...document.querySelectorAll('.dropdown-toggle')];

/** Cierra el menú móvil dejando el estado ARIA sincronizado. */
function closeMenu() {
  navLinks.classList.remove('open');
  menuToggle.classList.remove('active');
  menuToggle.setAttribute('aria-expanded', 'false');
}

/** Cierra todos los desplegables salvo el indicado. */
function closeDropdowns(except) {
  dropToggles.forEach(t => {
    if (t === except) return;
    t.setAttribute('aria-expanded', 'false');
    t.parentElement.classList.remove('open');
  });
}

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.classList.toggle('active', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  if (!isOpen) closeDropdowns();
});

// Los desplegables responden al clic (táctil y teclado), no solo al hover:
// en tabletas > 900px el hover no existe y el menú quedaba inalcanzable.
dropToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const willOpen = toggle.getAttribute('aria-expanded') !== 'true';
    closeDropdowns(toggle);
    toggle.setAttribute('aria-expanded', String(willOpen));
    toggle.parentElement.classList.toggle('open', willOpen);
  });
});

// Escape cierra lo abierto y devuelve el foco al control que lo abrió
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const openToggle = dropToggles.find(t => t.getAttribute('aria-expanded') === 'true');
  if (openToggle) {
    closeDropdowns();
    openToggle.focus();
    return;
  }
  if (navLinks.classList.contains('open')) {
    closeMenu();
    menuToggle.focus();
  }
});

// Cerrar al hacer clic fuera
document.addEventListener('click', (e) => {
  if (navbar.contains(e.target)) return;
  closeMenu();
  closeDropdowns();
});

// En móvil, dejar abierto el apartado de la página actual
const activeToggle = document.querySelector('.dropdown-toggle.active');
if (activeToggle && window.matchMedia('(max-width: 900px)').matches) {
  activeToggle.setAttribute('aria-expanded', 'true');
  activeToggle.parentElement.classList.add('open');
}

// ── Active nav link en scroll ──────────────────
const sections = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-link[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.25, rootMargin: '-60px 0px 0px 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ── Smooth scroll con offset dinámico ─────────
// El skip link se excluye: necesita la navegación nativa para
// que el foco llegue de verdad al <main>, no solo el scroll.
document.querySelectorAll('a[href^="#"]:not(.skip-link)').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return; // placeholder sin destino: evitar querySelector('#') inválido
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    closeMenu();
    closeDropdowns();
  });
});

// ── Hero scroll hint click ─────────────────────
const scrollHint = document.querySelector('.hero-scroll-hint');
if (scrollHint) {
  scrollHint.addEventListener('click', () => {
    const quickAccess = document.querySelector('.quick-access');
    if (quickAccess) quickAccess.scrollIntoView({ behavior: 'smooth' });
  });
}

// ── Parallax en el hero (sutil) ────────────────
if (!prefersReducedMotion) {
  // Partículas flotantes en el hero
  const heroEl = document.querySelector('.hero');
  if (heroEl) {
    const particlesWrap = document.createElement('div');
    particlesWrap.className = 'hero-particles';
    heroEl.appendChild(particlesWrap);

    const count = window.matchMedia('(max-width: 900px)').matches ? 8 : 18;
    for (let i = 0; i < count; i++) {
      const span = document.createElement('span');
      const size = Math.random() * 4 + 2;
      const x    = Math.random() * 100;
      const dur  = Math.random() * 8 + 5;
      const delay = Math.random() * 6;
      span.style.cssText = `
        left: ${x}%;
        bottom: ${Math.random() * 20}%;
        width: ${size}px;
        height: ${size}px;
        --dur: ${dur}s;
        --delay: -${delay}s;
      `;
      particlesWrap.appendChild(span);
    }
  }
}

// ── Button ripple effect ───────────────────────
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    if (prefersReducedMotion) return;
    const rect   = btn.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height) * 2;
    const x      = e.clientX - rect.left - size / 2;
    const y      = e.clientY - rect.top  - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    ripple.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
    `;
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});

// ── Reveal de tarjetas con IntersectionObserver ─
function createRevealObserver() {
  if (prefersReducedMotion) {
    // Sin animaciones: mostrar todo de inmediato
    document.querySelectorAll('.reveal').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseFloat(el.dataset.delay || '0') +
                    parseFloat(getComputedStyle(el).getPropertyValue('--stagger') || '0');
      setTimeout(() => {
        el.classList.add('visible');
      }, delay);
      io.unobserve(el);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

// Añadir clase reveal a todos los elementos animables
function initRevealElements() {
  // Estos selectores apuntaban a componentes que ya no existen
  // (.content-card, .program-card, .sm-card, .resource-card,
  // .alert-card, .sij-placeholder): la animación de entrada solo
  // alcanzaba a .section-header, .ci-item y .qa-card.
  // Se excluyen a propósito .material-card y .directory-card: su
  // visibilidad la gobierna el filtro, que escribe opacity en línea.
  const selectors = [
    '.section-header',
    '.nav-card',
    '.det-card',
    '.subsec-card',
    '.ev-paso',
    '.ci-item',
  ];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.classList.add('reveal');
    });
  });

  // Quick access cards con stagger manual
  document.querySelectorAll('.qa-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.dataset.delay = i * 50;
  });
}

// ── Formulario de contacto ─────────────────────
function handleForm(e) {
  e.preventDefault();
  const btn     = e.target.querySelector('button[type="submit"]');
  const success = document.getElementById('form-success');

  // Estado cargando
  btn.disabled  = true;
  btn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
         style="animation:spin .8s linear infinite">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
    Enviando…
  `;

  // Inyectar keyframe de spin si no existe
  if (!document.getElementById('spin-style')) {
    const st = document.createElement('style');
    st.id = 'spin-style';
    st.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
    document.head.appendChild(st);
  }

  setTimeout(() => {
    btn.disabled   = false;
    btn.innerHTML  = 'Enviar mensaje';
    success.style.display = 'flex';
    e.target.reset();
    setTimeout(() => {
      success.style.animation = 'fade-in 0.3s ease reverse forwards';
      setTimeout(() => { success.style.display = 'none'; success.style.animation = ''; }, 300);
    }, 5000);
  }, 1400);
}

// ── Stagger en section headers ─────────────────
if (!prefersReducedMotion) {
  const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const header = entry.target;
      const tag = header.querySelector('.section-tag');
      const h2  = header.querySelector('h2');
      const p   = header.querySelector('p');
      [tag, h2, p].forEach((el, i) => {
        if (!el) return;
        el.style.opacity   = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 500ms ${i * 80}ms cubic-bezier(0.22,1,0.36,1),
                               transform 500ms ${i * 80}ms cubic-bezier(0.22,1,0.36,1)`;
        setTimeout(() => {
          el.style.opacity   = '1';
          el.style.transform = 'translateY(0)';
        }, 50 + i * 80);
      });
      headerObserver.unobserve(header);
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.section-header').forEach(h => headerObserver.observe(h));
}

// ── Inicialización ─────────────────────────────
updateScrollProgress();

// ══════════════════════════════════════════════
//  CARRUSEL DE CAMPAÑAS
// ══════════════════════════════════════════════

/** Renderiza slides desde CAMPAIGNS (campaigns.js) */
function renderCampaigns() {
  const track = document.querySelector('.carousel-track');
  if (!track || typeof CAMPAIGNS === 'undefined') return;

  const ICONS = {
    pdf:  `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
    link: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>`,
    ext:  `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
    mail: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    slides: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
    video: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>`,
    image: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
    doc:  `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  };

  track.innerHTML = CAMPAIGNS.map(c => `
    <article class="carousel-slide" data-color="${c.color}" role="group" aria-label="${c.titulo}">
      <div class="cs-body">
        <div>
          <span class="cs-tag">Campaña activa</span>
          <h2 class="cs-title">${c.titulo}</h2>
        </div>
        <div class="cs-meta">
          <div class="cs-meta-row">
            <strong>Objetivo</strong>
            <span>${c.objetivo}</span>
          </div>
          <div class="cs-meta-row">
            <strong>Población</strong>
            <span>${c.poblacion}</span>
          </div>
          <div class="cs-meta-row">
            <strong>Evidencia</strong>
            <span>${c.evidenciaSugerida}</span>
          </div>
        </div>
        <div class="cs-actions">
          ${c.materiales.map(m => `
            <a href="${m.url}" class="cs-btn"
               ${m.url.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>
              ${ICONS[m.icono] || ICONS.link}
              ${m.tipo}
            </a>
          `).join('')}
        </div>
      </div>
      <div class="cs-accent" aria-hidden="true">
        <span class="cs-accent-label">Vigencia hasta</span>
        <span style="font-size:1.6rem;font-weight:300;letter-spacing:-.01em">${c.vigencia}</span>
      </div>
    </article>
  `).join('');
}

/** Inicializa la lógica del carrusel (prev/next/dots/swipe) */
function initCarousel() {
  const wrap = document.querySelector('.carousel-wrap');
  if (!wrap) return;

  const track  = wrap.querySelector('.carousel-track');
  const slides = [...wrap.querySelectorAll('.carousel-slide')];
  const dotsEl = wrap.querySelector('.carousel-dots');
  const prevBtn = wrap.querySelector('.carousel-btn.prev');
  const nextBtn = wrap.querySelector('.carousel-btn.next');

  if (!slides.length) return;

  let current  = 0;
  let startX   = 0;
  let dragging = false;

  // ─ Crear dots ─
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className   = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Ir a campaña ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsEl?.appendChild(dot);
  });

  function updateDots() {
    dotsEl?.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function goTo(idx) {
    current = ((idx % slides.length) + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    updateDots();
    // Parallax interno: el contenido del slide entra escalonado
    if (!prefersReducedMotion) {
      const active = slides[current];
      active.querySelectorAll('.cs-tag, .cs-title, .cs-meta, .cs-actions').forEach((el, i) => {
        el.style.transition = 'none';
        el.style.opacity   = '0';
        el.style.transform = 'translateX(26px)';
        void el.offsetWidth; // forzar reflow: el estado oculto debe aplicarse antes de animar
        el.style.transition = `opacity 420ms ${i * 70}ms var(--ease-out),
                               transform 420ms ${i * 70}ms var(--ease-out)`;
        el.style.opacity   = '1';
        el.style.transform = 'translateX(0)';
      });
    }
  }

  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));

  // ─ Teclado ─
  wrap.setAttribute('tabindex', '0');
  wrap.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { goTo(current - 1); e.preventDefault(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); e.preventDefault(); }
  });

  // ─ Touch / swipe ─
  track.addEventListener('touchstart', (e) => {
    startX   = e.touches[0].clientX;
    dragging = true;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    if (!dragging) return;
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 48) goTo(diff > 0 ? current + 1 : current - 1);
    dragging = false;
  }, { passive: true });

  // ─ Drag (mouse) ─
  track.addEventListener('mousedown', (e) => {
    startX   = e.clientX;
    dragging = true;
    track.style.cursor = 'grabbing';
  });
  document.addEventListener('mouseup', (e) => {
    if (!dragging) return;
    const diff = startX - e.clientX;
    if (Math.abs(diff) > 48) goTo(diff > 0 ? current + 1 : current - 1);
    dragging = false;
    track.style.cursor = '';
  });
}

// ══════════════════════════════════════════════
//  RECURSOS — índice único (assets/data/recursos.js)
//  Sustituye a renderBiblioteca / renderTalleres /
//  renderFormularios / renderPsicologia: los cuatro
//  producían la misma .material-card desde silos distintos.
// ══════════════════════════════════════════════

const PROGRAMA_LABELS = {
  transversal:    'Transversal',
  promocion:      'Promoción',
  adicciones:     'Adicciones',
  'salud-mental': 'Salud Mental',
  entornos:       'Entornos',
};

const TIPO_LABELS = {
  formato:      'Formato',
  normativa:    'Lineamiento',
  nom:          'NOM',
  manual:       'Manual',
  grafico:      'Material gráfico',
  presentacion: 'Presentación',
  documento:    'Doc. oficial',
  taller:       'Taller',
  formulario:   'Formulario',
  enlace:       'Sitio externo',
};

const TEMA_LABELS = {
  // Los 9 determinantes sociales (= las 9 det-card de promocion.html)
  alimentacion:             'Alimentación',
  actividad:                'Actividad Física',
  'salud-sexual':           'Salud Sexual y Reproductiva',
  'entornos-fisicos':       'Entornos Físicos',
  'entornos-psicosociales': 'Entornos Psicosociales',
  infancia:                 'Crecimiento Infantil',
  diversidad:               'Diversidad y Género',
  'derecho-salud':          'Derecho a la Salud',
  participacion:            'Participación Social',
  // Entornos saludables
  escuelas:     'Escuelas',
  comunidades:  'Comunidades',
  laborales:    'Espacios laborales',
  unidades:     'Unidades de salud',
  // Otros
  psicologia: 'Psicología',
  ferias:     'Ferias de salud',
};

const ICON_DOWNLOAD = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
const ICON_EXTERNAL = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
const ICON_FOLDER   = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>`;
const ICON_CLOCK    = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>`;

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const temasDe = r => r.tema || [];
const etiquetaTema = t => TEMA_LABELS[t] || t;

/** Minúsculas y sin acentos: «cedula» debe encontrar «Cédula». */
function normaliza(s) {
  return String(s ?? '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/** Texto plano sobre el que busca el campo de búsqueda. */
function textoBuscable(r) {
  return normaliza([
    r.titulo, r.descripcion, r.subtema, r.publico, r.modalidad,
    PROGRAMA_LABELS[r.programa], TIPO_LABELS[r.tipo],
    ...temasDe(r).map(etiquetaTema),
  ].filter(Boolean).join(' '));
}

/** Todas las palabras de la consulta deben aparecer (en cualquier orden). */
function coincideTexto(texto, consulta) {
  const palabras = normaliza(consulta).split(/\s+/).filter(Boolean);
  return palabras.every(p => texto.includes(p));
}

/**
 * Una tarjeta de recurso.
 * `estado: 'pendiente'` NO produce un enlace: antes se renderizaba
 * href="#", que parecía funcional y no llevaba a ninguna parte.
 */
function recursoCard(r) {
  const ext       = /^https?:/i.test(r.url || '');
  const pendiente = r.estado === 'pendiente';

  const meta = [
    r.subtema     ? `<span><strong>Materia:</strong> ${esc(r.subtema)}</span>` : '',
    temasDe(r).length ? `<span><strong>Tema:</strong> ${temasDe(r).map(t => esc(etiquetaTema(t))).join(' · ')}</span>` : '',
    r.publico     ? `<span><strong>Público:</strong> ${esc(r.publico)}</span>` : '',
    r.modalidad   ? `<span><strong>Modalidad:</strong> ${esc(r.modalidad)}</span>` : '',
    r.actualizado ? `<span><strong>Actualizado:</strong> ${esc(r.actualizado)}</span>` : '',
  ].join('');

  // aria-label descriptivo: la lista de enlaces del lector de pantalla
  // era 40 entradas idénticas de «Descargar PDF».
  const accion = pendiente
    ? `<span class="mc-btn is-pending">${ICON_CLOCK} Próximamente</span>`
    : `<a href="${esc(r.url)}" class="mc-btn" aria-label="${esc(r.accion)}: ${esc(r.titulo)}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ''}>
           ${ext ? ICON_EXTERNAL : ICON_DOWNLOAD} ${esc(r.accion)}
         </a>`;

  const complementos = r.complementos
    ? `<a href="${esc(r.complementos)}" class="mc-btn outline mc-btn-sec" aria-label="Complementos: ${esc(r.titulo)}" target="_blank" rel="noopener noreferrer">${ICON_FOLDER} Complementos</a>`
    : '';

  return `
      <article class="material-card"
               data-programa="${esc(r.programa)}"
               data-tipo="${esc(r.tipo)}"
               data-tema="${esc(temasDe(r).join(' '))}"
               data-buscar="${esc(textoBuscable(r))}">
        <div class="mc-cat ${esc(r.tipo)}">${esc(TIPO_LABELS[r.tipo] || r.tipo)}</div>
        <h3 class="mc-title">${esc(r.titulo)}</h3>
        ${r.descripcion ? `<p class="mc-desc">${esc(r.descripcion)}</p>` : ''}
        <div class="mc-meta">${meta}</div>
        ${accion}
        ${complementos}
      </article>`;
}

/**
 * Rellena cada rejilla `[data-recursos]`. Las facetas se declaran
 * en el HTML, así que una página de programa pide solo lo suyo:
 *   <div class="material-grid" data-recursos data-programa="entornos"
 *        data-tema="escuelas" data-limite="6"></div>
 */
function renderRecursos() {
  const grids = document.querySelectorAll('[data-recursos]');
  if (!grids.length) return;

  if (typeof RECURSOS === 'undefined' || !RECURSOS.length) {
    grids.forEach(g => { g.innerHTML = '<p class="empty-state">Sin recursos por el momento.</p>'; });
    return;
  }

  grids.forEach(grid => {
    const f = grid.dataset;
    const tipos = f.tipo ? f.tipo.split(/\s+/) : null;
    const temas = f.tema ? f.tema.split(/\s+/) : null;

    let items = RECURSOS.filter(r =>
      (!f.programa || r.programa === f.programa) &&
      (!tipos || tipos.includes(r.tipo)) &&
      (!temas || temas.some(t => temasDe(r).includes(t)))
    );

    const total  = items.length;
    const limite = parseInt(f.limite, 10);
    const recortado = limite > 0 && total > limite;
    if (recortado) items = items.slice(0, limite);

    grid.innerHTML = items.map(recursoCard).join('') ||
      '<p class="empty-state">Sin recursos en este apartado todavía.</p>';

    // Mismo trato que el encabezado del filtro: el grupo dice cuántos
    // trae. En entornos y reportes, que no tienen filtro, es la única
    // pista de cuánto hay antes de ponerse a leer.
    const titulo = grid.previousElementSibling;
    if (titulo && titulo.classList.contains('subsec-group')) {
      let num = titulo.querySelector('.sg-count');
      if (!num) {
        num = document.createElement('span');
        num.className = 'sg-count';
        titulo.append(' ', num);
      }
      num.textContent = total;
    }

    // Divulgación progresiva: en vez de volcar 62 tarjetas, se muestran
    // las más usadas y se enlaza el resto ya filtrado en la Biblioteca.
    const previo = grid.nextElementSibling;
    if (previo && previo.classList.contains('grid-more')) previo.remove();
    if (recortado) {
      const params = new URLSearchParams();
      if (f.programa) params.set('programa', f.programa);
      if (f.tipo)     params.set('tipo', f.tipo);
      if (f.tema)     params.set('tema', f.tema);
      const mas = document.createElement('p');
      mas.className = 'grid-more';
      mas.innerHTML = `<a href="biblioteca.html?${params}" class="grid-more-link">
        Ver los ${total} recursos de este apartado en la Biblioteca →</a>`;
      grid.after(mas);
    }
  });
}

// ══════════════════════════════════════════════
//  BUSCADOR GLOBAL
//  Un solo punto de entrada a los 178 recursos, desde
//  cualquier página. Antes había que saber en qué
//  programa vivía un material para poder encontrarlo.
// ══════════════════════════════════════════════

/** Atajos que se ofrecen con el campo vacío (descubrimiento). */
const BUSQUEDA_SUGERENCIAS = [
  { texto: 'Formatos',          url: 'biblioteca.html?tipo=formato' },
  { texto: 'Catálogo de talleres', url: 'biblioteca.html?tipo=taller' },
  { texto: 'Reporte mensual',   url: 'reportes.html#formularios' },
  { texto: 'Escuelas',          url: 'biblioteca.html?programa=entornos&tema=escuelas' },
  { texto: 'NOMs',              url: 'biblioteca.html?tipo=nom' },
  { texto: 'Psicología',        url: 'recursos-psicologia.html' },
];

const ORDEN_PROGRAMAS = ['transversal', 'promocion', 'adicciones', 'salud-mental', 'entornos'];
const MAX_POR_PROGRAMA = 5;

function initBuscadorGlobal() {
  const dlg = document.getElementById('search-dialog');
  const btn = document.getElementById('nav-search-btn');
  if (!dlg || !btn) return;

  // Sin índice cargado no hay nada que buscar: se retira el botón
  // en vez de dejar un control que no hace nada.
  if (typeof RECURSOS === 'undefined' || !RECURSOS.length) {
    btn.remove();
    dlg.remove();
    return;
  }

  // En Mac el atajo es Cmd, no Ctrl: la etiqueta debe decir la verdad
  const esMac = /Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent || '');
  if (esMac) {
    const kbd = btn.querySelector('.nsb-kbd');
    if (kbd) kbd.textContent = '⌘ K';
    btn.setAttribute('aria-keyshortcuts', 'Meta+K');
  }

  const input    = dlg.querySelector('#buscador-global');
  const salida   = dlg.querySelector('#sd-results');
  const estadoEl = dlg.querySelector('.sd-status');
  const cerrar   = dlg.querySelector('.sd-close');

  // El texto buscable se calcula una vez, no en cada pulsación
  const INDICE = RECURSOS.map(r => ({ r, texto: textoBuscable(r) }));

  function sugerencias() {
    estadoEl.textContent = '';
    salida.innerHTML = `
      <p class="sd-hint">Escribe para buscar entre ${RECURSOS.length} recursos, o empieza por aquí:</p>
      <div class="sd-chips">
        ${BUSQUEDA_SUGERENCIAS.map(s =>
          `<a href="${s.url}" class="sd-chip">${esc(s.texto)}</a>`).join('')}
      </div>`;
  }

  function fila(r) {
    const ext = /^https?:/i.test(r.url || '');
    const pendiente = r.estado === 'pendiente';
    const tipo = `<span class="sd-tipo ${esc(r.tipo)}">${esc(TIPO_LABELS[r.tipo] || r.tipo)}</span>`;
    const cuerpo = `${tipo}<span class="sd-titulo">${esc(r.titulo)}</span>`;
    return pendiente
      ? `<span class="sd-hit is-pending" aria-disabled="true">${cuerpo}<span class="sd-nota">Próximamente</span></span>`
      : `<a class="sd-hit" href="${esc(r.url)}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ''}>
           ${cuerpo}${ext ? '<span class="sd-nota">Abre en pestaña nueva</span>' : ''}
         </a>`;
  }

  function buscar(consulta) {
    if (!consulta) { sugerencias(); return; }

    const hits = INDICE.filter(x => coincideTexto(x.texto, consulta)).map(x => x.r);

    if (!hits.length) {
      estadoEl.textContent = 'Sin resultados';
      salida.innerHTML = `
        <p class="sd-hint">Nada coincide con «${esc(consulta)}».
        Prueba con menos palabras o revisa la
        <a href="biblioteca.html">Biblioteca completa</a>.</p>`;
      return;
    }

    // Lo que coincide en el título va antes que lo que solo coincide
    // en la descripción o el público.
    const enTitulo = r => coincideTexto(normaliza(r.titulo), consulta) ? 0 : 1;
    hits.sort((a, b) => enTitulo(a) - enTitulo(b));

    const grupos = ORDEN_PROGRAMAS
      .map(p => [p, hits.filter(r => r.programa === p)])
      .filter(([, rs]) => rs.length);

    estadoEl.textContent = `${hits.length} resultado${hits.length !== 1 ? 's' : ''}`;
    salida.innerHTML = grupos.map(([p, rs]) => {
      const extra = rs.length - MAX_POR_PROGRAMA;
      return `
      <section class="sd-group">
        <h2 class="sd-group-title">${esc(PROGRAMA_LABELS[p] || p)} <span>${rs.length}</span></h2>
        ${rs.slice(0, MAX_POR_PROGRAMA).map(fila).join('')}
        ${extra > 0
          ? `<a class="sd-hit sd-more" href="biblioteca.html?programa=${p}&q=${encodeURIComponent(consulta)}">
               Ver los ${rs.length} de ${esc(PROGRAMA_LABELS[p] || p)} →</a>`
          : ''}
      </section>`;
    }).join('') +
      `<a class="sd-all" href="biblioteca.html?q=${encodeURIComponent(consulta)}">
         Ver los ${hits.length} resultados en la Biblioteca →</a>`;
  }

  function abrir() {
    if (!dlg.open) dlg.showModal();
    buscar(input.value.trim());
    input.focus();
    input.select();
  }

  btn.addEventListener('click', abrir);
  cerrar.addEventListener('click', () => dlg.close());

  // Ctrl/⌘+K desde cualquier sitio; «/» solo si no se está escribiendo
  document.addEventListener('keydown', (e) => {
    const escribiendo = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)
                        || document.activeElement.isContentEditable;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); abrir(); return; }
    if (e.key === '/' && !escribiendo && !dlg.open) { e.preventDefault(); abrir(); }
  });

  let t;
  input.addEventListener('input', () => {
    clearTimeout(t);
    t = setTimeout(() => buscar(input.value.trim()), 140);
  });

  // Flechas para recorrer resultados. Son enlaces reales, así que
  // Enter los abre sin código extra y Escape lo cierra <dialog>.
  dlg.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    const hits = [...salida.querySelectorAll('a.sd-hit, a.sd-chip')];
    if (!hits.length) return;
    e.preventDefault();
    const i = hits.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') hits[i < 0 ? 0 : Math.min(i + 1, hits.length - 1)].focus();
    else if (i <= 0) input.focus();
    else hits[i - 1].focus();
  });

  // Clic en el backdrop cierra (el <dialog> ocupa toda la ventana)
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });

  sugerencias();
}

// ══════════════════════════════════════════════
//  FILTROS FACETADOS + BÚSQUEDA
// ══════════════════════════════════════════════

/**
 * Filtra por programa / tipo / tema y texto libre.
 * El estado va a la URL, así que se puede compartir un enlace
 * filtrado y el botón «atrás» del navegador lo deshace.
 */
function initFiltros() {
  const bar = document.querySelector('.filter-bar-wrap');
  if (!bar) return;

  const cards    = [...document.querySelectorAll('.material-card')];
  const botones  = [...bar.querySelectorAll('.filter-btn[data-faceta]')];
  const buscador = document.getElementById('buscador');
  const countEl  = document.querySelector('.filter-count');
  const vacio    = document.querySelector('.filter-empty');
  const encabezado = document.querySelector('.filter-heading');

  // Compatibilidad: `?cat=` era el parámetro anterior. El personal puede
  // tener enlaces guardados o impresos, así que se sigue aceptando.
  const CAT_LEGADO = {
    formatos: 'formato', lineamientos: 'normativa', manuales: 'manual',
    noms: 'nom', grafico: 'grafico', presentacion: 'presentacion',
    documentos: 'documento',
  };

  const params = new URLSearchParams(location.search);
  const catViejo = params.get('cat');
  const estado = {
    programa: params.get('programa') || '',
    tipo:     params.get('tipo') || CAT_LEGADO[catViejo] || '',
    tema:     params.get('tema') || (catViejo && !CAT_LEGADO[catViejo] ? catViejo : ''),
    q:        params.get('q')        || '',
  };

  function coincide(card) {
    const d = card.dataset;
    if (estado.programa && d.programa !== estado.programa) return false;
    if (estado.tipo     && d.tipo     !== estado.tipo)     return false;
    if (estado.tema     && !d.tema.split(' ').includes(estado.tema)) return false;
    if (estado.q && !coincideTexto(d.buscar, estado.q)) return false;
    return true;
  }

  /** Etiqueta legible de una faceta activa. */
  function etiquetaFaceta(faceta, valor) {
    if (faceta === 'programa') return PROGRAMA_LABELS[valor] || valor;
    if (faceta === 'tipo')     return TIPO_LABELS[valor] || valor;
    if (faceta === 'tema')     return etiquetaTema(valor);
    return valor;
  }

  /**
   * Encabezado del grupo activo. Aparece solo cuando hay algún filtro
   * y se va solo al quitarlo: es la respuesta visible a «he pulsado
   * Alimentación», que antes solo se notaba en el botón resaltado.
   */
  function pintarEncabezado(visibles) {
    if (!encabezado) return;
    const activas = ['programa', 'tipo', 'tema']
      .filter(f => estado[f])
      .map(f => ({ faceta: f, valor: estado[f] }));

    const hayAlgo = activas.length || estado.q;
    encabezado.hidden = !hayAlgo;
    encabezado.classList.toggle('visible', !!hayAlgo);
    if (!hayAlgo) { encabezado.innerHTML = ''; return; }

    const chips = activas.map(({ faceta, valor }) => `
      <button type="button" class="fh-chip" data-quitar="${faceta}">
        ${esc(etiquetaFaceta(faceta, valor))}
        <span aria-hidden="true">&times;</span>
        <span class="visually-hidden">Quitar este filtro</span>
      </button>`).join('');
    const chipBusqueda = estado.q ? `
      <button type="button" class="fh-chip" data-quitar="q">
        “${esc(estado.q)}”
        <span aria-hidden="true">&times;</span>
        <span class="visually-hidden">Quitar la búsqueda</span>
      </button>` : '';

    encabezado.innerHTML = `
      <div class="fh-titulo">
        ${activas.map(a => esc(etiquetaFaceta(a.faceta, a.valor))).join(' · ') || 'Búsqueda'}
        <span class="fh-num">${visibles}</span>
      </div>
      <div class="fh-chips">${chips}${chipBusqueda}</div>`;
  }

  function aplicar({ animar = true } = {}) {
    let visibles = 0;
    let entrando = 0;
    cards.forEach(card => {
      const dentro = coincide(card);
      if (dentro) visibles++;

      if (prefersReducedMotion || !animar) {
        card.hidden = !dentro;
        card.classList.remove('sale');
        card.style.cssText = '';
        return;
      }

      if (dentro) {
        // Entra: primero ocupa sitio, luego se desvanece hacia dentro
        if (card.hidden) {
          card.hidden = false;
          card.classList.add('sale');
          void card.offsetWidth;            // forzar reflujo antes de animar
        }
        const retraso = (entrando++ % 8) * 35;
        setTimeout(() => card.classList.remove('sale'), retraso);
      } else if (!card.hidden) {
        // Sale: se desvanece y solo entonces deja de ocupar sitio
        card.classList.add('sale');
        setTimeout(() => {
          if (!coincide(card)) card.hidden = true;
        }, 180);
      }
    });

    // Región `role="status"`: sin esto, quien usa lector de pantalla
    // no recibía ninguna confirmación de que la lista había cambiado.
    if (countEl) countEl.textContent = `${visibles} recurso${visibles !== 1 ? 's' : ''}`;
    if (vacio) vacio.hidden = visibles > 0;
    pintarEncabezado(visibles);

    botones.forEach(b => {
      const activo = (estado[b.dataset.faceta] || '') === b.dataset.valor;
      b.classList.toggle('active', activo);
      b.setAttribute('aria-pressed', String(activo));
    });

    const url = new URLSearchParams();
    Object.entries(estado).forEach(([k, v]) => { if (v) url.set(k, v); });
    history.replaceState(null, '', url.toString() ? `?${url}` : location.pathname);
  }

  botones.forEach(btn => {
    btn.addEventListener('click', () => {
      const { faceta, valor } = btn.dataset;
      estado[faceta] = estado[faceta] === valor ? '' : valor;  // volver a pulsar quita el filtro
      aplicar();
    });
  });

  if (buscador) {
    buscador.value = estado.q;
    let t;
    buscador.addEventListener('input', () => {
      clearTimeout(t);
      t = setTimeout(() => { estado.q = buscador.value.trim(); aplicar({ animar: false }); }, 160);
    });
  }

  // Las × del encabezado quitan solo su faceta
  if (encabezado) {
    encabezado.addEventListener('click', (e) => {
      const chip = e.target.closest('[data-quitar]');
      if (!chip) return;
      const faceta = chip.dataset.quitar;
      estado[faceta] = '';
      if (faceta === 'q' && buscador) buscador.value = '';
      aplicar();
    });
  }

  // Hay dos: el de la barra de conteo y el del estado vacío
  document.querySelectorAll('.filter-clear').forEach(limpiar => {
    limpiar.addEventListener('click', () => {
      Object.keys(estado).forEach(k => { estado[k] = ''; });
      if (buscador) buscador.value = '';
      aplicar();
    });
  });

  aplicar({ animar: false });
}

/** Píldora deslizante bajo el filtro activo (mejora progresiva).
 *  Una por grupo de facetas: cada barra tiene su propio activo. */
function initFilterPill() {
  if (prefersReducedMotion) return;

  document.querySelectorAll('.filter-bar').forEach(bar => {
    const pill = document.createElement('span');
    pill.className = 'filter-pill';
    pill.setAttribute('aria-hidden', 'true');
    bar.prepend(pill);
    bar.classList.add('has-pill');

    function movePill() {
      const active = bar.querySelector('.filter-btn.active');
      if (!active) { pill.style.opacity = '0'; return; }
      pill.style.opacity = '1';
      pill.style.left   = active.offsetLeft + 'px';
      pill.style.top    = active.offsetTop + 'px';
      pill.style.width  = active.offsetWidth + 'px';
      pill.style.height = active.offsetHeight + 'px';
    }

    movePill();
    window.addEventListener('resize', movePill);
    // Cualquier botón puede cambiar el activo de esta barra (p. ej. «Quitar filtros»)
    document.addEventListener('click', (e) => {
      if (e.target.closest('.filter-btn, .filter-clear')) requestAnimationFrame(movePill);
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(movePill);
  });
}

/**
 * Deep-link desde las 9 det-card de promocion.html: si el catálogo
 * está en la misma página se filtra en el sitio; si no, el href
 * lleva a biblioteca.html ya filtrado.
 */
function initTallerDeepLinks() {
  document.querySelectorAll('[data-filter]').forEach(link => {
    link.addEventListener('click', () => {
      const btn = document.querySelector(`.filter-btn[data-faceta="tema"][data-valor="${link.dataset.filter}"]`);
      if (btn && !btn.classList.contains('active')) btn.click();
    });
  });
}
// ══════════════════════════════════════════════
//  EVIDENCIAS — un solo flujo, parametrizado
//  Estaba escrito 5 veces (promocion, adicciones,
//  salud-mental, entornos, reportes) con redacciones
//  distintas y —peor— destinos contradictorios:
//  «Enviar evidencias» llevaba a reportes#formularios
//  en dos páginas y a index#contacto en las otras dos.
// ══════════════════════════════════════════════

/** Regla general del departamento (la que estaba en reportes.html). */
const EVIDENCIA_BASE = [
  'Lista de asistencia firmada',
  'Fotografía de la actividad',
  'Bitácora o registro de la plática',
];

/** Solo los programas cuyo requisito es realmente distinto. */
const EVIDENCIA_POR_PROGRAMA = {
  entornos: [
    '<strong>Escuela:</strong> foto + acta de asistencia + formato de diagnóstico',
    '<strong>ELHT:</strong> cédula + foto del cartel instalado',
    '<strong>Comunidad:</strong> foto + lista de líderes + formato de seguimiento',
  ],
};

/** Fecha de corte: aplica a todos, pero solo se decía en reportes.html. */
const EVIDENCIA_CORTE = 'El reporte mensual se cierra el <strong>último día hábil del mes</strong>.';

function renderEvidencias() {
  const bloques = document.querySelectorAll('[data-evidencias]');
  if (!bloques.length) return;

  const ICON_LISTA = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>`;
  const ICON_DESC  = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
  const ICON_ENVIO = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;

  bloques.forEach(bloque => {
    const programa = bloque.dataset.evidencias;
    const lista = EVIDENCIA_POR_PROGRAMA[programa] || EVIDENCIA_BASE;
    const etiqueta = PROGRAMA_LABELS[programa] || '';
    const qFormatos = 'biblioteca.html?tipo=formato' +
      (programa && programa !== 'todos' ? `&programa=${encodeURIComponent(programa)}` : '');

    bloque.innerHTML = `
      <ol class="ev-pasos">
        <li class="ev-paso">
          <div class="ev-icon">${ICON_LISTA}</div>
          <h3>Qué documentar</h3>
          <ul class="ev-lista">${lista.map(x => `<li>${x}</li>`).join('')}</ul>
        </li>
        <li class="ev-paso">
          <div class="ev-icon">${ICON_DESC}</div>
          <h3>Con qué formato</h3>
          <p>Descarga el formato oficial${etiqueta ? ' de ' + esc(etiqueta) : ''} desde la Biblioteca.</p>
          <a href="${qFormatos}" class="subsec-link">Ver formatos</a>
        </li>
        <li class="ev-paso">
          <div class="ev-icon">${ICON_ENVIO}</div>
          <h3>Dónde enviarlo</h3>
          <p>Captura tu reporte con el formulario oficial de tu área. ${EVIDENCIA_CORTE}</p>
          <a href="reportes.html#formularios" class="subsec-link">Ir a formularios de reporte</a>
        </li>
      </ol>`;
  });
}

// ══════════════════════════════════════════════
//  DIRECTORIO — render desde directorio.js
// ══════════════════════════════════════════════

function renderDirectorio() {
  const grids = document.querySelectorAll('[data-dir]');
  if (!grids.length) return;

  const DC_ICONS = {
    psicologia: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
    nutricion:  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
    referencia: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.3 19.79 19.79 0 01.22 2.62 2 2 0 012.2.5H5.1a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.41a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
  };
  const ICON_CLOCK = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
  const ICON_USER  = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>`;

  const data = typeof DIRECTORIO !== 'undefined' ? DIRECTORIO : [];

  grids.forEach(grid => {
    const tipo  = grid.dataset.dir;
    // `data-dir-tema` acota los servicios externos (crisis | adicciones |
    // violencia) para que cada programa muestre los suyos sin repetirlos.
    const temas = grid.dataset.dirTema ? grid.dataset.dirTema.split(/\s+/) : null;
    const items = data.filter(u =>
      u.tipo === tipo && (!temas || temas.some(t => (u.tema || []).includes(t))));
    if (!items.length) {
      grid.innerHTML = '<p class="empty-state">Sin unidades registradas por el momento.</p>';
      return;
    }
    // Variante compacta: para incrustar los teléfonos dentro de una
    // tarjeta existente sin repetir los datos en el HTML.
    if (grid.dataset.dirFormato === 'compacto') {
      // El número va en su propio campo: derivarlo del texto producía
      // `tel:` con los dígitos de «24 h» pegados al final.
      grid.innerHTML = `<ul class="dir-compacto">` + items.map(u => `
        <li><strong>${u.nombre}</strong> — ${
          u.telefono
            ? `<a href="tel:${u.telefono}">${u.horario || u.telefono}</a>`
            : (u.horario || '')}</li>`).join('') + `</ul>`;
      return;
    }

    grid.innerHTML = items.map(u => `
      <div class="directory-card">
        <div class="dc-header">
          <div class="dc-icon dc-${u.tipo}">${DC_ICONS[u.tipo] || ''}</div>
          <div>
            <h3 class="dc-name">${u.nombre || ''}</h3>
            <span class="dc-zone">${u.zona || ''}</span>
          </div>
        </div>
        <div class="dc-details">
          <div class="dc-row">${ICON_CLOCK}<span>${u.horario || 'Horario por confirmar'}</span></div>
          ${u.atencion ? `<div class="dc-row">${ICON_USER}<span>${u.atencion}</span></div>` : ''}
        </div>
      </div>
    `).join('');
  });
}

// ══════════════════════════════════════════════
//  KPIs — render + contadores animados
// ══════════════════════════════════════════════

/** Formatea 8500 → "8 500" (separador de miles con espacio) */
function formatKpi(n) {
  return n.toLocaleString('es-MX').replace(/,/g, ' ');
}

/** Genera las kpi-cards desde KPIS (assets/data/kpis.js) */
function renderKPIs() {
  if (typeof KPIS === 'undefined') return;
  document.querySelectorAll('[data-kpis]').forEach(grid => {
    const items = KPIS[grid.dataset.kpis];
    if (!items || !items.length) {
      grid.innerHTML = '<p class="empty-state">Sin indicadores por el momento.</p>';
      return;
    }
    grid.innerHTML = items.map(k => `
      <div class="kpi-card" style="--kpi-color: var(--${k.color})">
        <div class="kpi-number" data-target="${k.numero}" data-sufijo="${k.sufijo}">${formatKpi(k.numero)}${k.sufijo}</div>
        <div class="kpi-label">${k.etiqueta}</div>
        <div class="kpi-desc">${k.desc}</div>
      </div>
    `).join('');
  });
}

/** Contador 0 → valor con easeOutExpo al entrar al viewport */
function initKpiCounters() {
  if (prefersReducedMotion) return; // los números ya muestran el valor final
  const nums = document.querySelectorAll('.kpi-number[data-target]');
  if (!nums.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      io.unobserve(el);
      const target = parseInt(el.dataset.target, 10);
      const sufijo = el.dataset.sufijo || '';
      const dur    = 1200;
      const start  = performance.now();
      const tick = (now) => {
        const p    = Math.min((now - start) / dur, 1);
        const ease = p === 1 ? 1 : 1 - Math.pow(2, -10 * p); // easeOutExpo
        el.textContent = formatKpi(Math.round(target * ease)) + sufijo;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.4 });

  nums.forEach(n => io.observe(n));
}

// ══════════════════════════════════════════════
//  CAMPAÑAS (grid) — misma fuente que el carrusel: campaigns.js
//  Se usa en promocion.html#campanas para no duplicar info.
// ══════════════════════════════════════════════

function renderCampaignsGrid() {
  const grid = document.getElementById('campanas-grid');
  if (!grid) return;
  if (typeof CAMPAIGNS === 'undefined' || !CAMPAIGNS.length) {
    grid.innerHTML = '<p class="empty-state">Sin campañas activas.</p>';
    return;
  }
  const ICON = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>`;
  grid.innerHTML = CAMPAIGNS.map(c => {
    // Materiales reales de la campaña (misma fuente que el carrusel)
    const mats = (c.materiales || []).map(m => `
      <a href="${m.url}" class="subsec-link"${m.url.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${m.tipo} →</a>`).join('');
    return `
    <div class="subsec-card" style="--nc-color: var(--${c.color === 'gold' ? 'gold' : c.color})">
      <div class="subsec-icon">${ICON}</div>
      <h3>${c.titulo}</h3>
      <p>${c.objetivo}</p>
      <p style="font-size:.85rem;color:var(--text-muted);margin:.5rem 0 .75rem"><strong>Población:</strong> ${c.poblacion}</p>
      ${mats}
    </div>`;
  }).join('');
}

// ══════════════════════════════════════════════
//  CONTACTO — fuente única: window.CONTACTO (definido en components.js)
//  Rellena la sección de contacto (index.html) para no duplicar datos.
// ══════════════════════════════════════════════

function renderContacto() {
  const C = window.CONTACTO;
  if (!C) return;
  const set = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
  set('c-direccion', C.direccion);
  set('c-telefonos', `<a href="tel:${C.tel1Link}">${C.tel1}</a> · <a href="tel:${C.tel2Link}">${C.tel2}</a> · Ext. ${C.ext}`);
  set('c-email', `<a href="mailto:${C.email}">${C.email}</a>`);
  set('c-facebook', `<a href="${C.facebook}" target="_blank" rel="noopener">Facebook · Promoción a la Salud Texcoco</a>`);
}

// ══════════════════════════════════════════════
//  ARRANQUE GLOBAL
// ══════════════════════════════════════════════

// Campañas — renderizar antes de initCarousel
renderCampaigns();
renderCampaignsGrid();

// Datos de contacto (fuente única en components.js)
renderContacto();

// KPIs (index.html y reportes.html)
renderKPIs();
initKpiCounters();

// Carrusel (index.html)
initCarousel();

// Recursos — índice único. Rellena toda rejilla [data-recursos]
// (biblioteca, talleres, formularios, psicología, entornos).
// Debe correr ANTES de initFiltros: este lee las tarjetas ya puestas.
renderRecursos();

// Directorio (directorio.html)
renderDirectorio();

// Bloque de evidencias (mismo flujo en las 5 páginas que lo repetían)
renderEvidencias();

// Buscador global (todas las páginas con el navbar)
initBuscadorGlobal();

// Filtros facetados + búsqueda
initFiltros();
initFilterPill();

// Deep-link de determinantes → filtro del catálogo de talleres
initTallerDeepLinks();

// Formulario de contacto
// Animaciones de entrada: al final, cuando ya existe todo lo generado
initRevealElements();
createRevealObserver();

const contactForm = document.getElementById('contact-form');
if (contactForm) contactForm.addEventListener('submit', handleForm);
