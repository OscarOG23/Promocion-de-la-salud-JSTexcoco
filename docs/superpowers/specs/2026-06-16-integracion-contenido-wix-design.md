# Integración del contenido del sitio Wix al portal nuevo — Diseño

**Fecha:** 2026-06-16
**Autor:** Oscar Dávila + Claude
**Estado:** Aprobado (diseño) — pendiente plan de implementación

## Contexto

Existen dos activos complementarios:

- **Portal nuevo** (este repo): HTML/CSS/JS sin build, 8 páginas con diseño terminado y un
  sistema de datos (`assets/data/*.js`). La mayoría de enlaces son placeholders (`url:"#"`).
- **Sitio Wix viejo** (`drisaacalfaro.wixsite.com/promocion-a-la-salud`): feo y atado a Wix,
  pero contiene el contenido real ya desarrollado. El inventario completo (200+ enlaces,
  46 presentaciones Canva, 34 carpetas Drive, 16 Google Forms, 40+ formatos oficiales) está
  documentado en `docs/superpowers/specs/2026-06-16-wix-content-source.txt` — **esa es la
  fuente de verdad de URLs** para la implementación.

## Objetivo

Inyectar el contenido real del Wix dentro de las secciones que ya existen en el portal nuevo,
reforzando el lado "personal de salud" (recursos para dar temas y talleres), sin rediseñar el
look & feel y sin migrar 21 páginas Wix una a una. El sitio queda como híbrido
población + personal, con énfasis en el personal.

## Decisiones de arquitectura (confirmadas con el usuario)

1. **Catálogo de talleres** → se expande `promocion.html` (no se crea página aparte ni se mete
   en biblioteca).
2. **Hub de psicólogos** → página nueva dedicada `recursos-psicologia.html`.
3. **Alcance** → todo de una vez (no por fases). La implementación se organiza igual en
   componentes para revisión ordenada.

## Hallazgos que condicionan el diseño

- **Choque de taxonomías:** las 9 `det-card` del portal nuevo (Agua, Alimentación, Actividad
  física, Tabaquismo, Salud mental, Adicciones, Violencia/género, Interculturalidad, +1) NO
  coinciden con las 9 categorías del Wix que agrupan las 46 presentaciones (Alimentación,
  Actividad Física, Salud Sexual y Reproductiva, Entornos Físicos, Entornos Psicosociales,
  Crecimiento y Desarrollo Infantil, Diversidad/Equidad/Género, Derecho a la Salud,
  Participación Social). Cada `det-card` solo tiene 3 enlaces → no caben 46 presentaciones.
  **Solución:** las `det-card` quedan como mapa conceptual; las 46 presentaciones viven en una
  sección/catálogo nuevo filtrable por las 9 categorías reales.
- **`reportes.html` mal enmarcado:** hoy simula "descargar reportes pasados". Lo que el personal
  necesita son los 16 Google Forms para *enviar* su reporte mensual. **Solución:** agregar un
  hub de captura (formularios) además del histórico.

## Diseño por componente

### C1 — `promocion.html`: catálogo de talleres
- Mantener las 9 `det-card` como overview; conectar sus 3 enlaces a recursos reales
  (Presentación → Drive maestro; Material → carpeta de complementos del tema; Video → YouTube
  donde exista).
- **Sección nueva "Catálogo de Talleres Comunitarios"** debajo de `#determinantes`: grilla
  filtrable reusando el patrón `filter-bar-wrap` + `material-card`, alimentada por
  `assets/data/talleres.js`. Filtros = las 9 categorías reales del ISEM.
- Bloque "Talleres Comunitarios — Formatos" (formato de taller, concentrado, encuesta, reporte
  Google Form) integrado en `#material`/`#evidencias`.

### C2 — `reportes.html`: hub de reportería
- **Sección nueva "Captura de reporte mensual"**: tarjetas de los 16 Google Forms agrupados por
  área, desde `assets/data/formularios.js`.
- **Calendario de Fechas Conmemorables 2026** (PDF + carpeta Drive) como recurso destacado.
- Conservar tablas de histórico (apuntando a Drive donde exista).

### C3 — `entornos.html`: formatos y manuales
- Escuela Saludable (Manual Certificación 3.0, 10 formatos, enlaces SEP/Aprende.org).
- Comunidades a Certificar (manuales + 12 anexos urbanos).
- ELHT / Entornos Laborales (presentaciones tabaquismo, cédulas, certificados, checklist + form).
- Unidades promotoras / TVF-TAPS (lineamientos TAPS, cronograma, visita domiciliaria, formatos
  oficiales).

### C4 — `adicciones.html`
- 2 Google Forms reales (informe mensual, concentrado violencia/delincuencia).
- Material descargable (gafas de impedimento por alcohol).
- Formatos TVF compartidos.

### C5 — `salud-mental.html`
- **Línea de la Vida 800 911 2000** como banner/CTA (la página ya tiene `.alert-banner`).
- Supervisión (cédula + Google Form), reportes BCSM/GAE, calendario de actividades (Google
  Calendar `saludmentaljstex@gmail.com`).
- Enlace destacado a `recursos-psicologia.html`.

### C6 — `recursos-psicologia.html` (nueva)
- Hub privado del personal con las 8 categorías del viejo "Espacios para psicólogos":
  herramientas de consulta, directorio de referencias, lineamientos IMSS-B, formatos de
  expediente, brigadas/cartografía social, plan anual + carpeta gerencial, pruebas
  psicológicas, oficios administrativos. Calendario integrado.
- Estructura reusando `page-hero`, `subsec-grid`/`subsec-card`, `section-tag purple`.
- Datos desde `assets/data/psicologia.js`.
- Enlazada desde `salud-mental.html`, `directorio.html` y el footer. **No** en el menú principal
  (contenido interno especializado). Si el usuario lo pide después, se agrega a `components.js`.

### C7 — `biblioteca.js`: expansión
- Reemplazar `url:"#"` por enlaces reales donde existan y añadir formatos nuevos (expediente
  clínico DDSISEM, guías de práctica clínica, manuales de certificación, NOMs, etc.).
- Categoría opcional nueva `presentacion` ya existe; evaluar etiqueta "talleres".

### C8 — Cross-cutting
- **`components.js` footer real:** dirección (Cda. Carretera Papalotla s/n, San Andrés
  Chiautla 1, 56030 Chiautla, Méx.), teléfonos (01 595 95 3 18 84 / 01 595 95 3 19 45,
  Ext. 94251), email `comitepromociontex@gmail.com`, Facebook real
  (`facebook.com/profile.php?id=100012254806363`), © 2025. Eliminar enlaces genéricos Wix.
- **`index.html#contacto`:** datos reales + iframe Google Maps de la ubicación.
- **`campaigns.js`:** añadir campaña "3x Mi Salud" (3 líneas de acción).

## Nuevos archivos de datos

- `assets/data/talleres.js` — array `TALLERES`: `{ tema, categoria, url, complementos?, tipo? }`.
- `assets/data/formularios.js` — array `FORMULARIOS`: `{ area, titulo, url, periodicidad? }`.
- `assets/data/psicologia.js` — array `PSICOLOGIA`: `{ titulo, descripcion, recursos:[{label,url}] }`.

Cada uno se carga con su `<script>` en la página correspondiente y se renderiza con una función
nueva en `script.js` (`renderTalleres()`, `renderFormularios()`, `renderPsicologia()`),
siguiendo el patrón de `renderBiblioteca()` / `renderDirectorio()`.

## Fuera de alcance / descartado

- Página "solo imagen" #SoyPromotoraDeSalud → se vuelve un material gráfico en biblioteca.
- Enlaces genéricos de redes de Wix (Twitter/MundoWix, etc.) → se eliminan.
- Duplicación TVF ↔ Adicciones → contenido TVF compartido, sin duplicar.
- Secciones efímeras (Popocatépetl/cenizas, temporada de lluvia) → opcional como aviso temporal.
- Conectar el formulario de contacto a Formspree/EmailJS (requiere cuenta del usuario).
- Re-alojar los 14 archivos `filesusr.com` (tarea de operación de contenido).

## Pendientes a verificar (no bloquean)

- ⚠️ Extensión telefónica: Wix muestra **94251** y **94219**. Se usa 94251; confirmar.
- ⚠️ Archivos en `filesusr.com` mueren si se cancela Wix → marcar para re-alojar en Drive.
- ⚠️ Imágenes en `static.wixstatic.com`: descargar en máxima resolución (URL base sin params).

## Verificación

- Abrir cada página en navegador (Live Server) y confirmar que las nuevas secciones renderizan
  desde sus arrays de datos sin errores de consola.
- Confirmar que los filtros del catálogo de talleres funcionan (reuso de `initFilters`).
- Revisar que ningún enlace nuevo quede en `#` salvo los marcados como pendientes.
- Footer y datos de contacto reales visibles en todas las páginas.
