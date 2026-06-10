/* ================================================
   KPIS — Indicadores de la jurisdicción
   ================================================
   CÓMO ACTUALIZAR: cambia "numero" (solo dígitos),
   "sufijo" ("+", "%", o ""), "etiqueta" y "desc".
   Colores válidos: crimson | crimson-dk | teal | teal-dk | gold-dk | purple
   Las tarjetas se generan solas en index.html y reportes.html.
   ================================================ */

const KPIS = {

  /* ── Portal (index.html) ── */
  index: [
    { numero: 4,    sufijo: "",  etiqueta: "Campañas activas",        color: "crimson",    desc: "Nacionales y estatales 2025" },
    { numero: 45,   sufijo: "+", etiqueta: "Unidades médicas",         color: "teal",       desc: "Bajo responsabilidad jurisdiccional" },
    { numero: 15,   sufijo: "",  etiqueta: "Municipios",               color: "gold-dk",    desc: "Atendidos en la jurisdicción" },
    { numero: 30,   sufijo: "+", etiqueta: "Materiales en biblioteca", color: "purple",     desc: "Lineamientos, manuales y formatos" },
    { numero: 12,   sufijo: "",  etiqueta: "Certificaciones 2025",     color: "crimson-dk", desc: "Escuelas, ELHT y comunidades" },
    { numero: 8,    sufijo: "",  etiqueta: "Jornadas programadas",     color: "teal-dk",    desc: "Pendientes en el trimestre" }
  ],

  /* ── Tablero (reportes.html) ── */
  reportes: [
    { numero: 4,    sufijo: "",  etiqueta: "Campañas activas",       color: "crimson",    desc: "Nacionales y estatales 2025" },
    { numero: 45,   sufijo: "+", etiqueta: "Unidades médicas",        color: "teal",       desc: "Bajo responsabilidad jurisdiccional" },
    { numero: 15,   sufijo: "",  etiqueta: "Municipios atendidos",    color: "gold-dk",    desc: "Jurisdicción Sanitaria Texcoco" },
    { numero: 12,   sufijo: "",  etiqueta: "Certificaciones 2025",    color: "purple",     desc: "Escuelas, ELHT y comunidades" },
    { numero: 320,  sufijo: "+", etiqueta: "Actividades realizadas",  color: "crimson-dk", desc: "Acumulado enero–mayo 2025" },
    { numero: 8500, sufijo: "+", etiqueta: "Personas beneficiadas",   color: "teal-dk",    desc: "Acumulado enero–mayo 2025" }
  ]

};
