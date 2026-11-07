/* Silwer.sk UX — sticky Do košíka + progress v košíku (07/2026, v18)
   Nahrať ako súbor do administrácie, do Pätičky vložiť:
   <script src="URL_SUBORU?v=18" defer></script> */
(function(){'use strict';
/* --- CSS (injektuje sa z JS, netreba nič do hlavičky) --- */
var css='.s-cta{position:fixed;z-index:1050;background:#fff;box-shadow:0 4px 24px rgba(0,0,0,.18);display:flex;align-items:center;gap:12px;opacity:0;visibility:hidden;transition:.25s}'+
'.s-cta.on{opacity:1;visibility:visible}'+
'.s-cta img{width:56px;height:56px;object-fit:contain;border-radius:6px}'+
'.s-cta .nm{font-size:15px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px}'+
'.s-cta .pc{font-size:18px;font-weight:700;white-space:nowrap}'+
'.s-cta button{background:#c00a26;color:#fff;border:0;border-radius:6px;padding:14px 22px;font-size:15px;font-weight:700;cursor:pointer;white-space:nowrap}'+
'@media(min-width:768px){.s-cta{right:24px;bottom:24px;border-radius:12px;padding:12px 14px}}'+
'@media(max-width:767px){.s-cta{left:0;right:0;bottom:0;padding:10px 14px}.s-cta img{width:44px;height:44px}.s-cta .nm{display:none}.s-cta button{flex:1}}'+
'body:has(.cart-window,.shp-cart-window,[class*="cart-window"]) .s-cta{display:none!important}'+
/* Mobil: plávajúci Google recenzie widget prekrýva obsah a menu */
'@media(max-width:767px){[id*="google-reviews"],[class*="shopstack"],a[href*="maps.google.com"][class*="badge"]{display:none!important}}'+
'.s-goal{margin:18px 0 0;font-size:14px;line-height:1.45}'+
'.ordering-process .extras-wrap .extra.delivery,.ordering-process .extras-wrap .extra.gift{display:none!important}'+
'.s-goal>div{margin-bottom:12px}'+
'.s-goal>div:last-child{margin-bottom:0}'+
'.s-goal .bar{height:14px;background:#e6e6e6;border-radius:7px;margin-top:6px;overflow:hidden}'+
'.s-goal .fill{height:100%;background:#c00a26;border-radius:7px;transition:width .4s}'+
'.s-goal .ok{color:#2e9e44;font-weight:700}'+
'.s-goal .ok .fill{background:#2e9e44}'+
'.s-goal--popup{margin:12px 0 0}'+
'.s-rev{position:relative}'+
'.s-rev__track{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;scrollbar-width:none;padding:4px}'+
'.s-rev__track::-webkit-scrollbar{display:none}'+
'.s-rev__track .latest-contribution-inner{flex:0 0 calc(50% - 8px)!important;scroll-snap-align:start;background:#f7f7f7;border-radius:10px;padding:16px;margin:0!important}'+
'@media(max-width:767px){.s-rev__track .latest-contribution-inner{flex:0 0 90%!important}}'+
'.latest-contribution-wrapper,.latest-contribution-rating,.s-rev,.s-rev__track{min-width:0;max-width:100%}'+
'.homepage-latest-contribution{overflow-x:clip}'+
'#content .homepage-latest-contribution-full-width{order:7!important}'+
'#content #napisali-o-nas{order:8!important}'+
'.s-rev__nav{position:absolute;top:50%;transform:translateY(-50%);width:40px;height:40px;border-radius:50%;border:0;background:#fff;box-shadow:0 2px 10px rgba(0,0,0,.2);font-size:18px;cursor:pointer;z-index:5}'+
'.s-rev__nav--l{left:-8px}.s-rev__nav--r{right:-8px}'+
/* Príznaky produktov – pilulky s ikonou (farby uprav tu) */
'.flags .flag,.flags .flag.flagdone{display:inline-flex;align-items:center;gap:5px;width:auto;max-width:max-content;border-radius:999px!important;padding:5px 12px 5px 10px!important;font-size:13px;font-weight:600;line-height:1.2;box-shadow:none!important;text-transform:none!important;margin:0 0 6px!important}'+
'.flags{display:flex;flex-direction:column;align-items:flex-start}'+
'.flags .flag::before{font-size:13px;line-height:1}'+
'.flag.flag-new{background:#d9e7f8!important;color:#1a4e8a!important}.flag.flag-new::before{content:"✨"}'+
'.flag.flag-quantity-discount{background:#e3ecd3!important;color:#3e5c22!important}.flag.flag-quantity-discount::before{content:"➕"}'+
'.flag.flag-action-percentage{background:#fbdfe3!important;color:#a3162b!important}.flag.flag-action-percentage::before{content:"🔥"}'+
'.flag.flag-action{background:#f0e0f8!important;color:#6a2b8f!important}.flag.flag-action::before{content:"🎁"}'+
'.flag.flag-tip{background:#fdf3d0!important;color:#8a6d1a!important}.flag.flag-tip::before{content:"👍"}'+
/* Trust badge riadok pod názvom produktu */
'.s-badges{display:flex;flex-wrap:wrap;gap:8px 18px;margin:12px 0 4px}'+
'.s-badges span{display:inline-flex;align-items:center;gap:7px;font-size:14px;font-weight:600;color:#222}'+
'.s-badges i{width:18px;height:18px;min-width:18px;border-radius:50%;background:#000;color:#fff;font-style:normal;display:inline-flex;align-items:center;justify-content:center;font-size:11px;line-height:1}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

function pt(){try{return getShoptetDataLayer().shoptet.pageType}catch(e){return''}}

/* --- Sticky "Pridať do košíka" na detaile produktu --- */
function sc(){if(pt()!=='productDetail'&&!document.body.classList.contains('type-product'))return;
var b=document.querySelector('.add-to-cart-button,[data-testid="buttonAddToCart"]'),p=document.querySelector('.price-final-holder,.price-final');
if(!b||!p||document.querySelector('.s-cta'))return;
var n=document.querySelector('h1'),og=document.querySelector('meta[property="og:image"]'),src=og?og.content:'';
var d=document.createElement('div');d.className='s-cta';
d.innerHTML=(src?'<img src="'+src+'" alt="">':'')+'<div>'+(n?'<div class="nm">'+n.textContent.trim()+'</div>':'')+'<div class="pc">'+p.textContent.trim()+'</div></div><button type="button">Pridať do košíka</button>';
document.body.appendChild(d);
d.querySelector('button').onclick=function(){b.click()};
if('IntersectionObserver'in window)new IntersectionObserver(function(e){d.classList.toggle('on',!e[0].isIntersecting)}).observe(b);else d.classList.add('on')}

/* --- Trust badge pod H1 na detaile produktu (štýl deNatura) --- */
/* Texty per produkt: v administrácii pridaj produktu popisný parameter
   „Benefity" s hodnotou napr. „Bez lepku | Vegan | Vyrobené v EÚ".
   Zobrazujú sa VÝLUČNE texty z parametra — bez neho sa badge nezobrazí. */
function bd(){if(pt()!=='productDetail'&&!document.body.classList.contains('type-product'))return;
if(!document.querySelector('h1'))return;
var items=[];
[...document.querySelectorAll('.detail-parameters tr')].forEach(function(tr){
var th=tr.querySelector('th');
if(th&&/^\s*Benefity/i.test(th.textContent)){
var td=tr.querySelector('td');
if(td)items=td.textContent.split(/\||;/).map(function(s){return s.trim()}).filter(Boolean);
tr.style.display='none'}});
if(!items.length)return;
var html=items.map(function(t){return'<span><i>✓</i>'+t+'</span>'}).join('');
/* Shoptet má 2 hlavičky (desktop + mobil) – badge vlož do každej */
var headers=document.querySelectorAll('.p-detail-inner-header,.p-detail-inner-header-mobile');
if(!headers.length)headers=[document.querySelector('h1').parentElement];
[].forEach.call(headers,function(h){
if(h.querySelector(':scope > .s-badges'))return;
var anchor=h.querySelector('.stars-wrapper')||h.querySelector('h1');
var d=document.createElement('div');d.className='s-badges';d.innerHTML=html;
if(anchor)anchor.insertAdjacentElement('afterend',d);else h.appendChild(d)})}

/* ===== NASTAVENIE PROGRESS LÍŠT =====================================
   GIFT_ON = false  → lišta k darčeku sa NIKDE nezobrazuje (akcia vypnutá).
   Keď bude ďalšia darčeková akcia, staci prepnúť na true
   a prípadne upraviť GIFT_MIN / GIFT_LABEL.
   Doprava zadarmo beží vždy (SHIP_MIN).                                */
var GIFT_ON   = false;
var GIFT_MIN  = 30, GIFT_LABEL = 'darček ZADARMO';
var SHIP_MIN  = 40, SHIP_LABEL = 'dopravu ZADARMO';
/* ==================================================================== */
var G=[[GIFT_MIN,GIFT_LABEL],[SHIP_MIN,SHIP_LABEL]];
function ct(){try{var i=getShoptetDataLayer().cartInfo;if(i&&i.getNoBillingShippingPrice)return parseFloat(i.getNoBillingShippingPrice.withVat)}catch(e){}return null}
function row(g,t){var pc=Math.min(100,Math.round(t/g[0]*100));
if(t>=g[0])return'<div class="ok">✓ Máte '+g[1]+'<div class="bar"><div class="fill" style="width:100%"></div></div></div>';
return'<div>Objednajte ešte za <strong>'+(g[0]-t).toFixed(2).replace('.',',')+' €</strong> a získate <strong>'+g[1]+'</strong><div class="bar"><div class="fill" style="width:'+pc+'%"></div></div></div>'}
function sm(){try{var f=getShoptetDataLayer().cartInfo.freeShippingFrom;if(f!==undefined&&f!==null)return parseFloat(f)}catch(e){}return SHIP_MIN}
function goals(t){return(GIFT_ON?row(G[0],t):'')+row([sm(),SHIP_LABEL],t)}
/* Skryť „Ušetríte 0 €" na detaile produktu */
function hz(){document.querySelectorAll('p,div,tr,li,span,strong').forEach(function(e){if(!e.children.length&&/Ušetríte\s*0\s*€/.test(e.textContent)){(e.closest('p,div,tr,li')||e).style.display='none'}})}

/* Popup po pridaní do košíka: nahradíme natívny riadok dopravy našou lištou */
function pg(){if(location.pathname.indexOf('/kosik')===0)return;
var d=document.querySelector('.extra.delivery[data-sw="1"]')||[...document.querySelectorAll('.extra.delivery')].filter(function(e){return e.offsetParent})[0];
if(!d)return;
var t=ct();if(t===null)return;
var x=d.parentNode.querySelector('.s-goal--popup');
if(!x){x=document.createElement('div');x.className='s-goal s-goal--popup';d.parentNode.insertBefore(x,d.nextSibling)}
d.setAttribute('data-sw','1');d.style.display='none';
x.innerHTML=goals(t);
/* skryť sticky CTA, kým je popup otvorený */
var s=document.querySelector('.s-cta');if(s)s.style.display='none';
if(window.jQuery)jQuery(document).off('cbox_closed.sw').on('cbox_closed.sw',function(){var c=document.querySelector('.s-cta');if(c)c.style.display=''})}

function pr(){if(location.pathname.indexOf('/kosik')!==0)return;
var btn=null,els=document.querySelectorAll('a,button');
for(var j=0;j<els.length;j++){if(/POKRAČOVAŤ/i.test(els[j].textContent)&&els[j].offsetParent){btn=els[j];break}}
if(!btn)return;var t=ct();if(t===null)return;
var x=document.querySelector('.s-goal:not(.s-goal--popup)');
if(!x){x=document.createElement('div');x.className='s-goal';
var w=btn.closest('.next-step');
if(w)w.parentNode.insertBefore(x,w.nextSibling);else btn.parentNode.insertBefore(x,btn.nextSibling)}
x.innerHTML=goals(t)}

/* --- Carousel recenzií „Posledné hodnotenie" na homepage --- */
function rvCard(r){var a=document.createElement('a');a.href=r.url;a.className='latest-contribution-inner';
var st='';for(var i=0;i<5;i++)st+='<span class="star star-'+(i<r.stars?'on':'off')+'" aria-hidden="true"></span>';
a.innerHTML='<div class="latest-contribution-image"><img src="'+r.img+'" alt="" width="100" height="100" loading="lazy"></div>'+
'<div class="latest-contribution-content"><h4 class="latest-contribution-product">'+r.product+'</h4>'+
'<div class="latest-contribution-info"><span class="stars">'+st+'</span></div>'+
'<div style="font-size:13px;color:#777;margin:4px 0">'+[r.author,r.date].filter(Boolean).join(' | ')+'</div>'+
'<div>'+r.text+'</div></div>';
return a}
/* Automatické načítanie recenzií z náhodných produktov (cache 24 h) */
function shuffle(a){return a.sort(function(){return Math.random()-.5})}
function rvFetch(track){
var KEY='silwerRevPool',now=Date.now(),cache=null;
try{cache=JSON.parse(localStorage.getItem(KEY))}catch(e){}
var shown={};[...track.querySelectorAll('.latest-contribution-inner')].forEach(function(i){var t=i.textContent.trim();shown[t.slice(0,80)]=1});
function add(items){shuffle(items.slice()).forEach(function(r){if(shown[(r.product+r.author+r.text).slice(0,80)])return;track.appendChild(rvCard(r))})}
if(cache&&now-cache.t<86400000&&cache.items.length){add(cache.items);return}
var links=[...document.querySelectorAll('.products .p a[href]')].map(function(a){return a.href})
.filter(function(v,i,arr){return arr.indexOf(v)===i&&v.indexOf('#')<0});
if(!links.length)return;
var picked=shuffle(links).slice(0,4),pool=[];
Promise.all(picked.map(function(u){return fetch(u).then(function(r){return r.text()}).then(function(html){
var doc=new DOMParser().parseFromString(html,'text/html');
var h1=doc.querySelector('h1'),og=doc.querySelector('meta[property="og:image"]');
[...doc.querySelectorAll('.vote-wrap')].forEach(function(w){
var te=w.querySelector('.vote-content,.vote-text,.vote-comment');
var txt=te?te.textContent.trim():'';
var stars=w.querySelectorAll('.stars .star-on').length||5;
if(!txt||txt.length<25||stars<4||pool.length>=12)return;
var au=w.querySelector('.vote-name,[itemprop="author"]');
var dm=w.textContent.match(/\d{1,2}\.\d{1,2}\.\d{4}/);
pool.push({product:h1?h1.textContent.trim():'',url:u,img:og?og.content:'',stars:stars,author:au?au.textContent.trim():'',date:dm?dm[0]:'',text:txt.slice(0,220)})})
}).catch(function(){})})).then(function(){
if(!pool.length)return;
try{localStorage.setItem(KEY,JSON.stringify({t:now,items:pool}))}catch(e){}
add(pool)})}

function rv(){var secs=[...document.querySelectorAll('.latest-contribution-rating')];
if(!secs.length||document.querySelector('.s-rev'))return;
var items=[];secs.forEach(function(s){items=items.concat([...s.querySelectorAll('a.latest-contribution-inner')])});
if(items.length<2)return;
var sec=secs[0];
var wrap=document.createElement('div');wrap.className='s-rev';
var track=document.createElement('div');track.className='s-rev__track';
items.forEach(function(i){track.appendChild(i)});
wrap.appendChild(track);sec.appendChild(wrap);
secs.slice(1).forEach(function(s){s.style.display='none'});
rvFetch(track);
['l','r'].forEach(function(dir){var b=document.createElement('button');b.type='button';b.className='s-rev__nav s-rev__nav--'+dir;b.setAttribute('aria-label',dir==='l'?'Predchádzajúce':'Ďalšie');b.innerHTML=dir==='l'?'&#10094;':'&#10095;';
b.onclick=function(){var w=track.querySelector('.latest-contribution-inner').offsetWidth+16;track.scrollBy({left:dir==='l'?-w:w})};wrap.appendChild(b)});
setInterval(function(){if(!document.contains(track))return;
var w=track.querySelector('.latest-contribution-inner').offsetWidth+16;
if(track.scrollLeft+track.clientWidth>=track.scrollWidth-10)track.scrollTo({left:0});else track.scrollBy({left:w})},6000)}

/* Presun „Posledné hodnotenie" nad „Napísali o nás" rieši čisté CSS (order) vyššie */

function init(){hz();bd();sc();pr();pg();rv()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
document.addEventListener('ShoptetDOMPageContentLoaded',init);
document.addEventListener('ShoptetDOMCartContentLoaded',function(){hz();pr();pg()});
document.addEventListener('ShoptetDOMAdvancedOrderLoaded',pg);
})();
