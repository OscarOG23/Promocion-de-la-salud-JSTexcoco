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

   DE DÓNDE SALEN ESTOS DATOS
   --------------------------
   De la hoja «UBICACION MAPS» de DIRECTORIO_con_maps_y_coordenadas.xlsx,
   cruzada con «COORDINACION» para los teléfonos. Lo que la hoja no dice,
   aquí está vacío: `horario` y `atencion` hay que llenarlos a mano, y
   `servicios` solo trae lo que el propio nombre acredita (un CISAME hace
   salud mental; de un CEAPS no se puede deducir si tiene nutriólogo).

   Las unidades sin coordenada llevan `lat: null` porque en la hoja están
   marcadas PENDIENTE o con discrepancia. Cada una conserva su comentario
   con lo que falta comprobar, y en la web salen con su enlace de búsqueda
   en Maps en vez de un pin equivocado.

   NO se incluyen los nombres del personal (coordinador, administrador,
   enfermera) que trae la hoja: el sitio es público.

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

  { nombre:    'Jefatura Jurisdiccional',
    tipo:      'jurisdiccion',
    municipio: 'Chiautla',
    direccion: 'Camino a Papalotla No. 17, San Sebastián, Chiautla, Estado de México, C.P. 56030',
    lat: null, lng: null,
    maps:      'https://www.google.com/maps/search/?api=1&query=JURISDICCION+SANITARIA+TEXCOCO+ISEM%2C+Camino+a+Papalotla+No.+17%2C+San+Sebasti%C3%A1n%2C+Chiautla%2C+Estado+de+M%C3%A9xico%2C+C.P.+56030&query_place_id=ChIJUbIurWLo0YURQy257Q17Mso',
    servicios: ['promocion'],
    telefono:  '5959531945',
    // ⚠ PENDIENTE DE VALIDAR: la ficha de Maps está identificada, pero no se asignó coordenada sin una coinc
    horario:   '',
    atencion:  '' },

  { nombre:    'Coordinación Municipal Chiautla',
    tipo:      'coordinacion',
    municipio: 'Chiautla',
    direccion: 'Calle Matamoros S/N, Chiautla, Estado de México, C.P. 56030',
    lat: null, lng: null,
    maps:      'https://www.google.com/maps/search/?api=1&query=COORDINACION+MUNICIPAL+CHIAUTLA%2C+Calle+Matamoros+S%2FN%2C+Chiautla%2C+Estado+de+M%C3%A9xico%2C+C.P.+56030',
    servicios: ['promocion'],
    telefono:  '5959218388',
    // ⚠ PENDIENTE: no existe una ficha propia inequívoca de la coordinación; el enlace actual es una búsqued
    horario:   '',
    atencion:  '' },

  { nombre:    'Coordinación Municipal Chicoloapan',
    tipo:      'coordinacion',
    municipio: 'Chicoloapan',
    direccion: 'Calle 1 de Abril S/N, Col. Emiliano Zapata, Chicoloapan, Estado de México, C.P. 56370',
    lat: 19.39801953, lng: -98.9296726,
    servicios: ['promocion'],
    telefono:  '5515513790',
    horario:   '',
    atencion:  '' },

  { nombre:    'Coordinación Municipal Chiconcuac',
    tipo:      'coordinacion',
    municipio: 'Chiconcuac',
    direccion: 'Av. Juárez Norte No. 404, Col. Joyas de San Mateo, C.P. 56240',
    lat: null, lng: null,
    maps:      'https://www.google.com/maps/search/?api=1&query=COORDINACION+MUNICIPAL+CHICONCUAC%2C+Av.+Ju%C3%A1rez+Norte+No.+404%2C+Col.+Joyas+de+San+Mateo%2C+C.P.+56240',
    servicios: ['promocion'],
    telefono:  '5959540283',
    // ⚠ PENDIENTE: existe discrepancia entre el domicilio del directorio y la referencia localizada; no se a
    horario:   '',
    atencion:  '' },

  { nombre:    'Coordinación Municipal Fundidores',
    tipo:      'coordinacion',
    municipio: 'Chimalhuacán',
    direccion: 'Av. Ejido Colectivo S/N, Barrio Fundidores, Chimalhuacán, Estado de México, C.P. 56334',
    lat: 19.44479332, lng: -98.95195129,
    servicios: ['promocion'],
    telefono:  '5526133421',
    horario:   '',
    atencion:  '' },

  { nombre:    'Coordinación Municipal Herreros',
    tipo:      'coordinacion',
    municipio: 'Chimalhuacán',
    direccion: 'Organización Popular S/N, Col. Herreros, Chimalhuacán, Estado de México, C.P. 56330',
    lat: 19.43435716, lng: -98.94312144,
    servicios: ['promocion'],
    telefono:  '5550443745',
    horario:   '',
    atencion:  '' },

  { nombre:    'Coordinación Municipal Plateros',
    tipo:      'coordinacion',
    municipio: 'Chimalhuacán',
    direccion: 'Izcalli S/N, Barrio Plateros, Chimalhuacán, Estado de México, C.P. 56330',
    lat: 19.427626, lng: -98.977075,
    servicios: ['promocion'],
    telefono:  '5551114494',
    horario:   '',
    atencion:  '' },

  { nombre:    'Coordinación Municipal San Agustín',
    tipo:      'coordinacion',
    municipio: 'Chimalhuacán',
    direccion: 'Calle Calvario S/N, San Agustín Atlapulco, Chimalhuacán, Estado de México, C.P. 56343',
    lat: 19.38914, lng: -98.96054,
    servicios: ['promocion'],
    telefono:  '5550448381',
    horario:   '',
    atencion:  '' },

  { nombre:    'Coordinación Municipal San Lorenzo',
    tipo:      'coordinacion',
    municipio: 'Chimalhuacán',
    direccion: 'Díaz Ordaz y Venustiano Carranza S/N, San Lorenzo, Chimalhuacán, Estado de México, C.P. 56340',
    lat: null, lng: null,
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS+Bienestar+-+Centro+de+Salud+San+Lorenzo%2C+D%C3%ADaz+Ordaz+y+Venustiano+Carranza+S%2FN%2C+San+Lorenzo%2C+Chimalhuac%C3%A1n%2C+Estado+de+M%C3%A9xico%2C+C.P.+56340&query_place_id=ChIJ8VZLWhDj0YURIc9JbC_62YA',
    servicios: ['promocion'],
    telefono:  '5522289407',
    // ⚠ PENDIENTE DE VALIDAR: la unidad de San Lorenzo está identificada en Maps, pero no se encontró una co
    horario:   '',
    atencion:  '' },

  { nombre:    'Coordinación Municipal San Pedro',
    tipo:      'coordinacion',
    municipio: 'Chimalhuacán',
    direccion: 'Av. del Refugio S/N, San Pedro, Chimalhuacán, Estado de México, C.P. 56330',
    lat: null, lng: null,
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS+Bienestar+-+Centro+de+Salud+Urbano+San+Pedro+Chimalhuac%C3%A1n%2C+Av.+del+Refugio+S%2FN%2C+San+Pedro%2C+Chimalhuac%C3%A1n%2C+Estado+de+M%C3%A9xico%2C+C.P.+56330&query_place_id=ChIJhTulPJXj0YURgmeX5GRooKE',
    servicios: ['promocion'],
    telefono:  '5515517492',
    // ⚠ PENDIENTE DE VALIDAR: la unidad de San Pedro está identificada en Maps, pero no se encontró una coor
    horario:   '',
    atencion:  '' },

  { nombre:    'Coordinación Municipal Texcoco Cabecera',
    tipo:      'coordinacion',
    municipio: 'Texcoco',
    direccion: 'Av. Juárez Norte No. 404, Col. Joyas de San Mateo, Texcoco, Estado de México',
    lat: 19.52002, lng: -98.88165,
    servicios: ['promocion'],
    telefono:  '5959529037',
    horario:   '',
    atencion:  '' },

  { nombre:    'Coordinación Municipal Texcoco Este',
    tipo:      'coordinacion',
    municipio: 'Texcoco',
    direccion: 'Av. Juárez Norte No. 404, Col. Joyas de San Mateo, Texcoco, Estado de México',
    lat: 19.52002, lng: -98.88165,
    servicios: ['promocion'],
    telefono:  '5959252000',
    horario:   '',
    atencion:  '' },

  { nombre:    'Coordinación Municipal Texcoco Oeste',
    tipo:      'coordinacion',
    municipio: 'Texcoco',
    direccion: 'Calle 5 de Febrero S/N, San Miguel Coatlinchán, Texcoco, Estado de México',
    lat: 19.45063776, lng: -98.86914813,
    servicios: ['promocion'],
    horario:   '',
    atencion:  '' },

  { nombre:    'C.S.U. Dr. Julián Villarreal',
    tipo:      'centro-salud',
    municipio: 'Texcoco',
    direccion: 'Av. Juárez Norte No. 404, Col. Joyas de San Mateo, Texcoco, Estado de México',
    lat: 19.52002, lng: -98.88165,
    servicios: ['medicina-general'],
    telefono:  '5959529037',
    horario:   '',
    atencion:  '' },

  { nombre:    'CEAPS Acuitlapilco',
    tipo:      'ceaps',
    municipio: 'Chimalhuacán',
    direccion: 'Av. Arca de Noé S/N, Col. Acuitlapilco, Chimalhuacán, Estado de México, C.P. 56337',
    lat: 19.4379, lng: -98.93185,
    servicios: ['medicina-general'],
    telefono:  '5510573670',
    horario:   '',
    atencion:  '' },

  { nombre:    'CEAPS Atenco',
    tipo:      'ceaps',
    municipio: 'Atenco',
    direccion: 'Av. Parque Nacional S/N esq. El Contador, San Salvador Atenco, Estado de México, C.P. 56300',
    lat: 19.54644, lng: -98.91426,
    servicios: ['medicina-general'],
    telefono:  '5959534679',
    horario:   '',
    atencion:  '' },

  { nombre:    'CEAPS Chiautla',
    tipo:      'ceaps',
    municipio: 'Chiautla',
    direccion: 'Cto. Escolar 2 de Marzo, Col. San Juan, Chiautla, Estado de México',
    lat: null, lng: null,
    maps:      'https://www.google.com/maps/search/?api=1&query=CEAPS+Chiautla%2C+Cto.+Escolar+2+de+Marzo%2C+Col.+San+Juan%2C+Chiautla%2C+Estado+de+M%C3%A9xico&query_place_id=ChIJs-DXgzDp0YURVzGxkstbSf8',
    servicios: ['medicina-general'],
    telefono:  '5959538874',
    // ⚠ PENDIENTE DE VALIDAR: CEAPS Chiautla está identificado en Maps; falta corroborar una coordenada exac
    horario:   '',
    atencion:  '' },

  { nombre:    'CEAPS Chiconcuac',
    tipo:      'ceaps',
    municipio: 'Chiconcuac',
    direccion: 'Niños Héroes S/N, Barrio San Miguel, Chiconcuac, Estado de México',
    lat: 19.54412, lng: -98.89722,
    servicios: ['medicina-general'],
    telefono:  '5959538930',
    horario:   '',
    atencion:  '' },

  { nombre:    'CEAPS Santa Elena',
    tipo:      'ceaps',
    municipio: 'Chimalhuacán',
    direccion: 'Av. Sindicalismo S/N esq. Capulín, Barrio Alfareros, Chimalhuacán, Estado de México',
    lat: 19.4323237, lng: -98.96695476,
    servicios: ['medicina-general'],
    telefono:  '5521261222',
    horario:   '',
    atencion:  '' },

  { nombre:    'CEAPS Santa María',
    tipo:      'ceaps',
    municipio: 'Chimalhuacán',
    direccion: 'Rosales S/N, Col. Corte San Pablo, Chimalhuacán, Estado de México, C.P. 56395',
    lat: 19.3983798, lng: -98.9090567,
    servicios: ['medicina-general'],
    telefono:  '015529250098',
    horario:   '',
    atencion:  '' },

  { nombre:    'CEAPS Santa Rosa',
    tipo:      'ceaps',
    municipio: 'Atenco',
    direccion: 'Seminario S/N, Col. Santa Rosa, Municipio de Atenco, Estado de México, C.P. 56300',
    lat: 19.59014, lng: -98.96609,
    servicios: ['medicina-general'],
    telefono:  '5959222202',
    horario:   '',
    atencion:  '' },

  { nombre:    'CEAPS Tepetlaoxtoc',
    tipo:      'ceaps',
    municipio: 'Tepetlaoxtoc',
    direccion: 'Jolalpan No. 21, Col. La Santísima, Tepetlaoxtoc, Estado de México, C.P. 56070',
    lat: null, lng: null,
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS+Bienestar+-+CEAPS+Tepetlaoxtoc%2C+Jolalpan+No.+21%2C+Col.+La+Sant%C3%ADsima%2C+Tepetlaoxtoc%2C+Estado+de+M%C3%A9xico%2C+C.P.+56070&query_place_id=ChIJI0xhspPC0YURFASKflsnnZM',
    servicios: ['medicina-general'],
    telefono:  '5959230932',
    // ⚠ PENDIENTE DE VALIDAR: CEAPS Tepetlaoxtoc está identificado en Maps; falta corroborar una coordenada 
    horario:   '',
    atencion:  '' },

  { nombre:    'CEAPS Tezoyuca',
    tipo:      'ceaps',
    municipio: 'Tezoyuca',
    direccion: '20 de Noviembre esq. Independencia, Barrio Santiago, Tezoyuca, Estado de México, C.P. 56000',
    lat: 19.591808, lng: -98.9177189,
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'CECOSAMA',
    tipo:      'especializada',
    municipio: 'Chimalhuacán',
    direccion: 'Av. Riva Palacio esq. Av. México, Barrio Transportistas, Chimalhuacán, Estado de México, C.P. 56335',
    lat: 19.4395, lng: -98.97538,
    servicios: ['psicologia'],
    horario:   '',
    atencion:  '' },

  { nombre:    'CISAME',
    tipo:      'especializada',
    municipio: 'Chimalhuacán',
    direccion: 'Av. Riva Palacio esq. Av. México, Barrio Transportistas, Chimalhuacán, Estado de México, C.P. 56335',
    lat: 19.43754, lng: -98.972656,
    servicios: ['psicologia'],
    horario:   '',
    atencion:  '' },

  { nombre:    'SORID',
    tipo:      'especializada',
    municipio: 'Chimalhuacán',
    direccion: 'Av. Riva Palacio esq. Av. México, Barrio Transportistas, Chimalhuacán, Estado de México, C.P. 56335',
    lat: null, lng: null,
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS+Bienestar+-+UNEME+Sorid+Barrio+Transportistas%2C+Av.+Riva+Palacio+esq.+Av.+M%C3%A9xico%2C+Barrio+Transportistas%2C+Chimalhuac%C3%A1n%2C+Estado+de+M%C3%A9xico%2C+C.P.+56335&query_place_id=ChIJ-T5acQDj0YURsk6by2O8jNo',
    servicios: [],
    // ⚠ PENDIENTE: Maps muestra un domicilio distinto (Gardenia 65) al directorio/oficial; se dejó sin coord
    horario:   '',
    atencion:  '' },

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
