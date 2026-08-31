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
├── paquete-garantizado.html ← Paquete Garantizado (4 vistas sobre acciones.json)
├── style.css           ← Compartido — todos los componentes
├── script.js           ← Comportamientos compartidos + carousel + filtros
├── components.js       ← Navbar + footer como template literals (inyectados via JS)
├── paquete.js          ← Solo del módulo Paquete Garantizado
├── datos/
│   └── acciones.json   ← Las 133 Acciones Integradas de Línea de Vida
└── assets/
    ├── img/logo-ps.png
    ├── vendor/leaflet/    ← Leaflet 1.9.4 alojado (mapa del directorio)
    └── data/
        ├── recursos.js     ← ÍNDICE ÚNICO: todos los materiales del sitio
        ├── campaigns.js    ← Campañas (carrusel index + grid promocion)
        ├── kpis.js         ← Números de indicadores (index + reportes)
        └── directorio.js   ← Unidades de psicología y nutrición
```

Son **10 páginas**. `paquete-garantizado.html` es la única que **no** enlaza
Google Fonts: el módulo tiene que abrir sin internet, así que redefine
`--font-display` / `--font-body` a Cambria/Calibri sobre `body.pg-body`.

`recursos.js` sustituyó a `biblioteca.js`, `talleres.js`, `formularios.js`,
`psicologia.js` y a las 62 tarjetas que estaban escritas a mano dentro de
`entornos.html`. Los archivos antiguos siguen en el historial de git.

**`recursos.js` se carga en las 10 páginas**: el buscador global del navbar lo
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
| `.rec-group` / `.rg-head` / `.rg-count` | Grupo plegable por subtema (`<details>`) | `promocion.html#talleres` |
| `.mc-files` / `.mc-mas` / `.mc-num` | Botonera de N materiales por ficha, con pliegue «+N» | Toda ficha con `materiales` |
| `.unidad-card` / `.uc-serv` / `.mapa-barra` | Ficha de unidad con píldoras de servicio y enlaces a Maps | `directorio.html#mapa` |
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
22. **Encabezado del grupo activo** — `.filter-heading` aparece al aplicar cualquier faceta y se va sola al quitarla: nombre legible, conteo y un chip con × por faceta (la búsqueda incluida) que quita solo esa. Las páginas sin filtro (entornos, reportes) reciben el mismo trato con `.sg-count` en sus `.subsec-group`
23. **`initFiltros()` honra `?programa=&tipo=&tema=&q=`** — deep-links facetados desde cualquier página; el filtro también escribe la URL, así que se puede compartir y el botón «atrás» lo deshace
24. **Acordeón móvil** — los `.dropdown-toggle` responden al clic con `aria-expanded`; `Escape` cierra y devuelve el foco
25. **Skip link + `:focus-visible`** — «Saltar al contenido» y anillo de foco global
26. **`initBuscadorGlobal()`** — buscador en el navbar sobre el índice completo, en las 10 páginas. `<dialog>` nativo (foco atrapado y Escape sin código propio), atajo `Ctrl/⌘ K` y `/`, resultados agrupados por programa (tope de 5 + «ver los N»), flechas para recorrer, sugerencias con el campo vacío
27. **`renderEvidencias()`** — el flujo de evidencias (3 pasos) en `[data-evidencias="<programa>"]`. Estaba escrito 5 veces con destinos contradictorios; ahora **todas las páginas envían al mismo sitio**: `reportes.html#formularios`

28. **`renderDirectorio()` con `data-dir-tema` y `data-dir-formato="compacto"`** — los 6 servicios externos de referencia salen de `DIRECTORIO`; salud-mental muestra solo los de crisis sin repetir los teléfonos. `data-dir="psicologia"` y `data-dir="nutricion"` ya no son un tipo de ficha sino un **servicio**, y salen de `UNIDADES`
29. **`normaliza()` + `coincideTexto()`** — búsqueda sin acentos y multi-palabra: «cedula escuela» encuentra «Cédula … Escolar». La usan el buscador global y los filtros de página
30. **Grupos plegables por subtema** — `data-agrupar="subtema"` en una rejilla `[data-recursos]` reparte el resultado en `<details>`, uno por subtema, en el orden del índice. El catálogo son 9 determinantes → **24 subtemas** → **77 fichas** (68 talleres + 9 presentaciones de subtema). Al filtrar, el grupo que se queda sin resultados **se retira entero** y el que sí tiene se abre solo aunque estuviera plegado
31. **`materiales: [...]`** — una ficha admite **cualquier número** de archivos (presentación, guion, audio, infografía, fuentes…). Los 3 primeros se ven; el resto se pliega tras «+N materiales». Un material sin `url` se pinta «en elaboración», sin enlace. `url`/`accion`/`complementos` siguen funcionando
32. **`renderUnidades()`** — el mapa operativo de `directorio.html#mapa`: una ficha por unidad, píldoras de color por servicio y enlaces «Ver en el mapa» / «Cómo llegar» armados con `lat`/`lng`. Los botones de filtro (servicio y municipio) **se generan desde los datos**: no hay lista que mantener en el HTML
33. **`renderNotebooks()`** — un cuaderno de NotebookLM por determinante, desde `assets/data/notebooks.js`. Rellena la sección `promocion.html#asistente` y el enlace «Preguntar» de cada det-card (`data-notebook="<tema>"`). Sin enlace publicado la tarjeta sale apagada: **nunca se promete un asistente que no existe**

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

### Un recurso con varios archivos

Cuando un tema trae paquete completo, en vez de `url` + `complementos` se usa
`materiales`, que **no tiene tope**:

```js
materiales: [
  { tipo: 'Presentación',  icono: 'presentacion', url: 'talleres/C02-02.html' },
  { tipo: 'Guion',         icono: 'documento', url: GD.doc('1AbC…') },
  { tipo: 'Audio resumen', icono: 'audio',     url: GD.archivo('1DeF…') },
  { tipo: 'Infografía',    icono: 'imagen',    url: GD.archivo('1GhI…') },
  { tipo: 'Fuentes',       icono: 'carpeta',   url: GD.carpeta('1JkL…') },
  { tipo: 'Cuaderno',      icono: 'documento' },   // sin url = «en elaboración»
]
```

El primero es el botón principal; a partir del cuarto se pliegan tras
«+N materiales». `icono`: `presentacion` · `documento` · `hoja` · `video` ·
`audio` · `imagen` · `carpeta` · `mapa` · `formulario` · `enlace` · `descarga`.

`GD` son atajos de Drive definidos al principio de `recursos.js`: se pega
**solo el ID** del archivo, no la URL entera.

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
**Directorio:** editar `assets/data/directorio.js`, que ahora tiene **dos listas**:

- `UNIDADES` — las **76 unidades de salud** de la Jurisdicción, no las coordinaciones: la coordinación es estructura administrativa, y quien busca atención busca la unidad. Cada una con su `clues` de IMSS Bienestar (MCIMB…), su `cluesSSA` (MCSSA…), `tipologia`, `municipio`, `servicios: []` y `lat`/`lng`. De aquí salen el mapa operativo y las rejillas por servicio.
- `DIRECTORIO` — solo los servicios **externos** de referencia (`tipo: "referencia"`), con `tema` (`crisis` | `adicciones` | `violencia`) y `telefono` (solo dígitos).

`lat`/`lng` son números en grados decimales **con el signo**: aquí la longitud es negativa (~-98.9). Sin coordenadas la ficha dice «Ubicación por cargar» y no rompe nada, así que se pueden ir cargando poco a poco. Un servicio nuevo se añade con una línea en `SERVICIOS` y su filtro aparece solo.
Los de tipo `referencia` son servicios externos y llevan `tema` (`crisis` | `adicciones` | `violencia`) y, si aplica, `telefono` (solo dígitos, para el enlace `tel:`).

## Mapa de unidades (Leaflet)

`directorio.html#mapa` lleva un mapa real sobre la misma rejilla de fichas.

**Leaflet 1.9.4 vive en el repo**, en `assets/vendor/leaflet/` (173 KB), no en
un CDN: así el mapa no depende de que un tercero responda. Lo único que pide
red son los mosaicos de OpenStreetMap. Si Leaflet no cargara, el mapa se
sustituye por un aviso y **la rejilla de abajo sigue funcionando**: el mapa es
un atajo visual, la lista es la fuente de verdad.

- **Un solo filtro, dos vistas.** La condición vive en `pasa(u)` dentro de
  `renderUnidades()`; las fichas y los puntos la usan igual. Al elegir un
  municipio el mapa reencuadra sobre esas unidades.
- **Color por tipo de unidad** (`MAPA_COLORES`), con leyenda generada desde
  los datos: solo salen los tipos que de verdad tienen unidades con punto.
- **`invalidateSize()` no es opcional.** Leaflet mide el contenedor al
  crearse; si el diseño aún no cuajó se queda con una medida vieja y los
  mosaicos no llenan la caja. Hay un `ResizeObserver` sobre el lienzo y una
  llamada antes de cada reencuadre.
- **Sin zoom con la rueda**: en una página larga, atrapar el scroll dentro
  del mapa es de las cosas que más molestan.
- El globo de cada punto trae nombre, tipo, municipio, servicios y los dos
  enlaces a Google Maps. Se arman desde `lat`/`lng`, no desde la URL larga
  de Google.

Al actualizar Leaflet hay que volver a bajar los cinco archivos de
`assets/vendor/leaflet/` y subir la versión, como con cualquier otro asset.

## Enlaces de Drive: visor y descarga

Un material alojado en Google enseña **dos botones**: el principal abre el
visor y, pegado a él, un botón solo con icono baja el archivo.

**La URL de descarga no se guarda en `recursos.js`.** Se deriva del mismo id
en `script.js` (`visorDrive()` y `descargaDrive()`). Guardar las dos sería
duplicar el dato y con el tiempo acabarían apuntando a archivos distintos.

| Destino | Botón «ver» | Botón «bajar» |
|---|---|---|
| Slides | `/preview` | `/export/pdf` |
| Documento | `/preview` | `/export?format=pdf` |
| Hoja | `/preview` | `/export?format=xlsx` |
| Archivo suelto | `/view` (el visor de Drive ya trae sus botones) | `uc?export=download&id=` |
| **Carpeta** | tal cual | ninguno: no es un archivo |
| **Formulario** | `viewform` | ninguno: se contesta, no se baja |
| Local o sitio externo | tal cual | ninguno |

**Nunca `/edit` en el índice.** Abre el editor: pide permisos, en el móvil
ofrece instalar la app y deja que alguien modifique el original. Los atajos
`GD.slides` / `GD.doc` / `GD.hoja` ya generan `/preview`, y `visorDrive()`
endereza como red de seguridad cualquier `/edit` que se cuele después.

`descarga: false` en un material quita el botón de bajar, para algo que se
pueda consultar pero no repartir como archivo.

**Compartir sigue siendo el requisito.** Ninguna forma de URL arregla un
archivo que no esté como «Cualquier persona con el enlace · Lector»: sin eso
Drive responde 404 o 410 a quien no esté en la lista, y da igual qué enlace
se ponga.

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

## Paquete Garantizado (`paquete-garantizado.html` + `paquete.js` + `datos/acciones.json`)

El personal registra las acciones del paquete en la nota médica **solo con el
número** («se realizaron las acciones 1, 2, 4, 8, 9»). El número no dice qué es,
no hay formatos impresos suficientes y en una supervisión nadie puede
reconstruir qué significaba cada numeral. El módulo resuelve eso y nada más.

**Es una guía de consulta. No es un formato del expediente y no es un
capturador.** Cero datos de paciente: no se pide ni se guarda nombre,
expediente ni edad, ni en el navegador ni en ningún lado. Lo único que
`paquete.js` escribe en `localStorage` es una copia de `acciones.json`, para que
la página abra sin internet después de la primera visita.

### Fuente única: `datos/acciones.json`

Es el **único** archivo con numerales. Ninguna vista los tiene escritos.

```json
{ "id": "mujeres-20-59", "nombre": "Mujeres de 20 a 59 años",
  "corto": "Mujeres 20-59", "etapa": "adultez", "requiereTodas": false,
  "acciones": [
    { "numeral": 15,
      "texto": "Detecta y refiere casos de violencia familiar o de pareja",
      "tema": "violencia-familiar", "determinante": "05", "promocion": true }
  ] }
```

| Campo | Qué es |
|---|---|
| `numeral` | El número tal como aparece en el formato 2019. **Cambia entre grupos para el mismo tema**: violencia familiar es el 13 en menores de 5, el 12 en 5-9 y el 15 en mujeres 20-59. Es la clave de todo el módulo. |
| `tema` | Slug compartido entre grupos. Es lo que permitirá reutilizar contenido en las fichas de tema. 58 temas para 133 acciones. |
| `determinante` | `"01"`–`"09"` o `null`. |
| `promocion` | Booleano. Criterio técnico del Departamento. |
| `requiereTodas` | `true` en recién nacidos, las 4 consultas de embarazo y puerperio. Ahí no aplica el mínimo de 5. |

**Son 12 grupos, no 10**: la hoja de consulta subsecuente del embarazo trae
segunda y tercera por separado, y luego va la de cuarta y quinta.

Al tocar `acciones.json` hay que **subir la versión** en
`paquete-garantizado.html` y en `PS_VERSION` (`script.js`), como con cualquier
otro asset.

### De dónde salen los datos

`LINEA DE VIDA.pdf` — «Acciones Integradas de Línea de Vida · Registro de
seguimiento de las acciones», Secretaría de Salud, formatos 2019. 11 páginas,
12 tablas. Se transcribió carácter por carácter desde la capa de texto del PDF
(que viene duplicada y hay que deduplicar por posición) y **cada renglón se
verificó contra la página renderizada**, porque el agrupamiento por celda no se
puede deducir del texto: el formato no tiene rejilla vectorial.

**El texto va literal, erratas de imprenta incluidas** —
`adultos-mayores-60` numeral 7 dice «antineumocócis», `embarazo-primera`
numeral 6 dice «y R)h». No se corrigen: el numeral y su texto tienen que
coincidir con la hoja impresa que el personal tiene enfrente.

### Las cuatro vistas

| Vista | Para qué | Deep link |
|---|---|---|
| Consultar | Marcar lo realizado y copiar la cadena de numerales para la nota | `?vista=consultar&grupo=mujeres-20-59` |
| Verificar | Escribir los numerales de una nota y ver qué significan; marca los que no existen y los repetidos | `?vista=verificar` |
| Practicar | Reactivos en los dos sentidos, numeral↔acción | `?vista=practicar` |
| Por determinante | El índice al revés: con qué numeral se registra cada determinante en cada grupo | `?vista=determinante&determinante=05` |

Las det-cards de `promocion.html#determinantes` enlazan a la cuarta vista con
su código. **Participación Social (09) no lleva enlace: ninguna acción del
paquete le corresponde**, y una tabla vacía sería peor que no enlazar.

### Criterios de registro (Lineamientos 2026)

Mínimo **5 acciones** por grupo etario; **todas** en los grupos con
`requiereTodas`. La productividad es **de la unidad, no del personal**. En el
expediente se registra únicamente el numeral, sin abreviaturas
(NOM-004-SSA3-2012). El contador y los mensajes de estado salen de
`_meta.criterioRegistro`.

### Qué NO hacer aquí

- No agregar captura de datos de pacientes bajo ninguna forma.
- No convertirlo en un registro paralelo al expediente.
- No inventar contenido clínico: si no está en el Manual o en la norma, se deja
  pendiente y no se publica.
- No duplicar los numerales en otro archivo.

## Pending integrations

- **1 formulario apunta al editor:** «Reporte Productividad Promotores y
  Gestores» tiene `docs.google.com/forms/d/…/edit`, que abre el EDITOR del
  formulario y responde 401 a quien no sea dueño. El enlace público no se puede
  derivar del id de edición: hay que sacarlo de «Enviar → enlace» en el propio
  formulario y pegarlo en `recursos.js`.
- **16 de 79 recursos de Google responden 404/410 sin sesión:** 5 hojas, 4
  archivos, 3 carpetas, 2 documentos y 2 presentaciones. Comprobado con la URL
  original, no solo con `/preview`. Hay que compartirlos como «Cualquier persona
  con el enlace · Lector» o re-alojarlos. Mientras tanto, el visor y la descarga
  fallan igual: la forma de la URL no arregla un permiso.
- **19 archivos siguen en la cuenta Wix** (`estado: 'rehospedar'`, 14.7 MB en
  total, los 19 vivos a agosto 2026). Traerlos a `assets/materiales/` quitaría
  esa dependencia entera; el repo pasaría de 3 a ~18 MB, muy por debajo del
  límite de GitHub Pages.
- **Fichas de tema del Paquete Garantizado:** las cuatro secciones por tema
  (`queDigo` / `conQue` / `queAnoto` / `aDondeRefiero`) **no se pueden escribir
  todavía**: su contenido sale del *Manual del Paquete Garantizado* (2011) y ese
  documento no está en el repositorio ni en el disco. `datos/temas.json` no
  existe a propósito: inventar el contenido clínico sería peor que no tenerlo.
  Al conseguir el Manual, empezar por las cinco de mayor frecuencia —violencia
  familiar, cartilla, actividad física, salud bucal, alcohol y tabaco—,
  publicarlas y ver si se usan antes de escribir las 58 restantes.
- **`determinante` y `promocion` sin firmar:** son criterio técnico del
  Departamento. Los valores que trae `acciones.json` son una propuesta y el
  criterio con que se aplicó está escrito en `_meta.pendienteValidacion`. No
  usarlos para contar productividad de promoción hasta que estén validados.
  82 de las 133 acciones van con `determinante: null` a propósito (§6 del
  encargo: no forzar acciones clínicas puras dentro de los nueve determinantes).
- **Offline de verdad:** hoy el módulo abre sin internet gracias a la copia en
  `localStorage`, pero solo después de la primera visita con red. Un service
  worker acotado a `paquete-garantizado.html` lo resolvería del todo.

- **SIJ iframe:** Reemplazar `.sij-placeholder` en `index.html#jornadas`:
  ```html
  <iframe src="https://script.google.com/macros/s/DEPLOYMENT_ID/exec"
    width="100%" height="650" frameborder="0"
    style="border-radius:12px; border:none;"></iframe>
  ```
- **Contact form:** Conectar `handleForm()` a Formspree (`https://formspree.io/f/XXXX`).
- **Datos reales:** Números placeholder en `kpis.js` y unidades/horarios en `directorio.js`.
- **10 de las 76 unidades sin coordenada:** 7 son unidades móviles (no
  tienen punto fijo) y 3 quedaron sin punto a propósito porque el enlace del
  directorio apuntaba a otra unidad. Ver el campo `ubicacion` en
  `directorio.js`. Otras 4 tienen punto pero marcado `por-validar`.

- **Geocodificar automáticamente NO funciona aquí:** se probó con Nominatim/OpenStreetMap y devolvió 0 resultados en 2 de 3 casos, y en el tercero **el centro de salud equivocado** con coordenadas distintas a las del directorio. Un pin plausible pero falso en una unidad médica es peor que ninguno.
- **Servicios de consulta externa por marcar:** `nutricion`, `psicologia` y `estomatologia` están en el catálogo `SERVICIOS` y su filtro aparece en el mapa en cuanto una unidad los declare. Hoy las 76 unidades traen 72 medicina general, 6 urgencias, 2 psicología y 1 promoción: el directorio de origen no dice qué unidad tiene nutriólogo, psicólogo o estomatólogo. Se marcan a mano conforme se confirmen. **No deducirlos del tipo de unidad**: mandar a alguien a un servicio que no existe es peor que no anunciarlo.
- **Nombres del personal:** la hoja `COORDINACION` trae coordinador, administrador y enfermera por unidad. **No se publican**: el sitio es público. Si algún día se quiere un directorio con nombres, tendría que vivir detrás de acceso restringido.
- **Recursos en `estado: 'pendiente'`** en `recursos.js`: sustituir `url` y poner `estado: 'ok'` conforme lleguen los enlaces.
- **Paquetes de NotebookLM:** conforme se suban a Drive, pasar la ficha a `materiales: [...]` usando los atajos `GD.doc(id)` / `GD.archivo(id)` / `GD.carpeta(id)` del principio de `recursos.js`. Cada archivo debe quedar compartido como «Cualquier persona con el enlace · Lector».

## Asistentes de NotebookLM

Cada determinante tiene su cuaderno (167 fuentes entre los 9). Los enlaces viven en
`assets/data/notebooks.js`, con la **misma clave** que el `tema` del
determinante en `recursos.js`, para que la det-card encuentre el suyo sola.

```js
alimentacion: { titulo: 'Alimentación', descripcion: '…',
                url: 'https://notebooklm.google.com/notebook/…',
                actualizado: 'Ago 2026', estado: 'ok' },
```

**El cuaderno debe estar compartido como «Cualquier persona con el enlace ·
Lector».** Sin ese paso el personal ve «No tienes acceso» y el enlace no sirve
de nada. Compartirlo con correos concretos NO basta: hoy 7 de los 9 están así
y por eso salen apagados. Con `estado: 'pendiente'` la tarjeta sale apagada y sin enlace.

## Versionado de assets (cache busting)

`style.css`, `script.js`, `components.js`, `paquete.js`, `assets/data/*.js` y
`datos/acciones.json` se enlazan con `?v=FECHA` en las 10 páginas, y la misma cadena está en `PS_VERSION`, al
principio de `script.js`.

**Al tocar cualquiera de esos archivos hay que subir la versión en los dos
sitios.** Si no, el navegador (y la caché de GitHub Pages) siguen sirviendo la
copia vieja y parece que el cambio «no se aplicó» aunque el archivo ya esté
corregido — un rato perdido buscando un fallo que no existe.

```powershell
# Comprobar qué versión se está viendo: consola del navegador (F12)
PS_VERSION
```

Si lo que se ve no coincide con `PS_VERSION` del archivo, es caché: recargar
con Ctrl+Shift+R.

## Deployment

Ya está en marcha. GitHub Pages sirve la rama `master` desde la raíz:

**https://oscarog23.github.io/Promocion-de-la-salud-JSTexcoco/**

Desplegar = empujar a `master`. La compilación tarda ~1 minuto.

```powershell
git add .
git commit -m "..."
git push origin master

# Ver el estado de la compilación
gh api repos/OscarOG23/Promocion-de-la-salud-JSTexcoco/pages/builds/latest --jq .status
```

**Ojo con las mayúsculas.** Windows no distingue mayúsculas en los nombres de
archivo; GitHub Pages sí. Un `assets/img/Logo-ps.png` funciona en local y da 404
al desplegar.
