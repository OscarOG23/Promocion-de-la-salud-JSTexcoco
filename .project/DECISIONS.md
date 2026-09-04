# Decisiones

> Solo decisiones arquitectónicas o funcionales relevantes y estables.
> Esto no es un diario de trabajo: lo que cambió y cuándo ya lo dice Git.

Formato:

```md
## YYYY-MM-DD — Título

**Decisión:**
Texto breve.

**Motivo:**
Texto breve.

**Impacto:**
Texto breve.
```

---

## 2026-09-04 — `directorio.js` se separa en editorial e institucional

**Decisión:**
Cuando se conecte el catálogo canónico, `directorio.js` conservará únicamente lo que es propio del portal —`servicios`, `horario`, `atencion` y la lista `DIRECTORIO` de servicios externos— y se unirá por CLUES contra el catálogo exportado por el workspace. Los campos institucionales (nombre, municipio, coordinación, tipología, coordenadas, dirección, Maps) dejarán de escribirse aquí.

**Motivo:**
Hoy el archivo mezcla dos cosas con ciclos de vida distintos: un dato institucional que cambia cuando cambia la jurisdicción, y una decisión editorial sobre cómo colorear el mapa. Mezclarlas obliga a editar el sitio cuando lo que cambió fue el directorio.

**Impacto:**
El portal pasa a depender de un JSON servido junto al sitio. Sigue sin build y sin dependencias: `core/lib/jst_client.js` se carga como un `<script>` más. Si el JSON falta, el mapa se queda sin unidades, así que hará falta un aviso claro y no un fallo silencioso.

---

## 2026-09-04 — El XLSX de origen está borrado del disco, pero no perdido

**Decisión:**
`DIRECTORIO_con_maps_y_coordenadas.xlsx` —el origen de las coordenadas de `assets/data/directorio.js`— se considera recuperable y no se vuelve a generar. La supresión pendiente **no se confirma** sin decidir antes si el archivo debe volver al directorio de trabajo.

**Motivo:**
El archivo aparece como borrado en `git status`, pero sigue íntegro en `HEAD`: 74 684 bytes, con su hoja `UBICACION MAPS`. Se recupera con `git show HEAD:"DIRECTORIO_con_maps_y_coordenadas.xlsx" > recuperado.xlsx`. No hay pérdida de datos, hay una supresión sin confirmar.

**Impacto:**
Quien mire la carpeta no encontrará el archivo y puede concluir, como se concluyó el 2026-09-03, que se perdió. Si la supresión se confirma, el archivo pasa a vivir solo en el historial: recuperable, pero invisible. Sus datos están además volcados en `core/data/jst.sqlite`.

---

## 2026-09-04 — La ausencia de coordenada se explica, no se rellena

**Decisión:**
Las unidades sin coordenada llevan `lat: null` y un campo `ubicacion` que dice por qué: `movil` (7), `discrepancia` (3), `por-validar` (4, estas sí con punto). El catálogo canónico conserva esa distinción en `location_status`.

**Motivo:**
Falta de coordenada no significa lo mismo en todas: una unidad móvil no tiene punto fijo y eso no es un dato pendiente sino cómo trabaja. Mostrarlas todas como un hueco, o inventarles un punto aproximado, daría un mapa falso.

**Impacto:**
En la web salen con su enlace de búsqueda en Maps en lugar de un pin equivocado. Cualquier consumidor del catálogo debe leer `location_status` antes de tratar un `null` como error.

---

## 2026-09-04 — El catálogo llega como `<script>`, no como `fetch` de JSON

**Decisión:**
El artefacto generado se sirve en dos formas: `jst-directorio.generado.json`
(canónica, para herramientas) y `jst-directorio.generado.js`, que es la que
cargan `directorio.html` y `salud-mental.html` con una etiqueta `<script>`.

**Motivo:**
El JSON era la preferencia, pero esta página se abre con doble clic y bajo
`file://` el navegador bloquea `fetch()`. No es una hipótesis: `paquete.js` ya
tiene un mensaje de error para exactamente ese caso con `datos/acciones.json`.
Servir el directorio por `fetch` habría convertido una página que hoy funciona
sin servidor en una que no.

**Impacto:**
Dos archivos con el mismo contenido, y una prueba que verifica que no se
separan. Cuando el portal deje de abrirse con doble clic, el `.js` sobra.

---

## 2026-09-04 — Los nombres para mostrar son datos, no una transformación

**Decisión:**
`display_name`, `display_coordination` y `display_typology` se guardan en la
fuente canónica, tomados de este portal.

**Motivo:**
Se intentó derivarlos aplicando title-case a los nombres del maestro y solo
reproducía 38 de 76. Los nombres del portal llevan acentos que `DIRECTORIO.xlsx`
perdió —`Zapotlán` frente a `ZAPOTLAN`, `San Antonio Tepetitlán` frente a
`SAN ANTONIO TEPETITLAN`— y respetan siglas como `CEAPS` y `H.G.`. Derivarlos
habría degradado lo que el sitio muestra.

**Impacto:**
Este portal es la fuente de una parte del catálogo institucional, no solo su
consumidor. Al corregir un nombre aquí, se corrige para todos.
