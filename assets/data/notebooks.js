/* ================================================
   NOTEBOOKLM — un asistente por determinante
   ================================================
   Cada determinante tiene su cuaderno de NotebookLM, alimentado con las
   fuentes de ese tema (NOMs, manuales, guías, las propias presentaciones).
   El personal entra y pregunta lo que necesite: «¿cada cuánto se tamiza
   a una embarazada?», «¿qué dice la NOM sobre esto?». Responde citando
   la fuente, así que no se inventa nada — y si no está en las fuentes,
   lo dice.

   CÓMO AÑADIR O ACTUALIZAR UN CUADERNO
   ------------------------------------
   1. En notebooklm.google.com, abre el cuaderno.
   2. Botón «Compartir» → «Cualquier persona con el enlace» → Lector.
      SIN ESTE PASO el personal ve «No tienes acceso» y no sirve de nada.
   3. Copia el enlace y pégalo en `url`, y pon `estado: 'ok'`.

   La clave es la MISMA que la del determinante en recursos.js
   (`tema`), para que la det-card encuentre su cuaderno sola.

   estado:  ok        → se muestra como enlace
            pendiente → se muestra apagado, sin enlace («en preparación»)
   ================================================ */

const NOTEBOOKS = {

  alimentacion: {
    titulo: 'Alimentación',
    descripcion: 'Guías alimentarias, etiquetado, lactancia, desnutrición, sobrepeso y síndrome metabólico.',
    url: 'https://notebooklm.google.com/notebook/642c89c5-3f6a-4116-95a9-566095d0771d',
    fuentes: 62,
    actualizado: 'Ago 2026',
    estado: 'ok' },

  actividad: {
    titulo: 'Actividad Física',
    descripcion: 'Recomendaciones por grupo de edad, activación comunitaria y sedentarismo.',
    url: 'https://notebooklm.google.com/notebook/1eb68ba7-9443-47ae-99fb-c8b4070fdc35',
    fuentes: 14,
    actualizado: 'Ago 2026',
    // ⚠ RESTRINGIDO: solo lo abren 4 correos.
    //   Compartir → Cualquiera con el enlace, y poner estado: 'ok'.
    estado: 'pendiente' },

  'salud-sexual': {
    titulo: 'Salud Sexual y Reproductiva',
    descripcion: 'Adolescencia, ITS y VIH, planificación familiar, embarazo y parto, climaterio y detección de cánceres.',
    url: 'https://notebooklm.google.com/notebook/ec9219a8-2863-47e6-b5e9-99d5866aa3aa',
    fuentes: 13,
    actualizado: 'Ago 2026',
    estado: 'ok' },

  'entornos-fisicos': {
    titulo: 'Entornos Físicos Saludables',
    descripcion: 'Saneamiento e higiene, accidentes y desastres, enfermedades transmisibles y vectores.',
    url: 'https://notebooklm.google.com/notebook/846aa065-9780-495b-92ae-ca5bef1b1ddf',
    fuentes: 15,
    actualizado: 'Ago 2026',
    // ⚠ RESTRINGIDO: solo lo abren 5 correos.
    //   Compartir → Cualquiera con el enlace, y poner estado: 'ok'.
    estado: 'pendiente' },

  'entornos-psicosociales': {
    titulo: 'Entornos Psicosociales Saludables',
    descripcion: 'Salud mental y habilidades para la vida, adicciones, violencia y abuso sexual.',
    url: 'https://notebooklm.google.com/notebook/73cf8e8e-08ee-4970-8a98-bde5553919f3',
    fuentes: 14,
    actualizado: 'Ago 2026',
    // ⚠ RESTRINGIDO: solo lo abren 5 correos.
    //   Compartir → Cualquiera con el enlace, y poner estado: 'ok'.
    estado: 'pendiente' },

  infancia: {
    titulo: 'Crecimiento y Desarrollo Infantil',
    descripcion: 'Cuidado del recién nacido y del menor de 5 años, desarrollo, estimulación temprana y derechos.',
    url: 'https://notebooklm.google.com/notebook/582e0663-8a6e-4e25-a057-28d235f17e1d',
    fuentes: 15,
    actualizado: 'Ago 2026',
    // ⚠ RESTRINGIDO: solo lo abren 4 correos.
    //   Compartir → Cualquiera con el enlace, y poner estado: 'ok'.
    estado: 'pendiente' },

  diversidad: {
    titulo: 'Diversidad, Equidad y Género',
    descripcion: 'Personas adultas mayores, discapacidad, interculturalidad y perspectiva de género.',
    url: 'https://notebooklm.google.com/notebook/630a33da-1877-465a-a100-17f98b962330',
    fuentes: 10,
    actualizado: 'Ago 2026',
    // ⚠ RESTRINGIDO: solo lo abren 4 correos.
    //   Compartir → Cualquiera con el enlace, y poner estado: 'ok'.
    estado: 'pendiente' },

  'derecho-salud': {
    titulo: 'Derecho a la Salud',
    descripcion: 'Vacunación, servicios de salud, Cartilla Nacional y Línea de Vida.',
    url: 'https://notebooklm.google.com/notebook/2580bab3-b80f-40b7-97fb-bcee6bc439a8',
    fuentes: 15,
    actualizado: 'Ago 2026',
    // ⚠ RESTRINGIDO: solo lo abren 4 correos.
    //   Compartir → Cualquiera con el enlace, y poner estado: 'ok'.
    estado: 'pendiente' },

  participacion: {
    titulo: 'Participación Social',
    descripcion: 'Organización comunitaria, trabajo colectivo y entornos promotores de salud.',
    url: 'https://notebooklm.google.com/notebook/59e267a2-aa90-44a6-8e87-2cdf2b351f3a',
    fuentes: 9,
    actualizado: 'Ago 2026',
    // ⚠ RESTRINGIDO: solo lo abren 4 correos.
    //   Compartir → Cualquiera con el enlace, y poner estado: 'ok'.
    estado: 'pendiente' },
};
