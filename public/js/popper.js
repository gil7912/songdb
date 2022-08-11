/*! For license information please see popper.js.LICENSE.txt */
(()=>{"use strict";var t={};t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}();var e="undefined"!=typeof window&&"undefined"!=typeof document&&"undefined"!=typeof navigator;const o=function(){const t=["Edge","Trident","Firefox"];for(let o=0;o<t.length;o+=1)if(e&&navigator.userAgent.indexOf(t[o])>=0)return 1;return 0}();var n=e&&window.Promise?function(t){let e=!1;return()=>{e||(e=!0,window.Promise.resolve().then((()=>{e=!1,t()})))}}:function(t){let e=!1;return()=>{e||(e=!0,setTimeout((()=>{e=!1,t()}),o))}};function r(t){return t&&"[object Function]"==={}.toString.call(t)}function i(t,e){if(1!==t.nodeType)return[];const o=t.ownerDocument.defaultView.getComputedStyle(t,null);return e?o[e]:o}function s(t){return"HTML"===t.nodeName?t:t.parentNode||t.host}function f(t){if(!t)return document.body;switch(t.nodeName){case"HTML":case"BODY":return t.ownerDocument.body;case"#document":return t.body}const{overflow:e,overflowX:o,overflowY:n}=i(t);return/(auto|scroll|overlay)/.test(e+n+o)?t:f(s(t))}function p(t){return t&&t.referenceNode?t.referenceNode:t}const a=e&&!(!window.MSInputMethodContext||!document.documentMode),l=e&&/MSIE 10/.test(navigator.userAgent);function c(t){return 11===t?a:10===t?l:a||l}function d(t){if(!t)return document.documentElement;const e=c(10)?document.body:null;let o=t.offsetParent||null;for(;o===e&&t.nextElementSibling;)o=(t=t.nextElementSibling).offsetParent;const n=o&&o.nodeName;return n&&"BODY"!==n&&"HTML"!==n?-1!==["TH","TD","TABLE"].indexOf(o.nodeName)&&"static"===i(o,"position")?d(o):o:t?t.ownerDocument.documentElement:document.documentElement}function h(t){return null!==t.parentNode?h(t.parentNode):t}function u(t,e){if(!(t&&t.nodeType&&e&&e.nodeType))return document.documentElement;const o=t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING,n=o?t:e,r=o?e:t,i=document.createRange();i.setStart(n,0),i.setEnd(r,0);const{commonAncestorContainer:s}=i;if(t!==s&&e!==s||n.contains(r))return function(t){const{nodeName:e}=t;return"BODY"!==e&&("HTML"===e||d(t.firstElementChild)===t)}(s)?s:d(s);const f=h(t);return f.host?u(f.host,e):u(t,h(e).host)}function m(t,e="top"){const o="top"===e?"scrollTop":"scrollLeft",n=t.nodeName;if("BODY"===n||"HTML"===n){const e=t.ownerDocument.documentElement;return(t.ownerDocument.scrollingElement||e)[o]}return t[o]}function g(t,e){const o="x"===e?"Left":"Top",n="Left"===o?"Right":"Bottom";return parseFloat(t[`border${o}Width`])+parseFloat(t[`border${n}Width`])}function b(t,e,o,n){return Math.max(e[`offset${t}`],e[`scroll${t}`],o[`client${t}`],o[`offset${t}`],o[`scroll${t}`],c(10)?parseInt(o[`offset${t}`])+parseInt(n["margin"+("Height"===t?"Top":"Left")])+parseInt(n["margin"+("Height"===t?"Bottom":"Right")]):0)}function w(t){const e=t.body,o=t.documentElement,n=c(10)&&getComputedStyle(o);return{height:b("Height",e,o,n),width:b("Width",e,o,n)}}var y=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n])}return t};function v(t){return y({},t,{right:t.left+t.width,bottom:t.top+t.height})}function x(t){let e={};try{if(c(10)){e=t.getBoundingClientRect();const o=m(t,"top"),n=m(t,"left");e.top+=o,e.left+=n,e.bottom+=o,e.right+=n}else e=t.getBoundingClientRect()}catch(t){}const o={left:e.left,top:e.top,width:e.right-e.left,height:e.bottom-e.top},n="HTML"===t.nodeName?w(t.ownerDocument):{},r=n.width||t.clientWidth||o.width,s=n.height||t.clientHeight||o.height;let f=t.offsetWidth-r,p=t.offsetHeight-s;if(f||p){const e=i(t);f-=g(e,"x"),p-=g(e,"y"),o.width-=f,o.height-=p}return v(o)}function E(t,e,o=!1){const n=c(10),r="HTML"===e.nodeName,s=x(t),p=x(e),a=f(t),l=i(e),d=parseFloat(l.borderTopWidth),h=parseFloat(l.borderLeftWidth);o&&r&&(p.top=Math.max(p.top,0),p.left=Math.max(p.left,0));let u=v({top:s.top-p.top-d,left:s.left-p.left-h,width:s.width,height:s.height});if(u.marginTop=0,u.marginLeft=0,!n&&r){const t=parseFloat(l.marginTop),e=parseFloat(l.marginLeft);u.top-=d-t,u.bottom-=d-t,u.left-=h-e,u.right-=h-e,u.marginTop=t,u.marginLeft=e}return(n&&!o?e.contains(a):e===a&&"BODY"!==a.nodeName)&&(u=function(t,e,o=!1){const n=m(e,"top"),r=m(e,"left"),i=o?-1:1;return t.top+=n*i,t.bottom+=n*i,t.left+=r*i,t.right+=r*i,t}(u,e)),u}function O(t){const e=t.nodeName;if("BODY"===e||"HTML"===e)return!1;if("fixed"===i(t,"position"))return!0;const o=s(t);return!!o&&O(o)}function L(t){if(!t||!t.parentElement||c())return document.documentElement;let e=t.parentElement;for(;e&&"none"===i(e,"transform");)e=e.parentElement;return e||document.documentElement}function T(t,e,o,n,r=!1){let i={top:0,left:0};const a=r?L(t):u(t,p(e));if("viewport"===n)i=function(t,e=!1){const o=t.ownerDocument.documentElement,n=E(t,o),r=Math.max(o.clientWidth,window.innerWidth||0),i=Math.max(o.clientHeight,window.innerHeight||0),s=e?0:m(o),f=e?0:m(o,"left");return v({top:s-n.top+n.marginTop,left:f-n.left+n.marginLeft,width:r,height:i})}(a,r);else{let o;"scrollParent"===n?(o=f(s(e)),"BODY"===o.nodeName&&(o=t.ownerDocument.documentElement)):o="window"===n?t.ownerDocument.documentElement:n;const p=E(o,a,r);if("HTML"!==o.nodeName||O(a))i=p;else{const{height:e,width:o}=w(t.ownerDocument);i.top+=p.top-p.marginTop,i.bottom=e+p.top,i.left+=p.left-p.marginLeft,i.right=o+p.left}}const l="number"==typeof(o=o||0);return i.left+=l?o:o.left||0,i.top+=l?o:o.top||0,i.right-=l?o:o.right||0,i.bottom-=l?o:o.bottom||0,i}function D({width:t,height:e}){return t*e}function M(t,e,o,n,r,i=0){if(-1===t.indexOf("auto"))return t;const s=T(o,n,i,r),f={top:{width:s.width,height:e.top-s.top},right:{width:s.right-e.right,height:s.height},bottom:{width:s.width,height:s.bottom-e.bottom},left:{width:e.left-s.left,height:s.height}},p=Object.keys(f).map((t=>y({key:t},f[t],{area:D(f[t])}))).sort(((t,e)=>e.area-t.area)),a=p.filter((({width:t,height:e})=>t>=o.clientWidth&&e>=o.clientHeight)),l=a.length>0?a[0].key:p[0].key,c=t.split("-")[1];return l+(c?`-${c}`:"")}function N(t,e,o,n=null){return E(o,n?L(e):u(e,p(o)),n)}function F(t){const e=t.ownerDocument.defaultView.getComputedStyle(t),o=parseFloat(e.marginTop||0)+parseFloat(e.marginBottom||0),n=parseFloat(e.marginLeft||0)+parseFloat(e.marginRight||0);return{width:t.offsetWidth+n,height:t.offsetHeight+o}}function H(t){const e={left:"right",right:"left",bottom:"top",top:"bottom"};return t.replace(/left|right|bottom|top/g,(t=>e[t]))}function B(t,e,o){o=o.split("-")[0];const n=F(t),r={width:n.width,height:n.height},i=-1!==["right","left"].indexOf(o),s=i?"top":"left",f=i?"left":"top",p=i?"height":"width",a=i?"width":"height";return r[s]=e[s]+e[p]/2-n[p]/2,r[f]=o===f?e[f]-n[a]:e[H(f)],r}function C(t,e){return Array.prototype.find?t.find(e):t.filter(e)[0]}function $(t,e,o){return(void 0===o?t:t.slice(0,function(t,e,o){if(Array.prototype.findIndex)return t.findIndex((t=>t[e]===o));const n=C(t,(t=>t[e]===o));return t.indexOf(n)}(t,"name",o))).forEach((t=>{t.function&&console.warn("`modifier.function` is deprecated, use `modifier.fn`!");const o=t.function||t.fn;t.enabled&&r(o)&&(e.offsets.popper=v(e.offsets.popper),e.offsets.reference=v(e.offsets.reference),e=o(e,t))})),e}function A(){if(this.state.isDestroyed)return;let t={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};t.offsets.reference=N(this.state,this.popper,this.reference,this.options.positionFixed),t.placement=M(this.options.placement,t.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),t.originalPlacement=t.placement,t.positionFixed=this.options.positionFixed,t.offsets.popper=B(this.popper,t.offsets.reference,t.placement),t.offsets.popper.position=this.options.positionFixed?"fixed":"absolute",t=$(this.modifiers,t),this.state.isCreated?this.options.onUpdate(t):(this.state.isCreated=!0,this.options.onCreate(t))}function S(t,e){return t.some((({name:t,enabled:o})=>o&&t===e))}function W(t){const e=[!1,"ms","Webkit","Moz","O"],o=t.charAt(0).toUpperCase()+t.slice(1);for(let n=0;n<e.length;n++){const r=e[n],i=r?`${r}${o}`:t;if(void 0!==document.body.style[i])return i}return null}function k(){return this.state.isDestroyed=!0,S(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.position="",this.popper.style.top="",this.popper.style.left="",this.popper.style.right="",this.popper.style.bottom="",this.popper.style.willChange="",this.popper.style[W("transform")]=""),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function P(t){const e=t.ownerDocument;return e?e.defaultView:window}function j(t,e,o,n){const r="BODY"===t.nodeName,i=r?t.ownerDocument.defaultView:t;i.addEventListener(e,o,{passive:!0}),r||j(f(i.parentNode),e,o,n),n.push(i)}function I(t,e,o,n){o.updateBound=n,P(t).addEventListener("resize",o.updateBound,{passive:!0});const r=f(t);return j(r,"scroll",o.updateBound,o.scrollParents),o.scrollElement=r,o.eventsEnabled=!0,o}function R(){this.state.eventsEnabled||(this.state=I(this.reference,this.options,this.state,this.scheduleUpdate))}function U(){var t,e;this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=(t=this.reference,e=this.state,P(t).removeEventListener("resize",e.updateBound),e.scrollParents.forEach((t=>{t.removeEventListener("scroll",e.updateBound)})),e.updateBound=null,e.scrollParents=[],e.scrollElement=null,e.eventsEnabled=!1,e))}function Y(t){return""!==t&&!isNaN(parseFloat(t))&&isFinite(t)}function V(t,e){Object.keys(e).forEach((o=>{let n="";-1!==["width","height","top","right","bottom","left"].indexOf(o)&&Y(e[o])&&(n="px"),t.style[o]=e[o]+n}))}const q=e&&/Firefox/i.test(navigator.userAgent);function z(t,e,o){const n=C(t,(({name:t})=>t===e)),r=!!n&&t.some((t=>t.name===o&&t.enabled&&t.order<n.order));if(!r){const t=`\`${e}\``,n=`\`${o}\``;console.warn(`${n} modifier is required by ${t} modifier in order to work, be sure to include it before ${t}!`)}return r}var G=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"];const _=G.slice(3);function X(t,e=!1){const o=_.indexOf(t),n=_.slice(o+1).concat(_.slice(0,o));return e?n.reverse():n}const J="flip",K="clockwise",Q="counterclockwise";function Z(t,e,o,n){const r=[0,0],i=-1!==["right","left"].indexOf(n),s=t.split(/(\+|\-)/).map((t=>t.trim())),f=s.indexOf(C(s,(t=>-1!==t.search(/,|\s/))));s[f]&&-1===s[f].indexOf(",")&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");const p=/\s*,\s*|\s+/;let a=-1!==f?[s.slice(0,f).concat([s[f].split(p)[0]]),[s[f].split(p)[1]].concat(s.slice(f+1))]:[s];return a=a.map(((t,n)=>{const r=(1===n?!i:i)?"height":"width";let s=!1;return t.reduce(((t,e)=>""===t[t.length-1]&&-1!==["+","-"].indexOf(e)?(t[t.length-1]=e,s=!0,t):s?(t[t.length-1]+=e,s=!1,t):t.concat(e)),[]).map((t=>function(t,e,o,n){const r=t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),i=+r[1],s=r[2];if(!i)return t;if(0===s.indexOf("%")){let t;return t="%p"===s?o:n,v(t)[e]/100*i}if("vh"===s||"vw"===s){let t;return t="vh"===s?Math.max(document.documentElement.clientHeight,window.innerHeight||0):Math.max(document.documentElement.clientWidth,window.innerWidth||0),t/100*i}return i}(t,r,e,o)))})),a.forEach(((t,e)=>{t.forEach(((o,n)=>{Y(o)&&(r[e]+=o*("-"===t[n-1]?-1:1))}))})),r}var tt={shift:{order:100,enabled:!0,fn:function(t){const e=t.placement,o=e.split("-")[0],n=e.split("-")[1];if(n){const{reference:e,popper:r}=t.offsets,i=-1!==["bottom","top"].indexOf(o),s=i?"left":"top",f=i?"width":"height",p={start:{[s]:e[s]},end:{[s]:e[s]+e[f]-r[f]}};t.offsets.popper=y({},r,p[n])}return t}},offset:{order:200,enabled:!0,fn:function(t,{offset:e}){const{placement:o,offsets:{popper:n,reference:r}}=t,i=o.split("-")[0];let s;return s=Y(+e)?[+e,0]:Z(e,n,r,i),"left"===i?(n.top+=s[0],n.left-=s[1]):"right"===i?(n.top+=s[0],n.left+=s[1]):"top"===i?(n.left+=s[0],n.top-=s[1]):"bottom"===i&&(n.left+=s[0],n.top+=s[1]),t.popper=n,t},offset:0},preventOverflow:{order:300,enabled:!0,fn:function(t,e){let o=e.boundariesElement||d(t.instance.popper);t.instance.reference===o&&(o=d(o));const n=W("transform"),r=t.instance.popper.style,{top:i,left:s,[n]:f}=r;r.top="",r.left="",r[n]="";const p=T(t.instance.popper,t.instance.reference,e.padding,o,t.positionFixed);r.top=i,r.left=s,r[n]=f,e.boundaries=p;const a=e.priority;let l=t.offsets.popper;const c={primary(t){let o=l[t];return l[t]<p[t]&&!e.escapeWithReference&&(o=Math.max(l[t],p[t])),{[t]:o}},secondary(t){const o="right"===t?"left":"top";let n=l[o];return l[t]>p[t]&&!e.escapeWithReference&&(n=Math.min(l[o],p[t]-("right"===t?l.width:l.height))),{[o]:n}}};return a.forEach((t=>{const e=-1!==["left","top"].indexOf(t)?"primary":"secondary";l=y({},l,c[e](t))})),t.offsets.popper=l,t},priority:["left","right","top","bottom"],padding:5,boundariesElement:"scrollParent"},keepTogether:{order:400,enabled:!0,fn:function(t){const{popper:e,reference:o}=t.offsets,n=t.placement.split("-")[0],r=Math.floor,i=-1!==["top","bottom"].indexOf(n),s=i?"right":"bottom",f=i?"left":"top",p=i?"width":"height";return e[s]<r(o[f])&&(t.offsets.popper[f]=r(o[f])-e[p]),e[f]>r(o[s])&&(t.offsets.popper[f]=r(o[s])),t}},arrow:{order:500,enabled:!0,fn:function(t,e){if(!z(t.instance.modifiers,"arrow","keepTogether"))return t;let o=e.element;if("string"==typeof o){if(o=t.instance.popper.querySelector(o),!o)return t}else if(!t.instance.popper.contains(o))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),t;const n=t.placement.split("-")[0],{popper:r,reference:s}=t.offsets,f=-1!==["left","right"].indexOf(n),p=f?"height":"width",a=f?"Top":"Left",l=a.toLowerCase(),c=f?"left":"top",d=f?"bottom":"right",h=F(o)[p];s[d]-h<r[l]&&(t.offsets.popper[l]-=r[l]-(s[d]-h)),s[l]+h>r[d]&&(t.offsets.popper[l]+=s[l]+h-r[d]),t.offsets.popper=v(t.offsets.popper);const u=s[l]+s[p]/2-h/2,m=i(t.instance.popper),g=parseFloat(m[`margin${a}`]),b=parseFloat(m[`border${a}Width`]);let w=u-t.offsets.popper[l]-g-b;return w=Math.max(Math.min(r[p]-h,w),0),t.arrowElement=o,t.offsets.arrow={[l]:Math.round(w),[c]:""},t},element:"[x-arrow]"},flip:{order:600,enabled:!0,fn:function(t,e){if(S(t.instance.modifiers,"inner"))return t;if(t.flipped&&t.placement===t.originalPlacement)return t;const o=T(t.instance.popper,t.instance.reference,e.padding,e.boundariesElement,t.positionFixed);let n=t.placement.split("-")[0],r=H(n),i=t.placement.split("-")[1]||"",s=[];switch(e.behavior){case J:s=[n,r];break;case K:s=X(n);break;case Q:s=X(n,!0);break;default:s=e.behavior}return s.forEach(((f,p)=>{if(n!==f||s.length===p+1)return t;n=t.placement.split("-")[0],r=H(n);const a=t.offsets.popper,l=t.offsets.reference,c=Math.floor,d="left"===n&&c(a.right)>c(l.left)||"right"===n&&c(a.left)<c(l.right)||"top"===n&&c(a.bottom)>c(l.top)||"bottom"===n&&c(a.top)<c(l.bottom),h=c(a.left)<c(o.left),u=c(a.right)>c(o.right),m=c(a.top)<c(o.top),g=c(a.bottom)>c(o.bottom),b="left"===n&&h||"right"===n&&u||"top"===n&&m||"bottom"===n&&g,w=-1!==["top","bottom"].indexOf(n),v=!!e.flipVariations&&(w&&"start"===i&&h||w&&"end"===i&&u||!w&&"start"===i&&m||!w&&"end"===i&&g),x=!!e.flipVariationsByContent&&(w&&"start"===i&&u||w&&"end"===i&&h||!w&&"start"===i&&g||!w&&"end"===i&&m),E=v||x;(d||b||E)&&(t.flipped=!0,(d||b)&&(n=s[p+1]),E&&(i=function(t){return"end"===t?"start":"start"===t?"end":t}(i)),t.placement=n+(i?"-"+i:""),t.offsets.popper=y({},t.offsets.popper,B(t.instance.popper,t.offsets.reference,t.placement)),t=$(t.instance.modifiers,t,"flip"))})),t},behavior:"flip",padding:5,boundariesElement:"viewport",flipVariations:!1,flipVariationsByContent:!1},inner:{order:700,enabled:!1,fn:function(t){const e=t.placement,o=e.split("-")[0],{popper:n,reference:r}=t.offsets,i=-1!==["left","right"].indexOf(o),s=-1===["top","left"].indexOf(o);return n[i?"left":"top"]=r[o]-(s?n[i?"width":"height"]:0),t.placement=H(e),t.offsets.popper=v(n),t}},hide:{order:800,enabled:!0,fn:function(t){if(!z(t.instance.modifiers,"hide","preventOverflow"))return t;const e=t.offsets.reference,o=C(t.instance.modifiers,(t=>"preventOverflow"===t.name)).boundaries;if(e.bottom<o.top||e.left>o.right||e.top>o.bottom||e.right<o.left){if(!0===t.hide)return t;t.hide=!0,t.attributes["x-out-of-boundaries"]=""}else{if(!1===t.hide)return t;t.hide=!1,t.attributes["x-out-of-boundaries"]=!1}return t}},computeStyle:{order:850,enabled:!0,fn:function(t,e){const{x:o,y:n}=e,{popper:r}=t.offsets,i=C(t.instance.modifiers,(t=>"applyStyle"===t.name)).gpuAcceleration;void 0!==i&&console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");const s=void 0!==i?i:e.gpuAcceleration,f=d(t.instance.popper),p=x(f),a={position:r.position},l=function(t,e){const{popper:o,reference:n}=t.offsets,{round:r,floor:i}=Math,s=t=>t,f=r(n.width),p=r(o.width),a=-1!==["left","right"].indexOf(t.placement),l=-1!==t.placement.indexOf("-"),c=e?a||l||f%2==p%2?r:i:s,d=e?r:s;return{left:c(f%2==1&&p%2==1&&!l&&e?o.left-1:o.left),top:d(o.top),bottom:d(o.bottom),right:c(o.right)}}(t,window.devicePixelRatio<2||!q),c="bottom"===o?"top":"bottom",h="right"===n?"left":"right",u=W("transform");let m,g;if(g="bottom"===c?"HTML"===f.nodeName?-f.clientHeight+l.bottom:-p.height+l.bottom:l.top,m="right"===h?"HTML"===f.nodeName?-f.clientWidth+l.right:-p.width+l.right:l.left,s&&u)a[u]=`translate3d(${m}px, ${g}px, 0)`,a[c]=0,a[h]=0,a.willChange="transform";else{const t="bottom"===c?-1:1,e="right"===h?-1:1;a[c]=g*t,a[h]=m*e,a.willChange=`${c}, ${h}`}const b={"x-placement":t.placement};return t.attributes=y({},b,t.attributes),t.styles=y({},a,t.styles),t.arrowStyles=y({},t.offsets.arrow,t.arrowStyles),t},gpuAcceleration:!0,x:"bottom",y:"right"},applyStyle:{order:900,enabled:!0,fn:function(t){var e,o;return V(t.instance.popper,t.styles),e=t.instance.popper,o=t.attributes,Object.keys(o).forEach((function(t){!1!==o[t]?e.setAttribute(t,o[t]):e.removeAttribute(t)})),t.arrowElement&&Object.keys(t.arrowStyles).length&&V(t.arrowElement,t.arrowStyles),t},onLoad:function(t,e,o,n,r){const i=N(0,e,t,o.positionFixed),s=M(o.placement,i,e,t,o.modifiers.flip.boundariesElement,o.modifiers.flip.padding);return e.setAttribute("x-placement",s),V(e,{position:o.positionFixed?"fixed":"absolute"}),o},gpuAcceleration:void 0}},et={placement:"bottom",positionFixed:!1,eventsEnabled:!0,removeOnDestroy:!1,onCreate:()=>{},onUpdate:()=>{},modifiers:tt};class ot{constructor(t,e,o={}){this.scheduleUpdate=()=>requestAnimationFrame(this.update),this.update=n(this.update.bind(this)),this.options=y({},ot.Defaults,o),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=t&&t.jquery?t[0]:t,this.popper=e&&e.jquery?e[0]:e,this.options.modifiers={},Object.keys(y({},ot.Defaults.modifiers,o.modifiers)).forEach((t=>{this.options.modifiers[t]=y({},ot.Defaults.modifiers[t]||{},o.modifiers?o.modifiers[t]:{})})),this.modifiers=Object.keys(this.options.modifiers).map((t=>y({name:t},this.options.modifiers[t]))).sort(((t,e)=>t.order-e.order)),this.modifiers.forEach((t=>{t.enabled&&r(t.onLoad)&&t.onLoad(this.reference,this.popper,this.options,t,this.state)})),this.update();const i=this.options.eventsEnabled;i&&this.enableEventListeners(),this.state.eventsEnabled=i}update(){return A.call(this)}destroy(){return k.call(this)}enableEventListeners(){return R.call(this)}disableEventListeners(){return U.call(this)}}ot.Utils=("undefined"!=typeof window?window:t.g).PopperUtils,ot.placements=G,ot.Defaults=et})();
//# sourceMappingURL=popper.js.map