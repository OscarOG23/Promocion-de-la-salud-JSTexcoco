/* ================================================
   DIRECTORIO — Unidades con psicología y nutrición
   ================================================
   CÓMO AÑADIR UNA UNIDAD: copia un objeto {...} y edítalo.
   "tipo" válidos: psicologia | nutricion
   Las tarjetas se generan solas en directorio.html.
   ================================================ */

const DIRECTORIO = [

  /* ── PSICOLOGÍA ── */
  { nombre: "C.S. Texcoco",   zona: "Zona Texcoco",   tipo: "psicologia",
    horario: "Lunes a viernes 8:00–14:00 h",
    atencion: "Atención individual · Previa cita" },

  { nombre: "C.S. Chiautla",  zona: "Zona Chiautla",  tipo: "psicologia",
    horario: "Martes y jueves 8:00–14:00 h",
    atencion: "Atención individual y familiar" },

  { nombre: "C.S. Papalotla", zona: "Zona Papalotla", tipo: "psicologia",
    horario: "Lunes, miércoles y viernes 8:00–14:00 h",
    atencion: "Atención individual · Consulta abierta" },

  /* ── NUTRICIÓN ── */
  { nombre: "C.S. Texcoco",   zona: "Zona Texcoco",   tipo: "nutricion",
    horario: "Lunes a viernes 9:00–13:00 h",
    atencion: "Consejería individual · Previa cita" },

  { nombre: "C.S. Atenco",    zona: "Zona Atenco",    tipo: "nutricion",
    horario: "Martes y jueves 8:00–14:00 h",
    atencion: "Talleres grupales y consejería" }

];
