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
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  updateScrollProgress();
}, { passive: true });

// ── Mobile menu toggle ─────────────────────────
const menuToggle = document.getElementById('menu-toggle');
const navLinks   = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.classList.toggle('active', isOpen);
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// Cerrar al hacer clic fuera
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', false);
  }
});

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
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    navLinks.classList.remove('open');
    menuToggle.classList.remove('active');
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
  const heroBg = document.querySelector('.hero-bg-pattern');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroBg.style.transform = `translateY(${y * 0.18}px)`;
    }, { passive: true });
  }

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
  const selectors = [
    '.content-card',
    '.program-card',
    '.sm-card',
    '.resource-card',
    '.section-header',
    '.alert-card',
    '.ci-item',
    '.sij-placeholder',
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

initRevealElements();
createRevealObserver();

// ── Hover 3D tilt en program cards ────────────
if (!prefersReducedMotion) {
  document.querySelectorAll('.program-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `translateY(-4px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
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
//  BIBLIOTECA — render desde biblioteca.js
// ══════════════════════════════════════════════

function renderBiblioteca() {
  const grid = document.querySelector('.material-grid');
  if (!grid) return;

  if (typeof BIBLIOTECA === 'undefined' || !BIBLIOTECA.length) {
    grid.innerHTML = '<p class="empty-state">Sin recursos por el momento.</p>';
    return;
  }

  const CAT_LABELS = {
    lineamientos: 'Lineamiento',
    manuales:     'Manual',
    formatos:     'Formato',
    noms:         'NOM',
    grafico:      'Material gráfico',
    presentacion: 'Presentación',
    documentos:   'Doc. oficial',
  };

  const ICON_DOWNLOAD = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
  const ICON_EXTERNAL = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

  grid.innerHTML = BIBLIOTECA.map(m => {
    const url  = m.url || '#';
    const ext  = url.startsWith('http');
    const meta = [
      `<span><strong>Tema:</strong> ${m.tema}</span>`,
      `<span><strong>Público:</strong> ${m.publico}</span>`,
      m.modalidad   ? `<span><strong>Modalidad:</strong> ${m.modalidad}</span>` : '',
      m.actualizado ? `<span><strong>Actualizado:</strong> ${m.actualizado}</span>` : '',
    ].join('');
    return `
      <article class="material-card" data-categoria="${m.categoria}">
        <div class="mc-cat ${m.categoria}">${CAT_LABELS[m.categoria] || m.categoria}</div>
        <h3 class="mc-title">${m.titulo}</h3>
        <div class="mc-meta">${meta}</div>
        <a href="${url}" class="mc-btn"${ext ? ' target="_blank" rel="noopener noreferrer"' : ''}>
          ${ext ? ICON_EXTERNAL : ICON_DOWNLOAD}
          ${m.accion}
        </a>
      </article>`;
  }).join('');
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
  };
  const ICON_CLOCK = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
  const ICON_USER  = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>`;

  const data = typeof DIRECTORIO !== 'undefined' ? DIRECTORIO : [];

  grids.forEach(grid => {
    const tipo  = grid.dataset.dir;
    const items = data.filter(u => u.tipo === tipo);
    if (!items.length) {
      grid.innerHTML = '<p class="empty-state">Sin unidades registradas por el momento.</p>';
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
//  FILTROS DE BIBLIOTECA
// ══════════════════════════════════════════════

function initFilters() {
  const filterBar = document.querySelector('.filter-bar');
  if (!filterBar) return;

  const buttons = [...filterBar.querySelectorAll('.filter-btn')];
  const cards   = [...document.querySelectorAll('.material-card')];
  const countEl = document.querySelector('.filter-count');

  function updateCount(visible) {
    if (countEl) countEl.textContent = `${visible} recurso${visible !== 1 ? 's' : ''}`;
  }

  function applyFilter(cat) {
    let visible = 0;
    cards.forEach((card, i) => {
      const matches = cat === 'all' || card.dataset.categoria === cat;
      if (matches) {
        visible++;
        card.hidden = false;
        if (!prefersReducedMotion) {
          card.style.opacity   = '0';
          card.style.transform = 'translateY(10px)';
          const delay = (i % 8) * 40;
          setTimeout(() => {
            card.style.transition = `opacity 280ms var(--ease-out), transform 280ms var(--ease-out)`;
            card.style.opacity    = '1';
            card.style.transform  = 'translateY(0)';
          }, delay);
        }
      } else {
        card.hidden = true;
        card.style.opacity   = '';
        card.style.transform = '';
        card.style.transition = '';
      }
    });
    updateCount(visible);
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.cat);
    });
  });

  // Inicializar con conteo total
  updateCount(cards.length);
}

/** Píldora deslizante bajo el filtro activo (progressive enhancement) */
function initFilterPill() {
  const bar = document.querySelector('.filter-bar');
  if (!bar || prefersReducedMotion) return;

  const pill = document.createElement('span');
  pill.className = 'filter-pill';
  pill.setAttribute('aria-hidden', 'true');
  bar.prepend(pill);
  bar.classList.add('has-pill');

  function movePill() {
    const active = bar.querySelector('.filter-btn.active');
    if (!active) return;
    pill.style.left   = active.offsetLeft + 'px';
    pill.style.top    = active.offsetTop + 'px';
    pill.style.width  = active.offsetWidth + 'px';
    pill.style.height = active.offsetHeight + 'px';
  }

  movePill();
  window.addEventListener('resize', movePill);
  bar.addEventListener('click', (e) => {
    if (e.target.closest('.filter-btn')) requestAnimationFrame(movePill);
  });
  // Reposicionar cuando carguen las webfonts (cambian el ancho de los botones)
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(movePill);
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
//  ARRANQUE GLOBAL
// ══════════════════════════════════════════════

// Campañas — renderizar antes de initCarousel
renderCampaigns();

// KPIs (index.html y reportes.html)
renderKPIs();
initKpiCounters();

// Carrusel (index.html)
initCarousel();

// Biblioteca — renderizar antes de initFilters
renderBiblioteca();

// Directorio (directorio.html)
renderDirectorio();

// Filtros (biblioteca.html)
initFilters();
initFilterPill();

// Formulario de contacto
const contactForm = document.getElementById('contact-form');
if (contactForm) contactForm.addEventListener('submit', handleForm);
