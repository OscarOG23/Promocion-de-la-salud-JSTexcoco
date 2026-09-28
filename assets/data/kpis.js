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
    { numero: 7,   sufijo: "", etiqueta: "Capturadores en el portal", color: "teal-dk",    desc: "Un solo acceso con contraseña" }
  ],

  /* ── Tablero (reportes.html) ── */
  reportes: [
    { numero: 77,  sufijo: "", etiqueta: "Unidades de salud",        color: "teal",       desc: "Catálogo jurisdiccional canónico" },
    { numero: 22,  sufijo: "", etiqueta: "Coordinaciones",           color: "crimson",    desc: "Estructura administrativa" },
    { numero: 9,   sufijo: "", etiqueta: "Municipios atendidos",     color: "gold-dk",    desc: "Jurisdicción Sanitaria Texcoco" },
    { numero: 42,  sufijo: "%", etiqueta: "Metas SIS al 90% o más",  color: "purple",     desc: "Ene–jul 2026 · 10 metas en 59 unidades" },
    { numero: 68,  sufijo: "", etiqueta: "Talleres",                 color: "crimson-dk", desc: "Catálogo por determinante" },
    { numero: 160, sufijo: "", etiqueta: "Materiales disponibles",   color: "teal-dk",    desc: "Formatos, normas, manuales y talleres" }
  ],

  /* ══ PRODUCCIÓN ene–jul 2026 (reportes.html#indicadores) ══════════════
     Solo cifras de lo realizado; no hay meta que mostrar a propósito.
     SIS: datos_sis/SIS_15_TEXCOCO_2026.txt del proyecto EVALUACION MENSUAL
     TRIMESTRAL Y ANUAL, suma de todas las unidades, enero a julio (agosto
     del cubo aún viene incompleto). La clave SIS va en cada «desc».
     Cartillas: Control_Cartillas_2026_v3 (Drive), hoja MOVIMIENTO POR MES,
     columna SALIDAS. OJO: se captura con UN MES DE DESFASE — la hoja
     FEBRERO trae lo entregado en enero, …, la hoja AGOSTO lo de julio.
     Ene–jul real = hojas FEBRERO a AGOSTO. No usar la tabla «Salidas por
     coordinación y mes» de esa hoja: pierde coordinaciones (San Agustín
     en cero, CEAPS solo hasta febrero) y da 27,984, que no cuadra. */
  promocion: [
    { numero: 11368, sufijo: "", etiqueta: "Talleres comunitarios",        color: "crimson",    desc: "SIS 141 · SES06" },
    { numero: 2145,  sufijo: "", etiqueta: "Sesiones de lactancia materna", color: "teal",      desc: "SIS 141 · SES17" },
    { numero: 10196, sufijo: "", etiqueta: "Asistentes a prevención del maltrato infantil", color: "purple", desc: "SIS 141 · SES19 (en 433 sesiones, SES18)" },
    { numero: 2571,  sufijo: "", etiqueta: "Grupos de adolescentes",        color: "gold-dk",   desc: "SIS 104 · promoción de la salud del adolescente" }
  ],

  cartillas: [
    { numero: 26684, sufijo: "", etiqueta: "Total entregadas",          color: "crimson",    desc: "Ene–jul 2026, todos los grupos" },
    { numero: 8480,  sufijo: "", etiqueta: "Niñas y niños 0–9 años",    color: "teal",       desc: "Cartilla ECN01" },
    { numero: 3346,  sufijo: "", etiqueta: "Adolescentes 10–19 años",   color: "purple",     desc: "Cartilla ECN02" },
    { numero: 9592,  sufijo: "", etiqueta: "Mujeres 20–59 años",        color: "crimson-dk", desc: "Cartilla ECN03" },
    { numero: 3847,  sufijo: "", etiqueta: "Hombres 20–59 años",        color: "teal-dk",    desc: "Cartilla ECN04" },
    { numero: 1419,  sufijo: "", etiqueta: "Personas de 60 años y más", color: "gold-dk",    desc: "Cartilla ECN05" }
  ],

  consulta: [
    { numero: 291142, sufijo: "", etiqueta: "Consultas otorgadas",              color: "teal",       desc: "SIS 001" },
    { numero: 182460, sufijo: "", etiqueta: "Consultas con Línea de Vida",      color: "crimson",    desc: "SIS 054 · atención integrada" },
    { numero: 92344,  sufijo: "", etiqueta: "Consultas con cartilla presentada", color: "gold-dk",   desc: "SIS 055" },
    { numero: 482704, sufijo: "", etiqueta: "Detecciones",                       color: "teal-dk",   desc: "SIS 056" }
  ],

  saludMental: [
    { numero: 8503, sufijo: "", etiqueta: "Consultas en diagnósticos prioritarios", color: "purple",     desc: "SIS 328" },
    { numero: 3913, sufijo: "", etiqueta: "Intervenciones de salud mental y adicciones", color: "crimson-dk", desc: "SIS 324" },
    { numero: 2676, sufijo: "", etiqueta: "Seguimiento por consumo de sustancias", color: "teal-dk",   desc: "SIS 251 · CAPA" }
  ]

};
