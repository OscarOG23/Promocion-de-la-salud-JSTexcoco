# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Multi-page internal staff platform for the **Departamento de Promoción a la Salud, Jurisdicción Sanitaria Texcoco, ISEM** (Instituto de Salud del Estado de México). Dependency-free HTML/CSS/JS — no build step, no Node, no frameworks. Open any `.html` directly in a browser or via Live Server.

## File structure

```
/
├── index.html          ← Portal (hero + carousel + KPIs + 8 nav-cards)
├── promocion.html      ← Promoción de la Salud (9 determinantes + subsecciones)
├── adicciones.html     ← Adicciones (prevención, tamizajes, capacitación)
├── salud-mental.html   ← Salud Mental (bienestar, suicidio, violencia, infancias)
├── entornos.html       ← Entornos Saludables (escuelas, comunidades, ELHT)
├── biblioteca.html     ← Biblioteca con filtros (26+ material-cards)
├── reportes.html       ← Reportes e Indicadores (KPIs + tablas descargables)
├── directorio.html     ← Directorio de Atención (unidades + psicología/nutrición)
├── style.css           ← Compartido — todos los componentes
├── script.js           ← Comportamientos compartidos + carousel + filtros
├── components.js       ← Navbar + footer como template literals (inyectados via JS)
└── assets/
    ├── img/logo-ps.png
    └── data/
        ├── campaigns.js    ← Campañas del carrusel (index)
        ├── kpis.js         ← Números de indicadores (index + reportes)
        ├── biblioteca.js   ← Materiales de la biblioteca
        └── directorio.js   ← Unidades de psicología y nutrición
```

## Development

```powershell
# Python (si disponible)
python -m http.server 8080

# VS Code: extensión Live Server (recomendado)
```

## Multi-page architecture

`components.js` exporta el HTML del navbar y footer como template literals. Cada página los inyecta en:

```html
<div id="site-nav"></div>
<!-- ... contenido de la página ... -->
<div id="site-footer"></div>

<script src="campaigns.js"></script>   <!-- solo en index.html -->
<script src="components.js"></script>
<script src="script.js"></script>
```

El navbar detecta la página activa comparando `window.location.pathname` con atributos `data-page` en cada `<a>`:

```js
const page = location.pathname.split('/').pop().replace('.html','') || 'index';
document.querySelectorAll('[data-page]').forEach(a => {
  if (a.dataset.page === page) a.classList.add('active');
});
```

## Section HTML pattern

```html
<section class="section-block [alt]" id="SECTION-ID">
  <div class="container">
    <div class="section-header">
      <div class="section-tag [crimson|teal|gold|purple|white]">Label</div>
      <h2>Título</h2>
      <p>Descripción corta.</p>
    </div>
    <!-- grid específico -->
  </div>
</section>
```

`.section-block` = fondo blanco · `.section-block.alt` = fondo `--off-white`

## CSS components

| Clase raíz | Descripción | Dónde se usa |
|---|---|---|
| `.carousel` / `.carousel-slide` | Carrusel de campañas | `index.html` |
| `.kpi-grid` / `.kpi-card` | Tarjetas numéricas de indicadores | `index.html`, `reportes.html` |
| `.nav-cards-grid` / `.nav-card` | 8 tarjetas de navegación principal | `index.html` |
| `.filter-bar-wrap` / `.filter-btn` | Barra de filtros sticky | `biblioteca.html` |
| `.material-card` | Tarjeta de recurso con metadatos | `biblioteca.html` |
| `.det-grid` / `.det-card` | Cards de determinantes sociales | `promocion.html` |
| `.subsec-grid` / `.subsec-card` | Cards de subsección genérica | Todas las páginas |
| `.directory-grid` / `.directory-card` | Tarjeta de unidad médica | `directorio.html` |
| `.report-table` / `.report-row` | Tabla de reportes (div-based) | `adicciones.html`, `reportes.html` |
| `.inline-nav-wrap` / `.inav-link` | Nav interna sticky | `promocion.html`, `entornos.html` |
| `.page-hero` | Hero de página interior | Todas excepto `index.html` |
| `.alert-banner` | Banda de alerta superior | `salud-mental.html`, `directorio.html` |
| `.section-tag` | Etiqueta colorida de sección | Todas las páginas |

### Color theming via CSS custom properties

```css
/* Nav-cards: --nc-color se pasa inline en cada tarjeta */
<article class="nav-card" style="--nc-color: var(--teal)">
/* → .nc-icon usa color-mix(in srgb, var(--nc-color) 10%, transparent) */

/* KPI cards: --kpi-color se pasa inline */
<div class="kpi-card" style="--kpi-color: var(--crimson)">
/* → .kpi-number usa color: var(--kpi-color, var(--crimson)) */

/* Carousel slides: data-color en cada <article> */
<article class="carousel-slide" data-color="crimson">
/* → [data-color="crimson"] .cs-accent { background: ... } */
```

## JS behaviors (script.js)

1. **Scroll progress bar** — barra en `#scroll-progress`
2. **Navbar glassmorphism** — clase `.scrolled` al `scrollY > 20`
3. **Hamburger animado** — clase `.active` en `.menu-toggle`
4. **Partículas hero** — 18 `<span>` en `.hero-particles`
5. **Parallax hero** — `.hero-bg-pattern` al 18% velocidad
6. **Button ripple** — `.btn-ripple` en punto de click
7. **Tilt 3D** — `.program-card` sigue cursor (4deg máx)
8. **Reveal animations** — `IntersectionObserver` + clase `.visible` + CSS `--stagger`
9. **Section headers stagger** — tag → h2 → p con 80ms diferencia
10. **Contact form** — spinner + `#form-success` (5s auto-oculta)
11. **`renderCampaigns()`** — genera `.carousel-slide` desde array `CAMPAIGNS` en `campaigns.js`
12. **`initCarousel()`** — prev/next, dots, swipe táctil, arrastre mouse, teclado (←/→)
13. **`initFilters()`** — `.filter-btn[data-cat]` filtra `.material-card[data-categoria]`, fade animado
14. **`prefers-reduced-motion`** — desactiva toda animación si el usuario lo prefiere
15. **`renderKPIs()` + `initKpiCounters()`** — KPI cards desde `kpis.js`, contadores animados al viewport
16. **`renderBiblioteca()`** — material-cards desde `biblioteca.js` (corre ANTES de `initFilters`)
17. **`renderDirectorio()`** — directory-cards desde `directorio.js` en grids `[data-dir]`
18. **`initFilterPill()`** — píldora deslizante bajo el filtro activo (progressive enhancement vía clase `has-pill`)
19. **View Transitions** — cross-fade entre páginas (CSS puro, con excepción explícita para reduced-motion)

## Cómo actualizar campañas

Editar `assets/data/campaigns.js`. Cada campaña es un objeto:

```js
{
  titulo: "Nombre de la Campaña",
  objetivo: "Prevenir transmisión de X",
  poblacion: "Adultos, mujeres embarazadas",
  vigencia: "Dic 2025",
  color: "crimson",          // crimson | teal | purple | charcoal
  materiales: [
    { tipo: "Póster", url: "https://drive.google.com/...", icono: "image" },
    { tipo: "Presentación", url: "#", icono: "slides" }
  ],
  evidenciaSugerida: "Lista de asistencia + foto del grupo"
}
```

Valores válidos para `icono`: `"image"`, `"slides"`, `"video"`, `"doc"`, `"link"`

## Cómo añadir materiales a Biblioteca

Editar `assets/data/biblioteca.js` — añadir un objeto al array `BIBLIOTECA`:

```js
{ titulo: "Título del material", categoria: "manuales",
  tema: "Tema", publico: "Personal de salud",
  modalidad: "Taller · 60 min",      // opcional
  actualizado: "Ene 2025",           // opcional
  url: "https://drive.google.com/...", accion: "Abrir en Drive" }
```

`categoria` válidas (coinciden con los `data-cat` de los filtros):
`lineamientos` · `manuales` · `formatos` · `noms` · `grafico` · `presentacion` · `documentos`

Para añadir una categoría NUEVA hay 3 puntos de contacto: `CAT_LABELS` en `script.js`, un `.filter-btn` en `biblioteca.html` y una regla de color `.mc-cat.X` en `style.css`.

**KPIs:** editar `assets/data/kpis.js` (arrays `index` y `reportes` — un solo lugar para ambas páginas).
**Directorio:** editar `assets/data/directorio.js` (`tipo: "psicologia" | "nutricion"`).

## Design system

```css
--crimson:    #9F2241   /* Pantone 201 C — primario dominante */
--crimson-dk: #691C32
--gold:       #BC955C   /* Pantone 110 C — secundario */
--gold-dk:    #9A7840
--teal:       #235B4E   /* Pantone 336 C */
--teal-dk:    #1A4438
--sand:       #DDC9A3   /* Pantone 7501 C */
--purple:     #5C3D8F   /* Salud Mental */
--charcoal:   #4A4848
```

**Tipografía:** `Fraunces` (display/headings, weight 300) · `DM Sans` (body/UI, 400/500)

**Tokens de animación:** `--ease-out` · `--ease-spring` · `--dur-fast` 150ms · `--dur-base` 250ms · `--dur-slow` 400ms · `--dur-enter` 600ms

**Responsive:** `≤ 900px` hamburger nav + grids 2 cols · `≤ 580px` 1 columna

## Logo

```html
<div class="brand-icon">
  <img src="assets/img/logo-ps.png" alt="Promoción a la Salud ISEM"
       onerror="this.style.display='none';this.parentElement.textContent='PS'">
</div>
```

## Pending integrations

- **SIJ iframe:** Reemplazar `.sij-placeholder` en `index.html#jornadas`:
  ```html
  <iframe src="https://script.google.com/macros/s/DEPLOYMENT_ID/exec"
    width="100%" height="650" frameborder="0"
    style="border-radius:12px; border:none;"></iframe>
  ```
- **Contact form:** Conectar `handleForm()` a Formspree (`https://formspree.io/f/XXXX`).
- **Datos reales:** Reemplazar `url: "#"` en `assets/data/biblioteca.js`, números placeholder en `kpis.js` y unidades/horarios en `directorio.js`.
- **Favicon:** Crear con `--crimson` / `--gold`.

## Deployment

```powershell
git init
git add .
git commit -m "init: plataforma interna Promoción a la Salud"
git remote add origin https://github.com/USUARIO/promocion-salud.git
git push -u origin main
# Activar GitHub Pages: Settings > Pages > Branch: main
```
