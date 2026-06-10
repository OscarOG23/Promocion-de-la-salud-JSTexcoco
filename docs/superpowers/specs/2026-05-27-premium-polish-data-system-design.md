# Diseño: Pulido premium + sistema de datos mantenible

**Fecha:** 2026-05-27
**Estado:** Aprobado por el usuario

## Contexto

Plataforma interna multi-página del Departamento de Promoción a la Salud (Jurisdicción Texcoco, ISEM). HTML/CSS/JS puro, sin frameworks, desplegada en GitHub Pages (`oscarog23.github.io/isem-pagina-promocion`). Uso estimado: 60% celular / 40% PC de oficina.

Objetivos de esta fase:
1. Elevar las animaciones a nivel "premium editorial" con toques de impacto (contadores, hero vivo), manteniendo tono institucional serio.
2. Migrar el contenido mantenible (biblioteca, KPIs, directorio) a archivos de datos JS para que el mantenimiento no requiera editar HTML.

## Decisiones tomadas

| Decisión | Elección |
|---|---|
| Nivel de animación | Premium editorial (B) + contadores KPI y hero "que respira" (C) |
| Sistema de mantenimiento | Archivos de datos JS en `assets/data/` (patrón `campaigns.js`) |
| Prioridad de dispositivo | 60% móvil / 40% escritorio |
| Librerías externas | Ninguna — CSS/JS nativo |

## 1. Animaciones premium

### Hero (index.html)
- Gradiente de fondo con animación lenta (~20s/ciclo) — `background-position` animado, GPU-friendly.
- Título entra con reveal por líneas usando `clip-path` (no opacity simple).
- Partículas: 18 en escritorio, 8 en móvil (detección por `matchMedia('(max-width: 900px)')`).

### Contadores KPI animados
- `IntersectionObserver` dispara conteo de 0 → valor real en ~1.2s con easing desacelerado (`easeOutExpo`).
- Soporta valores con sufijos ("+", "%") parseando el texto del elemento.
- `prefers-reduced-motion` → muestra el número final sin animar.
- Aplica en `index.html#indicadores` y `reportes.html`.

### Micro-interacciones
- **Cards** (nav-card, material-card, subsec-card, det-card, directory-card): hover con sombra en 2 capas + borde superior que se "enciende" con el color de la sección (usa `--nc-color` / color de página).
- **Botones**: estado `:active` con `scale(0.97)` — feedback táctil en móvil.
- **Nav links**: subrayado animado izquierda→derecha con `::after` + `transform: scaleX`.
- **Carrusel**: parallax interno sutil entre slide saliente/entrante.
- **Filtros biblioteca**: píldora de fondo que se desliza al botón activo (medición por `getBoundingClientRect`, fallback al estado actual si JS falla).

### Transiciones de página
- View Transitions API (`@view-transition { navigation: auto; }`) con cross-fade breve (~200ms).
- Fallback: navegadores sin soporte navegan normal (progressive enhancement).

### Móvil
- Menú hamburguesa: links entran escalonados (40ms entre cada uno).
- Áreas táctiles ≥ 44px en filtros, nav y botones del carrusel.
- Duraciones de animación al ~60% en pantallas ≤ 900px (vía custom properties en media query).

## 2. Sistema de datos JS

```
assets/data/
├── campaigns.js     (existe — sin cambios)
├── biblioteca.js    NUEVO — array BIBLIOTECA de materiales
├── kpis.js          NUEVO — objeto KPIS con indicadores
└── directorio.js    NUEVO — array DIRECTORIO de unidades
```

### biblioteca.js
```js
const BIBLIOTECA = [
  {
    titulo: "Lineamientos de Promoción 2025",
    categoria: "lineamientos",   // lineamientos|manuales|formatos|noms|graficos|presentaciones|docs
    tema: "Promoción de la salud",
    publico: "Personal de salud",
    modalidad: "Autoestudio",
    actualizado: "Ene 2025",
    url: "https://drive.google.com/..."
  },
  // ...
];
```
`biblioteca.html` deja de tener cards hardcodeadas: un `renderBiblioteca()` en `script.js` genera las `.material-card` desde el array. El contador "N recursos" se calcula solo. Los filtros existentes (`initFilters`) siguen funcionando sin cambios porque el HTML generado usa los mismos atributos `data-categoria`.

### kpis.js
```js
const KPIS = [
  { id: "campanas",  numero: 4,  sufijo: "",  etiqueta: "Campañas activas",  color: "crimson", desc: "..." },
  // ...
];
```
`index.html` y `reportes.html` leen del mismo archivo → un solo lugar para actualizar números. `renderKPIs()` genera las `.kpi-card` en contenedores `#kpi-container`.

### directorio.js
```js
const DIRECTORIO = [
  {
    nombre: "Centro de Salud Texcoco",
    zona: "Texcoco",
    tipo: "psicologia",          // psicologia | nutricion | general
    direccion: "...",
    horario: "L–V 8:00–15:00",
    telefono: "...",
    responsable: "..."
  },
  // ...
];
```
`renderDirectorio()` genera las `.directory-card`.

### Reglas del sistema
- Cada archivo de datos inicia con un comentario que documenta el formato y los valores válidos.
- Si un archivo de datos falta o está vacío, la página muestra un mensaje neutro ("Sin recursos por el momento") en lugar de romperse.
- Carga: `<script src="assets/data/X.js">` antes de `script.js` en cada página que lo use.
- CLAUDE.md se actualiza con instrucciones de mantenimiento (cómo añadir material, actualizar KPI, añadir unidad).

## 3. Fuera de alcance (YAGNI)

- Librerías de animación (GSAP, AOS, Lottie).
- Backend, CMS o Google Sheets como fuente de datos.
- Animaciones decorativas sin propósito comunicativo.
- Rediseño visual — la paleta, tipografía y layout actuales se mantienen.

## Verificación

1. Móvil 375px: menú escalonado, filtros táctiles, carrusel fluido.
2. Contadores KPI animan al entrar al viewport en index y reportes.
3. Añadir un objeto de prueba en `biblioteca.js` → la card aparece con su filtro funcionando.
4. Cambiar un número en `kpis.js` → cambia en index Y reportes.
5. `prefers-reduced-motion` activado → cero animación, todo el contenido visible.
6. Lighthouse móvil ≥ 90 en rendimiento.
7. Las 8 páginas cargan sin errores de consola.
