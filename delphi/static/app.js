// Serĉilo (Delphi + WebStencils + HTMX) - tiny client-side helpers.
// Everything else (search, filters, bookmarks, forum...) is server-rendered
// HTML swapped in by HTMX.
(function () {
  'use strict';

  // X-sistemo: cx -> ĉ, gx -> ĝ, hx -> ĥ, jx -> ĵ, sx -> ŝ, ux -> ŭ
  var X_MAP = { c: 'ĉ', g: 'ĝ', h: 'ĥ', j: 'ĵ', s: 'ŝ', u: 'ŭ',
                C: 'Ĉ', G: 'Ĝ', H: 'Ĥ', J: 'Ĵ', S: 'Ŝ', U: 'Ŭ' };

  function convertXSystem(text) {
    return text.replace(/([cghjsuCGHJSU])[xX]/g, function (_, letter) {
      return X_MAP[letter] || _;
    });
  }

  document.addEventListener('input', function (e) {
    var el = e.target;
    if (!el.matches || !el.matches('[data-xsystem]')) return;
    var converted = convertXSystem(el.value);
    if (converted !== el.value) {
      var pos = el.selectionStart - (el.value.length - converted.length);
      el.value = converted;
      try { el.setSelectionRange(pos, pos); } catch (_) { /* not all inputs support it */ }
    }
  });

  // Copy-link buttons
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('[data-copy]');
    if (!btn || !navigator.clipboard) return;
    navigator.clipboard.writeText(btn.getAttribute('data-copy')).then(function () {
      var old = btn.textContent;
      btn.textContent = '✔ ' + (btn.getAttribute('data-copied') || '');
      setTimeout(function () { btn.textContent = old; }, 1500);
    });
  });

  // Modal: close on ✕, backdrop click or Escape
  function closeModal() {
    var modal = document.getElementById('modal');
    if (modal) modal.innerHTML = '';
  }
  document.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('[data-close]')) closeModal();
    else if (e.target.matches && e.target.matches('[data-modal]')) closeModal();
  });

  // Radio player bar: close button and episode list (RSS stations)
  document.addEventListener('click', function (e) {
    if (!e.target.closest) return;
    if (e.target.closest('[data-close-player]')) {
      var player = document.getElementById('player');
      if (player) player.innerHTML = '';
      document.body.classList.remove('pb-56');
      return;
    }
    var episode = e.target.closest('[data-episode]');
    if (episode) {
      var audio = document.getElementById('player-audio');
      if (audio) { audio.src = episode.getAttribute('data-episode'); audio.play(); }
    }
  });

  // Leave room for the player bar so it does not cover the footer
  document.addEventListener('htmx:afterSwap', function (e) {
    if (e.detail.target && e.detail.target.id === 'player') document.body.classList.add('pb-56');
  });

  // Keyboard: "/" focuses the search box, Escape closes the modal
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
    var tag = (document.activeElement && document.activeElement.tagName) || '';
    if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(tag)) {
      var q = document.getElementById('q') || document.querySelector('input[name=q]');
      if (q) { e.preventDefault(); q.focus(); }
    }
  });
})();
