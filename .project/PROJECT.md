# Proyecto — Portal Promoción de la Salud, JS Texcoco

## Propósito

Plataforma interna multipágina del **Departamento de Promoción a la Salud, Jurisdicción Sanitaria Texcoco (ISEM)**: portal, determinantes, adicciones, salud mental, entornos, biblioteca, reportes, directorio, recursos de psicología y paquete garantizado.

## Arquitectura

HTML/CSS/JS sin dependencias ni paso de build. Son **10 páginas**.

`components.js` exporta navbar y footer como template literals; cada página los inyecta en `#site-nav` y `#site-footer`.

`assets/data/recursos.js` es el **índice único** de los 187 materiales y se carga en las 10 páginas, porque el buscador global del navbar lo necesita en todas. Si falta, el botón de búsqueda se retira solo.

## Stack

HTML + CSS + JavaScript planos. Sin Node, sin frameworks, sin build. Leaflet 1.9.4 alojado localmente.

## Entradas

- `datos/acciones.json` — las 133 Acciones Integradas de Línea de Vida.
- `assets/data/recursos.js`, `campaigns.js`, `kpis.js`, `directorio.js`.
- `CAPTURA_coordenadas_unidades_COMPLETADA.xlsx` — origen histórico de las coordenadas, ya volcado a `directorio.js`.

## Salidas

Sitio estático navegable, publicado desde el repositorio (`.nojekyll` presente).

## Datos requeridos

`unidades`, `determinantes`.

## Datos institucionales: dónde están duplicados hoy

| Dato | Dónde vive aquí | Filas |
|---|---|---|
| Unidades de salud, con las dos CLUES, municipio, coordinación y tipología | `assets/data/directorio.js` → `UNIDADES` | 76 |
| Coordenadas, direcciones, enlaces de Maps, teléfonos | el mismo archivo | 66 con coordenada, 20 con dirección |
| Coordenadas en bruto | `CAPTURA_coordenadas_unidades_COMPLETADA.xlsx` | 61 |
| Los 9 determinantes | texto en `promocion.html` y etiquetas en `recursos.js` | 9 |

**`directorio.js` es la fuente viva de las coordenadas.** Su cabecera documenta que los datos vienen de `DIRECTORIO_con_maps_y_coordenadas.xlsx`, hoja `UBICACION MAPS`. Ese archivo está **borrado del directorio de trabajo pero versionado**: sigue íntegro en `HEAD` y se recupera con `git show HEAD:"DIRECTORIO_con_maps_y_coordenadas.xlsx" > recuperado.xlsx`. De `directorio.js` se alimentaron los campos de coordenadas y dirección de `core/data/jst.sqlite`.

Lo que sí es propio del portal y **no** es dato institucional: `servicios` (clasificación editorial para colorear el mapa), `horario`, `atencion`, y la lista `DIRECTORIO` de 6 servicios externos (Línea de la Vida, SAPTEL, CIJ), que no son unidades de la jurisdicción.

## Qué puede sustituirse por consultas al workspace

| Hoy | Se sustituye por | Estado |
|---|---|---|
| Los campos institucionales de `UNIDADES` (nombre, CLUES, municipio, coordinación, tipología, lat/lng, dirección, Maps) | `jst export --project promocion-web` → `units[]` | verificado, sin aplicar |
| Los 9 determinantes escritos a mano | el mismo export → `determinants[]` | verificado, sin aplicar |

La forma prevista: `directorio.js` conserva **solo** lo editorial (`servicios`, `horario`, `atencion`, los externos) y se une por CLUES contra el catálogo exportado, que se sirve como un JSON junto al sitio. El portal seguiría sin build ni dependencias: `core/lib/jst_client.js` se carga como un `<script>` más.

**Nada de esto se ha aplicado todavía.** `directorio.js` sigue siendo la fuente que el sitio lee.

## Integraciones

Leaflet (mapa del directorio). Google Fonts en 9 de las 10 páginas. Consumidor previsto del catálogo canónico del JST AI Workspace.

## Comandos principales

```powershell
python -m http.server 8080
python ..\JST-AI-WORKSPACE\scripts\jst.py export --project promocion-web --out catalogo.json
```

O la extensión Live Server de VS Code.

## Validaciones

El proyecto no tiene suite de pruebas propia. La comprobación que sí existe es de consistencia de datos: el buscador global depende de que `recursos.js` esté cargado en las 10 páginas, y el mapa depende de que cada unidad con `lat` tenga también `lng`.

Desde el workspace, `python scripts/validate.py` verifica que las 76 unidades y sus coordenadas sigan íntegras.

## Restricciones

- `paquete-garantizado.html` es la única página que **no** enlaza Google Fonts: el módulo tiene que abrir sin internet, así que redefine `--font-display` / `--font-body` a Cambria/Calibri sobre `body.pg-body`.
- No reintroducir los archivos que `recursos.js` sustituyó (`biblioteca.js`, `talleres.js`, `formularios.js`, `psicologia.js`); siguen en el historial de git.
- Sin build y sin dependencias: cualquier integración con el workspace tiene que ser un `<script>` o un `fetch` de un JSON, nunca un paso de compilación.
- Las unidades sin coordenada llevan `lat: null` y un campo `ubicacion` que dice **por qué**. No rellenar esos huecos con un punto aproximado: 7 son unidades móviles y no tienen punto fijo.
- La clave que usa este proyecto es **MCIMB** (IMSS-Bienestar). Determinantes usa **MCSSA**. Al cruzar, traducir con `jst clues <CLUES>`.

---

Registrado en el JST AI Workspace como `promocion-web`.
Ver `../JST-AI-WORKSPACE/projects.yaml`.
