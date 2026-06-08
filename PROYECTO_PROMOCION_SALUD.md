# Proyecto: Sitio Web — Promoción a la Salud, Jurisdicción Texcoco

## Contexto institucional

- **Institución:** Instituto de Salud del Estado de México (ISEM)
- **Área:** Departamento de Promoción a la Salud
- **Jurisdicción:** Jurisdicción Sanitaria Texcoco
- **Dirección:** Cda. Carretera Papalotla s/n, San Andrés Chiautla, 56030 Chiautla, Méx.
- **Teléfonos:** 595 953 1884 · 595 953 1945 — Ext. 94251
- **Horario:** Lunes a viernes, 8:00 a 15:00 h
- **URL actual (Wix, a migrar):** https://drisaacalfaro.wixsite.com/promocion-a-la-salud

---

## Objetivo del proyecto

Migrar y rediseñar el sitio web institucional desde Wix a un sitio estático en HTML/CSS/JS puro, con mejor arquitectura de información, identidad visual ISEM oficial y preparado para hosting en GitHub Pages, Netlify o Cloudflare Pages.

---

## Stack tecnológico

- **Frontend:** HTML5 semántico + CSS3 (variables CSS, Grid, Flexbox) + Vanilla JS
- **Tipografía (Google Fonts):**
  - Display: `Fraunces` (300, 400, 600 — roman e italic)
  - Body: `DM Sans` (300, 400, 500)
- **Sin frameworks ni dependencias de Node** — el sitio debe funcionar abriendo `index.html` directamente.
- **Hosting objetivo:** GitHub Pages (rama `gh-pages`) o Netlify (drag & drop)

---

## Paleta de colores ISEM oficial

```css
:root {
  --crimson:    #9F2241;   /* Pantone 201 C — primario */
  --crimson-dk: #691C32;   /* Pantone 209 C — hover / oscuro */
  --teal:       #235B4E;   /* Pantone 336 C — secundario */
  --teal-dk:    #10312B;   /* Pantone 349 C — fondos oscuros */
  --sand:       #DDC9A3;   /* Pantone 7501 C — acento cálido */
  --sand-lt:    #F5EFE3;   /* arena claro para fondos */
  --gold:       #BC955C;   /* Pantone 110 C — detalles */
  --purple:     #5C3D8F;   /* para sección Salud Mental */
  --off-white:  #F9F7F4;
  --gray-100:   #F0EDE8;
  --gray-200:   #DDD9D2;
  --gray-400:   #A09890;
  --gray-600:   #6B6358;
  --gray-800:   #2E2924;
  --text:       #1E1B18;
  --text-muted: #6B6358;
}
```

---

## Arquitectura de información (sitemap)

```
/
├── #inicio               ← Hero + accesos rápidos + campaña activa
├── #educacion            ← Determinantes + Temas de prevención
│   ├── #prevencion
│   ├── #campanas
│   └── #promotoras
├── #programas            ← Programas y certificaciones
│   ├── #escuela          ← Escuela Saludable
│   ├── #tabaco           ← Espacio Libre de Humo de Tabaco (ELHT)
│   ├── #nutricion        ← Nutrición / NOM-043
│   ├── #estilos          ← Estilos de Vida Saludable
│   ├── #interculturalidad
│   └── #adicciones
├── #salud-mental
│   ├── #psicologos
│   ├── #reportes-sm
│   └── #supervision
├── #recursos             ← Documentos, formatos, normatividad
│   ├── #formatos         ← SINBA 2023 (Google Drive)
│   ├── #metas            ← Metas por unidad 2025 (Google Sheets)
│   └── #normatividad
├── #jornadas             ← Visor SIJ (iframe Google Apps Script)
└── #contacto             ← Formulario + datos institucionales
```

---

## Estructura de archivos del proyecto

```
promocion-salud/
├── index.html          ← Página principal (single-page con anclas)
├── style.css           ← Todos los estilos
├── script.js           ← Navbar, animaciones, formulario
├── assets/
│   ├── img/
│   │   └── logo-isem.png     ← Logo oficial ISEM (pendiente de agregar)
│   └── icons/                ← SVG icons si se externalizan
└── README.md
```

---

## Componentes del sitio (detalle por sección)

### 1. Barra institucional superior
- Fondo: `--teal-dk` (#10312B)
- Texto: "**ISEM** — Instituto de Salud del Estado de México"
- Derecha: teléfonos con ícono SVG
- Altura: 36px

### 2. Navbar (sticky)
- Fondo blanco, borde inferior `--gray-200`
- Logo: ícono "PS" + "Promoción a la Salud / Jurisdicción Texcoco"
- Menús con dropdown on-hover
- `position: sticky; top: 0; z-index: 100`
- Clase `.scrolled` añadida via JS al hacer scroll (añade box-shadow)
- Hamburger menu en mobile (< 900px)

**Ítems de menú:**

| Ítem | Subítems |
|------|---------|
| Inicio | — |
| Educación | Determinantes · Prevención · Campañas · #SoyPromotora |
| Programas | Escuela · Tabaco · Nutrición · Estilos de vida · Interculturalidad · Adicciones |
| Salud Mental | Psicólogos · Reportes · Supervisión |
| Recursos | Formatos SINBA · Metas · Normatividad |
| Contacto | — |

### 3. Hero
- Fondo: `--teal-dk` con radial-gradient overlay de `--crimson` (20% opacidad)
- Título: `font-family: Fraunces`, 300 weight, 80px desktop / clamp en mobile
- Subtítulo en italic Fraunces con color `--sand`
- Descripción: 17px, opacidad 75%
- 2 CTAs: `.btn-primary` (crimson) + `.btn-outline` (borde blanco semitransparente)
- Pills de info: jurisdicción, certificaciones, horario
- Ícono de scroll animado (bounce)
- Patrón de fondo: pseudo-elemento con círculo decorativo

### 4. Accesos rápidos (Quick Access Bar)
- Grid de 4 columnas (2 en tablet, 1 en mobile)
- Cada tarjeta: ícono SVG + título + descripción corta + flecha
- Hover: fondo `--sand-lt`, flecha animada
- Separadores con `border-right` y `border-bottom`

### 5. Alerta / Campaña activa (MPOX)
- Fondo: `--gray-100`
- Tarjeta interior: fondo `--crimson`, grid de 3 columnas (badge vertical | contenido | ícono decorativo)
- Badge vertical rotado 180° con texto "Campaña vigente"
- Enlace externo a OPS/OMS

### 6. Secciones de contenido

**Patrón compartido:**
```html
<section class="section-block [alt]" id="SECCION">
  <div class="container">
    <div class="section-header">
      <div class="section-tag [teal|crimson|purple]">Etiqueta</div>
      <h2>Título en<br>dos líneas</h2>
      <p>Descripción corta</p>
    </div>
    <!-- contenido específico -->
  </div>
</section>
```
- `.section-block` — fondo blanco, padding 80px 0
- `.section-block.alt` — fondo `--off-white`

**Tipos de grid usados:**
- `.cards-grid` — 2 columnas (educación)
- `.programs-grid` — 3 columnas (programas)
- `.sm-grid` — 3 columnas (salud mental)
- `.resources-grid` — 3 columnas (recursos)

### 7. Jornadas / SIJ
- Fondo: gradient `--teal-dk → --teal`
- Placeholder con instrucciones para insertar iframe del Web App de Google Apps Script
- El iframe debe sustituir el bloque `.sij-placeholder` con:
```html
<iframe
  src="URL_DEL_WEB_APP_GAS"
  width="100%"
  height="600"
  frameborder="0"
  style="border-radius: 12px;">
</iframe>
```

### 8. Contacto
- Grid 2 columnas: info a la izquierda, formulario a la derecha
- Info: dirección, teléfonos, horario, declaración de salud
- Formulario: nombre, unidad médica, email, asunto (select), mensaje
- Submit: simulado con timeout → mostrar `#form-success`
- **Pendiente:** conectar a Formspree (`https://formspree.io/f/XXXX`) o a un Google Form

### 9. Footer
- Fondo: `--gray-800`
- 3 columnas: brand | links | legal
- Responsive: columna única en mobile

---

## Links externos a recursos (ya integrados)

| Recurso | URL |
|---------|-----|
| Formatos SINBA 2023 | https://drive.google.com/drive/folders/1vm_W1E-GuLbPx9OFbvLRqyjY_Lxh1wn6 |
| Metas por Unidad 2025 | https://docs.google.com/spreadsheets/d/1GL1RulCbxK_RF7K6IHf9r-TPnDaB6O4p/edit |
| Población 2024 por Unidad | https://docs.google.com/spreadsheets/d/1AxfBWfwCG81xV9D6iaMFg3-B0Lgh5Nfb/edit |
| Modelo de Salud para el Bienestar | https://www.gob.mx/insabi/documentos/... |
| NOM-043-SSA2-2012 | https://www.gob.mx/cms/uploads/attachment/file/138258/NOM-043-... |
| Guías Alimentarias 2023 | https://movendi.ngo/wp-content/uploads/2023/05/Gui_as_Alimentarias_2023... |
| Talleres comunitarios (Drive) | https://drive.google.com/drive/folders/1wQCWEuj8RdCsy6xPcxFT_loHVuAvcnU6 |
| Presentación Alimentación Saludable | https://www.canva.com/design/DAGfYVzGx20/... |
| MPOX / OMS | https://www.who.int/es/news-room/fact-sheets/detail/mpox |
| Promoción a la Salud / OPS | https://www.paho.org/es/temas/promocion-salud |

---

## JavaScript — comportamiento

```js
// 1. Navbar: añade clase .scrolled al hacer scroll > 20px
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// 2. Hamburger menu: toggle clase .open en .nav-links
// 3. Smooth scroll: todos los <a href="#..."> con offset de 80px
// 4. Formulario: previene submit real, simula envío con setTimeout
// 5. Animaciones de entrada: IntersectionObserver en tarjetas
//    - opacity: 0 → 1 + translateY(20px → 0) al entrar al viewport
```

---

## Responsive breakpoints

| Breakpoint | Cambios |
|------------|---------|
| `max-width: 900px` | Navbar colapsa a hamburger, grids a 2 cols, dropdowns estáticos |
| `max-width: 580px` | Todo a 1 columna, CTAs a ancho completo, se oculta contacto en top bar |

---

## Pendientes / tareas para Claude Code

- [ ] Agregar logo oficial ISEM en `assets/img/logo-isem.png` y sustituir el ícono "PS" en navbar y footer
- [ ] Conectar formulario de contacto a Formspree o Google Forms
- [ ] Sustituir el placeholder de Jornadas con el `<iframe>` del SIJ (Web App GAS)
- [ ] Agregar página de detalle para cada programa (opcional: modal o sección expandida)
- [ ] Galería de actividades para #SoyPromotoraDeSalud (lightbox simple)
- [ ] Agregar Open Graph meta tags para compartir en redes sociales
- [ ] Agregar `favicon.ico` con los colores ISEM
- [ ] Integrar Google Analytics o Plausible para métricas
- [ ] Verificar accesibilidad: ARIA labels, contraste de colores (WCAG AA)
- [ ] Publicar en GitHub Pages:
  ```bash
  git init
  git add .
  git commit -m "init: sitio Promoción a la Salud"
  git remote add origin https://github.com/USUARIO/promocion-salud.git
  git push -u origin main
  # Activar GitHub Pages en Settings > Pages > Branch: main
  ```

---

## Sistema de diseño — resumen rápido

### Tipografía
```css
/* Display / Headings */
font-family: 'Fraunces', Georgia, serif;
font-weight: 300; /* normal */
font-style: italic; /* para énfasis en hero */

/* Body / UI */
font-family: 'DM Sans', system-ui, sans-serif;
font-weight: 400; /* body */
font-weight: 500; /* labels, botones */
```

### Botones
```css
.btn           /* base: padding 12px 24px, radius 10px */
.btn-primary   /* fondo crimson, texto blanco */
.btn-outline   /* borde blanco semitransparente (sobre fondos oscuros) */
.btn-alert     /* versión compacta para tarjeta de alerta */
.btn-full      /* ancho completo */
```

### Tags / Badges de sección
```css
.section-tag.teal    /* verde ISEM */
.section-tag.crimson /* carmín ISEM */
.section-tag.purple  /* morado para Salud Mental */
.section-tag.white   /* sobre fondos oscuros */
```

### Sombras
```css
--shadow:    0 2px 16px rgba(30,27,24,.08);   /* cards en reposo */
--shadow-md: 0 4px 32px rgba(30,27,24,.12);   /* cards en hover */
```

### Border radius
```css
--radius:    10px;  /* inputs, badges, items pequeños */
--radius-lg: 16px;  /* cards grandes, modales */
```

---

## Notas de integración con SIJ

El sistema SIJ (Sistema Integral de Jornadas) está desarrollado en Google Apps Script e integra Google Forms, Sheets, Calendar y un Web App público. El visor de jornadas ya existe como Web App de GAS.

Para integrarlo en este sitio:
1. Obtener la URL del Web App publicado en GAS (`https://script.google.com/macros/s/XXXX/exec`)
2. En `index.html`, buscar el bloque con clase `.sij-placeholder`
3. Reemplazarlo con:
```html
<iframe
  src="https://script.google.com/macros/s/TU_DEPLOYMENT_ID/exec"
  width="100%"
  height="650"
  frameborder="0"
  style="border-radius:12px; border:none;">
</iframe>
```

---

*Generado como brief de proyecto para continuar desarrollo con Claude Code.*
*Versión inicial construida en Claude.ai — mayo 2025.*
