# Integración de contenido Wix — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers-extended-cc:subagent-driven-development (recommended) or superpowers-extended-cc:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Poblar el portal nuevo con el contenido real del sitio Wix viejo (presentaciones de talleres, formularios de reporte, formatos oficiales, datos de contacto, Línea de la Vida) e incorporar una página nueva de recursos para psicólogos.

**Architecture:** Sitio estático HTML/CSS/JS sin build. El contenido se inyecta (a) en archivos de datos `assets/data/*.js` renderizados por funciones en `script.js` siguiendo el patrón existente (`renderBiblioteca`, `renderDirectorio`), y (b) directamente en secciones HTML que ya existen. La fuente de verdad de TODAS las URLs es `docs/superpowers/specs/2026-06-16-wix-content-source.txt` (se citan rangos de línea por tarea).

**Tech Stack:** HTML5, CSS (custom properties), JavaScript vanilla. Sin Node, sin tests automatizados.

**Verificación (no hay test runner):** cada tarea se verifica (1) abriendo la página en navegador / Live Server sin errores de consola, y (2) con `grep` confirmando que el contenido real reemplazó los placeholders. Comando base de placeholders:
`grep -rn 'href="#"' <archivo>.html` y `grep -n 'url: "#"' assets/data/<archivo>.js`.

**Convención de pendientes:** los enlaces que el usuario debe completar después se marcan con `url: "#"` + comentario `/* PENDIENTE: ... */`. Los archivos `filesusr.com` se enlazan tal cual pero con comentario `/* RE-ALOJAR */`.

---

### Task 0: Footer real + datos de contacto (cross-cutting)

**Goal:** Reemplazar el footer y los datos de contacto placeholder por los datos institucionales reales en todas las páginas.

**Files:**
- Modify: `components.js` (template literal del footer)
- Modify: `index.html` (sección `#contacto`)

**Datos reales (de content-source líneas 215-223, 1418-1446, 1903-1927):**
- Dirección: `Cda. Carretera Papalotla s/n, San Andrés Chiautla 1, 56030 Chiautla, Méx.`
- Teléfonos: `01 595 95 3 18 84` · `01 595 95 3 19 45` · Ext. `94251` *(PENDIENTE confirmar: aparece 94219 en /contacto)*
- Email: `comitepromociontex@gmail.com`
- Facebook real: `https://www.facebook.com/profile.php?id=100012254806363`
- Maps: `https://www.google.com/maps/dir//Papalotla+S%2FN,+San+Sebastian,+56030+Chiautla,+Méx.`
- Copyright: `© 2025 Promoción a la Salud — Jurisdicción Sanitaria Texcoco`

**Acceptance Criteria:**
- [ ] El footer muestra dirección, 2 teléfonos+ext, email (mailto) y enlace a Facebook real.
- [ ] Se eliminan enlaces genéricos de Wix (twitter.com/MundoWix, etc.) si existían.
- [ ] `index.html#contacto` muestra dirección/teléfono/email reales + iframe de Google Maps.
- [ ] El footer se ve idéntico en estilo (usa clases existentes) en las 9 páginas.

**Verify:** Abrir `index.html` y otra página cualquiera en navegador → footer con datos reales, sin errores de consola. `grep -n "MundoWix\|WixEspanol" *.js` → sin resultados.

**Steps:**

- [ ] **Step 1:** Leer el footer actual en `components.js` para conservar su estructura/clases CSS.
- [ ] **Step 2:** Editar el footer: insertar dirección, teléfonos, email `mailto:`, y un `<a>` a Facebook real con `target="_blank" rel="noopener"`. Mantener clases existentes.
- [ ] **Step 3:** En `index.html#contacto`, reemplazar datos placeholder por los reales e insertar iframe de Google Maps (usar `https://www.google.com/maps?q=...&output=embed` con la dirección, `loading="lazy"`, `width="100%" height="450" style="border:0;border-radius:12px"`).
- [ ] **Step 4:** Verificar en navegador (index + 1 página interior) que el footer renderiza igual y el mapa carga.
- [ ] **Step 5: Commit**
```bash
git add components.js index.html
git commit -m "feat: footer y datos de contacto institucionales reales"
```

---

### Task 1: Campaña "3x Mi Salud" en el carrusel

**Goal:** Añadir la campaña real "3x Mi Salud" al carrusel de inicio.

**Files:**
- Modify: `assets/data/campaigns.js`

**Contenido real (content-source líneas 1838-1865):**
- Título: `3x Mi Salud` · Objetivo: *"Elimina los alimentos con sellos, modifica tu estilo de vida y prevén enfermedades crónicas degenerativas."*
- 3 líneas de acción: alimentación saludable · más actividad física · evitar bebidas azucaradas.

**Acceptance Criteria:**
- [ ] `CAMPAIGNS` incluye un objeto nuevo `id: '3x-mi-salud'` con la estructura existente (titulo, objetivo, poblacion, vigencia, color, materiales, evidenciaSugerida).
- [ ] El carrusel muestra la nueva diapositiva sin romper navegación/dots.

**Verify:** Abrir `index.html` → el carrusel tiene una diapositiva más "3x Mi Salud" navegable. Sin errores de consola.

**Steps:**

- [ ] **Step 1:** Añadir al array `CAMPAIGNS` (color sugerido `gold` o `crimson`):
```js
{
  id: '3x-mi-salud',
  titulo: '3x Mi Salud',
  objetivo: 'Elimina los alimentos con sellos de advertencia, modifica tu estilo de vida y prevén enfermedades crónicas degenerativas con tres líneas de acción.',
  poblacion: 'Población general y familias',
  vigencia: '2025-12-31',
  color: 'crimson',
  materiales: [
    { tipo: 'Alimentación saludable', url: 'promocion.html#alimentacion', icono: 'link' },
    { tipo: 'Actividad física', url: 'promocion.html#actividad', icono: 'link' }
  ],
  evidenciaSugerida: 'Foto de actividad + lista de asistencia'
}
```
- [ ] **Step 2:** Verificar en navegador que el carrusel renderiza la nueva slide.
- [ ] **Step 3: Commit**
```bash
git add assets/data/campaigns.js
git commit -m "feat: campaña 3x Mi Salud en carrusel"
```

---

### Task 2: Catálogo de Talleres en promocion.html (núcleo)

**Goal:** Crear el catálogo filtrable de las 46 presentaciones de talleres y conectar las det-card a recursos reales.

**Files:**
- Create: `assets/data/talleres.js` (array `TALLERES`)
- Modify: `promocion.html` (det-card links + nueva sección `#talleres` + `<script src>` de talleres.js + inline-nav)
- Modify: `script.js` (función `renderTalleres()` + invocación; reusar `initFilters`/`CAT_LABELS` o crear filtro propio)
- Modify: `style.css` (solo si hace falta una regla de color de categoría; reusar `.material-card`)

**Fuente de URLs:** content-source líneas 583-925 (las 9 categorías y sus presentaciones Canva/Instagram) y 954-1052 (carpetas Drive de complementos por tema). Formatos de taller: 926-953.

**Esquema de `talleres.js`:**
```js
/* Categorías válidas (filtros del catálogo): alimentacion | actividad |
   salud-sexual | entornos-fisicos | entornos-psicosociales | infancia |
   diversidad | derecho-salud | participacion */
const TALLERES = [
  { tema: "Alimentación Saludable", categoria: "alimentacion",
    url: "https://www.canva.com/design/DAGfYVzGx20/", // de content-source L591
    complementos: "https://drive.google.com/drive/folders/1AHqMvY5aqi7A4bALjqvIW3jCUj7eOD8c" },
  // ... resto poblado desde content-source L583-925 (un objeto por fila de tema con URL)
];
```
Reglas de poblado: una entrada por cada fila de tema en las tablas. Si la URL es `*(sin enlace)*`, usar `url: "#"` + `/* PENDIENTE */`. `complementos` solo donde exista carpeta Drive correspondiente (L954-1052); si no, omitir el campo.

**Acceptance Criteria:**
- [ ] `talleres.js` contiene ~46 entradas con sus 9 categorías reales.
- [ ] `promocion.html` tiene una sección nueva `#talleres` ("Catálogo de Talleres Comunitarios") con barra de filtros (9 categorías + "Todos") y grilla de cards renderizada por JS.
- [ ] Cada card muestra tema, categoría y botón "Abrir presentación" (+ "Complementos" si aplica).
- [ ] Los filtros funcionan (mostrar/ocultar por categoría) reusando el patrón de biblioteca.
- [ ] Las 9 `det-card` existentes apuntan su enlace "Presentación" al Drive maestro (`https://drive.google.com/drive/folders/1wQCWEuj8RdCsy6xPcxFT_loHVuAvcnU6`) y "Material" a la carpeta de complementos del tema cuando exista.
- [ ] `#talleres` aparece en la `inline-nav` (`.inav-link`) de la página.

**Verify:** Abrir `promocion.html` → sección Catálogo de Talleres con cards; clic en filtros filtra; clic en card abre Canva. `grep -c "canva.com\|drive.google" assets/data/talleres.js` ≥ 40.

**Steps:**

- [ ] **Step 1:** Crear `assets/data/talleres.js` con el array `TALLERES` poblado desde content-source L583-925 (presentaciones) y L954-1052 (complementos). Incluir cabecera-comentario con las categorías válidas.
- [ ] **Step 2:** En `script.js`, añadir `renderTalleres()` que construye `.material-card` (o `.subsec-card`) dentro de un contenedor `#talleres-grid` con `data-categoria`, y un mapa `TALLER_CAT_LABELS`. Invocarla en el bootstrap **antes** de `initFilters` (igual que `renderBiblioteca`). Reutilizar `initFilters` apuntando al contenedor de talleres, o clonar su lógica para `[data-cat]`/`[data-categoria]` del catálogo.
- [ ] **Step 3:** En `promocion.html`: (a) añadir `<a href="#talleres" class="inav-link">Talleres</a>` a la inline-nav; (b) insertar la sección `#talleres` con `section-header` + `filter-bar-wrap` (9 botones `.filter-btn[data-cat]` + "Todos") + `<div id="talleres-grid" class="material-grid">`; (c) añadir `<script src="assets/data/talleres.js"></script>` antes de `script.js`.
- [ ] **Step 4:** Conectar las 9 `det-card` (líneas ~59-243): cambiar `href="#"` de "Presentación" al Drive maestro y "Material" a la carpeta de complementos del tema correspondiente (L954-1052). Donde haya YouTube real (IRAS/EDAS L1238-1244, tabaquismo L1346), usarlo en "Video".
- [ ] **Step 5:** Verificar en navegador: catálogo renderiza, filtros funcionan, enlaces abren. Revisar consola.
- [ ] **Step 6: Commit**
```bash
git add assets/data/talleres.js promocion.html script.js style.css
git commit -m "feat: catálogo de talleres comunitarios + det-cards con enlaces reales"
```

---

### Task 3: Hub de reportes mensuales en reportes.html

**Goal:** Añadir la captura de reportes (16 Google Forms reales) y el calendario de fechas conmemorables.

**Files:**
- Create: `assets/data/formularios.js` (array `FORMULARIOS`)
- Modify: `reportes.html` (nueva sección `#formularios` + `<script src>` + inline links si aplica)
- Modify: `script.js` (`renderFormularios()`)

**Fuente de URLs:** content-source L1128-1164 (Promoción: 7 forms), L1805-1822 (Adicciones: 2), L2031-2065 (Salud Mental: productividad, BCSM/GAE, supervisión), L1616-1636 (Ferias), L1643-1665 (Entornos Laborales/Eventos), L1167-1170 (Calendario Fechas Conmemorables 2026).

**Esquema de `formularios.js`:**
```js
/* area: promocion | adicciones | salud-mental | entornos | ferias */
const FORMULARIOS = [
  { area: "promocion", titulo: "Concentrado de Informes mensuales Promoción",
    url: "https://docs.google.com/forms/d/e/1FAIpQLScGyKth2OHE0A8L0XVJoI-GeUSUelfFZL-L1q6ZtzNcXumfHg/viewform",
    periodicidad: "Mensual" },
  // ... resto desde las líneas citadas
];
```

**Acceptance Criteria:**
- [ ] `formularios.js` contiene los ~16 formularios con su área.
- [ ] `reportes.html` tiene sección "Captura de reporte mensual" con tarjetas agrupadas por área, cada una con botón "Abrir formulario".
- [ ] Se añade tarjeta/recurso destacado "Calendario de Fechas Conmemorables 2026" (PDF + carpeta Drive).
- [ ] Las tablas de histórico existentes se conservan.

**Verify:** Abrir `reportes.html` → sección de formularios con ≥16 enlaces a Google Forms agrupados por área; calendario visible. Sin errores de consola.

**Steps:**

- [ ] **Step 1:** Crear `assets/data/formularios.js` poblado desde las líneas citadas.
- [ ] **Step 2:** En `script.js`, añadir `renderFormularios()` que agrupa por `area` y genera tarjetas (reusar `.subsec-card` o `.report-row`). Invocar en bootstrap.
- [ ] **Step 3:** En `reportes.html`, insertar sección `#formularios` ("Captura de reporte mensual") con contenedor que JS rellena + bloque "Calendario de Fechas Conmemorables 2026" (enlace PDF `https://drive.google.com/file/d/1AxdC9ZQ3GNyncxUeV32Yj_l-5fhoFcAB/view` + carpeta `https://drive.google.com/drive/folders/1bn-wpcLV36ftd4KPK84T48rtrFjSjpNO`). Añadir `<script src="assets/data/formularios.js">`.
- [ ] **Step 4:** Verificar en navegador.
- [ ] **Step 5: Commit**
```bash
git add assets/data/formularios.js reportes.html script.js
git commit -m "feat: hub de formularios de reporte mensual + calendario conmemorativo"
```

---

### Task 4: Formatos y manuales reales en entornos.html

**Goal:** Poblar Escuela Saludable, Comunidades a Certificar, ELHT y Unidades/TVF con sus formatos reales.

**Files:**
- Modify: `entornos.html` (secciones `#escuela`, `#comunidades`, `#laborales`/ELHT, `#unidades`)

**Fuente de URLs:** Escuela L1247-1331 · ELHT/Tabaquismo L1333-1417 · Comunidades L1667-1741 · TVF-TAPS L1743-1803 · Estilos/Laborales L1643-1665.

**Acceptance Criteria:**
- [ ] Escuela Saludable: Manual Certificación 3.0, ≥6 formatos (censo, cédulas, acta, plan de acción) y enlaces SEP/Aprende.org/Escuelas Promotoras enlazados reales.
- [ ] Comunidades: manuales + anexos urbanos (los `filesusr.com` con comentario `RE-ALOJAR`).
- [ ] ELHT: presentaciones tabaquismo, cédula edificio, certificados, checklist laboral + form mensual.
- [ ] Unidades/TVF: lineamientos TAPS, visita domiciliaria (TVF 2024), formatos oficiales.
- [ ] No quedan `href="#"` en estas secciones salvo los marcados PENDIENTE.

**Verify:** Abrir `entornos.html` → cada sección con enlaces reales que abren. `grep -c 'href="#"' entornos.html` solo cuenta los marcados PENDIENTE.

**Steps:**

- [ ] **Step 1:** Sección Escuela Saludable: reemplazar enlaces placeholder por los reales (L1247-1331) en las `subsec-card`/listas existentes.
- [ ] **Step 2:** Sección Comunidades a Certificar: añadir manuales + tabla/lista de anexos urbanos (L1686-1740). Marcar `filesusr.com` con comentario `RE-ALOJAR`.
- [ ] **Step 3:** Sección ELHT/Laborales: presentaciones y cédulas de tabaquismo (L1333-1417) + checklist y form de entornos laborales (L1643-1665).
- [ ] **Step 4:** Sección Unidades/TVF: lineamientos TAPS (L1744), TVF 2024 (L1752), formatos oficiales (L1755-1786).
- [ ] **Step 5:** Verificar en navegador y revisar enlaces.
- [ ] **Step 6: Commit**
```bash
git add entornos.html
git commit -m "feat: formatos y manuales reales en Entornos Saludables"
```

---

### Task 5: Contenido real en adicciones.html

**Goal:** Conectar formularios, material y formatos TVF reales de adicciones.

**Files:**
- Modify: `adicciones.html`

**Fuente de URLs:** content-source L1805-1836 (2 forms + gafas alcohol + TVF compartido).

**Acceptance Criteria:**
- [ ] Sección de reportes: "Informe mensual de adicciones" y "Concentrado de violencia y delincuencia" enlazados a sus Google Forms reales.
- [ ] Material descargable "Gafas de impedimento por alcohol" (PDF, comentario RE-ALOJAR).
- [ ] Formatos TVF enlazados (compartidos con entornos; no duplicar contenido, enlazar).

**Verify:** Abrir `adicciones.html` → forms y material abren. Sin `href="#"` salvo PENDIENTE.

**Steps:**

- [ ] **Step 1:** En la sección de reportes (`#reportes` o equivalente), enlazar los 2 Google Forms (L1816, L1820).
- [ ] **Step 2:** Añadir el material "Gafas de impedimento por alcohol" (L1831) con comentario RE-ALOJAR.
- [ ] **Step 3:** Enlazar formatos TVF a la sección correspondiente de `entornos.html` (evitar duplicar).
- [ ] **Step 4:** Verificar en navegador.
- [ ] **Step 5: Commit**
```bash
git add adicciones.html
git commit -m "feat: formularios y material reales en Adicciones"
```

---

### Task 6: Línea de la Vida y recursos reales en salud-mental.html

**Goal:** Destacar la Línea de la Vida y enlazar supervisión, reportes y calendario reales.

**Files:**
- Modify: `salud-mental.html` (`.alert-banner`, secciones de reportes/evidencias, enlace a psicología)

**Fuente de URLs:** content-source L1929-1943 (Línea de la Vida 800 911 2000), L2031-2065 (reportes/supervisión), L1996-2002 (Google Calendar `saludmentaljstex@gmail.com`).

**Acceptance Criteria:**
- [ ] El `.alert-banner` o un CTA destacado muestra "Línea de la Vida 800 911 2000" con enlace a gob.mx.
- [ ] Enlaces reales: form de productividad SM, form BCSM/GAE, cédula+form de supervisión.
- [ ] Bloque "Calendario de actividades" con enlace al Google Calendar.
- [ ] Enlace visible a `recursos-psicologia.html` (creada en Task 7; usar la ruta aunque se cree después).

**Verify:** Abrir `salud-mental.html` → banner Línea de la Vida visible, enlaces abren. Sin errores de consola.

**Steps:**

- [ ] **Step 1:** Actualizar `.alert-banner` con "Línea de la Vida · 800 911 2000" enlazando a `https://www.gob.mx/salud/conadic/...` (L1933).
- [ ] **Step 2:** En la sección de reportes/evidencias, enlazar form de productividad (L2034), BCSM/GAE (L2039) y supervisión (cédula L2045 + form L2052).
- [ ] **Step 3:** Añadir bloque "Calendario de actividades" con enlace `https://calendar.google.com/calendar/u/0?cid=c2FsdWRtZW50YWxqc3RleEBnbWFpbC5jb20`.
- [ ] **Step 4:** Añadir CTA/enlace a `recursos-psicologia.html`.
- [ ] **Step 5:** Verificar en navegador.
- [ ] **Step 6: Commit**
```bash
git add salud-mental.html
git commit -m "feat: Línea de la Vida, supervisión y calendario en Salud Mental"
```

---

### Task 7: Página nueva recursos-psicologia.html

**Goal:** Crear la página del hub privado de psicólogos con las 8 categorías de recursos.

**Files:**
- Create: `recursos-psicologia.html`
- Create: `assets/data/psicologia.js` (array `PSICOLOGIA`)
- Modify: `script.js` (`renderPsicologia()`)
- Modify: `components.js` (enlace a la página en el footer; **no** en nav principal)
- Modify: `directorio.html` (enlace a la página)

**Fuente de contenido:** content-source L1945-2029 (8 categorías + descripciones + calendario).

**Esquema de `psicologia.js`:**
```js
const PSICOLOGIA = [
  { titulo: "Herramientas para consulta psicológica",
    descripcion: "Material de cursos, listas de talleres y capacitación; formatos de reportes de productividad.",
    recursos: [ { label: "Abrir", url: "#" /* PENDIENTE: carpeta Drive */ } ] },
  // ... 8 entradas (L1956-1994)
];
```

**Acceptance Criteria:**
- [ ] `recursos-psicologia.html` usa la plantilla estándar (`#site-nav`, `page-hero`, `#site-footer`, scripts inyectados).
- [ ] Renderiza las 8 categorías como `subsec-card` (tag púrpura) desde `psicologia.js`.
- [ ] Incluye bloque de Calendario (Google Calendar `saludmentaljstex@gmail.com`).
- [ ] Enlazada desde footer y `directorio.html` (y desde salud-mental, Task 6).
- [ ] El navbar marca correctamente (no rompe `data-page`).

**Verify:** Abrir `recursos-psicologia.html` → 8 tarjetas renderizadas, hero, footer, sin errores de consola.

**Steps:**

- [ ] **Step 1:** Crear `assets/data/psicologia.js` con las 8 entradas (L1956-1994). Recursos sin URL conocida → `url:"#"` + `/* PENDIENTE */`.
- [ ] **Step 2:** En `script.js`, añadir `renderPsicologia()` (patrón de `renderDirectorio`) que rellena `#psicologia-grid`. Invocar solo si el contenedor existe.
- [ ] **Step 3:** Crear `recursos-psicologia.html` copiando la estructura de `salud-mental.html` (head, `#site-nav`, page-hero púrpura, secciones, `#site-footer`, orden de scripts). Añadir `<script src="assets/data/psicologia.js">` antes de `script.js`. Incluir sección de calendario.
- [ ] **Step 4:** Añadir enlace a la página en el footer (`components.js`) y en `directorio.html`.
- [ ] **Step 5:** Verificar en navegador (render + footer + nav activa).
- [ ] **Step 6: Commit**
```bash
git add recursos-psicologia.html assets/data/psicologia.js script.js components.js directorio.html
git commit -m "feat: página de recursos para psicólogos"
```

---

### Task 8: Expansión de biblioteca.js + directorio formatos

**Goal:** Reemplazar placeholders de la biblioteca por enlaces reales, añadir formatos nuevos y mover #SoyPromotora como material gráfico.

**Files:**
- Modify: `assets/data/biblioteca.js`
- Modify: `assets/data/directorio.js` o `directorio.html` (formatos de referencia/contrarreferencia)

**Fuente de URLs:** Nutrición/expediente clínico L1448-1580 · Guías práctica clínica L1496 · NOMs L1451-1463 · Referencia/contrarreferencia L1768-1786 · #SoyPromotora imagen L1124.

**Acceptance Criteria:**
- [ ] Los `url:"#"` de `biblioteca.js` que tienen equivalente real ahora apuntan a la URL real.
- [ ] Se añaden ≥8 formatos nuevos (expediente clínico DDSISEM, guías práctica clínica, manuales certificación).
- [ ] #SoyPromotoraDeSalud aparece como material gráfico en biblioteca.
- [ ] Los formatos de referencia/contrarreferencia aparecen en `directorio.html#formatos`.

**Verify:** Abrir `biblioteca.html` → nuevos materiales con filtros funcionando. `grep -c 'url: "#"' assets/data/biblioteca.js` reducido respecto al inicial (13).

**Steps:**

- [ ] **Step 1:** Actualizar entradas existentes de `biblioteca.js` con URLs reales donde existan (NOMs L1451-1463, etc.).
- [ ] **Step 2:** Añadir formatos nuevos (expediente clínico DDSISEM L1504-1580, guías práctica clínica L1496) en sus categorías.
- [ ] **Step 3:** Añadir entrada gráfica para #SoyPromotoraDeSalud (categoría `grafico`).
- [ ] **Step 4:** En `directorio.html#formatos`, enlazar referencia/contrarreferencia y TVF (L1768-1786).
- [ ] **Step 5:** Verificar en navegador (biblioteca + directorio).
- [ ] **Step 6: Commit**
```bash
git add assets/data/biblioteca.js assets/data/directorio.js directorio.html
git commit -m "feat: expansión de biblioteca y formatos de referencia reales"
```

---

### Task 9: Verificación final + actualización de docs

**Goal:** Barrido final de placeholders, prueba de navegación completa y actualización de CLAUDE.md.

**Files:**
- Modify: `CLAUDE.md` (documentar talleres.js, formularios.js, psicologia.js, recursos-psicologia.html, renderTalleres/renderFormularios/renderPsicologia)

**Acceptance Criteria:**
- [ ] `grep -rn 'href="#"' *.html` solo devuelve anclas válidas (`#seccion`) y placeholders marcados PENDIENTE.
- [ ] `grep -rn 'url: "#"' assets/data/*.js` solo devuelve los marcados PENDIENTE.
- [ ] Navegación entre las 9 páginas funciona; navbar marca la página activa; footer real en todas.
- [ ] CLAUDE.md documenta los archivos de datos nuevos, las funciones nuevas y la página nueva.

**Verify:** Recorrer las 9 páginas en navegador sin errores de consola; ejecutar los dos `grep` y confirmar que solo aparecen pendientes intencionales.

**Steps:**

- [ ] **Step 1:** Ejecutar `grep -rn 'href="#"' *.html` y `grep -rn 'url: "#"' assets/data/*.js`; revisar que todo lo no-PENDIENTE esté resuelto.
- [ ] **Step 2:** Recorrer las 9 páginas en navegador (incluida recursos-psicologia.html); revisar consola.
- [ ] **Step 3:** Actualizar `CLAUDE.md`: file structure (3 data files nuevos + página nueva), tabla de JS behaviors (3 funciones render nuevas), sección "Cómo actualizar talleres/formularios/psicología".
- [ ] **Step 4: Commit**
```bash
git add CLAUDE.md
git commit -m "docs: actualizar CLAUDE.md con catálogo de talleres, formularios y psicología"
```

---

## Self-Review (completado al escribir)

- **Cobertura del spec:** C1→Task2, C2→Task3, C3→Task4, C4→Task5, C5→Task6, C6→Task7, C7→Task0+Task1, C8→Task0+Task1, biblioteca→Task8, verificación→Task9. ✔ Sin huecos.
- **Placeholders:** los `url:"#"` del plan son intencionales (contenido que el usuario no tiene aún) y van marcados PENDIENTE; no son placeholders del plan.
- **Consistencia de nombres:** `renderTalleres`/`renderFormularios`/`renderPsicologia` y archivos `talleres.js`/`formularios.js`/`psicologia.js` usados consistentemente en todas las tareas.
- **Dependencias:** Task6 referencia `recursos-psicologia.html` (Task7) — el enlace puede crearse antes que el archivo (link estático). Task8 referencia formatos compartidos con Task4.
