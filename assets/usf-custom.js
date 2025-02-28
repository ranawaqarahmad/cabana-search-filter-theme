// define templates for the General theme
//for usf lazyload
!function(e,t){var r=t(e,e.document);e.lazySizes=r,"object"==typeof module&&module.exports&&(module.exports=r)}(window,function(e,t){"use strict";if(t.getElementsByClassName){var r,i,a=t.documentElement,n=e.Date,s=e.HTMLPictureElement,o="addEventListener",l="getAttribute",u=e[o],c=e.setTimeout,d=e.requestAnimationFrame||c,f=e.requestIdleCallback,g=/^picture$/i,p=["load","error","lazyincluded","_lazyloaded"],y={},z=Array.prototype.forEach,m=function(e,t){return y[t]||(y[t]=new RegExp("(\\s|^)"+t+"(\\s|$)")),y[t].test(e[l]("class")||"")&&y[t]},v=function(e,t){m(e,t)||e.setAttribute("class",(e[l]("class")||"").trim()+" "+t)},b=function(e,t){var r;(r=m(e,t))&&e.setAttribute("class",(e[l]("class")||"").replace(r," "))},A=function(e,t,r){var i=r?o:"removeEventListener";r&&A(e,t),p.forEach(function(r){e[i](r,t)})},h=function(e,i,a,n,s){var o=t.createEvent("CustomEvent");return a||(a={}),a.instance=r,o.initCustomEvent(i,!n,!s,a),e.dispatchEvent(o),o},E=function(t,r){var a;!s&&(a=e.picturefill||i.pf)?a({reevaluate:!0,elements:[t]}):r&&r.src&&(t.src=r.src)},C=function(e,t){return(getComputedStyle(e,null)||{})[t]},w=function(e,t,r){for(r=r||e.offsetWidth;r<i.minSize&&t&&!e._lazysizesWidth;)r=t.offsetWidth,t=t.parentNode;return r},_=function(){var e,r,i=[],a=[],n=i,s=function(){var t=n;for(n=i.length?a:i,e=!0,r=!1;t.length;)t.shift()();e=!1},o=function(i,a){e&&!a?i.apply(this,arguments):(n.push(i),r||(r=!0,(t.hidden?c:d)(s)))};return o._lsFlush=s,o}(),L=function(e,t){return t?function(){_(e)}:function(){var t=this,r=arguments;_(function(){e.apply(t,r)})}},S=function(e){var t,r=0,a=125,s=i.ricTimeout,o=function(){t=!1,r=n.now(),e()},l=f&&i.ricTimeout?function(){f(o,{timeout:s}),s!==i.ricTimeout&&(s=i.ricTimeout)}:L(function(){c(o)},!0);return function(e){var i;(e=e===!0)&&(s=33),t||(t=!0,i=a-(n.now()-r),0>i&&(i=0),e||9>i&&f?l():c(l,i))}},x=function(e){var t,r,i=99,a=function(){t=null,e()},s=function(){var e=n.now()-r;i>e?c(s,i-e):(f||a)(a)};return function(){r=n.now(),t||(t=c(s,i))}};!function(){var t,r={lazyClass:"usf-lazyload",loadedClass:"usf-lazyloaded",loadingClass:"usf-lazyloading",preloadClass:"usf-lazypreload",errorClass:"usf-lazyerror",autosizesClass:"usf-lazyautosizes",srcAttr:"data-usf-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:1.5,hFac:.8,loadMode:2,loadHidden:!0,ricTimeout:300};i=e.usfLazySizesConfig||e.usfLazySizesConfig||{};for(t in r)t in i||(i[t]=r[t]);e.usfLazySizesConfig=i,c(function(){i.init&&M()})}();var N=function(){var s,d,f,p,y,w,N,M,T,O,R,F,j,$,k=/^img$/i,W=/^iframe$/i,B="onscroll"in e&&!/glebot/.test(navigator.userAgent),I=0,q=0,U=0,H=-1,X=function(e){U--,e&&e.target&&A(e.target,X),(!e||0>U||!e.target)&&(U=0)},D=function(e,r){var i,n=e,s="hidden"==C(t.body,"visibility")||"hidden"!=C(e,"visibility");for(M-=r,R+=r,T-=r,O+=r;s&&(n=n.offsetParent)&&n!=t.body&&n!=a;)s=(C(n,"opacity")||1)>0,s&&"visible"!=C(n,"overflow")&&(i=n.getBoundingClientRect(),s=O>i.left&&T<i.right&&R>i.top-1&&M<i.bottom+1);return s},J=function(){var e,n,o,u,c,f,g,y,z,m=r.elements;if((p=i.loadMode)&&8>U&&(e=m.length)){n=0,H++,null==j&&("expand"in i||(i.expand=a.clientHeight>500&&a.clientWidth>500?500:370),F=i.expand,j=F*i.expFactor),j>q&&1>U&&H>2&&p>2&&!t.hidden?(q=j,H=0):q=p>1&&H>1&&6>U?F:I;for(;e>n;n++)if(m[n]&&!m[n]._lazyRace)if(B)if((y=m[n][l]("data-expand"))&&(f=1*y)||(f=q),z!==f&&(w=innerWidth+f*$,N=innerHeight+f,g=-1*f,z=f),o=m[n].getBoundingClientRect(),(R=o.bottom)>=g&&(M=o.top)<=N&&(O=o.right)>=g*$&&(T=o.left)<=w&&(R||O||T||M)&&(i.loadHidden||"hidden"!=C(m[n],"visibility"))&&(d&&3>U&&!y&&(3>p||4>H)||D(m[n],f))){if(te(m[n]),c=!0,U>9)break}else!c&&d&&!u&&4>U&&4>H&&p>2&&(s[0]||i.preloadAfterLoad)&&(s[0]||!y&&(R||O||T||M||"auto"!=m[n][l](i.sizesAttr)))&&(u=s[0]||m[n]);else te(m[n]);u&&!c&&te(u)}},V=S(J),G=function(e){v(e.target,i.loadedClass),b(e.target,i.loadingClass),A(e.target,Q),h(e.target,"usf-lazyloaded")},K=L(G),Q=function(e){K({target:e.target})},Y=function(e,t){try{e.contentWindow.location.replace(t)}catch(r){e.src=t}},Z=function(e){var t,r=e[l](i.srcsetAttr);(t=i.customMedia[e[l]("data-media")||e[l]("media")])&&e.setAttribute("media",t),r&&e.setAttribute("srcset",r)},ee=L(function(e,t,r,a,n){var s,o,u,d,p,y;(p=h(e,"lazybeforeunveil",t)).defaultPrevented||(a&&(r?v(e,i.autosizesClass):e.setAttribute("sizes",a)),o=e[l](i.srcsetAttr),s=e[l](i.srcAttr),n&&(u=e.parentNode,d=u&&g.test(u.nodeName||"")),y=t.firesLoad||"src"in e&&(o||s||d),p={target:e},y&&(A(e,X,!0),clearTimeout(f),f=c(X,2500),v(e,i.loadingClass),A(e,Q,!0)),d&&z.call(u.getElementsByTagName("source"),Z),o?e.setAttribute("srcset",o):s&&!d&&(W.test(e.nodeName)?Y(e,s):e.src=s),n&&(o||d)&&E(e,{src:s})),e._lazyRace&&delete e._lazyRace,b(e,i.lazyClass),_(function(){(!y||e.complete&&e.naturalWidth>1)&&(y?X(p):U--,G(p))},!0)}),te=function(e){var t,r=k.test(e.nodeName),a=r&&(e[l](i.sizesAttr)||e[l]("sizes")),n="auto"==a;(!n&&d||!r||!e[l]("src")&&!e.srcset||e.complete||m(e,i.errorClass)||!m(e,i.lazyClass))&&(t=h(e,"lazyunveilread").detail,n&&P.updateElem(e,!0,e.offsetWidth),e._lazyRace=!0,U++,ee(e,t,n,a,r))},re=function(){if(!d){if(n.now()-y<999)return void c(re,999);var e=x(function(){i.loadMode=3,V()});d=!0,i.loadMode=3,V(),u("scroll",function(){3==i.loadMode&&(i.loadMode=2),e()},!0)}};return{_:function(){y=n.now(),r.elements=t.getElementsByClassName(i.lazyClass),s=t.getElementsByClassName(i.lazyClass+" "+i.preloadClass),$=i.hFac,u("scroll",V,!0),u("resize",V,!0),e.MutationObserver?new MutationObserver(V).observe(a,{childList:!0,subtree:!0,attributes:!0}):(a[o]("DOMNodeInserted",V,!0),a[o]("DOMAttrModified",V,!0),setInterval(V,999)),u("hashchange",V,!0),["focus","mouseover","click","load","transitionend","animationend","webkitAnimationEnd"].forEach(function(e){t[o](e,V,!0)}),/d$|^c/.test(t.readyState)?re():(u("load",re),t[o]("DOMContentLoaded",V),c(re,2e4)),r.elements.length?(J(),_._lsFlush()):V()},checkElems:V,unveil:te}}(),P=function(){var e,r=L(function(e,t,r,i){var a,n,s;if(e._lazysizesWidth=i,i+="px",e.setAttribute("sizes",i),g.test(t.nodeName||""))for(a=t.getElementsByTagName("source"),n=0,s=a.length;s>n;n++)a[n].setAttribute("sizes",i);r.detail.dataAttr||E(e,r.detail)}),a=function(e,t,i){var a,n=e.parentNode;n&&(i=w(e,n,i),a=h(e,"lazybeforesizes",{width:i,dataAttr:!!t}),a.defaultPrevented||(i=a.detail.width,i&&i!==e._lazysizesWidth&&r(e,n,a,i)))},n=function(){var t,r=e.length;if(r)for(t=0;r>t;t++)a(e[t])},s=x(n);return{_:function(){e=t.getElementsByClassName(i.autosizesClass),u("resize",s)},checkElems:s,updateElem:a}}(),M=function(){M.i||(M.i=!0,P._(),N._())};return r={cfg:i,autoSizer:P,loader:N,init:M,uP:E,aC:v,rC:b,hC:m,fire:h,gW:w,rAF:_}}}),function(e,t){var r=function(){t(e.lazySizes),e.removeEventListener("lazyunveilread",r,!0)};t=t.bind(null,e,e.document),"object"==typeof module&&module.exports?t(require("lazysizes"),require("../fix-ios-sizes/fix-ios-sizes")):e.lazySizes?r():e.addEventListener("lazyunveilread",r,!0)}(window,function(e,t,r){"use strict";var i,a=r&&r.cfg||e.usfLazySizesConfig,n=t.createElement("img"),s="sizes"in n&&"srcset"in n,o=/\s+\d+h/g,l=function(){var e=/\s+(\d+)(w|h)\s+(\d+)(w|h)/,r=Array.prototype.forEach;return function(i){var a=t.createElement("img"),n=function(t){var r,i=t.getAttribute(usfLazySizesConfig.srcsetAttr);i&&(i.match(e)&&(r="w"==RegExp.$2?RegExp.$1/RegExp.$3:RegExp.$3/RegExp.$1,r&&t.setAttribute("data-aspectratio",r)),t.setAttribute(usfLazySizesConfig.srcsetAttr,i.replace(o,"")))},s=function(e){var t=e.target.parentNode;t&&"PICTURE"==t.nodeName&&r.call(t.getElementsByTagName("source"),n),n(e.target)},l=function(){a.currentSrc&&t.removeEventListener("lazybeforeunveil",s)};i[1]&&(t.addEventListener("lazybeforeunveil",s),a.onload=l,a.onerror=l,a.srcset="data:,a 1w 1h",a.complete&&l())}}();if(a||(a={},e.usfLazySizesConfig=a),a.supportsType||(a.supportsType=function(e){return!e}),!e.picturefill&&!a.pf){if(e.HTMLPictureElement&&s)return t.msElementsFromPoint&&l(navigator.userAgent.match(/Edge\/(\d+)/)),void(a.pf=function(){});a.pf=function(t){var r,a;if(!e.picturefill)for(r=0,a=t.elements.length;a>r;r++)i(t.elements[r])},i=function(){var n=function(e,t){return e.w-t.w},l=/^\s*\d+\.*\d*px\s*$/,u=function(e){var t,r,i=e.length,a=e[i-1],n=0;for(n;i>n;n++)if(a=e[n],a.d=a.w/e.w,a.d>=e.d){!a.cached&&(t=e[n-1])&&t.d>e.d-.13*Math.pow(e.d,2.2)&&(r=Math.pow(t.d-.6,1.6),t.cached&&(t.d+=.15*r),t.d+(a.d-e.d)*r>e.d&&(a=t));break}return a},c=function(){var e,t=/(([^,\s].[^\s]+)\s+(\d+)w)/g,r=/\s/,i=function(t,r,i,a){e.push({c:r,u:i,w:1*a})};return function(a){return e=[],a=a.trim(),a.replace(o,"").replace(t,i),e.length||!a||r.test(a)||e.push({c:a,u:a,w:99}),e}}(),d=function(){d.init||(d.init=!0,addEventListener("resize",function(){var e,r=t.getElementsByClassName("lazymatchmedia"),a=function(){var e,t;for(e=0,t=r.length;t>e;e++)i(r[e])};return function(){clearTimeout(e),e=setTimeout(a,66)}}()))},f=function(t,i){var n,s=t.getAttribute("srcset")||t.getAttribute(a.srcsetAttr);!s&&i&&(s=t._lazypolyfill?t._lazypolyfill._set:t.getAttribute(a.srcAttr)||t.getAttribute("src")),t._lazypolyfill&&t._lazypolyfill._set==s||(n=c(s||""),i&&t.parentNode&&(n.isPicture="PICTURE"==t.parentNode.nodeName.toUpperCase(),n.isPicture&&e.matchMedia&&(r.aC(t,"lazymatchmedia"),d())),n._set=s,Object.defineProperty(t,"_lazypolyfill",{value:n,writable:!0}))},g=function(t){var i=e.devicePixelRatio||1,a=r.getX&&r.getX(t);return Math.min(a||i,2.5,i)},p=function(t){return e.matchMedia?(p=function(e){return!e||(matchMedia(e)||{}).matches})(t):!t},y=function(e){var t,i,s,o,c,d,y;if(o=e,f(o,!0),c=o._lazypolyfill,c.isPicture)for(i=0,t=e.parentNode.getElementsByTagName("source"),s=t.length;s>i;i++)if(a.supportsType(t[i].getAttribute("type"),e)&&p(t[i].getAttribute("media"))){o=t[i],f(o),c=o._lazypolyfill;break}return c.length>1?(y=o.getAttribute("sizes")||"",y=l.test(y)&&parseInt(y,10)||r.gW(e,e.parentNode),c.d=g(e),!c.src||!c.w||c.w<y?(c.w=y,d=u(c.sort(n)),c.src=d):d=c.src):d=c[0],d},z=function(e){if(!s||!e.parentNode||"PICTURE"==e.parentNode.nodeName.toUpperCase()){var t=y(e);t&&t.u&&e._lazypolyfill.cur!=t.u&&(e._lazypolyfill.cur=t.u,t.cached=!0,e.setAttribute(a.srcAttr,t.u),e.setAttribute("src",t.u))}};return z.parse=c,z}(),a.loadedClass&&a.loadingClass&&!function(){var e=[];['img[sizes$="px"][srcset].',"picture > img:not([srcset])."].forEach(function(t){e.push(t+a.loadedClass),e.push(t+a.loadingClass)}),a.pf({elements:t.querySelectorAll(e.join(", "))})}()}}),function(e,t){var r=function(){t(e.lazySizes),e.removeEventListener("lazyunveilread",r,!0)};t=t.bind(null,e,e.document),"object"==typeof module&&module.exports?t(require("lazysizes")):e.lazySizes?r():e.addEventListener("lazyunveilread",r,!0)}(window,function(e,t,r){"use strict";if(e.addEventListener){var i,a=/^picture$/i,n=t.documentElement,s=function(){var e,t=/(([^,\s].[^\s]+)\s+(\d+)(w|h)(\s+(\d+)(w|h))?)/g,r=function(t,r,i,a,n,s,o,l){e.push({c:r,u:i,w:1*("w"==l?o:a)})};return function(i){return e=[],i.replace(t,r),e}}(),o=function(){var e=function(e,t){return e.w-t.w},t=function(t,i){var a={srcset:t.getAttribute(r.cfg.srcsetAttr)||""},n=s(a.srcset);return Object.defineProperty(t,i,{value:a,writable:!0}),a.cands=n,a.index=0,a.dirty=!1,n[0]&&n[0].w?(n.sort(e),a.cSrcset=[n[a.index].c]):(a.cSrcset=a.srcset?[a.srcset]:[],a.cands=[]),a};return function(e,r){var i,n,s,o;if(!e[r]&&(o=e.parentNode||{},e[r]=t(e,r),e[r].isImg=!0,a.test(o.nodeName||"")))for(e[r].picture=!0,i=o.getElementsByTagName("source"),n=0,s=i.length;s>n;n++)t(i[n],r).isImg=!1;return e[r]}}(),l={_lazyOptimumx:function(){var e=function(e,t,r){var i,a,n;return!e||!e.d||(n=r>.7?.6:.4,!(e.d>=r)&&(a=Math.pow(e.d-n,1.6)||.1,.1>a?a=.1:a>3&&(a=3),i=e.d+(t-r)*a,r>i))};return function(t,r,i){var a,n;for(a=0;a<t.cands.length;a++)if(n=t.cands[a],n.d=(n.w||1)/r,!(t.index>=a)){if(!(n.d<=i||e(t.cands[a-1],n.d,i)))break;t.cSrcset.push(n.c),t.index=a}}}()},u=function(){var e=function(e,t,r,i,a){var n,s=e[a];s&&(n=s.index,l[a](s,t,r),s.dirty&&n==s.index||(s.cSrcset.join(", "),e.setAttribute(i,s.cSrcset.join(", ")),s.dirty=!0))};return function(t,r,i,a,n){var s,o,l,u,c=t[n];if(c.width=r,c.picture&&(o=t.parentNode))for(s=o.getElementsByTagName("source"),u=0,l=s.length;l>u;u++)e(s[u],r,i,a,n);e(t,r,i,a,n)}}(),c=function(e){var t=e.getAttribute("data-optimumx")||e.getAttribute("data-maxdpr");return!t&&i.constrainPixelDensity&&(t="auto"),t&&(t="auto"==t?i.getOptimumX(e):parseFloat(t,10)),t},d=function(){r&&!r.getOptimumX&&(r.getX=c,r.pWS=s,n.removeEventListener("lazybeforeunveil",d))};n.addEventListener("lazybeforeunveil",d),setTimeout(d),i=r&&r.cfg||e.usfLazySizesConfig,i||(i={},e.usfLazySizesConfig=i),"function"!=typeof i.getOptimumX&&(i.getOptimumX=function(){var t=e.devicePixelRatio||1;return t>2.6?t*=.6:t>1.9?t*=.8:t-=.01,Math.min(Math.round(100*t)/100,2)}),e.devicePixelRatio&&addEventListener("lazybeforesizes",function(e){if(e.detail.instance==r){var t,a,n,s,l=e.target,d=e.detail,f=d.dataAttr;e.defaultPrevented||!(t=c(l))||t>=devicePixelRatio||(!f||!l._lazyOptimumx||d.reloaded||i.unloadedClass&&r.hC(l,i.unloadedClass)||(l._lazyOptimumx=null),a=o(l,"_lazyOptimumx"),n=d.width,n&&(a.width||0)<n&&(s=f?r.cfg.srcsetAttr:"srcset",r.rAF(function(){u(l,n,t,s,"_lazyOptimumx")})))}})}}),function(e,t){var r=function(){t(e.lazySizes),e.removeEventListener("lazyunveilread",r,!0)};t=t.bind(null,e,e.document),"object"==typeof module&&module.exports?t(require("lazysizes")):e.lazySizes?r():e.addEventListener("lazyunveilread",r,!0)}(window,function(e,t,r){"use strict";if(e.addEventListener){var i=/\s+/g,a=/\s*\|\s+|\s+\|\s*/g,n=/^(.+?)(?:\s+\[\s*(.+?)\s*\])?$/,s=/\(|\)|'/,o={contain:1,cover:1},l=function(e){var t=r.gW(e,e.parentNode);return(!e._lazysizesWidth||t>e._lazysizesWidth)&&(e._lazysizesWidth=t),e._lazysizesWidth},u=function(e){var t;return t=(getComputedStyle(e)||{getPropertyValue:function(){}}).getPropertyValue("background-size"),!o[t]&&o[e.style.backgroundSize]&&(t=e.style.backgroundSize),t},c=function(e,r,s){var o=t.createElement("picture"),l=r.getAttribute(usfLazySizesConfig.sizesAttr),u=r.getAttribute("data-ratio"),c=r.getAttribute("data-optimumx");r._lazybgset&&r._lazybgset.parentNode==r&&r.removeChild(r._lazybgset),Object.defineProperty(s,"_lazybgset",{value:r,writable:!0}),Object.defineProperty(r,"_lazybgset",{value:o,writable:!0}),e=e.replace(i," ").split(a),o.style.display="none",s.className=usfLazySizesConfig.lazyClass,1!=e.length||l||(l="auto"),e.forEach(function(e){var r=t.createElement("source");l&&"auto"!=l&&r.setAttribute("sizes",l),e.match(n)&&(r.setAttribute(usfLazySizesConfig.srcsetAttr,RegExp.$1),RegExp.$2&&r.setAttribute("media",usfLazySizesConfig.customMedia[RegExp.$2]||RegExp.$2)),o.appendChild(r)}),l&&(s.setAttribute(usfLazySizesConfig.sizesAttr,l),r.removeAttribute(usfLazySizesConfig.sizesAttr),r.removeAttribute("sizes")),c&&s.setAttribute("data-optimumx",c),u&&s.setAttribute("data-ratio",u),o.appendChild(s),r.appendChild(o)},d=function(e){if(e.target._lazybgset){var t=e.target,i=t._lazybgset,a=t.currentSrc||t.src;a&&(i.style.backgroundImage="url("+(s.test(a)?JSON.stringify(a):a)+")"),t._lazybgsetLoading&&(r.fire(i,"_lazyloaded",{},!1,!0),delete t._lazybgsetLoading)}};addEventListener("lazybeforeunveil",function(e){var i,a,n;!e.defaultPrevented&&(i=e.target.getAttribute("data-bgset"))&&(n=e.target,a=t.createElement("img"),a.alt="",a._lazybgsetLoading=!0,e.detail.firesLoad=!0,c(i,n,a),setTimeout(function(){r.loader.unveil(a),r.rAF(function(){r.fire(a,"_lazyloaded",{},!0,!0),a.complete&&d({target:a})})}))}),t.addEventListener("load",d,!0),e.addEventListener("lazybeforesizes",function(e){if(e.detail.instance==r&&e.target._lazybgset&&e.detail.dataAttr){var t=e.target._lazybgset,i=u(t);o[i]&&(e.target._lazysizesParentFit=i,r.rAF(function(){e.target.setAttribute("data-parent-fit",i),e.target._lazysizesParentFit&&delete e.target._lazysizesParentFit}))}},!0),t.documentElement.addEventListener("lazybeforesizes",function(e){!e.defaultPrevented&&e.target._lazybgset&&e.detail.instance==r&&(e.detail.width=l(e.target._lazybgset))})}}),function(e,t){var r=function(){t(e.lazySizes),e.removeEventListener("lazyunveilread",r,!0)};t=t.bind(null,e,e.document),"object"==typeof module&&module.exports?t(require("lazysizes")):e.lazySizes?r():e.addEventListener("lazyunveilread",r,!0)}(window,function(e,t,r){"use strict";function i(t,r){var i,a,n,s,o=e.getComputedStyle(t);a=t.parentNode,s={isPicture:!(!a||!f.test(a.nodeName||""))},n=function(e,r){var i=t.getAttribute("data-"+e);if(!i){var a=o.getPropertyValue("--ls-"+e);a&&(i=a.trim())}if(i){if("true"==i)i=!0;else if("false"==i)i=!1;else if(d.test(i))i=parseFloat(i);else if("function"==typeof u[e])i=u[e](t,i);else if(z.test(i))try{i=JSON.parse(i)}catch(n){}s[e]=i}else e in u&&"function"!=typeof u[e]?s[e]=u[e]:r&&"function"==typeof u[e]&&(s[e]=u[e](t,i))};for(i in u)n(i);return r.replace(y,function(e,t){t in s||n(t,!0)}),s}function a(e,t){var r=[],i=function(e,r){return c[typeof t[r]]?t[r]:e};return r.srcset=[],t.absUrl&&(v.setAttribute("href",e),e=v.href),e=((t.prefix||"")+e+(t.postfix||"")).replace(y,i),t.widths.forEach(function(i){var a=t.widthmap[i]||i,n={u:e.replace(g,a).replace(p,t.ratio?Math.round(i*t.ratio):""),w:i};r.push(n),r.srcset.push(n.c=n.u+" "+i+"w")}),r}function n(e,r,i){var n=0,s=0,o=i;if(e){if("container"===r.ratio){for(n=o.scrollWidth,s=o.scrollHeight;!(n&&s||o===t);)o=o.parentNode,n=o.scrollWidth,s=o.scrollHeight;n&&s&&(r.ratio=s/n)}e=a(e,r),e.isPicture=r.isPicture,A&&"IMG"==i.nodeName.toUpperCase()?i.removeAttribute(l.srcsetAttr):i.setAttribute(l.srcsetAttr,e.srcset.join(", ")),Object.defineProperty(i,"_lazyrias",{value:e,writable:!0})}}function s(e,t){var a=i(e,t);return u.modifyOptions.call(e,{target:e,details:a,detail:a}),r.fire(e,"lazyriasmodifyoptions",a),a}function o(e){return e.getAttribute(e.getAttribute("data-srcattr")||u.srcAttr)||e.getAttribute(l.srcsetAttr)||e.getAttribute(l.srcAttr)||e.getAttribute("data-pfsrcset")||""}var l,u,c={string:1,number:1},d=/^\-*\+*\d+\.*\d*$/,f=/^picture$/i,g=/\s*\{\s*width\s*\}\s*/i,p=/\s*\{\s*height\s*\}\s*/i,y=/\s*\{\s*([a-z0-9]+)\s*\}\s*/gi,z=/^\[.*\]|\{.*\}$/,m=/^(?:auto|\d+(px)?)$/,v=t.createElement("a"),b=t.createElement("img"),A="srcset"in b&&!("sizes"in b),h=!!e.HTMLPictureElement&&!A;!function(){var t,i=function(){},a={prefix:"",postfix:"",srcAttr:"data-usf-src",absUrl:!1,modifyOptions:i,widthmap:{},ratio:!1};l=r&&r.cfg||e.usfLazySizesConfig,l||(l={},e.usfLazySizesConfig=l),l.supportsType||(l.supportsType=function(e){return!e}),l.rias||(l.rias={}),u=l.rias,"widths"in u||(u.widths=[],function(e){for(var t,r=0;!t||3e3>t;)r+=5,r>30&&(r+=1),t=36*r,e.push(t)}(u.widths));for(t in a)t in u||(u[t]=a[t])}(),addEventListener("lazybeforesizes",function(e){if(e.detail.instance==r){var t,i,a,c,d,f,p,y,z,v,b,A,C;if(t=e.target,e.detail.dataAttr&&!e.defaultPrevented&&!u.disabled&&(z=t.getAttribute(l.sizesAttr)||t.getAttribute("sizes"))&&m.test(z)){if(i=o(t),a=s(t,i),b=g.test(a.prefix)||g.test(a.postfix),a.isPicture&&(c=t.parentNode))for(d=c.getElementsByTagName("source"),f=0,p=d.length;p>f;f++)(b||g.test(y=o(d[f])))&&(n(y,a,d[f]),A=!0);b||g.test(i)?(n(i,a,t),A=!0):A&&(C=[],C.srcset=[],C.isPicture=!0,Object.defineProperty(t,"_lazyrias",{value:C,writable:!0})),A&&(h?t.removeAttribute(l.srcAttr):"auto"!=z&&(v={width:parseInt(z,10)},E({target:t,detail:v})))}}},!0);var E=function(){var i=function(e,t){return e.w-t.w},a=function(e){var t,r,i=e.length,a=e[i-1],n=0;for(n;i>n;n++)if(a=e[n],a.d=a.w/e.w,a.d>=e.d){!a.cached&&(t=e[n-1])&&t.d>e.d-.13*Math.pow(e.d,2.2)&&(r=Math.pow(t.d-.6,1.6),t.cached&&(t.d+=.15*r),t.d+(a.d-e.d)*r>e.d&&(a=t));break}return a},n=function(e,t){var i;return!e._lazyrias&&r.pWS&&(i=r.pWS(e.getAttribute(l.srcsetAttr||""))).length&&(Object.defineProperty(e,"_lazyrias",{value:i,writable:!0}),t&&e.parentNode&&(i.isPicture="PICTURE"==e.parentNode.nodeName.toUpperCase())),e._lazyrias},s=function(t){var i=e.devicePixelRatio||1,a=r.getX&&r.getX(t);return Math.min(a||i,2.4,i)},o=function(t,r){var o,l,u,c,d,f;if(d=t._lazyrias,d.isPicture&&e.matchMedia)for(l=0,o=t.parentNode.getElementsByTagName("source"),u=o.length;u>l;l++)if(n(o[l])&&!o[l].getAttribute("type")&&(!(c=o[l].getAttribute("media"))||(matchMedia(c)||{}).matches)){d=o[l]._lazyrias;break}return(!d.w||d.w<r)&&(d.w=r,d.d=s(t),f=a(d.sort(i))),f},u=function(i){if(i.detail.instance==r){var a,s=i.target;return!A&&(e.respimage||e.picturefill||usfLazySizesConfig.pf)?void t.removeEventListener("lazybeforesizes",u):void(("_lazyrias"in s||i.detail.dataAttr&&n(s,!0))&&(a=o(s,i.detail.width),a&&a.u&&s._lazyrias.cur!=a.u&&(s._lazyrias.cur=a.u,a.cached=!0,r.rAF(function(){s.setAttribute(l.srcAttr,a.u),s.setAttribute("src",a.u)}))))}};return h?u=function(){}:addEventListener("lazybeforesizes",u),u}()}),function(e,t){var r=function(){t(e.lazySizes),e.removeEventListener("lazyunveilread",r,!0)};t=t.bind(null,e,e.document),"object"==typeof module&&module.exports?t(require("lazysizes")):e.lazySizes?r():e.addEventListener("lazyunveilread",r,!0)}(window,function(e,t,r){"use strict";function i(e,r){if(!s[e]){var i=t.createElement(r?"link":"script"),a=t.getElementsByTagName("script")[0];r?(i.rel="stylesheet",i.href=e):i.src=e,s[e]=!0,s[i.src||i.href]=!0,a.parentNode.insertBefore(i,a)}}var a,n,s={};t.addEventListener&&(n=/\(|\)|\s|'/,a=function(e,r){var i=t.createElement("img");i.onload=function(){i.onload=null,i.onerror=null,i=null,r()},i.onerror=i.onload,i.src=e,i&&i.complete&&i.onload&&i.onload()},addEventListener("lazybeforeunveil",function(e){if(e.detail.instance==r){var t,s,o,l;e.defaultPrevented||("none"==e.target.preload&&(e.target.preload="auto"),t=e.target.getAttribute("data-link"),t&&i(t,!0),t=e.target.getAttribute("data-script"),t&&i(t),t=e.target.getAttribute("data-require"),t&&(r.cfg.requireJs?r.cfg.requireJs([t]):i(t)),o=e.target.getAttribute("data-bg"),o&&(e.detail.firesLoad=!0,s=function(){e.target.style.backgroundImage="url("+(n.test(o)?JSON.stringify(o):o)+")",e.detail.firesLoad=!1,r.fire(e.target,"_lazyloaded",{},!0,!0)},a(o,s)),l=e.target.getAttribute("data-poster"),l&&(e.detail.firesLoad=!0,s=function(){e.target.poster=l,e.detail.firesLoad=!1,r.fire(e.target,"_lazyloaded",{},!0,!0)},a(l,s)))}},!1))}),function(e,t){var r=function(i){t(e.lazySizes,i),e.removeEventListener("lazyunveilread",r,!0)};t=t.bind(null,e,e.document),"object"==typeof module&&module.exports?t(require("lazysizes")):e.lazySizes?r():e.addEventListener("lazyunveilread",r,!0)}(window,function(e,t,r,i){"use strict";function a(e){var t=getComputedStyle(e,null)||{},r=t.fontFamily||"",i=r.match(u)||"",a=i&&r.match(c)||"";return a&&(a=a[1]),{fit:i&&i[1]||"",position:g[a]||a||"center"}}function n(e,t){var i,a,n=r.cfg,s=e.cloneNode(!1),o=s.style,l=function(){var t=e.currentSrc||e.src;t&&a!==t&&(a=t,o.backgroundImage="url("+(f.test(t)?JSON.stringify(t):t)+")",i||(i=!0,r.rC(s,n.loadingClass),r.aC(s,n.loadedClass)))},u=function(){r.rAF(l)};e._lazysizesParentFit=t.fit,e.addEventListener("usf-lazyloaded",u,!0),e.addEventListener("load",u,!0),s.addEventListener("load",function(){var e=s.currentSrc||s.src;e&&e!=d&&(s.src=d,s.srcset="")}),r.rAF(function(){var i=e,a=e.parentNode;"PICTURE"==a.nodeName.toUpperCase()&&(i=a,a=a.parentNode),r.rC(s,n.loadedClass),r.rC(s,n.lazyClass),r.aC(s,n.loadingClass),r.aC(s,n.objectFitClass||"lazysizes-display-clone"),s.getAttribute(n.srcsetAttr)&&s.setAttribute(n.srcsetAttr,""),s.getAttribute(n.srcAttr)&&s.setAttribute(n.srcAttr,""),s.src=d,s.srcset="",o.backgroundRepeat="no-repeat",o.backgroundPosition=t.position,o.backgroundSize=t.fit,i.style.display="none",e.setAttribute("data-parent-fit",t.fit),e.setAttribute("data-parent-container","prev"),a.insertBefore(s,i),e._lazysizesParentFit&&delete e._lazysizesParentFit,e.complete&&l()})}var s=t.createElement("a").style,o="objectFit"in s,l=o&&"objectPosition"in s,u=/object-fit["']*\s*:\s*["']*(contain|cover)/,c=/object-position["']*\s*:\s*["']*(.+?)(?=($|,|'|"|;))/,d="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",f=/\(|\)|'/,g={center:"center","50% 50%":"center"};if(!o||!l){var p=function(e){if(e.detail.instance==r){var t=e.target,i=a(t);!i.fit||o&&"center"==i.position||n(t,i)}};e.addEventListener("lazyunveilread",p,!0),i&&i.detail&&p(i)}});

var _usfImageWidths;
var _usfFilterBodyTemplate = /*inc_begin_filter-body*/
`<!-- Range filter -->
<div v-if="isRange" class="usf-facet-values usf-facet-range">
    <!-- Range inputs -->
    <div class="usf-slider-inputs usf-clear">
        <span class="usf-slider-input__from">
            <span class="usf-slider-input__prefix" v-html="facet.sliderPrefix" v-if="facet.showSliderInputPrefixSuffix"></span>
            <input :readonly="!hasRangeInputs" :value="rangeConverter(range[0]).toFixed(rangeDecimals)" @change="e => onRangeInput(e, range[0], 0)">
            <span class="usf-slider-input__suffix" v-html="facet.sliderSuffix" v-if="facet.showSliderInputPrefixSuffix"></span>
        </span>
        <span class="usf-slider-div">-</span>
        <span class="usf-slider-input__to">
            <span class="usf-slider-input__prefix" v-html="facet.sliderPrefix" v-if="facet.showSliderInputPrefixSuffix"></span>
            <input :readonly="!hasRangeInputs" :value="rangeConverter(range[1]).toFixed(rangeDecimals)" @change="e => onRangeInput(e, range[1], 1)">
            <span class="usf-slider-input__suffix" v-html="facet.sliderSuffix" v-if="facet.showSliderInputPrefixSuffix"></span>
        </span>
    </div>
	<!-- See API reference of this component at https://docs.sobooster.com/search/storefront-js-api/slider-component -->
    <usf-slider :color="facet.sliderColor" :symbols="facet.sliderValueSymbols" :prefix="facet.sliderPrefix" :suffix="facet.sliderSuffix" :min="facet.min" :max="facet.max" :pips="facet.range[0]" :step="facet.range[1]" :decimals="rangeDecimals" :value="range" :converter="rangeConverter" @input="onRangeSliderInput" @change="onRangeSliderChange"></usf-slider>
</div>
<!-- List + Swatch filter -->
<div v-else ref="values" :class="'usf-facet-values usf-scrollbar usf-facet-values--' + facet.display + (facet.navigationCollections ? ' usf-navigation' : '') + (facet.valuesTransformation ? (' usf-' + facet.valuesTransformation.toLowerCase()) : '') + (facet.circleSwatch ? ' usf-facet-values--circle' : '')" :style="!usf.isMobileFilter && facet.maxHeight ? { maxHeight: facet.maxHeight } : null">
    <!-- Filter options -->                
    <usf-filter-option v-for="o in visibleOptions" :facet="facet" :option="o" :key="o.id ? o.id : o.label+'_'+o.min+'_'+o.max"></usf-filter-option>
</div>

<!-- More -->
<div v-if="isMoreVisible" class="usf-more" @click="onShowMore" v-html="loc.more"></div>`
/*inc_end_filter-body*/;

var _usfSearchResultsSkeletonItemTpl = /*inc_begin_search-skeleton-item*/
`<div v-if="view === 'grid'" class="usf-sr-product usf-skeleton">
    <div class="usf-img"></div>
    <div class="usf-meta"></div>
</div>
<div class="usf-sr-product usf-skeleton" v-else>
    <!-- Image column -->
    <div class="usf-img-column">
        <div class="usf-img"></div>
    </div>

    <!-- Info column -->
    <div class="usf-info-column">
        <div class="usf-title"></div>
        <div class="usf-vendor"></div>
        <div class="usf-price-wrapper"></div>
    </div>
</div>`
/*inc_end_search-skeleton-item*/;

var _usfSearchResultsSummaryTpl = /*inc_begin_search-summary*/
`<span class="usf-sr-summary" v-html="loader === true ? '&nbsp;' : usf.utils.format(term ? loc.productSearchResultWithTermSummary : loc.productSearchResultSummary, result.total, usf.utils.encodeHtml(term))"></span>`
/*inc_end_search-summary*/;

var _usfSearchResultsViewsTpl = /*inc_begin_search-views*/
`<div class="usf-views">
    <button class="usf-view usf-btn usf-icon usf-icon-grid" aria-label="Grid view" :class="{'usf-active': view === 'grid'}" @click.prevent.stop="onGridViewClick"></button>
    <button class="usf-view usf-btn usf-icon usf-icon-list" aria-label="List view" :class="{'usf-active': view === 'list'}" @click.prevent.stop="onListViewClick"></button>
</div>`
/*inc_end_search-views*/;

var _usfSearchResultsSortByTpl = /*inc_begin_search-sortby*/
`<usf-dropdown :placeholder="loc.sort" :value="sortBy" :options="sortByOptions" @input="onSortByChanged"></usf-dropdown>`
/*inc_end_search-sortby*/;

usf.templates = {
    // application
    app: /*inc_begin_app*/
`<div id="usf_container" class="usf-zone usf-clear" :class="{'usf-filters-horz': usf.settings.filters.horz}">
    <template v-if="hasFilters">
        <usf-filters class="usf-sr-filters"></usf-filters>
    </template>
    <usf-sr></usf-sr>
</div>`
/*inc_end_app*/,

    // search results
    searchResults: `
<div class="usf-sr-container usf-general" :class="{'usf-no-facets': noFacets, 'usf-empty': !loader && !hasResults, 'usf-nosearch': !showSearchBox}">
    <!-- Search form -->
    <form v-if="showSearchBox" action="/search" method="get" role="search" class="usf-sr-inputbox">
        <button type="submit" class="usf-icon usf-icon-search usf-btn"></button>
        <input name="q" autocomplete="off" ref="searchInput" v-model="termModel">
        <button v-if="termModel" class="usf-remove usf-btn" @click.prevent.stop="clearSearch"></button>
    </form>

    <div class="usf-sr-config" v-if="usf.isMobile">
        <div class="usf-sr-config__mobile-filters-wrapper">
            <div class="usf-filters" :class="{'usf-has-filters': !!facetFilters}" @click="onMobileToggle">
                <button class="usf-btn" v-html="loc.filters"></button>
            </div>
            ` + _usfSearchResultsSortByTpl + `
        </div>
        
        ` + _usfSearchResultsSummaryTpl + _usfSearchResultsViewsTpl + `
    </div>
    <div class="usf-sr-config" v-else>
        ` + _usfSearchResultsViewsTpl + _usfSearchResultsSummaryTpl + _usfSearchResultsSortByTpl + `
    </div>

    <usf-sr-banner v-if="result && result.extra && result.extra.banner && !result.extra.banner.isBottom" :banner="result.extra.banner"></usf-sr-banner>

    <!-- Load previous -->
    <div id="usf-sr-top-loader" :class="{'usf-with-loader':loader === 'prev'}" v-if="(loader === 'prev' || itemsOffset) && loader !== true && hasResults && usf.settings.search.more !== 'page'"></div>
    <div :class="\'usf-results usf-clear usf-\' + view">
        <template v-if="0 || loader===true">` + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl +
        `</template>
        <template v-else>
            <template v-if="hasResults">
                <template v-if="view === 'grid'">
                    <template v-for="p in result.items"><usf-sr-griditem :product="p" :result="result" :key="p.id"></usf-sr-griditem></template>
                </template>
                <template v-else>
                    <template v-for="p in result.items"><usf-sr-listitem :product="p" :result="result" :key="p.id"></usf-sr-listitem></template>
                </template>
            </template>
            <template v-else>
                <!-- Empty result -->
                <div class="usf-sr-empty">
                    <div class="usf-icon"></div>
                    <span v-html="term ? usf.utils.format(loc.productSearchNoResults, usf.utils.encodeHtml(term)) : loc.productSearchNoResultsEmptyTerm"></span>
                    <button v-if="facetFilters" class="usf-btn usf-btn-action" v-html="loc.clearAllFilters" @click="usf.queryRewriter.removeAllFacetFilters"></button>
                </div>
            </template>
        </template>
    </div>

    <usf-sr-banner v-if="result && result.extra && result.extra.banner && result.extra.banner.isBottom" :banner="result.extra.banner"></usf-sr-banner>

    <!-- Paging & load more -->
    <div class="usf-sr-paging" v-if="loader !== true">
        <div class="usf-sr-more" v-if="hasResults && usf.settings.search.more === 'more'">
            <div class="usf-title" v-html="usf.utils.format(loc.youHaveViewed, itemsLoaded, result.total)"></div>
            <div class="usf-progress">
                <div :style="{width: (itemsLoaded * 100 / result.total) + '%'}"></div>
            </div>
            <button v-if="itemsLoaded < result.total" class="button button--primary" :class="{'usf-with-loader': loader === 'more'}" @click="onLoadMore"><span v-html="loc.loadMore"></span></button>
        </div>
        <usf-sr-pages v-else-if="hasResults && usf.settings.search.more === 'page'" :page="page" :pages-total="pagesTotal" :pages-to-display="4" :side-pages-to-display="1"></usf-sr-pages>
        <div class="usf-sr-loader usf-with-loader" v-else-if="loader === 'more'"></div>
    </div>
</div>
`,
    // Grid view item
    searchResultsGridViewItem: `
<div class="usf-sr-product usf-grid__item" :product-selector="product.id" :data-usf-pid="product.id">
  <div class="card--media product-grid-item">
    <div class="">
      <a :href="productUrl" @click="onItemClick" @mouseover="onItemHover" @mouseleave="onItemLeave" class="usf-grid__item-link">
        <!-- product image -->
        <div class="usf-img-wrapper usf-sr-product__image-container" :class="{'usf-has-second-img': hoverImage}">
          <div class="usf-main-img usf-lazyload" :data-bgset="selectedImageUrl"></div>
          <span class="usf-img-loader"></span>
          <template v-if="hoverImage">
            <div class="usf-second-img usf-lazyload" :data-bgset="hoverImageUrl"></div>
            <span class="usf-img-loader"></span>
          </template>
          <!-- product image extra -->
          <usf-plugin name="searchResultsProductPreview" :data="pluginData"></usf-plugin>
          <usf-plugin name="searchResultsProductCart" :data="pluginData"></usf-plugin>
        </div>
        <div v-if="isSoldOut && usf.settings.search.showSoldOut" class="usf-badge"><span v-html="loc.soldOut"></span></div>
        <div v-else-if="hasDiscount && usf.settings.search.showSale" class="usf-badge usf-sale-badge"><span v-html="loc.sale"></span></div>
        <!-- Wishlist -->
        <usf-plugin name="searchResultsProductWishList" :data="pluginData"></usf-plugin>

      </a>
    </div>

    <div class="">
      <div class="card__information">
        <!-- product title -->
        <h3 class="card__heading h6" v-html="product.title">
        </h3>

        <!-- Labels -->
        <usf-plugin name="searchResultsProductLabel" :data="pluginData"></usf-plugin>
        <div class="card__tag-container">
          <!-- vendor -->
          <div class="product-vendor">
            <a v-if="usf.settings.search.showVendor" :href="usf.platform.baseUrl + '/collections/vendors?q=' + encodeURIComponent(product.vendor)" v-html="product.vendor"></a>
          </div>
</div>
          <div class="card-levels">

            <div class="card-levels__inner">
              <h5 class="text-base">THC</h5> <span class="text-base">88%</span>
            </div>

            <div class="card-levels__inner">
              <h5 class="text-base">CBD</h5> <span class="text-base">1%</span>
            </div>

          </div>
        
          <!-- price -->
          <usf-plugin name="searchResultsProductPrice" :data="pluginData"></usf-plugin>
          <div class="price">
            <table>
              <thead>
                <tr>
                  <td class="js-market-price price-table-cell ">Market</td>

                  <td class="member-price--label price-table-cell js-member-price-label">Member</td>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="js-market-price price-table-cell ">
                    <span class="usf-discount" v-if="hasDiscount" v-html="displayDiscountedPrice"></span>
                  </td>
                  <td class="price-table-cell member-price">

                    <span class="usf-price" :class="{'usf-has-discount': hasDiscount}" v-html="displayPrice"></span>

                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        
      </div>
    </div>
  </div>
</div>
`,
    // Search result pages
    searchResultsPages: `
<center>
    <ul class="usf-sr-pages">
        <template v-for="e in elements">
            <li v-if="e.type === 'prev'" class="usf-sr-pages__prev"><a href="javascript:void(0)" :title="loc.prevPage" @click="onPrev" style="font-size:14px">←</a></li>
            <li v-else-if="e.type === 'dots'" class="usf-sr-pages__dots"><span>...</span></li>
            <li v-else-if="e.type === 'page' && e.current" class="usf-sr-pages__page usf-active"><span>{{e.page}}</span></li>
            <li v-else-if="e.type === 'page' && !e.current" class="usf-sr-pages__page"><a href="javascript:void(0)" @click="ev=>onPage(e.page,ev)" :title="usf.utils.format(loc.gotoPage,e.page)">{{e.page}}</a></li>
            <li v-else-if="e.type === 'next'" class="usf-sr-pages__next"><a href="javascript:void(0)" :title="loc.nextPage" @click="onNext" style="font-size:14px">→</a></li>
        </template>
    </ul>
</center>
`,
    // List view item
    searchResultsListViewItem: /*inc_begin_search-list-item*/
`<a class="usf-sr-product" @click="onItemClick" @mouseover="onItemHover" @mouseleave="onItemLeave" :href="productUrl" :data-usf-pid="product.id">
    <!-- Image column -->
    <div class="usf-img-column">
        <!-- product image -->
        <div class="usf-img-wrapper usf-sr-product__image-container" :class="{'usf-has-second-img': hoverImage}">
            <div class="usf-main-img lazyload" :data-bgset="_usfGetScaledImageUrl(scaledSelectedImageUrl)" :style="{'background-image': 'url(' + getSelectedImageUrl('600') + ')'}"></div>
            <span class="usf-img-loader"></span>
            <template v-if="hoverImage">
                <div class="usf-second-img lazyload" :data-bgset="_usfGetScaledImageUrl(scaledHoverImageUrl)" :style="{'background-image': 'url(' + getHoverImageUrl('600') + ')'}"></div>
                <span class="usf-img-loader"></span>
            </template>
            <!-- product image extra -->
            <usf-plugin name="searchResultsProductPreview" :data="pluginData"></usf-plugin>
            <usf-plugin name="searchResultsProductCart" :data="pluginData"></usf-plugin>
            
            <div v-if="isSoldOut && usf.settings.search.showSoldOut" class="usf-badge"><span v-html="loc.soldOut"></span></div>
            <div v-else-if="hasDiscount && usf.settings.search.showSale" class="usf-badge usf-sale-badge"><span v-html="loc.sale"></span></div>
        </div>
    </div>

    <!-- Info column -->
    <div class="usf-info-column">
        <div class="usf-title" v-html="product.title"></div>
        <div class="usf-vendor" v-if="usf.settings.search.showVendor" v-html="product.vendor"></div>

        <!-- price -->
        <usf-plugin name="searchResultsProductPrice" :data="pluginData"></usf-plugin>
        <div class="usf-price-wrapper" :class="{'usf-price--sold-out': isSoldOut}" v-if="!usf.plugins.lastRenderResult" :data-variant-id="product.selectedVariantId">
            <span class="usf-price" :class="{'usf-has-discount': hasDiscount}" v-html="displayPrice"></span>
            <span class="usf-discount" v-if="hasDiscount" v-html="displayDiscountedPrice"></span>
            <span v-if="hasDiscount" class="usf-price-savings" v-html="loc.save + ' ' + salePercent + '%'"></span>
        </div>
        <div class="usf-description"></div>
    </div>
</a>`
/*inc_end_search-list-item*/,
    // AddToCart Plugin	
    addToCartPlugin: /*inc_begin_addtocart-plugin*/
`<form class="usf-add-to-cart" method="POST" enctype="multipart/form-data" :action="usf.platform.addToCartUrl">
    <input type="hidden" name="form_type" value="product">
    <input type="hidden" name="utf8" value="✓">
    <input type="hidden" name="quantity" value="1">
    <input type="hidden" name="id" :value="variant.id">
    <usf-choose-options v-if="args.product.variants.length > 1" :loc="usf.settings.translation" :args="args"></usf-choose-options>
    <button v-else-if="!usf.utils.isVariantSoldOut(variant)" type="submit" name="add" class="usf-add-to-cart-btn" :data-product-id="args.product.id" @click.prevent.stop="_usfAddToCart">
        <span class="usf-icon usf-icon-cart"></span>
        <span class="usf-label" v-html="loc.addToCart"></span>
    </button>
</form>`
/*inc_end_addtocart-plugin*/,

    // Preview Plugin
    previewPlugin: /*inc_begin_preview-plugin*/
`<div class="usf-sr-preview" :class="['usf-sr-' + settings.iconPosition]" @click.prevent.stop="onShowModal">
    <span class="usf-icon usf-icon-eye"></span>
</div>`
/*inc_end_preview-plugin*/,

    previewPluginModal: /*inc_begin_preview-modal*/
`<div><div class="usf-backdrop"></div><div class="usf-preview__wrapper usf-zone"><div class="usf-preview__container">
    <div class="usf-preview">
        <!-- Close button -->
        <div class="usf-remove" @click="onClose"></div>

        <!-- Body content -->
        <div class="usf-preview__body">
            <!-- left - images of product -->
            <div class="usf-preview__content-left">
                <!-- Big image -->
                <div class="usf-preview__image-slider">
                    <div type="button" title="Prev" class="usf-preview__image-slider__btn usf-prev usf-icon usf-icon-up" @click="onPrevImage(0)" v-if="showBigImageNav"></div>

                    <div class="usf-preview__image-slider__track">
                        <div v-for="i in images" class="usf-preview__image-wrapper" :class="{'usf-active': image === i}"">
                            <div v-if="image === i" class="usf-preview__image lazyload" :data-bgset="usf.platform.getImageUrl(i.url,1024)" :style="'background-image:url('+usf.platform.getImageUrl(i.url, 1024)+')'"></div>
                            <span class="usf-img-loader"></span>
                        </div>
                    </div>

                    <div type="button" title="Next" class="usf-preview__image-slider__btn usf-next usf-icon usf-icon-up" @click="onNextImage(0)" v-if="showBigImageNav"></div>

                    <ul class="usf-preview__image-slider__dots" v-if="showImageIndices && false">
                        <li :class="{'active':i===image}" v-for="(i,index) in images"  @click="onThumbClick(i)"><button type="button">{{index+1}}</button></li>
                    </ul>
                </div>

                <!-- Thumbnails -->
                <div class="usf-preview__thumbs" v-if="showThumbs">
                    <div class="usf-preview__thumbs-inner">
                        <span v-for="i in images" class="usf-preview__thumb" :class="{'usf-active': image === i}" @click="onThumbClick(i)"></span>
                    </div>
                </div>

                <!-- Badges -->
                <div class="usf-preview__badge usf-preview__badge-sale" v-if="hasDiscount" v-html="loc.sale"></div>
            </div>

            <!-- right - info of the product -->
            <div class="usf-preview__content-right usf-scrollbar">
                <div class="usf-preview__content-summary">
                    <!-- Product title -->
                    <h1 class="usf-preview__title"><a :href="productUrl" v-html="product.title"></a></h1>

                    <!-- Vendor -->
                    <div class="usf-preview__vendor" v-html="product.vendor" v-if="usf.settings.search.showVendor"></div>

                    <!--Prices -->
                    <div class="usf-preview__price-wrapper" :class="{'price--sold-out': isSoldOut}">
                        <span class="usf-price" :class="{'usf-has-discount': hasDiscount}" v-html="usf.utils.getDisplayPrice(selectedVariant.compareAtPrice || selectedVariant.price)"></span>
                        <span v-if="hasDiscount" class="usf-discount" v-html="usf.utils.getDisplayPrice(selectedVariant.price)"></span>

                        <div v-if="false" class="price__badges price__badges--listing">
                            <span class="price__badge price__badge--sale" aria-hidden="true" v-if="hasDiscount && usf.settings.search.showSale">
                                <span v-html="loc.sale"></span>
                            </span>
                            <span class="price__badge price__badge--sold-out" v-if="isSoldOut && usf.settings.search.showSoldOut">
                                <span v-html="loc.soldOut"></span>
                            </span>
                        </div>
                    </div>

                    <!-- Description -->
                    <p class="usf-preview__description" :class="{'usf-with-loader':description===undefined}" v-html="description"></p>

                    <!-- Add to cart form -->
                    <form method="post" enctype="multipart/form-data" :action="usf.platform.addToCartUrl" @submit="_usfAddToCart">
                        <!-- variant ID -->
                        <input type="hidden" name="id" :value="selectedVariant.id" />

                        <!-- Options -->
                        <template v-for="(o,index) in product.options">
                            <usf-preview-modal-option :option="o" :index="index"></usf-preview-modal-option>
                        </template>

                        <!-- add to card button -->
                        <div class="usf-preview__field">                            
                            <div class="usf-flex usf-preview__add-to-cart">
                                <usf-num-input v-model="quantity" name="quantity" :disabled="!hasAvailableVariant" :min="1" :max="available" />
                                <button :title="!hasAvailableVariant ? loc.selectedVariantNotAvailable : ''" :disabled="!hasAvailableVariant" type="submit" name="add" class="usf-add-to-cart-btn" :class="{ 'usf-disabled': !hasAvailableVariant}">
                                    <span class="usf-label" v-html="loc.addToCart"></span>
                                </button>
                            </div>
                        </div>
                    </form>

                    <!-- See details link -->
                    <a class="usf-preview__link" :href="productUrl" v-html="loc.seeFullDetails"></a>
                </div>
            </div>
        </div>
    </div>
</div></div></div>`
/*inc_end_preview-modal*/,

    searchResultsBanner: /*inc_begin_search-banner*/        
`<div class="usf-sr-banner">
    <a :href="banner.url || 'javascript:void(0)'" :alt="banner.description">
        <img :src="banner.mediaUrl" style="max-width:100%">
    </a>
</div>
`
/*inc_end_search-banner*/,

    ////////////////////////
    // Filter templates
    // facet filters breadcrumb
    filtersBreadcrumb: /*inc_begin_filters-breadcrumb*/
`<div v-if="usf.settings.filterNavigation.showFilterArea && root.facetFilters && root.facets && facetFilterIds.length" class="usf-refineby">
    <!-- Breadcrumb Header -->
    <div class="usf-title usf-clear">
        <span class="usf-pull-left usf-icon usf-icon-equalizer"></span>
        <span class="usf-label" v-html="loc.filters"></span>

        <!-- Clear all -->
        <button class="usf-clear-all usf-btn" v-html="loc.clearAll" @click.prevent.stop="root.removeAllFacetFilters" :aria-label="loc.clearAllFilters"></button>
    </div>

    <!-- Breadcrumb Values -->
    <div class="usf-refineby__body">
        <template v-for="facetId in facetFilterIds" v-if="(facet = root.facets.find(fc => fc.id === facetId)) && (f = root.facetFilters[facetId])">
            <template v-for="queryValStr in f[1]">
                <div class="usf-refineby__item usf-pointer usf-clear" @click.prevent.stop="root.removeFacetFilter(facetId, queryValStr)">
                    <button class="usf-btn"><span class="usf-filter-label" v-html="facet.title + ': '"></span><b v-html="root.formatBreadcrumbLabel(facet, f[0], usf.utils.encodeHtml(queryValStr))"></b></button><span class="usf-remove"></span>
                </div>
            </template>
        </template>
    </div>
 </div>`
 /*inc_end_filters-breadcrumb*/,

    // facet filters    
    filters: /*inc_begin_filters*/
// Vert & Horz modes have different render order
`<div class="usf-facets usf-no-select usf-zone" :class="{'usf-facets--mobile':usf.isMobileFilter}">
<!-- Mobile view -->
<template v-if="usf.isMobile">
    <div class="usf-close" @click="onMobileBack(1)"></div>
    <div class="usf-facets-wrapper">
        <!-- Header. shows 'Filters', facet name, etc. -->
        <div class="usf-header">
            <!-- Single facet mode -->
            <template v-if="isSingleFacetMode">
                <div class="usf-title" @click="onMobileBack(0)" v-html="facets[0].title"></div>
                <div v-if="facetFilters" class="usf-clear" @click="removeAllFacetFilters" v-html="loc.clear"></div>
            </template>

            <!-- When a filter is selected -->
            <template v-else-if="mobileSelectedFacet">
                <div class="usf-title usf-back" @click="onMobileBack(0)" v-html="mobileSelectedFacet.title"></div>
                <div v-if="facetFilters && facetFilters[mobileSelectedFacet.id]" class="usf-clear" @click="removeFacetFilter(mobileSelectedFacet.id)" v-html="loc.clear"></div>
                <div v-else-if="mobileSelectedFacet.multiple" class="usf-all" @click="selectFacetFilter(mobileSelectedFacet)" v-html="loc.all"></div>
            </template>

            <!-- When no filter is selected -->
            <template v-else>
                <div class="usf-title" @click="onMobileBack(0)" v-html="loc.filters"></div>
                <div v-if="facetFilters" class="usf-clear" @click="removeAllFacetFilters" v-html="loc.clearAll"></div>
            </template>
        </div>

        <div class="usf-body">
            <!-- Desktop-like filter in mobile -->
            <template v-if="usf.settings.filters.desktopLikeMobile">
                <usf-filter-breadcrumb></usf-filter-breadcrumb>
                
                <!-- Facets body -->
                <div class="usf-facets__body">
                    <usf-filter :facet="f" :key="f.id" v-for="f in facets"></usf-filter>
                </div>
            </template>
            
            <!-- Mobile filter -->
            <template v-else>
                <!-- List all filter options, in single facet mode -->
                <usf-filter v-if="isSingleFacetMode" :facet="facets[0]"></usf-filter>

                <!-- List all filter options, when a filter is selected -->
                <usf-filter v-else-if="mobileSelectedFacet" :facet="mobileSelectedFacet"></usf-filter>

                <!-- List all when there are more than one facet -->
                <template v-else v-for="f in facets">
                    <template v-if="canShowFilter(f)">
                        <div :key="f.id" class="usf-facet-value" @click="onMobileSelectFacet(f)">
                            <span class="usf-title" v-html="f.title"></span>
                            <div v-if="(selectedFilterOptionValues = facetFilters && (ff = facetFilters[f.id]) ? ff[1] : null)" class="usf-dimmed">
                                <span v-for="cf in selectedFilterOptionValues" v-html="formatBreadcrumbLabel(f, f.facetName, cf)"></span>
                            </div>
                        </div>
                    </template>
                </template>
            </template>
        </div>

        <!-- View items -->
        <div class="usf-footer">
            <div @click="onMobileBack(1)" v-html="loc.viewItems"></div>
        </div>
    </div>
</template>

<!-- Desktop view -->
<template v-else>
    <usf-filter-breadcrumb></usf-filter-breadcrumb>
    <!-- Filters Loader -->
    <div v-if="!facets" class="usf-facets__first-loader">
        <template v-for="i in 3">
            <div class="usf-facet"><div class="usf-title usf-no-select"><span class="usf-label"></span></div>
                <div v-if="!usf.settings.filters.horz" class="usf-container"><div class="usf-facet-values usf-facet-values--List"><div class="usf-relative usf-facet-value usf-facet-value-single"><span class="usf-label"></span><span class="usf-value"></span></div><div class="usf-relative usf-facet-value usf-facet-value-single"><span class="usf-label"></span><span class="usf-value"></span></div></div></div>
            </div>
        </template>
    </div>
    <!-- Facets body -->
    <div v-else class="usf-facets__body">
        <usf-filter :facet="f" :key="f.id" v-for="f in facets"></usf-filter>
    </div>
</template>
</div>`
/*inc_end_filters*/,

    // facet filter item
    filter: /*inc_begin_filter*/
`<div v-if="canShow" class="usf-facet" :class="{'usf-collapsed': collapsed && !usf.isMobileFilter, 'usf-has-filter': isInBreadcrumb}">
    <!-- Mobile filter -->
    <div v-if="usf.isMobileFilter" class="usf-container">
        <!-- Search box -->
        <input v-if="hasSearchBox" class="usf-search-box" :aria-label="loc.filterOptions" :placeholder="loc.filterOptions" :value="term" @input="v => term = v.target.value">

        <!-- Values -->
        ` + _usfFilterBodyTemplate +
    `</div>

    <!-- Desktop filter -->
    <template v-else>
        <!-- Filter title -->
        <div class="usf-clear">
            <div class="usf-title usf-no-select" @click.prevent.stop="onExpandCollapse">
                <button class="usf-label usf-btn" v-html="facet.title" :aria-label="usf.utils.format(loc.filterBy,facet.title)" :aria-expanded="!collapsed"></button>
                <usf-helptip v-if="facet.tooltip" :tooltip="facet.tooltip"></usf-helptip>            
                <!-- 'Clear all' button to clear the current facet filter. -->
                <button v-if="isInBreadcrumb" class="usf-clear-all usf-btn" :title="loc.clearFilterOptions" :aria-label="usf.utils.format(loc.clearFiltersBy,facet.title)" @click.prevent.stop="onClear" v-html="loc.clear"></button>
                <span class="usf-pm"></span>
            </div>
        </div>

        <!-- Filter body -->
        <div class="usf-container">
            <!-- Search box -->
            <input v-if="hasSearchBox" class="usf-search-box" :placeholder="loc.filterOptions" :value="term" @input="v => term = v.target.value">

            ` + _usfFilterBodyTemplate +
        `
        </div>
    </template>
</div>`
/*inc_end_filter*/,

    // facet filter option
    filterOption: /*inc_begin_filter-option*/
`<div v-if="children" :class="(isSelected ? 'usf-selected ' : '') + ' usf-relative usf-facet-value usf-facet-value-single usf-with-children' + (collapsed ? ' usf-collapsed' : '')">
    <!-- option label -->
    <button class="usf-pm usf-btn" aria-label="Toggle children" v-if="children" @click.prevent.stop="onToggleChildren"></button>
    <button class="usf-label usf-btn" v-html="label" @click.prevent.stop="onToggle"></button>

    <!-- product count -->
    <span v-if="!(!usf.settings.filterNavigation.showProductCount || (swatchImage && !usf.isMobileFilter)) && option.value !== undefined" class="usf-value">{{option.value}}</span>    

    <div class="usf-children-container" v-if="children && !collapsed">
        <button :class="'usf-child-item usf-btn usf-facet-value' + (isChildSelected(c) ? ' usf-selected' : '')" v-for="c in children" v-html="getChildLabel(c)" @click="onChildClick(c)"></button>
    </div>
</div>
<button v-else :class="(isSelected ? 'usf-selected ' : '') + (swatchImage ? ' usf-facet-value--with-background' : '') + ' usf-btn usf-relative usf-facet-value usf-facet-value-' + (facet.multiple ? 'multiple' : 'single')" :title="isSwatch || isBox ? label + ' (' + option.value + ')' : undefined" :style="usf.isMobileFilter ? null : swatchStyle" @click.prevent.stop="onToggle">
    <!-- checkbox -->
    <div v-if="!isBox && !isSwatch && facet.multiple" :class="'usf-checkbox' + (isSelected ? ' usf-checked' : '')">
        <span class="usf-checkbox-inner"></span>
    </div>

    <!-- swatch image in mobile -->
    <div v-if="swatchImage && usf.isMobileFilter" class="usf-mobile-swatch" :style="swatchStyle"></div>

    <!-- option label -->
    <span class="usf-label usf-btn" v-html="label"></span>
    
    <!-- product count -->
    <span v-if="!(!usf.settings.filterNavigation.showProductCount || (swatchImage && !usf.isMobileFilter)) && option.value !== undefined" class="usf-value">{{option.value}}</span>
</button>`
/*inc_end_filter-option*/,

    // Instant search popup
    instantSearch: /*inc_begin_instantsearch*/
`<div :class="'usf-popup usf-zone usf-is usf-is--compact usf-is--' + position + (shouldShow ? '' : ' usf-hide') + (isEmpty ? ' usf-empty' : '') + (hasProductsOnly ? ' usf-is--products-only' : '') + (firstLoader ? ' usf-is--first-loader': '')"  :style="usf.isMobile ? null : {left: this.left + 'px',top: this.top + 'px',width: this.width + 'px'}">
    <!-- Mobile search box -->
    <div v-if="usf.isMobile">
        <form class="usf-is-inputbox" :action="searchUrl" method="get" role="search">
            <span class="usf-icon usf-icon-back usf-close" @click="usf.utils.hideInstantSearch"></span>
            <input name="q" autocomplete="off" ref="searchInput" :value="term" @input="onSearchBoxInput">
            <span class="usf-remove" v-if="term" @click="onClear"></span>
        </form>
    </div>

    <!-- First loader -->
    <div class="usf-is-first-loader" v-if="firstLoader">
        <div class="usf-clear">
            <div class="usf-img"></div>
            <div class="usf-title"></div>
            <div class="usf-subtitle"></div>
        </div>
        <div class="usf-clear">
            <div class="usf-img"></div>
            <div class="usf-title"></div>
            <div class="usf-subtitle"></div>
        </div>
        <div class="usf-clear">
            <div class="usf-img"></div>
            <div class="usf-title"></div>
            <div class="usf-subtitle"></div>
        </div>
    </div>

    <!-- All JS files loaded -->
    <template v-else>
        <!-- Empty view -->
        <div v-if="isEmpty" class="usf-is-no-results">
            <div style="background:url('//cdn.shopify.com/s/files/1/0257/0108/9360/t/85/assets/no-items.png?t=2') center no-repeat;min-height:160px"></div>
            <div v-html="usf.utils.format(loc.noMatchesFoundFor, usf.utils.encodeHtml(term))"></div>
        </div>
        <template v-else>
            <!-- Body content -->
            <div class="usf-is-content">
                <!-- Products -->
                <div class="usf-is-matches usf-is-products">
                    <div class="usf-title" v-html="queryOrTerm ? loc.productMatches : loc.trending"></div>
                    
                    <div class="usf-is-list" v-if="result.items.length">
                        <!-- Did you mean -->
                        <span class="usf-is-did-you-mean" v-html="usf.utils.format(loc.didYouMean, usf.utils.encodeHtml(term), result.query)" v-if="termDiffers"></span>

                        <!-- Product -->
                        <usf-is-item v-for="p in result.items" :product="p" :result="result" :key="p.id + '-' + p.selectedVariantId"></usf-is-item>
                    </div>
                    <div class="usf-is-list" v-else style="background:url('//cdn.shopify.com/s/files/1/0257/0108/9360/t/85/assets/no-products.png?t=2') center no-repeat;min-height:250px"></div>
                </div>

                <div class="usf-is-side">
                    <!-- Suggestions -->
                    <div class="usf-is-matches usf-is-suggestions" v-if="result.suggestions && result.suggestions.length">
                        <div class="usf-title" v-html="loc.searchSuggestions"></div>
                        <button v-for="s in result.suggestions" class="usf-is-match usf-btn" v-html="usf.utils.highlight(s, result.query)" @click="search(s)"></button>
                    </div>

                    <!-- Collections -->
                    <div class="usf-is-matches usf-is-collections" v-if="result.collections && result.collections.length">
                        <div class="usf-title" v-html="loc.collections"></div>
                        <button v-for="c in result.collections" class="usf-is-match usf-btn" v-html="usf.utils.highlight(c.title, result.query)" @click="selectCollection(c)"></button>
                    </div>

                    <!-- Pages -->
                    <div class="usf-is-matches usf-is-pages" v-if="result.pages && result.pages.length">
                        <div class="usf-title" v-html="loc.pages"></div>
                        <button v-for="p in result.pages" class="usf-is-match usf-btn" v-html="usf.utils.highlight(p.title, result.query)" @click="selectPage(p)"></button>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="usf-is-viewall">
                <button class="usf-btn" @click="search(queryOrTerm)" v-html="usf.utils.format(queryOrTerm ? loc.viewAllResultsFor : loc.viewAllResults, usf.utils.encodeHtml(queryOrTerm))"></button>
            </div>
        </template>
    </template>
</div>`
/*inc_end_instantsearch*/
,

    // Instant search item
    instantSearchItem:/*inc_begin_instantsearch-item*/
`<div class="usf-is-product usf-clear" @click="onItemClick">
    <!-- Image -->
    <div class="usf-img-wrapper usf-pull-left">
        <img class="usf-img" :src="selectedImageUrl" :alt="selectedImage.alt">
    </div>
    
    <div class="usf-pull-left">
        <!-- Title -->
        <button class="usf-title usf-btn" v-html="usf.utils.highlight(product.title, result.query)"></button>

        <!-- Vendor -->
        <div class="usf-vendor" v-html="product.vendor" v-if="usf.settings.search.showVendor"></div>

        <!-- Prices -->
        <div class="usf-price-wrapper">
            <span class="usf-price" :class="{ 'usf-has-discount': hasDiscount }" v-html="displayPrice"></span>
            <span v-if="hasDiscount" class="usf-discount" v-html="displayDiscountedPrice"></span>
        </div>
    </div>
</div>`
/*inc_end_instantsearch-item*/,

    miniCart: /*inc_begin_minicart*/
`<div class="usf-minicart-wrap usf-zone">
    <div class="usf-minicart-backdrop" @click="hide"></div>
    <div class="usf-minicart-container">
        <div class="usf-minicart-container-inner">
            <div class="usf-minicart-heading">
                <div v-if="cart.item_count <= 1" class="usf-minicart-title" v-html="usf.utils.format(loc.yourCartItem,cart.item_count)"></div>
                <div v-else class="usf-minicart-title" v-html="usf.utils.format(loc.yourCartItems,cart.item_count)"></div>
                <div class="usf-minicart-close" @click="hide"><div class="usf-remove" ></div></div>
            </div>
            <div class="usf-minicart-content">
                <div class="usf-minicart-top">
                    <div v-if="!cart.item_count" class="usf-minicart-empty" v-html="loc.yourCartIsEmpty"></div>
                    <template v-else>
                        <div v-for="(item,index) in cart.items" class="usf-minicart-item">
                            <a class="usf-minicart-item-image" :href="item.url" :title="item.product_title">
                                <img :src="usf.platform.getImageUrl(item.image || usf.platform.emptyImage.url, '60')" :alt="item.product_title">
                            </a>
                            <div class="usf-minicart-item-details">
                                <div class="usf-minicart-item-details-inner">
                                    <div class="usf-minicart-item-group-title">
                                        <p class="usf-minicart-item-name">
                                            <a :href="item.url" v-html="item.product_title"></a>
                                        </p>
                                        <p class="usf-minicart-item-vendor" v-html="item.vendor"></p>
                                        <div v-if="item.options_with_values.length" class="usf-minicart-item-options">
                                            <div v-for="o in item.options_with_values" v-if="o.value != 'Default Title'" class="usf-minicart-item-option-element">
                                                <span class="usf-minicart-item-option-name">{{o.name}}:</span>
                                                <span class="usf-minicart-item-option-value">{{o.value}}</span>
                                            </div>
                                        </div>
                                        <button :title="loc.removeCartItem" class="usf-minicart-item-remove" @click.prevent.stop="updateCartItem(item.id,0)">
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" x="0" y="0" version="1.1" viewBox="0 0 29 29" xml:space="preserve">
                                                <path d="M19.795 27H9.205a2.99 2.99 0 0 1-2.985-2.702L4.505 7.099A.998.998 0 0 1 5.5 6h18a1 1 0 0 1 .995 1.099L22.78 24.297A2.991 2.991 0 0 1 19.795 27zM6.604 8L8.21 24.099a.998.998 0 0 0 .995.901h10.59a.998.998 0 0 0 .995-.901L22.396 8H6.604z" />
                                                <path d="M26 8H3a1 1 0 110-2h23a1 1 0 110 2zM14.5 23a1 1 0 01-1-1V11a1 1 0 112 0v11a1 1 0 01-1 1zM10.999 23a1 1 0 01-.995-.91l-1-11a1 1 0 01.905-1.086 1.003 1.003 0 011.087.906l1 11a1 1 0 01-.997 1.09zM18.001 23a1 1 0 01-.997-1.09l1-11c.051-.55.531-.946 1.087-.906a1 1 0 01.905 1.086l-1 11a1 1 0 01-.995.91z" />
                                                <path d="M19 8h-9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1zm-8-2h7V4h-7v2z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="usf-minicart-item-group-price">
                                        <usf-num-input :value="item.quantity" @input="v => updateCartItem(item.id,v)"></usf-num-input>
                                        <span class="usf-minicart-item-line">x</span>
                                        <span class="usf-minicart-item-price"><span class="money"><span class="money" v-html="getMiniCartPrice(item.price)"></span></span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
                <div class="usf-minicart-bottom">
                    <div class="usf-subtotal">
                        <span class="usf-subtotal-label" v-html="loc.subtotal"></span>
                        <span class="usf-subtotal-price"><span class="money" v-html="getMiniCartPrice(cart.total_price)"></span></span>
                    </div>
                    <div class="usf-checkout-action">
                        <div class="usf-checkout">
                            <a :href="usf.platform.baseUrl + '/checkout'" class="usf-checkout-btn" v-html="loc.checkout"></a>
                        </div>
                        <div class="usf-viewcart">
                            <a :href="usf.platform.baseUrl + '/cart'" v-html="loc.viewCart"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`
/*inc_end_minicart*/,
};

usf.event.add('init', function () {    
	// register or override components
    // ...    
    /*var SearchResultsGridItem2 = {
        template: usf.templates.searchResultsGridViewItem,
    }
    usf.register(SearchResultsGridItem2, usf.components.SearchResultsGridItem, "usf-sr-griditem");*/
    _usfImageWidths = _usfIsDynamicImage ? [200, 400, 600, 700, 800, 900, 1000, 1200] : [usf.settings.search.imageSize];

    /*inc_end_minicart-js*/
    // register to the `usfShowCartPanel` event to show the mini cart panel.
    document.addEventListener('usfShowCartPanel', async function () {
        // get cart info
        var cart = await fetch(usf.platform.baseUrl +'/cart.js', {
            credentials: 'same-origin',
            method: 'GET'
        }).then(function (response) {
            return response.json()
        })

        // set minicart's translations here
        var miniCartTranslations = {
            'en': {
                yourCartItems: 'Your cart ({0} items)',
                yourCartItem: 'Your cart ({0} item)',
                yourCartIsEmpty: 'Your cart is currently empty',
                subtotal: 'Subtotal:',
                checkout: 'Checkout',
                viewCart: 'View cart',
                removeCartItem: 'Remove this item'
            }
        }
        var miniCartTranslation = miniCartTranslations[usf.platform.locale];
        if (!miniCartTranslation)
            miniCartTranslation = miniCartTranslations['en']
        Object.assign(miniCartTranslation, usf.settings.translation);
        
        // show cart modal
        // create the placeholder element to show the preview popup
        var popup = document.createElement('div');
        document.body.appendChild(popup);

        new RVue({
            el: popup,
            template: usf.templates.miniCart, // the mini cart panel template
            
            data: {
                cart,
                loc: miniCartTranslation
            },

            mounted(){
                setTimeout(() => this.$el.classList.add('usf-minicart-active'), 0);
            },
            
            methods: {
                hide() {
                    this.$el.classList.remove('usf-minicart-active');
                    setTimeout(() => {
                        document.body.removeChild(this.$el);
                    }, 300);
                },

                updateCartItem(id, quantity) {
                    this.cart.items.forEach(item => {
                        if (item.id === id)
                            item.quantity = quantity;
                    });

                    fetch(usf.platform.baseUrl + "/cart/change.js", {
                        body: JSON.stringify({
                            id: String(id),
                            quantity: quantity
                        }),
                        credentials: "same-origin",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "X-Requested-With": "XMLHttpRequest"
                        }
                    }).then((e) => {
                        e.json().then((e) => {
                            this.cart = e;
                        })
                    })
                },

                getMiniCartPrice(price) {
                    return usf.utils.getDisplayPrice(price / 100)
                }
            }
        });
    })
    /*inc_end_minicart-js*/
});

function _usfOnAddToCartSuccess(rs, formSelector) {
    document.dispatchEvent(new CustomEvent('usfShowCartPanel'));
}
