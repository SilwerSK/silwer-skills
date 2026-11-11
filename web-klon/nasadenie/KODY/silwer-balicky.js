/* Vianočné balíčky: obsah a úspora v karte vo výpise, panel úspory v detaile,
   zelený štítok Vianoce. Generuje web-klon/scripts/produkty.py z produkt.json
   („balicek“, „cena“, „cena_povodna“). Samostatný skript – dáta sú priamo v ňom,
   dá sa vložiť aj do Shoptetu (Editor → HTML kód). */
(function () {
  var B = {"/gold-muz-pecen-a-pokoj/": {"cena": 69.0, "povodna": 91.83, "items": [["Zdravá Pečeň Forte", 31.13, "/zdrava-pecen-komplex-forte/"], ["Lipozomálny Vitamín C", 27.35, "/lipozomalny-vitamin-c/"], ["Magnézium Treonát", 27.35, "/magnezium-treonat/"], ["Vianočný zlatý tubus", 6.0, null]]}, "/gold-zena-plet-a-pokoj/": {"cena": 69.0, "povodna": 91.83, "items": [["Žiarivá pleť", 31.13, "/ziariva-plet/"], ["Lipozomálny Vitamín C", 27.35, "/lipozomalny-vitamin-c/"], ["Magnézium Treonát", 27.35, "/magnezium-treonat/"], ["Vianočný zlatý tubus", 6.0, null]]}, "/joj-play-muz-imunita/": {"cena": 29.0, "povodna": 42.4, "items": [["Silwer JOJ play Muž 50+ Komplex", 13.95, "/silwer-joj-play-muz-50--komplex/"], ["Silwer JOJ play Vitamín D3", 14.95, "/silwer-joj-play-vitamin-d3/"], ["Silwer JOJ play Vitamín C + Zinok", 7.5, "/silwer-joj-play-vitamin-c-zinok/"], ["Vianočný tubus", 6.0, null]]}, "/joj-play-zena-imunita/": {"cena": 29.0, "povodna": 42.4, "items": [["Silwer JOJ play Žena 50+ Komplex", 13.95, "/silwer-joj-play-zena-50-komplex/"], ["Silwer JOJ play Vitamín D3", 14.95, "/silwer-joj-play-vitamin-d3/"], ["Silwer JOJ play Vitamín C + Zinok", 7.5, "/silwer-joj-play-vitamin-c-zinok/"], ["Vianočný tubus", 6.0, null]]}, "/muz-energia-a-imunita/": {"cena": 33.0, "povodna": 44.89, "items": [["Silwer JOJ play Muž 50+ Komplex", 13.95, "/silwer-joj-play-muz-50--komplex/"], ["Omega-3", 9.95, "/omega-3/"], ["Tribulus 50+", 7.5, "/tribulus-50-/"], ["Vitamín C + Zinok", 7.49, "/vitamin-c-zinok/"], ["Vianočná krabička", 6.0, null]]}, "/muz-pohyb-a-sila/": {"cena": 33.0, "povodna": 45.34, "items": [["Silwer JOJ play Muž 50+ Komplex", 13.95, "/silwer-joj-play-muz-50--komplex/"], ["Kĺby Kosti Chrupavky", 8.95, "/klby-kosti-chrupavky/"], ["Koenzým Q10", 9.49, "/koenzym-q10/"], ["Magnézium Glycinát 550 mg Super Forte Plus", 6.95, "/magnezium-glycinat/"], ["Vianočná krabička", 6.0, null]]}, "/zena-krasa-a-vitalita/": {"cena": 32.0, "povodna": 42.59, "items": [["Silwer JOJ play Žena 50+ Komplex", 13.95, "/silwer-joj-play-zena-50-komplex/"], ["Vlasy Nechty Pokožka", 6.2, "/vlasy-nechty-pokozka/"], ["Koenzým Q10", 9.49, "/koenzym-q10/"], ["Magnézium Glycinát 550 mg Super Forte Plus", 6.95, "/magnezium-glycinat/"], ["Vianočná krabička", 6.0, null]]}, "/zena-pokoj-a-imunita/": {"cena": 39.0, "povodna": 48.89, "items": [["Silwer JOJ play Žena 50+ Komplex", 13.95, "/silwer-joj-play-zena-50-komplex/"], ["Ashwagandha", 11.5, "/ashwagandha/"], ["Omega-3", 9.95, "/omega-3/"], ["Vitamín C + Zinok", 7.49, "/vitamin-c-zinok/"], ["Vianočná krabička", 6.0, null]]}}, FREE = 40.0;
  function eur(x) { return x.toFixed(2).replace('.', ',') + ' €'; }
  var FIR = '<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" fill="currentColor">' +
    '<path d="M12 2 7.5 8.5h2.6L6 14h3.3L5 20h6v2h2v-2h6l-4.3-6H18l-4.1-5.5h2.6z"/></svg>';
  var css =
    /* karta vo výpise */
    '.sw-bal{margin:10px 0 4px;font-size:13.5px;line-height:1.35}' +
    '.sw-bal ul{list-style:none;margin:0;padding:0;border-top:1px solid #E5E3DE}' +
    '.sw-bal li{display:flex;justify-content:space-between;gap:10px;padding:5px 0;border-bottom:1px solid #E5E3DE}' +
    '.sw-bal li a,.sw-bal li span:first-child{color:#1A1A1C;text-decoration:none}' +
    '.sw-bal li span:last-child{color:#55555A;white-space:nowrap;font-variant-numeric:tabular-nums}' +
    '.sw-bal-sum{display:flex;justify-content:space-between;gap:10px;padding:6px 0 0;font-weight:700;color:#1A1A1C}' +
    '.sw-bal-sum span:last-child{white-space:nowrap;font-variant-numeric:tabular-nums}' +
    '.sw-save{margin-top:8px;background:#1E6B3B;color:#fff;font-weight:700;font-size:13.5px;border-radius:8px;' +
    'padding:7px 10px;line-height:1.3}' +
    '.sw-save b{font-weight:900;white-space:nowrap}' +
    '.sw-bal-ship{margin-top:8px;font-weight:700;color:#1E6B3B}' +
    /* panel v detaile */
    '.sw-pd-save{margin:14px 0 4px;border:1.5px solid #CFE5D7;background:#F1F8F3;border-radius:12px;padding:14px 16px}' +
    '.sw-pd-save__row{display:flex;justify-content:space-between;gap:12px;font-size:15px;color:#3A3A3F;padding:2px 0}' +
    '.sw-pd-save__row s{color:#55555A}' +
    '.sw-pd-save__row--save{color:#1E6B3B;font-weight:800;font-size:17px}' +
    '.sw-pd-save__big{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:8px;padding-top:10px;' +
    'border-top:1px dashed #B9D8C4;font-weight:900;font-size:24px;color:#1A1A1C}' +
    '.sw-pd-save__ship{margin-top:6px;font-size:14px;font-weight:700;color:#1E6B3B}' +
    /* štítok Vianoce – redizajn ho inak sfarbí na sivo (sw-flag--info) */
    '.flag.sw-xmas,.flag.sw-xmas.sw-flag{background:#1E6B3B!important;color:#fff!important;border-color:#1E6B3B!important;gap:5px}' +
    '.flag.sw-xmas svg{flex:0 0 auto}' +
    /* vždy prvý: redizajn radí štítky cez CSS order */
    '.flag.sw-xmas,.flags .flag.sw-xmas{order:-9999!important}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  function cards() {
    [].forEach.call(document.querySelectorAll('.product'), function (card) {
      if (card.querySelector('.sw-bal')) return;
      var a = card.querySelector('a[href]'); if (!a) return;
      var d = B[a.getAttribute('href')]; if (!d) return;
      var save = d.povodna ? d.povodna - d.cena : 0;
      var box = document.createElement('div'); box.className = 'sw-bal';
      box.innerHTML = '<ul>' + d.items.map(function (i) {
        var name = i[2] ? '<a href="' + i[2] + '">' + i[0] + '</a>' : '<span>' + i[0] + '</span>';
        return '<li>' + name + '</li>';
      }).join('') + '</ul>' +
        (save > 0 ? '<div class="sw-bal-sum"><span>Spolu jednotlivo</span><span>' + eur(d.povodna) + '</span></div>' +
          '<div class="sw-save">Kúpou balíčka ušetríte <b>' + eur(save) + '</b></div>' : '') +
        (d.cena >= FREE ? '<div class="sw-bal-ship">✓ Doprava zadarmo</div>' : '');
      var anchor = card.querySelector('.p-in-in') || a;
      anchor.parentNode.insertBefore(box, anchor.nextSibling);
    });
  }
  /* „4 produkty + krabička“ – obal nie je produkt */
  function what(d) {
    var n = d.items.filter(function (i) { return i[2]; }).length;
    var obal = d.items.filter(function (i) { return !i[2]; }).map(function (i) {
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
  function flags() {
    [].forEach.call(document.querySelectorAll('.flag'), function (f) {
      if (f.classList.contains('sw-xmas')) return;
      if (!/flag-vianoce/.test(f.className) && !/^\s*vianoce\s*$/i.test(f.textContent)) return;
      f.classList.add('sw-xmas');
      f.insertAdjacentHTML('afterbegin', FIR);
      if (f.parentNode && f.parentNode.firstElementChild !== f) f.parentNode.insertBefore(f, f.parentNode.firstElementChild);
    });
  }
  function run() { cards(); detail(); flags(); }
  document.addEventListener('DOMContentLoaded', function () {
    run();
    var mo = new MutationObserver(run);
    mo.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { mo.disconnect(); }, 8000);
  });
})();
