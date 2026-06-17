/* ================================================
   FORMULARIOS DE REPORTE MENSUAL
   ================================================
   Áreas válidas:
     promocion | adicciones | salud-mental | entornos | ferias

   Cada objeto: { area, titulo, url, periodicidad }
   ================================================ */

const FORMULARIOS = [

  /* ── PROMOCIÓN A LA SALUD ── */
  {
    area: 'promocion',
    titulo: 'Concentrado de Informes mensuales Promoción',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLScGyKth2OHE0A8L0XVJoI-GeUSUelfFZL-L1q6ZtzNcXumfHg/viewform',
    periodicidad: 'Mensual'
  },
  {
    area: 'promocion',
    titulo: 'Reporte mensual Colateral de Actividad Física',
    url: 'https://forms.gle/rWMQBx6sYTJ2SrCe8',
    periodicidad: 'Mensual'
  },
  {
    area: 'promocion',
    titulo: 'Reporte mensual SIPS Fechas a Conmemorar 2026',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSfFTVF-rppG3QUj0KJ5vVhkWO8-fFu3KBvAjbCHALUFFifWUw/viewform',
    periodicidad: 'Mensual'
  },
  {
    area: 'promocion',
    titulo: 'Talleres Comunitarios Determinantes',
    url: 'https://forms.gle/eTp1E2VCNW9yF82A8',
    periodicidad: 'Mensual'
  },
  {
    area: 'promocion',
    titulo: 'Eventos Educativos',
    url: 'https://forms.gle/6B74GDxBeYTZ2U5L6',
    periodicidad: 'Mensual'
  },
  {
    area: 'promocion',
    titulo: 'Reporte Productividad Promotores y Gestores',
    url: 'https://docs.google.com/forms/d/1JL-MBi82Urn3wKCfLlEenlKLKnGg87sA6uRCt9axKds/edit',
    periodicidad: 'Mensual'
  },

  /* ── ENTORNOS SALUDABLES ── */
  {
    area: 'entornos',
    titulo: 'Reporte Mensual de Entornos Laborales 2025',
    url: 'https://forms.gle/bFJTQZnREpjB45jR9',
    periodicidad: 'Mensual'
  },
  {
    area: 'entornos',
    titulo: 'Reporte Eventos Educativos — Entornos Laborales 2025',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSepUBbkE3cH1eS2JnZrAS2rn8OTNq1EZ8hqsQvWu_VnXnGVtg/viewform',
    periodicidad: 'Mensual'
  },

  /* ── FERIAS Y JORNADAS ── */
  {
    area: 'ferias',
    titulo: 'Reporte Módulos, Jornadas, Ferias y Magnas Ferias',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLScX65ig628in9hXqiBX1HAWrmsKJ1NdtV-nWFYqg6Sx7gsywQ/viewform',
    periodicidad: 'Por evento'
  },

  /* ── ADICCIONES ── */
  {
    area: 'adicciones',
    titulo: 'Informe Mensual de Adicciones',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSfYSe8hf7D6nGzWK7GKmlJtdWyhLuaUOF0dE97gOa8XYkqwSg/viewform',
    periodicidad: 'Mensual'
  },
  {
    area: 'adicciones',
    titulo: 'Concentrado de Violencia y la Delincuencia',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSeR61t_9bC_0y5Ln2MI0lmW-bayXjagkH6QsBSDxi2C0k6xcg/viewform',
    periodicidad: 'Mensual'
  },

  /* ── SALUD MENTAL ── */
  {
    area: 'salud-mental',
    titulo: 'Productividad Mensual de Salud Mental',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSfGR-ty_-1BapoiA28LjgAPFipcUtP-rIQEmJIZ90DSXYPOwQ/viewform?usp=sharing',
    periodicidad: 'Mensual'
  },
  {
    area: 'salud-mental',
    titulo: 'Reportes BCSM y GAE',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLScK-HmmTJLD9gIfBS0enMA7Z1O2S6npzLk6YmrXFTrLExmzlA/viewform?usp=sharing',
    periodicidad: 'Mensual'
  },
  {
    area: 'salud-mental',
    titulo: 'Cédula de Supervisión de Salud Mental',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLScIRdabw_-XejTY-2m92FNR_BBR2fbiKlcsQ9ErI-RYlyUrgA/viewform?usp=sharing',
    periodicidad: 'Por supervisión'
  },

];
