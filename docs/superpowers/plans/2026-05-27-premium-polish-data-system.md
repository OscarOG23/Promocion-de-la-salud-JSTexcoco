# Pulido Premium + Sistema de Datos JS — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers-extended-cc:subagent-driven-development (recommended) or superpowers-extended-cc:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevar la plataforma ISEM a nivel premium editorial (animaciones, micro-interacciones, móvil) y migrar biblioteca/KPIs/directorio a archivos de datos JS mantenibles.

**Architecture:** Sitio estático multi-página HTML/CSS/JS sin build step. Los datos viven en `assets/data/*.js` como constantes globales; funciones `render*()` en `script.js` generan el HTML en contenedores marcados con atributos `data-*`. Las animaciones son CSS-first con JS solo para orquestación (IntersectionObserver, contadores, píldora de filtros).

**Tech Stack:** HTML5, CSS3 (custom properties, View Transitions API, color-mix), JavaScript vanilla (ES2020). Sin dependencias. Deploy: GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-05-27-premium-polish-data-system-design.md`

**Verificación general (no hay framework de tests):** servidor local `python -m http.server 8080` y comprobación en navegador + consola sin errores. Donde sea posible, validar sintaxis JS con `node --check <archivo>` (si Node está instalado; si no, la carga en navegador sin errores de consola es la verificación).

**Datos de contexto críticos (verificados en el código real):**
- Categorías reales de biblioteca (atributos `data-cat` / `data-categoria`): `lineamientos` · `manuales` · `formatos` · `noms` · `grafico` · `presentacion` · `documentos` (¡singular `grafico`/`presentacion`, NO `graficos`/`presentaciones`!)
- `script.js` termina en línea 513 con el bloque "ARRANQUE GLOBAL" (`renderCampaigns(); initCarousel(); initFilters();` + contact form).
- `style.css` tiene 2474 líneas; los media queries responsive están en líneas ~2340–2444; la sección UTILIDADES empieza en ~2446.
- `.hero` (style.css:388) usa `background: var(--grad-hero)`. `.hero-title` (style.css:497) usa `animation: fade-in-up var(--dur-enter) 80ms var(--ease-out) both;`.
- En `initCarousel().goTo()` (script.js:390-402) hay un bug latente: anima `.cs-header, .cs-content, .cs-materials`, clases que NO existen (el HTML generado usa `.cs-tag, .cs-title, .cs-meta, .cs-actions`). Se corrige en Task 5.
- Las tarjetas generadas por JS NO reciben clase `.reveal` (initRevealElements corre antes que los render). Esto es correcto: quedan visibles por defecto.

---

### Task 1: kpis.js + renderKPIs + contadores animados

**Goal:** Un solo archivo de datos para los KPIs de index y reportes, con contadores que animan al entrar al viewport.

**Files:**
- Create: `assets/data/kpis.js`
- Modify: `index.html:124-173` (sección #indicadores), `reportes.html:42-85` (sección #indicadores)
- Modify: `script.js` (añadir `renderKPIs()` e `initKpiCounters()` antes del bloque ARRANQUE GLOBAL; llamarlas en el arranque)

**Acceptance Criteria:**
- [ ] `index.html` y `reportes.html` generan sus 6 KPI cards desde `KPIS.index` / `KPIS.reportes`
- [ ] Al hacer scroll hasta los KPIs, los números cuentan de 0 al valor en ~1.2s con easeOutExpo
- [ ] Sufijos ("+") se conservan; 8500 se muestra como "8 500"
- [ ] Con `prefers-reduced-motion`, los números aparecen directos sin animación
- [ ] Cambiar un número en `kpis.js` lo cambia en ambas páginas

**Verify:** Abrir `http://localhost:8080/index.html` y `http://localhost:8080/reportes.html` → 6 KPI cards en cada una, contadores animan, consola sin errores.

**Steps:**

- [ ] **Step 1: Crear `assets/data/kpis.js`**

```js
/* ================================================
   KPIS — Indicadores de la jurisdicción
   ================================================
   CÓMO ACTUALIZAR: cambia "numero" (solo dígitos),
   "sufijo" ("+", "%", o ""), "etiqueta" y "desc".
   Colores válidos: crimson | crimson-dk | teal | teal-dk | gold-dk | purple
   Las tarjetas se generan solas en index.html y reportes.html.
   ================================================ */

const KPIS = {

  /* ── Portal (index.html) ── */
  index: [
    { numero: 4,    sufijo: "",  etiqueta: "Campañas activas",        color: "crimson",    desc: "Nacionales y estatales 2025" },
    { numero: 45,   sufijo: "+", etiqueta: "Unidades médicas",         color: "teal",       desc: "Bajo responsabilidad jurisdiccional" },
    { numero: 15,   sufijo: "",  etiqueta: "Municipios",               color: "gold-dk",    desc: "Atendidos en la jurisdicción" },
    { numero: 30,   sufijo: "+", etiqueta: "Materiales en biblioteca", color: "purple",     desc: "Lineamientos, manuales y formatos" },
    { numero: 12,   sufijo: "",  etiqueta: "Certificaciones 2025",     color: "crimson-dk", desc: "Escuelas, ELHT y comunidades" },
    { numero: 8,    sufijo: "",  etiqueta: "Jornadas programadas",     color: "teal-dk",    desc: "Pendientes en el trimestre" }
  ],

  /* ── Tablero (reportes.html) ── */
  reportes: [
    { numero: 4,    sufijo: "",  etiqueta: "Campañas activas",       color: "crimson",    desc: "Nacionales y estatales 2025" },
    { numero: 45,   sufijo: "+", etiqueta: "Unidades médicas",        color: "teal",       desc: "Bajo responsabilidad jurisdiccional" },
    { numero: 15,   sufijo: "",  etiqueta: "Municipios atendidos",    color: "gold-dk",    desc: "Jurisdicción Sanitaria Texcoco" },
    { numero: 12,   sufijo: "",  etiqueta: "Certificaciones 2025",    color: "purple",     desc: "Escuelas, ELHT y comunidades" },
    { numero: 320,  sufijo: "+", etiqueta: "Actividades realizadas",  color: "crimson-dk", desc: "Acumulado enero–mayo 2025" },
    { numero: 8500, sufijo: "+", etiqueta: "Personas beneficiadas",   color: "teal-dk",    desc: "Acumulado enero–mayo 2025" }
  ]

};
```

- [ ] **Step 2: En `index.html`, reemplazar el grid hardcodeado**

Reemplazar TODO el bloque `<div class="kpi-grid">…</div>` (líneas 133–171, las 6 `kpi-card` incluidas) por:

```html
<div class="kpi-grid" data-kpis="index"></div>
```

Y en el `section-header` de esa misma sección, cambiar el `<p>`:

```html
<p>Los números se actualizan en <code>assets/data/kpis.js</code>.</p>
```

Añadir el script de datos ANTES de `components.js` (junto al de campaigns):

```html
<script src="assets/data/campaigns.js"></script>
<script src="assets/data/kpis.js"></script>
<script src="components.js"></script>
<script src="script.js"></script>
```

- [ ] **Step 3: En `reportes.html`, mismo cambio**

Reemplazar el bloque `<div class="kpi-grid">…</div>` (líneas 51–82) por:

```html
<div class="kpi-grid" data-kpis="reportes"></div>
```

Cambiar el `<p>` del section-header de esa sección a:

```html
<p>Los números se actualizan en <code>assets/data/kpis.js</code>.</p>
```

Añadir `<script src="assets/data/kpis.js"></script>` antes de `components.js` al final del body.

- [ ] **Step 4: En `script.js`, añadir render + contadores**

Insertar ANTES del bloque `// ══ ARRANQUE GLOBAL ══` (línea ~498):

```js
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
```

En el bloque ARRANQUE GLOBAL, después de `renderCampaigns();` añadir:

```js
// KPIs (index.html y reportes.html)
renderKPIs();
initKpiCounters();
```

- [ ] **Step 5: Verificar**

Run: `python -m http.server 8080` (run_in_background) y abrir `http://localhost:8080/index.html` y `/reportes.html`.
Expected: 6 KPI cards por página, los números cuentan al hacer scroll, "8 500+" con espacio, consola limpia. Si Node está disponible: `node --check script.js` → sin salida (OK).

- [ ] **Step 6: Commit**

```bash
git add assets/data/kpis.js index.html reportes.html script.js
git commit -m "feat: KPIs desde kpis.js con contadores animados"
```

---

### Task 2: biblioteca.js + renderBiblioteca

**Goal:** Los 25 materiales de biblioteca viven en `assets/data/biblioteca.js`; la página los genera sola y los filtros existentes siguen funcionando.

**Files:**
- Create: `assets/data/biblioteca.js`
- Modify: `biblioteca.html:51-415` (vaciar `.material-grid`), `biblioteca.html:421-423` (script tag), `biblioteca.html:45-47` (contador inicial)
- Modify: `script.js` (añadir `renderBiblioteca()`; llamarla ANTES de `initFilters()` en el arranque)

**Acceptance Criteria:**
- [ ] Las 25 material-cards se generan desde `BIBLIOTECA` con la misma estructura HTML actual (mismas clases, mismos `data-categoria`)
- [ ] Los filtros existentes (`initFilters`) funcionan sin modificación
- [ ] El contador "N recursos" muestra 25 al cargar
- [ ] Links externos (`http…`) llevan `target="_blank" rel="noopener"` e ícono de enlace externo; links `#` llevan ícono de descarga
- [ ] Si `BIBLIOTECA` falta o está vacío, se muestra "Sin recursos por el momento." sin romper la página

**Verify:** `http://localhost:8080/biblioteca.html` → 25 cards, filtro "Manuales" muestra 3, "Formatos" muestra 5, consola limpia.

**Steps:**

- [ ] **Step 1: Crear `assets/data/biblioteca.js`** (datos extraídos 1:1 del HTML actual)

```js
/* ================================================
   BIBLIOTECA — Materiales y recursos
   ================================================
   CÓMO AÑADIR UN MATERIAL: copia un objeto {...},
   pégalo al final de su categoría y edita los campos.

   categoria válidas (deben coincidir con los filtros):
     lineamientos | manuales | formatos | noms |
     grafico | presentacion | documentos

   "modalidad" y "actualizado" son opcionales (omite el campo si no aplica).
   "url": pega el link de Google Drive / PDF. Usa "#" si aún no hay link.
   "accion": texto del botón (Descargar, Abrir en Drive, Ver PDF, etc.)
   ================================================ */

const BIBLIOTECA = [

  /* ── LINEAMIENTOS ── */
  { titulo: "Lineamiento de Promoción a la Salud 2024", categoria: "lineamientos",
    tema: "Promoción general", publico: "Personal de salud", actualizado: "Ene 2024",
    url: "#", accion: "Descargar" },

  { titulo: "Lineamiento SINBA 2025 — Indicadores de Promoción", categoria: "lineamientos",
    tema: "SINBA / Indicadores", publico: "Responsables de unidad", actualizado: "Ene 2025",
    url: "#", accion: "Descargar" },

  { titulo: "Lineamiento Estatal de Entornos Saludables 2024", categoria: "lineamientos",
    tema: "Entornos saludables", publico: "Responsables de programa", actualizado: "Mar 2024",
    url: "#", accion: "Descargar" },

  /* ── MANUALES ── */
  { titulo: "Manual de Procedimientos — Escuela Saludable", categoria: "manuales",
    tema: "Certificación escolar", publico: "Responsable del programa", actualizado: "Feb 2024",
    url: "#", accion: "Descargar" },

  { titulo: "Manual Operativo de Adicciones 2025", categoria: "manuales",
    tema: "Adicciones", publico: "Personal operativo", actualizado: "Ene 2025",
    url: "#", accion: "Descargar" },

  { titulo: "Manual de Orientación Alimentaria — NOM-043", categoria: "manuales",
    tema: "Alimentación saludable", publico: "Personal de salud y público general", actualizado: "2023",
    url: "https://www.gob.mx/cms/uploads/attachment/file/138258/NOM-043-servicios-basicos-salud-educacion-alimentaria.pdf",
    accion: "Ver en línea" },

  /* ── FORMATOS ── */
  { titulo: "Formatos SINBA 2023 — Colección completa", categoria: "formatos",
    tema: "SINBA / Captura", publico: "Responsables de unidad", actualizado: "2023",
    url: "https://drive.google.com/drive/folders/1vm_W1E-GuLbPx9OFbvLRqyjY_Lxh1wn6",
    accion: "Abrir en Drive" },

  { titulo: "Lista de asistencia — Actividades educativas", categoria: "formatos",
    tema: "Evidencias / Registros", publico: "Personal promotor", actualizado: "Ene 2025",
    url: "#", accion: "Descargar" },

  { titulo: "Formato de tamizaje de adicciones — AUDIT / CAGE", categoria: "formatos",
    tema: "Adicciones / Tamizaje", publico: "Personal de salud", actualizado: "2024",
    url: "#", accion: "Descargar" },

  { titulo: "Metas por unidad 2025 — Hoja de cálculo", categoria: "formatos",
    tema: "Metas / Planeación", publico: "Responsables de unidad", actualizado: "Ene 2025",
    url: "https://docs.google.com/spreadsheets/d/1GL1RulCbxK_RF7K6IHf9r-TPnDaB6O4p/edit",
    accion: "Abrir Sheets" },

  { titulo: "Población por unidad médica 2024", categoria: "formatos",
    tema: "Población / Estadística", publico: "Responsables de unidad", actualizado: "2024",
    url: "https://docs.google.com/spreadsheets/d/1AxfBWfwCG81xV9D6iaMFg3-B0Lgh5Nfb/edit",
    accion: "Abrir Sheets" },

  /* ── NOMs ── */
  { titulo: "NOM-043-SSA2-2012 — Educación alimentaria", categoria: "noms",
    tema: "Alimentación saludable", publico: "Personal de salud", actualizado: "Vigente",
    url: "https://www.gob.mx/cms/uploads/attachment/file/138258/NOM-043-servicios-basicos-salud-educacion-alimentaria.pdf",
    accion: "Ver PDF" },

  { titulo: "NOM-028-SSA2-2009 — Adicciones", categoria: "noms",
    tema: "Adicciones / Prevención", publico: "Personal de salud", actualizado: "Vigente",
    url: "#", accion: "Ver PDF" },

  { titulo: "NOM-046-SSA2-2005 — Violencia familiar y sexual", categoria: "noms",
    tema: "Violencia / Salud mental", publico: "Personal de salud", actualizado: "Vigente",
    url: "#", accion: "Ver PDF" },

  /* ── MATERIAL GRÁFICO ── */
  { titulo: "Infografía — Plato del Bien Comer (actualizada 2023)", categoria: "grafico",
    tema: "Alimentación saludable", publico: "Población general", modalidad: "Distribución / exposición",
    url: "#", accion: "Descargar" },

  { titulo: "Cartel — Prevención del suicidio · Línea de la Vida", categoria: "grafico",
    tema: "Salud mental", publico: "Adolescentes y adultos", modalidad: "Distribución en unidades",
    url: "#", accion: "Descargar" },

  { titulo: "Tríptico — Viruela Símica (MPOX) · Campaña 2025", categoria: "grafico",
    tema: "MPOX / Campaña", publico: "Población general", modalidad: "Distribución",
    url: "#", accion: "Descargar" },

  { titulo: "Rotafolio — Factores de riesgo para adicciones", categoria: "grafico",
    tema: "Adicciones", publico: "Adolescentes de 10–19 años", modalidad: "Taller presencial",
    url: "#", accion: "Descargar" },

  /* ── PRESENTACIONES ── */
  { titulo: "Determinantes sociales de la salud — 9 determinantes ISEM", categoria: "presentacion",
    tema: "Determinantes sociales", publico: "Personal promotor", modalidad: "Capacitación interna",
    url: "https://drive.google.com/drive/folders/1wQCWEuj8RdCsy6xPcxFT_loHVuAvcnU6",
    accion: "Ver en Drive" },

  { titulo: "Alimentación Saludable — Guías Alimentarias 2023", categoria: "presentacion",
    tema: "Alimentación", publico: "Familias y escolares", modalidad: "Taller comunitario · 60 min",
    url: "https://movendi.ngo/wp-content/uploads/2023/05/Gui_as_Alimentarias_2023_para_la_poblacio_n_mexicana.pdf",
    accion: "Ver PDF" },

  { titulo: "Salud Mental — Prevención del suicidio para adolescentes", categoria: "presentacion",
    tema: "Salud mental", publico: "Adolescentes 12–18 años", modalidad: "Plática · 45 min",
    url: "#", accion: "Descargar" },

  /* ── DOCUMENTOS OFICIALES ── */
  { titulo: "Modelo de Salud para el Bienestar (APS)", categoria: "documentos",
    tema: "Modelo de atención", publico: "Personal directivo y técnico", actualizado: "Vigente",
    url: "https://www.gob.mx/insabi/documentos/modelo-de-salud-para-el-bienestar-dirigido-a-las-personas-sin-seguridad-basado-en-la-atencion-primaria-de-salud",
    accion: "Ver en línea" },

  { titulo: "Plan de Trabajo Estatal de Promoción a la Salud 2025", categoria: "documentos",
    tema: "Planeación estratégica", publico: "Responsables de programa", actualizado: "Ene 2025",
    url: "#", accion: "Descargar" },

  { titulo: "Programa Sectorial de Salud del Estado de México 2023–2029", categoria: "documentos",
    tema: "Política en salud", publico: "Personal directivo", actualizado: "2023",
    url: "#", accion: "Ver en línea" },

  { titulo: "Criterios de Certificación — Comunidades Saludables ISEM", categoria: "documentos",
    tema: "Entornos / Certificación", publico: "Responsables de programa", actualizado: "2024",
    url: "#", accion: "Descargar" }

];
```

- [ ] **Step 2: Vaciar el grid en `biblioteca.html`**

Reemplazar TODO el contenido entre `<div class="material-grid">` y `</div><!-- /material-grid -->` (líneas 54–413) por:

```html
<div class="material-grid"></div>
```

Cambiar el contador inicial (línea 46) — el JS lo recalcula, pero dejar un fallback neutro:

```html
<p class="filter-count-wrap">
  <span class="filter-count">…</span> disponibles
</p>
```

Añadir el script de datos al final del body, antes de `components.js`:

```html
<script src="assets/data/campaigns.js"></script>
<script src="assets/data/biblioteca.js"></script>
<script src="components.js"></script>
<script src="script.js"></script>
```

- [ ] **Step 3: Añadir `renderBiblioteca()` a `script.js`**

Insertar justo ANTES de la sección `// ══ FILTROS DE BIBLIOTECA ══` (línea ~443):

```js
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
    const ext  = m.url.startsWith('http');
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
        <a href="${m.url}" class="mc-btn"${ext ? ' target="_blank" rel="noopener"' : ''}>
          ${ext ? ICON_EXTERNAL : ICON_DOWNLOAD}
          ${m.accion}
        </a>
      </article>`;
  }).join('');
}
```

En ARRANQUE GLOBAL, añadir ANTES de `initFilters();`:

```js
// Biblioteca — renderizar antes de initFilters
renderBiblioteca();
```

(El orden importa: `initFilters()` captura `document.querySelectorAll('.material-card')` al ejecutarse.)

- [ ] **Step 4: Añadir CSS para `.empty-state`** al final de `style.css`, antes de los media queries de UTILIDADES:

```css
/* Estado vacío de grids generados desde datos */
.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  color: var(--text-muted);
  font-size: 14.5px;
  padding: 48px 0;
}
```

- [ ] **Step 5: Verificar**

`http://localhost:8080/biblioteca.html` → contador "25 recursos", filtro Manuales = 3 cards, Formatos = 5, NOMs = 3, "Abrir en Drive" abre en pestaña nueva. Consola limpia.

- [ ] **Step 6: Commit**

```bash
git add assets/data/biblioteca.js biblioteca.html script.js style.css
git commit -m "feat: biblioteca generada desde biblioteca.js"
```

---

### Task 3: directorio.js + renderDirectorio

**Goal:** Las unidades de psicología y nutrición viven en `assets/data/directorio.js`. (La sede jurisdiccional y los servicios externos —Línea de la Vida, SAPTEL, CIJ— quedan estáticos: casi nunca cambian.)

**Files:**
- Create: `assets/data/directorio.js`
- Modify: `directorio.html` — vaciar los dos `.directory-grid` de psicología (líneas ~101–169) y nutrición (~187–233); actualizar el párrafo de mantenimiento (~171–174); añadir script tag
- Modify: `script.js` (añadir `renderDirectorio()`; llamarla en el arranque)

**Acceptance Criteria:**
- [ ] Psicología muestra 3 cards y Nutrición 2, generadas desde `DIRECTORIO`
- [ ] Íconos correctos: corazón rosa-púrpura (psicología), olla dorada (nutrición)
- [ ] Sección Departamento y Referencia Externa intactas (estáticas)
- [ ] Si `DIRECTORIO` falta, las secciones muestran "Sin unidades registradas por el momento."

**Verify:** `http://localhost:8080/directorio.html` → 3 cards psicología + 2 nutrición idénticas a las actuales, consola limpia.

**Steps:**

- [ ] **Step 1: Crear `assets/data/directorio.js`**

```js
/* ================================================
   DIRECTORIO — Unidades con psicología y nutrición
   ================================================
   CÓMO AÑADIR UNA UNIDAD: copia un objeto {...} y edítalo.
   "tipo" válidos: psicologia | nutricion
   Las tarjetas se generan solas en directorio.html.
   ================================================ */

const DIRECTORIO = [

  /* ── PSICOLOGÍA ── */
  { nombre: "C.S. Texcoco",   zona: "Zona Texcoco",   tipo: "psicologia",
    horario: "Lunes a viernes 8:00–14:00 h",
    atencion: "Atención individual · Previa cita" },

  { nombre: "C.S. Chiautla",  zona: "Zona Chiautla",  tipo: "psicologia",
    horario: "Martes y jueves 8:00–14:00 h",
    atencion: "Atención individual y familiar" },

  { nombre: "C.S. Papalotla", zona: "Zona Papalotla", tipo: "psicologia",
    horario: "Lunes, miércoles y viernes 8:00–14:00 h",
    atencion: "Atención individual · Consulta abierta" },

  /* ── NUTRICIÓN ── */
  { nombre: "C.S. Texcoco",   zona: "Zona Texcoco",   tipo: "nutricion",
    horario: "Lunes a viernes 9:00–13:00 h",
    atencion: "Consejería individual · Previa cita" },

  { nombre: "C.S. Atenco",    zona: "Zona Atenco",    tipo: "nutricion",
    horario: "Martes y jueves 8:00–14:00 h",
    atencion: "Talleres grupales y consejería" }

];
```

- [ ] **Step 2: En `directorio.html`, vaciar los grids generables**

Sección PSICOLOGÍA: reemplazar el `<div class="directory-grid">…</div>` completo (con sus 3 cards) por:

```html
<div class="directory-grid" data-dir="psicologia"></div>
```

Sección NUTRICIÓN: reemplazar su `<div class="directory-grid">…</div>` (2 cards) por:

```html
<div class="directory-grid" data-dir="nutricion"></div>
```

Actualizar el párrafo de mantenimiento (líneas ~171–174):

```html
<p style="margin-top:1.5rem; font-size:.9rem; color:var(--gray-500)">
  Para actualizar horarios o añadir unidades edita <code>assets/data/directorio.js</code>.
  ¿Falta una unidad? <a href="index.html#contacto" style="color:var(--purple)">Notifícanos →</a>
</p>
```

Añadir script de datos al final del body antes de `components.js`:

```html
<script src="assets/data/directorio.js"></script>
```

- [ ] **Step 3: Añadir `renderDirectorio()` a `script.js`** (después de `renderBiblioteca`, antes de FILTROS):

```js
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

  grids.forEach(grid => {
    const tipo  = grid.dataset.dir;
    const items = (typeof DIRECTORIO !== 'undefined' ? DIRECTORIO : []).filter(u => u.tipo === tipo);
    if (!items.length) {
      grid.innerHTML = '<p class="empty-state">Sin unidades registradas por el momento.</p>';
      return;
    }
    grid.innerHTML = items.map(u => `
      <div class="directory-card">
        <div class="dc-header">
          <div class="dc-icon dc-${u.tipo}">${DC_ICONS[u.tipo] || ''}</div>
          <div>
            <h3 class="dc-name">${u.nombre}</h3>
            <span class="dc-zone">${u.zona}</span>
          </div>
        </div>
        <div class="dc-details">
          <div class="dc-row">${ICON_CLOCK}<span>${u.horario}</span></div>
          <div class="dc-row">${ICON_USER}<span>${u.atencion}</span></div>
        </div>
      </div>
    `).join('');
  });
}
```

En ARRANQUE GLOBAL añadir tras `renderBiblioteca();`:

```js
// Directorio (directorio.html)
renderDirectorio();
```

- [ ] **Step 4: Verificar**

`http://localhost:8080/directorio.html` → mismas 5 cards que antes (3+2), íconos con sus colores (`dc-psicologia` púrpura, `dc-nutricion` dorado), secciones estáticas intactas.

- [ ] **Step 5: Commit**

```bash
git add assets/data/directorio.js directorio.html script.js
git commit -m "feat: directorio psicología/nutrición desde directorio.js"
```

---

### Task 4: CSS premium — hero vivo, micro-interacciones, móvil

**Goal:** Capa visual premium: hero que respira, reveal del título, hover de cards con acento, botones táctiles, subrayado de nav, transiciones de página, duraciones móviles.

**Files:**
- Modify: `style.css` — (a) regla `.hero` línea 388, (b) regla `.hero-title` línea 497, (c) bloque nuevo antes de la sección UTILIDADES (~línea 2446), (d) adiciones dentro del media query `@media (max-width: 900px)` existente

**Acceptance Criteria:**
- [ ] El fondo del hero se desplaza lentamente (ciclo ~20s), imperceptible pero vivo
- [ ] El título del hero entra con reveal de clip-path
- [ ] Cards clave muestran línea de acento superior + sombra doble al hover
- [ ] Botones se comprimen levemente al presionar (`:active`)
- [ ] Nav links con subrayado animado en escritorio
- [ ] Navegación entre páginas con cross-fade (Chrome/Edge); en Firefox/Safari navega normal
- [ ] En ≤900px las animaciones duran ~60% y áreas táctiles ≥44px
- [ ] Links del menú móvil entran escalonados al abrir

**Verify:** Abrir index en escritorio y en DevTools móvil (375px) → comprobar cada criterio visualmente; `prefers-reduced-motion` (DevTools → Rendering → emulate) desactiva todo.

**Steps:**

- [ ] **Step 1: Hero que respira** — en `style.css:388`, dentro de la regla `.hero`, reemplazar la línea `background: var(--grad-hero);` por:

```css
  background: linear-gradient(120deg, #2d1420 0%, #4a1628 35%, #691C32 60%, #3a1322 85%, #2d1420 100%);
  background-size: 220% 220%;
  animation: hero-breathe 20s ease-in-out infinite;
```

Y añadir el keyframe justo después del cierre de la regla `.hero` (antes de `/* Fondo animado */`):

```css
@keyframes hero-breathe {
  0%, 100% { background-position: 0% 50%; }
  50%      { background-position: 100% 50%; }
}
```

- [ ] **Step 2: Reveal del título** — en `style.css:497`, en `.hero-title`, reemplazar la línea `animation: fade-in-up var(--dur-enter) 80ms var(--ease-out) both;` por:

```css
  animation: title-reveal 900ms 80ms var(--ease-out) both;
```

Y añadir después del cierre de `.hero-title em::after`:

```css
@keyframes title-reveal {
  from { clip-path: inset(0 0 100% 0); transform: translateY(26px); opacity: 0; }
  to   { clip-path: inset(0 0 -20% 0); transform: translateY(0);    opacity: 1; }
}
```

- [ ] **Step 3: Bloque "MICRO-INTERACCIONES PREMIUM"** — insertar ANTES de `/* ===== UTILIDADES ===== */` (~línea 2446):

```css
/* ================================================
   MICRO-INTERACCIONES PREMIUM
   ================================================ */

/* ── Cards: línea de acento superior + sombra doble al hover ── */
.material-card, .subsec-card, .det-card, .directory-card, .qa-card {
  position: relative;
}
.material-card::after, .subsec-card::after, .det-card::after, .directory-card::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  background: var(--nc-color, var(--crimson));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--dur-base) var(--ease-out);
  pointer-events: none;
}
.material-card:hover::after, .subsec-card:hover::after,
.det-card:hover::after, .directory-card:hover::after {
  transform: scaleX(1);
}
.material-card:hover, .subsec-card:hover, .det-card:hover, .directory-card:hover {
  box-shadow: 0 2px 8px rgba(30,27,24,.06), 0 18px 44px rgba(30,27,24,.13);
}

/* ── Botones: feedback táctil al presionar ── */
.btn:active, .filter-btn:active, .mc-btn:active,
.cs-btn:active, .carousel-btn:active, .subsec-link:active {
  transform: scale(.97);
  transition-duration: 80ms;
}

/* ── Nav links: subrayado animado (solo escritorio) ── */
@media (min-width: 901px) {
  .nav-link::after {
    content: '';
    position: absolute;
    left: 12px; right: 12px; bottom: 3px;
    height: 2px;
    border-radius: 1px;
    background: var(--crimson);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform var(--dur-base) var(--ease-out);
  }
  .nav-link:hover::after, .nav-link.active::after { transform: scaleX(1); }
}

/* ── Píldora deslizante de filtros (posicionada por JS) ── */
.filter-bar { position: relative; }
.filter-pill {
  position: absolute;
  background: var(--crimson);
  border-radius: 99px;
  z-index: 0;
  pointer-events: none;
  transition: left var(--dur-slow) var(--ease-spring),
              width var(--dur-slow) var(--ease-spring),
              top var(--dur-base) var(--ease-out),
              height var(--dur-base) var(--ease-out);
}
.filter-bar .filter-btn { position: relative; z-index: 1; }
.filter-bar.has-pill .filter-btn.active { background: transparent; color: var(--white); }

/* ── Transiciones de página (View Transitions API) ── */
@view-transition { navigation: auto; }
::view-transition-old(root) { animation: vt-out 160ms var(--ease-out) both; }
::view-transition-new(root) { animation: vt-in  220ms var(--ease-out) both; }
@keyframes vt-out { to   { opacity: 0; } }
@keyframes vt-in  { from { opacity: 0; } }
```

- [ ] **Step 4: Ajustes móviles** — dentro del `@media (max-width: 900px)` existente (después de la línea `.menu-toggle { display: flex; }`, ~línea 2406), añadir:

```css
  /* ── Premium móvil: animaciones más ágiles ── */
  :root {
    --dur-base:  150ms;
    --dur-slow:  240ms;
    --dur-enter: 360ms;
  }

  /* Áreas táctiles ≥ 44px */
  .filter-btn   { min-height: 44px; }
  .carousel-btn { width: 44px; height: 44px; }
  .inav-link    { padding-top: 12px; padding-bottom: 12px; }

  /* Menú móvil: entrada escalonada de links */
  .nav-links.open > * { animation: nav-item-in 300ms var(--ease-out) both; }
  .nav-links.open > *:nth-child(1) { animation-delay: 0ms; }
  .nav-links.open > *:nth-child(2) { animation-delay: 40ms; }
  .nav-links.open > *:nth-child(3) { animation-delay: 80ms; }
  .nav-links.open > *:nth-child(4) { animation-delay: 120ms; }
  .nav-links.open > *:nth-child(5) { animation-delay: 160ms; }
  .nav-links.open > *:nth-child(6) { animation-delay: 200ms; }
  .nav-links.open > *:nth-child(7) { animation-delay: 240ms; }
  .nav-links.open > *:nth-child(8) { animation-delay: 280ms; }
```

Y FUERA del media query (junto a los otros keyframes globales, p. ej. después del bloque de micro-interacciones del Step 3):

```css
@keyframes nav-item-in {
  from { opacity: 0; transform: translateX(-12px); }
  to   { opacity: 1; transform: translateX(0); }
}
```

- [ ] **Step 5: Verificar** según Acceptance Criteria (escritorio + DevTools 375px + reduced-motion).

- [ ] **Step 6: Commit**

```bash
git add style.css
git commit -m "feat: micro-interacciones premium, hero vivo y pulido móvil"
```

---

### Task 5: JS premium — píldora de filtros, parallax de carrusel, partículas móviles

**Goal:** Orquestación JS de las interacciones premium y corrección del bug de animación del carrusel.

**Files:**
- Modify: `script.js` — (a) conteo de partículas (~línea 104), (b) `goTo()` del carrusel (líneas 390–402), (c) nueva función `initFilterPill()`, (d) arranque global

**Acceptance Criteria:**
- [ ] En móvil se generan 8 partículas; en escritorio 18
- [ ] Al cambiar de slide, el contenido entra con desplazamiento lateral escalonado (las clases animadas EXISTEN en el DOM generado)
- [ ] La píldora del filtro activo se desliza al hacer clic en otro filtro
- [ ] Si JS no corre, el botón activo conserva su estilo actual (la clase `has-pill` nunca se añade)
- [ ] `prefers-reduced-motion` desactiva píldora y parallax

**Verify:** biblioteca.html → clic entre filtros desliza la píldora; index.html → flechas del carrusel animan `.cs-title` etc.; DevTools móvil → `document.querySelectorAll('.hero-particles span').length === 8`.

**Steps:**

- [ ] **Step 1: Partículas según viewport** — en `script.js` (~línea 104), reemplazar `const count = 18;` por:

```js
    const count = window.matchMedia('(max-width: 900px)').matches ? 8 : 18;
```

- [ ] **Step 2: Corregir y mejorar la animación de slide** — en `goTo()` (script.js:390–402), reemplazar el bloque `if (!prefersReducedMotion) { ... }` completo por:

```js
    // Parallax interno: el contenido del slide entra escalonado
    // NOTA (corregido en review): un solo rAF NO basta para que el navegador
    // aplique el estado oculto — hay que forzar reflow entre reset y animación.
    if (!prefersReducedMotion) {
      const active = slides[current];
      active.querySelectorAll('.cs-tag, .cs-title, .cs-meta, .cs-actions').forEach((el, i) => {
        el.style.transition = 'none';
        el.style.opacity   = '0';
        el.style.transform = 'translateX(26px)';
        void el.offsetWidth; // commit del estado oculto
        el.style.transition = `opacity 420ms ${i * 70}ms var(--ease-out),
                               transform 420ms ${i * 70}ms var(--ease-out)`;
        el.style.opacity   = '1';
        el.style.transform = 'translateX(0)';
      });
    }
```

(Las clases anteriores `.cs-header, .cs-content, .cs-materials` no existen en el HTML generado — era un bug silencioso.)

- [ ] **Step 3: Píldora de filtros** — añadir después de `initFilters()` (tras su `}` de cierre, ~línea 496):

```js
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
    if (e.target.classList.contains('filter-btn')) requestAnimationFrame(movePill);
  });
  // Reposicionar cuando carguen las webfonts (cambian el ancho de los botones)
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(movePill);
}
```

En ARRANQUE GLOBAL, después de `initFilters();` añadir:

```js
initFilterPill();
```

- [ ] **Step 4: Verificar** según Acceptance Criteria. Si Node disponible: `node --check script.js`.

- [ ] **Step 5: Commit**

```bash
git add script.js
git commit -m "feat: píldora de filtros, parallax de carrusel y partículas adaptativas"
```

---

### Task 6: Documentación + verificación final

**Goal:** CLAUDE.md refleja el nuevo sistema de datos y los comportamientos; verificación completa de las 8 páginas; push.

**Files:**
- Modify: `CLAUDE.md` — secciones "File structure", "JS behaviors", "Cómo añadir materiales a Biblioteca", "Pending integrations"

**Acceptance Criteria:**
- [ ] CLAUDE.md documenta `kpis.js`, `biblioteca.js`, `directorio.js` con instrucciones de edición
- [ ] La sección "Cómo añadir materiales" ya NO muestra el bloque HTML (ahora es editar `biblioteca.js`)
- [ ] Las 8 páginas cargan sin errores de consola
- [ ] Push a origin/master (GitHub Pages se actualiza solo)

**Steps:**

- [ ] **Step 1: Actualizar CLAUDE.md**

En "File structure", reemplazar el subárbol de `assets/data/` por:

```
    └── data/
        ├── campaigns.js    ← Campañas del carrusel (index)
        ├── kpis.js         ← Números de indicadores (index + reportes)
        ├── biblioteca.js   ← Materiales de la biblioteca
        └── directorio.js   ← Unidades de psicología y nutrición
```

Reemplazar la sección "## Cómo añadir materiales a Biblioteca" completa por:

```markdown
## Cómo añadir materiales a Biblioteca

Editar `assets/data/biblioteca.js` — añadir un objeto al array `BIBLIOTECA`:

​```js
{ titulo: "Título del material", categoria: "manuales",
  tema: "Tema", publico: "Personal de salud",
  modalidad: "Taller · 60 min",      // opcional
  actualizado: "Ene 2025",           // opcional
  url: "https://drive.google.com/...", accion: "Abrir en Drive" }
​```

`categoria` válidas (coinciden con los filtros): `lineamientos` · `manuales` · `formatos` · `noms` · `grafico` · `presentacion` · `documentos`

**KPIs:** editar `assets/data/kpis.js` (arrays `index` y `reportes`).
**Directorio:** editar `assets/data/directorio.js` (`tipo: "psicologia" | "nutricion"`).
```

En "JS behaviors", añadir al final de la lista:

```markdown
15. **`renderKPIs()` + `initKpiCounters()`** — KPI cards desde `kpis.js`, contadores animados al viewport
16. **`renderBiblioteca()`** — material-cards desde `biblioteca.js` (correr antes de `initFilters`)
17. **`renderDirectorio()`** — directory-cards desde `directorio.js` en grids `[data-dir]`
18. **`initFilterPill()`** — píldora deslizante bajo el filtro activo
19. **View Transitions** — cross-fade entre páginas (CSS, progressive enhancement)
```

En "Pending integrations", quitar las líneas de "KPI numbers" y "Directorio" (ya resueltas vía data files) y actualizar "Biblioteca links" a: "Reemplazar `url: "#"` en `assets/data/biblioteca.js` con URLs reales de Drive."

- [ ] **Step 2: Verificación integral**

Con el server corriendo, abrir las 8 páginas (`index`, `promocion`, `adicciones`, `salud-mental`, `entornos`, `biblioteca`, `reportes`, `directorio`):
- Consola limpia en todas
- index: carrusel + contadores KPI + hero respirando
- biblioteca: 25 cards + filtros + píldora
- reportes: contadores KPI
- directorio: 5 cards generadas
- DevTools móvil 375px: menú escalonado, táctiles ≥44px
- Emular `prefers-reduced-motion` → sin animaciones, todo visible

- [ ] **Step 3: Commit final + push**

```bash
git add CLAUDE.md
git commit -m "docs: sistema de datos JS y comportamientos premium en CLAUDE.md"
git push origin master
```

---

## Self-Review (ya aplicado)

- **Cobertura del spec:** hero vivo (T4), título clip-path (T4), partículas adaptativas (T5), contadores KPI (T1), micro-interacciones cards/botones/nav (T4), parallax carrusel (T5), píldora filtros (T4+T5), View Transitions (T4), menú escalonado (T4), táctiles 44px (T4), duraciones móviles (T4), biblioteca.js (T2), kpis.js (T1), directorio.js (T3), mensajes de vacío (T1–T3), CLAUDE.md (T6). Sin huecos.
- **Tipos consistentes:** `data-kpis`/`KPIS.{index,reportes}`, `data-dir`/`DIRECTORIO[].tipo`, `data-categoria`/`BIBLIOTECA[].categoria` alineados entre tareas.
- **Sin placeholders:** todo el código está completo en cada paso.
