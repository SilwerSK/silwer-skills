/* ============================================================================
   Silwer.sk — kompletný redizajn  (v1, 2026-08-29)
   ----------------------------------------------------------------------------
   Jeden súbor, CSS si injektuje sám. Do Zápätia ide jediný riadok.
   Moduly sa spúšťajú podľa typu stránky (body class).

   ZÁSADA: nič sa nevymýšľa. Každý text a číslo pochádza buď zo živého DOM,
   z overenej URL, alebo z CFG, ktoré musí vyplniť klient. Bloky bez podkladov
   sú vypnuté a označené — radšej nezobraziť než vymyslieť.
   ========================================================================== */
(function () {
  'use strict';

  /* ===== KONFIGURÁCIA ===================================================== */
  var KODY = 'https://cdn.myshoptet.com/usr/www.silwer.sk/user/documents/upload/KODY/';
  /* obrázky redizajnu sú v bežnom priečinku s obrázkami e-shopu (Správce
     souborů » obrazky), nie medzi kódmi. Iný priečinok = zmeniť len tento riadok. */
  var ASSETS = /^(localhost|127\.0\.0\.1)$/.test(location.hostname)
    ? '/__sw-assets/'          /* lokálne: redesign/assets cez dev/http-bridge.js */
    : 'https://cdn.myshoptet.com/usr/www.silwer.sk/user/documents/upload/obrazky/';
  /* videá k ostatným videám e-shopu (Správce souborů » videa) */
  var VIDEA = /^(localhost|127\.0\.0\.1)$/.test(location.hostname)
    ? '/__sw-assets/'
    : 'https://cdn.myshoptet.com/usr/www.silwer.sk/user/documents/upload/videa/';
  var CFG = {
    tel:      '+421 904 707 010',
    telHref:  'tel:+421904707010',
    hours:    'Po – Pia 9:00 – 16:00',   /* potvrdené klientom 20. 10. (Komentáre 5) */
    email:    'info@silwer.sk',
    freeShip: 40,            /* € — zhoduje sa s cartInfo.freeShippingFrom */
    fonts:    false,         /* true, až keď budú súbory Museo Sans v KODY/fonts/ (dodá klient) */
    searchPh: 'Čo Vás trápi? napr. spánok, kĺby, únava…',

    /* Bloky, ktoré potrebujú podklady od klienta. Zapnúť až keď budú. */
    heroPhoto:   true,       /* fotka páru z návrhu (rozhodnutie Jana 25. 9.).
                                Brand Book žiada plnofarebnú fotku bez desaturácie,
                                táto je čiernobiela — na výmenu, keď príde nová.
                                false = brandová kompozícia produkt + kruh. */
    guarantee:   false,      /* „60-dňová garancia" — nepotvrdené */
    gmpClaim:    false,      /* „Vyrobené v EÚ podľa GMP" — nepotvrdené */
    customers:   '',         /* napr. „35 000+ spokojných zákazníkov" */
    legalNote:   false,      /* EFSA disclaimer — znenie na schválenie */
    /* „Prečo Silwer" a „Kto stojí za Silwerom" — od 15. 10. len fakty zo stránky
       /onas/ (Jan): výrobcovia, vlastná kontrola, zakladatelia. Nič vymyslené. */
    whyBlock:    true,
    teamBlock:   true,
    trustBand:   false,      /* pás dôvery na detaile produktu — tie isté nepotvrdené tvrdenia */
    /* Stránka so sprievodcom: Vzhled a obsah » Stránky » „Sprievodca",
       v obsahu je <div id="sw-sprievodca"></div>. Overené na živom webe
       30. 9. 2026 (200). Staré ?sprievodca=1 na ňu presmeruje. */
    guideUrl:    '/sprievodca/',
    /* Nákupná asistentka Silwa: slajd v hero, blok pomoci na úvodnej stránke a
       v prázdnom košíku, banner v kategóriách a stránka /sprievodca/. Klient 22. 10.
       (Iveta, mail): vypnúť úplne, s touto verziou nie sú stotožnení a pripravia
       vlastnú. Kód ostáva, true ju vráti na všetky miesta naraz. */
    assistant:   false,

    /* Grafika, ktorú dodá klient (feedback 7. 10.). Kým tu je prázdno,
       ukazuje sa dočasná verzia (ikona, text). Stačí doplniť URL obrázka. */
    needImg:  {},            /* { chudnutie: 'https://…/chudnutie.png', … } piktogramy oblastí */
    silwaImg: '',            /* postavička nákupnej asistentky Silwy */
    /* Social proof pás pod médiami (Jaro, 9. 10.: „ugc videá — zákazníčky,
       lekári zo série Pán doktor, čo vy na to?, zakladateľ a iné").
       Výber z 40 reels na FB stránke Silwer.sk (scrape 9. 10.), texty z ich popisov.
       Muž v bielych okuliaroch je Martin Marko, zakladateľ (titulok priamo vo videách
       série Pán doktor). Reel 879420307942060 ukazuje niekoho iného, preto bez mena.
       Karta hrá potichu 12 s ukážku (videa/ugc-<fb>.mp4, video: true, plagát
       obrazky/ugc-<fb>.jpg); celé video sa po kliknutí prehrá v okne na webe (26. 10.).
       Keď Silwer v tabuľke videí označí niečo na úvod, tento zoznam sa neukazuje.
       Všetkých 8 kariet má vlastné súbory. Tri karty brali náhľad z FB CDN, ktorého
       dočasný odkaz okolo 13. 10. vypršal a boli čierne (Ján 22. 10.); ukážky sú
       z tých istých reels (540×960, 30 fps, bez zvuku, plagát = prvý snímok). */
    ugc: [
      { fb: '1401966422134449', video: true, poster: ASSETS + 'ugc-1401966422134449.jpg', tag: 'Pán doktor, čo vy na to?', t: 'Je berberín prírodný Ozempic?', views: '1,2 tis.' },
      { fb: '879420307942060', video: true, poster: ASSETS + 'ugc-879420307942060.jpg', tag: 'Silwer.sk', t: 'Doplnky vyskladané pre problémy po päťdesiatke', views: '5,6 tis.' },
      { fb: '835722055845575', video: true, poster: ASSETS + 'ugc-835722055845575.jpg', tag: 'Krasokorčuliar', t: 'Adam Hagara a vianočné darčeky pre blízkych', views: '98 tis.' },
      { fb: '1588977229378626', video: true, poster: ASSETS + 'ugc-1588977229378626.jpg', tag: 'Pán doktor, čo vy na to?', t: '5 rád, ako bojovať s obezitou po 50-ke', views: '1,5 tis.' },
      { fb: '1543675884236725', video: true, poster: ASSETS + 'ugc-1543675884236725.jpg', tag: 'Silwerovci', t: 'Aj v osemdesiatke sa dá žiť naplno', views: '25 tis.' },
      { fb: '1023477134012259', video: true, poster: ASSETS + 'ugc-1023477134012259.jpg', tag: 'Pán doktor, čo vy na to?', t: 'Sú črevá naozaj druhý mozog?', views: '713' },
      { fb: '1363383261896138', video: true, poster: ASSETS + 'ugc-1363383261896138.jpg', tag: 'Zakladateľ Martin Marko', t: 'Ako si vyskladať balíček na mieru', views: '140 tis.' },
      { fb: '1075691591470794', video: true, poster: ASSETS + 'ugc-1075691591470794.jpg', tag: 'Silwer sa pýta', t: 'Na koľko rokov sa cítite?', views: '612' }
    ],
    /* HERO carousel — poradie a ciele podľa feedbacku. img = grafika slajdu
       (zatiaľ dočasné obrázky z e-shopu, bez img sa skladá produkt na kruhu). */
    heroSlides: [
      /* Návrhy nového hera od klienta (8. 10.) — na posúdenie, preto prvé.
         layout 'panel' = fotka cez celú šírku a tmavý panel s textom vľavo,
         ako v ich mockupe. Lorem ipsum z mockupu nahradil text hlavného slajdu.
         Fotky: redesign/assets/hero-*.jpg → nahrať do priečinka obrazky. Kým tam nie sú,
         slajd sa nezobrazí (nie je rozbitý obrázok). */
      /* video: jemne animovaná fotka (klient 9. 10.), prekódované z HEVC do H.264
         a spravené ako slučka dopredu a späť; plagát = prvý snímok videa */
      { k: 'terasa', layout: 'panel', photo: ASSETS + 'hero-terasa-plagat.jpg', video: VIDEA + 'hero-terasa.mp4',
        pos: '62% center', posM: '76% center',
        btn: '#EAD7C6', hc: '#F4E7DB', rate: true,
        t: '<b>Dlhší a zdravší</b> <span class="sw-thin">život<br>po päťdesiatke</span>',
        p: 'Vitamíny, minerály a výživové doplnky optimalizované pre generáciu 50+. S jednotkovou cenou za tabletku, ktorá vás poteší.',
        cta: 'Výživové doplnky Silwer', href: '/vsetky/' },
      /* Druhé video od klienta NIE JE šedé štúdio z návrhu — je to pár na ružovom
         pozadí s produktmi JOJ. Video je posunuté doprava (vidL), aby pár nebol
         pod panelom. Šedé štúdio bez videa: photo ASSETS + 'hero-studio.jpg',
         bez video a vidL, pos '78% 35%'. */
      { k: 'studio', layout: 'panel', photo: ASSETS + 'hero-ruzova-plagat.jpg', video: VIDEA + 'hero-ruzova.mp4',
        vidL: '30%', pos: '60% center', posM: '62% center',
        btn: '#EBCFD3', hc: '#F7E8EA', rate: true,
        t: '<b>Dlhší a zdravší</b> <span class="sw-thin">život<br>po päťdesiatke</span>',
        p: 'Vitamíny, minerály a výživové doplnky optimalizované pre generáciu 50+. S jednotkovou cenou za tabletku, ktorá vás poteší.',
        cta: 'Výživové doplnky Silwer', href: '/vsetky/' },
      /* Grafiky hera od klienta (13. 10., priečinok „HERO obrazky"): všetky sú
         fotka cez celú šírku s tmavým panelom (rozhodnutie z 12. 10.).
         Videá idú do slučky od konečnej kompozície späť a znova dopredu, takže
         plagát (prvý snímok) je tá najlepšia. vidL posúva fotku doprava, aby
         hlavný motív nebol pod panelom. */
      { k: 'main', layout: 'panel', photo: ASSETS + 'hero-obyvacka.jpg',
        vidL: '34%', pos: '42% center', posM: '52% center',
        btn: '#E8D2B8', hc: '#F4E7DB',
        t: '<b>Cíťte sa a vyzerajte</b><br><span class="sw-thin">mladí aj po päťdesiatke</span>',
        p: 'Zdravie a kvalitu nášho života môžeme ovplyvniť v každom veku. Silwer vás pri tom bude sprevádzať zrozumiteľnými produktami aj radami.',
        cta: 'Všetky produkty', href: '/vsetky/' },
      /* grafika klienta 14. 10.: video tašky s produktmi. once = prehrá sa raz
         od začiatku pri každom zobrazení slajdu a zostane na poslednom snímku */
      { k: 'guide', layout: 'panel', photo: ASSETS + 'hero-silwa-plagat.jpg', video: VIDEA + 'hero-silwa.mp4', once: true,
        pos: '62% center', posM: '74% center',
        btn: '#B9AAEE', hc: '#FFFFFF', rate: true,
        t: '<b>Nákupná</b> <span class="sw-thin">asistentka</span>',
        p: 'Silwa Vám pomôže s výberom. Štyri otázky a uvidíte najviac dva produkty, nie celý katalóg.',
        cta: 'Pomôcť s výberom', href: '/sprievodca/' },
      { k: 'gold', layout: 'panel', photo: ASSETS + 'hero-gold-plagat.jpg', video: VIDEA + 'hero-gold.mp4',
        vidL: '46%', pos: '88% center', posM: '62% center',
        btn: '#E6CF9C', hc: '#F3E6C8',
        t: '<b>Silwer Gold</b>',
        p: 'Prémiová línia pre najnáročnejších.<br>Inovatívne zloženie, pokročilé technológie, efektívny účinok.',
        cta: 'Pozrieť Silwer Gold', href: '/gold/' },
      { k: 'joj', layout: 'panel', photo: ASSETS + 'hero-joj-plagat.jpg', video: VIDEA + 'hero-joj.mp4',
        vidL: '46%', pos: '55% center', posM: '40% center',
        btn: '#DCCBEF', hc: '#EFE6F8',
        t: '<b>Silwer JOJ play</b>',
        p: 'Produktová línia, ktorú poznáte z televízie JOJ.<br>Kľúčové účinné látky za výhodné ceny.',
        cta: 'Pozrieť JOJ play', href: '/joj_play/' },
      /* Chudnutie má od klienta aj video, ale kamera v ňom prejde cez celú šírku
         a ľudia by boli polovicu času pod panelom. Preto fotka. */
      { k: 'slim', layout: 'panel', photo: ASSETS + 'hero-chudnutie.jpg',
        vidL: '46%', pos: '97% center', posM: '86% center',
        /* tablet: výrez je takmer štvorec a traja ľudia sa doň pri plnej výške
           nezmestia. Fotka sa preto zmenší, nad ňou je farba steny a prechod
           medzi nimi zjemňuje gradient. {img} = fotka slajdu. */
        phT: 'linear-gradient(180deg,#DFD9D5 0,#DFD9D5 24%,rgba(223,217,213,0) 42%),{img} right bottom/auto 76% no-repeat #DFD9D5',
        btn: '#E9E6E1', hc: '#F4F2EE',
        t: '<b>Chudnutie</b><br><span class="sw-thin">s rozumom</span>',
        p: 'Prirodzené a šetrné výživové doplnky.<br>GLP-1 Probio Aktiv overený spotrebiteľským testom.',
        /* klient 28. 10.: tlačidlo vedie na kategóriu Chudnutie, nie na GLP-1 */
        cta: 'Pozrieť produkty', href: '/chudnutie/' },
      /* grafika klienta 14. 10.: video, z fľaše sa sypú tablety */
      { k: 'qty', layout: 'panel', photo: ASSETS + 'hero-zlavy-plagat.jpg', video: VIDEA + 'hero-zlavy.mp4', once: true,
        pos: '72% center', posM: '86% center',
        btn: '#FFFFFF', hc: '#FFFFFF', rate: true,
        t: '<span class="sw-thin">Čím viac,</span><br><b>tým lacnejšie</b>',
        p: '−20 % pri nákupe od 3 kusov<br>−30 % pri nákupe od 6 kusov',
        cta: 'Nakúpiť výhodne', href: '/vsetky/' }
    ]
  };

  /* Náhľad vypnutých blokov: zapne všetko, čo čaká na podklady (garancia,
     GMP, Prečo Silwer, tím, pás dôvery…), s označením „Náhľad".
     Zapnutý je automaticky v DEV režime: lokálne na localhoste a na produkcii
     pre každého, kto má dev kľúč (localStorage swDev, nastavuje ho ?dev=…
     v DEV GATE v Zápätí). Rozhodnutie Jana 30. 9.: kto testuje, má vidieť
     celý návrh. Zákazník bez kľúča nevidí nič z toho.
     ?swpreview=0 náhľad vypne aj v dev režime, ?swpreview=1 ho zapne aj bez neho.
     ⚠️ Po ostrom spustení bez DEV GATE ostane swDev v prehliadači Jara a Martina,
     takže oni budú náhľad vidieť ďalej — vypnú si ho cez ?devoff=1. */
  (function () {
    var m = location.search.match(/[?&]swpreview=([01])/);
    try {
      if (m) sessionStorage.setItem('swpreview', m[1]);
      /* kľúč je ten istý ako v DEV GATE v Zápätí (je verejný v HTML stránky) */
      var dev = /^(localhost|127\.0\.0\.1)$/.test(location.hostname) ||
        localStorage.getItem('swDev') === 'sw-fb5836991c61';
      var pv = sessionStorage.getItem('swpreview');
      if (pv === '1' || (dev && pv !== '0')) {
        CFG.guarantee = CFG.gmpClaim = CFG.legalNote = CFG.whyBlock = CFG.teamBlock = CFG.trustBand = true;
        CFG.preview = true;
      }
    } catch (e) {}
  })();

  /* Dáta zo živého e-shopu: forma (tab./kap.), počet v balení, množstevné
     zľavy a poradie produktov v kategóriách. Na webe sa obnovujú samé z endpointu
     (DATA_URL nižšie); tento blok je záloha, keby endpoint nefungoval. Generuje ho
     `node dev/gen-data.mjs` — NEPÍSAŤ RUČNE, prepíše sa. Spustiť pred nahratím súboru. */
  /* @@SW-DATA */
  var DATA = {"at":"2026-11-07","products":{"/vitamin-c-sipky/":{"n":"Vitamín C 500 mg + Šípky","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/65_vitamin-c-500-mg-sipky---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08d&sg=38cb01fe","f":"kap.","q":90,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/vitamin-c-2/","/na-imunitu/","/nalada-a-energia/","/pokozku--vlasy-a-nechty/","/pre-muzov/","/pre-zeny/"]},"/vitamin-c-zinok/":{"n":"Vitamín C + Zinok","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/68_vitamin-c-zinok---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08d&sg=38cb01fe","f":"tab.","q":120,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/mineraly/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/vitamin-c-2/","/na-imunitu/","/nalada-a-energia/","/pokozku--vlasy-a-nechty/","/pre-muzov/","/pre-zeny/","/zinok/"]},"/vitamin-d3-2-000-iu/":{"n":"Vitamín D3 2 000 IU","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/71_vitamin-d3-2-000-iu---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08d&sg=38cb01fe","f":"tab.","q":180,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/vitamin-d/","/na-imunitu/","/kosti-a-klby/","/svaly/","/pre-muzov/","/pre-zeny/"]},"/vitamin-b-komplex-forte/":{"n":"Vitamín B Komplex Forte","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/74_vitamin-b-komplex-forte---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08d&sg=38cb01fe","f":"tab.","q":360,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/vitamin-b/","/multivitaminy/","/na-imunitu/","/mozog/","/nalada-a-energia/","/srdce-a-cievny-system/","/proti-stresu/","/pre-muzov/","/pre-zeny/"]},"/vitamin-d3-k2-vapnik/":{"n":"Vitamín D3 + K2 + Vápnik","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/77_vitamin-d3-k2-vapnik---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08d&sg=38cb01fe","f":"tab.","q":90,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/mineraly/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/vitamin-d/","/vitamin-k/","/multivitaminy/","/na-imunitu/","/kosti-a-klby/","/srdce-a-cievny-system/","/svaly/","/menopauza/","/pre-muzov/","/pre-zeny/","/vapnik/"]},"/zinok-glukonat-25-mg/":{"n":"Zinok Forte 25 mg","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/80_zinok-forte-25-mg---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08d&sg=38cb01fe","f":"tab.","q":180,"t":[[3,0.8],[6,0.7]],"c":["/mineraly/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/na-imunitu/","/kosti-a-klby/","/pokozku--vlasy-a-nechty/","/svaly/","/testosteron-a-prostata/","/pre-muzov/","/pre-zeny/","/zinok/"]},"/vapnik-vitamin-d3/":{"n":"Vápnik + Vitamín D3","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/83_vapnik-vitamin-d3---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08d&sg=38cb01fe","f":"tab.","q":120,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/mineraly/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/vitamin-d/","/na-imunitu/","/kosti-a-klby/","/svaly/","/menopauza/","/pre-muzov/","/pre-zeny/","/vapnik/"]},"/magnezium-400-mg-forte/":{"n":"Magnézium 400 mg Forte","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/86_magnezium-400-mg-forte---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08d&sg=38cb01fe","f":"tab.","q":120,"t":[[3,0.8],[6,0.7]],"c":["/mineraly/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/kosti-a-klby/","/mozog/","/nalada-a-energia/","/proti-stresu/","/svaly/","/pre-muzov/","/pre-zeny/","/magnezium/"]},"/magnezium-citrat-forte/":{"n":"Magnézium + B6 Forte","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/89_magnezium-b6-forte---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08d&sg=38cb01fe","f":"tab.","q":60,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/mineraly/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/vitamin-b/","/kosti-a-klby/","/mozog/","/nalada-a-energia/","/proti-stresu/","/svaly/","/pre-muzov/","/pre-zeny/","/magnezium/"]},"/bcaa-rychlo-rozpustne/":{"n":"BCAA Rýchlo rozpustné 2:1:1","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/95_bcaa-rychlo-rozpustne-2-1-1---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08d&sg=38cb01fe","f":"g","q":300,"t":[[3,0.8],[6,0.7]],"c":["/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/na-imunitu/","/kosti-a-klby/","/nalada-a-energia/","/svaly/","/pre-muzov/","/pre-zeny/"]},"/nmn-senior/":{"n":"NMN Senior","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/98_nmn-senior---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08d&sg=38cb01fe","f":"kap.","q":60,"t":[[3,0.8],[6,0.7]],"c":["/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/dlhovekost-3/","/nalada-a-energia/","/srdce-a-cievny-system/","/pre-muzov/","/pre-zeny/"]},"/tribulus-50-/":{"n":"Tribulus 50+","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/107_tribulus-50--balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08d&sg=38cb01fe","f":"kap.","q":60,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/mineraly/","/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/vitamin-b/","/hormony/","/nalada-a-energia/","/srdce-a-cievny-system/","/proti-stresu/","/svaly/","/testosteron-a-prostata/","/pre-muzov/","/zinok/"]},"/multivitamin-s-mineralmi--extra-silny/":{"n":"Multivitamín s minerálmi Extra silný","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/110_multivitamin-s-mineralmi-extra-silny---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08d&sg=38cb01fe","f":"tab.","q":90,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/mineraly/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/multivitaminy/","/dlhovekost-3/","/na-imunitu/","/kosti-a-klby/","/mozog/","/nalada-a-energia/","/pokozku--vlasy-a-nechty/","/srdce-a-cievny-system/","/proti-stresu/","/svaly/","/zrak/","/pre-muzov/","/pre-zeny/","/multimineraly/"]},"/vlasy-nechty-pokozka/":{"n":"Vlasy Nechty Pokožka","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/113_vlasy-nechty-pokozka---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08d&sg=38cb01fe","f":"kap.","q":90,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/mineraly/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/multivitaminy/","/pokozku--vlasy-a-nechty/","/pre-muzov/","/pre-zeny/","/multimineraly/"]},"/multi-komplex-a-z/":{"n":"Generácia 50+ Multi Komplex","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/116_generacia-50--multi-komplex---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08d&sg=38cb01fe","f":"tab.","q":120,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/mineraly/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/multivitaminy/","/dlhovekost-3/","/na-imunitu/","/kosti-a-klby/","/mozog/","/nalada-a-energia/","/pokozku--vlasy-a-nechty/","/srdce-a-cievny-system/","/proti-stresu/","/svaly/","/zrak/","/pre-muzov/","/pre-zeny/","/multimineraly/"]},"/dobry-spanok/":{"n":"Dobrý spánok","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/125_dobry-spanok---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"tab.","q":90,"t":[[3,0.8],[6,0.7]],"c":["/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/spanok/","/proti-stresu/","/pre-muzov/","/pre-zeny/"]},"/koenzym-q10/":{"n":"Koenzým Q10","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/131_koenzym-q10---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"kap.","q":60,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/vitamin-e/","/dlhovekost-3/","/nalada-a-energia/","/srdce-a-cievny-system/","/pre-muzov/","/pre-zeny/"]},"/lutein-komplex-forte/":{"n":"Luteín Komplex Forte","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/134_lutein-komplex-forte---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"kap.","q":60,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/mineraly/","/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/vitamin-c-2/","/vitamin-e/","/zrak/","/pre-muzov/","/pre-zeny/","/multimineraly/"]},"/prostata-komplex/":{"n":"Prostata Komplex","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/137_prostata-komplex---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"kap.","q":60,"t":[[3,0.8],[6,0.7]],"c":["/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/hormony/","/testosteron-a-prostata/","/pre-muzov/"]},"/klby-kosti-chrupavky/":{"n":"Kĺby Kosti Chrupavky","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/140_klby-kosti-chrupavky---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"tab.","q":60,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/mineraly/","/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/multivitaminy/","/kosti-a-klby/","/pre-muzov/","/pre-zeny/","/multimineraly/"]},"/zdrave-vlasy/":{"n":"Zdravé vlasy","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/143_zdrave-vlasy---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"kap.","q":120,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/mineraly/","/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/multivitaminy/","/pokozku--vlasy-a-nechty/","/pre-muzov/","/pre-zeny/","/multimineraly/"]},"/brusnice-d-manoza-riboflavin/":{"n":"Brusnice D-Manóza Riboflavín","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/202_brusnice-d-manoza-riboflavin---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"tab.","q":90,"t":[[3,0.8],[6,0.7]],"c":["/vyzivove-doplnky/","/vsetky/","/pre-koho/","/pre-muzov/","/pre-zeny/"]},"/magnezium-glycinat/":{"n":"Magnézium Glycinát 550 mg Super Forte Plus","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/211_magnezium-glycinat-550-mg-super-forte-plus---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"kap.","q":60,"t":[[3,0.8],[6,0.7]],"c":["/mineraly/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/kosti-a-klby/","/mozog/","/nalada-a-energia/","/spanok/","/proti-stresu/","/svaly/","/pre-muzov/","/pre-zeny/","/magnezium/"]},"/magnezium-laktat-b6-400-mg-super-forte/":{"n":"Magnézium Laktát + B6 400 mg Super Forte","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/214_magnezium-laktat-b6-400-mg-super-forte---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"kap.","q":60,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/mineraly/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/vitamin-b/","/kosti-a-klby/","/mozog/","/nalada-a-energia/","/proti-stresu/","/svaly/","/pre-muzov/","/pre-zeny/","/magnezium/"]},"/ashwagandha/":{"n":"Ashwagandha","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/229_ashwagandha---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"kap.","q":60,"t":[[3,0.8],[6,0.7]],"c":["/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/nalada-a-energia/","/spanok/","/proti-stresu/","/menopauza/","/pre-muzov/","/pre-zeny/"]},"/zena-50-probio-aktiv/":{"n":"Žena 50+Probio Aktiv","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/235-1_zena-50--probio-aktiv---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"kap.","q":45,"c":["/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/super-zlavy/","/na-imunitu/","/kosti-a-klby/","/pokozku--vlasy-a-nechty/","/travenie/","/menopauza/","/pre-zeny/"]},"/laktobacily-probio-aktiv/":{"n":"Laktobacily Probio Aktiv","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/238_laktobacily-probio-aktiv---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"kap.","q":45,"c":["/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/super-zlavy/","/na-imunitu/","/travenie/","/pre-muzov/","/pre-zeny/"]},"/zdrava-pecen/":{"n":"Zdravá pečeň","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/241_zdrava-pecen---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"kap.","q":45,"t":[[3,0.8],[6,0.7]],"c":["/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/pecen/","/pre-muzov/","/pre-zeny/"]},"/glp-1/":{"n":"GLP-1 Probio Aktiv","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/250_glp-1-probio-aktiv---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"kap.","q":1,"t":[[3,0.8],[6,0.7]],"c":["/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/travenie/","/chudnutie/","/pre-muzov/","/pre-zeny/"]},"/kreatin/":{"n":"Kreatín s magnéziom","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/253_kreatin-s-magneziom---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"g","q":250,"t":[[3,0.8],[6,0.7]],"c":["/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/dlhovekost-3/","/kosti-a-klby/","/mozog/","/nalada-a-energia/","/svaly/","/pre-muzov/","/pre-zeny/"]},"/d3-k2-kvapky/":{"n":"D3 + K2 kvapky","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/256_d3-k2-kvapky---balenie-s-flastickou-kvapiek.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/vitamin-d/","/vitamin-k/","/na-imunitu/","/kosti-a-klby/","/srdce-a-cievny-system/","/pre-muzov/","/pre-zeny/"]},"/omega-3/":{"n":"Omega-3","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/262_omega-3---balenie-produktu.jpg?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"kap.","q":90,"t":[[3,0.8],[6,0.7]],"c":["/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/dlhovekost-3/","/mozog/","/nalada-a-energia/","/srdce-a-cievny-system/","/proti-stresu/","/pre-muzov/","/pre-zeny/"]},"/zelezo-chelat--vitaminy-c-b/":{"n":"Železo chelát, vitamíny C + B","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/265_zelezo-chelat--vitaminy-c-b---balenie-produktu.jpg?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"tab.","q":90,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/mineraly/","/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/vitamin-b/","/vitamin-c-2/","/na-imunitu/","/nalada-a-energia/","/pre-muzov/","/pre-zeny/","/zelezo/"]},"/laktaza-12-000/":{"n":"Laktáza 12 000","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/268_laktaza-12-000---balenie-produktu.jpg?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"tab.","q":60,"t":[[3,0.8],[6,0.7]],"c":["/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/travenie/","/pre-muzov/","/pre-zeny/"]},"/melatonin/":{"n":"Melatonín 0,5 mg","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/271_melatonin-0-5-mg---balenie-produktu.jpg?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"tab.","q":600,"t":[[3,0.8],[6,0.7]],"c":["/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/spanok/","/pre-muzov/","/pre-zeny/"]},"/bcaa-nepela/":{"n":"BCAA NEPELA MEMORIAL","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/277_bcaa-nepela-memorial---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"g","q":300,"t":[[3,0.8],[6,0.7]],"c":["/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/kosti-a-klby/","/svaly/","/pre-muzov/","/pre-zeny/"]},"/kreatin-nepela/":{"n":"Kreatín Magnézium chelát NEPELA MEMORIAL","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/283_kreatin-magnezium-chelat-nepela-memorial---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"g","q":250,"t":[[3,0.8],[6,0.7]],"c":["/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/dlhovekost-3/","/kosti-a-klby/","/mozog/","/nalada-a-energia/","/svaly/","/pre-muzov/","/pre-zeny/"]},"/vitamin-b-komplex/":{"n":"Minitablety Vitamín B-komplex","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/286_minitablety-vitamin-b-komplex---balenie-s-davkovacom-minitabliet.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"tab.","q":100,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/minitablety/","/vitamin-b/","/na-imunitu/","/mozog/","/nalada-a-energia/","/srdce-a-cievny-system/","/proti-stresu/","/pre-muzov/","/pre-zeny/"]},"/minitablety-biotin-vitamin-b7/":{"n":"Minitablety Biotín - Vitamín B7","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/289-1_minitablety-biotin-vitamin-b7---balenie-s-davkovacom-minitabliet.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"tab.","q":100,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/minitablety/","/vitamin-b/","/pokozku--vlasy-a-nechty/","/pre-muzov/","/pre-zeny/"]},"/minitablety-vitamin-d3-k2-1-000-iu/":{"n":"Minitablety Vitamín D3 + K2 1 000 IU","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/292-1_minitablety-vitamin-d3-k2-1-000-iu---balenie-s-davkovacom-minitabliet.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"tab.","q":100,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/minitablety/","/vitamin-d/","/vitamin-k/","/na-imunitu/","/kosti-a-klby/","/srdce-a-cievny-system/","/pre-muzov/","/pre-zeny/"]},"/minitablety-vitamin-d3-2-000-iu/":{"n":"Minitablety Vitamín D3 2 000 IU","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/295_minitablety-vitamin-d3-2-000-iu---balenie-s-davkovacom-minitabliet.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"tab.","q":100,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/minitablety/","/vitamin-d/","/na-imunitu/","/kosti-a-klby/","/pre-muzov/","/pre-zeny/"]},"/zelezo-chelat/":{"n":"Minitablety Železo chelát","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/298-1_minitablety-zelezo-chelat---balenie-s-davkovacom-minitabliet.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"tab.","q":100,"t":[[3,0.8],[6,0.7]],"c":["/mineraly/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/minitablety/","/na-imunitu/","/nalada-a-energia/","/pre-muzov/","/pre-zeny/","/zelezo/"]},"/minitablety-jod-extra/":{"n":"Minitablety Jód Extra","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/301_minitablety-jod-extra---balenie-s-davkovacom-minitabliet.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"tab.","q":100,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/mineraly/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/minitablety/","/mozog/","/nalada-a-energia/","/pre-muzov/","/pre-zeny/"]},"/minitablety-kyselina-listova-extra/":{"n":"Minitablety Kyselina listová Extra","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/304-1_minitablety-kyselina-listova-extra---balenie-s-davkovacom-minitabliet.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"tab.","q":100,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/minitablety/","/vitamin-b/","/mozog/","/nalada-a-energia/","/srdce-a-cievny-system/","/pre-muzov/","/pre-zeny/"]},"/minitablety-kyselina-listova/":{"n":"Minitablety Kyselina listová","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/307_minitablety-kyselina-listova---balenie-s-davkovacom-minitabliet.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"tab.","q":100,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/minitablety/","/vitamin-b/","/mozog/","/nalada-a-energia/","/srdce-a-cievny-system/","/pre-muzov/","/pre-zeny/"]},"/minitablety-laktaza-6-000/":{"n":"Minitablety Laktáza 6 000","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/310_minitablety-laktaza-6-000---balenie-s-davkovacom-minitabliet.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"tab.","q":100,"t":[[3,0.8],[6,0.7]],"c":["/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/minitablety/","/vitamin-b/","/travenie/","/pre-muzov/","/pre-zeny/"]},"/minitablety-melatonin-0-5-mg/":{"n":"Minitablety Melatonín 0,5 mg","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/313-1_minitablety-melatonin-0-5-mg---balenie-s-davkovacom-minitabliet.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"tab.","q":100,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/minitablety/","/vitamin-b/","/spanok/","/pre-muzov/","/pre-zeny/"]},"/minitablety-vitamin-b6-pyridoxin/":{"n":"Minitablety Vitamín B6 Pyridoxín","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/316-2_minitablety-vitamin-b6-pyridoxin---balenie-s-davkovacom-minitabliet.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"tab.","q":100,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/minitablety/","/vitamin-b/","/na-imunitu/","/mozog/","/nalada-a-energia/","/travenie/","/menopauza/","/pre-muzov/","/pre-zeny/"]},"/minitablety-vitamin-b2-riboflavin/":{"n":"Minitablety Vitamín B2 Riboflavín","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/319_minitablety-vitamin-b2-riboflavin---balenie-s-davkovacom-minitabliet.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"tab.","q":100,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/minitablety/","/vitamin-b/","/na-imunitu/","/mozog/","/nalada-a-energia/","/pokozku--vlasy-a-nechty/","/zrak/","/travenie/","/pre-muzov/","/pre-zeny/"]},"/minitablety-rutin-vitamin-c/":{"n":"Minitablety Rutín + Vitamín C","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/322-1_minitablety-rutin-vitamin-c---balenie-s-davkovacom-minitabliet.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"tab.","q":100,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/minitablety/","/vitamin-c-2/","/na-imunitu/","/kosti-a-klby/","/srdce-a-cievny-system/","/pre-muzov/","/pre-zeny/"]},"/minitablety-selen-zinok/":{"n":"Minitablety Selén + Zinok","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/325_minitablety-selen-zinok---balenie-s-davkovacom-minitabliet.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"tab.","q":100,"t":[[3,0.8],[6,0.7]],"c":["/mineraly/","/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/minitablety/","/na-imunitu/","/pokozku--vlasy-a-nechty/","/testosteron-a-prostata/","/pre-muzov/","/pre-zeny/","/zinok/"]},"/minitablety-vitamin-b1-tiamin/":{"n":"Minitablety Vitamín B1 Tiamín","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/331_minitablety-vitamin-b1-tiamin---balenie-s-davkovacom-minitabliet.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"tab.","q":100,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/minitablety/","/vitamin-b/","/mozog/","/nalada-a-energia/","/srdce-a-cievny-system/","/pre-muzov/","/pre-zeny/"]},"/minitablety-vitamin-b12-100-mcg/":{"n":"Minitablety Vitamín B12 100 mcg","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/334-1_minitablety-vitamin-b12-100-mcg---balenie-s-davkovacom-minitabliet.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"tab.","q":100,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/minitablety/","/vitamin-b/","/na-imunitu/","/mozog/","/nalada-a-energia/","/pre-muzov/","/pre-zeny/"]},"/minitablety-vitamin-b12-500-mcg/":{"n":"Minitablety Vitamín B12 500 mcg","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/337_minitablety-vitamin-b12-500-mcg---balenie-s-davkovacom-minitabliet.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"tab.","q":100,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/minitablety/","/vitamin-b/","/na-imunitu/","/mozog/","/nalada-a-energia/","/pre-muzov/","/pre-zeny/"]},"/minitablety-zinok-chelat/":{"n":"Minitablety Zinok chelát","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/340-1_minitablety-zinok-chelat---balenie-s-davkovacom-minitabliet.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"tab.","q":100,"t":[[3,0.8],[6,0.7]],"c":["/mineraly/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/minitablety/","/na-imunitu/","/kosti-a-klby/","/nalada-a-energia/","/pokozku--vlasy-a-nechty/","/testosteron-a-prostata/","/pre-muzov/","/pre-zeny/","/zinok/"]},"/hemoroidy/":{"n":"Hemoroidy","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/363-2_hemoroidy---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"tab.","q":45,"c":["/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/srdce-a-cievny-system/","/pre-muzov/","/pre-zeny/"]},"/zily-a-cievy/":{"n":"Žily a cievy","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/366_zily-a-cievy---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"tab.","q":90,"c":["/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/srdce-a-cievny-system/","/pre-muzov/","/pre-zeny/"]},"/silwer-joj-play-zena-50-komplex/":{"n":"Silwer JOJ play Žena 50+ Komplex","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/376_silwer-joj-play-zena-50--komplex---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"tab.","q":90,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/mineraly/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/joj_play/","/multivitaminy/","/dlhovekost-3/","/na-imunitu/","/kosti-a-klby/","/mozog/","/nalada-a-energia/","/pokozku--vlasy-a-nechty/","/zrak/","/menopauza/","/pre-zeny/","/multimineraly/"]},"/silwer-joj-play-muz-50--komplex/":{"n":"Silwer JOJ play Muž 50+ Komplex","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/379_silwer-joj-play-muz-50--komplex---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"tab.","q":90,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/mineraly/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/joj_play/","/multivitaminy/","/dlhovekost-3/","/na-imunitu/","/kosti-a-klby/","/mozog/","/nalada-a-energia/","/pokozku--vlasy-a-nechty/","/zrak/","/testosteron-a-prostata/","/pre-muzov/","/multimineraly/"]},"/silwer-joj-play-b-komplex/":{"n":"Silwer JOJ play B-komplex","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/382_silwer-joj-play-b-komplex---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08e&sg=38cb01fe","f":"tab.","q":360,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/joj_play/","/vitamin-b/","/na-imunitu/","/mozog/","/nalada-a-energia/","/srdce-a-cievny-system/","/proti-stresu/","/pre-muzov/","/pre-zeny/"]},"/silwer-joj-play-vitamin-c-zinok/":{"n":"Silwer JOJ play Vitamín C + Zinok","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/385_silwer-joj-play-vitamin-c-zinok---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08f&sg=38cb01fe","f":"tab.","q":120,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/mineraly/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/joj_play/","/vitamin-c-2/","/na-imunitu/","/nalada-a-energia/","/pokozku--vlasy-a-nechty/","/pre-muzov/","/pre-zeny/","/zinok/"]},"/silwer-joj-play-vitamin-d3/":{"n":"Silwer JOJ play Vitamín D3","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/388_silwer-joj-play-vitamin-d3---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08f&sg=38cb01fe","f":"tab.","q":180,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/joj_play/","/vitamin-d/","/na-imunitu/","/kosti-a-klby/","/pre-muzov/","/pre-zeny/"]},"/silwer-joj-play-zinok-25-mg/":{"n":"Silwer JOJ play Zinok 25 mg","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/391_silwer-joj-play-zinok-25-mg---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08f&sg=38cb01fe","f":"tab.","q":180,"t":[[3,0.8],[6,0.7]],"c":["/mineraly/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/joj_play/","/na-imunitu/","/kosti-a-klby/","/pokozku--vlasy-a-nechty/","/testosteron-a-prostata/","/pre-muzov/","/pre-zeny/","/zinok/"]},"/magnezium-malat/":{"n":"Magnézium Malát","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/397-2_magnezium-malat---balenie-produktu.jpg?ff=1&x=1024&y=1024&q=85&ts=6abcc08f&sg=38cb01fe","f":"kap.","q":120,"t":[[3,0.8],[6,0.7]],"c":["/mineraly/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/novinky/","/kosti-a-klby/","/mozog/","/nalada-a-energia/","/proti-stresu/","/svaly/","/pre-muzov/","/pre-zeny/","/magnezium/"]},"/berberin/":{"n":"Berberín","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/400-1_berberin---balenie-produktu.jpg?ff=1&x=1024&y=1024&q=85&ts=6abcc08f&sg=38cb01fe","f":"kap.","q":90,"t":[[3,0.8],[6,0.7]],"c":["/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/novinky/","/dlhovekost-3/","/srdce-a-cievny-system/","/travenie/","/chudnutie/","/pre-muzov/","/pre-zeny/"]},"/l-glutation/":{"n":"L-Glutatión","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/403-1_l-glutation---balenie-produktu.jpg?ff=1&x=1024&y=1024&q=85&ts=6abcc08f&sg=38cb01fe","f":"kap.","q":120,"t":[[3,0.8],[6,0.7]],"c":["/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/novinky/","/dlhovekost-3/","/na-imunitu/","/pecen/","/pre-muzov/","/pre-zeny/"]},"/hericium-extrakt/":{"n":"Herícium Extrakt","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/406_hericium-extrakt---balenie-produktu.jpg?ff=1&x=1024&y=1024&q=85&ts=6abcc08f&sg=38cb01fe","f":"kap.","q":90,"t":[[3,0.8],[6,0.7]],"c":["/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/novinky/","/mozog/","/nalada-a-energia/","/proti-stresu/","/travenie/","/pre-muzov/","/pre-zeny/"]},"/balicek-pre-neho/":{"n":"Balíček pre jeho zdravie","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/415_balicek-pre-fanusika---obsah--vitamin-c-zinok--muz-50--komplex-a-b-komplex.jpg?ff=1&x=1024&y=1024&q=85&ts=6abcc08f&sg=38cb01fe","c":["/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/joj_play/","/super-zlavy/","/na-imunitu/","/nalada-a-energia/","/pokozku--vlasy-a-nechty/","/pre-muzov/"]},"/balicek-pre-nu/":{"n":"Balíček pre jej zdravie","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/418_balicek-pre-fanusicku---obsah--vitamin-c-zinok--zena-50--komplex-a-b-komplex.jpg?ff=1&x=1024&y=1024&q=85&ts=6abcc08f&sg=38cb01fe","c":["/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/joj_play/","/super-zlavy/","/na-imunitu/","/nalada-a-energia/","/pokozku--vlasy-a-nechty/","/pre-zeny/"]},"/hmotnost-pod-kontrolou/":{"n":"Hmotnosť pod kontrolou","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/486_hmotnost-pod-kontrolou---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08f&sg=38cb01fe","f":"kap.","q":60,"t":[[3,0.8],[6,0.7]],"c":["/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/gold/","/novinky/","/travenie/","/chudnutie/","/pre-muzov/","/pre-zeny/"]},"/lipozomalny-vitamin-c/":{"n":"Lipozomálny Vitamín C","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/489_lipozomalny-vitamin-c---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08f&sg=38cb01fe","f":"kap.","q":90,"t":[[3,0.8],[6,0.7]],"c":["/vitaminy/","/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/gold/","/novinky/","/vitamin-c-2/","/dlhovekost-3/","/hormony/","/na-imunitu/","/kosti-a-klby/","/mozog/","/nalada-a-energia/","/pokozku--vlasy-a-nechty/","/spanok/","/srdce-a-cievny-system/","/proti-stresu/","/svaly/","/zrak/","/travenie/","/pecen/","/pre-muzov/","/pre-zeny/"]},"/magnezium-treonat/":{"n":"Magnézium Treonát","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/492_magnezium-treonat---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08f&sg=38cb01fe","f":"kap.","q":60,"t":[[3,0.8],[6,0.7]],"c":["/mineraly/","/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/gold/","/novinky/","/kosti-a-klby/","/mozog/","/nalada-a-energia/","/spanok/","/proti-stresu/","/svaly/","/pre-muzov/","/pre-zeny/","/magnezium/"]},"/zdrava-pecen-komplex-forte/":{"n":"Zdravá Pečeň Forte","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/495_zdrava-pecen-forte---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08f&sg=38cb01fe","f":"kap.","q":90,"t":[[3,0.8],[6,0.7]],"c":["/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/gold/","/novinky/","/travenie/","/pecen/","/pre-muzov/","/pre-zeny/"]},"/ziariva-plet/":{"n":"Žiarivá pleť","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/498_ziariva-plet---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08f&sg=38cb01fe","f":"kap.","q":60,"t":[[3,0.8],[6,0.7]],"c":["/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/gold/","/novinky/","/dlhovekost-3/","/pokozku--vlasy-a-nechty/","/menopauza/","/pre-muzov/","/pre-zeny/"]},"/rybi-kolagen/":{"n":"Rybí kolagén","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/501_rybi-kolagen---balenie-produktu.png?ff=1&x=1024&y=1024&q=85&ts=6abcc08f&sg=38cb01fe","f":"g","q":250,"t":[[3,0.8],[6,0.7]],"c":["/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/gold/","/novinky/","/kosti-a-klby/","/pokozku--vlasy-a-nechty/","/srdce-a-cievny-system/","/menopauza/","/pre-muzov/","/pre-zeny/"]},"/silwer-joj-play-dobry-zrak-50/":{"n":"Silwer JOJ play Dobrý zrak 50+","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/504_jojplay-dobry-zrak-predok.jpg?ff=1&x=1024&y=1024&q=85&ts=6abf7af5&sg=38cb01fe","f":"kap.","q":60,"t":[[3,0.8],[6,0.7]],"c":["/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/joj_play/","/novinky/","/zrak/","/pre-muzov/","/pre-zeny/"]},"/silwer-joj-play-klby--kosti--chrupavky-50/":{"n":"Silwer JOJ play Kĺby, kosti, chrupavky 50+","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/507_jojplay-klby-kosti-chrup-predok.jpg?ff=1&x=1024&y=1024&q=85&ts=6ac4bbd5&sg=38cb01fe","f":"tab.","q":60,"t":[[3,0.8],[6,0.7]],"c":["/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/joj_play/","/kosti-a-klby/","/pre-muzov/","/pre-zeny/"]},"/dobry-zrak-a-aktivny-pohyb-50/":{"n":"Dobrý zrak a lepší pohyb 50+","i":"https://cdn.myshoptet.com/usr/www.silwer.sk/user/shop/big/510_silwer-mockup-bundle2-zrak-kosti-jojplay.jpg?ff=1&x=1024&y=1024&q=85&ts=6ac4ed1a&sg=38cb01fe","c":["/vyzivove-doplnky/","/vsetky/","/hladam-nieco-na/","/pre-koho/","/joj_play/","/kosti-a-klby/","/zrak/","/pre-muzov/","/pre-zeny/"]}},"cats":{"/vitaminy/":["/lutein-komplex-forte/","/tribulus-50-/","/klby-kosti-chrupavky/","/vitamin-d3-k2-vapnik/","/koenzym-q10/","/silwer-joj-play-zena-50-komplex/","/silwer-joj-play-muz-50--komplex/","/magnezium-laktat-b6-400-mg-super-forte/"],"/mineraly/":["/magnezium-glycinat/","/lutein-komplex-forte/","/tribulus-50-/","/klby-kosti-chrupavky/","/vitamin-d3-k2-vapnik/","/silwer-joj-play-zena-50-komplex/","/silwer-joj-play-muz-50--komplex/","/minitablety-selen-zinok/"],"/vyzivove-doplnky/":["/glp-1/","/lutein-komplex-forte/","/tribulus-50-/","/brusnice-d-manoza-riboflavin/","/klby-kosti-chrupavky/","/zdrava-pecen/","/prostata-komplex/","/omega-3/"],"/vsetky/":["/glp-1/","/magnezium-glycinat/","/lutein-komplex-forte/","/tribulus-50-/","/brusnice-d-manoza-riboflavin/","/klby-kosti-chrupavky/","/vitamin-d3-k2-vapnik/","/zdrava-pecen/"],"/hladam-nieco-na/":["/glp-1/","/magnezium-glycinat/","/lutein-komplex-forte/","/tribulus-50-/","/klby-kosti-chrupavky/","/vitamin-d3-k2-vapnik/","/zdrava-pecen/","/prostata-komplex/"],"/pre-koho/":["/glp-1/","/magnezium-glycinat/","/lutein-komplex-forte/","/tribulus-50-/","/brusnice-d-manoza-riboflavin/","/klby-kosti-chrupavky/","/vitamin-d3-k2-vapnik/","/zdrava-pecen/"],"/gold/":["/rybi-kolagen/","/magnezium-treonat/","/lipozomalny-vitamin-c/","/hmotnost-pod-kontrolou/","/zdrava-pecen-komplex-forte/","/ziariva-plet/"],"/joj_play/":["/balicek-pre-nu/","/balicek-pre-neho/","/dobry-zrak-a-aktivny-pohyb-50/","/silwer-joj-play-b-komplex/","/silwer-joj-play-dobry-zrak-50/","/silwer-joj-play-klby--kosti--chrupavky-50/","/silwer-joj-play-muz-50--komplex/","/silwer-joj-play-vitamin-c-zinok/"],"/novinky/":["/rybi-kolagen/","/magnezium-malat/","/hericium-extrakt/","/magnezium-treonat/","/silwer-joj-play-dobry-zrak-50/","/lipozomalny-vitamin-c/","/hmotnost-pod-kontrolou/","/berberin/"],"/minitablety/":["/minitablety-selen-zinok/","/minitablety-vitamin-b12-500-mcg/","/minitablety-laktaza-6-000/","/minitablety-vitamin-d3-2-000-iu/","/vitamin-b-komplex/","/minitablety-rutin-vitamin-c/","/zelezo-chelat/","/minitablety-jod-extra/"],"/super-zlavy/":["/laktobacily-probio-aktiv/","/zena-50-probio-aktiv/","/balicek-pre-neho/","/balicek-pre-nu/"],"/vitamin-b/":["/tribulus-50-/","/magnezium-laktat-b6-400-mg-super-forte/","/magnezium-citrat-forte/","/minitablety-vitamin-b12-500-mcg/","/minitablety-laktaza-6-000/","/vitamin-b-komplex/","/minitablety-biotin-vitamin-b7/","/zelezo-chelat--vitaminy-c-b/"],"/vitamin-c-2/":["/lutein-komplex-forte/","/vitamin-c-sipky/","/minitablety-rutin-vitamin-c/","/vitamin-c-zinok/","/lipozomalny-vitamin-c/","/zelezo-chelat--vitaminy-c-b/","/silwer-joj-play-vitamin-c-zinok/"],"/vitamin-d/":["/vitamin-d3-k2-vapnik/","/d3-k2-kvapky/","/minitablety-vitamin-d3-2-000-iu/","/vapnik-vitamin-d3/","/silwer-joj-play-vitamin-d3/","/minitablety-vitamin-d3-k2-1-000-iu/","/vitamin-d3-2-000-iu/"],"/vitamin-e/":["/lutein-komplex-forte/","/koenzym-q10/"],"/vitamin-k/":["/vitamin-d3-k2-vapnik/","/d3-k2-kvapky/","/minitablety-vitamin-d3-k2-1-000-iu/"],"/multivitaminy/":["/klby-kosti-chrupavky/","/vitamin-d3-k2-vapnik/","/silwer-joj-play-zena-50-komplex/","/silwer-joj-play-muz-50--komplex/","/multivitamin-s-mineralmi--extra-silny/","/vlasy-nechty-pokozka/","/multi-komplex-a-z/","/zdrave-vlasy/"],"/dlhovekost-3/":["/omega-3/","/koenzym-q10/","/silwer-joj-play-zena-50-komplex/","/silwer-joj-play-muz-50--komplex/","/multivitamin-s-mineralmi--extra-silny/","/kreatin/","/multi-komplex-a-z/","/kreatin-nepela/"],"/hormony/":["/tribulus-50-/","/prostata-komplex/","/lipozomalny-vitamin-c/"],"/na-imunitu/":["/vitamin-d3-k2-vapnik/","/silwer-joj-play-zena-50-komplex/","/silwer-joj-play-muz-50--komplex/","/minitablety-selen-zinok/","/multivitamin-s-mineralmi--extra-silny/","/minitablety-vitamin-b12-500-mcg/","/d3-k2-kvapky/","/vitamin-c-sipky/"],"/kosti-a-klby/":["/magnezium-glycinat/","/klby-kosti-chrupavky/","/vitamin-d3-k2-vapnik/","/silwer-joj-play-zena-50-komplex/","/silwer-joj-play-muz-50--komplex/","/magnezium-laktat-b6-400-mg-super-forte/","/magnezium-citrat-forte/","/multivitamin-s-mineralmi--extra-silny/"],"/mozog/":["/magnezium-glycinat/","/omega-3/","/silwer-joj-play-zena-50-komplex/","/silwer-joj-play-muz-50--komplex/","/magnezium-laktat-b6-400-mg-super-forte/","/magnezium-citrat-forte/","/multivitamin-s-mineralmi--extra-silny/","/minitablety-vitamin-b12-500-mcg/"],"/nalada-a-energia/":["/magnezium-glycinat/","/tribulus-50-/","/omega-3/","/ashwagandha/","/koenzym-q10/","/silwer-joj-play-zena-50-komplex/","/silwer-joj-play-muz-50--komplex/","/magnezium-laktat-b6-400-mg-super-forte/"],"/pokozku--vlasy-a-nechty/":["/silwer-joj-play-zena-50-komplex/","/silwer-joj-play-muz-50--komplex/","/minitablety-selen-zinok/","/multivitamin-s-mineralmi--extra-silny/","/vlasy-nechty-pokozka/","/vitamin-c-sipky/","/rybi-kolagen/","/zena-50-probio-aktiv/"],"/spanok/":["/magnezium-glycinat/","/ashwagandha/","/dobry-spanok/","/magnezium-treonat/","/melatonin/","/lipozomalny-vitamin-c/","/minitablety-melatonin-0-5-mg/"],"/srdce-a-cievny-system/":["/tribulus-50-/","/vitamin-d3-k2-vapnik/","/omega-3/","/koenzym-q10/","/hemoroidy/","/multivitamin-s-mineralmi--extra-silny/","/d3-k2-kvapky/","/rybi-kolagen/"],"/proti-stresu/":["/magnezium-glycinat/","/tribulus-50-/","/omega-3/","/ashwagandha/","/dobry-spanok/","/magnezium-laktat-b6-400-mg-super-forte/","/magnezium-citrat-forte/","/multivitamin-s-mineralmi--extra-silny/"],"/svaly/":["/magnezium-glycinat/","/tribulus-50-/","/vitamin-d3-k2-vapnik/","/magnezium-laktat-b6-400-mg-super-forte/","/magnezium-citrat-forte/","/multivitamin-s-mineralmi--extra-silny/","/kreatin/","/magnezium-malat/"],"/zrak/":["/lutein-komplex-forte/","/silwer-joj-play-zena-50-komplex/","/silwer-joj-play-muz-50--komplex/","/multivitamin-s-mineralmi--extra-silny/","/dobry-zrak-a-aktivny-pohyb-50/","/multi-komplex-a-z/","/silwer-joj-play-dobry-zrak-50/","/lipozomalny-vitamin-c/"],"/travenie/":["/glp-1/","/minitablety-laktaza-6-000/","/laktobacily-probio-aktiv/","/zena-50-probio-aktiv/","/hericium-extrakt/","/lipozomalny-vitamin-c/","/laktaza-12-000/","/hmotnost-pod-kontrolou/"],"/pecen/":["/zdrava-pecen/","/lipozomalny-vitamin-c/","/zdrava-pecen-komplex-forte/","/l-glutation/"],"/chudnutie/":["/glp-1/","/hmotnost-pod-kontrolou/","/berberin/"],"/menopauza/":["/vitamin-d3-k2-vapnik/","/ashwagandha/","/silwer-joj-play-zena-50-komplex/","/rybi-kolagen/","/zena-50-probio-aktiv/","/vapnik-vitamin-d3/","/ziariva-plet/","/minitablety-vitamin-b6-pyridoxin/"],"/testosteron-a-prostata/":["/tribulus-50-/","/prostata-komplex/","/silwer-joj-play-muz-50--komplex/","/minitablety-selen-zinok/","/zinok-glukonat-25-mg/","/silwer-joj-play-zinok-25-mg/","/minitablety-zinok-chelat/"],"/pre-muzov/":["/glp-1/","/magnezium-glycinat/","/lutein-komplex-forte/","/tribulus-50-/","/brusnice-d-manoza-riboflavin/","/klby-kosti-chrupavky/","/vitamin-d3-k2-vapnik/","/zdrava-pecen/"],"/pre-zeny/":["/glp-1/","/magnezium-glycinat/","/lutein-komplex-forte/","/brusnice-d-manoza-riboflavin/","/klby-kosti-chrupavky/","/vitamin-d3-k2-vapnik/","/zdrava-pecen/","/omega-3/"],"/magnezium/":["/magnezium-glycinat/","/magnezium-laktat-b6-400-mg-super-forte/","/magnezium-citrat-forte/","/magnezium-malat/","/magnezium-treonat/","/magnezium-400-mg-forte/"],"/vapnik/":["/vitamin-d3-k2-vapnik/","/vapnik-vitamin-d3/"],"/zinok/":["/tribulus-50-/","/minitablety-selen-zinok/","/vitamin-c-zinok/","/zinok-glukonat-25-mg/","/silwer-joj-play-vitamin-c-zinok/","/silwer-joj-play-zinok-25-mg/","/minitablety-zinok-chelat/"],"/zelezo/":["/zelezo-chelat/","/zelezo-chelat--vitaminy-c-b/"],"/multimineraly/":["/lutein-komplex-forte/","/klby-kosti-chrupavky/","/silwer-joj-play-zena-50-komplex/","/silwer-joj-play-muz-50--komplex/","/multivitamin-s-mineralmi--extra-silny/","/vlasy-nechty-pokozka/","/multi-komplex-a-z/","/zdrave-vlasy/"]}};
  /* @@SW-DATA-END */

  /* Čerstvé dáta: data-api na Verceli (ten istý zber ako gen-data, CDN cache 1 h).
     Zmeny v admine (zľavy, produkty, poradie, nové kategórie) sa tak ukážu bez
     nahrávania tohto súboru (Ján 22. 10.). Posledné čerstvé dáta si prehliadač pamätá,
     takže od druhej stránky návštevy sa použijú hneď pri vykreslení. Na prvej sa
     zľavy na kartách dorovnajú, keď dáta prídu (udalosť sw:data). Staršie ako
     záloha v DATA alebo než 3 dni sa nepoužijú. */
  var DATA_URL = 'https://silwer-data.vercel.app/api/data';
  var DATA_KEY = 'swData';
  function dataOk(d) {
    return !!d && !!d.products && !!d.cats && typeof d.at === 'string' &&
      Object.keys(d.products).length >= 40 && Object.keys(d.cats).length >= 10;
  }
  function useData(d) { DATA.at = d.at; DATA.products = d.products; DATA.cats = d.cats; }
  /* kategórie zo zálohy v JS: endpoint môže hodinu držať staršie dáta bez práve založenej kategórie */
  var EMB_CATS = DATA.cats;
  try {
    var kept = JSON.parse(localStorage.getItem(DATA_KEY) || 'null');
    if (dataOk(kept) && kept.at >= DATA.at && Date.now() - kept.ts < 3 * 864e5) useData(kept);
  } catch (e) {}

  var RED = '#D40000', RED_DEEP = '#A80000';

  /* Museo Sans: licencovaný font, súbory .woff2 sa nahrajú sem.
     Kým tam nie sú, prehliadač použije pôvodné písmo šablóny (Roboto). */
  var FONT_BASE = 'https://cdn.myshoptet.com/usr/www.silwer.sk/user/documents/upload/KODY/fonts/';

  /* Oblasti „Hľadám niečo na" — zoznam a poradie podľa feedbacku klienta zo 7. 10.
     [názov, URL kategórie, farba, krátky popis, ikona, záložné produkty, plánovaná URL]
     URL overené proti sitemape 7. 10. Kategória NEEXISTUJE pre Chudnutie,
     Menopauzu a Testosterón a prostatu — tam je URL null a oblasť ukazuje
     uvedené produkty. Plánovaná URL (7. prvok) je adresa, pod ktorou ju Silwer
     založí v admine. Prepne sa sama, keď ju `node dev/gen-data.mjs` nájde na webe
     s produktmi (pod NEEDS); dovtedy menu a dlaždica vedú na záložné produkty.
     Dlaždice na úvodnej stránke: obrázok oblast-<ikona>.jpg (pozadie a fotka
     z grafiky klienta, bez textu — text je živý, aby sa neorezával). */
  var NEEDS = [
    /* farby a popisy sú z dlaždíc od klienta (9. 10.); v popisoch opravené
       preklepy (Rulín → Rutín, Sylimarín → Silymarín, L-glutatiň → L-glutatión,
       Probiotíka → Probiotiká, Ashwaganda → Ashwagandha) */
    ['Chudnutie',              null,                        '#D56628', 'GLP-1, Berberín, Kontrola hmotnosti', 'chudnutie',
      ['/glp-1/', '/hmotnost-pod-kontrolou/', '/berberin/'], '/chudnutie/'],
    ['Kosti, kĺby a svaly',    '/kosti-a-klby/',            '#5F9C8E', 'Zinok, Kolagén, D3+K2, BCAA, Kreatín', 'kosti'],
    ['Spánok a pokoj',         '/spanok/',                  '#503882', 'Melatonín, Magnézium, Ashwagandha',  'spanok'],
    ['Srdce a cievy',          '/srdce-a-cievny-system/',   '#D1332E', 'Omega-3, Rutín, Koenzým Q10',        'srdce'],
    ['Pamäť a mozog',          '/mozog/',                   '#476C76', 'B-komplex, Herícium, Kreatín',       'mozog'],
    ['Energia a vitalita',     '/nalada-a-energia/',        '#2F802F', 'Magnéziá, Multivitamíny 50+',        'energia'],
    ['Trávenie',               '/travenie/',                '#A66A77', 'Probiotiká, Laktáza, Berberín',      'travenie'],
    ['Pečeň',                  '/pecen/',                   '#CC8751', 'Silymarín, L-glutatión, Zdravá pečeň', 'pecen'],
    ['Zrak',                   '/zrak/',                    '#047BB0', 'Luteín, Zeaxantín, Omega-3',         'zrak'],
    /* produkty Menopauzy podľa dlaždice klienta: Probiotiká Žena 50+, Ashwagandha, GLP-1 */
    ['Menopauza',              null,                        '#86134C', 'Probiotiká Žena 50+, Ashwagandha, GLP-1', 'menopauza',
      ['/zena-50-probio-aktiv/', '/ashwagandha/', '/glp-1/'], '/menopauza/'],
    ['Testosterón a prostata', null,                        '#7171B6', 'Tribulus, Prostata komplex',         'testosteron',
      ['/tribulus-50-/', '/prostata-komplex/'], '/testosteron-a-prostata/'],
    ['Pleť, vlasy a nechty',   '/pokozku--vlasy-a-nechty/', '#E7B300', 'Kolagén, Zinok, Biotín, Žiarivá pleť', 'plet']
  ];
  /* založená kategória (zber dát ju našiel na webe s produktmi) nahradí záložné produkty */
  function promoteNeeds() {
    NEEDS.forEach(function (n) {
      if (!n[1] && n[6] && ((DATA.cats[n[6]] || []).length || (EMB_CATS[n[6]] || []).length)) n[1] = n[6];
    });
  }
  promoteNeeds();
  /* plánované kategórie (7. prvok NEEDS) si endpoint prečíta z tohto súboru na webe */
  (function () {
    if (!window.fetch) return;
    var ctl = window.AbortController ? new AbortController() : null;
    if (ctl) setTimeout(function () { ctl.abort(); }, 8000);
    fetch(DATA_URL, { credentials: 'omit', signal: ctl ? ctl.signal : undefined })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!dataOk(d) || d.at < DATA.at) return;
        try { d.ts = Date.now(); localStorage.setItem(DATA_KEY, JSON.stringify(d)); } catch (e) {}
        useData(d);
        promoteNeeds();
        document.dispatchEvent(new CustomEvent('sw:data'));
      })
      .catch(function () {});
  })();
  /* Fotka do hera z návrhu z 15. 9. (čiernobiely pár, 1920x734).
     V gite: redesign/assets/hero-par.jpg — pri nasadení nahrať do priečinka obrazky.
     Kým tam nie je (dnes 404), použije sa kópia z návrhu, aby lokál fungoval. */
  var HERO_IMG = ASSETS + 'hero-par.jpg';
  var HERO_IMG_FALLBACK = 'https://silwer-navrhy.vercel.app/assets/hero-par.jpg';

  /* pod oblasťami „na preklik"; Hormóny klient vyradil. Dlhovekosť mieri na
     kategóriu /dlhovekost-3/ (klient: /longevity/ bol zlý preklik).
     [názov, URL, farba, obrázok oblast-<kľúč>.jpg, popis] — grafiku dodal klient 20. 10.,
     farba je priemer ľavej časti ich pozadia. Popis v štýle ostatných dlaždíc, z látok
     produktov, ktoré má Silwer v kategórii navrchu (názvy produktov boli na dlaždicu dlhé). */
  var EXTRA = [['Dlhovekosť','/dlhovekost-3/','#B39C87','dlhovekost','Omega-3, Koenzým Q10, NMN'],
    ['Imunita','/na-imunitu/','#B5BC12','imunita','Vitamín D3, Vitamín C, Selén, Zinok'],
    ['Stres','/proti-stresu/','#5F7883','stres','Magnézium, Ashwagandha, B6']];
  /* Na úvodnej stránke je vidno prvých NEEDS_TOP oblastí, ostatné sa rozbalia
     tlačidlom „Viac" (feedback 12. 10., prepínač od 22. 10.). EXTRA_C je neutrálna farba pre
     oblasť z EXTRA, ktorá ešte nemá grafiku. */
  var NEEDS_TOP = 9;
  var EXTRA_C = '#3A3D40';
  /* všetky produktové kategórie vrátane Gold, jednotný zápis, Všetky produkty na konci */
  var PRODUKTY = [
    ['Vitamíny','/vitaminy/'], ['Minerály','/mineraly/'], ['Výživové doplnky','/vyzivove-doplnky/'],
    ['Minitablety','/minitablety/'], ['Silwer Gold','/gold/'], ['Silwer JOJ play','/joj_play/'],
    ['Novinky 2026','/novinky/'], ['Superzľavy','/super-zlavy/'], ['Všetky produkty','/vsetky/']
  ];
  /* „Pre všetkých" vedie na Všetky produkty (rozhodnutie Jána 22. 10., variant A).
     Samostatná kategória by mala takmer celý katalóg: 43 zo 48 produktov je v Ženy
     aj Muži (overené 17. 10.). Ten istý zoznam berie aj silwer-header-footer.js. */
  var PREKOHO = [['Pre ženy','/pre-zeny/'], ['Pre mužov','/pre-muzov/'], ['Pre všetkých','/vsetky/']];
  /* hlavné menu: všetko verzálkami (CSS), poradie podľa feedbacku */
  /* „Zaujímavosti" (feedback 12. 10.) zbierajú sekcie na čítanie. Tretí prvok je
     podmenu. „Pán doktor, čo Vy na to?" klient 22. 10. zatiaľ skryl, podstránku
     pripravuje; po jej založení sa vráti ako ['Pán doktor, čo Vy na to?', URL]. */
  var MENU = [
    ['Superzľavy','/super-zlavy/'], ['Silwer Gold','/gold/'], ['Silwer JOJ Play','/joj_play/'],
    ['Zaujímavosti','/blog/', [['Blog','/blog/']]],
    ['O nás','/onas/']
  ];

  /* Ikony: Shoptet icon font (74 ikon) nemá kosť, mozog ani oko — tie sú vlastné. */
  var ICO = {
    kosti:   '<path d="M7 7a2.5 2.5 0 1 1 3.2 2.4l4.4 4.4A2.5 2.5 0 1 1 17 17a2.5 2.5 0 0 1-2.4-3.2l-4.4-4.4A2.5 2.5 0 0 1 7 7z"/>',
    spanok:  '<path d="M20 13.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5z"/>',
    srdce:   '<path d="M12 20s-7-4.5-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7-.8c0 4.7-7 12.8-7 12.8z"/>',
    mozog:   '<path d="M12 5v14M9 5a3 3 0 0 0-3 3 2.5 2.5 0 0 0-1 4.5A3 3 0 0 0 8 18a3 3 0 0 0 4 1M15 5a3 3 0 0 1 3 3 2.5 2.5 0 0 1 1 4.5A3 3 0 0 1 16 18a3 3 0 0 1-4 1"/>',
    imunita: '<path d="M12 4l7 3v5c0 4-3 6.6-7 8-4-1.4-7-4-7-8V7l7-3z"/>',
    energia: '<path d="M13 3L5 13h5l-1 8 8-10h-5l1-8z"/>',
    travenie:'<path d="M9 5v5a4 4 0 0 0 4 4h1a3 3 0 0 1 0 6h-1"/><path d="M6 5h5"/>',
    zrak:    '<path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6z"/><circle cx="12" cy="12" r="2.6"/>',
    chudnutie:'<rect x="3" y="8" width="18" height="8" rx="2"/><path d="M7 8v3M11 8v4M15 8v3M19 8v2"/>',
    pecen:   '<path d="M5 19C5 11 11 5 20 5c0 9-6 15-15 14z"/><path d="M5 19l8-8"/>',
    menopauza:'<circle cx="12" cy="9" r="5"/><path d="M12 14v7M9 18h6"/>',
    testosteron:'<circle cx="10" cy="14" r="5"/><path d="M14 10l6-6M15 4h5v5"/>',
    plet:    '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/>',
    tel:     '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    truck:   '<path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    cash:    '<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 9.5v5M18 9.5v5"/>',
    clock:   '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    user:    '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.4-6 8-6s6.5 2 8 6"/>',
    cart:    '<path d="M3 4h2.5l2.2 11h10.6L20.5 8H7"/><circle cx="9.5" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/>',
    box:     '<path d="M3 7.5L12 3l9 4.5v9L12 21l-9-4.5z"/><path d="M3 7.5l9 4.5 9-4.5M12 12v9"/>',
    pill:    '<rect x="3.5" y="9" width="17" height="6" rx="3" transform="rotate(-35 12 12)"/><path d="M9.6 8.6l4.8 6.8" />',
    euro:    '<path d="M17 6.5A7 7 0 1 0 17 17.5M4 10h9M4 14h9"/>',
    check:   '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    help:    '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 17h.01"/>'
  };

  /* ===== POMOCNÉ =========================================================== */
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function svg(k) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICO[k] + '</svg>'; }
  /* Manuál 5.6: na akcentovej ploche vyhráva farba s vyšším kontrastom.
     Svetlé akcenty (žltá, limetková) preto dostanú čierny glyf, nie biely. */
  function onAccent(hex) {
    var c = hex.replace('#', '');
    var r = parseInt(c.substr(0, 2), 16), g = parseInt(c.substr(2, 2), 16), b = parseInt(c.substr(4, 2), 16);
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) > 150 ? '#000000' : '#FFFFFF';
  }
  function has(sel) { return !!document.querySelector(sel); }
  function body(c) { return document.body.classList.contains(c); }
  function money(n) { return n.toFixed(2).replace('.', ',') + ' €'; }
  function parseMoney(s) {
    var m = (s || '').replace(/ /g, ' ').match(/(\d[\d\s]*(?:[.,]\d+)?)/);
    return m ? parseFloat(m[1].replace(/\s/g, '').replace(',', '.')) : NaN;
  }
  function addStyle(id, css) {
    if (document.querySelector('style[data-sw="' + id + '"]')) return;
    var s = document.createElement('style');
    s.setAttribute('data-sw', id);
    s.textContent = css;
    document.head.appendChild(s);
  }

  /* ===== 1. JADRO — tokeny a spoločné štýly =============================== */
  addStyle('core', [
    /* --- odznak počtu v mobilnom košíku ---
       Téma ho kotví na top:-4px;left:25px, počítané na nižšiu hlavičku.
       Náš prepínač je 50x60 px s ikonou na strede, takže odznak vyletel nad
       hlavičku a hore sa orezal. Kotvíme ho na pravý horný roh glyfu.
       Musí to byť v core, nie v module úvodnej stránky — hlavička je všade. */
    '@media(max-width:767px){',
    '#header .navigation-buttons a.cart-count>i{top:13px!important;right:3px!important;',
    'left:auto!important;z-index:2}}',
    /* ---------- BRAND TOKENY (Brand Book v1.0, 2024 + Manuál pre social v2.0) ----------
       Primárna paleta: čierna #000000, biela #FFFFFF, Mild Gray #D1D1D2,
       Anthracite #303435. Čierna sa NESMIE riediť tmavošedou — preto #000,
       nie pôvodné #0B0B0C. Teplá béžová #F5F4F1 v palete nie je, nahradená
       neutrálnou svetlou plochou odvodenou z Mild Gray.
       Konverzná červená v brand booku nie je. Zostáva LEN na tlačidlách akcie
       (rozhodnutie Jara z 16. 9.), nikde inde sa ako dekorácia nepoužíva. */
    ':root{--sw-black:#000000;--sw-white:#FFFFFF;--sw-gray:#D1D1D2;--sw-anthracite:#303435;',
    '--sw-ink:#000000;--sw-dark:#000000;--sw-text:#000000;--sw-muted:#303435;',
    '--sw-line:#D1D1D2;--sw-line2:rgba(255,255,255,.16);--sw-dim:#B9B9BC;--sw-field:#F4F4F5;',
    '--sw-red:' + RED + ';--sw-red-deep:' + RED_DEEP + ';--sw-green:#00A550;--sw-r:12px;',
    /* bočný okraj obsahu: ~19 px na mobile, 40 px od 800 px. Rovnaký pre obsah,
       sub-navbar aj widget hodnotení, aby všetko stálo na jednej osi. Pri 768 px
       musí byť nad 36 px, inak bočný odznak „Overené zákazníkmi" zakryje text. */
    '--sw-gut:clamp(16px,5vw,40px);',
    '--sw-truck:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27black%27 stroke-width=%271.8%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27M3 6h11v9H3zM14 9h4l3 3v3h-7z%27/%3E%3Ccircle cx=%277%27 cy=%2717.5%27 r=%271.8%27/%3E%3Ccircle cx=%2717%27 cy=%2717.5%27 r=%271.8%27/%3E%3C/svg%3E");',
    /* Museo Sans je licencovaný font. Súbory sa nahrajú do KODY/fonts/ a dovtedy
       sa dedí pôvodné písmo šablóny. Váhy podľa manuálu: 100, 300, 500, 700. */
    '--sw-font:"Museo Sans","MuseoSans",Roboto,system-ui,-apple-system,sans-serif;',
    '--sw-font-cond:"Museo Sans Condensed","MuseoSansCondensed",var(--sw-font)}',
    /* @font-face pre Museo Sans — súbory dodá klient (licencia). Kým nie sú v KODY/fonts/,
       CFG.fonts je false: inak by každá stránka robila 8 požiadaviek, ktoré skončia 404. */
    (CFG.fonts ? ['100','300','500','700'] : []).map(function (w) {
      return '@font-face{font-family:"Museo Sans";font-style:normal;font-weight:' + w + ';font-display:swap;' +
        'src:url("' + FONT_BASE + 'MuseoSans-' + w + '.woff2") format("woff2")}' +
        '@font-face{font-family:"Museo Sans Condensed";font-style:normal;font-weight:' + w + ';font-display:swap;' +
        'src:url("' + FONT_BASE + 'MuseoSansCondensed-' + w + '.woff2") format("woff2")}';
    }).join(''),
    /* jednotné písmo na celom e-shope vrátane formulárov a tlačidiel */
    'body,button,input,select,textarea,.btn{font-family:var(--sw-font)}',
    'body{font-weight:300}',
    'p,li,td,.sw-sub{font-family:var(--sw-font-cond)}',

    /* typografia — cieľovka 50+, väčší základ */
    '.sw-h{font-size:clamp(26px,3vw,38px);font-weight:700;letter-spacing:-.02em;',
    'line-height:1.1;color:var(--sw-ink);margin:0 0 8px}',
    '.sw-sub{font-size:16px;line-height:1.55;color:var(--sw-muted);margin:0 0 26px;max-width:62ch}',
    '.sw-sec{padding:52px 0}',
    '.sw-wrap{max-width:1240px;margin:0 auto;padding:0 20px}',
    '.sw-eyebrow{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}',
    '@media(max-width:767px){.sw-sec{padding:34px 0}}',

    /* karty potrieb — biela karta, farebná ikona, názov a zloženie.
       Ten istý komponent sa používa na homepage aj v mega dropdowne.
       Predtým tu boli stmavené fotky. Jaro sa na calle 16. 9. pýtal, prečo
       je to „invertné" — návrh z 15. 9. má svetlé karty, tak ako tu. */
    '.sw-needs{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}',
    '.sw-need{position:relative;display:block;min-height:0;padding:22px 22px 24px;border-radius:14px;',
    'text-decoration:none!important;background:#fff;border:1px solid var(--sw-line);',
    'transition:transform .18s,box-shadow .18s,border-color .18s}',
    '.sw-need:hover{transform:translateY(-3px);border-color:#CFCCC5;',
    'box-shadow:0 18px 36px -24px rgba(11,11,12,.45)}',
    '.sw-need__ic{width:46px;height:46px;border-radius:12px;display:flex;',
    'align-items:center;justify-content:center;margin-bottom:16px}',
    '.sw-need__ic svg{width:24px;height:24px;stroke:currentColor;fill:none;stroke-width:2;',
    'stroke-linecap:round;stroke-linejoin:round}',
    '.sw-need__t{display:block;font-size:17px;font-weight:700;color:var(--sw-ink);margin-bottom:8px}',
    '.sw-need:hover .sw-need__t{color:var(--sw-anthracite)}',
    '.sw-need__d{display:block;font-size:14px;line-height:1.5;color:var(--sw-muted)}',
    '.sw-extra{margin-top:18px;font-size:14px;color:var(--sw-muted)}',
    '.sw-extra a{color:var(--sw-ink);font-weight:700;text-decoration:underline;text-underline-offset:3px}',
    '.sw-extra span{margin:0 7px;color:#B9B6AF}',
    '@media(max-width:1100px){.sw-needs{grid-template-columns:repeat(2,1fr)}}',
    '@media(max-width:520px){.sw-needs{gap:10px;grid-template-columns:minmax(0,1fr)}.sw-need{padding:16px;display:grid;',
    'grid-template-columns:42px minmax(0,1fr);gap:2px 14px;align-items:center}',
    '.sw-need__ic{grid-row:1/span 2;width:42px;height:42px;margin:0}',
    '.sw-need__t{font-size:15.5px;margin:0}.sw-need__d{font-size:13px}}',
    /* ---------- dlaždice oblastí (grafika klienta 9. 10.) ----------
       Pomer strán z ich podkladov 2220 × 1019. Fotka je v pravej časti obrázka,
       text vľavo na farbe oblasti. */
    /* 3 stĺpce: pri štyroch mala dlaždica 290 px a texty sa nezmestili */
    '.sw-needs--tiles{grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}',
    /* globálne zalamovanie dlhých URL (#content span) tu lámalo „Omega-3" */
    '.sw-tile,.sw-tile *{overflow-wrap:normal!important;word-break:normal!important}',
    /* feedback 12. 10.: dlaždica o tretinu nižšia, fotka väčšia (obrázok je
       zväčšený a ukotvený vpravo, takže z neho vidno hlavne fotku), väčšie písmo */
    '.sw-tile{position:relative;display:flex;flex-direction:column;justify-content:center;gap:5px;aspect-ratio:2220/700;',
    'min-height:112px;padding:12px 50% 12px clamp(14px,1.6vw,22px);box-sizing:border-box;border-radius:14px;overflow:hidden;',
    'background:var(--c) var(--img,none) right 18%/auto 172% no-repeat;color:#fff!important;text-decoration:none!important;',
    'transition:transform .2s,box-shadow .2s;isolation:isolate}',
    '.sw-tile--plain{padding-right:clamp(14px,1.6vw,22px)}',
    /* jemné stmavenie pod textom pre čitateľnosť aj na svetlých farbách (žltá) */
    '.sw-tile::before{content:"";position:absolute;inset:0;z-index:-1;',
    'background:linear-gradient(90deg,rgba(0,0,0,.2) 0%,rgba(0,0,0,.08) 42%,rgba(0,0,0,0) 58%)}',
    '.sw-tile:hover{transform:translateY(-3px);box-shadow:0 18px 36px -22px rgba(0,0,0,.55)}',
    '.sw-tile:focus-visible{outline:3px solid var(--sw-ink);outline-offset:2px}',
    '.sw-tile__t{display:block;font-size:clamp(18px,1.6vw,22px);font-weight:700;line-height:1.18;color:#fff;',
    'text-shadow:0 1px 2px rgba(0,0,0,.22)}',
    '.sw-tile__d{display:block;font-size:clamp(14.5px,1.15vw,16px);line-height:1.32;color:#fff;',
    'text-shadow:0 1px 2px rgba(0,0,0,.22)}',
    '@media(max-width:1100px){.sw-needs--tiles{grid-template-columns:repeat(2,minmax(0,1fr))}',
    '.sw-tile__t{font-size:20px}.sw-tile__d{font-size:15.5px}}',
    '@media(max-width:600px){.sw-needs--tiles{grid-template-columns:minmax(0,1fr);gap:10px}',
    '.sw-tile{aspect-ratio:auto;min-height:104px;padding:12px 48% 12px 18px}.sw-tile--plain{padding-right:18px}',
    '.sw-tile__t{font-size:20px}.sw-tile__d{font-size:15.5px}}',
    /* Ďalšie oblasti: prepínač „Viac / Menej" so šípkou. Rozbalené dlaždice
       plynule pokračujú pod prvými, tlačidlo sa presunie pod ne. Mobil od 14. 10.,
       desktop od 22. 10. (Ján: namiesto riadku „Čo Vás ešte trápi" s názvami). */
    '.sw-more{display:flex;flex-direction:column;margin-top:16px}',
    '.sw-more__bar{order:2;display:flex;justify-content:center}',
    '.sw-more__body{order:1;margin-bottom:16px}',
    '.sw-more__all{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-width:220px;',
    'margin:8px 0 0;padding:14px 28px;border:1.5px solid var(--sw-ink);border-radius:10px;background:#fff;color:var(--sw-ink);',
    'font:inherit;font-size:15px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;',
    'transition:background .2s,color .2s}',
    '.sw-more__all:hover{background:var(--sw-ink);color:#fff}',
    '.sw-more__all svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2.6;stroke-linecap:round;',
    'stroke-linejoin:round;transition:transform .2s}',
    '.sw-more.is-open .sw-more__all svg{transform:rotate(180deg)}',
    '@media(max-width:767px){.sw-more{margin-top:10px}.sw-more__body{margin-bottom:10px}',
    '.sw-more__bar{display:block}.sw-more__all{display:flex;width:100%;margin:0;padding:14px 18px}',
    '.sw-more__all:hover{background:#fff;color:var(--sw-ink)}}',

    /* výrez fotky z dlaždice oblasti namiesto ikony (mega menu, mobilné menu) */
    '.sw-ic--ph.sw-mega__ic{width:54px;height:54px;border-radius:12px}',
    /* grafika oblasti od klienta namiesto farebného štvorca */
    '.sw-need__ic--img,.sw-mega__ic--img,.swg__ic--img,.sw-m__ic--img{background:none!important}',
    '.sw-need__ic--img img,.sw-mega__ic--img img,.swg__ic--img img,.sw-m__ic--img img{width:100%;height:100%;object-fit:contain}',

    /* ---------- mega menu „Hľadám niečo na" (feedback 7. 10.) ----------
       12 oblastí v stĺpcoch, názov pri piktograme, pod ním produkty. */
    '.sw-mega__g{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:22px 26px}',
    '.sw-mega__h{display:flex;align-items:center;gap:11px;font-size:15px;font-weight:700;',
    'color:var(--sw-ink)!important;text-decoration:none!important;margin:0 0 8px;line-height:1.25}',
    '.sw-mega__h:hover span{text-decoration:underline;text-underline-offset:3px}',
    '.sw-mega__ic{flex:0 0 auto;width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center}',
    '.sw-mega__ic svg{width:19px;height:19px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}',
    '.sw-mega__c ul{list-style:none;margin:0;padding:0 0 0 45px}',
    '.sw-mega__c li{margin:0}',
    '.sw-mega__c li a{display:block;padding:3px 0;font-size:13.5px;line-height:1.4;color:var(--sw-muted)!important;',
    'text-decoration:none!important}',
    '.sw-mega__c li a:hover{color:var(--sw-ink)!important;text-decoration:underline!important}',
    '.sw-mega__x{display:flex;flex-wrap:wrap;gap:8px;margin-top:20px;padding-top:16px;border-top:1px solid var(--sw-line)}',
    '.sw-mega__x a{padding:8px 14px;border:1px solid var(--sw-line);border-radius:999px;font-size:14px;font-weight:700;',
    'color:var(--sw-ink)!important;text-decoration:none!important}',
    '.sw-mega__x a:hover{border-color:var(--sw-ink)}',
    '@media(max-width:1100px){.sw-mega__g{grid-template-columns:repeat(3,minmax(0,1fr))}}',

    /* nadpis s dvomi váhami ako v návrhu: „Čo Vás <b>trápi?</b>" */
    '.sw-h--mix{font-weight:300!important}.sw-h--mix b{font-weight:700}',

    /* tlačidlá */
    '.sw-btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;padding:15px 28px;',
    'border-radius:10px;font-weight:700;font-size:16px;text-decoration:none;border:0;cursor:pointer;',
    'font-family:inherit;transition:background .15s}',
    '.sw-btn--red{background:var(--sw-red);color:#fff}',
    '.sw-btn--red:hover{background:var(--sw-red-deep);color:#fff;text-decoration:none}',
    '.sw-btn--dark{background:var(--sw-ink);color:#fff}',
    '.sw-btn--dark:hover{background:#000;color:#fff;text-decoration:none}',
    '.sw-btn--ghost{background:#fff;color:var(--sw-ink);border:1px solid var(--sw-line)}',
    '.sw-btn--ghost:hover{background:var(--sw-field);color:var(--sw-ink);text-decoration:none}',

    /* blok „Potrebujete pomôcť s výberom?" — nákupná asistentka Silwa */
    '.sw-help{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:clamp(28px,5vw,72px);align-items:center}',
    '.sw-help__v{display:flex;justify-content:center}',
    '.sw-help__v img{max-width:100%;max-height:360px;height:auto}',
    /* fotka tašky s produktmi z videa hera nákupnej asistentky (klient 20. 10.) */
    '.sw-help__v img.sw-help__ph{width:clamp(220px,28vw,380px);max-height:none;aspect-ratio:1;object-fit:cover;border-radius:22px}',
    '.sw-help__av{width:clamp(180px,22vw,260px);aspect-ratio:1;border-radius:50%;display:flex;align-items:center;',
    'justify-content:center;background:radial-gradient(circle at 36% 30%,#fff 0%,#F4F4F5 50%,var(--sw-gray) 100%)}',
    '.sw-help__av svg{width:42%;height:auto;stroke:var(--sw-ink);fill:none;stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round}',
    '.sw-help .sw-eyebrow{color:var(--sw-muted);display:block;margin:0 0 12px}',
    '.sw-help h2{color:var(--sw-ink);font-size:clamp(28px,3.2vw,42px);font-weight:300!important;line-height:1.1;',
    'letter-spacing:-.02em;margin:0 0 16px}',
    '.sw-help h2 b{font-weight:700}',
    '.sw-help p{color:var(--sw-text);margin:0;font-size:17px;line-height:1.65;max-width:56ch}',
    '.sw-help__cta{display:flex;flex-wrap:wrap;align-items:center;gap:14px 26px;margin-top:28px}',
    '.sw-help__cta .sw-btn{padding:17px 30px;font-size:17px}',
    '.sw-help__cta .sw-btn--dark:hover{background:var(--sw-red)}',
    '@media(max-width:767px){.sw-help{grid-template-columns:minmax(0,1fr);text-align:left}',
    '.sw-help__av{width:150px}.sw-help__v{justify-content:flex-start}.sw-help__cta .sw-btn{width:100%}',
    '.sw-help__v img.sw-help__ph{width:100%;aspect-ratio:16/10}}',

    /* --- omrvinky: obyčajné písmo namiesto verzálok --- */
    '.breadcrumbs{font-size:13.5px!important;text-transform:none!important;letter-spacing:0!important;',
    'color:var(--sw-muted)!important;padding-top:16px!important}',
    '.breadcrumbs a,.breadcrumbs span{text-transform:none!important;letter-spacing:0!important;font-weight:500!important}',
    '.breadcrumbs a{color:var(--sw-muted)!important}.breadcrumbs a:hover{color:var(--sw-ink)!important}',
    '.breadcrumbs>span:last-child>span,.breadcrumbs>span:last-child{color:var(--sw-ink)!important}',

    /* dlhé URL v zdrojoch štúdií (/longevity/, popis GLP-1) sa nezalamovali
       a na mobile roztiahli stránku na 460–530 px — aj na webe bez redizajnu */
    '#content p,#content li,#content td,#content a,#content em,#content span{overflow-wrap:anywhere}',

    /* ---------- jeden rám pre všetky podstránky ----------
       Každý typ stránky mal obsah inde: omrvinky na 115 px, detail na 131,
       kategória na 135, popis na 146, hodnotenia a sub-navbar na 100 (merané
       pri 1400 px). Bootstrap .container (1170) + padding #content (16) +
       vlastné paddingy modulov sa sčítavali. Teraz jeden kontajner s rovnakou
       šírkou a okrajom ako sub-navbar a widget hodnotení, vnútri nulové paddingy.
       Úvodná stránka a pokladňa majú vlastný rám vo svojich moduloch. */
    'body:not(.type-index):not(.ordering-process) .content-wrapper.container{width:100%!important;',
    'max-width:calc(1200px + 2*var(--sw-gut))!important;padding-left:var(--sw-gut)!important;',
    'padding-right:var(--sw-gut)!important;margin-left:auto!important;margin-right:auto!important;box-sizing:border-box}',
    'body:not(.type-index):not(.ordering-process) #content.content,',
    'body:not(.type-index):not(.ordering-process) .content-wrapper .breadcrumbs{',
    'padding-left:0!important;padding-right:0!important}',

    /* ---------- počítadlo kusov: jedna podoba na celom e-shope ----------
       Téma ho kreslí inak v košíku (sivé tlačidlá, deliace linky, rádius 8)
       a inak na detaile. Zjednotené: biele pole, jeden 1px rám, rádius 12,
       žiadne vnútorné linky. Tlačidlá aj pole sú Shoptetu, mení sa len vzhľad. */
    '.quantity{display:inline-flex!important;align-items:center;border:1px solid var(--sw-line)!important;',
    'border-radius:12px!important;background:#fff!important;padding:0!important;overflow:hidden;',
    'position:relative;box-shadow:none!important;width:auto!important;min-width:0}',
    '.quantity>.increase-tooltip,.quantity>.decrease-tooltip{position:absolute!important;width:0!important;',
    'height:0!important;overflow:hidden}',
    '.quantity>label{order:2;flex:1 1 0;min-width:40px;margin:0!important;display:block!important;',
    'border:0!important;background:none!important}',
    '.quantity input.amount{width:100%!important;min-width:0;height:44px!important;border:0!important;',
    'background:none!important;box-shadow:none!important;text-align:center;font-size:16px!important;',
    'font-weight:700!important;color:var(--sw-ink)!important;padding:0!important;-moz-appearance:textfield}',
    '.quantity input.amount::-webkit-outer-spin-button,.quantity input.amount::-webkit-inner-spin-button{',
    '-webkit-appearance:none;margin:0}',
    '.quantity .decrease{order:1}.quantity .increase{order:3}',
    '.quantity .increase,.quantity .decrease{position:static!important;flex:0 0 40px;width:40px!important;',
    'height:44px!important;border:0!important;background:none!important;border-radius:0!important;',
    'padding:0!important;margin:0!important;color:var(--sw-ink)!important;font-size:18px!important;',
    'display:flex!important;align-items:center;justify-content:center;cursor:pointer;box-shadow:none!important}',
    '.quantity .increase:hover,.quantity .decrease:hover{background:var(--sw-field)!important}',
    '.quantity .increase__sign,.quantity .decrease__sign{line-height:1}',

    /* ---------- náhľad košíka (#cart-widget pod ikonou košíka) ----------
       Shoptet ho kreslí ako tabuľku; bunka množstva má 104 px, zjednotené
       počítadlo 122 px, takže pretieklo pod „×" a „+" sa s ním prekrývalo.
       Cena bola v konverznej červenej, ktorú brand manuál dovoľuje len na
       tlačidlách. Teraz mriežka: fotka | názov a cena | počítadlo | odstrániť. */
    /* rám patrí celému widgetu: päta s dopravou a tlačidlom nie je vo vnútornom obale */
    '#cart-widget{width:420px!important;max-width:calc(100vw - 24px);padding:6px 20px 20px!important;',
    'background:#fff!important;border:1px solid var(--sw-line)!important;border-radius:16px!important;',
    'box-shadow:0 24px 48px -24px rgba(0,0,0,.35)!important;box-sizing:border-box}',
    /* margin-bottom 120 px rezervovala téma pre absolútne kotvenú pätu */
    '#cart-widget .cart-widget-inner{padding:0!important;margin:0!important;border:0!important;box-shadow:none!important;',
    'background:none!important;height:auto!important;max-height:none!important}',
    /* téma dáva widgetu max-height 520 px bez orezania, takže pri 4 a viac položkách
       z neho päta s tlačidlom „Pokračovať do košíka" vytŕčala (Ján 22. 10.). Limit
       témy preč, výšku drží zoznam produktov podľa výšky okna a päta je vždy vnútri. */
    '#cart-widget{height:auto!important;max-height:none!important}',
    '#cart-widget .cart-widget-products,#cart-widget .cart-widget-products-inner{display:block!important;',
    'margin:0!important;padding:0!important;border:0!important}',
    '#cart-widget .cart-widget-products{max-height:clamp(150px,calc(100vh - 330px),420px);overflow-y:auto;overscroll-behavior:contain}',
    '#cart-widget .cart-widget-product{display:grid!important;grid-template-columns:56px minmax(0,1fr) auto 32px;',
    'align-items:center;gap:0 14px;width:100%!important;padding:14px 0!important;margin:0!important;',
    'border:0!important;border-bottom:1px solid var(--sw-line)!important;background:none!important}',
    '#cart-widget .cart-widget-product>div{display:block!important;width:auto!important;padding:0!important;',
    'margin:0!important;border:0!important;vertical-align:middle}',
    '#cart-widget .cart-widget-product-image a{display:flex;align-items:center;justify-content:center;width:56px;',
    'height:56px;border-radius:10px;background:var(--sw-field);overflow:hidden}',
    '#cart-widget .cart-widget-product-image img{width:48px!important;height:48px!important;object-fit:contain;',
    'margin:0!important;mix-blend-mode:darken}',
    '#cart-widget .cart-widget-product-name{margin:0 0 3px!important;line-height:1.3!important}',
    '#cart-widget .cart-widget-product-name a{font-size:15px!important;font-weight:700!important;color:var(--sw-ink)!important;',
    'text-decoration:none!important;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}',
    '#cart-widget .cart-widget-product-price,#cart-widget .cart-widget-product-price strong{font-size:14.5px!important;',
    'font-weight:700!important;color:var(--sw-ink)!important;text-align:left!important}',
    '#cart-widget .cart-widget-product>.cart-widget-product-unit{display:none!important}',
    /* kompaktné počítadlo: rovnaký vzhľad ako všade, len menšie */
    '#cart-widget .cart-widget-product-amount form{margin:0!important}',
    '#cart-widget .quantity{width:auto!important;min-width:0;border-radius:10px!important}',
    '#cart-widget .quantity>label{flex:0 0 34px;min-width:34px}',
    '#cart-widget .quantity input.amount{height:36px!important;font-size:15px!important}',
    '#cart-widget .quantity .increase,#cart-widget .quantity .decrease{flex:0 0 30px;width:30px!important;',
    'height:36px!important;font-size:16px!important}',
    '#cart-widget .cart-widget-product-delete{text-align:center}',
    '#cart-widget .cart-widget-product-delete form,#cart-widget .cart-widget-product-delete .inline{margin:0!important;display:block!important}',
    '#cart-widget .remove-item{width:32px!important;height:32px!important;border-radius:8px!important;display:inline-flex!important;',
    'align-items:center;justify-content:center;background:none!important;border:0!important;color:var(--sw-muted)!important;',
    'padding:0!important;margin:0!important;cursor:pointer;transition:background .15s,color .15s}',
    '#cart-widget .remove-item:hover{background:var(--sw-field)!important;color:var(--sw-ink)!important}',
    /* téma ju kotví absolútne na spodok cez celú šírku; ide späť do toku */
    /* téma dáva päte pevnú výšku 120 px — s ukazovateľom dopravy z nej vypadlo tlačidlo */
    '#cart-widget .cart-widget-bottom{position:static!important;width:auto!important;height:auto!important;display:flex!important;',
    'flex-direction:column;gap:12px;padding:16px 0 0!important;margin:0!important;border:0!important;background:none!important}',
    /* popup prihlásenia pod ikonou Účet — rovnaký vzhľad ako stránka /login/ */
    '#login.login-widget{border:1px solid var(--sw-line)!important;border-radius:16px!important;',
    'box-shadow:0 24px 48px -24px rgba(0,0,0,.35)!important;background:#fff!important}',
    '#login h2{font-size:20px!important;font-weight:700!important;letter-spacing:0!important;color:var(--sw-ink)!important;margin:0 0 16px!important}',
    '#login label{font-size:14px!important;font-weight:600!important;color:var(--sw-ink)!important}',
    '#login .form-control{height:46px!important;border:1px solid var(--sw-line)!important;border-radius:10px!important;box-shadow:none!important}',
    '#login .form-control:focus{border-color:var(--sw-ink)!important;outline:0}',
    '#login .btn{width:100%!important;height:48px!important;border-radius:10px!important;background:var(--sw-ink)!important;',
    'color:#fff!important;border:0!important;font-weight:700!important;font-size:15.5px!important;text-transform:none!important;box-shadow:none!important}',
    '#login .btn:hover{background:var(--sw-red)!important}',
    '#login a{color:var(--sw-ink)!important;text-decoration:underline!important;text-underline-offset:3px;font-weight:600}',

    /* doprava zadarmo: Shoptet dáva text a pruh .price-range s výplňou, ktorej
       šírku nastavuje inline (style="width:23%") — nesmie sa prepísať */
    '#cart-widget .cart-free-shipping{order:1;display:block!important;width:auto!important;margin:0!important;',
    'padding:12px 14px 14px 46px!important;border-radius:10px;background:var(--sw-field)!important;position:relative;',
    'font-size:14px!important;font-weight:400!important;line-height:1.45!important;text-align:left!important;color:var(--sw-text)!important}',
    '#cart-widget .cart-free-shipping::before{content:"";position:absolute;left:14px;top:13px;width:20px;height:20px;',
    'background:currentColor;-webkit-mask:var(--sw-truck) center/contain no-repeat;mask:var(--sw-truck) center/contain no-repeat}',
    '#cart-widget .cart-free-shipping>div{display:block!important;width:auto!important;padding:0!important;margin:0!important;',
    'font-weight:400!important;text-align:left!important}',
    '#cart-widget .cart-free-shipping>div>div:not(.price-range){display:block!important;width:auto!important}',
    '#cart-widget .cart-free-shipping strong{font-weight:700;color:var(--sw-ink)}',
    '#cart-widget .price-range{display:block!important;height:6px!important;margin:9px 0 0!important;padding:0!important;',
    'background:#E2E2E5!important;border-radius:3px!important;overflow:hidden;border:0!important}',
    '#cart-widget .price-range>div{display:block!important;height:100%!important;margin:0!important;',
    'background:var(--sw-ink)!important;border-radius:3px!important;min-width:4px}',
    '#cart-widget .cart-widget-button{order:2;display:block!important;width:auto!important;padding:0!important;margin:0!important}',
    '#cart-widget .cart-widget-button .btn{display:flex!important;align-items:center;justify-content:center;width:100%!important;',
    'min-height:52px;border-radius:10px!important;background:var(--sw-red)!important;border:0!important;color:#fff!important;',
    'font-size:16px!important;font-weight:700!important;text-transform:none!important;box-shadow:none!important;margin:0!important;padding:0 18px!important}',
    '#cart-widget .cart-widget-button .btn:hover{background:var(--sw-red-deep)!important}',
    /* mobil: téma ho pripína ako fixný panel pod hlavičkou až po spodok okna;
       tu cez celú šírku a len taký vysoký, aký je obsah */
    '@media(max-width:767px){#cart-widget{width:auto!important;max-width:none!important;left:0!important;',
    'right:0!important;bottom:auto!important;border-radius:0 0 16px 16px!important;border-left:0!important;',
    'border-right:0!important;padding:4px 16px 16px!important}',
    '#cart-widget .cart-widget-product{grid-template-columns:48px minmax(0,1fr) auto 28px;gap:0 10px}',
    '#cart-widget .cart-widget-product-image a{width:48px;height:48px}',
    '#cart-widget .cart-widget-product-image img{width:42px!important;height:42px!important}',
    '#cart-widget .cart-widget-product-name a{font-size:14.5px!important}',
    '#cart-widget .remove-item{width:28px!important;height:28px!important}}',

    /* ---------- hodnotenie obchodu (widget #hodnoceniobchodu, všade) ----------
       Nadpis bol vľavo, súhrn hviezdičiek na stred a tlačidlo znova na stred.
       Teraz hlavička sekcie ako na úvodnej stránke: nadpis a súhrn vľavo,
       odkaz na všetky hodnotenia vpravo, pod tým mriežka kariet. Dáta sa nemenia. */
    '#hodnoceniobchodu{float:none!important;display:grid!important;grid-template-columns:minmax(0,1fr) auto;',
    'align-items:end;column-gap:24px;max-width:calc(1200px + 2*var(--sw-gut));width:100%;',
    'margin:0 auto!important;padding:56px var(--sw-gut) 64px!important;box-sizing:border-box}',
    '#hodnoceniobchodu::before,#hodnoceniobchodu::after{display:none!important;content:none!important}',
    '#hodnoceniobchodu>h2{grid-column:1;grid-row:1;text-align:left!important;margin:0 0 10px!important;',
    'font-size:clamp(26px,3vw,38px)!important;font-weight:300!important;letter-spacing:-.02em;',
    'line-height:1.1!important;text-transform:none!important}',
    '#hodnoceniobchodu>h2 a{color:var(--sw-ink)!important;text-decoration:none!important}',
    '#hodnoceniobchodu>h2 b{font-weight:700}',
    '#hodnoceniobchodu>br{display:none}',
    '#hodnoceniobchodu .shop-eval-stars{grid-column:1;grid-row:2;margin:0!important;padding:0!important}',
    '#hodnoceniobchodu .shop-eval-stars .rate-average-inner{display:flex!important;align-items:center;',
    'justify-content:flex-start!important;gap:10px;margin:0!important;padding:0!important}',
    '#hodnoceniobchodu .shop-eval-stars .rate-average{font-size:17px!important;font-weight:700!important;',
    'color:var(--sw-ink)!important;line-height:1!important;margin:0!important}',
    '#hodnoceniobchodu .shop-eval-stars .rate-star-wrap{display:inline-flex!important;align-items:center;gap:8px;margin:0!important}',
    '#hodnoceniobchodu .shop-eval-stars .stars-label{font-size:16px!important;color:var(--sw-muted)!important;margin:0!important}',
    '#hodnoceniobchodu .shop-eval{grid-column:1/-1;grid-row:3;display:grid!important;',
    'grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin:26px 0 0!important}',
    /* doplnok hodnotení má vlastné pravidlo s vyššou špecificitou, preto html body */
    'html body #hodnoceniobchodu .shop-eval .vote-wrap,html body #hodnoceniobchodu .shop-eval .vote-wrap.srw-review.fixdone{',
    'background:#fff!important;border:1px solid var(--sw-line)!important;',
    'border-radius:14px!important;padding:18px!important;margin:0!important;width:auto!important;',
    'box-shadow:none!important;min-width:0}',
    '#hodnoceniobchodu .vote-name{font-size:15px!important;font-weight:700!important;color:var(--sw-ink)!important}',
    '#hodnoceniobchodu .vote-time{font-size:12.5px!important;color:var(--sw-muted)!important}',
    '#hodnoceniobchodu .vote-content{font-size:14.5px!important;line-height:1.55!important;',
    'color:var(--sw-text)!important;margin-top:8px!important;display:-webkit-box;-webkit-line-clamp:4;',
    '-webkit-box-orient:vertical;overflow:hidden}',
    /* hviezdičky jednotne malé a žlté ako na karte produktu (feedback 7. 10.) */
    '#hodnoceniobchodu .star::before{color:#E8A317!important;font-size:13px!important}',
    /* „Zobraziť viac" ako textový odkaz vpravo, rovnaký ako „Všetky články →" */
    '#hodnoceniobchodu .shop-stat-all{grid-column:2;grid-row:1/span 2;align-self:end;text-align:right!important;',
    'margin:0 0 2px!important;padding:0!important}',
    '#hodnoceniobchodu .shop-stat-all .btn{display:inline-flex!important;align-items:center;gap:7px;',
    'background:none!important;color:var(--sw-ink)!important;border:0!important;',
    'border-bottom:1.5px solid var(--sw-ink)!important;border-radius:0!important;font-weight:700!important;',
    'font-size:15px!important;padding:0 0 3px!important;margin:0!important;min-height:0!important;',
    'box-shadow:none!important;text-transform:none!important;white-space:nowrap}',
    '#hodnoceniobchodu .shop-stat-all .btn::after{content:"→"}',
    '#hodnoceniobchodu .shop-stat-all .btn:hover{color:var(--sw-red)!important;border-color:var(--sw-red)!important;background:none!important}',
    '@media(max-width:1000px){#hodnoceniobchodu .shop-eval{grid-template-columns:repeat(2,minmax(0,1fr))}}',
    '@media(max-width:600px){#hodnoceniobchodu{grid-template-columns:minmax(0,1fr);padding:40px var(--sw-gut) 44px!important}',
    '#hodnoceniobchodu .shop-eval{grid-template-columns:minmax(0,1fr);gap:12px;margin-top:20px!important}',
    '#hodnoceniobchodu .shop-stat-all{grid-column:1;grid-row:4;text-align:left!important;margin:18px 0 0!important}}',

    /* ---------- oznamovací pás nad hlavičkou ----------
       Obsah je z administrácie, mení sa len farebnosť: žltá v brand palete nie je,
       pás ide na čiernu s bielym textom. */
    '.site-msg,.site-msg.information,.top-navigation-bar,[class*="announcement"],.header-top-banner{',
    'background:var(--sw-black)!important;color:var(--sw-white)!important;border:0!important}',
    '.site-msg a,.top-navigation-bar a,[class*="announcement"] a{color:var(--sw-white)!important;text-decoration:underline}',
    '.site-msg .close,.site-msg button{color:var(--sw-white)!important;opacity:.8}',

    /* ---------- newsletter so zľavou (Leadhub vo #zlava-formular) ----------
       Formulár je cudzí a má vlastné štýly — nesiaha sa do neho. Dostane len
       tmavý pás cez celú šírku, v ktorom čierny formulár prirodzene sedí,
       tak ako „Novinky a zľavy emailom" v návrhu. */
    /* POZOR: margin nenulovať. .full-width sa centruje cez left:50% a záporný
       margin — margin:0 ho posunul o pol obrazovky doprava (overené, 2100 px). */
    /* Feedback 12. 10.: newsletter stačí raz. Ostáva ten v pätičke; veľký pás
       so Shoptet formulárom sa skryje. Keď doň Leadhub vloží vlastný formulár
       so zľavou (.lh-weblayer--root), pás ostáva. Bezpečnostná kontrola sa
       ukáže až keď človek začne písať e-mail (JS dá formuláru .sw-armed). */
    '#zlava-formular:not(:has(.lh-weblayer--root)){display:none!important}',
    'form.subscribe-form:not(.sw-armed)>fieldset>fieldset{display:none!important}',
    'form.subscribe-form>fieldset>fieldset{border:0!important;background:none!important;padding:0!important;margin:14px 0 0!important}',
    'form.subscribe-form>fieldset>fieldset>h2{font-size:13px!important;font-weight:700!important;letter-spacing:.06em;',
    'text-transform:uppercase;margin:0 0 8px!important;color:inherit!important;text-align:left!important}',
    '#zlava-formular{background:var(--sw-ink)!important;padding-top:44px!important;padding-bottom:44px!important}',
    '#zlava-formular .container-full-width{background:transparent!important}',
    /* Keď sa Leadhub nenačíta (napr. blokovač), zostane natívny Shoptet formulár
       s tmavým textom — v tmavom páse by bol neviditeľný. Leadhub dáva
       koreňu triedu .lh-weblayer--root, natívny formulár ju nemá. */
    '#zlava-formular .footer-newsletter:not(.lh-weblayer--root){max-width:560px;margin:0 auto;color:#fff}',
    '#zlava-formular .footer-newsletter:not(.lh-weblayer--root) h2{color:#fff!important;font-size:clamp(24px,2.6vw,32px)!important;',
    'font-weight:700!important;text-align:left!important;margin:0 0 16px!important}',
    '#zlava-formular .footer-newsletter:not(.lh-weblayer--root) label,',
    '#zlava-formular .footer-newsletter:not(.lh-weblayer--root) .consents,',
    '#zlava-formular .footer-newsletter:not(.lh-weblayer--root) .label{color:rgba(255,255,255,.75)!important}',
    '#zlava-formular .footer-newsletter:not(.lh-weblayer--root) a{color:#fff!important;text-decoration:underline}',
    '#zlava-formular .footer-newsletter:not(.lh-weblayer--root) .form-control{background:rgba(255,255,255,.07)!important;',
    'border:1px solid rgba(255,255,255,.2)!important;color:#fff!important;border-radius:10px!important;height:52px!important}',
    '#zlava-formular .footer-newsletter:not(.lh-weblayer--root) .btn{background:var(--sw-red)!important;color:#fff!important;',
    'border:0!important;border-radius:10px!important;font-weight:700!important;padding:14px 26px!important}',
    '@media(max-width:860px){.sw-help{grid-template-columns:1fr;padding:24px}}'
  ].join(''));

  /* ===== 2. KOMPONENT: oblasti potrieb ===================================== */
  /* odkaz oblasti: kategória, a kým neexistuje, prvý z jej produktov */
  function needHref(n) { return n[1] || (n[5] && n[5][0]) || '/vsetky/'; }
  /* produkty oblasti v poradí, ktoré nastavil Silwer (z DATA), inak záložné */
  function needProducts(n, max) {
    var list = (n[1] && DATA.cats[n[1]]) || n[5] || [];
    return list.filter(function (u) { return DATA.products[u]; }).slice(0, max || 4)
      .map(function (u) { return [DATA.products[u].n, u]; });
  }
  /* piktogram: grafika od klienta (CFG.needImg), inak výrez fotky z dlaždice
     oblasti (feedback 12. 10.: fotky namiesto ikon), inak farebný štvorec s ikonou */
  function needIc(n, cls) {
    var img = CFG.needImg[n[4]];
    if (img) return '<span class="' + cls + ' ' + cls + '--img"><img src="' + img + '" alt=""></span>';
    if (n[4] && n[2] !== EXTRA_C)
      return '<span class="' + cls + ' sw-ic--ph" style="background:' + n[2] + ' url(&quot;' + ASSETS + 'oblast-' + n[4] +
        '.jpg&quot;) right center/cover no-repeat"></span>';
    return '<span class="' + cls + '" style="background:' + n[2] + ';color:' + onAccent(n[2]) + '">' + svg(n[4]) + '</span>';
  }
  /* dlaždice „Čo Vás trápi?" — grafika klienta (9. 10.): farebné pozadie a fotka,
     nadpis a popis sú živý text. Kým sa obrázok nenačíta, dlaždica má farbu oblasti. */
  function needTile(c) {
    return '<a class="sw-tile' + (c[4] ? '' : ' sw-tile--plain') + '" href="' + needHref(c) + '" style="--c:' + c[2] + '"' +
      (c[4] ? ' data-sw-img="' + ASSETS + 'oblast-' + c[4] + '.jpg"' : '') + '>' +
      '<span class="sw-tile__t">' + c[0] + '</span>' +
      (c[3] ? '<span class="sw-tile__d">' + c[3].replace(/(\S)-(\S)/g, '$1‑$2') + '</span>' : '') + '</a>';
  }
  /* oblasť z EXTRA ako dlaždica: popis z EXTRA, inak prvé tri produkty jej kategórie */
  function extraNeed(e) {
    var n = [e[0], e[1], e[2] || EXTRA_C, '', e[3] || null];
    n[3] = e[4] || needProducts(n, 3).map(function (x) { return x[0]; }).join(', ');
    return n;
  }
  function needsGrid() {
    var more = NEEDS.slice(NEEDS_TOP).concat(EXTRA.map(extraNeed));
    return '<div class="sw-needs sw-needs--tiles">' + NEEDS.slice(0, NEEDS_TOP).map(needTile).join('') + '</div>' +
      (more.length ? '<div class="sw-more" data-sw-more>' +
        /* výrazné tlačidlo so šípkou (klient 13. 10.: treba vidieť, že sa dá rozbaliť) */
        '<div class="sw-more__bar"><button type="button" class="sw-more__all" aria-expanded="false"><span>Viac</span> ' +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9l7 7 7-7"/></svg></button></div>' +
        '<div class="sw-more__body" hidden>' +
          '<div class="sw-needs sw-needs--tiles">' + more.map(needTile).join('') + '</div></div></div>' : '');
  }
  /* všetky oblasti naraz, v poradí ako v mega menu (stránka „Hľadám niečo na") */
  function allNeedsGrid() {
    return '<div class="sw-needs sw-needs--tiles">' + NEEDS.concat(EXTRA.map(extraNeed)).map(needTile).join('') + '</div>';
  }
  /* newsletter: bezpečnostná kontrola až po prvom dotyku s formulárom */
  function armNewsletter(e) {
    var f = e.target.closest && e.target.closest('form.subscribe-form');
    if (f) f.classList.add('sw-armed');
  }
  document.addEventListener('focusin', armNewsletter);
  document.addEventListener('input', armNewsletter);
  /* odoslanie bez vyplnenej kontroly ju najprv ukáže (napr. e-mail z autofillu) */
  document.addEventListener('submit', function (e) {
    var f = e.target.closest && e.target.closest('form.subscribe-form');
    if (!f || f.classList.contains('sw-armed')) return;
    f.classList.add('sw-armed');
    e.preventDefault(); e.stopPropagation();
    var c = f.querySelector('input[name="captcha"]'); if (c) c.focus();
  }, true);
  /* odkazy na skrytý pás newslettera vedú na formulár v pätičke */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href$="#zlava-formular"]');
    var band = document.getElementById('zlava-formular');
    if (!a || !band || band.offsetHeight) return;
    var inp = document.querySelector('#footer form.subscribe-form input[type="email"]');
    if (!inp) return;
    e.preventDefault();
    inp.scrollIntoView({ block: 'center', behavior: 'smooth' });
    setTimeout(function () { inp.focus({ preventScroll: true }); }, 500);
  });
  /* rozbalenie ďalších oblastí; komponent sa vkladá ako HTML na viacerých
     stránkach, preto jeden delegovaný poslucháč */
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.sw-more__all');
    if (!b) return;
    var box = b.closest('[data-sw-more]'), body = box.querySelector('.sw-more__body');
    /* „Viac" je prepínač (mobil od 14. 10., desktop od 22. 10.). Ďalšie dlaždice
       pokračujú hneď pod prvými a tlačidlo sa presunie pod ne ako „Menej".
       Stránka sa pri rozbalení neposúva, dlaždice pribudnú tam, kde bolo tlačidlo. */
    var open = !box.classList.contains('is-open');
    body.hidden = !open;
    box.classList.toggle('is-open', open);
    b.setAttribute('aria-expanded', open ? 'true' : 'false');
    b.querySelector('span').textContent = open ? 'Menej' : 'Viac';
    /* po zbalení by človek ostal hlboko pod dlaždicami */
    if (!open) b.scrollIntoView({ block: 'center' });
  });
  /* mega menu „Hľadám niečo na": 12 oblastí v stĺpcoch, názov pri piktograme,
     pod ním produkty (feedback 7. 10.) */
  function megaMenu() {
    return '<div class="sw-mega"><div class="sw-mega__g">' + NEEDS.map(function (n) {
      var pr = needProducts(n, 4);
      return '<div class="sw-mega__c"><a class="sw-mega__h" href="' + needHref(n) + '">' +
        needIc(n, 'sw-mega__ic') + '<span>' + n[0] + '</span></a>' +
        (pr.length ? '<ul>' + pr.map(function (x) {
          return '<li><a href="' + x[1] + '">' + x[0] + '</a></li>'; }).join('') + '</ul>' : '') + '</div>';
    }).join('') + '</div><div class="sw-mega__x">' +
      EXTRA.map(function (e) { return '<a href="' + e[1] + '">' + e[0] + '</a>'; }).join('') + '</div></div>';
  }

  /* ===== 2b. KOMPONENT: karta článku (úvodná stránka aj /blog/) ============
     Shoptet kladie nadpis a perex CEZ obrázok, na ktorom je už vlastný text
     z kampane. Dva texty cez seba sú nečitateľné. Obrázok ide hore, text pod
     neho. `p` je predpona rodiča, aby sa pravidlá nebili s inými výpismi. */
  function newsCss(p) {
    return [
      p + ' .news-item{width:auto!important;max-width:none!important;float:none!important;',
      'padding:0!important;margin:0!important;min-width:0}',
      p + ' .news-item>a{display:flex!important;flex-direction:column;height:100%;background:#fff;',
      'border:1px solid var(--sw-line);border-radius:14px;overflow:hidden;text-decoration:none!important;',
      'transition:border-color .15s,box-shadow .15s,transform .15s}',
      p + ' .news-item>a:hover{border-color:#CFCCC5;box-shadow:0 16px 34px -24px rgba(11,11,12,.45)}',
      p + ' .news-item .image{position:static!important;height:auto!important;aspect-ratio:1200/630;',
      'overflow:hidden;margin:0!important;border-radius:0!important}',
      p + ' .news-item .image img{width:100%!important;height:100%!important;object-fit:cover;transition:transform .4s}',
      p + ' .news-item>a:hover .image img{transform:scale(1.03)}',
      p + ' .news-item .text{position:static!important;inset:auto!important;height:auto!important;',
      'background:none!important;padding:18px 18px 20px!important;display:flex!important;flex-direction:column;',
      'gap:8px;flex:1 1 auto;color:var(--sw-text)!important;text-align:left!important;transform:none!important}',
      p + ' .news-item .text .title{font-size:16.5px!important;font-weight:700!important;',
      'line-height:1.3!important;color:var(--sw-ink)!important;text-shadow:none!important;margin:0!important;',
      'display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}',
      p + ' .news-item .text time{order:-1;font-size:12.5px!important;font-weight:700;letter-spacing:.08em;',
      'text-transform:uppercase;color:var(--sw-muted)!important;text-shadow:none!important;margin:0!important}',
      p + ' .news-item .text .description{font-size:14px!important;line-height:1.55!important;',
      'color:var(--sw-muted)!important;text-shadow:none!important;margin:0!important;',
      'display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}',
      p + ' .news-item .text .description p{margin:0!important;font-size:inherit!important;color:inherit!important}',
      p + ' .news-item .read-article{margin-top:auto!important;padding-top:4px;font-size:14px!important;',
      'font-weight:700!important;color:var(--sw-ink)!important;display:inline-flex!important;align-items:center;gap:7px;',
      'text-shadow:none!important}',
      p + ' .news-item>a:hover .read-article{color:var(--sw-red)!important}'
    ].join('');
  }

  /* ===== 2c. KOMPONENT: hodnotenia (/hodnotenie-obchodu/ aj záložka na detaile) ====
     Shoptet kreslí obe miesta tým istým HTML (#ratingWrapper, .rate-wrap,
     #ratingsList). R = predpona súhrnu, L = celý selektor zoznamu kariet;
     L musí mať dve ID, cudzie pravidlá pre karty majú špecificitu (1,4,0). */
  function ratingCss(R, L) {
    return [
      /* súhrn */
      /* .full-width sa centruje cez left:50% a záporný margin; tu je to karta v ráme */
      R + '#ratingWrapper{position:static!important;left:auto!important;right:auto!important;width:auto!important;',
      'max-width:none!important;margin:0 0 32px!important;padding:clamp(22px,3vw,36px)!important;',
      'background:var(--sw-field)!important;border:0!important;border-radius:18px!important;box-sizing:border-box;display:grid!important;',
      'grid-template-columns:minmax(0,1fr) auto;gap:22px 40px;align-items:center}',
      R + '#ratingWrapper::before,' + R + '#ratingWrapper::after{display:none!important;content:none!important}',
      R + '.rate-wrap{grid-column:1;display:grid!important;grid-template-columns:auto minmax(0,1fr);',
      'gap:24px clamp(28px,5vw,72px);align-items:center;margin:0!important;padding:0!important;border:0!important;background:none!important}',
      R + '.rate-average-wrap{margin:0!important;padding:0!important;width:auto!important;text-align:left!important}',
      R + '.rate-average-inner{display:flex!important;flex-direction:column;align-items:flex-start!important;gap:12px;margin:0!important}',
      R + '.rate-average{font-size:clamp(56px,6vw,76px)!important;font-weight:700!important;line-height:.9!important;',
      'letter-spacing:-.03em;color:var(--sw-ink)!important;margin:0!important}',
      R + '.rate-star-wrap{display:flex!important;flex-direction:column;align-items:flex-start;gap:8px;margin:0!important}',
      R + '.rate-average-wrap .star::before{color:#E8A317!important;font-size:20px!important}',
      R + '.rate-average-wrap .stars-label{font-size:15px!important;color:var(--sw-muted)!important;font-weight:500;margin:0!important}',
      /* pruhy: .rate-bar je výplň (šírku mu dáva Shoptet), stopu kreslí ::before
         bloku; počet „350x" sa posúva za pruh, aby sa nečítal cez výplň */
      R + '.votes{display:flex!important;flex-direction:column;gap:9px;width:100%!important;max-width:560px;',
      'margin:0!important;padding:0!important}',
      R + '.rate-list{display:grid!important;grid-template-columns:40px minmax(0,1fr);align-items:center;gap:12px;',
      'margin:0!important;padding:0!important;width:auto!important;height:auto!important}',
      R + '.rate-list .rate-star{display:inline-flex!important;align-items:center;gap:5px;margin:0!important;width:auto!important}',
      R + '.rate-list .rate-value{font-size:15px!important;font-weight:700!important;color:var(--sw-ink)!important}',
      R + '.rate-list .star::before{color:#E8A317!important;font-size:13px!important}',
      R + '.rate-block{position:relative;z-index:0;display:block!important;height:10px;padding:0 56px 0 0!important;margin:0!important}',
      R + '.rate-block::before{content:"";position:absolute;left:0;right:56px;top:0;bottom:0;z-index:-1;',
      'background:#fff;border-radius:5px}',
      R + '.rate-bar{position:static!important;display:block!important;height:10px!important;min-width:4px;',
      'background:#E8A317!important;border-radius:5px!important;margin:0!important}',
      R + '.rate-count{position:absolute!important;right:0!important;left:auto!important;top:50%!important;',
      'transform:translateY(-50%);width:48px;height:auto!important;text-align:right;line-height:1!important;',
      'font-size:13.5px!important;font-weight:700!important;color:var(--sw-muted)!important;margin:0!important}',
      R + '.add-comment{grid-column:2;margin:0!important;padding:0!important;text-align:right}',
      R + '.add-comment .btn{background:var(--sw-red)!important;color:#fff!important;border:0!important;',
      'border-radius:10px!important;padding:15px 26px!important;font-size:16px!important;font-weight:700!important;',
      'height:auto!important;min-height:0!important;text-transform:none!important;box-shadow:none!important;white-space:nowrap}',
      R + '.add-comment .btn:hover{background:var(--sw-red-deep)!important}',
      R + '#rate-form{grid-column:1/-1;background:#fff;border-radius:14px;padding:clamp(18px,3vw,30px)!important;margin:0!important}',
      R + '#rate-form h3{font-size:22px!important;font-weight:700!important;margin:0 0 16px!important;text-align:left!important}',

      /* karty */
      L + '{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin:0 0 30px!important}',
      L + '::before,' + L + '::after{display:none!important;content:none!important}',
      /* cudzí štýl: .id--51 #content .vote-wrap:not(.admin-response .vote-wrap) má
         špecificitu (1,4,0) a kreslí šedé karty — preto dve ID */
      'html ' + L + ' .vote-wrap{background:#fff!important;border:1px solid var(--sw-line)!important;',
      'border-radius:14px!important;padding:22px!important;margin:0!important;width:auto!important;',
      'box-shadow:none!important;min-width:0;display:flex!important;flex-direction:column;gap:12px}',
      /* Shoptet tu má display:block!important so špecificitou, ktorú rozumný
         selektor neprebije. Deklarácia !important vo vrstve (@layer) vyhráva nad
         každou !important mimo vrstvy, preto len táto jedna vlastnosť ide do nej. */
      '@layer sw{' + L + ' .vote-header{display:flex!important;flex-direction:row!important;',
      'justify-content:flex-start!important;align-items:center!important;gap:12px!important}',
      L + ' .vote-wrap{margin:0!important}}',
      L + ' .vote-header{margin:0!important;padding:0!important}',
      L + ' .vote-pic{display:block!important;flex:0 0 44px;width:44px;height:44px;border-radius:50%;',
      'overflow:hidden;position:relative;margin:0!important}',
      L + ' .vote-initials{width:44px!important;height:44px!important;border-radius:50%!important;',
      'background:var(--sw-field)!important;color:var(--sw-ink)!important;font-weight:700!important;font-size:14px!important;',
      'display:flex!important;align-items:center;justify-content:center;border:0!important}',
      L + ' .vote-pic img{position:absolute!important;inset:0;width:100%!important;height:100%!important}',
      L + ' .vote-summary{display:flex!important;flex-direction:column;align-items:flex-start;gap:4px;min-width:0}',
      L + ' .vote-name{font-size:16px!important;font-weight:700!important;color:var(--sw-ink)!important;margin:0!important}',
      L + ' .vote-rating{display:flex!important;align-items:center;gap:8px;margin:0!important}',
      L + ' .star::before{color:#E8A317!important;font-size:13px!important}',
      L + ' .vote-delimeter{display:block!important;width:1px!important;height:12px!important;',
      'background:var(--sw-line)!important;margin:0!important;padding:0!important}',
      L + ' .vote-delimeter::before{content:none!important}',
      L + ' .vote-time{font-size:13px!important;color:var(--sw-muted)!important}',
      L + ' .vote-content{font-size:15.5px!important;line-height:1.6!important;color:var(--sw-text)!important;',
      'margin:0!important;padding:0!important;text-align:left!important}',
      '@media(max-width:1000px){' + L + '{grid-template-columns:repeat(2,minmax(0,1fr))}',
      R + '#ratingWrapper{grid-template-columns:minmax(0,1fr)}',
      R + '.add-comment{grid-column:1;text-align:left}}',
      '@media(max-width:600px){' + L + '{grid-template-columns:minmax(0,1fr);gap:12px}',
      R + '.rate-wrap{grid-template-columns:minmax(0,1fr);gap:20px}',
      R + '.rate-average-inner{flex-direction:row;align-items:center!important;gap:16px}',
      R + '.add-comment .btn{width:100%}',
      'html ' + L + ' .vote-wrap{padding:18px!important}}'
    ].join('');
  }

  /* ===== 2d. KOMPONENT: videá (úvod aj detail produktu) =====================
     Zoznam videí spravuje Silwer v zdieľanej Google tabuľke (META kreatívy,
     hárok „Všetky videá", stĺpce Na web, Web video, …; popis v data-api/lib/videos.mjs).
     Endpoint silwer-data /api/videos ju číta, CDN ho drží 5 minút, takže pridaný
     riadok je na webe do pár minút bez nahrávania tohto súboru (Ján 26. 10.).
     Kým v tabuľke nie je nič na úvod, úvod ukazuje pôvodných 8 reels z CFG.ugc.
     Video sa prehrá v okne priamo na webe (YouTube, Facebook, Instagram,
     Google Disk alebo súbor z » videa), nie odchodom na sociálnu sieť. */
  var VIDEOS_URL = 'https://silwer-data.vercel.app/api/videos';
  var VIDEOS_KEY = 'swVideos';
  var VIDEOS = { items: null };
  (function () {
    if (!body('type-index') && !body('type-detail')) return;
    /* lokálne sa dá namiesto tabuľky podstrčiť testovací zoznam (localStorage swVideosDev) */
    var dev = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
    try {
      var fx = dev && JSON.parse(localStorage.getItem('swVideosDev') || 'null');
      if (fx && fx.items) { VIDEOS.items = fx.items; return; }
      var kept = JSON.parse(localStorage.getItem(VIDEOS_KEY) || 'null');
      if (kept && kept.items && Date.now() - kept.ts < 3 * 864e5) VIDEOS.items = kept.items;
    } catch (e) {}
    if (!window.fetch) return;
    var ctl = window.AbortController ? new AbortController() : null;
    if (ctl) setTimeout(function () { ctl.abort(); }, 8000);
    fetch(VIDEOS_URL, { credentials: 'omit', signal: ctl ? ctl.signal : undefined })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d || !d.items) return;
        var same = JSON.stringify(d.items) === JSON.stringify(VIDEOS.items);
        try { localStorage.setItem(VIDEOS_KEY, JSON.stringify({ ts: Date.now(), items: d.items })); } catch (e) {}
        VIDEOS.items = d.items;
        if (!same) document.dispatchEvent(new CustomEvent('sw:videos'));
      })
      .catch(function () {});
  })();

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function fileUrl(u) { return /^https?:/.test(u) ? u : VIDEA + u; }

  /* riadok z tabuľky → karta: náhľad, krátka ukážka, odkaz na originál */
  function sheetVideo(it) {
    var v = it.v, img = it.img ? (/^https?:/.test(it.img) ? it.img : ASSETS + it.img) : '';
    if (!img && v.k === 'yt') img = 'https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg';
    if (!img && v.k === 'gd') img = 'https://drive.google.com/thumbnail?id=' + v.id + '&sz=w540';
    return { id: it.id, v: v, t: it.t, tag: it.tag, img: img, prev: v.k === 'file' ? fileUrl(v.u) : '' };
  }
  /* pôvodné reels z CFG.ugc: ukážka a plagát sú v » videa a » obrazky */
  function cfgVideo(it) {
    return { id: 'fb' + it.fb, v: { k: 'fb', u: 'https://www.facebook.com/reel/' + it.fb }, t: it.t, tag: it.tag,
      views: it.views, img: it.poster || '', prev: it.video ? VIDEA + 'ugc-' + it.fb + '.mp4' : '' };
  }
  function videoHref(v) {
    return v.k === 'yt' ? 'https://www.youtube.com/shorts/' + v.id
      : v.k === 'ig' ? 'https://www.instagram.com/reel/' + v.id + '/'
      /* Disk: karta nevedie na Disk, kde sa dá video stiahnuť (Braňo 6. 11.);
         klik otvorí prehrávač na stránke */
      : v.k === 'gd' ? '#'
      : v.k === 'file' ? fileUrl(v.u) : v.u;
  }

  /* úvod: videá označené v tabuľke na úvod, inak pôvodné reels */
  function homeVideos() {
    var own = (VIDEOS.items || []).filter(function (it) { return it.home; }).map(sheetVideo);
    return own.length ? own : (CFG.ugc || []).map(cfgVideo);
  }

  /* Detail: stĺpec Produkt(y) má názvy z e-shopu oddelené čiarkou, ale čiarka je
     aj v názvoch („Melatonín 0,5 mg"). Preto sa hľadajú celé názvy produktov,
     najdlhšie najprv (inak „Vitamín D3 2 000 IU" chytí aj Minitablety Vitamín D3
     2 000 IU), a nájdený kus sa z textu vyškrtne. Potom línie z menu (Silwer Gold
     = všetky produkty kategórie /gold/) a prípadné priame adresy (/glp-1/).
     Diakritika, veľké písmená a interpunkcia nevadia. */
  function nkey(s) {
    return ' ' + String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ').trim() + ' ';
  }
  var MATCH = null;
  function matcher() {
    if (MATCH && MATCH.at === DATA.at) return MATCH;
    var prods = Object.keys(DATA.products).map(function (u) { return [nkey(DATA.products[u].n), [u]]; });
    var lines = PRODUKTY.map(function (p) { return [nkey(p[0]), DATA.cats[p[1]] || []]; });
    var byLen = function (a, b) { return b[0].length - a[0].length; };
    MATCH = { at: DATA.at, list: prods.sort(byLen).concat(lines.sort(byLen)), memo: {} };
    return MATCH;
  }
  function videoProducts(text) {
    var m = matcher();
    if (m.memo[text]) return m.memo[text];
    var out = {}, s = nkey(text);
    (text.match(/\/[a-z0-9-_]+\//g) || []).forEach(function (u) { out[u] = 1; });
    m.list.forEach(function (x) {
      if (x[0].length > 2 && s.indexOf(x[0]) >= 0) {
        x[1].forEach(function (u) { out[u] = 1; });
        s = s.split(x[0]).join(' ');
      }
    });
    return (m.memo[text] = out);
  }
  function productVideos(path) {
    return (VIDEOS.items || []).filter(function (it) {
      return it.product && it.p && videoProducts(it.p)[path];
    }).map(sheetVideo);
  }

  /* karty 9:16: plagát cez celú kartu, štítok hore, titulok dole */
  var PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>';
  function videoCards(items, clone) {
    return '<div class="sw-ugc__set"' + (clone ? ' aria-hidden="true"' : '') + '>' + items.map(function (it, i) {
      return '<a class="sw-ugc__c" href="' + esc(videoHref(it.v)) + '" target="_blank" rel="noopener" draggable="false"' +
        (clone ? ' tabindex="-1"' : '') + ' data-i="' + i + '" aria-label="Prehrať video: ' + esc(it.t) + '">' +
        '<span class="sw-ugc__media' + (it.img ? '' : ' is-empty') + '"' +
        (it.img ? ' data-poster="' + esc(it.img) + '"' : '') + '>' +
        (it.prev ? '<video muted loop playsinline preload="none" data-src="' + esc(it.prev) + '"></video>' : '') +
        '</span><span class="sw-ugc__shade"></span>' +
        (it.tag ? '<span class="sw-ugc__tag">' + esc(it.tag) + '</span>' : '') +
        '<span class="sw-ugc__play">' + PLAY + '</span>' +
        '<span class="sw-ugc__b"><span class="sw-ugc__t">' + esc(it.t) + '</span>' +
        (it.views ? '<span class="sw-ugc__v">' + esc(it.views) + ' pozretí</span>' : '') + '</span></a>';
    }).join('') + '</div>';
  }

  /* ukážky sa načítajú a hrajú potichu, len keď je karta na obrazovke;
     klik otvorí prehrávač (Ctrl/Cmd klik nechá prehliadaču nový panel) */
  function bindVideos(root, items) {
    var still = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    var vids = root.querySelectorAll('video');
    if (vids.length && 'IntersectionObserver' in window && !still) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          var v = e.target;
          if (e.isIntersecting) {
            if (!v.getAttribute('src')) { v.addEventListener('playing', function () { v.classList.add('is-ready'); }); v.src = v.getAttribute('data-src'); }
            var p = v.play(); if (p && p.catch) p.catch(function () {});
          } else if (!v.paused) v.pause();
        });
      }, { threshold: .6 });
      vids.forEach(function (v) { io.observe(v); });
    }
    /* Plagáty sa stiahnu, až keď je karta 400 px od obrazovky (pás má 8 až 50
       kariet, na mobile je vidno dve). Plagát, ktorý sa nenačíta, nahradí tmavá plocha. */
    function poster(m) {
      var u = m.getAttribute('data-poster');
      if (!u) return;
      m.removeAttribute('data-poster');
      var t = new Image();
      t.onload = function () { m.style.backgroundImage = 'url("' + u + '")'; };
      t.onerror = function () { m.classList.add('is-empty'); };
      t.src = u;
    }
    var media = root.querySelectorAll('.sw-ugc__media[data-poster]');
    if ('IntersectionObserver' in window) {
      var pio = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { pio.unobserve(e.target); poster(e.target); } });
      }, { rootMargin: '400px' });
      media.forEach(function (m) { pio.observe(m); });
    } else media.forEach(poster);
    root.addEventListener('click', function (e) {
      var c = e.target.closest && e.target.closest('.sw-ugc__c');
      if (!c || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
      e.preventDefault();
      playVideo(items[+c.getAttribute('data-i')], c);
    });
  }

  /* Prehrávač: tmavé okno nad stránkou, video na výšku (9:16) cez embed danej
     siete. Prehrávanie spustí až klik, iframe sa pri zatvorení zahodí (zastaví zvuk). */
  function playerSrc(v) {
    if (v.k === 'yt') return 'https://www.youtube-nocookie.com/embed/' + v.id + '?autoplay=1&playsinline=1&rel=0';
    if (v.k === 'fb') return 'https://www.facebook.com/plugins/video.php?href=' + encodeURIComponent(v.u) +
      '&show_text=false&autoplay=true&width=500';
    if (v.k === 'ig') return 'https://www.instagram.com/reel/' + v.id + '/embed/';
    if (v.k === 'gd') return 'https://drive.google.com/file/d/' + v.id + '/preview';
    return '';
  }
  function playVideo(it, from) {
    if (!it || document.querySelector('.sw-vp')) return;
    var root = document.documentElement, prevOverflow = root.style.overflow;
    var box = el('div', 'sw-vp');
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', it.t || 'Video');
    var frame = el('div', 'sw-vp__f' + (it.v.k === 'ig' ? ' sw-vp__f--ig' : it.v.k === 'gd' ? ' sw-vp__f--gd' : ''));
    if (it.v.k === 'file') {
      frame.innerHTML = '<video controls autoplay playsinline src="' + esc(fileUrl(it.v.u)) + '"></video>';
    } else {
      frame.innerHTML = '<iframe src="' + esc(playerSrc(it.v)) + '" title="' + esc(it.t || 'Video') + '" ' +
        'allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen loading="eager"' +
        /* Disk: sandbox bez allow-popups zablokuje „Otvoriť v novom okne" aj keby
           ikona presvitla (Braňova úprava na živom webe 7. 11.) */
        (it.v.k === 'gd' ? ' sandbox="allow-scripts allow-same-origin allow-presentation"' : '') + '></iframe>';
    }
    var x = el('button', 'sw-vp__x', '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>');
    x.type = 'button';
    x.setAttribute('aria-label', 'Zavrieť video');
    box.appendChild(frame);
    box.appendChild(x);
    function close() {
      box.remove();
      root.style.overflow = prevOverflow;
      document.removeEventListener('keydown', key);
      if (from && from.focus) from.focus({ preventScroll: true });
    }
    function key(e) { if (e.key === 'Escape') close(); }
    x.addEventListener('click', close);
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    document.addEventListener('keydown', key);
    root.style.overflow = 'hidden';
    document.body.appendChild(box);
    x.focus({ preventScroll: true });
  }

  /* Pás na úvode: rad vysokých kariet cez celú šírku okna, sám sa pomaly
     posúva dokola (marquee). Zastaví sa, keď je nad ním myš alebo je v ňom
     fokus, a dá sa ťahať myšou aj prstom. Pri menej ako 4 videách stojí. */
  var UGC_SPEED = 34;   /* px za sekundu */
  function videoStrip(items) {
    videoStyle();
    var still = items.length < 4 ||
      !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    var sec = el('section', 'sw-ugc' + (still ? ' sw-ugc--static' : ''));
    /* bez nadpisu (Jan 9. 10.) — videá hovoria samy */
    sec.setAttribute('aria-label', 'Videá: lekári, zakladateľ a ľudia, ktorí Silwer poznajú');
    sec.setAttribute('data-sig', items.map(function (it) { return it.id; }).join(','));
    /* tri sady: pri posune o jednu sadu ostanú na obrazovke vždy ďalšie dve,
       takže pás nemá koniec ani na širokom monitore */
    var ARR = function (d) { return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' +
      (d < 0 ? 'M20 12H4M10 6l-6 6 6 6' : 'M4 12h16M14 6l6 6-6 6') + '"/></svg>'; };
    sec.id = 'videa';
    sec.innerHTML = '<div class="sw-ugc__track">' + videoCards(items) +
      (still ? '' : videoCards(items, true) + videoCards(items, true)) + '</div>' +
      '<div class="sw-ugc__ctl">' +
      '<button type="button" class="sw-ugc__nav" data-d="-1" aria-label="Predchádzajúce videá">' + ARR(-1) + '</button>' +
      '<button type="button" class="sw-ugc__nav" data-d="1" aria-label="Ďalšie videá">' + ARR(1) + '</button></div>';
    var track = sec.querySelector('.sw-ugc__track');
    var nudge = still ? function (d) {
      var c = track.querySelector('.sw-ugc__c');
      track.scrollBy({ left: d * ((c ? c.offsetWidth : 240) + 16), behavior: 'smooth' });
    } : ugcMarquee(sec, track);
    if (still) {
      var ctl = sec.querySelector('.sw-ugc__ctl');
      var fit = function () { ctl.style.display = track.scrollWidth > track.clientWidth + 4 ? '' : 'none'; };
      window.addEventListener('resize', fit);
      setTimeout(fit, 0);
    }
    sec.querySelectorAll('.sw-ugc__nav').forEach(function (b) {
      b.addEventListener('click', function () { nudge(+b.getAttribute('data-d')); });
    });
    bindVideos(sec, items);
    return sec;
  }

  /* Posun pásu: jeden rAF, poloha v px modulo šírka jednej sady. Beží len keď
     je pás na obrazovke a záložka je viditeľná. */
  function ugcMarquee(sec, track) {
    var off = 0, W = 0, last = 0, raf = 0, onScreen = false;
    var hover = false, focus = false, drag = null, dragged = false;
    var tw = null, hold = 0;   /* tw = prebiehajúci posun šípkou, hold = dokedy po ňom stojí */
    function measure() { W = track.firstElementChild ? track.firstElementChild.offsetWidth : 0; }
    function paint() {
      if (!W) return;
      off = ((off % W) + W) % W;
      track.style.transform = 'translate3d(' + (-off).toFixed(2) + 'px,0,0)';
    }
    function frame(t) {
      if (!W) measure();
      /* po prepnutí záložky je medzera medzi snímkami dlhá, pás nesmie skočiť */
      if (tw) {
        var k = Math.min(1, (t - tw.t0) / 420), e = 1 - Math.pow(1 - k, 3);
        off = tw.from + (tw.to - tw.from) * e;
        if (k >= 1) tw = null;
      } else if (last && !hover && !focus && !drag && t > hold) off += Math.min(t - last, 64) / 1000 * UGC_SPEED;
      last = t;
      paint();
      raf = requestAnimationFrame(frame);
    }
    function sync() {
      var run = onScreen && !document.hidden;
      if (run && !raf) { last = 0; raf = requestAnimationFrame(frame); }
      else if (!run && raf) { cancelAnimationFrame(raf); raf = 0; }
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { onScreen = es[0].isIntersecting; sync(); }).observe(sec);
    } else onScreen = true;
    document.addEventListener('visibilitychange', sync);
    window.addEventListener('resize', function () { measure(); paint(); });

    /* myš nad pásom ho zastaví; dotyk hover nemá, tam zastaví až ťahanie */
    sec.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') hover = true; });
    sec.addEventListener('pointerleave', function () { hover = false; });
    /* fokus z klávesnice: zastaviť a kartu dostať celú na obrazovku */
    sec.addEventListener('focusin', function (e) {
      focus = true;
      var c = e.target.closest && e.target.closest('.sw-ugc__c');
      if (!c) return;
      var r = c.getBoundingClientRect();
      if (r.left < 16) off += r.left - 16;
      else if (r.right > window.innerWidth - 16) off += r.right - window.innerWidth + 16;
      paint();
    });
    sec.addEventListener('focusout', function () { focus = false; });

    /* ťahanie myšou aj prstom; zvislý posun stránky ostáva prehliadaču */
    track.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      drag = { x: e.clientX, off: off, id: e.pointerId, on: false };
      dragged = false;
    });
    track.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var dx = e.clientX - drag.x;
      if (!drag.on) {
        if (Math.abs(dx) < 6) return;
        drag.on = true; dragged = true;
        track.classList.add('is-drag');
        try { track.setPointerCapture(drag.id); } catch (err) {}
      }
      off = drag.off - dx;
      paint();
    });
    function end(e) {
      if (!drag || (e && e.pointerId !== drag.id)) return;
      drag = null;
      track.classList.remove('is-drag');
    }
    track.addEventListener('pointerup', end);
    track.addEventListener('pointercancel', end);
    track.addEventListener('dragstart', function (e) { e.preventDefault(); });
    /* pustenie po ťahaní nesmie otvoriť reel */
    track.addEventListener('click', function (e) {
      if (dragged) { e.preventDefault(); e.stopPropagation(); dragged = false; }
    }, true);
    /* šípky: posun o jednu kartu, potom pás chvíľu stojí */
    return function (dir) {
      var c = track.querySelector('.sw-ugc__c'), set = track.firstElementChild;
      var step = (c ? c.offsetWidth : 240) + (set ? parseFloat(getComputedStyle(set).columnGap) || 16 : 16);
      var now = performance.now();
      var from = tw ? tw.to : off;
      tw = { from: off, to: from + dir * step, t0: now };
      hold = now + 3500;
    };
  }

  function videoStyle() {
    addStyle('videos', [
      /* ---------- social proof: UGC videá (štýl icon.com) ---------- */
      /* pás bez pozadia (Jan 9. 10.), cez celú šírku okna, okraje sa na oboch
         stranách strácajú do bielej. Beží ako marquee (Jan 10. 10.): tri rovnaké
         sady kariet za sebou, JS posúva pás o šírku jednej sady dokola. */
      '.sw-ugc{position:relative;padding:32px 0 18px;overflow:hidden;background:#fff}',
      '.sw-ugc::before,.sw-ugc::after{content:"";position:absolute;top:0;bottom:0;width:min(140px,9vw);z-index:2;pointer-events:none}',
      '.sw-ugc::after{right:0;background:linear-gradient(270deg,#fff,rgba(255,255,255,0))}',
      '.sw-ugc::before{left:0;background:linear-gradient(90deg,#fff,rgba(255,255,255,0))}',
      '.sw-ugc__track{display:flex;width:max-content;padding:4px 0 10px;will-change:transform;touch-action:pan-y;',
      'cursor:grab;-webkit-user-select:none;user-select:none}',
      '.sw-ugc__track.is-drag{cursor:grabbing}.sw-ugc__track.is-drag .sw-ugc__c{pointer-events:none}',
      '.sw-ugc__set{display:flex;flex:none;gap:16px;padding-right:16px}',
      /* Posun medzi videami (feedback 12. 10.): šípky s chvostom v obrysovom
         krúžku POD pásom, aby sa neplietli s trojuholníkom Play na kartách.
         Sú aj na mobile. */
      '.sw-ugc{scroll-margin-top:150px}',
      '.sw-ugc__ctl{display:flex;justify-content:center;gap:12px;margin-top:8px;position:relative;z-index:3}',
      '.sw-ugc__nav{display:flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:50%;',
      'border:1.5px solid var(--sw-ink);background:#fff;color:var(--sw-ink);cursor:pointer;padding:0;transition:background .15s,color .15s}',
      '.sw-ugc__nav:hover{background:var(--sw-ink);color:#fff}',
      '.sw-ugc__nav svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}',
      /* bez pohybu (prefers-reduced-motion): jedna sada, posúva sa ručne */
      '.sw-ugc--static .sw-ugc__track{width:auto;overflow-x:auto;scrollbar-width:none;cursor:auto;touch-action:auto;',
      'padding-left:var(--sw-gut)}',
      '.sw-ugc--static .sw-ugc__track::-webkit-scrollbar{display:none}',
      /* pár videí z tabuľky: rad v strede, šípky len keď je kam posúvať (JS) */
      '.sw-ugc--static .sw-ugc__set{margin:0 auto}',
      /* roh ako dlaždice „Čo Vás trápi?" (14 px). Zaoblenie je aj priamo na videu:
         orez cez overflow rodiča sa pri posúvanom páse na GPU vrstve videa trhá */
      '.sw-ugc__c{position:relative;flex:none;width:clamp(200px,19vw,250px);aspect-ratio:9/16;border-radius:14px;overflow:hidden;',
      'background:#1D1B1A;color:#fff!important;text-decoration:none!important;isolation:isolate;-webkit-user-drag:none;',
      'box-shadow:0 1px 0 rgba(0,0,0,.04);transition:transform .25s}',
      '.sw-ugc__c:hover{transform:translateY(-4px)}',
      '.sw-ugc__media{position:absolute;inset:0;z-index:-2;background-size:cover;background-position:center;border-radius:inherit}',
      '.sw-ugc__media.is-empty{background:linear-gradient(160deg,#2A2826,#11100F)}',
      '.sw-ugc__media video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .4s;border-radius:inherit}',
      '.sw-ugc__media video.is-ready{opacity:1}',
      '.sw-ugc__shade{position:absolute;inset:0;z-index:-1;border-radius:inherit;background:linear-gradient(180deg,rgba(0,0,0,.28) 0%,rgba(0,0,0,0) 22%,',
      'rgba(0,0,0,0) 52%,rgba(0,0,0,.78) 100%)}',
      '.sw-ugc__tag{position:absolute;top:12px;left:12px;right:12px;width:fit-content;max-width:calc(100% - 24px);',
      'padding:6px 10px;border-radius:999px;background:rgba(255,255,255,.92);color:var(--sw-ink);font-size:11.5px;',
      'font-weight:700;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '.sw-ugc__play{position:absolute;left:50%;top:50%;width:52px;height:52px;margin:-26px 0 0 -26px;border-radius:50%;',
      'background:rgba(255,255,255,.22);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:flex;align-items:center;',
      'justify-content:center;transition:transform .2s,background .2s}',
      '.sw-ugc__play svg{width:22px;height:22px;fill:#fff;margin-left:3px}',
      '.sw-ugc__c:hover .sw-ugc__play{transform:scale(1.08);background:rgba(255,255,255,.34)}',
      '.sw-ugc__c:has(video.is-ready) .sw-ugc__play{opacity:0}',
      '.sw-ugc__b{position:absolute;left:14px;right:14px;bottom:14px;display:flex;flex-direction:column;gap:5px}',
      '.sw-ugc__t{font-size:15.5px;font-weight:700;line-height:1.25;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.35)}',
      '.sw-ugc__v{font-size:12.5px;color:rgba(255,255,255,.8)}',
      '@media(max-width:767px){.sw-ugc{padding:22px 0 12px}',
      '.sw-ugc__set{gap:12px;padding-right:12px}.sw-ugc__c{width:58vw;border-radius:12px}}',
    /* ---------- prehrávač ---------- */
    '.sw-vp{position:fixed;inset:0;z-index:2147483647;background:rgba(10,9,8,.86);display:flex;align-items:center;',
    'justify-content:center;padding:56px 16px 24px;box-sizing:border-box;animation:sw-vp-in .2s ease-out}',
    '@keyframes sw-vp-in{from{opacity:0}to{opacity:1}}',
    '.sw-vp__f{position:relative;height:min(100%,820px);aspect-ratio:9/16;max-width:100%;border-radius:14px;overflow:hidden;',
    'background:#000;box-shadow:0 20px 60px rgba(0,0,0,.45)}',
    /* Instagram pridáva hlavičku a popis nad a pod video, okno je preto vyššie */
    '.sw-vp__f--ig{aspect-ratio:auto;width:min(100%,400px);background:#fff}',
    '.sw-vp__f iframe,.sw-vp__f video{position:absolute;inset:0;width:100%;height:100%;border:0;display:block;object-fit:contain;background:#000}',
    '.sw-vp__f--ig iframe{background:#fff}',
    /* Google Disk: prehrávač má vpravo hore ikonu „Otvoriť v novom okne", ktorá
       vedie na Disk (Braňo 4. 11.). Iframe je z cudzej domény, CSS ju nevie
       skryť, preto je iframe o horný pás vyšší a ten pás je orezaný rámom.
       Video a ovládanie dole ostávajú celé (overené 5. 11. pred aj počas prehrávania). */
    '.sw-vp__f--gd iframe{inset:auto;left:0;top:-64px;height:calc(100% + 64px)}',
    '.sw-vp__x{position:absolute;top:12px;right:12px;width:44px;height:44px;border-radius:50%;border:0;padding:0;cursor:pointer;',
    'background:#fff;color:#000;display:flex;align-items:center;justify-content:center;transition:transform .15s}',
    '.sw-vp__x:hover{transform:scale(1.06)}',
    '.sw-vp__x svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round}',
    '@media(max-width:767px){.sw-vp{padding:60px 10px 16px}}'
    ].join(''));
  }

  /* ===== 3. KOMPONENT: blok pomoci ======================================== */
  /* Pomoc s výberom — nákupná asistentka Silwa (feedback 7. 10.):
     vlastný priestor, nie súčasť tmavého pásu s newsletterom, bez slov
     „poradenstvo" a „test". Počet otázok je skutočný (štyri).
     Klient 20. 10.: namiesto piktogramu fotka tašky z hera asistentky
     (posledný snímok hero-silwa.mp4) a bez telefónu, asistentka nie je linka. */
  function helpBlock() {
    return '<div class="sw-help">' +
      '<div class="sw-help__v">' + (CFG.silwaImg ? '<img src="' + CFG.silwaImg + '" alt="Silwa">'
        : '<img class="sw-help__ph" src="' + ASSETS + 'asistentka-taska.jpg" alt="Taška s produktmi Silwer" loading="lazy">') + '</div>' +
      '<div class="sw-help__b"><span class="sw-eyebrow">Nákupná asistentka</span>' +
      '<h2>Potrebujete pomôcť <b>s výberom?</b></h2>' +
      '<p>Pomôže Vám Silwa. Odpoviete na štyri otázky o tom, čo chcete riešiť, a ukáže Vám ' +
      'najviac dva produkty, nie celý katalóg. Výber doplnku vždy konzultujte so svojím ' +
      'lekárom alebo lekárnikom.</p>' +
      '<div class="sw-help__cta"><a class="sw-btn sw-btn--dark" href="' + CFG.guideUrl + '">Pomôcť s výberom →</a></div>' +
      '</div></div>';
  }

  /* Obrázky v pozadí pod okrajom obrazovky (dlaždice oblastí, plagáty reels) sa stiahnu,
     až keď sú 400 px od viditeľnej časti. data-sw-img → premenná --img, data-sw-bg →
     background-image. Skryté prvky (zbalené „Viac") sa načítajú pri rozbalení. */
  var lazyIO = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { lazyIO.unobserve(e.target); paintBg(e.target); } });
  }, { rootMargin: '400px' }) : null;
  function paintBg(el) {
    var u = el.getAttribute('data-sw-img');
    if (u) { el.style.setProperty('--img', 'url("' + u + '")'); el.removeAttribute('data-sw-img'); }
    var b = el.getAttribute('data-sw-bg');
    if (b) { el.style.backgroundImage = 'url("' + b + '")'; el.removeAttribute('data-sw-bg'); }
  }
  function lazyBg() {
    document.querySelectorAll('[data-sw-img],[data-sw-bg]').forEach(function (el) {
      if (el.swLazy) return;
      el.swLazy = true;
      if (lazyIO) lazyIO.observe(el); else paintBg(el);
    });
  }
  /* moduly stavajú stránku pri DOMContentLoaded, potom sa prejde všetko naraz */
  document.addEventListener('DOMContentLoaded', function () { setTimeout(lazyBg, 0); });
  document.addEventListener('ShoptetDOMPageContentLoaded', function () { setTimeout(lazyBg, 0); });
  /* fn po udalosti load (+ ms): veci, ktoré nie sú na prvej obrazovke, nebrzdia jej načítanie */
  function afterLoad(fn, ms) {
    var run = function () { setTimeout(fn, ms || 0); };
    if (document.readyState === 'complete') run(); else window.addEventListener('load', run);
  }

  window.SW = { CFG: CFG, el: el, svg: svg, has: has, body: body, money: money, lazyBg: lazyBg, afterLoad: afterLoad,
                DATA: DATA, VIDEA: VIDEA, ASSETS: ASSETS, parseMoney: parseMoney, addStyle: addStyle, needsGrid: needsGrid, allNeedsGrid: allNeedsGrid,
                megaMenu: megaMenu, needIc: needIc, needHref: needHref, needProducts: needProducts, MENU: MENU, onAccent: onAccent, newsCss: newsCss, ratingCss: ratingCss,
                helpBlock: helpBlock, NEEDS: NEEDS, HERO_IMG: HERO_IMG, HERO_IMG_FALLBACK: HERO_IMG_FALLBACK, EXTRA: EXTRA, PRODUKTY: PRODUKTY,
                PREKOHO: PREKOHO, RED: RED, RED_DEEP: RED_DEEP,
                videoStrip: videoStrip, videoCards: videoCards, bindVideos: bindVideos, videoStyle: videoStyle,
                homeVideos: homeVideos, productVideos: productVideos };
})();

/* ============================================================================
   MODUL: ÚVODNÁ STRÁNKA  (body.type-index)
   Prestavuje to, čo na stránke UŽ JE. Nepridáva vymyslený obsah.
   Overené na živom webe: carousel 3 slajdy, 2 bloky bestsellerov, 6 log médií
   v .napisali-section, benefit bannery, blog, posledné hodnotenia.
   ========================================================================== */
(function () {
  'use strict';
  var S = window.SW; if (!S || !S.body('type-index')) return;

  S.addStyle('home', [
    /* hero: carousel dostane čitateľný prekryv namiesto textu na fotke */
    'body.type-index #carousel .item{position:relative}',
    'body.type-index .carousel-wrapper{margin-bottom:0}',

    /* nadpisy sekcií */
    'body.type-index .homepage-group-title{font-size:clamp(22px,2.6vw,32px)!important;',
    'font-weight:700!important;letter-spacing:-.02em;color:var(--sw-ink);margin:0 0 6px!important;',
    'text-align:left!important;text-transform:none!important}',
    'body.type-index .products-wrapper{max-width:1240px;margin:0 auto;padding:0 20px}',

    /* Shoptetov „nadpis e-shopu" (.welcome .h1) sa vykresľoval ako osamotený
       titulok uprostred stránky medzi blogom a hodnoteniami. Pre vyhľadávače
       zostáva skrytý <h1 class="sr-only"> s tým istým textom, ten sa nemení. */
    'body.type-index #content>.welcome-wrapper{display:none!important}',


    /* --- produktové bloky: zo slidera na čistú mriežku ---
       Skutočná štruktúra je .products.product-slider > .products-block > .product,
       pričom .products-block je flex široký ~3 800 px. Mriežka teda ide na neho. */
    'body.type-index .products.product-slider{overflow:visible!important;width:100%!important}',
    'body.type-index .products.product-slider .products-block{display:grid!important;',
    'grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;width:100%!important;',
    /* transition:none — slider má na bloku inline „transition:200ms". Keď náš
       štýl príde až po ňom (DEV GATE načíta skripty neskoro), šírka 3 752 px sa
       do mriežky „animuje", a v záložke otvorenej na pozadí tá animácia stojí,
       takže stránka má dovtedy vodorovný posuvník. */
    'transform:none!important;transition:none!important;overflow:visible!important;flex-wrap:wrap}',
    'body.type-index .products.product-slider .products-block>.product:nth-child(n+9){display:none!important}',
    'body.type-index .product-slider-holder{overflow:visible!important}',
    /* mriežka ukazuje max. 8 kariet, bodky slidera už nemajú čo stránkovať */
    'body.type-index .product-slider-pagination,',
    'body.type-index .product-slider-navigation,body.type-index [class*="slider-arrow"],',
    'body.type-index .product-slider-holder .slick-arrow,',
    'body.type-index .product-slider-holder .splide__arrows{display:none!important}',
    '@media(max-width:1100px){body.type-index .products.product-slider .products-block{grid-template-columns:repeat(3,minmax(0,1fr))}',
    'body.type-index .products.product-slider .products-block>.product:nth-child(n+7){display:none!important}}',
    '@media(max-width:767px){body.type-index .products.product-slider .products-block{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}',
    'body.type-index .products.product-slider .products-block>.product:nth-child(n+7){display:none!important}}',

    /* hlavička bloku + odkaz na celú kategóriu */
    /* #content je z admin CSS flex-column, preto align-self a width */
    '.sw-blockhead{display:flex!important;align-items:baseline;justify-content:space-between;',
    'gap:20px;width:100%;align-self:stretch;max-width:1240px;margin:0 auto!important;',
    'padding:0 20px 10px!important;box-sizing:border-box}',
    /* admin CSS dáva nadpisom order (kvôli poradiu sekcií v #content).
       Vnútri blockheadu to prehadzuje nadpis za odkaz — preto reset. */
    '.sw-blockhead>*{order:0!important}',
    '.sw-blockhead>.homepage-group-title{margin:0!important;padding:0!important;flex:1 1 auto;',
    'text-align:left!important;order:0!important}',
    '.sw-blockhead>a{order:1!important;flex:0 0 auto}',
    '.sw-blockhead a{font-size:14px;font-weight:700;color:var(--sw-ink);text-decoration:underline;',
    'text-underline-offset:3px;white-space:nowrap}',

    /* štítky na kartách — pilulky namiesto blokových nálepiek */
    '.products .flags .flag{display:inline-flex!important;align-items:center;gap:5px;',
    'width:auto!important;max-width:max-content;border-radius:999px!important;',
    'padding:4px 11px!important;font-size:12px!important;font-weight:700!important;',
    'line-height:1.25!important;box-shadow:none!important;text-transform:none!important;',
    'margin:0 0 6px!important;letter-spacing:0!important}',
    '.products .flags{display:flex;flex-direction:column;align-items:flex-start;gap:0}',

    /* logá médií — boli 34 px, čo je na dôveryhodnostný signál málo */
    '.napisali-section{padding:38px 20px!important;background:var(--sw-field)!important}',
    '.napisali-title{font-size:12px!important;font-weight:700!important;letter-spacing:.14em!important;',
    'text-transform:uppercase!important;color:var(--sw-muted)!important;margin-bottom:22px!important}',
    /* ---------- logá médií ----------
       Dva nezávislé problémy, oba namerané, nie odhadnuté.

       1. VIDITEĽNOSŤ. Inline štýl v admine dáva odkazu opacity:.55 a náš
          obrázok mal .62 — vynásobilo sa to na 0,34. Navyše sú tie PNG samy
          o sebe stredne šedé (namerané: luma 124/255). Šedá na šedej.

       2. VEĽKOSŤ. Všetkých šesť súborov je plátno 300x300 px, v ktorom samotné
          logo zaberá len 15 az 35 % výšky. Pri height:52px z toho vyšiel glyf
          8 az 18 px. Preto sa výška nastavuje PRE KAŽDÉ LOGO ZVLÁŠŤ tak, aby
          jeho viditeľná časť vyšla na ~34 px, a záporný horizontálny margin
          odstrihne prázdne okraje, nech sú medzery opticky rovnaké.

          Namerané bounding boxy obsahu v plátne 300x300:
            forbes 170x44 · aktuality 220x46 · topky 145x54
            nc 98x104 · pravda 160x56 · startitup 212x88

       ⚠️ Čísla platia pre KONKRÉTNE súbory. Keď klient nahrá nové logo, bude
          drobné. Trvalé riešenie je vyexportovať logá orezané na obsah — potom
          stačí jedna výška pre všetky a celý tento blok môže zmiznúť. */
    '.napisali-logos{gap:22px 30px!important;--sc:1}',
    /* obrázky log sú štvorce s prázdnym okrajom, orezávané záporným marginom —
       bez overflow:hidden bol klikateľný celý štvorec (až 186 px) a klik vedľa
       loga otvoril odkaz. Klikateľný je teraz len viditeľný box loga. */
    '.napisali-logos a{opacity:1!important;display:block!important;overflow:hidden;position:relative}',
    '.napisali-logos img{--h:120px;--m:0px;--mv:0px;display:block;',
    'height:calc(var(--h) * var(--sc))!important;width:auto!important;max-width:none!important;',
    'margin-left:calc(var(--m) * var(--sc))!important;',
    'margin-right:calc(var(--m) * var(--sc))!important;',
    'margin-top:calc(var(--mv) * var(--sc))!important;',
    'margin-bottom:calc(var(--mv) * var(--sc))!important;',
    'opacity:1!important;filter:grayscale(1) brightness(.5) contrast(1.25)!important;',
    'transition:filter .2s}',
    /* margin je o ~6 px miernejší než vypočítaný okraj — bounding box je meraný
       na alpha>12 a jemné antialiasované okraje sa doň nezmestili */
    /* --m odstrihne prázdno po bokoch, --mv nad a pod. Bez --mv by mal každý
       riadok logotypov 200 px vzduchu navyše (na mobile sa lámu do dvoch). */
    '.napisali-logos img[src*="forbes"]{--h:232px;--m:-42px;--mv:-96px}',
    '.napisali-logos img[src*="aktuality"]{--h:222px;--m:-22px;--mv:-91px}',
    '.napisali-logos img[src*="topky"]{--h:189px;--m:-41px;--mv:-75px}',
    /* ČAS je štvorcový odznak, nie wordmark — pri rovnakej výške pôsobí menší */
    '.napisali-logos img[src*="/nc."]{--h:112px;--m:-30px;--mv:-36px}',
    /* Nový Čas je červený štítok s bielym písmom; plošný šedý filter z neho
       robil tmavosivý štvorec so sivým textom (feedback 7. 10.: „nie je dobre
       viditeľný"). Takto je to čierny štítok s bielym písmom ako ostatné logá. */
    '.napisali-logos img[src*="/nc."]{filter:grayscale(1) contrast(1.6)!important}',
    '.napisali-logos img[src*="pravda"]{--h:182px;--m:-34px;--mv:-71px}',
    '.napisali-logos img[src*="startitup"]{--h:116px;--m:-10px;--mv:-38px}',
    '.napisali-logos a:hover img{filter:grayscale(1) brightness(.28) contrast(1.3)!important}',
    '@media(max-width:600px){.napisali-logos{--sc:.62;gap:16px 20px!important}}',

    /* ---------- posledné hodnotenia produktov („Píšu nám zákazníci") ----------
       Klient (7. 10.): dve hodnotenia na jednej stránke sú duplicita, zostáva
       len widget hodnotenia obchodu, dnes pod názvom „Hodnotenie e-shopu". */
    'body.type-index #content>.homepage-latest-contribution-full-width{display:none!important}',

    /* ---------- blog: „Blogy" ----------
       Shoptet kládol nadpis a perex CEZ obrázok, na ktorom je už vlastný text
       z kampane. Dva texty cez seba boli nečitateľné. Obrázok ide hore,
       text pod neho, štyri karty v rade. */
    'body.type-index .homepage-blog-wrapper{max-width:1240px;margin:0 auto!important;',
    'padding:56px 20px!important;display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr));',
    'gap:16px;width:100%;box-sizing:border-box;position:relative}',
    'body.type-index .homepage-blog-wrapper::before,body.type-index .homepage-blog-wrapper::after{',
    'display:none!important;content:none!important}',
    'body.type-index .homepage-blog-wrapper>.homepage-group-title,body.type-index .homepage-blog-wrapper>.sw-bloghead{',
    'grid-column:1/-1;margin:0 0 10px!important}',
    S.newsCss('body.type-index .homepage-blog-wrapper'),
    '@media(max-width:1100px){body.type-index .homepage-blog-wrapper{grid-template-columns:repeat(2,minmax(0,1fr))}}',
    '@media(max-width:600px){body.type-index .homepage-blog-wrapper{grid-template-columns:minmax(0,1fr);',
    'padding:38px 14px!important}}',

    /* ---------- spoločná hlavička sekcie: nadpis, podnadpis, odkaz vpravo ---------- */
    '.sw-sechead{display:flex;align-items:flex-end;justify-content:space-between;gap:12px 24px;',
    'flex-wrap:wrap;margin:0 0 26px}',
    '.sw-sechead .sw-h{margin:0 0 8px}.sw-sechead .sw-sub{margin:0}',
    '.sw-sechead__a{font-size:15px;font-weight:700;color:var(--sw-ink)!important;white-space:nowrap;',
    'text-decoration:none!important;border-bottom:1.5px solid var(--sw-ink);padding-bottom:3px}',
    '.sw-sechead__a:hover{color:var(--sw-red)!important;border-color:var(--sw-red)}',

    /* ---------- logá médií hneď pod heroom ----------
       V návrhu sú ako tichý pás hneď pod úvodom, nie ako samostatná sekcia
       na konci stránky. Rovnaké logá, len menšie. */
    'body.type-index .sw-media .napisali-section{background:transparent!important;padding:18px 20px 6px!important;',
    'margin:0 auto!important;max-width:1240px}',
    'body.type-index .sw-media .napisali-title{display:none!important}',
    /* logá väčšie (feedback 7. 10.) */
    'body.type-index .sw-media .napisali-logos{--sc:.8;gap:12px 44px!important;display:flex;flex-wrap:wrap;',
    'justify-content:center;align-items:center}',
    'body.type-index .sw-media{background:var(--sw-field)}',
    'body.type-index .sw-media .napisali-section{padding:30px 20px!important}',
    /* v dvoch riadkoch boli logá nalepené na sebe (feedback 12. 10.) */
    '@media(max-width:600px){body.type-index .sw-media .napisali-logos{--sc:.55;gap:26px 24px!important}',
    'body.type-index .sw-media .napisali-section{padding:22px 14px!important}}',

    /* ---------- produktové bloky na teplom podklade ----------
       Blok nadpisu a mriežka sú v #content samostatní súrodenci. Pozadie cez
       celú šírku okna sa preto kreslí tieňom a clip-path, nie obalom, aby sa
       nezmenilo poradie, ktoré určuje admin CSS. */
    'body.type-index #content>.sw-blockhead,body.type-index #content>.products-wrapper{',
    'background:var(--sw-field);box-shadow:0 0 0 100vmax var(--sw-field);clip-path:inset(0 -100vmax)}',
    'body.type-index #content>.sw-blockhead{padding-top:52px!important}',
    'body.type-index #content>.products-wrapper{padding-bottom:40px!important;margin-bottom:0!important}',
    /* benefit bannery nesú tie isté tri vety ako pás dôvery pod heroom */
    'body.type-index #content>.benefit-banners-full-width{display:none!important}',

    /* ---------- Prečo Silwer / Kto stojí za Silwerom (vypnuté do potvrdenia) ---------- */
    '.sw-why,.sw-team{padding:60px 0}',
    '.sw-team{background:var(--sw-field)}',
    '.sw-why__g{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}',
    '.sw-why__c{background:#fff;border:1px solid var(--sw-line);border-radius:14px;padding:26px 28px}',
    '.sw-why__c h3{font-size:18px;font-weight:700;color:var(--sw-ink);margin:0 0 10px;line-height:1.35}',
    '.sw-why__c p{font-size:14.5px;line-height:1.6;color:var(--sw-muted);margin:0}',
    '.sw-team__g{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}',
    '.sw-team__c{background:#fff;border:1px solid var(--sw-line);border-radius:14px;padding:22px;',
    'display:flex;gap:24px;align-items:center}',
    '.sw-team__ph{flex:0 0 auto;width:136px;aspect-ratio:4/5;border-radius:12px;overflow:hidden;background:var(--sw-field)}',
    '.sw-team__ph img{width:100%;height:100%;object-fit:cover;object-position:center top;display:block}',
    '.sw-team__role{font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--sw-muted)}',
    '.sw-team__n{font-size:20px;font-weight:700;color:var(--sw-ink);margin:4px 0 8px}',
    '.sw-team__q{font-size:15px;line-height:1.6;color:var(--sw-text);margin:0}',
    '.sw-why__ic{display:flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:12px;',
    'background:var(--sw-field);margin:0 0 16px}',
    '.sw-why__ic svg{width:24px;height:24px;fill:none;stroke:var(--sw-ink);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}',
    '.sw-pv{display:inline-block;margin-top:10px;font-size:11.5px;font-weight:700;color:#8A6D00;',
    'background:#FFF6D6;border:1px dashed #E3C766;border-radius:6px;padding:3px 8px}',
    '@media(max-width:900px){.sw-why__g,.sw-team__g{grid-template-columns:minmax(0,1fr)}}',
    '@media(max-width:600px){.sw-why,.sw-team{padding:40px 0}.sw-team__c{padding:18px;gap:14px}',
    '.sw-team__c{flex-direction:column;align-items:flex-start}.sw-team__ph{width:120px}}',

    /* prázdne sekcie preč */
    'body.type-index .homepage-banners-full-width:empty,',
    'body.type-index .welcome-wrapper:empty{display:none!important}',

    /* --- HERO carousel (feedback 7. 10.) ---
       Slajdy: hlavný (Všetky produkty), Nájdite si svoj doplnok (asistentka),
       Gold, JOJ Play, Chudnutie, Množstevné zľavy. Klient dodá grafiku —
       slajd s CFG.heroSlides[i].img ju ukáže vpravo, inak sa skladá produkt
       z karty na stránke na svetlom kruhu (Brand Book, princíp 3).
       Slajdy ležia v jednej bunke mriežky na sebe → výška sa neskáče. */
    '.sw-hero{position:relative;overflow:hidden;background-color:var(--sw-black);isolation:isolate;color:#fff}',
    '.sw-hero__slides{display:grid}',
    '.sw-slide{grid-area:1/1;position:relative;opacity:0;visibility:hidden;transition:opacity .6s ease,visibility .6s;isolation:isolate}',
    '.sw-slide.is-on{opacity:1;visibility:visible}',
    '.sw-slide--photo{background-image:var(--sw-hero-img);background-repeat:no-repeat;',
    'background-position:right center;background-size:cover}',
    '.sw-slide--photo::before{content:"";position:absolute;inset:0;z-index:-1;background:',
    'linear-gradient(90deg,rgba(0,0,0,.94) 0%,rgba(0,0,0,.82) 42%,rgba(0,0,0,.08) 75%)}',
    '.sw-hero__in{max-width:calc(1200px + 2*var(--sw-gut));margin:0 auto;padding:80px var(--sw-gut) 92px;box-sizing:border-box;',
    'display:grid;grid-template-columns:minmax(0,1fr);gap:40px;align-items:center;min-height:100%}',
    '.sw-slide--pack .sw-hero__in,.sw-slide--img .sw-hero__in{grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr)}',
    '.sw-hero__txt{max-width:600px}',
    '.sw-hero h1,.sw-hero .sw-hero__h{font-size:clamp(38px,4.8vw,62px)!important;font-weight:700!important;',
    'line-height:1.06!important;letter-spacing:-.02em;color:#fff!important;margin:0!important;text-align:left!important;display:block}',
    '.sw-hero .sw-thin{font-weight:100}',
    '.sw-hero__p{max-width:46ch;font-size:18.5px;line-height:1.6;color:rgba(255,255,255,.85);margin:24px 0 8px;font-weight:300}',
    '.sw-hero__cta{display:flex;flex-wrap:wrap;align-items:center;gap:24px;margin-top:26px}',
    /* menej červenej: CTA v hero je biele, červená ostáva na nákupných tlačidlách */
    '.sw-hero__cta .sw-btn{padding:17px 30px;font-size:17px;background:#fff;color:var(--sw-ink)}',
    '.sw-hero__cta .sw-btn:hover{background:var(--sw-red);color:#fff}',
    '.sw-hero__rate{display:flex;align-items:center;gap:12px;margin-top:36px;font-size:15.5px;color:rgba(255,255,255,.9)}',
    '.sw-hero__rate b{color:#fff}',
    '.sw-hero__stars{color:#F5B301;letter-spacing:3px;font-size:17px}',
    /* isolation: darken musí miešať fotku s kruhom, nie s čiernym pozadím slajdu;
       JPG s bielou podložkou sa navyše oreže do kruhu */
    '.sw-hero__pack{position:relative;display:flex;align-items:center;justify-content:center;min-height:360px;isolation:isolate}',
    '.sw-hero__pack::before{content:"";position:absolute;left:50%;top:50%;width:clamp(320px,34vw,440px);',
    'aspect-ratio:1;border-radius:50%;transform:translate(-50%,-50%);',
    'background:radial-gradient(circle at 36% 30%,#FFFFFF 0%,#F7F7F8 48%,var(--sw-gray) 100%)}',
    /* produktové fotky majú bielu podložku — darken ju na svetlom kruhu zmaže */
    '.sw-hero__pack img{position:relative;z-index:1;max-height:clamp(240px,27vw,350px);width:auto;mix-blend-mode:darken;',
    'clip-path:circle(49% at 50% 50%)}',
    '.sw-hero__pack--ic svg{position:relative;z-index:1;width:clamp(110px,12vw,150px);height:auto;stroke:var(--sw-ink);',
    'fill:none;stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round}',
    '.sw-hero__img{border-radius:18px;overflow:hidden;aspect-ratio:4/3;background:#111}',
    '.sw-hero__img img{width:100%;height:100%;object-fit:cover;display:block}',
    '.sw-hero__photo{display:none}',
    /* panelový slajd (návrh klienta 8. 10.) */
    /* slajdy ležia v jednej bunke mriežky; výšku určuje najvyšší, panel ju musí vyplniť */
    '.sw-slide--panel{display:flex;flex-direction:column;background:#1D1B1A var(--sw-slide-img) var(--sw-pos)/cover no-repeat}',
    '.sw-slide--panel .sw-hero__in{flex:1 1 auto;width:100%;display:flex;align-items:stretch;padding:0 var(--sw-gut);min-height:clamp(480px,40vw,620px)}',
    /* „život" zostane v prvom riadku ako v mockupe, keď sa zmestí */
    '.sw-slide--panel .sw-hero__h br,.sw-slide--panel h1 br{display:block}',
    '.sw-panel{display:flex;align-items:center;width:min(640px,50%);box-sizing:border-box;background:rgba(29,27,26,.96);',
    'padding:clamp(40px,5vw,72px) clamp(28px,3.6vw,60px);margin-left:calc(-1 * clamp(28px,3.6vw,60px))}',
    /* pri posunutej fotke by cez polopriehľadný panel presvital jej ľavý okraj */
    '.sw-slide--shift .sw-panel{background:#1D1B1A}',
    '.sw-slide--panel h1,.sw-slide--panel .sw-hero__h{color:var(--sw-h-c)!important;font-size:clamp(32px,3.6vw,52px)!important;line-height:1.12!important}',
    '.sw-slide--panel .sw-hero__p{color:rgba(255,255,255,.82)}',
    '.sw-slide--panel .sw-hero__cta .sw-btn{background:var(--sw-btn-bg);color:#1D1B1A}',
    '.sw-slide--panel .sw-hero__cta .sw-btn:hover{background:var(--sw-red);color:#fff}',
    /* desktop: plagát a video ako pozadie slajdu, voliteľne posunuté doprava (--sw-vid-l) */
    '.sw-slide--panel .sw-slide__ph{display:block;position:absolute;top:0;bottom:0;right:0;left:var(--sw-vid-l);z-index:-1;',
    'background:var(--sw-slide-img) var(--sw-pos)/cover no-repeat}',
    '.sw-slide__ph video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:var(--sw-pos);',
    'opacity:0;transition:opacity .5s}',
    '.sw-slide__ph video.is-ready{opacity:1}',
    /* Feedback 14. 10.: fotka má ísť cez celú šírku a čierny pás cez ňu.
       Pri posunutom videu (vidL) by vľavo od panelu ostal tmavý prúžok,
       preto tam ostáva plagát ako pozadie celého slajdu. */
    '.sw-slide--panel:not(.sw-slide--shift):has(.sw-slide__ph video){background-image:none}',
    '@media(min-width:768px) and (max-width:1100px){.sw-slide--panel .sw-slide__ph{',
    'background:var(--sw-ph-t,var(--sw-slide-img) var(--sw-pos)/cover no-repeat)}',
    /* panel tu začína pri ľavom okraji, spoza neho by trčal len úzky prúžok fotky */
    '.sw-slide--shift{background-image:none}}',
    '@media(max-width:767px){.sw-slide--panel{background:#1D1B1A}',
    '.sw-slide--panel .sw-slide__ph{position:relative;left:auto;display:block;aspect-ratio:16/10;z-index:0;',
    'background:var(--sw-slide-img) var(--sw-pos-m)/cover no-repeat}',
    '.sw-slide__ph video{object-position:var(--sw-pos-m)}',
    '.sw-slide--panel .sw-hero__in{min-height:0;padding:0}',
    '.sw-panel{width:100%;margin:0;padding:28px var(--sw-gut) 64px;align-items:flex-start}}',
    /* ovládanie */
    '.sw-hero__nav{position:absolute;left:0;right:0;bottom:26px;display:flex;justify-content:center;gap:10px;z-index:3}',
    '.sw-hero__dot{width:10px;height:10px;border-radius:50%;border:0;padding:0;background:rgba(255,255,255,.35);cursor:pointer;',
    'transition:background .2s,width .2s}',
    '.sw-hero__dot.is-on{background:#fff;width:28px;border-radius:5px}',
    '.sw-hero__arr{position:absolute;top:50%;transform:translateY(-50%);z-index:3;width:46px;height:46px;border-radius:50%;',
    'border:1px solid rgba(255,255,255,.3);background:rgba(0,0,0,.35);color:#fff;cursor:pointer;display:flex;',
    'align-items:center;justify-content:center;font-size:20px;line-height:1;transition:background .15s}',
    '.sw-hero__arr:hover{background:rgba(255,255,255,.15)}',
    '.sw-hero__arr--p{left:16px}.sw-hero__arr--n{right:16px}',
    '@media(max-width:1100px){.sw-hero__arr{display:none}}',
    /* 768 až 900 px: slajd s produktom na kruhu ostáva v dvoch stĺpcoch. V jednom
       bol vysoký 700 px a s ním všetky slajdy (ležia v jednej bunke mriežky),
       takže z fotiek panelových slajdov ostal úzky zvislý pás. */
    '@media(max-width:900px){.sw-hero__pack{min-height:280px}.sw-hero__pack::before{width:260px}',
    '.sw-hero__pack img{max-height:210px}.sw-hero__in{padding-top:56px;padding-bottom:72px;gap:24px}}',
    '@media(max-width:767px){',
    '.sw-slide--photo{background-image:none}.sw-slide--photo::before{display:none}',
    '.sw-hero__in{padding:34px var(--sw-gut) 64px;gap:22px}',
    '.sw-hero__p{font-size:16.5px;color:rgba(255,255,255,.9)}',
    '.sw-hero__cta .sw-btn{width:100%}',
    '.sw-hero__rate{margin-top:24px;font-size:14px}',
    '.sw-hero__pack img{max-height:190px}',
    '.sw-hero__pack::before{width:250px}',
    '.sw-hero__nav{bottom:22px}',
    '.sw-slide--photo .sw-hero__photo{display:block;margin:26px calc(-1*var(--sw-gut)) 0;aspect-ratio:4/3;background-image:var(--sw-hero-img);',
    'background-size:cover;background-position:82% top}}',
    /* Mobil podľa feedbacku 12. 10.: najprv obrázok (štvorec), pod ním užší
       textový blok; šípky aj bodky sedia na obrázku. --sw-hm je výška obrázka.
       Slajdy majú vlastnú výšku a hero sa jej prispôsobí (JS fit()), aby pod
       kratším textom neostávalo prázdno. */
    '@media(max-width:767px){',
    '.sw-hero{--sw-hm:min(100vw,460px)}',
    '.sw-hero__slides{overflow:hidden;transition:height .35s ease}',
    '.sw-slide{align-self:start}',
    '.sw-slide--panel .sw-slide__ph{aspect-ratio:auto;height:var(--sw-hm)}',
    '.sw-hero .sw-hero__in{display:flex;flex-direction:column;gap:0;padding:0;min-height:0}',
    '.sw-slide--pack .sw-hero__pack,.sw-slide--img .sw-hero__img,.sw-slide--photo .sw-hero__photo{order:-1;flex:none;',
    'width:100%;height:var(--sw-hm);aspect-ratio:auto;min-height:0;margin:0;border-radius:0}',
    '.sw-hero__pack::before{width:min(70vw,300px)}',
    '.sw-hero__pack img{max-height:calc(var(--sw-hm) * .58)}',
    '.sw-hero .sw-hero__txt{max-width:none;padding:20px var(--sw-gut) 24px;box-sizing:border-box}',
    '.sw-hero .sw-panel{padding:0;display:block}',
    '.sw-hero h1,.sw-hero .sw-hero__h,.sw-slide--panel h1,.sw-slide--panel .sw-hero__h{font-size:27px!important;line-height:1.14!important}',
    '.sw-hero .sw-hero__p{font-size:15.5px;line-height:1.48;margin:10px 0 0}',
    '.sw-hero .sw-hero__cta{margin-top:16px}',
    '.sw-hero .sw-hero__cta .sw-btn{padding:14px 20px;font-size:16px}',
    '.sw-hero .sw-hero__rate{margin-top:14px;font-size:13.5px;gap:9px}',
    '.sw-hero__nav{top:calc(var(--sw-hm) - 24px);bottom:auto}',
    /* na svetlých fotkách (Gold, Chudnutie) biele bodky zanikali */
    '.sw-hero__dot{box-shadow:0 0 0 1px rgba(0,0,0,.28)}',
    '.sw-hero__arr{display:flex;top:calc(var(--sw-hm) / 2);width:38px;height:38px;font-size:19px;',
    'background:rgba(0,0,0,.5);border-color:rgba(255,255,255,.45)}',
    '.sw-hero__arr--p{left:10px}.sw-hero__arr--n{right:10px}',
    '}',

    /* --- plávajúce widgety na mobile ---
       Heureka „Overené zákazníkmi" sedí na ľavom okraji a pri 375 px reže
       nadpis hero sekcie (overené screenshotom). Rovnaké rozhodnutie už spravil
       predchádzajúci vývojár v silwer-ux.js pre Google recenzie.
       Na desktope zostávajú oba viditeľné. */
    '@media(max-width:767px){[id^="hw-"][id$="left"],[class*="luigi-ac-heromobile"]{display:none!important}}',


    /* sekcia potrieb */
    '.sw-needs-sec{padding:52px 0}',
    '.sw-needs-sec .sw-wrap>.sw-h{margin-bottom:26px}',
    /* pomoc s výberom má vlastný svetlý priestor (feedback 7. 10.), oddelený
       od tmavého pásu s newsletterom */
    '.sw-help-sec{padding:76px 0;background:var(--sw-field)}',
    '@media(max-width:767px){.sw-help-sec{padding:48px 0}}'
  ].join(''));

  /* Fotka produktu do slajdu — z karty na stránke, ktorej odkaz začína `pref`
     (napr. '/silwer-joj-play-'), inak z prvej. Nič sa nehardkóduje.
     Karty sa dopĺňajú asynchrónne, preto opakovanie. */
  var PACK_FOR = { main: '', joj: '/silwer-joj-play-', slim: '/glp-1/', qty: '/magnezium' };
  /* produkt slajdu, ktorý nemusí byť medzi kartami na úvodnej stránke —
     fotka z DATA (generátor ju berie z detailu) */
  var PACK_PRODUCT = { slim: '/glp-1/' };
  var PACK_IMG = {};
  Object.keys(PACK_PRODUCT).forEach(function (k) {
    var d = S.DATA.products[PACK_PRODUCT[k]];
    if (d && d.i) PACK_IMG[k] = d.i;
  });
  function heroPack(box, pref, tries, fixed) {
    if (!box || box.querySelector('img')) return;
    if (fixed) {
      var t = new Image();
      t.onload = function () { box.innerHTML = '<img src="' + fixed + '" alt="">'; };
      t.onerror = function () { heroPack(box, pref, tries); };   /* zlá URL → produkt z karty */
      t.src = fixed;
      return;
    }
    var cards = [].slice.call(document.querySelectorAll('.products .product'));
    if (!cards.length) {
      if ((tries || 0) < 12) setTimeout(function () { heroPack(box, pref, (tries || 0) + 1); }, 600);
      return;
    }
    var pick = cards.filter(function (c) {
      var a = c.querySelector('a.image'); return a && (!pref || (a.getAttribute('href') || '').indexOf(pref) === 0);
    });
    /* PNG s priehľadným pozadím sedí na kruhu lepšie ako JPG s bielou podložkou */
    var imgs = (pick.length ? pick : cards).map(function (c) { return c.querySelector('a.image img'); }).filter(Boolean);
    var url = function (i) { var u = i.getAttribute('data-src') || i.getAttribute('src') || ''; return /^data:/.test(u) ? '' : u; };
    var use = imgs.filter(function (i) { return /\.png/i.test(url(i)); })[0] || imgs.filter(function (i) { return url(i); })[0];
    if (!use) return;
    box.innerHTML = '<img src="' + url(use).replace(/x=\d+&/, 'x=800&').replace(/y=\d+&/, 'y=800&') + '" alt="">';
  }

  /* slajd podľa mockupu klienta: fotka cez celú šírku, tmavý panel s textom */
  function panelSlide(sl, i, n) {
    var head = i === 0 ? '<h1>' + sl.t + '</h1>' : '<p class="sw-hero__h">' + sl.t + '</p>';
    /* fotku má v štýle len prvý slajd, ostatné ju dostanú až v paint() (heroCarousel) */
    var img = 'url(&quot;' + sl.photo + '&quot;)';
    return '<div class="sw-slide sw-slide--panel' + (sl.vidL ? ' sw-slide--shift' : '') + (i === 0 ? ' is-on' : '') + '" data-photo="' + sl.photo + '"' +
      (sl.phT ? ' data-pht="' + sl.phT + '"' : '') +
      ' style="--sw-pos:' + (sl.pos || 'center') +
      ';--sw-pos-m:' + (sl.posM || sl.pos || 'center') + ';--sw-vid-l:' + (sl.vidL || '0px') +
      ';--sw-btn-bg:' + (sl.btn || '#fff') + ';--sw-h-c:' + (sl.hc || '#fff') +
      (i === 0 ? ';--sw-slide-img:' + img + (sl.phT ? ';--sw-ph-t:' + sl.phT.replace('{img}', img) : '') : '') + '"' +
      ' role="group" aria-roledescription="slide" aria-label="' + (i + 1) + ' z ' + n + '"' + (i ? ' aria-hidden="true"' : '') + '>' +
      /* vrstva s plagátom a (lenivo načítaným) videom; na mobile je to obrázok nad textom */
      '<div class="sw-slide__ph" aria-hidden="true">' +
      (sl.video ? '<video muted ' + (sl.once ? 'data-once ' : 'loop ') + 'playsinline preload="none" disablepictureinpicture data-src="' + sl.video + '"></video>' : '') +
      '</div>' +
      '<div class="sw-hero__in"><div class="sw-panel"><div class="sw-hero__txt"' + (sl.rate ? ' data-rate' : '') + '>' + head +
      '<p class="sw-hero__p">' + sl.p + '</p><div class="sw-hero__cta">' +
      '<a class="sw-btn" href="' + sl.href + '"' + (i ? ' tabindex="-1"' : '') + '>' + sl.cta + '</a></div></div></div></div></div>';
  }

  function heroCarousel(car) {
    var slides = (S.CFG.heroSlides || []).filter(function (sl) { return S.CFG.assistant || sl.k !== 'guide'; });
    var hero = S.el('div', 'sw-hero');
    hero.setAttribute('role', 'region');
    hero.setAttribute('aria-roledescription', 'carousel');
    hero.setAttribute('aria-label', 'Novinky a akcie');
    hero.innerHTML = '<div class="sw-hero__slides">' + slides.map(function (sl, i) {
      if (sl.layout === 'panel') return panelSlide(sl, i, slides.length);
      var visual;
      if (sl.img) visual = '<div class="sw-hero__img"><img src="' + sl.img + '" alt=""></div>';
      else if (sl.k === 'main' && S.CFG.heroPhoto) visual = '<div class="sw-hero__photo" aria-hidden="true"></div>';
      else if (sl.k === 'guide')
        visual = S.CFG.silwaImg ? '<div class="sw-hero__pack"><img src="' + S.CFG.silwaImg + '" alt="Silwa"></div>'
          : '<div class="sw-hero__pack sw-hero__pack--ic" aria-hidden="true">' + S.svg('help') + '</div>';
      else visual = '<div class="sw-hero__pack" aria-hidden="true" data-k="' + sl.k + '" data-pref="' + (PACK_FOR[sl.k] || '') + '"></div>';
      var cls = 'sw-slide' + (i === 0 ? ' is-on' : '') +
        (sl.img ? ' sw-slide--img' : (sl.k === 'main' && S.CFG.heroPhoto ? ' sw-slide--photo' : ' sw-slide--pack'));
      /* H1 len na prvom slajde, ostatné majú rovnaký vzhľad bez nadpisu stránky */
      var head = i === 0 ? '<h1>' + sl.t + '</h1>' : '<p class="sw-hero__h">' + sl.t + '</p>';
      return '<div class="' + cls + '" role="group" aria-roledescription="slide" aria-label="' + (i + 1) + ' z ' + slides.length + '"' +
        (i ? ' aria-hidden="true"' : '') + '><div class="sw-hero__in"><div class="sw-hero__txt">' + head +
        '<p class="sw-hero__p">' + sl.p + '</p><div class="sw-hero__cta">' +
        '<a class="sw-btn" href="' + sl.href + '"' + (i ? ' tabindex="-1"' : '') + '>' + sl.cta + ' →</a></div></div>' +
        visual + '</div></div>';
    }).join('') + '</div>' +
    (slides.length > 1 ? '<button type="button" class="sw-hero__arr sw-hero__arr--p" aria-label="Predchádzajúci">‹</button>' +
      '<button type="button" class="sw-hero__arr sw-hero__arr--n" aria-label="Ďalší">›</button>' +
      '<div class="sw-hero__nav">' + slides.map(function (sl, i) {
        return '<button type="button" class="sw-hero__dot' + (i === 0 ? ' is-on' : '') + '" aria-label="Slajd ' + (i + 1) + '"></button>';
      }).join('') + '</div>' : '');

    /* čiernobiela fotka páru sa načíta len keď ju nejaký slajd používa */
    if (S.CFG.heroPhoto && hero.querySelector('.sw-slide--photo')) {
      var first = hero.querySelector('.sw-slide--photo');
      var setImg = function (u) { if (first) first.style.setProperty('--sw-hero-img', 'url("' + u + '")'); };
      var probe = new Image();
      probe.onload = function () { setImg(S.HERO_IMG); };
      probe.onerror = function () { setImg(S.HERO_IMG_FALLBACK); };
      probe.src = S.HERO_IMG;
    }
    car.parentNode.insertBefore(hero, car);
    car.style.display = 'none';
    /* Fotka slajdu sa stiahne, až keď treba: prvý slajd hneď, ostatné po načítaní
       stránky alebo pri prepnutí (go). Predtým sa naraz sťahovalo všetkých 7 fotiek
       a súperili s prvou o pripojenie. Slajd, ktorého fotka chýba, zmizne. */
    function paint(sl) {
      if (!sl || sl.swPainted || !sl.hasAttribute('data-photo')) return;
      sl.swPainted = true;
      var u = sl.getAttribute('data-photo'), t = new Image();
      t.onerror = function () { dropSlide(hero, sl); paint(hero.querySelector('.sw-slide--panel')); };
      t.src = u;
      sl.style.setProperty('--sw-slide-img', 'url("' + u + '")');
      var pt = sl.getAttribute('data-pht');
      if (pt) sl.style.setProperty('--sw-ph-t', pt.replace('{img}', 'url("' + u + '")'));
    }
    paint(hero.querySelector('.sw-slide--panel'));
    S.afterLoad(function () { [].forEach.call(hero.querySelectorAll('.sw-slide--panel'), paint); });
    hero.querySelectorAll('.sw-hero__pack[data-pref]').forEach(function (b) {
      heroPack(b, b.getAttribute('data-pref'), 0, PACK_IMG[b.getAttribute('data-k')]);
    });

    var all = hero.querySelectorAll('.sw-slide'), dots = hero.querySelectorAll('.sw-hero__dot');
    if (all.length < 2) return;
    var cur = 0, timer;
    /* zoznamy slajdov a bodiek sa čítajú znova, dropSlide ich môže zmenšiť */
    /* video sa načíta až pri prvom zobrazení slajdu a hrá len aktívny slajd */
    var still = (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) ||
      (navigator.connection && navigator.connection.saveData);
    /* Video (terasa 1,2 MB) až 1,5 s po načítaní stránky a len od 768 px na rýchlom
       pripojení. Na mobile ostáva plagát: video tam bralo pásmo prvej obrazovke. */
    var vidOk = false;
    var mqV = window.matchMedia ? window.matchMedia('(min-width:768px)') : null;
    var slowNet = navigator.connection && /(^|-)2g|3g/.test(navigator.connection.effectiveType || '');
    S.afterLoad(function () { vidOk = !slowNet; videos(); }, 1500);
    function videos() {
      [].forEach.call(hero.querySelectorAll('.sw-slide video'), function (v) {
        var on = v.closest('.sw-slide').classList.contains('is-on');
        /* video bez slučky začína pri každom novom zobrazení slajdu od začiatku */
        if (on && !v.swOn && v.hasAttribute('data-once') && v.getAttribute('src')) { try { v.currentTime = 0; } catch (e) {} }
        v.swOn = on;
        if (on && !still && vidOk && (!mqV || mqV.matches)) {
          if (!v.getAttribute('src')) {
            v.addEventListener('playing', function () { v.classList.add('is-ready'); });
            v.setAttribute('src', v.getAttribute('data-src'));
          }
          var pr = v.play(); if (pr && pr.catch) pr.catch(function () {});
        } else if (!v.paused) v.pause();
      });
    }
    hero.swRefresh = function () {
      all = hero.querySelectorAll('.sw-slide'); dots = hero.querySelectorAll('.sw-hero__dot');
      if (cur >= all.length) cur = 0;
      go(cur);
    };
    /* na mobile má každý slajd vlastnú výšku, hero sa jej prispôsobí */
    var mqM = window.matchMedia ? window.matchMedia('(max-width:767px)') : null;
    var box = hero.querySelector('.sw-hero__slides');
    function fit() {
      if (!mqM || !mqM.matches) { box.style.height = ''; return; }
      var on = all[cur];
      if (on && on.offsetHeight) box.style.height = on.offsetHeight + 'px';
    }
    if ('ResizeObserver' in window) {
      var ro = new ResizeObserver(fit);
      [].forEach.call(all, function (x) { ro.observe(x); });
    }
    window.addEventListener('resize', fit);
    function go(n) {
      cur = (n + all.length) % all.length;
      paint(all[cur]); paint(all[(cur + 1) % all.length]);
      all.forEach(function (x, i) {
        var on = i === cur;
        x.classList.toggle('is-on', on);
        if (on) x.removeAttribute('aria-hidden'); else x.setAttribute('aria-hidden', 'true');
        x.querySelectorAll('a').forEach(function (a) { if (on) a.removeAttribute('tabindex'); else a.setAttribute('tabindex', '-1'); });
      });
      dots.forEach(function (d, i) { d.classList.toggle('is-on', i === cur); });
      videos();
      fit();
    }
    function play() { clearInterval(timer); timer = setInterval(function () { go(cur + 1); }, 7000); }
    dots.forEach(function (d) { d.addEventListener('click', function () {
      go([].indexOf.call(dots, d)); play(); }); });
    hero.querySelector('.sw-hero__arr--p').addEventListener('click', function () { go(cur - 1); play(); });
    hero.querySelector('.sw-hero__arr--n').addEventListener('click', function () { go(cur + 1); play(); });
    hero.addEventListener('mouseenter', function () { clearInterval(timer); });
    hero.addEventListener('mouseleave', play);
    hero.addEventListener('focusin', function () { clearInterval(timer); });
    /* swipe na dotykových zariadeniach */
    var x0 = null;
    hero.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 45) { go(cur + (dx < 0 ? 1 : -1)); play(); }
    }, { passive: true });
    videos();
    fit();
    if (!window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches) play();
  }

  /* Doplní hodnotenie obchodu do hera. Volá sa opakovane, lebo widget
     hodnotenia sa načítava asynchrónne — pri prvom behu tam ešte nie je. */
  var ratingTries = 0;
  function fillRating() {
    var hosts = [].slice.call(document.querySelectorAll('.sw-hero__txt[data-rate]'));
    var first = document.querySelector('.sw-slide:not(.sw-slide--panel) .sw-hero__txt');
    if (first && hosts.indexOf(first) < 0) hosts.push(first);
    hosts = hosts.filter(function (h) { return !h.querySelector('.sw-hero__rate'); });
    if (!hosts.length) return;
    var box = document.querySelector('#hodnoceniobchodu');
    var val = box && box.querySelector('.rate-average');
    var cnt = box && box.querySelector('.stars-label');
    if (!val || !val.textContent.trim()) {
      if (ratingTries++ < 12) setTimeout(fillRating, 700);
      return;
    }
    var v = val.textContent.trim();
    var c = cnt ? cnt.textContent.replace(/\s+/g, ' ').trim() : '';
    hosts.forEach(function (hero) {
      hero.insertAdjacentHTML('beforeend',
        '<div class="sw-hero__rate"><span class="sw-hero__stars">★★★★★</span>' +
        '<span><b>' + v + '/5</b>' + (c.replace(/\D+/g, '') ? ' z ' + c.replace(/\D+/g, '') +
        ' hodnotení obchodu' : '') + '</span></div>');
    });
  }

  /* slajd, ktorému sa nenačítala fotka, zmizne aj s bodkou; ak bol prvý
     (s H1), H1 sa presunie na nový prvý slajd */
  function dropSlide(hero, sl) {
    var all = [].slice.call(hero.querySelectorAll('.sw-slide'));
    var i = all.indexOf(sl); if (i < 0) return;
    var dot = hero.querySelectorAll('.sw-hero__dot')[i];
    var h1 = sl.querySelector('h1');
    sl.remove(); if (dot) dot.remove();
    var rest = hero.querySelectorAll('.sw-slide');
    if (h1 && rest[0]) {
      var h = rest[0].querySelector('.sw-hero__h');
      if (h) { var n = document.createElement('h1'); n.innerHTML = h.innerHTML; h.replaceWith(n); }
    }
    rest.forEach(function (x, k) { x.setAttribute('aria-label', (k + 1) + ' z ' + rest.length); });
    if (rest.length < 2) hero.querySelectorAll('.sw-hero__arr,.sw-hero__nav').forEach(function (e) { e.remove(); });
    if (hero.swRefresh) hero.swRefresh();
    else if (rest[0]) { rest[0].classList.add('is-on'); rest[0].removeAttribute('aria-hidden'); }
  }

  function section(cls, inner) {
    var s = S.el('div', cls, '<div class="sw-wrap">' + inner + '</div>');
    return s;
  }

  function init() {
    var content = document.querySelector('#content');
    if (!content) return;

    /* --- HERO carousel namiesto Shoptet carouselu --- */
    var car = document.querySelector('.carousel-wrapper');
    if (car && !document.querySelector('.sw-hero')) {
      heroCarousel(car);
      fillRating();
    }
    fillRating();

    /* Pás s tvrdeniami (dobierka, doručenie, doprava) pod heroom klient vyradil —
       tie isté tvrdenia sú teraz v top pruhu nad hlavičkou (feedback 7. 10.). */

    /* --- logá médií ako tichý pás hneď pod heroom (návrh 15. 9.) --- */
    var nap = document.querySelector('.napisali-section');
    var heroEl = document.querySelector('.sw-hero');
    if (nap && heroEl && !nap.closest('.sw-media')) {
      var media = S.el('div', 'sw-media');
      heroEl.parentNode.insertBefore(media, heroEl.nextSibling);
      media.appendChild(nap);
    }

    /* --- social proof: videá pod pásom médií (z tabuľky Silweru, inak CFG.ugc) --- */
    if (!document.querySelector('.sw-ugc')) {
      var after = document.querySelector('.sw-media') || document.querySelector('.sw-hero');
      var vids = S.homeVideos();
      if (after && after.parentNode && vids.length) {
        var ugc = S.videoStrip(vids);
        after.parentNode.insertBefore(ugc, after.nextSibling);
        if (location.hash === '#videa') setTimeout(function () { ugc.scrollIntoView({ block: 'start' }); }, 400);
      }
    }

    /* --- „Čo Vás trápi?" — 12 oblastí, nadpis bez podnadpisu (feedback 7. 10.) --- */
    if (!document.querySelector('.sw-needs-sec')) {
      var needs = section('sw-needs-sec',
        '<h2 class="sw-h sw-h--mix">Čo Vás <b>trápi?</b></h2>' + S.needsGrid());
      var anchor = document.querySelector('.sw-ugc') || document.querySelector('.sw-media') || document.querySelector('.sw-hero') ||
        document.querySelector('.carousel-wrapper');
      if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(needs, anchor.nextSibling);
      else content.insertBefore(needs, content.firstChild);
    }

    /* --- prázdne sekcie preč (majú v sebe biele znaky, :empty ich nechytí) --- */
    document.querySelectorAll('#content > .full-width, #content > .welcome-wrapper').forEach(function (e) {
      if (e.querySelector('.sw-needs-sec, .sw-help-sec')) return;
      if (!e.textContent.trim() && !e.querySelector('img,iframe,svg')) e.style.display = 'none';
    });

    /* --- k hlavičkám produktových blokov odkaz na celú kategóriu --- */
    document.querySelectorAll('#content > .homepage-group-title').forEach(function (t) {
      if (t.getAttribute('data-sw-head')) return;
      t.setAttribute('data-sw-head', '1');
      var next = t.nextElementSibling;
      if (!next || !next.querySelector || !next.querySelector('.product')) return;
      /* odkaz musí mieriť na kategóriu TOHTO bloku, nie paušálne na /vsetky/.
         Páruje sa podľa textu nadpisu; keď sa nenájde zhoda, odkaz sa nedá. */
      var label = t.textContent.replace(/\s+/g, ' ').trim();
      var target = null;
      S.PRODUKTY.concat(S.NEEDS.map(function (n) { return [n[0], n[1]]; })).forEach(function (pr) {
        if (!target && pr[0].toLowerCase() === label.toLowerCase()) target = pr[1];
      });
      /* #content je flex-column a admin CSS dáva poradie takto:
           .homepage-products-heading-14 {order:1}
           .homepage-products-heading-14 + .products-wrapper {order:2}
         Obalením nadpisu do vlastného bloku prestane nadpis byť SÚRODENCOM
         mriežky, susedný selektor `+` prestane platiť a mriežka spadne na
         order:0, teda NAD oba nadpisy. Preto sa poradie odčíta ešte pred
         obalením a nastaví sa natvrdo aj nadpisu, aj mriežke. */
      var ord = getComputedStyle(t).order;
      var gridOrd = getComputedStyle(next).order;
      var wrap = S.el('div', 'sw-blockhead');
      if (ord && ord !== '0') wrap.style.order = ord;
      if (gridOrd && gridOrd !== '0') next.style.order = gridOrd;
      t.parentNode.insertBefore(wrap, t);
      wrap.appendChild(t);
      if (target) wrap.insertAdjacentHTML('beforeend', '<a href="' + target + '">Zobraziť všetko →</a>');
    });

    /* --- blog: nadpis, podnadpis, odkaz na všetky články --- */
    var blog = document.querySelector('.homepage-blog-wrapper');
    var bt = blog && blog.querySelector(':scope > .homepage-group-title');
    if (bt && !blog.querySelector('.sw-bloghead')) {
      bt.style.display = 'none';
      blog.insertBefore(S.el('div', 'sw-sechead sw-bloghead',
        /* klient 22. 10.: nadpis a podnadpis preč, len „Blogy" */
        '<div><h2 class="sw-h">Blogy</h2></div>' +
        '<a class="sw-sechead__a" href="/blog/">Všetky články →</a>'), bt);
    }

    /* --- Prečo Silwer a Kto stojí za Silwerom ---
       Obsah je zo stránky /onas/ (15. 10.), skrátený, nie domyslený. Pôvodné
       tvrdenia z návrhu (výroba v EÚ, testovanie každej šarže, citát Martina)
       na webe Silweru nie sú, preto vypadli. */
    var lc = document.querySelector('#content > .homepage-latest-contribution-full-width');
    var WHY_IC = {
      need:  '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7"/>',
      check: '<path d="M12 3l7 3v6c0 4.2-3 7.7-7 9-4-1.3-7-4.8-7-9V6z"/><path d="M8.5 12.2l2.4 2.4 4.6-4.8"/>',
      price: '<path d="M20 12l-8 8-9-9V4h7z"/><circle cx="7.5" cy="7.5" r="1.4"/>'
    };
    if (S.CFG.whyBlock && lc && !document.querySelector('.sw-why')) {
      var card = function (ic, h, p) {
        return '<div class="sw-why__c"><span class="sw-why__ic"><svg viewBox="0 0 24 24" aria-hidden="true">' +
          WHY_IC[ic] + '</svg></span><h3>' + h + '</h3><p>' + p + '</p></div>';
      };
      var why = section('sw-why',
        '<div class="sw-sechead"><h2 class="sw-h sw-h--mix">Prečo <b>Silwer</b></h2>' +
        '<a class="sw-sechead__a" href="/onas/">O nás →</a></div>' +
        '<div class="sw-why__g">' +
        card('need', 'Z potrieb zrelých ľudí', 'Vitamíny, minerály a výživové doplnky Silwer vychádzajú ' +
          'z toho, čo s vekom potrebujeme. Pri výbere produktov načúvame skúseným lekárom a lekárnikom.') +
        card('check', 'Overení výrobcovia a vlastná kontrola', 'Spolupracujeme výhradne s renomovanými ' +
          'a certifikovanými výrobcami. Kvalitu všetkých našich výrobkov navyše sami nezávisle overujeme.') +
        card('price', 'Najvyššia kvalita za férovú cenu', 'Kvalita je pre nás absolútna priorita. ' +
          'Rovnako dôležitá je férová cena, chceme, aby bola pre zákazníkov tá najvýhodnejšia.') +
        '</div>');
      why.style.order = getComputedStyle(lc).order;
      lc.parentNode.insertBefore(why, lc);
    }
    if (S.CFG.teamBlock && lc && !document.querySelector('.sw-team')) {
      var person = function (img, role, n, p) {
        return '<div class="sw-team__c"><span class="sw-team__ph"><img src="' + S.ASSETS + img + '" alt="' + n +
          '" loading="lazy"></span><div><div class="sw-team__role">' + role + '</div>' +
          '<div class="sw-team__n">' + n + '</div><p class="sw-team__q">' + p + '</p></div></div>';
      };
      var team = section('sw-team',
        '<div class="sw-sechead"><div><h2 class="sw-h sw-h--mix">Kto stojí <b>za Silwerom</b></h2>' +
        '<p class="sw-sub">Značku založili dvaja spolužiaci z gymnázia vo Zvolene, ktorých cesty sa ' +
        'spojili po 37 rokoch.</p></div><a class="sw-sechead__a" href="/onas/">Celý príbeh →</a></div>' +
        '<div class="sw-team__g">' +
        person('tim-ivan.jpg', 'Spoluzakladateľ', 'Ivan Berkeš', 'Viac ako desať rokov sa venuje liekom ' +
          'a výživovým doplnkom. Pre Dr.Max a Livsane vyvinul portfólio ich privátnych značiek, ktoré sa ' +
          'predávajú po celej Európe aj na Blízkom východe.') +
        person('tim-martin.jpg', 'Spoluzakladateľ', 'Martin Marko', 'Viac ako 30 rokov v marketingu ' +
          'a reklame na Slovensku a v Čechách. Je regionálnym priekopníkom marketingu pre striebornú ' +
          'generáciu, ľudí nad 50 rokov.') +
        '</div>');
      team.style.order = getComputedStyle(lc).order;
      team.style.boxShadow = '0 0 0 100vmax var(--sw-field)';
      team.style.clipPath = 'inset(0 -100vmax)';
      lc.parentNode.insertBefore(team, lc);
    }

    /* --- blok pomoci: pred newsletterom (poradie z návrhu), len so zapnutou asistentkou --- */
    if (S.CFG.assistant && !document.querySelector('.sw-help-sec')) {
      var before = document.getElementById('zlava-formular') || document.getElementById('footer');
      if (before && before.parentNode) before.parentNode.insertBefore(section('sw-help-sec', S.helpBlock()), before);
    }
    placeHelp();
  }

  /* Widget hodnotenia obchodu sa do stránky presúva až po načítaní, takže
     sa vie ocitnúť medzi blokom pomoci a newsletterom a roztrhne tmavý celok.
     Blok pomoci preto ide vždy tesne pred newsletter, aj opakovane. */
  function placeHelp() {
    var help = document.querySelector('.sw-help-sec');
    var nl = document.getElementById('zlava-formular');
    if (help && nl && help.nextElementSibling !== nl) nl.parentNode.insertBefore(help, nl);
  }
  [800, 2000, 4000].forEach(function (d) { setTimeout(placeHelp, d); });
  window.addEventListener('load', placeHelp);

  /* zoznam videí z tabuľky prišiel po vykreslení: pás sa vymení, len keď je iný */
  document.addEventListener('sw:videos', function () {
    var old = document.querySelector('.sw-ugc'), vids = S.homeVideos();
    if (!old || !vids.length) return;
    if (old.getAttribute('data-sig') === vids.map(function (it) { return it.id; }).join(',')) return;
    old.parentNode.replaceChild(S.videoStrip(vids), old);
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  document.addEventListener('ShoptetDOMPageContentLoaded', init);
})();

/* ============================================================================
   MODUL: KARTY PRODUKTOV  (homepage + kategória + súvisiace)
   Všetky dáta sa čítajú z DOM, ktorý Shoptet už vykresľuje:
   data-micro-product-id, data-micro-price, data-micro-rating-value/-count,
   .price-measure (jednotková cena) a tooltip dostupnosti s dátumom doručenia.
   ========================================================================== */
(function () {
  'use strict';
  var S = window.SW; if (!S) return;

  /* Karta podľa návrhu z 15. 9. a feedbacku zo 7. 10.:
     - bez kruhu pod produktom (klient dodá vlastnú grafiku),
     - štítky v rade nad fotkou, produkt je nižšie, aby sa ich zmestilo viac;
       zľavy a akcie červené, aby „kričali", novinka a balenie tlmene,
     - cena za tabletu / kapsulu namiesto „/ ks", pod ňou množstevné zľavy,
     - bez „u vás zajtra pri objednávke do 12.00 h.",
     - počet kusov priamo pri tlačidle, tlačidlo obrysové „PRIDAŤ DO KOŠÍKA",
       červené až pri hoveri (menej červenej). */
  S.addStyle('cards', [
    '.products .product{border:1px solid var(--sw-line)!important;border-radius:14px!important;',
    'background:#fff!important;overflow:hidden;transition:border-color .15s,box-shadow .15s,transform .15s;',
    'text-align:left!important;box-shadow:none!important;padding:0!important}',
    '.products .product:hover{border-color:#CFCCC5!important;box-shadow:0 16px 34px -22px rgba(11,11,12,.45)!important}',
    '.products .product .p{padding:0!important;height:100%;display:flex!important;flex-direction:column;',
    'text-align:left!important;border:0!important;box-shadow:none!important;background:none!important}',
    /* obrázok: štítky nad ním v toku, nie cez fotku */
    '.products .product a.image{position:relative;display:flex!important;flex-direction:column;margin:0!important;',
    'padding:12px 18px 14px!important;background:linear-gradient(180deg,#FAFAF8 0%,#F3F2EE 100%);',
    'border-bottom:1px solid var(--sw-line);text-align:center}',
    '.products .product a.image::before{display:none!important;content:none!important}',
    '.products .product a.image img{position:relative;z-index:1;display:block;width:100%!important;height:auto!important;',
    'max-width:100%!important;aspect-ratio:1/1;object-fit:contain;margin:0 auto!important;',
    'mix-blend-mode:darken;transition:transform .35s}',
    '.products .product:hover a.image img{transform:scale(1.035)}',
    /* rad štítkov má vždy výšku jedného štítku, aby fotky v rade sedeli na jednej línii */
    /* vedľa seba, nie pod sebou (feedback 12. 10.) */
    '.products .product .flags-default{position:static!important;order:-1;display:flex!important;flex-direction:row!important;',
    'flex-wrap:wrap;align-items:center!important;gap:5px;min-height:24px;margin:0 0 8px!important;padding:0!important;z-index:2;',
    'justify-content:flex-start}',
    '.products .product .flags-default .flag{margin:0!important;position:static!important}',
    /* Zarovnanie kariet v rade: karta bez štítkov nemá ich riadok (24 + 8 px),
       takže fotka bola o 32 px nižšia a všetko pod ňou vyššie. Názov má vždy
       miesto na dva riadky, aby hodnotenie a cena sedeli v jednej línii. */
    '.products .product a.image:not(:has(.flags-default)){padding-top:44px!important}',
    '.products .product .p-in .p-in-in a.name{display:block!important;min-height:2.6em!important}',
    /* štítky (Manuál 2.6 zakazuje farebné nálepky ako dekoráciu — farbu majú
       len zľavy a akcie, aby „kričali", ostatné sú tlmené) */
    '.sw-flag{display:inline-flex!important;align-items:center;height:24px;padding:0 9px!important;border-radius:6px!important;',
    'font-size:11px!important;font-weight:700!important;line-height:1!important;text-transform:uppercase!important;',
    'letter-spacing:.04em!important;border:1px solid transparent!important;white-space:nowrap;box-shadow:none!important}',
    /* „Poznáte z TV" ružovou (feedback 12. 10.) */
    /* pilulkové štítky na kartách majú vlastné pravidlo s text-transform:none */
    '.products .flags .flag.sw-flag{text-transform:uppercase!important;letter-spacing:.04em!important}',
    '.sw-flag--tv{background:#E5007D!important;color:#fff!important}',
    '.sw-flag--sale{background:var(--sw-red)!important;color:#fff!important}',
    '.sw-flag--new{background:#fff!important;color:var(--sw-ink)!important;border-color:var(--sw-line)!important}',
    '.sw-flag--info{background:#EDEDEF!important;color:var(--sw-ink)!important}',
    /* téma dáva .flags .flag display:flex!important, preto vyššia špecificita */
    'html body .flags .flag.sw-empty,html body .flags .flag.sw-flag--hidden{display:none!important}',
    /* text */
    '.products .product .p-in{display:flex!important;flex-direction:column;flex:1 1 auto;',
    'padding:16px 18px 18px!important;text-align:left!important;margin:0!important}',
    '.products .product .p-in-in{text-align:left!important;min-height:0!important;margin:0!important;padding:0!important}',
    '.products .product a.name{display:block!important;font-size:17px!important;font-weight:700!important;',
    'color:var(--sw-ink)!important;line-height:1.3!important;margin:0 0 6px!important;text-align:left!important;',
    'min-height:0!important;height:auto!important;overflow:visible!important;text-decoration:none!important}',
    '.products .product a.name:hover{color:var(--sw-anthracite)!important}',
    '.products .product a.name span{display:block;text-align:left!important}',
    '.products .product .p-bottom{display:flex!important;flex-direction:column;flex:1 1 auto;',
    'text-align:left!important;margin:0!important;padding:0!important}',
    '.products .product .p-bottom>div[data-micro="offer"]{display:flex;flex-direction:column;flex:1 1 auto}',
    /* poradie: hodnotenie, cena, zľavy, dostupnosť, tlačidlo */
    /* 34 px: toľko má riadok s hviezdičkami; bez nich mal 26 px a cena uskočila */
    '.products .product .ratings-wrapper{order:1;display:flex!important;align-items:center;gap:8px;',
    'justify-content:flex-start!important;margin:0 0 12px!important;min-height:34px;text-align:left!important;height:auto!important}',
    '.products .product .ratings-wrapper .stars-wrapper{display:inline-flex!important;align-items:center;',
    'flex-wrap:wrap;gap:4px 8px;height:auto!important;margin:0!important;justify-content:flex-start!important}',
    '.products .product .ratings-wrapper .star::before{font-size:13px!important;color:#E8A317!important}',
    '.sw-rc{font-size:13px;color:var(--sw-muted);font-weight:600;white-space:nowrap}',
    '.products .product .prices{order:2;display:flex!important;flex-wrap:wrap;align-items:baseline;',
    'justify-content:flex-start!important;gap:4px 9px;margin:0 0 8px!important;text-align:left!important;',
    'min-height:0!important;padding:0!important}',
    '.products .product .prices>*{flex:0 0 auto;width:auto!important}',
    '.products .product .price-final{margin:0!important;text-align:left!important;display:inline-block!important}',
    '.products .product .price-final strong{font-size:23px!important;font-weight:700!important;',
    'color:var(--sw-ink)!important;letter-spacing:-.01em}',
    '.products .product .price-standard,.products .product .price-save{font-size:13px!important;',
    'color:var(--sw-muted)!important;margin:0!important}',
    '.products .product .price-measure{font-size:13px!important;font-weight:700!important;',
    'color:var(--sw-muted)!important;display:inline!important;margin:0!important}',
    /* množstevné zľavy pod cenou */
    '.sw-tiers{order:3;list-style:none;margin:0 0 12px;padding:0;display:flex;flex-direction:column;gap:3px}',
    '.sw-tiers li{font-size:13px;line-height:1.35;color:var(--sw-text);margin:0}',
    '.sw-tiers b{color:var(--sw-red);font-weight:700}',
    '.products .product .availability{order:4;display:flex!important;flex-wrap:wrap;align-items:center;',
    'gap:2px 8px;justify-content:flex-start!important;font-size:13px!important;font-weight:700;',
    'margin:0 0 14px!important;text-align:left!important;line-height:1.4}',
    '.products .product .availability>span:first-child{display:inline-flex;align-items:center;gap:6px}',
    '.products .product .availability>span:first-child::before{content:"";width:7px;height:7px;',
    'border-radius:50%;background:currentColor}',
    '.products .product .availability .sw-eta{display:none!important}',
    /* počet kusov + tlačidlo v jednom rade; keď sa nezmestia (úzka karta), zalomia sa */
    '.products .product .p-tools{order:5;margin-top:auto!important;width:100%;padding:0!important}',
    '.products .product .p-tools form{display:flex!important;flex-wrap:nowrap;gap:8px;align-items:stretch;margin:0}',
    /* v úzkej karte (pod ~250 px) by sa text tlačidla nezmestil → pod seba */
    '@container swcard (max-width:250px){.products .product .p-tools form{flex-wrap:wrap}',
    '.products .product .p-tools .quantity{width:100%!important;flex:1 1 100%;justify-content:space-between}',
    '.products .product .btn.add-to-cart-button,.products .product .p-tools .btn{flex:1 1 100%!important}}',
    '.products .product .p-in{container:swcard/inline-size}',
    '.products .product .p-tools .quantity{display:inline-flex!important;flex:0 0 auto;border-radius:999px!important;height:44px}',
    '.products .product .p-tools .quantity>label{flex:0 0 28px;min-width:28px}',
    '.products .product .p-tools .quantity input.amount{height:42px!important;font-size:15px!important}',
    '.products .product .p-tools .quantity .increase,.products .product .p-tools .quantity .decrease{',
    'flex:0 0 26px;width:26px!important;height:42px!important;font-size:16px!important}',
    '.products .product .btn.add-to-cart-button,.products .product [data-testid="buttonAddToCart"],',
    '.products .product .p-tools .btn{flex:1 1 0;min-width:0;width:auto!important;background:#fff!important;',
    'border:1.5px solid var(--sw-red)!important;color:var(--sw-red)!important;',
    'border-radius:999px!important;min-height:44px;font-weight:700!important;font-size:12px!important;',
    'letter-spacing:.03em;text-transform:uppercase!important;display:flex!important;align-items:center;justify-content:center;',
    'gap:7px;box-shadow:none!important;padding:0 10px!important;margin:0!important;white-space:nowrap;',
    'transition:background .15s,color .15s}',
    '.products .product .btn.add-to-cart-button i,.products .product .p-tools .btn i{display:none}',
    '.products .product .btn.add-to-cart-button:hover,.products .product .p-tools .btn:hover{',
    'background:var(--sw-red)!important;color:#fff!important}',
    /* „Detail" pri nedostupnom produkte je sekundárna cesta, nie konverzná */
    '.products .product .p-tools a.btn:not(.add-to-cart-button){border-color:var(--sw-line)!important;',
    'color:var(--sw-ink)!important}',
    '.products .product .p-tools a.btn:not(.add-to-cart-button):hover{background:var(--sw-field)!important;',
    'color:var(--sw-ink)!important}',
    '@media(max-width:767px){',
    '.products .product a.image{padding:10px 12px 10px!important}',
    /* mobil, dva stĺpce: dva štítky sa zalomia do dvoch riadkov a názov máva
       tri riadky. Štítky preto ležia nad fotkou (druhý riadok jej prekryje
       prázdny horný okraj) a názov má miesto na tri riadky. */
    '.products .product a.image,.products .product a.image:not(:has(.flags-default)){padding-top:42px!important}',
    '.products .product .flags-default{position:absolute!important;top:10px;left:10px;right:10px;margin:0!important}',
    '.products .product .p-in .p-in-in a.name{min-height:3.9em!important}',
    /* hviezdičky a počet hodnotení v jednom riadku: pri 137 px sa počet
       zalomil pod hviezdičky a cena v tej karte uskočila o riadok */
    '.products .product .ratings-wrapper .stars-wrapper{flex-wrap:nowrap!important;gap:5px!important}',
    '.products .product .ratings-wrapper .star::before{font-size:12px!important}',
    '.products .product .sw-rc{font-size:12px}',
    '.products .product .p-in{padding:12px 12px 14px!important}',
    '.products .product a.name{font-size:15px!important}',
    '.products .product .price-final strong{font-size:19px!important}',
    '.products .product .price-measure{font-size:12px!important}',
    '.sw-tiers li{font-size:12px}',
    '.products .product .btn.add-to-cart-button,.products .product .p-tools .btn{min-height:42px}',
    '.sw-flag{font-size:9.5px!important;height:21px;padding:0 6px!important;letter-spacing:.02em!important}}'
  ].join(''));

  /* Štítky: farba podľa významu. Text sa skracuje („BALENIE NA 4 MESIACE"
     → „Balenie na 4 mes."). Biele štítky z adminu sú zámerne neviditeľné
     (napr. „SLEPY") a takými ostanú. Platí pre karty aj galériu detailu. */
  function flag(f) {
    if (f.getAttribute('data-sw-flag')) return;
    f.setAttribute('data-sw-flag', '1');
    var t = f.textContent.replace(/\s+/g, ' ').trim();
    if (!t) { f.classList.add('sw-empty'); return; }
    var bg = (f.getAttribute('style') || '').match(/background-color:\s*(rgb\([^)]+\)|#[0-9a-f]{3,6})/i);
    if (bg && /255,\s*255,\s*255|#fff(fff)?$/i.test(bg[1])) { f.classList.add('sw-flag--hidden'); return; }
    var c = f.className;
    var kind = /poznate-z-tv/i.test(c) || /poznáte z tv/i.test(t) ? 'tv'
      : /discount|action|sale|vyhodne|zlav|akci/i.test(c) || /%|zľav|akci|výhodn/i.test(t) ? 'sale'
      : /flag-new\b|novink/i.test(c + ' ' + t) ? 'new' : 'info';
    f.classList.add('sw-flag', 'sw-flag--' + kind);
    var m = t.match(/^balenie na (\d+)\s*mesia\w*$/i);
    if (m && !f.querySelector('*')) f.textContent = 'Balenie na ' + m[1] + ' mes.';
  }

  function path(a) { try { return new URL(a.getAttribute('href'), location.origin).pathname; } catch (e) { return ''; } }
  function cardData(card) {
    var a = card.querySelector('a.name') || card.querySelector('a.image');
    return a && S.DATA.products[path(a)];
  }
  /* množstevné zľavy z tabuľky Množstevná zľava daného produktu; pri nových dátach
     sa riadok prepíše (zľava pribudla, zmenila sa alebo zmizla) */
  function tiers(card, d) {
    var old = card.querySelector('.sw-tiers'), pr = card.querySelector('.prices');
    var html = d && d.t ? '<ul class="sw-tiers">' + d.t.map(function (t) {
      return '<li><b>−' + Math.round((1 - t[1]) * 100) + ' %</b> pri nákupe od ' + t[0] + ' kusov</li>';
    }).join('') + '</ul>' : '';
    if (old && old.outerHTML === html) return;
    if (old) old.remove();
    if (html && pr) pr.insertAdjacentHTML('afterend', html);
  }
  document.addEventListener('sw:data', function () {
    document.querySelectorAll('.products .product[data-sw-card]').forEach(function (card) { tiers(card, cardData(card)); });
  });

  function init() {
    document.querySelectorAll('body.type-detail .p-image-wrapper .flag').forEach(flag);
    document.querySelectorAll('.products .product').forEach(function (card) {
      if (card.getAttribute('data-sw-card')) return;
      card.setAttribute('data-sw-card', '1');
      var d = cardData(card);
      /* počet hodnotení vedľa hviezdičiek — z mikrodát, ktoré Shoptet vykresľuje */
      var sw = card.querySelector('[data-micro-rating-value]');
      if (sw && !card.querySelector('.sw-rc')) {
        var v = parseFloat(sw.getAttribute('data-micro-rating-value'));
        var n = parseInt(sw.getAttribute('data-micro-rating-count'), 10);
        if (v && n) sw.appendChild(S.el('span', 'sw-rc',
          String(v.toFixed(1)).replace('.', ',') + ' (' + n + ')'));
      }
      /* jednotková cena: Shoptet ju počíta na kus balenia („/ 1 ks"), čo je
         jedna tableta alebo kapsula — mení sa len pomenovanie jednotky */
      var pm = card.querySelector('.price-measure');
      if (pm && d && (d.f === 'tab.' || d.f === 'kap.')) {
        pm.innerHTML = pm.innerHTML.replace(/\/(\s|&nbsp;)*1(\s|&nbsp;)*ks/, '/&nbsp;' + d.f);
      }
      tiers(card, d);
      /* „Do košíka" → „Pridať do košíka" (ikona sa skrýva v CSS) */
      var btn = card.querySelector('.add-to-cart-button span') || card.querySelector('.add-to-cart-button');
      if (btn) [].forEach.call(btn.childNodes, function (nd) {
        if (nd.nodeType === 3 && /Do košíka/.test(nd.nodeValue)) nd.nodeValue = 'Pridať do košíka';
      });
      card.querySelectorAll('.flag').forEach(flag);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  document.addEventListener('ShoptetDOMPageContentLoaded', init);
})();

/* ============================================================================
   MODUL: KATEGÓRIA  (body.type-category)
   ========================================================================== */
(function () {
  'use strict';
  var S = window.SW; if (!S || !S.body('type-category')) return;

  S.addStyle('category', [
    /* --- bočný priestor ---
       Kategória a textové stránky majú rám z jadra (--sw-gut). Tu zostáva
       len úvodná stránka a pokladňa, ktoré ho nepreberajú. */
    'body.ordering-process .content-wrapper,body.type-index .content-wrapper{',
    'padding-left:20px!important;padding-right:20px!important;box-sizing:border-box}',
    '@media(max-width:767px){body.ordering-process .content-wrapper,body.type-index .content-wrapper{',
    'padding-left:14px!important;padding-right:14px!important}}',

    /* --- výpis produktov ---
       Shoptet ho vykresľuje ako flex. CTA s flex-basis 100 % v ňom zalomí rad
       uprostred, takže vyjdú tri produkty, banner a jeden produkt osamote.
       Preto skutočná mriežka, kde banner zaberie celý rad korektne. */
    /* Návrh 15. 9. chce veľké karty: tri v rade na desktope (Jaro na calle
       16. 9.: „chceme takéto veľké produktové karty"). */
    'body.type-category .products.products-block{display:grid!important;',
    'grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;',
    /* Bootstrap .row mu dáva margin -16 px, mriežka potom trčala z rámu doľava */
    'width:100%!important;float:none!important;margin-left:0!important;margin-right:0!important}',
    '@media(max-width:991px){body.type-category .products.products-block{grid-template-columns:repeat(2,minmax(0,1fr))}}',
    /* prepínač počtu stĺpcov (doplnok) — s pevnou mriežkou nemá čo prepínať */
    'body.type-category .grid-change-wrap{display:none!important}',

    /* --- radenie ako pilulky, „Zoradiť:" vpravo ako v návrhu --- */
    'body.type-category .category-header{display:flex!important;align-items:center;justify-content:flex-end;',
    'gap:10px;flex-wrap:wrap;margin:6px 0 18px!important;padding:0!important;background:none!important;border:0!important}',
    'body.type-category .category-header::before{content:"Zoradiť:";font-size:14px;font-weight:700;color:var(--sw-muted)}',
    'body.type-category .listSorting{margin:0!important;padding:0!important;background:none!important;border:0!important}',
    'body.type-category .listSorting__controls{display:flex!important;flex-wrap:wrap;gap:8px;margin:0!important;',
    'padding:0!important;list-style:none;background:none!important;border:0!important}',
    'body.type-category .listSorting__controls>li{margin:0!important;padding:0!important;border:0!important}',
    'body.type-category .listSorting__control{height:42px;padding:0 16px!important;border-radius:10px!important;',
    'border:1px solid var(--sw-line)!important;background:#fff!important;color:var(--sw-ink)!important;',
    'font-size:14.5px!important;font-weight:700!important;box-shadow:none!important;margin:0!important;',
    'font-family:inherit;cursor:pointer;transition:border-color .15s,background .15s}',
    'body.type-category .listSorting__control:hover{border-color:var(--sw-ink)!important}',
    'body.type-category .listSorting__control--current{background:var(--sw-ink)!important;',
    'border-color:var(--sw-ink)!important;color:#fff!important}',
    'body.type-category .listSorting__control::after,body.type-category .listSorting__control::before{display:none!important}',
    '@media(max-width:767px){body.type-category .category-header{justify-content:flex-start;',
    'flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;margin:0 -14px 14px!important;padding:0 14px!important}',
    'body.type-category .listSorting__controls{flex-wrap:nowrap}',
    'body.type-category .listSorting__control{height:38px;padding:0 13px!important;font-size:13.5px!important;white-space:nowrap}}',

    /* --- text a časté otázky pod výpisom ---
       Zobrazí sa LEN keď má kategória v Shoptete vyplnený popis. Dnes ho
       nemá ani jedna, takže sa sekcia nevykreslí nikde. Jaro na calle 16. 9.:
       „kým sa to porobí a naplní textami", nech sa to zapína po kategóriách. */
    '.sw-catinfo{background:var(--sw-field);border-radius:16px;padding:clamp(24px,4vw,48px);margin:40px 0 20px;',
    'display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(24px,4vw,60px)}',
    '.sw-catinfo--one{grid-template-columns:minmax(0,1fr)}',
    '.sw-catinfo h2{font-size:clamp(22px,2.4vw,30px)!important;font-weight:700!important;letter-spacing:-.02em;',
    'color:var(--sw-ink)!important;margin:0 0 16px!important;text-align:left!important;line-height:1.2}',
    '.sw-catinfo__txt p,.sw-catinfo__txt li{font-size:15.5px;line-height:1.7;color:var(--sw-text);margin:0 0 14px}',
    '.sw-catinfo__txt h3,.sw-catinfo__txt h4{font-size:17px;font-weight:700;margin:18px 0 8px;color:var(--sw-ink)}',
    '.sw-faq details{border-bottom:1px solid var(--sw-line);padding:0}',
    '.sw-faq summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;gap:16px;',
    'align-items:center;padding:16px 0;font-size:16px;font-weight:700;color:var(--sw-ink)}',
    '.sw-faq summary::-webkit-details-marker{display:none}',
    '.sw-faq summary::after{content:"";width:9px;height:9px;border-right:2px solid currentColor;',
    'border-bottom:2px solid currentColor;transform:rotate(45deg);transition:transform .2s;flex:0 0 auto;margin-top:-4px}',
    '.sw-faq details[open] summary::after{transform:rotate(-135deg);margin-top:4px}',
    '.sw-faq__a{padding:0 0 18px;font-size:15px;line-height:1.65;color:var(--sw-text)}',
    '.sw-faq__a p{margin:0 0 10px}',
    '@media(max-width:860px){.sw-catinfo{grid-template-columns:minmax(0,1fr)}}',
    'body.type-category .products.products-block>.product{width:auto!important;',
    'margin:0!important;float:none!important}',
    'body.type-category .products.products-block::before,',
    'body.type-category .products.products-block::after{display:none!important;content:none!important}',
    '@media(max-width:767px){body.type-category .products.products-block{',
    'grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}}',

    /* --- hlavička kategórie --- */
    /* 6 px zhora lepilo nadpis na čiernu lištu, 26 px zdola bola diera */
    '.sw-allneeds{margin:6px 0 40px}.sw-allneeds .sw-tile{text-align:left}',
    '.sw-cathead{display:flex;align-items:flex-start;gap:20px;',
    'margin:clamp(22px,3vw,34px) 0 16px;text-align:left}',
    '.sw-cathead *{text-align:left}',
    '.sw-cathead__ic{width:58px;height:58px;border-radius:16px;flex:0 0 auto;',
    'display:flex;align-items:center;justify-content:center}',
    '.sw-cathead__ic svg{width:29px;height:29px;stroke:currentColor;fill:none;stroke-width:1.9;',
    'stroke-linecap:round;stroke-linejoin:round}',
    '.sw-cathead h1{font-size:clamp(28px,3.4vw,42px)!important;font-weight:700!important;',
    'letter-spacing:-.02em;margin:0 0 8px!important;color:var(--sw-ink);text-align:left!important}',
    '.sw-cathead__count{font-size:15px;font-weight:600;color:var(--sw-muted);margin-left:10px}',
    '.sw-cathead__d{font-size:16px;line-height:1.6;color:var(--sw-muted);margin:0;max-width:68ch}',
    '.sw-cathead__d p{margin:0 0 10px}.sw-cathead__d p:last-child,[data-sw-desc]>p{margin-bottom:0}',
    '.sw-cathead [hidden]{display:none!important}',
    '.sw-cathead__more{background:none;border:0;padding:0;font:inherit;font-weight:600;color:var(--sw-ink);',
    'text-decoration:underline;text-underline-offset:3px;cursor:pointer}',

    /* --- CTA v mriežke: celý rad ---
       Pôvodne 18 px nadpis v 20 px vysokom pruhu, pri troch veľkých kartách
       nad ním pôsobil ako päta tabuľky. Teraz rovnaká reč ako blok pomoci
       na úvodnej stránke: ikona, nadpis s dvomi váhami, tlačidlá vpravo. */
    /* šablóna dáva priamym deťom .products-block vlastnú šírku, preto !important */
    /* grid-row:2 → auto-placement mu vždy nechá celý prvý rad kariet, pri
       akomkoľvek počte stĺpcov a bez merania v JS (meranie sa raz trafilo do
       momentu, keď mriežka ešte nebola grid, a nad panelom ostala jedna karta) */
    '.sw-midcta{grid-column:1/-1!important;grid-row:2!important;justify-self:stretch!important;',
    'width:100%!important;max-width:none!important;box-sizing:border-box;',
    'background:var(--sw-field);color:var(--sw-ink);border:1px solid var(--sw-line);border-radius:18px;margin:8px 0;',
    'padding:clamp(24px,3vw,36px) clamp(22px,3.4vw,44px)!important;display:grid;',
    'grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:18px 26px}',
    '.sw-midcta__ic{width:64px;height:64px;border-radius:50%;background:#fff;color:var(--sw-ink);border:1px solid var(--sw-line);',
    'display:flex;align-items:center;justify-content:center}',
    '.sw-midcta__ic svg{width:30px;height:30px;stroke:currentColor;fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}',
    /* menej červenej: biele tlačidlo na čiernom, červená až pri hoveri */
    '.sw-btn--white{background:#fff;color:var(--sw-ink)}',
    '.sw-btn--white:hover{background:var(--sw-red);color:#fff;text-decoration:none}',
    '.sw-midcta__ic img{width:100%;height:100%;object-fit:contain;border-radius:50%}',
    '.sw-midcta__ic img.sw-midcta__ph{object-fit:cover}',
    '.sw-midcta__e{display:block;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;',
    'color:var(--sw-muted);margin:0 0 8px}',
    '.sw-midcta__t{font-weight:300;font-size:clamp(22px,2.4vw,30px);line-height:1.15;letter-spacing:-.02em;',
    'color:var(--sw-ink);margin:0 0 14px}',
    '.sw-midcta__t b{font-weight:700}',
    '.sw-midcta__steps{list-style:none;counter-reset:sws;display:flex;flex-wrap:wrap;gap:8px 22px;margin:0;padding:0}',
    '.sw-midcta__steps li{counter-increment:sws;display:flex;align-items:center;gap:9px;font-size:15px;color:var(--sw-text);margin:0}',
    '.sw-midcta__steps li::before{content:counter(sws);flex:0 0 24px;width:24px;height:24px;border-radius:50%;background:var(--sw-ink);',
    'color:#fff;font-size:12.5px;font-weight:700;display:flex;align-items:center;justify-content:center}',
    '.sw-midcta__s{font-size:13.5px;line-height:1.45;color:var(--sw-muted);margin:0;text-align:center}',
    '.sw-midcta .sw-btn--dark:hover{background:var(--sw-red)}',
    '.sw-midcta .sw-btn{flex:0 0 auto;padding:15px 24px;font-size:16px;white-space:nowrap}',
    '.sw-midcta__b{display:flex;flex-direction:column;gap:10px}',
    '.sw-btn--line{background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.35)}',
    '.sw-btn--line:hover{background:rgba(255,255,255,.1);color:#fff;text-decoration:none}',
    '@media(max-width:991px){.sw-midcta{grid-template-columns:auto minmax(0,1fr)}',
    '.sw-midcta__b{grid-column:1/-1;flex-direction:row;flex-wrap:wrap;align-items:center;gap:10px 16px}}',
    '.sw-cathead__ic.sw-ic--ph{width:76px;height:76px;border-radius:18px}',
    '.subcategories a.sw-sub--ph{display:flex!important;align-items:center;gap:12px;padding-left:8px!important}',
    '.sw-sub__ic{flex:0 0 42px;width:42px;height:42px;border-radius:10px}',
    '@media(max-width:767px){.sw-cathead{gap:14px}.sw-cathead__ic{width:46px;height:46px}',
    '.sw-cathead__ic.sw-ic--ph{width:60px;height:60px;border-radius:14px}',
    '.sw-midcta{grid-template-columns:minmax(0,1fr);padding:22px 20px!important}',
    '.sw-midcta__ic{width:48px;height:48px;border-radius:50%}',
    '.sw-midcta__b{flex-direction:column;align-items:stretch}',
    '.sw-midcta__steps{flex-direction:column}',
    '.sw-midcta .sw-btn{width:100%}}'
  ].join(''));

  function init() {
    var h1 = document.querySelector('#content h1, .category-header h1, h1');
    if (!h1 || document.querySelector('.sw-cathead')) return;

    /* farba a ikona podľa toho, ktorá potreba to je — párovanie cez URL */
    var path = location.pathname;
    var match = S.NEEDS.filter(function (n) { return n[1] === path || n[6] === path; })[0];

    if (match) document.documentElement.style.setProperty('--sw-accent', match[2]);

    var count = document.querySelectorAll('.products .product').length;
    var head = S.el('div', 'sw-cathead');
    var ic = '';
    /* fotka oblasti ako v mega menu (Jan 12. 10.), nie piktogram */
    if (match) ic = S.needIc(match, 'sw-cathead__ic');
    /* popis sa berie z existujúceho textu kategórie, nevymýšľa sa; odseky ostávajú */
    var srcDesc = document.querySelector('.category-perex, .category-annotation, .basic-description');
    var paras = [];
    if (srcDesc) {
      var ps = srcDesc.querySelectorAll('p');
      (ps.length ? Array.prototype.slice.call(ps) : [srcDesc]).forEach(function (p) {
        var t = p.textContent.replace(/\s+/g, ' ').trim();
        if (t) paras.push(t);
      });
    }
    var desc = paras.join(' ');
    var esc = function (t) { return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };
    var descP = function (t) { return '<p>' + esc(t) + '</p>'; };
    var descHtml = '';
    /* Klient 23. 10.: popis Gold a JOJ play končil „…" a zvyšok sa nedal prečítať.
       Dlhý popis sa preto skráti na celé slovo a „Čítať ďalej" ukáže celý text. */
    if (desc.length > 320) {
      descHtml = '<div class="sw-cathead__d" data-sw-desc>' +
        '<p>' + esc(desc.slice(0, 320).replace(/[\s,;:]+\S*$/, '')) + '… ' +
        '<button type="button" class="sw-cathead__more" aria-expanded="false">Čítať ďalej</button></p>' +
        '<div hidden>' + paras.map(descP).join('') +
        '<p><button type="button" class="sw-cathead__more" aria-expanded="true">Skryť</button></p></div></div>';
    } else if (desc) {
      descHtml = '<div class="sw-cathead__d">' + paras.map(descP).join('') + '</div>';
    }

    head.innerHTML = ic + '<div><h1>' + h1.textContent.trim() +
      (count ? '<span class="sw-cathead__count">' + count + ' produktov</span>' : '') + '</h1>' +
      descHtml + '</div>';
    head.addEventListener('click', function (e) {
      var b = e.target.closest('.sw-cathead__more');
      if (!b) return;
      var d = b.closest('[data-sw-desc]'), open = b.getAttribute('aria-expanded') === 'false';
      d.firstElementChild.hidden = open;
      d.lastElementChild.hidden = !open;
    });

    h1.parentNode.insertBefore(head, h1);
    h1.style.display = 'none';

    /* Klient 20. 10.: na „Hľadám niečo na" boli podkategórie zo Shoptetu, teda stará
       štruktúra (Hormóny, Svaly, chýbali Chudnutie, Menopauza…). Namiesto nich tie isté
       oblasti ako v mega menu. Podkategórie v admine sa tým nemenia. */
    var subs = document.querySelector('.subcategories');
    if (path === '/hladam-nieco-na/' && subs && !document.querySelector('.sw-allneeds')) {
      subs.style.display = 'none';
      subs.parentNode.insertBefore(S.el('div', 'sw-allneeds', S.allNeedsGrid()), subs);
    }
    /* podkategórie, ktoré sú oblasťou s grafikou od klienta, dostanú jej fotku */
    document.querySelectorAll('.subcategories a').forEach(function (a) {
      if (a.querySelector('.sw-sub__ic')) return;
      var n = S.NEEDS.filter(function (x) { return x[1] && x[1] === a.getAttribute('href'); })[0];
      if (!n) return;
      a.insertAdjacentHTML('afterbegin', S.needIc(n, 'sw-sub__ic'));
      a.classList.add('sw-sub--ph');
    });
    if (srcDesc) srcDesc.style.display = 'none';

    catInfo();

    /* CTA ide ZA prvý celý rad kariet. Zobrazí sa len pri aspoň 4 produktoch,
       aby pod ním vždy niečo zostalo. */
    var grid = document.querySelector('.products.products-block');
    var cards = grid ? grid.querySelectorAll('.product') : [];
    if (S.CFG.assistant && grid && cards.length >= 4 && !document.querySelector('.sw-midcta')) {
      /* Jaro 8. 10.: „toto čo je?" — názov asistentky a „4 otázky" bez kontextu
         nehovorili, čo sa po kliknutí stane, a telefón vedľa tlačidla mätil.
         Teraz otázka, ktorú si zákazník kladie, a tri kroky, čo ho čaká. */
      var cta = S.el('div', 'sw-midcta',
        '<span class="sw-midcta__ic">' + (S.CFG.silwaImg ? '<img src="' + S.CFG.silwaImg + '" alt="">'
          : '<img class="sw-midcta__ph" src="' + S.ASSETS + 'asistentka-taska.jpg" alt="" loading="lazy">') + '</span>' +
        /* klient 20. 10.: rovnaké pomenovanie ako blok na úvodnej stránke a skutočný
           počet otázok (štyri) */
        '<div><span class="sw-midcta__e">Nákupná asistentka</span>' +
        '<p class="sw-midcta__t">Neviete, <b>ktorý produkt si vybrať?</b></p>' +
        '<ol class="sw-midcta__steps"><li>Označíte, čo chcete riešiť</li>' +
        '<li>Odpoviete na 4 krátke otázky</li><li>Ukážeme Vám najviac 2 produkty</li></ol></div>' +
        '<div class="sw-midcta__b">' +
        '<a class="sw-btn sw-btn--dark" href="' + S.CFG.guideUrl + '">Pomôcť s výberom →</a>' +
        '<span class="sw-midcta__s">Trvá to minútu, bez registrácie.</span>' +
        '</div>');
      /* miesto v mriežke určuje CSS (grid-row:2), poradie v DOM je jedno */
      grid.appendChild(cta);
    }
  }

  /* ---- Text a časté otázky pod výpisom ----
     Zdroj je SPODNÝ POPIS kategórie v Shoptete (Kategórie » Popis dole).
     Ako ho písať, aby sa z neho poskladal blok z návrhu:
       <h2>Nadpis textu</h2><p>odseky…</p>
       <h3>Otázka?</h3><p>odpoveď</p>   ← každý nadpis končiaci „?" je otázka
     Keď popis nie je vyplnený, blok sa nevykreslí vôbec.
     ⚠️ Presná trieda, pod ktorou Samba spodný popis vykreslí, sa nedá overiť,
     kým ho nemá vyplnený aspoň jedna kategória (dnes žiadna). Preto sa hľadá
     podľa polohy: prvý blok s popisom, ktorý je v DOM až za výpisom produktov. */
  function catInfo() {
    if (document.querySelector('.sw-catinfo')) return;
    var grid = document.querySelector('.products.products-block');
    if (!grid) return;
    var src = null;
    document.querySelectorAll('#content [class*="escription"], #content [class*="erex"]').forEach(function (e) {
      if (src || e.closest('.products, .sw-cathead, .sw-catinfo')) return;
      if (!(grid.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING)) return;
      if (e.textContent.replace(/\s+/g, '').length < 40) return;
      src = e;
    });

    var nodes;
    if (src) {
      nodes = [].slice.call(src.children);
    } else if (S.CFG.preview && location.pathname === '/kosti-a-klby/') {
      /* náhľad s textom z návrhu, len pre ?swpreview=1 */
      var demo = S.el('div', '',
        '<h2>Čo sa deje s kosťami a kĺbmi po päťdesiatke</h2>' +
        '<p>Od tridsiatky telo postupne stráca kostnú hmotu, u žien sa tento proces po menopauze zrýchľuje. ' +
        '<b>Vápnik a vitamín D prispievajú k udržaniu zdravých kostí</b>, vitamín K2 pomáha vápniku dostať sa tam, kam patrí.</p>' +
        '<p>Ak užívate lieky na riedenie krvi, tlak alebo osteoporózu, poraďte sa pred užívaním s lekárom alebo lekárnikom.</p>' +
        '<h3>Môžem doplnky užívať spolu s liekmi?</h3><p>Pri liekoch na riedenie krvi, tlak či štítnu žľazu ' +
        'sa vždy poraďte so svojím lekárom alebo lekárnikom.</p>' +
        '<h3>Kedy pocítim účinok?</h3><p>Kosti a chrupavky sa obnovujú pomaly, počítajte s 8 až 12 týždňami pravidelného užívania.</p>' +
        '<h3>Neviem prehĺtať veľké tablety. Čo s tým?</h3><p>Presne preto máme rad Minitablety: menšie tablety s rovnakou kvalitou zloženia.</p>');
      nodes = [].slice.call(demo.children);
    } else return;

    var txt = [], faq = [], cur = null;
    nodes.forEach(function (n) {
      var isQ = /^H[2-6]$/.test(n.tagName) && /\?\s*$/.test(n.textContent);
      if (isQ) { cur = { q: n.textContent.trim(), a: [] }; faq.push(cur); }
      else if (cur) cur.a.push(n.outerHTML);
      else txt.push(n.outerHTML);
    });
    if (!txt.length && !faq.length) return;

    var box = S.el('section', 'sw-catinfo' + (txt.length && faq.length ? '' : ' sw-catinfo--one'),
      (txt.length ? '<div class="sw-catinfo__txt">' + txt.join('') + '</div>' : '') +
      (faq.length ? '<div class="sw-faq"><h2>Časté otázky</h2>' + faq.map(function (f, i) {
        return '<details' + (i === 0 ? ' open' : '') + '><summary>' + f.q + '</summary>' +
          '<div class="sw-faq__a">' + f.a.join('') + '</div></details>';
      }).join('') + '</div>' : ''));
    var after = document.querySelector('.listingControls') || grid;
    after.parentNode.insertBefore(box, after.nextSibling);
    if (src) src.style.display = 'none';
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  document.addEventListener('ShoptetDOMPageContentLoaded', init);
})();

/* ============================================================================
   MODUL: DETAIL PRODUKTU  (body.type-detail)
   ----------------------------------------------------------------------------
   História: 29. 8. 2026 bol modul na žiadosť klienta odstránený. Na calle
   16. 9. 2026 Jaro zadal opak: produktová stránka sa má preštylovať podľa
   návrhu z 15. 9. ako DEFAULT pre všetky produkty.

   Prečo GLP-1 vyzerá inak než ostatné (Jaro sa pýtal):
     1. má vyplnený parameter „Benefity" — silwer-ux.js z neho kreslí
        checklist pod nadpisom (.s-badges). Ostatné produkty ho nemajú.
     2. Podrobný popis je poskladaný v Pobo Page Builderi.
     3. v krátkom popise má ručne písané kotvy (.pd-anchors, .pd-study).
   Per-produkt odlišnosť sa teda robí obsahom v admine, nie kódom.
   Tento modul len štýluje to, čo Shoptet a admin dodajú.

   ODKIAĽ SÚ DÁTA (nič sa nevymýšľa):
     balenia 1/3/6  → tabuľka Množstevná zľava (.quantity-discounts__item)
     kapsule a dni  → box „Obsah balenia" v krátkom popise (.sw-boxes)
     cena za deň    → cena balenia / počet dní z toho istého boxu
     dostupnosť     → .detail-parameters
   Keď produkt niektorý údaj nemá, príslušný riadok sa nezobrazí.
   ========================================================================== */
(function () {
  'use strict';
  var S = window.SW; if (!S || !S.body('type-detail')) return;

  S.addStyle('detail', [
    /* ---------- rozloženie: galéria vľavo, nákup vpravo ---------- */
    'body.type-detail .p-detail-inner{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr);',
    'gap:clamp(28px,4vw,60px);align-items:start;max-width:1240px;margin:8px auto 0!important}',
    'body.type-detail .p-image-wrapper{order:1!important;width:auto!important;padding:0!important;',
    'max-width:none!important;float:none!important;position:sticky;top:20px}',
    'body.type-detail .p-data-wrapper{order:2!important;width:auto!important;padding:0!important;',
    'max-width:none!important;float:none!important}',
    'body.type-detail .gallery-new{width:100%!important;max-width:none!important}',
    /* Brand Book str. 56-57: kruh pod produktom, jemná priesvitnosť, farba
       odvodená od akcentu kategórie. Fotka má bielu podložku, preto násobenie.
       POZOR: splide dáva zoznamu slajdov transform, čím vzniká vlastný vrstvový
       kontext. Kruh preto musí byť VNÚTRI slajdu, inak sa s obrázkom nezlúči.
       Režim darken, nie multiply: multiply prefarbí aj samotnú fľašu, darken
       zoberie len svetlejšiu z dvojice, takže podložka zmizne a produkt ostane. */
    'body.type-detail #main-slider{position:relative;border:1px solid var(--sw-line);border-radius:16px;',
    'overflow:hidden;background:#fff}',
    'body.type-detail #main-slider .splide__track,body.type-detail #main-slider .splide__list,',
    'body.type-detail #main-slider .splide__slide{background:transparent!important}',
    'body.type-detail #main-slider .splide__slide>a{position:relative;display:block;isolation:isolate}',
    /* kruh pod produktom je preč — klient ho dodá vo vlastnej grafike (7. 10.) */
    'body.type-detail #main-slider img{position:relative;z-index:1;mix-blend-mode:darken}',
    /* štítky boli nalepené na roh rámu galérie (0 px od okraja) */
    'body.type-detail .p-image-wrapper .flags-default{position:absolute!important;top:16px!important;',
    'left:16px!important;right:auto!important;z-index:3;margin:0!important;display:flex!important;',
    'flex-direction:row;flex-wrap:wrap;align-items:flex-start;gap:6px;pointer-events:none}',
    'body.type-detail .p-image-wrapper .flags-default .flag{margin:0!important}',
    'body.type-detail #thumbnail-slider{margin-top:12px}',
    'body.type-detail #thumbnail-slider .splide__slide{border:1.5px solid var(--sw-line)!important;',
    'border-radius:10px!important;overflow:hidden;opacity:1!important}',
    'body.type-detail #thumbnail-slider .splide__slide.is-active{border-color:var(--sw-ink)!important}',

    /* ---------- hlavička ---------- */
    /* Dve hlavičky: mobilná (nad fotkou) a desktopová (v pravom stĺpci). Na
       produkcii sa mobilná skrýva až od 992 px, takže pri 768–991 bol názov
       aj políčka dvakrát; desktopová je na mobile display:contents so skrytým
       h1, takže jej políčka a hviezdičky boli druhýkrát pod fotkou.
       Prepína sa jednotne pri 768 px ako Shoptet default. */
    '@media(min-width:768px){body.type-detail .p-detail-inner-header-mobile{display:none!important}',
    'body.type-detail .p-data-wrapper>.p-detail-inner-header{display:block!important}',
    'body.type-detail .p-data-wrapper>.p-detail-inner-header h1{display:block!important}}',
    '@media(max-width:767px){body.type-detail .p-data-wrapper .p-detail-inner-header .sw-pd-chips,',
    'body.type-detail .p-data-wrapper .p-detail-inner-header .stars-wrapper{display:none!important}}',
    'body.type-detail .p-detail-inner-header .brand-wrapper,body.type-detail .p-detail-inner-header-mobile .brand-wrapper{display:none!important}',
    /* oblasti účinku navrchu: farebné políčka bez sivého podkladu (7. 10.).
       Na produkcii je hlavička display:contents a deti majú order — políčka
       musia byť pred h1 (order 2) */
    '.sw-pd-chips{order:1;display:flex;flex-wrap:wrap;gap:7px;margin:0 0 16px}',
    '.sw-chip{display:inline-flex;align-items:center;height:30px;padding:0 13px;border-radius:8px;font-size:13.5px;',
    'font-weight:700;text-decoration:none!important;line-height:1;transition:filter .15s}',
    '.sw-chip:hover{filter:brightness(.93)}',
    'body.type-detail .p-detail-inner-header h1,body.type-detail .p-detail-inner-header-mobile .h1{',
    'font-size:clamp(32px,3.6vw,48px)!important;font-weight:700!important;letter-spacing:-.02em;',
    'line-height:1.08!important;color:var(--sw-ink)!important;margin:0 0 12px!important;text-align:left!important}',
    'body.type-detail .p-detail-inner-header .stars-wrapper,body.type-detail .p-detail-inner-header-mobile .stars-wrapper{',
    'display:flex!important;align-items:center;gap:8px;margin:0 0 20px!important;font-size:15px}',
    'body.type-detail .stars-wrapper .star::before{color:#E8A317!important;font-size:15px!important}',
    'body.type-detail .stars-wrapper .stars-label{display:none!important}',
    '.sw-pd-rv{font-weight:700;color:var(--sw-ink)}',
    'body.type-detail .stars-wrapper .stars-link{color:var(--sw-ink)!important;font-weight:700;',
    'text-decoration:underline!important;text-underline-offset:3px}',
    /* benefity z parametra „Benefity" (silwer-ux.js) ako zelené fajky */
    'body.type-detail .s-badges{display:flex!important;flex-direction:column!important;gap:10px!important;',
    'margin:0 0 22px!important;padding:0!important;background:none!important;border:0!important}',
    'body.type-detail .s-badges span{display:flex!important;align-items:flex-start!important;gap:10px!important;',
    'font-size:15.5px!important;font-weight:700!important;color:var(--sw-ink)!important;background:none!important;',
    'border:0!important;padding:0!important;line-height:1.45!important;border-radius:0!important}',
    'body.type-detail .s-badges i{flex:0 0 auto;width:20px!important;height:20px!important;color:var(--sw-green)!important;',
    'background:none!important;font-style:normal;font-weight:700;display:inline-flex!important;justify-content:center}',

    /* krátky popis: text celý tučný pôsobil ako krik */
    'body.type-detail .p-short-description{margin:0 0 22px!important;font-size:15.5px;line-height:1.65;color:var(--sw-text)}',
    'body.type-detail .p-short-description p{margin:0 0 12px}',
    'body.type-detail .p-short-description>p>strong:only-child{font-weight:500}',
    /* kotvy na GLP-1 (Viac informácií, Zloženie, Recenzie) sa zliepali do jedného slova */
    'body.type-detail .pd-anchors{display:flex;flex-wrap:wrap;gap:6px 20px}',
    'body.type-detail .pd-anchors a{font-weight:700;text-decoration:underline;text-underline-offset:3px}',

    /* ---------- info v piktogramoch (obsah balenia, dávka, cena za dávku,
       doprava, dostupnosť) — za popisom, pred nákupom ---------- */
    'body.type-detail .sw-boxes.sw-boxes--src{display:none!important}',
    'body.type-detail .p-data-wrapper>.sw-pd-info{order:5}',
    '.sw-pd-info{margin:20px 0 22px}',
    '.sw-pd-info__g{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}',
    '.sw-pi{display:flex;align-items:center;gap:12px;padding:12px 14px;border:1px solid var(--sw-line);border-radius:12px;background:#fff;min-width:0}',
    '.sw-pi__ic{flex:0 0 40px;width:40px;height:40px;border-radius:10px;background:var(--sw-black);color:#fff;',
    'display:flex;align-items:center;justify-content:center}',
    '.sw-pi__ic img{width:24px;height:24px;object-fit:contain}',
    '.sw-pi__ic svg{width:21px;height:21px;stroke:currentColor;fill:none;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}',
    '.sw-pi__t{display:flex;flex-direction:column;min-width:0}',
    '.sw-pi__l{font-size:11.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--sw-muted)}',
    '.sw-pi__v{font-size:15px;font-weight:700;color:var(--sw-ink);line-height:1.35}',
    '.sw-pd-info .sw-pd-code{margin-top:10px}',

    /* ---------- cena, balenia, nákup ---------- */
    'body.type-detail .p-price-wrapper{margin:0 0 18px!important}',
    'body.type-detail .p-price-wrapper .price-final{font-size:34px!important;font-weight:700!important;color:var(--sw-ink)!important}',
    'body.type-detail .p-price-wrapper .price-measure{font-size:14px!important;color:var(--sw-muted)!important;font-weight:600}',
    'body.type-detail.sw-has-packs .p-price-wrapper{display:none!important}',
    /* tabuľku nahrádzajú karty balení, zostáva v DOM kvôli logike Shoptetu */
    'body.type-detail.sw-has-packs .quantity-discounts{display:none!important}',
    /* sivý box „Doprava zadarmo · Napíšte nám!" s prázdnym odkazom — tú istú
       informáciu nesie riadok pod tlačidlom */
    'body.type-detail .detail-contact-button-link{display:none!important}',
    'body.type-detail #product-detail-form .detail-parameters{display:none!important}',

    '.sw-packs{margin:0 0 16px}',
    '.sw-packs__h{font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--sw-ink);margin:0 0 12px}',
    '.sw-packs__g{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}',
    '.sw-pack{position:relative;display:flex;flex-direction:column;align-items:center;text-align:center;gap:3px;',
    'padding:18px 8px 14px;border:1.5px solid var(--sw-line);border-radius:14px;background:#fff;cursor:pointer;',
    'font-family:inherit;color:var(--sw-ink);transition:border-color .15s,background .15s,box-shadow .15s}',
    '.sw-pack:hover{border-color:#BDBAB2}',
    '.sw-pack.is-on{border:2px solid var(--sw-ink);background:var(--sw-field);padding:17px 7px 13px;',
    'box-shadow:0 10px 24px -18px rgba(11,11,12,.5)}',
    '.sw-pack__t{font-size:16px;font-weight:700}',
    '.sw-pack__t em{font-style:normal;color:var(--sw-red)}',
    '.sw-pack__s{font-size:12.5px;color:var(--sw-muted);min-height:1.4em}.sw-pack__s i{font-style:normal}',
    '.sw-pack__p{font-size:22px;font-weight:700;margin-top:10px;line-height:1.1}',
    '.sw-pack__p--sum{font-size:17px;margin-top:10px;padding-top:10px;border-top:1px solid var(--sw-line);align-self:stretch}',
    '.sw-pack__d{font-size:12px;font-weight:600;color:var(--sw-muted);line-height:1.25}',
    '.sw-pack__ship{font-size:12px;font-weight:700;color:var(--sw-green);min-height:1.3em;margin-top:6px}',
    '.sw-pack__save{position:absolute;top:-11px;left:50%;transform:translateX(-50%);white-space:nowrap;',
    'background:var(--sw-red);color:#fff;font-size:10.5px;font-weight:700;letter-spacing:.06em;',
    'text-transform:uppercase;padding:3px 8px;border-radius:5px}',

    'body.type-detail .p-to-cart-block{margin:0!important}',
    'body.type-detail .p-to-cart-block .add-to-cart{display:flex!important;gap:10px;align-items:stretch}',
    'body.type-detail .p-to-cart-block .quantity{flex:0 0 146px;height:58px}',
    'body.type-detail .p-to-cart-block .quantity input.amount,',
    'body.type-detail .p-to-cart-block .quantity .increase,',
    'body.type-detail .p-to-cart-block .quantity .decrease{height:56px!important}',
    'body.type-detail .p-to-cart-block .quantity .increase,',
    'body.type-detail .p-to-cart-block .quantity .decrease{flex:0 0 44px;width:44px!important;font-size:20px!important}',
    'body.type-detail .p-to-cart-block .quantity input.amount{font-size:17px!important}',
    'body.type-detail .p-to-cart-block .add-to-cart-button{flex:1 1 auto;min-height:58px;border-radius:12px!important;',
    'background:var(--sw-red)!important;border:0!important;color:#fff!important;font-size:18px!important;',
    'font-weight:700!important;text-transform:none!important;display:flex!important;align-items:center;',
    'justify-content:center;gap:10px;box-shadow:0 12px 26px -16px rgba(212,0,0,.7)!important;margin:0!important}',
    'body.type-detail .p-to-cart-block .add-to-cart-button:hover{background:var(--sw-red-deep)!important}',
    '.sw-cta-price{font-weight:700}',

    /* Na produkcii je .p-data-wrapper flex s poradím cez order (hlavička je
       display:contents, h1 order 2, krátky popis 4, formulár 7). Info blok má
       order 5 — medzi popisom a nákupom; lokálne to isté drží poradie v DOM. */
    '.sw-ok{color:var(--sw-green);font-weight:700}.sw-no{color:var(--sw-red);font-weight:700}',
    '.sw-pd-code{color:var(--sw-muted);font-size:12.5px}',

    /* ---------- záložky a popis ---------- */
    'body.type-detail .p-detail-full-width{background:#fff!important;padding:56px 0 20px!important}',
    /* Záložky žijú v samostatnom pruhu cez celú šírku s vlastným Bootstrap
       kontajnerom (1170 + 16 px) a .row so zápornými okrajmi — preto boli
       záložky na 115 px, text na 131 a popis na 146. Rovnaký rám ako obsah. */
    'body.type-detail .p-detail-full-width>.container-full-width{width:100%!important;',
    'max-width:calc(1200px + 2*var(--sw-gut))!important;margin-left:auto!important;margin-right:auto!important;',
    'padding-left:var(--sw-gut)!important;padding-right:var(--sw-gut)!important;box-sizing:border-box}',
    'body.type-detail .p-detail-tabs-wrapper{max-width:none;margin:0}',
    'body.type-detail .p-detail-tabs-wrapper>.row{margin-left:0!important;margin-right:0!important}',
    'body.type-detail .p-detail-tabs-wrapper>.row>[class*="col-"]{padding-left:0!important;padding-right:0!important}',
    /* pod 768 px pruh nie je cez celú šírku, sedí v obsahu s margin -8 px,
       takže okraj už dáva rám obsahu a druhý by sa pripočítal */
    '@media(max-width:767px){body.type-detail .p-detail-full-width{margin-left:0!important;margin-right:0!important}',
    'body.type-detail .p-detail-full-width>.container-full-width{padding-left:0!important;padding-right:0!important}}',
    /* Shoptetov „responsive-nav" presúva záložky, ktoré sa podľa neho nezmestia,
       do skrytého menu pod ☰. Pri väčšom písme tak zmizli Parametre aj Hodnotenie.
       Záložky sa zmestia vždy, preto sa skryté menu zobrazí ako pokračovanie radu. */
    'body.type-detail .shp-tabs-row{display:flex!important;flex-wrap:wrap;align-items:flex-end;',
    'border-bottom:1px solid var(--sw-line)!important;margin:0 0 30px!important;padding:0!important}',
    'body.type-detail .shp-tabs-holder{flex:0 0 auto;width:auto!important;max-width:100%}',
    'body.type-detail .shp-tabs-row .navigation-btn{display:none!important}',
    'body.type-detail .shp-tabs-row .hidden-links{display:flex!important;position:static!important;',
    'visibility:visible!important;opacity:1!important;box-shadow:none!important;background:none!important;',
    'border:0!important;margin:0!important;padding:0!important;list-style:none;gap:6px;width:auto!important}',
    'body.type-detail .shp-tabs-row .hidden-links li{margin:0!important;border:0!important;background:none!important}',
    'body.type-detail .shp-tabs-row .hidden-links a{display:block;padding:14px 18px!important;font-size:16px!important;',
    'font-weight:700!important;color:var(--sw-muted)!important;background:none!important;border-bottom:3px solid transparent!important;',
    'text-decoration:none!important;margin-bottom:-1px}',
    'body.type-detail .shp-tabs{border:0!important;display:flex!important;gap:6px;',
    'background:none!important;margin:0!important;padding:0!important}',
    'body.type-detail .shp-tab{margin:0!important;border:0!important;background:none!important}',
    'body.type-detail .shp-tab-link{display:block;padding:14px 18px!important;font-size:16px!important;font-weight:700!important;',
    'color:var(--sw-muted)!important;background:none!important;border:0!important;border-bottom:3px solid transparent!important;',
    'border-radius:0!important;margin-bottom:-1px}',
    'body.type-detail .shp-tab.active .shp-tab-link{color:var(--sw-ink)!important;border-bottom-color:var(--sw-ink)!important}',
    'body.type-detail #tab-content{background:none!important;box-shadow:none!important;padding:0!important;border:0!important}',
    'body.type-detail .basic-description>h4{display:none}',
    'body.type-detail .basic-description,body.type-detail .extended-description{max-width:860px;',
    'font-size:16.5px;line-height:1.75;color:var(--sw-text)}',
    /* ---------- popis poskladaný z .pp blokov (pobo-prepis.css v KODY/) ----------
       Súbor nie je náš, needituje sa, prepisuje sa odtiaľto. Stĺpce mali 15 px
       padding, nadpisy sekcií 0, takže text skákal medzi dvoma osami. Nadpisy
       a text mali 1,6 px prestrkanie, ktoré brand manuál nepozná. */
    'body.type-detail .basic-description:has(.pp){max-width:980px;padding-right:0!important}',
    /* popis je užší než rám (čitateľnosť), preto na stred, nie nalepený vľavo */
    'body.type-detail .basic-description,body.type-detail .extended-description{margin-left:auto!important;margin-right:auto!important}',
    'body.type-detail .pp{max-width:none!important;margin:0!important}',
    'body.type-detail .pp-sek{padding:0 0 clamp(36px,4vw,52px)!important}',
    'body.type-detail .pp-half{gap:clamp(24px,4vw,56px)}',
    'body.type-detail .pp-col{flex:1 1 300px!important}',
    'body.type-detail .pp-col-pad{padding:0!important}',
    'body.type-detail .pp-img{border-radius:14px}',
    'body.type-detail .pp-hero{text-align:left!important}',
    'body.type-detail .pp-h2{font-size:clamp(22px,2.4vw,30px)!important;font-weight:700!important;',
    'letter-spacing:-.02em!important;line-height:1.2!important;color:var(--sw-ink)!important;',
    'margin:0 0 14px!important;text-align:left!important}',
    'body.type-detail .pp-p{font-size:16.5px!important;line-height:1.75!important;letter-spacing:0!important;',
    'color:var(--sw-text)!important;margin:0 0 16px!important}',
    'body.type-detail .pp-profit-item{gap:14px!important;padding:7px 0!important;align-items:center!important}',
    'body.type-detail .pp-profit-ico{flex-basis:24px!important;width:24px!important;height:24px!important;',
    'background-size:contain!important}',
    'body.type-detail .pp-profit-text{font-size:16.5px!important;font-weight:500!important;line-height:1.5!important;',
    'letter-spacing:0!important;padding:0!important;color:var(--sw-ink)!important}',
    'body.type-detail .pp-tab td{letter-spacing:0!important;font-size:15px!important;padding:12px 16px!important}',
    'body.type-detail .pp-dose{border:1px solid var(--sw-line)!important;border-radius:14px!important}',
    'body.type-detail .pp-faq summary{border:1px solid var(--sw-line)!important;border-radius:12px!important;',
    'box-shadow:none!important;letter-spacing:0!important;font-size:16px!important;font-weight:700!important;',
    'padding:16px 16px 16px 46px!important}',
    'body.type-detail .pp-faq details[open] summary{border-radius:12px 12px 0 0!important}',
    'body.type-detail .pp-faq details>div{box-shadow:none!important;border-color:var(--sw-line)!important;',
    'border-radius:0 0 12px 12px!important;padding:16px 18px 2px!important}',
    'body.type-detail .pp-faq p{letter-spacing:0!important;font-weight:400!important;font-size:15.5px!important;',
    'line-height:1.65!important;margin:0 0 14px!important}',
    'body.type-detail .pp-note{border-radius:14px!important}',
    '@media(max-width:767px){body.type-detail .pp-half{gap:18px}}',
    'body.type-detail .basic-description p{margin:0 0 16px}',
    'body.type-detail .basic-description h2,body.type-detail .basic-description h3{font-size:clamp(22px,2.4vw,30px);',
    'font-weight:700;letter-spacing:-.02em;color:var(--sw-ink);margin:36px 0 14px;line-height:1.2}',
    /* tabuľka zloženia ako „Čo je vo vnútri" z návrhu: čierna hlavička, pruhy.
       Pobo obsah má vlastné štýly, preto len tabuľky mimo neho. */
    'body.type-detail .basic-description table:not(#pobo-all-content table){width:100%!important;max-width:760px;',
    'border-collapse:separate!important;border-spacing:0;border:0!important;border-radius:12px;overflow:hidden;',
    'margin:26px 0 12px;font-size:15px;background:#fff}',
    'body.type-detail .basic-description table:not(#pobo-all-content table) td,',
    'body.type-detail .basic-description table:not(#pobo-all-content table) th{border:0!important;',
    'border-bottom:1px solid var(--sw-line)!important;padding:13px 16px!important;vertical-align:top;height:auto!important}',
    'body.type-detail .basic-description table:not(#pobo-all-content table) tr:first-child td,',
    'body.type-detail .basic-description table:not(#pobo-all-content table) tr:first-child th{',
    'background:var(--sw-ink)!important;color:#fff!important;font-size:12.5px;font-weight:700;letter-spacing:.08em;',
    'text-transform:uppercase}',
    'body.type-detail .basic-description table:not(#pobo-all-content table) tr:nth-child(even) td{background:var(--sw-field)}',
    'body.type-detail .extended-description table{width:100%;border-collapse:collapse}',
    'body.type-detail .extended-description th,body.type-detail .extended-description td{padding:12px 0!important;',
    'border-bottom:1px solid var(--sw-line)!important;text-align:left;font-size:15px}',

    /* ---------- video v popise (Pobo embed) ----------
       Shoptet obalí Pobo iframe do vlastného .video-player. CSS v admine
       ten obal zruší (padding:0, height:auto), ale iframe nechá
       position:absolute — ten si potom vezme rozmer najbližšieho pozicovaného
       predka a narastie cez celú stránku (namerané: 1170x8541 px).
       Preto sa tu pomer strán 16:9 obnovuje na správnom mieste. */
    'body.type-detail .pb-embed-responsive,body.type-detail .basic-description .video-player{',
    'position:relative!important;width:100%;max-width:860px;aspect-ratio:16/9;height:auto!important;',
    'padding:0!important;margin:22px 0;overflow:hidden;border-radius:14px;background:#000}',
    'body.type-detail .pb-embed-responsive .video-player{margin:0!important;border-radius:0;max-width:none}',
    'body.type-detail .pb-embed-responsive iframe,body.type-detail .pb-embed-responsive-item,',
    'body.type-detail .basic-description .video-player iframe{position:absolute!important;',
    'top:0!important;left:0!important;width:100%!important;height:100%!important;border:0!important}',

    /* ---------- hodnotenia ----------
       Pruhy boli prázdne (výplň sa kreslila cez ::before, ktorý Shoptet nemá,
       šírku dáva priamo .rate-bar), karty úzke a rozhodené po mriežke.
       Teraz ten istý komponent ako /hodnotenie-obchodu/. */
    'body.type-detail #ratingTab>h2{font-size:clamp(22px,2.4vw,30px)!important;font-weight:700!important;',
    'letter-spacing:-.02em!important;color:var(--sw-ink)!important;margin:0 0 20px!important;text-align:left!important;',
    'border:0!important;padding:0!important}',
    S.ratingCss('body.type-detail #ratingTab ', 'body.type-detail #ratingTab #ratingsList'),

    /* ---------- súvisiace a podobné produkty ---------- */
    'body.type-detail .products-header{font-size:clamp(22px,2.4vw,30px)!important;font-weight:700!important;',
    'letter-spacing:-.02em;color:var(--sw-ink)!important;text-align:left!important;margin:56px 0 20px!important;',
    'max-width:1240px}',
    '.sw-pd-sub{font-size:16px;color:var(--sw-muted);margin:0 0 20px}',
    'body.type-detail .products-additional{overflow:visible!important;width:100%!important}',
    'body.type-detail .products-additional .products-block{display:grid!important;',
    'grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;width:100%!important;transform:none!important;transition:none!important}',
    'body.type-detail .products-additional .products-block>.product{width:auto!important;margin:0!important}',
    'body.type-detail .products-additional .products-block>.product:nth-child(n+5){display:none!important}',
    /* Okno „Pridané do košíka" má tie isté triedy ako súvisiace produkty na detaile, takže
       dostalo pevné 4 stĺpce. Pri 1 až 3 súvisiacich ostali vedľa kariet prázdne miesta
       (Martin 7. 11.). V okne je to riadok s rovnako širokými kartami, neúplný v strede. */
    'body.type-detail .advanced-order .products-additional .products-block{display:flex!important;',
    'flex-wrap:wrap;justify-content:center}',
    'body.type-detail .advanced-order .products-additional .products-block>.product{flex:0 0 calc((100% - 48px)/4)}',
    'body.type-detail .product-slider-holder .product-slider-navigation,',
    'body.type-detail .product-slider-holder .product-slider-pagination{display:none!important}',
    'body.type-detail .product-slider-holder{padding:0!important}',

    /* ---------- pás dôvery (vypnutý do potvrdenia tvrdení) ---------- */
    /* klient 20. 10.: karty boli zbytočne veľké a na mobile odtlačili popis produktu
       pod ohyb. Jaro 22. 10.: k tvrdeniam pekné ikony. Preto stále jeden nízky pás,
       ikona v čiernom kruhu (kruh je primárny asset brandu), pod nadpisom skrátené
       tvrdenie. Na mobile len ikona a nadpis. */
    '.sw-pd-trust__w{margin:32px 0 0}',
    '.sw-pd-trust{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;max-width:1240px;margin:0 auto;',
    'padding:18px clamp(18px,2.4vw,32px);background:var(--sw-field);border-radius:18px;box-sizing:border-box}',
    '.sw-desc-more{font-weight:700;color:var(--sw-red)!important;text-decoration:underline;text-underline-offset:3px;white-space:nowrap}',
    '.sw-desc-more:hover{color:var(--sw-red-deep)!important}',
    '.sw-pd-trust__c{display:flex;align-items:center;gap:14px;min-width:0}',
    '.sw-pd-trust__i{flex:0 0 48px;width:48px;height:48px;border-radius:50%;background:var(--sw-ink);color:#fff;',
    'display:flex;align-items:center;justify-content:center}',
    '.sw-pd-trust__i svg{width:24px;height:24px;stroke:currentColor;fill:none;stroke-width:1.6;',
    'stroke-linecap:round;stroke-linejoin:round}',
    '.sw-pd-trust__i .f{fill:currentColor;stroke:none}',
    '.sw-pd-trust__t{display:flex;flex-direction:column;gap:3px;min-width:0}',
    '.sw-pd-trust__t b{font-size:15.5px;font-weight:700;line-height:1.25;color:var(--sw-ink)}',
    '.sw-pd-trust__t span{font-size:13.5px;line-height:1.4;color:var(--sw-muted)}',

    /* ---------- recenzie medzi pásom dôvery a popisom ----------
       Jaro 22. 10.: panel s recenziami mierne vylepšiť a dať ho medzi tvrdenia
       a dlhý popis. Pobo widget „Čo hovoria zákazníci" (silwer-reviews.min.js)
       je len na 2 produktoch zo 78, preto panel kreslí redizajn z tých istých dát
       pre každý produkt s hodnoteniami a Pobo kópiu v popise skryje. */
    '.sw-rv{max-width:1240px;margin:44px auto 0}',
    '.sw-rv__h{display:flex;align-items:flex-end;justify-content:space-between;gap:14px 24px;flex-wrap:wrap;margin:0 0 20px}',
    '.sw-rv__t{font-size:clamp(22px,2.4vw,30px)!important;font-weight:700!important;letter-spacing:-.02em;line-height:1.15!important;',
    'color:var(--sw-ink)!important;margin:0!important;padding:0!important;border:0!important;text-align:left!important}',
    '.sw-rv__agg{display:flex;align-items:center;flex-wrap:wrap;gap:6px 12px;margin:10px 0 0;font-size:15px;color:var(--sw-muted)}',
    '.sw-rv__avg{font-size:28px;font-weight:700;line-height:1;letter-spacing:-.02em;color:var(--sw-ink)}',
    '.sw-rv__st{color:#E8A317;font-size:15px;letter-spacing:2px;line-height:1;white-space:nowrap}',
    '.sw-rv__st i{font-style:normal}.sw-rv__st i.off{color:var(--sw-line)}',
    '.sw-rv__all{font-weight:700;color:var(--sw-ink)!important;text-decoration:underline;text-underline-offset:3px}',
    '.sw-rv__nav{display:flex;gap:8px}',
    '.sw-rv__btn{width:44px;height:44px;border-radius:50%;border:1px solid var(--sw-line);background:#fff;color:var(--sw-ink);',
    'display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;transition:background .2s,color .2s,opacity .2s}',
    '.sw-rv__btn:hover{background:var(--sw-ink);border-color:var(--sw-ink);color:#fff}',
    '.sw-rv__btn[disabled]{opacity:.3;pointer-events:none}',
    '.sw-rv__btn svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}',
    '.sw-rv__tr{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;',
    '-webkit-overflow-scrolling:touch;padding:0;margin:0}',
    '.sw-rv__tr::-webkit-scrollbar{display:none}',
    '.sw-rv__c{flex:0 0 calc((100% - 32px) / 3);scroll-snap-align:start;box-sizing:border-box;background:var(--sw-field);',
    'border-radius:18px;padding:24px;display:flex;flex-direction:column;gap:14px;min-width:0}',
    '.sw-rv__c p{margin:0!important;font-size:15.5px!important;line-height:1.6!important;color:var(--sw-text)!important;flex:1 1 auto;',
    'white-space:pre-line;display:-webkit-box;-webkit-line-clamp:6;-webkit-box-orient:vertical;overflow:hidden}',
    '.sw-rv__f{display:flex;align-items:center;gap:12px;min-width:0}',
    '.sw-rv__a{flex:0 0 40px;width:40px;height:40px;border-radius:50%;background:#fff;color:var(--sw-ink);',
    'font-size:14px;font-weight:700;display:flex;align-items:center;justify-content:center;text-transform:uppercase}',
    '.sw-rv__n{display:flex;flex-direction:column;line-height:1.3;min-width:0}',
    '.sw-rv__n b{font-size:15px;font-weight:700;color:var(--sw-ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
    '.sw-rv__n span{font-size:13px;color:var(--sw-muted)}',
    'body.type-detail #pobo-all-content .widget-reviews-threerow.sw-rv-dup{display:none!important}',
    '@media(max-width:991px){.sw-rv__c{flex-basis:calc((100% - 16px) / 2)}}',

    /* ---------- mobil ---------- */
    '@media(max-width:991px){body.type-detail .products-additional .products-block{grid-template-columns:repeat(2,minmax(0,1fr))}',
    'body.type-detail .advanced-order .products-additional .products-block>.product{flex-basis:calc((100% - 16px)/2)}',
    'body.type-detail .products-additional .products-block>.product:nth-child(n+5){display:block!important}}',
    '@media(max-width:767px){',
    'body.type-detail .p-detail-inner{grid-template-columns:minmax(0,1fr);gap:18px}',
    'body.type-detail .p-image-wrapper{position:static}',
    'body.type-detail .p-detail-inner-header-mobile .h1{font-size:28px!important}',
    '.sw-packs__g{gap:7px}.sw-pack{padding:16px 4px 12px}.sw-pack.is-on{padding:15px 3px 11px}',
    '.sw-pack__t{font-size:13px}.sw-pack__s{font-size:11px}.sw-pack__p{font-size:18px}.sw-pack__p--sum{font-size:15px}',
    '.sw-pack__d{font-size:10.5px}.sw-pack__ship{font-size:10.5px}',
    'body.type-detail .p-detail-inner-header-mobile .stars-wrapper{justify-content:flex-start!important}',
    '.sw-pack__save{font-size:9.5px;padding:2px 6px}',
    'body.type-detail .p-to-cart-block .add-to-cart{gap:8px!important}',
    /* 40 + 2×44 px tlačidlá = 128; pri 104 px sa „+" odrezalo */
    'body.type-detail .p-to-cart-block .quantity{flex:0 0 116px!important}',
    'body.type-detail .p-to-cart-block .quantity .increase,body.type-detail .p-to-cart-block .quantity .decrease{flex:0 0 38px!important;width:38px!important}',
    'body.type-detail .p-to-cart-block .quantity>label{flex:1 1 0;min-width:36px}',
    'body.type-detail .p-to-cart-block .add-to-cart-button{font-size:15px!important;white-space:nowrap;gap:6px!important;padding:0 10px!important}',
    'body.type-detail .p-to-cart-block .add-to-cart-button i{display:none}',
    '.sw-pack__t em{white-space:nowrap}',
    '.sw-pd-info__g{grid-template-columns:minmax(0,1fr)}',
    'body.type-detail .shp-tabs{overflow-x:auto;flex-wrap:nowrap!important;scrollbar-width:none}',
    'body.type-detail .shp-tab-link{white-space:nowrap;padding:12px 12px!important;font-size:15px!important}',
    '.sw-pd-trust{gap:8px;padding:14px 10px;border-radius:14px}',
    '.sw-pd-trust__c{flex-direction:column;text-align:center;gap:8px}',
    '.sw-pd-trust__i{flex-basis:40px;width:40px;height:40px}.sw-pd-trust__i svg{width:20px;height:20px}',
    '.sw-pd-trust__t b{font-size:12.5px}.sw-pd-trust__t span{display:none}',
    '.sw-rv{margin-top:32px}.sw-rv__nav{display:none}.sw-rv__c{flex-basis:86%;padding:20px}}',

    /* ---------- videá k produktu (zo zdieľanej tabuľky Silweru) ----------
       Martin Marko 21. 10.: social proof videá aj na detaile, pás ako na úvode
       (inšpirácia denatura.sk). Karty tie isté ako na úvode, pás stojí a posúva
       sa šípkami alebo prstom, hlavička ako pri recenziách. */
    '.sw-vd{max-width:1240px;margin:44px auto 0}',
    '.sw-vd__tr{overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;-webkit-overflow-scrolling:touch;padding:4px 0 6px}',
    '.sw-vd__tr::-webkit-scrollbar{display:none}',
    '.sw-vd .sw-ugc__set{gap:16px;padding-right:0}',
    '.sw-vd .sw-ugc__c{width:clamp(180px,18vw,224px);scroll-snap-align:start}',
    '@media(max-width:767px){.sw-vd{margin-top:32px}.sw-vd .sw-rv__nav{display:none}.sw-vd .sw-ugc__c{width:44vw}}'
  ].join(''));

  function num(s) { return S.parseMoney(s); }

  /* „90 kapsúl/90 dní" → {count:90, unit:'kapsúl', days:90} */
  function packInfo() {
    var out = {};
    document.querySelectorAll('.sw-boxes .sw-item').forEach(function (it) {
      var l = (it.querySelector('.sw-label') || {}).textContent || '';
      var v = ((it.querySelector('.sw-value') || {}).textContent || '').trim();
      if (/obsah balenia/i.test(l)) {
        var m = v.match(/(\d+)\s*([^\d/]*?)\s*\/\s*(\d+)\s*dn/i);
        if (m) { out.count = +m[1]; out.unit = m[2].trim(); out.days = +m[3]; }
      }
    });
    return out;
  }
  function plural(n, one, few, many) { return n === 1 ? one : (n >= 2 && n <= 4 ? few : many); }

  function tiers() {
    return [].slice.call(document.querySelectorAll('.quantity-discounts__item')).map(function (it) {
      var p = it.querySelector('.quantity-discounts__price');
      return { n: parseInt(it.getAttribute('data-amount'), 10) || 1,
               ratio: parseFloat(it.getAttribute('data-price-ratio')) || 1,
               unit: p ? num(p.textContent) : NaN };
    }).filter(function (t) { return !isNaN(t.unit); });
  }
  function basePrice() {
    var m = document.querySelector('.p-detail [itemprop="offers"] [itemprop="price"]');
    return m ? parseFloat(m.getAttribute('content')) : NaN;
  }
  /* Suma tak, ako ju počíta košík Shoptetu: zľava z celej sumy, nie zo zaokrúhlenej
     ceny za kus (klient 20. 10.: 6 × 4,87 = 29,22 €, košík 29,19 €). */
  function totalFor(q, ts) {
    var base = basePrice(), r = 1, u = NaN;
    ts.forEach(function (t) { if (q >= t.n) { r = t.ratio; u = t.unit; } });
    if (isNaN(base)) return isNaN(u) ? NaN : u * q;
    return Math.round(base * q * r * 100) / 100;
  }
  function amountInput() { return document.querySelector('#product-detail-form input.amount'); }

  function header() {
    ['.p-detail-inner-header', '.p-detail-inner-header-mobile'].forEach(function (sel) {
      var h = document.querySelector(sel);
      if (!h || h.getAttribute('data-sw-head')) return;
      h.setAttribute('data-sw-head', '1');
      /* Feedback 7. 10.: navrchu oblasti účinku vo farebných políčkach, bez
         štítku kategórie (napr. „SILWER JOJ PLAY") a bez sivého podkladu. */
      var ch = chips();
      if (ch) h.insertBefore(ch, h.firstChild);
      var sw = h.querySelector('.stars-wrapper');
      var sr = sw && sw.querySelector('.sr-only');
      var lbl = sw && sw.querySelector('.stars-label');
      var link = sw && sw.querySelector('.stars-link');
      if (sw && sr && !sw.querySelector('.sw-pd-rv')) {
        var v = (sr.textContent.match(/(\d+,\d+|\d+)\s*z\s*5/) || [])[1];
        if (v) sw.querySelector('.stars').insertAdjacentElement('afterend', S.el('span', 'sw-pd-rv', v + ' ·'));
        if (link && lbl) link.textContent = lbl.textContent.trim();
      }
    });
  }

  /* Príznaky nad názvom produktu = oblasti z menu „Hľadám niečo na" (NEEDS
     a EXTRA), do ktorých je produkt zaradený v Shoptete (Braňo 4. 11.:
     „také kategórie, ako sú zaradené u nás v Shoptete"). Zaradenie berie zber
     dát z kategórií v admine (products[url].c), poradie je poradie oblastí
     v menu. Box „Účinky" v krátkom popise sa už nepoužíva: písal sa ručne
     a nezhodoval sa s kategóriami (Berberín mal 2 z 4). Len keď dáta
     o zaradení chýbajú (staršia záloha), použije sa ešte ten box. */
  var CHIP_EXTRA = [
    [/imunit/i,          'Imunita',    '/na-imunitu/',    '#B5BC12'],
    [/dlhovek|longev/i,  'Dlhovekosť', '/dlhovekost-3/',  '#B39C87'],
    [/stres/i,           'Stres',      '/proti-stresu/',  '#5F7883']
  ];
  var CHIP_NEED = [
    [/chudn|hmotnos/i, 'chudnutie'], [/kost|kĺb|klb|sval/i, 'kosti'], [/spán|span|pokoj/i, 'spanok'],
    [/srd|ciev/i, 'srdce'], [/pamä|mozo|mozg/i, 'mozog'], [/energ|nálad|vital|únav/i, 'energia'],
    [/tráven|traven|čreva/i, 'travenie'], [/peče|pecen/i, 'pecen'], [/zrak|oč/i, 'zrak'],
    [/menopauz/i, 'menopauza'], [/testost|prostat/i, 'testosteron'], [/pokož|pleť|plet|vlas|necht/i, 'plet']
  ];
  /* oblasti v poradí menu: [názov, odkaz, farba, URL kategórií, ktoré ju tvoria] */
  function chipAreas() {
    return S.NEEDS.map(function (n) {
      return [n[0], S.needHref(n), n[2], [n[1], n[6]].filter(Boolean)];
    }).concat(S.EXTRA.map(function (x) { return [x[0], x[1], x[2], [x[1]]]; }));
  }
  function chipHtml(c) {
    return '<a class="sw-chip" href="' + c[1] + '" style="background:' + c[2] + ';color:' + S.onAccent(c[2]) + '">' + c[0] + '</a>';
  }
  function chipsFromCats() {
    var p = S.DATA.products[location.pathname];
    if (!p || !p.c) return null;
    return chipAreas().filter(function (a) {
      return a[3].some(function (u) { return p.c.indexOf(u) >= 0; });
    });
  }
  function chipsFromBox() {
    var tags = [].slice.call(document.querySelectorAll('.p-short-description .sw-boxes .sw-tag'));
    var seen = {}, out = [];
    tags.forEach(function (t) {
      var txt = t.textContent.replace(/\s+/g, ' ').trim(), c = null;
      CHIP_NEED.some(function (m) {
        if (!m[0].test(txt)) return false;
        var n = S.NEEDS.filter(function (x) { return x[4] === m[1]; })[0];
        if (n) c = [n[0], S.needHref(n), n[2]];
        return true;
      });
      if (!c) CHIP_EXTRA.some(function (m) { if (m[0].test(txt)) { c = [m[1], m[2], m[3]]; return true; } return false; });
      if (!c || seen[c[0]]) return;
      seen[c[0]] = 1;
      out.push(c);
    });
    return out;
  }
  function chips() {
    var list = chipsFromCats() || chipsFromBox();
    return list.length ? S.el('div', 'sw-pd-chips', list.map(chipHtml).join('')) : null;
  }
  /* čerstvé dáta z endpointu (sw:data) môžu mať iné zaradenie ako záloha v JS */
  document.addEventListener('sw:data', function () {
    ['.p-detail-inner-header', '.p-detail-inner-header-mobile'].forEach(function (sel) {
      var h = document.querySelector(sel);
      if (!h || !h.getAttribute('data-sw-head')) return;
      var old = h.querySelector('.sw-pd-chips'), ch = chips();
      if (old && ch && old.innerHTML === ch.innerHTML) return;
      if (old) old.remove();
      if (ch) h.insertBefore(ch, h.firstChild);
    });
  });

  function packs() {
    var form = document.getElementById('product-detail-form');
    var ts = tiers();
    var input = amountInput();
    if (!form || !input || ts.length < 2 || form.querySelector('.sw-packs')) return;
    document.body.classList.add('sw-has-packs');
    var info = packInfo();

    /* Feedback 7. 10. podľa vzoru GLP-1: hlavná cena je cena za 1 balenie,
       bez trvania zásoby a ceny za deň. Stredná úroveň „Najobľúbenejšie",
       najväčšia „Najlepšia cena" a podnadpis „Maximálna úspora". */
    var mid = ts.length > 2 ? ts[1] : null, max = ts.length > 1 ? ts[ts.length - 1] : null;
    var html = ts.map(function (t) {
      var total = totalFor(t.n, ts);
      var off = Math.round((1 - t.ratio) * 100);
      var badge = t === max ? 'Najlepšia cena' : (t === mid ? 'Najobľúbenejšie' : '');
      var sub = t === max ? 'Maximálna úspora' : (info.count ? (info.count * t.n) + ' ' + info.unit : '');
      return '<button type="button" class="sw-pack' + (t === max ? ' sw-pack--max' : '') + '" data-n="' + t.n + '">' +
        (badge ? '<span class="sw-pack__save">' + badge + '</span>' : '') +
        '<span class="sw-pack__t">' + t.n + ' ' + plural(t.n, 'balenie', 'balenia', 'balení') +
          (off > 0 ? ' <em>−' + off + ' %</em>' : '') + '</span>' +
        '<span class="sw-pack__s">' + sub + '</span>' +
        /* náčrt klienta 12. 10.: cena za 1 balenie a pod ňou cena za všetky */
        '<span class="sw-pack__p">' + S.money(t.unit) + '</span>' +
        '<span class="sw-pack__d">cena za 1 balenie</span>' +
        '<span class="sw-pack__p sw-pack__p--sum">' + S.money(total) + '</span>' +
        '<span class="sw-pack__d">' + (t.n === 1 ? 'cena spolu' : 'cena za ' + t.n + ' ' + plural(t.n, 'balenie', 'balenia', 'balení')) + '</span>' +
        '<span class="sw-pack__ship">' + (total >= S.CFG.freeShip ? '✓ doprava zadarmo' : '') + '</span></button>';
    }).join('');
    var box = S.el('div', 'sw-packs', '<div class="sw-packs__h">Vyberte si balenie</div><div class="sw-packs__g">' + html + '</div>');
    var cart = form.querySelector('.p-to-cart-block');
    form.insertBefore(box, cart);

    box.querySelectorAll('.sw-pack').forEach(function (b) {
      b.addEventListener('click', function () {
        input.value = b.getAttribute('data-n');
        ['input', 'change', 'keyup'].forEach(function (ev) {
          input.dispatchEvent(new Event(ev, { bubbles: true }));
        });
        sync();
      });
    });
  }

  /* tlačidlo s cenou a zvýraznená karta podľa aktuálneho množstva */
  function sync() {
    var input = amountInput();
    if (!input) return;
    var q = Math.max(1, parseInt(input.value, 10) || 1);
    var ts = tiers();
    var total = totalFor(q, ts);
    var btn = document.querySelector('#product-detail-form .add-to-cart-button');
    if (btn && !isNaN(total)) {
      var sp = btn.querySelector('.sw-cta-price');
      if (!sp) { sp = S.el('span', 'sw-cta-price'); btn.appendChild(sp); }
      sp.textContent = '· ' + S.money(total);
    }
    var on = null;
    document.querySelectorAll('.sw-pack').forEach(function (b) {
      if (q >= +b.getAttribute('data-n')) on = b;
    });
    document.querySelectorAll('.sw-pack').forEach(function (b) {
      b.classList.toggle('is-on', b === on && +b.getAttribute('data-n') === q);
    });
  }

  /* Feedback 7. 10.: až za popisom ide info o doprave a sklade vo forme
     piktogramov a „ostatné tiež v piktogramoch tak ako sme to mali doteraz"
     (obsah balenia, denná dávka, cena za dávku — s ikonami z IKONY/).
     Všetko jeden blok PRED nákupom. Údaje sú z boxu v popise a z parametrov
     Shoptetu, nič sa nevymýšľa. */
  function lines() {
    var form = document.getElementById('product-detail-form');
    if (!form || form.parentNode.querySelector('.sw-pd-info')) return;
    var items = [];
    var boxes = document.querySelector('.p-short-description .sw-boxes');
    if (boxes) {
      boxes.querySelectorAll('.sw-item').forEach(function (it) {
        var l = ((it.querySelector('.sw-label') || {}).textContent || '').trim();
        var v = ((it.querySelector('.sw-value') || {}).textContent || '').trim();
        var ic = it.querySelector('.sw-icon img');
        if (!l || !v || /účink/i.test(l)) return;   /* účinky sú navrchu ako políčka */
        items.push([ic ? '<img src="' + ic.getAttribute('src') + '" alt="">' : S.svg('box'), l, v]);
      });
      boxes.classList.add('sw-boxes--src');
    }
    var av = document.querySelector('.detail-parameter-availability .availability-label');
    var dt = document.querySelector('.detail-parameter-delivery-date .delivery-time');
    var code = document.querySelector('.detail-parameter-product-code span:last-child');
    var avT = av ? av.textContent.replace(/\s+/g, ' ').trim() : '';
    var ok = /skladom/i.test(avT);
    items.push([S.svg('truck'), 'Doprava', 'Zadarmo nad ' + S.CFG.freeShip + ' €']);
    if (avT) items.push([S.svg(ok ? 'check' : 'clock'), 'Dostupnosť',
      '<span class="' + (ok ? 'sw-ok' : 'sw-no') + '">' + avT + '</span>' +
      (dt && ok ? ', doručenie do ' + dt.textContent.trim() : '')]);
    if (S.CFG.guarantee) items.push([S.svg('check'), 'Garancia', '60 dní na vrátenie peňazí']);
    var box = S.el('div', 'sw-pd-info', '<div class="sw-pd-info__g">' + items.map(function (x) {
      return '<div class="sw-pi"><span class="sw-pi__ic">' + x[0] + '</span><span class="sw-pi__t">' +
        '<span class="sw-pi__l">' + x[1] + '</span><span class="sw-pi__v">' + x[2] + '</span></span></div>';
    }).join('') + '</div>' + (code ? '<div class="sw-pd-code">Kód produktu: ' + code.textContent.trim() + '</div>' : ''));
    form.parentNode.insertBefore(box, form);
  }

  /* kruh dvanástich hviezd ako na vlajke EÚ, v strede fajka */
  function euRing() {
    var s = '';
    for (var k = 0; k < 12; k++) {
      var a = k * Math.PI / 6;
      s += '<circle cx="' + (12 + 8 * Math.sin(a)).toFixed(2) + '" cy="' + (12 - 8 * Math.cos(a)).toFixed(2) + '" r="1.2"/>';
    }
    return '<g class="f">' + s + '</g><path d="M8.6 12.3l2.3 2.3 4.5-4.8"/>';
  }
  /* [ikona, nadpis, skrátené tvrdenie, celé tvrdenie v title] — tvrdenia čakajú na
     potvrdenie (CFG.trustBand). Prvky s class="f" sú plné, ostatné len obrys. */
  var TRUST = [
    [euRing(), 'Vyrobené a testované v EÚ', 'Certifikovaný závod, správna výrobná prax',
      'Výroba v certifikovanom závode v Európskej únii podľa štandardu správnej výrobnej praxe.'],
    ['<path d="M9.5 3h5M10.5 3v5.3L5.6 17.4a2 2 0 0 0 1.8 3.1h9.2a2 2 0 0 0 1.8-3.1L13.5 8.3V3"/><path d="M7.4 14.2h9.2"/>' +
      '<g class="f"><circle cx="10.6" cy="17.3" r="1"/><circle cx="13.9" cy="16.5" r=".75"/></g>',
      'Testovaná každá šarža', 'Laboratórna kontrola zloženia a čistoty',
      'Každá šarža prechádza laboratórnou kontrolou zloženia a čistoty.'],
    ['<circle cx="12" cy="9.6" r="5.6"/><path d="M8.9 14.3L7.6 21l4.4-2.3 4.4 2.3-1.3-6.7"/>' +
      '<path class="f" d="M12 6.6l.735 1.989 2.118.084-1.664 1.313.574 2.041L12 10.85l-1.763 1.177.574-2.041-1.664-1.313 2.118-.084z"/>',
      'Slovenská značka', 'Písali o nás Forbes, Pravda aj Nový Čas',
      'Napísali o nás Forbes, Pravda, Nový Čas aj Aktuality. Zákaznícka linka s reálnymi ľuďmi na telefóne.']
  ];
  function related() {
    var h = document.querySelector('.products-related-header');
    if (h && !h.getAttribute('data-sw')) {
      h.setAttribute('data-sw', '1');
      h.textContent = 'Odporúčame kombinovať';
    }
    if (S.CFG.trustBand && !document.querySelector('.sw-pd-trust__w')) {
      /* pás ide nad recenzie, ak už sú nakreslené, inak tesne nad záložky */
      var at = document.querySelector('.sw-rv') || document.querySelector('.p-detail-full-width');
      if (at) at.parentNode.insertBefore(S.el('div', 'sw-pd-trust__w',
        '<div class="sw-pd-trust">' + TRUST.map(function (t) {
          return '<div class="sw-pd-trust__c" title="' + t[3] + '"><span class="sw-pd-trust__i">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true">' + t[0] + '</svg></span>' +
            '<span class="sw-pd-trust__t"><b>' + t[1] + '</b><span>' + t[2] + '</span></span></div>';
        }).join('') + '</div>'), at);
    }
  }

  /* Otvorí záložku detailu (Popis, Hodnotenie) a zroluje k nej. Hlavička je fixná,
     preto odsadenie. */
  function goTab(href) {
    var tab = document.querySelector('a[href="' + href + '"]');
    if (tab) tab.click();
    var box = document.querySelector('.p-detail-full-width') || document.querySelector(href);
    if (!box) return;
    var hd = document.querySelector('#header');
    var off = (hd && getComputedStyle(hd).position === 'fixed' ? hd.offsetHeight : 0) + 90;
    window.scrollTo({ top: box.getBoundingClientRect().top + window.pageYOffset - off, behavior: 'smooth' });
  }

  /* Recenzie nad popisom (Jaro 22. 10.). Dáta sú hodnotenia Shoptetu zo záložky
     Hodnotenie (#ratingsList), tie isté, z ktorých kreslí Pobo widget. Ako on ukazuje
     len 4 a 5 hviezd s textom; priemer, počet a celý zoznam v záložke sú bez zmeny.
     Produkt bez takých hodnotení panel nemá. Text zákazníkov ide cez textContent. */
  function txt(e) { return e ? e.textContent.replace(/\s+/g, ' ').trim() : ''; }
  function stars(n) {
    var s = S.el('span', 'sw-rv__st');
    s.setAttribute('aria-label', 'Hodnotenie ' + n + ' z 5');
    for (var i = 1; i <= 5; i++) {
      var st = S.el('i', i <= n ? '' : 'off');
      st.textContent = '★';
      st.setAttribute('aria-hidden', 'true');
      s.appendChild(st);
    }
    return s;
  }
  function reviewData() {
    return [].slice.call(document.querySelectorAll('#ratingsList .vote-wrap')).map(function (w) {
      var c = w.querySelector('.vote-content'), lines = [], body = '';
      if (c) {
        c = c.cloneNode(true);
        /* plusy a mínusy z Heureky sú v samostatných blokoch, každý riadok zvlášť */
        [].slice.call(c.querySelectorAll('.heureka-rating-group')).forEach(function (g) {
          g.textContent.split(/\s*\n\s*/).forEach(function (l) { if (l.trim()) lines.push(l.trim()); });
          g.parentNode.removeChild(g);
        });
        [].slice.call(c.querySelectorAll('br')).forEach(function (b) { b.parentNode.replaceChild(document.createTextNode('\n'), b); });
        body = c.textContent.replace(/[ \t]+/g, ' ').replace(/\n\s*\n\s*\n+/g, '\n\n').trim();
      }
      var r = parseFloat(txt(w.querySelector('[itemprop="reviewRating"] [itemprop="ratingValue"]')));
      return {
        rating: isNaN(r) ? 0 : Math.round(r),
        name: txt(w.querySelector('.vote-name [itemprop="name"]')) || txt(w.querySelector('.vote-name')) || 'Overený zákazník',
        date: txt(w.querySelector('.vote-time')),
        text: lines.concat(body ? [body] : []).join('\n')
      };
    }).filter(function (v) { return v.rating >= 4 && v.text.length >= 3; });
  }
  function reviewCard(v) {
    var c = S.el('article', 'sw-rv__c'), p = S.el('p'), f = S.el('div', 'sw-rv__f');
    var a = S.el('span', 'sw-rv__a'), n = S.el('span', 'sw-rv__n'), b = S.el('b'), d = S.el('span');
    c.setAttribute('role', 'listitem');
    c.appendChild(stars(v.rating));
    p.textContent = v.text;
    c.appendChild(p);
    a.textContent = v.name.split(/[\s\-–]+/).filter(function (x) { return /[a-zA-ZÀ-ɏ]/.test(x); })
      .slice(0, 2).map(function (x) { return x.charAt(0); }).join('');
    a.setAttribute('aria-hidden', 'true');
    b.textContent = v.name;
    d.textContent = v.date;
    n.appendChild(b);
    if (v.date) n.appendChild(d);
    f.appendChild(a);
    f.appendChild(n);
    c.appendChild(f);
    return c;
  }
  function reviews() {
    var tabs = document.querySelector('.p-detail-full-width');
    if (!tabs || document.querySelector('.sw-rv')) return;
    var list = reviewData().slice(0, 12);
    if (!list.length) return;
    var ag = document.querySelector('[itemprop="aggregateRating"]');
    var avg = ag && ag.querySelector('[itemprop="ratingValue"]'), cnt = ag && ag.querySelector('[itemprop="ratingCount"]');
    avg = avg ? parseFloat(avg.getAttribute('content') || txt(avg)) : NaN;
    cnt = cnt ? parseInt(cnt.getAttribute('content') || txt(cnt), 10) : NaN;

    var box = S.el('section', 'sw-rv'), head = S.el('div', 'sw-rv__h'), hl = S.el('div');
    box.setAttribute('aria-label', 'Recenzie zákazníkov');
    var h = S.el('h2', 'sw-rv__t');
    h.textContent = 'Čo hovoria zákazníci';
    hl.appendChild(h);
    if (!isNaN(avg) && cnt) {
      var agg = S.el('div', 'sw-rv__agg'), v = S.el('span', 'sw-rv__avg'), all = S.el('a', 'sw-rv__all');
      v.textContent = String(avg).replace('.', ',');
      all.href = '#ratingTab';
      all.textContent = 'Všetky hodnotenia (' + cnt + ')';
      all.addEventListener('click', function (e) { e.preventDefault(); goTab('#ratingTab'); });
      agg.appendChild(v);
      agg.appendChild(stars(Math.round(avg)));
      agg.appendChild(all);
      hl.appendChild(agg);
    }
    head.appendChild(hl);

    var tr = S.el('div', 'sw-rv__tr');
    tr.setAttribute('role', 'list');
    list.forEach(function (x) { tr.appendChild(reviewCard(x)); });
    var nav = S.el('div', 'sw-rv__nav');
    var prev = S.el('button', 'sw-rv__btn', '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>');
    var next = S.el('button', 'sw-rv__btn', '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>');
    prev.type = next.type = 'button';
    prev.setAttribute('aria-label', 'Predchádzajúce recenzie');
    next.setAttribute('aria-label', 'Ďalšie recenzie');
    /* posun o celú viditeľnú šírku, zarovnaný na karty */
    function step() {
      var c = tr.children[0], gap = parseFloat(getComputedStyle(tr).columnGap) || 16;
      var w = c.offsetWidth + gap;
      return Math.max(1, Math.round(tr.clientWidth / w)) * w;
    }
    function state() {
      var max = tr.scrollWidth - tr.clientWidth;
      prev.disabled = tr.scrollLeft <= 4;
      next.disabled = tr.scrollLeft >= max - 4;
      nav.style.display = max > 4 ? '' : 'none';
    }
    prev.addEventListener('click', function () { tr.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { tr.scrollBy({ left: step(), behavior: 'smooth' }); });
    tr.addEventListener('scroll', state, { passive: true });
    window.addEventListener('resize', state);
    nav.appendChild(prev);
    nav.appendChild(next);
    head.appendChild(nav);

    box.appendChild(head);
    box.appendChild(tr);
    tabs.parentNode.insertBefore(box, tabs);
    state();
  }
  /* Pobo widget s tými istými recenziami v dlhom popise sa pri vlastnom paneli skryje.
     Volá sa pri každom init: cudzí skript ho plní neskôr a selektor drží len v #pobo-all-content. */
  /* Videá k produktu: riadky tabuľky s „Na web" = Produkt, ktorých stĺpec Produkt(y)
     menuje tento produkt (alebo jeho líniu, napr. Silwer Gold). Bez videí sa nekreslí nič. */
  function videos() {
    var tabs = document.querySelector('.p-detail-full-width');
    if (!tabs) return;
    var items = S.productVideos(location.pathname), old = document.querySelector('.sw-vd');
    var sig = items.map(function (it) { return it.id; }).join(',');
    var rv = document.querySelector('.sw-rv');
    if (old && old.getAttribute('data-sig') === sig) {
      /* recenzie sa môžu dokresliť neskôr, videá patria pod ne */
      if (rv && rv.nextElementSibling !== old) rv.parentNode.insertBefore(old, rv.nextSibling);
      return;
    }
    if (old) old.remove();
    if (!items.length) return;
    S.videoStyle();
    var box = S.el('section', 'sw-vd'), head = S.el('div', 'sw-rv__h');
    box.setAttribute('aria-label', 'Videá k produktu');
    box.setAttribute('data-sig', sig);
    var h = S.el('h2', 'sw-rv__t');
    h.textContent = 'Videá o produkte';
    head.appendChild(h);
    var tr = S.el('div', 'sw-vd__tr', S.videoCards(items));
    var nav = S.el('div', 'sw-rv__nav');
    var prev = S.el('button', 'sw-rv__btn', '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>');
    var next = S.el('button', 'sw-rv__btn', '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>');
    prev.type = next.type = 'button';
    prev.setAttribute('aria-label', 'Predchádzajúce videá');
    next.setAttribute('aria-label', 'Ďalšie videá');
    function step() {
      var c = tr.querySelector('.sw-ugc__c');
      var w = (c ? c.offsetWidth : 220) + 16;
      return Math.max(1, Math.floor(tr.clientWidth / w)) * w;
    }
    function state() {
      var max = tr.scrollWidth - tr.clientWidth;
      prev.disabled = tr.scrollLeft <= 4;
      next.disabled = tr.scrollLeft >= max - 4;
      nav.style.display = max > 4 ? '' : 'none';
    }
    prev.addEventListener('click', function () { tr.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { tr.scrollBy({ left: step(), behavior: 'smooth' }); });
    tr.addEventListener('scroll', state, { passive: true });
    window.addEventListener('resize', state);
    nav.appendChild(prev);
    nav.appendChild(next);
    head.appendChild(nav);
    box.appendChild(head);
    box.appendChild(tr);
    S.bindVideos(tr, items);
    /* hneď pod recenzie, bez nich nad dlhý popis */
    if (rv && rv.parentNode) rv.parentNode.insertBefore(box, rv.nextSibling);
    else tabs.parentNode.insertBefore(box, tabs);
    state();
  }
  document.addEventListener('sw:videos', videos);
  document.addEventListener('sw:data', videos);

  function reviewsDup() {
    if (!document.querySelector('.sw-rv')) return;
    [].slice.call(document.querySelectorAll('#pobo-all-content .widget-reviews-threerow')).forEach(function (w) {
      w.classList.add('sw-rv-dup');
    });
  }

  /* Doplnok jg-media (jgm-product-video-gallery) vkladá na niektoré produkty
     vlastnú galériu a Shoptetovu nechá pod ňou — fotky boli 2× (aj na webe
     bez redizajnu, napr. /magnezium-treonat/). Keď má doplnok viac slajdov,
     je v nej video a zostáva jeho galéria; inak zostáva Shoptetova, na ktorú
     je napojený redizajn (kruh, lupa, rám). Cudzí kód sa needituje, len skrýva. */
  function dupGallery() {
    var j = document.querySelector('.p-image-wrapper .jgm-product-video-gallery');
    var g = document.querySelector('.p-image-wrapper .gallery-new');
    if (!j || !g || j.getAttribute('data-sw-dup')) return;
    var n = function (e) { var l = e.querySelector('.splide__list'); return l ? l.children.length : 0; };
    if (!n(j) || !n(g)) return;   /* doplnok ešte nedokreslil, skúsi sa znova */
    j.setAttribute('data-sw-dup', '1');
    (n(j) > n(g) ? g : j).style.display = 'none';
  }

  /* Klient 20. 10.: z krátkeho úvodného textu preklik „Viac…" na dlhý text o produkte.
     Otvorí záložku Popis a zroluje k nej, ponad recenzie. */
  function moreLink() {
    /* za úvodný odsek, nie za krátke riadky typu „60 kapsúl" pod ním */
    var ps = [].slice.call(document.querySelectorAll('.p-short-description > p'));
    var p = ps.filter(function (x) { return x.textContent.trim().length > 80; }).pop() || ps.pop();
    var tab = document.querySelector('a[href="#description"]');
    if (!p || !tab || !document.getElementById('description') || p.querySelector('.sw-desc-more')) return;
    var a = S.el('a', 'sw-desc-more', 'Viac…');
    a.href = '#description';
    a.addEventListener('click', function (e) { e.preventDefault(); goTab('#description'); });
    p.appendChild(document.createTextNode(' '));
    p.appendChild(a);
  }

  function init() {
    dupGallery();
    header(); packs(); lines(); related(); reviews(); videos(); reviewsDup(); moreLink(); sync();
    var input = amountInput();
    if (input && !input.getAttribute('data-sw')) {
      input.setAttribute('data-sw', '1');
      ['input', 'change', 'keyup'].forEach(function (ev) { input.addEventListener(ev, sync); });
      var qb = input.closest('.quantity');
      if (qb) qb.addEventListener('click', function () { setTimeout(sync, 30); });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  document.addEventListener('ShoptetDOMPageContentLoaded', init);
  /* silwer-ux.js kreslí benefity a hodnotenie neskôr */
  [600, 1800].forEach(function (d) { setTimeout(init, d); });
})();

/* ============================================================================
   MODUL: KOŠÍK  (body.ordering-process)
   ----------------------------------------------------------------------------
   Podľa GA4 je tu najväčšia diera: z košíka do pokladne prejde 38,8 %,
   mesačne sa stráca 1 154 ľudí. Preto sústredená pokladničná hlavička bez
   vyhľadávania a menu, jasné kroky a zhrnutie bez rozptýlení.

   Poradie v pravom stĺpci sa mení: Shoptet dáva najprv „Potrebujete poradiť",
   potom zhrnutie. Návrh to má naopak — najprv zhrnutie s CTA, potom uistenia,
   až potom telefón.
   ========================================================================== */
(function () {
  'use strict';
  var S = window.SW; if (!S || !S.body('ordering-process')) return;

  S.addStyle('cart', [
    /* ---------- sústredená pokladničná hlavička ---------- */
    'body.ordering-process .sw-topbar,body.ordering-process .sw-nav,',
    'body.ordering-process #header .navigation-tools,',
    'body.ordering-process #header .header-bottom,',
    /* mobilný hamburger žije MIMO #header (div.navigation-buttons priamo
       v .overall-wrapper) — inak v pokladni visí sám nad krokmi */
    'body.ordering-process .navigation-buttons{display:none!important}',
    'body.ordering-process #header{border-bottom:1px solid var(--sw-line)}',
    'body.ordering-process #header .header-top-wrapper{display:flex!important;align-items:center;',
    'justify-content:space-between;gap:20px;padding:16px 20px;max-width:1240px;margin:0 auto}',
    '.sw-back{display:inline-flex;align-items:center;gap:9px;font-size:15px;font-weight:700;',
    'color:var(--sw-ink);text-decoration:none}',
    '.sw-back:hover{color:var(--sw-anthracite);text-decoration:none}',
    '@media(max-width:767px){.sw-back span{display:none}}',

    /* ---------- rámec stránky ----------
       Bootstrapov .container drží pevnú šírku 1170 px, takže medzi 1200 a 1400 px
       zostane po bokoch 15 px a obsah lepí na okraj. Na mobile je padding nulový
       úplne. Preto sa šírka prepíše na fluidnú a boky sa riešia paddingom. */
    'body.ordering-process #content-wrapper{width:100%!important;max-width:1290px!important;',
    'padding-left:clamp(20px,4vw,56px)!important;padding-right:clamp(20px,4vw,56px)!important;',
    'margin-left:auto!important;margin-right:auto!important}',
    'body.ordering-process #content{padding-left:0!important;padding-right:0!important}',
    /* doplnok so sticky hlavičkou drží na mobile .overall-wrapper{padding-top:130px}
       podľa PLNEJ hlavičky. V pokladni je hlavička nižšia (bez menu a nástrojov),
       takže by nad krokmi zostalo ~70 px prázdna. Výška sa dopĺňa z JS. */
    '@media(max-width:767px){body.ordering-process .overall-wrapper{',
    'padding-top:var(--sw-cart-hdr,62px)!important}}',
    'body.ordering-process .cart-inner{padding-top:0!important;',
    'padding-bottom:clamp(52px,6vw,92px)!important}',
    'body.ordering-process .row.cart-row{margin-left:-14px!important;margin-right:-14px!important}',
    'body.ordering-process .row.cart-row>[class*="col-"]{padding-left:14px!important;',
    'padding-right:14px!important}',
    'body.ordering-process .cart-summary{padding:0!important;margin:14px 0 0!important}',
    /* .extras-wrapper je flex s dvoma rovnakými stĺpcami: kupón a Shoptetova
       hláška o doprave zadarmo. Tú istú informáciu nesie naša lišta nad
       položkami, takže je vyprázdnená — ale prázdny stĺpec ďalej žral polovicu
       šírky a tlačidlo kupónu bolo na polovicu. */
    'body.ordering-process .extras-wrapper{display:block!important}',
    'body.ordering-process .extras-wrapper>.extras-col{width:100%!important;',
    'max-width:none!important;flex:none!important;padding:0!important}',
    'body.ordering-process .extras-wrapper>.extras-col:has(.extras-wrap:empty),',
    'body.ordering-process .extras-wrapper>.extras-col:not(:has(.sw-coupon)){display:none!important}',

    /* ---------- lepkavé zhrnutie ----------
       Čisté CSS position:sticky, žiadne dopočítavanie pozície na scroll evente.
       Podmienka je, aby bol pravý stĺpec vysoký ako ľavý — vo float mriežke
       Bootstrapu nie je, preto sa .cart-row na desktope prepne na flex.
       POZOR: .row má clearfix ::before/::after — v flexe by z nich boli
       plnohodnotné položky a zožrali by šírku stĺpcov. */
    '@media(min-width:992px){',
    'body.ordering-process .row.cart-row{display:flex!important;align-items:stretch;flex-wrap:nowrap}',
    'body.ordering-process .row.cart-row::before,body.ordering-process .row.cart-row::after{',
    'display:none!important}',
    'body.ordering-process .row.cart-row>.col-md-8{float:none;flex:0 0 66.6667%;max-width:66.6667%}',
    'body.ordering-process .row.cart-row>.col-md-4{float:none;flex:0 0 33.3333%;max-width:33.3333%;',
    'position:-webkit-sticky!important;position:sticky!important;align-self:flex-start;',
    'top:calc(var(--sw-cart-hdr,72px) + 24px);z-index:2}}',
    'body.ordering-process .cart-summary>h2,body.ordering-process .cart-summary>.h4{display:none!important}',

    /* ---------- nadpis ---------- */
    'body.ordering-process h1.sr-only{position:static!important;width:auto!important;',
    'height:auto!important;clip:auto!important;overflow:visible!important;white-space:normal!important;',
    'font-size:clamp(24px,2.6vw,32px);font-weight:700;letter-spacing:-.02em;color:var(--sw-ink);',
    'margin:0 0 6px}',
    /* prázdny košík nemá kroky — bez nich by nadpis lepil na hlavičku */
    'body.ordering-process #content>h1.sr-only:first-child{margin-top:clamp(28px,3.4vw,44px)}',

    /* ---------- kroky ako krúžky ----------
       JS ich presúva nad nadpis ako prvé dieťa #content, takže sedia cez celú
       šírku stránky a nie sú vtlačené do ľavého stĺpca. Spojnice medzi krokmi
       rastú (flex:1), takže lišta vyplní celú šírku bez ohľadu na dĺžku názvov. */
    'body.ordering-process #content>.cart-header{width:100%;max-width:none;',
    'margin:clamp(24px,3.2vw,38px) 0 clamp(26px,3vw,38px)!important;',
    'padding:0 0 clamp(20px,2.4vw,26px)!important;border-bottom:1px solid var(--sw-line)!important}',
    '.cart-header{display:flex!important;align-items:center;justify-content:center;gap:0;',
    'list-style:none;padding:0!important;margin:22px 0 30px!important;border:0!important}',
    '.cart-header .step{display:flex;align-items:center;gap:0;padding:0!important;flex:0 0 auto;',
    'font-size:15px;font-weight:700;color:var(--sw-muted);position:relative;white-space:nowrap}',
    /* téma si čísluje kroky cez strong::before { content: counter(steps) } —
       inak by boli čísla dvakrát, raz jej a raz naše v krúžku */
    '.cart-header .step::after,.cart-header .step::before{content:none!important}',
    '.cart-header .step>strong::before,.cart-header .step>a::before{content:none!important;display:none!important}',
    /* druhý a tretí krok rastú, spojnica v nich zožerie zvyšok šírky */
    '.cart-header .step+.step{margin-left:0;position:relative;flex:1 1 auto;min-width:0}',
    '.cart-header .step+.step::before{content:""!important;display:block!important;',
    'height:1px;background:var(--sw-line);margin:0 clamp(12px,2.2vw,30px);',
    'flex:1 1 auto;min-width:20px}',
    '.cart-header .step>strong,.cart-header .step>a{display:flex;align-items:center;gap:11px;',
    'color:inherit!important;text-decoration:none;font-weight:inherit;flex:0 0 auto}',
    '.cart-header .step .sw-step-n{width:34px;height:34px;border-radius:50%;flex:0 0 auto;',
    'display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:700;',
    'border:1px solid var(--sw-line);background:#fff;color:var(--sw-muted)}',
    '.cart-header .step .sw-step-t{white-space:nowrap}',
    /* aktívny krok označuje trieda .active, nie .step-1 — inak by bol
       v kroku 2 aj 3 zvýraznený stále prvý */
    '.cart-header .step.active{color:var(--sw-ink)}',
    /* aktuálny krok červenou (feedback 7. 10.: „kde sa nachádzam?") */
    '.cart-header .step.active .sw-step-n{background:var(--sw-red);border-color:var(--sw-red);color:#fff}',
    /* už prejdené kroky sú preklikateľné, nech je to vidieť */
    '.cart-header .step:has(a){color:var(--sw-text)}',
    '.cart-header .step:has(a) .sw-step-n{border-color:var(--sw-ink);color:var(--sw-ink)}',
    '.cart-header .step:has(a):hover{color:var(--sw-red)}',
    /* mobil: názov pod krúžok, nie vedľa neho — vedľa sa tri kroky na 375 px
       nikdy nezmestia a text pretekal mimo obrazovku */
    '@media(max-width:767px){',
    'body.ordering-process #content>.cart-header{margin:18px 0 24px!important;padding-bottom:18px!important}',
    '.cart-header .step{align-items:flex-start;white-space:normal;min-width:0}',
    '.cart-header .step>strong,.cart-header .step>a{flex-direction:column;align-items:center;',
    'gap:8px;min-width:0;max-width:100px}',
    '.cart-header .step .sw-step-n{width:30px;height:30px;font-size:14px}',
    '.cart-header .step .sw-step-t{font-size:11.5px;line-height:1.3;text-align:center;white-space:normal}',
    '.cart-header .step+.step::before{margin:15px 8px 0;min-width:10px}}',

    /* silwer-ux.js kreslí vlastnú lištu dopravy zadarmo (.s-goal).
       V zhrnutí by bola tá istá informácia druhýkrát. V popupe po pridaní
       do košíka mu zostáva — tam moja nie je. */
    'body.ordering-process .s-goal:not(.s-goal--popup){display:none!important}',

    /* ---------- lišta dopravy ---------- */
    '.sw-ship{border:1px solid var(--sw-line);border-radius:14px;padding:18px 20px;margin:0 0 20px;',
    'display:flex;align-items:center;gap:16px;background:#fff}',
    '.sw-ship i{font-size:22px;color:var(--sw-ink);flex:0 0 auto}',
    '.sw-ship__body{flex:1 1 auto;min-width:0}',
    '.sw-ship__t{font-size:15.5px;color:var(--sw-text);margin:0 0 10px}',
    '.sw-ship__t b{font-weight:700}',
    '.sw-ship__bar{height:7px;background:var(--sw-field);border-radius:4px;overflow:hidden}',
    '.sw-ship__fill{height:100%;width:0;background:var(--sw-ink);border-radius:4px;',
    'transition:width .9s cubic-bezier(.22,.9,.24,1),background .3s}',
    '@media(prefers-reduced-motion:reduce){.sw-ship__fill{transition:none}}',
    '.sw-ship--done .sw-ship__fill{background:var(--sw-green)}',
    '.sw-ship--done .sw-ship__t{color:var(--sw-green);font-weight:700}',

    /* ---------- položky ---------- */
    '.cart-table{border:0;width:100%}',
    /* Shoptet dáva formulár na odstránenie DOVNÚTRA bunky s názvom a robí ho
       position:absolute. Bez vlastného kotviaceho bodu sa na mobile položí
       priamo na názov produktu. Preto je riadok position:relative a krížik
       je pripnutý napevno, mimo mriežky. */
    '.cart-table tr.removeable{position:relative;border:1px solid var(--sw-line);border-radius:14px;',
    'display:grid;grid-template-columns:96px minmax(0,1fr) auto auto auto;gap:18px;',
    'align-items:center;padding:16px 56px 16px 16px;margin-bottom:12px;background:#fff}',
    '.cart-table .delete-cart-item{position:absolute!important;top:50%!important;right:12px!important;',
    'left:auto!important;bottom:auto!important;transform:translateY(-50%);margin:0!important}',
    /* téma dáva bunkám pevné šírky a p-name robí position:relative — v grid
       rozložení z toho boli 50 px široké stĺpce a krížik ukotvený na názve */
    '.cart-table tr.removeable>td{border:0!important;padding:0!important;vertical-align:middle;',
    'width:auto!important;max-width:none!important;min-width:0!important;position:static!important}',
    '.cart-table .cart-p-image img{width:84px;height:84px;object-fit:contain;border-radius:10px;',
    'background:var(--sw-field);padding:6px;box-sizing:border-box}',
    '.cart-table .p-name a{font-size:17px;font-weight:700;color:var(--sw-ink);text-decoration:none;display:block}',
    '.cart-table .p-name a:hover{color:var(--sw-anthracite)}',
    /* „Dostupnosť" popisok preč, zostane len zelený stav so značkou */
    '.cart-table .p-name .p-label{display:none!important}',
    '.cart-table .availability-label{display:inline-flex;align-items:center;gap:7px;margin-top:7px;',
    'font-size:13.5px;font-weight:700;color:var(--sw-green)!important}',
    '.cart-table .availability-label::before{content:"";width:7px;height:7px;border-radius:50%;',
    'background:currentColor;flex:0 0 auto}',
    '.cart-table .p-quantity .p-label,.cart-table .p-price .p-label,.cart-table .p-total .p-label{',
    'display:none!important}',
    '.cart-table .p-price{text-align:right;white-space:nowrap;font-size:13.5px;color:var(--sw-muted)}',
    '.cart-table .p-price .price-final{font-size:13.5px!important;font-weight:600!important;color:var(--sw-muted)!important}',
    '.cart-table .p-total{text-align:right;white-space:nowrap}',
    '.cart-table .sw-cu__o{margin-right:6px;font-weight:400;color:var(--sw-muted);opacity:.8}',
    '.cart-table .p-discount .acronym,.cart-table .p-discount span{border:0!important;text-decoration:none!important;cursor:default}',
    '.cart-table .p-total .price-final{font-size:20px!important;font-weight:700!important;color:var(--sw-ink)!important}',
    '.cart-table .remove-item{opacity:.4;transition:opacity .15s}',
    '.cart-table .remove-item:hover{opacity:1}',
    '@media(max-width:900px){.cart-table tr.removeable{grid-template-columns:76px minmax(0,1fr) auto auto}',
    '.cart-table .p-price{display:none}.cart-table .cart-p-image img{width:66px;height:66px}}',
    '@media(max-width:600px){.cart-table tr.removeable{grid-template-columns:62px minmax(0,1fr);',
    'grid-template-areas:"img name" "qty total";gap:14px;padding:14px 42px 14px 14px}',
    '.cart-table .cart-p-image{grid-area:img;align-self:start}',
    '.cart-table .p-name{grid-area:name;align-self:center}',
    '.cart-table .p-quantity{grid-area:qty;justify-self:start}',
    '.cart-table .p-total{grid-area:total;justify-self:end;align-self:center}',
    '.cart-table .p-name a{font-size:15.5px}',
    '.cart-table .cart-p-image img{width:56px;height:56px}',
    '.cart-table .delete-cart-item{top:12px!important;right:8px!important;transform:none}}',

    /* ---------- zľavový kód ---------- */
    '.cart-summary h2,.cart-summary .h4{font-size:0!important;margin:0!important}',
    /* Klient hlási, že ľudia zľavový kód nevedia nájsť už dnes. Podčiarknutý
       odkaz to zhoršoval. Je to tlačidlo cez celú šírku, s prerušovaným rámom
       ako kupón, aby bolo jasné, že sa dá kliknúť. */
    '.sw-coupon{margin:18px 0 0}',
    '.sw-coupon__t{display:flex;align-items:center;gap:11px;width:100%;',
    'background:#fff;border:1.5px dashed var(--sw-line);border-radius:12px;padding:15px 18px;',
    'font-family:inherit;font-size:15.5px;font-weight:700;color:var(--sw-ink);cursor:pointer;',
    'text-align:left;transition:border-color .15s,background .15s}',
    '.sw-coupon__t:hover{border-color:var(--sw-black);background:var(--sw-field);color:var(--sw-black)}',
    '.sw-coupon.is-open .sw-coupon__t{border-style:solid;border-color:var(--sw-ink);',
    'border-bottom-left-radius:0;border-bottom-right-radius:0}',
    '.sw-coupon__ic{width:34px;height:34px;border-radius:9px;background:var(--sw-field);flex:0 0 auto;',
    'display:flex;align-items:center;justify-content:center;font-size:16px;color:var(--sw-ink)}',
    /* téma dáva .icon-discount 40 px a šírku 48 px (ikona pri poli kupónu),
       v 34 px štvorci pretiekla a orezala sa */
    '.sw-coupon__ic i{font-size:17px!important;width:auto!important;height:auto!important;line-height:1!important;',
    'color:var(--sw-ink)!important;margin:0!important}',
    '.sw-coupon__ic i::before{font-size:17px!important}',
    '.sw-coupon__chev{margin-left:auto;transition:transform .2s;opacity:.55;flex:0 0 auto}',
    '.sw-coupon.is-open .sw-coupon__chev{transform:rotate(180deg)}',
    '.sw-coupon .discount-coupon{display:none;border:1.5px solid var(--sw-ink);border-top:0;',
    'border-radius:0 0 12px 12px;padding:16px 18px;background:#fff}',
    '.sw-coupon.is-open .discount-coupon{display:block}',
    /* Shoptetov formulár kupónu je inline a na úzkom stĺpci sa lámal */
    '.sw-coupon .discount-coupon form{display:flex;gap:10px;flex-wrap:wrap;margin:0;align-items:center}',
    /* Shoptet dáva do formulára tú istú ikonu, akú má už tlačidlo nad ním */
    '.sw-coupon .discount-coupon form>.icon-discount{display:none}',
    '.sw-coupon .discount-coupon input[type="text"]{flex:1 1 140px;min-width:0;height:46px;',
    'border:1px solid var(--sw-line);border-radius:9px;padding:0 14px;font-size:15px}',
    '.sw-coupon .discount-coupon .btn,.sw-coupon .discount-coupon button{flex:0 0 auto;height:46px;',
    'border-radius:9px!important;padding:0 20px!important;font-weight:700!important;',
    'background:var(--sw-ink)!important;color:#fff!important;border:0!important}',
    '.sw-coupon .discount-coupon .btn:hover,.sw-coupon .discount-coupon button:hover{',
    'background:var(--sw-anthracite)!important}',

    /* ---------- pravý stĺpec ---------- */
    '.sidebar-in-cart{display:flex;flex-direction:column;gap:16px}',
    '.summary-wrapper{order:1}',
    '.sw-assurebox{order:2}',
    '.sw-phone{order:4}',
    '.checkout-box-wrapper{order:3}',
    /* .summary-wrapper má od témy vlastné šedé pozadie a padding — spolu
       s našou bielou kartou vnútri z toho bola karta v karte. Kartou je
       wrapper, .box je len obal obsahu. */
    'body.ordering-process .summary-wrapper{background:#fff!important;',
    'border:1px solid var(--sw-line)!important;border-radius:14px!important;',
    'padding:22px!important;margin:0!important}',
    'body.ordering-process .summary-wrapper .box{border:0!important;background:none!important;',
    'padding:0!important;margin:0!important;box-shadow:none!important;border-radius:0!important}',
    '.summary-wrapper h2,.summary-wrapper .h4{font-size:13px!important;font-weight:700!important;',
    'letter-spacing:.12em;text-transform:uppercase;color:var(--sw-ink)!important;margin:0 0 16px!important}',
    '.summary-wrapper .price-wrapper{display:grid;grid-template-columns:1fr auto;gap:6px 12px;',
    'align-items:baseline;padding-bottom:16px;border-bottom:1px solid var(--sw-line);margin-bottom:16px}',
    '.summary-wrapper .price-label{font-size:15px;color:var(--sw-text)}',
    '.summary-wrapper .price-label.price-secondary{font-size:13px;color:var(--sw-muted)}',
    '.summary-wrapper .price.price-primary{font-size:30px!important;font-weight:700!important;',
    'color:var(--sw-ink)!important;text-align:right}',
    '.summary-wrapper .price.price-secondary{font-size:13px!important;color:var(--sw-muted)!important;text-align:right}',
    /* ---------- tlačidlá v celom objednávkovom procese ----------
       POZOR: hlavné tlačidlo má v každom kroku INÉ id — v košíku
       #continue-order-button, v kroku 2 a 3 #orderFormButton. Cieliť cez
       :not(#continue-order-button) zhodilo pozadie hlavnému tlačidlu v ďalších
       krokoch a zostal z neho podčiarknutý text. Preto sa cieli podľa funkcie. */
    '.next-step{display:flex!important;flex-direction:column;gap:14px;margin:0!important;',
    'align-items:stretch}',

    'body.ordering-process #continue-order-button,',
    'body.ordering-process #orderFormButton,',
    'body.ordering-process .next-step .btn-conversion,',
    'body.ordering-process .next-step button[type="submit"],',
    'body.ordering-process .next-step input[type="submit"]{',
    'order:1;background:var(--sw-red)!important;border:0!important;border-radius:10px!important;',
    'min-height:58px!important;height:auto!important;padding:16px 26px!important;',
    'font-size:17px!important;font-weight:700!important;color:#fff!important;width:100%!important;',
    'display:flex!important;align-items:center;justify-content:center;gap:10px;',
    'text-decoration:none!important;text-transform:none!important;line-height:1.25!important;',
    'box-shadow:0 10px 26px -14px rgba(212,0,0,.6)}',
    'body.ordering-process #continue-order-button:hover,',
    'body.ordering-process #orderFormButton:hover,',
    'body.ordering-process .next-step .btn-conversion:hover{background:var(--sw-red-deep)!important;color:#fff!important}',

    /* späť: čitateľný sekundárny gombík, nie neviditeľný text */
    'body.ordering-process .next-step .next-step-back,',
    'body.ordering-process .next-step a.btn:not(.btn-conversion){',
    'order:2;background:#fff!important;border:1px solid var(--sw-line)!important;',
    'border-radius:10px!important;min-height:48px!important;padding:12px 22px!important;',
    'font-size:15px!important;font-weight:700!important;color:var(--sw-text)!important;',
    'width:100%!important;display:flex!important;align-items:center;justify-content:center;',
    'text-decoration:none!important;text-transform:none!important}',
    'body.ordering-process .next-step .next-step-back:hover,',
    'body.ordering-process .next-step a.btn:not(.btn-conversion):hover{',
    'background:var(--sw-field)!important;color:var(--sw-ink)!important;text-decoration:none!important}',

    /* v košíku je „Späť do obchodu" len doplnková cesta, nech nekonkuruje CTA */
    'body.in-kosik .next-step .btn:not(#continue-order-button){border:0!important;',
    'background:none!important;min-height:0!important;padding:0!important;',
    'color:var(--sw-muted)!important;font-size:14px!important;font-weight:600!important;',
    'text-decoration:underline!important;text-underline-offset:3px}',
    'body.in-kosik .next-step .btn:not(#continue-order-button):hover{color:var(--sw-ink)!important;background:none!important}',

    /* ---------- karta uistení ---------- */
    '.sw-assurebox{background:var(--sw-field);border-radius:14px;padding:20px 22px}',
    '.sw-assurebox ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:13px}',
    '.sw-assurebox li{display:flex;gap:11px;align-items:flex-start;font-size:14px;line-height:1.5;color:var(--sw-text)}',
    '.sw-assurebox i{color:var(--sw-muted);font-size:15px;margin-top:1px;flex:0 0 auto}',
    '.sw-assurebox b{font-weight:700}',

    /* ---------- telefón: vlastná čierna karta ----------
       Shoptetov .contact-box má vlastné rozloženie, ktoré sa v úzkom stĺpci
       zlomí do stĺpca a číslo sa oreže. Namiesto boja s ním sa skryje
       a postaví sa vlastná karta s rovnakým odkazom. */
    '.checkout-box-wrapper{display:none!important}',
    '.sw-phone{order:3;background:var(--sw-ink);border-radius:14px;padding:20px;',
    'display:flex;align-items:center;gap:16px}',
    '.sw-phone__ic{width:48px;height:48px;border-radius:12px;background:var(--sw-red);flex:0 0 auto;',
    'display:flex;align-items:center;justify-content:center;font-size:21px;color:#fff}',
    '.sw-phone__b{display:block;flex:1 1 auto;min-width:0}',
    '.sw-phone__t{display:block;font-size:13.5px;line-height:1.45;color:var(--sw-dim);margin:0 0 7px}',
    '.sw-phone__n{font-size:19px;font-weight:700;color:#fff;text-decoration:none;white-space:nowrap}',
    '.sw-phone__n:hover{color:#fff;text-decoration:underline}',
    '.sw-phone__h{display:block;margin-top:3px;font-size:13.5px;color:var(--sw-dim)}',

    /* ======== KROK 2 a 3: Doprava a platba, Informácie o vás ========
       Jaro na calle 16. 9.: „skús to preštylovať". Mení sa LEN vzhľad.
       Radio prepínače, ich poradie, ceny, kombinácie aj odoslanie formulára
       zostávajú Shoptetu. Klikateľná plocha je Shoptetov <label>. */
    'body.ordering-process .co-box{background:none!important;border:0!important;box-shadow:none!important;',
    'padding:0!important;margin:0 0 34px!important}',
    'body.ordering-process h2.order-icon{display:flex!important;align-items:center;gap:0;font-size:20px!important;',
    'font-weight:700!important;color:var(--sw-ink)!important;margin:0 0 14px!important;padding:0!important;',
    'text-transform:none!important;letter-spacing:-.01em}',
    'body.ordering-process h2.order-icon>i{display:none!important}',
    'body.ordering-process .shipping-billing-table{display:flex!important;flex-direction:column;gap:10px;',
    'border:0!important;background:none!important;padding:0!important}',
    'body.ordering-process .shipping-billing-table .radio-wrapper{position:relative;border:1.5px solid var(--sw-line)!important;',
    'border-radius:14px!important;background:#fff!important;margin:0!important;padding:0!important;',
    'transition:border-color .15s,background .15s;box-shadow:none!important}',
    'body.ordering-process .shipping-billing-table .radio-wrapper:hover{border-color:#BDBAB2!important}',
    'body.ordering-process .shipping-billing-table .radio-wrapper.active{border:2px solid var(--sw-ink)!important;',
    'background:var(--sw-field)!important}',
    'body.ordering-process .shipping-billing-table .radio-wrapper.inactive-child{opacity:.55}',
    'body.ordering-process .shipping-billing-table .radio-wrapper>label{display:flex!important;align-items:center;',
    'gap:16px;min-height:72px;padding:16px 22px 16px 58px!important;margin:0!important;cursor:pointer;width:100%;',
    'box-sizing:border-box;background:none!important;border:0!important}',
    'body.ordering-process .shipping-billing-table .radio-wrapper.active>label{padding:15px 21px 15px 57px!important}',
    'body.ordering-process .shipping-billing-table .radio-wrapper>input[type="radio"]{position:absolute!important;',
    'left:22px!important;top:50%!important;transform:translateY(-50%);margin:0!important;z-index:2}',
    'body.ordering-process .shipping-billing-table .payment-info{flex:1 1 auto;min-width:0;display:block;width:auto!important;max-width:none!important;',
    'font-size:14px;color:var(--sw-muted);line-height:1.45}',
    'body.ordering-process .shipping-billing-table .payment-info>.sublabel{display:block!important;margin-top:3px}',
    /* hláška o nemožnej kombinácii len pri neaktívnej možnosti (Shoptet dáva labelu .inactive) */
    'body.ordering-process .shipping-billing-table label:not(.inactive) .not-possible-info{display:none!important}',
    'body.ordering-process .shipping-billing-table label.inactive .not-possible-info{display:block!important;margin-top:3px}',
    /* ikony namiesto log dopravcov a platieb (návrh 15. 9.) */
    'body.ordering-process .shipping-billing-table .payment-logo{display:none!important}',
    '.sw-opt-ic{flex:0 0 auto;width:44px;height:44px;border-radius:10px;background:var(--sw-field);display:flex;',
    'align-items:center;justify-content:center;color:var(--sw-ink)}',
    '.radio-wrapper.active .sw-opt-ic{background:#fff}',
    '.sw-opt-ic svg{width:21px;height:21px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}',
    /* radio kreslí téma cez ::before (krúžok) a ::after (bodka) na labeli */
    'body.ordering-process .shipping-billing-table .radio-wrapper>label::before{left:20px!important;top:50%!important;',
    'margin-top:-11px!important;width:22px!important;height:22px!important;box-sizing:border-box}',
    /* bodku zväčšovať len pri vybranej možnosti — inak ju téma drží skrytú nulovou veľkosťou */
    'body.ordering-process .shipping-billing-table .radio-wrapper>label::after{top:50%!important;left:28px!important;margin-top:-3px!important}',
    'body.ordering-process .shipping-billing-table .radio-wrapper.active>label::before{left:19px!important}',
    'body.ordering-process .shipping-billing-table .radio-wrapper.active>label::after{left:25px!important;',
    'margin-top:-5px!important;width:10px!important;height:10px!important}',
    'body.ordering-process .shipping-billing-table .radio-wrapper:not(.active)>label::after{opacity:0!important}',
    'body.ordering-process .shipping-billing-table .payment-shipping-price.sw-free,',
    'body.ordering-process #summary-box .sw-free{color:var(--sw-green)!important}',
    'body.ordering-process .shipping-billing-table .payment-info>b,',
    'body.ordering-process .shipping-billing-table .payment-info>span:has(.question-tooltip){display:inline-block;margin:0 6px 0 0;vertical-align:middle}',
    'body.ordering-process .sw-free{color:var(--sw-green)!important;text-transform:none!important}',
    /* pravý stĺpec ako jedna karta: zhrnutie, tlačidlo, uistenia v päte.
       Nič sa nepresúva v DOM — Shoptet zhrnutie po zmene dopravy prekresľuje. */
    'body.ordering-process #checkoutSidebar>.cart-content{background:#fff!important;padding:0!important;',
    'border:1px solid var(--sw-line)!important;border-radius:14px!important;box-shadow:none!important;overflow:hidden}',
    'body.ordering-process #checkoutSidebar .checkout-box{display:none!important}',
    'body.ordering-process #checkoutSidebar .next-step{padding:0 22px 22px!important;margin:0!important}',
    'body.ordering-process #checkoutSidebar .next-step .next-step-back{border:0!important;background:none!important;',
    'min-height:0!important;padding:4px 0!important;color:var(--sw-ink)!important;font-size:15px!important;',
    'font-weight:700!important;text-decoration:underline!important;text-underline-offset:4px}',
    'body.ordering-process #checkoutSidebar .sw-assurebox{margin:0!important;border-radius:0!important;',
    'border-top:1px solid var(--sw-line)}',
    'body.ordering-process #checkoutSidebar .sw-assurebox i{color:var(--sw-green)}',
    'body.ordering-process .order-button-text{text-transform:none!important}',
    'body.ordering-process .sw-assurebox a{white-space:nowrap;color:var(--sw-ink);font-weight:700}',
    'body.ordering-process .shipping-billing-table .shipping-billing-name{font-size:16px!important;',
    'font-weight:700!important;color:var(--sw-ink)!important}',
    'body.ordering-process .shipping-billing-table .radio-wrapper.active .shipping-billing-name{color:var(--sw-ink)!important}',
    'body.ordering-process .shipping-billing-table .payment-logo{flex:0 0 auto;display:flex;align-items:center}',
    'body.ordering-process .shipping-billing-table .payment-logo img{max-height:28px!important;max-width:84px!important;width:auto!important}',
    'body.ordering-process .shipping-billing-table .payment-shipping-price{flex:0 0 auto;min-width:74px;text-align:right;',
    'font-size:16px!important;font-weight:700!important;color:var(--sw-ink)!important}',
    'body.ordering-process .shipping-billing-table .not-possible-info{font-size:13px;font-style:normal;color:var(--sw-muted)}',
    'body.ordering-process .shipping-billing-table a,body.ordering-process .shipping-billing-table .zasilkovna-choose,',
    'body.ordering-process .shipping-billing-table [class*="choose"]{color:var(--sw-green)!important;font-weight:700}',
    'body.ordering-process .question-tooltip{width:18px!important;height:18px!important;line-height:18px!important;',
    'font-size:11px!important;background:var(--sw-field)!important;color:var(--sw-muted)!important;border:0!important}',

    /* zhrnutie v pravom stĺpci */
    'body.ordering-process #checkoutSidebar .order-summary{display:flex!important;flex-direction:column;gap:16px;',
    'width:100%!important;max-width:none!important;padding:0!important;background:none!important;border:0!important}',
    'body.ordering-process #checkoutSidebar .checkout-box{order:3;margin:0!important}',
    'body.ordering-process #checkoutSidebar .toggle-contacts{background:none!important;border:0!important;',
    'color:var(--sw-muted)!important;font-size:14px!important;font-weight:700!important;text-transform:none!important;',
    'box-shadow:none!important;text-decoration:underline;text-underline-offset:3px;padding:6px 0!important;min-height:0!important}',
    'body.ordering-process #summary-box{order:1;background:#fff!important;border:0!important;',
    'border-radius:0!important;padding:22px 22px 18px!important;margin:0!important;box-shadow:none!important}',
    'body.ordering-process #summary-box>h2,body.ordering-process #summary-box>.h4{font-size:13px!important;',
    'font-weight:700!important;letter-spacing:.12em;text-transform:uppercase;color:var(--sw-ink)!important;margin:0 0 14px!important}',
    'body.ordering-process #summary-box .cart-items{border-bottom:1px solid var(--sw-line);padding-bottom:12px;margin-bottom:12px}',
    'body.ordering-process #summary-box .cart-item{display:grid!important;grid-template-columns:minmax(0,1fr) auto auto;',
    'gap:12px;align-items:baseline;padding:7px 0!important;border:0!important}',
    'body.ordering-process #summary-box .cart-item>div{border:0!important;padding:0!important;width:auto!important}',
    'body.ordering-process #summary-box .cart-item-name a{font-size:15px;font-weight:700;color:var(--sw-ink)!important;',
    'text-decoration:none!important}',
    'body.ordering-process #summary-box .cart-item-amount{font-size:13.5px;color:var(--sw-muted)}',
    'body.ordering-process #summary-box .cart-item-price{font-size:15px;font-weight:700;color:var(--sw-ink);text-align:right}',
    'body.ordering-process #summary-box .order-summary-item.helper,',
    'body.ordering-process #summary-box .recapitulation-single{display:flex!important;justify-content:space-between;',
    'gap:12px;font-size:14.5px;color:var(--sw-text);padding:5px 0!important;border:0!important}',
    'body.ordering-process #summary-box .order-summary-item.helper strong{font-weight:500}',
    'body.ordering-process #summary-box .order-summary-item.helper>div{width:auto!important;flex:0 0 auto;float:none!important;padding:0!important}',
    'body.ordering-process #summary-box .recapitulation-shipping-billing-info{font-weight:500!important;',
    'display:flex!important;justify-content:space-between;width:100%;gap:12px}',
    'body.ordering-process #summary-box .recapitulation-shipping-billing-info>span{order:2;font-weight:700;color:var(--sw-ink)}',
    'body.ordering-process #summary-box .order-summary-item.price{background:var(--sw-field);border-radius:12px;',
    'padding:16px!important;margin:12px 0 0!important;border:0!important}',
    'body.ordering-process #summary-box .price-wrapper{display:grid!important;grid-template-columns:1fr auto;',
    'gap:4px 12px;align-items:baseline}',
    'body.ordering-process #summary-box .price-label.price-primary{font-size:16px;font-weight:700;color:var(--sw-ink)}',
    'body.ordering-process #summary-box .price.price-primary{font-size:28px!important;font-weight:700!important;color:var(--sw-ink)!important;text-align:right}',
    'body.ordering-process #summary-box .price-secondary{font-size:12.5px!important;color:var(--sw-muted)!important;text-align:right;font-weight:500!important}',

    /* ---------- formulár s údajmi (krok 3) podľa návrhu ----------
       Polia sú Shoptetu (Meno a priezvisko je jedno pole, ulica a číslo domu
       dve) a nemenia sa. Mení sa len rozloženie: popisok nad poľom, polia
       vedľa seba po dvoch. */
    'body.in-krok-2 #order-form fieldset.co-box,body.in-krok-2 #order-form .co-box>fieldset{display:grid!important;',
    'grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:4px 16px;align-items:start;min-width:0}',
    'body.in-krok-2 #order-form fieldset>*{grid-column:1/-1}',
    'body.in-krok-2 #order-form fieldset>.form-group:has(#email),body.in-krok-2 #order-form fieldset>.form-group:has(#phone),',
    'body.in-krok-2 #order-form fieldset>.form-group:has(#billStreet),body.in-krok-2 #order-form fieldset>.form-group:has(#billHouseNumber),',
    'body.in-krok-2 #order-form fieldset>.form-group:has(#billCity),body.in-krok-2 #order-form fieldset>.form-group:has(#billZip),',
    'body.in-krok-2 #order-form fieldset>.form-group:has(#deliveryStreet),body.in-krok-2 #order-form fieldset>.form-group:has(#deliveryHouseNumber),',
    'body.in-krok-2 #order-form fieldset>.form-group:has(#deliveryCity),body.in-krok-2 #order-form fieldset>.form-group:has(#deliveryZip),',
    'body.in-krok-2 #order-form fieldset>.form-group:has(#companyId),body.in-krok-2 #order-form fieldset>.form-group:has(#vatId){grid-column:auto}',
    /* POZOR: v kroku 3 je aj pravý stĺpec VNÚTRI #order-form, preto #checkoutContent */
    'body.in-krok-2 #checkoutContent h2{display:flex!important;align-items:center;font-size:20px!important;font-weight:700!important;',
    'color:var(--sw-ink)!important;margin:6px 0 12px!important;padding:0!important;text-transform:none!important;letter-spacing:-.01em!important}',
    'body.in-krok-2 #checkoutContent h2>i{display:none!important}',
    'body.in-krok-2 #order-form .form-group--inline,body.in-krok-2 #order-form .smart-label-wrapper{display:block!important;margin:0 0 12px!important}',
    'body.in-krok-2 #order-form .form-group--inline>label,body.in-krok-2 #order-form .form-group--inline>.label,',
    'body.in-krok-2 #order-form .smart-label-wrapper>label{display:block!important;width:auto!important;float:none!important;',
    'text-align:left!important;margin:0 0 7px!important;padding:0!important;font-size:14.5px!important;font-weight:700!important;',
    'color:var(--sw-ink)!important;position:static!important;transform:none!important}',
    'body.in-krok-2 #order-form .form-control-wrapper{width:100%!important;max-width:none!important;margin:0!important;float:none!important}',
    'body.in-krok-2 #order-form .form-control{width:100%!important;max-width:none!important;height:56px!important}',
    'body.in-krok-2 #order-form .phone-combined-input{display:flex!important;width:100%!important}',
    'body.in-krok-2 #order-form .phone-combined-input .form-control{flex:1 1 auto;width:auto!important}',
    'body.in-krok-2 #order-form .form-legend{font-size:13px;color:var(--sw-muted);margin:0 0 8px!important}',
    'body.in-krok-2 #order-form .login-from-cart{background:#fff!important;color:var(--sw-ink)!important;',
    'border:1.5px solid var(--sw-line)!important;border-radius:10px!important;font-weight:700!important;',
    'text-transform:none!important;box-shadow:none!important;height:auto!important;padding:11px 18px!important}',
    'body.in-krok-2 #order-form .login-from-cart:hover{border-color:var(--sw-ink)!important}',
    'body.in-krok-2 #order-form .co-box{margin:0 0 20px!important;padding:0 0 18px!important;border-bottom:1px solid var(--sw-line)!important}',
    'body.in-krok-2 #order-form .co-box-additional{border:0!important}',
    'body.in-krok-2 #order-form label.whole-width{font-size:15.5px!important;font-weight:700!important;color:var(--sw-ink)!important}',
    /* pravý stĺpec kroku 3: súhlasy a tlačidlo vnútri karty */
    'body.in-krok-2 #checkoutSidebar .consents{padding:0 22px!important;margin:0 0 10px!important}',
    'body.in-krok-2 #checkoutSidebar .consents,body.in-krok-2 #checkoutSidebar .consents label,',
    'body.in-krok-2 #checkoutSidebar .consents .label{font-size:13px!important;line-height:1.5!important;color:var(--sw-muted)!important}',
    'body.in-krok-2 #checkoutSidebar .consents a{color:var(--sw-ink)!important;font-weight:700;text-decoration:underline}',
    'body.in-krok-2 #submit-order{display:block!important;text-align:center;line-height:1.3!important}',
    'body.in-krok-2 #submit-order .order-button-text{display:inline!important;font-size:17px!important;text-transform:none!important}',
    'body.in-krok-2 #submit-order .order-button-suffix{font-size:17px!important;font-weight:700!important;text-transform:none!important;',
    'display:inline!important;color:#fff!important;margin-left:5px}',
    '@media(max-width:600px){body.in-krok-2 #order-form fieldset>.form-group{grid-column:1/-1!important}}',

    /* formulár s údajmi (krok 3) */
    'body.ordering-process #order-form .form-control,body.ordering-process #order-form select{height:50px!important;',
    'border:1.5px solid var(--sw-line)!important;border-radius:10px!important;font-size:16px!important;',
    'box-shadow:none!important;background:#fff!important}',
    'body.ordering-process #order-form textarea.form-control{height:auto!important;min-height:96px}',
    'body.ordering-process #order-form .form-control:focus{border-color:var(--sw-ink)!important}',
    'body.ordering-process #order-form label{font-size:14px;font-weight:700;color:var(--sw-text)}',
    '@media(max-width:600px){body.ordering-process .shipping-billing-table .radio-wrapper>label{',
    'display:grid!important;grid-template-columns:38px minmax(0,1fr) auto;gap:12px;align-items:center;',
    'padding:14px 14px 14px 50px!important;min-height:64px}',
    'body.ordering-process .shipping-billing-table .radio-wrapper.active>label{padding:13px 13px 13px 49px!important}',
    'body.ordering-process .shipping-billing-table .radio-wrapper>label::before{left:14px!important}',
    'body.ordering-process .shipping-billing-table .radio-wrapper.active>label::before{left:13px!important}',
    'body.ordering-process .shipping-billing-table .radio-wrapper.active>label::after{left:19px!important}',
    'body.ordering-process .shipping-billing-table .radio-wrapper:not(.active)>label::after{left:22px!important}',
    '.sw-opt-ic{width:38px;height:38px}.sw-opt-ic svg{width:18px;height:18px}',
    'body.ordering-process .shipping-billing-table .shipping-billing-name{font-size:15px!important}',
    'body.ordering-process .shipping-billing-table .payment-shipping-price{min-width:0;font-size:15px!important}}',

    /* ---------- hotový krok: fajka namiesto čísla (návrh 15. 9.) ---------- */
    '.cart-header .step.sw-step-done .sw-step-n{border-color:var(--sw-green)!important;color:var(--sw-green)!important;background:#fff}',
    '.cart-header .step.sw-step-done .sw-step-n svg{width:15px;height:15px}',

    /* ---------- balenie a cena za deň pri položke ---------- */
    '.sw-ci{display:block;font-size:13.5px;line-height:1.45;color:var(--sw-muted);margin-top:4px}',
    '.sw-ci b{font-weight:700;color:var(--sw-text)}',

    /* ---------- upsell „Pridajte si k objednávke ešte" ----------
       Nie je to doplnok Upsell (ten v admine zapnutý nie je). Sú to produkty,
       ktoré Silwer sám priradil ako Súvisiaci tovar k položkám v košíku.
       Shoptet ich ukazoval schované pod odkazom „Súvisiaci tovar: 3". */
    'body.ordering-process .cart-table tr.related,body.ordering-process .cart-table .show-related{display:none!important}',
    '.sw-up{margin:28px 0 0}',
    '.sw-up__h{margin:0 0 14px}',
    '.sw-up__t{font-size:20px;font-weight:700;color:var(--sw-ink);margin:0 0 4px}',
    '.sw-up__s{font-size:14.5px;color:var(--sw-muted);margin:0}',
    '.sw-up__g{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}',
    '.sw-up__r{display:flex;flex-direction:column;border:1px solid var(--sw-line);border-radius:14px;background:#fff;',
    'overflow:hidden;min-width:0}',
    '.sw-up__img{display:flex;align-items:center;justify-content:center;aspect-ratio:1;background:linear-gradient(180deg,#FAFAF8 0%,#F3F2EE 100%);',
    'border-bottom:1px solid var(--sw-line)}',
    '.sw-up__img img{width:78%;height:78%;object-fit:contain;mix-blend-mode:darken}',
    '.sw-up__n{font-size:14.5px;font-weight:700;line-height:1.3;color:var(--sw-ink)!important;text-decoration:none!important;',
    'display:block;padding:12px 12px 4px;flex:1 1 auto}',
    '.sw-up__n:hover{color:var(--sw-anthracite)!important}',
    '.sw-up__p{font-size:16px;font-weight:700;color:var(--sw-ink);white-space:nowrap;padding:0 12px 8px}',
    '.sw-up__free{display:block;font-size:12.5px;font-weight:700;color:var(--sw-green);padding:0 12px 8px;margin-top:-4px}',
    '.sw-up__r form{margin:0;padding:0 12px 12px}',
    /* menej červenej: obrysové tlačidlo ako na kartách */
    '.sw-up__r .btn{width:100%!important;background:#fff!important;color:var(--sw-red)!important;border:1.5px solid var(--sw-red)!important;',
    'border-radius:999px!important;font-weight:700!important;font-size:12.5px!important;letter-spacing:.03em;text-transform:uppercase!important;',
    'min-height:38px;padding:0 10px!important;box-shadow:none!important}',
    '.sw-up__r .btn:hover{background:var(--sw-red)!important;color:#fff!important}',
    '@media(max-width:991px){.sw-up__g{grid-template-columns:repeat(2,minmax(0,1fr))}}',
    /* kupón v pravom stĺpci pod súhrnom */
    /* pravý stĺpec radí cez order (súhrn 1, uistenia 2) — kupón hneď pod súhrnom */
    '.sidebar-in-cart .sw-coupon{order:1;margin:0}'
  ].join(''));

  function cartTotal() {
    try {
      var c = getShoptetDataLayer().cartInfo;
      if (c && c.getNoBillingShippingPrice) return parseFloat(c.getNoBillingShippingPrice.withVat);
    } catch (e) {}
    var el = document.querySelector('.summary-wrapper .price.price-primary');
    return el ? S.parseMoney(el.textContent) : NaN;
  }
  function freeFrom() {
    try {
      var c = getShoptetDataLayer().cartInfo;
      if (c && c.freeShippingFrom) return parseFloat(c.freeShippingFrom);
    } catch (e) {}
    return S.CFG.freeShip;
  }

  /* hlavička: preč s vyhľadávaním a menu, späť do obchodu doprostred */
  function header() {
    var wrap = document.querySelector('#header .header-top-wrapper');
    if (!wrap || wrap.querySelector('.sw-back')) return;
    var back = S.el('a', 'sw-back',
      '<i class="icon-arrow-left"></i><span>Späť do obchodu</span>');
    back.href = '/';
    var logo = wrap.querySelector('.site-name');
    if (logo && logo.nextSibling) wrap.insertBefore(back, logo.nextSibling);
    else wrap.appendChild(back);
    hdrHeight();
  }

  /* skutočná výška zoštíhlenej pokladničnej hlavičky do CSS premennej */
  function hdrHeight() {
    var h = document.getElementById('header');
    if (!h) return;
    var set = function () {
      var px = h.offsetHeight;
      if (px > 0) document.documentElement.style.setProperty('--sw-cart-hdr', px + 'px');
    };
    set();
    window.addEventListener('resize', set);
    window.addEventListener('load', set);
  }

  /* kroky: číslo do krúžku, názov do vlastného span-u (kvôli mobilu)
     a celá lišta nad nadpis, cez celú šírku stránky */
  function steps() {
    /* Presun nad <h1>. Nadpis je priame dieťa #content, kroky sú zanorené
       v ľavom stĺpci — bez presunu sa nedajú roztiahnuť cez celú šírku.
       Shoptet po zmene množstva alebo odobratí položky prekresľuje .cart-content
       cez AJAX a pošle NOVÚ lištu krokov. Tá presunutá by vedľa nej zostala ako
       druhá, preto sa stará vždy zahodí a nahradí čerstvou. */
    var content = document.querySelector('main#content, #content');
    if (!content) return;

    var moved = content.querySelector(':scope > .cart-header');
    var fresh = null;
    document.querySelectorAll('.cart-header').forEach(function (ol) {
      if (ol !== moved) fresh = ol;
    });

    if (fresh) {
      if (moved) moved.parentNode.removeChild(moved);
      content.insertBefore(fresh, content.firstChild);
      moved = fresh;
    } else if (moved && S.body('in-kosik') && !document.querySelector('.cart-table')) {
      /* AJAX vyprázdnil košík — kroky už nemajú čo krokovať */
      moved.parentNode.removeChild(moved);
      return;
    }
    if (!moved) return;

    var steps = [].slice.call(moved.querySelectorAll('.step'));
    var act = steps.findIndex(function (li) { return li.classList.contains('active'); });
    steps.forEach(function (li, i) {
      if (li.querySelector('.sw-step-n')) return;
      var host = li.querySelector('strong, a') || li;
      var txt = (host.textContent || '').replace(/\s+/g, ' ').trim();
      /* prejdený krok (je preklikateľný) dostane fajku */
      var done = act > -1 && i < act;
      if (done) li.classList.add('sw-step-done');
      host.innerHTML = '<span class="sw-step-n">' + (done
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" ' +
          'stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
        : (i + 1)) + '</span>' +
        '<span class="sw-step-t">' + txt + '</span>';
    });
  }

  /* Text hlavného tlačidla podľa toho, kam vedie. Mení sa len textový uzol,
     ikona a formulár zostávajú Shoptetu. */
  function ctaLabel() {
    /* len „Pokračovať" (feedback 7. 10.); kam sa pokračuje, ukazujú kroky hore */
    var map = [['in-kosik', '#continue-order-button', 'Pokračovať'],
               ['in-krok-1', '#orderFormButton', 'Pokračovať']];
    map.forEach(function (m) {
      if (!S.body(m[0])) return;
      var b = document.querySelector(m[1]);
      if (!b || b.getAttribute('data-sw')) return;
      var span = b.querySelector('.order-button-text');
      if (span) { span.textContent = m[2]; b.setAttribute('data-sw', '1'); return; }
      for (var i = 0; i < b.childNodes.length; i++) {
        var n = b.childNodes[i];
        if (n.nodeType === 3 && n.nodeValue.trim()) {
          n.nodeValue = m[2] + ' ';
          b.setAttribute('data-sw', '1');
          break;
        }
      }
    });
  }

  /* Upsell zo Súvisiaceho tovaru položiek v košíku. Formulár „Do košíka"
     sa PRESÚVA (nekopíruje), takže pridanie obsluhuje Shoptet sám aj s CSRF. */
  /* Shoptet súvisiace v košíku teraz nevykresľuje (overené 7. 10., v HTML
     košíka nie sú). Náhrada: „Odporúčame kombinovať" z detailov položiek. */
  var upFromDetail = false;
  function upsellFallback(table) {
    if (upFromDetail || document.querySelector('.sw-up')) return;
    upFromDetail = true;
    var inCart = {};
    table.querySelectorAll('tr.removeable input[name="priceId"]').forEach(function (i) { inCart[i.value] = 1; });
    var links = [].slice.call(table.querySelectorAll('tr.removeable .p-name a.main-link')).map(function (a) { return a.getAttribute('href'); });
    Promise.all(links.map(function (u) { return productInfo(u).catch(function () { return {}; }); })).then(function (infos) {
      var seen = {}, pick = [];
      infos.forEach(function (inf) { (inf.rel || []).forEach(function (r) {
        if (pick.length < 4 && !seen[r.id] && !inCart[r.id]) { seen[r.id] = 1; pick.push(r); }
      }); });
      if (!pick.length || document.querySelector('.sw-up')) return;
      var left = freeFrom() - cartTotal();
      var box = S.el('div', 'sw-up', '<div class="sw-up__h"><p class="sw-up__t">Mohlo by Vás ešte zaujímať</p></div>' +
        '<div class="sw-up__g">' + pick.map(function (r) {
          return '<div class="sw-up__r"><a class="sw-up__img" href="' + r.u + '">' + (r.img ? '<img src="' + r.img + '" alt="">' : '') + '</a>' +
            '<a class="sw-up__n" href="' + r.u + '">' + r.n + '</a>' +
            '<div class="sw-up__p">' + (isNaN(r.p) ? '' : S.money(r.p)) + '</div>' +
            (left > 0 && r.p >= left ? '<span class="sw-up__free">+ doprava zadarmo</span>' : '') +
            '<form><button type="button" class="btn" data-sw-add="' + r.id + '" data-sw-pid="' + (r.pid || r.id) + '">Pridať</button></form></div>';
        }).join('') + '</div>');
      table.parentNode.insertBefore(box, table.nextSibling);
      /* Shoptetov vlastný POST do košíka (ako v sprievodcovi), potom obnova košíka */
      box.querySelectorAll('[data-sw-add]').forEach(function (b) {
        b.addEventListener('click', function () {
          b.disabled = true;
          var f = new URLSearchParams();
          f.set('priceId', b.getAttribute('data-sw-add')); f.set('productId', b.getAttribute('data-sw-pid'));
          f.set('amount', '1'); f.set('language', 'sk');
          try { if (window.shoptet && shoptet.csrf && shoptet.csrf.token) f.set('__csrf__', shoptet.csrf.token); } catch (e) {}
          fetch('/action/Cart/addCartItem/', { method: 'POST', body: f, credentials: 'same-origin',
            headers: { 'X-Requested-With': 'XMLHttpRequest' } })
            .then(function () { location.reload(); })
            .catch(function () { b.disabled = false; });
        });
      });
    });
  }

  function upsell() {
    var table = document.querySelector('.cart-table');
    var old = document.querySelector('.sw-up');
    var rel = document.querySelectorAll('.cart-table tr.related .cart-related-product');
    if (!table) { if (old) old.remove(); return; }
    if (old && !rel.length) return;          /* už postavený, zdroj je presunutý */
    if (old) old.remove();
    if (!rel.length) { if (S.body('in-kosik')) upsellFallback(table); return; }

    var inCart = {};
    table.querySelectorAll('tr.removeable input[name="priceId"]').forEach(function (i) { inCart[i.value] = 1; });
    var left = freeFrom() - cartTotal();
    var seen = {}, rows = [];
    rel.forEach(function (p) {
      var form = p.querySelector('form');
      var pid = form && form.querySelector('input[name="priceId"]');
      if (!pid || seen[pid.value] || inCart[pid.value] || rows.length >= 4) return;
      var av = p.querySelector('.cart-related-availability');
      if (av && !/skladom/i.test(av.textContent)) return;
      seen[pid.value] = 1;
      var name = p.querySelector('.cart-related-name');
      var img = p.querySelector('img');
      var price = p.querySelector('.price-final');
      var pr = price ? S.parseMoney(price.textContent) : NaN;
      var btn = form.querySelector('button');
      if (btn) btn.textContent = 'Pridať';
      var row = S.el('div', 'sw-up__r',
        '<a class="sw-up__img" href="' + (name ? name.getAttribute('href') : '#') + '">' +
          (img ? '<img src="' + (img.getAttribute('data-src') || img.src) + '" alt="">' : '') + '</a>' +
        '<a class="sw-up__n" href="' + (name ? name.getAttribute('href') : '#') + '">' +
          (name ? name.textContent.trim() : '') + '</a>' +
        '<div class="sw-up__p">' + (isNaN(pr) ? '' : S.money(pr)) + '</div>' +
        (left > 0 && pr >= left ? '<span class="sw-up__free">+ doprava zadarmo</span>' : ''));
      row.appendChild(form);
      rows.push(row);
    });
    if (!rows.length) return;
    var anyFree = rows.some(function (r) { return r.querySelector('.sw-up__free'); });
    /* feedback 7. 10.: „Mohlo by Vás ešte zaujímať" a v tvare kariet */
    var box = S.el('div', 'sw-up',
      '<div class="sw-up__h"><p class="sw-up__t">Mohlo by Vás ešte zaujímať</p>' +
      (anyFree ? '<p class="sw-up__s">Produkty označené zelenou Vás dostanú na dopravu zadarmo.</p>' : '') +
      '</div><div class="sw-up__g"></div>');
    rows.forEach(function (r) { box.querySelector('.sw-up__g').appendChild(r); });
    table.parentNode.insertBefore(box, table.nextSibling);
  }

  /* „3 balenia · 270 kapsúl · zásoba na 9 mesiacov · 0,09 € / deň"
     Údaje sa berú z detailu produktu (box Obsah balenia a množstevná zľava),
     načítaného na pozadí a uloženého v sessionStorage. Keď produkt box nemá,
     riadok sa nezobrazí. */
  var infoCache = {};
  try { infoCache = JSON.parse(sessionStorage.getItem('swPackInfo2') || '{}'); } catch (e) {}
  function productInfo(url) {
    if (infoCache[url]) return Promise.resolve(infoCache[url]);
    return fetch(url, { credentials: 'same-origin' }).then(function (r) { return r.text(); }).then(function (t) {
      var d = new DOMParser().parseFromString(t, 'text/html');
      var out = { tiers: [] };
      d.querySelectorAll('.sw-boxes .sw-item').forEach(function (it) {
        var l = (it.querySelector('.sw-label') || {}).textContent || '';
        var v = ((it.querySelector('.sw-value') || {}).textContent || '').trim();
        var m = /obsah balenia/i.test(l) && v.match(/(\d+)\s*([^\d/]*?)\s*\/\s*(\d+)\s*dn/i);
        if (m) { out.count = +m[1]; out.unit = m[2].trim(); out.days = +m[3]; }
      });
      d.querySelectorAll('.quantity-discounts__item').forEach(function (it) {
        var p = it.querySelector('.quantity-discounts__price');
        if (p) out.tiers.push([parseInt(it.getAttribute('data-amount'), 10) || 1, S.parseMoney(p.textContent)]);
      });
      var pm = d.querySelector('[itemprop="offers"] [itemprop="price"]');
      out.price = pm ? parseFloat(pm.getAttribute('content')) : NaN;
      /* „Odporúčame kombinovať" z detailu — súvisiace produkty, ktoré nastavil
         Silwer. Zdroj pre upsell, keď Shoptet súvisiace v košíku nevykreslí. */
      out.rel = [].slice.call(d.querySelectorAll('.products-related .product')).map(function (c) {
        var a = c.querySelector('a.name'), img = c.querySelector('a.image img');
        var pid = c.querySelector('input[name="priceId"]'), of = c.querySelector('[data-micro-price]');
        var src = img ? (img.getAttribute('data-src') || img.getAttribute('src') || '') : '';
        return { id: pid ? pid.value : '', pid: (c.querySelector('input[name="productId"]') || {}).value || '',
          n: a ? a.textContent.replace(/\s+/g, ' ').trim() : '', u: a ? a.getAttribute('href') : '',
          img: /^data:/.test(src) ? '' : src.replace(/\s+/g, ''),
          p: of ? parseFloat(of.getAttribute('data-micro-price')) : NaN,
          ok: !!(of && /InStock/.test(of.getAttribute('data-micro-availability') || '')) };
      }).filter(function (x) { return x.id && x.n && x.ok; });
      infoCache[url] = out;
      try { sessionStorage.setItem('swPackInfo2', JSON.stringify(infoCache)); } catch (e) {}
      return out;
    });
  }
  function itemInfo() {
    document.querySelectorAll('.cart-table tr.removeable').forEach(function (tr) {
      if (tr.querySelector('.sw-ci')) return;
      var a = tr.querySelector('.p-name a.main-link');
      var qi = tr.querySelector('.p-quantity input.amount');
      if (!a || !qi) return;
      var q = parseInt(qi.value, 10) || 1;
      var span = S.el('span', 'sw-ci', '');
      a.insertAdjacentElement('afterend', span);
      productInfo(a.getAttribute('href')).then(function (inf) {
        if (!inf || !inf.count || !inf.days) { span.remove(); return; }
        var unit = inf.price;
        (inf.tiers || []).forEach(function (t) { if (q >= t[0]) unit = t[1]; });
        /* bez „zásoba na N mesiacov · X € / deň" (feedback 7. 10.) */
        span.textContent = q + ' ' + (q === 1 ? 'balenie' : (q < 5 ? 'balenia' : 'balení')) +
          ' · ' + (inf.count * q) + ' ' + inf.unit;
      }).catch(function () { span.remove(); });
    });
  }

  /* Cena za kus v košíku podľa množstevnej zľavy (klient 20. 10.: „cena za kus by
     mala klesať podľa tabuľky"). Shoptet ukazuje základnú cenu a zľavu zvlášť,
     s bublinou o „štandardnej cene 7 €" a pre admina aj rozpisom všetkých zliav.
     Cena za kus = súčet riadku / počet, teda presne to, čo zákazník zaplatí. */
  function cartUnits() {
    document.querySelectorAll('.cart-table tr.removeable').forEach(function (tr) {
      var qi = tr.querySelector('.p-quantity input.amount');
      var pc = tr.querySelector('.p-price'), tot = tr.querySelector('.p-total .price-final');
      if (!qi || !pc || !tot) return;
      var q = parseInt(qi.value, 10) || 1, sum = S.parseMoney(tot.textContent);
      var sig = q + '|' + sum;
      if (tr.getAttribute('data-sw-cu') === sig) return;
      tr.setAttribute('data-sw-cu', sig);
      tr.querySelectorAll('.p-price .show-tooltip, .p-discount .show-tooltip').forEach(function (t) {
        t.classList.remove('show-tooltip', 'acronym');
        t.removeAttribute('data-original-title'); t.removeAttribute('title');
      });
      var pf = pc.querySelector('.price-final');
      var base = pf ? (pf.getAttribute('data-sw-base') || pf.textContent) : '';
      if (pf && !pf.getAttribute('data-sw-base')) pf.setAttribute('data-sw-base', base);
      var unit = Math.round(sum / q * 100) / 100, old = S.parseMoney(base);
      var o = pc.querySelector('.sw-cu__o');
      if (!isNaN(unit) && !isNaN(old) && unit < old - 0.004) {
        if (!o) { o = S.el('s', 'sw-cu__o'); pf.parentNode.insertBefore(o, pf); }
        o.textContent = S.money(old);
        pf.textContent = S.money(unit);
      } else {
        if (o) o.remove();
        if (pf) pf.textContent = base.trim();
      }
    });
  }

  function shipBar() {
    var total = cartTotal(), limit = freeFrom();
    if (isNaN(total) || !limit) return;
    var bar = document.querySelector('.sw-ship');
    if (!bar) {
      bar = S.el('div', 'sw-ship');
      var tbl = document.querySelector('.cart-table');
      if (tbl && tbl.parentNode) tbl.parentNode.insertBefore(bar, tbl);
      else return;
    }
    var left = limit - total;
    var pct = Math.max(0, Math.min(100, Math.round(total / limit * 100)));
    bar.className = 'sw-ship' + (left <= 0 ? ' sw-ship--done' : '');

    /* Lišta sa dokresľuje, nie objavuje. Pri prvom vykreslení sa štartuje z nuly,
       pri zmene množstva z predchádzajúcej hodnoty — v oboch prípadoch to
       prebehne CSS transition na width, žiadny rAF cyklus. */
    var prev = bar.querySelector('.sw-ship__fill');
    var from = prev ? prev.style.width || '0%' : '0%';
    bar.innerHTML = '<i class="icon-van"></i><div class="sw-ship__body">' +
      '<p class="sw-ship__t">' + (left <= 0
        ? 'Máte <b>dopravu zadarmo</b>.'
        : 'Do dopravy <b>zadarmo</b> Vám chýba <b>' + S.money(left) + '</b>') + '</p>' +
      '<div class="sw-ship__bar"><div class="sw-ship__fill" style="width:' + from + '"></div></div></div>';

    var fill = bar.querySelector('.sw-ship__fill');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { fill.style.width = pct + '%'; });
    });
  }

  /* uistenia ako samostatná karta pod zhrnutím, nie v ňom */
  function assureBox() {
    var side = document.querySelector('.sidebar-in-cart');
    if (!side || side.querySelector('.sw-assurebox')) return;
    var rows = [];
    rows.push(['icon-van', 'Doprava <b>zadarmo</b> pri nákupe nad ' + freeFrom() + ' €']);
    if (S.CFG.guarantee) rows.push(['icon-tick', '<b>60-dňová garancia</b> vrátenia peňazí. Bez otázok.']);
    rows.push(['icon-lock', 'Bezpečná platba: karta, Apple Pay, Google Pay aj dobierka.']);
    var box = S.el('div', 'sw-assurebox',
      '<ul>' + rows.map(function (r) {
        return '<li><i class="' + r[0] + '"></i><span>' + r[1] + '</span></li>';
      }).join('') + '</ul>');
    side.appendChild(box);
  }

  /* vlastná telefónna karta namiesto Shoptetovej */
  function phoneBox() {
    var side = document.querySelector('.sidebar-in-cart');
    if (!side || side.querySelector('.sw-phone')) return;
    side.appendChild(S.el('div', 'sw-phone',
      '<span class="sw-phone__ic"><i class="icon-phone"></i></span>' +
      '<span class="sw-phone__b">' +
      '<span class="sw-phone__t">Zákaznícka linka Vám pomôže s objednávkou, dopravou, platbou aj zásielkou.</span>' +
      '<a class="sw-phone__n" href="' + S.CFG.telHref + '">' + S.CFG.tel + '</a>' +
      (S.CFG.hours ? '<span class="sw-phone__h">' + S.CFG.hours + '</span>' : '') + '</span>'));
  }

  /* zľavový kód za odkaz — otvorené pole podsúva, že kupón existuje */
  function coupon() {
    var box = document.querySelector('.discount-coupon');
    if (!box || box.closest('.sw-coupon')) return;
    /* predvolene rozbalené (Jan 1. 10.): pole na kód vidno hneď, zbaliť sa dá.
       Fokus sa pri načítaní nedáva, na mobile by vyskočila klávesnica. */
    var wrap = S.el('div', 'sw-coupon is-open',
      '<button type="button" class="sw-coupon__t" aria-expanded="true">' +
      '<span class="sw-coupon__ic"><i class="icon-discount" aria-hidden="true"></i></span>' +
      '<span>Mám zľavový kód</span>' +
      '<svg class="sw-coupon__chev" width="14" height="14" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true">' +
      '<path d="M5 9l7 7 7-7"/></svg></button>');
    box.parentNode.insertBefore(wrap, box);
    wrap.appendChild(box);
    /* do pravého stĺpca pod „Pokračovať" (feedback 7. 10.). Za súhrn, nie
       doň — súhrn Shoptet pri zmene košíka prekresľuje cez AJAX. */
    var go = document.getElementById('continue-order-button');
    var host = go && go.closest('.sidebar-in-cart > *');
    if (host) host.parentNode.insertBefore(wrap, host.nextSibling);
    var btn = wrap.querySelector('.sw-coupon__t');
    btn.addEventListener('click', function () {
      var open = wrap.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        var i = box.querySelector('input');
        if (i) i.focus();
      }
    });
  }

  function freeTags() {
    document.querySelectorAll('.shipping-billing-table .payment-shipping-price, #summary-box .recapitulation-shipping-billing-info>span').forEach(function (p) {
      p.classList.toggle('sw-free', /zadarmo/i.test(p.textContent));
    });
  }

  /* krok Doprava a platba: nadpis ako v návrhu a uistenia pod tlačidlom.
     „Shoptet Pay" je overené — spomína ho popis platby kartou aj bankou. */
  function checkoutStep() {
    if (!S.body('in-krok-1') && !S.body('in-krok-2')) return;
    var h1 = document.querySelector('#content > h1');
    if (h1 && !h1.getAttribute('data-sw')) {
      h1.setAttribute('data-sw', '1');
      h1.textContent = S.body('in-krok-1') ? 'Doprava a platba' : 'Informácie o Vás';
    }
    var back = document.querySelector('#checkoutSidebar .next-step-back');
    if (back && !back.getAttribute('data-sw')) {
      back.setAttribute('data-sw', '1');
      back.textContent = S.body('in-krok-1') ? 'Späť do košíka' : 'Späť na dopravu a platbu';
    }
    freeTags();
    var form = document.getElementById('order-form');
    if (form && !form.getAttribute('data-sw')) {
      form.setAttribute('data-sw', '1');
      form.addEventListener('change', function () { setTimeout(freeTags, 60); setTimeout(freeTags, 600); });
    }
    /* ikona podľa typu dopravy/platby — len vizuálna pomôcka */
    var IC = {
      van:   '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.7"/><circle cx="17" cy="17.5" r="1.7"/>',
      box:   '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/>',
      store: '<path d="M4 10v10h16V10"/><path d="M3 10l2-6h14l2 6"/><path d="M9 20v-5h6v5"/>',
      card:  '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 15h4"/>',
      cash:  '<rect x="3" y="7" width="18" height="10" rx="2"/><circle cx="12" cy="12" r="2.4"/>',
      bank:  '<path d="M3 9l9-5 9 5M5 9v8M9.5 9v8M14.5 9v8M19 9v8M3 20h18"/>',
      qr:    '<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 18h2v2h-2zM14 18h2"/>',
      phone: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>'
    };
    document.querySelectorAll('.shipping-billing-table .radio-wrapper').forEach(function (w) {
      var lab = w.querySelector('label');
      var inp = w.querySelector('input[type="radio"]');
      if (!lab || !inp || lab.querySelector('.sw-opt-ic')) return;
      var name = (lab.querySelector('.shipping-billing-name') || lab).textContent;
      var k;
      if (inp.name === 'shippingId') {
        k = inp.getAttribute('data-code') === 'personal-collection' || /osobn/i.test(name) ? 'store'
          : (/výdajn|box/i.test(name) ? 'box' : 'van');
      } else {
        var t = inp.getAttribute('data-payment-type') || '';
        k = t === 'cashOnDelivery' || /dobierk/i.test(name) ? 'cash'
          : /google|apple/i.test(name) ? 'phone'
          : /qr/i.test(name) ? 'qr'
          : /bank|prevod/i.test(name) ? 'bank' : 'card';
      }
      lab.insertBefore(S.el('span', 'sw-opt-ic', '<svg viewBox="0 0 24 24" aria-hidden="true">' + IC[k] + '</svg>'), lab.firstChild);
    });
    var side = document.querySelector('#checkoutSidebar .cart-content');
    if (!side || side.querySelector('.sw-assurebox')) return;
    var rows = [];
    if (S.CFG.guarantee) rows.push(['icon-tick', '<b>60-dňová garancia</b> vrátenia peňazí. Bez otázok.']);
    rows.push(['icon-lock', 'Platby zabezpečuje Shoptet Pay.']);
    rows.push(['icon-phone', 'Zákaznícka linka: <a href="' + S.CFG.telHref + '">' + S.CFG.tel + '</a>' +
      (S.CFG.hours ? ' (' + S.CFG.hours + ')' : '')]);
    side.appendChild(S.el('div', 'sw-assurebox', '<ul>' + rows.map(function (r) {
      return '<li><i class="' + r[0] + '"></i><span>' + r[1] + '</span></li>';
    }).join('') + '</ul>'));
  }

  /* Prázdny košík: Shoptet tu dá holý zoznam kategórií v odrážkach, tlačidlo
     „Hľadať" (vyhľadávanie je v pokladni skryté) a logo s telefónom. Nahrádza
     sa blokom s cestou späť k nákupu. Kategórie sa berú zo Shoptetu, takže
     ich ďalej spravuje admin. Pôvodný obsah zostáva v DOM, len skrytý. */
  function emptyCart() {
    var inner = document.querySelector('.cart-inner.cart-empty');
    document.body.classList.toggle('sw-cart-empty', !!inner);
    if (!inner || inner.querySelector('.sw-empty')) return;
    S.addStyle('cart-empty', [
      'body.sw-cart-empty #content>h1.sr-only{position:absolute!important;width:1px!important;',
      'height:1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;margin:0!important}',
      /* .row.cart-row má v pokladni na desktope display:flex!important */
      'body.sw-cart-empty .cart-inner.cart-empty>:not(.sw-empty){display:none!important}',
      '.sw-empty{padding-top:clamp(24px,3.4vw,44px)}',
      '.sw-empty__hero{position:relative;overflow:hidden;text-align:center;border-radius:24px;',
      'background:var(--sw-field);padding:clamp(40px,6vw,76px) clamp(20px,5vw,56px) clamp(32px,4.4vw,52px)}',
      '.sw-empty__ic{position:relative;display:inline-flex;align-items:center;justify-content:center;',
      'width:88px;height:88px;border-radius:50%;background:#fff;box-shadow:0 14px 34px -18px rgba(0,0,0,.35);margin-bottom:22px}',
      '.sw-empty__ic svg{width:38px;height:38px;fill:none;stroke:var(--sw-ink);stroke-width:1.6;',
      'stroke-linecap:round;stroke-linejoin:round}',
      '.sw-empty__n{position:absolute;top:10px;right:8px;min-width:24px;height:24px;padding:0 6px;',
      'border-radius:12px;background:var(--sw-red);color:#fff;font-size:13px;font-weight:700;line-height:24px}',
      '.sw-empty__t{font-size:clamp(28px,3.6vw,44px)!important;font-weight:700!important;letter-spacing:-.025em;',
      'line-height:1.1!important;margin:0 0 12px!important;color:var(--sw-ink)}',
      '.sw-empty__p{font-size:clamp(16px,1.4vw,18px);line-height:1.5;color:var(--sw-muted);max-width:520px;margin:0 auto 28px}',
      '.sw-empty__cta{display:flex;flex-wrap:wrap;justify-content:center;gap:12px}',
      '.sw-empty__cta .sw-btn{padding:17px 30px;font-size:17px}',
      '.sw-empty__trust{display:flex;flex-wrap:wrap;justify-content:center;gap:10px 28px;list-style:none;',
      'margin:32px 0 0;padding:26px 0 0;border-top:1px solid var(--sw-line)}',
      '.sw-empty__trust li{display:flex;align-items:center;gap:9px;font-size:15px;color:var(--sw-ink);margin:0;padding:0}',
      '.sw-empty__trust li::before{display:none!important}',
      '.sw-empty__trust svg{width:22px;height:22px;flex:none;fill:none;stroke:var(--sw-ink);stroke-width:1.7;',
      'stroke-linecap:round;stroke-linejoin:round}',
      '.sw-empty__cats{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;margin:28px 0 0}',
      '.sw-empty__cats span{width:100%;font-size:14px;color:var(--sw-muted);margin:0 0 2px}',
      '.sw-empty__cats a{display:inline-flex;align-items:center;padding:9px 16px;border:1px solid var(--sw-line);',
      'border-radius:999px;font-size:14px;font-weight:600;color:var(--sw-ink)!important;text-decoration:none!important;',
      'background:#fff;transition:border-color .15s,background .15s}',
      '.sw-empty__cats a:hover{border-color:var(--sw-ink);background:var(--sw-field)}',
      '.sw-empty__sec{margin-top:clamp(48px,6vw,80px)}',
      '.sw-empty__sec .sw-h{margin:0 0 22px}',
      '@media(max-width:600px){.sw-empty__cta .sw-btn{width:100%}',
      '.sw-empty__trust{flex-direction:column;align-items:flex-start;max-width:280px;margin-left:auto;margin-right:auto}',
      '.sw-empty__cats{gap:8px;margin-top:24px}',
      '.sw-empty__cats a{padding:8px 14px;font-size:13px}}'
    ].join(''));
    var sale = inner.querySelector('.empty-cart-boxes a[href*="zlav"]');
    /* bez duplicít s tlačidlami a s dlaždicami nižšie */
    var skip = ['/vsetky/', '/hladam-nieco-na/', sale && sale.getAttribute('href')];
    var cats = [].slice.call(inner.querySelectorAll('.empty-cart-boxes ul a')).filter(function (a) {
      return skip.indexOf(a.getAttribute('href')) < 0;
    }).map(function (a) {
      var t = a.textContent.replace(/\s+/g, ' ').trim();
      /* „SILWER GOLD", „NOVINKY 2026" — v čipe bez kričania */
      if (t === t.toUpperCase()) t = t.charAt(0) + t.slice(1).toLowerCase().replace(/^(\S+ )(\S)/, function (m, a, b) { return a + b.toUpperCase(); });
      return '<a href="' + a.getAttribute('href') + '">' + t + '</a>';
    });
    var box = S.el('div', 'sw-empty',
      '<div class="sw-empty__hero">' +
        '<span class="sw-empty__ic">' + S.svg('cart') + '<span class="sw-empty__n">0</span></span>' +
        '<h2 class="sw-empty__t">Váš košík je zatiaľ prázdny</h2>' +
        '<p class="sw-empty__p">Vyberte si z doplnkov pre aktívny život po päťdesiatke. ' +
          'Alebo začnite tým, čo Vás trápi, a my Vám ukážeme, čo pomáha.</p>' +
        '<div class="sw-empty__cta"><a class="sw-btn sw-btn--red" href="/vsetky/">Pozrieť všetky produkty</a>' +
          (sale ? '<a class="sw-btn sw-btn--ghost" href="' + sale.getAttribute('href') + '">Superzľavy</a>' : '') + '</div>' +
        (cats.length ? '<div class="sw-empty__cats"><span>Alebo rovno do kategórie:</span>' + cats.join('') + '</div>' : '') +
        '<ul class="sw-empty__trust">' +
          '<li>' + S.svg('truck') + 'Doprava zadarmo nad ' + freeFrom() + ' €</li>' +
          '<li>' + S.svg('clock') + 'Doručenie do 2 dní</li>' +
          '<li>' + S.svg('cash') + 'Platba aj na dobierku</li>' +
        '</ul>' +
      '</div>' +
      '<section class="sw-empty__sec"><h2 class="sw-h sw-h--mix">Čo Vás <b>trápi?</b></h2>' + S.needsGrid() + '</section>' +
      (S.CFG.assistant ? '<section class="sw-empty__sec">' + S.helpBlock() + '</section>' : ''));
    inner.insertBefore(box, inner.firstChild);
  }

  function init() {
    header(); steps(); shipBar(); assureBox(); phoneBox(); coupon();
    upsell(); itemInfo(); cartUnits(); ctaLabel(); checkoutStep(); emptyCart();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  document.addEventListener('ShoptetDOMPageContentLoaded', init);
  document.addEventListener('ShoptetDOMCartContentLoaded', init);
})();

/* ============================================================================
   MODUL: SPRIEVODCA VÝBEROM
   ----------------------------------------------------------------------------
   Asana: „prejde si sprievodcom a na konci klikne na vložiť do košíka a rovno
   mu to produkty do košíka nahádže."  → overené, funguje.

   Mechanizmus vloženia je Shoptetov vlastný POST na /action/Cart/addCartItem/
   s productId + priceId + amount. Otestované na živom e-shope: vráti JSON
   s počtom položiek a stavom dopravy zadarmo.

   ODPORÚČANIA SA NEVYMÝŠĽAJÚ. Sprievodca sa pýta, čo chce človek riešiť, a
   ponúkne produkty, ktoré do tej kategórie zaradil sám Silwer — načítané
   naživo z kategórie, nie z uloženej kópie (ceny sa menia).

   BEZPEČNOSŤ: pri liekoch na predpis sprievodca NIČ neodporúča ani nevkladá.
   Pošle na telefón. Doplnky vs. lieky nie je vec skriptu.

   Kde beží:  <div id="sw-sprievodca"></div> na ľubovoľnej Shoptet stránke,
              alebo lokálne cez ?sprievodca=1
   ========================================================================== */
(function () {
  'use strict';
  var S = window.SW; if (!S) return;

  var IC = function (p) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + p + '</svg>'; };
  var Q = [
    /* oblasti: v = kľúč oblasti (n[4]), nie URL — Chudnutie, Menopauza a
       Testosterón kategóriu nemajú a s URL null sprievodca nenašiel nič */
    { id: 'need', type: 'multi', max: 2,
      t: 'Čo chcete riešiť najviac?',
      s: 'Vyberte jednu alebo dve oblasti. Odporučíme najviac dva produkty, nie celý katalóg.',
      opts: S.NEEDS.map(function (n) { return { v: n[4], l: n[0], d: n[3], c: n[2], ic: n[4] }; }) },

    { id: 'meds', type: 'single',
      t: 'Beriete lieky na predpis?',
      s: 'Pýtame sa preto, aby sme Vám v takom prípade radšej neodporúčali nič naslepo.',
      opts: [ { v: 'no',  l: 'Nie', d: 'Neberiem žiadne lieky na predpis', svg: IC('<circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/>') },
              { v: 'yes', l: 'Áno', d: 'Beriem lieky od lekára', svg: S.svg('pill') },
              { v: 'dk',  l: 'Neviem isto', d: 'Nie som si istý', svg: S.svg('help') } ] },

    { id: 'form', type: 'single',
      t: 'Prehĺtate veľké tablety bez problémov?',
      s: 'Ak nie, uprednostníme menšie formy.',
      opts: [ { v: 'any',  l: 'Áno, bez problémov', d: 'Tablety aj kapsuly', svg: IC('<rect x="3" y="8" width="18" height="8" rx="4"/><path d="M12 8v8"/>') },
              { v: 'mini', l: 'Radšej niečo menšie', d: 'Minitablety, ak sú', svg: IC('<circle cx="6.5" cy="12" r="2.3"/><circle cx="12" cy="12" r="2.3"/><circle cx="17.5" cy="12" r="2.3"/>') } ] },

    /* Otázka „Pre koho to je?" je preč: odpoveď sa pri výbere nepoužívala. */

    { id: 'len', type: 'single',
      t: 'Na ako dlho chcete zásobu?',
      s: 'Mnohé produkty majú pri troch a šiestich baleniach množstevnú zľavu.',
      opts: [ { v: '1', l: 'Jedno balenie', d: 'Na vyskúšanie', num: '1×' },
              { v: '3', l: 'Tri balenia', d: 'Často so zľavou −20 %', num: '3×' },
              { v: '6', l: 'Šesť balení', d: 'Často so zľavou −30 %', num: '6×' } ] }
  ];
  /* zľava podľa množstevných zliav produktu z DATA (gen-data.mjs); produkt
     bez nich má plnú cenu — zľavu nemá každý */
  function ratio(url, n) {
    var d = S.DATA.products[url], r = 1;
    ((d && d.t) || []).forEach(function (t) { if (n >= t[0]) r = t[1]; });
    return r;
  }

  /* Prerobené 15. 10. na vzhľad nového webu: úvod ako slajd hera (fotka cez celú
     šírku, tmavý panel), oblasti ako fotodlaždice, odpovede ako karty s ikonou,
     výsledok ako produktové karty so súhrnom. Jednovýberové otázky po kliknutí
     samy pokračujú. Farba sprievodcu je fialková z jeho slajdu v hero. */
  var ACC = '#B9AAEE';
  S.addStyle('guide', [
    '.swg{max-width:none;margin:0;padding:0;--swg-acc:' + ACC + '}',
    '.swg__in{max-width:1040px;margin:0 auto;padding:40px 20px 72px}',
    /* úvod */
    '.swg__hero{position:relative;overflow:hidden;isolation:isolate;background:#1D1B1A url(' + JSON.stringify(S.ASSETS + 'hero-silwa-plagat.jpg') +
      ') 62% center/cover no-repeat;color:#fff;',
    /* cez celú šírku okna: stránka je Shoptet článok v 1200 px kontajneri.
       --sw-sbw = šírka posuvníka (JS), inak by 100vw pretieklo o posuvník */
    'width:calc(100vw - var(--sw-sbw,0px));margin-left:var(--sw-gl,calc(50% - (100vw - var(--sw-sbw,0px)) / 2))}',
    '.swg__hero video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:62% center;z-index:-1;',
    'opacity:0;transition:opacity .5s}.swg__hero video.is-ready{opacity:1}',
    '.swg__hin{max-width:calc(1200px + 2*var(--sw-gut));margin:0 auto;padding:0 var(--sw-gut);display:flex;min-height:clamp(500px,42vw,620px)}',
    '.swg__panel{display:flex;flex-direction:column;justify-content:center;width:min(640px,52%);box-sizing:border-box;',
    'background:rgba(29,27,26,.97);padding:clamp(40px,5vw,72px) clamp(28px,3.6vw,60px);margin-left:calc(-1 * clamp(28px,3.6vw,60px))}',
    '.swg__eyebrow{display:block;font-size:12.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--swg-acc);margin:0 0 14px}',
    '#sw-sprievodca .swg__hero h1,.swg__hero h1{font-size:clamp(34px,3.8vw,54px)!important;font-weight:700!important;line-height:1.08!important;',
    'letter-spacing:-.02em!important;color:#fff!important;margin:0 0 18px!important;text-align:left!important}',
    '.swg__hero h1 em{font-style:normal;font-weight:200}',
    '#sw-sprievodca .swg__lead,.swg__lead{font-size:17px!important;line-height:1.6!important;color:rgba(255,255,255,.8)!important;margin:0 0 22px!important;max-width:46ch}',
    '.swg__facts{display:flex;flex-wrap:wrap;gap:8px 18px;margin:0 0 28px;padding:0;list-style:none}',
    '.swg__facts li{display:flex;align-items:center;gap:8px;font-size:15px;font-weight:600;color:#fff;margin:0;padding:0}',
    '.swg__facts li::before{display:none!important}',
    /* článok stránky dáva zoznamom odsadenie a odrážky */
    '#sw-sprievodca .swg__facts{padding:0!important;margin:0 0 28px!important;list-style:none!important}',
    '#sw-sprievodca .swg__facts li{margin:0!important;padding:0!important;list-style:none!important}',
    '.swg__facts svg{width:18px;height:18px;fill:none;stroke:var(--swg-acc);stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}',
    '.swg__start{align-self:flex-start;display:inline-flex;align-items:center;gap:10px;background:var(--swg-acc);color:#1D1B1A;border:0;',
    'border-radius:10px;padding:17px 32px;font-size:17px;font-weight:700;cursor:pointer;font-family:inherit;transition:background .15s,color .15s}',
    '.swg__start:hover{background:#fff}',
    '#sw-sprievodca .swg__fine,.swg__fine{font-size:13px!important;line-height:1.55!important;color:rgba(255,255,255,.5)!important;margin:22px 0 0!important;max-width:54ch}',
    /* kroky */
    '.swg__steps{background:var(--sw-field);box-shadow:0 0 0 100vmax var(--sw-field);clip-path:inset(0 -100vmax)}',
    '.swg__top{display:flex;align-items:center;justify-content:space-between;gap:16px;margin:0 0 30px}',
    '.swg__back{display:inline-flex;align-items:center;gap:6px;background:none;border:0;padding:6px 0;font:inherit;font-size:15px;',
    'font-weight:700;color:var(--sw-ink);cursor:pointer}',
    '.swg__back:hover{color:var(--sw-red)}',
    '.swg__back[hidden]{display:inline-flex!important;visibility:hidden}',
    '.swg__segs{display:flex;gap:6px;flex:1 1 auto;max-width:360px}',
    '.swg__seg{flex:1 1 0;height:5px;border-radius:99px;background:#DCD9D3;transition:background .3s}',
    '.swg__seg.is-done{background:var(--sw-ink)}.swg__seg.is-cur{background:var(--swg-acc)}',
    '.swg__cnt{font-size:13.5px;font-weight:700;color:var(--sw-muted);white-space:nowrap}',
    '#sw-sprievodca h2,.swg h2{font-size:clamp(28px,3.2vw,40px)!important;font-weight:700!important;letter-spacing:-.02em!important;',
    'line-height:1.12!important;margin:0 0 10px!important;color:var(--sw-ink)!important;text-align:left!important}',
    '#sw-sprievodca .swg__s,.swg__s{font-size:16.5px!important;line-height:1.6!important;color:var(--sw-muted)!important;margin:0!important;max-width:56ch}',
    '.swg__why{margin:14px 0 0}',
    '.swg__why summary{list-style:none;cursor:pointer;display:inline-flex;align-items:center;gap:8px;font-size:15px;',
    'font-weight:700;color:var(--sw-ink);text-decoration:underline;text-underline-offset:4px}',
    '.swg__why summary::-webkit-details-marker{display:none}',
    '#sw-sprievodca .swg__why p,.swg__why p{font-size:15px!important;line-height:1.6!important;color:var(--sw-text)!important;background:#fff;',
    'border-radius:12px;padding:14px 16px;margin:10px 0 0!important;max-width:62ch;border:1px solid var(--sw-line)}',
    /* oblasti ako fotodlaždice (ako „Čo Vás trápi?") */
    '.swg__tiles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:28px}',
    '.swg__tile{position:relative;display:flex;flex-direction:column;justify-content:center;gap:4px;min-height:112px;',
    'padding:12px 50% 12px 18px;border:0;border-radius:14px;cursor:pointer;text-align:left;font-family:inherit;isolation:isolate;',
    'background:var(--c) var(--img) right 18%/auto 172% no-repeat;color:#fff;transition:transform .15s,box-shadow .15s}',
    '.swg__tile::before{content:"";position:absolute;inset:0;z-index:-1;border-radius:inherit;',
    'background:linear-gradient(90deg,rgba(0,0,0,.22) 0%,rgba(0,0,0,.08) 42%,rgba(0,0,0,0) 58%)}',
    '.swg__tile:hover{transform:translateY(-2px);box-shadow:0 14px 30px -20px rgba(0,0,0,.6)}',
    '.swg__tile.is-on{box-shadow:0 0 0 3px var(--sw-field),0 0 0 6px var(--sw-ink)}',
    '.swg__tt{font-size:19px;font-weight:700;line-height:1.18;text-shadow:0 1px 2px rgba(0,0,0,.22)}',
    '.swg__td{font-size:14px;line-height:1.35;opacity:.95;text-shadow:0 1px 2px rgba(0,0,0,.22)}',
    '.swg__th{display:none}',
    '.swg__tw,.swg__cw{display:flex;flex-direction:column;gap:4px;min-width:0}',
    '.swg__ck{position:absolute;top:10px;right:10px;width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,.9);',
    'border:2px solid rgba(255,255,255,.95);display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,.18)}',
    '.swg__ck svg{width:16px;height:16px;fill:none;stroke:#fff;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;opacity:0}',
    '.is-on>.swg__ck{background:var(--sw-ink);border-color:#fff}.is-on>.swg__ck svg{opacity:1}',
    /* odpovede ako karty */
    '.swg__cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-top:28px;max-width:860px}',
    '.swg__card{position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:6px;padding:24px 22px 22px;',
    'background:#fff;border:1.5px solid var(--sw-line);border-radius:14px;cursor:pointer;text-align:left;font-family:inherit;',
    'transition:border-color .15s,box-shadow .15s,transform .15s}',
    '.swg__card:hover{border-color:#B9B7B1;transform:translateY(-2px)}',
    '.swg__card.is-on{border-color:var(--sw-ink);box-shadow:inset 0 0 0 1px var(--sw-ink)}',
    '.swg__card .swg__ck{top:14px;right:14px;background:#fff;border:1.5px solid #C9C6BF;box-shadow:none}',
    '.swg__ci{display:flex;align-items:center;justify-content:center;width:52px;height:52px;border-radius:14px;',
    'background:#F1EDFD;color:var(--sw-ink);margin:0 0 10px;font-size:20px;font-weight:800;letter-spacing:-.02em}',
    '.swg__ci svg{width:26px;height:26px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}',
    '.swg__cl{font-size:18px;font-weight:700;color:var(--sw-ink);line-height:1.25}',
    '.swg__cd{font-size:14.5px;color:var(--sw-muted);line-height:1.4}',
    '.swg__nav{display:flex;align-items:center;gap:16px;margin-top:30px;flex-wrap:wrap}',
    '.swg__next{display:inline-flex;align-items:center;gap:10px;background:var(--sw-ink);color:#fff;border:0;border-radius:10px;',
    'padding:17px 32px;font-size:17px;font-weight:700;cursor:pointer;font-family:inherit}',
    '.swg__next:hover{background:#000}',
    '.swg__next[disabled]{opacity:.3;cursor:not-allowed}',
    '.swg__hint{font-size:14px;color:var(--sw-muted)}',
    /* výsledok */
    '.swg__rgrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:28px}',
    '.swg__rgrid--1{grid-template-columns:minmax(0,1fr);max-width:520px}',
    '.swg__prod{display:flex;flex-direction:column;background:#fff;border:1px solid var(--sw-line);border-radius:16px;overflow:hidden}',
    '.swg__pimg{display:flex;align-items:center;justify-content:center;height:clamp(190px,18vw,230px);background:linear-gradient(180deg,#FAFAF8 0%,#F3F2EE 100%);',
    'border-bottom:1px solid var(--sw-line)}',
    '.swg__pimg img{max-height:82%;max-width:70%;width:auto;height:auto;object-fit:contain;mix-blend-mode:darken}',
    '.swg__pb{padding:18px 22px 22px;display:flex;flex-direction:column;gap:8px}',
    '.swg__for{display:inline-flex;align-items:center;gap:8px;align-self:flex-start;font-size:12.5px;font-weight:700;',
    'letter-spacing:.04em;text-transform:uppercase;color:var(--sw-ink);background:var(--sw-field);border-radius:999px;padding:4px 12px 4px 4px}',
    '.swg__for .sw-ic--ph,.swg__for .swg__fic{width:24px;height:24px;border-radius:50%;flex:0 0 auto}',
    '#sw-sprievodca .swg__pn,.swg__pn{font-size:20px;font-weight:700;color:var(--sw-ink)!important;text-decoration:none!important;line-height:1.25}',
    '#sw-sprievodca .swg__pr,.swg__pr{font-size:13.5px;color:var(--sw-muted)}#sw-sprievodca .swg__pr b,.swg__pr b{color:#E8A317!important;letter-spacing:1px}',
    '.swg__pp{display:flex;align-items:baseline;flex-wrap:wrap;gap:4px 10px;margin-top:4px}',
    '.swg__pp b{font-size:24px;font-weight:700;color:var(--sw-ink)}',
    '.swg__pp s{font-size:15px;color:var(--sw-muted)}',
    '.swg__pp span{font-size:13.5px;color:var(--sw-muted)}',
    '#sw-sprievodca .swg__pd,.swg__pd{align-self:flex-start;margin-top:6px;font-size:15px;font-weight:700;color:var(--sw-ink)!important;',
    'border-bottom:1.5px solid var(--sw-ink);padding-bottom:2px;text-decoration:none!important}',
    '.swg__sum{display:flex;align-items:center;justify-content:space-between;gap:16px 24px;flex-wrap:wrap;margin-top:16px;',
    'background:#fff;border:1px solid var(--sw-line);border-radius:16px;padding:20px 24px}',
    '.swg__tot{font-size:15px;color:var(--sw-muted)}.swg__tot b{display:block;font-size:28px;color:var(--sw-ink);line-height:1.15}',
    '.swg__ship{display:block;font-size:13.5px;font-weight:700;color:var(--sw-green);margin-top:4px}',
    '.swg__acts{display:flex;align-items:center;gap:18px;flex-wrap:wrap}',
    '.swg__acts .sw-btn{padding:18px 32px;font-size:17px}',
    '.swg__again{background:none;border:0;padding:6px 0;font:inherit;font-size:15px;font-weight:700;color:var(--sw-ink);',
    'text-decoration:underline;text-underline-offset:4px;cursor:pointer}',
    '.swg__warn{border:1px solid #E9C46A;background:#FFF9EC;border-radius:14px;padding:18px 20px;margin:22px 0 0;max-width:760px}',
    '.swg__warn b{display:block;margin-bottom:6px;color:var(--sw-ink)}',
    '#sw-sprievodca .swg__warn p,.swg__warn p{margin:0!important;font-size:14.5px!important;line-height:1.55!important;color:var(--sw-text)!important}',
    '#sw-sprievodca .swg__note,.swg__note{font-size:13px!important;color:var(--sw-muted)!important;margin:18px 0 0!important;line-height:1.55!important;max-width:70ch}',
    '.swg__ok{background:#EAF6EE;border:1px solid #BEE3C9;color:#1E6B38;border-radius:12px;padding:14px 16px;font-weight:700;margin:16px 0 0}',
    '.swg__load{display:flex;align-items:center;gap:12px;margin-top:24px;font-size:16px;color:var(--sw-muted)}',
    '.swg__load::before{content:"";width:22px;height:22px;border-radius:50%;border:3px solid #DCD9D3;border-top-color:var(--sw-ink);',
    'animation:swgspin .8s linear infinite}',
    '@keyframes swgspin{to{transform:rotate(360deg)}}',
    '@media(max-width:1000px){.swg__tiles{grid-template-columns:repeat(2,minmax(0,1fr))}}',
    /* mobil: úvod fotka nad textom, oblasti ako riadky s výrezom fotky */
    '@media(max-width:767px){',
    '.swg__hero{background:#1D1B1A}',
    '.swg__hero video{position:relative;display:block;height:min(100vw,420px);z-index:0}',
    '.swg__hero::before{content:"";display:block;height:min(100vw,420px);background:url(' + JSON.stringify(S.ASSETS + 'hero-silwa-plagat.jpg') + ') 66% center/cover no-repeat}',
    '.swg__hero:has(video.is-ready)::before{display:none}',
    '.swg__hero video:not(.is-ready){position:absolute;height:0}',
    '.swg__hin{min-height:0;padding:0}',
    '.swg__panel{width:100%;margin:0;padding:24px var(--sw-gut) 34px;background:#1D1B1A}',
    '.swg__start{align-self:stretch;justify-content:center}',
    '.swg__in{padding:24px 16px 56px}',
    '.swg__top{margin-bottom:22px}',
    '.swg__tiles{grid-template-columns:minmax(0,1fr);gap:10px;margin-top:22px}',
    '.swg__tile{flex-direction:row;align-items:center;gap:14px;min-height:0;padding:10px 46px 10px 10px;background:#fff;color:var(--sw-ink);',
    'border:1.5px solid var(--sw-line)}',
    '.swg__tile::before{display:none}',
    '.swg__tile.is-on{border-color:var(--sw-ink);box-shadow:inset 0 0 0 1px var(--sw-ink)}',
    '.swg__th{display:block;flex:0 0 64px;width:64px;height:64px;border-radius:10px;background:var(--c) var(--img) right center/cover no-repeat}',

    '.swg__tt,.swg__td{text-shadow:none}.swg__tt{font-size:17px}.swg__td{font-size:13.5px;color:var(--sw-muted)}',
    '.swg__tile .swg__ck{top:50%;margin-top:-14px;right:12px;background:#fff;border:1.5px solid #C9C6BF;box-shadow:none}',
    '.swg__cards{grid-template-columns:minmax(0,1fr);gap:10px;margin-top:22px}',
    '.swg__card{flex-direction:row;align-items:center;gap:14px;padding:14px 50px 14px 14px}',
    '.swg__ci{margin:0;flex:0 0 52px}',
    '.swg__card .swg__ck{top:50%;margin-top:-14px}',

    '.swg__nav{position:sticky;bottom:0;margin:22px -16px -56px;padding:14px 16px;background:rgba(245,244,241,.96);',
    'border-top:1px solid var(--sw-line);z-index:5}',
    '.swg__next{width:100%;justify-content:center}.swg__hint{display:none}',
    '.swg__rgrid{grid-template-columns:minmax(0,1fr)}',
    '.swg__sum{padding:18px}.swg__acts{width:100%}.swg__acts .sw-btn{width:100%;justify-content:center}',
    '}'
  ].join(''));

  /* Stránka /sprievodca/ je Shoptet textová stránka: modul textových stránok
     ju zúži na 760 px a jeho pravidlá (.pageArticleDetail p/h1/h2/img s
     !important) prekreslili sprievodcu. Rám stránky sa uvoľní a v sprievodcovi
     platí jeho vlastná typografia (pravidlá s #sw-sprievodca vyššie). */
  S.addStyle('guidepage', [
    'body.sw-guidepage .pageArticleDetail{max-width:none!important;padding:0!important;margin:0!important}',
    'body.sw-guidepage .pageArticleDetail>header{position:absolute!important;width:1px;height:1px;overflow:hidden;',
    'clip:rect(0 0 0 0);white-space:nowrap}',
    '#sw-sprievodca img{margin:0!important}',
    '#sw-sprievodca a{text-decoration:none}',
    '#sw-sprievodca a.sw-btn--dark,#sw-sprievodca a.sw-btn--red{color:#fff!important;text-decoration:none!important}'
  ].join(''));

  var CHECK = IC('<path d="M5 12.5l4.5 4.5L19 7.5"/>');
  var WHY = {
    meds: 'Niektoré doplnky sa s liekmi neznášajú. Posúdiť to vie lekár alebo lekárnik, nie e-shop. ' +
          'Ak lieky beriete, nič Vám neodporučíme ani nevložíme do košíka. Odpoveď sa nikam neodosiela.'
  };
  var NEED = {};
  S.NEEDS.forEach(function (n) { NEED[n[4]] = n; });

  var state = { i: -1, a: {} };

  function host() { return document.getElementById('sw-sprievodca'); }
  function toTop() {
    var h = host(); if (!h) return;
    var top = h.getBoundingClientRect().top + window.pageYOffset - 110;
    if (Math.abs(window.pageYOffset - top) > 40) window.scrollTo({ top: top, behavior: 'smooth' });
  }

  function intro() {
    var h = host(); if (!h) return;
    var still = (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) ||
      (navigator.connection && navigator.connection.saveData);
    h.innerHTML = '<div class="swg__hero">' +
      /* klient 20. 10.: video prehrané raz zastalo uprostred pohybu tašky („freezne").
         Teraz slučka dopredu a späť (hero-silwa-loop.mp4), ako ostatné hero videá. */
      (still ? '' : '<video muted playsinline loop preload="metadata" disablepictureinpicture src="' + S.VIDEA + 'hero-silwa-loop.mp4"></video>') +
      '<div class="swg__hin"><div class="swg__panel">' +
      '<span class="swg__eyebrow">Nákupná asistentka Silwa</span>' +
      '<h1>Potrebujete pomôcť <em>s výberom?</em></h1>' +
      '<p class="swg__lead">Odpovedzte na štyri krátke otázky a ukážeme Vám najviac dva produkty, ' +
      'ktoré do zvolených oblastí zaradil Silwer.</p>' +
      '<ul class="swg__facts">' +
        '<li>' + CHECK + 'Trvá minútu</li><li>' + CHECK + 'Bez registrácie</li><li>' + CHECK + 'Odporúčanie hneď</li></ul>' +
      '<button type="button" class="swg__start" data-start>Začať →</button>' +
      '<p class="swg__fine">Nákupná asistentka pomáha s výberom produktu podľa Vašich preferencií. Neposkytuje ' +
      'zdravotné hodnotenie, diagnózu ani odporúčanie liečby.</p>' +
      '</div></div></div>';
    var v = h.querySelector('video');
    if (v) {
      v.addEventListener('playing', function () { v.classList.add('is-ready'); });
      var pr = v.play(); if (pr && pr.catch) pr.catch(function () {});
    }
    h.querySelector('[data-start]').onclick = function () { state.i = 0; render(); toTop(); };
  }

  function head() {
    return '<div class="swg__top">' +
      '<button type="button" class="swg__back" data-back>← Späť</button>' +
      '<div class="swg__segs" aria-hidden="true">' + Q.map(function (q, k) {
        return '<span class="swg__seg' + (k < state.i ? ' is-done' : (k === state.i ? ' is-cur' : '')) + '"></span>';
      }).join('') + '</div>' +
      '<span class="swg__cnt">' + (state.i < Q.length ? 'Otázka ' + (state.i + 1) + ' z ' + Q.length : 'Hotovo') + '</span></div>';
  }

  function render() {
    var h = host(); if (!h) return;
    if (state.i < 0) return intro();
    if (state.i >= Q.length) return renderResult();
    var q = Q[state.i];
    var multi = q.type === 'multi';
    var cur = state.a[q.id] || (multi ? [] : null);
    var ok = multi ? cur.length > 0 : !!cur;

    var opts = q.opts.map(function (o) {
      var on = multi ? cur.indexOf(o.v) >= 0 : cur === o.v;
      var attrs = ' data-v="' + o.v + '" role="' + (multi ? 'checkbox' : 'radio') + '" aria-checked="' + on + '"';
      if (q.id === 'need') {
        return '<button type="button" class="swg__tile' + (on ? ' is-on' : '') + '"' + attrs + ' style="--c:' + o.c +
          ';--img:url(&quot;' + S.ASSETS + 'oblast-' + o.ic + '.jpg&quot;)">' +
          '<span class="swg__th"></span><span class="swg__tw"><span class="swg__tt">' + o.l + '</span>' +
          '<span class="swg__td">' + o.d.replace(/(\S)-(\S)/g, '$1‑$2') + '</span></span>' +
          '<span class="swg__ck">' + CHECK + '</span></button>';
      }
      return '<button type="button" class="swg__card' + (on ? ' is-on' : '') + '"' + attrs + '>' +
        '<span class="swg__ci">' + (o.num || o.svg) + '</span><span class="swg__cw"><span class="swg__cl">' + o.l + '</span>' +
        (o.d ? '<span class="swg__cd">' + o.d + '</span>' : '') + '</span><span class="swg__ck">' + CHECK + '</span></button>';
    }).join('');

    h.innerHTML = '<div class="swg__steps"><div class="swg__in">' + head() +
      '<h2>' + q.t + '</h2>' + (q.s ? '<p class="swg__s">' + q.s + '</p>' : '') +
      (WHY[q.id] ? '<details class="swg__why"><summary>Prečo sa pýtame?</summary><p>' + WHY[q.id] + '</p></details>' : '') +
      '<div class="' + (q.id === 'need' ? 'swg__tiles' : 'swg__cards') + '" role="' + (multi ? 'group' : 'radiogroup') + '">' + opts + '</div>' +
      /* jednovýberové otázky pokračujú samy, tlačidlo má len viacnásobný výber */
      (multi ? '<div class="swg__nav"><button type="button" class="swg__next" data-next' + (ok ? '' : ' disabled') + '>Pokračovať →</button>' +
        '<span class="swg__hint">' + (cur.length ? 'Vybrané: ' + cur.length + ' z ' + q.max : 'Vyberte aspoň jednu oblasť') + '</span></div>' : '') +
      '</div></div>';

    h.querySelectorAll('[data-v]').forEach(function (b) {
      b.onclick = function () {
        var v = b.getAttribute('data-v');
        if (multi) {
          var arr = (state.a[q.id] || []).slice();
          var k = arr.indexOf(v);
          if (k >= 0) arr.splice(k, 1);
          else { if (arr.length >= q.max) arr.shift(); arr.push(v); }
          state.a[q.id] = arr;
          render();
        } else {
          state.a[q.id] = v;
          h.querySelectorAll('[data-v]').forEach(function (x) {
            var on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-checked', on);
          });
          setTimeout(function () { state.i++; render(); toTop(); }, 260);
        }
      };
    });
    var nx = h.querySelector('[data-next]');
    if (nx) nx.onclick = function () { if (!this.disabled) { state.i++; render(); toTop(); } };
    h.querySelector('[data-back]').onclick = function () { state.i--; render(); toTop(); };
  }

  /* Produkty mimo prvého radu majú lazy-load: v src je prázdne SVG
     (data:image/svg+xml), skutočná fotka je v data-src. */
  function imgUrl(img) {
    if (!img) return '';
    var u = [img.getAttribute('data-src'), img.getAttribute('src'), img.getAttribute('data-micro-image')]
      .filter(function (x) { return x && !/^data:/.test(x); })[0];
    return u ? u.replace(/\s+/g, '') : '';
  }

  /* Kandidáti oblasti: z jej kategórie v poradí, ktoré nastavil Silwer.
     Oblasť bez kategórie má v NEEDS zoznam produktov, tie sa načítajú z detailu. */
  function fromCategory(u, key) {
    return fetch(u).then(function (r) { return r.text(); }).then(function (t) {
      var doc = new DOMParser().parseFromString(t, 'text/html');
      var out = [];
      doc.querySelectorAll('.products .product').forEach(function (c) {
        var idEl = c.querySelector('[data-micro-product-id]');
        var a = c.querySelector('a.name');
        if (!idEl || !a) return;
        var pr = c.querySelector('[data-micro-price]');
        var rw = c.querySelector('[data-micro-rating-value]');
        var pid = c.querySelector('input[name="priceId"]');
        out.push({ id: idEl.getAttribute('data-micro-product-id'), priceId: pid ? pid.value : idEl.getAttribute('data-micro-product-id'),
          name: a.textContent.replace(/\s+/g, ' ').trim(), url: a.getAttribute('href'), img: imgUrl(c.querySelector('a.image img')),
          price: pr ? parseFloat(pr.getAttribute('data-micro-price')) : null,
          rating: rw ? parseFloat(rw.getAttribute('data-micro-rating-value')) : 0,
          reviews: rw ? parseInt(rw.getAttribute('data-micro-rating-count'), 10) : 0, need: key });
      });
      return out;
    });
  }
  function fromDetail(u, key) {
    return fetch(u).then(function (r) { return r.text(); }).then(function (t) {
      var doc = new DOMParser().parseFromString(t, 'text/html');
      var f = doc.getElementById('product-detail-form');
      var id = f && f.querySelector('input[name="productId"]'), pid = f && f.querySelector('input[name="priceId"]');
      var pm = doc.querySelector('[itemprop="offers"] [itemprop="price"]');
      var og = doc.querySelector('meta[property="og:image"]');
      var h1 = doc.querySelector('h1');
      var rw = doc.querySelector('[data-micro-rating-value]');
      if (!id || !h1) return [];
      return [{ id: id.value, priceId: pid ? pid.value : id.value, name: h1.textContent.replace(/\s+/g, ' ').trim(), url: u,
        img: og ? og.getAttribute('content') : '', price: pm ? parseFloat(pm.getAttribute('content')) : null,
        rating: rw ? parseFloat(rw.getAttribute('data-micro-rating-value')) : 0,
        reviews: rw ? parseInt(rw.getAttribute('data-micro-rating-count'), 10) : 0, need: key }];
    });
  }

  /* Z každej zvolenej oblasti jeden produkt. Radí sa PODĽA PORADIA V KATEGÓRII,
     nie podľa hodnotenia — to poradie si nastavuje Silwer v admine, takže je to
     ich editoriálne rozhodnutie, nie náš odhad. */
  function pick(keys, prefMini) {
    return Promise.all(keys.map(function (k) {
      var n = NEED[k]; if (!n) return Promise.resolve([]);
      var list = n[1] ? fromCategory(n[1], k)
        : (n[5] || []).reduce(function (ch, u) {
            return ch.then(function (acc) { return acc.length >= 3 ? acc : fromDetail(u, k).then(function (x) { return acc.concat(x); }); });
          }, Promise.resolve([]));
      return list.catch(function () { return []; });
    })).then(function (lists) {
      var chosen = [], seen = {};
      lists.forEach(function (list) {
        var pool = list.slice();
        if (prefMini) {
          var mini = pool.filter(function (p) { return /minitablet/i.test(p.name); });
          if (mini.length) pool = mini;
        }
        for (var i = 0; i < pool.length; i++) {
          if (!seen[pool[i].id]) { seen[pool[i].id] = 1; chosen.push(pool[i]); break; }
        }
      });
      return chosen;
    });
  }

  function addToCart(items) {
    return items.reduce(function (chain, it) {
      return chain.then(function () {
        var b = new URLSearchParams();
        b.set('productId', it.id);
        b.set('priceId', it.priceId || it.id);
        b.set('language', 'sk');
        b.set('amount', String(it.amount || 1));
        try { if (window.shoptet && shoptet.csrf && shoptet.csrf.token) b.set('__csrf__', shoptet.csrf.token); } catch (e) {}
        return fetch((window.shoptet && shoptet.config && shoptet.config.addToCartUrl) || '/action/Cart/addCartItem/', {
          method: 'POST', body: b, credentials: 'same-origin',
          headers: { 'X-Requested-With': 'XMLHttpRequest' }
        }).then(function (r) { return r.json().catch(function () { return {}; }); });
      });
    }, Promise.resolve());
  }

  function renderResult() {
    var h = host(); if (!h) return;
    var meds = state.a.meds;
    var keys = state.a.need || [];
    var amount = parseInt(state.a.len || '1', 10) || 1;
    var prefMini = state.a.form === 'mini';

    h.innerHTML = '<div class="swg__steps"><div class="swg__in">' + head() +
      '<h2>Hľadám pre Vás…</h2><div class="swg__load">Načítavam produkty zo Silwer katalógu</div></div></div>';

    pick(keys, prefMini).then(function (items) {
      items.forEach(function (i) { i.amount = amount; });
      var warn = '';
      if (meds === 'yes' || meds === 'dk') {
        warn = '<div class="swg__warn"><b>Beriete lieky? Poraďte sa najprv s lekárom.</b>' +
          '<p>Niektoré doplnky sa s liekmi neznášajú. Posúdiť to vie lekár alebo lekárnik, ' +
          'nie e-shop, a preto sme nič nevložili do košíka. Nižšie vidíte, čo do vami ' +
          'označených oblastí zaradil Silwer, ale najprv sa prosím poraďte.</p></div>';
      }
      var canAdd = items.length && meds === 'no';
      var unit = function (p) { return p.price != null ? p.price * ratio(p.url, amount) : null; };
      var anyDisc = items.some(function (p) { return ratio(p.url, amount) < 1; });
      var cards = items.map(function (p) {
        var n = NEED[p.need];
        var u = unit(p);
        return '<article class="swg__prod">' +
          '<a class="swg__pimg" href="' + p.url + '">' + (p.img ? '<img src="' + p.img + '" alt="" loading="lazy">' : '') + '</a>' +
          '<div class="swg__pb">' +
          (n ? '<span class="swg__for">' + S.needIc(n, 'swg__fic') + n[0] + '</span>' : '') +
          '<a class="swg__pn" href="' + p.url + '">' + p.name + '</a>' +
          (p.rating ? '<div class="swg__pr"><b>★★★★★</b> ' + String(p.rating).replace('.', ',') + ' · ' + p.reviews + ' hodnotení</div>' : '') +
          (u != null ? '<div class="swg__pp"><b>' + S.money(u) + '</b>' + (u < p.price - .001 ? '<s>' + S.money(p.price) + '</s>' : '') +
            '<span>za balenie' + (amount > 1 ? ' · ' + amount + (amount < 5 ? ' balenia' : ' balení') : '') + '</span></div>' : '') +
          /* pri liekoch sa nič nevkladá hromadne, ale produkt si človek po porade
             s lekárom musí vedieť otvoriť a kúpiť bežnou cestou */
          (canAdd ? '' : '<a class="swg__pd" href="' + p.url + '">Pozrieť produkt →</a>') +
          '</div></article>';
      }).join('');

      /* každý riadok zaokrúhlený ako v košíku Shoptetu */
      var total = items.reduce(function (a, p) { return a + Math.round((unit(p) || 0) * amount * 100) / 100; }, 0);
      /* klient 20. 10.: pri asistentke bez infolinky („Máte otázku… Zavolať"), poradenstvo
         nerobíme. Bez košíka (lieky) preto zostane len „Začať odznova". */
      var sum = !items.length ? '' : canAdd ? '<div class="swg__sum">' +
        '<div class="swg__tot">Spolu za ' + items.length + ' ' + (items.length === 1 ? 'produkt' : 'produkty') +
          (amount > 1 ? ', ' + amount + '× od každého' : '') + '<b>' + S.money(total) + '</b>' +
          (total >= S.CFG.freeShip ? '<span class="swg__ship">✓ Doprava zadarmo</span>' : '') + '</div>' +
        '<div class="swg__acts"><button type="button" class="sw-btn sw-btn--red" data-add>Vložiť do košíka</button>' +
        '<button type="button" class="swg__again" data-restart>Začať odznova</button></div></div>'
        : '<div class="swg__nav"><button type="button" class="swg__next" data-restart>Začať odznova</button></div>';

      h.innerHTML = '<div class="swg__steps"><div class="swg__in">' + head() +
        '<h2>' + (items.length ? 'Toto by sme Vám odporučili' : 'Nenašli sme vhodný produkt') + '</h2>' +
        '<p class="swg__s">' + (items.length
          ? 'Z každej oblasti, ktorú ste označili, prvý produkt podľa poradia Silweru' +
            (anyDisc ? ', ceny už s množstevnou zľavou.' : '.')
          : 'Skúste to prosím znova s inými oblasťami.') + '</p>' +
        warn +
        (items.length ? '<div class="swg__rgrid' + (items.length === 1 ? ' swg__rgrid--1' : '') + '">' + cards + '</div>' : '') +
        sum +
        (items.length ? '' : '<div class="swg__nav"><button type="button" class="swg__next" data-restart>Začať odznova</button></div>') +
        '<p class="swg__note">Výživové doplnky nie sú náhradou pestrej a vyváženej stravy ' +
        'a zdravého životného štýlu. Odporúčanie vychádza z toho, do ktorej kategórie produkt ' +
        'zaradil Silwer. Nie je to zdravotná rada.</p></div></div>';

      h.querySelector('[data-back]').onclick = function () { state.i = Q.length - 1; render(); toTop(); };
      var add = h.querySelector('[data-add]');
      if (add) add.onclick = function () {
        add.disabled = true;
        add.textContent = 'Vkladám…';
        addToCart(items).then(function () {
          h.querySelector('.swg__sum').insertAdjacentHTML('beforebegin',
            '<div class="swg__ok">✓ Vložené do košíka. Môžete pokračovať k objednávke.</div>');
          add.outerHTML = '<a class="sw-btn sw-btn--red" href="/kosik/">Prejsť do košíka →</a>';
          try { if (window.shoptet && shoptet.cart && shoptet.cart.getCartContent) shoptet.cart.getCartContent(); } catch (e) {}
        }).catch(function () {
          add.disabled = false;
          add.textContent = 'Skúsiť znova';
        });
      };
      h.querySelectorAll('[data-restart]').forEach(function (rs) { rs.onclick = function () { state = { i: 0, a: {} }; render(); toTop(); }; });
    });
  }

  function boot() {
    var h = host();
    /* Vypnutá asistentka: stránku /sprievodca/ (a starý ?sprievodca=1) nikto
       neuvidí prázdnu, ide sa na úvodnú. Stránku v admine skryje klient. */
    if (!S.CFG.assistant) {
      if (h || /[?&]sprievodca=1/.test(location.search)) location.replace('/');
      return;
    }
    /* ?sprievodca=1 bol náhľad z čias pred stránkou /sprievodca/. Dve URL
       s rôznym vzhľadom mätú, staré odkazy preto idú na skutočnú stránku. */
    if (!h && /[?&]sprievodca=1/.test(location.search)) {
      location.replace(S.CFG.guideUrl);
      return;
    }
    if (!h) return;
    if (!h.classList.contains('swg')) h.classList.add('swg');
    /* Na Shoptet stránke sedí sprievodca vnútri článku: 760 px stĺpec,
       nadpis stránky a typografia článku. Stránka sa preto prepne na celú šírku. */
    if (h.closest('.pageArticleDetail')) document.body.classList.add('sw-guidepage');
    /* kontajner článku nie je presne v strede okna (o pár px), preto sa ľavý
       okraj meria, nie počíta */
    var sbw = function () {
      var de = document.documentElement;
      de.style.setProperty('--sw-sbw', (window.innerWidth - de.clientWidth) + 'px');
      de.style.setProperty('--sw-gl', -Math.round(h.getBoundingClientRect().left + window.pageXOffset) + 'px');
    };
    sbw(); window.addEventListener('resize', sbw);
    render();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();

/* ============================================================================
   MODUL: SLOVNÍK  (texty, ktoré klient nechce)
   ----------------------------------------------------------------------------
   Feedback 7. 10.: v popupe po zadaní e-mailu sa súhlas s newsletterom pýta na
   „parádne akcie" — slovo „parádne" tam nechcú. Text nie je v kóde e-shopu ani
   v načítaných skriptoch (overené 7. 10.), prichádza až po odoslaní e-mailu
   (pravdepodobne Leadhub alebo súhlas v pokladni). Správna oprava je v jeho
   nastaveniach — toto je poistka, ktorá slovo vyškrtne, keď sa text objaví
   v stránke. Do iframe nedosiahne.
   ========================================================================== */
(function () {
  'use strict';
  var RE = /\s*\bpar[áa]dn(e|y|ych|ých|ymi|ými|á|é|ú|ou)\b/gi;
  function clean(root) {
    if (!root || !root.textContent || root.textContent.search(/par[áa]dn/i) < 0) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n;
    while ((n = w.nextNode())) if (/par[áa]dn/i.test(n.nodeValue)) n.nodeValue = n.nodeValue.replace(RE, '');
  }
  function start() {
    clean(document.body);
    new MutationObserver(function (ms) {
      ms.forEach(function (m) {
        m.addedNodes.forEach(function (x) {
          if (x.nodeType === 1) clean(x);
          else if (x.nodeType === 3 && /par[áa]dn/i.test(x.nodeValue)) x.nodeValue = x.nodeValue.replace(RE, '');
        });
      });
    }).observe(document.body, { childList: true, subtree: true });
  }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();

/* ============================================================================
   MODUL: PRIHLÁSENIE A REGISTRÁCIA  (/login/, /registracia/, zabudnuté heslo)
   ----------------------------------------------------------------------------
   Feedback 7. 10.: „predizajnovať, zosúladiť fonty, celý formulár je vyosený,
   hlavne na mobile". Shoptet tu má bielu kartu bez vnútorného okraja (formulár
   lepil na hranu), polia 440 px v 820 px karte zarovnané vľavo, červené
   obrysové tlačidlo a červené odkazy. Teraz vycentrovaná karta, jedno písmo,
   polia cez celú šírku karty. Polia, ich poradie a odoslanie sa nemenia.
   ========================================================================== */
(function () {
  'use strict';
  var S = window.SW; if (!S) return;
  if (!(S.body('in-login') || S.body('in-registracia') || S.body('in-zabudnute-heslo'))) return;

  var A = '#content';
  S.addStyle('account', [
    /* téma tu kreslí bielu kartu so stieňom už na #content (820 px) — karta
       v karte; kartou je len .content-inner */
    'main' + A + '{background:none!important;box-shadow:none!important;max-width:none!important;border:0!important}',
    A + ' .form-control-wrapper{max-width:none!important;width:100%!important}',
    A + ' .alternative-links{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px 20px;margin:18px 0 0!important;',
    'padding-top:16px;border-top:1px solid var(--sw-line);font-size:14.5px;font-weight:600}',
    A + ' .alternative-links a{color:var(--sw-ink)!important;text-decoration:underline!important;text-underline-offset:3px}',
    A + ' .content-inner{max-width:560px!important;width:100%;margin:clamp(16px,3vw,32px) auto clamp(36px,5vw,64px)!important;',
    'background:#fff!important;border:1px solid var(--sw-line)!important;border-radius:18px!important;',
    'padding:clamp(22px,4vw,44px)!important;box-shadow:none!important;box-sizing:border-box}',
    A + ' h1{font-size:clamp(28px,3vw,38px)!important;font-weight:700!important;letter-spacing:-.02em;line-height:1.15!important;',
    'color:var(--sw-ink)!important;text-align:left!important;margin:0 0 22px!important}',
    A + ' form{width:100%!important;max-width:none!important;margin:0!important;float:none!important}',
    A + ' form fieldset{border:0!important;padding:0!important;margin:0 0 26px!important;background:none!important;box-shadow:none!important}',
    A + ' form h2,' + A + ' form h3{font-size:16px!important;font-weight:700!important;letter-spacing:0!important;',
    'text-transform:none!important;color:var(--sw-ink)!important;text-align:left!important;margin:0 0 12px!important}',
    A + ' .form-legend{text-align:left!important;font-size:13px!important;color:var(--sw-muted)!important;margin:0 0 12px!important}',
    A + ' .form-group{margin:0 0 14px!important;padding:0!important;width:100%!important;max-width:none!important}',
    A + ' form label:not(.sr-only *){display:block;font-size:14px!important;font-weight:600!important;color:var(--sw-ink)!important;',
    'margin:0 0 6px!important;font-family:var(--sw-font)!important;text-align:left!important}',
    A + ' .form-control{width:100%!important;max-width:none!important;height:48px!important;border:1px solid var(--sw-line)!important;',
    'border-radius:10px!important;padding:0 14px!important;font-size:16px!important;font-family:var(--sw-font)!important;',
    'color:var(--sw-ink)!important;background:#fff!important;box-shadow:none!important;box-sizing:border-box}',
    A + ' .form-control:focus{border-color:var(--sw-ink)!important;outline:0}',
    /* captcha: obrázok a krátke pole pod ním */
    A + ' form img{display:block;max-width:100%;height:auto;border-radius:8px;margin:0 0 10px}',
    A + ' .form-control.short{max-width:200px!important}',
    /* zaškrtávacie políčko na jeden riadok s textom */
    A + ' form label.whole-width{display:flex!important;align-items:center;gap:10px;font-weight:500!important;cursor:pointer}',
    A + ' form input[type="checkbox"]{width:20px;height:20px;margin:0!important;flex:0 0 auto;accent-color:var(--sw-ink)}',
    A + ' form .label,' + A + ' .consents{font-size:13.5px!important;line-height:1.55!important;color:var(--sw-muted)!important;text-align:left!important}',
    A + ' form a,' + A + ' .content-inner > a,' + A + ' .login-wrapper a{color:var(--sw-ink)!important;text-decoration:underline!important;',
    'text-underline-offset:3px}',
    /* tlačidlo: plné, cez celú šírku, tmavé (menej červenej), červené pri hoveri */
    A + ' form .btn,' + A + ' form button[type="submit"]{width:100%!important;height:52px!important;border-radius:10px!important;',
    'background:var(--sw-ink)!important;color:#fff!important;border:0!important;font-size:16px!important;font-weight:700!important;',
    'text-transform:none!important;box-shadow:none!important;padding:0 20px!important;margin:6px 0 0!important}',
    A + ' form .btn:hover,' + A + ' form button[type="submit"]:hover{background:var(--sw-red)!important}',
    A + ' .submit-wrapper{margin:6px 0 0!important}',
    '@media(max-width:600px){' + A + ' .content-inner{border-radius:14px!important;margin:12px auto 32px!important}}'
  ].join(''));

})();

/* ============================================================================
   MODUL: HODNOTENIA, BLOG, STRÁNKOVANIE
   ----------------------------------------------------------------------------
   /hodnotenie-obchodu/ a /blog/ zostali na Shoptet defaulte: šedé karty,
   súhrn roztiahnutý cez celú šírku, text blogu napísaný CEZ fotku kampane.
   Prestavujú sa do rovnakej reči ako úvodná stránka. Obsah ani poradie sa
   nemení, len vzhľad. Stránkovanie je spoločné pre všetky výpisy.
   ========================================================================== */
(function () {
  'use strict';
  var S = window.SW; if (!S) return;

  var R = 'body.in-hodnotenie-obchodu ';
  var B = 'body.type-posts-listing ';

  S.addStyle('listings', [
    /* ---------- stránkovanie (kategórie, blog, hodnotenia) ---------- */
    '.listingControls{display:flex!important;flex-wrap:wrap;align-items:center;justify-content:space-between;',
    'gap:14px 20px;margin:8px 0 44px!important;padding:0!important}',
    '.listingControls .itemsTotal{order:1;flex:0 0 auto!important;width:auto!important;font-size:14.5px!important;',
    'color:var(--sw-muted)!important;margin:0!important;text-align:left!important}',
    '.listingControls .pagination{order:2;flex:0 0 auto!important;width:auto!important;margin:0!important;padding:0!important}',
    '.listingControls .goToTop{order:3;flex:0 0 auto!important;width:auto!important;margin:0!important}',
    '.pagination__list{display:flex!important;align-items:center;gap:6px;margin:0!important;padding:0!important;list-style:none}',
    '.pagination__list>li{margin:0!important;padding:0!important}',
    '.pagination__list a,.pagination__currentPage{min-width:44px;height:44px;display:inline-flex!important;',
    'align-items:center;justify-content:center;padding:0 12px!important;border-radius:10px!important;',
    'border:1px solid var(--sw-line)!important;background:#fff!important;color:var(--sw-ink)!important;',
    'font-weight:700!important;font-size:15px!important;text-decoration:none!important;box-shadow:none!important;',
    'margin:0!important;line-height:1!important}',
    '.pagination__list a::before,.pagination__list a::after{color:var(--sw-ink)!important}',
    '.pagination__list a:hover{border-color:var(--sw-ink)!important;background:#fff!important}',
    '.pagination__currentPage{background:var(--sw-ink)!important;border-color:var(--sw-ink)!important;color:#fff!important}',
    '.goToTop__button{height:44px;display:inline-flex!important;align-items:center;gap:6px;padding:0 16px!important;',
    'border-radius:10px!important;border:1px solid var(--sw-line)!important;background:#fff!important;',
    'color:var(--sw-ink)!important;font-weight:700!important;font-size:15px!important;box-shadow:none!important;',
    'text-transform:none!important}',
    '.goToTop__button:hover{border-color:var(--sw-ink)!important}',
    '.goToTop__button::before{color:var(--sw-ink)!important}',

    /* ---------- spoločný nadpis stránky (dve váhy ako „Čo Vás trápi?") ---------- */
    R + '#content h1,' + B + '.sectionDescription h1{font-size:clamp(32px,3.8vw,48px)!important;',
    'font-weight:300!important;letter-spacing:-.02em!important;line-height:1.08!important;',
    'color:var(--sw-ink)!important;text-align:left!important;margin:clamp(20px,3vw,34px) 0 12px!important}',
    R + '#content h1{margin-bottom:26px!important}',
    R + '#content h1 b,' + B + '.sectionDescription h1 b{font-weight:700}',
    '.sw-pagesub{font-size:17px;line-height:1.55;color:var(--sw-muted);margin:0 0 30px;max-width:62ch}',

    S.ratingCss(R, R + '#content #ratingsList'),

    /* ---------- /blog/ ---------- */
    B + '.sectionDescription{margin:0!important;padding:0!important;text-align:left!important}',
    B + '#newsWrapper{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;',
    'width:100%!important;margin:0 0 36px!important;padding:0!important}',
    B + '#newsWrapper::before,' + B + '#newsWrapper::after{display:none!important;content:none!important}',
    S.newsCss(B + '#newsWrapper'),
    /* najnovší článok ako veľká karta cez celý rad: fotka vľavo, text vpravo */
    '@media(min-width:768px){',
    B + '#newsWrapper>.news-item:first-child{grid-column:1/-1}',
    B + '#newsWrapper>.news-item:first-child>a{display:grid!important;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr)}',
    B + '#newsWrapper>.news-item:first-child .image{aspect-ratio:auto;height:100%!important;min-height:320px}',
    B + '#newsWrapper>.news-item:first-child .text{padding:clamp(24px,3.4vw,44px)!important;justify-content:center;gap:12px}',
    B + '#newsWrapper>.news-item:first-child .text .title{font-size:clamp(22px,2.4vw,30px)!important;',
    'letter-spacing:-.02em;line-height:1.2!important;-webkit-line-clamp:4}',
    B + '#newsWrapper>.news-item:first-child .text .description{font-size:16px!important;-webkit-line-clamp:4}',
    B + '#newsWrapper>.news-item:first-child .read-article{margin-top:10px!important;font-size:15.5px!important}}',
    '@media(max-width:1000px){' + B + '#newsWrapper{grid-template-columns:repeat(2,minmax(0,1fr))}}',
    '@media(max-width:600px){' + B + '#newsWrapper{grid-template-columns:minmax(0,1fr);gap:14px}}'
  ].join(''));

  function init() {
    /* nadpisy s dvomi váhami; text sa nemení, len sa zvýrazní druhé slovo */
    /* „Hodnotenie e-shopu" namiesto „Hodnotenie obchodu" (Ján 22. 10.). Predtým
       „Hodnotenie od zákazníkov" (feedback 7. 10.), lenže na detaile je nad popisom
       aj panel recenzií produktu „Čo hovoria zákazníci" a dva bloky o zákazníkoch
       splývali. Tento widget hodnotí obchod, nie produkt. */
    var wh = document.querySelector('#hodnoceniobchodu>h2 a');
    if (wh && !wh.querySelector('b') && /^\s*Hodnotenie obchodu\s*$/.test(wh.textContent)) {
      wh.innerHTML = 'Hodnotenie <b>e-shopu</b>';
    }
    if (S.body('in-hodnotenie-obchodu')) {
      var h = document.querySelector('#content h1');
      if (h && !h.querySelector('b') && /^\s*Hodnotenie obchodu\s*$/.test(h.textContent)) {
        h.innerHTML = 'Hodnotenie <b>e-shopu</b>';
      }
    }
    if (S.body('type-posts-listing')) {
      var bh = document.querySelector('.sectionDescription h1');
      if (bh && !bh.querySelector('b')) bh.innerHTML = '<b>' + bh.textContent.trim() + '</b>';
      /* podnadpis je ten istý ako pri blogu na úvodnej stránke */
      if (bh && !document.querySelector('.sw-pagesub')) {
        bh.insertAdjacentElement('afterend', S.el('p', 'sw-pagesub',
          'Žiadne zázraky a žiadny strach, len zrozumiteľné vysvetlenia.'));
      }
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  document.addEventListener('ShoptetDOMPageContentLoaded', init);
  /* widget hodnotení sa do stránky presúva až po načítaní */
  [800, 2000, 4000].forEach(function (d) { setTimeout(init, d); });
})();

/* ============================================================================
   MODUL: TEXTOVÉ STRÁNKY  (body.type-page, články, návody)
   ----------------------------------------------------------------------------
   Stránky ako /longevity/ majú 38 odsekov v 707 px širokom stĺpci s riadkovaním
   1,5 a písmom 16 px. Pri cieľovke 50+ je to na dlhé čítanie nepohodlné —
   riadok je dlhý a text hustý.

   Mení sa LEN typografia a priestor. Do obsahu sa nesiaha.
   ========================================================================== */
(function () {
  'use strict';
  var S = window.SW; if (!S) return;
  if (!(S.body('type-page') || S.body('type-article') || document.querySelector('.pageArticleDetail'))) return;

  S.addStyle('textpage', [
    /* meradlo riadku ~68 znakov je pohodlné maximum na čítanie */
    '.pageArticleDetail,.type-page .content-inner>article{max-width:760px;margin:0 auto;',
    'padding:0 4px 40px;box-sizing:border-box}',

    '.pageArticleDetail p{font-size:17.5px!important;line-height:1.75!important;',
    'color:var(--sw-text);margin:0 0 20px;max-width:68ch}',
    '.pageArticleDetail li{font-size:17.5px;line-height:1.7;margin-bottom:9px}',
    '.pageArticleDetail ul,.pageArticleDetail ol{padding-left:22px;margin:0 0 22px;max-width:68ch}',

    /* nadpisy: hierarchia a dýchanie */
    '.pageArticleDetail h1{font-size:clamp(30px,3.6vw,44px)!important;font-weight:700!important;',
    'line-height:1.12;letter-spacing:-.02em;color:var(--sw-ink);margin:0 0 20px!important;text-align:left!important}',
    '.pageArticleDetail h2{font-size:clamp(23px,2.6vw,30px)!important;font-weight:700!important;',
    'line-height:1.2;letter-spacing:-.015em;color:var(--sw-ink);margin:46px 0 14px!important;text-align:left!important}',
    '.pageArticleDetail h3{font-size:20px!important;font-weight:700!important;line-height:1.3;',
    'color:var(--sw-ink);margin:34px 0 10px!important;text-align:left!important}',
    /* druhý H1 v tele textu je sémanticky zle, ale opraviť sa to má v obsahu,
       nie skriptom — tu sa aspoň zobrazí ako podnadpis, nie ako druhý titul */
    '.pageArticleDetail h1~h1{font-size:clamp(23px,2.6vw,30px)!important;font-weight:700!important;',
    'margin:46px 0 14px!important}',

    /* zvýraznenia a odkazy */
    '.pageArticleDetail strong,.pageArticleDetail b{color:var(--sw-ink);font-weight:700}',
    '.pageArticleDetail a{color:var(--sw-ink);text-decoration:underline;text-underline-offset:3px;',
    'text-decoration-thickness:1px}',
    '.pageArticleDetail a:hover{color:var(--sw-red)}',

    /* obrázky a tabuľky nech nevytŕčajú */
    '.pageArticleDetail img{max-width:100%;height:auto;border-radius:10px;margin:8px 0 22px}',
    '.pageArticleDetail table{width:100%;border-collapse:collapse;margin:0 0 26px;font-size:15px;display:block;overflow-x:auto}',
    '.pageArticleDetail th,.pageArticleDetail td{border:1px solid var(--sw-line);padding:10px 12px;text-align:left}',
    '.pageArticleDetail th{background:var(--sw-field);font-weight:700}',
    '.pageArticleDetail blockquote{margin:0 0 24px;padding:16px 20px;border-left:3px solid var(--sw-red);',
    'background:var(--sw-field);border-radius:0 10px 10px 0;font-size:17px;line-height:1.65}',

    /* nadpis stránky nad článkom */
    'body.type-page #content h1:first-of-type{text-align:left!important}',

    /* ručne číslovaný zoznam poskladaný zo samostatných odsekov */
    '.sw-numlist{counter-reset:none;margin:0 0 26px;display:flex;flex-direction:column;gap:2px}',
    '.sw-numlist__item{display:flex;gap:16px;padding:14px 0;border-top:1px solid var(--sw-line)}',
    '.sw-numlist__item:first-child{border-top:0}',
    '.sw-numlist__n{flex:0 0 34px;width:34px;height:34px;border-radius:50%;background:var(--sw-ink);',
    'color:#fff;font-weight:700;font-size:15px;display:flex;align-items:center;justify-content:center;margin-top:2px}',
    '.sw-numlist__t{margin:0!important;font-size:17px!important;line-height:1.7!important;max-width:64ch}',
    '.sw-numlist__t b,.sw-numlist__t strong{color:var(--sw-ink)}',
    '@media(max-width:767px){.sw-numlist__item{gap:12px}.sw-numlist__n{flex:0 0 29px;width:29px;height:29px;font-size:14px}}',

    '@media(max-width:767px){.pageArticleDetail{padding:0 2px 30px}',
    '.pageArticleDetail p,.pageArticleDetail li{font-size:16.5px!important;line-height:1.7!important}',
    '.pageArticleDetail h2{margin:34px 0 12px!important}}'
  ].join(''));

  /* Na /longevity/ (a podobných stránkach) je číslovaný zoznam napísaný ručne:
     jeden odsek obsahuje len „1.", text je v ďalšom odseku. Vyzerá to rozbito.
     Tu sa dvojice spoja do jedného riadku s číslom v krúžku.
     ⚠️ Je to len zobrazenie — správne sa to opraví v obsahu prepísaním na
     skutočný číslovaný zoznam (<ol>) v editore stránky. */
  function fixManualNumbering() {
    var art = document.querySelector('.pageArticleDetail');
    if (!art || art.getAttribute('data-sw-num')) return;
    art.setAttribute('data-sw-num', '1');

    var nodes = [].slice.call(art.querySelectorAll('p'));
    var i = 0;
    while (i < nodes.length) {
      var p = nodes[i];
      if (!p.parentNode || !/^\s*\d{1,2}[.)]\s*$/.test(p.textContent || '')) { i++; continue; }

      /* nazbieraj celú súvislú sériu číslo + text */
      var list = document.createElement('div');
      list.className = 'sw-numlist';
      p.parentNode.insertBefore(list, p);

      while (i < nodes.length) {
        var num = nodes[i];
        if (!num.parentNode || !/^\s*\d{1,2}[.)]\s*$/.test(num.textContent || '')) break;
        var body = num.nextElementSibling;
        if (!body || body.tagName !== 'P') break;

        var item = document.createElement('div');
        item.className = 'sw-numlist__item';
        var badge = document.createElement('span');
        badge.className = 'sw-numlist__n';
        badge.textContent = num.textContent.trim().replace(/[.)]$/, '');
        body.classList.add('sw-numlist__t');
        item.appendChild(badge);
        num.remove();
        item.appendChild(body);
        list.appendChild(item);
        i += 2;
      }
      if (!list.children.length) list.remove();
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fixManualNumbering);
  else fixManualNumbering();
  document.addEventListener('ShoptetDOMPageContentLoaded', fixManualNumbering);
})();

/* ============================================================================
   MODUL: MOBILNÁ NAVIGÁCIA  (< 768 px)
   ----------------------------------------------------------------------------
   Desktop dostal nový sub-navbar, ale mobil zostal na pôvodnom plochom zozname
   trinástich položiek. Tento modul prestavia obsah Shoptetovho drawera na tú
   istú štruktúru ako desktop: Hľadám niečo na / Pre koho / Produkty /
   Superzľavy / Silwer Gold / Silwer JOJ Play / Blog / O nás, s rozbaľovaním.

   Používa sa Shoptetov vlastný drawer aj jeho otváranie — prepisuje sa len
   obsah zoznamu. Blok ul.navigationActions (prihlásenie a spol.) zostáva.
   Žiadny odkaz sa nestráca, všetkých pôvodných 13 je vnútri skupín.
   ========================================================================== */
(function () {
  'use strict';
  var S = window.SW; if (!S) return;

  S.addStyle('mobilenav', [
    '@media(max-width:767px){',
    '#navigation .menu-level-1{padding:6px 0 10px!important;margin:0!important;list-style:none}',
    /* Téma dáva každému <li> v menu vlastnú kartu (border 1px, radius 8px,
       margin 8px 16px). Náš zoznam je plochý s deliacimi linkami, takže sa to
       bilo — a pri telefónnom tlačidle z toho bol červený prúžok vnorený
       v bielej karte. Rovnaká karta je aj na „Prihlásenie", ktoré žije
       v samostatnom ul.navigationActions. */
    '#navigation .menu-level-1>li,#navigation .navigationActions>li{',
    'border:0!important;border-radius:0!important;margin:0!important;padding:0!important;',
    'background:none!important;box-shadow:none!important}',
    /* deliacu linku si vraciame späť, plošný reset ju zhodil aj nám */
    '#navigation .menu-level-1>li.sw-m{border-bottom:1px solid var(--sw-line)!important}',
    '#navigation .navigationActions>li>a{display:flex!important;align-items:center;',
    'min-height:52px;padding:15px 18px!important;font-size:16.5px;font-weight:700;',
    'color:var(--sw-ink)!important;text-decoration:none!important}',
    '.sw-m{border-bottom:1px solid var(--sw-line)}',
    '.sw-m__row{display:flex;align-items:center;justify-content:space-between;gap:12px;',
    'width:100%;padding:15px 18px;background:none;border:0;font-family:inherit;font-size:16.5px;',
    'font-weight:700;color:var(--sw-ink);text-align:left;text-decoration:none;cursor:pointer;',
    'min-height:52px;box-sizing:border-box}',
    '.sw-m__row:hover,.sw-m__row:focus{color:var(--sw-red);text-decoration:none}',
    '.sw-m__chev{transition:transform .2s;flex:0 0 auto;opacity:.5}',
    '.sw-m.is-open>.sw-m__row .sw-m__chev{transform:rotate(180deg)}',
    '.sw-m__sub{display:none;padding:0 0 10px;background:var(--sw-field)}',
    '.sw-m.is-open>.sw-m__sub{display:block}',
    /* téma vnucuje odkazom v menu display:block, preto !important aj smer */
    '.sw-m__sub a{display:flex!important;flex-direction:row!important;align-items:center!important;',
    'gap:12px;padding:11px 18px!important;font-size:15.5px;font-weight:600;color:var(--sw-text);',
    'text-decoration:none;min-height:46px;box-sizing:border-box;width:100%}',
    '.sw-m__sub a:hover{color:var(--sw-red);text-decoration:none}',
    /* Piktogram oblasti, nie fotka. Fotky z Unsplashu sa na mobile zobrazovali
       namiesto piktogramov (Braňo Liška, feedback 7. 10.).
       Téma dáva odkazom v menu vlastné rozmery, preto !important a pevný flex-basis. */
    '.sw-m__ic{width:34px!important;height:34px!important;min-width:34px;flex:0 0 34px!important;',
    'border-radius:9px;display:flex!important;align-items:center;justify-content:center}',
    '.sw-m__ic svg{width:19px;height:19px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}',
    /* téma odkazom v menu vracia text-transform:none, preto vyššia špecificita
       (feedback 12. 10.: verzálky ako na desktope aj pri odkazoch bez podmenu) */
    '#navigation .menu-level-1 .sw-m__row{text-transform:uppercase!important;letter-spacing:.03em;font-size:15px!important;',
    'padding:15px 18px!important}',
    '.sw-m__ic.sw-ic--ph{width:42px!important;height:42px!important;min-width:42px;flex:0 0 42px!important;border-radius:10px}',
    '.sw-m__extra{padding:14px 18px 6px;font-size:13.5px;color:var(--sw-muted);line-height:2}',
    '.sw-m__extra a{display:inline!important;padding:0!important;margin:0!important;',
    'min-height:0!important;height:auto!important;color:var(--sw-ink);font-weight:700;',
    'text-decoration:underline;text-underline-offset:3px;font-size:13.5px}',
    /* téma odkazom v menu vnucuje padding:0 16px a width:32px */
    '#navigation .menu-level-1 .sw-m__tel{display:flex!important;align-items:center!important;',
    'justify-content:center!important;gap:10px;margin:16px 18px 10px!important;',
    'padding:15px 18px!important;width:auto!important;min-height:52px;box-sizing:border-box;',
    'border-radius:10px!important;background:var(--sw-red)!important;color:#fff!important;',
    'font-weight:700;font-size:16px;text-decoration:none!important;border:0!important}',
    '#navigation .menu-level-1 .sw-m__tel:hover{background:var(--sw-red-deep)!important;',
    'color:#fff!important;text-decoration:none!important}',
    '}'
  ].join(''));

  var CHEV = '<svg class="sw-m__chev" width="13" height="13" viewBox="0 0 24 24" fill="none" ' +
    'stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M5 9l7 7 7-7"/></svg>';

  function group(label, rows) {
    return '<li class="sw-m" data-group>' +
      '<button type="button" class="sw-m__row">' + label + CHEV + '</button>' +
      '<div class="sw-m__sub">' + rows + '</div></li>';
  }
  function plain(label, href) {
    return '<li class="sw-m"><a class="sw-m__row" href="' + href + '">' + label + '</a></li>';
  }

  function build() {
    if (window.innerWidth > 767) return;
    var list = document.querySelector('#navigation .menu-level-1');
    if (!list || list.getAttribute('data-sw-mobile')) return;
    list.setAttribute('data-sw-mobile', '1');

    var needs = S.NEEDS.map(function (n) {
      return '<a href="' + S.needHref(n) + '">' + S.needIc(n, 'sw-m__ic') + '<span>' + n[0] + '</span></a>';
    }).join('') +
    '<div class="sw-m__extra">Ďalej: ' +
      S.EXTRA.map(function (e) { return '<a href="' + e[1] + '">' + e[0] + '</a>'; }).join(' · ') + '</div>';

    var prekoho = S.PREKOHO.map(function (p) { return '<a href="' + p[1] + '">' + p[0] + '</a>'; }).join('');
    var produkty = S.PRODUKTY.map(function (p) { return '<a href="' + p[1] + '">' + p[0] + '</a>'; }).join('');

    list.innerHTML =
      group('Hľadám niečo na', needs) +
      group('Pre koho', prekoho) +
      group('Produkty', produkty) +
      S.MENU.map(function (m) {
        return m[2] ? group(m[0], m[2].map(function (x) { return '<a href="' + x[1] + '">' + x[0] + '</a>'; }).join(''))
          : plain(m[0], m[1]);
      }).join('') +
      '<li><a class="sw-m__tel" href="' + S.CFG.telHref + '">' +
      '<i class="icon-phone"></i>' + S.CFG.tel + '</a></li>';

    list.querySelectorAll('[data-group] > .sw-m__row').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var li = btn.parentNode;
        var open = li.classList.contains('is-open');
        list.querySelectorAll('[data-group]').forEach(function (x) { x.classList.remove('is-open'); });
        if (!open) li.classList.add('is-open');
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
  document.addEventListener('ShoptetDOMPageContentLoaded', build);
  window.addEventListener('resize', function () {
    if (window.innerWidth <= 767) build();
  });
})();
