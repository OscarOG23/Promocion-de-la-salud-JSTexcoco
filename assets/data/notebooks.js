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
    url: '',
    actualizado: '',
    estado: 'pendiente' },

  actividad: {
    titulo: 'Actividad Física',
    descripcion: 'Recomendaciones por grupo de edad, activación comunitaria y sedentarismo.',
    url: '',
    actualizado: '',
    estado: 'pendiente' },

  'salud-sexual': {
    titulo: 'Salud Sexual y Reproductiva',
    descripcion: 'Adolescencia, ITS y VIH, planificación familiar, embarazo y parto, climaterio y detección de cánceres.',
    url: '',
    actualizado: '',
    estado: 'pendiente' },

  'entornos-fisicos': {
    titulo: 'Entornos Físicos Saludables',
    descripcion: 'Saneamiento e higiene, accidentes y desastres, enfermedades transmisibles y vectores.',
    url: '',
    actualizado: '',
    estado: 'pendiente' },

  'entornos-psicosociales': {
    titulo: 'Entornos Psicosociales Saludables',
    descripcion: 'Salud mental y habilidades para la vida, adicciones, violencia y abuso sexual.',
    url: '',
    actualizado: '',
    estado: 'pendiente' },

  infancia: {
    titulo: 'Crecimiento y Desarrollo Infantil',
    descripcion: 'Cuidado del recién nacido y del menor de 5 años, desarrollo, estimulación temprana y derechos.',
    url: '',
    actualizado: '',
    estado: 'pendiente' },

  diversidad: {
    titulo: 'Diversidad, Equidad y Género',
    descripcion: 'Personas adultas mayores, discapacidad, interculturalidad y perspectiva de género.',
    url: '',
    actualizado: '',
    estado: 'pendiente' },

  'derecho-salud': {
    titulo: 'Derecho a la Salud',
    descripcion: 'Vacunación, servicios de salud, Cartilla Nacional y Línea de Vida.',
    url: '',
    actualizado: '',
    estado: 'pendiente' },

  participacion: {
    titulo: 'Participación Social',
    descripcion: 'Organización comunitaria, trabajo colectivo y entornos promotores de salud.',
    url: '',
    actualizado: '',
    estado: 'pendiente' },
};
