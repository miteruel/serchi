/*
  Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text.
 */

/*
  Extras shared by the course pages (/kurso/...) and the mini-course
  (minikurso*.html), in the Node and the Delphi versions:

  - "Print" button on each lesson: prints only that lesson as a worksheet,
    with lines to write the exercise answers and without the solutions.
  - "Voices of this course": thanks the people who recorded the words of the
    page and asked to be named (GET /api/recordings/credits).
*/
(function () {
  var en = document.documentElement.lang === 'en';
  var T = en
    ? { print: '🖨️ Print', printTitle: 'Print this lesson as a worksheet', voices: 'Voices of this course',
        thanks: 'Dankon!', join: 'Do you speak Esperanto?', record: 'Record a word too' }
    : { print: '🖨️ Imprimir', printTitle: 'Imprimir esta lección como ficha', voices: 'Voces de este curso',
        thanks: '¡Dankon!', join: '¿Hablas esperanto?', record: 'Graba tú también una palabra' };

  var style = document.createElement('style');
  style.textContent = [
    // The lessons are grids (float does not apply there): the button sits on the right of its own row
    '.print-btn { float: right; justify-self: end; width: max-content; margin: 0 0 8px 12px; font: inherit; font-size: 14px; font-weight: 700; cursor: pointer;',
    '  border: 2px solid currentColor; border-radius: 999px; padding: 4px 12px; background: transparent; color: inherit; opacity: .75; }',
    '.print-btn:hover { opacity: 1; }',
    '.credits { text-align: center; }',
    '.credits h2 { font-size: 20px; margin: 0 0 6px; }',
    '.credits p { margin: 4px 0; }',
    '@media print {',
    '  body.print-one .print-hide { display: none !important; }',
    '  body.print-one, body.print-one .lesson { background: #fff !important; box-shadow: none !important; }',
    '  .print-btn, .listen, .check, .credits, details { display: none !important; }',
    '  body.print-one .lesson { border: 0 !important; margin: 0 !important; padding: 0 !important; }',
    '  body.print-one .lesson * { color: #000 !important; }',
    // Grids split across pages overlap in Chromium: blocks one after another instead
    '  body.print-one .lesson.printing, body.print-one .printing .block { display: block !important; }',
    '  body.print-one .block, body.print-one .rule, body.print-one .challenge { margin: 0 0 14px !important; }',
    '  body.print-one tr, body.print-one .word, body.print-one ol.ex li { break-inside: avoid; }',
    '  body.print-one h2, body.print-one h3 { break-after: avoid; }',
    '  body.print-one .word { background: none !important; border: 1px solid #999; }',
    '  body.print-one ol.ex li::after { content: ""; display: block; height: 1.9em; border-bottom: 1px solid #888; }',
    '  body.print-one .art { max-width: 150px; }',
    '  body.print-one .lesson::before { content: attr(data-course); display: block; font-size: 10pt; color: #555; margin-bottom: 6px; }',
    '  body.print-one .lesson::after { content: "Serĉilo · Liberanimo Teruel"; display: block; font-size: 9pt; color: #777; margin-top: 18px; }',
    '  body.print-one .print-hide { display: none !important; }', // last, so nothing above shows them again
    '}',
  ].join('\n');
  document.head.appendChild(style);

  // ---- Print one lesson ----
  var hidden = [];
  function cleanUp() {
    document.body.classList.remove('print-one');
    document.querySelectorAll('.lesson.printing').forEach(function (el) { el.classList.remove('printing'); });
    hidden.forEach(function (el) { el.classList.remove('print-hide'); });
    hidden = [];
  }
  function printLesson(lesson) {
    cleanUp();
    // Hide everything but the lesson: the siblings of the lesson and of each of its ancestors
    for (var node = lesson; node && node !== document.body; node = node.parentElement) {
      var siblings = node.parentElement ? node.parentElement.children : [];
      for (var i = 0; i < siblings.length; i++) {
        var el = siblings[i];
        if (el !== node && el.tagName !== 'SCRIPT' && el.tagName !== 'STYLE') {
          el.classList.add('print-hide');
          hidden.push(el);
        }
      }
    }
    lesson.classList.add('printing');
    lesson.setAttribute('data-course', document.title);
    document.body.classList.add('print-one');
    window.print();
  }
  window.addEventListener('afterprint', cleanUp);
  document.querySelectorAll('section.lesson').forEach(function (lesson) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'print-btn';
    b.textContent = T.print;
    b.title = T.printTitle;
    b.addEventListener('click', function () { printLesson(lesson); });
    lesson.insertBefore(b, lesson.firstChild);
  });

  // ---- Voices of this course (same rule as audioSlug() in server/audio.ts) ----
  function audioSlug(text) {
    var x = { 'ĉ': 'cx', 'ĝ': 'gx', 'ĥ': 'hx', 'ĵ': 'jx', 'ŝ': 'sx', 'ŭ': 'ux' };
    return text.toLowerCase()
      .replace(/[ĉĝĥĵŝŭ]/g, function (c) { return x[c]; })
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
  var onPage = {};
  document.querySelectorAll('.word b, .say b, .eo').forEach(function (el) { onPage[audioSlug(el.textContent.trim())] = true; });
  var footer = document.querySelector('footer');
  if (!footer) return;
  fetch('/api/recordings/credits').then(function (r) { return r.ok ? r.json() : []; }).then(function (list) {
    var names = (Array.isArray(list) ? list : []).filter(function (c) {
      return c.slugs.some(function (s) { return onPage[s]; });
    }).map(function (c) { return c.name; });
    if (!names.length) return;
    var box = document.createElement('section');
    box.className = 'credits';
    var h = document.createElement('h2');
    h.textContent = '🎙️ ' + T.voices;
    var p = document.createElement('p');
    p.textContent = names.join(', ') + '. ' + T.thanks;
    var join = document.createElement('p');
    join.className = 'muted';
    join.appendChild(document.createTextNode(T.join + ' '));
    var a = document.createElement('a');
    a.href = '/grabar.html';
    a.textContent = T.record;
    join.appendChild(a);
    box.appendChild(h);
    box.appendChild(p);
    box.appendChild(join);
    footer.parentNode.insertBefore(box, footer);
  }).catch(function () {});
})();
