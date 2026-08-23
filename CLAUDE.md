# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Multi-page internal staff platform for the **Departamento de Promoción a la Salud, Jurisdicción Sanitaria Texcoco, ISEM** (Instituto de Salud del Estado de México). Dependency-free HTML/CSS/JS — no build step, no Node, no frameworks. Open any `.html` directly in a browser or via Live Server.

## File structure

```
/
├── index.html               ← Portal (hero + carousel + KPIs + 8 nav-cards)
├── promocion.html           ← Promoción de la Salud (9 determinantes + subsecciones)
├── adicciones.html          ← Adicciones (prevención, tamizajes, capacitación)
├── salud-mental.html        ← Salud Mental (bienestar, suicidio, violencia, infancias)
├── entornos.html            ← Entornos Saludables (escuelas, comunidades, ELHT) — rejillas por faceta
├── biblioteca.html          ← Hub: búsqueda + filtros facetados sobre el índice completo
├── reportes.html            ← Reportes e Indicadores (KPIs + tablas descargables)
├── directorio.html          ← Directorio de Atención (unidades + psicología/nutrición)
├── recursos-psicologia.html ← Recursos de Psicología (catálogo de materiales clínicos)
├── style.css           ← Compartido — todos los componentes
├── script.js           ← Comportamientos compartidos + carousel + filtros
├── components.js       ← Navbar + footer como template literals (inyectados via JS)
└── assets/
    ├── img/logo-ps.png
    └── data/
        ├── recursos.js     ← ÍNDICE ÚNICO: todos los materiales del sitio
        ├── campaigns.js    ← Campañas (carrusel index + grid promocion)
        ├── kpis.js         ← Números de indicadores (index + reportes)
        └── directorio.js   ← Unidades de psicología y nutrición
```

`recursos.js` sustituyó a `biblioteca.js`, `talleres.js`, `formularios.js`,
`psicologia.js` y a las 62 tarjetas que estaban escritas a mano dentro de
`entornos.html`. Los archivos antiguos siguen en el historial de git.

**`recursos.js` se carga en las 9 páginas**: el buscador global del navbar lo
necesita en todas. Si falta, el botón de búsqueda se retira solo en vez de
quedarse sin hacer nada.

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

<script src="assets/data/recursos.js"></script>  <!-- si la página tiene [data-recursos] -->
<script src="assets/data/campaigns.js"></script> <!-- solo index y promocion -->
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
| `.filter-bar-wrap` / `.filter-search` / `.filter-btn[data-faceta]` | Búsqueda + filtros facetados | `biblioteca.html`, `promocion.html` |
| `.material-card` | Tarjeta de recurso (la genera `renderRecursos`) | biblioteca, promocion, entornos, reportes, recursos-psicologia |
| `.subsec-group` / `.section-crosslink` / `.grid-more` | Agrupador, enlace cruzado y «ver todos» | `entornos.html`, `reportes.html` |
| `.det-grid` / `.det-card` | Cards de determinantes sociales | `promocion.html` |
| `.subsec-grid` / `.subsec-card` | Cards de subsección genérica | Todas las páginas |
| `.directory-grid` / `.directory-card` | Tarjeta de unidad médica | `directorio.html` |
| `.report-table` / `.report-row` | Tabla de reportes (div-based) | `adicciones.html`, `reportes.html` |
| `.inline-nav-wrap` / `.inav-link` | Nav interna sticky | `promocion.html`, `entornos.html` |
| `.page-hero` | Hero de página interior | Todas excepto `index.html` |
| `.alert-banner` | Banda de alerta superior | `salud-mental.html`, `directorio.html` |
| `.section-tag` | Etiqueta colorida de sección | Todas las páginas |
| `.nav-search-btn` / `.search-dialog` | Buscador global (`<dialog>`) | Inyectado por `components.js` en todas |

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
5. **Parallax hero** — `.hero-bg-pattern` al 18% velocidad, dentro del mismo oyente de scroll (uno solo, agrupado con `requestAnimationFrame`)
6. **Button ripple** — `.btn-ripple` en punto de click
7. **Reveal animations** — `IntersectionObserver` + clase `.visible` + CSS `--stagger`. Se inicializa **al final** del arranque, cuando ya existe todo lo generado por JS. Excluye `.material-card` y `.directory-card` a propósito: su visibilidad la gobierna el filtro
8. **Section headers stagger** — tag → h2 → p con 80ms diferencia
9. **Contact form** — spinner + `#form-success` (5s auto-oculta)
10. **`renderCampaigns()`** — genera `.carousel-slide` desde array `CAMPAIGNS` en `campaigns.js`
11. **`initCarousel()`** — prev/next, dots, swipe táctil, arrastre mouse, teclado (←/→)
12. **`initFiltros()`** — filtros facetados: `.filter-btn[data-faceta][data-valor]` + búsqueda de texto. Escribe el estado en la URL (`history.replaceState`), anuncia el conteo en un `role="status"` y muestra estado vacío
13. **`prefers-reduced-motion`** — desactiva toda animación si el usuario lo prefiere
14. **`renderKPIs()` + `initKpiCounters()`** — KPI cards desde `kpis.js`, contadores animados al viewport
15. **`renderRecursos()`** — rellena TODA rejilla `[data-recursos]` desde `recursos.js` según sus facetas. Corre ANTES de `initFiltros`
16. **`renderDirectorio()`** — directory-cards desde `directorio.js` en grids `[data-dir]`
17. **`initFilterPill()`** — píldora deslizante bajo el filtro activo (progressive enhancement vía clase `has-pill`)
18. **View Transitions** — cross-fade entre páginas (CSS puro, con excepción explícita para reduced-motion)
19. **`renderCampaignsGrid()`** — genera `.subsec-card` en `promocion.html#campanas` desde el MISMO `CAMPAIGNS` que el carrusel (fuente única, no duplicar)
20. **`renderContacto()`** — rellena la sección de contacto (`index.html`) desde `window.CONTACTO`
21. **`initTallerDeepLinks()`** — los enlaces `[data-filter]` (det-cards) activan el filtro del catálogo de talleres
22. **`initFiltros()` honra `?programa=&tipo=&tema=&q=`** — deep-links facetados desde cualquier página; el filtro también escribe la URL, así que se puede compartir y el botón «atrás» lo deshace
23. **Acordeón móvil** — los `.dropdown-toggle` responden al clic con `aria-expanded`; `Escape` cierra y devuelve el foco
24. **Skip link + `:focus-visible`** — «Saltar al contenido» y anillo de foco global
25. **`initBuscadorGlobal()`** — buscador en el navbar sobre el índice completo, en las 9 páginas. `<dialog>` nativo (foco atrapado y Escape sin código propio), atajo `Ctrl/⌘ K` y `/`, resultados agrupados por programa (tope de 5 + «ver los N»), flechas para recorrer, sugerencias con el campo vacío
26. **`renderEvidencias()`** — el flujo de evidencias (3 pasos) en `[data-evidencias="<programa>"]`. Estaba escrito 5 veces con destinos contradictorios; ahora **todas las páginas envían al mismo sitio**: `reportes.html#formularios`
27. **`renderDirectorio()` con `data-dir-tema` y `data-dir-formato="compacto"`** — los 6 servicios externos de referencia salen de `directorio.js`; salud-mental muestra solo los de crisis sin repetir los teléfonos
28. **`normaliza()` + `coincideTexto()`** — búsqueda sin acentos y multi-palabra: «cedula escuela» encuentra «Cédula … Escolar». La usan el buscador global y los filtros de página

### Conexiones clave (mapa de navegación)

- **Inicio = centro de mando:** el strip de accesos rápidos (`.qa-grid`, 8 atajos) lleva a lo que el personal más usa: Catálogo de Talleres, Enviar reporte mensual, Biblioteca de Formatos, Recursos de Psicología, Determinantes, Directorio, Indicadores, Jornadas.
- **Hub de reportes:** las secciones de evidencias de promoción, adicciones, salud-mental y entornos enlazan a `reportes.html#formularios` (captura mensual única).
- **Catálogo de talleres:** las 9 det-cards (`data-filter`) y `promocion.html#talleres` comparten las 9 categorías; el filtro se activa por deep-link.

## Fuentes únicas (DRY — editar en un solo lugar)

- **Datos de contacto** (dirección, teléfonos, email, Facebook): objeto `CONTACTO` al inicio de `components.js`. Alimenta el footer, la barra superior (top-bar) y, vía `window.CONTACTO` + `renderContacto()`, la sección de contacto de `index.html`. **Editar solo `CONTACTO`.**
- **Recursos**: array `RECURSOS` en `assets/data/recursos.js`. Alimenta la Biblioteca, el catálogo de talleres, los formularios de reporte, los recursos de psicología y las cuatro secciones de `entornos.html`. **Nunca duplicar una tarjeta en el HTML.**
- **Campañas**: array `CAMPAIGNS` en `assets/data/campaigns.js`. Alimenta el carrusel de `index.html` (`renderCampaigns`) y las tarjetas de `promocion.html#campanas` (`renderCampaignsGrid`).
- **KPIs**: `assets/data/kpis.js` (index + reportes).
- **Determinantes = Catálogo**: las 9 `det-card` de `promocion.html#determinantes` son las mismas 9 categorías del catálogo de talleres; su botón "Ver talleres" filtra el catálogo vía `data-filter`.

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

## Cómo añadir un recurso (biblioteca, taller, formulario, formato…)

**Un solo archivo: `assets/data/recursos.js`.** Añadir un objeto al array `RECURSOS`:

```js
{ titulo: 'Cédula de Incorporación',
  descripcion: 'Formato oficial para incorporar la escuela al programa.',
  programa: 'entornos',      // faceta 1
  tipo: 'formato',           // faceta 2
  tema: ['escuelas'],        // faceta 3 (array, puede ir vacío)
  subtema: 'Certificación',  // texto libre, opcional, solo se muestra
  publico: 'Personal de salud',
  modalidad: 'Mensual',      // opcional
  actualizado: 'Ene 2025',   // opcional
  url: 'https://docs.google.com/...',
  accion: 'Abrir formato',
  complementos: 'https://drive...',  // opcional, 2º botón
  estado: 'ok' }
```

### Las tres facetas

| Faceta | Valores válidos |
|---|---|
| `programa` | `transversal` · `promocion` · `adicciones` · `salud-mental` · `entornos` |
| `tipo` | `formato` · `normativa` · `nom` · `manual` · `grafico` · `presentacion` · `documento` · `taller` · `formulario` · `enlace` |
| `tema` | determinantes: `alimentacion` `actividad` `salud-sexual` `entornos-fisicos` `entornos-psicosociales` `infancia` `diversidad` `derecho-salud` `participacion` · entornos: `escuelas` `comunidades` `laborales` `unidades` · otros: `psicologia` `ferias` |

### `estado` — nunca más un enlace muerto

| Valor | Efecto |
|---|---|
| `ok` | Se renderiza como enlace normal |
| `pendiente` | Se renderiza apagado y **sin `<a>`**: «Próximamente». Usar en vez de `url: "#"` |
| `rehospedar` | Funciona, pero el archivo vive en la cuenta Wix. Marca interna, no se muestra |

**No usar nunca `href="#"` en el HTML.** Para una tarjeta cuyo material aún no
existe, va `<span class="subsec-link is-pending">Próximamente</span>`; en la tabla
de reportes, `<span class="rr-link is-pending">`. El sitio tiene 0 enlaces muertos
y conviene que siga así.

Para un **tipo nuevo** hay 3 puntos de contacto: `TIPO_LABELS` en `script.js`, un `.filter-btn` en `biblioteca.html` y una regla `.mc-cat.X` en `style.css`.

### Cómo se consume

Cualquier rejilla con `[data-recursos]` se rellena sola; las facetas se declaran en el HTML:

```html
<div class="material-grid" data-recursos
     data-programa="entornos" data-tema="escuelas" data-tipo="formato"></div>

<!-- data-tipo admite varios separados por espacio -->
<div class="material-grid" data-recursos data-tema="escuelas"
     data-tipo="normativa nom manual"></div>

<!-- data-limite recorta y añade un enlace "ver los N en la Biblioteca" -->
<div class="material-grid" data-recursos data-programa="promocion" data-limite="6"></div>
```

Y se enlaza desde otras páginas con las mismas facetas en la URL:
`biblioteca.html?programa=entornos&tipo=formato&tema=escuelas&q=cédula`

El parámetro anterior `?cat=` se sigue aceptando (se traduce a `tipo` o a `tema`),
para que no se rompan los enlaces que el personal ya tenga guardados o impresos.

**KPIs:** editar `assets/data/kpis.js` (arrays `index` y `reportes` — un solo lugar para ambas páginas).
**Directorio:** editar `assets/data/directorio.js` (`tipo: "psicologia" | "nutricion" | "referencia"`).
Los de tipo `referencia` son servicios externos y llevan `tema` (`crisis` | `adicciones` | `violencia`) y, si aplica, `telefono` (solo dígitos, para el enlace `tel:`).

## Bloques repetidos: usar el componente, no copiar HTML

| Bloque | Cómo se pone | Fuente |
|---|---|---|
| Flujo de evidencias | `<div data-evidencias="promocion"></div>` | `EVIDENCIA_BASE` + `EVIDENCIA_POR_PROGRAMA` en `script.js` |
| Servicios de referencia | `<div class="directory-grid" data-dir="referencia"></div>` | `directorio.js` |
| Solo los teléfonos, dentro de una tarjeta | `<div data-dir="referencia" data-dir-tema="crisis" data-dir-formato="compacto"></div>` | `directorio.js` |

`data-evidencias` acepta un programa o `"todos"`. Solo hay que añadir una entrada
a `EVIDENCIA_POR_PROGRAMA` si el requisito de ese programa es **realmente distinto**
del general (hoy solo entornos lo es).

**Los tamizajes NO son un bloque repetido.** CAGE, AUDIT, ASSIST, el tamizaje de
violencia (NOM-046) y los preventivos son instrumentos distintos que solo comparten
la palabra. No hay que componentizarlos: basta con enlazarlos entre sí.

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
- **Datos reales:** Números placeholder en `kpis.js` y unidades/horarios en `directorio.js`.
- **Favicon:** Crear con `--crimson` / `--gold`.
- **URLs de talleres (Canva):** Las URLs del catálogo de talleres usan el patrón `https://www.canva.com/design/ID/view`. Verificar que el token de compartir esté activo (modo "Cualquier persona con el enlace puede ver") antes de publicar.
- **28 recursos en `estado: 'pendiente'`** en `recursos.js`: sustituir `url` y poner `estado: 'ok'` conforme lleguen los enlaces.
- **17 recursos en `estado: 'rehospedar'`**: alojados en la cuenta Wix (`*.filesusr.com`); re-alojar en Drive antes del despliegue definitivo.

## Deployment

```powershell
git init
git add .
git commit -m "init: plataforma interna Promoción a la Salud"
git remote add origin https://github.com/USUARIO/promocion-salud.git
git push -u origin main
# Activar GitHub Pages: Settings > Pages > Branch: main
```
