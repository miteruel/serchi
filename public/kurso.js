/*
  Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text.

  Behaviour of the courses made with the course editor (/kurso/<slug>):
  progress per day and diploma (kept in this browser), and 🔊 buttons for the
  Esperanto words that have a recording. window.KURSO is written by
  renderCoursePage() in server/courses.ts.
*/
(function () {
  var K = window.KURSO || { slug: 'kurso', days: 0, texts: {} };
  var T = K.texts;

  // ---- Progress and diploma ----
  var KEY_DAYS = 'serchi-kurso-' + K.slug + '-tagoj';
  var KEY_NAME = 'serchi-kurso-nomo';
  function load(key, fallback) {
    try { var v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage unavailable: keep in memory */ }
  }

  var done = load(KEY_DAYS, []);
  if (!Array.isArray(done)) done = [];
  var buttons = document.querySelectorAll('.check');
  var links = document.querySelectorAll('#days a');
  var progress = document.getElementById('progress');
  var dipText = document.getElementById('dip-text');
  var dipName = document.getElementById('dip-name');
  var input = document.getElementById('dip-input');
  if (input) {
    var name = load(KEY_NAME, '');
    input.value = typeof name === 'string' ? name : '';
  }

  function render() {
    buttons.forEach(function (b) {
      var on = done.indexOf(b.dataset.day) !== -1;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.textContent = on ? T.doneBtn : T.mark;
    });
    links.forEach(function (a) { a.classList.toggle('done', done.indexOf(a.dataset.day) !== -1); });
    var n = done.length, complete = K.days > 0 && n >= K.days;
    if (progress) progress.textContent = complete ? T.finished : T.progress + ': ' + n + ' ' + T.of + ' ' + K.days + '.';
    if (dipText) {
      dipText.classList.toggle('locked', !complete);
      dipText.textContent = complete ? T.done : T.locked + ' (' + n + ' ' + T.of + ' ' + K.days + ')';
    }
    if (dipName && input) dipName.textContent = complete ? input.value.trim() : '';
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      var d = b.dataset.day, i = done.indexOf(d);
      if (i === -1) done.push(d); else done.splice(i, 1);
      save(KEY_DAYS, done);
      render();
    });
  });
  if (input) input.addEventListener('input', function () { save(KEY_NAME, input.value); render(); });
  render();

  // ---- 🔊 buttons (same rule as audioSlug() in server/audio.ts) ----
  function audioSlug(text) {
    var x = { 'ĉ': 'cx', 'ĝ': 'gx', 'ĥ': 'hx', 'ĵ': 'jx', 'ŝ': 'sx', 'ŭ': 'ux' };
    return text.toLowerCase()
      .replace(/[ĉĝĥĵŝŭ]/g, function (c) { return x[c]; })
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
  fetch('/api/audio').then(function (r) { return r.ok ? r.json() : {}; }).then(function (have) {
    if (!have || Object.keys(have).length === 0) return;
    var player = new Audio();
    document.querySelectorAll('.word b, .say b, .eo').forEach(function (el) {
      var text = el.textContent.trim();
      var slug = audioSlug(text);
      if (text.indexOf('→') !== -1 || !have[slug]) return;
      var src = have[slug];
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'listen';
      b.textContent = '🔊';
      b.setAttribute('aria-label', T.listen + text);
      b.addEventListener('click', function () {
        player.pause();
        player.src = src;
        player.play().catch(function () {});
      });
      el.insertAdjacentElement('afterend', b);
    });
  }).catch(function () {});
})();
