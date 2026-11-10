/* Vyhľadávanie na klone silwer.sk.
   Ostrý web používa Luigi's Box, ktorý na klone nie je (meral by návštevy klonu).
   Tento skript ho nahrádza: našepkávač v hlavičke + stránka /vyhladavanie/?string=…
   Dáta: /klon/search.json (generuje scripts/mirror.py z produktových a kategóriových stránok). */
(function () {
  'use strict';

  var INDEX_URL = '/klon/search.json';
  var MAX_ITEMS = 8;
  var index = null, loading = null;

  function load() {
    if (index) return Promise.resolve(index);
    if (!loading) {
      loading = fetch(INDEX_URL).then(function (r) { return r.json(); }).then(function (d) {
        index = d.map(function (p) {
          p._name = words(p.n);
          p._all = words(p.n + ' ' + (p.t || '') + ' ' + (p.c || []).join(' '));
          return p;
        });
        return index;
      });
    }
    return loading;
  }

  function norm(s) {
    return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
      .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  }
  function words(s) { return norm(s).split(' ').filter(Boolean); }
  function hasPrefix(list, tok) {
    for (var i = 0; i < list.length; i++) if (list[i].indexOf(tok) === 0) return true;
    return false;
  }

  /* každé slovo dopytu musí byť začiatkom niektorého slova v názve / titulku / kategóriách */
  function search(q) {
    var toks = words(q);
    if (!toks.length || !index) return [];
    var out = [];
    index.forEach(function (p) {
      var score = 0;
      for (var i = 0; i < toks.length; i++) {
        if (hasPrefix(p._name, toks[i])) score += 3;
        else if (hasPrefix(p._all, toks[i])) score += 1;
        else return;
      }
      if (p._name[0] && p._name[0].indexOf(toks[0]) === 0) score += 2;
      out.push([score, p]);
    });
    out.sort(function (a, b) { return b[0] - a[0] || a[1].n.localeCompare(b[1].n, 'sk'); });
    return out.map(function (x) { return x[1]; });
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function resultsUrl(q) { return '/vyhladavanie/?string=' + encodeURIComponent(q.trim()); }

  /* ---------- štýly ---------- */
  var css = [
    '.search-whisperer,.js-search-whisperer{display:none!important}',
    '#kls-box{position:absolute;z-index:2147483000;background:#fff;border-radius:14px;',
    'box-shadow:0 12px 40px rgba(0,0,0,.18);overflow:hidden;font-family:inherit;color:#111;display:none}',
    '#kls-box.is-open{display:block}',
    '#kls-box a{display:flex;align-items:center;gap:14px;padding:10px 16px;color:#111;text-decoration:none}',
    '#kls-box a.kls-item+a.kls-item{border-top:1px solid #f0f0f0}',
    '#kls-box a.kls-item:hover,#kls-box a.kls-item.is-active{background:#f6f4f1}',
    '#kls-box img{width:48px;height:48px;object-fit:contain;flex:0 0 48px;background:#f6f4f1;border-radius:8px}',
    '#kls-box .kls-name{flex:1;font-size:15px;font-weight:600;line-height:1.3}',
    '#kls-box .kls-price{font-size:15px;font-weight:700;white-space:nowrap}',
    '#kls-box .kls-all{justify-content:center;background:#111;color:#fff!important;font-weight:700;font-size:14px;padding:12px 16px}',
    '#kls-box .kls-all:hover,#kls-box .kls-all.is-active{background:#333}',
    '#kls-box .kls-empty{padding:16px;font-size:15px;color:#555}',
    '.kls-noresults{padding:40px 0 60px;font-size:18px}',
    /* stránka výsledkov: bez popisu kategórie Všetky produkty a bez zoradenia */
    '.kls-results .sw-cathead__d,.kls-results .category-perex,.kls-results #category-header,',
    '.kls-results .listSorting{display:none!important}'
  ].join('');
  var IS_RESULTS = location.pathname.replace(/\/?$/, '/') === '/vyhladavanie/';
  if (IS_RESULTS) document.documentElement.classList.add('kls-results');
  var st = document.createElement('style');
  st.textContent = css;
  (document.head || document.documentElement).appendChild(st);

  /* ---------- našepkávač ---------- */
  var box = null, current = null, active = -1, lastQ = '';

  function ensureBox() {
    if (box) return box;
    box = document.createElement('div');
    box.id = 'kls-box';
    box.setAttribute('role', 'listbox');
    document.body.appendChild(box);
    return box;
  }
  function place() {
    if (!box || !current) return;
    var r = current.getBoundingClientRect();
    var vw = document.documentElement.clientWidth;
    var w = Math.min(Math.max(r.width, 380), vw - 16);
    var left = Math.min(Math.max(8, r.left), vw - w - 8);
    box.style.width = w + 'px';
    box.style.left = (left + window.scrollX) + 'px';
    box.style.top = (r.bottom + window.scrollY + 8) + 'px';
  }
  function close() {
    if (box) box.classList.remove('is-open');
    active = -1;
  }
  function links() { return box ? [].slice.call(box.querySelectorAll('a')) : []; }
  function setActive(i) {
    var l = links();
    if (!l.length) return;
    active = (i + l.length) % l.length;
    l.forEach(function (a, k) { a.classList.toggle('is-active', k === active); });
  }

  function render(input) {
    var q = input.value;
    lastQ = q;
    if (norm(q).length < 2) { close(); return; }
    load().then(function () {
      if (input.value !== q) return;
      var res = search(q);
      ensureBox();
      if (!res.length) {
        box.innerHTML = '<div class="kls-empty">Pre „' + esc(q.trim()) + '“ sme nenašli žiadny produkt.</div>';
      } else {
        box.innerHTML = res.slice(0, MAX_ITEMS).map(function (p) {
          return '<a class="kls-item" role="option" href="' + esc(p.u) + '">' +
            (p.i ? '<img src="' + esc(p.i) + '" alt="" loading="lazy">' : '') +
            '<span class="kls-name">' + esc(p.n) + '</span>' +
            (p.p ? '<span class="kls-price">' + esc(p.p) + '</span>' : '') + '</a>';
        }).join('') +
          '<a class="kls-all" href="' + esc(resultsUrl(q)) + '">Zobraziť všetky výsledky (' + res.length + ')</a>';
      }
      active = -1;
      current = input;
      place();
      box.classList.add('is-open');
    });
  }

  function isSearchInput(el) {
    return el && el.tagName === 'INPUT' && el.name === 'string';
  }

  /* Udalosti zachytávame skôr než Shoptet (fáza capture na window), aby jeho
     našepkávač neposielal dopyty na /action/ProductSearch/ (na klone nefunguje). */
  ['keyup', 'input', 'focus', 'focusin', 'click'].forEach(function (type) {
    window.addEventListener(type, function (e) {
      if (!isSearchInput(e.target)) return;
      e.stopPropagation();
      if (type === 'keyup' && /^(ArrowUp|ArrowDown|Enter|Escape)$/.test(e.key)) return;
      if (type === 'keyup' && e.target.value === lastQ && box && box.classList.contains('is-open')) return;
      load();
      render(e.target);
    }, true);
  });

  window.addEventListener('keydown', function (e) {
    if (!isSearchInput(e.target)) return;
    e.stopPropagation();
    var open = box && box.classList.contains('is-open');
    if (e.key === 'ArrowDown' && open) { e.preventDefault(); setActive(active + 1); }
    else if (e.key === 'ArrowUp' && open) { e.preventDefault(); setActive(active - 1); }
    else if (e.key === 'Escape') { close(); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      var l = links();
      if (open && active >= 0 && l[active]) { location.href = l[active].href; return; }
      if (e.target.value.trim()) location.href = resultsUrl(e.target.value);
    }
  }, true);

  window.addEventListener('submit', function (e) {
    var input = e.target && e.target.querySelector && e.target.querySelector('input[name="string"]');
    if (!input) return;
    e.preventDefault();
    e.stopPropagation();
    if (input.value.trim()) location.href = resultsUrl(input.value);
  }, true);

  document.addEventListener('mousedown', function (e) {
    if (!box || box.contains(e.target) || isSearchInput(e.target)) return;
    close();
  });
  window.addEventListener('resize', place);
  window.addEventListener('scroll', place, { passive: true });

  /* ---------- stránka s výsledkami /vyhladavanie/ ---------- */
  function resultsPage() {
    if (!IS_RESULTS) return;
    var q = new URLSearchParams(location.search).get('string') || '';
    [].forEach.call(document.querySelectorAll('input[name="string"]'), function (i) { i.value = q; });
    document.title = (q ? 'Vyhľadávanie: ' + q : 'Vyhľadávanie') + ' - Silwer.sk';
    [].forEach.call(document.querySelectorAll('h1'), function (h) {
      h.textContent = q ? 'Vyhľadávanie: „' + q.trim() + '“' : 'Vyhľadávanie';
    });
    [].forEach.call(document.querySelectorAll('.breadcrumbs span'), function (s) {
      if (!s.children.length && s.textContent.trim() === 'Všetky produkty') s.textContent = 'Vyhľadávanie';
    });

    load().then(function () {
      var res = q.trim() ? search(q) : [];
      var order = {};
      res.forEach(function (p, i) { order[p.u] = i; });
      var wrap = document.querySelector('#products, .products-block');
      if (!wrap) return;
      function hrefOf(card) {
        var a = card.querySelector('a[href]');
        return a ? a.getAttribute('href') : '';
      }
      function rank(card) {
        var u = hrefOf(card);
        return u in order ? order[u] : 1e6;
      }
      var cards = [].slice.call(wrap.querySelectorAll('.product'));
      cards.sort(function (a, b) { return rank(a) - rank(b); });
      var shown = 0;
      cards.forEach(function (c) {
        var ok = hrefOf(c) in order;
        c.style.display = ok ? '' : 'none';
        if (ok) shown++;
        wrap.appendChild(c);
      });
      var total = document.querySelector('.itemsTotal strong');
      if (total) total.textContent = shown;
      if (!shown) {
        var msg = document.createElement('div');
        msg.className = 'kls-noresults';
        msg.textContent = q.trim()
          ? 'Pre „' + q.trim() + '“ sme nenašli žiadny produkt. Skúste iné slovo, napr. vitamín, spánok alebo kĺby.'
          : 'Zadajte, čo hľadáte.';
        wrap.parentNode.insertBefore(msg, wrap);
      }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', resultsPage);
  else resultsPage();
})();
