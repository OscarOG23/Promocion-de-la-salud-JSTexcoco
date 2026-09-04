# Estado actual

## Implementado

- Las 10 páginas del portal.
- Índice único de 187 recursos con buscador global.
- **El directorio ya no se mantiene a mano.** `assets/data/jst-directorio.generado.js` se genera desde la fuente canónica del workspace y `directorio.js` lo aplica sobre su lista; lo editorial (`servicios`, `horario`, `atencion`, servicios externos) se queda donde estaba.
- Equivalencia probada antes de conectar: los 11 campos institucionales de las 76 unidades coinciden exactamente con lo que el portal mostraba.
- Respaldo verificado: si el artefacto no carga, el portal funciona igual que antes con los valores de la lista.
- El directorio pasa de 76 a 77 unidades, con el mapa en 66 ubicadas.
- **Smoke test en navegador real (Chrome headless), 2026-09-04:** 77 tarjetas y 66 marcadores tanto por HTTP como por `file://`; sin el artefacto el sitio sigue en 76 unidades sin romperse.
- **Interacción probada con clics y escritura reales** (`tests/smoke_portal_interaccion.js`, vía DevTools Protocol): 13/13. Filtrar por Texcoco deja 28, volver a pulsar restaura 77, Atenco muestra 7 e incluye el Hospital General Atenco; el buscador abre, encuentra y avisa cuando no hay resultados.

## En desarrollo

- (ninguno registrado)

## Pendiente

- Revisión visual por una persona: el smoke test comprueba el DOM y la interacción, no si el resultado *se ve bien*.
- Publicar el commit `7afa497` (el directorio consumiendo el catálogo generado): está confirmado en local, sin subir.
- Clasificar los servicios de `MCIMB012476` y darle coordenadas: hoy sale en el directorio sin servicios y sin punto en el mapa (`location_status: 'sin-fuente'`).
- Retirar de `directorio.js` los valores institucionales de respaldo, una vez que el artefacto lleve tiempo en uso.
- **Decidir la purga del historial** del XLSX con datos de personal. Se retiró de la rama publicada el 2026-09-04 (commit `df1cefe`) y Pages ya da 404, pero el blob sigue accesible por SHA de commit. Recomendación: purgar. Ver `POLITICA_XLSX.md` del workspace.
- Decidir si `CAPTURA_coordenadas_unidades_COMPLETADA.xlsx` y el volcado de Notion de `docs/superpowers/specs/` deben seguir en una raíz publicada: no traen datos personales, pero son documentos internos.
- Resolver las 3 unidades con `ubicacion: 'discrepancia'`.
- Completar dirección y teléfono, que hoy faltan en 57 y 71 unidades.

## Último cambio relevante

2026-09-04 — el directorio consume el catálogo generado desde la fuente canónica

_(el historial completo está en Git.)_
