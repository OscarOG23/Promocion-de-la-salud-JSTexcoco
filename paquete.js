/* ================================================================
   PAQUETE GARANTIZADO — Acciones Integradas de Línea de Vida
   ----------------------------------------------------------------
   Guía de consulta. NO es un formato del expediente ni un capturador.

   Reglas duras de este archivo:
     · Cero datos de paciente. Nada de lo que marca la persona sale
       del navegador ni se guarda entre sesiones.
     · Sin dependencias externas y sin backend.
     · Fuente única: datos/acciones.json. Ningún numeral vive aquí.
   ================================================================ */
(() => {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* Lo único que se guarda es una copia del índice para poder abrir
     la página sin internet. No hay nada de nadie ahí dentro. */
  const CACHE_KEY = 'pg-acciones-v1';

  let DATOS   = null;   // el JSON completo
  let GRUPOS  = [];     // atajo a DATOS.grupos
  let grupoActivo = null;
  const marcadas = new Set();   // solo en memoria, se pierde al recargar

  /* ── Utilidades ───────────────────────────────────────────── */

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const grupoPorId = (id) => GRUPOS.find((g) => g.id === id) || null;

  /** Numerales en el orden en que se escriben en la nota. */
  const cadena = () => Array.from(marcadas).sort((a, b) => a - b).join(', ');

  /* ── Carga del índice ─────────────────────────────────────── */

  async function cargar() {
    const estado = $('#pg-estado');
    try {
      // Mismo cache busting que el resto del sitio: PS_VERSION lo pone
      // script.js, que carga antes que este archivo.
      const r = await fetch('datos/acciones.json?v=' + (window.PS_VERSION || ''));
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const json = await r.json();
      try { localStorage.setItem(CACHE_KEY, JSON.stringify(json)); } catch (_) { /* modo privado */ }
      return json;
    } catch (err) {
      // Sin red, o abierto con doble clic (file://). Si ya se visitó
      // una vez la página con internet, la copia local basta.
      let guardado = null;
      try { guardado = localStorage.getItem(CACHE_KEY); } catch (_) { /* nada */ }
      if (guardado) {
        estado.textContent = 'Sin conexión: se está mostrando la copia guardada en este dispositivo.';
        estado.classList.add('is-aviso');
        return JSON.parse(guardado);
      }
      estado.innerHTML = 'No se pudo cargar el índice de acciones. Si abriste el archivo con doble clic, '
        + 'ábrelo desde <a href="https://promocionsaludtexcoco.github.io/paquete-garantizado.html">la página publicada</a> '
        + 'o con un servidor local: el navegador bloquea la lectura de <code>datos/acciones.json</code> en <code>file://</code>.';
      estado.classList.add('is-error');
      return null;
    }
  }

  /* ── Pestañas ─────────────────────────────────────────────── */

  function initTabs() {
    const tabs = $$('.pg-tab');

    function activar(vista, foco) {
      tabs.forEach((t) => {
        const on = t.dataset.vista === vista;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.classList.toggle('active', on);
        t.tabIndex = on ? 0 : -1;
        const panel = $('#panel-' + t.dataset.vista);
        if (panel) {
          panel.hidden = !on;
          // script.js marca los .section-header con .reveal (opacidad 0) y
          // los descubre con IntersectionObserver. Un panel que nace oculto
          // no intersecta nunca, así que al mostrarlo lo revelamos a mano:
          // vale más un panel sin animación que un panel en blanco.
          if (on) $$('.reveal', panel).forEach((el) => el.classList.add('visible'));
        }
        if (on && foco) t.focus();
      });
      const url = new URL(location.href);
      url.searchParams.set('vista', vista);
      history.replaceState(null, '', url);
    }

    tabs.forEach((t) => {
      t.addEventListener('click', () => activar(t.dataset.vista));
      t.addEventListener('keydown', (e) => {
        const i = tabs.indexOf(t);
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const paso = e.key === 'ArrowRight' ? 1 : -1;
          activar(tabs[(i + paso + tabs.length) % tabs.length].dataset.vista, true);
        }
      });
    });

    const pedida = new URLSearchParams(location.search).get('vista');
    activar(tabs.some((t) => t.dataset.vista === pedida) ? pedida : 'consultar');
  }

  /* ══════════════════════════════════════════════════════════
     1 · CONSULTAR
     ══════════════════════════════════════════════════════════ */

  function renderGrupos() {
    $('#pg-grupos').innerHTML = GRUPOS.map((g) => `
      <button type="button" class="pg-grupo-btn" data-grupo="${esc(g.id)}"
              aria-pressed="false">
        <span class="pgb-nombre">${esc(g.corto)}</span>
        <span class="pgb-n">${g.acciones.length}</span>
      </button>`).join('');

    $$('#pg-grupos .pg-grupo-btn').forEach((b) => {
      b.addEventListener('click', () => eligeGrupo(b.dataset.grupo));
    });
  }

  function eligeGrupo(id) {
    grupoActivo = grupoPorId(id);
    marcadas.clear();
    $$('#pg-grupos .pg-grupo-btn').forEach((b) => {
      const on = b.dataset.grupo === id;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.classList.toggle('is-activo', on);
    });
    renderLista();
    actualizaSalida();
    const url = new URL(location.href);
    url.searchParams.set('grupo', id);
    history.replaceState(null, '', url);
  }

  function renderLista() {
    const g = grupoActivo;
    if (!g) { $('#pg-lista').innerHTML = ''; return; }

    $('#pg-lista').innerHTML = `
      <h3 class="pg-lista-titulo">${esc(g.nombre)}</h3>
      <ul class="pg-acciones">
        ${g.acciones.map((a) => `
          <li class="pg-accion">
            <label class="pg-accion-lbl">
              <input type="checkbox" class="pg-check" value="${a.numeral}">
              <span class="pg-numeral">${a.numeral}</span>
              <span class="pg-texto">${esc(a.texto)}</span>
            </label>
          </li>`).join('')}
      </ul>`;

    $$('#pg-lista .pg-check').forEach((c) => {
      c.addEventListener('change', () => {
        const n = Number(c.value);
        if (c.checked) marcadas.add(n); else marcadas.delete(n);
        c.closest('.pg-accion').classList.toggle('is-marcada', c.checked);
        actualizaSalida();
      });
    });
  }

  function actualizaSalida() {
    const g = grupoActivo;
    const n = marcadas.size;
    $('#pg-cont-num').textContent = n;
    $('#pg-cont-meta').textContent = n === 1 ? 'acción marcada' : 'acciones marcadas';

    const regla = $('#pg-regla');
    const salida = $('#pg-salida');
    salida.classList.remove('is-ok', 'is-corto');

    if (!g) {
      regla.textContent = 'Elige primero un grupo de edad.';
    } else if (g.requiereTodas) {
      const total = g.acciones.length;
      const ok = n === total;
      regla.textContent = ok
        ? `Completo: este grupo exige las ${total} acciones.`
        : `Este grupo exige las ${total} acciones. Faltan ${total - n}.`;
      salida.classList.add(ok ? 'is-ok' : 'is-corto');
    } else {
      const min = DATOS._meta.criterioRegistro.minimoAcciones;
      const ok = n >= min;
      regla.textContent = ok
        ? `Cumple el mínimo de ${min} acciones para registrar atención integral.`
        : `Se necesitan ${min} acciones para registrar atención integral. Faltan ${min - n}.`;
      salida.classList.add(ok ? 'is-ok' : 'is-corto');
    }

    const txt = cadena();
    $('#pg-out').textContent = txt || '—';
    $('#pg-copiar').disabled = !txt;
  }

  function initCopiar() {
    const btn = $('#pg-copiar');
    btn.addEventListener('click', async () => {
      const txt = cadena();
      if (!txt) return;
      let ok = false;
      try {
        await navigator.clipboard.writeText(txt);
        ok = true;
      } catch (_) {
        // Sin HTTPS o navegador viejo: el camino de siempre.
        const ta = document.createElement('textarea');
        ta.value = txt;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { ok = document.execCommand('copy'); } catch (__) { ok = false; }
        ta.remove();
      }
      btn.textContent = ok ? 'Copiado' : 'Selecciona y copia a mano';
      setTimeout(() => { btn.textContent = 'Copiar numerales'; }, 2000);
    });

    $('#pg-limpiar').addEventListener('click', () => {
      marcadas.clear();
      $$('#pg-lista .pg-check').forEach((c) => {
        c.checked = false;
        c.closest('.pg-accion').classList.remove('is-marcada');
      });
      actualizaSalida();
    });
  }

  /* ══════════════════════════════════════════════════════════
     2 · VERIFICAR
     ══════════════════════════════════════════════════════════ */

  function initVerificar() {
    const sel = $('#pg-verif-grupo');
    const inp = $('#pg-verif-num');
    sel.innerHTML = GRUPOS.map((g) =>
      `<option value="${esc(g.id)}">${esc(g.nombre)}</option>`).join('');

    function pinta() {
      const g = grupoPorId(sel.value);
      const res = $('#pg-verif-res');
      const nums = (inp.value.match(/\d+/g) || []).map(Number);

      if (!g || !nums.length) {
        res.innerHTML = '<p class="pg-verif-vacio">Escribe los numerales tal como quedaron en la nota, separados por comas.</p>';
        return;
      }

      const vistos = new Set();
      const filas = nums.map((n) => {
        const a = g.acciones.find((x) => x.numeral === n);
        const repetido = vistos.has(n);
        vistos.add(n);
        if (!a) {
          return `<li class="pg-verif-fila is-inexistente">
                    <span class="pg-numeral">${n}</span>
                    <span class="pg-texto">No existe en ${esc(g.nombre)}: este grupo llega hasta el ${g.acciones.length}.</span>
                  </li>`;
        }
        return `<li class="pg-verif-fila${repetido ? ' is-repetido' : ''}">
                  <span class="pg-numeral">${a.numeral}</span>
                  <span class="pg-texto">${esc(a.texto)}${repetido ? ' <em>(repetido)</em>' : ''}</span>
                </li>`;
      }).join('');

      // Distintos y existentes: un numeral repetido cuenta una sola vez.
      const validos = Array.from(vistos).filter((n) => g.acciones.some((x) => x.numeral === n)).length;
      const min = DATOS._meta.criterioRegistro.minimoAcciones;
      const meta = g.requiereTodas
        ? `${esc(g.nombre)} exige las ${g.acciones.length} acciones.`
        : `${esc(g.nombre)} pide un mínimo de ${min}.`;

      res.innerHTML = `
        <p class="pg-verif-resumen">
          <strong>${validos}</strong> ${validos === 1 ? 'numeral válido' : 'numerales válidos'}. ${meta}
        </p>
        <ul class="pg-verif-lista">${filas}</ul>`;
    }

    sel.addEventListener('change', pinta);
    inp.addEventListener('input', pinta);
    pinta();
  }

  /* ══════════════════════════════════════════════════════════
     3 · PRACTICAR
     ══════════════════════════════════════════════════════════ */

  const azar = (arr) => arr[Math.floor(Math.random() * arr.length)];

  function mezcla(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  let aciertos = 0, intentos = 0;

  function nuevoReactivo() {
    const g = azar(GRUPOS.filter((x) => x.acciones.length >= 4));
    const correcta = azar(g.acciones);
    const otras = mezcla(g.acciones.filter((a) => a.numeral !== correcta.numeral)).slice(0, 3);
    const opciones = mezcla([correcta, ...otras]);
    // Los dos sentidos: del numeral a la acción y de la acción al numeral.
    const deNumeral = Math.random() < 0.5;

    const enunciado = deNumeral
      ? `En <strong>${esc(g.nombre)}</strong>, ¿qué acción es el numeral <span class="pg-numeral pg-numeral-lg">${correcta.numeral}</span>?`
      : `En <strong>${esc(g.nombre)}</strong>, ¿con qué numeral se registra <em>${esc(correcta.texto)}</em>?`;

    $('#pg-practica').innerHTML = `
      <div class="pg-quiz">
        <p class="pg-quiz-pregunta">${enunciado}</p>
        <div class="pg-quiz-ops${deNumeral ? '' : ' es-numerales'}">
          ${opciones.map((o) => `
            <button type="button" class="pg-quiz-op" data-num="${o.numeral}">
              ${deNumeral
                // Del numeral a la acción: las opciones son los textos.
                ? `<span class="pg-texto">${esc(o.texto)}</span>`
                // De la acción al numeral: solo el número. Enseñar también el
                // texto regalaría la respuesta, porque el enunciado ya lo cita.
                : `<span class="pg-numeral pg-numeral-lg">${o.numeral}</span>`}
            </button>`).join('')}
        </div>
        <p class="pg-quiz-fb" id="pg-quiz-fb" role="status"></p>
        <div class="pg-quiz-pie">
          <span class="pg-quiz-marcador">${aciertos} de ${intentos}</span>
          <button type="button" class="btn btn-primary pg-quiz-sig" id="pg-quiz-sig" hidden>Siguiente</button>
        </div>
      </div>`;

    $$('#pg-practica .pg-quiz-op').forEach((b) => {
      b.addEventListener('click', () => {
        if ($('#pg-practica').dataset.resuelto) return;
        $('#pg-practica').dataset.resuelto = '1';
        intentos++;
        const acierto = Number(b.dataset.num) === correcta.numeral;
        if (acierto) aciertos++;
        b.classList.add(acierto ? 'is-bien' : 'is-mal');
        $$('#pg-practica .pg-quiz-op').forEach((o) => {
          o.disabled = true;
          if (Number(o.dataset.num) === correcta.numeral) o.classList.add('is-bien');
        });
        $('#pg-quiz-fb').textContent = acierto
          ? 'Correcto.'
          : `Es el ${correcta.numeral}: ${correcta.texto}`;
        $('.pg-quiz-marcador').textContent = `${aciertos} de ${intentos}`;
        const sig = $('#pg-quiz-sig');
        sig.hidden = false;
        sig.focus();
      });
    });

    $('#pg-quiz-sig').addEventListener('click', () => {
      delete $('#pg-practica').dataset.resuelto;
      nuevoReactivo();
    });
  }

  /* ══════════════════════════════════════════════════════════
     4 · POR DETERMINANTE
     ══════════════════════════════════════════════════════════ */

  /** Índice leído al revés: determinante → acciones que lo refuerzan. */
  function porDeterminante(codigo) {
    const filas = [];
    GRUPOS.forEach((g) => {
      g.acciones.forEach((a) => {
        if (a.determinante === codigo) filas.push({ grupo: g, accion: a });
      });
    });
    return filas;
  }

  function renderDets() {
    const dets = DATOS.determinantes;
    const conAcciones = Object.keys(dets).filter((c) => porDeterminante(c).length);

    $('#pg-dets').innerHTML = conAcciones.map((c) => `
      <button type="button" class="pg-det-btn" data-det="${c}" aria-pressed="false">
        <span class="pgd-num">${c}</span>
        <span class="pgd-nombre">${esc(dets[c])}</span>
        <span class="pgd-n">${porDeterminante(c).length}</span>
      </button>`).join('');

    $$('#pg-dets .pg-det-btn').forEach((b) => {
      b.addEventListener('click', () => eligeDet(b.dataset.det));
    });

    const pedido = new URLSearchParams(location.search).get('determinante');
    eligeDet(conAcciones.includes(pedido) ? pedido : conAcciones[0]);
  }

  function eligeDet(codigo) {
    $$('#pg-dets .pg-det-btn').forEach((b) => {
      const on = b.dataset.det === codigo;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.classList.toggle('is-activo', on);
    });

    const filas = porDeterminante(codigo);
    const sinDet = GRUPOS.reduce((n, g) =>
      n + g.acciones.filter((a) => a.determinante === null).length, 0);

    $('#pg-det-tabla').innerHTML = `
      <h3 class="pg-det-titulo">${esc(DATOS.determinantes[codigo])}</h3>
      <p class="pg-det-sub">${filas.length} ${filas.length === 1 ? 'acción del paquete lo refuerza' : 'acciones del paquete lo refuerzan'}.</p>
      <table class="pg-tabla">
        <thead>
          <tr><th scope="col">Grupo</th><th scope="col">N.º</th><th scope="col">Acción</th></tr>
        </thead>
        <tbody>
          ${filas.map((f) => `
            <tr>
              <td class="pg-td-grupo">${esc(f.grupo.corto)}</td>
              <td class="pg-td-num"><span class="pg-numeral">${f.accion.numeral}</span></td>
              <td>${esc(f.accion.texto)}</td>
            </tr>`).join('')}
        </tbody>
      </table>
      <p class="pg-det-pie">${sinDet} de las ${GRUPOS.reduce((n, g) => n + g.acciones.length, 0)} acciones del paquete no llevan determinante.</p>`;

    const url = new URL(location.href);
    url.searchParams.set('determinante', codigo);
    history.replaceState(null, '', url);
  }

  /* ── Arranque ─────────────────────────────────────────────── */

  document.addEventListener('DOMContentLoaded', async () => {
    initTabs();

    DATOS = await cargar();
    if (!DATOS) return;   // el mensaje de error ya está en pantalla

    GRUPOS = DATOS.grupos;
    const estado = $('#pg-estado');
    if (!estado.classList.contains('is-aviso')) estado.hidden = true;

    renderGrupos();
    initCopiar();
    initVerificar();
    renderDets();
    nuevoReactivo();

    const pedido = new URLSearchParams(location.search).get('grupo');
    eligeGrupo(grupoPorId(pedido) ? pedido : GRUPOS[0].id);
    if (pedido) $('#pg-verif-grupo').value = grupoPorId(pedido) ? pedido : GRUPOS[0].id;
  });

})();
