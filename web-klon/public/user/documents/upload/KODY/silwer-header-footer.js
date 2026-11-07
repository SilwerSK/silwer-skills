/* Silwer.sk — redizajn hlavičky a pätičky (v1, 2026-08-16)
   Vzor zo silwer-ux.js: CSS si injektuje tento súbor sám.
   Do administrácie ide JEDINÝ riadok do Zápätia:
   script src="https://www.silwer.sk/user/documents/upload/KODY/silwer-header-footer.js?v=1" defer
   (Shoptet zakazuje značky script priamo v .js, preto je tu zapísaná bez zátvoriek.)
   Vypnutie = zmazať ten riadok. Všetky rozmery sú namerané na živom webe. */

/* Proti mihnutiu starej šablóny: snippet v Záhlaví pridá na <html> triedu sw-wait,
   ktorá stránku skryje (pozri redesign/SPUSTENIE-2026-10-22.md). Tento súbor sa
   spúšťa posledný, takže keď dobehne, hlavička, pätička aj obsah sú už v novom
   dizajne. Ak sa spustí ešte počas načítania HTML, moduly čakajú na DOMContentLoaded,
   preto aj odkrytie. setTimeout 0 sa vykoná aj vtedy, keď by niečo nižšie spadlo;
   snippet má vlastnú poistku 2,5 s. */
(function () {
  function reveal() {
    setTimeout(function () {
      var h = document.documentElement;
      if (!h.classList.contains('sw-wait')) return;
      h.classList.add('sw-show');
      h.classList.remove('sw-wait');
    }, 0);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', reveal);
  else reveal();
})();

(function(){'use strict';

var CFG = {
  tel:      '+421 904 707 010',   /* reálne číslo. 0948 000 000 z návrhu je placeholder */
  telHref:  'tel:+421904707010',
  hours:    'Po – Pia 9:00 – 16:00',   /* potvrdené klientom 20. 10. (Komentáre 5) */
  freeShip: 'Doprava zadarmo pri nákupe nad 40 €',
  searchPh: 'Čo Vás trápi? napr. spánok, kĺby, únava…',
  lblAccount: 'Účet',
  lblCart:    'Košík',
  colSilwer: [                     /* dnes len v menu, v pätičke nie → žiadna duplicita */
    ['O nás',             '/onas/'],
    ['Blog',              '/blog/'],
    ['Silwer × JOJ Play', '/joj_play/']
  ],
  /* Facebook aj Instagram sú už ako ikony v stĺpci Kontakt.
     Samostatný FB widget je preto duplicita a berie miesto. */
  hideSocialColumns: true,
  trustRows: false,   /* „60-dňová garancia", „GMP" — nepotvrdené tvrdenia */
  legalNote: false    /* EFSA disclaimer — znenie na schválenie */
};

var RED = '#D40000', RED_DEEP = '#A80000';

var css = [
/* brand tokeny — pozri Brand Book v1.0 (čierna #000, Mild Gray #D1D1D2, Anthracite #303435) */
':root{--sw-ink:#000000;--sw-dark:#000000;--sw-line2:rgba(255,255,255,.16);',
'--sw-dim:#B9B9BC;--sw-red:' + RED + ';--sw-red-deep:' + RED_DEEP + ';--sw-field:#F4F4F5;',
'--sw-gray:#D1D1D2;--sw-anthracite:#303435}',

/* ================= TOP PRUH =================
   Feedback 7. 10.: USP skrátene s piktogramom (dobierka, doručenie do 2 dní,
   doprava zadarmo nad 40 €), telefón len s piktogramom bez „Zákaznícka linka". */
'.sw-topbar{background:var(--sw-ink);color:#fff;font-size:13px;line-height:1.3}',
'.sw-topbar__in{max-width:calc(1200px + 2*var(--sw-gut,20px));margin:0 auto;padding:9px var(--sw-gut,20px);',
'box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;gap:16px}',
'.sw-topbar b{font-weight:700}',
'.sw-tb-usp{display:flex;align-items:center;gap:28px;flex-wrap:wrap}',
'.sw-tb-usp>span,.sw-topbar__right{display:inline-flex;align-items:center;gap:8px;font-weight:700;white-space:nowrap}',
'.sw-tb-ic{width:17px;height:17px;flex:0 0 auto;stroke:currentColor;fill:none;stroke-width:1.8;',
'stroke-linecap:round;stroke-linejoin:round;opacity:.92}',
'@media(max-width:767px){.sw-tb-usp{gap:16px;flex-wrap:nowrap}.sw-tb-usp .sw-tb-cod{display:none}}',
'.sw-topbar a{color:#fff;text-decoration:none;font-weight:700}',
'.sw-topbar a:hover{text-decoration:underline}',
'.sw-tb-hours{font-weight:400;opacity:.78;margin-left:6px;padding-left:10px;border-left:1px solid rgba(255,255,255,.3)}',
/* na mobile je hlavička position:fixed → pruh sedí pod ňou ako promo strip */
'@media(max-width:767px){.sw-topbar__in{justify-content:center;padding:7px 14px;font-size:11.5px}',
'.sw-topbar__right{display:none!important}}',

/* ================= NAVBAR =================
   POZOR: pod 768 px má Shoptet vlastnú mobilnú hlavičku (body.mobile-header-version-1)
   s vlastným layoutom. Trojzónový flex ju rozbije — overené: pole vyhľadávania
   sa zúži na polovicu a ikony sa nakopia cez logo.
   Preto layout LEN na desktope, na mobile iba kozmetika. */

/* --- spoločné pre obe --- */
'#header .site-name img{max-height:46px!important;width:auto!important;height:auto!important}',
'#header .search-input{font-size:16px}',
/* menej červenej (feedback 7. 10.): červená ostáva na nákupných tlačidlách */
'#header .search-form .search-button{background:var(--sw-ink)!important;border:0!important;color:#fff}',
'#header .search-form .search-button:hover{background:var(--sw-red)!important}',
'#header .search-form .search-button .icon-search{font-size:20px;line-height:1}',

/* --- LEN DESKTOP: logo | vyhľadávanie | Účet + Košík --- */
'@media(min-width:768px){',
'#header .header-top-wrapper{display:flex!important;align-items:center;flex-wrap:nowrap;',
'gap:28px;padding:10px 20px;min-height:0}',
/* .site-name si zo šablóny drží 83 px a nafukuje celý riadok */
'#header .site-name{flex:0 0 auto;max-width:170px;width:auto!important;margin:0;height:auto!important;',
'min-height:0!important;padding:0!important;line-height:0}',
'#header .site-name a{display:inline-flex;align-items:center;padding:0!important;margin:0!important}',
/* kontajner popup widgetov (login/košík) — má nulovú výšku, nech nenafukuje riadok */
/* popupy (košík, prihlásenie) sa otvárajú POD riadkom hlavičky, nie cez neho */
'#header .header-top-wrapper{position:relative}',
'#header .header-top-wrapper>.user-action{position:absolute;top:100%;left:0;right:0;width:auto;height:0;z-index:80}',
'#header .header-top{padding-bottom:0!important;margin-bottom:0!important}',
'#header .navigation-tools{flex:1 1 auto!important;width:auto!important;max-width:820px;margin:0 auto!important}',
'#header .navigation-buttons{flex:0 0 auto;margin-left:auto;display:flex!important;align-items:flex-start;gap:26px}',
'#header .search-form{width:100%!important;display:flex}',
'#header .search-form fieldset{width:100%;display:flex}',
/* nižšie o 20 % (feedback 7. 10.): 60 → 48 px */
'#header .search-form-input-group{display:flex;width:100%;background:var(--sw-field);',
'border-radius:12px;padding:5px;align-items:center}',
'#header .search-input{flex:1 1 auto!important;width:100%!important;background:transparent!important;',
'border:0!important;height:38px!important;padding-left:16px;box-shadow:none!important}',
'#header .search-input:focus{background:transparent!important;box-shadow:none!important}',
'#header .search-form .search-button{flex:0 0 auto;width:46px!important;height:38px!important;',
'min-width:0!important;padding:0!important;border-radius:9px!important;display:flex!important;',
'align-items:center;justify-content:center;font-size:0!important}',
'#header .navigation-buttons>*{position:relative}',
'#header .navigation-buttons .top-nav-button-login,#header .navigation-buttons .cart-count{',
'display:flex!important;flex-direction:column;align-items:center;gap:5px;width:auto!important;',
'height:auto!important;background:none!important;border:0!important;padding:0!important}',
'#header .navigation-buttons .sw-lbl{font-size:12px;font-weight:600;color:var(--sw-ink);',
'line-height:1;white-space:nowrap}',
'#header .navigation-buttons [class^="icon-"],#header .navigation-buttons [class*=" icon-"]{',
'font-size:23px;color:var(--sw-ink)}',
'}',
/* Účet a Košík bez šedých plôch, len lineárne (feedback 7. 10.) — glyfy
   z ikonfontu sú plné, nahrádzajú sa obrysovým SVG. Počítadlo (<i>) ostáva. */
'#header .navigation-buttons .top-nav-button-login>i.icon-login,',
'#header .navigation-buttons .cart-count>.icon-cart{display:none!important}',
'.sw-hic{width:25px;height:25px;flex:0 0 auto;stroke:var(--sw-ink);fill:none;stroke-width:1.6;',
'stroke-linecap:round;stroke-linejoin:round;display:block}',
'@media(min-width:768px){',
/* Téma vlastný počítadlový odznak UŽ MÁ — je to <i> vnútri .cart-count a je
   napojený na Shoptetove aktualizácie košíka. Vlastný by bol druhý červený
   krúžok, preto sa štýluje ten jej. */
'#header .cart-count>i{position:absolute;top:-6px;right:-9px;min-width:19px;height:19px;',
'padding:0 5px;border-radius:999px;background:var(--sw-red);color:#fff;font-size:11px;',
'font-weight:700;font-style:normal;display:flex;align-items:center;justify-content:center;',
'line-height:1;z-index:2}',
'}',

/* --- MOBIL: Shoptetova hlavička zostáva nedotknutá --- */
'@media(max-width:767px){',
'#header .site-name img{max-height:30px!important}',
'#header .navigation-buttons .sw-lbl{display:none}',
'#header .cart-count>i{position:absolute;top:-4px;right:-6px;min-width:17px;height:17px;',
'padding:0 4px;border-radius:999px;background:var(--sw-red);color:#fff;font-size:10px;',
'font-weight:700;font-style:normal;display:flex;align-items:center;justify-content:center;line-height:1}',
'}',

/* ---- menu ---- */
'#navigation .menu-level-1>li>a{font-weight:700;letter-spacing:.01em}',
'#navigation .menu-level-1>li>a:hover{color:var(--sw-red)}',

/* ================= PÄTIČKA: tmavá ================= */
'#footer.footer{background:var(--sw-dark);color:#fff}',
'#footer .pageElement__heading,#footer h3,#footer h4{color:#fff;font-size:13px;font-weight:700;',
'letter-spacing:.14em;text-transform:uppercase;margin-bottom:16px}',
'#footer a{color:#fff}',
'#footer a:hover{color:#fff;text-decoration:underline}',
'#footer li{margin-bottom:9px}',
'#footer .custom-footer a{font-weight:500}',
'#footer .contact-box .mail,#footer .contact-box .tel{color:#fff;white-space:nowrap}',
'#footer .subscribe-form .form-control{background:rgba(255,255,255,.07);border:1px solid var(--sw-line2);',
'color:#fff;border-radius:8px;height:46px}',
'#footer .subscribe-form .form-control::placeholder{color:var(--sw-dim)}',
'#footer .consents,#footer .consents a{color:var(--sw-dim);font-size:12px}',
/* newsletter CTA bol biely → konverzná červená */
'#footer .subscribe-form .btn,#footer .btn-primary{background:var(--sw-red)!important;border:0!important;',
'color:#fff!important;border-radius:8px!important;font-weight:700;padding:14px 26px}',
'#footer .subscribe-form .btn:hover,#footer .btn-primary:hover{background:var(--sw-red-deep)!important}',
/* sociálne ikony sú ikonfont v ::before — CSS filter ich zneviditeľní, preto len farby */
'#footer .social-icon{background:rgba(255,255,255,.12);color:#fff;border-radius:50%}',
'#footer .social-icon:hover{background:var(--sw-red)}',

/* ---- copyright pruh: .container.footer-bottom mal background:#fff a čierny text ---- */
'.footer-bottom-full-width{background:var(--sw-dark);border-top:1px solid var(--sw-line2)}',
'#footer .footer-bottom,.footer-bottom-full-width .footer-bottom,',
'.footer-bottom-full-width .container{background:transparent!important}',
'#footer .footer-bottom,#footer .footer-bottom .copyright,#footer .footer-bottom span,',
'#footer #signature,#footer #signature a,#footer .cookies-settings{color:var(--sw-dim)!important}',
'#footer .footer-bottom a:hover,#footer .cookies-settings:hover{color:#fff!important}',

/* ---- mriežka ----
   POZOR: .row má z Bootstrapu clearfix ::before/::after. V display:grid sa z nich
   stanú plnohodnotné bunky a zožerú stĺpce. Musia sa vypnúť. */
'#footer .row.custom-footer::before,#footer .row.custom-footer::after{display:none!important;content:none!important}',
'#footer .row.custom-footer{display:grid;gap:36px 30px;margin:0;',
'grid-template-columns:minmax(240px,1.25fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) minmax(240px,1.25fr)}',
/* ---- návrh 15. 9.: značka a uistenia v prvom stĺpci, nadpisy bez čiarok ---- */
'#footer.footer{padding-top:56px}',
'#footer .pageElement__heading::after,#footer h3::after{display:none!important;content:none!important}',
'#footer .pageElement__heading,#footer h3{margin-bottom:18px!important;padding-bottom:0!important}',
'#footer .custom-footer li a,#footer .sw-col-silwer li a{font-weight:500!important;font-size:15.5px;color:rgba(255,255,255,.88)!important}',
'#footer .custom-footer li a:hover{color:#fff!important}',
'.sw-fbrand__logo{display:block;height:34px;width:auto;filter:brightness(0) invert(1);margin:0 0 22px}',
'.sw-fbrand ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:13px}',
'.sw-fbrand li{display:flex;gap:11px;align-items:flex-start;font-size:14.5px;line-height:1.5;color:rgba(255,255,255,.85);margin:0!important}',
'.sw-fbrand li i{font-size:16px;opacity:.75;margin-top:2px;width:18px;text-align:center;flex:0 0 18px}',
'.sw-fbrand li b{color:#fff;font-weight:700}',
'.sw-fbrand li a{color:#fff!important;font-weight:700}',
'.sw-fbrand__h{display:block;font-size:13.5px;color:rgba(255,255,255,.7)}',
'@media(max-width:1199px){.sw-fbrand{grid-column:1/-1}}',
'#footer .row.custom-footer>div{width:auto;max-width:none;flex:none;float:none;padding:0;min-width:0}',
'@media(max-width:1199px){#footer .row.custom-footer{grid-template-columns:repeat(2,minmax(0,1fr));gap:30px 20px}}',
'@media(max-width:575px){#footer .row.custom-footer{grid-template-columns:minmax(0,1fr)}}',
'.sw-col-silwer ul{list-style:none;padding:0;margin:0}',

/* ---- logá bánk a dopravcov ----
   Feedback 7. 10.: „graficky upraviť logá". Doteraz boli niektoré na tmavom
   invertované, jedno na bielej doske a SVG s bielou kresbou, každé inak.
   Teraz všetky na rovnakých bielych dlaždiciach v pôvodných farbách, ako sa
   logá platieb a dopravcov bežne zobrazujú. Spacer medzera.png preč. */
'.footer-icons{padding:22px 0;border-top:1px solid var(--sw-line2);display:flex;flex-wrap:wrap;',
'justify-content:center;align-items:center;gap:8px}',
/* flex:0 0 auto je nutne — inak sa 17 ikon v rade zmrsti na ~10 px */
/* logá bánk sú štvorce 60×60 s vlastným okrajom, preto väčšia výška obrázka */
'.footer-icons .footer-icon{flex:0 0 auto;width:60px;height:44px;box-sizing:border-box;',
'background:#fff!important;border:0!important;border-radius:8px!important;padding:3px 6px!important;',
'margin:0!important;display:inline-flex;align-items:center;justify-content:center;overflow:hidden}',
'.footer-icons .footer-icon img{max-height:38px!important;max-width:100%!important;width:auto!important;',
'height:auto!important;filter:none!important;opacity:1!important;object-fit:contain}',
'.footer-icons .footer-icon img[src*="apple_pay"],.footer-icons .footer-icon img[src*="g_pay"],',
'.footer-icons .footer-icon img[src*="gls"],.footer-icons .footer-icon img[src*="packeta"],',
'.footer-icons .footer-icon img[src*="uvz"]{max-height:30px!important}',
'.footer-icons .sw-adc img{max-height:17px!important}',
/* medzera.png je spacer zo starého layoutu; doza.svg je produktový piktogram
   (dóza), nie logo platby či dopravy — v rade log nemá čo robiť */
'.footer-icons .footer-icon:has(img[src*="medzera"]),.footer-icons .footer-icon:has(img[src*="doza"]){display:none!important}',
'@media(max-width:767px){.footer-icons{gap:6px;padding:16px 0}',
'.footer-icons .footer-icon{width:52px;height:38px}',
'.footer-icons .footer-icon img{max-height:32px!important}}',

/* ---- voliteľné ---- */
'.sw-trust{list-style:none;padding:0;margin:20px 0 0;display:flex;flex-direction:column;gap:11px}',
'.sw-trust li{display:flex;gap:11px;font-size:14px;color:#E6E6E9;margin:0}',
'.sw-legal{margin:26px 0 0;font-size:12px;line-height:1.6;color:var(--sw-dim);max-width:1100px}'
].join('');

if (CFG.hideSocialColumns) {
  css += '#footer .custom-footer__facebook,#footer .custom-footer__instagram{display:none!important}';
}

var st = document.createElement('style');
st.setAttribute('data-sw','header-footer');
st.textContent = css;
document.head.appendChild(st);

function el(tag, cls, html){
  var e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  return e;
}
function footerHasLink(href){
  var f = document.getElementById('footer');
  return f ? !!f.querySelector('a[href="' + href + '"]') : false;
}

var TBI = {
  cash:  '<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 9.5v5M18 9.5v5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  truck: '<path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  tel:   '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  user:  '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.4-6 8-6s6.5 2 8 6"/>',
  cart:  '<path d="M3 4h2.5l2.2 11h10.6L20.5 8H7"/><circle cx="9.5" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/>'
};
function ic(k, cls){ return '<svg class="' + cls + '" viewBox="0 0 24 24" aria-hidden="true">' + TBI[k] + '</svg>'; }

function topbar(){
  if (document.querySelector('.sw-topbar')) return;
  var h = document.getElementById('header');
  if (!h || !h.parentNode) return;
  /* Texty sú tie isté overené tvrdenia, ktoré boli doteraz v pruhu pod heroom
     (benefit bannery v admine): dobierka, doručenie do 2 dní, doprava nad 40 €. */
  /* klient 20. 10.: k číslu aj hodiny, kedy linka funguje */
  var right = CFG.tel
    ? '<a class="sw-topbar__right" href="' + CFG.telHref + '">' + ic('tel','sw-tb-ic') + CFG.tel +
      (CFG.hours ? '<span class="sw-tb-hours">' + CFG.hours + '</span>' : '') + '</a>' : '';
  h.parentNode.insertBefore(
    el('div','sw-topbar','<div class="sw-topbar__in"><div class="sw-tb-usp">' +
    '<span class="sw-tb-cod">' + ic('cash','sw-tb-ic') + 'Dobierka</span>' +
    '<span>' + ic('clock','sw-tb-ic') + 'Doručenie do 2 dní</span>' +
    '<span>' + ic('truck','sw-tb-ic') + 'Doprava nad 40 € zadarmo</span></div>' + right + '</div>'),
    h);
}

/* Placeholder prepisuje Luigi's Box pri svojej inicializácii, preto sa nastavuje
   opakovane. Overené: po LB inite už hodnota drží. */
function search(){
  var inputs = document.querySelectorAll('.search-input, #searchInput');
  inputs.forEach(function(i){
    function set(){ if (i.getAttribute('placeholder') !== CFG.searchPh) i.setAttribute('placeholder', CFG.searchPh); }
    set();
    if (i.getAttribute('data-sw-ph')) return;
    i.setAttribute('data-sw-ph','1');
    [300, 900, 2000, 3500].forEach(function(d){ setTimeout(set, d); });
  });
  var btn = document.querySelector('#header .search-form .search-button');
  if (btn && !btn.querySelector('svg')) {
    btn.setAttribute('aria-label','Hľadať');
    btn.innerHTML = '<i class="icon-search" aria-hidden="true"></i>';
  }
}

function actions(){
  function lbl(sel, text){
    var e = document.querySelector(sel);
    if (!e || e.querySelector('.sw-lbl')) return;
    var s = document.createElement('span');
    s.className = 'sw-lbl';
    s.textContent = text;
    e.appendChild(s);
  }
  lbl('#header .navigation-buttons .top-nav-button-login', CFG.lblAccount);
  lbl('#header .navigation-buttons .cart-count', CFG.lblCart);
  /* obrysové ikony pred popisok; počítadlo košíka (<i>) téma prekresľuje sama */
  [['#header .navigation-buttons .top-nav-button-login','user'],['#header .navigation-buttons .cart-count','cart']]
    .forEach(function(x){
      var e = document.querySelector(x[0]);
      if (!e || e.querySelector('.sw-hic')) return;
      e.insertAdjacentHTML('afterbegin', ic(x[1], 'sw-hic'));
    });

  /* Odznak s počtom nevytvárame — téma ho vykresľuje ako <i> v .cart-count
     a sama ho aktualizuje. Len sa štýluje v CSS vyššie. */
}

function colSilwer(){
  if (document.querySelector('.sw-col-silwer')) return;
  var row = document.querySelector('#footer .row.custom-footer');
  if (!row) return;
  var items = CFG.colSilwer.filter(function(p){ return !footerHasLink(p[1]); });
  if (!items.length) return;
  var li = items.map(function(p){ return '<li><a href="' + p[1] + '">' + p[0] + '</a></li>'; }).join('');
  var col = el('div','sw-col-silwer col-sm-6 col-lg-3',
    '<h3 class="pageElement__heading">Silwer</h3><ul>' + li + '</ul>');
  /* umiestniť priamo v DOM — CSS `order` rozhadzuje auto-placement mriežky */
  var art = row.querySelector('.custom-footer__articles');
  if (art) row.insertBefore(col, art.nextElementSibling); else row.appendChild(col);
}

function trust(){
  if (!CFG.trustRows || document.querySelector('.sw-trust')) return;
  var box = document.querySelector('#footer .custom-footer__contact');
  if (!box) return;
  box.appendChild(el('ul','sw-trust',
    '<li>✓ ' + CFG.freeShip + '</li><li>✓ 60-dňová garancia vrátenia peňazí</li>' +
    '<li>✓ Vyrobené v EÚ podľa GMP</li>'));
}
function legal(){
  if (!CFG.legalNote || document.querySelector('.sw-legal')) return;
  var c = document.querySelector('#footer .footer-rows');
  if (!c) return;
  c.appendChild(el('p','sw-legal',
    'Výživové doplnky nie sú náhradou pestrej a vyváženej stravy a zdravého životného štýlu. ' +
    'Neprekračujte odporúčanú dennú dávku. Ukladajte mimo dosahu malých detí.'));
}

/* Prvý stĺpec pätičky: logo a uistenia. Len overené vety — doprava zadarmo
   (topbar, cartInfo) a zákaznícka linka. Garancia a EÚ výroba len s CFG.trustRows. */
function brand(){
  var row = document.querySelector('#footer .row.custom-footer');
  if (!row || row.querySelector('.sw-fbrand')) return;
  var logo = document.querySelector('#header .site-name img');
  var rows = ['<li><i class="icon-van" aria-hidden="true"></i><span>' + CFG.freeShip + '</span></li>',
    /* množstevné zľavy (feedback 7. 10.) — overené: −20 % od 3 ks, −30 % od 6 ks
       v tabuľke Množstevná zľava pri produktoch */
    '<li><i class="icon-discount" aria-hidden="true"></i><span><b>−20 %</b> zľava pri nákupe od 3 produktov</span></li>',
    '<li><i class="icon-discount" aria-hidden="true"></i><span><b>−30 %</b> zľava pri nákupe od 6 produktov</span></li>'];
  if (CFG.trustRows) {
    rows.push('<li><i class="icon-tick" aria-hidden="true"></i><span>60-dňová garancia vrátenia peňazí</span></li>');
    rows.push('<li><i class="icon-tick" aria-hidden="true"></i><span>Vyrobené a testované v EÚ</span></li>');
  }
  if (CFG.tel) rows.push('<li><i class="icon-phone" aria-hidden="true"></i><span>Zákaznícka linka ' +
    '<a href="' + CFG.telHref + '">' + CFG.tel + '</a>' + (CFG.hours ? '<span class="sw-fbrand__h">' + CFG.hours + '</span>' : '') + '</span></li>');
  var col = el('div', 'sw-fbrand',
    (logo ? '<img class="sw-fbrand__logo" src="' + logo.src + '" alt="Silwer">' : '') + '<ul>' + rows.join('') + '</ul>');
  row.insertBefore(col, row.firstChild);
}

/* Logo ADC v rade platieb a dopravcov, odkaz na produkty Silwer v databáze ADC
   (klient 20. 10.: „máme tam zalistované produkty"). Logo je wordmark z adc.sk
   (safari-pinned-tab.svg bez čierneho štvorca), vložený ako data URI, nič sa nenahráva. */
var ADC_URL = 'https://www.adc.sk/hladaj?q=silwer&nai=&w=&x=&p=';
var ADC_LOGO = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjcwIDQxMCAxMDAwIDMxMCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwxMTM4KSBzY2FsZSgwLjEsLTAuMSkiIGZpbGw9IiMwMDAiPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTI2OTggNzA5NSBjMTQyIC00NSAyNDIgLTEyOCAzMzkgLTI4NCA1OCAtOTEgMzMwIC02NzggOTA1IC0xOTUxIDE0MyAtMzE2IDI2MiAtNTgxIDI2NSAtNTg3IDQgLTEwIC03MiAtMTMgLTM2MCAtMTMgbC0zNjUgMCAtNDkgMTEyIGMtMjYgNjEgLTc4IDE3OSAtMTE0IDI2MiBsLTY1IDE1MSAtNzYxIDMgLTc2MCAyIC0xMTQgLTI2NSAtMTE0IC0yNjUgLTM2OSAwIGMtMjkwIDAgLTM2NyAzIC0zNjMgMTMgNyAxNyAzNTIgNzgyIDUyNCAxMTYyIDIxNiA0NzUgNTUwIDExOTkgNTk2IDEyOTAgOTkgMTk5IDIyMyAzMjIgMzczIDM3MCAxMzEgNDIgMjk4IDQyIDQzMiAweiBtMzc1MiAtMTAgYzI2MSAtNDMgNDg4IC0xNTkgNjcxIC0zNDUgMTkxIC0xOTQgMzE4IC00NDggMzgxIC03NjIgMzIgLTE2MSAzMiAtNDE1IDAgLTU3NiAtNjMgLTMxNCAtMTkwIC01NjggLTM4MSAtNzYyIC0xODMgLTE4NiAtNDEwIC0zMDIgLTY3MSAtMzQ1IC0xMzYgLTIyIC0xNzE2IC0yMiAtMTc5OSAwIC0xMzAgMzQgLTIzNyAxMjAgLTI4NyAyMjkgLTU0IDExOCAtNTQgMTEyIC01NCAxMTY2IDAgMTA1NCAwIDEwNDggNTQgMTE2NiA0OSAxMDcgMTU3IDE5NCAyODMgMjI5IDc3IDIxIDE2NzIgMjEgMTgwMyAweiBtNDE1MCAtMjM5IGwwIC0yNTUgLTY0NyAtNCBjLTcxNyAtNCAtNzE3IC00IC05MjAgLTcyIC0zNTEgLTExNyAtNTgwIC0zNTAgLTY0OCAtNjU5IC0yNCAtMTA2IC0xNyAtMjgxIDE1IC0zODEgMTA4IC0zNDEgNDAzIC01NjkgODU3IC02NjIgNjUgLTEzIDE4MSAtMTYgNzExIC0yMCBsNjMyIC00IDAgLTI1NSAwIC0yNTUgLTgzNyA0IGMtODI3IDMgLTgzOSAzIC05MzggMjYgLTMwNSA2OSAtNTExIDE3NyAtNzA2IDM3MSAtMTk3IDE5NyAtMzE4IDQyMiAtMzgxIDcxMyAtMzAgMTM2IC0zMiA0NDQgLTUgNTgwIDEyMSA2MDQgNTUxIDEwMTggMTE1MiAxMTExIDcxIDExIDI2MyAxNCA5MDMgMTUgbDgxMiAxIDAgLTI1NHoiLz48L2c+PC9zdmc+';
function adc(){
  var row = document.querySelector('#footer .footer-icons');
  if (!row || row.querySelector('.sw-adc')) return;
  var a = el('a', 'footer-icon sw-adc', '<img src="' + ADC_LOGO + '" alt="ADC" width="60" height="19">');
  a.href = ADC_URL; a.target = '_blank'; a.rel = 'noopener';
  a.title = 'Produkty Silwer v databáze ADC';
  row.appendChild(a);
}

function init(){ topbar(); search(); actions(); colSilwer(); brand(); trust(); legal(); adc(); }
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
document.addEventListener('ShoptetDOMPageContentLoaded', init);
document.addEventListener('ShoptetDOMCartContentLoaded', actions);  /* prekresli odznak po zmene košíka */
})();

/* ============================================================
   SUB-NAVBAR — druhý riadok menu + mega dropdown
   ------------------------------------------------------------
   Prečo sa pôvodné ploché menu nahrádza:
   13 položiek sa nezmestí. Overené na 1024 aj 1280 px — menu je
   orezané zľava („AMÍNY" namiesto „VITAMÍNY") a od „SUPER ZĽAVY"
   ďalej spadne pod hamburger. Sticky pruh „OVERENÉ ZÁKAZNÍKMI"
   navyše prekrýva ľavý okraj.

   Žiadny odkaz sa nestráca — presúvajú sa do dropdownov.
   Na mobile (<768 px) sa TENTO nav skrýva a necháva sa pôvodné
   Shoptet menu v hamburgeri.
   ============================================================ */
(function(){'use strict';

var TEL = '+421 904 707 010', TEL_HREF = 'tel:+421904707010';

/* Kategórie — všetky URL overené proti sitemape, všetky vracajú 200.
   POZOR na duplicity v katalógu: existuje aj /klby-kosti-chrupavky/,
   /dobry-spanok/, /pecen/, /zdrava-pecen/, /vlasy-nechty-pokozka/,
   /zdrave-vlasy/, /dlhovekost-3/. Nižšie je vždy len jedna z nich —
   ktorá je tá „hlavná" s produktmi, treba potvrdiť s Martinom. */
var CATS = [
  ['Kosti a kĺby',       '/kosti-a-klby/',           '#2E9E8F', 'Vápnik, kolagén, D3+K2',        'kosti'],
  ['Spánok a pokoj',     '/spanok/',                 '#7C6BC4', 'Melatonín, magnézium, ashwagandha', 'spanok'],
  ['Srdce a cievy',      '/srdce-a-cievny-system/',  '#E05038', 'Omega-3, koenzým Q10, rutín',                         'srdce'],
  ['Pamäť a mozog',      '/mozog/',                  '#3F7DC4', 'DHA, B-komplex, hericium',      'mozog'],
  ['Imunita',            '/na-imunitu/',             '#D9A521', 'C, D3, zinok a selén na celý rok',                    'imunita'],
  ['Energia a vitalita', '/nalada-a-energia/',       '#5FA24C', 'Magnéziá, multivitamíny 50+',           'energia'],
  ['Trávenie a pečeň',   '/travenie/',               '#C96BA0', 'Probiotiká, silymarín, laktáza',                      'travenie'],
  ['Zrak',               '/zrak/',                   '#9A9E2E', 'Luteín, zeaxantín a omega-3',                         'zrak']
];
var EXTRA = [
  ['Dlhovekosť','/longevity/'], ['Hormóny','/hormony/'], ['Stres','/proti-stresu/'],
  ['Svaly','/svaly/'], ['Pokožka, vlasy a nechty','/pokozku--vlasy-a-nechty/']
];
var PRODUKTY = [
  ['Vitamíny','/vitaminy/'], ['Minerály','/mineraly/'], ['Výživové doplnky','/vyzivove-doplnky/'],
  ['Všetky produkty','/vsetky/'], ['Minitablety','/minitablety/'], ['NOVINKY 2026','/novinky/'],
  ['Silwer JOJ play','/joj_play/']
];
var PREKOHO = [['Pre ženy','/pre-zeny/'], ['Pre mužov','/pre-muzov/'], ['Pre všetkých','/vsetky/']];
var MENU = [['Superzľavy','/super-zlavy/'], ['Silwer Gold','/gold/'], ['Silwer JOJ Play','/joj_play/'],
  ['Zaujímavosti','/blog/', [['Blog','/blog/']]], ['O nás','/onas/']];
/* zoznamy berie zo silwer-redesign.js, aby menu na desktope aj mobile bolo jedno */
if (window.SW) { if (SW.PREKOHO) PREKOHO = SW.PREKOHO; if (SW.PRODUKTY) PRODUKTY = SW.PRODUKTY; if (SW.MENU) MENU = SW.MENU; }


/* Shoptet icon font (74 ikon) nemá kosť, mozog ani oko — tieto sú vlastné SVG.
   Ikony z fontu sa používajú tam, kde existujú: icon-van, icon-phone, icon-search. */
var I = {
  kosti:   '<path d="M7 7a2.5 2.5 0 1 1 3.2 2.4l4.4 4.4A2.5 2.5 0 1 1 17 17a2.5 2.5 0 0 1-2.4-3.2l-4.4-4.4A2.5 2.5 0 0 1 7 7z"/>',
  spanok:  '<path d="M20 13.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5z"/>',
  srdce:   '<path d="M12 20s-7-4.5-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7-.8c0 4.7-7 12.8-7 12.8z"/>',
  mozog:   '<path d="M12 5v14M9 5a3 3 0 0 0-3 3 2.5 2.5 0 0 0-1 4.5A3 3 0 0 0 8 18a3 3 0 0 0 4 1M15 5a3 3 0 0 1 3 3 2.5 2.5 0 0 1 1 4.5A3 3 0 0 1 16 18a3 3 0 0 1-4 1"/>',
  imunita: '<path d="M12 4l7 3v5c0 4-3 6.6-7 8-4-1.4-7-4-7-8V7l7-3z"/>',
  energia: '<path d="M13 3L5 13h5l-1 8 8-10h-5l1-8z"/>',
  travenie:'<path d="M9 5v5a4 4 0 0 0 4 4h1a3 3 0 0 1 0 6h-1"/><path d="M6 5h5"/>',
  zrak:    '<path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6z"/><circle cx="12" cy="12" r="2.6"/>'
};

var css = [
'.sw-nav{background:#fff;border-top:1px solid #E5E3DE;border-bottom:1px solid #E5E3DE;position:relative;z-index:60}',
/* rovnaký okraj ako obsah (--sw-gut zo silwer-redesign.js), pri 1024 px
   bol 20 px a prvú položku prekrýval bočný odznak „Overené zákazníkmi" */
'.sw-nav__in{position:relative;max-width:calc(1200px + 2*var(--sw-gut,20px));margin:0 auto;padding:0 var(--sw-gut,20px);',
'box-sizing:border-box;display:flex;align-items:center;gap:34px}',
'.sw-nav__item{position:relative}',
/* mega dropdown musí byť pozicovaný voči lište, nie voči položke */
'.sw-nav__item--mega{position:static}',
/* všetko verzálkami (feedback 7. 10.) */
'.sw-nav__link{display:inline-flex;align-items:center;gap:6px;padding:15px 0;font-size:13.5px;font-weight:700;',
'letter-spacing:.04em;text-transform:uppercase;',
'color:#0B0B0C;text-decoration:none;background:none;border:0;cursor:pointer;font-family:inherit;white-space:nowrap}',
'.sw-nav__link:hover,.sw-nav__item.is-open .sw-nav__link{color:#D40000;text-decoration:none}',
'.sw-nav__chev{transition:transform .18s}',
'.sw-nav__item.is-open .sw-nav__chev{transform:rotate(180deg)}',
'.sw-nav__tel{margin-left:auto;display:inline-flex;align-items:center;gap:9px;padding:10px 18px;',
'background:#F5F4F1;border-radius:10px;font-weight:700;font-size:15px;color:#0B0B0C;',
'text-decoration:none;white-space:nowrap}',
'.sw-nav__tel:hover{background:#EAE8E3;color:#0B0B0C;text-decoration:none}',
'.sw-dd{position:absolute;top:100%;left:0;background:#fff;border:1px solid #E5E3DE;border-radius:14px;',
'box-shadow:0 18px 44px -18px rgba(11,11,12,.3);padding:22px;display:none;z-index:70;',
/* hlavička je sticky, menu sa s ňou nehýbe: pri okne s výškou 720 px bol spodný rad
   mega menu (Zrak, Menopauza, Testosterón, Pleť) pod okrajom a nedalo sa k nemu dostať.
   Výška podľa okna (162 px je vrch menu pod hlavičkou) a posun vnútri menu. */
'max-height:calc(100vh - 180px);overflow-y:auto;overscroll-behavior:contain}',
'.sw-nav__item.is-open .sw-dd{display:block}',
'.sw-dd--mega{left:0;right:0;width:auto}',
/* klient 20. 10.: odznak „Google Recenzie" (doplnok 1014, ShopStack, .gr .p, fixed vľavo dole,
   z-index 2147482999) prekrýval spodný rad menu. Kým je menu otvorené, odznak sa schová. */
'body:has(.sw-nav__item.is-open .sw-dd) .gr .p{opacity:0!important;visibility:hidden!important;pointer-events:none!important}',
'.sw-dd--list{min-width:250px}',
'.sw-dd--list ul{list-style:none;margin:0;padding:0}',
'.sw-dd--list a{display:block;padding:9px 10px;border-radius:8px;font-size:15px;font-weight:600;',
'color:#1A1A1C;text-decoration:none}',
'.sw-dd--list a:hover{background:#F5F4F1;text-decoration:none}',
'.sw-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}',
'.sw-card{display:block;padding:18px;border:1px solid #E5E3DE;border-radius:12px;text-decoration:none;',
'background:#fff;transition:border-color .15s,box-shadow .15s}',
'.sw-card:hover{border-color:#0B0B0C;box-shadow:0 10px 26px -16px rgba(11,11,12,.35);text-decoration:none}',
'.sw-card__ic{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;',
'justify-content:center;margin-bottom:14px}',
'.sw-card__ic svg{width:23px;height:23px;stroke:#fff;fill:none;stroke-width:1.9;',
'stroke-linecap:round;stroke-linejoin:round}',
'.sw-card__t{display:block;font-size:15px;font-weight:700;color:#0B0B0C;margin-bottom:6px}',
'.sw-card__d{display:block;font-size:13px;line-height:1.45;color:#55555A}',
'.sw-extra{margin-top:18px;padding-top:16px;border-top:1px solid #E5E3DE;font-size:14px;color:#55555A}',
'.sw-extra a{color:#0B0B0C;font-weight:700;text-decoration:underline;text-underline-offset:3px}',
'.sw-extra span{margin:0 7px;color:#B9B6AF}',
'@media(max-width:1100px){.sw-cards{grid-template-columns:repeat(2,1fr)}}',
/* pod 768 px zostáva pôvodné Shoptet menu v hamburgeri */
/* telefónne CTA sa pod 1100 px nezmestí vedľa piatich položiek — preteká
   mimo obrazovku. Číslo je aj v top pruhu, takže sa tu len skryje. */
'@media(max-width:1100px){.sw-nav__tel{display:none}}',
'@media(max-width:1199px){.sw-nav__in{gap:22px}.sw-nav__link{font-size:12.5px;letter-spacing:.03em}}',
'@media(max-width:991px){.sw-nav__in{gap:15px}.sw-nav__link{font-size:11.5px;letter-spacing:.02em}.sw-nav__chev{width:10px}}',
/* „Zaujímavosti" so šípkou je dlhšie než „Blog": pri 768 px menu pretieklo o 30 px */
'@media(max-width:860px){.sw-nav__in{gap:10px}.sw-nav__link{font-size:11px;letter-spacing:.01em;gap:4px}}',
'@media(max-width:767px){.sw-nav{display:none}}',
'@media(min-width:768px){#header .header-bottom{display:none!important}}'
].join('');

var st = document.createElement('style');
st.setAttribute('data-sw','subnav');
st.textContent = css;
document.head.appendChild(st);

function svg(k){ return '<svg viewBox="0 0 24 24" aria-hidden="true">' + I[k] + '</svg>'; }
var CHEV = '<svg class="sw-nav__chev" width="12" height="12" viewBox="0 0 24 24" fill="none" ' +
  'stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M5 9l7 7 7-7"/></svg>';

function listDD(arr){
  return '<div class="sw-dd sw-dd--list"><ul>' +
    arr.map(function(a){ return '<li><a href="' + a[1] + '">' + a[0] + '</a></li>'; }).join('') +
    '</ul></div>';
}

function build(){
  if (document.querySelector('.sw-nav')) return;
  var anchor = document.querySelector('#header .header-bottom') || document.getElementById('header');
  if (!anchor || !anchor.parentNode) return;

  /* Karty potrieb sa berú zo spoločného komponentu v silwer-redesign.js
     (fotka produktu ako stmavené pozadie). Ak by ten súbor nebol načítaný,
     použije sa pôvodná plochá verzia nižšie. */
  var mega;
  if (window.SW && typeof window.SW.megaMenu === 'function') {
    mega = window.SW.megaMenu();
  } else {
    mega = '<div class="sw-cards">' + CATS.map(function (c) {
        return '<a class="sw-card" href="' + c[1] + '">' +
          '<span class="sw-card__ic" style="background:' + c[2] + '">' + svg(c[4]) + '</span>' +
          '<span class="sw-card__t">' + c[0] + '</span>' +
          '<span class="sw-card__d">' + c[3] + '</span></a>';
      }).join('') + '</div><div class="sw-extra">Ďalšie potreby: ' +
      EXTRA.map(function (e) { return '<a href="' + e[1] + '">' + e[0] + '</a>'; }).join('<span>·</span>') +
      '</div>';
  }

  var nav = document.createElement('div');
  nav.className = 'sw-nav';
  nav.innerHTML = '<div class="sw-nav__in">' +
    '<div class="sw-nav__item sw-nav__item--mega" data-dd>' +
      '<button class="sw-nav__link" type="button" aria-expanded="false">Hľadám niečo na ' + CHEV + '</button>' +
      '<div class="sw-dd sw-dd--mega">' + mega + '</div></div>' +
    '<div class="sw-nav__item" data-dd>' +
      '<button class="sw-nav__link" type="button" aria-expanded="false">Pre koho ' + CHEV + '</button>' +
      listDD(PREKOHO) + '</div>' +
    '<div class="sw-nav__item" data-dd>' +
      '<button class="sw-nav__link" type="button" aria-expanded="false">Produkty ' + CHEV + '</button>' +
      listDD(PRODUKTY) + '</div>' +
    /* Superzľavy, Silwer Gold, JOJ Play, O nás doplnené podľa feedbacku 7. 10.
       „Výhodné balenia" boli len dočasný odkaz na /super-zlavy/ — teraz je to
       priamo Superzľavy. Telefón je v top pruhu, tu by sa menu nezmestilo. */
    /* položka s tretím prvkom má podmenu (Zaujímavosti: Blog, Pán doktor) */
    MENU.map(function(m){
      return m[2] ? '<div class="sw-nav__item" data-dd><button class="sw-nav__link" type="button" aria-expanded="false">' +
          m[0] + ' ' + CHEV + '</button>' + listDD(m[2]) + '</div>'
        : '<div class="sw-nav__item"><a class="sw-nav__link" href="' + m[1] + '">' + m[0] + '</a></div>';
    }).join('') +
    '</div>';
  anchor.parentNode.insertBefore(nav, anchor.nextSibling);

  var items = nav.querySelectorAll('[data-dd]');
  function closeAll(){
    items.forEach(function(x){
      x.classList.remove('is-open');
      var b = x.querySelector('.sw-nav__link');
      if (b) b.setAttribute('aria-expanded','false');
    });
  }
  items.forEach(function(it){
    var btn = it.querySelector('.sw-nav__link');
    btn.addEventListener('click', function(e){
      e.preventDefault();
      var open = it.classList.contains('is-open');
      closeAll();
      if (!open) { it.classList.add('is-open'); btn.setAttribute('aria-expanded','true'); }
    });
    it.addEventListener('mouseenter', function(){ closeAll(); it.classList.add('is-open'); btn.setAttribute('aria-expanded','true'); });
    it.addEventListener('mouseleave', function(){ it.classList.remove('is-open'); btn.setAttribute('aria-expanded','false'); });
  });
  document.addEventListener('click', function(e){ if (!nav.contains(e.target)) closeAll(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeAll(); });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
else build();
document.addEventListener('ShoptetDOMPageContentLoaded', build);
})();
