// Revisa assets/data/recursos.js antes de publicar.
//
// Por qué existe: recursos.js es UN solo arreglo cargado con <script>. Es
// robusto ante la ausencia de un recurso —sin `url` la tarjeta se pinta como
// "en elaboración"— pero NO ante un error de sintaxis: una coma de menos deja
// `RECURSOS` sin definir y TODAS las cuadrículas del sitio quedan vacías, no
// solo la del recurso que se tocó. Ese es el único fallo que rompe todo, y es
// justo el que se comete al editar a mano.
//
// Uso:  node tools/validar-recursos.js
// Sale con código 1 si algo impide publicar.

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const RUTA = path.join(__dirname, '..', 'assets', 'data', 'recursos.js');
const errores = [];
const avisos = [];

// --- 1. Sintaxis. Si esto falla, lo demás no importa. ----------------------
const codigo = fs.readFileSync(RUTA, 'utf8');
const contexto = vm.createContext({});
try {
  // `const RECURSOS = [...]` de nivel superior NO se vuelve propiedad del
  // contexto de vm, a diferencia de `var`. Se expone a mano para poder leerlo.
  vm.runInContext(codigo + ';globalThis.__RECURSOS = RECURSOS;', contexto,
                  { filename: 'recursos.js' });
} catch (e) {
  console.error('\n  ERROR DE SINTAXIS en recursos.js — el sitio entero se');
  console.error('  quedaría sin recursos si esto se publica.\n');
  console.error('   ', e.message);
  process.exit(1);
}

const RECURSOS = contexto.__RECURSOS;
if (!Array.isArray(RECURSOS)) {
  console.error('\n  recursos.js no define el arreglo RECURSOS.\n');
  process.exit(1);
}

// --- 2. Cada recurso, por separado ----------------------------------------
// Se revisa lo que la página necesita para pintar la tarjeta. `accion` no
// entra: script.js ya le da 'Abrir' por defecto.
const OBLIGATORIOS = ['titulo', 'programa', 'tipo'];

RECURSOS.forEach((r, i) => {
  const donde = `#${i + 1} "${(r && r.titulo) || '(sin título)'}"`;

  if (!r || typeof r !== 'object') {
    errores.push(`${donde}: no es un objeto.`);
    return;
  }
  OBLIGATORIOS.forEach(campo => {
    if (!r[campo]) errores.push(`${donde}: falta "${campo}".`);
  });

  // Un recurso enlaza de dos formas: con `url` suelta o con un arreglo
  // `materiales`. Tener sólo la segunda es normal, no una omisión.
  const tieneMateriales = Array.isArray(r.materiales) && r.materiales.length > 0;

  // `url: '#'` es un marcador deliberado del sitio: existen 26 y todos van
  // con estado "pendiente", que es lo que impide que script.js pinte un
  // enlace muerto. Sólo molesta cuando esa pareja se rompe.
  const esMarcador = r.url === '#' || r.url === '';
  if (esMarcador && r.estado !== 'pendiente') {
    avisos.push(`${donde}: url de relleno ("${r.url}") sin estado "pendiente" — ` +
                `saldría un enlace que no lleva a ninguna parte.`);
  }
  if (!r.url && !tieneMateriales && r.estado !== 'pendiente') {
    avisos.push(`${donde}: no tiene "url" ni "materiales" ni estado "pendiente".`);
  }
  if (r.url && !esMarcador &&
      !/^(https?:\/\/|[\w./-]+\.(html?|pdf|xlsx?|docx?|pptx?))/i.test(r.url)) {
    avisos.push(`${donde}: la url no parece una dirección válida (${String(r.url).slice(0, 50)}).`);
  }

  // Una tarjeta que apunta al /edit de un formulario no sirve para responder:
  // a quien no es editor le sale "necesitas permiso", y a quien sí lo es le
  // abre el cuestionario para MODIFICARLO. visorDrive no lo endereza porque
  // solo normaliza presentation, document, spreadsheets y file — no forms.
  // Es un error, no un aviso: la tarjeta está rota para su público.
  if (r.url && /docs\.google\.com\/forms\//i.test(r.url) && /\/edit\b/i.test(r.url)) {
    errores.push(`${donde}: enlaza al /edit del formulario. Use /viewform, ` +
                 `o la liga pública de "Enviar" del propio formulario.`);
  }
});

// --- 3. Títulos repetidos dentro de un mismo programa ----------------------
// Dos tarjetas idénticas en el mismo apartado casi siempre son un objeto
// duplicado al copiar y pegar, que es lo natural al migrar de uno en uno.
const vistos = new Map();
RECURSOS.forEach(r => {
  if (!r || !r.titulo) return;
  const clave = `${r.programa}|${r.titulo}`;
  if (vistos.has(clave)) {
    avisos.push(`"${r.titulo}" aparece dos veces en el apartado "${r.programa}".`);
  }
  vistos.set(clave, true);
});

// --- 4. Resumen -----------------------------------------------------------
const formularios = RECURSOS.filter(r => r && r.tipo === 'formulario');
const apps = formularios.filter(r => r.url && r.url.includes('script.google.com'));
const forms = formularios.filter(r => r.url && r.url.includes('docs.google.com/forms'));
const pendientes = RECURSOS.filter(r => r && r.estado === 'pendiente');

console.log('');
console.log(`  recursos: ${RECURSOS.length}   ·   captura mensual: ${formularios.length}`);
console.log(`  migrados a sistema: ${apps.length}   ·   aún en formulario: ${forms.length}` +
            `   ·   en elaboración: ${pendientes.length}`);
console.log('');

avisos.forEach(a => console.log('  aviso  ' + a));
if (avisos.length) console.log('');

if (errores.length) {
  errores.forEach(e => console.log('  ERROR  ' + e));
  console.log(`\n  ${errores.length} error(es). No publicar así.\n`);
  process.exit(1);
}

console.log('  Sintaxis correcta y todos los recursos tienen sus campos. Se puede publicar.\n');
