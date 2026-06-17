/* ================================================
   TALLERES COMUNITARIOS — Presentaciones por determinante
   ================================================
   NOTA: las URLs de Canva usan ID + /view; verificar el token de compartir
   completo si alguna no abre.

   categoria válidas (slugs de los 9 determinantes):
     alimentacion | actividad | salud-sexual | entornos-fisicos |
     entornos-psicosociales | infancia | diversidad | derecho-salud |
     participacion
   ================================================ */

const TALLERES = [

  /* ── 1. ALIMENTACIÓN ── */
  { tema: "Alimentación Saludable",             categoria: "alimentacion",
    url: "https://www.canva.com/design/DAGfYVzGx20/view",
    complementos: "https://drive.google.com/drive/folders/1AHqMvY5aqi7A4bALjqvIW3jCUj7eOD8c" },

  { tema: "Consumo de Agua Simple",             categoria: "alimentacion",
    url: "https://www.canva.com/design/DAGfwUlz9js/view" },

  { tema: "Consumo de Sal y Sodio",             categoria: "alimentacion",
    url: "https://www.canva.com/design/DAGgIa4eyww/view" },

  { tema: "Etiquetado Nutrimental",             categoria: "alimentacion",
    url: "https://www.canva.com/design/DAGiGVrLhAM/view" },

  { tema: "Higiene de los Alimentos",           categoria: "alimentacion",
    url: "https://www.canva.com/design/DAGkWGNEm4c/view" },

  { tema: "Cultura Alimentaria Tradicional",    categoria: "alimentacion",
    url: "https://www.canva.com/design/DAGgZ_kDNbM/view" },

  { tema: "Lactancia Materna y Alimentación Complementaria", categoria: "alimentacion",
    url: "https://www.canva.com/design/DAGfwIkYSjI/view" },

  { tema: "Desnutrición",                       categoria: "alimentacion",
    url: "https://www.canva.com/design/DAGlSAtqpAw/view" },

  { tema: "Síndrome Metabólico",                categoria: "alimentacion",
    url: "#" /* PENDIENTE */ },

  { tema: "Sobrepeso y Obesidad",               categoria: "alimentacion",
    url: "https://www.canva.com/design/DAGqQcgs-5E/view" },

  { tema: "Diabetes",                           categoria: "alimentacion",
    url: "https://www.canva.com/design/DAGqQsIZgNw/view" },

  { tema: "Hipertensión",                       categoria: "alimentacion",
    url: "https://www.canva.com/design/DAGmTxbx9xs/view" },

  /* ── 2. ACTIVIDAD FÍSICA ── */
  { tema: "Actividad Física",                   categoria: "actividad",
    url: "https://www.canva.com/design/DAGlp2XMHVk/view",
    complementos: "https://drive.google.com/drive/folders/1RK-P7oCsO09PurosirNFTMN_vEYSGOcY" },

  /* ── 3. SALUD SEXUAL Y REPRODUCTIVA ── */
  { tema: "Adolescencia",                       categoria: "salud-sexual",
    url: "https://www.canva.com/design/DAGmB2s-JII/view" },

  { tema: "Sexualidad",                         categoria: "salud-sexual",
    url: "https://www.canva.com/design/DAGmCqFRHi4/view" },

  { tema: "Prevención ITS",                     categoria: "salud-sexual",
    url: "https://www.instagram.com/p/DJo6ZAnNkR7/" },

  { tema: "ITS",                                categoria: "salud-sexual",
    url: "https://www.instagram.com/p/DJo6ZAnNkR7/" },

  { tema: "VIH-SIDA",                          categoria: "salud-sexual",
    url: "https://www.canva.com/design/DAGms4BqzII/view" },

  { tema: "Planificación Familiar",             categoria: "salud-sexual",
    url: "https://www.canva.com/design/DAGmypM5tVk/view",
    complementos: "https://drive.google.com/drive/folders/19golJHYzQyReF2rSroPbdA2DCwj3JX5N" },

  { tema: "Embarazo, Parto y Puerperio",        categoria: "salud-sexual",
    url: "https://www.canva.com/design/DAGqQzO-lSg/view",
    complementos: "https://drive.google.com/drive/folders/17DJzNpYGWLjmxgalQ3XQLvUnRg0Zq7PP" },

  { tema: "Maternidad Sin Riesgo",              categoria: "salud-sexual",
    url: "https://www.canva.com/design/DAGqVkgSABc/view" },

  { tema: "Parto y Puerperio",                  categoria: "salud-sexual",
    url: "https://www.canva.com/design/DAGm4cRisvc/view" },

  { tema: "Lactancia Materna",                  categoria: "salud-sexual",
    url: "https://www.canva.com/design/DAGfwIkYSjI/view" },

  { tema: "Alojamiento Conjunto",               categoria: "salud-sexual",
    url: "https://www.canva.com/design/DAGnQiqFF5k/view" },

  { tema: "Climaterio Masculino y Femenino",    categoria: "salud-sexual",
    url: "https://www.canva.com/design/DAGnid_H8TU/view",
    complementos: "https://drive.google.com/drive/folders/1jZlSwKIatEvy5InTDwr-ggA6e-_V05m3" },

  { tema: "Prevención Cáncer de Próstata",      categoria: "salud-sexual",
    url: "https://www.canva.com/design/DAGn3iGnVQ0/view",
    complementos: "https://drive.google.com/drive/folders/1YaS1C5lhj7o4Sb9cS7Y0RoTEswvzKdFY" },

  { tema: "Prevención Cáncer de Mama",          categoria: "salud-sexual",
    url: "https://www.canva.com/design/DAGqVnPBKoE/view",
    complementos: "https://drive.google.com/drive/folders/1YaS1C5lhj7o4Sb9cS7Y0RoTEswvzKdFY" },

  { tema: "Prevención Cáncer Cérvico Uterino",  categoria: "salud-sexual",
    url: "https://www.instagram.com/p/DLFrZaUujJA/",
    complementos: "https://drive.google.com/drive/folders/1YaS1C5lhj7o4Sb9cS7Y0RoTEswvzKdFY" },

  /* ── 4. ENTORNOS FÍSICOS SALUDABLES ── */
  { tema: "Higiene Personal y Lavado de Manos", categoria: "entornos-fisicos",
    url: "https://www.canva.com/design/DAGoAsPV9ro/view",
    complementos: "https://drive.google.com/drive/folders/154PVJzT3_2jg0jGUx6rKTXXfL1aAYY3B" },

  { tema: "Salud Bucal",                        categoria: "entornos-fisicos",
    url: "https://www.canva.com/design/DAGomozLaHg/view" },

  { tema: "Saneamiento Básico",                 categoria: "entornos-fisicos",
    url: "https://www.canva.com/design/DAGov4dJiyM/view",
    complementos: "https://drive.google.com/drive/folders/154PVJzT3_2jg0jGUx6rKTXXfL1aAYY3B" },

  { tema: "Diarreas y Vida Suero Oral",         categoria: "entornos-fisicos",
    url: "https://www.canva.com/design/DAGowTQyWVg/view",
    complementos: "https://drive.google.com/drive/folders/1FtzsIdHNkccH6-eNwhhfhW6Tb9qlY-AH" },

  { tema: "Parasitosis",                        categoria: "entornos-fisicos",
    url: "https://www.canva.com/design/DAGo2Bvb4sk/view" },

  { tema: "Prevención de Accidentes",           categoria: "entornos-fisicos",
    url: "https://www.canva.com/design/DAGo2XOGs4M/view",
    complementos: "https://drive.google.com/drive/folders/1AChG694t3x_MXvTTBXQxqasXXi0Grjo5" },

  { tema: "Manejo de Lesiones",                 categoria: "entornos-fisicos",
    url: "https://www.canva.com/design/DAGo73qFMZs/view" },

  { tema: "Acciones en Caso de Desastre",       categoria: "entornos-fisicos",
    url: "https://www.canva.com/design/DAGo2skKLLU/view",
    complementos: "https://drive.google.com/drive/folders/1CUdkLye-Q4neZT7BlTb-mQwc1CAjZhDv" },

  { tema: "Infecciones Respiratorias Agudas",   categoria: "entornos-fisicos",
    url: "https://www.canva.com/design/DAGo8twAmUs/view",
    complementos: "https://drive.google.com/drive/folders/1FtzsIdHNkccH6-eNwhhfhW6Tb9qlY-AH" },

  { tema: "Tuberculosis",                       categoria: "entornos-fisicos",
    url: "#" /* PENDIENTE */ },

  { tema: "Enfermedades por Vectores",          categoria: "entornos-fisicos",
    url: "https://www.canva.com/design/DAGpOWJJ4JU/view",
    complementos: "https://drive.google.com/drive/folders/1FtzsIdHNkccH6-eNwhhfhW6Tb9qlY-AH" },

  /* ── 5. ENTORNOS PSICOSOCIALES SALUDABLES ── */
  { tema: "Habilidades para la Vida",           categoria: "entornos-psicosociales",
    url: "https://www.canva.com/design/DAGpUItCMXs/view",
    complementos: "https://drive.google.com/drive/folders/154V6Pi6tGnh1xsDvb-S9MvoKiVEu_9D-" },

  { tema: "Prevención de Adicciones",           categoria: "entornos-psicosociales",
    url: "https://www.canva.com/design/DAGpUhcAUgk/view",
    complementos: "https://drive.google.com/drive/folders/1E-C5lmqDfK2JHhEQchOrekPlhUT75XSh" },

  { tema: "Violencia",                          categoria: "entornos-psicosociales",
    url: "https://www.canva.com/design/DAGpZ4PV9e4/view",
    complementos: "https://drive.google.com/drive/folders/1PyNdH353noyYqzGYJ--P997cirmEu_Q0" },

  { tema: "Relaciones de Pareja",               categoria: "entornos-psicosociales",
    url: "https://www.canva.com/design/DAGrSUgAuLk/view" },

  { tema: "Violencia Familiar",                 categoria: "entornos-psicosociales",
    url: "https://www.canva.com/design/DAGpggFK7GY/view",
    complementos: "https://drive.google.com/drive/folders/1PyNdH353noyYqzGYJ--P997cirmEu_Q0" },

  { tema: "Violencia Escolar",                  categoria: "entornos-psicosociales",
    url: "https://www.canva.com/design/DAGpmCST0sg/view",
    complementos: "https://drive.google.com/drive/folders/1PyNdH353noyYqzGYJ--P997cirmEu_Q0" },

  { tema: "Violencia en el Ámbito Laboral",     categoria: "entornos-psicosociales",
    url: "https://www.canva.com/design/DAGpmZhum3c/view",
    complementos: "https://drive.google.com/drive/folders/1PyNdH353noyYqzGYJ--P997cirmEu_Q0" },

  { tema: "Igualdad de Género",                 categoria: "entornos-psicosociales",
    url: "https://www.canva.com/design/DAGpmSg9sCE/view" },

  { tema: "Bullying",                           categoria: "entornos-psicosociales",
    url: "https://www.canva.com/design/DAGqoT7lNUE/view" },

  { tema: "Abuso Sexual",                       categoria: "entornos-psicosociales",
    url: "https://www.canva.com/design/DAGpmqNhiPQ/view",
    complementos: "https://drive.google.com/drive/folders/1AGOMuWnGA5tPJcAqKGsjDPJyVdn4tkBe" },

  /* ── 6. CRECIMIENTO Y DESARROLLO INFANTIL ── */
  { tema: "Lactancia Materna",                  categoria: "infancia",
    url: "https://www.canva.com/design/DAGfwIkYSjI/view",
    complementos: "https://drive.google.com/drive/folders/1jcsFQsozsr4HujiCJV2E6olsNuAOvtn1" },

  { tema: "Cuidado del Recién Nacido",          categoria: "infancia",
    url: "https://www.canva.com/design/DAGp-QWKLws/view",
    complementos: "https://drive.google.com/drive/folders/1jcsFQsozsr4HujiCJV2E6olsNuAOvtn1" },

  { tema: "Cuidado del Menor de un Año",        categoria: "infancia",
    url: "https://www.canva.com/design/DAGqoL7W4Dc/view",
    complementos: "https://drive.google.com/drive/folders/1jcsFQsozsr4HujiCJV2E6olsNuAOvtn1" },

  { tema: "Cuidado del Menor de 5 Años",        categoria: "infancia",
    url: "https://www.canva.com/design/DAGqoCU1Hj8/view",
    complementos: "https://drive.google.com/drive/folders/1jcsFQsozsr4HujiCJV2E6olsNuAOvtn1" },

  { tema: "Evaluación del Desarrollo Infantil", categoria: "infancia",
    url: "https://www.canva.com/design/DAGqEiyIHzc/view",
    complementos: "https://drive.google.com/drive/folders/1jcsFQsozsr4HujiCJV2E6olsNuAOvtn1" },

  { tema: "Estimulación Temprana",              categoria: "infancia",
    url: "https://www.canva.com/design/DAGqotK0Uz4/view",
    complementos: "https://drive.google.com/drive/folders/1jcsFQsozsr4HujiCJV2E6olsNuAOvtn1" },

  { tema: "Derechos de Niñas y Niños",          categoria: "infancia",
    url: "https://www.canva.com/design/DAGqohJyRv8/view",
    complementos: "https://drive.google.com/drive/folders/1jcsFQsozsr4HujiCJV2E6olsNuAOvtn1" },

  /* ── 7. DIVERSIDAD, EQUIDAD Y GÉNERO ── */
  { tema: "Atención a Adultos Mayores",         categoria: "diversidad",
    url: "https://www.canva.com/design/DAGqohJyRv8/view",
    complementos: "https://drive.google.com/drive/folders/1VGlEzKWkqBzCsD5EgqbaDq0VmvNneMPS" },

  { tema: "Discapacidad y Derechos",            categoria: "diversidad",
    url: "https://www.canva.com/design/DAGqKSZYDlI/view",
    complementos: "https://drive.google.com/drive/folders/1tP4YQXtvi6_dFE8djlaxzoEf1jcDrEiG" },

  { tema: "Prevención de Discapacidad",         categoria: "diversidad",
    url: "https://www.canva.com/design/DAGqKmTUXtk/view",
    complementos: "https://drive.google.com/drive/folders/1tP4YQXtvi6_dFE8djlaxzoEf1jcDrEiG" },

  { tema: "Atención del Discapacitado",         categoria: "diversidad",
    url: "https://www.canva.com/design/DAGqitvm5kQ/view",
    complementos: "https://drive.google.com/drive/folders/1tP4YQXtvi6_dFE8djlaxzoEf1jcDrEiG" },

  { tema: "Interculturalidad y Salud",          categoria: "diversidad",
    url: "https://www.canva.com/design/DAGqoJG5rzo/view",
    complementos: "https://drive.google.com/drive/folders/1LyemVU_rB1ctu8HXfLGxsTkk2eIFLYY1" },

  { tema: "Género y Salud",                     categoria: "diversidad",
    url: "https://www.canva.com/design/DAGqzwI6h1w/view",
    complementos: "https://drive.google.com/drive/folders/16_rpq_ES1uGWEwyAVGHtqR_g2U3E9BOo" },

  /* ── 8. DERECHO A LA SALUD ── */
  { tema: "Vacunación",                         categoria: "derecho-salud",
    url: "https://www.canva.com/design/DAGq0ZmggIE/view",
    complementos: "https://drive.google.com/drive/folders/1dwPS9fP0jGNpFoOaU496gYuVebesdypT" },

  { tema: "Servicios de Salud",                 categoria: "derecho-salud",
    url: "https://www.canva.com/design/DAGq0mP-Gjw/view",
    complementos: "https://drive.google.com/drive/folders/1dwPS9fP0jGNpFoOaU496gYuVebesdypT" },

  { tema: "Uso Cartilla Nacional de Salud",     categoria: "derecho-salud",
    url: "https://www.canva.com/design/DAGq6GXfGac/view",
    complementos: "https://drive.google.com/drive/folders/1dwPS9fP0jGNpFoOaU496gYuVebesdypT" },

  { tema: "Atención de Línea de Vida",          categoria: "derecho-salud",
    url: "https://www.canva.com/design/DAGrMQwjCW4/view",
    complementos: "https://drive.google.com/drive/folders/1dwPS9fP0jGNpFoOaU496gYuVebesdypT" },

  { tema: "Educación para la Salud",            categoria: "derecho-salud",
    url: "https://www.canva.com/design/DAGrSaU7WLM/view",
    complementos: "https://drive.google.com/drive/folders/1dwPS9fP0jGNpFoOaU496gYuVebesdypT" },

  /* ── 9. PARTICIPACIÓN SOCIAL ── */
  { tema: "Participación Social",               categoria: "participacion",
    url: "https://www.canva.com/design/DAGrd7Worqw/view",
    complementos: "https://drive.google.com/drive/folders/1qfXgcg9Azxf-fmI6nTAlpt2_3PAwZw6T" },

  { tema: "Organización Comunitaria",           categoria: "participacion",
    url: "https://www.canva.com/design/DAGreO5uCz0/view",
    complementos: "https://drive.google.com/drive/folders/1qfXgcg9Azxf-fmI6nTAlpt2_3PAwZw6T" },

  { tema: "Trabajo Colectivo",                  categoria: "participacion",
    url: "https://www.canva.com/design/DAGrkT2rKts/view",
    complementos: "https://drive.google.com/drive/folders/1qfXgcg9Azxf-fmI6nTAlpt2_3PAwZw6T" },

];
