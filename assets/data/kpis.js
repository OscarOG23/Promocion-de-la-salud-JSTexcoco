/* ================================================
   KPIS — Indicadores de la jurisdicción
   ================================================
   CÓMO ACTUALIZAR: cambia "numero" (solo dígitos),
   "sufijo" ("+", "%", o ""), "etiqueta" y "desc".
   Colores válidos: crimson | crimson-dk | teal | teal-dk | gold-dk | purple
   Las tarjetas se generan solas en index.html y reportes.html.
   ================================================ */

/* Cifras verificables, sep 2026. Unidades y municipios: fuente canónica
   (JST-AI-WORKSPACE, core/data/jst.sqlite). Talleres, materiales y formularios:
   conteo de assets/data/recursos.js.
   Avance de metas: proyecto EVALUACION MENSUAL TRIMESTRAL Y ANUAL,
   salida/evaluacion_periodo.csv (pares unidad-meta medibles con
   cumplimiento >= 90 %). Recalcular al cerrar cada mes del SIS. No poner aquí cifras sin fuente. */
const KPIS = {

  /* ── Portal (index.html) ── */
  index: [
    { numero: 77,  sufijo: "", etiqueta: "Unidades de salud",        color: "teal",       desc: "Catálogo jurisdiccional canónico" },
    { numero: 9,   sufijo: "", etiqueta: "Municipios",               color: "gold-dk",    desc: "Atendidos en la jurisdicción" },
    { numero: 9,   sufijo: "", etiqueta: "Determinantes",            color: "crimson",    desc: "24 subtemas de promoción" },
    { numero: 68,  sufijo: "", etiqueta: "Talleres",                 color: "crimson-dk", desc: "Catálogo por determinante" },
    { numero: 160, sufijo: "", etiqueta: "Materiales disponibles",   color: "purple",     desc: "Formatos, normas, manuales y talleres" },
    { numero: 14,  sufijo: "", etiqueta: "Formularios de reporte",   color: "teal-dk",    desc: "Captura mensual por programa" }
  ],

  /* ── Tablero (reportes.html) ── */
  reportes: [
    { numero: 77,  sufijo: "", etiqueta: "Unidades de salud",        color: "teal",       desc: "Catálogo jurisdiccional canónico" },
    { numero: 22,  sufijo: "", etiqueta: "Coordinaciones",           color: "crimson",    desc: "Estructura administrativa" },
    { numero: 9,   sufijo: "", etiqueta: "Municipios atendidos",     color: "gold-dk",    desc: "Jurisdicción Sanitaria Texcoco" },
    { numero: 42,  sufijo: "%", etiqueta: "Metas SIS al 90% o más",  color: "purple",     desc: "Ene–jul 2026 · 10 metas en 59 unidades" },
    { numero: 68,  sufijo: "", etiqueta: "Talleres",                 color: "crimson-dk", desc: "Catálogo por determinante" },
    { numero: 160, sufijo: "", etiqueta: "Materiales disponibles",   color: "teal-dk",    desc: "Formatos, normas, manuales y talleres" }
  ]

};
