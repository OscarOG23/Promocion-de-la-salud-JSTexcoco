/* ================================================
   BIBLIOTECA — Materiales y recursos
   ================================================
   CÓMO AÑADIR UN MATERIAL: copia un objeto {...},
   pégalo al final de su categoría y edita los campos.

   categoria válidas (deben coincidir con los filtros):
     lineamientos | manuales | formatos | noms |
     grafico | presentacion | documentos

   "modalidad" y "actualizado" son opcionales (omite el campo si no aplica).
   "url": pega el link de Google Drive / PDF. Usa "#" si aún no hay link.
   "accion": texto del botón (Descargar, Abrir en Drive, Ver PDF, etc.)
   ================================================ */

const BIBLIOTECA = [

  /* ── LINEAMIENTOS ── */
  { titulo: "Lineamiento de Promoción a la Salud 2024", categoria: "lineamientos",
    tema: "Promoción general", publico: "Personal de salud", actualizado: "Ene 2024",
    url: "#", accion: "Descargar" },

  { titulo: "Lineamiento SINBA 2025 — Indicadores de Promoción", categoria: "lineamientos",
    tema: "SINBA / Indicadores", publico: "Responsables de unidad", actualizado: "Ene 2025",
    url: "#", accion: "Descargar" },

  { titulo: "Lineamiento Estatal de Entornos Saludables 2024", categoria: "lineamientos",
    tema: "Entornos saludables", publico: "Responsables de programa", actualizado: "Mar 2024",
    url: "#", accion: "Descargar" },

  /* ── MANUALES ── */
  { titulo: "Manual de Procedimientos — Escuela Saludable", categoria: "manuales",
    tema: "Certificación escolar", publico: "Responsable del programa", actualizado: "Feb 2024",
    url: "#", accion: "Descargar" },

  { titulo: "Manual Operativo de Adicciones 2025", categoria: "manuales",
    tema: "Adicciones", publico: "Personal operativo", actualizado: "Ene 2025",
    url: "#", accion: "Descargar" },

  { titulo: "Manual de Orientación Alimentaria — NOM-043", categoria: "manuales",
    tema: "Alimentación saludable", publico: "Personal de salud y público general", actualizado: "2023",
    url: "https://www.gob.mx/cms/uploads/attachment/file/138258/NOM-043-servicios-basicos-salud-educacion-alimentaria.pdf",
    accion: "Ver en línea" },

  /* ── FORMATOS ── */
  { titulo: "Formatos SINBA 2023 — Colección completa", categoria: "formatos",
    tema: "SINBA / Captura", publico: "Responsables de unidad", actualizado: "2023",
    url: "https://drive.google.com/drive/folders/1vm_W1E-GuLbPx9OFbvLRqyjY_Lxh1wn6",
    accion: "Abrir en Drive" },

  { titulo: "Lista de asistencia — Actividades educativas", categoria: "formatos",
    tema: "Evidencias / Registros", publico: "Personal promotor", actualizado: "Ene 2025",
    url: "#", accion: "Descargar" },

  { titulo: "Formato de tamizaje de adicciones — AUDIT / CAGE", categoria: "formatos",
    tema: "Adicciones / Tamizaje", publico: "Personal de salud", actualizado: "2024",
    url: "#", accion: "Descargar" },

  { titulo: "Metas por unidad 2025 — Hoja de cálculo", categoria: "formatos",
    tema: "Metas / Planeación", publico: "Responsables de unidad", actualizado: "Ene 2025",
    url: "https://docs.google.com/spreadsheets/d/1GL1RulCbxK_RF7K6IHf9r-TPnDaB6O4p/edit",
    accion: "Abrir Sheets" },

  { titulo: "Población por unidad médica 2024", categoria: "formatos",
    tema: "Población / Estadística", publico: "Responsables de unidad", actualizado: "2024",
    url: "https://docs.google.com/spreadsheets/d/1AxfBWfwCG81xV9D6iaMFg3-B0Lgh5Nfb/edit",
    accion: "Abrir Sheets" },

  /* ── NOMs ── */
  { titulo: "NOM-043-SSA2-2012 — Educación alimentaria", categoria: "noms",
    tema: "Alimentación saludable", publico: "Personal de salud", actualizado: "Vigente",
    url: "https://www.gob.mx/cms/uploads/attachment/file/138258/NOM-043-servicios-basicos-salud-educacion-alimentaria.pdf",
    accion: "Ver PDF" },

  { titulo: "NOM-028-SSA2-2009 — Adicciones", categoria: "noms",
    tema: "Adicciones / Prevención", publico: "Personal de salud", actualizado: "Vigente",
    url: "#", accion: "Ver PDF" },

  { titulo: "NOM-046-SSA2-2005 — Violencia familiar y sexual", categoria: "noms",
    tema: "Violencia / Salud mental", publico: "Personal de salud", actualizado: "Vigente",
    url: "#", accion: "Ver PDF" },

  /* ── MATERIAL GRÁFICO ── */
  { titulo: "Infografía — Plato del Bien Comer (actualizada 2023)", categoria: "grafico",
    tema: "Alimentación saludable", publico: "Población general", modalidad: "Distribución / exposición",
    url: "#", accion: "Descargar" },

  { titulo: "Cartel — Prevención del suicidio · Línea de la Vida", categoria: "grafico",
    tema: "Salud mental", publico: "Adolescentes y adultos", modalidad: "Distribución en unidades",
    url: "#", accion: "Descargar" },

  { titulo: "Tríptico — Viruela Símica (MPOX) · Campaña 2025", categoria: "grafico",
    tema: "MPOX / Campaña", publico: "Población general", modalidad: "Distribución",
    url: "#", accion: "Descargar" },

  { titulo: "Rotafolio — Factores de riesgo para adicciones", categoria: "grafico",
    tema: "Adicciones", publico: "Adolescentes de 10–19 años", modalidad: "Taller presencial",
    url: "#", accion: "Descargar" },

  /* ── PRESENTACIONES ── */
  { titulo: "Determinantes sociales de la salud — 9 determinantes ISEM", categoria: "presentacion",
    tema: "Determinantes sociales", publico: "Personal promotor", modalidad: "Capacitación interna",
    url: "https://drive.google.com/drive/folders/1wQCWEuj8RdCsy6xPcxFT_loHVuAvcnU6",
    accion: "Ver en Drive" },

  { titulo: "Alimentación Saludable — Guías Alimentarias 2023", categoria: "presentacion",
    tema: "Alimentación", publico: "Familias y escolares", modalidad: "Taller comunitario · 60 min",
    url: "https://movendi.ngo/wp-content/uploads/2023/05/Gui_as_Alimentarias_2023_para_la_poblacio_n_mexicana.pdf",
    accion: "Ver PDF" },

  { titulo: "Salud Mental — Prevención del suicidio para adolescentes", categoria: "presentacion",
    tema: "Salud mental", publico: "Adolescentes 12–18 años", modalidad: "Plática · 45 min",
    url: "#", accion: "Descargar" },

  /* ── DOCUMENTOS OFICIALES ── */
  { titulo: "Modelo de Salud para el Bienestar (APS)", categoria: "documentos",
    tema: "Modelo de atención", publico: "Personal directivo y técnico", actualizado: "Vigente",
    url: "https://www.gob.mx/insabi/documentos/modelo-de-salud-para-el-bienestar-dirigido-a-las-personas-sin-seguridad-basado-en-la-atencion-primaria-de-salud",
    accion: "Ver en línea" },

  { titulo: "Plan de Trabajo Estatal de Promoción a la Salud 2025", categoria: "documentos",
    tema: "Planeación estratégica", publico: "Responsables de programa", actualizado: "Ene 2025",
    url: "#", accion: "Descargar" },

  { titulo: "Programa Sectorial de Salud del Estado de México 2023–2029", categoria: "documentos",
    tema: "Política en salud", publico: "Personal directivo", actualizado: "2023",
    url: "#", accion: "Ver en línea" },

  { titulo: "Criterios de Certificación — Comunidades Saludables ISEM", categoria: "documentos",
    tema: "Entornos / Certificación", publico: "Responsables de programa", actualizado: "2024",
    url: "#", accion: "Descargar" }

];
