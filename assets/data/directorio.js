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
   Son las 76 UNIDADES de la hoja «UNIDADES COORDINACION», no las
   coordinaciones: la coordinación es estructura administrativa, y quien
   busca atención busca la unidad. Cada una lleva su `clues` de IMSS
   Bienestar (MCIMB…) y, cuando la hay, su `cluesSSA` (MCSSA…).
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

  /* ══ ATENCO (6) ══ */
  { nombre:    'CEAPS San Salvador Atenco',
    clues:     'MCIMB000856',
    cluesSSA:  'MCSSA000941',
    tipo:      'ceaps',
    tipologia: 'Centros Avanzados De Atención Primaria A La Salud (Caaps)',
    municipio: 'Atenco',
    coordinacion: 'Ceaps San Salvador Atenco',
    direccion: 'Av. Parque Nacional S/N esq. El Contador, San Salvador Atenco, Estado de México, C.P. 56300',
    lat: 19.54644, lng: -98.91426,
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'San Cristóbal Nexquipayac',
    clues:     'MCIMB000861',
    cluesSSA:  'MCSSA000953',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 01 Núcleos Básicos',
    municipio: 'Atenco',
    coordinacion: 'Chiconcuac',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20SN%20CRIST%C3%93BAL%20NEXQUIPAYAC%2C%20Atenco%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'Santa Isabel Ixtapan',
    clues:     'MCIMB000873',
    cluesSSA:  'MCSSA000965',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 02 Núcleos Básicos',
    municipio: 'Atenco',
    coordinacion: 'Chiconcuac',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20SANTA%20ISABEL%20IXTAPAN%2C%20Atenco%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'Zapotlán',
    clues:     'MCIMB000885',
    cluesSSA:  'MCSSA000970',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 02 Núcleos Básicos',
    municipio: 'Atenco',
    coordinacion: 'Chiconcuac',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20ZAPOTLAN%2C%20Atenco%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'San Francisco Acuexcomac',
    clues:     'MCIMB008911',
    cluesSSA:  'MCSSA009930',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 02 Núcleos Básicos',
    municipio: 'Atenco',
    coordinacion: 'Chiconcuac',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20SAN%20FRANCISCO%20ACUEXCOMAC%2C%20Atenco%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'CEAPS Santa Rosa',
    clues:     'MCIMB009833',
    cluesSSA:  'MCSSA014212',
    tipo:      'ceaps',
    tipologia: 'Centros Avanzados De Atención Primaria A La Salud (Caaps)',
    municipio: 'Atenco',
    coordinacion: 'Ceaps Santa Rosa',
    direccion: 'Seminario S/N, Col. Santa Rosa, Municipio de Atenco, Estado de México, C.P. 56300',
    lat: 19.59014, lng: -98.96609,
    servicios: ['medicina-general'],
    telefono:  '5959222202',   // de su coordinación
    horario:   '',
    atencion:  '' },

  /* ══ CHIAUTLA (7) ══ */
  { nombre:    'San Andrés Chiautla',
    clues:     'MCIMB001725',
    cluesSSA:  'MCSSA001904',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 01 Núcleos Básicos',
    municipio: 'Chiautla',
    coordinacion: 'Chiautla',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20SAN%20ANDR%C3%89S%20CHIAUTLA%2C%20Chiautla%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'Ocopulco',
    clues:     'MCIMB001730',
    cluesSSA:  'MCSSA001916',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 01 Núcleos Básicos',
    municipio: 'Chiautla',
    coordinacion: 'Chiautla',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20OCOPULCO%2C%20Chiautla%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'Santiago Chimalpa',
    clues:     'MCIMB001742',
    cluesSSA:  'MCSSA001921',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 01 Núcleos Básicos',
    municipio: 'Chiautla',
    coordinacion: 'Chiautla',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20SANTIAGO%20CHIMALPA%2C%20Chiautla%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'San Antonio Tepetitlán',
    clues:     'MCIMB001754',
    cluesSSA:  'MCSSA001933',
    tipo:      'centro-salud',
    tipologia: 'Rural De 01 Núcleo Básico',
    municipio: 'Chiautla',
    coordinacion: 'Chiautla',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20SAN%20ANTONIO%20TEPETITLAN%2C%20Chiautla%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'Nonoalco',
    clues:     'MCIMB001766',
    cluesSSA:  'MCSSA001945',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 01 Núcleos Básicos',
    municipio: 'Chiautla',
    coordinacion: 'Chiautla',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20NONOALCO%2C%20Chiautla%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'CEAPS Chiautla',
    clues:     'MCIMB011023',
    cluesSSA:  'MCSSA017321',
    tipo:      'ceaps',
    tipologia: 'Centros Avanzados De Atención Primaria A La Salud (Caaps)',
    municipio: 'Chiautla',
    coordinacion: 'Ceaps Chiautla',
    direccion: 'Cto. Escolar 2 de Marzo, Col. San Juan, Chiautla, Estado de México',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=CEAPS+Chiautla%2C+Cto.+Escolar+2+de+Marzo%2C+Col.+San+Juan%2C+Chiautla%2C+Estado+de+M%C3%A9xico&query_place_id=ChIJs-DXgzDp0YURVzGxkstbSf8',
    servicios: ['medicina-general'],
    telefono:  '5959538874',   // de su coordinación
    // ⚠ PENDIENTE DE VALIDAR: CEAPS Chiautla está identificado en Maps; falta corroborar una coordenada 
    horario:   '',
    atencion:  '' },

  { nombre:    'Jurisdicción Sanitaria XIX. Texcoco',
    clues:     'MCSSA015695',
    cluesSSA:  'MCSSA015695',
    tipo:      'jurisdiccion',
    tipologia: 'Oficinas Administrativas',
    municipio: 'Chiautla',
    coordinacion: 'Jurisdicción Sanitaria Xix. Texcoco',
    direccion: 'Camino a Papalotla No. 17, San Sebastián, Chiautla, Estado de México, C.P. 56030',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=JURISDICCION+SANITARIA+TEXCOCO+ISEM%2C+Camino+a+Papalotla+No.+17%2C+San+Sebasti%C3%A1n%2C+Chiautla%2C+Estado+de+M%C3%A9xico%2C+C.P.+56030&query_place_id=ChIJUbIurWLo0YURQy257Q17Mso',
    servicios: ['promocion'],
    // ⚠ PENDIENTE DE VALIDAR: la ficha de Maps está identificada, pero no se asignó coordenada sin una c
    horario:   '',
    atencion:  '' },

  /* ══ CHICOLOAPAN (8) ══ */
  { nombre:    'Ejercito DEL Trabajo',
    clues:     'MCIMB001771',
    cluesSSA:  'MCSSA001950',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 02 Núcleos Básicos',
    municipio: 'Chicoloapan',
    coordinacion: 'Chicoloapan',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20EJERCITO%20DEL%20TRABAJO%2C%20Chicoloapan%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'Col.santa Rosa',
    clues:     'MCIMB001783',
    cluesSSA:  'MCSSA001962',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 02 Núcleos Básicos',
    municipio: 'Chicoloapan',
    coordinacion: 'Chicoloapan',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20COL.SANTA%20ROSA%2C%20Chicoloapan%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'Francisco Villa',
    clues:     'MCIMB001795',
    cluesSSA:  'MCSSA001974',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 01 Núcleos Básicos',
    municipio: 'Chicoloapan',
    coordinacion: 'Chicoloapan',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20FRANCISCO%20VILLA%2C%20Chicoloapan%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'Emiliano Zapata',
    clues:     'MCIMB001812',
    cluesSSA:  'MCSSA001991',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 05 Núcleos Básicos',
    municipio: 'Chicoloapan',
    coordinacion: 'Chicoloapan',
    direccion: 'Calle 1 de Abril S/N, Col. Emiliano Zapata, Chicoloapan, Estado de México, C.P. 56370',
    lat: 19.39801953, lng: -98.9296726,
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'San Vicente Chicoloapan',
    clues:     'MCIMB001824',
    cluesSSA:  'MCSSA002003',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 02 Núcleos Básicos',
    municipio: 'Chicoloapan',
    coordinacion: 'Chicoloapan',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20SAN%20VICENTE%20CHICOLOAPAN%2C%20Chicoloapan%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'Venustiano Carranza',
    clues:     'MCIMB008923',
    cluesSSA:  'MCSSA009942',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 01 Núcleos Básicos',
    municipio: 'Chicoloapan',
    coordinacion: 'Chicoloapan',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20VENUSTIANO%20CARRANZA%2C%20Chicoloapan%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'C.S. ARA',
    clues:     'MCIMB009220',
    cluesSSA:  'MCSSA010304',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 02 Núcleos Básicos',
    municipio: 'Chicoloapan',
    coordinacion: 'Chicoloapan',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20C.S.%20ARA%2C%20Chicoloapan%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'C.S. Beta',
    clues:     'MCIMB009232',
    cluesSSA:  'MCSSA010316',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 02 Núcleos Básicos',
    municipio: 'Chicoloapan',
    coordinacion: 'Chicoloapan',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20C.S.%20BETA%2C%20Chicoloapan%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  /* ══ CHICONCUAC (2) ══ */
  { nombre:    'CEAPS Chiconcuac',
    clues:     'MCIMB001836',
    cluesSSA:  'MCSSA002015',
    tipo:      'ceaps',
    tipologia: 'Centros Avanzados De Atención Primaria A La Salud (Caaps)',
    municipio: 'Chiconcuac',
    coordinacion: 'Ceaps Chiconcuac',
    direccion: 'Niños Héroes S/N, Barrio San Miguel, Chiconcuac, Estado de México',
    lat: 19.54412, lng: -98.89722,
    servicios: ['medicina-general'],
    telefono:  '5959538930',   // de su coordinación
    horario:   '',
    atencion:  '' },

  { nombre:    'Hospital Municipal de Chiconcuac',
    clues:     'MCIMB010224',
    cluesSSA:  'MCSSA014632',
    tipo:      'hospital',
    tipologia: 'Hospital Integral (Comunitario)',
    municipio: 'Chiconcuac',
    coordinacion: 'Hospital Municipal De Chiconcuac',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20HOSPITAL%20MUNICIPAL%20DE%20CHICONCUAC%2C%20Chiconcuac%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general', 'urgencias'],
    horario:   '',
    atencion:  '' },

  /* ══ CHIMALHUACAN (17) ══ */
  { nombre:    'Chimalhuacan',
    clues:     'MCIMB001865',
    cluesSSA:  'MCSSA002044',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 06 Núcleos Básicos',
    municipio: 'Chimalhuacan',
    coordinacion: 'San Pedro',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20CHIMALHUACAN%2C%20Chimalhuacan%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'CEAPS Santa María Chimalhuacan',
    clues:     'MCIMB009821',
    cluesSSA:  'MCSSA014203',
    tipo:      'ceaps',
    tipologia: 'Centros Avanzados De Atención Primaria A La Salud (Caaps)',
    municipio: 'Chimalhuacan',
    coordinacion: 'Ceaps Santa María Chimalhuacan',
    direccion: 'Rosales S/N, Col. Corte San Pablo, Chimalhuacán, Estado de México, C.P. 56395',
    lat: 19.3983798, lng: -98.9090567,
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'San Lorenzo',
    clues:     'MCIMB001894',
    cluesSSA:  'MCSSA002073',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 06 Núcleos Básicos',
    municipio: 'Chimalhuacan',
    coordinacion: 'San Lorenzo',
    direccion: 'Díaz Ordaz y Venustiano Carranza S/N, San Lorenzo, Chimalhuacán, Estado de México, C.P. 56340',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS+Bienestar+-+Centro+de+Salud+San+Lorenzo%2C+D%C3%ADaz+Ordaz+y+Venustiano+Carranza+S%2FN%2C+San+Lorenzo%2C+Chimalhuac%C3%A1n%2C+Estado+de+M%C3%A9xico%2C+C.P.+56340&query_place_id=ChIJ8VZLWhDj0YURIc9JbC_62YA',
    servicios: ['medicina-general'],
    // ⚠ PENDIENTE DE VALIDAR: la unidad de San Lorenzo está identificada en Maps, pero no se encontró un
    horario:   '',
    atencion:  '' },

  { nombre:    'U. Móvil ISEM San Lorenzo 1',
    clues:     'MCIMB010591',
    cluesSSA:  'MCSSA016534',
    tipo:      'movil',
    tipologia: 'Unidad Móvil',
    municipio: 'Chimalhuacan',
    coordinacion: 'San Lorenzo',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20U.%20M%C3%93VIL%20ISEM%20SAN%20LORENZO%201%2C%20Chimalhuacan%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'San Agustín Atlapulco',
    clues:     'MCIMB008935',
    cluesSSA:  'MCSSA009954',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 04 Núcleos Básicos',
    municipio: 'Chimalhuacan',
    coordinacion: 'San Agustin',
    direccion: 'Calle Calvario S/N, San Agustín Atlapulco, Chimalhuacán, Estado de México, C.P. 56343',
    lat: 19.38914, lng: -98.96054,
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'LAS Palomas',
    clues:     'MCIMB008940',
    cluesSSA:  'MCSSA009966',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 03 Núcleos Básicos',
    municipio: 'Chimalhuacan',
    coordinacion: 'San Agustin',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20LAS%20PALOMAS%2C%20Chimalhuacan%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'Colonia Barrio Plateros',
    clues:     'MCIMB001882',
    cluesSSA:  'MCSSA002061',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 06 Núcleos Básicos',
    municipio: 'Chimalhuacan',
    coordinacion: 'Plateros',
    direccion: 'Izcalli S/N, Barrio Plateros, Chimalhuacán, Estado de México, C.P. 56330',
    lat: 19.427626, lng: -98.977075,
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'CEAPS Santa Elena',
    clues:     'MCIMB012225',
    cluesSSA:  'MCSSA018704',
    tipo:      'ceaps',
    tipologia: 'Centros Avanzados De Atención Primaria A La Salud (Caaps)',
    municipio: 'Chimalhuacan',
    coordinacion: 'Ceaps Santa Elena',
    direccion: 'Av. Sindicalismo S/N esq. Capulín, Barrio Alfareros, Chimalhuacán, Estado de México',
    lat: 19.4323237, lng: -98.96695476,
    servicios: ['medicina-general'],
    telefono:  '5521261222',   // de su coordinación
    horario:   '',
    atencion:  '' },

  { nombre:    'Colonia Barrio Herreros',
    clues:     'MCIMB001853',
    cluesSSA:  'MCSSA002032',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 06 Núcleos Básicos',
    municipio: 'Chimalhuacan',
    coordinacion: 'Herreros',
    direccion: 'Organización Popular S/N, Col. Herreros, Chimalhuacán, Estado de México, C.P. 56330',
    lat: 19.43435716, lng: -98.94312144,
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'CEAPS Acuitlapilco',
    clues:     'MCIMB011805',
    cluesSSA:  'MCSSA018226',
    tipo:      'ceaps',
    tipologia: 'Centros Avanzados De Atención Primaria A La Salud (Caaps)',
    municipio: 'Chimalhuacan',
    coordinacion: 'Ceaps Acuitlapilco',
    direccion: 'Av. Arca de Noé S/N, Col. Acuitlapilco, Chimalhuacán, Estado de México, C.P. 56337',
    lat: 19.4379, lng: -98.93185,
    servicios: ['medicina-general'],
    telefono:  '5510573670',   // de su coordinación
    horario:   '',
    atencion:  '' },

  { nombre:    'Barrio Fundidores',
    clues:     'MCIMB001870',
    cluesSSA:  'MCSSA002056',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 06 Núcleos Básicos',
    municipio: 'Chimalhuacan',
    coordinacion: 'Fundidores',
    direccion: 'Av. Ejido Colectivo S/N, Barrio Fundidores, Chimalhuacán, Estado de México, C.P. 56334',
    lat: 19.44479332, lng: -98.95195129,
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'Centro Comunitario de Salud Mental y Adicciones Chimalhuacán',
    clues:     'MCIMB011583',
    cluesSSA:  'MCSSA017934',
    tipo:      'especializada',
    tipologia: 'Unidad De Especialidades Médicas (Unemes)',
    municipio: 'Chimalhuacan',
    coordinacion: 'Uneme',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20CENTRO%20COMUNITARIO%20DE%20SALUD%20MENTAL%20Y%20ADICCIONES%20CHIMALHUAC%C3%81N%2C%20Chimalhuacan%2C%20Estado%20de%20Mexico',
    servicios: ['psicologia'],
    horario:   '',
    atencion:  '' },

  { nombre:    'SORID Barrio Transportistas',
    clues:     'MCIMB012230',
    cluesSSA:  'MCSSA018716',
    tipo:      'especializada',
    tipologia: 'Unidad De Especialidades Médicas (Unemes)',
    municipio: 'Chimalhuacan',
    coordinacion: 'Uneme',
    direccion: 'Av. Riva Palacio esq. Av. México, Barrio Transportistas, Chimalhuacán, Estado de México, C.P. 56335',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS+Bienestar+-+UNEME+Sorid+Barrio+Transportistas%2C+Av.+Riva+Palacio+esq.+Av.+M%C3%A9xico%2C+Barrio+Transportistas%2C+Chimalhuac%C3%A1n%2C+Estado+de+M%C3%A9xico%2C+C.P.+56335&query_place_id=ChIJ-T5acQDj0YURsk6by2O8jNo',
    servicios: [],
    // ⚠ PENDIENTE: Maps muestra un domicilio distinto (Gardenia 65) al directorio/oficial; se dejó sin c
    horario:   '',
    atencion:  '' },

  { nombre:    'CISAME Barrio Transportistas',
    clues:     'MCIMB012353',
    cluesSSA:  'MCSSA018885',
    tipo:      'especializada',
    tipologia: 'Unidad De Especialidades Médicas (Unemes)',
    municipio: 'Chimalhuacan',
    coordinacion: 'Uneme',
    direccion: 'Av. Riva Palacio esq. Av. México, Barrio Transportistas, Chimalhuacán, Estado de México, C.P. 56335',
    lat: 19.43754, lng: -98.972656,
    servicios: ['psicologia'],
    horario:   '',
    atencion:  '' },

  { nombre:    'H.G. Chimalhuacán',
    clues:     'MCIMB001841',
    cluesSSA:  'MCSSA002020',
    tipo:      'hospital',
    tipologia: 'Hospital General',
    municipio: 'Chimalhuacan',
    coordinacion: 'H.G. Chimalhuacan',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20H.G.%20CHIMALHUAC%C3%81N%2C%20Chimalhuacan%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general', 'urgencias'],
    horario:   '',
    atencion:  '' },

  { nombre:    'Hospital General Chimalhuacán San Agustín',
    clues:     'MCIMB009536',
    cluesSSA:  'MCSSA010811',
    tipo:      'hospital',
    tipologia: 'Hospital General',
    municipio: 'Chimalhuacan',
    coordinacion: 'Hospital General Chimalhuacán San Agustín',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20HOSPITAL%20GENERAL%20CHIMALHUAC%C3%81N%20SAN%20AGUST%C3%8DN%2C%20Chimalhuacan%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general', 'urgencias'],
    horario:   '',
    atencion:  '' },

  { nombre:    'Hospital Materno Infantil Vicente Guerrero Chimalhuacán',
    clues:     'MCIMB012201',
    cluesSSA:  'MCSSA018680',
    tipo:      'hospital',
    tipologia: 'Hospital Especializado',
    municipio: 'Chimalhuacan',
    coordinacion: 'Hospital Materno Infantil Vicente Guerrero Chimalhuacán',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20HOSPITAL%20MATERNO%20INFANTIL%20VICENTE%20GUERRERO%20CHIMALHUAC%C3%81N%2C%20Chimalhuacan%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general', 'urgencias'],
    horario:   '',
    atencion:  '' },

  /* ══ PAPALOTLA (1) ══ */
  { nombre:    'Papalotla',
    clues:     'MCIMB004566',
    cluesSSA:  'MCSSA004931',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 02 Núcleos Básicos',
    municipio: 'Papalotla',
    coordinacion: 'Chiautla',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20PAPALOTLA%2C%20Papalotla%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  /* ══ TEPETLAOXTOC (5) ══ */
  { nombre:    'CEAPS Tepetlaoxtoc',
    clues:     'MCIMB006135',
    cluesSSA:  'MCSSA006734',
    tipo:      'ceaps',
    tipologia: 'Centros Avanzados De Atención Primaria A La Salud (Caaps)',
    municipio: 'Tepetlaoxtoc',
    coordinacion: 'Ceaps Tepetlaoxtoc',
    direccion: 'Jolalpan No. 21, Col. La Santísima, Tepetlaoxtoc, Estado de México, C.P. 56070',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS+Bienestar+-+CEAPS+Tepetlaoxtoc%2C+Jolalpan+No.+21%2C+Col.+La+Sant%C3%ADsima%2C+Tepetlaoxtoc%2C+Estado+de+M%C3%A9xico%2C+C.P.+56070&query_place_id=ChIJI0xhspPC0YURFASKflsnnZM',
    servicios: ['medicina-general'],
    telefono:  '5959230932',   // de su coordinación
    // ⚠ PENDIENTE DE VALIDAR: CEAPS Tepetlaoxtoc está identificado en Maps; falta corroborar una coorden
    horario:   '',
    atencion:  '' },

  { nombre:    'La Concepción Jolalpan',
    clues:     'MCIMB006140',
    cluesSSA:  'MCSSA006746',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 01 Núcleos Básicos',
    municipio: 'Tepetlaoxtoc',
    coordinacion: 'Chiautla',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20LA%20CONCEPCI%C3%93N%20JOLALPAN%2C%20Tepetlaoxtoc%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'San Bernardo Tlalmimilolpan',
    clues:     'MCIMB006152',
    cluesSSA:  'MCSSA006751',
    tipo:      'centro-salud',
    tipologia: 'Rural De 01 Núcleo Básico',
    municipio: 'Tepetlaoxtoc',
    coordinacion: 'Chiautla',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20SAN%20BERNARDO%20TLALMIMILOLPAN%2C%20Tepetlaoxtoc%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'San Pedro Chiautzingo',
    clues:     'MCIMB006164',
    cluesSSA:  'MCSSA006763',
    tipo:      'centro-salud',
    tipologia: 'Rural De 01 Núcleo Básico',
    municipio: 'Tepetlaoxtoc',
    coordinacion: 'Chiautla',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20SAN%20PEDRO%20CHIAUTZINGO%2C%20Tepetlaoxtoc%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'Santo Tomás Apipilhuasco',
    clues:     'MCIMB006176',
    cluesSSA:  'MCSSA006775',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 01 Núcleos Básicos',
    municipio: 'Tepetlaoxtoc',
    coordinacion: 'Chiautla',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20SANTO%20TOM%C3%81S%20APIPILHUASCO%2C%20Tepetlaoxtoc%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  /* ══ TEXCOCO (28) ══ */
  { nombre:    'Centro de Salud Urbano DR. Julian Villarreal',
    clues:     'MCIMB006321',
    cluesSSA:  'MCSSA006920',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 06 Núcleos Básicos',
    municipio: 'Texcoco',
    coordinacion: 'Texcoco Cabecera',
    direccion: 'Av. Juárez Norte No. 404, Col. Joyas de San Mateo, Texcoco, Estado de México',
    lat: 19.52002, lng: -98.88165,
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'Tulantongo',
    clues:     'MCIMB006420',
    cluesSSA:  'MCSSA007043',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 02 Núcleos Básicos',
    municipio: 'Texcoco',
    coordinacion: 'Texcoco Cabecera',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20TULANTONGO%2C%20Texcoco%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'San Luis Huexotla',
    clues:     'MCIMB008952',
    cluesSSA:  'MCSSA009983',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 01 Núcleos Básicos',
    municipio: 'Texcoco',
    coordinacion: 'Texcoco Cabecera',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20SAN%20LUIS%20HUEXOTLA%2C%20Texcoco%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'Santa Cruz de Arriba',
    clues:     'MCIMB008976',
    cluesSSA:  'MCSSA010000',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 01 Núcleos Básicos',
    municipio: 'Texcoco',
    coordinacion: 'Texcoco Cabecera',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20SANTA%20CRUZ%20DE%20ARRIBA%2C%20Texcoco%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'Leyes de Reforma',
    clues:     'MCIMB009005',
    cluesSSA:  'MCSSA010036',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 01 Núcleos Básicos',
    municipio: 'Texcoco',
    coordinacion: 'Texcoco Cabecera',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20LEYES%20DE%20REFORMA%2C%20Texcoco%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'La Purificación',
    clues:     'MCIMB006333',
    cluesSSA:  'MCSSA006944',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 01 Núcleos Básicos',
    municipio: 'Texcoco',
    coordinacion: 'Texcoco Este',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20LA%20PURIFICACION%2C%20Texcoco%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'San Jeronimo Amanalco',
    clues:     'MCIMB006350',
    cluesSSA:  'MCSSA006961',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 01 Núcleos Básicos',
    municipio: 'Texcoco',
    coordinacion: 'Texcoco Este',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20SAN%20JERONIMO%20AMANALCO%2C%20Texcoco%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'San Miguel Tlaixpan',
    clues:     'MCIMB006374',
    cluesSSA:  'MCSSA006985',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 01 Núcleos Básicos',
    municipio: 'Texcoco',
    coordinacion: 'Texcoco Este',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20SAN%20MIGUEL%20TLAIXPAN%2C%20Texcoco%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'San Pablo Ixayoc',
    clues:     'MCIMB006386',
    cluesSSA:  'MCSSA006990',
    tipo:      'centro-salud',
    tipologia: 'Rural De 01 Núcleo Básico',
    municipio: 'Texcoco',
    coordinacion: 'Texcoco Este',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20SAN%20PABLO%20IXAYOC%2C%20Texcoco%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'Centro de Salud Santa Catarina DEL Monte',
    clues:     'MCIMB006391',
    cluesSSA:  'MCSSA007002',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 01 Núcleos Básicos',
    municipio: 'Texcoco',
    coordinacion: 'Texcoco Este',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20CENTRO%20DE%20SALUD%20SANTA%20CATARINA%20DEL%20MONTE%2C%20Texcoco%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'Tequexquinahuac',
    clues:     'MCIMB006415',
    cluesSSA:  'MCSSA007031',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 01 Núcleos Básicos',
    municipio: 'Texcoco',
    coordinacion: 'Texcoco Este',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20TEQUEXQUINAHUAC%2C%20Texcoco%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'San Juan Tezontla',
    clues:     'MCIMB008964',
    cluesSSA:  'MCSSA009995',
    tipo:      'centro-salud',
    tipologia: 'Rural De 01 Núcleo Básico',
    municipio: 'Texcoco',
    coordinacion: 'Texcoco Este',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20SAN%20JUAN%20TEZONTLA%2C%20Texcoco%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'Santa María Nativitas',
    clues:     'MCIMB008981',
    cluesSSA:  'MCSSA010012',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 01 Núcleos Básicos',
    municipio: 'Texcoco',
    coordinacion: 'Texcoco Este',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20SANTA%20MAR%C3%8DA%20NATIVITAS%2C%20Texcoco%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'Centro de Salud Santa María Tecuanulco',
    clues:     'MCIMB009845',
    cluesSSA:  'MCSSA014221',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 01 Núcleos Básicos',
    municipio: 'Texcoco',
    coordinacion: 'Texcoco Este',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20CENTRO%20DE%20SALUD%20SANTA%20MAR%C3%8DA%20TECUANULCO%2C%20Texcoco%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'U. Móvil ISEM San Lorenzo 4',
    clues:     'MCIMB010603',
    cluesSSA:  'MCSSA016563',
    tipo:      'movil',
    tipologia: 'Unidad Móvil',
    municipio: 'Texcoco',
    coordinacion: 'Texcoco Este',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20U.%20M%C3%93VIL%20ISEM%20SAN%20LORENZO%204%2C%20Texcoco%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'U. Móvil ISEM San Lorenzo 3',
    clues:     'MCIMB010982',
    cluesSSA:  'MCSSA017275',
    tipo:      'movil',
    tipologia: 'Unidad Móvil',
    municipio: 'Texcoco',
    coordinacion: 'Texcoco Este',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20U.%20M%C3%93VIL%20ISEM%20SAN%20LORENZO%203%2C%20Texcoco%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'San Bernardino',
    clues:     'MCIMB006345',
    cluesSSA:  'MCSSA006956',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 01 Núcleos Básicos',
    municipio: 'Texcoco',
    coordinacion: 'Texcoco Oeste',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20SAN%20BERNARDINO%2C%20Texcoco%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'San Miguel Coatlinchan',
    clues:     'MCIMB006362',
    cluesSSA:  'MCSSA006973',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 02 Núcleos Básicos',
    municipio: 'Texcoco',
    coordinacion: 'Texcoco Oeste',
    direccion: 'Calle 5 de Febrero S/N, San Miguel Coatlinchán, Texcoco, Estado de México',
    lat: 19.45063776, lng: -98.86914813,
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'Santiago Cuautlalpan',
    clues:     'MCIMB006403',
    cluesSSA:  'MCSSA007026',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 01 Núcleos Básicos',
    municipio: 'Texcoco',
    coordinacion: 'Texcoco Oeste',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20SANTIAGO%20CUAUTLALPAN%2C%20Texcoco%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'La Magdalena Panoaya',
    clues:     'MCIMB006432',
    cluesSSA:  'MCSSA007055',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 01 Núcleos Básicos',
    municipio: 'Texcoco',
    coordinacion: 'Texcoco Oeste',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20LA%20MAGDALENA%20PANOAYA%2C%20Texcoco%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'San Felipe',
    clues:     'MCIMB006444',
    cluesSSA:  'MCSSA007060',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 01 Núcleos Básicos',
    municipio: 'Texcoco',
    coordinacion: 'Texcoco Oeste',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20SAN%20FELIPE%2C%20Texcoco%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'San Juan Tocuila',
    clues:     'MCIMB008993',
    cluesSSA:  'MCSSA010024',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 01 Núcleos Básicos',
    municipio: 'Texcoco',
    coordinacion: 'Texcoco Oeste',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20SAN%20JUAN%20TOCUILA%2C%20Texcoco%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'U. Móvil ISEM San Pedro 1',
    clues:     'MCIMB010533',
    cluesSSA:  'MCSSA016382',
    tipo:      'movil',
    tipologia: 'Unidad Móvil',
    municipio: 'Texcoco',
    coordinacion: 'San Pedro',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20U.%20M%C3%93VIL%20ISEM%20SAN%20PEDRO%201%2C%20Texcoco%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'U. Móvil ISEM San Pedro 4',
    clues:     'MCIMB010545',
    cluesSSA:  'MCSSA016411',
    tipo:      'movil',
    tipologia: 'Unidad Móvil',
    municipio: 'Texcoco',
    coordinacion: 'San Pedro',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20U.%20M%C3%93VIL%20ISEM%20SAN%20PEDRO%204%2C%20Texcoco%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'U. Móvil ISEM Plateros 2',
    clues:     'MCIMB010574',
    cluesSSA:  'MCSSA016464',
    tipo:      'movil',
    tipologia: 'Unidad Móvil',
    municipio: 'Texcoco',
    coordinacion: 'Plateros',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20U.%20M%C3%93VIL%20ISEM%20PLATEROS%202%2C%20Texcoco%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'U. Móvil ISEM Plateros 3',
    clues:     'MCIMB010970',
    cluesSSA:  'MCSSA017263',
    tipo:      'movil',
    tipologia: 'Unidad Móvil',
    municipio: 'Texcoco',
    coordinacion: 'Plateros',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20U.%20M%C3%93VIL%20ISEM%20PLATEROS%203%2C%20Texcoco%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'Hospital Materno de Texcoco',
    clues:     'MCIMB009676',
    cluesSSA:  'MCSSA010963',
    tipo:      'hospital',
    tipologia: 'Hospital General',
    municipio: 'Texcoco',
    coordinacion: 'Hospital Materno De Texcoco',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20HOSPITAL%20MATERNO%20DE%20TEXCOCO%2C%20Texcoco%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general', 'urgencias'],
    horario:   '',
    atencion:  '' },

  { nombre:    'H.G. Texcoco Guadalupe Victoria Bicentenario',
    clues:     'MCIMB011945',
    cluesSSA:  'MCSSA018412',
    tipo:      'hospital',
    tipologia: 'Hospital General',
    municipio: 'Texcoco',
    coordinacion: 'H.G. Texcoco Guadalupe Victoria Bicentenario',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20H.G.%20TEXCOCO%20GUADALUPE%20VICTORIA%20BICENTENARIO%2C%20Texcoco%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general', 'urgencias'],
    horario:   '',
    atencion:  '' },

  /* ══ TEZOYUCA (2) ══ */
  { nombre:    'C.S. Tequisistlán',
    clues:     'MCIMB010306',
    cluesSSA:  'MCSSA015286',
    tipo:      'centro-salud',
    tipologia: 'Urbano De 01 Núcleos Básicos',
    municipio: 'Tezoyuca',
    coordinacion: 'Chiconcuac',
    lat: null, lng: null,   // ← pega aquí la coordenada
    maps:      'https://www.google.com/maps/search/?api=1&query=IMSS%20Bienestar%20Centro%20de%20Salud%20C.S.%20TEQUISISTLAN%2C%20Tezoyuca%2C%20Estado%20de%20Mexico',
    servicios: ['medicina-general'],
    horario:   '',
    atencion:  '' },

  { nombre:    'CEAPS Tezoyuca',
    clues:     'MCIMB012406',
    cluesSSA:  'MCSSA018931',
    tipo:      'ceaps',
    tipologia: 'Centros Avanzados De Atención Primaria A La Salud (Caaps)',
    municipio: 'Tezoyuca',
    coordinacion: 'Ceaps Tezoyuca',
    direccion: '20 de Noviembre esq. Independencia, Barrio Santiago, Tezoyuca, Estado de México, C.P. 56000',
    lat: 19.591808, lng: -98.9177189,
    servicios: ['medicina-general'],
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
