/* Vianočné balíčky: obsah a úspora v karte vo výpise, panel úspory v detaile,
   zelený štítok Vianoce. Generuje web-klon/scripts/produkty.py z produkt.json
   („balicek“, „cena“, „cena_povodna“). Samostatný skript – dáta sú priamo v ňom,
   dá sa vložiť aj do Shoptetu (Editor → HTML kód). */
(function () {
  var B = {"/gold-muz-pecen-a-pokoj/": {"nazov": "Silwer Gold. Muž.", "cena": 69.0, "povodna": 91.83, "items": [["Zdravá Pečeň Forte", 31.13, "/zdrava-pecen-komplex-forte/"], ["Lipozomálny Vitamín C", 27.35, "/lipozomalny-vitamin-c/"], ["Magnézium Treonát", 27.35, "/magnezium-treonat/"], ["Vianočný zlatý tubus", 6.0, "/vianocny-zlaty-tubus/"]]}, "/gold-zena-plet-a-pokoj/": {"nazov": "Silwer GOLD. Žena.", "cena": 69.0, "povodna": 91.83, "items": [["Žiarivá pleť", 31.13, "/ziariva-plet/"], ["Lipozomálny Vitamín C", 27.35, "/lipozomalny-vitamin-c/"], ["Magnézium Treonát", 27.35, "/magnezium-treonat/"], ["Vianočný zlatý tubus", 6.0, "/vianocny-zlaty-tubus/"]]}, "/joj-play-muz-imunita/": {"nazov": "SILWER JOJ play. Muž.", "cena": 29.0, "povodna": 42.4, "items": [["Silwer JOJ play Muž 50+ Komplex", 13.95, "/silwer-joj-play-muz-50--komplex/", 5.0, 10], ["Silwer JOJ play Vitamín D3", 14.95, "/silwer-joj-play-vitamin-d3/"], ["Silwer JOJ play Vitamín C + Zinok", 7.5, "/silwer-joj-play-vitamin-c-zinok/"], ["Vianočný tubus", 6.0, "/vianocny-tubus/"]]}, "/joj-play-zena-imunita/": {"nazov": "SILWER JOJ play. Žena.", "cena": 29.0, "povodna": 42.4, "items": [["Silwer JOJ play Žena 50+ Komplex", 13.95, "/silwer-joj-play-zena-50-komplex/", 5.0, 11], ["Silwer JOJ play Vitamín D3", 14.95, "/silwer-joj-play-vitamin-d3/"], ["Silwer JOJ play Vitamín C + Zinok", 7.5, "/silwer-joj-play-vitamin-c-zinok/"], ["Vianočný tubus", 6.0, "/vianocny-tubus/"]]}, "/muz-energia-a-imunita/": {"nazov": "Muž 1. Energia a imunita", "cena": 33.0, "povodna": 44.89, "items": [["Silwer JOJ play Muž 50+ Komplex", 13.95, "/silwer-joj-play-muz-50--komplex/", 5.0, 10], ["Omega-3", 9.95, "/omega-3/", 4.2, 31], ["Tribulus 50+", 7.5, "/tribulus-50-/", 4.5, 32], ["Vitamín C + Zinok", 7.49, "/vitamin-c-zinok/", 5.0, 5], ["Vianočná krabička", 6.0, "/vianocna-krabicka/"]]}, "/muz-pohyb-a-sila/": {"nazov": "Muž 2. Pohyb a sila", "cena": 33.0, "povodna": 45.34, "items": [["Silwer JOJ play Muž 50+ Komplex", 13.95, "/silwer-joj-play-muz-50--komplex/", 5.0, 10], ["Kĺby Kosti Chrupavky", 8.95, "/klby-kosti-chrupavky/", 4.7, 21], ["Koenzým Q10", 9.49, "/koenzym-q10/", 5.0, 3], ["Magnézium Glycinát 550 mg Super Forte Plus", 6.95, "/magnezium-glycinat/", 5.0, 10], ["Vianočná krabička", 6.0, "/vianocna-krabicka/"]]}, "/zena-krasa-a-vitalita/": {"nazov": "Žena 1. Krása a vitalita", "cena": 32.0, "povodna": 42.59, "items": [["Silwer JOJ play Žena 50+ Komplex", 13.95, "/silwer-joj-play-zena-50-komplex/", 5.0, 11], ["Vlasy Nechty Pokožka", 6.2, "/vlasy-nechty-pokozka/", 4.8, 8], ["Koenzým Q10", 9.49, "/koenzym-q10/", 5.0, 3], ["Magnézium Glycinát 550 mg Super Forte Plus", 6.95, "/magnezium-glycinat/", 5.0, 10], ["Vianočná krabička", 6.0, "/vianocna-krabicka/"]]}, "/zena-pokoj-a-imunita/": {"nazov": "Žena 2. Pokoj a imunita", "cena": 39.0, "povodna": 48.89, "items": [["Silwer JOJ play Žena 50+ Komplex", 13.95, "/silwer-joj-play-zena-50-komplex/", 5.0, 11], ["Ashwagandha", 11.5, "/ashwagandha/", 5.0, 10], ["Omega-3", 9.95, "/omega-3/", 4.2, 31], ["Vitamín C + Zinok", 7.49, "/vitamin-c-zinok/", 5.0, 5], ["Vianočná krabička", 6.0, "/vianocna-krabicka/"]]}}, FREE = 40.0, BEZ = ["/vianocna-krabicka/", "/vianocny-tubus/", "/vianocny-zlaty-tubus/"];
  /* obaly (krabička, tubusy): bez záložiek Hodnotenie / Diskusia a hviezdičiek; Popis a Parametre ostávajú */
  if (BEZ.indexOf(location.pathname) > -1) {
    var sb = document.createElement('style');
    sb.textContent = '[data-testid="tabRating"],[data-testid="tabDiscussion"],#ratingTab,#productDiscussion,.p-detail .stars-wrapper{display:none!important}';
    document.head.appendChild(sb);
  }
  var OBAL = /^vianočn/i;  /* krabička, tubus, zlatý tubus – obal, nie produkt */
  function eur(x) { return x.toFixed(2).replace('.', ',') + ' €'; }
  var FIR = '<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" fill="currentColor">' +
    '<path d="M12 2 7.5 8.5h2.6L6 14h3.3L5 20h6v2h2v-2h6l-4.3-6H18l-4.1-5.5h2.6z"/></svg>';
  var css =
    /* karta vo výpise */
    '.sw-bal{margin:10px 0 4px;font-size:13.5px;line-height:1.35}' +
    '.sw-bal-h{font-weight:600;color:#1A1A1C;margin:0 0 5px}' +
    '.sw-bal ul{list-style:none;margin:0;padding:0;border-top:1px solid #E5E3DE}' +
    '.sw-bal li{display:flex;justify-content:space-between;gap:10px;padding:5px 0;border-bottom:1px solid #E5E3DE}' +
    '.sw-bal li a,.sw-bal li span:first-child{color:#1A1A1C;text-decoration:none}' +
    '.sw-bal li span:last-child{color:#55555A;white-space:nowrap;font-variant-numeric:tabular-nums}' +
    '.sw-bal-sum{display:flex;justify-content:space-between;gap:10px;padding:6px 10px 0;font-weight:400;color:#1A1A1C}' +
    '.sw-bal-sum span:last-child{white-space:nowrap;font-variant-numeric:tabular-nums}' +
    '.sw-save{margin-top:8px;background:#1E6B3B;color:#fff;font-weight:700;font-size:13.5px;border-radius:8px;' +
    'padding:7px 10px;line-height:1.3;display:flex;justify-content:space-between;gap:10px}' +
    '.sw-save b{font-weight:900;white-space:nowrap;font-variant-numeric:tabular-nums}' +
    '.sw-bal-ship{margin-top:8px;font-weight:700;color:#1E6B3B}' +
    /* karta samostatného obalu (krabička, tubus) */
    '.sw-bal-h2{margin-top:12px}' +
    '.sw-bal--obal li span:last-child{white-space:normal}' +
    '.sw-obal-note{margin-top:10px;background:#F2EEE6;color:#1A1A1C;font-weight:600;font-size:13.5px;' +
    'border-radius:8px;padding:7px 10px;line-height:1.3}' +
    /* panel v detaile */
    '.sw-pd-save{margin:14px 0 4px;border:1.5px solid #CFE5D7;background:#F1F8F3;border-radius:12px;padding:14px 16px}' +
    '.sw-pd-save__row{display:flex;justify-content:space-between;gap:12px;font-size:15px;color:#3A3A3F;padding:2px 0}' +
    '.sw-pd-save__row s{color:#55555A}' +
    '.sw-pd-save__row--save{color:#1A1A1C;font-weight:800;font-size:17px}' +
    '.sw-pd-save__big{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:8px;padding-top:10px;' +
    'border-top:1px dashed #B9D8C4;font-weight:900;font-size:24px;color:#1A1A1C}' +
    '.sw-pd-save__ship{margin-top:6px;font-size:14px;font-weight:700;color:#1E6B3B}' +
    /* hodnotenia produktov v balíčku namiesto „Neohodnotené“ */
    '.sw-bal-rev{margin:6px 0 2px;font-size:14px;line-height:1.5;color:#3A3A3F}' +
    '.p-detail-inner-header-mobile .sw-bal-rev{font-size:13px;margin:4px 0 12px;text-align:left}' +
    '.p-detail-inner-header-mobile .sw-bal-rev a{display:block}' +
    '.p-detail-inner-header-mobile .sw-bal-rev .sw-sep{display:none}' +
    '.sw-bal-rev__h{display:block}' +
    '.sw-bal-rev__h{font-weight:600;color:#1A1A1C;margin-right:4px}' +
    '.sw-bal-rev a{color:#3A3A3F;text-decoration:none;white-space:nowrap}' +
    '.sw-bal-rev a:hover{text-decoration:underline}' +
    '.sw-bal-rev b{color:#1A1A1C}' +
    '.sw-bal-rev .sw-star{color:#F5A623}' +
    '.sw-bal-rev .sw-sep{color:#B5B3AE;margin:0 6px}' +
    /* len jeden blok: na mobile z mobilnej hlavičky, na počítači z desktopovej (iPhone ukazoval oba) */
    '@media(max-width:767px){.p-data-wrapper .sw-bal-rev{display:none!important}}' +
    '@media(min-width:768px){.p-detail-inner-header-mobile .sw-bal-rev{display:none!important}}' +
    /* štítok Vianoce – redizajn ho inak sfarbí na sivo (sw-flag--info) */
    '.flag.sw-xmas,.flag.sw-xmas.sw-flag{background:#1E6B3B!important;color:#fff!important;border-color:#1E6B3B!important;gap:5px}' +
    '.flag.sw-xmas svg{flex:0 0 auto}' +
    /* vždy prvý: redizajn radí štítky cez CSS order */
    '.flag.sw-xmas,.flags .flag.sw-xmas{order:-9999!important}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* obal -> balíčky, v ktorých je, a koľko produktov sa doň zmestí */
  var OB = {};
  Object.keys(B).forEach(function (k) {
    var d = B[k], n = d.items.filter(function (i) { return !OBAL.test(i[0]); }).length;
    d.items.forEach(function (i) {
      if (!i[2] || !OBAL.test(i[0])) return;
      var o = OB[i[2]] || (OB[i[2]] = { n: 0, pk: [] });
      o.n = Math.max(o.n, n); o.pk.push([d.nazov || k, k]);
    });
  });
  function obalCard(card, href, name) {
    var o = OB[href]; if (!o) return;
    var f = /krabičk/i.test(name);
    var box = document.createElement('div'); box.className = 'sw-bal sw-bal--obal';
    box.innerHTML = '<div class="sw-bal-h">Darčekové balenie</div><ul>' +
      '<li><span>Zmestia sa do' + (f ? ' nej ' : 'ň ') + o.n + ' produkty Silwer</span></li>' +
      '<li><span>Navrhnut' + (f ? 'á' : 'ý') + ' pre Vianoce 2026</span></li></ul>' +
      '<div class="sw-bal-h sw-bal-h2">Súčasťou balíčkov</div><ul>' + o.pk.map(function (p) {
        return '<li><a href="' + p[1] + '">' + p[0] + '</a></li>';
      }).join('') + '</ul>' +
      '<div class="sw-obal-note">Môžete ' + (f ? 'ju' : 'ho') + ' kúpiť aj samostatne</div>';
    var anchor = card.querySelector('.p-in-in') || card.querySelector('a[href]');
    anchor.parentNode.insertBefore(box, anchor.nextSibling);
  }
  function cards() {
    [].forEach.call(document.querySelectorAll('.product'), function (card) {
      if (card.querySelector('.sw-bal')) return;
      var a = card.querySelector('a[href]'); if (!a) return;
      var href = a.getAttribute('href');
      if (OB[href]) return obalCard(card, href, card.textContent);
      var d = B[href]; if (!d) return;
      var save = d.povodna ? d.povodna - d.cena : 0;
      var box = document.createElement('div'); box.className = 'sw-bal';
      box.innerHTML = '<div class="sw-bal-h">Balíček obsahuje</div><ul>' + d.items.map(function (i) {
        var name = i[2] ? '<a href="' + i[2] + '">' + i[0] + '</a>' : '<span>' + i[0] + '</span>';
        return '<li>' + name + '</li>';
      }).join('') + '</ul>' +
        (save > 0 ? '<div class="sw-bal-sum"><span>Spolu jednotlivo</span><span>' + eur(d.povodna) + '</span></div>' +
          '<div class="sw-save"><span>Kúpou balíčka ušetríte</span><b>' + eur(save) + '</b></div>' : '') +
        (d.cena >= FREE ? '<div class="sw-bal-ship">✓ Doprava zadarmo</div>' : '');
      var anchor = card.querySelector('.p-in-in') || a;
      anchor.parentNode.insertBefore(box, anchor.nextSibling);
    });
  }
  /* „4 produkty + krabička“ – obal nie je produkt */
  function what(d) {
    var n = d.items.filter(function (i) { return !OBAL.test(i[0]); }).length;
    var obal = d.items.filter(function (i) { return OBAL.test(i[0]); }).map(function (i) {
      return i[0].replace(/^vianočn\S*\s+/i, '').toLowerCase(); })[0];
    return n + (n > 4 ? ' produktov' : ' produkty') + (obal ? ' + ' + obal : '');
  }
  function detail() {
    var d = B[location.pathname]; if (!d || !d.povodna) return;
    var pw = document.querySelector('.p-detail .p-price-wrapper');
    if (!pw || document.querySelector('.sw-pd-save')) return;
    var box = document.createElement('div'); box.className = 'sw-pd-save';
    box.innerHTML =
      '<div class="sw-pd-save__row"><span>Spolu jednotlivo (' + what(d) + ')</span><span>' + eur(d.povodna) + '</span></div>' +
      '<div class="sw-pd-save__row sw-pd-save__row--save"><span>Kúpou balíčka ušetríte</span><span>' + eur(d.povodna - d.cena) + '</span></div>' +
      '<div class="sw-pd-save__big"><span>Cena balíčka</span><span>' + eur(d.cena) + '</span></div>' +
      (d.cena >= FREE ? '<div class="sw-pd-save__ship">✓ Doprava zadarmo</div>' : '');
    pw.parentNode.insertBefore(box, pw.nextSibling);
  }
  /* balíček ešte nemá vlastné hodnotenia: namiesto prázdnych hviezdičiek ukáže skutočné
     hodnotenia produktov, z ktorých je zložený (každý so svojím počtom hodnotení) */
  function reviews() {
    var d = B[location.pathname]; if (!d) return;
    var rated = d.items.filter(function (i) { return i[2] && i[3] && !OBAL.test(i[0]); });
    [].forEach.call(document.querySelectorAll('.p-detail .stars-wrapper'), function (w) {
      if (w.getAttribute('data-sw-bal') || !/Neohodnoten/i.test(w.textContent)) return;
      w.setAttribute('data-sw-bal', '1');
      w.style.setProperty('display', 'none', 'important');
      return; /* blok „Hodnotenia produktov v balíčku“ vypnutý 12. 11. 2026 na želanie Silwer */
      if (!rated.length) return;
      var el = document.createElement('div'); el.className = 'sw-bal-rev';
      el.innerHTML = '<span class="sw-bal-rev__h">Hodnotenia produktov v balíčku:</span> ' +
        rated.map(function (i) {
          return '<a href="' + i[2] + '"><span class="sw-star">★</span> <b>' + i[3].toFixed(1).replace('.', ',') +
            '</b> ' + i[0] + ' (' + i[4] + ')</a>';
        }).join('<span class="sw-sep">·</span>');
      w.parentNode.insertBefore(el, w.nextSibling);
    });
  }
  function flags() {
    [].forEach.call(document.querySelectorAll('.flag'), function (f) {
      if (f.classList.contains('sw-xmas')) return;
      if (!/flag-vianoce/.test(f.className) && !/^\s*vianoce\s*$/i.test(f.textContent)) return;
      f.classList.add('sw-xmas');
      f.insertAdjacentHTML('afterbegin', FIR);
      if (f.parentNode && f.parentNode.firstElementChild !== f) f.parentNode.insertBefore(f, f.parentNode.firstElementChild);
    });
  }
  function bezDetailu() {
    if (BEZ.indexOf(location.pathname) < 0) return;
    [].forEach.call(document.querySelectorAll('.p-detail .stars-wrapper'), function (w) {
      w.style.setProperty('display', 'none', 'important');
    });
  }
  function run() { cards(); detail(); reviews(); flags(); bezDetailu(); }
  document.addEventListener('DOMContentLoaded', function () {
    run();
    var mo = new MutationObserver(run);
    mo.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { mo.disconnect(); }, 8000);
  });
})();
