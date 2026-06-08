/* ================================================
   CAMPAÑAS ACTIVAS — campaigns.js
   Para editar campañas, modifica este array.
   Cada objeto representa una diapositiva del
   carrusel en la página de Inicio.
   ================================================ */

const CAMPAIGNS = [
  {
    id: 'mpox',
    titulo: 'Viruela Símica (MPOX)',
    objetivo: 'Prevenir la transmisión del virus mpox mediante información, detección oportuna y reducción de conductas de riesgo en la población.',
    poblacion: 'Población general; mayor riesgo en adultos con múltiples contactos',
    vigencia: '2025-12-31',
    color: 'crimson',
    materiales: [
      { tipo: 'Información OMS', url: 'https://www.who.int/es/news-room/fact-sheets/detail/mpox', icono: 'ext' },
      { tipo: 'Solicitar materiales', url: '#contacto', icono: 'mail' }
    ],
    evidenciaSugerida: 'Foto de actividad + lista de asistencia + bitácora de plática'
  },
  {
    id: 'alimentacion',
    titulo: 'Alimentación Saludable 2025',
    objetivo: 'Promover hábitos alimentarios saludables basados en las Guías Alimentarias 2023 y la NOM-043-SSA2-2012.',
    poblacion: 'Familias, escolares, embarazadas y adultos mayores',
    vigencia: '2025-12-31',
    color: 'gold',
    materiales: [
      { tipo: 'Guías Alimentarias 2023', url: 'https://movendi.ngo/wp-content/uploads/2023/05/Gui_as_Alimentarias_2023_para_la_poblacio_n_mexicana.pdf', icono: 'pdf' },
      { tipo: 'NOM-043', url: 'https://www.gob.mx/cms/uploads/attachment/file/138258/NOM-043-servicios-basicos-salud-educacion-alimentaria.pdf', icono: 'pdf' }
    ],
    evidenciaSugerida: 'Foto de taller + registro de participantes + encuesta de evaluación'
  },
  {
    id: 'salud-mental',
    titulo: 'Salud Mental: Cuídate y Cuídanos',
    objetivo: 'Reducir el estigma en torno a la salud mental y promover la búsqueda oportuna de apoyo psicológico en la comunidad.',
    poblacion: 'Adolescentes, adultos y personal de salud',
    vigencia: '2025-12-31',
    color: 'purple',
    materiales: [
      { tipo: 'Ver sección Salud Mental', url: 'salud-mental.html', icono: 'link' },
      { tipo: 'Directorio de atención', url: 'directorio.html', icono: 'link' }
    ],
    evidenciaSugerida: 'Foto de actividad + lista de asistencia + notas de seguimiento'
  },
  {
    id: 'adicciones',
    titulo: 'Prevención de Adicciones',
    objetivo: 'Fortalecer factores de protección y reducir factores de riesgo frente al consumo de sustancias en población joven.',
    poblacion: 'Adolescentes de 10 a 19 años y sus familias',
    vigencia: '2025-12-31',
    color: 'teal',
    materiales: [
      { tipo: 'Ver sección Adicciones', url: 'adicciones.html', icono: 'link' },
      { tipo: 'Solicitar formatos', url: 'contacto', icono: 'mail' }
    ],
    evidenciaSugerida: 'Tamizaje aplicado + foto + lista de asistencia'
  }
];
