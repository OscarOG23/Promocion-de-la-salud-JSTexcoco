/* ================================================
   DIRECTORIO — Unidades con psicología y nutrición
   ================================================
   CÓMO AÑADIR UNA UNIDAD: copia un objeto {...} y edítalo.
   "tipo" válidos: psicologia | nutricion | referencia

   Los de tipo "referencia" son servicios externos. Llevan además
   "tema" (crisis | adicciones | violencia) para que salud-mental y
   adicciones puedan mostrar solo los suyos sin repetir los datos.
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
    atencion: "Talleres grupales y consejería" },


  /* ── REFERENCIA — servicios externos ──
     FUENTE ÚNICA. Antes estaban escritos a mano en
     directorio.html#referencia y repetidos en prosa dentro de
     salud-mental.html y adicciones.html. */
  { nombre: "Línea de la Vida", zona: "Crisis y salud mental 24 h", tipo: "referencia",
    tema: ["crisis", "adicciones"],
    telefono: "8009112000",
    horario: "800 911 2000 — Gratuita, 24 h",
    atencion: "Crisis, suicidio y adicciones" },

  { nombre: "SAPTEL", zona: "Apoyo psicológico 24 h", tipo: "referencia",
    tema: ["crisis"],
    telefono: "5552598121",
    horario: "55 5259-8121 — 24 h",
    atencion: "Apoyo emocional y crisis" },

  { nombre: "CIJ Texcoco", zona: "Centro de Integración Juvenil", tipo: "referencia",
    tema: ["adicciones"],
    horario: "Texcoco, Estado de México",
    atencion: "Prevención y tratamiento de adicciones" },

  { nombre: "UNEME-CAPA", zona: "Unidad especializada en adicciones", tipo: "referencia",
    tema: ["adicciones"],
    horario: "Atención ambulatoria en adicciones",
    atencion: "Referencia desde primer nivel" },

  { nombre: "DIF Municipal", zona: "Violencia y apoyo familiar", tipo: "referencia",
    tema: ["violencia"],
    horario: "Consultar municipio correspondiente",
    atencion: "Violencia familiar, trabajo social" },

  { nombre: "Instituto de la Mujer", zona: "Perspectiva de género", tipo: "referencia",
    tema: ["violencia"],
    horario: "Violencia de género, asesoría legal",
    atencion: "Consultar delegación municipal" },
];
