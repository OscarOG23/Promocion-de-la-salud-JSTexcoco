/* ================================================
   DIRECTORIO — Unidades de salud y servicios de referencia
   ================================================

   Dos listas, cada una con un trabajo:

   · UNIDADES   → las unidades de salud de la Jurisdicción. UNA entrada
                  por unidad, con la lista de servicios que ofrece y sus
                  coordenadas. De aquí salen el mapa operativo, la rejilla
                  de psicología y la de nutrición.

   · DIRECTORIO → servicios EXTERNOS de referencia (Línea de la Vida,
                  SAPTEL, CIJ…). No son unidades nuestras y no van al mapa.

   Antes «C.S. Texcoco» estaba escrito dos veces (una como psicología y
   otra como nutrición) y había que corregir el horario en los dos sitios.
   Ahora la unidad se escribe una vez y dice qué servicios tiene.
   ================================================ */


/* ── Catálogo de servicios ──────────────────────────────────────
   La «diferenciación de servicios» del mapa sale de aquí: cada uno
   tiene su color y su etiqueta. Para añadir un servicio nuevo basta
   una línea; los filtros del mapa se generan solos a partir de este
   objeto, no hay que tocar el HTML.                              */
const SERVICIOS = {
  'medicina-general': { etiqueta: 'Medicina general', color: 'crimson' },
  'psicologia':       { etiqueta: 'Psicología',       color: 'purple'  },
  'nutricion':        { etiqueta: 'Nutrición',        color: 'teal'    },
  'odontologia':      { etiqueta: 'Odontología',      color: 'gold'    },
  'enfermeria':       { etiqueta: 'Enfermería',       color: 'teal'    },
  'vacunacion':       { etiqueta: 'Vacunación',       color: 'crimson' },
  'planificacion':    { etiqueta: 'Planificación familiar', color: 'purple' },
  'promocion':        { etiqueta: 'Promoción de la salud',  color: 'gold' },
  'laboratorio':      { etiqueta: 'Laboratorio',      color: 'charcoal' },
  'urgencias':        { etiqueta: 'Urgencias',        color: 'crimson' },
};


/* ── UNIDADES DE SALUD ──────────────────────────────────────────

   CÓMO AÑADIR UNA UNIDAD: copia la plantilla y rellena.

   { nombre:    'C.S. Nombre',            // como lo llama el personal
     clues:     'MCSSA000000',            // clave CLUES (opcional)
     tipo:      'centro-salud',           // centro-salud | ceaps | hospital | jurisdiccion
     municipio: 'Texcoco',
     zona:      'Zona Texcoco',           // texto libre, sale bajo el nombre
     direccion: 'Calle X s/n, Col. Y, 56100 Texcoco, Méx.',
     lat: 19.5051, lng: -98.8830,         // ← pega aquí tus coordenadas
     servicios: ['medicina-general', 'psicologia'],   // claves de SERVICIOS
     telefono:  '5959210000',             // SOLO dígitos (es para el enlace tel:)
     horario:   'Lunes a viernes 8:00–14:00 h',
     atencion:  'Atención individual · Previa cita' },

   SOBRE LAS COORDENADAS
   ---------------------
   `lat` y `lng` son NÚMEROS, en grados decimales y con el signo puesto:
   en esta zona la latitud es positiva (~19.5) y la longitud NEGATIVA
   (~-98.9). Una longitud sin el menos manda el pin a China.

   Para sacarlas: en Google Maps, clic derecho sobre el punto → la primera
   línea del menú son las dos cifras, y al pulsarla se copian.

   Con lat/lng puestas, la tarjeta enseña sola «Ver en el mapa» y «Cómo
   llegar». Sin ellas dice «Ubicación por cargar» y no rompe nada: se
   pueden ir cargando poco a poco.

   Si en vez de coordenadas tienes el enlace corto de Maps, ponlo en
   `maps: 'https://maps.app.goo.gl/…'` y se usa ese.
   ────────────────────────────────────────────────────────────── */

const UNIDADES = [

  { nombre:    'Jurisdicción Sanitaria Texcoco',
    tipo:      'jurisdiccion',
    municipio: 'Chiautla',
    zona:      'Sede jurisdiccional',
    direccion: 'Cda. Carretera Papalotla s/n, San Andrés Chiautla, 56030 Chiautla, Méx.',
    lat: null, lng: null,
    servicios: ['promocion'],
    telefono:  '5959531884',
    horario:   'Lunes a viernes, 8:00–15:00 h',
    atencion:  'Departamento de Promoción a la Salud · Ext. 94251' },

  { nombre:    'C.S. Texcoco',
    tipo:      'centro-salud',
    municipio: 'Texcoco',
    zona:      'Zona Texcoco',
    direccion: '',
    lat: null, lng: null,
    servicios: ['medicina-general', 'psicologia', 'nutricion'],
    horario:   'Lunes a viernes 8:00–14:00 h',
    atencion:  'Psicología: atención individual, previa cita · Nutrición: consejería individual, previa cita' },

  { nombre:    'C.S. Chiautla',
    tipo:      'centro-salud',
    municipio: 'Chiautla',
    zona:      'Zona Chiautla',
    direccion: '',
    lat: null, lng: null,
    servicios: ['medicina-general', 'psicologia'],
    horario:   'Martes y jueves 8:00–14:00 h',
    atencion:  'Atención individual y familiar' },

  { nombre:    'C.S. Papalotla',
    tipo:      'centro-salud',
    municipio: 'Papalotla',
    zona:      'Zona Papalotla',
    direccion: '',
    lat: null, lng: null,
    servicios: ['medicina-general', 'psicologia'],
    horario:   'Lunes, miércoles y viernes 8:00–14:00 h',
    atencion:  'Atención individual · Consulta abierta' },

  { nombre:    'C.S. Atenco',
    tipo:      'centro-salud',
    municipio: 'Atenco',
    zona:      'Zona Atenco',
    direccion: '',
    lat: null, lng: null,
    servicios: ['medicina-general', 'nutricion'],
    horario:   'Martes y jueves 8:00–14:00 h',
    atencion:  'Talleres grupales y consejería' },

];


/* ── REFERENCIA — servicios externos ────────────────────────────
   FUENTE ÚNICA. Antes estaban escritos a mano en
   directorio.html#referencia y repetidos en prosa dentro de
   salud-mental.html y adicciones.html.

   Llevan `tema` (crisis | adicciones | violencia) para que cada
   programa muestre los suyos sin repetir los datos, y `telefono`
   con SOLO dígitos, para el enlace tel:.                         */

const DIRECTORIO = [

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
