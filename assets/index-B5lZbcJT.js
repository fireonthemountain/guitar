(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const s of l.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function a(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(o){if(o.ep)return;o.ep=!0;const l=a(o);fetch(o.href,l)}})();function _P(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var om={exports:{}},Ko={},tm={exports:{}},L={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Nr=Symbol.for("react.element"),AP=Symbol.for("react.portal"),RP=Symbol.for("react.fragment"),VP=Symbol.for("react.strict_mode"),UP=Symbol.for("react.profiler"),GP=Symbol.for("react.provider"),LP=Symbol.for("react.context"),WP=Symbol.for("react.forward_ref"),zP=Symbol.for("react.suspense"),$P=Symbol.for("react.memo"),XP=Symbol.for("react.lazy"),Ci=Symbol.iterator;function HP(e){return e===null||typeof e!="object"?null:(e=Ci&&e[Ci]||e["@@iterator"],typeof e=="function"?e:null)}var lm={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},sm=Object.assign,im={};function Aa(e,n,a){this.props=e,this.context=n,this.refs=im,this.updater=a||lm}Aa.prototype.isReactComponent={};Aa.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")};Aa.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function dm(){}dm.prototype=Aa.prototype;function Ps(e,n,a){this.props=e,this.context=n,this.refs=im,this.updater=a||lm}var cs=Ps.prototype=new dm;cs.constructor=Ps;sm(cs,Aa.prototype);cs.isPureReactComponent=!0;var gi=Array.isArray,mm=Object.prototype.hasOwnProperty,xs={current:null},um={key:!0,ref:!0,__self:!0,__source:!0};function Pm(e,n,a){var r,o={},l=null,s=null;if(n!=null)for(r in n.ref!==void 0&&(s=n.ref),n.key!==void 0&&(l=""+n.key),n)mm.call(n,r)&&!um.hasOwnProperty(r)&&(o[r]=n[r]);var i=arguments.length-2;if(i===1)o.children=a;else if(1<i){for(var d=Array(i),m=0;m<i;m++)d[m]=arguments[m+2];o.children=d}if(e&&e.defaultProps)for(r in i=e.defaultProps,i)o[r]===void 0&&(o[r]=i[r]);return{$$typeof:Nr,type:e,key:l,ref:s,props:o,_owner:xs.current}}function KP(e,n){return{$$typeof:Nr,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function ps(e){return typeof e=="object"&&e!==null&&e.$$typeof===Nr}function YP(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(a){return n[a]})}var yi=/\/+/g;function vt(e,n){return typeof e=="object"&&e!==null&&e.key!=null?YP(""+e.key):n.toString(36)}function lo(e,n,a,r,o){var l=typeof e;(l==="undefined"||l==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(l){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case Nr:case AP:s=!0}}if(s)return s=e,o=o(s),e=r===""?"."+vt(s,0):r,gi(o)?(a="",e!=null&&(a=e.replace(yi,"$&/")+"/"),lo(o,n,a,"",function(m){return m})):o!=null&&(ps(o)&&(o=KP(o,a+(!o.key||s&&s.key===o.key?"":(""+o.key).replace(yi,"$&/")+"/")+e)),n.push(o)),1;if(s=0,r=r===""?".":r+":",gi(e))for(var i=0;i<e.length;i++){l=e[i];var d=r+vt(l,i);s+=lo(l,n,a,d,o)}else if(d=HP(e),typeof d=="function")for(e=d.call(e),i=0;!(l=e.next()).done;)l=l.value,d=r+vt(l,i++),s+=lo(l,n,a,d,o);else if(l==="object")throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return s}function Ur(e,n,a){if(e==null)return e;var r=[],o=0;return lo(e,r,"","",function(l){return n.call(a,l,o++)}),r}function JP(e){if(e._status===-1){var n=e._result;n=n(),n.then(function(a){(e._status===0||e._status===-1)&&(e._status=1,e._result=a)},function(a){(e._status===0||e._status===-1)&&(e._status=2,e._result=a)}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var Ce={current:null},so={transition:null},QP={ReactCurrentDispatcher:Ce,ReactCurrentBatchConfig:so,ReactCurrentOwner:xs};function cm(){throw Error("act(...) is not supported in production builds of React.")}L.Children={map:Ur,forEach:function(e,n,a){Ur(e,function(){n.apply(this,arguments)},a)},count:function(e){var n=0;return Ur(e,function(){n++}),n},toArray:function(e){return Ur(e,function(n){return n})||[]},only:function(e){if(!ps(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};L.Component=Aa;L.Fragment=RP;L.Profiler=UP;L.PureComponent=Ps;L.StrictMode=VP;L.Suspense=zP;L.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=QP;L.act=cm;L.cloneElement=function(e,n,a){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=sm({},e.props),o=e.key,l=e.ref,s=e._owner;if(n!=null){if(n.ref!==void 0&&(l=n.ref,s=xs.current),n.key!==void 0&&(o=""+n.key),e.type&&e.type.defaultProps)var i=e.type.defaultProps;for(d in n)mm.call(n,d)&&!um.hasOwnProperty(d)&&(r[d]=n[d]===void 0&&i!==void 0?i[d]:n[d])}var d=arguments.length-2;if(d===1)r.children=a;else if(1<d){i=Array(d);for(var m=0;m<d;m++)i[m]=arguments[m+2];r.children=i}return{$$typeof:Nr,type:e.type,key:o,ref:l,props:r,_owner:s}};L.createContext=function(e){return e={$$typeof:LP,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:GP,_context:e},e.Consumer=e};L.createElement=Pm;L.createFactory=function(e){var n=Pm.bind(null,e);return n.type=e,n};L.createRef=function(){return{current:null}};L.forwardRef=function(e){return{$$typeof:WP,render:e}};L.isValidElement=ps;L.lazy=function(e){return{$$typeof:XP,_payload:{_status:-1,_result:e},_init:JP}};L.memo=function(e,n){return{$$typeof:$P,type:e,compare:n===void 0?null:n}};L.startTransition=function(e){var n=so.transition;so.transition={};try{e()}finally{so.transition=n}};L.unstable_act=cm;L.useCallback=function(e,n){return Ce.current.useCallback(e,n)};L.useContext=function(e){return Ce.current.useContext(e)};L.useDebugValue=function(){};L.useDeferredValue=function(e){return Ce.current.useDeferredValue(e)};L.useEffect=function(e,n){return Ce.current.useEffect(e,n)};L.useId=function(){return Ce.current.useId()};L.useImperativeHandle=function(e,n,a){return Ce.current.useImperativeHandle(e,n,a)};L.useInsertionEffect=function(e,n){return Ce.current.useInsertionEffect(e,n)};L.useLayoutEffect=function(e,n){return Ce.current.useLayoutEffect(e,n)};L.useMemo=function(e,n){return Ce.current.useMemo(e,n)};L.useReducer=function(e,n,a){return Ce.current.useReducer(e,n,a)};L.useRef=function(e){return Ce.current.useRef(e)};L.useState=function(e){return Ce.current.useState(e)};L.useSyncExternalStore=function(e,n,a){return Ce.current.useSyncExternalStore(e,n,a)};L.useTransition=function(){return Ce.current.useTransition()};L.version="18.3.1";tm.exports=L;var S=tm.exports;const qP=_P(S);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ZP=S,ec=Symbol.for("react.element"),nc=Symbol.for("react.fragment"),ac=Object.prototype.hasOwnProperty,rc=ZP.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,oc={key:!0,ref:!0,__self:!0,__source:!0};function xm(e,n,a){var r,o={},l=null,s=null;a!==void 0&&(l=""+a),n.key!==void 0&&(l=""+n.key),n.ref!==void 0&&(s=n.ref);for(r in n)ac.call(n,r)&&!oc.hasOwnProperty(r)&&(o[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps,n)o[r]===void 0&&(o[r]=n[r]);return{$$typeof:ec,type:e,key:l,ref:s,props:o,_owner:rc.current}}Ko.Fragment=nc;Ko.jsx=xm;Ko.jsxs=xm;om.exports=Ko;var t=om.exports,ll={},pm={exports:{}},Ee={},Im={exports:{}},fm={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function n(M,b){var N=M.length;M.push(b);e:for(;0<N;){var w=N-1>>>1,j=M[w];if(0<o(j,b))M[w]=b,M[N]=j,N=w;else break e}}function a(M){return M.length===0?null:M[0]}function r(M){if(M.length===0)return null;var b=M[0],N=M.pop();if(N!==b){M[0]=N;e:for(var w=0,j=M.length,V=j>>>1;w<V;){var ne=2*(w+1)-1,Ue=M[ne],Ge=ne+1,Vr=M[Ge];if(0>o(Ue,N))Ge<j&&0>o(Vr,Ue)?(M[w]=Vr,M[Ge]=N,w=Ge):(M[w]=Ue,M[ne]=N,w=ne);else if(Ge<j&&0>o(Vr,N))M[w]=Vr,M[Ge]=N,w=Ge;else break e}}return b}function o(M,b){var N=M.sortIndex-b.sortIndex;return N!==0?N:M.id-b.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;e.unstable_now=function(){return l.now()}}else{var s=Date,i=s.now();e.unstable_now=function(){return s.now()-i}}var d=[],m=[],x=1,p=null,c=3,h=!1,g=!1,C=!1,v=typeof setTimeout=="function"?setTimeout:null,u=typeof clearTimeout=="function"?clearTimeout:null,P=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function I(M){for(var b=a(m);b!==null;){if(b.callback===null)r(m);else if(b.startTime<=M)r(m),b.sortIndex=b.expirationTime,n(d,b);else break;b=a(m)}}function D(M){if(C=!1,I(M),!g)if(a(d)!==null)g=!0,W(B);else{var b=a(m);b!==null&&z(D,b.startTime-M)}}function B(M,b){g=!1,C&&(C=!1,u(k),k=-1),h=!0;var N=c;try{for(I(b),p=a(d);p!==null&&(!(p.expirationTime>b)||M&&!_());){var w=p.callback;if(typeof w=="function"){p.callback=null,c=p.priorityLevel;var j=w(p.expirationTime<=b);b=e.unstable_now(),typeof j=="function"?p.callback=j:p===a(d)&&r(d),I(b)}else r(d);p=a(d)}if(p!==null)var V=!0;else{var ne=a(m);ne!==null&&z(D,ne.startTime-b),V=!1}return V}finally{p=null,c=N,h=!1}}var y=!1,f=null,k=-1,T=5,F=-1;function _(){return!(e.unstable_now()-F<T)}function U(){if(f!==null){var M=e.unstable_now();F=M;var b=!0;try{b=f(!0,M)}finally{b?A():(y=!1,f=null)}}else y=!1}var A;if(typeof P=="function")A=function(){P(U)};else if(typeof MessageChannel<"u"){var R=new MessageChannel,G=R.port2;R.port1.onmessage=U,A=function(){G.postMessage(null)}}else A=function(){v(U,0)};function W(M){f=M,y||(y=!0,A())}function z(M,b){k=v(function(){M(e.unstable_now())},b)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(M){M.callback=null},e.unstable_continueExecution=function(){g||h||(g=!0,W(B))},e.unstable_forceFrameRate=function(M){0>M||125<M?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<M?Math.floor(1e3/M):5},e.unstable_getCurrentPriorityLevel=function(){return c},e.unstable_getFirstCallbackNode=function(){return a(d)},e.unstable_next=function(M){switch(c){case 1:case 2:case 3:var b=3;break;default:b=c}var N=c;c=b;try{return M()}finally{c=N}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(M,b){switch(M){case 1:case 2:case 3:case 4:case 5:break;default:M=3}var N=c;c=M;try{return b()}finally{c=N}},e.unstable_scheduleCallback=function(M,b,N){var w=e.unstable_now();switch(typeof N=="object"&&N!==null?(N=N.delay,N=typeof N=="number"&&0<N?w+N:w):N=w,M){case 1:var j=-1;break;case 2:j=250;break;case 5:j=1073741823;break;case 4:j=1e4;break;default:j=5e3}return j=N+j,M={id:x++,callback:b,priorityLevel:M,startTime:N,expirationTime:j,sortIndex:-1},N>w?(M.sortIndex=N,n(m,M),a(d)===null&&M===a(m)&&(C?(u(k),k=-1):C=!0,z(D,N-w))):(M.sortIndex=j,n(d,M),g||h||(g=!0,W(B))),M},e.unstable_shouldYield=_,e.unstable_wrapCallback=function(M){var b=c;return function(){var N=c;c=b;try{return M.apply(this,arguments)}finally{c=N}}}})(fm);Im.exports=fm;var tc=Im.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var lc=S,Fe=tc;function E(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,a=1;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var hm=new Set,cr={};function ra(e,n){wa(e,n),wa(e+"Capture",n)}function wa(e,n){for(cr[e]=n,e=0;e<n.length;e++)hm.add(n[e])}var dn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),sl=Object.prototype.hasOwnProperty,sc=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Si={},vi={};function ic(e){return sl.call(vi,e)?!0:sl.call(Si,e)?!1:sc.test(e)?vi[e]=!0:(Si[e]=!0,!1)}function dc(e,n,a,r){if(a!==null&&a.type===0)return!1;switch(typeof n){case"function":case"symbol":return!0;case"boolean":return r?!1:a!==null?!a.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function mc(e,n,a,r){if(n===null||typeof n>"u"||dc(e,n,a,r))return!0;if(r)return!1;if(a!==null)switch(a.type){case 3:return!n;case 4:return n===!1;case 5:return isNaN(n);case 6:return isNaN(n)||1>n}return!1}function ge(e,n,a,r,o,l,s){this.acceptsBooleans=n===2||n===3||n===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=a,this.propertyName=e,this.type=n,this.sanitizeURL=l,this.removeEmptyString=s}var Pe={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Pe[e]=new ge(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0];Pe[n]=new ge(n,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Pe[e]=new ge(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Pe[e]=new ge(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Pe[e]=new ge(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Pe[e]=new ge(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Pe[e]=new ge(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Pe[e]=new ge(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Pe[e]=new ge(e,5,!1,e.toLowerCase(),null,!1,!1)});var Is=/[\-:]([a-z])/g;function fs(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(Is,fs);Pe[n]=new ge(n,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(Is,fs);Pe[n]=new ge(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(Is,fs);Pe[n]=new ge(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Pe[e]=new ge(e,1,!1,e.toLowerCase(),null,!1,!1)});Pe.xlinkHref=new ge("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Pe[e]=new ge(e,1,!1,e.toLowerCase(),null,!0,!0)});function hs(e,n,a,r){var o=Pe.hasOwnProperty(n)?Pe[n]:null;(o!==null?o.type!==0:r||!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(mc(n,a,o,r)&&(a=null),r||o===null?ic(n)&&(a===null?e.removeAttribute(n):e.setAttribute(n,""+a)):o.mustUseProperty?e[o.propertyName]=a===null?o.type===3?!1:"":a:(n=o.attributeName,r=o.attributeNamespace,a===null?e.removeAttribute(n):(o=o.type,a=o===3||o===4&&a===!0?"":""+a,r?e.setAttributeNS(r,n,a):e.setAttribute(n,a))))}var pn=lc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Gr=Symbol.for("react.element"),ia=Symbol.for("react.portal"),da=Symbol.for("react.fragment"),Cs=Symbol.for("react.strict_mode"),il=Symbol.for("react.profiler"),Cm=Symbol.for("react.provider"),gm=Symbol.for("react.context"),gs=Symbol.for("react.forward_ref"),dl=Symbol.for("react.suspense"),ml=Symbol.for("react.suspense_list"),ys=Symbol.for("react.memo"),fn=Symbol.for("react.lazy"),ym=Symbol.for("react.offscreen"),Mi=Symbol.iterator;function Ua(e){return e===null||typeof e!="object"?null:(e=Mi&&e[Mi]||e["@@iterator"],typeof e=="function"?e:null)}var Z=Object.assign,Mt;function Qa(e){if(Mt===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);Mt=n&&n[1]||""}return`
`+Mt+e}var Dt=!1;function bt(e,n){if(!e||Dt)return"";Dt=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(n,[])}catch(m){var r=m}Reflect.construct(e,[],n)}else{try{n.call()}catch(m){r=m}e.call(n.prototype)}else{try{throw Error()}catch(m){r=m}e()}}catch(m){if(m&&r&&typeof m.stack=="string"){for(var o=m.stack.split(`
`),l=r.stack.split(`
`),s=o.length-1,i=l.length-1;1<=s&&0<=i&&o[s]!==l[i];)i--;for(;1<=s&&0<=i;s--,i--)if(o[s]!==l[i]){if(s!==1||i!==1)do if(s--,i--,0>i||o[s]!==l[i]){var d=`
`+o[s].replace(" at new "," at ");return e.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",e.displayName)),d}while(1<=s&&0<=i);break}}}finally{Dt=!1,Error.prepareStackTrace=a}return(e=e?e.displayName||e.name:"")?Qa(e):""}function uc(e){switch(e.tag){case 5:return Qa(e.type);case 16:return Qa("Lazy");case 13:return Qa("Suspense");case 19:return Qa("SuspenseList");case 0:case 2:case 15:return e=bt(e.type,!1),e;case 11:return e=bt(e.type.render,!1),e;case 1:return e=bt(e.type,!0),e;default:return""}}function ul(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case da:return"Fragment";case ia:return"Portal";case il:return"Profiler";case Cs:return"StrictMode";case dl:return"Suspense";case ml:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case gm:return(e.displayName||"Context")+".Consumer";case Cm:return(e._context.displayName||"Context")+".Provider";case gs:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ys:return n=e.displayName||null,n!==null?n:ul(e.type)||"Memo";case fn:n=e._payload,e=e._init;try{return ul(e(n))}catch{}}return null}function Pc(e){var n=e.type;switch(e.tag){case 24:return"Cache";case 9:return(n.displayName||"Context")+".Consumer";case 10:return(n._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=n.render,e=e.displayName||e.name||"",n.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return n;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ul(n);case 8:return n===Cs?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n}return null}function Tn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Sm(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function cc(e){var n=Sm(e)?"checked":"value",a=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),r=""+e[n];if(!e.hasOwnProperty(n)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var o=a.get,l=a.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return o.call(this)},set:function(s){r=""+s,l.call(this,s)}}),Object.defineProperty(e,n,{enumerable:a.enumerable}),{getValue:function(){return r},setValue:function(s){r=""+s},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function Lr(e){e._valueTracker||(e._valueTracker=cc(e))}function vm(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var a=n.getValue(),r="";return e&&(r=Sm(e)?e.checked?"true":"false":e.value),e=r,e!==a?(n.setValue(e),!0):!1}function vo(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Pl(e,n){var a=n.checked;return Z({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:a??e._wrapperState.initialChecked})}function Di(e,n){var a=n.defaultValue==null?"":n.defaultValue,r=n.checked!=null?n.checked:n.defaultChecked;a=Tn(n.value!=null?n.value:a),e._wrapperState={initialChecked:r,initialValue:a,controlled:n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null}}function Mm(e,n){n=n.checked,n!=null&&hs(e,"checked",n,!1)}function cl(e,n){Mm(e,n);var a=Tn(n.value),r=n.type;if(a!=null)r==="number"?(a===0&&e.value===""||e.value!=a)&&(e.value=""+a):e.value!==""+a&&(e.value=""+a);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}n.hasOwnProperty("value")?xl(e,n.type,a):n.hasOwnProperty("defaultValue")&&xl(e,n.type,Tn(n.defaultValue)),n.checked==null&&n.defaultChecked!=null&&(e.defaultChecked=!!n.defaultChecked)}function bi(e,n,a){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var r=n.type;if(!(r!=="submit"&&r!=="reset"||n.value!==void 0&&n.value!==null))return;n=""+e._wrapperState.initialValue,a||n===e.value||(e.value=n),e.defaultValue=n}a=e.name,a!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,a!==""&&(e.name=a)}function xl(e,n,a){(n!=="number"||vo(e.ownerDocument)!==e)&&(a==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+a&&(e.defaultValue=""+a))}var qa=Array.isArray;function ya(e,n,a,r){if(e=e.options,n){n={};for(var o=0;o<a.length;o++)n["$"+a[o]]=!0;for(a=0;a<e.length;a++)o=n.hasOwnProperty("$"+e[a].value),e[a].selected!==o&&(e[a].selected=o),o&&r&&(e[a].defaultSelected=!0)}else{for(a=""+Tn(a),n=null,o=0;o<e.length;o++){if(e[o].value===a){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}n!==null||e[o].disabled||(n=e[o])}n!==null&&(n.selected=!0)}}function pl(e,n){if(n.dangerouslySetInnerHTML!=null)throw Error(E(91));return Z({},n,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function wi(e,n){var a=n.value;if(a==null){if(a=n.children,n=n.defaultValue,a!=null){if(n!=null)throw Error(E(92));if(qa(a)){if(1<a.length)throw Error(E(93));a=a[0]}n=a}n==null&&(n=""),a=n}e._wrapperState={initialValue:Tn(a)}}function Dm(e,n){var a=Tn(n.value),r=Tn(n.defaultValue);a!=null&&(a=""+a,a!==e.value&&(e.value=a),n.defaultValue==null&&e.defaultValue!==a&&(e.defaultValue=a)),r!=null&&(e.defaultValue=""+r)}function Bi(e){var n=e.textContent;n===e._wrapperState.initialValue&&n!==""&&n!==null&&(e.value=n)}function bm(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Il(e,n){return e==null||e==="http://www.w3.org/1999/xhtml"?bm(n):e==="http://www.w3.org/2000/svg"&&n==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Wr,wm=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(n,a,r,o){MSApp.execUnsafeLocalFunction(function(){return e(n,a,r,o)})}:e}(function(e,n){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=n;else{for(Wr=Wr||document.createElement("div"),Wr.innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=Wr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild)}});function xr(e,n){if(n){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=n;return}}e.textContent=n}var rr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},xc=["Webkit","ms","Moz","O"];Object.keys(rr).forEach(function(e){xc.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),rr[n]=rr[e]})});function Bm(e,n,a){return n==null||typeof n=="boolean"||n===""?"":a||typeof n!="number"||n===0||rr.hasOwnProperty(e)&&rr[e]?(""+n).trim():n+"px"}function km(e,n){e=e.style;for(var a in n)if(n.hasOwnProperty(a)){var r=a.indexOf("--")===0,o=Bm(a,n[a],r);a==="float"&&(a="cssFloat"),r?e.setProperty(a,o):e[a]=o}}var pc=Z({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function fl(e,n){if(n){if(pc[e]&&(n.children!=null||n.dangerouslySetInnerHTML!=null))throw Error(E(137,e));if(n.dangerouslySetInnerHTML!=null){if(n.children!=null)throw Error(E(60));if(typeof n.dangerouslySetInnerHTML!="object"||!("__html"in n.dangerouslySetInnerHTML))throw Error(E(61))}if(n.style!=null&&typeof n.style!="object")throw Error(E(62))}}function hl(e,n){if(e.indexOf("-")===-1)return typeof n.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Cl=null;function Ss(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var gl=null,Sa=null,va=null;function ki(e){if(e=_r(e)){if(typeof gl!="function")throw Error(E(280));var n=e.stateNode;n&&(n=Zo(n),gl(e.stateNode,e.type,n))}}function Fm(e){Sa?va?va.push(e):va=[e]:Sa=e}function Em(){if(Sa){var e=Sa,n=va;if(va=Sa=null,ki(e),n)for(e=0;e<n.length;e++)ki(n[e])}}function Tm(e,n){return e(n)}function Nm(){}var wt=!1;function jm(e,n,a){if(wt)return e(n,a);wt=!0;try{return Tm(e,n,a)}finally{wt=!1,(Sa!==null||va!==null)&&(Nm(),Em())}}function pr(e,n){var a=e.stateNode;if(a===null)return null;var r=Zo(a);if(r===null)return null;a=r[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(E(231,n,typeof a));return a}var yl=!1;if(dn)try{var Ga={};Object.defineProperty(Ga,"passive",{get:function(){yl=!0}}),window.addEventListener("test",Ga,Ga),window.removeEventListener("test",Ga,Ga)}catch{yl=!1}function Ic(e,n,a,r,o,l,s,i,d){var m=Array.prototype.slice.call(arguments,3);try{n.apply(a,m)}catch(x){this.onError(x)}}var or=!1,Mo=null,Do=!1,Sl=null,fc={onError:function(e){or=!0,Mo=e}};function hc(e,n,a,r,o,l,s,i,d){or=!1,Mo=null,Ic.apply(fc,arguments)}function Cc(e,n,a,r,o,l,s,i,d){if(hc.apply(this,arguments),or){if(or){var m=Mo;or=!1,Mo=null}else throw Error(E(198));Do||(Do=!0,Sl=m)}}function oa(e){var n=e,a=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,n.flags&4098&&(a=n.return),e=n.return;while(e)}return n.tag===3?a:null}function Om(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function Fi(e){if(oa(e)!==e)throw Error(E(188))}function gc(e){var n=e.alternate;if(!n){if(n=oa(e),n===null)throw Error(E(188));return n!==e?null:e}for(var a=e,r=n;;){var o=a.return;if(o===null)break;var l=o.alternate;if(l===null){if(r=o.return,r!==null){a=r;continue}break}if(o.child===l.child){for(l=o.child;l;){if(l===a)return Fi(o),e;if(l===r)return Fi(o),n;l=l.sibling}throw Error(E(188))}if(a.return!==r.return)a=o,r=l;else{for(var s=!1,i=o.child;i;){if(i===a){s=!0,a=o,r=l;break}if(i===r){s=!0,r=o,a=l;break}i=i.sibling}if(!s){for(i=l.child;i;){if(i===a){s=!0,a=l,r=o;break}if(i===r){s=!0,r=l,a=o;break}i=i.sibling}if(!s)throw Error(E(189))}}if(a.alternate!==r)throw Error(E(190))}if(a.tag!==3)throw Error(E(188));return a.stateNode.current===a?e:n}function _m(e){return e=gc(e),e!==null?Am(e):null}function Am(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var n=Am(e);if(n!==null)return n;e=e.sibling}return null}var Rm=Fe.unstable_scheduleCallback,Ei=Fe.unstable_cancelCallback,yc=Fe.unstable_shouldYield,Sc=Fe.unstable_requestPaint,ae=Fe.unstable_now,vc=Fe.unstable_getCurrentPriorityLevel,vs=Fe.unstable_ImmediatePriority,Vm=Fe.unstable_UserBlockingPriority,bo=Fe.unstable_NormalPriority,Mc=Fe.unstable_LowPriority,Um=Fe.unstable_IdlePriority,Yo=null,qe=null;function Dc(e){if(qe&&typeof qe.onCommitFiberRoot=="function")try{qe.onCommitFiberRoot(Yo,e,void 0,(e.current.flags&128)===128)}catch{}}var Xe=Math.clz32?Math.clz32:Bc,bc=Math.log,wc=Math.LN2;function Bc(e){return e>>>=0,e===0?32:31-(bc(e)/wc|0)|0}var zr=64,$r=4194304;function Za(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function wo(e,n){var a=e.pendingLanes;if(a===0)return 0;var r=0,o=e.suspendedLanes,l=e.pingedLanes,s=a&268435455;if(s!==0){var i=s&~o;i!==0?r=Za(i):(l&=s,l!==0&&(r=Za(l)))}else s=a&~o,s!==0?r=Za(s):l!==0&&(r=Za(l));if(r===0)return 0;if(n!==0&&n!==r&&!(n&o)&&(o=r&-r,l=n&-n,o>=l||o===16&&(l&4194240)!==0))return n;if(r&4&&(r|=a&16),n=e.entangledLanes,n!==0)for(e=e.entanglements,n&=r;0<n;)a=31-Xe(n),o=1<<a,r|=e[a],n&=~o;return r}function kc(e,n){switch(e){case 1:case 2:case 4:return n+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Fc(e,n){for(var a=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,l=e.pendingLanes;0<l;){var s=31-Xe(l),i=1<<s,d=o[s];d===-1?(!(i&a)||i&r)&&(o[s]=kc(i,n)):d<=n&&(e.expiredLanes|=i),l&=~i}}function vl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Gm(){var e=zr;return zr<<=1,!(zr&4194240)&&(zr=64),e}function Bt(e){for(var n=[],a=0;31>a;a++)n.push(e);return n}function jr(e,n,a){e.pendingLanes|=n,n!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,n=31-Xe(n),e[n]=a}function Ec(e,n){var a=e.pendingLanes&~n;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<a;){var o=31-Xe(a),l=1<<o;n[o]=0,r[o]=-1,e[o]=-1,a&=~l}}function Ms(e,n){var a=e.entangledLanes|=n;for(e=e.entanglements;a;){var r=31-Xe(a),o=1<<r;o&n|e[r]&n&&(e[r]|=n),a&=~o}}var X=0;function Lm(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Wm,Ds,zm,$m,Xm,Ml=!1,Xr=[],vn=null,Mn=null,Dn=null,Ir=new Map,fr=new Map,Cn=[],Tc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Ti(e,n){switch(e){case"focusin":case"focusout":vn=null;break;case"dragenter":case"dragleave":Mn=null;break;case"mouseover":case"mouseout":Dn=null;break;case"pointerover":case"pointerout":Ir.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":fr.delete(n.pointerId)}}function La(e,n,a,r,o,l){return e===null||e.nativeEvent!==l?(e={blockedOn:n,domEventName:a,eventSystemFlags:r,nativeEvent:l,targetContainers:[o]},n!==null&&(n=_r(n),n!==null&&Ds(n)),e):(e.eventSystemFlags|=r,n=e.targetContainers,o!==null&&n.indexOf(o)===-1&&n.push(o),e)}function Nc(e,n,a,r,o){switch(n){case"focusin":return vn=La(vn,e,n,a,r,o),!0;case"dragenter":return Mn=La(Mn,e,n,a,r,o),!0;case"mouseover":return Dn=La(Dn,e,n,a,r,o),!0;case"pointerover":var l=o.pointerId;return Ir.set(l,La(Ir.get(l)||null,e,n,a,r,o)),!0;case"gotpointercapture":return l=o.pointerId,fr.set(l,La(fr.get(l)||null,e,n,a,r,o)),!0}return!1}function Hm(e){var n=Gn(e.target);if(n!==null){var a=oa(n);if(a!==null){if(n=a.tag,n===13){if(n=Om(a),n!==null){e.blockedOn=n,Xm(e.priority,function(){zm(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function io(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var a=Dl(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent);if(a===null){a=e.nativeEvent;var r=new a.constructor(a.type,a);Cl=r,a.target.dispatchEvent(r),Cl=null}else return n=_r(a),n!==null&&Ds(n),e.blockedOn=a,!1;n.shift()}return!0}function Ni(e,n,a){io(e)&&a.delete(n)}function jc(){Ml=!1,vn!==null&&io(vn)&&(vn=null),Mn!==null&&io(Mn)&&(Mn=null),Dn!==null&&io(Dn)&&(Dn=null),Ir.forEach(Ni),fr.forEach(Ni)}function Wa(e,n){e.blockedOn===n&&(e.blockedOn=null,Ml||(Ml=!0,Fe.unstable_scheduleCallback(Fe.unstable_NormalPriority,jc)))}function hr(e){function n(o){return Wa(o,e)}if(0<Xr.length){Wa(Xr[0],e);for(var a=1;a<Xr.length;a++){var r=Xr[a];r.blockedOn===e&&(r.blockedOn=null)}}for(vn!==null&&Wa(vn,e),Mn!==null&&Wa(Mn,e),Dn!==null&&Wa(Dn,e),Ir.forEach(n),fr.forEach(n),a=0;a<Cn.length;a++)r=Cn[a],r.blockedOn===e&&(r.blockedOn=null);for(;0<Cn.length&&(a=Cn[0],a.blockedOn===null);)Hm(a),a.blockedOn===null&&Cn.shift()}var Ma=pn.ReactCurrentBatchConfig,Bo=!0;function Oc(e,n,a,r){var o=X,l=Ma.transition;Ma.transition=null;try{X=1,bs(e,n,a,r)}finally{X=o,Ma.transition=l}}function _c(e,n,a,r){var o=X,l=Ma.transition;Ma.transition=null;try{X=4,bs(e,n,a,r)}finally{X=o,Ma.transition=l}}function bs(e,n,a,r){if(Bo){var o=Dl(e,n,a,r);if(o===null)Rt(e,n,r,ko,a),Ti(e,r);else if(Nc(o,e,n,a,r))r.stopPropagation();else if(Ti(e,r),n&4&&-1<Tc.indexOf(e)){for(;o!==null;){var l=_r(o);if(l!==null&&Wm(l),l=Dl(e,n,a,r),l===null&&Rt(e,n,r,ko,a),l===o)break;o=l}o!==null&&r.stopPropagation()}else Rt(e,n,r,null,a)}}var ko=null;function Dl(e,n,a,r){if(ko=null,e=Ss(r),e=Gn(e),e!==null)if(n=oa(e),n===null)e=null;else if(a=n.tag,a===13){if(e=Om(n),e!==null)return e;e=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null);return ko=e,null}function Km(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(vc()){case vs:return 1;case Vm:return 4;case bo:case Mc:return 16;case Um:return 536870912;default:return 16}default:return 16}}var yn=null,ws=null,mo=null;function Ym(){if(mo)return mo;var e,n=ws,a=n.length,r,o="value"in yn?yn.value:yn.textContent,l=o.length;for(e=0;e<a&&n[e]===o[e];e++);var s=a-e;for(r=1;r<=s&&n[a-r]===o[l-r];r++);return mo=o.slice(e,1<r?1-r:void 0)}function uo(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Hr(){return!0}function ji(){return!1}function Te(e){function n(a,r,o,l,s){this._reactName=a,this._targetInst=o,this.type=r,this.nativeEvent=l,this.target=s,this.currentTarget=null;for(var i in e)e.hasOwnProperty(i)&&(a=e[i],this[i]=a?a(l):l[i]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?Hr:ji,this.isPropagationStopped=ji,this}return Z(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Hr)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Hr)},persist:function(){},isPersistent:Hr}),n}var Ra={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Bs=Te(Ra),Or=Z({},Ra,{view:0,detail:0}),Ac=Te(Or),kt,Ft,za,Jo=Z({},Or,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ks,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==za&&(za&&e.type==="mousemove"?(kt=e.screenX-za.screenX,Ft=e.screenY-za.screenY):Ft=kt=0,za=e),kt)},movementY:function(e){return"movementY"in e?e.movementY:Ft}}),Oi=Te(Jo),Rc=Z({},Jo,{dataTransfer:0}),Vc=Te(Rc),Uc=Z({},Or,{relatedTarget:0}),Et=Te(Uc),Gc=Z({},Ra,{animationName:0,elapsedTime:0,pseudoElement:0}),Lc=Te(Gc),Wc=Z({},Ra,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),zc=Te(Wc),$c=Z({},Ra,{data:0}),_i=Te($c),Xc={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Hc={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Kc={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Yc(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=Kc[e])?!!n[e]:!1}function ks(){return Yc}var Jc=Z({},Or,{key:function(e){if(e.key){var n=Xc[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=uo(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Hc[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ks,charCode:function(e){return e.type==="keypress"?uo(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?uo(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Qc=Te(Jc),qc=Z({},Jo,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ai=Te(qc),Zc=Z({},Or,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ks}),e0=Te(Zc),n0=Z({},Ra,{propertyName:0,elapsedTime:0,pseudoElement:0}),a0=Te(n0),r0=Z({},Jo,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),o0=Te(r0),t0=[9,13,27,32],Fs=dn&&"CompositionEvent"in window,tr=null;dn&&"documentMode"in document&&(tr=document.documentMode);var l0=dn&&"TextEvent"in window&&!tr,Jm=dn&&(!Fs||tr&&8<tr&&11>=tr),Ri=" ",Vi=!1;function Qm(e,n){switch(e){case"keyup":return t0.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function qm(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var ma=!1;function s0(e,n){switch(e){case"compositionend":return qm(n);case"keypress":return n.which!==32?null:(Vi=!0,Ri);case"textInput":return e=n.data,e===Ri&&Vi?null:e;default:return null}}function i0(e,n){if(ma)return e==="compositionend"||!Fs&&Qm(e,n)?(e=Ym(),mo=ws=yn=null,ma=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Jm&&n.locale!=="ko"?null:n.data;default:return null}}var d0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ui(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!d0[e.type]:n==="textarea"}function Zm(e,n,a,r){Fm(r),n=Fo(n,"onChange"),0<n.length&&(a=new Bs("onChange","change",null,a,r),e.push({event:a,listeners:n}))}var lr=null,Cr=null;function m0(e){mu(e,0)}function Qo(e){var n=ca(e);if(vm(n))return e}function u0(e,n){if(e==="change")return n}var eu=!1;if(dn){var Tt;if(dn){var Nt="oninput"in document;if(!Nt){var Gi=document.createElement("div");Gi.setAttribute("oninput","return;"),Nt=typeof Gi.oninput=="function"}Tt=Nt}else Tt=!1;eu=Tt&&(!document.documentMode||9<document.documentMode)}function Li(){lr&&(lr.detachEvent("onpropertychange",nu),Cr=lr=null)}function nu(e){if(e.propertyName==="value"&&Qo(Cr)){var n=[];Zm(n,Cr,e,Ss(e)),jm(m0,n)}}function P0(e,n,a){e==="focusin"?(Li(),lr=n,Cr=a,lr.attachEvent("onpropertychange",nu)):e==="focusout"&&Li()}function c0(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Qo(Cr)}function x0(e,n){if(e==="click")return Qo(n)}function p0(e,n){if(e==="input"||e==="change")return Qo(n)}function I0(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var Ke=typeof Object.is=="function"?Object.is:I0;function gr(e,n){if(Ke(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var a=Object.keys(e),r=Object.keys(n);if(a.length!==r.length)return!1;for(r=0;r<a.length;r++){var o=a[r];if(!sl.call(n,o)||!Ke(e[o],n[o]))return!1}return!0}function Wi(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function zi(e,n){var a=Wi(e);e=0;for(var r;a;){if(a.nodeType===3){if(r=e+a.textContent.length,e<=n&&r>=n)return{node:a,offset:n-e};e=r}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Wi(a)}}function au(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?au(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function ru(){for(var e=window,n=vo();n instanceof e.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)e=n.contentWindow;else break;n=vo(e.document)}return n}function Es(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function f0(e){var n=ru(),a=e.focusedElem,r=e.selectionRange;if(n!==a&&a&&a.ownerDocument&&au(a.ownerDocument.documentElement,a)){if(r!==null&&Es(a)){if(n=r.start,e=r.end,e===void 0&&(e=n),"selectionStart"in a)a.selectionStart=n,a.selectionEnd=Math.min(e,a.value.length);else if(e=(n=a.ownerDocument||document)&&n.defaultView||window,e.getSelection){e=e.getSelection();var o=a.textContent.length,l=Math.min(r.start,o);r=r.end===void 0?l:Math.min(r.end,o),!e.extend&&l>r&&(o=r,r=l,l=o),o=zi(a,l);var s=zi(a,r);o&&s&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==s.node||e.focusOffset!==s.offset)&&(n=n.createRange(),n.setStart(o.node,o.offset),e.removeAllRanges(),l>r?(e.addRange(n),e.extend(s.node,s.offset)):(n.setEnd(s.node,s.offset),e.addRange(n)))}}for(n=[],e=a;e=e.parentNode;)e.nodeType===1&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof a.focus=="function"&&a.focus(),a=0;a<n.length;a++)e=n[a],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var h0=dn&&"documentMode"in document&&11>=document.documentMode,ua=null,bl=null,sr=null,wl=!1;function $i(e,n,a){var r=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;wl||ua==null||ua!==vo(r)||(r=ua,"selectionStart"in r&&Es(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),sr&&gr(sr,r)||(sr=r,r=Fo(bl,"onSelect"),0<r.length&&(n=new Bs("onSelect","select",null,n,a),e.push({event:n,listeners:r}),n.target=ua)))}function Kr(e,n){var a={};return a[e.toLowerCase()]=n.toLowerCase(),a["Webkit"+e]="webkit"+n,a["Moz"+e]="moz"+n,a}var Pa={animationend:Kr("Animation","AnimationEnd"),animationiteration:Kr("Animation","AnimationIteration"),animationstart:Kr("Animation","AnimationStart"),transitionend:Kr("Transition","TransitionEnd")},jt={},ou={};dn&&(ou=document.createElement("div").style,"AnimationEvent"in window||(delete Pa.animationend.animation,delete Pa.animationiteration.animation,delete Pa.animationstart.animation),"TransitionEvent"in window||delete Pa.transitionend.transition);function qo(e){if(jt[e])return jt[e];if(!Pa[e])return e;var n=Pa[e],a;for(a in n)if(n.hasOwnProperty(a)&&a in ou)return jt[e]=n[a];return e}var tu=qo("animationend"),lu=qo("animationiteration"),su=qo("animationstart"),iu=qo("transitionend"),du=new Map,Xi="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function jn(e,n){du.set(e,n),ra(n,[e])}for(var Ot=0;Ot<Xi.length;Ot++){var _t=Xi[Ot],C0=_t.toLowerCase(),g0=_t[0].toUpperCase()+_t.slice(1);jn(C0,"on"+g0)}jn(tu,"onAnimationEnd");jn(lu,"onAnimationIteration");jn(su,"onAnimationStart");jn("dblclick","onDoubleClick");jn("focusin","onFocus");jn("focusout","onBlur");jn(iu,"onTransitionEnd");wa("onMouseEnter",["mouseout","mouseover"]);wa("onMouseLeave",["mouseout","mouseover"]);wa("onPointerEnter",["pointerout","pointerover"]);wa("onPointerLeave",["pointerout","pointerover"]);ra("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));ra("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));ra("onBeforeInput",["compositionend","keypress","textInput","paste"]);ra("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));ra("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));ra("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var er="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),y0=new Set("cancel close invalid load scroll toggle".split(" ").concat(er));function Hi(e,n,a){var r=e.type||"unknown-event";e.currentTarget=a,Cc(r,n,void 0,e),e.currentTarget=null}function mu(e,n){n=(n&4)!==0;for(var a=0;a<e.length;a++){var r=e[a],o=r.event;r=r.listeners;e:{var l=void 0;if(n)for(var s=r.length-1;0<=s;s--){var i=r[s],d=i.instance,m=i.currentTarget;if(i=i.listener,d!==l&&o.isPropagationStopped())break e;Hi(o,i,m),l=d}else for(s=0;s<r.length;s++){if(i=r[s],d=i.instance,m=i.currentTarget,i=i.listener,d!==l&&o.isPropagationStopped())break e;Hi(o,i,m),l=d}}}if(Do)throw e=Sl,Do=!1,Sl=null,e}function K(e,n){var a=n[Tl];a===void 0&&(a=n[Tl]=new Set);var r=e+"__bubble";a.has(r)||(uu(n,e,2,!1),a.add(r))}function At(e,n,a){var r=0;n&&(r|=4),uu(a,e,r,n)}var Yr="_reactListening"+Math.random().toString(36).slice(2);function yr(e){if(!e[Yr]){e[Yr]=!0,hm.forEach(function(a){a!=="selectionchange"&&(y0.has(a)||At(a,!1,e),At(a,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[Yr]||(n[Yr]=!0,At("selectionchange",!1,n))}}function uu(e,n,a,r){switch(Km(n)){case 1:var o=Oc;break;case 4:o=_c;break;default:o=bs}a=o.bind(null,n,a,e),o=void 0,!yl||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(n,a,{capture:!0,passive:o}):e.addEventListener(n,a,!0):o!==void 0?e.addEventListener(n,a,{passive:o}):e.addEventListener(n,a,!1)}function Rt(e,n,a,r,o){var l=r;if(!(n&1)&&!(n&2)&&r!==null)e:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var i=r.stateNode.containerInfo;if(i===o||i.nodeType===8&&i.parentNode===o)break;if(s===4)for(s=r.return;s!==null;){var d=s.tag;if((d===3||d===4)&&(d=s.stateNode.containerInfo,d===o||d.nodeType===8&&d.parentNode===o))return;s=s.return}for(;i!==null;){if(s=Gn(i),s===null)return;if(d=s.tag,d===5||d===6){r=l=s;continue e}i=i.parentNode}}r=r.return}jm(function(){var m=l,x=Ss(a),p=[];e:{var c=du.get(e);if(c!==void 0){var h=Bs,g=e;switch(e){case"keypress":if(uo(a)===0)break e;case"keydown":case"keyup":h=Qc;break;case"focusin":g="focus",h=Et;break;case"focusout":g="blur",h=Et;break;case"beforeblur":case"afterblur":h=Et;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":h=Oi;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":h=Vc;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":h=e0;break;case tu:case lu:case su:h=Lc;break;case iu:h=a0;break;case"scroll":h=Ac;break;case"wheel":h=o0;break;case"copy":case"cut":case"paste":h=zc;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":h=Ai}var C=(n&4)!==0,v=!C&&e==="scroll",u=C?c!==null?c+"Capture":null:c;C=[];for(var P=m,I;P!==null;){I=P;var D=I.stateNode;if(I.tag===5&&D!==null&&(I=D,u!==null&&(D=pr(P,u),D!=null&&C.push(Sr(P,D,I)))),v)break;P=P.return}0<C.length&&(c=new h(c,g,null,a,x),p.push({event:c,listeners:C}))}}if(!(n&7)){e:{if(c=e==="mouseover"||e==="pointerover",h=e==="mouseout"||e==="pointerout",c&&a!==Cl&&(g=a.relatedTarget||a.fromElement)&&(Gn(g)||g[mn]))break e;if((h||c)&&(c=x.window===x?x:(c=x.ownerDocument)?c.defaultView||c.parentWindow:window,h?(g=a.relatedTarget||a.toElement,h=m,g=g?Gn(g):null,g!==null&&(v=oa(g),g!==v||g.tag!==5&&g.tag!==6)&&(g=null)):(h=null,g=m),h!==g)){if(C=Oi,D="onMouseLeave",u="onMouseEnter",P="mouse",(e==="pointerout"||e==="pointerover")&&(C=Ai,D="onPointerLeave",u="onPointerEnter",P="pointer"),v=h==null?c:ca(h),I=g==null?c:ca(g),c=new C(D,P+"leave",h,a,x),c.target=v,c.relatedTarget=I,D=null,Gn(x)===m&&(C=new C(u,P+"enter",g,a,x),C.target=I,C.relatedTarget=v,D=C),v=D,h&&g)n:{for(C=h,u=g,P=0,I=C;I;I=ta(I))P++;for(I=0,D=u;D;D=ta(D))I++;for(;0<P-I;)C=ta(C),P--;for(;0<I-P;)u=ta(u),I--;for(;P--;){if(C===u||u!==null&&C===u.alternate)break n;C=ta(C),u=ta(u)}C=null}else C=null;h!==null&&Ki(p,c,h,C,!1),g!==null&&v!==null&&Ki(p,v,g,C,!0)}}e:{if(c=m?ca(m):window,h=c.nodeName&&c.nodeName.toLowerCase(),h==="select"||h==="input"&&c.type==="file")var B=u0;else if(Ui(c))if(eu)B=p0;else{B=c0;var y=P0}else(h=c.nodeName)&&h.toLowerCase()==="input"&&(c.type==="checkbox"||c.type==="radio")&&(B=x0);if(B&&(B=B(e,m))){Zm(p,B,a,x);break e}y&&y(e,c,m),e==="focusout"&&(y=c._wrapperState)&&y.controlled&&c.type==="number"&&xl(c,"number",c.value)}switch(y=m?ca(m):window,e){case"focusin":(Ui(y)||y.contentEditable==="true")&&(ua=y,bl=m,sr=null);break;case"focusout":sr=bl=ua=null;break;case"mousedown":wl=!0;break;case"contextmenu":case"mouseup":case"dragend":wl=!1,$i(p,a,x);break;case"selectionchange":if(h0)break;case"keydown":case"keyup":$i(p,a,x)}var f;if(Fs)e:{switch(e){case"compositionstart":var k="onCompositionStart";break e;case"compositionend":k="onCompositionEnd";break e;case"compositionupdate":k="onCompositionUpdate";break e}k=void 0}else ma?Qm(e,a)&&(k="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(k="onCompositionStart");k&&(Jm&&a.locale!=="ko"&&(ma||k!=="onCompositionStart"?k==="onCompositionEnd"&&ma&&(f=Ym()):(yn=x,ws="value"in yn?yn.value:yn.textContent,ma=!0)),y=Fo(m,k),0<y.length&&(k=new _i(k,e,null,a,x),p.push({event:k,listeners:y}),f?k.data=f:(f=qm(a),f!==null&&(k.data=f)))),(f=l0?s0(e,a):i0(e,a))&&(m=Fo(m,"onBeforeInput"),0<m.length&&(x=new _i("onBeforeInput","beforeinput",null,a,x),p.push({event:x,listeners:m}),x.data=f))}mu(p,n)})}function Sr(e,n,a){return{instance:e,listener:n,currentTarget:a}}function Fo(e,n){for(var a=n+"Capture",r=[];e!==null;){var o=e,l=o.stateNode;o.tag===5&&l!==null&&(o=l,l=pr(e,a),l!=null&&r.unshift(Sr(e,l,o)),l=pr(e,n),l!=null&&r.push(Sr(e,l,o))),e=e.return}return r}function ta(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Ki(e,n,a,r,o){for(var l=n._reactName,s=[];a!==null&&a!==r;){var i=a,d=i.alternate,m=i.stateNode;if(d!==null&&d===r)break;i.tag===5&&m!==null&&(i=m,o?(d=pr(a,l),d!=null&&s.unshift(Sr(a,d,i))):o||(d=pr(a,l),d!=null&&s.push(Sr(a,d,i)))),a=a.return}s.length!==0&&e.push({event:n,listeners:s})}var S0=/\r\n?/g,v0=/\u0000|\uFFFD/g;function Yi(e){return(typeof e=="string"?e:""+e).replace(S0,`
`).replace(v0,"")}function Jr(e,n,a){if(n=Yi(n),Yi(e)!==n&&a)throw Error(E(425))}function Eo(){}var Bl=null,kl=null;function Fl(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var El=typeof setTimeout=="function"?setTimeout:void 0,M0=typeof clearTimeout=="function"?clearTimeout:void 0,Ji=typeof Promise=="function"?Promise:void 0,D0=typeof queueMicrotask=="function"?queueMicrotask:typeof Ji<"u"?function(e){return Ji.resolve(null).then(e).catch(b0)}:El;function b0(e){setTimeout(function(){throw e})}function Vt(e,n){var a=n,r=0;do{var o=a.nextSibling;if(e.removeChild(a),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(r===0){e.removeChild(o),hr(n);return}r--}else a!=="$"&&a!=="$?"&&a!=="$!"||r++;a=o}while(a);hr(n)}function bn(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?")break;if(n==="/$")return null}}return e}function Qi(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"){if(n===0)return e;n--}else a==="/$"&&n++}e=e.previousSibling}return null}var Va=Math.random().toString(36).slice(2),Qe="__reactFiber$"+Va,vr="__reactProps$"+Va,mn="__reactContainer$"+Va,Tl="__reactEvents$"+Va,w0="__reactListeners$"+Va,B0="__reactHandles$"+Va;function Gn(e){var n=e[Qe];if(n)return n;for(var a=e.parentNode;a;){if(n=a[mn]||a[Qe]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(e=Qi(e);e!==null;){if(a=e[Qe])return a;e=Qi(e)}return n}e=a,a=e.parentNode}return null}function _r(e){return e=e[Qe]||e[mn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function ca(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(E(33))}function Zo(e){return e[vr]||null}var Nl=[],xa=-1;function On(e){return{current:e}}function Y(e){0>xa||(e.current=Nl[xa],Nl[xa]=null,xa--)}function H(e,n){xa++,Nl[xa]=e.current,e.current=n}var Nn={},Ie=On(Nn),ve=On(!1),Qn=Nn;function Ba(e,n){var a=e.type.contextTypes;if(!a)return Nn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===n)return r.__reactInternalMemoizedMaskedChildContext;var o={},l;for(l in a)o[l]=n[l];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=n,e.__reactInternalMemoizedMaskedChildContext=o),o}function Me(e){return e=e.childContextTypes,e!=null}function To(){Y(ve),Y(Ie)}function qi(e,n,a){if(Ie.current!==Nn)throw Error(E(168));H(Ie,n),H(ve,a)}function Pu(e,n,a){var r=e.stateNode;if(n=n.childContextTypes,typeof r.getChildContext!="function")return a;r=r.getChildContext();for(var o in r)if(!(o in n))throw Error(E(108,Pc(e)||"Unknown",o));return Z({},a,r)}function No(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Nn,Qn=Ie.current,H(Ie,e),H(ve,ve.current),!0}function Zi(e,n,a){var r=e.stateNode;if(!r)throw Error(E(169));a?(e=Pu(e,n,Qn),r.__reactInternalMemoizedMergedChildContext=e,Y(ve),Y(Ie),H(Ie,e)):Y(ve),H(ve,a)}var rn=null,et=!1,Ut=!1;function cu(e){rn===null?rn=[e]:rn.push(e)}function k0(e){et=!0,cu(e)}function _n(){if(!Ut&&rn!==null){Ut=!0;var e=0,n=X;try{var a=rn;for(X=1;e<a.length;e++){var r=a[e];do r=r(!0);while(r!==null)}rn=null,et=!1}catch(o){throw rn!==null&&(rn=rn.slice(e+1)),Rm(vs,_n),o}finally{X=n,Ut=!1}}return null}var pa=[],Ia=0,jo=null,Oo=0,Ne=[],je=0,qn=null,on=1,tn="";function An(e,n){pa[Ia++]=Oo,pa[Ia++]=jo,jo=e,Oo=n}function xu(e,n,a){Ne[je++]=on,Ne[je++]=tn,Ne[je++]=qn,qn=e;var r=on;e=tn;var o=32-Xe(r)-1;r&=~(1<<o),a+=1;var l=32-Xe(n)+o;if(30<l){var s=o-o%5;l=(r&(1<<s)-1).toString(32),r>>=s,o-=s,on=1<<32-Xe(n)+o|a<<o|r,tn=l+e}else on=1<<l|a<<o|r,tn=e}function Ts(e){e.return!==null&&(An(e,1),xu(e,1,0))}function Ns(e){for(;e===jo;)jo=pa[--Ia],pa[Ia]=null,Oo=pa[--Ia],pa[Ia]=null;for(;e===qn;)qn=Ne[--je],Ne[je]=null,tn=Ne[--je],Ne[je]=null,on=Ne[--je],Ne[je]=null}var ke=null,Be=null,J=!1,$e=null;function pu(e,n){var a=Oe(5,null,null,0);a.elementType="DELETED",a.stateNode=n,a.return=e,n=e.deletions,n===null?(e.deletions=[a],e.flags|=16):n.push(a)}function ed(e,n){switch(e.tag){case 5:var a=e.type;return n=n.nodeType!==1||a.toLowerCase()!==n.nodeName.toLowerCase()?null:n,n!==null?(e.stateNode=n,ke=e,Be=bn(n.firstChild),!0):!1;case 6:return n=e.pendingProps===""||n.nodeType!==3?null:n,n!==null?(e.stateNode=n,ke=e,Be=null,!0):!1;case 13:return n=n.nodeType!==8?null:n,n!==null?(a=qn!==null?{id:on,overflow:tn}:null,e.memoizedState={dehydrated:n,treeContext:a,retryLane:1073741824},a=Oe(18,null,null,0),a.stateNode=n,a.return=e,e.child=a,ke=e,Be=null,!0):!1;default:return!1}}function jl(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ol(e){if(J){var n=Be;if(n){var a=n;if(!ed(e,n)){if(jl(e))throw Error(E(418));n=bn(a.nextSibling);var r=ke;n&&ed(e,n)?pu(r,a):(e.flags=e.flags&-4097|2,J=!1,ke=e)}}else{if(jl(e))throw Error(E(418));e.flags=e.flags&-4097|2,J=!1,ke=e}}}function nd(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;ke=e}function Qr(e){if(e!==ke)return!1;if(!J)return nd(e),J=!0,!1;var n;if((n=e.tag!==3)&&!(n=e.tag!==5)&&(n=e.type,n=n!=="head"&&n!=="body"&&!Fl(e.type,e.memoizedProps)),n&&(n=Be)){if(jl(e))throw Iu(),Error(E(418));for(;n;)pu(e,n),n=bn(n.nextSibling)}if(nd(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(E(317));e:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"){if(n===0){Be=bn(e.nextSibling);break e}n--}else a!=="$"&&a!=="$!"&&a!=="$?"||n++}e=e.nextSibling}Be=null}}else Be=ke?bn(e.stateNode.nextSibling):null;return!0}function Iu(){for(var e=Be;e;)e=bn(e.nextSibling)}function ka(){Be=ke=null,J=!1}function js(e){$e===null?$e=[e]:$e.push(e)}var F0=pn.ReactCurrentBatchConfig;function $a(e,n,a){if(e=a.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(a._owner){if(a=a._owner,a){if(a.tag!==1)throw Error(E(309));var r=a.stateNode}if(!r)throw Error(E(147,e));var o=r,l=""+e;return n!==null&&n.ref!==null&&typeof n.ref=="function"&&n.ref._stringRef===l?n.ref:(n=function(s){var i=o.refs;s===null?delete i[l]:i[l]=s},n._stringRef=l,n)}if(typeof e!="string")throw Error(E(284));if(!a._owner)throw Error(E(290,e))}return e}function qr(e,n){throw e=Object.prototype.toString.call(n),Error(E(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e))}function ad(e){var n=e._init;return n(e._payload)}function fu(e){function n(u,P){if(e){var I=u.deletions;I===null?(u.deletions=[P],u.flags|=16):I.push(P)}}function a(u,P){if(!e)return null;for(;P!==null;)n(u,P),P=P.sibling;return null}function r(u,P){for(u=new Map;P!==null;)P.key!==null?u.set(P.key,P):u.set(P.index,P),P=P.sibling;return u}function o(u,P){return u=Fn(u,P),u.index=0,u.sibling=null,u}function l(u,P,I){return u.index=I,e?(I=u.alternate,I!==null?(I=I.index,I<P?(u.flags|=2,P):I):(u.flags|=2,P)):(u.flags|=1048576,P)}function s(u){return e&&u.alternate===null&&(u.flags|=2),u}function i(u,P,I,D){return P===null||P.tag!==6?(P=Ht(I,u.mode,D),P.return=u,P):(P=o(P,I),P.return=u,P)}function d(u,P,I,D){var B=I.type;return B===da?x(u,P,I.props.children,D,I.key):P!==null&&(P.elementType===B||typeof B=="object"&&B!==null&&B.$$typeof===fn&&ad(B)===P.type)?(D=o(P,I.props),D.ref=$a(u,P,I),D.return=u,D):(D=ho(I.type,I.key,I.props,null,u.mode,D),D.ref=$a(u,P,I),D.return=u,D)}function m(u,P,I,D){return P===null||P.tag!==4||P.stateNode.containerInfo!==I.containerInfo||P.stateNode.implementation!==I.implementation?(P=Kt(I,u.mode,D),P.return=u,P):(P=o(P,I.children||[]),P.return=u,P)}function x(u,P,I,D,B){return P===null||P.tag!==7?(P=Kn(I,u.mode,D,B),P.return=u,P):(P=o(P,I),P.return=u,P)}function p(u,P,I){if(typeof P=="string"&&P!==""||typeof P=="number")return P=Ht(""+P,u.mode,I),P.return=u,P;if(typeof P=="object"&&P!==null){switch(P.$$typeof){case Gr:return I=ho(P.type,P.key,P.props,null,u.mode,I),I.ref=$a(u,null,P),I.return=u,I;case ia:return P=Kt(P,u.mode,I),P.return=u,P;case fn:var D=P._init;return p(u,D(P._payload),I)}if(qa(P)||Ua(P))return P=Kn(P,u.mode,I,null),P.return=u,P;qr(u,P)}return null}function c(u,P,I,D){var B=P!==null?P.key:null;if(typeof I=="string"&&I!==""||typeof I=="number")return B!==null?null:i(u,P,""+I,D);if(typeof I=="object"&&I!==null){switch(I.$$typeof){case Gr:return I.key===B?d(u,P,I,D):null;case ia:return I.key===B?m(u,P,I,D):null;case fn:return B=I._init,c(u,P,B(I._payload),D)}if(qa(I)||Ua(I))return B!==null?null:x(u,P,I,D,null);qr(u,I)}return null}function h(u,P,I,D,B){if(typeof D=="string"&&D!==""||typeof D=="number")return u=u.get(I)||null,i(P,u,""+D,B);if(typeof D=="object"&&D!==null){switch(D.$$typeof){case Gr:return u=u.get(D.key===null?I:D.key)||null,d(P,u,D,B);case ia:return u=u.get(D.key===null?I:D.key)||null,m(P,u,D,B);case fn:var y=D._init;return h(u,P,I,y(D._payload),B)}if(qa(D)||Ua(D))return u=u.get(I)||null,x(P,u,D,B,null);qr(P,D)}return null}function g(u,P,I,D){for(var B=null,y=null,f=P,k=P=0,T=null;f!==null&&k<I.length;k++){f.index>k?(T=f,f=null):T=f.sibling;var F=c(u,f,I[k],D);if(F===null){f===null&&(f=T);break}e&&f&&F.alternate===null&&n(u,f),P=l(F,P,k),y===null?B=F:y.sibling=F,y=F,f=T}if(k===I.length)return a(u,f),J&&An(u,k),B;if(f===null){for(;k<I.length;k++)f=p(u,I[k],D),f!==null&&(P=l(f,P,k),y===null?B=f:y.sibling=f,y=f);return J&&An(u,k),B}for(f=r(u,f);k<I.length;k++)T=h(f,u,k,I[k],D),T!==null&&(e&&T.alternate!==null&&f.delete(T.key===null?k:T.key),P=l(T,P,k),y===null?B=T:y.sibling=T,y=T);return e&&f.forEach(function(_){return n(u,_)}),J&&An(u,k),B}function C(u,P,I,D){var B=Ua(I);if(typeof B!="function")throw Error(E(150));if(I=B.call(I),I==null)throw Error(E(151));for(var y=B=null,f=P,k=P=0,T=null,F=I.next();f!==null&&!F.done;k++,F=I.next()){f.index>k?(T=f,f=null):T=f.sibling;var _=c(u,f,F.value,D);if(_===null){f===null&&(f=T);break}e&&f&&_.alternate===null&&n(u,f),P=l(_,P,k),y===null?B=_:y.sibling=_,y=_,f=T}if(F.done)return a(u,f),J&&An(u,k),B;if(f===null){for(;!F.done;k++,F=I.next())F=p(u,F.value,D),F!==null&&(P=l(F,P,k),y===null?B=F:y.sibling=F,y=F);return J&&An(u,k),B}for(f=r(u,f);!F.done;k++,F=I.next())F=h(f,u,k,F.value,D),F!==null&&(e&&F.alternate!==null&&f.delete(F.key===null?k:F.key),P=l(F,P,k),y===null?B=F:y.sibling=F,y=F);return e&&f.forEach(function(U){return n(u,U)}),J&&An(u,k),B}function v(u,P,I,D){if(typeof I=="object"&&I!==null&&I.type===da&&I.key===null&&(I=I.props.children),typeof I=="object"&&I!==null){switch(I.$$typeof){case Gr:e:{for(var B=I.key,y=P;y!==null;){if(y.key===B){if(B=I.type,B===da){if(y.tag===7){a(u,y.sibling),P=o(y,I.props.children),P.return=u,u=P;break e}}else if(y.elementType===B||typeof B=="object"&&B!==null&&B.$$typeof===fn&&ad(B)===y.type){a(u,y.sibling),P=o(y,I.props),P.ref=$a(u,y,I),P.return=u,u=P;break e}a(u,y);break}else n(u,y);y=y.sibling}I.type===da?(P=Kn(I.props.children,u.mode,D,I.key),P.return=u,u=P):(D=ho(I.type,I.key,I.props,null,u.mode,D),D.ref=$a(u,P,I),D.return=u,u=D)}return s(u);case ia:e:{for(y=I.key;P!==null;){if(P.key===y)if(P.tag===4&&P.stateNode.containerInfo===I.containerInfo&&P.stateNode.implementation===I.implementation){a(u,P.sibling),P=o(P,I.children||[]),P.return=u,u=P;break e}else{a(u,P);break}else n(u,P);P=P.sibling}P=Kt(I,u.mode,D),P.return=u,u=P}return s(u);case fn:return y=I._init,v(u,P,y(I._payload),D)}if(qa(I))return g(u,P,I,D);if(Ua(I))return C(u,P,I,D);qr(u,I)}return typeof I=="string"&&I!==""||typeof I=="number"?(I=""+I,P!==null&&P.tag===6?(a(u,P.sibling),P=o(P,I),P.return=u,u=P):(a(u,P),P=Ht(I,u.mode,D),P.return=u,u=P),s(u)):a(u,P)}return v}var Fa=fu(!0),hu=fu(!1),_o=On(null),Ao=null,fa=null,Os=null;function _s(){Os=fa=Ao=null}function As(e){var n=_o.current;Y(_o),e._currentValue=n}function _l(e,n,a){for(;e!==null;){var r=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===a)break;e=e.return}}function Da(e,n){Ao=e,Os=fa=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&n&&(Se=!0),e.firstContext=null)}function Ae(e){var n=e._currentValue;if(Os!==e)if(e={context:e,memoizedValue:n,next:null},fa===null){if(Ao===null)throw Error(E(308));fa=e,Ao.dependencies={lanes:0,firstContext:e}}else fa=fa.next=e;return n}var Ln=null;function Rs(e){Ln===null?Ln=[e]:Ln.push(e)}function Cu(e,n,a,r){var o=n.interleaved;return o===null?(a.next=a,Rs(n)):(a.next=o.next,o.next=a),n.interleaved=a,un(e,r)}function un(e,n){e.lanes|=n;var a=e.alternate;for(a!==null&&(a.lanes|=n),a=e,e=e.return;e!==null;)e.childLanes|=n,a=e.alternate,a!==null&&(a.childLanes|=n),a=e,e=e.return;return a.tag===3?a.stateNode:null}var hn=!1;function Vs(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function gu(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function ln(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function wn(e,n,a){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,$&2){var o=r.pending;return o===null?n.next=n:(n.next=o.next,o.next=n),r.pending=n,un(e,a)}return o=r.interleaved,o===null?(n.next=n,Rs(r)):(n.next=o.next,o.next=n),r.interleaved=n,un(e,a)}function Po(e,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194240)!==0)){var r=n.lanes;r&=e.pendingLanes,a|=r,n.lanes=a,Ms(e,a)}}function rd(e,n){var a=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,a===r)){var o=null,l=null;if(a=a.firstBaseUpdate,a!==null){do{var s={eventTime:a.eventTime,lane:a.lane,tag:a.tag,payload:a.payload,callback:a.callback,next:null};l===null?o=l=s:l=l.next=s,a=a.next}while(a!==null);l===null?o=l=n:l=l.next=n}else o=l=n;a={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:l,shared:r.shared,effects:r.effects},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=n:e.next=n,a.lastBaseUpdate=n}function Ro(e,n,a,r){var o=e.updateQueue;hn=!1;var l=o.firstBaseUpdate,s=o.lastBaseUpdate,i=o.shared.pending;if(i!==null){o.shared.pending=null;var d=i,m=d.next;d.next=null,s===null?l=m:s.next=m,s=d;var x=e.alternate;x!==null&&(x=x.updateQueue,i=x.lastBaseUpdate,i!==s&&(i===null?x.firstBaseUpdate=m:i.next=m,x.lastBaseUpdate=d))}if(l!==null){var p=o.baseState;s=0,x=m=d=null,i=l;do{var c=i.lane,h=i.eventTime;if((r&c)===c){x!==null&&(x=x.next={eventTime:h,lane:0,tag:i.tag,payload:i.payload,callback:i.callback,next:null});e:{var g=e,C=i;switch(c=n,h=a,C.tag){case 1:if(g=C.payload,typeof g=="function"){p=g.call(h,p,c);break e}p=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=C.payload,c=typeof g=="function"?g.call(h,p,c):g,c==null)break e;p=Z({},p,c);break e;case 2:hn=!0}}i.callback!==null&&i.lane!==0&&(e.flags|=64,c=o.effects,c===null?o.effects=[i]:c.push(i))}else h={eventTime:h,lane:c,tag:i.tag,payload:i.payload,callback:i.callback,next:null},x===null?(m=x=h,d=p):x=x.next=h,s|=c;if(i=i.next,i===null){if(i=o.shared.pending,i===null)break;c=i,i=c.next,c.next=null,o.lastBaseUpdate=c,o.shared.pending=null}}while(!0);if(x===null&&(d=p),o.baseState=d,o.firstBaseUpdate=m,o.lastBaseUpdate=x,n=o.shared.interleaved,n!==null){o=n;do s|=o.lane,o=o.next;while(o!==n)}else l===null&&(o.shared.lanes=0);ea|=s,e.lanes=s,e.memoizedState=p}}function od(e,n,a){if(e=n.effects,n.effects=null,e!==null)for(n=0;n<e.length;n++){var r=e[n],o=r.callback;if(o!==null){if(r.callback=null,r=a,typeof o!="function")throw Error(E(191,o));o.call(r)}}}var Ar={},Ze=On(Ar),Mr=On(Ar),Dr=On(Ar);function Wn(e){if(e===Ar)throw Error(E(174));return e}function Us(e,n){switch(H(Dr,n),H(Mr,e),H(Ze,Ar),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:Il(null,"");break;default:e=e===8?n.parentNode:n,n=e.namespaceURI||null,e=e.tagName,n=Il(n,e)}Y(Ze),H(Ze,n)}function Ea(){Y(Ze),Y(Mr),Y(Dr)}function yu(e){Wn(Dr.current);var n=Wn(Ze.current),a=Il(n,e.type);n!==a&&(H(Mr,e),H(Ze,a))}function Gs(e){Mr.current===e&&(Y(Ze),Y(Mr))}var Q=On(0);function Vo(e){for(var n=e;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||a.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if(n.flags&128)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Gt=[];function Ls(){for(var e=0;e<Gt.length;e++)Gt[e]._workInProgressVersionPrimary=null;Gt.length=0}var co=pn.ReactCurrentDispatcher,Lt=pn.ReactCurrentBatchConfig,Zn=0,q=null,oe=null,se=null,Uo=!1,ir=!1,br=0,E0=0;function ce(){throw Error(E(321))}function Ws(e,n){if(n===null)return!1;for(var a=0;a<n.length&&a<e.length;a++)if(!Ke(e[a],n[a]))return!1;return!0}function zs(e,n,a,r,o,l){if(Zn=l,q=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,co.current=e===null||e.memoizedState===null?O0:_0,e=a(r,o),ir){l=0;do{if(ir=!1,br=0,25<=l)throw Error(E(301));l+=1,se=oe=null,n.updateQueue=null,co.current=A0,e=a(r,o)}while(ir)}if(co.current=Go,n=oe!==null&&oe.next!==null,Zn=0,se=oe=q=null,Uo=!1,n)throw Error(E(300));return e}function $s(){var e=br!==0;return br=0,e}function Je(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return se===null?q.memoizedState=se=e:se=se.next=e,se}function Re(){if(oe===null){var e=q.alternate;e=e!==null?e.memoizedState:null}else e=oe.next;var n=se===null?q.memoizedState:se.next;if(n!==null)se=n,oe=e;else{if(e===null)throw Error(E(310));oe=e,e={memoizedState:oe.memoizedState,baseState:oe.baseState,baseQueue:oe.baseQueue,queue:oe.queue,next:null},se===null?q.memoizedState=se=e:se=se.next=e}return se}function wr(e,n){return typeof n=="function"?n(e):n}function Wt(e){var n=Re(),a=n.queue;if(a===null)throw Error(E(311));a.lastRenderedReducer=e;var r=oe,o=r.baseQueue,l=a.pending;if(l!==null){if(o!==null){var s=o.next;o.next=l.next,l.next=s}r.baseQueue=o=l,a.pending=null}if(o!==null){l=o.next,r=r.baseState;var i=s=null,d=null,m=l;do{var x=m.lane;if((Zn&x)===x)d!==null&&(d=d.next={lane:0,action:m.action,hasEagerState:m.hasEagerState,eagerState:m.eagerState,next:null}),r=m.hasEagerState?m.eagerState:e(r,m.action);else{var p={lane:x,action:m.action,hasEagerState:m.hasEagerState,eagerState:m.eagerState,next:null};d===null?(i=d=p,s=r):d=d.next=p,q.lanes|=x,ea|=x}m=m.next}while(m!==null&&m!==l);d===null?s=r:d.next=i,Ke(r,n.memoizedState)||(Se=!0),n.memoizedState=r,n.baseState=s,n.baseQueue=d,a.lastRenderedState=r}if(e=a.interleaved,e!==null){o=e;do l=o.lane,q.lanes|=l,ea|=l,o=o.next;while(o!==e)}else o===null&&(a.lanes=0);return[n.memoizedState,a.dispatch]}function zt(e){var n=Re(),a=n.queue;if(a===null)throw Error(E(311));a.lastRenderedReducer=e;var r=a.dispatch,o=a.pending,l=n.memoizedState;if(o!==null){a.pending=null;var s=o=o.next;do l=e(l,s.action),s=s.next;while(s!==o);Ke(l,n.memoizedState)||(Se=!0),n.memoizedState=l,n.baseQueue===null&&(n.baseState=l),a.lastRenderedState=l}return[l,r]}function Su(){}function vu(e,n){var a=q,r=Re(),o=n(),l=!Ke(r.memoizedState,o);if(l&&(r.memoizedState=o,Se=!0),r=r.queue,Xs(bu.bind(null,a,r,e),[e]),r.getSnapshot!==n||l||se!==null&&se.memoizedState.tag&1){if(a.flags|=2048,Br(9,Du.bind(null,a,r,o,n),void 0,null),ie===null)throw Error(E(349));Zn&30||Mu(a,n,o)}return o}function Mu(e,n,a){e.flags|=16384,e={getSnapshot:n,value:a},n=q.updateQueue,n===null?(n={lastEffect:null,stores:null},q.updateQueue=n,n.stores=[e]):(a=n.stores,a===null?n.stores=[e]:a.push(e))}function Du(e,n,a,r){n.value=a,n.getSnapshot=r,wu(n)&&Bu(e)}function bu(e,n,a){return a(function(){wu(n)&&Bu(e)})}function wu(e){var n=e.getSnapshot;e=e.value;try{var a=n();return!Ke(e,a)}catch{return!0}}function Bu(e){var n=un(e,1);n!==null&&He(n,e,1,-1)}function td(e){var n=Je();return typeof e=="function"&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:wr,lastRenderedState:e},n.queue=e,e=e.dispatch=j0.bind(null,q,e),[n.memoizedState,e]}function Br(e,n,a,r){return e={tag:e,create:n,destroy:a,deps:r,next:null},n=q.updateQueue,n===null?(n={lastEffect:null,stores:null},q.updateQueue=n,n.lastEffect=e.next=e):(a=n.lastEffect,a===null?n.lastEffect=e.next=e:(r=a.next,a.next=e,e.next=r,n.lastEffect=e)),e}function ku(){return Re().memoizedState}function xo(e,n,a,r){var o=Je();q.flags|=e,o.memoizedState=Br(1|n,a,void 0,r===void 0?null:r)}function nt(e,n,a,r){var o=Re();r=r===void 0?null:r;var l=void 0;if(oe!==null){var s=oe.memoizedState;if(l=s.destroy,r!==null&&Ws(r,s.deps)){o.memoizedState=Br(n,a,l,r);return}}q.flags|=e,o.memoizedState=Br(1|n,a,l,r)}function ld(e,n){return xo(8390656,8,e,n)}function Xs(e,n){return nt(2048,8,e,n)}function Fu(e,n){return nt(4,2,e,n)}function Eu(e,n){return nt(4,4,e,n)}function Tu(e,n){if(typeof n=="function")return e=e(),n(e),function(){n(null)};if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Nu(e,n,a){return a=a!=null?a.concat([e]):null,nt(4,4,Tu.bind(null,n,e),a)}function Hs(){}function ju(e,n){var a=Re();n=n===void 0?null:n;var r=a.memoizedState;return r!==null&&n!==null&&Ws(n,r[1])?r[0]:(a.memoizedState=[e,n],e)}function Ou(e,n){var a=Re();n=n===void 0?null:n;var r=a.memoizedState;return r!==null&&n!==null&&Ws(n,r[1])?r[0]:(e=e(),a.memoizedState=[e,n],e)}function _u(e,n,a){return Zn&21?(Ke(a,n)||(a=Gm(),q.lanes|=a,ea|=a,e.baseState=!0),n):(e.baseState&&(e.baseState=!1,Se=!0),e.memoizedState=a)}function T0(e,n){var a=X;X=a!==0&&4>a?a:4,e(!0);var r=Lt.transition;Lt.transition={};try{e(!1),n()}finally{X=a,Lt.transition=r}}function Au(){return Re().memoizedState}function N0(e,n,a){var r=kn(e);if(a={lane:r,action:a,hasEagerState:!1,eagerState:null,next:null},Ru(e))Vu(n,a);else if(a=Cu(e,n,a,r),a!==null){var o=he();He(a,e,r,o),Uu(a,n,r)}}function j0(e,n,a){var r=kn(e),o={lane:r,action:a,hasEagerState:!1,eagerState:null,next:null};if(Ru(e))Vu(n,o);else{var l=e.alternate;if(e.lanes===0&&(l===null||l.lanes===0)&&(l=n.lastRenderedReducer,l!==null))try{var s=n.lastRenderedState,i=l(s,a);if(o.hasEagerState=!0,o.eagerState=i,Ke(i,s)){var d=n.interleaved;d===null?(o.next=o,Rs(n)):(o.next=d.next,d.next=o),n.interleaved=o;return}}catch{}finally{}a=Cu(e,n,o,r),a!==null&&(o=he(),He(a,e,r,o),Uu(a,n,r))}}function Ru(e){var n=e.alternate;return e===q||n!==null&&n===q}function Vu(e,n){ir=Uo=!0;var a=e.pending;a===null?n.next=n:(n.next=a.next,a.next=n),e.pending=n}function Uu(e,n,a){if(a&4194240){var r=n.lanes;r&=e.pendingLanes,a|=r,n.lanes=a,Ms(e,a)}}var Go={readContext:Ae,useCallback:ce,useContext:ce,useEffect:ce,useImperativeHandle:ce,useInsertionEffect:ce,useLayoutEffect:ce,useMemo:ce,useReducer:ce,useRef:ce,useState:ce,useDebugValue:ce,useDeferredValue:ce,useTransition:ce,useMutableSource:ce,useSyncExternalStore:ce,useId:ce,unstable_isNewReconciler:!1},O0={readContext:Ae,useCallback:function(e,n){return Je().memoizedState=[e,n===void 0?null:n],e},useContext:Ae,useEffect:ld,useImperativeHandle:function(e,n,a){return a=a!=null?a.concat([e]):null,xo(4194308,4,Tu.bind(null,n,e),a)},useLayoutEffect:function(e,n){return xo(4194308,4,e,n)},useInsertionEffect:function(e,n){return xo(4,2,e,n)},useMemo:function(e,n){var a=Je();return n=n===void 0?null:n,e=e(),a.memoizedState=[e,n],e},useReducer:function(e,n,a){var r=Je();return n=a!==void 0?a(n):n,r.memoizedState=r.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},r.queue=e,e=e.dispatch=N0.bind(null,q,e),[r.memoizedState,e]},useRef:function(e){var n=Je();return e={current:e},n.memoizedState=e},useState:td,useDebugValue:Hs,useDeferredValue:function(e){return Je().memoizedState=e},useTransition:function(){var e=td(!1),n=e[0];return e=T0.bind(null,e[1]),Je().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(e,n,a){var r=q,o=Je();if(J){if(a===void 0)throw Error(E(407));a=a()}else{if(a=n(),ie===null)throw Error(E(349));Zn&30||Mu(r,n,a)}o.memoizedState=a;var l={value:a,getSnapshot:n};return o.queue=l,ld(bu.bind(null,r,l,e),[e]),r.flags|=2048,Br(9,Du.bind(null,r,l,a,n),void 0,null),a},useId:function(){var e=Je(),n=ie.identifierPrefix;if(J){var a=tn,r=on;a=(r&~(1<<32-Xe(r)-1)).toString(32)+a,n=":"+n+"R"+a,a=br++,0<a&&(n+="H"+a.toString(32)),n+=":"}else a=E0++,n=":"+n+"r"+a.toString(32)+":";return e.memoizedState=n},unstable_isNewReconciler:!1},_0={readContext:Ae,useCallback:ju,useContext:Ae,useEffect:Xs,useImperativeHandle:Nu,useInsertionEffect:Fu,useLayoutEffect:Eu,useMemo:Ou,useReducer:Wt,useRef:ku,useState:function(){return Wt(wr)},useDebugValue:Hs,useDeferredValue:function(e){var n=Re();return _u(n,oe.memoizedState,e)},useTransition:function(){var e=Wt(wr)[0],n=Re().memoizedState;return[e,n]},useMutableSource:Su,useSyncExternalStore:vu,useId:Au,unstable_isNewReconciler:!1},A0={readContext:Ae,useCallback:ju,useContext:Ae,useEffect:Xs,useImperativeHandle:Nu,useInsertionEffect:Fu,useLayoutEffect:Eu,useMemo:Ou,useReducer:zt,useRef:ku,useState:function(){return zt(wr)},useDebugValue:Hs,useDeferredValue:function(e){var n=Re();return oe===null?n.memoizedState=e:_u(n,oe.memoizedState,e)},useTransition:function(){var e=zt(wr)[0],n=Re().memoizedState;return[e,n]},useMutableSource:Su,useSyncExternalStore:vu,useId:Au,unstable_isNewReconciler:!1};function We(e,n){if(e&&e.defaultProps){n=Z({},n),e=e.defaultProps;for(var a in e)n[a]===void 0&&(n[a]=e[a]);return n}return n}function Al(e,n,a,r){n=e.memoizedState,a=a(r,n),a=a==null?n:Z({},n,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var at={isMounted:function(e){return(e=e._reactInternals)?oa(e)===e:!1},enqueueSetState:function(e,n,a){e=e._reactInternals;var r=he(),o=kn(e),l=ln(r,o);l.payload=n,a!=null&&(l.callback=a),n=wn(e,l,o),n!==null&&(He(n,e,o,r),Po(n,e,o))},enqueueReplaceState:function(e,n,a){e=e._reactInternals;var r=he(),o=kn(e),l=ln(r,o);l.tag=1,l.payload=n,a!=null&&(l.callback=a),n=wn(e,l,o),n!==null&&(He(n,e,o,r),Po(n,e,o))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var a=he(),r=kn(e),o=ln(a,r);o.tag=2,n!=null&&(o.callback=n),n=wn(e,o,r),n!==null&&(He(n,e,r,a),Po(n,e,r))}};function sd(e,n,a,r,o,l,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,l,s):n.prototype&&n.prototype.isPureReactComponent?!gr(a,r)||!gr(o,l):!0}function Gu(e,n,a){var r=!1,o=Nn,l=n.contextType;return typeof l=="object"&&l!==null?l=Ae(l):(o=Me(n)?Qn:Ie.current,r=n.contextTypes,l=(r=r!=null)?Ba(e,o):Nn),n=new n(a,l),e.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=at,e.stateNode=n,n._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=l),n}function id(e,n,a,r){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,r),n.state!==e&&at.enqueueReplaceState(n,n.state,null)}function Rl(e,n,a,r){var o=e.stateNode;o.props=a,o.state=e.memoizedState,o.refs={},Vs(e);var l=n.contextType;typeof l=="object"&&l!==null?o.context=Ae(l):(l=Me(n)?Qn:Ie.current,o.context=Ba(e,l)),o.state=e.memoizedState,l=n.getDerivedStateFromProps,typeof l=="function"&&(Al(e,n,l,a),o.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(n=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),n!==o.state&&at.enqueueReplaceState(o,o.state,null),Ro(e,a,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function Ta(e,n){try{var a="",r=n;do a+=uc(r),r=r.return;while(r);var o=a}catch(l){o=`
Error generating stack: `+l.message+`
`+l.stack}return{value:e,source:n,stack:o,digest:null}}function $t(e,n,a){return{value:e,source:null,stack:a??null,digest:n??null}}function Vl(e,n){try{console.error(n.value)}catch(a){setTimeout(function(){throw a})}}var R0=typeof WeakMap=="function"?WeakMap:Map;function Lu(e,n,a){a=ln(-1,a),a.tag=3,a.payload={element:null};var r=n.value;return a.callback=function(){Wo||(Wo=!0,Yl=r),Vl(e,n)},a}function Wu(e,n,a){a=ln(-1,a),a.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=n.value;a.payload=function(){return r(o)},a.callback=function(){Vl(e,n)}}var l=e.stateNode;return l!==null&&typeof l.componentDidCatch=="function"&&(a.callback=function(){Vl(e,n),typeof r!="function"&&(Bn===null?Bn=new Set([this]):Bn.add(this));var s=n.stack;this.componentDidCatch(n.value,{componentStack:s!==null?s:""})}),a}function dd(e,n,a){var r=e.pingCache;if(r===null){r=e.pingCache=new R0;var o=new Set;r.set(n,o)}else o=r.get(n),o===void 0&&(o=new Set,r.set(n,o));o.has(a)||(o.add(a),e=q0.bind(null,e,n,a),n.then(e,e))}function md(e){do{var n;if((n=e.tag===13)&&(n=e.memoizedState,n=n!==null?n.dehydrated!==null:!0),n)return e;e=e.return}while(e!==null);return null}function ud(e,n,a,r,o){return e.mode&1?(e.flags|=65536,e.lanes=o,e):(e===n?e.flags|=65536:(e.flags|=128,a.flags|=131072,a.flags&=-52805,a.tag===1&&(a.alternate===null?a.tag=17:(n=ln(-1,1),n.tag=2,wn(a,n,1))),a.lanes|=1),e)}var V0=pn.ReactCurrentOwner,Se=!1;function fe(e,n,a,r){n.child=e===null?hu(n,null,a,r):Fa(n,e.child,a,r)}function Pd(e,n,a,r,o){a=a.render;var l=n.ref;return Da(n,o),r=zs(e,n,a,r,l,o),a=$s(),e!==null&&!Se?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~o,Pn(e,n,o)):(J&&a&&Ts(n),n.flags|=1,fe(e,n,r,o),n.child)}function cd(e,n,a,r,o){if(e===null){var l=a.type;return typeof l=="function"&&!ni(l)&&l.defaultProps===void 0&&a.compare===null&&a.defaultProps===void 0?(n.tag=15,n.type=l,zu(e,n,l,r,o)):(e=ho(a.type,null,r,n,n.mode,o),e.ref=n.ref,e.return=n,n.child=e)}if(l=e.child,!(e.lanes&o)){var s=l.memoizedProps;if(a=a.compare,a=a!==null?a:gr,a(s,r)&&e.ref===n.ref)return Pn(e,n,o)}return n.flags|=1,e=Fn(l,r),e.ref=n.ref,e.return=n,n.child=e}function zu(e,n,a,r,o){if(e!==null){var l=e.memoizedProps;if(gr(l,r)&&e.ref===n.ref)if(Se=!1,n.pendingProps=r=l,(e.lanes&o)!==0)e.flags&131072&&(Se=!0);else return n.lanes=e.lanes,Pn(e,n,o)}return Ul(e,n,a,r,o)}function $u(e,n,a){var r=n.pendingProps,o=r.children,l=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(n.mode&1))n.memoizedState={baseLanes:0,cachePool:null,transitions:null},H(Ca,we),we|=a;else{if(!(a&1073741824))return e=l!==null?l.baseLanes|a:a,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,H(Ca,we),we|=e,null;n.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=l!==null?l.baseLanes:a,H(Ca,we),we|=r}else l!==null?(r=l.baseLanes|a,n.memoizedState=null):r=a,H(Ca,we),we|=r;return fe(e,n,o,a),n.child}function Xu(e,n){var a=n.ref;(e===null&&a!==null||e!==null&&e.ref!==a)&&(n.flags|=512,n.flags|=2097152)}function Ul(e,n,a,r,o){var l=Me(a)?Qn:Ie.current;return l=Ba(n,l),Da(n,o),a=zs(e,n,a,r,l,o),r=$s(),e!==null&&!Se?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~o,Pn(e,n,o)):(J&&r&&Ts(n),n.flags|=1,fe(e,n,a,o),n.child)}function xd(e,n,a,r,o){if(Me(a)){var l=!0;No(n)}else l=!1;if(Da(n,o),n.stateNode===null)po(e,n),Gu(n,a,r),Rl(n,a,r,o),r=!0;else if(e===null){var s=n.stateNode,i=n.memoizedProps;s.props=i;var d=s.context,m=a.contextType;typeof m=="object"&&m!==null?m=Ae(m):(m=Me(a)?Qn:Ie.current,m=Ba(n,m));var x=a.getDerivedStateFromProps,p=typeof x=="function"||typeof s.getSnapshotBeforeUpdate=="function";p||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(i!==r||d!==m)&&id(n,s,r,m),hn=!1;var c=n.memoizedState;s.state=c,Ro(n,r,s,o),d=n.memoizedState,i!==r||c!==d||ve.current||hn?(typeof x=="function"&&(Al(n,a,x,r),d=n.memoizedState),(i=hn||sd(n,a,i,r,c,d,m))?(p||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(n.flags|=4194308)):(typeof s.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=d),s.props=r,s.state=d,s.context=m,r=i):(typeof s.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{s=n.stateNode,gu(e,n),i=n.memoizedProps,m=n.type===n.elementType?i:We(n.type,i),s.props=m,p=n.pendingProps,c=s.context,d=a.contextType,typeof d=="object"&&d!==null?d=Ae(d):(d=Me(a)?Qn:Ie.current,d=Ba(n,d));var h=a.getDerivedStateFromProps;(x=typeof h=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(i!==p||c!==d)&&id(n,s,r,d),hn=!1,c=n.memoizedState,s.state=c,Ro(n,r,s,o);var g=n.memoizedState;i!==p||c!==g||ve.current||hn?(typeof h=="function"&&(Al(n,a,h,r),g=n.memoizedState),(m=hn||sd(n,a,m,r,c,g,d)||!1)?(x||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(r,g,d),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(r,g,d)),typeof s.componentDidUpdate=="function"&&(n.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof s.componentDidUpdate!="function"||i===e.memoizedProps&&c===e.memoizedState||(n.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||i===e.memoizedProps&&c===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=g),s.props=r,s.state=g,s.context=d,r=m):(typeof s.componentDidUpdate!="function"||i===e.memoizedProps&&c===e.memoizedState||(n.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||i===e.memoizedProps&&c===e.memoizedState||(n.flags|=1024),r=!1)}return Gl(e,n,a,r,l,o)}function Gl(e,n,a,r,o,l){Xu(e,n);var s=(n.flags&128)!==0;if(!r&&!s)return o&&Zi(n,a,!1),Pn(e,n,l);r=n.stateNode,V0.current=n;var i=s&&typeof a.getDerivedStateFromError!="function"?null:r.render();return n.flags|=1,e!==null&&s?(n.child=Fa(n,e.child,null,l),n.child=Fa(n,null,i,l)):fe(e,n,i,l),n.memoizedState=r.state,o&&Zi(n,a,!0),n.child}function Hu(e){var n=e.stateNode;n.pendingContext?qi(e,n.pendingContext,n.pendingContext!==n.context):n.context&&qi(e,n.context,!1),Us(e,n.containerInfo)}function pd(e,n,a,r,o){return ka(),js(o),n.flags|=256,fe(e,n,a,r),n.child}var Ll={dehydrated:null,treeContext:null,retryLane:0};function Wl(e){return{baseLanes:e,cachePool:null,transitions:null}}function Ku(e,n,a){var r=n.pendingProps,o=Q.current,l=!1,s=(n.flags&128)!==0,i;if((i=s)||(i=e!==null&&e.memoizedState===null?!1:(o&2)!==0),i?(l=!0,n.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),H(Q,o&1),e===null)return Ol(n),e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(n.mode&1?e.data==="$!"?n.lanes=8:n.lanes=1073741824:n.lanes=1,null):(s=r.children,e=r.fallback,l?(r=n.mode,l=n.child,s={mode:"hidden",children:s},!(r&1)&&l!==null?(l.childLanes=0,l.pendingProps=s):l=tt(s,r,0,null),e=Kn(e,r,a,null),l.return=n,e.return=n,l.sibling=e,n.child=l,n.child.memoizedState=Wl(a),n.memoizedState=Ll,e):Ks(n,s));if(o=e.memoizedState,o!==null&&(i=o.dehydrated,i!==null))return U0(e,n,s,r,i,o,a);if(l){l=r.fallback,s=n.mode,o=e.child,i=o.sibling;var d={mode:"hidden",children:r.children};return!(s&1)&&n.child!==o?(r=n.child,r.childLanes=0,r.pendingProps=d,n.deletions=null):(r=Fn(o,d),r.subtreeFlags=o.subtreeFlags&14680064),i!==null?l=Fn(i,l):(l=Kn(l,s,a,null),l.flags|=2),l.return=n,r.return=n,r.sibling=l,n.child=r,r=l,l=n.child,s=e.child.memoizedState,s=s===null?Wl(a):{baseLanes:s.baseLanes|a,cachePool:null,transitions:s.transitions},l.memoizedState=s,l.childLanes=e.childLanes&~a,n.memoizedState=Ll,r}return l=e.child,e=l.sibling,r=Fn(l,{mode:"visible",children:r.children}),!(n.mode&1)&&(r.lanes=a),r.return=n,r.sibling=null,e!==null&&(a=n.deletions,a===null?(n.deletions=[e],n.flags|=16):a.push(e)),n.child=r,n.memoizedState=null,r}function Ks(e,n){return n=tt({mode:"visible",children:n},e.mode,0,null),n.return=e,e.child=n}function Zr(e,n,a,r){return r!==null&&js(r),Fa(n,e.child,null,a),e=Ks(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function U0(e,n,a,r,o,l,s){if(a)return n.flags&256?(n.flags&=-257,r=$t(Error(E(422))),Zr(e,n,s,r)):n.memoizedState!==null?(n.child=e.child,n.flags|=128,null):(l=r.fallback,o=n.mode,r=tt({mode:"visible",children:r.children},o,0,null),l=Kn(l,o,s,null),l.flags|=2,r.return=n,l.return=n,r.sibling=l,n.child=r,n.mode&1&&Fa(n,e.child,null,s),n.child.memoizedState=Wl(s),n.memoizedState=Ll,l);if(!(n.mode&1))return Zr(e,n,s,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var i=r.dgst;return r=i,l=Error(E(419)),r=$t(l,r,void 0),Zr(e,n,s,r)}if(i=(s&e.childLanes)!==0,Se||i){if(r=ie,r!==null){switch(s&-s){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(r.suspendedLanes|s)?0:o,o!==0&&o!==l.retryLane&&(l.retryLane=o,un(e,o),He(r,e,o,-1))}return ei(),r=$t(Error(E(421))),Zr(e,n,s,r)}return o.data==="$?"?(n.flags|=128,n.child=e.child,n=Z0.bind(null,e),o._reactRetry=n,null):(e=l.treeContext,Be=bn(o.nextSibling),ke=n,J=!0,$e=null,e!==null&&(Ne[je++]=on,Ne[je++]=tn,Ne[je++]=qn,on=e.id,tn=e.overflow,qn=n),n=Ks(n,r.children),n.flags|=4096,n)}function Id(e,n,a){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n),_l(e.return,n,a)}function Xt(e,n,a,r,o){var l=e.memoizedState;l===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:a,tailMode:o}:(l.isBackwards=n,l.rendering=null,l.renderingStartTime=0,l.last=r,l.tail=a,l.tailMode=o)}function Yu(e,n,a){var r=n.pendingProps,o=r.revealOrder,l=r.tail;if(fe(e,n,r.children,a),r=Q.current,r&2)r=r&1|2,n.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Id(e,a,n);else if(e.tag===19)Id(e,a,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(H(Q,r),!(n.mode&1))n.memoizedState=null;else switch(o){case"forwards":for(a=n.child,o=null;a!==null;)e=a.alternate,e!==null&&Vo(e)===null&&(o=a),a=a.sibling;a=o,a===null?(o=n.child,n.child=null):(o=a.sibling,a.sibling=null),Xt(n,!1,o,a,l);break;case"backwards":for(a=null,o=n.child,n.child=null;o!==null;){if(e=o.alternate,e!==null&&Vo(e)===null){n.child=o;break}e=o.sibling,o.sibling=a,a=o,o=e}Xt(n,!0,a,null,l);break;case"together":Xt(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function po(e,n){!(n.mode&1)&&e!==null&&(e.alternate=null,n.alternate=null,n.flags|=2)}function Pn(e,n,a){if(e!==null&&(n.dependencies=e.dependencies),ea|=n.lanes,!(a&n.childLanes))return null;if(e!==null&&n.child!==e.child)throw Error(E(153));if(n.child!==null){for(e=n.child,a=Fn(e,e.pendingProps),n.child=a,a.return=n;e.sibling!==null;)e=e.sibling,a=a.sibling=Fn(e,e.pendingProps),a.return=n;a.sibling=null}return n.child}function G0(e,n,a){switch(n.tag){case 3:Hu(n),ka();break;case 5:yu(n);break;case 1:Me(n.type)&&No(n);break;case 4:Us(n,n.stateNode.containerInfo);break;case 10:var r=n.type._context,o=n.memoizedProps.value;H(_o,r._currentValue),r._currentValue=o;break;case 13:if(r=n.memoizedState,r!==null)return r.dehydrated!==null?(H(Q,Q.current&1),n.flags|=128,null):a&n.child.childLanes?Ku(e,n,a):(H(Q,Q.current&1),e=Pn(e,n,a),e!==null?e.sibling:null);H(Q,Q.current&1);break;case 19:if(r=(a&n.childLanes)!==0,e.flags&128){if(r)return Yu(e,n,a);n.flags|=128}if(o=n.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),H(Q,Q.current),r)break;return null;case 22:case 23:return n.lanes=0,$u(e,n,a)}return Pn(e,n,a)}var Ju,zl,Qu,qu;Ju=function(e,n){for(var a=n.child;a!==null;){if(a.tag===5||a.tag===6)e.appendChild(a.stateNode);else if(a.tag!==4&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===n)break;for(;a.sibling===null;){if(a.return===null||a.return===n)return;a=a.return}a.sibling.return=a.return,a=a.sibling}};zl=function(){};Qu=function(e,n,a,r){var o=e.memoizedProps;if(o!==r){e=n.stateNode,Wn(Ze.current);var l=null;switch(a){case"input":o=Pl(e,o),r=Pl(e,r),l=[];break;case"select":o=Z({},o,{value:void 0}),r=Z({},r,{value:void 0}),l=[];break;case"textarea":o=pl(e,o),r=pl(e,r),l=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Eo)}fl(a,r);var s;a=null;for(m in o)if(!r.hasOwnProperty(m)&&o.hasOwnProperty(m)&&o[m]!=null)if(m==="style"){var i=o[m];for(s in i)i.hasOwnProperty(s)&&(a||(a={}),a[s]="")}else m!=="dangerouslySetInnerHTML"&&m!=="children"&&m!=="suppressContentEditableWarning"&&m!=="suppressHydrationWarning"&&m!=="autoFocus"&&(cr.hasOwnProperty(m)?l||(l=[]):(l=l||[]).push(m,null));for(m in r){var d=r[m];if(i=o!=null?o[m]:void 0,r.hasOwnProperty(m)&&d!==i&&(d!=null||i!=null))if(m==="style")if(i){for(s in i)!i.hasOwnProperty(s)||d&&d.hasOwnProperty(s)||(a||(a={}),a[s]="");for(s in d)d.hasOwnProperty(s)&&i[s]!==d[s]&&(a||(a={}),a[s]=d[s])}else a||(l||(l=[]),l.push(m,a)),a=d;else m==="dangerouslySetInnerHTML"?(d=d?d.__html:void 0,i=i?i.__html:void 0,d!=null&&i!==d&&(l=l||[]).push(m,d)):m==="children"?typeof d!="string"&&typeof d!="number"||(l=l||[]).push(m,""+d):m!=="suppressContentEditableWarning"&&m!=="suppressHydrationWarning"&&(cr.hasOwnProperty(m)?(d!=null&&m==="onScroll"&&K("scroll",e),l||i===d||(l=[])):(l=l||[]).push(m,d))}a&&(l=l||[]).push("style",a);var m=l;(n.updateQueue=m)&&(n.flags|=4)}};qu=function(e,n,a,r){a!==r&&(n.flags|=4)};function Xa(e,n){if(!J)switch(e.tailMode){case"hidden":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var r=null;a!==null;)a.alternate!==null&&(r=a),a=a.sibling;r===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function xe(e){var n=e.alternate!==null&&e.alternate.child===e.child,a=0,r=0;if(n)for(var o=e.child;o!==null;)a|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)a|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=a,n}function L0(e,n,a){var r=n.pendingProps;switch(Ns(n),n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return xe(n),null;case 1:return Me(n.type)&&To(),xe(n),null;case 3:return r=n.stateNode,Ea(),Y(ve),Y(Ie),Ls(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Qr(n)?n.flags|=4:e===null||e.memoizedState.isDehydrated&&!(n.flags&256)||(n.flags|=1024,$e!==null&&(ql($e),$e=null))),zl(e,n),xe(n),null;case 5:Gs(n);var o=Wn(Dr.current);if(a=n.type,e!==null&&n.stateNode!=null)Qu(e,n,a,r,o),e.ref!==n.ref&&(n.flags|=512,n.flags|=2097152);else{if(!r){if(n.stateNode===null)throw Error(E(166));return xe(n),null}if(e=Wn(Ze.current),Qr(n)){r=n.stateNode,a=n.type;var l=n.memoizedProps;switch(r[Qe]=n,r[vr]=l,e=(n.mode&1)!==0,a){case"dialog":K("cancel",r),K("close",r);break;case"iframe":case"object":case"embed":K("load",r);break;case"video":case"audio":for(o=0;o<er.length;o++)K(er[o],r);break;case"source":K("error",r);break;case"img":case"image":case"link":K("error",r),K("load",r);break;case"details":K("toggle",r);break;case"input":Di(r,l),K("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!l.multiple},K("invalid",r);break;case"textarea":wi(r,l),K("invalid",r)}fl(a,l),o=null;for(var s in l)if(l.hasOwnProperty(s)){var i=l[s];s==="children"?typeof i=="string"?r.textContent!==i&&(l.suppressHydrationWarning!==!0&&Jr(r.textContent,i,e),o=["children",i]):typeof i=="number"&&r.textContent!==""+i&&(l.suppressHydrationWarning!==!0&&Jr(r.textContent,i,e),o=["children",""+i]):cr.hasOwnProperty(s)&&i!=null&&s==="onScroll"&&K("scroll",r)}switch(a){case"input":Lr(r),bi(r,l,!0);break;case"textarea":Lr(r),Bi(r);break;case"select":case"option":break;default:typeof l.onClick=="function"&&(r.onclick=Eo)}r=o,n.updateQueue=r,r!==null&&(n.flags|=4)}else{s=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=bm(a)),e==="http://www.w3.org/1999/xhtml"?a==="script"?(e=s.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=s.createElement(a,{is:r.is}):(e=s.createElement(a),a==="select"&&(s=e,r.multiple?s.multiple=!0:r.size&&(s.size=r.size))):e=s.createElementNS(e,a),e[Qe]=n,e[vr]=r,Ju(e,n,!1,!1),n.stateNode=e;e:{switch(s=hl(a,r),a){case"dialog":K("cancel",e),K("close",e),o=r;break;case"iframe":case"object":case"embed":K("load",e),o=r;break;case"video":case"audio":for(o=0;o<er.length;o++)K(er[o],e);o=r;break;case"source":K("error",e),o=r;break;case"img":case"image":case"link":K("error",e),K("load",e),o=r;break;case"details":K("toggle",e),o=r;break;case"input":Di(e,r),o=Pl(e,r),K("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=Z({},r,{value:void 0}),K("invalid",e);break;case"textarea":wi(e,r),o=pl(e,r),K("invalid",e);break;default:o=r}fl(a,o),i=o;for(l in i)if(i.hasOwnProperty(l)){var d=i[l];l==="style"?km(e,d):l==="dangerouslySetInnerHTML"?(d=d?d.__html:void 0,d!=null&&wm(e,d)):l==="children"?typeof d=="string"?(a!=="textarea"||d!=="")&&xr(e,d):typeof d=="number"&&xr(e,""+d):l!=="suppressContentEditableWarning"&&l!=="suppressHydrationWarning"&&l!=="autoFocus"&&(cr.hasOwnProperty(l)?d!=null&&l==="onScroll"&&K("scroll",e):d!=null&&hs(e,l,d,s))}switch(a){case"input":Lr(e),bi(e,r,!1);break;case"textarea":Lr(e),Bi(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Tn(r.value));break;case"select":e.multiple=!!r.multiple,l=r.value,l!=null?ya(e,!!r.multiple,l,!1):r.defaultValue!=null&&ya(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=Eo)}switch(a){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(n.flags|=4)}n.ref!==null&&(n.flags|=512,n.flags|=2097152)}return xe(n),null;case 6:if(e&&n.stateNode!=null)qu(e,n,e.memoizedProps,r);else{if(typeof r!="string"&&n.stateNode===null)throw Error(E(166));if(a=Wn(Dr.current),Wn(Ze.current),Qr(n)){if(r=n.stateNode,a=n.memoizedProps,r[Qe]=n,(l=r.nodeValue!==a)&&(e=ke,e!==null))switch(e.tag){case 3:Jr(r.nodeValue,a,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Jr(r.nodeValue,a,(e.mode&1)!==0)}l&&(n.flags|=4)}else r=(a.nodeType===9?a:a.ownerDocument).createTextNode(r),r[Qe]=n,n.stateNode=r}return xe(n),null;case 13:if(Y(Q),r=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(J&&Be!==null&&n.mode&1&&!(n.flags&128))Iu(),ka(),n.flags|=98560,l=!1;else if(l=Qr(n),r!==null&&r.dehydrated!==null){if(e===null){if(!l)throw Error(E(318));if(l=n.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(E(317));l[Qe]=n}else ka(),!(n.flags&128)&&(n.memoizedState=null),n.flags|=4;xe(n),l=!1}else $e!==null&&(ql($e),$e=null),l=!0;if(!l)return n.flags&65536?n:null}return n.flags&128?(n.lanes=a,n):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(n.child.flags|=8192,n.mode&1&&(e===null||Q.current&1?te===0&&(te=3):ei())),n.updateQueue!==null&&(n.flags|=4),xe(n),null);case 4:return Ea(),zl(e,n),e===null&&yr(n.stateNode.containerInfo),xe(n),null;case 10:return As(n.type._context),xe(n),null;case 17:return Me(n.type)&&To(),xe(n),null;case 19:if(Y(Q),l=n.memoizedState,l===null)return xe(n),null;if(r=(n.flags&128)!==0,s=l.rendering,s===null)if(r)Xa(l,!1);else{if(te!==0||e!==null&&e.flags&128)for(e=n.child;e!==null;){if(s=Vo(e),s!==null){for(n.flags|=128,Xa(l,!1),r=s.updateQueue,r!==null&&(n.updateQueue=r,n.flags|=4),n.subtreeFlags=0,r=a,a=n.child;a!==null;)l=a,e=r,l.flags&=14680066,s=l.alternate,s===null?(l.childLanes=0,l.lanes=e,l.child=null,l.subtreeFlags=0,l.memoizedProps=null,l.memoizedState=null,l.updateQueue=null,l.dependencies=null,l.stateNode=null):(l.childLanes=s.childLanes,l.lanes=s.lanes,l.child=s.child,l.subtreeFlags=0,l.deletions=null,l.memoizedProps=s.memoizedProps,l.memoizedState=s.memoizedState,l.updateQueue=s.updateQueue,l.type=s.type,e=s.dependencies,l.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),a=a.sibling;return H(Q,Q.current&1|2),n.child}e=e.sibling}l.tail!==null&&ae()>Na&&(n.flags|=128,r=!0,Xa(l,!1),n.lanes=4194304)}else{if(!r)if(e=Vo(s),e!==null){if(n.flags|=128,r=!0,a=e.updateQueue,a!==null&&(n.updateQueue=a,n.flags|=4),Xa(l,!0),l.tail===null&&l.tailMode==="hidden"&&!s.alternate&&!J)return xe(n),null}else 2*ae()-l.renderingStartTime>Na&&a!==1073741824&&(n.flags|=128,r=!0,Xa(l,!1),n.lanes=4194304);l.isBackwards?(s.sibling=n.child,n.child=s):(a=l.last,a!==null?a.sibling=s:n.child=s,l.last=s)}return l.tail!==null?(n=l.tail,l.rendering=n,l.tail=n.sibling,l.renderingStartTime=ae(),n.sibling=null,a=Q.current,H(Q,r?a&1|2:a&1),n):(xe(n),null);case 22:case 23:return Zs(),r=n.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(n.flags|=8192),r&&n.mode&1?we&1073741824&&(xe(n),n.subtreeFlags&6&&(n.flags|=8192)):xe(n),null;case 24:return null;case 25:return null}throw Error(E(156,n.tag))}function W0(e,n){switch(Ns(n),n.tag){case 1:return Me(n.type)&&To(),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return Ea(),Y(ve),Y(Ie),Ls(),e=n.flags,e&65536&&!(e&128)?(n.flags=e&-65537|128,n):null;case 5:return Gs(n),null;case 13:if(Y(Q),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(E(340));ka()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return Y(Q),null;case 4:return Ea(),null;case 10:return As(n.type._context),null;case 22:case 23:return Zs(),null;case 24:return null;default:return null}}var eo=!1,pe=!1,z0=typeof WeakSet=="function"?WeakSet:Set,O=null;function ha(e,n){var a=e.ref;if(a!==null)if(typeof a=="function")try{a(null)}catch(r){ee(e,n,r)}else a.current=null}function $l(e,n,a){try{a()}catch(r){ee(e,n,r)}}var fd=!1;function $0(e,n){if(Bl=Bo,e=ru(),Es(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else e:{a=(a=e.ownerDocument)&&a.defaultView||window;var r=a.getSelection&&a.getSelection();if(r&&r.rangeCount!==0){a=r.anchorNode;var o=r.anchorOffset,l=r.focusNode;r=r.focusOffset;try{a.nodeType,l.nodeType}catch{a=null;break e}var s=0,i=-1,d=-1,m=0,x=0,p=e,c=null;n:for(;;){for(var h;p!==a||o!==0&&p.nodeType!==3||(i=s+o),p!==l||r!==0&&p.nodeType!==3||(d=s+r),p.nodeType===3&&(s+=p.nodeValue.length),(h=p.firstChild)!==null;)c=p,p=h;for(;;){if(p===e)break n;if(c===a&&++m===o&&(i=s),c===l&&++x===r&&(d=s),(h=p.nextSibling)!==null)break;p=c,c=p.parentNode}p=h}a=i===-1||d===-1?null:{start:i,end:d}}else a=null}a=a||{start:0,end:0}}else a=null;for(kl={focusedElem:e,selectionRange:a},Bo=!1,O=n;O!==null;)if(n=O,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,O=e;else for(;O!==null;){n=O;try{var g=n.alternate;if(n.flags&1024)switch(n.tag){case 0:case 11:case 15:break;case 1:if(g!==null){var C=g.memoizedProps,v=g.memoizedState,u=n.stateNode,P=u.getSnapshotBeforeUpdate(n.elementType===n.type?C:We(n.type,C),v);u.__reactInternalSnapshotBeforeUpdate=P}break;case 3:var I=n.stateNode.containerInfo;I.nodeType===1?I.textContent="":I.nodeType===9&&I.documentElement&&I.removeChild(I.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(E(163))}}catch(D){ee(n,n.return,D)}if(e=n.sibling,e!==null){e.return=n.return,O=e;break}O=n.return}return g=fd,fd=!1,g}function dr(e,n,a){var r=n.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var l=o.destroy;o.destroy=void 0,l!==void 0&&$l(n,a,l)}o=o.next}while(o!==r)}}function rt(e,n){if(n=n.updateQueue,n=n!==null?n.lastEffect:null,n!==null){var a=n=n.next;do{if((a.tag&e)===e){var r=a.create;a.destroy=r()}a=a.next}while(a!==n)}}function Xl(e){var n=e.ref;if(n!==null){var a=e.stateNode;switch(e.tag){case 5:e=a;break;default:e=a}typeof n=="function"?n(e):n.current=e}}function Zu(e){var n=e.alternate;n!==null&&(e.alternate=null,Zu(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&(delete n[Qe],delete n[vr],delete n[Tl],delete n[w0],delete n[B0])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function eP(e){return e.tag===5||e.tag===3||e.tag===4}function hd(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||eP(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Hl(e,n,a){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?a.nodeType===8?a.parentNode.insertBefore(e,n):a.insertBefore(e,n):(a.nodeType===8?(n=a.parentNode,n.insertBefore(e,a)):(n=a,n.appendChild(e)),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=Eo));else if(r!==4&&(e=e.child,e!==null))for(Hl(e,n,a),e=e.sibling;e!==null;)Hl(e,n,a),e=e.sibling}function Kl(e,n,a){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?a.insertBefore(e,n):a.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Kl(e,n,a),e=e.sibling;e!==null;)Kl(e,n,a),e=e.sibling}var me=null,ze=!1;function In(e,n,a){for(a=a.child;a!==null;)nP(e,n,a),a=a.sibling}function nP(e,n,a){if(qe&&typeof qe.onCommitFiberUnmount=="function")try{qe.onCommitFiberUnmount(Yo,a)}catch{}switch(a.tag){case 5:pe||ha(a,n);case 6:var r=me,o=ze;me=null,In(e,n,a),me=r,ze=o,me!==null&&(ze?(e=me,a=a.stateNode,e.nodeType===8?e.parentNode.removeChild(a):e.removeChild(a)):me.removeChild(a.stateNode));break;case 18:me!==null&&(ze?(e=me,a=a.stateNode,e.nodeType===8?Vt(e.parentNode,a):e.nodeType===1&&Vt(e,a),hr(e)):Vt(me,a.stateNode));break;case 4:r=me,o=ze,me=a.stateNode.containerInfo,ze=!0,In(e,n,a),me=r,ze=o;break;case 0:case 11:case 14:case 15:if(!pe&&(r=a.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var l=o,s=l.destroy;l=l.tag,s!==void 0&&(l&2||l&4)&&$l(a,n,s),o=o.next}while(o!==r)}In(e,n,a);break;case 1:if(!pe&&(ha(a,n),r=a.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=a.memoizedProps,r.state=a.memoizedState,r.componentWillUnmount()}catch(i){ee(a,n,i)}In(e,n,a);break;case 21:In(e,n,a);break;case 22:a.mode&1?(pe=(r=pe)||a.memoizedState!==null,In(e,n,a),pe=r):In(e,n,a);break;default:In(e,n,a)}}function Cd(e){var n=e.updateQueue;if(n!==null){e.updateQueue=null;var a=e.stateNode;a===null&&(a=e.stateNode=new z0),n.forEach(function(r){var o=ex.bind(null,e,r);a.has(r)||(a.add(r),r.then(o,o))})}}function Le(e,n){var a=n.deletions;if(a!==null)for(var r=0;r<a.length;r++){var o=a[r];try{var l=e,s=n,i=s;e:for(;i!==null;){switch(i.tag){case 5:me=i.stateNode,ze=!1;break e;case 3:me=i.stateNode.containerInfo,ze=!0;break e;case 4:me=i.stateNode.containerInfo,ze=!0;break e}i=i.return}if(me===null)throw Error(E(160));nP(l,s,o),me=null,ze=!1;var d=o.alternate;d!==null&&(d.return=null),o.return=null}catch(m){ee(o,n,m)}}if(n.subtreeFlags&12854)for(n=n.child;n!==null;)aP(n,e),n=n.sibling}function aP(e,n){var a=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Le(n,e),Ye(e),r&4){try{dr(3,e,e.return),rt(3,e)}catch(C){ee(e,e.return,C)}try{dr(5,e,e.return)}catch(C){ee(e,e.return,C)}}break;case 1:Le(n,e),Ye(e),r&512&&a!==null&&ha(a,a.return);break;case 5:if(Le(n,e),Ye(e),r&512&&a!==null&&ha(a,a.return),e.flags&32){var o=e.stateNode;try{xr(o,"")}catch(C){ee(e,e.return,C)}}if(r&4&&(o=e.stateNode,o!=null)){var l=e.memoizedProps,s=a!==null?a.memoizedProps:l,i=e.type,d=e.updateQueue;if(e.updateQueue=null,d!==null)try{i==="input"&&l.type==="radio"&&l.name!=null&&Mm(o,l),hl(i,s);var m=hl(i,l);for(s=0;s<d.length;s+=2){var x=d[s],p=d[s+1];x==="style"?km(o,p):x==="dangerouslySetInnerHTML"?wm(o,p):x==="children"?xr(o,p):hs(o,x,p,m)}switch(i){case"input":cl(o,l);break;case"textarea":Dm(o,l);break;case"select":var c=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!l.multiple;var h=l.value;h!=null?ya(o,!!l.multiple,h,!1):c!==!!l.multiple&&(l.defaultValue!=null?ya(o,!!l.multiple,l.defaultValue,!0):ya(o,!!l.multiple,l.multiple?[]:"",!1))}o[vr]=l}catch(C){ee(e,e.return,C)}}break;case 6:if(Le(n,e),Ye(e),r&4){if(e.stateNode===null)throw Error(E(162));o=e.stateNode,l=e.memoizedProps;try{o.nodeValue=l}catch(C){ee(e,e.return,C)}}break;case 3:if(Le(n,e),Ye(e),r&4&&a!==null&&a.memoizedState.isDehydrated)try{hr(n.containerInfo)}catch(C){ee(e,e.return,C)}break;case 4:Le(n,e),Ye(e);break;case 13:Le(n,e),Ye(e),o=e.child,o.flags&8192&&(l=o.memoizedState!==null,o.stateNode.isHidden=l,!l||o.alternate!==null&&o.alternate.memoizedState!==null||(Qs=ae())),r&4&&Cd(e);break;case 22:if(x=a!==null&&a.memoizedState!==null,e.mode&1?(pe=(m=pe)||x,Le(n,e),pe=m):Le(n,e),Ye(e),r&8192){if(m=e.memoizedState!==null,(e.stateNode.isHidden=m)&&!x&&e.mode&1)for(O=e,x=e.child;x!==null;){for(p=O=x;O!==null;){switch(c=O,h=c.child,c.tag){case 0:case 11:case 14:case 15:dr(4,c,c.return);break;case 1:ha(c,c.return);var g=c.stateNode;if(typeof g.componentWillUnmount=="function"){r=c,a=c.return;try{n=r,g.props=n.memoizedProps,g.state=n.memoizedState,g.componentWillUnmount()}catch(C){ee(r,a,C)}}break;case 5:ha(c,c.return);break;case 22:if(c.memoizedState!==null){yd(p);continue}}h!==null?(h.return=c,O=h):yd(p)}x=x.sibling}e:for(x=null,p=e;;){if(p.tag===5){if(x===null){x=p;try{o=p.stateNode,m?(l=o.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none"):(i=p.stateNode,d=p.memoizedProps.style,s=d!=null&&d.hasOwnProperty("display")?d.display:null,i.style.display=Bm("display",s))}catch(C){ee(e,e.return,C)}}}else if(p.tag===6){if(x===null)try{p.stateNode.nodeValue=m?"":p.memoizedProps}catch(C){ee(e,e.return,C)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===e)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===e)break e;for(;p.sibling===null;){if(p.return===null||p.return===e)break e;x===p&&(x=null),p=p.return}x===p&&(x=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:Le(n,e),Ye(e),r&4&&Cd(e);break;case 21:break;default:Le(n,e),Ye(e)}}function Ye(e){var n=e.flags;if(n&2){try{e:{for(var a=e.return;a!==null;){if(eP(a)){var r=a;break e}a=a.return}throw Error(E(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&(xr(o,""),r.flags&=-33);var l=hd(e);Kl(e,l,o);break;case 3:case 4:var s=r.stateNode.containerInfo,i=hd(e);Hl(e,i,s);break;default:throw Error(E(161))}}catch(d){ee(e,e.return,d)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function X0(e,n,a){O=e,rP(e)}function rP(e,n,a){for(var r=(e.mode&1)!==0;O!==null;){var o=O,l=o.child;if(o.tag===22&&r){var s=o.memoizedState!==null||eo;if(!s){var i=o.alternate,d=i!==null&&i.memoizedState!==null||pe;i=eo;var m=pe;if(eo=s,(pe=d)&&!m)for(O=o;O!==null;)s=O,d=s.child,s.tag===22&&s.memoizedState!==null?Sd(o):d!==null?(d.return=s,O=d):Sd(o);for(;l!==null;)O=l,rP(l),l=l.sibling;O=o,eo=i,pe=m}gd(e)}else o.subtreeFlags&8772&&l!==null?(l.return=o,O=l):gd(e)}}function gd(e){for(;O!==null;){var n=O;if(n.flags&8772){var a=n.alternate;try{if(n.flags&8772)switch(n.tag){case 0:case 11:case 15:pe||rt(5,n);break;case 1:var r=n.stateNode;if(n.flags&4&&!pe)if(a===null)r.componentDidMount();else{var o=n.elementType===n.type?a.memoizedProps:We(n.type,a.memoizedProps);r.componentDidUpdate(o,a.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var l=n.updateQueue;l!==null&&od(n,l,r);break;case 3:var s=n.updateQueue;if(s!==null){if(a=null,n.child!==null)switch(n.child.tag){case 5:a=n.child.stateNode;break;case 1:a=n.child.stateNode}od(n,s,a)}break;case 5:var i=n.stateNode;if(a===null&&n.flags&4){a=i;var d=n.memoizedProps;switch(n.type){case"button":case"input":case"select":case"textarea":d.autoFocus&&a.focus();break;case"img":d.src&&(a.src=d.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(n.memoizedState===null){var m=n.alternate;if(m!==null){var x=m.memoizedState;if(x!==null){var p=x.dehydrated;p!==null&&hr(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(E(163))}pe||n.flags&512&&Xl(n)}catch(c){ee(n,n.return,c)}}if(n===e){O=null;break}if(a=n.sibling,a!==null){a.return=n.return,O=a;break}O=n.return}}function yd(e){for(;O!==null;){var n=O;if(n===e){O=null;break}var a=n.sibling;if(a!==null){a.return=n.return,O=a;break}O=n.return}}function Sd(e){for(;O!==null;){var n=O;try{switch(n.tag){case 0:case 11:case 15:var a=n.return;try{rt(4,n)}catch(d){ee(n,a,d)}break;case 1:var r=n.stateNode;if(typeof r.componentDidMount=="function"){var o=n.return;try{r.componentDidMount()}catch(d){ee(n,o,d)}}var l=n.return;try{Xl(n)}catch(d){ee(n,l,d)}break;case 5:var s=n.return;try{Xl(n)}catch(d){ee(n,s,d)}}}catch(d){ee(n,n.return,d)}if(n===e){O=null;break}var i=n.sibling;if(i!==null){i.return=n.return,O=i;break}O=n.return}}var H0=Math.ceil,Lo=pn.ReactCurrentDispatcher,Ys=pn.ReactCurrentOwner,_e=pn.ReactCurrentBatchConfig,$=0,ie=null,re=null,ue=0,we=0,Ca=On(0),te=0,kr=null,ea=0,ot=0,Js=0,mr=null,ye=null,Qs=0,Na=1/0,an=null,Wo=!1,Yl=null,Bn=null,no=!1,Sn=null,zo=0,ur=0,Jl=null,Io=-1,fo=0;function he(){return $&6?ae():Io!==-1?Io:Io=ae()}function kn(e){return e.mode&1?$&2&&ue!==0?ue&-ue:F0.transition!==null?(fo===0&&(fo=Gm()),fo):(e=X,e!==0||(e=window.event,e=e===void 0?16:Km(e.type)),e):1}function He(e,n,a,r){if(50<ur)throw ur=0,Jl=null,Error(E(185));jr(e,a,r),(!($&2)||e!==ie)&&(e===ie&&(!($&2)&&(ot|=a),te===4&&gn(e,ue)),De(e,r),a===1&&$===0&&!(n.mode&1)&&(Na=ae()+500,et&&_n()))}function De(e,n){var a=e.callbackNode;Fc(e,n);var r=wo(e,e===ie?ue:0);if(r===0)a!==null&&Ei(a),e.callbackNode=null,e.callbackPriority=0;else if(n=r&-r,e.callbackPriority!==n){if(a!=null&&Ei(a),n===1)e.tag===0?k0(vd.bind(null,e)):cu(vd.bind(null,e)),D0(function(){!($&6)&&_n()}),a=null;else{switch(Lm(r)){case 1:a=vs;break;case 4:a=Vm;break;case 16:a=bo;break;case 536870912:a=Um;break;default:a=bo}a=uP(a,oP.bind(null,e))}e.callbackPriority=n,e.callbackNode=a}}function oP(e,n){if(Io=-1,fo=0,$&6)throw Error(E(327));var a=e.callbackNode;if(ba()&&e.callbackNode!==a)return null;var r=wo(e,e===ie?ue:0);if(r===0)return null;if(r&30||r&e.expiredLanes||n)n=$o(e,r);else{n=r;var o=$;$|=2;var l=lP();(ie!==e||ue!==n)&&(an=null,Na=ae()+500,Hn(e,n));do try{J0();break}catch(i){tP(e,i)}while(!0);_s(),Lo.current=l,$=o,re!==null?n=0:(ie=null,ue=0,n=te)}if(n!==0){if(n===2&&(o=vl(e),o!==0&&(r=o,n=Ql(e,o))),n===1)throw a=kr,Hn(e,0),gn(e,r),De(e,ae()),a;if(n===6)gn(e,r);else{if(o=e.current.alternate,!(r&30)&&!K0(o)&&(n=$o(e,r),n===2&&(l=vl(e),l!==0&&(r=l,n=Ql(e,l))),n===1))throw a=kr,Hn(e,0),gn(e,r),De(e,ae()),a;switch(e.finishedWork=o,e.finishedLanes=r,n){case 0:case 1:throw Error(E(345));case 2:Rn(e,ye,an);break;case 3:if(gn(e,r),(r&130023424)===r&&(n=Qs+500-ae(),10<n)){if(wo(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){he(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=El(Rn.bind(null,e,ye,an),n);break}Rn(e,ye,an);break;case 4:if(gn(e,r),(r&4194240)===r)break;for(n=e.eventTimes,o=-1;0<r;){var s=31-Xe(r);l=1<<s,s=n[s],s>o&&(o=s),r&=~l}if(r=o,r=ae()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*H0(r/1960))-r,10<r){e.timeoutHandle=El(Rn.bind(null,e,ye,an),r);break}Rn(e,ye,an);break;case 5:Rn(e,ye,an);break;default:throw Error(E(329))}}}return De(e,ae()),e.callbackNode===a?oP.bind(null,e):null}function Ql(e,n){var a=mr;return e.current.memoizedState.isDehydrated&&(Hn(e,n).flags|=256),e=$o(e,n),e!==2&&(n=ye,ye=a,n!==null&&ql(n)),e}function ql(e){ye===null?ye=e:ye.push.apply(ye,e)}function K0(e){for(var n=e;;){if(n.flags&16384){var a=n.updateQueue;if(a!==null&&(a=a.stores,a!==null))for(var r=0;r<a.length;r++){var o=a[r],l=o.getSnapshot;o=o.value;try{if(!Ke(l(),o))return!1}catch{return!1}}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function gn(e,n){for(n&=~Js,n&=~ot,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var a=31-Xe(n),r=1<<a;e[a]=-1,n&=~r}}function vd(e){if($&6)throw Error(E(327));ba();var n=wo(e,0);if(!(n&1))return De(e,ae()),null;var a=$o(e,n);if(e.tag!==0&&a===2){var r=vl(e);r!==0&&(n=r,a=Ql(e,r))}if(a===1)throw a=kr,Hn(e,0),gn(e,n),De(e,ae()),a;if(a===6)throw Error(E(345));return e.finishedWork=e.current.alternate,e.finishedLanes=n,Rn(e,ye,an),De(e,ae()),null}function qs(e,n){var a=$;$|=1;try{return e(n)}finally{$=a,$===0&&(Na=ae()+500,et&&_n())}}function na(e){Sn!==null&&Sn.tag===0&&!($&6)&&ba();var n=$;$|=1;var a=_e.transition,r=X;try{if(_e.transition=null,X=1,e)return e()}finally{X=r,_e.transition=a,$=n,!($&6)&&_n()}}function Zs(){we=Ca.current,Y(Ca)}function Hn(e,n){e.finishedWork=null,e.finishedLanes=0;var a=e.timeoutHandle;if(a!==-1&&(e.timeoutHandle=-1,M0(a)),re!==null)for(a=re.return;a!==null;){var r=a;switch(Ns(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&To();break;case 3:Ea(),Y(ve),Y(Ie),Ls();break;case 5:Gs(r);break;case 4:Ea();break;case 13:Y(Q);break;case 19:Y(Q);break;case 10:As(r.type._context);break;case 22:case 23:Zs()}a=a.return}if(ie=e,re=e=Fn(e.current,null),ue=we=n,te=0,kr=null,Js=ot=ea=0,ye=mr=null,Ln!==null){for(n=0;n<Ln.length;n++)if(a=Ln[n],r=a.interleaved,r!==null){a.interleaved=null;var o=r.next,l=a.pending;if(l!==null){var s=l.next;l.next=o,r.next=s}a.pending=r}Ln=null}return e}function tP(e,n){do{var a=re;try{if(_s(),co.current=Go,Uo){for(var r=q.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}Uo=!1}if(Zn=0,se=oe=q=null,ir=!1,br=0,Ys.current=null,a===null||a.return===null){te=1,kr=n,re=null;break}e:{var l=e,s=a.return,i=a,d=n;if(n=ue,i.flags|=32768,d!==null&&typeof d=="object"&&typeof d.then=="function"){var m=d,x=i,p=x.tag;if(!(x.mode&1)&&(p===0||p===11||p===15)){var c=x.alternate;c?(x.updateQueue=c.updateQueue,x.memoizedState=c.memoizedState,x.lanes=c.lanes):(x.updateQueue=null,x.memoizedState=null)}var h=md(s);if(h!==null){h.flags&=-257,ud(h,s,i,l,n),h.mode&1&&dd(l,m,n),n=h,d=m;var g=n.updateQueue;if(g===null){var C=new Set;C.add(d),n.updateQueue=C}else g.add(d);break e}else{if(!(n&1)){dd(l,m,n),ei();break e}d=Error(E(426))}}else if(J&&i.mode&1){var v=md(s);if(v!==null){!(v.flags&65536)&&(v.flags|=256),ud(v,s,i,l,n),js(Ta(d,i));break e}}l=d=Ta(d,i),te!==4&&(te=2),mr===null?mr=[l]:mr.push(l),l=s;do{switch(l.tag){case 3:l.flags|=65536,n&=-n,l.lanes|=n;var u=Lu(l,d,n);rd(l,u);break e;case 1:i=d;var P=l.type,I=l.stateNode;if(!(l.flags&128)&&(typeof P.getDerivedStateFromError=="function"||I!==null&&typeof I.componentDidCatch=="function"&&(Bn===null||!Bn.has(I)))){l.flags|=65536,n&=-n,l.lanes|=n;var D=Wu(l,i,n);rd(l,D);break e}}l=l.return}while(l!==null)}iP(a)}catch(B){n=B,re===a&&a!==null&&(re=a=a.return);continue}break}while(!0)}function lP(){var e=Lo.current;return Lo.current=Go,e===null?Go:e}function ei(){(te===0||te===3||te===2)&&(te=4),ie===null||!(ea&268435455)&&!(ot&268435455)||gn(ie,ue)}function $o(e,n){var a=$;$|=2;var r=lP();(ie!==e||ue!==n)&&(an=null,Hn(e,n));do try{Y0();break}catch(o){tP(e,o)}while(!0);if(_s(),$=a,Lo.current=r,re!==null)throw Error(E(261));return ie=null,ue=0,te}function Y0(){for(;re!==null;)sP(re)}function J0(){for(;re!==null&&!yc();)sP(re)}function sP(e){var n=mP(e.alternate,e,we);e.memoizedProps=e.pendingProps,n===null?iP(e):re=n,Ys.current=null}function iP(e){var n=e;do{var a=n.alternate;if(e=n.return,n.flags&32768){if(a=W0(a,n),a!==null){a.flags&=32767,re=a;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{te=6,re=null;return}}else if(a=L0(a,n,we),a!==null){re=a;return}if(n=n.sibling,n!==null){re=n;return}re=n=e}while(n!==null);te===0&&(te=5)}function Rn(e,n,a){var r=X,o=_e.transition;try{_e.transition=null,X=1,Q0(e,n,a,r)}finally{_e.transition=o,X=r}return null}function Q0(e,n,a,r){do ba();while(Sn!==null);if($&6)throw Error(E(327));a=e.finishedWork;var o=e.finishedLanes;if(a===null)return null;if(e.finishedWork=null,e.finishedLanes=0,a===e.current)throw Error(E(177));e.callbackNode=null,e.callbackPriority=0;var l=a.lanes|a.childLanes;if(Ec(e,l),e===ie&&(re=ie=null,ue=0),!(a.subtreeFlags&2064)&&!(a.flags&2064)||no||(no=!0,uP(bo,function(){return ba(),null})),l=(a.flags&15990)!==0,a.subtreeFlags&15990||l){l=_e.transition,_e.transition=null;var s=X;X=1;var i=$;$|=4,Ys.current=null,$0(e,a),aP(a,e),f0(kl),Bo=!!Bl,kl=Bl=null,e.current=a,X0(a),Sc(),$=i,X=s,_e.transition=l}else e.current=a;if(no&&(no=!1,Sn=e,zo=o),l=e.pendingLanes,l===0&&(Bn=null),Dc(a.stateNode),De(e,ae()),n!==null)for(r=e.onRecoverableError,a=0;a<n.length;a++)o=n[a],r(o.value,{componentStack:o.stack,digest:o.digest});if(Wo)throw Wo=!1,e=Yl,Yl=null,e;return zo&1&&e.tag!==0&&ba(),l=e.pendingLanes,l&1?e===Jl?ur++:(ur=0,Jl=e):ur=0,_n(),null}function ba(){if(Sn!==null){var e=Lm(zo),n=_e.transition,a=X;try{if(_e.transition=null,X=16>e?16:e,Sn===null)var r=!1;else{if(e=Sn,Sn=null,zo=0,$&6)throw Error(E(331));var o=$;for($|=4,O=e.current;O!==null;){var l=O,s=l.child;if(O.flags&16){var i=l.deletions;if(i!==null){for(var d=0;d<i.length;d++){var m=i[d];for(O=m;O!==null;){var x=O;switch(x.tag){case 0:case 11:case 15:dr(8,x,l)}var p=x.child;if(p!==null)p.return=x,O=p;else for(;O!==null;){x=O;var c=x.sibling,h=x.return;if(Zu(x),x===m){O=null;break}if(c!==null){c.return=h,O=c;break}O=h}}}var g=l.alternate;if(g!==null){var C=g.child;if(C!==null){g.child=null;do{var v=C.sibling;C.sibling=null,C=v}while(C!==null)}}O=l}}if(l.subtreeFlags&2064&&s!==null)s.return=l,O=s;else e:for(;O!==null;){if(l=O,l.flags&2048)switch(l.tag){case 0:case 11:case 15:dr(9,l,l.return)}var u=l.sibling;if(u!==null){u.return=l.return,O=u;break e}O=l.return}}var P=e.current;for(O=P;O!==null;){s=O;var I=s.child;if(s.subtreeFlags&2064&&I!==null)I.return=s,O=I;else e:for(s=P;O!==null;){if(i=O,i.flags&2048)try{switch(i.tag){case 0:case 11:case 15:rt(9,i)}}catch(B){ee(i,i.return,B)}if(i===s){O=null;break e}var D=i.sibling;if(D!==null){D.return=i.return,O=D;break e}O=i.return}}if($=o,_n(),qe&&typeof qe.onPostCommitFiberRoot=="function")try{qe.onPostCommitFiberRoot(Yo,e)}catch{}r=!0}return r}finally{X=a,_e.transition=n}}return!1}function Md(e,n,a){n=Ta(a,n),n=Lu(e,n,1),e=wn(e,n,1),n=he(),e!==null&&(jr(e,1,n),De(e,n))}function ee(e,n,a){if(e.tag===3)Md(e,e,a);else for(;n!==null;){if(n.tag===3){Md(n,e,a);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Bn===null||!Bn.has(r))){e=Ta(a,e),e=Wu(n,e,1),n=wn(n,e,1),e=he(),n!==null&&(jr(n,1,e),De(n,e));break}}n=n.return}}function q0(e,n,a){var r=e.pingCache;r!==null&&r.delete(n),n=he(),e.pingedLanes|=e.suspendedLanes&a,ie===e&&(ue&a)===a&&(te===4||te===3&&(ue&130023424)===ue&&500>ae()-Qs?Hn(e,0):Js|=a),De(e,n)}function dP(e,n){n===0&&(e.mode&1?(n=$r,$r<<=1,!($r&130023424)&&($r=4194304)):n=1);var a=he();e=un(e,n),e!==null&&(jr(e,n,a),De(e,a))}function Z0(e){var n=e.memoizedState,a=0;n!==null&&(a=n.retryLane),dP(e,a)}function ex(e,n){var a=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(a=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(E(314))}r!==null&&r.delete(n),dP(e,a)}var mP;mP=function(e,n,a){if(e!==null)if(e.memoizedProps!==n.pendingProps||ve.current)Se=!0;else{if(!(e.lanes&a)&&!(n.flags&128))return Se=!1,G0(e,n,a);Se=!!(e.flags&131072)}else Se=!1,J&&n.flags&1048576&&xu(n,Oo,n.index);switch(n.lanes=0,n.tag){case 2:var r=n.type;po(e,n),e=n.pendingProps;var o=Ba(n,Ie.current);Da(n,a),o=zs(null,n,r,e,o,a);var l=$s();return n.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(n.tag=1,n.memoizedState=null,n.updateQueue=null,Me(r)?(l=!0,No(n)):l=!1,n.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,Vs(n),o.updater=at,n.stateNode=o,o._reactInternals=n,Rl(n,r,e,a),n=Gl(null,n,r,!0,l,a)):(n.tag=0,J&&l&&Ts(n),fe(null,n,o,a),n=n.child),n;case 16:r=n.elementType;e:{switch(po(e,n),e=n.pendingProps,o=r._init,r=o(r._payload),n.type=r,o=n.tag=ax(r),e=We(r,e),o){case 0:n=Ul(null,n,r,e,a);break e;case 1:n=xd(null,n,r,e,a);break e;case 11:n=Pd(null,n,r,e,a);break e;case 14:n=cd(null,n,r,We(r.type,e),a);break e}throw Error(E(306,r,""))}return n;case 0:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:We(r,o),Ul(e,n,r,o,a);case 1:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:We(r,o),xd(e,n,r,o,a);case 3:e:{if(Hu(n),e===null)throw Error(E(387));r=n.pendingProps,l=n.memoizedState,o=l.element,gu(e,n),Ro(n,r,null,a);var s=n.memoizedState;if(r=s.element,l.isDehydrated)if(l={element:r,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},n.updateQueue.baseState=l,n.memoizedState=l,n.flags&256){o=Ta(Error(E(423)),n),n=pd(e,n,r,a,o);break e}else if(r!==o){o=Ta(Error(E(424)),n),n=pd(e,n,r,a,o);break e}else for(Be=bn(n.stateNode.containerInfo.firstChild),ke=n,J=!0,$e=null,a=hu(n,null,r,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(ka(),r===o){n=Pn(e,n,a);break e}fe(e,n,r,a)}n=n.child}return n;case 5:return yu(n),e===null&&Ol(n),r=n.type,o=n.pendingProps,l=e!==null?e.memoizedProps:null,s=o.children,Fl(r,o)?s=null:l!==null&&Fl(r,l)&&(n.flags|=32),Xu(e,n),fe(e,n,s,a),n.child;case 6:return e===null&&Ol(n),null;case 13:return Ku(e,n,a);case 4:return Us(n,n.stateNode.containerInfo),r=n.pendingProps,e===null?n.child=Fa(n,null,r,a):fe(e,n,r,a),n.child;case 11:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:We(r,o),Pd(e,n,r,o,a);case 7:return fe(e,n,n.pendingProps,a),n.child;case 8:return fe(e,n,n.pendingProps.children,a),n.child;case 12:return fe(e,n,n.pendingProps.children,a),n.child;case 10:e:{if(r=n.type._context,o=n.pendingProps,l=n.memoizedProps,s=o.value,H(_o,r._currentValue),r._currentValue=s,l!==null)if(Ke(l.value,s)){if(l.children===o.children&&!ve.current){n=Pn(e,n,a);break e}}else for(l=n.child,l!==null&&(l.return=n);l!==null;){var i=l.dependencies;if(i!==null){s=l.child;for(var d=i.firstContext;d!==null;){if(d.context===r){if(l.tag===1){d=ln(-1,a&-a),d.tag=2;var m=l.updateQueue;if(m!==null){m=m.shared;var x=m.pending;x===null?d.next=d:(d.next=x.next,x.next=d),m.pending=d}}l.lanes|=a,d=l.alternate,d!==null&&(d.lanes|=a),_l(l.return,a,n),i.lanes|=a;break}d=d.next}}else if(l.tag===10)s=l.type===n.type?null:l.child;else if(l.tag===18){if(s=l.return,s===null)throw Error(E(341));s.lanes|=a,i=s.alternate,i!==null&&(i.lanes|=a),_l(s,a,n),s=l.sibling}else s=l.child;if(s!==null)s.return=l;else for(s=l;s!==null;){if(s===n){s=null;break}if(l=s.sibling,l!==null){l.return=s.return,s=l;break}s=s.return}l=s}fe(e,n,o.children,a),n=n.child}return n;case 9:return o=n.type,r=n.pendingProps.children,Da(n,a),o=Ae(o),r=r(o),n.flags|=1,fe(e,n,r,a),n.child;case 14:return r=n.type,o=We(r,n.pendingProps),o=We(r.type,o),cd(e,n,r,o,a);case 15:return zu(e,n,n.type,n.pendingProps,a);case 17:return r=n.type,o=n.pendingProps,o=n.elementType===r?o:We(r,o),po(e,n),n.tag=1,Me(r)?(e=!0,No(n)):e=!1,Da(n,a),Gu(n,r,o),Rl(n,r,o,a),Gl(null,n,r,!0,e,a);case 19:return Yu(e,n,a);case 22:return $u(e,n,a)}throw Error(E(156,n.tag))};function uP(e,n){return Rm(e,n)}function nx(e,n,a,r){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Oe(e,n,a,r){return new nx(e,n,a,r)}function ni(e){return e=e.prototype,!(!e||!e.isReactComponent)}function ax(e){if(typeof e=="function")return ni(e)?1:0;if(e!=null){if(e=e.$$typeof,e===gs)return 11;if(e===ys)return 14}return 2}function Fn(e,n){var a=e.alternate;return a===null?(a=Oe(e.tag,n,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=n,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&14680064,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,n=e.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a}function ho(e,n,a,r,o,l){var s=2;if(r=e,typeof e=="function")ni(e)&&(s=1);else if(typeof e=="string")s=5;else e:switch(e){case da:return Kn(a.children,o,l,n);case Cs:s=8,o|=8;break;case il:return e=Oe(12,a,n,o|2),e.elementType=il,e.lanes=l,e;case dl:return e=Oe(13,a,n,o),e.elementType=dl,e.lanes=l,e;case ml:return e=Oe(19,a,n,o),e.elementType=ml,e.lanes=l,e;case ym:return tt(a,o,l,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Cm:s=10;break e;case gm:s=9;break e;case gs:s=11;break e;case ys:s=14;break e;case fn:s=16,r=null;break e}throw Error(E(130,e==null?e:typeof e,""))}return n=Oe(s,a,n,o),n.elementType=e,n.type=r,n.lanes=l,n}function Kn(e,n,a,r){return e=Oe(7,e,r,n),e.lanes=a,e}function tt(e,n,a,r){return e=Oe(22,e,r,n),e.elementType=ym,e.lanes=a,e.stateNode={isHidden:!1},e}function Ht(e,n,a){return e=Oe(6,e,null,n),e.lanes=a,e}function Kt(e,n,a){return n=Oe(4,e.children!==null?e.children:[],e.key,n),n.lanes=a,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function rx(e,n,a,r,o){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Bt(0),this.expirationTimes=Bt(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Bt(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function ai(e,n,a,r,o,l,s,i,d){return e=new rx(e,n,a,i,d),n===1?(n=1,l===!0&&(n|=8)):n=0,l=Oe(3,null,null,n),e.current=l,l.stateNode=e,l.memoizedState={element:r,isDehydrated:a,cache:null,transitions:null,pendingSuspenseBoundaries:null},Vs(l),e}function ox(e,n,a){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ia,key:r==null?null:""+r,children:e,containerInfo:n,implementation:a}}function PP(e){if(!e)return Nn;e=e._reactInternals;e:{if(oa(e)!==e||e.tag!==1)throw Error(E(170));var n=e;do{switch(n.tag){case 3:n=n.stateNode.context;break e;case 1:if(Me(n.type)){n=n.stateNode.__reactInternalMemoizedMergedChildContext;break e}}n=n.return}while(n!==null);throw Error(E(171))}if(e.tag===1){var a=e.type;if(Me(a))return Pu(e,a,n)}return n}function cP(e,n,a,r,o,l,s,i,d){return e=ai(a,r,!0,e,o,l,s,i,d),e.context=PP(null),a=e.current,r=he(),o=kn(a),l=ln(r,o),l.callback=n??null,wn(a,l,o),e.current.lanes=o,jr(e,o,r),De(e,r),e}function lt(e,n,a,r){var o=n.current,l=he(),s=kn(o);return a=PP(a),n.context===null?n.context=a:n.pendingContext=a,n=ln(l,s),n.payload={element:e},r=r===void 0?null:r,r!==null&&(n.callback=r),e=wn(o,n,s),e!==null&&(He(e,o,s,l),Po(e,o,s)),s}function Xo(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Dd(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<n?a:n}}function ri(e,n){Dd(e,n),(e=e.alternate)&&Dd(e,n)}function tx(){return null}var xP=typeof reportError=="function"?reportError:function(e){console.error(e)};function oi(e){this._internalRoot=e}st.prototype.render=oi.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(E(409));lt(e,n,null,null)};st.prototype.unmount=oi.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;na(function(){lt(null,e,null,null)}),n[mn]=null}};function st(e){this._internalRoot=e}st.prototype.unstable_scheduleHydration=function(e){if(e){var n=$m();e={blockedOn:null,target:e,priority:n};for(var a=0;a<Cn.length&&n!==0&&n<Cn[a].priority;a++);Cn.splice(a,0,e),a===0&&Hm(e)}};function ti(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function it(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function bd(){}function lx(e,n,a,r,o){if(o){if(typeof r=="function"){var l=r;r=function(){var m=Xo(s);l.call(m)}}var s=cP(n,r,e,0,null,!1,!1,"",bd);return e._reactRootContainer=s,e[mn]=s.current,yr(e.nodeType===8?e.parentNode:e),na(),s}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var i=r;r=function(){var m=Xo(d);i.call(m)}}var d=ai(e,0,!1,null,null,!1,!1,"",bd);return e._reactRootContainer=d,e[mn]=d.current,yr(e.nodeType===8?e.parentNode:e),na(function(){lt(n,d,a,r)}),d}function dt(e,n,a,r,o){var l=a._reactRootContainer;if(l){var s=l;if(typeof o=="function"){var i=o;o=function(){var d=Xo(s);i.call(d)}}lt(n,s,e,o)}else s=lx(a,n,e,o,r);return Xo(s)}Wm=function(e){switch(e.tag){case 3:var n=e.stateNode;if(n.current.memoizedState.isDehydrated){var a=Za(n.pendingLanes);a!==0&&(Ms(n,a|1),De(n,ae()),!($&6)&&(Na=ae()+500,_n()))}break;case 13:na(function(){var r=un(e,1);if(r!==null){var o=he();He(r,e,1,o)}}),ri(e,1)}};Ds=function(e){if(e.tag===13){var n=un(e,134217728);if(n!==null){var a=he();He(n,e,134217728,a)}ri(e,134217728)}};zm=function(e){if(e.tag===13){var n=kn(e),a=un(e,n);if(a!==null){var r=he();He(a,e,n,r)}ri(e,n)}};$m=function(){return X};Xm=function(e,n){var a=X;try{return X=e,n()}finally{X=a}};gl=function(e,n,a){switch(n){case"input":if(cl(e,a),n=a.name,a.type==="radio"&&n!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),n=0;n<a.length;n++){var r=a[n];if(r!==e&&r.form===e.form){var o=Zo(r);if(!o)throw Error(E(90));vm(r),cl(r,o)}}}break;case"textarea":Dm(e,a);break;case"select":n=a.value,n!=null&&ya(e,!!a.multiple,n,!1)}};Tm=qs;Nm=na;var sx={usingClientEntryPoint:!1,Events:[_r,ca,Zo,Fm,Em,qs]},Ha={findFiberByHostInstance:Gn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},ix={bundleType:Ha.bundleType,version:Ha.version,rendererPackageName:Ha.rendererPackageName,rendererConfig:Ha.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:pn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=_m(e),e===null?null:e.stateNode},findFiberByHostInstance:Ha.findFiberByHostInstance||tx,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ao=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ao.isDisabled&&ao.supportsFiber)try{Yo=ao.inject(ix),qe=ao}catch{}}Ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=sx;Ee.createPortal=function(e,n){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ti(n))throw Error(E(200));return ox(e,n,null,a)};Ee.createRoot=function(e,n){if(!ti(e))throw Error(E(299));var a=!1,r="",o=xP;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),n=ai(e,1,!1,null,null,a,!1,r,o),e[mn]=n.current,yr(e.nodeType===8?e.parentNode:e),new oi(n)};Ee.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(E(188)):(e=Object.keys(e).join(","),Error(E(268,e)));return e=_m(n),e=e===null?null:e.stateNode,e};Ee.flushSync=function(e){return na(e)};Ee.hydrate=function(e,n,a){if(!it(n))throw Error(E(200));return dt(null,e,n,!0,a)};Ee.hydrateRoot=function(e,n,a){if(!ti(e))throw Error(E(405));var r=a!=null&&a.hydratedSources||null,o=!1,l="",s=xP;if(a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(l=a.identifierPrefix),a.onRecoverableError!==void 0&&(s=a.onRecoverableError)),n=cP(n,null,e,1,a??null,o,!1,l,s),e[mn]=n.current,yr(e),r)for(e=0;e<r.length;e++)a=r[e],o=a._getVersion,o=o(a._source),n.mutableSourceEagerHydrationData==null?n.mutableSourceEagerHydrationData=[a,o]:n.mutableSourceEagerHydrationData.push(a,o);return new st(n)};Ee.render=function(e,n,a){if(!it(n))throw Error(E(200));return dt(null,e,n,!1,a)};Ee.unmountComponentAtNode=function(e){if(!it(e))throw Error(E(40));return e._reactRootContainer?(na(function(){dt(null,null,e,!1,function(){e._reactRootContainer=null,e[mn]=null})}),!0):!1};Ee.unstable_batchedUpdates=qs;Ee.unstable_renderSubtreeIntoContainer=function(e,n,a,r){if(!it(a))throw Error(E(200));if(e==null||e._reactInternals===void 0)throw Error(E(38));return dt(e,n,a,!1,r)};Ee.version="18.3.1-next-f1338f8080-20240426";function pP(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(pP)}catch(e){console.error(e)}}pP(),pm.exports=Ee;var dx=pm.exports,wd=dx;ll.createRoot=wd.createRoot,ll.hydrateRoot=wd.hydrateRoot;/**
 * @license lucide-react v0.314.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var mx={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.314.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ux=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),de=(e,n)=>{const a=S.forwardRef(({color:r="currentColor",size:o=24,strokeWidth:l=2,absoluteStrokeWidth:s,className:i="",children:d,...m},x)=>S.createElement("svg",{ref:x,...mx,width:o,height:o,stroke:r,strokeWidth:s?Number(l)*24/Number(o):l,className:["lucide",`lucide-${ux(e)}`,i].join(" "),...m},[...n.map(([p,c])=>S.createElement(p,c)),...Array.isArray(d)?d:[d]]));return a.displayName=`${e}`,a};/**
 * @license lucide-react v0.314.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Px=de("ArrowDown",[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]]);/**
 * @license lucide-react v0.314.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cx=de("ArrowUp",[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]]);/**
 * @license lucide-react v0.314.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mt=de("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.314.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ut=de("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.314.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pt=de("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.314.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xx=de("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.314.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const px=de("Play",[["polygon",{points:"5 3 19 12 5 21 5 3",key:"191637"}]]);/**
 * @license lucide-react v0.314.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ix=de("Plug",[["path",{d:"M12 22v-5",key:"1ega77"}],["path",{d:"M9 8V2",key:"14iosj"}],["path",{d:"M15 8V2",key:"18g5xt"}],["path",{d:"M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z",key:"osxo6l"}]]);/**
 * @license lucide-react v0.314.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const IP=de("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.314.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fx=de("Radio",[["path",{d:"M4.9 19.1C1 15.2 1 8.8 4.9 4.9",key:"1vaf9d"}],["path",{d:"M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5",key:"u1ii0m"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5",key:"1j5fej"}],["path",{d:"M19.1 4.9C23 8.8 23 15.1 19.1 19",key:"10b0cb"}]]);/**
 * @license lucide-react v0.314.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hx=de("Save",[["path",{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z",key:"1owoqh"}],["polyline",{points:"17 21 17 13 7 13 7 21",key:"1md35c"}],["polyline",{points:"7 3 7 8 15 8",key:"8nz8an"}]]);/**
 * @license lucide-react v0.314.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cx=de("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.314.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gx=de("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]);/**
 * @license lucide-react v0.314.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yx=de("Square",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]]);/**
 * @license lucide-react v0.314.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sx=de("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);/**
 * @license lucide-react v0.314.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vx=de("Volume2",[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5",key:"16drj5"}],["path",{d:"M15.54 8.46a5 5 0 0 1 0 7.07",key:"ltjumu"}],["path",{d:"M19.07 4.93a10 10 0 0 1 0 14.14",key:"1kegas"}]]);/**
 * @license lucide-react v0.314.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mx=de("VolumeX",[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5",key:"16drj5"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]]);/**
 * @license lucide-react v0.314.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ct=de("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),Dx=[{t:"Home Base: Mixolydian",lesson:{p:[`A scale is a family of notes that belong together. The major scale is the do-re-mi sound you already know. Mixolydian is a major scale with exactly one change: the 7th note is lowered by one fret. That single flatted 7th (the "b7") turns sunny into sunny-with-dust — the Grateful Dead's home sound. Jerry spent a whole career inside this scale.`,"This week you learn E Mixolydian in open position: E, F#, G#, A, B, C#, D. In the tab below, each line is a string (top line = thinnest string), numbers are frets, and 0 means play the string open. Read left to right, low notes first."],tabs:[{l:"E Mixolydian — two octaves, open position",t:`e|---------------------------0--
B|----------------------2-3-----
G|----------------1-2-4---------
D|----------0-2-4---------------
A|----0-2-4---------------------
E|-0-2-4------------------------`},{l:"This week's chords — E, A, D (x = don't play that string)",t:`      E   A   D
e|----0---0---2--
B|----0---2---3--
G|----1---2---2--
D|----2---2---0--
A|----2---0---x--
E|----0---x---x--`}],terms:[["Mixolydian","A major scale with the 7th note lowered one fret"],["b7","That lowered 7th — the note that makes it sound like the Dead"],["Open position","The first few frets, using open strings"]]},days:[{f:"Meet E Mixolydian — first octave, open position",h:["Play just the first octave of the lesson tab: low E string 0-2-4, A string 0-2-4, D string 0-2.","One finger per fret: index takes fret 2, ring takes fret 4.","Ten slow, clean passes at 60 bpm. Clean beats fast, every time."]},{f:"Full two octaves, up and back down — 70 bpm",h:["Play the whole lesson tab going up, then reverse it coming down.","No pauses at string crossings — that's the entire game today.","If a crossing stumbles, loop just those two strings until it doesn't."]},{f:"Say every note name out loud as you play",h:["E, F#, G#, A, B, C#, D — speak each one as you fret it.","It feels slow. It's wiring the fretboard into your brain.","Bonus round: name them coming back down too."]},{f:"Sequence in 3s: E-F#-G#, F#-G#-A, G#-A-B…",h:["Play three notes, restart one scale note higher, repeat all the way up.","Keep strict down-up picking throughout.","This exact pattern shows up in half of Jerry's runs."],tabs:[{l:"The first four groups of the sequence",t:`A|-----------0------0-2----0-2-4-
E|-0-2-4---2-4----4---------------`}]},{f:"Play the mode over an E7 drone — hear the b7",h:['Search YouTube for an "E7 drone" or "E Mixolydian backing track."',"Play the scale slowly over it and pause on the D note each pass.","That slightly bluesy rub is the b7. That's the sound you're chasing."]},{f:"Move the shape: A Mixolydian and D Mixolydian",h:["Same fingering logic starting from the open A string: A, B, C#, D, E, F#, G.","Then start from the open D string: D, E, F#, G, A, B, C.","The pattern travels. That's the fretboard's biggest secret."],tabs:[{l:"A Mixolydian — two octaves, open position",t:`e|--------------------------0-2-3-5-
B|--------------------2-3-----------
G|--------------0-2-4---------------
D|--------0-2-4---------------------
A|--0-2-4---------------------------`},{l:"D Mixolydian — one octave, open position",t:`B|----------------1-3-
G|--------0-2-4-------
D|--0-2-4-------------`}]},{f:"Free play over an E7 vamp — scale notes only",h:["Backing track on. No rules except: stay inside the scale.","Play short phrases with rests between them, not endless streams.","Hit a sour note? Slide one fret either way — you're never far from home."]}]},{t:"Major Pentatonic & the Jerry Box",lesson:{p:["Pentatonic means five notes. Take the major scale, remove the 4th and 7th, and what's left is the major pentatonic — nearly impossible to make sound bad, and the skeleton under most Garcia solos. The Dead live in the key of B a lot, so that's where we learn it.",'The "box" below sits between frets 4 and 7. Your root notes (B) are at fret 7 on both E strings and fret 4 on the G string. Learn where the roots are and the box becomes a map instead of a shape.'],tabs:[{l:"B major pentatonic — box 1 (frets 4–7)",t:`e|-4-7-
B|-4-7-
G|-4-6-
D|-4-6-
A|-4-6-
E|-4-7-`},{l:"This week's chords — G, C, D",t:`      G   C   D
e|----3---0---2--
B|----0---1---3--
G|----0---0---2--
D|----0---2---0--
A|----2---3---x--
E|----3---x---x--`}],terms:[["Pentatonic","A five-note scale — the major scale minus its 4th and 7th"],["Box","A scale pattern that stays in one spot on the neck"],["Root","The note the key is named after — your home base"]]},days:[{f:"B major pentatonic, box 1 — memorize it cold",h:["Play the lesson box bottom string to top and back, 60 bpm.","Find every B as you pass it: fret 7 low E, fret 4 G, fret 7 high e.","Ten passes, then try it with your eyes closed."]},{f:"Connect box 1 to the next box with slides",h:["Here's box 2 — it overlaps box 1 and sits a couple frets higher.","Go up through box 1, slide up the B string from 7 to 9, come back down through box 2.","Smooth beats fast. The slide should be silent work."],tabs:[{l:"B major pentatonic — box 2 (frets 6–9)",t:`e|-7-9-
B|-7-9-
G|-6-8-
D|-6-9-
A|-6-9-
E|-7-9-`}]},{f:"Add the 4 and b7 — penta melts into Mixolydian",h:["Add two notes to the box: E at fret 5 on the B string, and A at fret 7 on the D string.","Pentatonic is the safe zone; those two notes are the color.","Alternate: one phrase plain, one phrase with color."],tabs:[{l:"The two color notes inside box 1",t:`B|--5--   E, the 4th
D|--7--   A, the b7`}]},{f:"Ascend one box, descend the next",h:["Up box 1, shift up, come down box 2 — one continuous line.","Metronome at 70. Don't rush the position shift.","Then run the whole trip in reverse."]},{f:"Target the 3rd (D#) every time the chord lands",h:["Loop a B chord vamp. Every time a bar starts, land on D# — fret 4, B string.","Approach it from above one pass, from below the next.","The 3rd is the sweetest note in any chord. Feel why."]},{f:"Call and response: 2-bar question, 2-bar answer",h:["Play a short phrase that ends on any note EXCEPT B. That's the question.","Answer it with a phrase that ends on B.","This is the moment solos become conversations."]},{f:"Free play over a B vamp — pentatonic only",h:["Five minutes minimum, backing track on.","The limit is the freedom: five notes force real phrasing.","Reuse your best question-and-answer pair from yesterday."]}]},{t:"CAGED Triads Up the Neck",lesson:{p:["A triad is the smallest possible chord: three notes — the root, the 3rd, and the 5th. The CAGED idea says the five open chord shapes you already know (C, A, G, E, D) repeat up the neck, which means every chord lives in five different places. Jerry's rhythm playing — and a lot of his lead playing — leans on these small triads instead of big barre chords.","Start with A major on just the top three strings. Below are the same three notes (A, C#, E) in three different neighborhoods. Strum only the three thinnest strings."],tabs:[{l:"A major triads — top three strings, three positions",t:`e|--5----9----12--
B|--5----10---14--
G|--6----9----14--`},{l:"This week's chords — Em and Am join G, C, D",t:`      Em  Am
e|----0---0--
B|----0---1--
G|----0---2--
D|----2---2--
A|----2---0--
E|----0---x--`}],terms:[["Triad","A three-note chord: root, 3rd, 5th"],["CAGED","The five chord shapes that tile the whole neck"],["Voicing","One particular arrangement of a chord's notes"]]},days:[{f:"A major in three places — learn the lesson triads",h:["Play each of the three tab shapes slowly, top three strings only.",'Say "A major" out loud each time — same chord, new address.',"One relaxed downstroke per shape. Let it ring."]},{f:"The middle shape is movable — find D, G, and A",h:["Take the middle lesson shape and slide it: the fret you land on sets the key.","Find D major, G major, and A major with it.","Movable shapes are the whole neck unlocking at once."]},{f:"Connect two shapes on one chord",h:["Pick one chord and play it in the lowest lesson shape, then the next one up.","Walk between them slowly until the jump feels like one motion.","Slow is fine. Smooth is the goal."]},{f:"Play the Ripple progression with tiny triads",h:["Look up the chords to Ripple (it lives around G, C, A, and D).","Comp the whole verse using only top-three-string triads. No barre chords today.","Hear how much lighter it sounds? That's the Dead's rhythm texture."]},{f:"Arpeggiate every triad — one note at a time",h:["Same shapes, but pick each string separately and let the notes ring together.","Strict down-up picking.","This is rhythm playing and lead playing shaking hands."]},{f:"Triads through G–C–D with minimal movement",h:["Use these three triads — they live within a few frets of each other.","Change chords by moving one or two fingers, never jumping.","Loop the progression until the changes happen by themselves."],tabs:[{l:"G, C, and D triads — top three strings, close together",t:`      G   C   D
e|----3---3---5---
B|----3---5---7---
G|----4---5---7---`}]},{f:"Song run: Uncle John's Band, triads only",h:["Look up the chords and comp the intro and verse with triads.","Hum the melody over your own playing.","Record 30 seconds on your phone and listen back."]}]},{t:"The Right Hand",lesson:{p:["Tone and groove live in the right hand. Alternate picking means strict down-up-down-up, no exceptions, even when you cross strings. Hybrid picking means you keep holding the pick but pluck extra strings with your middle and ring fingers — Jerry's country-flavored snap comes straight from this.","The banjo roll is a repeating three-string pattern borrowed from bluegrass (Garcia was a banjo player first). Hold an open G chord and loop the pattern below: the pick strikes the D string, your middle finger plucks the B, your ring finger plucks the high e. Let every note ring into the next."],tabs:[{l:"Banjo roll on open G — pick, middle, ring, repeat",t:`e|------0------0------0---
B|----0------0------0-----
D|--0------0------0-------`},{l:"This week's strum pattern — over the G–C–D loop",t:`count:  1    2  &    &  4  &
strum:  D    D  U    U  D  U
(keep the arm swinging on the silent beats)`}],terms:[["Alternate picking","Strict down-up-down-up pick strokes"],["Hybrid picking","Pick plus bare fingers plucking at the same time"],["Roll","A repeating fingerpicking pattern that rings like a banjo"]]},days:[{f:"Alternate picking: the 1-2-3-4 drill, 80 bpm",h:["Frets 1-2-3-4 on every string, one finger per fret, down-up-down-up.","Keep the pick motion small — wrist, not elbow.","Four clean passes across all six strings."]},{f:"String crossing in 4s, strict alternation",h:["Play your E Mixolydian scale, never breaking the down-up order.","The hard part is an up-stroke landing on a fatter string. That's normal.","Slow down until the crossings are silent."]},{f:"Hybrid picking: pick plus middle finger",h:["Pick the open A string, then instantly pluck fret 2 on the B string with your bare middle finger.","Loop it as steady eighth notes — pick, pluck, pick, pluck.","That fingertip snap is the country half of Jerry."],tabs:[{l:"Hybrid picking loop — pick the A, finger the B string",t:`B|-----2-----2-----2---   (middle finger)
A|--0-----0-----0------   (pick)`}]},{f:"The banjo roll on open G",h:["Run the lesson tab: pick hits D, middle plucks B, ring plucks high e.","Let all three strings ring into each other.","Start at 60 bpm. Evenness matters more than speed."]},{f:"Accent shifting: lean on 2 and 4",h:["Run yesterday's roll, but play beats 2 and 4 louder than 1 and 3.",'Then move the accent to the "and" of each beat.',"Control over volume is where groove comes from."]},{f:"Everything from this week, +10 bpm",h:["Revisit days 1–5 one metronome notch faster.","If a drill falls apart, drop back 5 bpm — find your true edge.","Log today's tempos in the notes so future-you can gloat."]},{f:"Apply it: Cumberland Blues rhythm workout",h:["Look up the tune and comp along, all attention on right-hand bounce.","Sneak the banjo roll into the G sections.","Fun is the actual assignment today."]}]},{t:"Bends, Vibrato & Slides",lesson:{p:["A bend pushes the string sideways to raise its pitch — it's the guitar imitating the human voice. A whole-step bend must land exactly on the pitch two frets higher; your ear is the referee, not your hands. Vibrato is a small, steady wobble that keeps a held note alive instead of letting it die.","Check your bend intonation like this: play fret 9 on the G string and memorize that pitch. Then bend fret 7 until the two match. Always bend with three fingers — the ring finger frets the note while middle and index push behind it for strength."],tabs:[{l:"The pitch-check bend — target first, then bend to match",t:"G|--9----7b9----7b9--"},{l:"This week's chords — E7, A7, B7, plus the 12-bar loop",t:`      E7  A7  B7
e|----0---0---2--
B|----3---2---0--
G|----1---0---2--
D|----0---2---1--
A|----2---0---2--
E|----0---x---x--

| E7 | E7 | E7 | E7 |
| A7 | A7 | E7 | E7 |
| B7 | A7 | E7 | E7 |`}],terms:[["Whole step","A two-fret distance in pitch"],["Oblique bend","Bending one string while another rings unbent"],["Vibrato","A controlled, repeating wobble on a held note"]]},days:[{f:"Whole-step bends, pitch-checked",h:["Run the lesson drill: hear fret 9, then bend fret 7 up to match it.","Three fingers behind every bend — ring bends, middle and index help push.","Ten bends. Be brutally honest about the pitch."]},{f:"Half-step bend and release, slow motion",h:["Bend fret 7 up just one fret's worth — check it against fret 8.","Then lower it back down as slowly and evenly as you raised it.","The release should be silent: no scrapes, no wobble."]},{f:"Vibrato: slow and wide, then narrow",h:["Hold fret 7 on the B string and rock your wrist to wobble the pitch.","Exaggerate first — big slow waves — then gradually tighten.","Sync it to the metronome: one full wave per beat."]},{f:"Slide into chord tones from below",h:["Pick one fret below your target note and slide in without re-picking.","Target the 3rds and 5ths of a B chord.","Slides are cheap expression. Spend freely."]},{f:"Bend and hold while picking a second string",h:["Bend the G string at fret 7 up a whole step, hold it there, and pick fret 5 on the B string.","This oblique move is pure pedal steel — pure Jerry.","It hurts today. It's gorgeous in a month."],tabs:[{l:"The oblique bend — bend, hold, add the top note",t:`B|---------5-----   (rings straight)
G|--7b9~~~~~~~~~~   (bent and held)`}]},{f:"Oblique bends in two more positions",h:["Move yesterday's bend-and-hold to two other spots on the neck.","Pitch-check the bent note every single time.","Slow tempo, maximum listening."]},{f:"Sing a phrase, play it with bends only",h:["Hum any four-note melody — anything.","Find it on the G and B strings using bends and slides instead of separate frets.","This is the day technique starts becoming a voice."]}]},{t:"Chromatic Color",lesson:{p:["Chromatic notes are the in-between notes — anything one fret outside your scale. Played carelessly they sound wrong; played on purpose they create motion and pull. The one rule: chromatic notes pass through, they never park. Always land on a chord tone.","The approach note is the easiest version: play the note one fret below your target, then resolve up onto it. The enclosure surrounds the target — one note above, one below, then land. Below, an enclosure that circles and lands on B."],tabs:[{l:"Enclosure landing on B — above, below, target",t:"G|--5--3--4--"}],terms:[["Chromatic","A note one fret outside the scale"],["Approach note","The note one fret below a target, resolving up"],["Enclosure","Circling a target: above, below, then land"]]},days:[{f:"Approach every chord tone from one fret below",h:["Loop a B chord. Before each chord tone (B, D#, F#), play the fret below it first.","Approach note on the weak beat, target note on the strong beat.","Instant jazz-country flavor. Notice how the target now shines."]},{f:"Enclosures: above, below, land",h:["Run the lesson tab: C, then A#, landing on B.","Build the same move around D# and around F#.","An enclosure is a spotlight pointed at the target note."]},{f:"Chromatic walks between pentatonic boxes",h:["Travel from box 1 to box 2 on one string, hitting every fret in between.","Time the walk so you arrive on a scale note exactly on beat one.","Passing through — never parking."]},{f:"The ascending chromatic run into the root",h:["Walk up into B: frets 2, 3, 4 on the G string (A, A#, B).","End the run exactly on beat one.","A classic Garcia sentence-ender. File it away."],tabs:[{l:"The chromatic walk-up — land B on beat one",t:`G|--2--3--4--
     A  A#  B`}]},{f:"Passing tones inside the scale",h:["Play Mixolydian phrases, but fill one whole-step gap per phrase with its in-between fret.","Keep passing tones quick and light — grace notes, not destinations.","The scale is the road; these are the gravel shoulders."]},{f:"One chromatic idea per phrase — no more",h:["Solo over a B vamp. Each phrase gets exactly one approach, enclosure, or walk.","Restraint is what makes them shine.","Overuse turns color into seasickness."]},{f:"Free play — count your chromatic moves",h:["Five-minute jam. Tally every chromatic device you use.","Aim for 8–12 total: present, not constant.","Note which one is starting to feel like yours."]}]},{t:"Arpeggio Targeting",lesson:{p:['An arpeggio is a chord played one note at a time. When you solo, arpeggios are the safety rails: chord tones are the notes that always sound right over that chord, no matter what. "Targeting" means aiming your phrase so a chord tone lands right when the chord changes — the difference between playing over the changes and playing through them.',"Below is a B major arpeggio (B, D#, F#) in one compact position. Learn it, then hunt the same three notes elsewhere on the neck."],tabs:[{l:"B major arpeggio — B, D#, F#, B",t:`G|------------4--
D|-----1--4------
A|--2------------`}],terms:[["Arpeggio","A chord played one note at a time"],["Chord tone","A note that belongs to the current chord"],["Targeting","Landing a chord tone exactly when the chord changes"]]},days:[{f:"B major arpeggio — lesson position plus two more",h:["Play the lesson tab until it's smooth, saying the note names: B, D#, F#, B.","Then find those same three notes in two other spots.","Arpeggios are just chords walking single file."]},{f:"E and F#m arpeggios — the Scarlet neighborhood",h:["E major is E, G#, B. F# minor is F#, A, C#.","Both sit right next to the B shape you already know — minimal travel.","Loop B → E → F#m arpeggios in steady time."],tabs:[{l:"E major arpeggio — E, G#, B, E",t:`D|-----------2--
A|--------2-----
E|--0--4--------`},{l:"F# minor arpeggio — F#, A, C#, F#",t:`D|-----------4--
A|-----0--4-----
E|--2-----------`}]},{f:"Land the 3rd on beat one",h:["Loop a B-to-E change, two bars each.","When E arrives, be on G#. When B returns, be on D#.","This single skill makes a solo sound professional overnight."]},{f:"Half arpeggio, half scale",h:["Over the B–E loop: outline the chord for two beats, run the scale for two.","The arpeggio anchors; the scale decorates.","Swap the order every pass."]},{f:"Dominant 7 arpeggios: A7 and D7",h:["A7 is A, C#, E, G. D7 is D, F#, A, C.","The b7 baked into the arpeggio is Mixolydian flavor, pre-installed.","Learn each tab, then find the same notes one more place on the neck."],tabs:[{l:"A7 arpeggio — A, C#, E, G",t:`D|--------2--5--
A|--0--4--------`},{l:"D7 arpeggio — D, F#, A, C",t:`G|--------2--5--
D|--0--4--------`}]},{f:"Spell the chords out loud, then solo",h:["Before each backing-track chorus, say the chord tones of every chord in the loop.","Then solo, hunting exactly those notes.","Knowledge becomes fingers a little more every day."]},{f:"Solo the full Scarlet Begonias verse form",h:["Look up the verse changes and loop them.","One chorus arpeggios-only, then one chorus free.","Record the free one and listen for the targeted 3rds."]}]},{t:"The Jerry Lexicon",lesson:{p:["A lick is a short, reusable phrase — vocabulary. You learn licks the way you learn words: copy exactly, then use them in your own sentences until they stop feeling borrowed. Three licks this week, all in B. The daily work moves them into other keys, which is how they become permanently yours."],tabs:[{l:"Lick 1 — the pentatonic roll-off (descending)",t:`B|--7--4----------
G|--------6--4----
D|------------6--4`},{l:"Lick 2 — Mixolydian run down to the b7",t:`G|--8--6--4----
D|----------7--`},{l:"Lick 3 — chromatic enclosure phrase",t:`G|--5--3--4----
D|----------6--`}],terms:[["Lick","A short, reusable musical phrase"],["Transpose","Moving a phrase to a different key"],["Phrase","A musical sentence with a start and an end"]]},days:[{f:"Lick 1: the penta roll-off, in B",h:["Learn the first lesson tab exactly — the rhythm counts as much as the notes.","Loop it twenty times until your hand owns it.","Then play it once at the end of a phrase of your own."]},{f:"Lick 1 in E and A",h:["Slide the whole shape so it starts from each new root.","Same fingering, new neighborhood.","Transposing is the exact moment a lick becomes vocabulary."]},{f:"Lick 2: the Mixolydian run to the b7",h:["Second lesson tab: D#, C#, B, resolving down to A.","Land the A gently — it's the color note, not a crash pad.","Loop it, then alternate it with Lick 1."]},{f:"Lick 2 in three keys, rhythm remixed",h:["Play it in B, E, and A.","Then stretch it: same notes at half speed, then syncopated.","Rhythmic variation doubles your vocabulary for free."]},{f:"Lick 3: the chromatic enclosure phrase",h:["Third lesson tab: circle the B, land it, drop to the G# below.","Attach a short scale run in front so it ends a longer sentence.","Your most jazz-Jerry lick so far."]},{f:"Chain all three into one statement",h:["Lick 1, breath, Lick 2, breath, Lick 3.","Adjust the joins until it flows like a single thought.","Congratulations — you just composed a solo chorus."]},{f:"Improvise; quote each lick once",h:["Five minutes over a B vamp.","Work each lick in naturally — no announcing it.","If one shows up uninvited, it's officially yours now."]}]},{t:"Double Stops",lesson:{p:["A double stop is two notes played at once — instant harmony, and one of the most Garcia sounds there is. 3rds (notes two scale steps apart) sound sweet and vocal, like two singers. 6ths (a wider gap, usually with a skipped string in between) sound like a pedal steel crying in the next room.","Below: 3rds walking up in A on the G and B strings. Press both notes cleanly and strum only those two strings. Slide between pairs instead of lifting off."],tabs:[{l:"3rds in A — paired notes on the G and B strings",t:`B|--2--3--5--7--
G|--2--4--6--7--`}],terms:[["Double stop","Two notes played at the same time"],["3rds","Note pairs two scale steps apart — sweet and vocal"],["6ths","Wider pairs with a skipped string — the pedal-steel sound"]]},days:[{f:"3rds up the scale, two strings at once",h:["Run the lesson tab: paired notes, G and B strings.","Press both cleanly; strum only those two strings.","Walk the pairs up and back until the moves are automatic."]},{f:"6ths on strings 1 and 3 — the sweet stuff",h:["Skip the B string: fret the G and high e strings together.","Walk these pairs up the neck, letting a lazy finger mute the B string.","Instant Peggy-O tenderness."],tabs:[{l:"6ths in A — G and high e strings, B string muted",t:`e|--5---7---9---10--
B|--x---x---x---x---
G|--6---7---9---11--`}]},{f:"Double-stop bends",h:["Bend the G-string note while its B-string partner rings straight.","Small bends — a half step is plenty.","The clash-then-resolve is the entire point."]},{f:"Hybrid-picked double-stop riffing",h:["Pick the low note, pluck the high one with your middle finger.","Groove on an A7 vamp — think chicken-pickin' Jerry.","Add tiny slides between the pairs."]},{f:"Harmonize a melody in 3rds",h:["Take any simple melody — Happy Birthday absolutely counts.","Play it in double-stop 3rds, slowly.","This is ear training wearing a guitar costume."]},{f:"Double stops as rhythm fills",h:["Comp a B–E vamp. Between chord hits, sneak in short two-note fills.","Fills answer the chord, then get out of the way.","This blend is most of what Jerry does under vocals."]},{f:"Solo with a double stop in every phrase",h:["Five minutes over the vamp.","Every phrase must contain at least one pair.","Single notes are words; double stops are harmony singing along."]}]},{t:"Two-Chord Vamps",lesson:{p:["A vamp is a short progression that repeats forever — the Dead's launchpad. Fire on the Mountain is two chords, B to A, around and around for as long as the band feels like it. With no form to track, all of your attention goes where it matters: phrasing, dynamics, and space.","Make your own backing track this week: record two or three minutes of yourself comping the vamp on your phone, then solo over the recording. The week's one discipline: once the loop starts, you never stop playing."],tabs:[{l:"The Fire vamp — one bar each, forever",t:"|  B  . . .  |  A  . . .  |  (repeat)"}],terms:[["Vamp","A short chord loop that repeats indefinitely"],["Comping","Playing rhythm chords behind a melody or solo"],["Dynamics","Deliberate changes in volume and intensity"]]},days:[{f:"Fire on the Mountain: comp the vamp for 5 minutes",h:["Two chords: B to A, one bar each, forever.","Record 2–3 minutes of your comping — that's your backing track for the week.","Vary the strumming, but keep the groove sacred."]},{f:"Solo 5 minutes, zero stopping",h:["Over yesterday's recording. No pauses allowed, even after mistakes.","Mistakes get absorbed into the next phrase, never restarted.","Endurance is a skill. Today it starts."]},{f:"One motif per minute",h:["Set a timer. Each minute, pick one small idea and milk it dry.","Repeat it, move it up, flip it — do not abandon it.","Development beats novelty every time."]},{f:"Whisper chorus, shout chorus",h:["Alternate: once through as quietly as you can, then as big as you can.","Volume comes from pick attack, not the amp knob.","Dynamics are the cheapest drama available."]},{f:"Two beats of silence per phrase",h:["End each phrase, then count two full beats before the next one.","Uncomfortable means you're doing it right.","Jerry's space is as famous as his notes."]},{f:"Franklin's Tower: same drills, new vamp",h:["Loop the Franklin's changes below — record your own backing track again.","Run the motif drill and the dynamics drill over it.","Notice how a third chord changes your note choices."],tabs:[{l:"The Franklin's vamp — A Mixolydian territory",t:"|  A  . . .  |  A  . . .  |  G  . . .  |  D  . . .  |  (repeat)"}]},{f:"Record, listen, fix exactly one thing",h:["Record a full 5-minute jam.","Listen once through with the guitar out of your hands.","Write ONE fix in the notes below. Just one."]}]},{t:"Melodic Development",lesson:{p:["A motif is a tiny idea — three to five notes. Great solos aren't a parade of unrelated licks; they take one idea and grow it: repeat it, move it higher, flip it upside down, stretch its rhythm. Listeners follow a solo the way they follow a sentence — through repetition and variation.","Jerry's other secret is simpler: he starts from the vocal melody and decorates it. When you're lost mid-solo, play the melody. It always works, and nobody plays it enough."],tabs:[{l:"Motif development — one idea, three treatments",t:"state it   →  repeat it  →  move it up  →  flip it"}],terms:[["Motif","A tiny musical idea, 3–5 notes"],["Development","Growing one idea through variation"],["Displacement","The same phrase started on a different beat"]]},days:[{f:"Motif lab: repeat, transpose, invert",h:["Pick three notes. Play them. Again. Now start them higher. Now flip the direction.","Ten minutes on ONE motif — resist every new idea that shows up.","This discipline is what audiences hear as storytelling."]},{f:"Rhythmic displacement",h:["Same motif, but start it on beat 2 instead of beat 1.",'Then start it on the "and" of 1.',"Familiar notes in a new place: fresh without being random."]},{f:"Question and answer, formalized",h:["A two-bar phrase ending unresolved, then a two-bar phrase ending on the root.","Ten pairs in a row over the vamp.","Keep the question identical; vary only the answers."]},{f:"Engineer a peak at bar 24",h:["Solo over 32 bars. Plan to hit maximum height — register, volume, density — at bar 24.","Then descend and land soft.","Peaks feel accidental to the listener. They never are."]},{f:"The melody-first approach",h:["Pick a Dead tune you can sing and find its vocal melody on the neck.","Solo by decorating that melody: slides, doubles, approach notes.","This is the actual center of Garcia's style."]},{f:"Resolve vs. suspend",h:["Alternate phrase endings: land on the root (resolved), then on the 2nd or 6th (floating).","Feel how the suspended endings pull the listener forward.","Control of tension is control of the room."]},{f:"The three-chorus story",h:["Chorus 1: sparse and low. Chorus 2: motifs develop. Chorus 3: peak, then release.","Record it.","Listen back — can you hear the arc from the outside?"]}]},{t:"Full Song Forms",lesson:{p:["A form is the map of a song — which sections, in what order, how many bars each. Soloing over a form means always knowing where you are on that map. This week: three Dead standards. For each one, learn the chords first, comp the full form until it's automatic, and only then solo.","The rule for the week: if you get lost, do not stop. Drop back to comping until beat one finds you, then re-enter. Recovering gracefully IS the skill — it's what separates playing songs from playing exercises."],tabs:[{l:"The weekly ladder",t:"learn form → comp it cold → solo it → recover gracefully"}],terms:[["Form","The section map of a song"],["Changes","The chord progression of a form"],["Chorus","One full trip through the form"]]},days:[{f:"Deal: learn and comp the form",h:["Look up the changes and map the sections in your notes below.","Comp the full form five times at an easy tempo.","Count out loud through anything that trips you."]},{f:"Deal: solo the full form",h:["Solo while naming each chord as it arrives — out loud or in your head.","Target 3rds at every change. Week 7 pays off right here.","Lost? Comp until beat one comes around, then re-enter."]},{f:"Sugaree: form plus fills",h:["Learn the form. It breathes slower — leave real space.","Add short double-stop fills where the vocal lines would pause.","Fills serve the song, not the soloist."]},{f:"Sugaree: the three-chorus build",h:["Apply the Week 11 arc across three full choruses.","Chorus 3 should visit your highest register of the day.","Record the last chorus."]},{f:"Bertha: the form at tempo",h:["A faster tune — comp until the changes run on autopilot.","Simplify: triads and muted strums keep the train on the rails.","Tempo exposes hesitation. That's exactly the point."]},{f:"Bertha: solo and recover",h:["Solo the form. When you flub — you will — keep the right hand moving.","Absorb the mistake into a rhythm figure, then re-enter the solo.","Graceful recovery is a stage skill you can build alone in a room."]},{f:"The mini-set",h:["Deal, then Sugaree, then Bertha. Back to back, no restarts.","Comp each head, solo one full form per tune.","You just played a set. Note how the energy held up."]}]},{t:"The Long Jam",lesson:{p:["Everything converges here. A long jam is a conversation with yourself: statements, questions, space, and a peak you build on purpose. Think in waves — rise, crest, breathe, rise higher. Ten minutes is a long time on purpose; boredom is the doorway, and what's on the other side of it is the actual jam.","Record everything this week. Listening back is where half the learning lives: you'll hear the rushing, the repetition, and — more often than you expect — the moments that genuinely worked."],tabs:[{l:"The wave shape",t:"rise → crest → breathe → rise higher → crest → release"}],terms:[["Peak","The planned high point of a jam"],["Trading fours","Alternating four-bar phrases with another player"],["Space","Deliberate silence, played on purpose"]]},days:[{f:"Ten minutes, one key, no stopping",h:["Timer on, backing vamp on, go.","Use everything: motifs, licks, double stops, space, dynamics.","Boredom is the doorway. Play through it."]},{f:"Jam with a modulation",h:["Five minutes in B, then lift the whole jam up to E for five more.","Plan the pivot: land on G# — the 3rd of E — right at the switch.","A modulation is the jam's second wind."]},{f:"Trade fours with a recording",h:["Put on a live Dead jam. Play four bars, then lay out four while the band answers.","Steal something from their four for your next four.","Listening is the deepest practice there is."]},{f:"Three waves of intensity",h:["Ten minutes, three planned peaks, each higher than the last.","Between peaks: drop the volume, thin the notes, breathe.","You're conducting yourself. That's what this is."]},{f:"Half the notes, twice the intent",h:["Ten minutes with a hard rule: long tones, space, and vibrato do the talking.","Every note gets a beginning, a middle, and an end.","Less has never been more than it is today."]},{f:"Record your best jam of the program",h:["Warm up properly, then record ten minutes in one take.","Listen back tonight with day-one ears.","Compare it to your Week 10 recording. Feel that distance."]},{f:"Day 90: the open mic set — rhythm and lead",h:["Ripple with the roll texture, Friend of the Devil opening with its intro run, your closer with the 8-bar solo break. Standing, announced, timed.","You have played this set dozens of times. The stage is just a room with better light.","Ninety days. What a long strange trip. Now go sign up for the slot."]}]}],bx=[{name:"Foundation",range:[1,30],sub:"Hands, scales, chords"},{name:"Vocabulary",range:[31,60],sub:"The Jerry lexicon"},{name:"The Jam",range:[61,90],sub:"Improvisation & forms"}],wx=["Open E, A, and D — shapes are drawn just below. Run the one-minute change test: switch E→A as many times as you can in 60 seconds, log the count in your notes. Then A→D. Beat yesterday's number.","Open G, C, and D — shapes below. One-minute change tests: G→C, then C→D. Then loop G–C–G–D slowly, four downstrums per chord, no gaps between changes.","Add Em and Am — shapes below. Loop G–Em–C–D, four beats each. That's the folk engine under half the songbook. Keep the strumming plain; the changes are the workout.",'Strum pattern week: Down, Down-Up, Up-Down-Up over the G–C–D loop — chart below. Count it "1, 2-and, and-4-and." Keep the arm moving even through the misses.',"Dominant 7ths: E7, A7, B7 — shapes below. Loop a 12-bar in E: E7×4 bars, A7×2, E7×2, B7×1, A7×1, E7×2. This is the blues floor under the whole Dead catalog."],Bx=[{l:"Week 1 chords — E, A, D (x = don't play that string)",t:`      E   A   D
e|----0---0---2--
B|----0---2---3--
G|----1---2---2--
D|----2---2---0--
A|----2---0---x--
E|----0---x---x--`},{l:"Week 2 chords — G, C, D",t:`      G   C   D
e|----3---0---2--
B|----0---1---3--
G|----0---0---2--
D|----0---2---0--
A|----2---3---x--
E|----3---x---x--`},{l:"Week 3 chords — G, C, D, plus Em and Am",t:`      G   C   D   Em  Am
e|----3---0---2---0---0--
B|----0---1---3---0---1--
G|----0---0---2---0---2--
D|----0---2---0---2---2--
A|----2---3---x---2---0--
E|----3---x---x---0---x--`},{l:"Week 4 — G, C, D with the strum pattern",t:`      G   C   D
e|----3---0---2--
B|----0---1---3--
G|----0---0---2--
D|----0---2---0--
A|----2---3---x--
E|----3---x---x--

count:  1    2  &    &  4  &
strum:  D    D  U    U  D  U`},{l:"Week 5 chords — E7, A7, B7, plus the 12-bar loop",t:`      E7  A7  B7
e|----0---0---2--
B|----3---2---0--
G|----1---0---2--
D|----0---2---1--
A|----2---0---2--
E|----0---x---x--

| E7 | E7 | E7 | E7 |
| A7 | A7 | E7 | E7 |
| B7 | A7 | E7 | E7 |`}],kx=["Song 1: Ripple. Verse chords (G, C, A, D territory) with the Week 4 strum. Then re-run the verse swapping the banjo roll onto every G chord — rhythm one pass, texture the next. Both styles, same song.","Ripple start to finish, singing or humming. Now add lead: end each vocal line with a small fill — slide into the 3rd of the next chord (your Week 5 skill). Strummer AND soloist, four bars at a time.","Song 2: Friend of the Devil. That famous descending intro run IS lead guitar — learn it exactly, it opens your set. Then the verse chords (G, C, D, Am), picking the bass note before each strum.","Friend of the Devil start to finish, then Ripple from memory. End one Ripple verse with Lick 1 transposed to G — exactly what this week teaches. Your first planned lead moment on stage.","Your closer: Sugaree — mid-tempo, built for lead. Learn the verse, then mark TWO spots for double-stop fills (this week's skill). Keep Songs 1–2 warm: one memory pass each."],Fx=["Stage rep: Ripple, start to finish, STANDING, no stops — roll texture on at least two verses, fills at the line endings. Mistakes get played through, never restarted.",`Stage rep: Friend of the Devil from memory, standing, intro run included. Announce it out loud first, like you're at the mic: "This one's called…"`,"Stage rep: your closer with an 8-bar solo break — two verses of comping, one short solo built from ONE motif (Week 11 style), then back to the verse. Land the ending clean and deliberate.","Stage rep: the FULL set, 10 seconds max between songs, timed. The closer keeps its solo break — that's your jam moment on stage. An open mic slot is 10–15 minutes.","Stage rep: record one set song on video and watch it back. You're checking posture, the fills, and recovery — not perfection.","Stage rep: play one song for a real human — spouse, kid, friend on a video call. Bonus: improvise one fill you've never played before, while they watch."],Ex={30:"MILESTONE — Checkpoint 1: loop G–C–D with the strum pattern for 3 straight minutes, no stopping. That's a song's worth of endurance.",60:"MILESTONE — Checkpoint 2: Ripple and Friend of the Devil back to back, from memory, recorded — with at least one lead fill in each. Two-thirds of your set, both styles present.",90:"MILESTONE — THE GOAL: three songs, standing, for people — fills throughout and a solo break in the closer. Rhythm player AND lead player, same guy. Find the open mic; you've done this dozens of times."},Tx={WEEKS:Dx,PHASES:bx,CHORD_DRILLS:wx,CHORD_CHARTS:Bx,REP_DRILLS:kx,PERFORMANCE_REPS:Fx,MILESTONES:Ex},en=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],li={"Pentatonic Minor":{intervals:[0,3,5,7,10],description:"The essential rock & blues scale. 5 notes make it easy to learn and improvise over virtually any progression.",difficulty:"Beginner",tips:["Learn Position 1 (box shape) first — 5th fret for A","Connect positions by sliding between them chromatically","Bend the 3rd and 7th scale degrees for blues expression"]},"Pentatonic Major":{intervals:[0,2,4,7,9],description:"Bright and uplifting. Country, pop, and folk staple. Same shape as minor pentatonic — just start 3 frets higher.",difficulty:"Beginner",tips:["Relative to minor pentatonic: A minor pent = C major pent","Great for playing over I, IV, V chord progressions","Add slides and hammer-ons for a country feel"]},"Natural Minor":{intervals:[0,2,3,5,7,8,10],description:"The Aeolian mode. Dark and emotional, foundational to rock, metal, and classical guitar.",difficulty:"Beginner",tips:["Contains the pentatonic minor scale + 2 extra notes (2nd and 6th)","Practice in 3-note-per-string patterns for speed","The 6th degree gives it a distinctly classical sound"]},Major:{intervals:[0,2,4,5,7,9,11],description:"The Ionian mode. Bright and foundational. Every musician must internalize this scale in all keys.",difficulty:"Beginner",tips:["Learn the CAGED system to find it all over the neck","Practice ascending and descending slowly with a metronome","Emphasize chord tones (1, 3, 5) when improvising"]},Blues:{intervals:[0,3,5,6,7,10],description:'Pentatonic minor with a chromatic "blue note" (b5). The defining sound of blues and rock guitar.',difficulty:"Intermediate",tips:["The b5 is a passing tone — land on the 5th after it","Bend the blue note up to the 5th for classic blues licks","Works over dominant 7th chords and minor blues progressions"]},Dorian:{intervals:[0,2,3,5,7,9,10],description:"Natural minor with a raised 6th. Soulful and jazzy — Santana, Miles Davis, and Carlos Santana's signature.",difficulty:"Intermediate",tips:["The raised 6th is what gives Dorian its open, less gloomy feel","Use over minor 7th chords in jazz and fusion","Try it over a minor IV chord — the 6th lights up perfectly"]},Mixolydian:{intervals:[0,2,4,5,7,9,10],description:"Major scale with a flatted 7th. The dominant scale — blues-rock gold used in classic rock riffs.",difficulty:"Intermediate",tips:["Use over dominant 7th chords (G7, A7, D7)","The b7 creates tension that wants to resolve down","Classic rock riffs (Hendrix, Page) often live in Mixolydian"]}},Nx=[4,11,7,2,9,4],jx=["e","B","G","D","A","E"],si=[64,59,55,50,45,40];function Zl(e,n){return(Nx[e]+n)%12}function es(e,n){return si[e]+n}function Ox(e){return(e-4+12)%12}function _x(e){const n=Ox(e);return[{label:"Full",minFret:0,maxFret:12},...[0,3,5,7,10].map((r,o)=>({label:`Box ${o+1}`,minFret:n+r,maxFret:n+r+4}))]}function Ax(e,n){return li[n].intervals.map(a=>(e+a)%12)}function Bd(e,n,a){const r=[];for(let o=5;o>=0;o--)for(let l=Math.max(0,n);l<=a;l++){const s=Zl(o,l);e.includes(s)&&r.push({stringIdx:o,fret:l,midi:es(o,l),note:s})}return r}const Rx={e:0,B:1,G:2,D:3,A:4,E:5};function Vx(e){const n=[...e].sort((m,x)=>m.col-x.col);for(let m=1;m<n.length;m++)if(n[m].col===n[m-1].col)return n;const a=4,r=new Map;for(const m of e)r.has(m.stringIdx)||r.set(m.stringIdx,[]),r.get(m.stringIdx).push(m);const o=[];for(const[m,x]of r){const p=[...x].sort((c,h)=>c.col-h.col);for(let c=1;c<p.length;c++)if(p[c].col-p[c-1].col>a)return n;o.push({si:m,minCol:p[0].col,evs:p})}if(o.length<2)return n;o.sort((m,x)=>m.minCol-x.minCol);const l=Math.sign(o[1].si-o[0].si);if(l===0)return n;for(let m=1;m<o.length;m++)if(Math.sign(o[m].si-o[m-1].si)!==l)return n;const s=o.flatMap(m=>m.evs),i=m=>si[m.stringIdx]+m.fret,d=Math.sign(i(s[1])-i(s[0]));if(d===0)return n;for(let m=1;m<s.length;m++)if(Math.sign(i(s[m])-i(s[m-1]))!==d)return n;return s}function Ux(e){if(!e||typeof e!="string")return{playable:!1,steps:[],minFret:0,maxFret:0,hasOpen:!1,stringsUsed:[]};const n=[],a=new Set;let r=0;for(const p of e.split(`
`)){const c=p.match(/^\s*([eBGDAE])\s*\|(.*)$/);if(!c)continue;const h=Rx[c[1]];if(h===void 0)continue;r++,a.add(h);let g=c[2];const C=g.search(/\s{2,}\S/);C!==-1&&(g=g.slice(0,C));for(let v=0;v<g.length;v++){const u=g[v];if(u<"0"||u>"9")continue;let P=u,I=v+1;for(;I<g.length&&g[I]>="0"&&g[I]<="9";)P+=g[I++];let D=null;if(g[I]==="b"){let B=I+1,y="";for(;B<g.length&&g[B]>="0"&&g[B]<="9";)y+=g[B++];y&&(D=parseInt(y,10),I=B)}n.push({stringIdx:h,fret:parseInt(P,10),col:v,bendTo:D}),v=I-1}}if(r<1||n.length<1)return{playable:!1,steps:[],minFret:0,maxFret:0,hasOpen:!1,stringsUsed:[]};const o=Vx(n),l=[];let s=null,i=null,d=1/0,m=-1/0,x=!1;for(const p of o){p.fret===0?x=!0:(d=Math.min(d,p.fret),m=Math.max(m,p.fret));const c={stringIdx:p.stringIdx,fret:p.fret,midi:si[p.stringIdx]+p.fret,bendTo:p.bendTo};p.col===s?i.notes.push(c):(i={notes:[c]},l.push(i),s=p.col)}return d===1/0&&(d=0,m=Math.max(m,0)),m===-1/0&&(m=0),{playable:!0,steps:l,minFret:d,maxFret:m,hasOpen:x,stringsUsed:[...a].sort((p,c)=>p-c)}}let Ka=null,Vn=null,zn=null;function Ve(){return Ka||(Ka=new(window.AudioContext||window.webkitAudioContext)),Ka.state==="suspended"&&Ka.resume(),Ka}let ns=!1;function Gx(){const e=Ve();if(e.state==="suspended"&&e.resume(),!ns)try{const n=e.createBufferSource();n.buffer=e.createBuffer(1,1,22050),n.connect(e.destination),n.start(0),ns=!0}catch{}}let kd=!1;function Lx(){if(kd||typeof window>"u")return;kd=!0;const e=["pointerdown","touchend","keydown"],n=()=>{Gx(),ns&&e.forEach(a=>window.removeEventListener(a,n))};e.forEach(a=>window.addEventListener(a,n,{passive:!0}))}function ii(){if(zn===null){const e=parseFloat(localStorage.getItem("guitar-jam-volume"));zn=Number.isFinite(e)?e:.9}return zn}function Wx(e){zn=Math.max(0,Math.min(1,e));try{localStorage.setItem("guitar-jam-volume",String(zn))}catch{}Vn&&(Vn.gain.value=zn),Un&&(Un.gain.value=zn)}function xt(){const e=Ve();if(!Vn){Vn=e.createGain(),Vn.gain.value=ii();const n=e.createDynamicsCompressor();n.threshold.value=-3,n.knee.value=6,n.ratio.value=20,n.attack.value=.002,n.release.value=.15,Vn.connect(n),n.connect(e.destination)}return Vn}let Un=null;function fP(){const e=Ve();return Un||(Un=e.createGain(),Un.gain.value=ii(),Un.connect(e.destination)),Un}let $n=null;function di(){const e=Ve();return $n||($n=e.createGain(),$n.connect(fP())),$n}function pt(){if($n){try{$n.disconnect()}catch{}$n=null}}let Xn=null;function mi(){const e=Ve();return Xn||(Xn=e.createGain(),Xn.connect(xt())),Xn}function It(){if(Xn){try{Xn.disconnect()}catch{}Xn=null}}function Yn(e){return 440*Math.pow(2,(e-69)/12)}function Jn(e,n,a,r,o){const l=Math.ceil(r.sampleRate*Math.min(a+.2,3.5)),s=r.createBuffer(1,l,r.sampleRate),i=s.getChannelData(0);for(let c=0;c<l;c++)i[c]=Math.random()*2-1;const d=r.createBufferSource();d.buffer=s;const m=r.createBiquadFilter();m.type="bandpass",m.frequency.value=e,m.Q.value=Math.max(20,80-e/50);const x=r.createBiquadFilter();x.type="lowpass",x.frequency.value=Math.min(e*6,r.sampleRate*.45);const p=r.createGain();p.gain.setValueAtTime(1.3,n),p.gain.exponentialRampToValueAtTime(.001,n+a),d.connect(m),m.connect(x),x.connect(p),p.connect(o||xt()),d.start(n),d.stop(n+a+.1)}function zx(e,n,a,r,o){const l=r.createGain();l.gain.setValueAtTime(0,n),l.gain.linearRampToValueAtTime(.55,n+.007),l.gain.exponentialRampToValueAtTime(.001,n+a),l.connect(o||xt()),[[1,.5],[2,.26],[3,.13],[4,.07],[5,.04]].forEach(([s,i])=>{const d=r.createOscillator(),m=r.createGain();d.type="sine",d.frequency.value=e*s,m.gain.value=i,d.connect(m),m.connect(l),d.start(n),d.stop(n+a)})}function Fr(e,n,a,r){const o=a.createOscillator(),l=a.createGain();o.type="sine",o.frequency.value=n?1050:700,l.gain.setValueAtTime(n?.55:.3,e),l.gain.exponentialRampToValueAtTime(.001,e+.04),o.connect(l),l.connect(r||fP()),o.start(e),o.stop(e+.05)}function Fd(e){const n=Ve();Jn(Yn(e),n.currentTime+.01,2.2,n)}let sn=0;function ja(){sn++,It(),pt()}function $x(e,n,a,r,o,l=!1){const s=Ve(),i=++sn;It(),pt();const d=mi(),m=di(),x=60/a,p=x*.82,c=e.map(v=>({note:v,octave:v<n?5:4})),h=[...c].reverse().slice(1),g=[...c,...h];g.forEach(({note:v,octave:u},P)=>{const I=s.currentTime+.06+P*x,D=Yn(12*(u+1)+v);if(Jn(D,I,p,s,d),l&&Fr(I,P%4===0,s,m),o){const B=Math.max(0,(I-s.currentTime)*1e3);setTimeout(()=>{sn===i&&o(v)},B)}});const C=(.06+g.length*x+.15)*1e3;return o&&setTimeout(()=>{sn===i&&o(null)},C),C}function as(e,n,a){const{bpm:r=70,instrument:o="guitar",loops:l=1,countIn:s=!1,tempoStep:i=0,tempoMax:d=400,click:m=!1}=n||{},x=Ve(),p=++sn;It(),pt();const c=mi(),h=di(),g=x.currentTime;let C=g+.12;const v=Number.isFinite(l)?l:64,u=(P,I)=>{const D=Math.max(0,(P-g)*1e3);setTimeout(()=>{sn===p&&I()},D)};if(s){const P=60/r;for(let I=0;I<4;I++)Fr(C,I===0,x,h),u(C,()=>a&&a(null,{countIn:4-I})),C+=P}for(let P=0;P<v;P++){const I=Math.min(d,r+P*i),D=60/I,B=D*.9;e.forEach((y,f)=>{const k=C+f*D,T=y.notes.length>1;y.notes.forEach(F=>{const _=k+(T?(5-F.stringIdx)*.011:0),U=Yn(F.midi);o==="piano"?zx(U,_,B,x,c):Jn(U,_,B,x,c)}),m&&Fr(k,f%4===0,x,h),u(k,()=>a&&a(f,{loop:P+1,loops:v,bpm:I}))}),C+=e.length*D+D*.35}return u(C,()=>a&&a(null,{done:!0})),(C-g)*1e3}const rs={E:[40,47,52,56,59,64],A:[45,52,57,61,64],D:[50,57,62,66],G:[43,47,50,55,59,67],C:[48,52,55,60,64],B:[47,54,59,63,66],Em:[40,47,52,55,59,64],Am:[45,52,57,61,64],E7:[40,47,50,56,59,64],A7:[45,52,55,61,64],B7:[47,51,57,59,66]};let Co=null,os=0;function ts(){os++,Co&&(clearInterval(Co),Co=null)}function Ed(e,n,a){ts();const r=++os,o=Ve(),l=60/n,s=l*4,i=l*2*.92;let d=0,m=o.currentTime+.1;const x=(c,h)=>c.forEach((g,C)=>Jn(Yn(g),h+C*.02,i,o)),p=()=>{const c=o.currentTime;for(;m<c+.35;){const h=e[d%e.length];x(h.midis,m),x(h.midis,m+2*l);const g=d%e.length,C=Math.max(0,(m-c)*1e3);setTimeout(()=>{os===r&&a&&a(g)},C),d++,m+=s}};p(),Co=setInterval(p,130)}function Xx(e,n,a,r,o){const l=Ve(),s=++sn;It(),pt();const i=mi(),d=di(),m=l.currentTime,x=60/n/2,p=m+.12,c=e.length*r;for(let g=0;g<c;g++){const C=e[g%e.length],v=p+g*x;if(C==="D"||C==="U"?(C==="D"?a:[...a].reverse()).forEach((P,I)=>Jn(Yn(P),v+I*.013,x*1.7,l,i)):C==="B"?Jn(Yn(a[0]),v,x*1.7,l,i):C==="x"&&a.forEach((u,P)=>Jn(Yn(u),v+P*.008,.055,l,i)),g%2===0&&Fr(v,g%e.length===0,l,d),o){const u=Math.max(0,(v-m)*1e3);setTimeout(()=>{sn===s&&o(g%e.length)},u)}}const h=(c*x+.35)*1e3;return o&&setTimeout(()=>{sn===s&&o(null)},h),h}const ft=S.createContext({loops:1,countIn:!1,tempoStep:0,click:!0}),hP=()=>S.useContext(ft),Hx=58,Kx=52,Yx=50,Jx=60,Er=34,ht=27,Qx=10,qx=13,Zx=[3,5,7,9];function la(e){return Er+e*ht}const Ya=Er-14,Yt=5*ht+28,Jt=Er+2.5*ht;function e1({scaleNotes:e,rootIdx:n,minFret:a=0,maxFret:r=12,playingNote:o=null,positions:l=null,activePositions:s=null}){const i=a>0,d=Array.isArray(l),m=d?new Set(l.map(T=>`${T.stringIdx}-${T.fret}`)):null,x=s&&s.length?new Set(s.map(T=>`${T.stringIdx}-${T.fret}`)):null,p=(T,F,_)=>d?m.has(`${T}-${F}`):e.includes(_),c=(T,F,_)=>x?x.has(`${T}-${F}`):d?!1:_===o,h=T=>!d&&T===n,g=i?a:1,C=r,v=C-g+1,u=i?Yx:Hx,P=i?Jx:Kx,I=i?qx:Qx,D=i?9.5:7.5,B=u+v*P+18,y=Er+5*ht+22;function f(T){if(T===0)return 36;const F=T-g;return u+(F+.5)*P}function k(T){return u+T*P}return t.jsx("div",{className:"overflow-x-auto -mx-1",children:t.jsxs("svg",{viewBox:`0 0 ${B} ${y}`,width:B,height:y,style:{minWidth:B,display:"block"},children:[t.jsx("rect",{x:u,y:Ya,width:v*P,height:Yt,fill:"#3b2010",rx:2}),!i&&Zx.map(T=>T>=g&&T<=C?t.jsx("circle",{cx:f(T),cy:Jt,r:4.5,fill:"#5a3820"},T):null),!i&&C>=12&&t.jsxs(t.Fragment,{children:[t.jsx("circle",{cx:f(12),cy:Jt-19,r:4.5,fill:"#5a3820"}),t.jsx("circle",{cx:f(12),cy:Jt+19,r:4.5,fill:"#5a3820"})]}),i?t.jsxs("text",{x:u-6,y:y-6,textAnchor:"end",fontSize:9,fill:"#6b7280",fontFamily:"monospace",children:["fr ",a]}):null,!i&&t.jsx("line",{x1:u,y1:Ya+2,x2:u,y2:Ya+Yt-2,stroke:"#d1d5db",strokeWidth:4}),Array.from({length:v},(T,F)=>t.jsx("line",{x1:k(F+1),y1:Ya+2,x2:k(F+1),y2:Ya+Yt-2,stroke:"#9ca3af",strokeWidth:1.5},F)),jx.map((T,F)=>t.jsxs("g",{children:[t.jsx("line",{x1:i?u:28,y1:la(F),x2:B-6,y2:la(F),stroke:"#c8a850",strokeWidth:.6+F*.45,opacity:.75}),!i&&t.jsx("text",{x:20,y:la(F)+4,textAnchor:"middle",fontSize:9,fill:"#6b7280",fontFamily:"monospace",children:T}),i&&t.jsx("text",{x:u-6,y:la(F)+4,textAnchor:"end",fontSize:9,fill:"#6b7280",fontFamily:"monospace",children:T})]},F)),Array.from({length:v},(T,F)=>{const _=g+F;return t.jsx("text",{x:f(_),y:Er-18,textAnchor:"middle",fontSize:i?10:8.5,fill:i?"#9ca3af":"#4b5563",children:_},_)}),!i&&Array.from({length:6},(T,F)=>{const _=Zl(F,0);if(!p(F,0,_))return null;const U=h(_),A=c(F,0,_),R=36,G=la(F);return t.jsxs("g",{onClick:()=>Fd(es(F,0)),style:{cursor:"pointer"},children:[t.jsx("circle",{cx:R,cy:G,r:I+(A?3:0),fill:U?"#f59e0b":"#0d9488",opacity:A?1:.9}),t.jsx("text",{x:R,y:G+3.5,textAnchor:"middle",fontSize:D,fontWeight:"bold",fill:U?"#1c1917":"#ffffff",children:en[_]})]},`open-${F}`)}),Array.from({length:6},(T,F)=>Array.from({length:v},(_,U)=>{const A=g+U,R=Zl(F,A);if(!p(F,A,R))return null;const G=h(R),W=c(F,A,R),z=f(A),M=la(F),b=I+(W?3:0);return t.jsxs("g",{onClick:()=>Fd(es(F,A)),style:{cursor:"pointer"},children:[t.jsx("circle",{cx:z,cy:M,r:b,fill:G?"#f59e0b":"#0d9488",opacity:W?1:.92}),W&&t.jsx("circle",{cx:z,cy:M,r:b+4,fill:"none",stroke:G?"#f59e0b":"#0d9488",strokeWidth:2,opacity:.5}),t.jsx("text",{x:z,y:M+3.5,textAnchor:"middle",fontSize:D,fontWeight:"bold",fill:G?"#1c1917":"#ffffff",children:en[R]})]},`${F}-${A}`)}))]})})}const CP=S.memo(e1),Td=e=>e?e.notes.map(n=>({stringIdx:n.stringIdx,fret:n.fret})):[];function n1({label:e,tab:n}){const a=S.useMemo(()=>Ux(n),[n]),r=hP(),[o,l]=S.useState(70),[s,i]=S.useState(!1),[d,m]=S.useState(null),[x,p]=S.useState(null),c=S.useMemo(()=>a.steps.some(_=>_.notes.length>1),[a]),[h,g]=S.useState(c?"step":"shape"),[C,v]=S.useState(0);S.useEffect(()=>{v(0),g(c?"step":"shape")},[n,c]),S.useEffect(()=>()=>ja(),[]);const{allPositions:u,minFret:P,maxFret:I}=S.useMemo(()=>{const _=new Map;for(const M of a.steps)for(const b of M.notes)_.set(`${b.stringIdx}-${b.fret}`,{stringIdx:b.stringIdx,fret:b.fret});const U=[..._.values()],A=U.map(M=>M.fret).filter(M=>M>0),R=U.some(M=>M.fret===0),G=A.length?Math.min(...A):0,W=A.length?Math.max(...A):4,z=R||G<=2?0:G-1;return{allPositions:U,minFret:z,maxFret:Math.max(W,z+4)}},[a]),D=a.steps.length,B=s&&d!=null?d:Math.min(C,D-1),y=S.useMemo(()=>Td(a.steps[B]),[a,B]),f=h==="step"?y:u,k=s&&a.steps[d]?Td(a.steps[d]):h==="step"?y:[],T=S.useCallback(()=>{if(s){ja(),i(!1),m(null),p(null);return}i(!0),as(a.steps,{bpm:o,instrument:"guitar",loops:r.loops,countIn:r.countIn,tempoStep:r.tempoStep,tempoMax:200,click:r.click},(_,U)=>{if(U!=null&&U.done){i(!1),m(null),p(null);return}if(U!=null&&U.countIn){m(null),p(`Count-in ${U.countIn}…`);return}m(_);const A=[];U.loops>1&&A.push(`Loop ${U.loop}/${U.loops===64?"∞":U.loops}`),r.tempoStep>0&&A.push(`${U.bpm} BPM`),p(A.join(" · ")||null)})},[s,a.steps,o,r]);if(!a.playable)return t.jsxs("div",{className:"mt-3",children:[e&&t.jsx("div",{className:"text-amber-400 text-xs font-bold mb-1.5",children:e}),t.jsx("pre",{className:"bg-gray-950 border border-gray-700 rounded-lg p-3 text-gray-200 text-xs leading-relaxed overflow-x-auto font-mono",children:n})]});const F=c?"Chord":"Step";return t.jsxs("div",{className:"mt-3 bg-gray-900/60 border border-gray-700 rounded-xl p-3",children:[t.jsxs("div",{className:"flex items-center justify-between gap-2 mb-1",children:[e&&t.jsx("div",{className:"text-amber-400 text-xs font-bold leading-snug min-w-0",children:e}),t.jsxs("div",{className:"flex items-center gap-2 flex-shrink-0",children:[x&&t.jsx("span",{className:"text-teal-400 text-[10px] font-mono",children:x}),D>1&&t.jsx("button",{onClick:()=>g(_=>_==="step"?"shape":"step"),className:"px-2 py-1 rounded-lg text-[11px] font-semibold bg-gray-700 hover:bg-gray-600 text-gray-200",title:h==="step"?"Show the whole shape":"Step through one at a time",children:h==="step"?"All":"Step"}),t.jsx("button",{onClick:T,className:`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${s?"bg-gray-700 hover:bg-gray-600 text-gray-100":"bg-amber-500 hover:bg-amber-400 text-stone-900"}`,children:s?"⏹ Stop":"▶ Play"})]})]}),t.jsx(CP,{positions:f,activePositions:k,minFret:P,maxFret:I}),h==="step"&&D>1&&t.jsxs("div",{className:"flex items-center gap-2 mt-2",children:[t.jsxs("span",{className:"text-gray-500 text-[11px] w-20 flex-shrink-0",children:[F," ",B+1,"/",D]}),t.jsx("input",{type:"range",min:0,max:D-1,value:B,onChange:_=>v(Number(_.target.value)),disabled:s,className:"w-full accent-teal-500"})]}),t.jsxs("div",{className:"flex items-center gap-2 mt-2",children:[t.jsxs("span",{className:"text-gray-500 text-[11px] w-20 flex-shrink-0",children:[o," BPM"]}),t.jsx("input",{type:"range",min:40,max:160,value:o,onChange:_=>l(Number(_.target.value)),disabled:s,className:"w-full accent-amber-500"})]}),t.jsx("pre",{className:"bg-gray-950 border border-gray-700 rounded-lg p-3 text-gray-200 text-xs leading-relaxed overflow-x-auto font-mono mt-2",children:n})]})}const En=S.memo(n1),Nd=[{name:"Largo",max:60},{name:"Andante",max:80},{name:"Moderato",max:108},{name:"Allegro",max:156},{name:"Presto",max:220}];function a1(e){return(Nd.find(n=>e<n.max)??Nd.at(-1)).name}const r1=.12,o1=25;function Rr({defaultBpm:e=80}){const[n,a]=S.useState(e),[r,o]=S.useState(!1),[l,s]=S.useState(-1),i=S.useRef(n),d=S.useRef(0),m=S.useRef(0);return S.useEffect(()=>{i.current=n},[n]),S.useEffect(()=>{if(!r){s(-1);return}const x=Ve();d.current=x.currentTime+.05,m.current=0;const p=setInterval(()=>{const c=x.currentTime;for(;d.current<c+r1;){const h=d.current,g=m.current%4;Fr(h,g===0,x);const v=Math.max(0,(h-c)*1e3),u=g;setTimeout(()=>s(u),v),m.current++,d.current+=60/i.current}},o1);return()=>clearInterval(p)},[r]),t.jsxs("div",{className:"bg-gray-800 rounded-2xl p-4 space-y-4",children:[t.jsxs("div",{className:"flex items-center justify-between",children:[t.jsx("h3",{className:"text-white font-semibold",children:"Metronome"}),t.jsx("span",{className:"text-gray-400 text-sm",children:a1(n)})]}),t.jsx("div",{className:"flex justify-center gap-3",children:[0,1,2,3].map(x=>t.jsx("div",{className:"rounded-full transition-all duration-75",style:{width:x===0?18:14,height:x===0?18:14,background:l===x?x===0?"#f59e0b":"#0d9488":"#374151",boxShadow:l===x?`0 0 10px ${x===0?"#f59e0b":"#0d9488"}`:"none"}},x))}),t.jsxs("div",{className:"space-y-1",children:[t.jsxs("div",{className:"flex items-center justify-between",children:[t.jsx("span",{className:"text-gray-400 text-sm",children:"Tempo"}),t.jsxs("span",{className:"text-white font-mono font-bold",children:[n," BPM"]})]}),t.jsx("input",{type:"range",min:40,max:200,value:n,onChange:x=>a(Number(x.target.value)),className:"w-full accent-teal-500"}),t.jsxs("div",{className:"flex justify-between text-xs text-gray-600",children:[t.jsx("span",{children:"40"}),t.jsx("span",{children:"120"}),t.jsx("span",{children:"200"})]})]}),t.jsx("div",{className:"flex gap-2 flex-wrap",children:[60,80,100,120].map(x=>t.jsx("button",{onClick:()=>a(x),className:`px-3 py-1 rounded text-xs font-medium transition-colors ${n===x?"bg-teal-600 text-white":"bg-gray-700 text-gray-300 hover:bg-gray-600"}`,children:x},x))}),t.jsx("button",{onClick:()=>o(x=>!x),className:`w-full py-2 rounded-lg font-semibold text-sm transition-colors ${r?"bg-gray-700 hover:bg-gray-600 text-gray-200":"bg-teal-600 hover:bg-teal-500 text-white"}`,children:r?"⏹ Stop":"▶ Start Metronome"})]})}const t1=e=>e.map(n=>({notes:[{stringIdx:n.stringIdx,fret:n.fret,midi:n.midi}]})),Qt=[1,2,3,4,5];function l1({initialRoot:e,initialType:n,guidedDefault:a=!1}){const r=hP(),[o,l]=S.useState(e),[s,i]=S.useState(n),[d,m]=S.useState(70),[x,p]=S.useState(a?1:0),[c,h]=S.useState(!1),[g,C]=S.useState(!1),[v,u]=S.useState(null),[P,I]=S.useState([]),[D,B]=S.useState(a?"guided":"free"),[y,f]=S.useState(()=>new Set),[k,T]=S.useState(1);S.useEffect(()=>{l(e),i(n),f(new Set),T(1),p(a?1:0)},[e,n,a]),S.useEffect(()=>()=>ja(),[]),S.useEffect(()=>{D==="guided"&&p(k)},[D,k]);const F=S.useMemo(()=>Ax(o,s),[o,s]),_=S.useMemo(()=>_x(o),[o]),U=_[x]||_[0],A=y.size===5,R=S.useCallback(()=>{ja(),h(!1),C(!1),u(null),I([])},[]),G=S.useCallback(()=>{if(c||g)return R();if(h(!0),x===0)I([]),$x(F,o,d,"guitar",b=>{u(b),b===null&&h(!1)},r.click);else{const b=Bd(F,U.minFret,U.maxFret);u(null),as(t1(b),{bpm:d,click:r.click},(N,w)=>{if(w!=null&&w.done){h(!1),I([]);return}w!=null&&w.countIn||I(b[N]?[{stringIdx:b[N].stringIdx,fret:b[N].fret}]:[])})}},[c,g,x,F,o,d,U,r.click,R]),W=S.useCallback(()=>{if(c||g)return R();const b=[],N=[];for(const w of Qt){const j=_[w];j&&Bd(F,j.minFret,j.maxFret).forEach(V=>{b.push({notes:[{stringIdx:V.stringIdx,fret:V.fret,midi:V.midi}]}),N.push({box:w,stringIdx:V.stringIdx,fret:V.fret})})}b.length&&(C(!0),u(null),p(1),as(b,{bpm:d,click:r.click},(w,j)=>{if(j!=null&&j.done){C(!1),I([]);return}if(j!=null&&j.countIn)return;const V=N[w];V&&(p(V.box),I([{stringIdx:V.stringIdx,fret:V.fret}]))}))},[c,g,F,d,_,r.click,R]),z=S.useCallback(()=>{const b=new Set(y);if(b.add(k),f(b),b.size<5){const N=Qt.filter(w=>!b.has(w));T(N.find(w=>w>k)??N[0])}},[y,k]),M=c||g;return t.jsxs("div",{className:"space-y-3",children:[t.jsx("div",{className:"flex flex-wrap gap-1",children:en.map((b,N)=>t.jsx("button",{onClick:()=>l(N),className:`px-2 py-0.5 rounded text-xs font-semibold ${N===o?"bg-amber-500 text-stone-900":"bg-gray-700 text-gray-300 hover:bg-gray-600"}`,children:b},N))}),t.jsx("div",{className:"flex flex-wrap gap-1",children:Object.keys(li).map(b=>t.jsx("button",{onClick:()=>i(b),className:`px-2 py-0.5 rounded text-xs font-medium ${b===s?"bg-teal-600 text-white":"bg-gray-700 text-gray-300 hover:bg-gray-600"}`,children:b},b))}),t.jsx("div",{className:"flex flex-wrap gap-1.5",children:F.map((b,N)=>t.jsx("span",{className:`text-xs px-2 py-0.5 rounded font-semibold ${b===o?"bg-amber-500 text-stone-900":"bg-teal-800/60 text-teal-200"}`,children:en[b]},N))}),t.jsxs("div",{className:"flex items-center gap-2",children:[t.jsx("span",{className:"text-gray-500 text-[11px]",children:"Mode"}),t.jsx("div",{className:"flex rounded-lg overflow-hidden border border-gray-700 text-xs",children:["guided","free"].map(b=>t.jsx("button",{onClick:()=>B(b),className:`px-3 py-1 font-medium capitalize ${D===b?"bg-teal-600 text-white":"bg-gray-800 text-gray-400 hover:text-gray-200"}`,children:b},b))})]}),D==="guided"?t.jsxs("div",{className:"space-y-2",children:[t.jsx("div",{className:"flex items-center gap-1.5",children:Qt.map(b=>{const N=y.has(b),w=b===k&&!A;return t.jsx("button",{onClick:()=>T(b),className:`flex-1 h-8 rounded-lg text-xs font-bold grid place-items-center border transition-colors ${w?"bg-teal-600 text-white border-teal-500":N?"bg-amber-500/20 text-amber-400 border-amber-500/50":"bg-gray-800 text-gray-500 border-gray-700 hover:border-gray-600"}`,children:N?"✓":`Box ${b}`},b)})}),t.jsx("p",{className:`text-[11px] ${A?"text-amber-400 font-semibold":"text-gray-400"}`,children:A?"All 5 boxes done — now connect them: walk the neck ↑":`Box ${k} of 5 · frets ${U.minFret}–${U.maxFret} — play it clean, then advance`})]}):t.jsx("div",{className:"flex gap-1.5 flex-wrap",children:_.map((b,N)=>t.jsx("button",{onClick:()=>p(N),className:`px-2.5 py-1 rounded text-xs font-medium ${x===N?"bg-teal-600 text-white":"bg-gray-700 text-gray-300 hover:bg-gray-600"}`,children:b.label},N))}),t.jsx(CP,{scaleNotes:F,rootIdx:o,minFret:U.minFret,maxFret:U.maxFret,playingNote:v,activePositions:P}),t.jsxs("div",{className:"flex items-center gap-2",children:[t.jsxs("span",{className:"text-gray-500 text-[11px] w-20 flex-shrink-0",children:[d," BPM"]}),t.jsx("input",{type:"range",min:40,max:160,value:d,onChange:b=>m(Number(b.target.value)),disabled:M,className:"w-full accent-teal-500"})]}),D==="guided"?t.jsxs("div",{className:"flex gap-2",children:[t.jsx("button",{onClick:G,className:`flex-1 py-2 rounded-xl font-semibold text-sm transition-colors ${c?"bg-gray-700 hover:bg-gray-600 text-gray-200":"bg-teal-600 hover:bg-teal-500 text-white"}`,children:c?"⏹ Stop":`▶ Play box ${k}`}),A?t.jsx("button",{onClick:W,className:`flex-1 py-2 rounded-xl font-semibold text-sm transition-colors ${g?"bg-gray-700 hover:bg-gray-600 text-gray-200":"bg-amber-600 hover:bg-amber-500 text-white"}`,children:g?"⏹ Stop":"▶ Walk the neck ↑"}):t.jsx("button",{onClick:z,disabled:M,className:"flex-1 py-2 rounded-xl font-semibold text-sm bg-gray-700 hover:bg-gray-600 text-gray-100 disabled:opacity-50",children:"Got it → next ✓"})]}):t.jsxs("div",{className:"flex gap-2",children:[t.jsx("button",{onClick:G,className:`flex-1 py-2 rounded-xl font-semibold text-sm transition-colors ${c?"bg-gray-700 hover:bg-gray-600 text-gray-200":"bg-teal-600 hover:bg-teal-500 text-white"}`,children:c?"⏹ Stop":x===0?"▶ Play scale":`▶ Play box ${x}`}),t.jsx("button",{onClick:W,className:`flex-1 py-2 rounded-xl font-semibold text-sm transition-colors ${g?"bg-gray-700 hover:bg-gray-600 text-gray-200":"bg-amber-600 hover:bg-amber-500 text-white"}`,children:g?"⏹ Stop":"▶ Walk the neck ↑"})]})]})}const ui=S.memo(l1),jd=[{rootIdx:4,type:"Mixolydian"},{rootIdx:11,type:"Pentatonic Major"},{rootIdx:9,type:"Mixolydian"},{rootIdx:4,type:"Blues"},{rootIdx:9,type:"Pentatonic Minor"}];function s1({day:e=1}){const n=jd[(e-1)%jd.length],[a,r]=S.useState(!1);return t.jsxs("div",{className:"bg-gray-800 rounded-2xl overflow-hidden border border-gray-700",children:[t.jsxs("button",{onClick:()=>r(o=>!o),className:"w-full flex items-center justify-between px-4 py-3 text-left",children:[t.jsxs("div",{children:[t.jsx("div",{className:"text-teal-400 text-[10px] font-bold tracking-[2px]",children:"WARM-UP · SCALE OF THE DAY"}),t.jsxs("div",{className:"text-white font-semibold text-sm mt-0.5",children:[en[n.rootIdx]," ",n.type]})]}),t.jsx(mt,{size:18,className:`text-gray-400 transition-transform ${a?"rotate-180":""}`})]}),a&&t.jsx("div",{className:"px-4 pb-4",children:t.jsx(ui,{initialRoot:n.rootIdx,initialType:n.type})})]})}const Od=[{id:"e7",label:"E7 drone",chords:["E7"]},{id:"fire",label:"Fire (B–A)",chords:["B","A"]},{id:"franklins",label:"Franklin's (A-A-G-D)",chords:["A","A","G","D"]},{id:"folk",label:"Folk (G–C–D)",chords:["G","C","D"]},{id:"blues",label:"12-bar E blues",chords:["E7","E7","E7","E7","A7","A7","E7","E7","B7","A7","E7","E7"]}];function Pi(){const[e,n]=S.useState("e7"),[a,r]=S.useState(80),[o,l]=S.useState(!1),[s,i]=S.useState(-1),d=Od.find(x=>x.id===e);S.useEffect(()=>()=>ts(),[]);const m=S.useCallback(()=>{if(o){ts(),l(!1),i(-1);return}const x=d.chords.map(p=>({name:p,midis:rs[p]}));l(!0),Ed(x,a,p=>i(p))},[o,d,a]);return S.useEffect(()=>{if(!o)return;const x=d.chords.map(p=>({name:p,midis:rs[p]}));Ed(x,a,p=>i(p))},[e,a]),t.jsxs("div",{className:"bg-gray-800 rounded-2xl p-4 space-y-3",children:[t.jsxs("div",{className:"flex items-center justify-between",children:[t.jsx("h3",{className:"text-white font-semibold",children:"Backing vamp"}),t.jsx("span",{className:"text-gray-500 text-xs",children:"play over the changes"})]}),t.jsx("div",{className:"flex flex-wrap gap-1.5",children:Od.map(x=>t.jsx("button",{onClick:()=>n(x.id),className:`px-2.5 py-1 rounded text-xs font-medium ${x.id===e?"bg-amber-500 text-stone-900":"bg-gray-700 text-gray-300 hover:bg-gray-600"}`,children:x.label},x.id))}),t.jsx("div",{className:"flex flex-wrap gap-1.5",children:d.chords.map((x,p)=>t.jsx("span",{className:`text-sm px-2.5 py-1 rounded font-bold font-mono transition-colors ${o&&p===s?"bg-amber-500 text-stone-900":"bg-gray-700/70 text-gray-300"}`,children:x},p))}),t.jsxs("div",{className:"flex items-center gap-2",children:[t.jsxs("span",{className:"text-gray-500 text-[11px] w-20 flex-shrink-0",children:[a," BPM"]}),t.jsx("input",{type:"range",min:50,max:160,value:a,onChange:x=>r(Number(x.target.value)),className:"w-full accent-amber-500"})]}),t.jsx("button",{onClick:m,className:`w-full py-2 rounded-lg font-semibold text-sm transition-colors ${o?"bg-gray-700 hover:bg-gray-600 text-gray-200":"bg-amber-600 hover:bg-amber-500 text-white"}`,children:o?"⏹ Stop vamp":"▶ Start vamp"})]})}const _d=[{name:"Foundation",desc:"steady",slots:["D","-","D","-","D","-","D","-"]},{name:"Backbeat",desc:"bounce",slots:["D","-","D","U","D","-","D","U"]},{name:"Campfire",desc:"the classic",slots:["D","-","D","U","-","U","D","U"]},{name:"Boom-chick",desc:"Dead country",slots:["B","-","D","-","B","-","D","-"]},{name:"The Chop",desc:"groove",slots:["D","-","x","-","D","-","x","-"]}],i1=["1","&","2","&","3","&","4","&"],d1={D:"D",U:"U",B:"B",x:"x","-":"·"};function m1(){const[e,n]=S.useState(80),[a,r]=S.useState(null),[o,l]=S.useState(null);S.useEffect(()=>()=>ja(),[]);const s=S.useCallback(i=>{if(a===i){ja(),r(null),l(null);return}r(i),l(null),Xx(_d[i].slots,e,rs.G,2,d=>{if(d===null){r(null),l(null);return}l(d)})},[a,e]);return t.jsxs("div",{className:"mt-3 bg-gray-900/60 border border-gray-700 rounded-xl p-3",children:[t.jsxs("div",{className:"flex items-center justify-between mb-2 gap-2",children:[t.jsx("div",{className:"text-amber-400 text-xs font-bold",children:"The five strum patterns — tap ▶ to hear each (in G)"}),t.jsxs("span",{className:"text-gray-500 text-[11px] flex-shrink-0",children:[e," BPM"]})]}),t.jsxs("div",{className:"flex items-center gap-2 mb-1",children:[t.jsx("div",{className:"w-24 flex-shrink-0"}),t.jsx("div",{className:"flex gap-1 font-mono text-[11px] text-gray-500",children:i1.map((i,d)=>t.jsx("div",{className:"w-6 text-center",children:i},d))})]}),_d.map((i,d)=>{const m=a===d;return t.jsxs("div",{className:"flex items-center gap-2 py-0.5",children:[t.jsxs("button",{onClick:()=>s(d),className:`w-24 flex-shrink-0 text-left flex items-center gap-1.5 ${m?"text-amber-400":"text-gray-200 hover:text-white"}`,children:[t.jsx("span",{className:"text-xs",children:m?"⏹":"▶"}),t.jsxs("span",{className:"text-[11px] font-semibold leading-tight",children:[i.name,t.jsx("span",{className:"block text-gray-500 font-normal",children:i.desc})]})]}),t.jsx("div",{className:"flex gap-1 font-mono",children:i.slots.map((x,p)=>{const c=m&&o===p,h=x!=="-";return t.jsx("div",{className:`w-6 h-6 rounded grid place-items-center text-xs font-bold transition-colors ${c?"bg-amber-500 text-stone-900":h?"bg-gray-700 text-teal-300":"text-gray-700"}`,children:d1[x]},p)})})]},i.name)}),t.jsxs("div",{className:"flex items-center gap-2 mt-2.5",children:[t.jsx("span",{className:"text-gray-500 text-[11px] w-16 flex-shrink-0",children:"Tempo"}),t.jsx("input",{type:"range",min:50,max:140,value:e,onChange:i=>n(Number(i.target.value)),disabled:a!==null,className:"w-full accent-amber-500"})]}),t.jsx("div",{className:"text-gray-500 text-[11px] mt-2 leading-snug",children:"D = downstrum · U = upstrum · B = bass note only · x = muted chunk"})]})}const u1={0:{rootIdx:4,type:"Mixolydian"},1:{rootIdx:11,type:"Pentatonic Major"},2:{rootIdx:9,type:"Major"},4:{rootIdx:11,type:"Pentatonic Major"},5:{rootIdx:11,type:"Pentatonic Major"},6:{rootIdx:11,type:"Major"},9:{rootIdx:9,type:"Mixolydian"}},P1=e=>u1[e]||{rootIdx:4,type:"Mixolydian"},{WEEKS:c1,PHASES:Ad,CHORD_DRILLS:x1,CHORD_CHARTS:p1,REP_DRILLS:I1,PERFORMANCE_REPS:Rd,MILESTONES:f1}=Tx,h1=["Foundation","Backbeat","Campfire","Boom-chick","The Chop"],gP="dead90",ls=e=>e<=30?0:e<=60?1:2;function C1(e){const n=ls(e),a=Math.min(Math.floor((e-1)/7),12);return n===0?[{n:"Warmup",m:5,d:"Chromatic 1-2-3-4 drill: frets 1-2-3-4 on every string, one finger per fret, down-up picking, 60 bpm"},{n:"Technique",m:20,d:"Work today's focus — the numbered steps above"},{n:"Chords",m:15,d:x1[Math.min(a,4)]+" Strum of the day: #"+((e-1)%5+1)+" ("+h1[(e-1)%5]+") - chart below."}]:n===1?[{n:"Warmup",m:5,d:"60 seconds of the banjo roll on G, then E Mixolydian two octaves up and down, twice"},{n:"Vocabulary",m:15,d:"Work today's focus — the numbered steps above"},{n:"Application",m:10,d:"Loop a B vamp (record 2 minutes of comping, or find a backing track) and use today's idea over it, slow tempo first"},{n:"Repertoire",m:10,d:I1[Math.min(Math.max(a-4,0),4)]}]:[{n:"Warmup",m:5,d:"One Phase 2 lick in a brand-new key, plus one slow pass of the B pentatonic box"},{n:"Stage rep",m:10,d:Rd[e%Rd.length]},{n:"The Jam",m:20,d:"Work today's focus — the numbered steps above"},{n:"Debrief",m:5,d:"Record one minute of playing, listen back, write one sentence below"}]}function qt(e){const n=Math.min(Math.floor((e-1)/7),12),a=Math.min((e-1)%7,6),r=c1[n],o=r.days[a],l=[...r.lesson.tabs,...r.days.flatMap(s=>s.tabs||[])];return{week:n+1,theme:r.t,lesson:r.lesson,weekTabs:l,focus:o.f,how:o.h,dayTabs:o.tabs||[],blocks:C1(e),phase:ls(e),chordChart:ls(e)===0?p1[Math.min(n,4)]:null,milestone:f1[e]||null,isWeekStart:a===0}}function Vd(){try{const e=localStorage.getItem(gP);if(e)return{completed:[],notes:{},blocks:{},activity:{},...JSON.parse(e)}}catch{}return{completed:[],notes:{},blocks:{},activity:{}}}const yP=e=>e.toISOString().slice(0,10),sa=(e,n)=>{const a=new Date(e);return a.setDate(a.getDate()+n),a},Ud=()=>yP(new Date),Gd=e=>e===0?"#374151":e<2?"#0d9488":e<4?"#f59e0b":"#f43f5e",g1=["S","M","T","W","T","F","S"];function y1({activity:e}){const n=new Date,a=C=>e[yP(C)]||0;let r=0,o=new Date(n);for(a(o)===0&&(o=sa(o,-1));a(o)>0;)r++,o=sa(o,-1);const l=Object.values(e).filter(C=>C>0).length,s=[];for(let C=6;C>=0;C--){const v=sa(n,-C);s.push({dow:g1[v.getDay()],c:a(v),isToday:C===0})}const i=5,d=sa(n,6-n.getDay()),m=sa(d,-34),x=13,p=3,c=i*(x+p),h=7*(x+p),g=[];for(let C=0;C<i;C++)for(let v=0;v<7;v++){const u=sa(m,C*7+v);u>n||g.push(t.jsx("rect",{x:C*(x+p),y:v*(x+p),width:x,height:x,rx:2.5,fill:Gd(a(u))},`${C}-${v}`))}return t.jsxs("div",{className:"bg-gray-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8",children:[t.jsxs("div",{className:"flex items-center gap-3",children:[t.jsx("span",{className:"text-3xl",children:"🔥"}),t.jsxs("div",{children:[t.jsxs("div",{className:"flex items-baseline gap-1.5",children:[t.jsx("span",{className:"text-amber-400 font-bold text-4xl leading-none",style:{fontFamily:"ui-serif, Georgia, serif"},children:r}),t.jsxs("span",{className:"text-white font-semibold text-sm",children:["day",r===1?"":"s"," streak"]})]}),t.jsxs("div",{className:"text-gray-500 text-xs mt-1",children:[l," days practiced total"]})]})]}),t.jsxs("div",{className:"flex-1",children:[t.jsx("div",{className:"text-gray-500 text-[10px] font-bold tracking-[2px] mb-1.5",children:"LAST 7 DAYS"}),t.jsx("div",{className:"flex gap-1.5",children:s.map((C,v)=>t.jsxs("div",{className:"text-center",children:[t.jsx("div",{className:`w-6 h-6 rounded-md ${C.isToday?"ring-2 ring-teal-300":""}`,style:{background:Gd(C.c)}}),t.jsx("div",{className:"text-gray-500 text-[10px] mt-1",children:C.dow})]},v))})]}),t.jsxs("div",{children:[t.jsx("div",{className:"text-gray-500 text-[10px] font-bold tracking-[2px] mb-1.5",children:"THIS MONTH"}),t.jsx("div",{className:"overflow-x-auto",children:t.jsx("svg",{width:c,height:h,viewBox:`0 0 ${c} ${h}`,style:{display:"block"},children:g})})]})]})}function Ld(e){for(let n=1;n<=90;n++)if(!e.includes(n))return n;return 90}function S1({day:e,completed:n}){const o=[];for(let s=1;s<=90;s++){const i=(s-1)/90*Math.PI*2-Math.PI/2,d=150+118*Math.cos(i),m=150+118*Math.sin(i),x=n.includes(s),p=s===e;o.push(t.jsx("circle",{cx:d.toFixed(1),cy:m.toFixed(1),r:p?6:x?4.5:3,fill:p?"#f43f5e":x?"#f59e0b":"#374151",className:p?"animate-pulse":""},s))}const l=Math.round(n.length/90*100);return t.jsxs("svg",{viewBox:"0 0 300 300",style:{width:"min(62vw,230px)",display:"block",margin:"0 auto"},children:[o,t.jsx("text",{x:"150",y:"140",textAnchor:"middle",fill:"#f4f4f5",style:{font:"700 44px ui-serif, Georgia, serif"},children:e}),t.jsx("text",{x:"150",y:"164",textAnchor:"middle",fill:"#a1a1aa",style:{font:"600 11px sans-serif",letterSpacing:"2.5px"},children:"OF 90 DAYS"}),t.jsxs("text",{x:"150",y:"188",textAnchor:"middle",fill:"#f59e0b",style:{font:"700 14px sans-serif"},children:[l,"% complete"]})]})}function v1(){const[e,n]=S.useState(Vd),[a,r]=S.useState(()=>{const y=parseInt(new URLSearchParams(window.location.search).get("day"),10);return y>=1&&y<=90?y:Ld(Vd().completed)}),[o,l]=S.useState(()=>qt(a).isWeekStart),[s,i]=S.useState({loops:1,countIn:!1,tempoStep:0,click:!0}),[d,m]=S.useState(!1);S.useEffect(()=>{try{localStorage.setItem(gP,JSON.stringify(e))}catch{}},[e]);const x=S.useMemo(()=>qt(a),[a]),p=S.useCallback(y=>{y<1||y>90||(r(y),l(qt(y).isWeekStart),window.scrollTo(0,0))},[]),c=y=>{var f;return{...y.activity,[Ud()]:(((f=y.activity)==null?void 0:f[Ud()])||0)+1}},h=y=>n(f=>{const k=f.blocks[a]||[],T=!k.includes(y),F=T?[...k,y]:k.filter(_=>_!==y);return{...f,blocks:{...f.blocks,[a]:F},activity:T?c(f):f.activity}}),g=()=>n(y=>{const f=!y.completed.includes(a),k=f?[...y.completed,a]:y.completed.filter(T=>T!==a);return{...y,completed:k,activity:f?c(y):y.activity}}),C=y=>n(f=>({...f,notes:{...f.notes,[a]:y}})),v=()=>{const y=new Blob([JSON.stringify(e)],{type:"application/json"}),f=document.createElement("a");f.href=URL.createObjectURL(y),f.download="dead90-progress.json",f.click()},u=()=>{const y=prompt("Paste your exported progress JSON:");if(y)try{const f=JSON.parse(y);n({completed:[],notes:{},blocks:{},activity:{},...f}),r(Ld(f.completed||[])),alert("Progress restored.")}catch{alert("Couldn't parse that — make sure it's the exported JSON.")}},P=e.blocks[a]||[],I=e.completed.includes(a),D=Ad[x.phase],B=e.completed.filter(y=>y>=D.range[0]&&y<=D.range[1]).length;return t.jsx(ft.Provider,{value:s,children:t.jsxs("div",{className:"space-y-6",children:[t.jsxs("div",{className:"text-center",children:[t.jsx("div",{className:"text-rose-400 text-[11px] font-bold tracking-[3px]",children:"A GRATEFUL DEAD GUITAR PROGRAM"}),t.jsxs("h2",{className:"text-3xl sm:text-4xl font-bold text-white mt-1",style:{fontFamily:"ui-serif, Georgia, serif"},children:["Ninety Days ",t.jsx("span",{className:"text-amber-400 italic font-semibold",children:"to the Jam"})]}),t.jsxs("p",{className:"text-gray-400 text-sm mt-2",children:["The goal: ",t.jsx("b",{className:"text-gray-200",children:"an open mic on night 90"})," — three songs, rhythm and lead, standing, confident."]})]}),t.jsx(y1,{activity:e.activity}),t.jsxs("div",{className:"flex flex-col items-center gap-5 md:flex-row md:justify-center md:gap-10",children:[t.jsx(S1,{day:a,completed:e.completed}),t.jsxs("div",{className:"w-full max-w-md md:w-auto md:min-w-[360px] space-y-3",children:[t.jsx("div",{className:"flex gap-2",children:Ad.map((y,f)=>t.jsxs("div",{className:`flex-1 py-2 px-1.5 rounded-lg text-center border ${f===x.phase?"bg-gray-800 border-amber-500":"border-gray-700"}`,children:[t.jsx("div",{className:`text-xs font-bold ${f===x.phase?"text-amber-400":"text-gray-500"}`,children:y.name}),t.jsxs("div",{className:"text-[10px] text-gray-500 mt-0.5",children:[y.range[0],"–",y.range[1]]})]},f))}),t.jsxs("div",{className:"flex items-center justify-between gap-2",children:[t.jsxs("button",{onClick:()=>p(a-1),disabled:a===1,className:"border border-gray-700 rounded-lg px-3 py-2 text-sm font-bold text-gray-300 disabled:text-gray-700 flex items-center gap-1",children:[t.jsx(ut,{size:16})," Prev"]}),t.jsxs("div",{className:"text-center",children:[t.jsxs("div",{className:"text-white font-bold text-lg",style:{fontFamily:"ui-serif, Georgia, serif"},children:["Day ",a]}),t.jsxs("div",{className:"text-gray-500 text-[11px]",children:["Week ",x.week," · ",x.theme]})]}),t.jsxs("button",{onClick:()=>p(a+1),disabled:a===90,className:"border border-gray-700 rounded-lg px-3 py-2 text-sm font-bold text-gray-300 disabled:text-gray-700 flex items-center gap-1",children:["Next ",t.jsx(Pt,{size:16})]})]})]})]}),t.jsxs("div",{className:"grid gap-5 lg:grid-cols-3 items-start",children:[t.jsxs("div",{className:"lg:col-span-2 space-y-4 min-w-0",children:[t.jsx(s1,{day:a}),x.milestone&&t.jsx("div",{className:"bg-rose-950/40 border border-rose-500/60 rounded-2xl p-4 text-sm text-rose-100 font-semibold leading-relaxed",children:x.milestone}),t.jsxs("div",{className:"bg-gray-800/60 border border-gray-700 rounded-2xl overflow-hidden",children:[t.jsxs("button",{onClick:()=>l(y=>!y),className:"w-full flex justify-between items-center px-4 py-3.5 text-sm font-bold text-white text-left",children:[t.jsxs("span",{children:[t.jsxs("span",{className:"text-amber-400",children:["Lesson · Week ",x.week,":"]})," ",x.theme]}),t.jsx("span",{className:"text-gray-400 text-lg leading-none",children:o?"−":"+"})]}),o&&t.jsxs("div",{className:"px-4 pb-4",children:[t.jsx("div",{className:"max-w-3xl",children:x.lesson.p.map((y,f)=>t.jsx("p",{className:"text-gray-300 text-sm leading-relaxed mb-2.5",children:y},f))}),t.jsx("div",{className:"mt-3.5 space-y-1.5",children:x.lesson.terms.map((y,f)=>t.jsxs("div",{className:"text-xs leading-snug",children:[t.jsx("b",{className:"text-amber-400",children:y[0]}),t.jsxs("span",{className:"text-gray-500",children:[" — ",y[1]]})]},f))})]})]}),t.jsxs("div",{className:"bg-gray-800 rounded-2xl p-4",children:[t.jsx("div",{className:"text-teal-400 text-[10px] font-bold tracking-[2px] mb-1",children:"THIS WEEK'S SCALES & TABS"}),t.jsx("div",{className:"text-gray-500 text-xs mb-1",children:"Play these all week — they don't go away after day 1."}),t.jsx("div",{className:"mt-3 bg-gray-900/60 border border-gray-700 rounded-xl p-3",children:(()=>{const y=P1(x.week-1);return t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"text-amber-400 text-xs font-bold mb-2",children:["Scale up the neck — ",en[y.rootIdx]," ",y.type," · box positions"]}),t.jsx(ui,{initialRoot:y.rootIdx,initialType:y.type,guidedDefault:!0})]})})()}),t.jsx("div",{className:"grid xl:grid-cols-2 gap-x-4",children:x.lesson.tabs.map((y,f)=>t.jsx(En,{label:y.l,tab:y.t},`w-${f}`))})]}),t.jsxs("div",{className:"bg-gray-800 rounded-2xl p-4",children:[t.jsx("div",{className:"text-rose-400 text-[10px] font-bold tracking-[2px] mb-1.5",children:"TODAY'S FOCUS"}),t.jsx("div",{className:"text-white text-lg leading-snug mb-3",style:{fontFamily:"ui-serif, Georgia, serif"},children:x.focus}),t.jsx("div",{className:"space-y-2",children:x.how.map((y,f)=>t.jsxs("div",{className:"flex gap-2.5 items-start",children:[t.jsx("div",{className:"w-5 h-5 rounded-full flex-shrink-0 mt-0.5 grid place-items-center bg-gray-700 text-amber-400 text-[11px] font-extrabold",children:f+1}),t.jsx("div",{className:"text-gray-300 text-sm leading-relaxed",children:y})]},f))}),t.jsx("div",{className:"grid xl:grid-cols-2 gap-x-4",children:x.dayTabs.map((y,f)=>t.jsx(En,{label:y.l,tab:y.t},f))})]}),t.jsxs("div",{children:[t.jsx("div",{className:"text-gray-500 text-[10px] font-bold tracking-[2px] mb-2 ml-0.5",children:"TODAY'S 40-MINUTE SESSION"}),t.jsx("div",{className:"space-y-2",children:x.blocks.map((y,f)=>{const k=P.includes(f);return t.jsxs("button",{onClick:()=>h(f),className:`w-full flex gap-3 items-start text-left rounded-xl p-3 border transition-colors ${k?"bg-gray-800/50 border-amber-500/40":"bg-gray-800 border-gray-700 hover:border-gray-600"}`,children:[t.jsx("div",{className:`rounded-lg flex-shrink-0 mt-0.5 grid place-items-center border-2 text-sm font-extrabold ${k?"bg-amber-500 border-amber-500 text-stone-900":"border-gray-600 text-transparent"}`,style:{width:22,height:22},children:"✓"}),t.jsxs("div",{children:[t.jsxs("div",{className:"text-sm font-bold text-white",children:[y.n," ",t.jsxs("span",{className:"text-amber-400 font-semibold",children:["· ",y.m," min"]})]}),t.jsx("div",{className:`text-sm mt-0.5 leading-snug ${k?"text-gray-500 line-through":"text-gray-400"}`,children:y.d})]})]},f)})})]}),x.chordChart&&t.jsxs("div",{className:"bg-gray-800 rounded-2xl p-4",children:[t.jsx("div",{className:"text-gray-500 text-[10px] font-bold tracking-[2px] mb-1",children:"THIS WEEK'S CHORDS"}),t.jsx(En,{label:x.chordChart.l,tab:x.chordChart.t}),t.jsx(m1,{})]}),t.jsx("button",{onClick:g,className:`w-full py-3.5 rounded-xl font-extrabold text-[15px] transition-colors ${I?"bg-gray-700 text-gray-300":"bg-rose-500 hover:bg-rose-400 text-rose-50"}`,children:I?"✓ Day complete — tap to undo":"Mark day complete"}),t.jsxs("div",{children:[t.jsxs("div",{className:"text-gray-500 text-[10px] font-bold tracking-[2px] mb-2",children:["PRACTICE NOTES — DAY ",a]}),t.jsx("textarea",{defaultValue:e.notes[a]||"",onBlur:y=>C(y.target.value),placeholder:"What clicked? What fought back?",className:"w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-gray-100 text-sm resize-y min-h-[70px]"},a)]})]}),t.jsxs("div",{className:"space-y-4 min-w-0",children:[t.jsx("div",{children:t.jsxs("button",{onClick:()=>m(y=>!y),className:"w-full flex items-center justify-between px-1 py-2 text-left",children:[t.jsx("span",{className:"text-gray-400 text-[10px] font-bold tracking-[2px]",children:"OPTIONS"}),t.jsx(mt,{size:16,className:`text-gray-400 transition-transform ${d?"rotate-180":""}`})]})}),d&&t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"bg-gray-800 rounded-2xl p-4 space-y-3",children:[t.jsxs("div",{className:"flex items-center justify-between",children:[t.jsx("h3",{className:"text-white font-semibold",children:"Tab playback"}),t.jsx("span",{className:"text-gray-500 text-xs",children:"every ▶ Play"})]}),t.jsxs("div",{className:"flex items-center gap-2",children:[t.jsx("span",{className:"text-gray-400 text-xs w-16 flex-shrink-0",children:"Loops"}),[1,3,5,64].map(y=>t.jsx("button",{onClick:()=>i(f=>({...f,loops:y})),className:`px-2.5 py-1 rounded text-xs font-medium ${s.loops===y?"bg-teal-600 text-white":"bg-gray-700 text-gray-300 hover:bg-gray-600"}`,children:y===64?"∞":y},y))]}),t.jsxs("div",{className:"flex items-center gap-2",children:[t.jsx("span",{className:"text-gray-400 text-xs w-16 flex-shrink-0",children:"Click"}),t.jsx("button",{onClick:()=>i(y=>({...y,click:!y.click})),className:`px-2.5 py-1 rounded text-xs font-medium ${s.click?"bg-teal-600 text-white":"bg-gray-700 text-gray-300 hover:bg-gray-600"}`,children:s.click?"On · beat":"Off"})]}),t.jsxs("div",{className:"flex items-center gap-2",children:[t.jsx("span",{className:"text-gray-400 text-xs w-16 flex-shrink-0",children:"Count-in"}),t.jsx("button",{onClick:()=>i(y=>({...y,countIn:!y.countIn})),className:`px-2.5 py-1 rounded text-xs font-medium ${s.countIn?"bg-teal-600 text-white":"bg-gray-700 text-gray-300 hover:bg-gray-600"}`,children:s.countIn?"On · 1 bar":"Off"})]}),t.jsxs("div",{className:"flex items-center gap-2",children:[t.jsx("span",{className:"text-gray-400 text-xs w-16 flex-shrink-0",children:"Speed up"}),[[0,"Off"],[5,"+5/loop"],[10,"+10/loop"]].map(([y,f])=>t.jsx("button",{onClick:()=>i(k=>({...k,tempoStep:y})),className:`px-2.5 py-1 rounded text-xs font-medium ${s.tempoStep===y?"bg-teal-600 text-white":"bg-gray-700 text-gray-300 hover:bg-gray-600"}`,children:f},y))]}),s.tempoStep>0&&s.loops===1&&t.jsx("p",{className:"text-gray-500 text-[11px]",children:"Tip: set Loops above 1 for the tempo trainer to ramp."})]}),t.jsx(Rr,{defaultBpm:70}),t.jsx(Pi,{})]}),t.jsxs("div",{className:"flex gap-2",children:[t.jsxs("div",{className:"flex-1 bg-gray-800 border border-gray-700 rounded-xl py-2.5 text-center",children:[t.jsx("div",{className:"text-amber-400 text-lg font-bold",style:{fontFamily:"ui-serif, Georgia, serif"},children:e.completed.length}),t.jsx("div",{className:"text-gray-500 text-[10px] uppercase tracking-wide mt-0.5",children:"Days done"})]}),t.jsxs("div",{className:"flex-1 bg-gray-800 border border-gray-700 rounded-xl py-2.5 text-center",children:[t.jsxs("div",{className:"text-amber-400 text-lg font-bold",style:{fontFamily:"ui-serif, Georgia, serif"},children:[B," / 30"]}),t.jsx("div",{className:"text-gray-500 text-[10px] uppercase tracking-wide mt-0.5",children:"This phase"})]}),t.jsxs("div",{className:"flex-1 bg-gray-800 border border-gray-700 rounded-xl py-2.5 text-center",children:[t.jsx("div",{className:"text-amber-400 text-lg font-bold",style:{fontFamily:"ui-serif, Georgia, serif"},children:"40 min"}),t.jsx("div",{className:"text-gray-500 text-[10px] uppercase tracking-wide mt-0.5",children:"Session"})]})]}),t.jsxs("div",{className:"text-center pt-1",children:[t.jsx("button",{onClick:v,className:"border border-gray-700 rounded-lg px-3 py-1.5 text-[11px] text-gray-400 mx-1",children:"Export progress"}),t.jsx("button",{onClick:u,className:"border border-gray-700 rounded-lg px-3 py-1.5 text-[11px] text-gray-400 mx-1",children:"Import progress"})]}),t.jsx("div",{className:"text-center text-xs text-gray-600 italic pt-2",style:{fontFamily:"ui-serif, Georgia, serif"},children:'"Once in a while you get shown the light…"'})]})]})]})})}const ga=98,M1={l:"The five open chords — this month's home base (x = don't play that string)",t:`      G   C   D   Em  Am
e|----3---0---2---0---0--
B|----0---1---3---0---1--
G|----0---0---2---0---2--
D|----0---2---0---2---2--
A|----2---3---x---2---0--
E|----3---x---x---0---x--`},D1={l:"F major barre — index flat across fret 1, thumb low behind the neck",t:`e|----1--  (index barre)
B|----1--  (index barre)
G|----2--  (middle)
D|----3--  (ring)
A|----3--  (pinky)
E|----1--  (index barre)`},Wd={l:"The three strum patterns (D = down, U = up; keep the arm moving on the &s you skip)",t:`count:        1  &  2  &  3  &  4  &
1 Anchor      D     D     D     D
2 Workhorse   D     D  U     U  D  U
3 Pushed      D     D  U  D  U  D  U

Start every pattern on one chord until it is boring,
then take it across changes.`},Zt={l:"The reference progression — your weekly tempo test (one bar each, pattern 2)",t:"| G . . . | D . . . | Em . . . | C . . . |  (repeat)"},el={l:"12-bar blues in G — the recovery playground (1 bar = 4 beats)",t:`| G . . . | G . . . | G . . . | G . . . |
| C . . . | C . . . | G . . . | G . . . |
| D . . . | C . . . | G . . . | D . . . |
bars 1-4: I chord   bars 5-8: IV then I   bars 9-12: V-IV-I turnaround`},be=e=>({f:"Assessment Day",h:["No normal practice today — open the Assessment tab and take the week "+e+" assessment.","Record your take first, one attempt, no warm-up run. Grade honestly.","Read the injected focus it produces — that list is tomorrow's warm-up."],assessment:!0}),SP=[{w:0,t:"Placement",lesson:{p:["This week finds your honest starting point. Nothing is pass/fail in spirit — the week-0 assessment routes the next two weeks, nothing more. Play everything, note what fights back, and resist the urge to practice for the test.","One habit starts now and never leaves: the string-by-string tone check. Form a chord, then pluck each string alone and listen. Buzz means more fingertip pressure or move closer behind the fret; a dead string means another finger is leaning on it — arch more."],tabs:[M1],terms:[["Tone check","Pluck each string of a held chord one at a time, listening for buzz or mutes"],["Change sprint","One minute of switching between two chords, counting clean landings"],["BPM","Beats per minute — the metronome number"]]},days:[{f:"Meet the five chords",h:["Form G, C, D, Em, Am from the chart, one at a time — no strumming yet.","Tone check each: pluck every string, fix what buzzes, hold 3 seconds, release, repeat 5×.","Finish with one slow strum of each chord that rings."]},{f:"Change drill baseline",h:["One-minute change sprint G→C: count clean landings, write the number down.","Same for G→D and C→D.","These three numbers are your baseline — they only go up from here."]},{f:"Meet the click",h:["Metronome at 60. Strum G on every click for one minute — just downstrokes.","Do the same on C and Em. Drifting is normal; noticing the drift is the skill.","Last round: close your eyes for the middle 20 seconds."]},{f:"F barre trial",h:["Lay your index flat across fret 1, thumb low behind the neck. Squeeze and strum — count how many strings sound.","Add middle, ring, pinky per the chart. Count again.","Three minutes total, then shake your hand out. This is a trial, not a verdict."]},{f:"First mini-songs",h:["Loop G–C–D, 8 slow beats each, around and around.","Loop Em–C–G–D the same way — that progression is half of pop music.","Keep changes slow enough to land clean. Smooth now beats fast later."]},{f:"Placement dress rehearsal",h:["Run tomorrow's four criteria informally: tone-check the five chords, one G→C sprint, one minute on the click, one F barre attempt.","No grading today — just note which one feels shakiest.","Give the shakiest one five extra minutes."]},be(0)]},{w:1,t:"Open chords & the click",lesson:{p:["Two things matter this week: chords that ring on demand, and a right hand that agrees with the clock. Strumming pattern 2 (the workhorse) enters — it fits nearly every song you might pick next week.","Start listening for set-song candidates this week. You want three songs you love enough to play five hundred times: mostly 3–4 open chords, singable, and at most one that scares you a little."],tabs:[Wd,Zt],terms:[["Pattern 2 (workhorse)","D-D U-U D U — the campfire strum that fits almost everything"],["Reference progression","G–D–Em–C, one bar each — the fixed loop your weekly tempo test measures"]]},days:[{f:"Tone work on the weak chords",h:["Yesterday's assessment named your weak chords — give each 5 minutes of tone checks.","Then one-minute change sprints pairing each weak chord with G.","End with the reference progression, slow, all four chords ringing."]},{f:"Change sprints toward 30",h:["Three one-minute sprints: G→C, C→D, G→Em. Log the best number.","On the slowest pair: watch your fretting hand — which finger arrives last? Lead with that finger 10 changes in a row.","One pass of the reference progression at 60 BPM."]},{f:"The workhorse pattern",h:['Pattern 2 on G alone, metronome 60, two minutes straight. Say it out loud: "down, down-up, up-down-up."',"Same on Em. Keep the arm swinging through the skipped beats.","Speed is not the goal — an unbroken two minutes is."]},{f:"Pattern across changes",h:["Pattern 2 on G for one bar, then C for one bar. The change happens during the last up-strum — start moving early.","Extend to the full reference progression, one bar each.","Three clean loops at 60 BPM ends the day."]},{f:"The minor chords",h:["Em and Am get the spotlight: tone check, then Em→Am sprints.","Loop Am–C–G–D with pattern 2 — hear how the minor start changes the mood.","One clean pass of the reference progression, eyes closed on the changes."]},{f:"Two minutes, no stopping",h:["The week's bar: pattern 2, steady at 60 BPM, for two unbroken minutes on one chord. Run it.","If it broke, rest and run it again — twice more max.","Then reference progression loops until the timer says stop."]},be(1)]},{w:2,t:"Pick the set",lesson:{p:["This is the most consequential week of the program: you choose the three songs you will play on gig night. Pick with your ears and your honesty — two songs that feel easy, one reach. Mostly open chords. Songs you can imagine singing or humming in front of strangers.","Once chosen, add them to My Set in the Songbook tab with a target tempo. Song 1 — the easiest — starts work immediately. A good-enough set practiced for eleven weeks beats a perfect set postponed. And if a song fights your voice, a capo is the honest fix — move it up until singing feels easy, and note the fret in My Set."],tabs:[Zt],terms:[["Chunking","Practicing a song 4 bars at a time until each chunk is boring, then chaining chunks"],["Target tempo","The BPM the real song sits at — your percentages all measure against this"]]},days:[{f:"Shortlist six candidates",h:["List six songs you'd be proud to play. For each, look up the chords — cross off anything needing more than one barre shape.","Play the chord loop of the top three, slow, pattern 2.","Sleep on it. Tomorrow you commit."]},{f:"Commit to three",h:["Pick the three. Write each song's chords and target tempo in My Set (Songbook tab).","Order them: song 1 = easiest, song 3 = the reach.","Play each song's chord loop once, slow — say hello to the next eleven weeks."]},{f:"Song 1: the verse",h:["Write out the verse progression. Loop it in 4-bar chunks at 50% tempo, pattern 2.","Tone check any chord that buzzes under pressure of the change.","Finish with two full verse loops, slow and clean."]},{f:"Chunk and chain",h:["Each verse chunk at 50% until it bores you, then chain pairs of chunks.","The change sprint habit continues: two sprints on song 1's hardest chord pair.","One full verse at 60% to close."]},{f:"Changes toward 35",h:["Three one-minute sprints on song 1's chord pairs. Log the best.","Reference progression tempo ladder: 60 → 65 → 70, two loops each, stop where it frays.","One relaxed verse loop to shake it off."]},{f:"Verse on the clock",h:["The week's bar: song 1 verse with the metronome at 60% target tempo, no stopping. Run it.","Mark the bar where it wobbles; loop just that bar 10×.","Run the verse once more. Better is enough."]},be(2)]},{w:3,t:"Chaining sections",lesson:{p:["Song 1 grows from sections into a form this week: verse into chorus without a seam. The secret is that transitions are their own 2-bar song — the last bar of one section into the first bar of the next. Drill the seam, not the sections.","Dynamics enter too. A performance is loud and soft on purpose; practice volume as a choice, not an accident. And if your set needs the F barre, its daily three minutes start now — if not, skip those steps guilt-free."],tabs:[D1,Wd],terms:[["The seam","The two-bar transition between sections — where songs actually fall apart"],["Dynamics","Deliberate volume: soft verses, big choruses"]]},days:[{f:"Song 1: the chorus",h:["Chunk the chorus at 50% like you did the verse.","Tone check under pressure: the chorus's hardest chord gets 10 slow changes.","Two full chorus loops, clean."]},{f:"Drill the seam",h:["Play only the last bar of the verse into the first bar of the chorus, 10× slow.","Then the chorus-back-to-verse seam, 10×.","Chain verse → chorus → verse once at 60%."]},{f:"Chain at 70",h:["Full verse + chorus chained at 70% target tempo, three attempts.","Between attempts: 5 slow reps of whichever seam broke.","F barre (if your set needs it): 3 minutes of tone work, count the ringing strings."]},{f:"The volume ladder",h:["On one chord, pattern 2: 4 bars soft → 4 medium → 4 loud → back down. Twice.","Play the verse soft and the chorus loud, 60% tempo.","Notice: loud comes from arm speed, not a death grip.","New in Licks & Picking: the boom-chick. Two minutes on G — bass note, then strum."]},{f:"Barre plus chain",h:["F barre 3 minutes: barre-only squeeze holds, then full shape, string count each time.","Verse + chorus chain at 70%, dynamics on.","One change sprint on the song's hardest pair — the habit continues."]},{f:"Record the chain",h:["Phone up: record verse + chorus at 70%, one take.","Watch it. Write one sentence about the seam and one about your strumming arm.","Run the chain once more, fixing only the one thing you named."]},be(3)]},{w:4,t:"Foundation exit",lesson:{p:["Gate week. Pass the week-4 assessment and the next five weeks are pure song work. The bar: changes at 40+ per minute, one full song top-to-bottom at 70% with the sheet, and a 70+ tempo test. None of it requires brilliance — it requires this week's reps.","The full-song run has a rule that now applies forever: no stopping. A flub costs one bar, not the song. Train the reflex of continuing — it is the single most stage-relevant skill in this program."],tabs:[Zt,el],terms:[["Trouble bars","The 2–3 specific bars where a song breaks — drill these, not the whole song"],["No-stopping rule","From now on, full runs continue through mistakes. Always."]]},days:[{f:"Push the sprints",h:["Five one-minute change sprints across your pairs — chase 40.","Rest a full minute between sprints; sloppy reps teach sloppy changes.","One verse + chorus chain at 70% to remember what it's for."]},{f:"Map the trouble bars",h:["Play song 1 top-to-bottom at 60%, sheet up, no stopping — and mark every bar that wobbles.","Drill only the marked bars at 50%, 10× each.","Run the full form again. Compare wobble count."]},{f:"Full song at 70",h:["Three full runs at 70%, sheet allowed, no stopping. Log stumbles per run.","Between runs: 5 reps on the worst bar only.","Best run of the three is your benchmark — write its stumble count down."]},{f:"Tempo ladder day",h:["Reference progression: 60 → 65 → 70 → 75, two clean loops each rung. Stop where it frays; that number goes in Saturday's assessment.","One full song run at 70% with dynamics.","12-bar blues in G, twice around — pure fun, pattern 2."]},{f:"Dynamics pass",h:["Full song at 70%: verses soft, chorus loud, on purpose.","Trouble bars: 5 reps each, now with the dynamic they'll wear in the song.","Close quiet: two minutes on the G arpeggio fingerpicking pattern (Licks & Picking) — even and unhurried."]},{f:"Mock exit assessment",h:["Run the week-4 criteria cold: sprints, full song at 70%, tempo test. No retries.","Whatever failed gets 10 focused minutes.","Then stop. Tomorrow is the real one — arrive fresh."]},be(4)]},{w:5,t:"Song 1 to memory",lesson:{p:["The sheet starts going away. Memory is built by retrieval, not rereading: play from memory until stuck, peek once, then restart the section. The struggle before the peek is the memorization — don't shortcut it.","Jam Along sessions start this week, twice a week, and count toward the assessment. Improvising over something keeps time moving while your hands solve problems — exactly the stage skill the coffee shop will ask of you."],tabs:[el],terms:[["Retrieval","Pulling the next chord from memory before your eyes can find it on the sheet"],["Face-down rule","The sheet stays in the room but face-down — peeking is allowed, but it costs a section restart"]]},days:[{f:"Memorize the verse",h:["Play the verse from memory, sheet face-down. Stuck? Peek once, restart the verse.","Repeat until one full verse happens with no peek.","Close with a full-form run at 80%, sheet up."]},{f:"Memorize the rest",h:["Same retrieval routine on the chorus, then any bridge/outro.","Chain verse + chorus from memory, slow.","Full form at 80% with sheet — keep the tempo honest."]},{f:"Jam Along #1",h:["Twenty minutes over the 12-bar blues vamp (or a Jam Along video): comp chords, keep the groove, no stopping.","Deliberately flub once per chorus and play through it.","Sneak this week's campfire walkup (Licks & Picking) into the comping once per chorus.","One memory run of song 1's verse + chorus."]},{f:"Memory under tempo",h:["Verse + chorus from memory at 70%, three attempts.","Any section that needed a peek gets the retrieval routine again.","Full form at 80% with sheet, dynamics on."]},{f:"Jam Along #2",h:["Twenty minutes of jam — new key or new vamp if the last one got comfortable.","Practice the recovery face: flub, breathe, keep strumming. Nobody watching can tell.","One face-down memory run: how far through the form can you get?"]},{f:"The week's bar",h:["Run it: full form at 80% with sheet, then verse + chorus from memory, face-down.","A peek means restart the section, not the song.","End on a win: play the section that feels best, once, loud."]},be(5)]},{w:6,t:"Standing up",lesson:{p:["The strap changes everything — the neck angle, your wrist, where your eyes can't reach. That's why standing starts now, seven weeks before the gig, not two. Set the strap so the guitar sits at the same height standing as it does seated, then practice standing every day this week, even drills.","Song 2 enters with its sheet, and the recording habit becomes weekly: one take, watched back, one sentence written. You will hate the first recording. Record it anyway — week 12 you will be glad to have it."],tabs:[],terms:[["Strap height","Same guitar position seated and standing — vanity lowers it, wisdom doesn't"],["One-take","A run recorded on the first attempt — the honest measurement"]]},days:[{f:"Strap day",h:["Set strap height seated, then stand — the guitar shouldn't move.","Standing: tone checks, then the reference progression at 70.","Song 1 verse + chorus from memory, standing, slow. Feel what changed."]},{f:"Song 1 standing",h:["Full song from memory, standing, at 80% — three attempts, no stopping.","Seams that broke get 5 slow reps, still standing.","Sit down only for the day's last run — notice how easy it suddenly is."]},{f:"Song 2 enters",h:["Map song 2's form on paper: sections, chords, target tempo (into My Set).","Chunk the verse at 50%, sheet up.","Song 1 maintenance: one memory run, standing."]},{f:"Song 2 sections",h:["Verse chunks chained at 60%, then chorus chunks at 50%.","Drill song 2's hardest chord pair — two sprints.","Song 1: one-take memory run, standing. Log stumbles."]},{f:"Song 2 at 70",h:["Song 2 full form with sheet at 70%, twice.","The seam drill: song 2's verse→chorus transition 10×.","Song 1 stays warm: verse + chorus, standing, memory.","Three minutes on the Travis seed (Licks & Picking) — the thumb keeps time, the fingers decorate."]},{f:"Record the take",h:["Phone up: song 1, from memory, standing, 90% — one take. Watch it back.","Write one sentence: what would a stranger notice first?","Ten minutes on exactly that, then stop."]},be(6)]},{w:7,t:"Mistake practice",lesson:{p:["On stage the song keeps going whether you do or not — so this week you train the keep-going reflex directly. The planted-flub drill: mid-run, deliberately mute a bar or drop a change, then count beats until you're back in. The goal is a recovery that costs one bar and shows nothing on your face.","Song 2 races toward memory using the same retrieval routine as song 1. Song 1 drops to maintenance: one one-take run per day, first thing, no retries — the honest daily measurement."],tabs:[el],terms:[["Planted flub","A deliberate mistake inserted mid-run to train recovery"],["Maintenance run","One daily one-take pass to keep a finished song warm"]]},days:[{f:"Song 2 retrieval",h:["Verse + chorus from memory, face-down rule, until one clean pass each.","Full form at 70% with sheet.","Song 1 maintenance: one-take, standing."]},{f:"First planted flubs",h:["Vamp or metronome on. Song 1 from memory — flub on purpose once per section. Count beats to recovery.","Target: back in within 4 beats, face neutral.","Song 2: memory run at 70%."]},{f:"Song 2 at 80",h:["Song 2 from memory at 80%, three attempts, no stopping.","Trouble bars at 60%, 5 reps each.","Song 1 maintenance one-take."]},{f:"Flub day",h:["Both songs, one run each with two planted flubs — recovery within a bar.","Then one honest run each, no plants; play through whatever real flubs come.","Learn the Em pocket fill (Licks & Picking); drop it into the last bar before a change, twice.","12-bar blues, two relaxed rounds."]},{f:"Song 2 full memory",h:["Full song 2 from memory at 80%, standing, twice.","Retrieval routine on any section that needed a peek.","Song 1 maintenance one-take."]},{f:"Back to back",h:["Song 1 then song 2, memory, standing, with a 30-second breather between — like a tiny set.","Log total stumbles; no restarts allowed.","One planted-flub pass on whichever song felt shakier."]},be(7)]},{w:8,t:"Third song in",lesson:{p:["Three songs alive at once is the real workload of a performer, and it starts now. Song 3 — the reach — gets the fresh first fifteen minutes of every session. Songs 1 and 2 move to maintenance one-takes and standing runs.","If song 3 is truly fighting you, this is the last cheap moment to swap it for something kinder. A reach song should stretch you, not break the set. Decide by Friday; after this week the set is locked."],tabs:[],terms:[["Set lock","After week 8, the three songs are final — polish replaces choice"]]},days:[{f:"Song 3 enters",h:["Map song 3's form, chords, target tempo (into My Set).","Chunk its verse at 50%, sheet up. Meet its hardest chord honestly.","Maintenance: song 1 one-take."]},{f:"Song 3 sections",h:["Verse chunks chained at 60%; chorus chunked at 50%.","Two change sprints on song 3's hardest pair.","Maintenance: song 2 one-take, standing."]},{f:"Song 2 stands",h:["Song 2 from memory, standing, at 90% — three attempts.","Its worst seam: 5 slow reps.","Song 3: one slow full pass with sheet."]},{f:"Song 3 full form",h:["Song 3 top-to-bottom with sheet at 70%, twice, no stopping.","Trouble bars at 50%, 10× each.","Maintenance: song 1 one-take."]},{f:"Flub drill, three songs",h:["One planted-flub run per song (sheet OK for song 3).","Recovery within 4 beats, face neutral — that's the rep that counts.","The classic E turnaround is unlocked (Licks & Picking) — learn its first half, slow.","Decision check: is song 3 the right reach? Commit or swap today."]},{f:"Touch all three",h:["One session, three songs: song 3 with sheet at 70%, songs 1–2 from memory standing.","30-second breathers between — a rough draft of the set.","Log stumbles per song; the worst bar gets tomorrow's first five minutes... after the assessment."]},be(8)]},{w:9,t:"Repertoire exit",lesson:{p:["The second gate. The bar for every song: from memory, standing, at 90% tempo, two stumbles or fewer, zero restarts. Song 3 may keep its sheet one more week — but say so out loud when you grade yourself.","The method this week is one-take runs and stumble-bar surgery: run a song once cold, then drill only the bars that broke, at 70%, then run it again. Whole-song repetition is comfort food; targeted reps are progress."],tabs:[],terms:[["Stumble-bar surgery","Cold run → drill only what broke → run again"]]},days:[{f:"Song 1 surgery",h:["One-take: song 1, memory, standing, 90%. Log the stumble bars.","Drill each stumble bar at 70%, 8 reps.","Run it again. Log the difference."]},{f:"Song 2 surgery",h:["Same routine: one-take, drill the breaks, re-run.","Then one planted-flub pass — recovery stays sharp.","Song 1: single maintenance one-take."]},{f:"Song 3 surgery",h:["One-take with sheet at 90% (or memory if it's there). Log, drill, re-run.","Retrieval routine on song 3's weakest section.","Maintenance: song 2 one-take."]},{f:"The 70% deep clean",h:["Every logged stumble bar across all three songs: 8 reps each at 70%.","Boring is the point — boring bars don't break on stage.","One relaxed 12-bar blues to reset the ears."]},{f:"Three one-takes",h:["All three songs, one take each, memory, standing, 90%, breathers between.","Total stumble count across the set — write it down.","Nothing else. Fresh hands tomorrow."]},{f:"Mock exit",h:["Run the week-9 criteria cold, one song at a time.","Ten focused minutes on the worst result.","Stop early. The real assessment is tomorrow."]},be(9)]},{w:10,t:"The set exists",lesson:{p:["Stop practicing songs; start practicing the set. From today the unit of practice is all three songs back-to-back, with the between-song moments included — tuning glances, a sip of water, one spoken sentence. Those gaps are part of the performance and they only feel natural if they're rehearsed.","Time every run with the Set Runner (Songbook tab). Set length matters at a coffee shop: know your minutes. Rushed tempo is the usual thief — the count-in habit fixes it: two silent bars of the song's tempo before the first strum."],tabs:[],terms:[["The gaps","Between-song moments — scripted, rehearsed, part of the set"],["Count-in","Two silent bars at the song's tempo before you start — kills the rushed open"]]},days:[{f:"First set run",h:["Set order decided. Full set back-to-back, seated OK, sheets OK for song 3.","Time it with the Set Runner. No restarts — the chain matters more than any link.","Note which gap felt longest; that's where a sentence goes."]},{f:"Timed and talked",h:["Script one or two sentences per gap: a title, a thank-you. Write them down.","Full set run, saying the lines out loud, even alone. Yes, it's awkward. Twice is less awkward.","If your set has vocals: sing (or at least hum) every run from now on — quiet is fine, silent is not.","Log time + stumbles in the Set Runner."]},{f:"Find the drifter",h:["Time each song separately. Compare against target — one of them is drifting.","The drifter gets count-in practice: two silent bars, then in, three times.","Full set run with count-ins."]},{f:"Standing set",h:["Full set standing, memory (song 3 sheet OK), lines spoken, timed.","One planted flub somewhere in the middle song — recover, continue.","Water between songs — practice even the sip."]},{f:"Set run + surgery",h:["Full timed run, then 8 reps on the day's worst bar.","Second full run. Better is the pattern now.","Check total time against plan — within 25%?"]},{f:"The week's bar",h:["One full set run exactly as the assessment wants: back-to-back, timed, lines spoken.","Log it honestly in the Set Runner.","Then one favorite song, once, purely for fun. Remember fun?"]},be(10)]},{w:11,t:"Stage simulation",lesson:{p:["Every run this week is a performance: standing, from memory, announced out loud, phone recording, no restarts under any circumstances. The camera is a stand-in audience — treat the red dot like eyes. If the open mic is on a signup, this week you visit as a spectator or lock the date.","Restarting is now the one banned move. A restart on stage is the only mistake an audience can't forgive, because it turns one flub into a story. Flub, breathe, keep going — you've trained this for six weeks."],tabs:[],terms:[["Sim run","Full set: standing, memory, announced, recorded, timed, no restarts"]]},days:[{f:"Sim run #1",h:["The full protocol: phone recording, stand, announce yourself and each song, play the set, timed.","No restarts. Whatever happens, it happens forward.","Don't watch the recording today."]},{f:"Watch and list",h:["Watch yesterday's recording. Write the top-3 list: the three moments a stranger would notice.","Drill exactly those three, 10 minutes each.","One song — the middle one — as a mini sim."]},{f:"Sim run #2",h:["Full protocol again.","Goal vs sim #1: fewer stumbles OR smoother gaps — pick one and win it.","Log in the Set Runner."]},{f:"The venue",h:["Visit the open mic as a spectator, or nail down the date and signup rules today.","Watch how performers get on and off stage — that's a part nobody practices.","Light day: one relaxed set run, seated, no recording."]},{f:"Sim run #3",h:["Full protocol. The recordings should be getting boring — boring is the goal.","Ten minutes on the top-3 list (it may have changed).","Early finish. Hands fresh."]},{f:"Sim run #4",h:["Full protocol, best-effort — this one feeds tomorrow's assessment.","Count total stumbles; four or fewer across the set is the bar.","Watch only the gaps back: are the lines landing?"]},be(11)]},{w:12,t:"Dry run",lesson:{p:['A real audience this week — one person is plenty: a friend, a partner, a neighbor bribed with coffee. If truly nobody is available, a phone on a tripod introduced out loud as "everyone, thanks for coming" is a serviceable stand-in. The nerves the dry run produces are the lesson, not the verdict.',"Everything else tapers toward precision: count-ins to lock starting tempos, set length inside 20% of plan, recovery on every stumble. You are not building anything new anymore — you are letting what you built settle."],tabs:[],terms:[["Dry run","The full set for a real audience of at least one, before the one that counts"]]},days:[{f:"Warm sim",h:["One sim run, full protocol, relaxed.","Count-ins before every song — two silent bars.","Confirm the dry-run audience and time for this week."]},{f:"Dry run #1",h:["Play the set for your person. Announce songs. No restarts, no apologies mid-set.",`Afterward ask them one question only: "what's one moment you remember?"`,"Write down how the nerves felt in bar one vs. the last song."]},{f:"Debrief drills",h:["Whatever wobbled in the dry run: stumble-bar surgery, 8 reps each at 70%.","One planted-flub pass on the song where nerves hit hardest.","Light set run, seated, sheets allowed — recovery day."]},{f:"Tempo lock",h:["Count-in practice: each song started 3× at exact tempo, checked against the metronome.","Full set run with count-ins, timed — inside 20% of plan?","Ten minutes on the top-3 list."]},{f:"Dry run #2",h:["Second audience run — same person is fine, a new person is better.","Goal: fewer stumbles than dry run #1 and every recovery invisible.","Thank your audience. You'll want them at the gig."]},{f:"Light and easy",h:["One relaxed set run, 90% tempo, seated, purely to feel smooth.","Nothing else. No surgery, no lists.","Sleep well — tomorrow grades the week."]},be(12)]},{w:13,t:"Gig week — taper",lesson:{p:["Nothing new this week — no new strums, no tweaks to the set, no brave ideas. Short clean runs at 90%, logistics, and sleep. The training is done; taper lets your hands consolidate it. One full-protocol run early in the week, then increasingly light touches.","The set card is standard practice, not cheating: song order and your between-song lines on one index card at your feet. Pack the gig bag early — tuner, picks, capo, strap, water — and know your arrival time. On the night: count yourself in, play the set you've played a hundred times, and let the room have it."],tabs:[],terms:[["Taper","Reduced load before performance — fresh beats sharp"],["Set card","Song order + gap lines on one card at your feet"]]},days:[{f:"The clean run",h:["One full-protocol sim: standing, recorded, ≤2 stumbles, no restarts. This is the week's big rep.","If it went sideways, one more tomorrow — not today.","Write the set card."]},{f:"Logistics",h:["Pack the bag: tuner, three picks, capo, strap, water, set card. By the door.","Confirm signup time, arrival time, how many songs the slot allows.","One light set run at 90%, seated."]},{f:"Short and smooth",h:["Set run at 90%, standing, no recording — just smoothness.","Count-ins on all three songs.","Fifteen minutes total playing. Stop while it feels good."]},{f:"Light touch",h:["Play only your favorite of the three, once, for pleasure.","Run the gap lines from the set card, out loud, once.","That's it. Restraint is the practice today."]},{f:"Final run",h:["One clean set run, recorded, 90% tempo. Watch only if it felt good.","Re-check the bag against the list.","Early night."]},{f:"Rest day",h:["Tune the guitar. Play one verse of anything, softly.","Visualize the walk to the stool, the count-in, the first chord of song 1.","Sleep. Tomorrow you play."]},{f:"🎤 GIG NIGHT",h:["Arrive early. Sign up. Watch a couple of acts and clap loudly for them.","On stage: set card down, breathe, two silent bars of count-in, and play song 1 exactly like the hundred times before.","Flubs cost one bar and no face. When it's done — you did the thing. Take the applause; you trained for it too."],assessment:!0}]}],ci=90,zd=40,b1="G – D – Em – C, one bar each, strum pattern: D D DU DU. Raise the metronome until changes fall apart; log the last clean BPM.",Ct=[["clean","Clean chords"],["rhythm","Rhythm steadiness"],["memory","Memory"],["confidence","Confidence"],["recovery","Recovery"]],Ho=[{name:"Placement",weeks:[0,0]},{name:"Foundation",weeks:[1,4]},{name:"Repertoire",weeks:[5,9]},{name:"Performance",weeks:[10,13]}],vP=e=>Ho.find(n=>e>=n.weeks[0]&&e<=n.weeks[1])||Ho.at(-1),ss=[{week:0,title:"Placement",focus:"Find your honest starting point. Nothing here is pass/fail in spirit — it routes your first two weeks.",criteria:[{id:"w0-open",label:"G, C, D, Em each ring cleanly — pluck all strings one at a time, no buzz or mutes",fix:"Weeks 1–2 lean on open-chord tone work: form, pluck string-by-string, adjust, repeat."},{id:"w0-change",label:"G→C changes, 20 per minute, landing clean",fix:"Daily one-minute change drills (G→C, G→D, C→D) before anything else."},{id:"w0-metro",label:"Strum any chord with the metronome at 60 BPM for one minute without drifting",fix:"Every practice block starts with 2 minutes of single-chord strumming on the click."},{id:"w0-barre",label:"F barre attempt — 4 of 6 strings sound",fix:"Add 3 minutes/day of barre tone work; pick set songs that avoid barre chords for now."}]},{week:1,title:"Open chords & the click",focus:"Clean open chords and a steady right hand. Start listening to candidate set songs.",criteria:[{id:"w1-five",label:"G, C, D, Em, Am all ring cleanly on demand",fix:"String-by-string tone check on the weak chords, 5 min/day."},{id:"w1-change",label:"Chord changes at 30/min (any pair from the five)",fix:"One-minute change sprints, 3 rounds/day, on the slowest pair."},{id:"w1-strum",label:"Pattern D-D-DU-DU steady at 60 BPM for 2 minutes",fix:"Strum on a muted chord along the click, 2 min before each session."}]},{week:2,title:"Pick the set",focus:"Choose your 3 songs this week — you will live with them for 11 weeks. Two easy, one reach.",criteria:[{id:"w2-songs",label:"Three set songs chosen and added to My Set",fix:"Decide now with what you have — a good-enough set practiced beats a perfect set postponed."},{id:"w2-change",label:"Chord changes at 35/min",fix:"Keep the daily change sprints; slow the metronome 10% and rebuild."},{id:"w2-verse",label:"Song 1 verse with the metronome at 60% of target tempo, no stopping",fix:"Loop the verse in 4-bar chunks at 50% until each chunk is boring, then chain."}]},{week:3,title:"Chaining sections",focus:"Song 1 grows from sections into a form. Dynamics enter: not every strum at the same volume.",criteria:[{id:"w3-chain",label:"Song 1 verse + chorus chained at 70% tempo, no stopping",fix:"Practice only the transition bar — the last bar of verse into the first of chorus — 10x slow."},{id:"w3-dyn",label:"One pattern played soft, medium, loud on cue",fix:"Volume ladder drill: 4 bars soft → 4 medium → 4 loud, on one chord."},{id:"w3-barre",label:"F barre: 5+ strings clean, 3-second holds (skip if your set avoids barres)",fix:"3 min/day barre tone work; check thumb position — low, behind the neck."}]},{week:4,title:"Foundation exit",focus:"The gate to song work. Pass this and the next five weeks are pure repertoire.",criteria:[{id:"w4-change",label:"Chord changes at 40+/min",fix:"Carry the change sprints into next week — they leave the schedule only when this passes."},{id:"w4-full",label:"One full song top-to-bottom at 70% target tempo, no stopping (sheet allowed)",fix:"Map the song's trouble bars, drill only those at 50%, then re-run the form."},{id:"w4-tempo",label:"Tempo test at 70+ BPM clean",fix:"Two extra tempo-ladder rounds per day on the reference progression."}]},{week:5,title:"Song 1 to memory",focus:"The sheet starts going away. Memory is built by retrieval, not rereading — look away first, peek second.",criteria:[{id:"w5-form",label:"Song 1 full form at 80% tempo with sheet",fix:"Slow the full run to 70% and log which bars pull your eyes to the sheet."},{id:"w5-mem",label:"Song 1 verse + chorus from memory (sheet face-down)",fix:"Memorize by section: play from memory until stuck, peek once, restart the section."},{id:"w5-jam",label:"Two Jam Along sessions this week",fix:"Schedule them like appointments — jamming is where recovery skill comes from."},{id:"w5-pick",label:"G arpeggio fingerpicking pattern steady for one minute, thumb on the bass strings",fix:"Two quiet minutes of the pattern at the end of every session — slow enough to be perfectly even."}]},{week:6,title:"Standing up",focus:"Song 1 standing, from memory. The strap changes your angles — earlier than you think it should.",criteria:[{id:"w6-stand",label:"Song 1 from memory, standing, at 90% tempo",fix:"Practice standing every day next week — even drills. The neck angle needs reps."},{id:"w6-two",label:"Song 2 full form with sheet at 70% tempo",fix:"Give song 2 the first 15 minutes of each session while it's newest."},{id:"w6-rec",label:"Recorded one full song 1 take and watched it back",fix:"Record tomorrow's first run — no warm-up take, that's the point."}]},{week:7,title:"Mistake practice",focus:"Recovery becomes a drill. On stage the song keeps going; train that reflex now.",criteria:[{id:"w7-mem2",label:"Song 2 from memory at 80% tempo",fix:"Same retrieval routine as song 1: section from memory, one peek, restart section."},{id:"w7-flub",label:"Play through 3 planted mistakes without stopping (mute a bar, drop a change — keep the groove)",fix:"Vamp player on, deliberately flub once per run, count the beats until you're back."},{id:"w7-one",label:"Song 1 still clean: full memory run, ≤2 stumbles",fix:"Song 1 gets a daily maintenance run — first thing, one take, no retries."}]},{week:8,title:"Third song in",focus:"Song 2 stands up; song 3 enters. Three songs alive at once is the real workload now.",criteria:[{id:"w8-stand2",label:"Song 2 from memory, standing, at 90% tempo",fix:"Alternate days: song 2 standing runs / song 3 section work."},{id:"w8-three",label:"Song 3 full form with sheet at 70% tempo",fix:"Song 3 gets the fresh first 15 minutes; songs 1–2 move to maintenance runs."},{id:"w8-recov",label:"One planted-mistake run per song without stopping",fix:"Keep the flub drill daily — recovery decays fast."},{id:"w8-fill",label:"One fill or walkup dropped into a song mid-run without losing the beat",fix:"Loop the fill over the vamp player until it lands on beat 1 every single time, then re-plant it in the song."}]},{week:9,title:"Repertoire exit",focus:"The gate to performance prep: every song from memory, standing, near tempo.",criteria:[{id:"w9-s1",label:"Song 1: memory, standing, 90% tempo, ≤2 stumbles, no restarts",fix:"Drill only the stumble bars at 70%, then one-take runs."},{id:"w9-s2",label:"Song 2: memory, standing, 90% tempo, ≤2 stumbles, no restarts",fix:"Drill only the stumble bars at 70%, then one-take runs."},{id:"w9-s3",label:"Song 3: memory, standing, 90% tempo, ≤2 stumbles, no restarts",fix:"If song 3 lags, it's allowed a sheet for one more week — but say so out loud."}]},{week:10,title:"The set exists",focus:"Stop practicing songs; start practicing the set. Back-to-back, with the between-song moments.",criteria:[{id:"w10-set",label:"Full 3-song set back-to-back (seated OK), timed",fix:"Run the set daily even if rough — the chain matters more than any link now."},{id:"w10-time",label:"Set length within 25% of plan",fix:"Time each song separately to find the drifter — it's usually rushed tempo."},{id:"w10-talk",label:"Said something between songs — a title, a thank-you — every run",fix:"Script two sentences per gap and say them every run, even alone."}]},{week:11,title:"Stage simulation",focus:"Every run is a performance: standing, announced, recorded, no restarts allowed.",criteria:[{id:"w11-sim",label:"Full set standing, from memory, recorded, ≤4 stumbles total",fix:"Watch the recording, list the top 3 moments, drill only those."},{id:"w11-open",label:"Visited (or picked the date for) the open mic as a spectator",fix:"Go this week — knowing the room removes half the fear."},{id:"w11-norestart",label:"Zero restarts across all set runs this week",fix:"Restarting is the one banned move. Flub, breathe, keep going."}]},{week:12,title:"Dry run",focus:"One real audience — a friend, a partner, a phone on a tripod treated like a person.",criteria:[{id:"w12-dry",label:"Played the full set for a person (or camera-as-audience), ≤3 stumbles",fix:"Do a second dry run — the first one's nerves are the lesson, not the verdict."},{id:"w12-time",label:"Set length within 20% of plan",fix:"Practice with the metronome count-in before each song to lock starting tempos."},{id:"w12-recover",label:"Recovered from every stumble without stopping",fix:"Back to planted-mistake runs, once per song per day."}]},{week:13,title:"Gig week — taper",focus:"Nothing new. Short clean runs, logistics, sleep. You are as ready as the last 12 weeks made you.",criteria:[{id:"w13-run",label:"One clean full-set run this week: standing, recorded, ≤2 stumbles, no restarts",fix:"One more taper run tomorrow at 90% tempo — smoothness over speed."},{id:"w13-gear",label:"Logistics done: tuner, spare picks, capo, strap checked, arrival time known",fix:"Pack the bag tonight and leave it by the door."},{id:"w13-plan",label:"Set order and between-song lines written on one card",fix:"Write the card now — paper on the floor is standard practice, not cheating."}]}],MP=[{week:3,l:"Boom-chick on G — bass note, then strum",t:`e|--------3--------3--
B|--------0--------0--
G|--------0--------0--
D|--------0--------0--
A|--------------------
E|--3--------3--------`,tip:"Thumb-side of the pick hits just the low string (boom), then a light strum (chick). Instantly makes plain strumming sound arranged. Works on any chord — bass note is the chord's root."},{week:4,l:"First fingerpicking — G arpeggio, up and over",t:`e|--------------3---------
B|-----------0-----0------
G|--------0-----------0---
D|-----0-----------------0
A|------------------------
E|--3---------------------`,tip:"Thumb takes the E and D strings, index the G, middle the B, ring the high e. Fingertips, not nails. Slow and perfectly even beats fast and lumpy — this is a texture for quiet verses."},{week:5,l:"The campfire walkup — G to C",t:`e|------------------0--
B|------------------1--
G|------------------0--
D|------------------2--
A|-------0--2-------3--
E|--3------------------`,tip:"Play it in the last bar before the change: bass G, then walk A–B up the A string and land on C on beat 1. The single most useful move in strummed folk/rock — reverse it to walk back down."},{week:6,l:"Travis seed — alternating thumb on C",t:`e|------------------------0--
B|-----------1---------------
G|-----0---------------0-----
D|--------2---------2--------
A|--3------------3-----------
E|---------------------------`,tip:"The thumb alternates A and D strings like a metronome — that's the whole secret of Travis picking. Fingers decorate on the off-beats. When the thumb runs itself, add the pinch."},{week:7,l:"Em pocket fill — open pentatonic",t:`e|------------------------------
B|-----------0--3--0------------
G|--------0-----------0---------
D|--2--------------------2------
A|------------------------------
E|------------------------------`,tip:"Seven notes, ends back on the root. Drop it into the last bar before a chord change — anywhere a song sits on Em or G. A fill that lands on beat 1 is worth more than a whole solo that doesn't."},{week:8,l:"The classic turnaround — E blues",t:`e|--------------------------2--
B|--3---2---1---0-----------0--
G|--------------------------2--
D|--------------------------1--
A|--------------------------2--
E|--0---0---0---0---0----------`,tip:"Low E drones while the B string walks down, landing on B7 — the sound of the last two bars of every blues ever. Learn the first half slow; the B7 lands you back at the top of the form."}],ro=e=>MP.filter(n=>n.week<=e),Ja=e=>MP.find(n=>n.week>e)||null,w1=e=>`${Math.floor(e/60)}:${String(Math.max(0,Math.floor(e%60))).padStart(2,"0")}`;function B1(e,n){const a=[];return e.forEach((r,o)=>{if(r.main&&n.length){const l=Math.max(120,Math.round(r.m*60/n.length));n.forEach((s,i)=>{a.push({block:r,blockIdx:o,label:`${r.n} · ${i+1} of ${n.length}`,text:s,seconds:l,lastOfBlock:i===n.length-1})})}else a.push({block:r,blockIdx:o,label:r.n,text:r.d,seconds:Math.max(120,r.m*60),lastOfBlock:!0})}),a}function k1({blocks:e,steps:n,weekTabs:a,dayLabel:r,onBlockDone:o,onFinishDay:l,onExit:s}){var y;const[i]=S.useState(()=>B1(e,n)),[d,m]=S.useState(0),[x,p]=S.useState(!1),[c,h]=S.useState(((y=i[0])==null?void 0:y.seconds)??0),[g,C]=S.useState(!1),v=S.useRef(g);v.current=g;const u=i[d];S.useEffect(()=>{const f=setInterval(()=>{v.current||h(k=>k-1)},1e3);return()=>clearInterval(f)},[d]);const P=()=>{u.lastOfBlock&&o(u.blockIdx),d+1<i.length?(m(d+1),h(i[d+1].seconds),C(!1),window.scrollTo(0,0)):p(!0)},I=()=>{d!==0&&(m(d-1),h(i[d-1].seconds),C(!1))};if(x)return t.jsxs("div",{className:"max-w-2xl mx-auto bg-gray-800 border border-emerald-600/60 rounded-2xl p-8 text-center space-y-4",children:[t.jsx("div",{className:"text-5xl",children:"🎸"}),t.jsxs("h3",{className:"text-white text-2xl font-bold",style:{fontFamily:"ui-serif, Georgia, serif"},children:["Session done — ",r]}),t.jsx("p",{className:"text-gray-400 text-sm",children:"Every exercise touched. That's the whole job today."}),t.jsx("button",{onClick:l,className:"w-full py-3.5 rounded-xl font-extrabold text-[15px] bg-rose-500 hover:bg-rose-400 text-rose-50",children:"Mark day complete"}),t.jsx("button",{onClick:s,className:"text-gray-500 hover:text-gray-300 text-sm underline",children:"back to the day view"})]});const D=c<=0,B=i.length;return t.jsxs("div",{className:"max-w-2xl mx-auto space-y-4",children:[t.jsxs("div",{className:"flex items-center gap-3",children:[t.jsx("div",{className:"flex-1 flex gap-1",children:i.map((f,k)=>t.jsx("div",{className:`h-1.5 flex-1 rounded-full ${k<d?"bg-teal-500":k===d?"bg-amber-400":"bg-gray-700"}`},k))}),t.jsxs("span",{className:"text-gray-500 text-xs flex-shrink-0",children:[d+1," / ",B]}),t.jsx("button",{onClick:s,className:"text-gray-500 hover:text-gray-300 flex-shrink-0","aria-label":"Exit guided session",children:t.jsx(ct,{size:18})})]}),t.jsxs("div",{className:"bg-gray-800 border border-gray-700 rounded-2xl p-6 space-y-5",children:[t.jsxs("div",{className:"flex items-start justify-between gap-4",children:[t.jsxs("div",{children:[t.jsx("div",{className:"text-teal-400 text-[10px] font-bold tracking-[2px]",children:u.label.toUpperCase()}),t.jsx("div",{className:"text-gray-600 text-[11px] mt-0.5",children:r})]}),t.jsx("div",{className:`text-right flex-shrink-0 font-bold text-3xl tabular-nums ${D?"text-emerald-400":"text-white"}`,style:{fontFamily:"ui-serif, Georgia, serif"},children:D?"time ✓":w1(c)})]}),t.jsx("p",{className:"text-gray-100 text-lg leading-relaxed",style:{fontFamily:"ui-serif, Georgia, serif"},children:u.text}),D&&t.jsx("p",{className:"text-emerald-400/80 text-xs",children:"Time's up on this one — move on when it feels done, not before."}),t.jsxs("div",{className:"flex flex-wrap gap-2",children:[t.jsx("button",{onClick:()=>C(f=>!f),className:"px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-700 text-gray-300 hover:bg-gray-600",children:g?"▶ Resume":"⏸ Pause"}),t.jsx("button",{onClick:()=>h(f=>Math.max(f,0)+120),className:"px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-700 text-gray-300 hover:bg-gray-600",children:"+2 min"})]}),(a==null?void 0:a.length)>0&&t.jsxs("details",{className:"bg-gray-900/50 border border-gray-700 rounded-xl px-3 py-2",children:[t.jsx("summary",{className:"text-gray-400 text-xs font-semibold cursor-pointer select-none",children:"This week's charts"}),t.jsx("div",{className:"pt-1",children:a.map((f,k)=>t.jsx(En,{label:f.l,tab:f.t},k))})]}),t.jsxs("details",{className:"bg-gray-900/50 border border-gray-700 rounded-xl px-3 py-2",children:[t.jsx("summary",{className:"text-gray-400 text-xs font-semibold cursor-pointer select-none",children:"Metronome"}),t.jsx("div",{className:"pt-2",children:t.jsx(Rr,{defaultBpm:60})})]})]}),t.jsxs("div",{className:"flex justify-between",children:[t.jsx("button",{onClick:I,disabled:d===0,className:"px-4 py-2.5 rounded-lg text-sm font-bold border border-gray-700 text-gray-300 disabled:text-gray-700 disabled:border-gray-800",children:"Back"}),t.jsx("button",{onClick:P,className:"px-6 py-2.5 rounded-xl text-[15px] font-extrabold bg-teal-600 hover:bg-teal-500 text-white",children:d+1<B?"Done → next exercise":"Done → finish session"})]})]})}const F1="modulepreload",E1=function(e){return"/guitar/"+e},$d={},xi=function(n,a,r){let o=Promise.resolve();if(a&&a.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),i=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));o=Promise.allSettled(a.map(d=>{if(d=E1(d),d in $d)return;$d[d]=!0;const m=d.endsWith(".css"),x=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${x}`))return;const p=document.createElement("link");if(p.rel=m?"stylesheet":F1,m||(p.as="script"),p.crossOrigin="",p.href=d,i&&p.setAttribute("nonce",i),document.head.appendChild(p),m)return new Promise((c,h)=>{p.addEventListener("load",c),p.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${d}`)))})}))}function l(s){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=s,window.dispatchEvent(i),!i.defaultPrevented)throw s}return o.then(s=>{for(const i of s||[])i.status==="rejected"&&l(i.reason);return n().catch(l)})},Oa="stage90",pi=13,go={startDate:null,gigDate:null,assessments:{},program:{completed:[],blocks:{},notes:{},activity:{}},set:[],setruns:[],jams:[]},Xd=()=>JSON.parse(JSON.stringify(go));function Tr(){try{const e=localStorage.getItem(Oa);if(e){const n=JSON.parse(e);return{...go,...n,program:{...go.program,...n.program||{}}}}}catch{}return JSON.parse(JSON.stringify(go))}function gt(e){try{localStorage.setItem(Oa,JSON.stringify(e))}catch{}xi(()=>Promise.resolve().then(()=>hh),void 0).then(n=>n.schedulePush()).catch(()=>{})}const nn=e=>e.toISOString().slice(0,10);function Hd(e,n){const a=new Date(e+"T00:00:00");return a.setDate(a.getDate()+n),nn(a)}function Ii(e,n){return Math.round((new Date(n+"T00:00:00")-new Date(e+"T00:00:00"))/864e5)}function T1(e,n=nn(new Date)){const a=Ii(e,n);return Math.max(0,Math.min(pi,Math.floor(a/7)))}function DP(e,n=nn(new Date)){return Ii(n,e)}const nr=e=>ss.find(n=>n.week===e)||null,N1={pass:1,marginal:.5,fail:0};function j1(e,n){const a=n.criteria.map(o=>o.id);return a.length?a.reduce((o,l)=>{var s;return o+(N1[(s=e.criteria)==null?void 0:s[l]]??0)},0)/a.length:0}function O1(e){const n=Ct.map(([a])=>{var r;return(r=e.ratings)==null?void 0:r[a]}).filter(a=>a>=1);return n.length?n.reduce((a,r)=>a+r,0)/n.length/5:0}function _1(e){return e?Math.max(0,Math.min(1,(e-zd)/(ci-zd))):0}function A1(e,n){return Math.round(100*(.5*j1(e,n)+.3*O1(e)+.2*_1(e.maxCleanBpm)))}function R1(e){const n=Object.values(e).filter(l=>l&&typeof l.score=="number").sort((l,s)=>l.week-s.week);if(!n.length)return null;const a=n.at(-1),r=n.length>1?n.at(-2):null,o=r?Math.max(-10,Math.min(10,(a.score-r.score)/2)):0;return Math.max(0,Math.min(100,Math.round(a.score+o)))}function bP(e,n){return!e||!n?[]:n.criteria.filter(a=>{var r,o;return((r=e.criteria)==null?void 0:r[a.id])==="fail"||((o=e.criteria)==null?void 0:o[a.id])==="marginal"}).map(a=>({...a,result:e.criteria[a.id]}))}const is=e=>Math.floor((e-1)/7),yo=e=>(e-1)%7;function V1(e,n){const a=is(e);if(SP[a].days[yo(e)].assessment)return[{n:"Assessment Day",m:20,d:"Open the Assessment tab and run the week "+a+" wizard — recorded take, criteria, tempo test, ratings, notes."}];const o=[];return n.length&&o.push({n:"Injected focus",m:10,d:n.map(l=>l.fix).join(" ")}),a<=4?o.push({n:"Warmup",m:5,d:"Tone checks on the five open chords, then one change sprint on your slowest pair."},{n:"Focus",m:25,d:"Work today's numbered steps above.",main:!0},{n:"Click work",m:10,d:"Strum pattern 2 on the metronome, then the reference progression (G–D–Em–C) until it locks."}):a<=9?o.push({n:"Warmup",m:5,d:"One change sprint, then the reference progression at your latest tempo-test BPM."},{n:"Song work",m:30,d:"Work today's numbered steps above.",main:!0},{n:"Recovery",m:10,d:"Vamp on: comp the 12-bar blues and plant one flub per chorus — keep the groove through it."}):o.push({n:"Warmup",m:5,d:"Reference progression once, then count-ins: two silent bars into each song's first chord."},{n:"Set work",m:30,d:"Work today's numbered steps above — the set is the unit of practice now.",main:!0},{n:"Debrief",m:10,d:"Log the run (Set Runner in Songbook), note the worst bar, give it 8 slow reps."}),o}function U1(e){for(let n=1;n<=ga;n++)if(!e.includes(n))return n;return ga}function G1(){const[e,n]=S.useState(Tr),a=e.startDate?Math.max(1,Math.min(ga,Ii(e.startDate,nn(new Date))+1)):null,[r,o]=S.useState(()=>a??U1(Tr().program.completed)),[l,s]=S.useState(()=>yo(r)===0),[i,d]=S.useState({loops:1,countIn:!1,tempoStep:0,click:!0}),[m,x]=S.useState(!1),[p,c]=S.useState(!1),[h,g]=S.useState(!1);S.useEffect(()=>{gt(e)},[e]);const C=is(r),v=SP[C],u=v.days[yo(r)],P=vP(C),I=e.gigDate?DP(e.gigDate):null,D=S.useMemo(()=>{const M=e.assessments[C-1];return!M||typeof M.score!="number"?[]:bP(M,nr(C-1))},[e.assessments,C]),B=S.useCallback(M=>{M<1||M>ga||(o(M),s(yo(M)===0),c(!1),window.scrollTo(0,0))},[]),y=()=>nn(new Date),f=M=>{var b;return{...M.program.activity,[y()]:(((b=M.program.activity)==null?void 0:b[y()])||0)+1}},k=M=>n(b=>({...b,program:M(b.program,b)})),T=e.program.blocks[r]||[],F=M=>n(b=>{const N=b.program.blocks[r]||[],w=!N.includes(M),j=w?[...N,M]:N.filter(V=>V!==M);return{...b,program:{...b.program,blocks:{...b.program.blocks,[r]:j},activity:w?f(b):b.program.activity}}}),_=e.program.completed.includes(r),U=()=>n(M=>{const b=!M.program.completed.includes(r),N=b?[...M.program.completed,r]:M.program.completed.filter(w=>w!==r);return{...M,program:{...M.program,completed:N,activity:b?f(M):M.program.activity}}}),A=M=>n(b=>{const N=b.program.blocks[r]||[];return N.includes(M)?b:{...b,program:{...b.program,blocks:{...b.program.blocks,[r]:[...N,M]},activity:f(b)}}}),R=()=>{n(M=>M.program.completed.includes(r)?M:{...M,program:{...M.program,completed:[...M.program.completed,r],activity:f(M)}}),c(!1),window.scrollTo(0,0)},G=M=>k(b=>({...b,notes:{...b.notes,[r]:M}})),W=V1(r,D),z=e.program.completed.filter(M=>is(M)===C).length;return t.jsx(ft.Provider,{value:i,children:t.jsxs("div",{className:"space-y-6",children:[t.jsxs("div",{className:"text-center",children:[t.jsx("div",{className:"text-teal-400 text-[11px] font-bold tracking-[3px]",children:"STAGE READY 90"}),t.jsxs("h2",{className:"text-3xl sm:text-4xl font-bold text-white mt-1",style:{fontFamily:"ui-serif, Georgia, serif"},children:["Ninety-Eight Days ",t.jsx("span",{className:"text-amber-400 italic font-semibold",children:"to the Coffee Shop"})]}),t.jsx("p",{className:"text-gray-400 text-sm mt-2",children:I!==null?t.jsxs(t.Fragment,{children:["Gig night in ",t.jsxs("b",{className:"text-amber-400",children:[Math.max(I,0)," days"]})," — three songs, standing, from memory."]}):t.jsxs(t.Fragment,{children:["Set your gig date in the ",t.jsx("b",{className:"text-gray-200",children:"Assessment tab"})," to anchor the calendar."]})})]}),t.jsxs("div",{className:"flex flex-col items-center gap-4",children:[t.jsx("div",{className:"flex gap-2 w-full max-w-xl",children:Ho.map(M=>t.jsxs("div",{className:`flex-1 py-2 px-1.5 rounded-lg text-center border ${M===P?"bg-gray-800 border-amber-500":"border-gray-700"}`,children:[t.jsx("div",{className:`text-xs font-bold ${M===P?"text-amber-400":"text-gray-500"}`,children:M.name}),t.jsxs("div",{className:"text-[10px] text-gray-500 mt-0.5",children:["w",M.weeks[0],M.weeks[1]!==M.weeks[0]?`–${M.weeks[1]}`:""]})]},M.name))}),t.jsxs("div",{className:"flex items-center justify-between gap-2 w-full max-w-xl",children:[t.jsxs("button",{onClick:()=>B(r-1),disabled:r===1,className:"border border-gray-700 rounded-lg px-3 py-2 text-sm font-bold text-gray-300 disabled:text-gray-700 flex items-center gap-1",children:[t.jsx(ut,{size:16})," Prev"]}),t.jsxs("div",{className:"text-center",children:[t.jsxs("div",{className:"text-white font-bold text-lg",style:{fontFamily:"ui-serif, Georgia, serif"},children:["Day ",r," ",t.jsxs("span",{className:"text-gray-500 font-normal text-sm",children:["of ",ga]})]}),t.jsxs("div",{className:"text-gray-500 text-[11px]",children:["Week ",C," · ",v.t," · ",z,"/7 days done"]})]}),t.jsxs("button",{onClick:()=>B(r+1),disabled:r===ga,className:"border border-gray-700 rounded-lg px-3 py-2 text-sm font-bold text-gray-300 disabled:text-gray-700 flex items-center gap-1",children:["Next ",t.jsx(Pt,{size:16})]})]}),a!==null&&a!==r&&t.jsxs("button",{onClick:()=>B(a),className:"text-teal-400 hover:text-teal-300 text-xs underline",children:["Jump to today (day ",a,")"]})]}),p?t.jsx(k1,{blocks:W,steps:u.assessment?[]:u.h,weekTabs:[...v.lesson.tabs,...ro(C).slice(-2).map(M=>({l:M.l,t:M.t}))],dayLabel:`Day ${r} · Week ${C} — ${v.t}`,onBlockDone:A,onFinishDay:R,onExit:()=>c(!1)}):t.jsxs("div",{className:"grid gap-5 lg:grid-cols-3 items-start",children:[t.jsxs("div",{className:"lg:col-span-2 space-y-4 min-w-0",children:[D.length>0&&!u.assessment&&t.jsxs("div",{className:"bg-amber-950/30 border border-amber-600/50 rounded-2xl p-4",children:[t.jsx("div",{className:"text-amber-400 text-[10px] font-bold tracking-[2px] mb-2",children:"INJECTED FOCUS — FROM YOUR LAST ASSESSMENT"}),t.jsx("div",{className:"space-y-1.5",children:D.map(M=>t.jsxs("div",{className:"text-sm text-gray-300 leading-snug flex gap-2",children:[t.jsx("span",{className:M.result==="fail"?"text-rose-400":"text-amber-400",children:M.result==="fail"?"✗":"~"}),M.fix]},M.id))})]}),t.jsxs("div",{className:"bg-gray-800/60 border border-gray-700 rounded-2xl overflow-hidden",children:[t.jsxs("button",{onClick:()=>s(M=>!M),className:"w-full flex justify-between items-center px-4 py-3.5 text-sm font-bold text-white text-left",children:[t.jsxs("span",{children:[t.jsxs("span",{className:"text-amber-400",children:["Lesson · Week ",C,":"]})," ",v.t]}),t.jsx("span",{className:"text-gray-400 text-lg leading-none",children:l?"−":"+"})]}),l&&t.jsxs("div",{className:"px-4 pb-4",children:[t.jsx("div",{className:"max-w-3xl",children:v.lesson.p.map((M,b)=>t.jsx("p",{className:"text-gray-300 text-sm leading-relaxed mb-2.5",children:M},b))}),t.jsx("div",{className:"mt-3.5 space-y-1.5",children:v.lesson.terms.map((M,b)=>t.jsxs("div",{className:"text-xs leading-snug",children:[t.jsx("b",{className:"text-amber-400",children:M[0]}),t.jsxs("span",{className:"text-gray-500",children:[" — ",M[1]]})]},b))})]})]}),v.lesson.tabs.length>0&&t.jsxs("div",{className:"bg-gray-800 rounded-2xl p-4",children:[t.jsx("div",{className:"text-teal-400 text-[10px] font-bold tracking-[2px] mb-1",children:"THIS WEEK'S CHARTS"}),t.jsx("div",{className:"grid xl:grid-cols-2 gap-x-4",children:v.lesson.tabs.map((M,b)=>t.jsx(En,{label:M.l,tab:M.t},b))})]}),ro(C).length>0&&t.jsxs("div",{className:"bg-gray-800/60 border border-gray-700 rounded-2xl overflow-hidden",children:[t.jsxs("button",{onClick:()=>g(M=>!M),className:"w-full flex justify-between items-center px-4 py-3.5 text-sm font-bold text-white text-left",children:[t.jsxs("span",{children:[t.jsx("span",{className:"text-amber-400",children:"Licks & picking"})," · ",ro(C).length," unlocked",Ja(C)&&t.jsxs("span",{className:"text-gray-500 font-normal",children:[" — next: week ",Ja(C).week]})]}),t.jsx("span",{className:"text-gray-400 text-lg leading-none",children:h?"−":"+"})]}),h&&t.jsxs("div",{className:"px-4 pb-4 space-y-4",children:[ro(C).map(M=>t.jsxs("div",{children:[t.jsx(En,{label:M.l,tab:M.t}),t.jsx("p",{className:"text-gray-400 text-xs leading-snug mt-1 px-1",children:M.tip})]},M.l)),Ja(C)&&t.jsxs("p",{className:"text-gray-600 text-[11px] px-1",children:["🔒 Week ",Ja(C).week," unlocks: ",Ja(C).l]})]})]}),t.jsxs("div",{className:`rounded-2xl p-4 ${u.assessment?"bg-teal-950/40 border border-teal-600/60":"bg-gray-800"}`,children:[t.jsx("div",{className:"text-rose-400 text-[10px] font-bold tracking-[2px] mb-1.5",children:"TODAY'S FOCUS"}),t.jsx("div",{className:"text-white text-lg leading-snug mb-3",style:{fontFamily:"ui-serif, Georgia, serif"},children:u.f}),t.jsx("div",{className:"space-y-2",children:u.h.map((M,b)=>t.jsxs("div",{className:"flex gap-2.5 items-start",children:[t.jsx("div",{className:"w-5 h-5 rounded-full flex-shrink-0 mt-0.5 grid place-items-center bg-gray-700 text-amber-400 text-[11px] font-extrabold",children:b+1}),t.jsx("div",{className:"text-gray-300 text-sm leading-relaxed",children:M})]},b))})]}),!u.assessment&&t.jsx("button",{onClick:()=>{c(!0),window.scrollTo(0,0)},className:"w-full py-3.5 rounded-xl font-extrabold text-[15px] bg-teal-600 hover:bg-teal-500 text-white",children:"▶ Start today's session — guided, one exercise at a time"}),t.jsxs("div",{children:[t.jsxs("div",{className:"text-gray-500 text-[10px] font-bold tracking-[2px] mb-2 ml-0.5",children:["TODAY'S SESSION · ~",W.reduce((M,b)=>M+b.m,0)," MIN — OR CHECK OFF FREESTYLE"]}),t.jsx("div",{className:"space-y-2",children:W.map((M,b)=>{const N=T.includes(b);return t.jsxs("button",{onClick:()=>F(b),className:`w-full flex gap-3 items-start text-left rounded-xl p-3 border transition-colors ${N?"bg-gray-800/50 border-amber-500/40":"bg-gray-800 border-gray-700 hover:border-gray-600"}`,children:[t.jsx("div",{className:`rounded-lg flex-shrink-0 mt-0.5 grid place-items-center border-2 text-sm font-extrabold ${N?"bg-amber-500 border-amber-500 text-stone-900":"border-gray-600 text-transparent"}`,style:{width:22,height:22},children:"✓"}),t.jsxs("div",{children:[t.jsxs("div",{className:"text-sm font-bold text-white",children:[M.n," ",t.jsxs("span",{className:"text-amber-400 font-semibold",children:["· ",M.m," min"]})]}),t.jsx("div",{className:`text-sm mt-0.5 leading-snug ${N?"text-gray-500 line-through":"text-gray-400"}`,children:M.d})]})]},b)})})]}),t.jsx("button",{onClick:U,className:`w-full py-3.5 rounded-xl font-extrabold text-[15px] transition-colors ${_?"bg-gray-700 text-gray-300":"bg-rose-500 hover:bg-rose-400 text-rose-50"}`,children:_?"✓ Day complete — tap to undo":"Mark day complete"}),t.jsxs("div",{children:[t.jsxs("div",{className:"text-gray-500 text-[10px] font-bold tracking-[2px] mb-2",children:["PRACTICE NOTES — DAY ",r]}),t.jsx("textarea",{defaultValue:e.program.notes[r]||"",onBlur:M=>G(M.target.value),placeholder:"What clicked? What fought back?",className:"w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-gray-100 text-sm resize-y min-h-[70px]"},r)]})]}),t.jsxs("div",{className:"space-y-4 min-w-0",children:[t.jsx("div",{children:t.jsxs("button",{onClick:()=>x(M=>!M),className:"w-full flex items-center justify-between px-1 py-2 text-left",children:[t.jsx("span",{className:"text-gray-400 text-[10px] font-bold tracking-[2px]",children:"TOOLS"}),t.jsx(mt,{size:16,className:`text-gray-400 transition-transform ${m?"rotate-180":""}`})]})}),m&&t.jsxs(t.Fragment,{children:[t.jsx(Rr,{defaultBpm:60}),t.jsx(Pi,{})]}),t.jsxs("div",{className:"flex gap-2",children:[t.jsxs("div",{className:"flex-1 bg-gray-800 border border-gray-700 rounded-xl py-2.5 text-center",children:[t.jsx("div",{className:"text-amber-400 text-lg font-bold",style:{fontFamily:"ui-serif, Georgia, serif"},children:e.program.completed.length}),t.jsx("div",{className:"text-gray-500 text-[10px] uppercase tracking-wide mt-0.5",children:"Days done"})]}),t.jsxs("div",{className:"flex-1 bg-gray-800 border border-gray-700 rounded-xl py-2.5 text-center",children:[t.jsxs("div",{className:"text-amber-400 text-lg font-bold",style:{fontFamily:"ui-serif, Georgia, serif"},children:[z," / 7"]}),t.jsx("div",{className:"text-gray-500 text-[10px] uppercase tracking-wide mt-0.5",children:"This week"})]}),t.jsxs("div",{className:"flex-1 bg-gray-800 border border-gray-700 rounded-xl py-2.5 text-center",children:[t.jsx("div",{className:"text-amber-400 text-lg font-bold",style:{fontFamily:"ui-serif, Georgia, serif"},children:Object.values(e.assessments).filter(M=>(M==null?void 0:M.score)!=null).length}),t.jsx("div",{className:"text-gray-500 text-[10px] uppercase tracking-wide mt-0.5",children:"Assessments"})]})]}),t.jsx("div",{className:"text-center text-xs text-gray-600 italic pt-2",style:{fontFamily:"ui-serif, Georgia, serif"},children:"Consistency beats intensity. Every day."})]})]})]})})}const Kd="guitar-jam-program-track",L1=[{id:"stage90",label:"Stage Ready 90",sub:"coffee-shop gig"},{id:"dead90",label:"Dead 90",sub:"the Grateful Dead jam"}];function W1(){try{if(localStorage.getItem("dead90")&&!localStorage.getItem("stage90"))return"dead90"}catch{}return"stage90"}function z1(){const[e,n]=S.useState(()=>localStorage.getItem(Kd)||W1()),a=r=>{n(r),localStorage.setItem(Kd,r)};return t.jsxs("div",{className:"space-y-5",children:[t.jsx("div",{className:"flex justify-center",children:t.jsx("div",{className:"flex gap-1 bg-gray-800/80 p-1 rounded-xl border border-gray-700",children:L1.map(r=>t.jsxs("button",{onClick:()=>a(r.id),className:`px-4 py-1.5 rounded-lg text-left transition-colors ${e===r.id?"bg-teal-600":"hover:bg-gray-700"}`,children:[t.jsx("div",{className:`text-sm font-bold ${e===r.id?"text-white":"text-gray-400"}`,children:r.label}),t.jsx("div",{className:`text-[10px] ${e===r.id?"text-teal-100":"text-gray-600"}`,children:r.sub})]},r.id))})}),e==="stage90"?t.jsx(G1,{}):t.jsx(v1,{})]})}const wP="Chords are the standard changes; parts are original teaching licks in each song’s style. Learn the definitive versions by ear — that’s the real work, and the fun part.",Yd=[{id:"ripple",title:"Ripple",key:"G major",feel:"Gentle, folk, banjo-roll texture",difficulty:"Beginner",about:"The friendliest way into the songbook. Three or four open chords, a lilting feel, and a banjo-roll texture on the G that is pure Garcia. Your set opener.",form:`Intro   : banjo-roll G
Verse   : G  C  G  D   (×2)
Chorus  : C  G  C  G  /  A(min)  D  G
Bridge  : "Reach out your hand…" C  G  D  C  G`,chords:{l:"Ripple — G, C, D, plus Am and D7",t:`      G    C    D    Am   D7
e|----3----0----2----0----2
B|----0----1----3----1----1
G|----0----0----2----2----2
D|----0----2----0----2----0
A|----2----3----x----0----x
E|----3----x----x----x----x`},parts:[{l:"The banjo-roll texture on G — pick, middle, ring",t:`e|------0------0------0---
B|----0------0------0-----
D|--0------0------0-------`},{l:"A line-ending fill — G major pentatonic, resolving home",t:`e|--3--------------
B|-----3--0--------
G|-----------2--0--`}],tips:["Comp the verses with top-three-string triads, not big barre chords — lighter, more Dead.","End each vocal line with a small fill that lands on a chord tone of the next chord.","The banjo roll goes on the G chords; let every string ring into the next."]},{id:"fotd",title:"Friend of the Devil",key:"G major",feel:"Bright, bluegrass bounce",difficulty:"Beginner–Intermediate",about:"Opens with its famous descending run — that intro IS lead guitar, and it announces the song before a word is sung. Learn it cold; it opens your set.",form:`Intro   : descending G run (below)
Verse   : G  D  Am  G   /  G  D  Am  C  G
Bridge  : "Got two reasons…" E  A  D  (walk it up)`,chords:{l:"Friend of the Devil — G, D, Am, C",t:`      G    D    Am   C
e|----3----2----0----0
B|----0----3----1----1
G|----0----2----2----0
D|----0----0----2----2
A|----2----x----0----3
E|----3----x----x----x`},parts:[{l:"The descending intro run — teaching version, full G octave down",t:`e|--3--2--0-------------------
B|----------3--1--0-----------
G|-------------------2--0-----`},{l:"The bass walk under the bridge — E to A",t:`E|--0--2--4--
A|-----------`}],tips:["Pick the bass note before each verse strum — it gives the bluegrass bounce.","The intro run is G major descending: G F# E D C B A G. Say the notes as you learn it.","Keep the intro clean over fast — clean always wins on stage."]},{id:"sugaree",title:"Sugaree",key:"B major",feel:"Slow, greasy, built for lead",difficulty:"Intermediate",about:"The closer, and the best lead vehicle of the set. Mid-tempo, tons of space, and double-stop fills between the vocal lines. This is where you get your 8-bar solo break.",form:`Verse   : B  .  .  .  |  B  .  .  .  |  E  .  .  .  |  B  .  .  .
Turn    : F#7  E  B   (the "just don't tell them…" lift)
Solo    : one full verse form — build one idea`,chords:{l:"Sugaree — B, E, F#7",t:`      B    E    F#7
e|----2----0----2
B|----4----0----5
G|----4----1----3
D|----4----2----2
A|----2----2----4
E|----x----0----2`},parts:[{l:"Double-stop 3rds fill — the sweet, vocal Jerry sound",t:`B|--4--5--
G|--4--6--`},{l:'A descending fill from the B "Jerry box" (major pentatonic)',t:`e|--7--4--------------
B|--------7--4--------
G|--------------6--4--`}],tips:["Leave real space — Sugaree breathes. Fills answer the vocal, then get out of the way.","For the solo break: pick ONE motif and develop it across the 8 bars. Do not empty the whole toolbox.","Target the 3rd (D#) when the B chord lands — that is the sweetest note in the room."]},{id:"ujb",title:"Uncle John's Band",key:"G major",feel:"Warm, campfire, then tricky middle",difficulty:"Intermediate",about:'A candidate closer. The verses are a folk campfire; the "Goddamn well" middle section shifts feel and keeps you honest. Hum the melody and decorate it.',form:`Verse   : G  C  Am  G   ("Well the first days are the hardest…")
Refrain : C  G  /  C  G  /  F  C  (…let me know your name)
Middle  : F  C   (the odd-time "Whoa-oh, what I want to know…")`,chords:{l:"Uncle John's Band — G, C, Am, D, F",t:`      G    C    Am   D    F
e|----3----0----0----2----1
B|----0----1----1----3----1
G|----0----0----2----2----2
D|----0----2----2----0----3
A|----2----3----0----x----3
E|----3----x----x----x----1`},parts:[{l:"Melody-decoration lick — G major pentatonic",t:`e|--3--------------
B|-----3--0--------
G|-----------2--0--`}],tips:["Start your solo from the vocal melody, then decorate it — that is the whole Garcia move.","Comp with triads; the arrangement is already busy with harmony vocals.","The middle section changes feel — count it out loud until it stops fighting you."]},{id:"fire",title:"Fire on the Mountain",key:"B Mixolydian",feel:"Two-chord vamp, endless groove",difficulty:"Intermediate",about:"Two chords — B to A — around and around forever. With no form to track, everything is phrasing, space, and dynamics. The purest test of taste in the book.",form:`Vamp    : |  B  .  .  .  |  A  .  .  .  |  (repeat, forever)
Head    : the vocal melody sits right on top of the vamp
Solo    : same two chords — build waves, don't race`,chords:{l:"Fire on the Mountain — the B–A vamp",t:`      B    A
e|----2----0
B|----4----2
G|----4----2
D|----4----2
A|----2----0
E|----x----x`},parts:[{l:"A B-major-pentatonic phrase over the vamp",t:`e|--7--9--7--------
B|-----------7--4--`},{l:"Land the b7 (A) for the Mixolydian color",t:`G|--8--6--4----
D|----------7--`}],tips:["Use the Backing vamp tool (Fire B–A) and solo over it — five minutes, no stopping.","Repetition is the point: five notes force real phrasing. Milk one idea.","Two beats of silence between phrases. Uncomfortable means you are doing it right."]},{id:"franklins",title:"Franklin's Tower",key:"A Mixolydian",feel:"Rolling, joyful, three chords",difficulty:"Intermediate",about:"A, G, D rolling around A Mixolydian. Slightly more motion than Fire, which nudges your note choices. Endless and euphoric when the groove locks.",form:`Vamp    : |  A  .  .  .  |  A  .  .  .  |  G  .  .  .  |  D  .  .  .
Head    : "Roll away… the dew" over the changes
Solo    : ride the A Mixolydian, target chord tones on G and D`,chords:{l:"Franklin's Tower — A, G, D",t:`      A    G    D
e|----0----3----2
B|----2----0----3
G|----2----0----2
D|----2----0----0
A|----0----2----x
E|----x----3----x`},parts:[{l:"A-major-pentatonic rolling lick",t:`e|--5--7--5--------
B|-----------5--7--`}],tips:["Use the Backing vamp tool (Franklin's A-A-G-D) to practice the changes.","When the chord moves to G or D, aim a chord tone right on the change — Week 7 pays off here.","Keep it light and bouncing; this song smiles."]},{id:"scarlet",title:"Scarlet Begonias",key:"B / A (jam)",feel:"Sunny lilt into an open A jam",difficulty:"Intermediate–Advanced",about:"A bright verse in B that opens into a wide A-Mixolydian jam (and, on a good night, straight into Fire). The verse changes are your arpeggio-targeting exam.",form:`Verse   : B  .  |  A  .  |  B  .  |  A  .  |  E  .  .  .
Jam     : vamp on A — long, patient, building
(often segues → Fire on the Mountain)`,chords:{l:"Scarlet Begonias — B, A, E",t:`      B    A    E
e|----2----0----0
B|----4----2----0
G|----4----2----1
D|----4----2----2
A|----2----0----2
E|----x----x----0`},parts:[{l:"B major arpeggio — for targeting the changes",t:`G|------------4--
D|-----1--4------
A|--2------------`},{l:"A-Mixolydian jam phrase",t:`e|--5--7--5--------
B|-----------5--7--`}],tips:["The verse moves quickly between B and A — outline each chord, do not just run one scale.","The jam is on A: patient, wave-shaped, build to one peak and release.","Practice the segue feel — Scarlet loves to roll into Fire."]},{id:"bertha",title:"Bertha",key:"G major",feel:"Fast, driving, a train that keeps rolling",difficulty:"Intermediate",about:"A up-tempo romp. The tempo exposes hesitation, so simplify — triads and muted strums keep the train on the rails while you solo in G.",form:`Verse   : G  C  D  G   (drive it)
Chorus  : "Any more, any more…"  C  G  D
Solo    : G major — energy over density`,chords:{l:"Bertha — G, C, D",t:`      G    C    D
e|----3----0----2
B|----0----1----3
G|----0----0----2
D|----0----2----0
A|----2----3----x
E|----3----x----x`},parts:[{l:"A fast G-major-pentatonic lick",t:`e|--3--5--3--------
B|-----------3--5--`}],tips:["At tempo, simplify the rhythm — muted strums keep the groove without clutter.","When you flub, keep the right hand moving and absorb it — never restart.","Energy beats density here. A few well-placed notes carry further than a flurry."]}],So=e=>`${Math.floor(e/60)}:${String(Math.floor(e%60)).padStart(2,"0")}`;function $1({set:e,onFinish:n,onCancel:a}){const[r,o]=S.useState(0),[l,s]=S.useState([]),[i,d]=S.useState(0),[m,x]=S.useState(Date.now()),p=S.useRef(Date.now()),c=S.useRef(Date.now());S.useEffect(()=>{const u=setInterval(()=>x(Date.now()),500);return()=>clearInterval(u)},[]);const h=e[r],g=(m-p.current)/1e3,C=(m-c.current)/1e3,v=()=>{const u=[...l,{title:h.title,sec:Math.round(g),stumbles:i}];r+1<e.length?(s(u),d(0),o(r+1),p.current=Date.now()):n({date:new Date().toISOString().slice(0,10),totalSec:Math.round((Date.now()-c.current)/1e3),perSong:u,totalStumbles:u.reduce((P,I)=>P+I.stumbles,0)})};return t.jsxs("div",{className:"bg-gray-900 border-2 border-rose-500/60 rounded-2xl p-5 space-y-4 text-center",children:[t.jsxs("div",{className:"flex justify-between items-center text-xs text-gray-500",children:[t.jsxs("span",{children:["SET RUN · SONG ",r+1," OF ",e.length]}),t.jsxs("span",{children:["total ",So(C)]}),t.jsx("button",{onClick:a,className:"text-gray-500 hover:text-gray-300",children:"abandon"})]}),t.jsxs("div",{children:[t.jsx("div",{className:"text-white font-bold text-3xl",style:{fontFamily:"ui-serif, Georgia, serif"},children:h.title}),t.jsxs("div",{className:"text-gray-400 text-sm mt-1",children:[h.bpm?t.jsxs(t.Fragment,{children:["target ",h.bpm," BPM · "]}):null,h.minutes?t.jsxs(t.Fragment,{children:["planned ",h.minutes," min · "]}):null,"elapsed ",So(g)]}),t.jsx("div",{className:"text-gray-600 text-xs mt-1",children:"Count yourself in: two silent bars. No restarts — ever."})]}),t.jsxs("button",{onClick:()=>d(u=>u+1),className:"w-full py-6 rounded-2xl bg-amber-600/20 border-2 border-amber-500 text-amber-300 font-extrabold text-xl active:scale-[0.98]",children:["Stumble +1 ",t.jsx("span",{className:"block text-3xl mt-1",children:i})]}),t.jsx("button",{onClick:v,className:"w-full py-3.5 rounded-xl font-extrabold text-[15px] bg-teal-600 hover:bg-teal-500 text-white",children:r+1<e.length?`Song done → ${e[r+1].title}`:"Set finished — log the run"}),l.length>0&&t.jsx("div",{className:"text-gray-500 text-xs",children:l.map(u=>`${u.title} ${So(u.sec)} (${u.stumbles})`).join(" · ")})]})}function X1(){const[e,n]=S.useState(Tr),[a,r]=S.useState(!1),[o,l]=S.useState(!1),[s,i]=S.useState({title:"",chords:"",bpm:"",minutes:""});S.useEffect(()=>{gt(e)},[e]);const d=e.set||[],m=e.setruns||[],x=d.reduce((v,u)=>v+(Number(u.minutes)||0),0),p=()=>{s.title.trim()&&(n(v=>({...v,set:[...v.set||[],{id:Date.now(),title:s.title.trim(),chords:s.chords.trim(),bpm:Number(s.bpm)||null,minutes:Number(s.minutes)||null,memorized:!1}]})),i({title:"",chords:"",bpm:"",minutes:""}),l(!1))},c=(v,u)=>n(P=>({...P,set:P.set.map(I=>I.id===v?u(I):I)})),h=v=>n(u=>({...u,set:u.set.filter(P=>P.id!==v)})),g=(v,u)=>n(P=>{const I=[...P.set],D=v+u;return D<0||D>=I.length?P:([I[v],I[D]]=[I[D],I[v]],{...P,set:I})}),C=v=>{n(u=>({...u,setruns:[...u.setruns||[],v]})),r(!1)};return m.at(-1),t.jsxs("div",{className:"bg-gray-800/60 border border-gray-700 rounded-2xl p-4 space-y-4",children:[t.jsxs("div",{className:"flex items-center justify-between",children:[t.jsxs("div",{children:[t.jsx("div",{className:"text-rose-400 text-[10px] font-bold tracking-[2px]",children:"MY SET — GIG NIGHT"}),t.jsx("div",{className:"text-gray-500 text-xs mt-0.5",children:d.length?`${d.length} song${d.length===1?"":"s"}${x?` · ~${x} min planned`:""}`:"Three songs: two easy, one reach. Pick them in week 2."})]}),d.length>0&&!a&&t.jsx("button",{onClick:()=>r(!0),className:"px-4 py-2 rounded-lg text-sm font-bold bg-rose-500 hover:bg-rose-400 text-white",children:"▶ Run the set"})]}),a?t.jsx($1,{set:d,onFinish:C,onCancel:()=>r(!1)}):t.jsxs(t.Fragment,{children:[d.length>0&&t.jsx("div",{className:"space-y-2",children:d.map((v,u)=>t.jsxs("div",{className:"flex items-center gap-2.5 bg-gray-900/50 border border-gray-700 rounded-xl px-3 py-2",children:[t.jsx("span",{className:"text-gray-600 font-bold text-sm w-4",children:u+1}),t.jsxs("div",{className:"flex-1 min-w-0",children:[t.jsx("div",{className:"text-white text-sm font-bold truncate",children:v.title}),t.jsx("div",{className:"text-gray-500 text-[11px] truncate",children:[v.chords,v.bpm&&`${v.bpm} BPM`,v.minutes&&`${v.minutes} min`].filter(Boolean).join(" · ")})]}),t.jsx("button",{onClick:()=>c(v.id,P=>({...P,memorized:!P.memorized})),className:`px-2 py-1 rounded text-[10px] font-bold flex-shrink-0 ${v.memorized?"bg-emerald-900/50 text-emerald-300 border border-emerald-600":"bg-gray-700 text-gray-400"}`,children:v.memorized?"✓ memorized":"on sheet"}),t.jsxs("div",{className:"flex flex-col flex-shrink-0",children:[t.jsx("button",{onClick:()=>g(u,-1),className:"text-gray-600 hover:text-gray-300",children:t.jsx(cx,{size:13})}),t.jsx("button",{onClick:()=>g(u,1),className:"text-gray-600 hover:text-gray-300",children:t.jsx(Px,{size:13})})]}),t.jsx("button",{onClick:()=>h(v.id),className:"text-gray-600 hover:text-rose-400 flex-shrink-0",children:t.jsx(ct,{size:15})})]},v.id))}),o?t.jsxs("div",{className:"bg-gray-900/50 border border-gray-700 rounded-xl p-3 space-y-2",children:[t.jsxs("div",{className:"grid sm:grid-cols-2 gap-2",children:[t.jsx("input",{value:s.title,onChange:v=>i(u=>({...u,title:v.target.value})),placeholder:"Song title",className:"bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm",autoFocus:!0}),t.jsx("input",{value:s.chords,onChange:v=>i(u=>({...u,chords:v.target.value})),placeholder:"Chords (G C D Em…)",className:"bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"}),t.jsx("input",{value:s.bpm,onChange:v=>i(u=>({...u,bpm:v.target.value})),type:"number",placeholder:"Target BPM",className:"bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"}),t.jsx("input",{value:s.minutes,onChange:v=>i(u=>({...u,minutes:v.target.value})),type:"number",placeholder:"Length (min)",className:"bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"})]}),t.jsxs("div",{className:"flex gap-2",children:[t.jsx("button",{onClick:p,className:"px-4 py-1.5 rounded-lg text-sm font-bold bg-teal-600 hover:bg-teal-500 text-white",children:"Add"}),t.jsx("button",{onClick:()=>l(!1),className:"px-4 py-1.5 rounded-lg text-sm text-gray-400 border border-gray-700",children:"Cancel"})]})]}):t.jsxs("button",{onClick:()=>l(!0),className:"flex items-center gap-1.5 text-teal-400 hover:text-teal-300 text-sm font-semibold",children:[t.jsx(IP,{size:15})," Add a set song"]}),m.length>0&&t.jsxs("div",{children:[t.jsxs("div",{className:"text-gray-500 text-[10px] font-bold tracking-[2px] mb-1.5",children:["SET RUNS · LAST ",Math.min(m.length,5)]}),t.jsx("div",{className:"space-y-1.5",children:m.slice(-5).reverse().map((v,u)=>{const P=x?Math.round((v.totalSec/60-x)/x*100):null;return t.jsxs("div",{className:"flex items-center gap-3 text-sm bg-gray-900/40 rounded-lg px-3 py-1.5",children:[t.jsx("span",{className:"text-gray-500 text-xs w-20 flex-shrink-0",children:v.date.slice(5)}),t.jsx("span",{className:"text-white font-bold",children:So(v.totalSec)}),P!==null&&t.jsxs("span",{className:`text-xs ${Math.abs(P)<=20?"text-emerald-400":"text-amber-400"}`,children:[P>0?"+":"",P,"% vs plan"]}),t.jsxs("span",{className:`ml-auto text-xs font-bold ${v.totalStumbles<=2?"text-emerald-400":"text-amber-400"}`,children:[v.totalStumbles," stumble",v.totalStumbles===1?"":"s"]})]},m.length-u)})})]})]})]})}const H1={Beginner:"text-emerald-400 bg-emerald-900/30","Beginner–Intermediate":"text-lime-400 bg-lime-900/30",Intermediate:"text-amber-400 bg-amber-900/30","Intermediate–Advanced":"text-orange-400 bg-orange-900/30"};function K1({song:e,onOpen:n}){return t.jsxs("button",{onClick:n,className:"text-left bg-gray-800 border border-gray-700 hover:border-teal-600 rounded-2xl p-4 transition-colors active:scale-[0.99]",children:[t.jsxs("div",{className:"flex items-start justify-between gap-2",children:[t.jsx("h3",{className:"text-white font-bold text-lg leading-tight",style:{fontFamily:"ui-serif, Georgia, serif"},children:e.title}),t.jsx("span",{className:`text-[10px] px-1.5 py-0.5 rounded flex-shrink-0 ${H1[e.difficulty]||"text-gray-400 bg-gray-700"}`,children:e.difficulty})]}),t.jsx("div",{className:"text-teal-400 text-xs font-semibold mt-1",children:e.key}),t.jsx("div",{className:"text-gray-500 text-xs mt-0.5",children:e.feel}),t.jsx("p",{className:"text-gray-400 text-sm mt-2 leading-snug",children:e.about})]})}function Y1({song:e,onBack:n}){const[a,r]=S.useState({loops:1,countIn:!1,tempoStep:0,click:!0});return t.jsx(ft.Provider,{value:a,children:t.jsxs("div",{className:"space-y-5",children:[t.jsxs("div",{className:"flex items-start gap-3",children:[t.jsx("button",{onClick:n,className:"text-gray-400 hover:text-white transition-colors p-1 -ml-1 mt-1",children:t.jsx(ut,{size:22})}),t.jsxs("div",{children:[t.jsx("h2",{className:"text-2xl sm:text-3xl font-bold text-white",style:{fontFamily:"ui-serif, Georgia, serif"},children:e.title}),t.jsxs("div",{className:"flex items-center gap-2 mt-1",children:[t.jsx("span",{className:"text-teal-400 text-sm font-semibold",children:e.key}),t.jsx("span",{className:"text-gray-600",children:"·"}),t.jsx("span",{className:"text-gray-400 text-sm",children:e.feel})]})]})]}),t.jsxs("div",{className:"grid gap-5 lg:grid-cols-3 items-start",children:[t.jsxs("div",{className:"lg:col-span-2 space-y-4 min-w-0",children:[t.jsxs("div",{className:"bg-gray-800 rounded-2xl p-4 flex flex-wrap items-center gap-x-4 gap-y-2",children:[t.jsx("span",{className:"text-white font-semibold text-sm",children:"Practice"}),t.jsxs("div",{className:"flex items-center gap-2",children:[t.jsx("span",{className:"text-gray-400 text-xs",children:"Loops"}),[1,3,5,64].map(o=>t.jsx("button",{onClick:()=>r(l=>({...l,loops:o})),className:`px-2.5 py-1 rounded text-xs font-medium ${a.loops===o?"bg-teal-600 text-white":"bg-gray-700 text-gray-300 hover:bg-gray-600"}`,children:o===64?"∞":o},o))]}),t.jsxs("div",{className:"flex items-center gap-2",children:[t.jsx("span",{className:"text-gray-400 text-xs",children:"Click"}),t.jsx("button",{onClick:()=>r(o=>({...o,click:!o.click})),className:`px-2.5 py-1 rounded text-xs font-medium ${a.click?"bg-teal-600 text-white":"bg-gray-700 text-gray-300 hover:bg-gray-600"}`,children:a.click?"On":"Off"})]}),t.jsxs("div",{className:"flex items-center gap-2",children:[t.jsx("span",{className:"text-gray-400 text-xs",children:"Count-in"}),t.jsx("button",{onClick:()=>r(o=>({...o,countIn:!o.countIn})),className:`px-2.5 py-1 rounded text-xs font-medium ${a.countIn?"bg-teal-600 text-white":"bg-gray-700 text-gray-300 hover:bg-gray-600"}`,children:a.countIn?"On":"Off"})]})]}),t.jsxs("div",{className:"bg-gray-800 rounded-2xl p-4",children:[t.jsx("div",{className:"text-gray-500 text-[10px] font-bold tracking-[2px] mb-1",children:"CHORDS"}),t.jsx(En,{label:e.chords.l,tab:e.chords.t})]}),t.jsxs("div",{className:"bg-gray-800 rounded-2xl p-4",children:[t.jsx("div",{className:"text-rose-400 text-[10px] font-bold tracking-[2px] mb-1",children:"SIGNATURE PARTS"}),t.jsx("div",{className:"grid xl:grid-cols-2 gap-x-4",children:e.parts.map((o,l)=>t.jsx(En,{label:o.l,tab:o.t},l))})]})]}),t.jsxs("div",{className:"space-y-4 min-w-0",children:[t.jsxs("div",{className:"bg-gray-800 rounded-2xl p-4",children:[t.jsx("div",{className:"text-gray-500 text-[10px] font-bold tracking-[2px] mb-1.5",children:"ABOUT"}),t.jsx("p",{className:"text-gray-300 text-sm leading-relaxed",children:e.about})]}),t.jsxs("div",{className:"bg-gray-800 rounded-2xl p-4",children:[t.jsx("div",{className:"text-gray-500 text-[10px] font-bold tracking-[2px] mb-2",children:"FORM"}),t.jsx("pre",{className:"bg-gray-950 border border-gray-700 rounded-lg p-3 text-gray-200 text-xs leading-relaxed overflow-x-auto font-mono whitespace-pre-wrap",children:e.form})]}),t.jsxs("div",{className:"bg-gray-800 rounded-2xl p-4",children:[t.jsx("div",{className:"text-gray-500 text-[10px] font-bold tracking-[2px] mb-2",children:"HOW TO PLAY IT"}),t.jsx("ul",{className:"space-y-2",children:e.tips.map((o,l)=>t.jsxs("li",{className:"text-gray-400 text-sm flex gap-2 leading-snug",children:[t.jsx("span",{className:"text-teal-500 flex-shrink-0",children:"›"}),o]},l))})]}),t.jsx("p",{className:"text-gray-600 text-[11px] leading-relaxed px-1",children:wP})]})]})]})})}function J1(){const[e,n]=S.useState(null),a=Yd.find(r=>r.id===e);return a?t.jsx(Y1,{song:a,onBack:()=>n(null)}):t.jsxs("div",{className:"space-y-5",children:[t.jsxs("div",{className:"text-center",children:[t.jsx("div",{className:"text-rose-400 text-[11px] font-bold tracking-[3px]",children:"THE SET"}),t.jsx("h2",{className:"text-3xl sm:text-4xl font-bold text-white mt-1",style:{fontFamily:"ui-serif, Georgia, serif"},children:"Songbook"}),t.jsx("p",{className:"text-gray-400 text-sm mt-2 max-w-2xl mx-auto",children:"Dead & Company staples — form, chords, and signature parts you can play, loop, and slow down. Start with Ripple."})]}),t.jsx(X1,{}),t.jsx("div",{className:"grid gap-4 sm:grid-cols-2 lg:grid-cols-3",children:Yd.map(r=>t.jsx(K1,{song:r,onOpen:()=>n(r.id)},r.id))}),t.jsx("p",{className:"text-gray-600 text-[11px] leading-relaxed text-center max-w-2xl mx-auto pt-2",children:wP})]})}const Q1=7896,q1={4:"Mustang I/II (v1)",5:"Mustang III/IV/V (v1)",10:"Mustang Bronco",16:"Mustang Mini",18:"Mustang Floor",20:"Mustang I/II (v2)",22:"Mustang III/IV/V (v2)"},_a={103:{name:"Fender '57 Deluxe",as:[1,1,1,1,83]},100:{name:"Fender '59 Bassman",as:[2,2,2,2,103]},124:{name:"Fender '57 Champ",as:[12,12,12,12,0]},83:{name:"Fender '65 Deluxe Reverb",as:[3,3,3,3,106],unk:[0,0,1]},106:{name:"Fender '65 Princeton",as:[4,4,4,4,97]},117:{name:"Fender '65 Twin Reverb",as:[5,5,5,5,114]},114:{name:"Fender Super-Sonic",as:[6,6,6,6,121]},97:{name:"British '60s",as:[7,7,7,7,94]},121:{name:"British '70s",as:[11,11,11,11,124]},94:{name:"British '80s",as:[9,9,9,9,93]},93:{name:"American '90s",as:[10,10,10,10,109]},109:{name:"Metal 2000",as:[8,8,8,8,117]},241:{name:"Studio Preamp",as:[13,13,13,13,246],v2:1},246:{name:"Fender '57 Twin",as:[14,14,14,14,249],v2:1},249:{name:"Fender '60s Thrift",as:[15,15,15,15,252],v2:1},252:{name:"British Colour",as:[16,16,16,16,255],v2:1},255:{name:"British Watts",as:[17,17,17,17,0],v2:1}},aa={60:{n:"Overdrive",d:6},73:{n:"Wah",d:6,u:[1,8,1]},74:{n:"Touch Wah",d:6,u:[1,8,1]},26:{n:"Fuzz",d:6},28:{n:"Fuzz Touch Wah",d:6},136:{n:"Simple Comp",d:6,u:[8,8,1],clamp:{1:3}},7:{n:"Compressor",d:6},259:{n:"Ranger Boost",d:6,v2:1},186:{n:"Greenbox",d:6,v2:1},272:{n:"Orangebox",d:6,v2:1},273:{n:"Blackbox",d:6,v2:1},271:{n:"Big Fuzz",d:6,v2:1},18:{n:"Sine Chorus",d:7,u:[1,1,1]},19:{n:"Triangle Chorus",d:7,u:[1,1,1]},24:{n:"Sine Flanger",d:7,u:[1,1,1]},25:{n:"Triangle Flanger",d:7,u:[1,1,1]},45:{n:"Vibratone",d:7,u:[1,1,1]},64:{n:"Vintage Tremolo",d:7,u:[1,1,1]},65:{n:"Sine Tremolo",d:7,u:[1,1,1]},34:{n:"Ring Modulator",d:7,u:[1,8,1],clamp:{4:1}},41:{n:"Step Filter",d:7,u:[1,1,1]},79:{n:"Phaser",d:7,u:[1,1,1],clamp:{5:1}},31:{n:"Pitch Shifter",d:7,u:[1,8,1]},244:{n:"Wah (Mod)",d:7,u:[1,8,1],v2:1},245:{n:"Touch Wah (Mod)",d:7,u:[1,8,1],v2:1},287:{n:"Diatonic Pitch Shift",d:7,u:[0,8,1],v2:1},22:{n:"Mono Delay",d:8,u:[2,1,1]},67:{n:"Mono Echo Filter",d:8,u:[2,1,1]},72:{n:"Stereo Echo Filter",d:8,u:[2,1,1]},68:{n:"Multitap Delay",d:8,u:[2,1,1],clamp:{5:3}},69:{n:"Ping Pong Delay",d:8,u:[2,1,1]},21:{n:"Ducking Delay",d:8,u:[2,1,1]},70:{n:"Reverse Delay",d:8,u:[2,1,1]},43:{n:"Tape Delay",d:8,u:[2,1,1]},42:{n:"Stereo Tape Delay",d:8,u:[2,1,1]},36:{n:"Small Hall Reverb",d:9},58:{n:"Large Hall Reverb",d:9},38:{n:"Small Room Reverb",d:9},59:{n:"Large Room Reverb",d:9},78:{n:"Small Plate Reverb",d:9},75:{n:"Large Plate Reverb",d:9},76:{n:"Ambient Reverb",d:9},77:{n:"Arena Reverb",d:9},33:{n:"'63 Spring Reverb",d:9},11:{n:"'65 Spring Reverb",d:9}},cn=()=>new Uint8Array(64);function Z1(){const e=cn();e[1]=195;const n=cn();return n[0]=26,n[1]=3,[e,n]}function ep(){const e=cn();return e[0]=255,e[1]=193,e}function nl(){const e=cn();return e[0]=28,e[1]=3,e}function np(e){const n=cn();return n[0]=28,n[1]=1,n[2]=1,n[4]=e,n[6]=1,n}function ap(e,n){const a=cn();a[0]=28,a[1]=1,a[2]=3,a[4]=e,a[6]=1,a[7]=1;for(let r=0;r<Math.min(n.length,32);r++)a[16+r]=n.charCodeAt(r)&127;return a}function rp(e){const n=_a[e.model];if(!n)throw new Error("Unknown amp model 0x"+e.model.toString(16));const a=cn();a[0]=28,a[1]=3,a[2]=5,a[6]=1,a[7]=1;const r=16;a[r+0]=e.model&255,a[r+16]=e.volume,a[r+17]=e.gain,a[r+18]=e.gain2,a[r+19]=e.master,a[r+20]=e.treble,a[r+21]=e.middle,a[r+22]=e.bass,a[r+23]=e.presence,a[r+26]=e.bias,a[r+31]=Math.min(e.noiseGate,5),e.noiseGate===5?(a[r+32]=Math.min(e.threshold,9),a[r+25]=e.depth):a[r+25]=128,a[r+33]=Math.min(e.cabinet,12),a[r+35]=Math.min(e.sag,2),a[r+36]=e.brightness?1:0;const o=n.unk||[128,128,1];a[r+24]=o[0],a[r+27]=o[1],a[r+37]=o[2];const l=n.as;return a[r+28]=l[0],a[r+29]=l[1],a[r+30]=l[2],a[r+34]=l[3],a[r+38]=l[4],a}function op(e){const n=cn();return n[0]=28,n[1]=3,n[2]=13,n[6]=1,n[7]=1,n[16]=e,n}function tp(e){const n=cn(),a=16;n[0]=28,n[1]=3,n[2]=e.dsp,n[6]=1,n[7]=1;const r=e.model?aa[e.model]:null,o=(r==null?void 0:r.u)||[0,8,1];if(n[a+3]=o[0],n[a+4]=o[1],n[a+5]=o[2],r){n[a+0]=e.model&255,n[a+1]=e.model>>8&255,n[a+2]=e.pos;const l=e.knobs.slice();if(r.clamp)for(const[s,i]of Object.entries(r.clamp))l[s-1]=Math.min(l[s-1],i);e.model===136&&(l[1]=l[2]=l[3]=l[4]=0);for(let s=0;s<6;s++)n[a+16+s]=l[s]||0}return n}function BP(e,n){const a=new DOMParser().parseFromString(e,"text/xml");if(a.querySelector("parsererror"))throw new Error("Not valid XML");const r={name:n,amp:null,effects:[],usbGain:null},o=a.querySelector("FUSE Info, Info");o!=null&&o.getAttribute("name")&&(r.name=o.getAttribute("name").trim());const l=a.querySelector("Amplifier");if(l){const i=l.querySelector("Module"),d={model:parseInt((i==null?void 0:i.getAttribute("ID"))||"0"),volume:0,gain:0,gain2:0,master:0,treble:0,middle:0,bass:0,presence:0,depth:128,bias:128,noiseGate:0,threshold:0,cabinet:0,sag:1,brightness:0},m={0:"volume",1:"gain",2:"gain2",3:"master",4:"treble",5:"middle",6:"bass",7:"presence",9:"depth",10:"bias"},x={15:"noiseGate",16:"threshold",17:"cabinet",19:"sag",20:"brightness"};l.querySelectorAll("Param").forEach(p=>{const c=parseInt(p.getAttribute("ControlIndex")),h=parseInt(p.textContent);c in m?d[m[c]]=h>>8&255:c in x&&(d[x[c]]=h)}),_a[d.model]&&(r.amp=d)}a.querySelectorAll("FX Module").forEach(i=>{const d=parseInt(i.getAttribute("ID")||"0");if(!d||!aa[d])return;const m={model:d,dsp:aa[d].d,pos:parseInt(i.getAttribute("POS")||"0"),knobs:[0,0,0,0,0,0]};i.querySelectorAll("Param").forEach(x=>{const p=parseInt(x.getAttribute("ControlIndex"));p>=0&&p<=5&&(m.knobs[p]=parseInt(x.textContent)>>8&255)}),r.effects.push(m)});const s=a.querySelector("UsbGain");if(s&&(r.usbGain=parseInt(s.textContent)&255),!r.amp)throw new Error("No recognizable Amplifier block");return r}function lp(e){const n=[["0",e.amp.volume],["1",e.amp.gain],["2",e.amp.gain2],["3",e.amp.master],["4",e.amp.treble],["5",e.amp.middle],["6",e.amp.bass],["7",e.amp.presence],["9",e.amp.depth],["10",e.amp.bias]].map(([r,o])=>`      <Param ControlIndex="${r}">${(o&255)<<8}</Param>`).join(`
`)+`
`+[["15",e.amp.noiseGate],["16",e.amp.threshold],["17",e.amp.cabinet],["19",e.amp.sag],["20",e.amp.brightness?1:0]].map(([r,o])=>`      <Param ControlIndex="${r}">${o}</Param>`).join(`
`),a=e.effects.map(r=>`    <Module ID="${r.model}" POS="${r.pos}" BypassState="1">
`+r.knobs.map((o,l)=>`      <Param ControlIndex="${l}">${(o&255)<<8}</Param>`).join(`
`)+`
    </Module>`).join(`
`);return`<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang II" ProductId="1">
  <FUSE><Info name="${e.name.replace(/[<>&"]/g,"")}" author="" /></FUSE>
  <Amplifier>
    <Module ID="${e.amp.model}" POS="0" BypassState="1">
${n}
    </Module>
  </Amplifier>
  <FX>
${a}
  </FX>${e.usbGain!=null?`
  <UsbGain>${e.usbGain}</UsbGain>`:""}
</Preset>`}const Jd=e=>[...e].map(n=>n.toString(16).padStart(2,"0")).join(" "),sp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="93" POS="0" BypassState="1">
      <Param ControlIndex="0">51456</Param>
      <Param ControlIndex="1">47360</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">26112</Param>
      <Param ControlIndex="4">31488</Param>
      <Param ControlIndex="5">17664</Param>
      <Param ControlIndex="6">51200</Param>
      <Param ControlIndex="7">28928</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">10</Param>
      <Param ControlIndex="13">10</Param>
      <Param ControlIndex="14">10</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">10</Param>
      <Param ControlIndex="18">10</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">29696</Param>
        <Param ControlIndex="1">31488</Param>
        <Param ControlIndex="2">5120</Param>
        <Param ControlIndex="3">34304</Param>
        <Param ControlIndex="4">28928</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="36" POS="7" BypassState="1">
        <Param ControlIndex="0">20480</Param>
        <Param ControlIndex="1">29952</Param>
        <Param ControlIndex="2">33024</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">44032</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="00 Liquid Solo" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="4" HeelSetting="16384" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,ip=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="100" POS="0" BypassState="1">
      <Param ControlIndex="0">33024</Param>
      <Param ControlIndex="1">30464</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32768</Param>
      <Param ControlIndex="4">32768</Param>
      <Param ControlIndex="5">49408</Param>
      <Param ControlIndex="6">41472</Param>
      <Param ControlIndex="7">65280</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">2</Param>
      <Param ControlIndex="13">2</Param>
      <Param ControlIndex="14">2</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">2</Param>
      <Param ControlIndex="18">2</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="186" POS="2" BypassState="1">
        <Param ControlIndex="0">49408</Param>
        <Param ControlIndex="1">39424</Param>
        <Param ControlIndex="2">33024</Param>
        <Param ControlIndex="3">65280</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="45" POS="5" BypassState="0">
        <Param ControlIndex="0">46848</Param>
        <Param ControlIndex="1">58624</Param>
        <Param ControlIndex="2">15616</Param>
        <Param ControlIndex="3">46592</Param>
        <Param ControlIndex="4">28416</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="11" POS="4" BypassState="1">
        <Param ControlIndex="0">9472</Param>
        <Param ControlIndex="1">19200</Param>
        <Param ControlIndex="2">16640</Param>
        <Param ControlIndex="3">65280</Param>
        <Param ControlIndex="4">33024</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="03 Bad Weather" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="6" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,dp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="246" POS="0" BypassState="1">
      <Param ControlIndex="0">50176</Param>
      <Param ControlIndex="1">30720</Param>
      <Param ControlIndex="2">33024</Param>
      <Param ControlIndex="3">33024</Param>
      <Param ControlIndex="4">31744</Param>
      <Param ControlIndex="5">22784</Param>
      <Param ControlIndex="6">45568</Param>
      <Param ControlIndex="7">48384</Param>
      <Param ControlIndex="8">33024</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">33024</Param>
      <Param ControlIndex="11">33024</Param>
      <Param ControlIndex="12">14</Param>
      <Param ControlIndex="13">14</Param>
      <Param ControlIndex="14">14</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">9</Param>
      <Param ControlIndex="18">14</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="0"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="4" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="0"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="76" POS="4" BypassState="1">
        <Param ControlIndex="0">33536</Param>
        <Param ControlIndex="1">33024</Param>
        <Param ControlIndex="2">33024</Param>
        <Param ControlIndex="3">33024</Param>
        <Param ControlIndex="4">33024</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="05 Twin Swing" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="6" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,mp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="246" POS="0" BypassState="1">
      <Param ControlIndex="0">39168</Param>
      <Param ControlIndex="1">37376</Param>
      <Param ControlIndex="2">33024</Param>
      <Param ControlIndex="3">33024</Param>
      <Param ControlIndex="4">40192</Param>
      <Param ControlIndex="5">31488</Param>
      <Param ControlIndex="6">40192</Param>
      <Param ControlIndex="7">48384</Param>
      <Param ControlIndex="8">33024</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">33024</Param>
      <Param ControlIndex="11">33024</Param>
      <Param ControlIndex="12">4</Param>
      <Param ControlIndex="13">14</Param>
      <Param ControlIndex="14">14</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">9</Param>
      <Param ControlIndex="18">14</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="7" POS="0" BypassState="1">
        <Param ControlIndex="0">31488</Param>
        <Param ControlIndex="1">3840</Param>
        <Param ControlIndex="2">20224</Param>
        <Param ControlIndex="3">32512</Param>
        <Param ControlIndex="4">32512</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="0"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="38" POS="7" BypassState="1">
        <Param ControlIndex="0">9984</Param>
        <Param ControlIndex="1">33024</Param>
        <Param ControlIndex="2">33024</Param>
        <Param ControlIndex="3">33024</Param>
        <Param ControlIndex="4">33024</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="09 Tweed Sugar" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="6" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,up=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="124" POS="0" BypassState="1">
      <Param ControlIndex="0">44544</Param>
      <Param ControlIndex="1">29184</Param>
      <Param ControlIndex="2">0</Param>
      <Param ControlIndex="3">65280</Param>
      <Param ControlIndex="4">65280</Param>
      <Param ControlIndex="5">50944</Param>
      <Param ControlIndex="6">14336</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">12</Param>
      <Param ControlIndex="13">12</Param>
      <Param ControlIndex="14">12</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">5</Param>
      <Param ControlIndex="18">12</Param>
      <Param ControlIndex="19">2</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="75" POS="7" BypassState="1">
        <Param ControlIndex="0">8704</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">37120</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">65280</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="10 Derek Champ" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="1" HeelSetting="24576" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,Pp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="83" POS="0" BypassState="1">
      <Param ControlIndex="0">55040</Param>
      <Param ControlIndex="1">13312</Param>
      <Param ControlIndex="2">0</Param>
      <Param ControlIndex="3">65280</Param>
      <Param ControlIndex="4">37120</Param>
      <Param ControlIndex="5">52992</Param>
      <Param ControlIndex="6">14336</Param>
      <Param ControlIndex="7">0</Param>
      <Param ControlIndex="8">0</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">0</Param>
      <Param ControlIndex="12">3</Param>
      <Param ControlIndex="13">3</Param>
      <Param ControlIndex="14">3</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">3</Param>
      <Param ControlIndex="18">3</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="7" POS="0" BypassState="1">
        <Param ControlIndex="0">9472</Param>
        <Param ControlIndex="1">17920</Param>
        <Param ControlIndex="2">43520</Param>
        <Param ControlIndex="3">16384</Param>
        <Param ControlIndex="4">23808</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="11" POS="7" BypassState="1">
        <Param ControlIndex="0">10496</Param>
        <Param ControlIndex="1">26112</Param>
        <Param ControlIndex="2">15616</Param>
        <Param ControlIndex="3">14592</Param>
        <Param ControlIndex="4">50432</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="16 Country Deluxe" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="12288" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,cp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="117" POS="0" BypassState="1">
      <Param ControlIndex="0">49664</Param>
      <Param ControlIndex="1">36352</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">25344</Param>
      <Param ControlIndex="4">45824</Param>
      <Param ControlIndex="5">47872</Param>
      <Param ControlIndex="6">43520</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">5</Param>
      <Param ControlIndex="13">5</Param>
      <Param ControlIndex="14">5</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">9</Param>
      <Param ControlIndex="18">5</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="64" POS="5" BypassState="1">
        <Param ControlIndex="0">56064</Param>
        <Param ControlIndex="1">44288</Param>
        <Param ControlIndex="2">25344</Param>
        <Param ControlIndex="3">62464</Param>
        <Param ControlIndex="4">61696</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">32000</Param>
        <Param ControlIndex="1">7168</Param>
        <Param ControlIndex="2">0</Param>
        <Param ControlIndex="3">25344</Param>
        <Param ControlIndex="4">32768</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="33" POS="3" BypassState="1">
        <Param ControlIndex="0">32768</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="20 JohnnyMarrTremolo" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="3" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,xp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="114" POS="0" BypassState="1">
      <Param ControlIndex="0">43520</Param>
      <Param ControlIndex="1">43776</Param>
      <Param ControlIndex="2">43520</Param>
      <Param ControlIndex="3">27136</Param>
      <Param ControlIndex="4">35072</Param>
      <Param ControlIndex="5">20480</Param>
      <Param ControlIndex="6">51200</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">6</Param>
      <Param ControlIndex="13">6</Param>
      <Param ControlIndex="14">6</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">12</Param>
      <Param ControlIndex="18">6</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="22" POS="6" BypassState="1">
        <Param ControlIndex="0">7680</Param>
        <Param ControlIndex="1">16384</Param>
        <Param ControlIndex="2">4352</Param>
        <Param ControlIndex="3">7680</Param>
        <Param ControlIndex="4">33024</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="59" POS="7" BypassState="1">
        <Param ControlIndex="0">4608</Param>
        <Param ControlIndex="1">40704</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">33024</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="21 Fusion Lead" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="4096" ToeSetting="32512" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,pp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="117" POS="0" BypassState="1">
      <Param ControlIndex="0">39936</Param>
      <Param ControlIndex="1">32512</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">25344</Param>
      <Param ControlIndex="4">51712</Param>
      <Param ControlIndex="5">41216</Param>
      <Param ControlIndex="6">55296</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">5</Param>
      <Param ControlIndex="13">5</Param>
      <Param ControlIndex="14">5</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">9</Param>
      <Param ControlIndex="18">5</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="7" POS="0" BypassState="1">
        <Param ControlIndex="0">21504</Param>
        <Param ControlIndex="1">3840</Param>
        <Param ControlIndex="2">20224</Param>
        <Param ControlIndex="3">32512</Param>
        <Param ControlIndex="4">32512</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">18944</Param>
        <Param ControlIndex="1">40704</Param>
        <Param ControlIndex="2">7168</Param>
        <Param ControlIndex="3">39680</Param>
        <Param ControlIndex="4">21504</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="58" POS="7" BypassState="1">
        <Param ControlIndex="0">32768</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">50688</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="24 Beauty Clean" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="4" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,Ip=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="103" POS="0" BypassState="1">
      <Param ControlIndex="0">43520</Param>
      <Param ControlIndex="1">43264</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32768</Param>
      <Param ControlIndex="4">48640</Param>
      <Param ControlIndex="5">32768</Param>
      <Param ControlIndex="6">32768</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">46336</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">1</Param>
      <Param ControlIndex="13">1</Param>
      <Param ControlIndex="14">1</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">1</Param>
      <Param ControlIndex="18">1</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="60" POS="0" BypassState="1">
        <Param ControlIndex="0">36608</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="64" POS="5" BypassState="0">
        <Param ControlIndex="0">43264</Param>
        <Param ControlIndex="1">9472</Param>
        <Param ControlIndex="2">25344</Param>
        <Param ControlIndex="3">62464</Param>
        <Param ControlIndex="4">61696</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="21" POS="6" BypassState="0">
        <Param ControlIndex="0">25088</Param>
        <Param ControlIndex="1">23040</Param>
        <Param ControlIndex="2">16128</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="38" POS="7" BypassState="1">
        <Param ControlIndex="0">32768</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="27 Dirty Deluxe" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="3" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,fp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="103" POS="0" BypassState="1">
      <Param ControlIndex="0">42240</Param>
      <Param ControlIndex="1">51456</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32768</Param>
      <Param ControlIndex="4">43776</Param>
      <Param ControlIndex="5">32768</Param>
      <Param ControlIndex="6">32768</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">1</Param>
      <Param ControlIndex="13">1</Param>
      <Param ControlIndex="14">1</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">1</Param>
      <Param ControlIndex="18">1</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">13056</Param>
        <Param ControlIndex="1">11776</Param>
        <Param ControlIndex="2">4864</Param>
        <Param ControlIndex="3">25344</Param>
        <Param ControlIndex="4">32768</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="33" POS="3" BypassState="1">
        <Param ControlIndex="0">4352</Param>
        <Param ControlIndex="1">27904</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">47616</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="30 Neil Deluxe" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="4096" ToeSetting="32512" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,hp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="117" POS="0" BypassState="1">
      <Param ControlIndex="0">49152</Param>
      <Param ControlIndex="1">23296</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32768</Param>
      <Param ControlIndex="4">32512</Param>
      <Param ControlIndex="5">42496</Param>
      <Param ControlIndex="6">43520</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">5</Param>
      <Param ControlIndex="13">5</Param>
      <Param ControlIndex="14">5</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">9</Param>
      <Param ControlIndex="18">5</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="11" POS="7" BypassState="1">
        <Param ControlIndex="0">23040</Param>
        <Param ControlIndex="1">47616</Param>
        <Param ControlIndex="2">40192</Param>
        <Param ControlIndex="3">12288</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="31 Touch of Reverb" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="12288" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,Cp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="106" POS="0" BypassState="1">
      <Param ControlIndex="0">43520</Param>
      <Param ControlIndex="1">21760</Param>
      <Param ControlIndex="2">0</Param>
      <Param ControlIndex="3">65280</Param>
      <Param ControlIndex="4">39168</Param>
      <Param ControlIndex="5">52224</Param>
      <Param ControlIndex="6">19456</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">4</Param>
      <Param ControlIndex="13">4</Param>
      <Param ControlIndex="14">4</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">4</Param>
      <Param ControlIndex="18">4</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="136" POS="0" BypassState="1">
        <Param ControlIndex="0">1</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="4127" POS="4" BypassState="1">
        <Param ControlIndex="0">21760</Param>
        <Param ControlIndex="1">9</Param>
        <Param ControlIndex="2">9</Param>
        <Param ControlIndex="3">5</Param>
        <Param ControlIndex="4">51200</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="72" POS="6" BypassState="1">
        <Param ControlIndex="0">12800</Param>
        <Param ControlIndex="1">45824</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">32768</Param>
        <Param ControlIndex="5">32768</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="11" POS="7" BypassState="1">
        <Param ControlIndex="0">32768</Param>
        <Param ControlIndex="1">35584</Param>
        <Param ControlIndex="2">18688</Param>
        <Param ControlIndex="3">65280</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="33 Amin 3rds Solo" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="3" HeelSetting="0" ToeSetting="26368" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,gp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="100" POS="0" BypassState="1">
      <Param ControlIndex="0">33024</Param>
      <Param ControlIndex="1">50432</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32768</Param>
      <Param ControlIndex="4">40192</Param>
      <Param ControlIndex="5">25600</Param>
      <Param ControlIndex="6">41472</Param>
      <Param ControlIndex="7">37120</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">2</Param>
      <Param ControlIndex="13">2</Param>
      <Param ControlIndex="14">2</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">2</Param>
      <Param ControlIndex="18">2</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="38" POS="7" BypassState="1">
        <Param ControlIndex="0">22528</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="34 Bassman Drive" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="4096" ToeSetting="40704" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,yp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="103" POS="0" BypassState="1">
      <Param ControlIndex="0">43776</Param>
      <Param ControlIndex="1">43776</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32768</Param>
      <Param ControlIndex="4">51456</Param>
      <Param ControlIndex="5">33024</Param>
      <Param ControlIndex="6">18432</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">1</Param>
      <Param ControlIndex="13">1</Param>
      <Param ControlIndex="14">1</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">1</Param>
      <Param ControlIndex="18">1</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="7" POS="0" BypassState="1">
        <Param ControlIndex="0">17920</Param>
        <Param ControlIndex="1">29440</Param>
        <Param ControlIndex="2">43520</Param>
        <Param ControlIndex="3">16384</Param>
        <Param ControlIndex="4">23808</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="58" POS="7" BypassState="1">
        <Param ControlIndex="0">20992</Param>
        <Param ControlIndex="1">16896</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">2048</Param>
        <Param ControlIndex="4">45312</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="37 Chimey Deluxe" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="16384" ToeSetting="49152" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,Sp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="106" POS="0" BypassState="1">
      <Param ControlIndex="0">34560</Param>
      <Param ControlIndex="1">65024</Param>
      <Param ControlIndex="2">0</Param>
      <Param ControlIndex="3">65280</Param>
      <Param ControlIndex="4">65280</Param>
      <Param ControlIndex="5">52224</Param>
      <Param ControlIndex="6">41472</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">58624</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">4</Param>
      <Param ControlIndex="13">4</Param>
      <Param ControlIndex="14">4</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">4</Param>
      <Param ControlIndex="18">4</Param>
      <Param ControlIndex="19">2</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="11" POS="7" BypassState="1">
        <Param ControlIndex="0">11264</Param>
        <Param ControlIndex="1">19200</Param>
        <Param ControlIndex="2">18688</Param>
        <Param ControlIndex="3">65280</Param>
        <Param ControlIndex="4">54016</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="38 Cranked Princeton" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,vp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="124" POS="0" BypassState="1">
      <Param ControlIndex="0">49664</Param>
      <Param ControlIndex="1">36352</Param>
      <Param ControlIndex="2">0</Param>
      <Param ControlIndex="3">65280</Param>
      <Param ControlIndex="4">32768</Param>
      <Param ControlIndex="5">36096</Param>
      <Param ControlIndex="6">25344</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">49152</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">12</Param>
      <Param ControlIndex="13">12</Param>
      <Param ControlIndex="14">12</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">5</Param>
      <Param ControlIndex="18">12</Param>
      <Param ControlIndex="19">2</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="60" POS="0" BypassState="0">
        <Param ControlIndex="0">22016</Param>
        <Param ControlIndex="1">63488</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">0</Param>
        <Param ControlIndex="4">42496</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="45" POS="5" BypassState="0">
        <Param ControlIndex="0">46848</Param>
        <Param ControlIndex="1">16384</Param>
        <Param ControlIndex="2">7424</Param>
        <Param ControlIndex="3">44288</Param>
        <Param ControlIndex="4">33280</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="0">
        <Param ControlIndex="0">18944</Param>
        <Param ControlIndex="1">40704</Param>
        <Param ControlIndex="2">7168</Param>
        <Param ControlIndex="3">39680</Param>
        <Param ControlIndex="4">21504</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="38" POS="7" BypassState="1">
        <Param ControlIndex="0">30720</Param>
        <Param ControlIndex="1">40448</Param>
        <Param ControlIndex="2">30464</Param>
        <Param ControlIndex="3">32512</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="40 Small Champ" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="1" HeelSetting="20480" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,Mp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="100" POS="0" BypassState="1">
      <Param ControlIndex="0">33024</Param>
      <Param ControlIndex="1">41472</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32768</Param>
      <Param ControlIndex="4">32768</Param>
      <Param ControlIndex="5">49408</Param>
      <Param ControlIndex="6">41472</Param>
      <Param ControlIndex="7">65280</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">2</Param>
      <Param ControlIndex="13">2</Param>
      <Param ControlIndex="14">2</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">2</Param>
      <Param ControlIndex="18">2</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="33" POS="3" BypassState="1">
        <Param ControlIndex="0">25088</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="43 Bassman Splash" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,Dp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="117" POS="0" BypassState="1">
      <Param ControlIndex="0">45824</Param>
      <Param ControlIndex="1">16896</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">25344</Param>
      <Param ControlIndex="4">29184</Param>
      <Param ControlIndex="5">34048</Param>
      <Param ControlIndex="6">20224</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">5</Param>
      <Param ControlIndex="13">5</Param>
      <Param ControlIndex="14">5</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">9</Param>
      <Param ControlIndex="18">5</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="7" POS="0" BypassState="1">
        <Param ControlIndex="0">21504</Param>
        <Param ControlIndex="1">26880</Param>
        <Param ControlIndex="2">19712</Param>
        <Param ControlIndex="3">32512</Param>
        <Param ControlIndex="4">32512</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">14848</Param>
        <Param ControlIndex="1">65280</Param>
        <Param ControlIndex="2">12544</Param>
        <Param ControlIndex="3">22528</Param>
        <Param ControlIndex="4">17408</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="58" POS="7" BypassState="1">
        <Param ControlIndex="0">21760</Param>
        <Param ControlIndex="1">26624</Param>
        <Param ControlIndex="2">39680</Param>
        <Param ControlIndex="3">39680</Param>
        <Param ControlIndex="4">1536</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="47 Gomez Clean" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="12288" ToeSetting="44800" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,bp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="103" POS="0" BypassState="1">
      <Param ControlIndex="0">37888</Param>
      <Param ControlIndex="1">64256</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32768</Param>
      <Param ControlIndex="4">65280</Param>
      <Param ControlIndex="5">65280</Param>
      <Param ControlIndex="6">65280</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">62976</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">1</Param>
      <Param ControlIndex="13">1</Param>
      <Param ControlIndex="14">1</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">1</Param>
      <Param ControlIndex="18">1</Param>
      <Param ControlIndex="19">2</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="60" POS="0" BypassState="0">
        <Param ControlIndex="0">36608</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="64" POS="5" BypassState="0">
        <Param ControlIndex="0">43264</Param>
        <Param ControlIndex="1">9472</Param>
        <Param ControlIndex="2">25344</Param>
        <Param ControlIndex="3">62464</Param>
        <Param ControlIndex="4">61696</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">32512</Param>
        <Param ControlIndex="1">26624</Param>
        <Param ControlIndex="2">14848</Param>
        <Param ControlIndex="3">25344</Param>
        <Param ControlIndex="4">65280</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="36" POS="7" BypassState="1">
        <Param ControlIndex="0">28160</Param>
        <Param ControlIndex="1">23808</Param>
        <Param ControlIndex="2">28160</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">37120</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="52 Killer Cortez" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="16384" ToeSetting="48896" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,wp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="83" POS="0" BypassState="1">
      <Param ControlIndex="0">40960</Param>
      <Param ControlIndex="1">28928</Param>
      <Param ControlIndex="2">0</Param>
      <Param ControlIndex="3">65280</Param>
      <Param ControlIndex="4">37120</Param>
      <Param ControlIndex="5">52992</Param>
      <Param ControlIndex="6">14336</Param>
      <Param ControlIndex="7">0</Param>
      <Param ControlIndex="8">0</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">0</Param>
      <Param ControlIndex="12">3</Param>
      <Param ControlIndex="13">3</Param>
      <Param ControlIndex="14">3</Param>
      <Param ControlIndex="15">4</Param>
      <Param ControlIndex="16">5</Param>
      <Param ControlIndex="17">3</Param>
      <Param ControlIndex="18">3</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="136" POS="0" BypassState="1">
        <Param ControlIndex="0">1</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="22" POS="6" BypassState="1">
        <Param ControlIndex="0">65280</Param>
        <Param ControlIndex="1">7424</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="7" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="56 The Cab Charles 2" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="4" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,Bp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="103" POS="0" BypassState="1">
      <Param ControlIndex="0">40960</Param>
      <Param ControlIndex="1">52992</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32768</Param>
      <Param ControlIndex="4">51456</Param>
      <Param ControlIndex="5">28416</Param>
      <Param ControlIndex="6">32768</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">1</Param>
      <Param ControlIndex="13">1</Param>
      <Param ControlIndex="14">1</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">1</Param>
      <Param ControlIndex="18">1</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="33" POS="3" BypassState="1">
        <Param ControlIndex="0">2048</Param>
        <Param ControlIndex="1">27904</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">47616</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="58 One Bourbon" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="1280" ToeSetting="16384" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,kp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="103" POS="0" BypassState="1">
      <Param ControlIndex="0">49664</Param>
      <Param ControlIndex="1">33792</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32768</Param>
      <Param ControlIndex="4">48640</Param>
      <Param ControlIndex="5">32768</Param>
      <Param ControlIndex="6">32768</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">1</Param>
      <Param ControlIndex="13">1</Param>
      <Param ControlIndex="14">1</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">1</Param>
      <Param ControlIndex="18">1</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">33280</Param>
        <Param ControlIndex="1">5888</Param>
        <Param ControlIndex="2">4096</Param>
        <Param ControlIndex="3">25344</Param>
        <Param ControlIndex="4">32768</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="38" POS="7" BypassState="1">
        <Param ControlIndex="0">13568</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="64 Rockabilly Train" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="4" HeelSetting="8192" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,Fp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="83" POS="0" BypassState="1">
      <Param ControlIndex="0">30976</Param>
      <Param ControlIndex="1">44288</Param>
      <Param ControlIndex="2">0</Param>
      <Param ControlIndex="3">65280</Param>
      <Param ControlIndex="4">37376</Param>
      <Param ControlIndex="5">52992</Param>
      <Param ControlIndex="6">16640</Param>
      <Param ControlIndex="7">0</Param>
      <Param ControlIndex="8">0</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">0</Param>
      <Param ControlIndex="12">3</Param>
      <Param ControlIndex="13">3</Param>
      <Param ControlIndex="14">3</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">7</Param>
      <Param ControlIndex="18">3</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="11" POS="7" BypassState="1">
        <Param ControlIndex="0">5632</Param>
        <Param ControlIndex="1">14080</Param>
        <Param ControlIndex="2">18688</Param>
        <Param ControlIndex="3">65280</Param>
        <Param ControlIndex="4">28416</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="65 Cheap Deluxe" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="0" ToeSetting="32512" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,Ep=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="83" POS="0" BypassState="1">
      <Param ControlIndex="0">41728</Param>
      <Param ControlIndex="1">24832</Param>
      <Param ControlIndex="2">0</Param>
      <Param ControlIndex="3">65280</Param>
      <Param ControlIndex="4">35072</Param>
      <Param ControlIndex="5">52992</Param>
      <Param ControlIndex="6">16640</Param>
      <Param ControlIndex="7">0</Param>
      <Param ControlIndex="8">0</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">0</Param>
      <Param ControlIndex="12">3</Param>
      <Param ControlIndex="13">3</Param>
      <Param ControlIndex="14">3</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">3</Param>
      <Param ControlIndex="18">3</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="60" POS="0" BypassState="1">
        <Param ControlIndex="0">22784</Param>
        <Param ControlIndex="1">40192</Param>
        <Param ControlIndex="2">37632</Param>
        <Param ControlIndex="3">29184</Param>
        <Param ControlIndex="4">30720</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="42" POS="6" BypassState="1">
        <Param ControlIndex="0">16640</Param>
        <Param ControlIndex="1">35072</Param>
        <Param ControlIndex="2">7168</Param>
        <Param ControlIndex="3">25344</Param>
        <Param ControlIndex="4">65280</Param>
        <Param ControlIndex="5">32768</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="11" POS="7" BypassState="1">
        <Param ControlIndex="0">7168</Param>
        <Param ControlIndex="1">35584</Param>
        <Param ControlIndex="2">18688</Param>
        <Param ControlIndex="3">65280</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="66 Sensitive" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="1" HeelSetting="20480" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,Tp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="83" POS="0" BypassState="1">
      <Param ControlIndex="0">37888</Param>
      <Param ControlIndex="1">33792</Param>
      <Param ControlIndex="2">0</Param>
      <Param ControlIndex="3">65280</Param>
      <Param ControlIndex="4">30720</Param>
      <Param ControlIndex="5">30464</Param>
      <Param ControlIndex="6">17664</Param>
      <Param ControlIndex="7">0</Param>
      <Param ControlIndex="8">0</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">46080</Param>
      <Param ControlIndex="11">0</Param>
      <Param ControlIndex="12">3</Param>
      <Param ControlIndex="13">3</Param>
      <Param ControlIndex="14">3</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">0</Param>
      <Param ControlIndex="18">3</Param>
      <Param ControlIndex="19">0</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">7168</Param>
        <Param ControlIndex="1">29696</Param>
        <Param ControlIndex="2">15872</Param>
        <Param ControlIndex="3">0</Param>
        <Param ControlIndex="4">12800</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="11" POS="7" BypassState="1">
        <Param ControlIndex="0">13056</Param>
        <Param ControlIndex="1">33792</Param>
        <Param ControlIndex="2">19712</Param>
        <Param ControlIndex="3">61440</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="74 Juicy Clean" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="4" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,Np=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="106" POS="0" BypassState="1">
      <Param ControlIndex="0">43776</Param>
      <Param ControlIndex="1">28672</Param>
      <Param ControlIndex="2">0</Param>
      <Param ControlIndex="3">65280</Param>
      <Param ControlIndex="4">37888</Param>
      <Param ControlIndex="5">39424</Param>
      <Param ControlIndex="6">17152</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">12032</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">4</Param>
      <Param ControlIndex="13">4</Param>
      <Param ControlIndex="14">4</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">4</Param>
      <Param ControlIndex="18">4</Param>
      <Param ControlIndex="19">0</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="7" POS="0" BypassState="1">
        <Param ControlIndex="0">32512</Param>
        <Param ControlIndex="1">7424</Param>
        <Param ControlIndex="2">8448</Param>
        <Param ControlIndex="3">0</Param>
        <Param ControlIndex="4">32512</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="45" POS="5" BypassState="1">
        <Param ControlIndex="0">48896</Param>
        <Param ControlIndex="1">48384</Param>
        <Param ControlIndex="2">16896</Param>
        <Param ControlIndex="3">16640</Param>
        <Param ControlIndex="4">24064</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">7168</Param>
        <Param ControlIndex="1">29696</Param>
        <Param ControlIndex="2">15872</Param>
        <Param ControlIndex="3">0</Param>
        <Param ControlIndex="4">12800</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="11" POS="7" BypassState="1">
        <Param ControlIndex="0">13056</Param>
        <Param ControlIndex="1">33792</Param>
        <Param ControlIndex="2">19712</Param>
        <Param ControlIndex="3">61440</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="75 Swirlin Diddy" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="3" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,jp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="106" POS="0" BypassState="1">
      <Param ControlIndex="0">43520</Param>
      <Param ControlIndex="1">19968</Param>
      <Param ControlIndex="2">0</Param>
      <Param ControlIndex="3">65280</Param>
      <Param ControlIndex="4">39168</Param>
      <Param ControlIndex="5">52224</Param>
      <Param ControlIndex="6">19456</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">4</Param>
      <Param ControlIndex="13">4</Param>
      <Param ControlIndex="14">4</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">4</Param>
      <Param ControlIndex="18">4</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="7" POS="0" BypassState="1">
        <Param ControlIndex="0">28160</Param>
        <Param ControlIndex="1">13312</Param>
        <Param ControlIndex="2">18944</Param>
        <Param ControlIndex="3">32512</Param>
        <Param ControlIndex="4">32512</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="79" POS="1" BypassState="0">
        <Param ControlIndex="0">64768</Param>
        <Param ControlIndex="1">0</Param>
        <Param ControlIndex="2">64768</Param>
        <Param ControlIndex="3">47104</Param>
        <Param ControlIndex="4">0</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">16896</Param>
        <Param ControlIndex="1">27136</Param>
        <Param ControlIndex="2">18944</Param>
        <Param ControlIndex="3">25344</Param>
        <Param ControlIndex="4">56064</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="11" POS="7" BypassState="1">
        <Param ControlIndex="0">13056</Param>
        <Param ControlIndex="1">32512</Param>
        <Param ControlIndex="2">16896</Param>
        <Param ControlIndex="3">65280</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="82 Delayed Princeton" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="4" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="2" />
  <UsbGain>0</UsbGain>
</Preset>`,Op=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="103" POS="0" BypassState="1">
      <Param ControlIndex="0">43520</Param>
      <Param ControlIndex="1">39168</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32768</Param>
      <Param ControlIndex="4">48640</Param>
      <Param ControlIndex="5">32768</Param>
      <Param ControlIndex="6">32768</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">1</Param>
      <Param ControlIndex="13">1</Param>
      <Param ControlIndex="14">1</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">1</Param>
      <Param ControlIndex="18">1</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="7" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="85 Basic '57 Deluxe" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="1" HeelSetting="20480" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,_p=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="117" POS="0" BypassState="1">
      <Param ControlIndex="0">43520</Param>
      <Param ControlIndex="1">22272</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">25344</Param>
      <Param ControlIndex="4">45824</Param>
      <Param ControlIndex="5">47872</Param>
      <Param ControlIndex="6">43520</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">5</Param>
      <Param ControlIndex="13">5</Param>
      <Param ControlIndex="14">5</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">9</Param>
      <Param ControlIndex="18">5</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="7" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="90 Basic '65 Twin" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="1" HeelSetting="20480" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,Ap=`<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang II" ProductId="1">
  <FUSE><Info name="Sample - Twin Jam Lead" author="" /></FUSE>
  <Amplifier>
    <Module ID="117" POS="0" BypassState="1">
      <Param ControlIndex="0">45056</Param>
      <Param ControlIndex="1">24576</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">36864</Param>
      <Param ControlIndex="4">40960</Param>
      <Param ControlIndex="5">34816</Param>
      <Param ControlIndex="6">28672</Param>
      <Param ControlIndex="7">36864</Param>
      <Param ControlIndex="9">32768</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">5</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">1</Param>
    </Module>
  </Amplifier>
  <FX>
    <Module ID="7" POS="1" BypassState="1">
      <Param ControlIndex="0">28672</Param>
      <Param ControlIndex="1">24576</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">24576</Param>
      <Param ControlIndex="4">32768</Param>
      <Param ControlIndex="5">0</Param>
    </Module>
    <Module ID="43" POS="2" BypassState="1">
      <Param ControlIndex="0">22528</Param>
      <Param ControlIndex="1">26624</Param>
      <Param ControlIndex="2">20480</Param>
      <Param ControlIndex="3">32768</Param>
      <Param ControlIndex="4">32768</Param>
      <Param ControlIndex="5">0</Param>
    </Module>
    <Module ID="33" POS="3" BypassState="1">
      <Param ControlIndex="0">20480</Param>
      <Param ControlIndex="1">32768</Param>
      <Param ControlIndex="2">24576</Param>
      <Param ControlIndex="3">36864</Param>
      <Param ControlIndex="4">28672</Param>
      <Param ControlIndex="5">0</Param>
    </Module>
  </FX>
  <UsbGain>128</UsbGain>
</Preset>`,Rp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="93" POS="0" BypassState="1">
      <Param ControlIndex="0">51456</Param>
      <Param ControlIndex="1">47360</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">26112</Param>
      <Param ControlIndex="4">31488</Param>
      <Param ControlIndex="5">17664</Param>
      <Param ControlIndex="6">51200</Param>
      <Param ControlIndex="7">28928</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">10</Param>
      <Param ControlIndex="13">10</Param>
      <Param ControlIndex="14">10</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">10</Param>
      <Param ControlIndex="18">10</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">29696</Param>
        <Param ControlIndex="1">31488</Param>
        <Param ControlIndex="2">5120</Param>
        <Param ControlIndex="3">34304</Param>
        <Param ControlIndex="4">28928</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="36" POS="7" BypassState="1">
        <Param ControlIndex="0">20480</Param>
        <Param ControlIndex="1">29952</Param>
        <Param ControlIndex="2">33024</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">44032</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="00 Liquid Solo" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="4" HeelSetting="16384" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,Vp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="109" POS="0" BypassState="1">
      <Param ControlIndex="0">50944</Param>
      <Param ControlIndex="1">22016</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">21760</Param>
      <Param ControlIndex="4">36608</Param>
      <Param ControlIndex="5">36608</Param>
      <Param ControlIndex="6">51200</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">42752</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">8</Param>
      <Param ControlIndex="13">8</Param>
      <Param ControlIndex="14">8</Param>
      <Param ControlIndex="15">4</Param>
      <Param ControlIndex="16">5</Param>
      <Param ControlIndex="17">8</Param>
      <Param ControlIndex="18">8</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="60" POS="0" BypassState="1">
        <Param ControlIndex="0">65280</Param>
        <Param ControlIndex="1">29696</Param>
        <Param ControlIndex="2">36352</Param>
        <Param ControlIndex="3">36608</Param>
        <Param ControlIndex="4">29696</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="58" POS="7" BypassState="1">
        <Param ControlIndex="0">0</Param>
        <Param ControlIndex="1">15872</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">1280</Param>
        <Param ControlIndex="4">45056</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="01 Whitechapel Heavy" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="2" HeelSetting="0" ToeSetting="52992" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,Up=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="117" POS="0" BypassState="1">
      <Param ControlIndex="0">46592</Param>
      <Param ControlIndex="1">7680</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">25344</Param>
      <Param ControlIndex="4">45824</Param>
      <Param ControlIndex="5">47872</Param>
      <Param ControlIndex="6">43520</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">12544</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">5</Param>
      <Param ControlIndex="13">5</Param>
      <Param ControlIndex="14">5</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">9</Param>
      <Param ControlIndex="18">5</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="7" POS="0" BypassState="1">
        <Param ControlIndex="0">20480</Param>
        <Param ControlIndex="1">46080</Param>
        <Param ControlIndex="2">48128</Param>
        <Param ControlIndex="3">15104</Param>
        <Param ControlIndex="4">50176</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="18" POS="5" BypassState="1">
        <Param ControlIndex="0">65280</Param>
        <Param ControlIndex="1">3584</Param>
        <Param ControlIndex="2">6400</Param>
        <Param ControlIndex="3">6400</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">18944</Param>
        <Param ControlIndex="1">13568</Param>
        <Param ControlIndex="2">7168</Param>
        <Param ControlIndex="3">39680</Param>
        <Param ControlIndex="4">21504</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="58" POS="7" BypassState="1">
        <Param ControlIndex="0">29440</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">50688</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="02 Intro Clean" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="4" HeelSetting="20480" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,Gp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="100" POS="0" BypassState="1">
      <Param ControlIndex="0">33024</Param>
      <Param ControlIndex="1">30464</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32768</Param>
      <Param ControlIndex="4">32768</Param>
      <Param ControlIndex="5">49408</Param>
      <Param ControlIndex="6">41472</Param>
      <Param ControlIndex="7">65280</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">2</Param>
      <Param ControlIndex="13">2</Param>
      <Param ControlIndex="14">2</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">2</Param>
      <Param ControlIndex="18">2</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="186" POS="2" BypassState="1">
        <Param ControlIndex="0">49408</Param>
        <Param ControlIndex="1">39424</Param>
        <Param ControlIndex="2">33024</Param>
        <Param ControlIndex="3">65280</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="45" POS="5" BypassState="0">
        <Param ControlIndex="0">46848</Param>
        <Param ControlIndex="1">58624</Param>
        <Param ControlIndex="2">15616</Param>
        <Param ControlIndex="3">46592</Param>
        <Param ControlIndex="4">28416</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="11" POS="4" BypassState="1">
        <Param ControlIndex="0">9472</Param>
        <Param ControlIndex="1">19200</Param>
        <Param ControlIndex="2">16640</Param>
        <Param ControlIndex="3">65280</Param>
        <Param ControlIndex="4">33024</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="03 Bad Weather" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="6" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,Lp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="109" POS="0" BypassState="1">
      <Param ControlIndex="0">44032</Param>
      <Param ControlIndex="1">42496</Param>
      <Param ControlIndex="2">33024</Param>
      <Param ControlIndex="3">22016</Param>
      <Param ControlIndex="4">39680</Param>
      <Param ControlIndex="5">19968</Param>
      <Param ControlIndex="6">37376</Param>
      <Param ControlIndex="7">36608</Param>
      <Param ControlIndex="8">33024</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">33024</Param>
      <Param ControlIndex="11">33024</Param>
      <Param ControlIndex="12">4</Param>
      <Param ControlIndex="13">8</Param>
      <Param ControlIndex="14">8</Param>
      <Param ControlIndex="15">2</Param>
      <Param ControlIndex="16">3</Param>
      <Param ControlIndex="17">8</Param>
      <Param ControlIndex="18">8</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="2" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="4127" POS="4" BypassState="1">
        <Param ControlIndex="0">17408</Param>
        <Param ControlIndex="1">9</Param>
        <Param ControlIndex="2">4</Param>
        <Param ControlIndex="3">5</Param>
        <Param ControlIndex="4">51200</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="22" POS="5" BypassState="1">
        <Param ControlIndex="0">20736</Param>
        <Param ControlIndex="1">33024</Param>
        <Param ControlIndex="2">7424</Param>
        <Param ControlIndex="3">33024</Param>
        <Param ControlIndex="4">33024</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="04 E Minor Avenger" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="3" HeelSetting="0" ToeSetting="22272" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,Wp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="246" POS="0" BypassState="1">
      <Param ControlIndex="0">50176</Param>
      <Param ControlIndex="1">30720</Param>
      <Param ControlIndex="2">33024</Param>
      <Param ControlIndex="3">33024</Param>
      <Param ControlIndex="4">31744</Param>
      <Param ControlIndex="5">22784</Param>
      <Param ControlIndex="6">45568</Param>
      <Param ControlIndex="7">48384</Param>
      <Param ControlIndex="8">33024</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">33024</Param>
      <Param ControlIndex="11">33024</Param>
      <Param ControlIndex="12">14</Param>
      <Param ControlIndex="13">14</Param>
      <Param ControlIndex="14">14</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">9</Param>
      <Param ControlIndex="18">14</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="0"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="4" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="0"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="76" POS="4" BypassState="1">
        <Param ControlIndex="0">33536</Param>
        <Param ControlIndex="1">33024</Param>
        <Param ControlIndex="2">33024</Param>
        <Param ControlIndex="3">33024</Param>
        <Param ControlIndex="4">33024</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="05 Twin Swing" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="6" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,zp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="249" POS="0" BypassState="1">
      <Param ControlIndex="0">44032</Param>
      <Param ControlIndex="1">60928</Param>
      <Param ControlIndex="2">33024</Param>
      <Param ControlIndex="3">33024</Param>
      <Param ControlIndex="4">38912</Param>
      <Param ControlIndex="5">33024</Param>
      <Param ControlIndex="6">40192</Param>
      <Param ControlIndex="7">33024</Param>
      <Param ControlIndex="8">33024</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">33024</Param>
      <Param ControlIndex="11">33024</Param>
      <Param ControlIndex="12">4</Param>
      <Param ControlIndex="13">15</Param>
      <Param ControlIndex="14">15</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">1</Param>
      <Param ControlIndex="18">15</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="271" POS="0" BypassState="1">
        <Param ControlIndex="0">17408</Param>
        <Param ControlIndex="1">48640</Param>
        <Param ControlIndex="2">17152</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="4" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="0"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="76" POS="4" BypassState="1">
        <Param ControlIndex="0">33536</Param>
        <Param ControlIndex="1">33024</Param>
        <Param ControlIndex="2">33024</Param>
        <Param ControlIndex="3">33024</Param>
        <Param ControlIndex="4">33024</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="06 Pawn King" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="6" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,$p=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="255" POS="0" BypassState="1">
      <Param ControlIndex="0">47616</Param>
      <Param ControlIndex="1">40192</Param>
      <Param ControlIndex="2">33024</Param>
      <Param ControlIndex="3">65280</Param>
      <Param ControlIndex="4">45056</Param>
      <Param ControlIndex="5">43264</Param>
      <Param ControlIndex="6">42496</Param>
      <Param ControlIndex="7">34560</Param>
      <Param ControlIndex="8">33024</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">33024</Param>
      <Param ControlIndex="11">33024</Param>
      <Param ControlIndex="12">4</Param>
      <Param ControlIndex="13">17</Param>
      <Param ControlIndex="14">17</Param>
      <Param ControlIndex="15">2</Param>
      <Param ControlIndex="16">3</Param>
      <Param ControlIndex="17">10</Param>
      <Param ControlIndex="18">17</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="271" POS="0" BypassState="1">
        <Param ControlIndex="0">44032</Param>
        <Param ControlIndex="1">40192</Param>
        <Param ControlIndex="2">17664</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="18" POS="4" BypassState="1">
        <Param ControlIndex="0">30976</Param>
        <Param ControlIndex="1">0</Param>
        <Param ControlIndex="2">36096</Param>
        <Param ControlIndex="3">6912</Param>
        <Param ControlIndex="4">33024</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">25344</Param>
        <Param ControlIndex="1">34048</Param>
        <Param ControlIndex="2">10496</Param>
        <Param ControlIndex="3">18176</Param>
        <Param ControlIndex="4">33024</Param>
        <Param ControlIndex="5">256</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="36" POS="7" BypassState="1">
        <Param ControlIndex="0">20992</Param>
        <Param ControlIndex="1">26112</Param>
        <Param ControlIndex="2">42496</Param>
        <Param ControlIndex="3">20992</Param>
        <Param ControlIndex="4">65280</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="07 Pigs Can Fly" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="6" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,Xp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="106" POS="0" BypassState="1">
      <Param ControlIndex="0">43520</Param>
      <Param ControlIndex="1">21760</Param>
      <Param ControlIndex="2">0</Param>
      <Param ControlIndex="3">65280</Param>
      <Param ControlIndex="4">39168</Param>
      <Param ControlIndex="5">52224</Param>
      <Param ControlIndex="6">19456</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">4</Param>
      <Param ControlIndex="13">4</Param>
      <Param ControlIndex="14">4</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">4</Param>
      <Param ControlIndex="18">4</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="18" POS="5" BypassState="1">
        <Param ControlIndex="0">65280</Param>
        <Param ControlIndex="1">3584</Param>
        <Param ControlIndex="2">6400</Param>
        <Param ControlIndex="3">6400</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="42" POS="6" BypassState="1">
        <Param ControlIndex="0">32000</Param>
        <Param ControlIndex="1">34816</Param>
        <Param ControlIndex="2">7168</Param>
        <Param ControlIndex="3">25344</Param>
        <Param ControlIndex="4">65280</Param>
        <Param ControlIndex="5">32768</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="11" POS="7" BypassState="1">
        <Param ControlIndex="0">32768</Param>
        <Param ControlIndex="1">35584</Param>
        <Param ControlIndex="2">18688</Param>
        <Param ControlIndex="3">65280</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="08 Johnny Marr Clean" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="4" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="2" />
  <UsbGain>0</UsbGain>
</Preset>`,Hp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="246" POS="0" BypassState="1">
      <Param ControlIndex="0">39168</Param>
      <Param ControlIndex="1">37376</Param>
      <Param ControlIndex="2">33024</Param>
      <Param ControlIndex="3">33024</Param>
      <Param ControlIndex="4">40192</Param>
      <Param ControlIndex="5">31488</Param>
      <Param ControlIndex="6">40192</Param>
      <Param ControlIndex="7">48384</Param>
      <Param ControlIndex="8">33024</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">33024</Param>
      <Param ControlIndex="11">33024</Param>
      <Param ControlIndex="12">4</Param>
      <Param ControlIndex="13">14</Param>
      <Param ControlIndex="14">14</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">9</Param>
      <Param ControlIndex="18">14</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="7" POS="0" BypassState="1">
        <Param ControlIndex="0">31488</Param>
        <Param ControlIndex="1">3840</Param>
        <Param ControlIndex="2">20224</Param>
        <Param ControlIndex="3">32512</Param>
        <Param ControlIndex="4">32512</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="0"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="38" POS="7" BypassState="1">
        <Param ControlIndex="0">9984</Param>
        <Param ControlIndex="1">33024</Param>
        <Param ControlIndex="2">33024</Param>
        <Param ControlIndex="3">33024</Param>
        <Param ControlIndex="4">33024</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="09 Tweed Sugar" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="6" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,Kp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="124" POS="0" BypassState="1">
      <Param ControlIndex="0">44544</Param>
      <Param ControlIndex="1">29184</Param>
      <Param ControlIndex="2">0</Param>
      <Param ControlIndex="3">65280</Param>
      <Param ControlIndex="4">65280</Param>
      <Param ControlIndex="5">50944</Param>
      <Param ControlIndex="6">14336</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">12</Param>
      <Param ControlIndex="13">12</Param>
      <Param ControlIndex="14">12</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">5</Param>
      <Param ControlIndex="18">12</Param>
      <Param ControlIndex="19">2</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="75" POS="7" BypassState="1">
        <Param ControlIndex="0">8704</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">37120</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">65280</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="10 Derek Champ" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="1" HeelSetting="24576" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,Yp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="94" POS="0" BypassState="1">
      <Param ControlIndex="0">43776</Param>
      <Param ControlIndex="1">22272</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32000</Param>
      <Param ControlIndex="4">0</Param>
      <Param ControlIndex="5">40704</Param>
      <Param ControlIndex="6">65280</Param>
      <Param ControlIndex="7">0</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">9</Param>
      <Param ControlIndex="13">9</Param>
      <Param ControlIndex="14">9</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">6</Param>
      <Param ControlIndex="18">9</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="186" POS="0" BypassState="1">
        <Param ControlIndex="0">30976</Param>
        <Param ControlIndex="1">65280</Param>
        <Param ControlIndex="2">35840</Param>
        <Param ControlIndex="3">65280</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="1" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">17664</Param>
        <Param ControlIndex="1">16384</Param>
        <Param ControlIndex="2">10752</Param>
        <Param ControlIndex="3">25088</Param>
        <Param ControlIndex="4">44032</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="58" POS="7" BypassState="1">
        <Param ControlIndex="0">8192</Param>
        <Param ControlIndex="1">18432</Param>
        <Param ControlIndex="2">43776</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">65280</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="11 Green Cliffs" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="6" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,Jp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="97" POS="0" BypassState="1">
      <Param ControlIndex="0">40960</Param>
      <Param ControlIndex="1">22016</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">41472</Param>
      <Param ControlIndex="4">39424</Param>
      <Param ControlIndex="5">32768</Param>
      <Param ControlIndex="6">30720</Param>
      <Param ControlIndex="7">0</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">7</Param>
      <Param ControlIndex="13">7</Param>
      <Param ControlIndex="14">7</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">7</Param>
      <Param ControlIndex="18">7</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="7" POS="0" BypassState="1">
        <Param ControlIndex="0">29184</Param>
        <Param ControlIndex="1">11008</Param>
        <Param ControlIndex="2">65280</Param>
        <Param ControlIndex="3">0</Param>
        <Param ControlIndex="4">0</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="36" POS="7" BypassState="1">
        <Param ControlIndex="0">20992</Param>
        <Param ControlIndex="1">26112</Param>
        <Param ControlIndex="2">42496</Param>
        <Param ControlIndex="3">20992</Param>
        <Param ControlIndex="4">65280</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="12 60s Sparkle" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="4096" ToeSetting="44800" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,Qp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="241" POS="0" BypassState="1">
      <Param ControlIndex="0">65280</Param>
      <Param ControlIndex="1">36864</Param>
      <Param ControlIndex="2">33024</Param>
      <Param ControlIndex="3">33024</Param>
      <Param ControlIndex="4">33024</Param>
      <Param ControlIndex="5">33024</Param>
      <Param ControlIndex="6">33024</Param>
      <Param ControlIndex="7">33024</Param>
      <Param ControlIndex="8">33024</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">33024</Param>
      <Param ControlIndex="11">33024</Param>
      <Param ControlIndex="12">13</Param>
      <Param ControlIndex="13">13</Param>
      <Param ControlIndex="14">13</Param>
      <Param ControlIndex="15">2</Param>
      <Param ControlIndex="16">3</Param>
      <Param ControlIndex="17">10</Param>
      <Param ControlIndex="18">13</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="272" POS="0" BypassState="1">
        <Param ControlIndex="0">44288</Param>
        <Param ControlIndex="1">65280</Param>
        <Param ControlIndex="2">33024</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="18" POS="5" BypassState="1">
        <Param ControlIndex="0">65280</Param>
        <Param ControlIndex="1">3840</Param>
        <Param ControlIndex="2">6912</Param>
        <Param ControlIndex="3">6912</Param>
        <Param ControlIndex="4">33024</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="42" POS="6" BypassState="1">
        <Param ControlIndex="0">4608</Param>
        <Param ControlIndex="1">35072</Param>
        <Param ControlIndex="2">7424</Param>
        <Param ControlIndex="3">25600</Param>
        <Param ControlIndex="4">65280</Param>
        <Param ControlIndex="5">33024</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="58" POS="7" BypassState="1">
        <Param ControlIndex="0">0</Param>
        <Param ControlIndex="1">15872</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">1280</Param>
        <Param ControlIndex="4">45056</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="13 80s Guitar Hero" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="2" HeelSetting="0" ToeSetting="52992" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,qp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="255" POS="0" BypassState="1">
      <Param ControlIndex="0">47616</Param>
      <Param ControlIndex="1">57088</Param>
      <Param ControlIndex="2">33024</Param>
      <Param ControlIndex="3">65280</Param>
      <Param ControlIndex="4">33280</Param>
      <Param ControlIndex="5">38912</Param>
      <Param ControlIndex="6">42496</Param>
      <Param ControlIndex="7">13312</Param>
      <Param ControlIndex="8">33024</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">33024</Param>
      <Param ControlIndex="11">33024</Param>
      <Param ControlIndex="12">4</Param>
      <Param ControlIndex="13">17</Param>
      <Param ControlIndex="14">17</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">10</Param>
      <Param ControlIndex="18">17</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="271" POS="0" BypassState="0">
        <Param ControlIndex="0">36864</Param>
        <Param ControlIndex="1">44032</Param>
        <Param ControlIndex="2">20736</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="1" BypassState="0"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="4" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="58" POS="4" BypassState="1">
        <Param ControlIndex="0">13312</Param>
        <Param ControlIndex="1">16384</Param>
        <Param ControlIndex="2">33024</Param>
        <Param ControlIndex="3">1792</Param>
        <Param ControlIndex="4">45312</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="14 Loud as Leeds" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="0" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,Zp=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="249" POS="0" BypassState="1">
      <Param ControlIndex="0">36608</Param>
      <Param ControlIndex="1">33024</Param>
      <Param ControlIndex="2">33024</Param>
      <Param ControlIndex="3">33024</Param>
      <Param ControlIndex="4">44032</Param>
      <Param ControlIndex="5">41728</Param>
      <Param ControlIndex="6">65280</Param>
      <Param ControlIndex="7">33024</Param>
      <Param ControlIndex="8">33024</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">33024</Param>
      <Param ControlIndex="11">33024</Param>
      <Param ControlIndex="12">4</Param>
      <Param ControlIndex="13">15</Param>
      <Param ControlIndex="14">15</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">1</Param>
      <Param ControlIndex="18">15</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="259" POS="0" BypassState="1">
        <Param ControlIndex="0">65280</Param>
        <Param ControlIndex="1">65280</Param>
        <Param ControlIndex="2">0</Param>
        <Param ControlIndex="3">21760</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="244" POS="1" BypassState="0">
        <Param ControlIndex="0">65280</Param>
        <Param ControlIndex="1">65280</Param>
        <Param ControlIndex="2">256</Param>
        <Param ControlIndex="3">54784</Param>
        <Param ControlIndex="4">0</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="4" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="11" POS="4" BypassState="1">
        <Param ControlIndex="0">2816</Param>
        <Param ControlIndex="1">35840</Param>
        <Param ControlIndex="2">19200</Param>
        <Param ControlIndex="3">65280</Param>
        <Param ControlIndex="4">33024</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="15 LeadCommunication" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="3" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,eI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="83" POS="0" BypassState="1">
      <Param ControlIndex="0">55040</Param>
      <Param ControlIndex="1">13312</Param>
      <Param ControlIndex="2">0</Param>
      <Param ControlIndex="3">65280</Param>
      <Param ControlIndex="4">37120</Param>
      <Param ControlIndex="5">52992</Param>
      <Param ControlIndex="6">14336</Param>
      <Param ControlIndex="7">0</Param>
      <Param ControlIndex="8">0</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">0</Param>
      <Param ControlIndex="12">3</Param>
      <Param ControlIndex="13">3</Param>
      <Param ControlIndex="14">3</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">3</Param>
      <Param ControlIndex="18">3</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="7" POS="0" BypassState="1">
        <Param ControlIndex="0">9472</Param>
        <Param ControlIndex="1">17920</Param>
        <Param ControlIndex="2">43520</Param>
        <Param ControlIndex="3">16384</Param>
        <Param ControlIndex="4">23808</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="11" POS="7" BypassState="1">
        <Param ControlIndex="0">10496</Param>
        <Param ControlIndex="1">26112</Param>
        <Param ControlIndex="2">15616</Param>
        <Param ControlIndex="3">14592</Param>
        <Param ControlIndex="4">50432</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="16 Country Deluxe" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="12288" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,nI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="100" POS="0" BypassState="1">
      <Param ControlIndex="0">65280</Param>
      <Param ControlIndex="1">25344</Param>
      <Param ControlIndex="2">33024</Param>
      <Param ControlIndex="3">33024</Param>
      <Param ControlIndex="4">22272</Param>
      <Param ControlIndex="5">26368</Param>
      <Param ControlIndex="6">44288</Param>
      <Param ControlIndex="7">0</Param>
      <Param ControlIndex="8">33024</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">33024</Param>
      <Param ControlIndex="11">33024</Param>
      <Param ControlIndex="12">2</Param>
      <Param ControlIndex="13">2</Param>
      <Param ControlIndex="14">2</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">2</Param>
      <Param ControlIndex="18">2</Param>
      <Param ControlIndex="19">0</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="273" POS="2" BypassState="1">
        <Param ControlIndex="0">17920</Param>
        <Param ControlIndex="1">50176</Param>
        <Param ControlIndex="2">28416</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="36" POS="7" BypassState="1">
        <Param ControlIndex="0">14080</Param>
        <Param ControlIndex="1">26112</Param>
        <Param ControlIndex="2">30976</Param>
        <Param ControlIndex="3">20992</Param>
        <Param ControlIndex="4">65280</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="17 The Evil Bassman" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="6" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,aI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="97" POS="0" BypassState="1">
      <Param ControlIndex="0">32256</Param>
      <Param ControlIndex="1">43776</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">41472</Param>
      <Param ControlIndex="4">7680</Param>
      <Param ControlIndex="5">60928</Param>
      <Param ControlIndex="6">33280</Param>
      <Param ControlIndex="7">33792</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">4</Param>
      <Param ControlIndex="13">7</Param>
      <Param ControlIndex="14">7</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">7</Param>
      <Param ControlIndex="18">7</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="259" POS="0" BypassState="1">
        <Param ControlIndex="0">31488</Param>
        <Param ControlIndex="1">63232</Param>
        <Param ControlIndex="2">0</Param>
        <Param ControlIndex="3">29440</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="79" POS="1" BypassState="1">
        <Param ControlIndex="0">54272</Param>
        <Param ControlIndex="1">0</Param>
        <Param ControlIndex="2">65280</Param>
        <Param ControlIndex="3">24320</Param>
        <Param ControlIndex="4">0</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="75" POS="7" BypassState="1">
        <Param ControlIndex="0">14336</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">37120</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">46592</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="18 Brighton Rock" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="6" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,rI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="94" POS="0" BypassState="1">
      <Param ControlIndex="0">24320</Param>
      <Param ControlIndex="1">11264</Param>
      <Param ControlIndex="2">33024</Param>
      <Param ControlIndex="3">64512</Param>
      <Param ControlIndex="4">31488</Param>
      <Param ControlIndex="5">23552</Param>
      <Param ControlIndex="6">50432</Param>
      <Param ControlIndex="7">0</Param>
      <Param ControlIndex="8">33024</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">33024</Param>
      <Param ControlIndex="11">33024</Param>
      <Param ControlIndex="12">4</Param>
      <Param ControlIndex="13">9</Param>
      <Param ControlIndex="14">9</Param>
      <Param ControlIndex="15">4</Param>
      <Param ControlIndex="16">5</Param>
      <Param ControlIndex="17">6</Param>
      <Param ControlIndex="18">9</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="273" POS="0" BypassState="1">
        <Param ControlIndex="0">55296</Param>
        <Param ControlIndex="1">17408</Param>
        <Param ControlIndex="2">17920</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="36" POS="4" BypassState="1">
        <Param ControlIndex="0">3328</Param>
        <Param ControlIndex="1">24320</Param>
        <Param ControlIndex="2">28672</Param>
        <Param ControlIndex="3">33024</Param>
        <Param ControlIndex="4">37376</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="19 Angry Rodent" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="1" HeelSetting="16384" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,oI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="117" POS="0" BypassState="1">
      <Param ControlIndex="0">49664</Param>
      <Param ControlIndex="1">36352</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">25344</Param>
      <Param ControlIndex="4">45824</Param>
      <Param ControlIndex="5">47872</Param>
      <Param ControlIndex="6">43520</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">5</Param>
      <Param ControlIndex="13">5</Param>
      <Param ControlIndex="14">5</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">9</Param>
      <Param ControlIndex="18">5</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="64" POS="5" BypassState="1">
        <Param ControlIndex="0">56064</Param>
        <Param ControlIndex="1">44288</Param>
        <Param ControlIndex="2">25344</Param>
        <Param ControlIndex="3">62464</Param>
        <Param ControlIndex="4">61696</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">32000</Param>
        <Param ControlIndex="1">7168</Param>
        <Param ControlIndex="2">0</Param>
        <Param ControlIndex="3">25344</Param>
        <Param ControlIndex="4">32768</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="33" POS="3" BypassState="1">
        <Param ControlIndex="0">32768</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="20 JohnnyMarrTremolo" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="3" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,tI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="114" POS="0" BypassState="1">
      <Param ControlIndex="0">43520</Param>
      <Param ControlIndex="1">43776</Param>
      <Param ControlIndex="2">43520</Param>
      <Param ControlIndex="3">27136</Param>
      <Param ControlIndex="4">35072</Param>
      <Param ControlIndex="5">20480</Param>
      <Param ControlIndex="6">51200</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">6</Param>
      <Param ControlIndex="13">6</Param>
      <Param ControlIndex="14">6</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">12</Param>
      <Param ControlIndex="18">6</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="22" POS="6" BypassState="1">
        <Param ControlIndex="0">7680</Param>
        <Param ControlIndex="1">16384</Param>
        <Param ControlIndex="2">4352</Param>
        <Param ControlIndex="3">7680</Param>
        <Param ControlIndex="4">33024</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="59" POS="7" BypassState="1">
        <Param ControlIndex="0">4608</Param>
        <Param ControlIndex="1">40704</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">33024</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="21 Fusion Lead" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="4096" ToeSetting="32512" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,lI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="117" POS="0" BypassState="1">
      <Param ControlIndex="0">44032</Param>
      <Param ControlIndex="1">22016</Param>
      <Param ControlIndex="2">33024</Param>
      <Param ControlIndex="3">25600</Param>
      <Param ControlIndex="4">46080</Param>
      <Param ControlIndex="5">48384</Param>
      <Param ControlIndex="6">44032</Param>
      <Param ControlIndex="7">33024</Param>
      <Param ControlIndex="8">33024</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">33024</Param>
      <Param ControlIndex="11">33024</Param>
      <Param ControlIndex="12">4</Param>
      <Param ControlIndex="13">5</Param>
      <Param ControlIndex="14">5</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">9</Param>
      <Param ControlIndex="18">5</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="0"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="31" POS="1" BypassState="1">
        <Param ControlIndex="0">65280</Param>
        <Param ControlIndex="1">27392</Param>
        <Param ControlIndex="2">0</Param>
        <Param ControlIndex="3">0</Param>
        <Param ControlIndex="4">44288</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="33" POS="7" BypassState="1">
        <Param ControlIndex="0">18944</Param>
        <Param ControlIndex="1">37888</Param>
        <Param ControlIndex="2">39680</Param>
        <Param ControlIndex="3">33024</Param>
        <Param ControlIndex="4">33024</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="22 C Baritone Clean" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="3" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,sI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="252" POS="0" BypassState="1">
      <Param ControlIndex="0">42240</Param>
      <Param ControlIndex="1">40704</Param>
      <Param ControlIndex="2">33024</Param>
      <Param ControlIndex="3">33024</Param>
      <Param ControlIndex="4">51200</Param>
      <Param ControlIndex="5">40448</Param>
      <Param ControlIndex="6">39168</Param>
      <Param ControlIndex="7">33024</Param>
      <Param ControlIndex="8">33024</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">33024</Param>
      <Param ControlIndex="11">33024</Param>
      <Param ControlIndex="12">4</Param>
      <Param ControlIndex="13">16</Param>
      <Param ControlIndex="14">16</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">11</Param>
      <Param ControlIndex="18">16</Param>
      <Param ControlIndex="19">0</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="259" POS="0" BypassState="1">
        <Param ControlIndex="0">30976</Param>
        <Param ControlIndex="1">7680</Param>
        <Param ControlIndex="2">0</Param>
        <Param ControlIndex="3">56576</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="4" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="0"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="38" POS="7" BypassState="1">
        <Param ControlIndex="0">22528</Param>
        <Param ControlIndex="1">7680</Param>
        <Param ControlIndex="2">28160</Param>
        <Param ControlIndex="3">33024</Param>
        <Param ControlIndex="4">33024</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="23 Doom Hand" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="6" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,iI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="117" POS="0" BypassState="1">
      <Param ControlIndex="0">39936</Param>
      <Param ControlIndex="1">32512</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">25344</Param>
      <Param ControlIndex="4">51712</Param>
      <Param ControlIndex="5">41216</Param>
      <Param ControlIndex="6">55296</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">5</Param>
      <Param ControlIndex="13">5</Param>
      <Param ControlIndex="14">5</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">9</Param>
      <Param ControlIndex="18">5</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="7" POS="0" BypassState="1">
        <Param ControlIndex="0">21504</Param>
        <Param ControlIndex="1">3840</Param>
        <Param ControlIndex="2">20224</Param>
        <Param ControlIndex="3">32512</Param>
        <Param ControlIndex="4">32512</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">18944</Param>
        <Param ControlIndex="1">40704</Param>
        <Param ControlIndex="2">7168</Param>
        <Param ControlIndex="3">39680</Param>
        <Param ControlIndex="4">21504</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="58" POS="7" BypassState="1">
        <Param ControlIndex="0">32768</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">50688</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="24 Beauty Clean" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="4" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,dI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="103" POS="0" BypassState="1">
      <Param ControlIndex="0">43520</Param>
      <Param ControlIndex="1">31488</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32768</Param>
      <Param ControlIndex="4">48640</Param>
      <Param ControlIndex="5">32768</Param>
      <Param ControlIndex="6">32768</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">1</Param>
      <Param ControlIndex="13">1</Param>
      <Param ControlIndex="14">1</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">1</Param>
      <Param ControlIndex="18">1</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="65" POS="5" BypassState="1">
        <Param ControlIndex="0">49408</Param>
        <Param ControlIndex="1">22016</Param>
        <Param ControlIndex="2">32000</Param>
        <Param ControlIndex="3">0</Param>
        <Param ControlIndex="4">0</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="42" POS="6" BypassState="1">
        <Param ControlIndex="0">15616</Param>
        <Param ControlIndex="1">55808</Param>
        <Param ControlIndex="2">8192</Param>
        <Param ControlIndex="3">25344</Param>
        <Param ControlIndex="4">65280</Param>
        <Param ControlIndex="5">32768</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="59" POS="7" BypassState="1">
        <Param ControlIndex="0">15104</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="25 Movie Tremolux" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="3" HeelSetting="0" ToeSetting="36608" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,mI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="93" POS="0" BypassState="1">
      <Param ControlIndex="0">41472</Param>
      <Param ControlIndex="1">64768</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">26112</Param>
      <Param ControlIndex="4">28672</Param>
      <Param ControlIndex="5">54784</Param>
      <Param ControlIndex="6">55040</Param>
      <Param ControlIndex="7">27136</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">10</Param>
      <Param ControlIndex="13">10</Param>
      <Param ControlIndex="14">10</Param>
      <Param ControlIndex="15">3</Param>
      <Param ControlIndex="16">4</Param>
      <Param ControlIndex="17">10</Param>
      <Param ControlIndex="18">10</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="60" POS="0" BypassState="1">
        <Param ControlIndex="0">65280</Param>
        <Param ControlIndex="1">62720</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">40192</Param>
        <Param ControlIndex="4">26880</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="79" POS="1" BypassState="1">
        <Param ControlIndex="0">35328</Param>
        <Param ControlIndex="1">0</Param>
        <Param ControlIndex="2">41472</Param>
        <Param ControlIndex="3">39936</Param>
        <Param ControlIndex="4">0</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">32000</Param>
        <Param ControlIndex="1">25344</Param>
        <Param ControlIndex="2">13568</Param>
        <Param ControlIndex="3">25344</Param>
        <Param ControlIndex="4">32768</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="58" POS="7" BypassState="1">
        <Param ControlIndex="0">26368</Param>
        <Param ControlIndex="1">15872</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">1280</Param>
        <Param ControlIndex="4">45056</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="26 Europa" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="4" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="2" />
  <UsbGain>0</UsbGain>
</Preset>`,uI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="103" POS="0" BypassState="1">
      <Param ControlIndex="0">43520</Param>
      <Param ControlIndex="1">43264</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32768</Param>
      <Param ControlIndex="4">48640</Param>
      <Param ControlIndex="5">32768</Param>
      <Param ControlIndex="6">32768</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">46336</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">1</Param>
      <Param ControlIndex="13">1</Param>
      <Param ControlIndex="14">1</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">1</Param>
      <Param ControlIndex="18">1</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="60" POS="0" BypassState="1">
        <Param ControlIndex="0">36608</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="64" POS="5" BypassState="0">
        <Param ControlIndex="0">43264</Param>
        <Param ControlIndex="1">9472</Param>
        <Param ControlIndex="2">25344</Param>
        <Param ControlIndex="3">62464</Param>
        <Param ControlIndex="4">61696</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="21" POS="6" BypassState="0">
        <Param ControlIndex="0">25088</Param>
        <Param ControlIndex="1">23040</Param>
        <Param ControlIndex="2">16128</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="38" POS="7" BypassState="1">
        <Param ControlIndex="0">32768</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="27 Dirty Deluxe" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="3" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,PI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="94" POS="0" BypassState="1">
      <Param ControlIndex="0">50944</Param>
      <Param ControlIndex="1">65280</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32000</Param>
      <Param ControlIndex="4">36352</Param>
      <Param ControlIndex="5">34560</Param>
      <Param ControlIndex="6">50176</Param>
      <Param ControlIndex="7">33024</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">9</Param>
      <Param ControlIndex="13">9</Param>
      <Param ControlIndex="14">9</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">6</Param>
      <Param ControlIndex="18">9</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="36" POS="7" BypassState="1">
        <Param ControlIndex="0">14848</Param>
        <Param ControlIndex="1">23808</Param>
        <Param ControlIndex="2">28160</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">37120</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="28 Aussie Rock" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="4096" ToeSetting="40704" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,cI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="109" POS="0" BypassState="1">
      <Param ControlIndex="0">45824</Param>
      <Param ControlIndex="1">32768</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">21760</Param>
      <Param ControlIndex="4">39168</Param>
      <Param ControlIndex="5">19456</Param>
      <Param ControlIndex="6">37120</Param>
      <Param ControlIndex="7">36352</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">8</Param>
      <Param ControlIndex="13">8</Param>
      <Param ControlIndex="14">8</Param>
      <Param ControlIndex="15">2</Param>
      <Param ControlIndex="16">3</Param>
      <Param ControlIndex="17">8</Param>
      <Param ControlIndex="18">8</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="31" POS="5" BypassState="1">
        <Param ControlIndex="0">22016</Param>
        <Param ControlIndex="1">16384</Param>
        <Param ControlIndex="2">0</Param>
        <Param ControlIndex="3">0</Param>
        <Param ControlIndex="4">51200</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="75" POS="7" BypassState="0">
        <Param ControlIndex="0">14336</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">37120</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">46592</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="29 Metal Octave" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="6" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,xI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="103" POS="0" BypassState="1">
      <Param ControlIndex="0">42240</Param>
      <Param ControlIndex="1">51456</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32768</Param>
      <Param ControlIndex="4">43776</Param>
      <Param ControlIndex="5">32768</Param>
      <Param ControlIndex="6">32768</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">1</Param>
      <Param ControlIndex="13">1</Param>
      <Param ControlIndex="14">1</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">1</Param>
      <Param ControlIndex="18">1</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">13056</Param>
        <Param ControlIndex="1">11776</Param>
        <Param ControlIndex="2">4864</Param>
        <Param ControlIndex="3">25344</Param>
        <Param ControlIndex="4">32768</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="33" POS="3" BypassState="1">
        <Param ControlIndex="0">4352</Param>
        <Param ControlIndex="1">27904</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">47616</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="30 Neil Deluxe" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="4096" ToeSetting="32512" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,pI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="117" POS="0" BypassState="1">
      <Param ControlIndex="0">49152</Param>
      <Param ControlIndex="1">23296</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32768</Param>
      <Param ControlIndex="4">32512</Param>
      <Param ControlIndex="5">42496</Param>
      <Param ControlIndex="6">43520</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">5</Param>
      <Param ControlIndex="13">5</Param>
      <Param ControlIndex="14">5</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">9</Param>
      <Param ControlIndex="18">5</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="11" POS="7" BypassState="1">
        <Param ControlIndex="0">23040</Param>
        <Param ControlIndex="1">47616</Param>
        <Param ControlIndex="2">40192</Param>
        <Param ControlIndex="3">12288</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="31 Touch of Reverb" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="12288" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,II=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="121" POS="0" BypassState="1">
      <Param ControlIndex="0">43520</Param>
      <Param ControlIndex="1">65280</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32000</Param>
      <Param ControlIndex="4">43520</Param>
      <Param ControlIndex="5">23296</Param>
      <Param ControlIndex="6">50176</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">11</Param>
      <Param ControlIndex="13">11</Param>
      <Param ControlIndex="14">11</Param>
      <Param ControlIndex="15">2</Param>
      <Param ControlIndex="16">3</Param>
      <Param ControlIndex="17">8</Param>
      <Param ControlIndex="18">11</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="26" POS="0" BypassState="1">
        <Param ControlIndex="0">32768</Param>
        <Param ControlIndex="1">44800</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">46848</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="58" POS="4" BypassState="1">
        <Param ControlIndex="0">20224</Param>
        <Param ControlIndex="1">15872</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">1280</Param>
        <Param ControlIndex="4">45056</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="32 Purple Fuzz" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,fI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="106" POS="0" BypassState="1">
      <Param ControlIndex="0">43520</Param>
      <Param ControlIndex="1">21760</Param>
      <Param ControlIndex="2">0</Param>
      <Param ControlIndex="3">65280</Param>
      <Param ControlIndex="4">39168</Param>
      <Param ControlIndex="5">52224</Param>
      <Param ControlIndex="6">19456</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">4</Param>
      <Param ControlIndex="13">4</Param>
      <Param ControlIndex="14">4</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">4</Param>
      <Param ControlIndex="18">4</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="136" POS="0" BypassState="1">
        <Param ControlIndex="0">1</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="4127" POS="4" BypassState="1">
        <Param ControlIndex="0">21760</Param>
        <Param ControlIndex="1">9</Param>
        <Param ControlIndex="2">9</Param>
        <Param ControlIndex="3">5</Param>
        <Param ControlIndex="4">51200</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="72" POS="6" BypassState="1">
        <Param ControlIndex="0">12800</Param>
        <Param ControlIndex="1">45824</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">32768</Param>
        <Param ControlIndex="5">32768</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="11" POS="7" BypassState="1">
        <Param ControlIndex="0">32768</Param>
        <Param ControlIndex="1">35584</Param>
        <Param ControlIndex="2">18688</Param>
        <Param ControlIndex="3">65280</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="33 Amin 3rds Solo" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="3" HeelSetting="0" ToeSetting="26368" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,hI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="100" POS="0" BypassState="1">
      <Param ControlIndex="0">33024</Param>
      <Param ControlIndex="1">50432</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32768</Param>
      <Param ControlIndex="4">40192</Param>
      <Param ControlIndex="5">25600</Param>
      <Param ControlIndex="6">41472</Param>
      <Param ControlIndex="7">37120</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">2</Param>
      <Param ControlIndex="13">2</Param>
      <Param ControlIndex="14">2</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">2</Param>
      <Param ControlIndex="18">2</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="38" POS="7" BypassState="1">
        <Param ControlIndex="0">22528</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="34 Bassman Drive" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="4096" ToeSetting="40704" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,CI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="97" POS="0" BypassState="1">
      <Param ControlIndex="0">38144</Param>
      <Param ControlIndex="1">42496</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">41472</Param>
      <Param ControlIndex="4">39168</Param>
      <Param ControlIndex="5">36608</Param>
      <Param ControlIndex="6">29184</Param>
      <Param ControlIndex="7">0</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">7</Param>
      <Param ControlIndex="13">7</Param>
      <Param ControlIndex="14">7</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">10</Param>
      <Param ControlIndex="18">7</Param>
      <Param ControlIndex="19">2</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="26" POS="0" BypassState="1">
        <Param ControlIndex="0">44800</Param>
        <Param ControlIndex="1">62720</Param>
        <Param ControlIndex="2">8704</Param>
        <Param ControlIndex="3">54784</Param>
        <Param ControlIndex="4">7168</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="7" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="35 Doom Orleans" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="1" HeelSetting="32768" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,gI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="117" POS="0" BypassState="1">
      <Param ControlIndex="0">56576</Param>
      <Param ControlIndex="1">22016</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">25344</Param>
      <Param ControlIndex="4">35584</Param>
      <Param ControlIndex="5">30208</Param>
      <Param ControlIndex="6">17408</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">26624</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">5</Param>
      <Param ControlIndex="13">5</Param>
      <Param ControlIndex="14">5</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">9</Param>
      <Param ControlIndex="18">5</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="0"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="31" POS="1" BypassState="1">
        <Param ControlIndex="0">16384</Param>
        <Param ControlIndex="1">32512</Param>
        <Param ControlIndex="2">65280</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">9728</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">41728</Param>
        <Param ControlIndex="1">13312</Param>
        <Param ControlIndex="2">9728</Param>
        <Param ControlIndex="3">27392</Param>
        <Param ControlIndex="4">32768</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="11" POS="7" BypassState="1">
        <Param ControlIndex="0">18432</Param>
        <Param ControlIndex="1">35584</Param>
        <Param ControlIndex="2">18688</Param>
        <Param ControlIndex="3">65280</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="36 Autumns End Scars" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="3" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,yI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="103" POS="0" BypassState="1">
      <Param ControlIndex="0">43776</Param>
      <Param ControlIndex="1">43776</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32768</Param>
      <Param ControlIndex="4">51456</Param>
      <Param ControlIndex="5">33024</Param>
      <Param ControlIndex="6">18432</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">1</Param>
      <Param ControlIndex="13">1</Param>
      <Param ControlIndex="14">1</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">1</Param>
      <Param ControlIndex="18">1</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="7" POS="0" BypassState="1">
        <Param ControlIndex="0">17920</Param>
        <Param ControlIndex="1">29440</Param>
        <Param ControlIndex="2">43520</Param>
        <Param ControlIndex="3">16384</Param>
        <Param ControlIndex="4">23808</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="58" POS="7" BypassState="1">
        <Param ControlIndex="0">20992</Param>
        <Param ControlIndex="1">16896</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">2048</Param>
        <Param ControlIndex="4">45312</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="37 Chimey Deluxe" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="16384" ToeSetting="49152" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,SI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="106" POS="0" BypassState="1">
      <Param ControlIndex="0">34560</Param>
      <Param ControlIndex="1">65024</Param>
      <Param ControlIndex="2">0</Param>
      <Param ControlIndex="3">65280</Param>
      <Param ControlIndex="4">65280</Param>
      <Param ControlIndex="5">52224</Param>
      <Param ControlIndex="6">41472</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">58624</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">4</Param>
      <Param ControlIndex="13">4</Param>
      <Param ControlIndex="14">4</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">4</Param>
      <Param ControlIndex="18">4</Param>
      <Param ControlIndex="19">2</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="11" POS="7" BypassState="1">
        <Param ControlIndex="0">11264</Param>
        <Param ControlIndex="1">19200</Param>
        <Param ControlIndex="2">18688</Param>
        <Param ControlIndex="3">65280</Param>
        <Param ControlIndex="4">54016</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="38 Cranked Princeton" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,vI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="121" POS="0" BypassState="1">
      <Param ControlIndex="0">43520</Param>
      <Param ControlIndex="1">65280</Param>
      <Param ControlIndex="2">65280</Param>
      <Param ControlIndex="3">32000</Param>
      <Param ControlIndex="4">53504</Param>
      <Param ControlIndex="5">45824</Param>
      <Param ControlIndex="6">50944</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">11</Param>
      <Param ControlIndex="13">11</Param>
      <Param ControlIndex="14">11</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">10</Param>
      <Param ControlIndex="18">11</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="45" POS="5" BypassState="1">
        <Param ControlIndex="0">58624</Param>
        <Param ControlIndex="1">18176</Param>
        <Param ControlIndex="2">4096</Param>
        <Param ControlIndex="3">43520</Param>
        <Param ControlIndex="4">33280</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="0"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="7" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="39 Day of Sighs" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="3" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,MI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="124" POS="0" BypassState="1">
      <Param ControlIndex="0">49664</Param>
      <Param ControlIndex="1">36352</Param>
      <Param ControlIndex="2">0</Param>
      <Param ControlIndex="3">65280</Param>
      <Param ControlIndex="4">32768</Param>
      <Param ControlIndex="5">36096</Param>
      <Param ControlIndex="6">25344</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">49152</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">12</Param>
      <Param ControlIndex="13">12</Param>
      <Param ControlIndex="14">12</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">5</Param>
      <Param ControlIndex="18">12</Param>
      <Param ControlIndex="19">2</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="60" POS="0" BypassState="0">
        <Param ControlIndex="0">22016</Param>
        <Param ControlIndex="1">63488</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">0</Param>
        <Param ControlIndex="4">42496</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="45" POS="5" BypassState="0">
        <Param ControlIndex="0">46848</Param>
        <Param ControlIndex="1">16384</Param>
        <Param ControlIndex="2">7424</Param>
        <Param ControlIndex="3">44288</Param>
        <Param ControlIndex="4">33280</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="0">
        <Param ControlIndex="0">18944</Param>
        <Param ControlIndex="1">40704</Param>
        <Param ControlIndex="2">7168</Param>
        <Param ControlIndex="3">39680</Param>
        <Param ControlIndex="4">21504</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="38" POS="7" BypassState="1">
        <Param ControlIndex="0">30720</Param>
        <Param ControlIndex="1">40448</Param>
        <Param ControlIndex="2">30464</Param>
        <Param ControlIndex="3">32512</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="40 Small Champ" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="1" HeelSetting="20480" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,DI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="97" POS="0" BypassState="1">
      <Param ControlIndex="0">40704</Param>
      <Param ControlIndex="1">38656</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">41472</Param>
      <Param ControlIndex="4">35072</Param>
      <Param ControlIndex="5">32768</Param>
      <Param ControlIndex="6">45056</Param>
      <Param ControlIndex="7">0</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">7</Param>
      <Param ControlIndex="13">7</Param>
      <Param ControlIndex="14">7</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">7</Param>
      <Param ControlIndex="18">7</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="7" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="41 D of SUM 41" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="1" HeelSetting="32768" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,bI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="121" POS="0" BypassState="1">
      <Param ControlIndex="0">43520</Param>
      <Param ControlIndex="1">65280</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32000</Param>
      <Param ControlIndex="4">43520</Param>
      <Param ControlIndex="5">23296</Param>
      <Param ControlIndex="6">50176</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">11</Param>
      <Param ControlIndex="13">11</Param>
      <Param ControlIndex="14">11</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">8</Param>
      <Param ControlIndex="18">11</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="26" POS="0" BypassState="1">
        <Param ControlIndex="0">34560</Param>
        <Param ControlIndex="1">65280</Param>
        <Param ControlIndex="2">256</Param>
        <Param ControlIndex="3">48640</Param>
        <Param ControlIndex="4">29696</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="42" POS="6" BypassState="1">
        <Param ControlIndex="0">19456</Param>
        <Param ControlIndex="1">27136</Param>
        <Param ControlIndex="2">7424</Param>
        <Param ControlIndex="3">25344</Param>
        <Param ControlIndex="4">4352</Param>
        <Param ControlIndex="5">32768</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="75" POS="7" BypassState="1">
        <Param ControlIndex="0">14336</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">37120</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">46592</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="42 Bolero" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="4" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="2" />
  <UsbGain>0</UsbGain>
</Preset>`,wI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="100" POS="0" BypassState="1">
      <Param ControlIndex="0">33024</Param>
      <Param ControlIndex="1">41472</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32768</Param>
      <Param ControlIndex="4">32768</Param>
      <Param ControlIndex="5">49408</Param>
      <Param ControlIndex="6">41472</Param>
      <Param ControlIndex="7">65280</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">2</Param>
      <Param ControlIndex="13">2</Param>
      <Param ControlIndex="14">2</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">2</Param>
      <Param ControlIndex="18">2</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="33" POS="3" BypassState="1">
        <Param ControlIndex="0">25088</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="43 Bassman Splash" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,BI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="94" POS="0" BypassState="1">
      <Param ControlIndex="0">38656</Param>
      <Param ControlIndex="1">65280</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32000</Param>
      <Param ControlIndex="4">34816</Param>
      <Param ControlIndex="5">24320</Param>
      <Param ControlIndex="6">51968</Param>
      <Param ControlIndex="7">33024</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">51712</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">9</Param>
      <Param ControlIndex="13">9</Param>
      <Param ControlIndex="14">9</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">6</Param>
      <Param ControlIndex="18">9</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="136" POS="0" BypassState="1">
        <Param ControlIndex="0">1</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="7" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="44 Mike of A.A.R. 1" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="6" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,kI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="93" POS="0" BypassState="1">
      <Param ControlIndex="0">40448</Param>
      <Param ControlIndex="1">41472</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">26112</Param>
      <Param ControlIndex="4">65280</Param>
      <Param ControlIndex="5">3072</Param>
      <Param ControlIndex="6">65280</Param>
      <Param ControlIndex="7">32000</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">10</Param>
      <Param ControlIndex="13">10</Param>
      <Param ControlIndex="14">10</Param>
      <Param ControlIndex="15">4</Param>
      <Param ControlIndex="16">5</Param>
      <Param ControlIndex="17">10</Param>
      <Param ControlIndex="18">10</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="60" POS="0" BypassState="1">
        <Param ControlIndex="0">47360</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="19" POS="5" BypassState="1">
        <Param ControlIndex="0">21504</Param>
        <Param ControlIndex="1">1024</Param>
        <Param ControlIndex="2">9472</Param>
        <Param ControlIndex="3">6400</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="58" POS="7" BypassState="1">
        <Param ControlIndex="0">18176</Param>
        <Param ControlIndex="1">15872</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">1280</Param>
        <Param ControlIndex="4">45056</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="45 Far Beyond Driven" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="16384" ToeSetting="48896" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,FI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="94" POS="0" BypassState="1">
      <Param ControlIndex="0">41216</Param>
      <Param ControlIndex="1">50944</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32000</Param>
      <Param ControlIndex="4">23296</Param>
      <Param ControlIndex="5">38656</Param>
      <Param ControlIndex="6">54528</Param>
      <Param ControlIndex="7">40448</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">9</Param>
      <Param ControlIndex="13">9</Param>
      <Param ControlIndex="14">9</Param>
      <Param ControlIndex="15">3</Param>
      <Param ControlIndex="16">4</Param>
      <Param ControlIndex="17">6</Param>
      <Param ControlIndex="18">9</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="7" POS="0" BypassState="1">
        <Param ControlIndex="0">43520</Param>
        <Param ControlIndex="1">13056</Param>
        <Param ControlIndex="2">38144</Param>
        <Param ControlIndex="3">22784</Param>
        <Param ControlIndex="4">49408</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="7" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="46 Four Year Strong" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="2" HeelSetting="32768" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,EI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="117" POS="0" BypassState="1">
      <Param ControlIndex="0">45824</Param>
      <Param ControlIndex="1">16896</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">25344</Param>
      <Param ControlIndex="4">29184</Param>
      <Param ControlIndex="5">34048</Param>
      <Param ControlIndex="6">20224</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">5</Param>
      <Param ControlIndex="13">5</Param>
      <Param ControlIndex="14">5</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">9</Param>
      <Param ControlIndex="18">5</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="7" POS="0" BypassState="1">
        <Param ControlIndex="0">21504</Param>
        <Param ControlIndex="1">26880</Param>
        <Param ControlIndex="2">19712</Param>
        <Param ControlIndex="3">32512</Param>
        <Param ControlIndex="4">32512</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">14848</Param>
        <Param ControlIndex="1">65280</Param>
        <Param ControlIndex="2">12544</Param>
        <Param ControlIndex="3">22528</Param>
        <Param ControlIndex="4">17408</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="58" POS="7" BypassState="1">
        <Param ControlIndex="0">21760</Param>
        <Param ControlIndex="1">26624</Param>
        <Param ControlIndex="2">39680</Param>
        <Param ControlIndex="3">39680</Param>
        <Param ControlIndex="4">1536</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="47 Gomez Clean" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="12288" ToeSetting="44800" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,TI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="124" POS="0" BypassState="1">
      <Param ControlIndex="0">41216</Param>
      <Param ControlIndex="1">24832</Param>
      <Param ControlIndex="2">0</Param>
      <Param ControlIndex="3">65280</Param>
      <Param ControlIndex="4">35840</Param>
      <Param ControlIndex="5">63232</Param>
      <Param ControlIndex="6">20480</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">12</Param>
      <Param ControlIndex="13">12</Param>
      <Param ControlIndex="14">12</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">5</Param>
      <Param ControlIndex="18">12</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="60" POS="0" BypassState="1">
        <Param ControlIndex="0">54016</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">22272</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="58" POS="7" BypassState="1">
        <Param ControlIndex="0">4608</Param>
        <Param ControlIndex="1">15872</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">1280</Param>
        <Param ControlIndex="4">45056</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="48 Summerset Drive" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="4096" ToeSetting="32512" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,NI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="114" POS="0" BypassState="1">
      <Param ControlIndex="0">33792</Param>
      <Param ControlIndex="1">47872</Param>
      <Param ControlIndex="2">38144</Param>
      <Param ControlIndex="3">25856</Param>
      <Param ControlIndex="4">43520</Param>
      <Param ControlIndex="5">43776</Param>
      <Param ControlIndex="6">43520</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">39168</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">6</Param>
      <Param ControlIndex="13">6</Param>
      <Param ControlIndex="14">6</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">10</Param>
      <Param ControlIndex="18">6</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="60" POS="0" BypassState="0">
        <Param ControlIndex="0">20224</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="79" POS="1" BypassState="0">
        <Param ControlIndex="0">64768</Param>
        <Param ControlIndex="1">0</Param>
        <Param ControlIndex="2">64768</Param>
        <Param ControlIndex="3">47104</Param>
        <Param ControlIndex="4">0</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="67" POS="6" BypassState="0">
        <Param ControlIndex="0">28416</Param>
        <Param ControlIndex="1">29696</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">32768</Param>
        <Param ControlIndex="5">32768</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="38" POS="7" BypassState="1">
        <Param ControlIndex="0">28160</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="49 Supersonic Burn" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="16384" ToeSetting="48896" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,jI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="100" POS="0" BypassState="1">
      <Param ControlIndex="0">39936</Param>
      <Param ControlIndex="1">32256</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32768</Param>
      <Param ControlIndex="4">32768</Param>
      <Param ControlIndex="5">31232</Param>
      <Param ControlIndex="6">41472</Param>
      <Param ControlIndex="7">65280</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">2</Param>
      <Param ControlIndex="13">2</Param>
      <Param ControlIndex="14">2</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">2</Param>
      <Param ControlIndex="18">2</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="45" POS="5" BypassState="1">
        <Param ControlIndex="0">62464</Param>
        <Param ControlIndex="1">65280</Param>
        <Param ControlIndex="2">9984</Param>
        <Param ControlIndex="3">44032</Param>
        <Param ControlIndex="4">33280</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="77" POS="7" BypassState="1">
        <Param ControlIndex="0">15872</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="50 Black Hole Vibe" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="3" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,OI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="114" POS="0" BypassState="1">
      <Param ControlIndex="0">32768</Param>
      <Param ControlIndex="1">65280</Param>
      <Param ControlIndex="2">29440</Param>
      <Param ControlIndex="3">36352</Param>
      <Param ControlIndex="4">45312</Param>
      <Param ControlIndex="5">48896</Param>
      <Param ControlIndex="6">39168</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">6</Param>
      <Param ControlIndex="13">6</Param>
      <Param ControlIndex="14">6</Param>
      <Param ControlIndex="15">3</Param>
      <Param ControlIndex="16">4</Param>
      <Param ControlIndex="17">12</Param>
      <Param ControlIndex="18">6</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">16896</Param>
        <Param ControlIndex="1">23808</Param>
        <Param ControlIndex="2">11776</Param>
        <Param ControlIndex="3">25088</Param>
        <Param ControlIndex="4">28672</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="58" POS="7" BypassState="1">
        <Param ControlIndex="0">18944</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">51456</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="51 Super-Live Album" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="4" HeelSetting="16384" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,_I=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="103" POS="0" BypassState="1">
      <Param ControlIndex="0">37888</Param>
      <Param ControlIndex="1">64256</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32768</Param>
      <Param ControlIndex="4">65280</Param>
      <Param ControlIndex="5">65280</Param>
      <Param ControlIndex="6">65280</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">62976</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">1</Param>
      <Param ControlIndex="13">1</Param>
      <Param ControlIndex="14">1</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">1</Param>
      <Param ControlIndex="18">1</Param>
      <Param ControlIndex="19">2</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="60" POS="0" BypassState="0">
        <Param ControlIndex="0">36608</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="64" POS="5" BypassState="0">
        <Param ControlIndex="0">43264</Param>
        <Param ControlIndex="1">9472</Param>
        <Param ControlIndex="2">25344</Param>
        <Param ControlIndex="3">62464</Param>
        <Param ControlIndex="4">61696</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">32512</Param>
        <Param ControlIndex="1">26624</Param>
        <Param ControlIndex="2">14848</Param>
        <Param ControlIndex="3">25344</Param>
        <Param ControlIndex="4">65280</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="36" POS="7" BypassState="1">
        <Param ControlIndex="0">28160</Param>
        <Param ControlIndex="1">23808</Param>
        <Param ControlIndex="2">28160</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">37120</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="52 Killer Cortez" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="16384" ToeSetting="48896" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,AI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="94" POS="0" BypassState="1">
      <Param ControlIndex="0">32512</Param>
      <Param ControlIndex="1">50944</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">48128</Param>
      <Param ControlIndex="4">52992</Param>
      <Param ControlIndex="5">52224</Param>
      <Param ControlIndex="6">65280</Param>
      <Param ControlIndex="7">36096</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">9</Param>
      <Param ControlIndex="13">9</Param>
      <Param ControlIndex="14">9</Param>
      <Param ControlIndex="15">2</Param>
      <Param ControlIndex="16">3</Param>
      <Param ControlIndex="17">6</Param>
      <Param ControlIndex="18">9</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="60" POS="0" BypassState="1">
        <Param ControlIndex="0">65280</Param>
        <Param ControlIndex="1">41472</Param>
        <Param ControlIndex="2">39936</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">44288</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="75" POS="7" BypassState="1">
        <Param ControlIndex="0">19456</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">37120</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">46592</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="53 British Steel" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="4096" ToeSetting="32512" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,RI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="121" POS="0" BypassState="1">
      <Param ControlIndex="0">28672</Param>
      <Param ControlIndex="1">24064</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32000</Param>
      <Param ControlIndex="4">44032</Param>
      <Param ControlIndex="5">44800</Param>
      <Param ControlIndex="6">50432</Param>
      <Param ControlIndex="7">39936</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">11</Param>
      <Param ControlIndex="13">11</Param>
      <Param ControlIndex="14">11</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">10</Param>
      <Param ControlIndex="18">11</Param>
      <Param ControlIndex="19">0</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="26" POS="0" BypassState="1">
        <Param ControlIndex="0">64256</Param>
        <Param ControlIndex="1">13568</Param>
        <Param ControlIndex="2">23808</Param>
        <Param ControlIndex="3">40704</Param>
        <Param ControlIndex="4">28416</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">11264</Param>
        <Param ControlIndex="1">23296</Param>
        <Param ControlIndex="2">0</Param>
        <Param ControlIndex="3">25088</Param>
        <Param ControlIndex="4">26880</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="7" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="54 Mick The Hoople" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="2" HeelSetting="12288" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,VI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="93" POS="0" BypassState="1">
      <Param ControlIndex="0">43520</Param>
      <Param ControlIndex="1">49664</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">26112</Param>
      <Param ControlIndex="4">45056</Param>
      <Param ControlIndex="5">23040</Param>
      <Param ControlIndex="6">51456</Param>
      <Param ControlIndex="7">35840</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">10</Param>
      <Param ControlIndex="13">10</Param>
      <Param ControlIndex="14">10</Param>
      <Param ControlIndex="15">3</Param>
      <Param ControlIndex="16">4</Param>
      <Param ControlIndex="17">10</Param>
      <Param ControlIndex="18">10</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="73" POS="0" BypassState="1">
        <Param ControlIndex="0">33024</Param>
        <Param ControlIndex="1">22016</Param>
        <Param ControlIndex="2">0</Param>
        <Param ControlIndex="3">38400</Param>
        <Param ControlIndex="4">0</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="18" POS="5" BypassState="0">
        <Param ControlIndex="0">65280</Param>
        <Param ControlIndex="1">3584</Param>
        <Param ControlIndex="2">6400</Param>
        <Param ControlIndex="3">6400</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">15616</Param>
        <Param ControlIndex="1">24064</Param>
        <Param ControlIndex="2">9728</Param>
        <Param ControlIndex="3">31488</Param>
        <Param ControlIndex="4">23808</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="58" POS="7" BypassState="1">
        <Param ControlIndex="0">6656</Param>
        <Param ControlIndex="1">15872</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">1280</Param>
        <Param ControlIndex="4">45056</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="55 MSG Lead" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="2" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,UI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="83" POS="0" BypassState="1">
      <Param ControlIndex="0">40960</Param>
      <Param ControlIndex="1">28928</Param>
      <Param ControlIndex="2">0</Param>
      <Param ControlIndex="3">65280</Param>
      <Param ControlIndex="4">37120</Param>
      <Param ControlIndex="5">52992</Param>
      <Param ControlIndex="6">14336</Param>
      <Param ControlIndex="7">0</Param>
      <Param ControlIndex="8">0</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">0</Param>
      <Param ControlIndex="12">3</Param>
      <Param ControlIndex="13">3</Param>
      <Param ControlIndex="14">3</Param>
      <Param ControlIndex="15">4</Param>
      <Param ControlIndex="16">5</Param>
      <Param ControlIndex="17">3</Param>
      <Param ControlIndex="18">3</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="136" POS="0" BypassState="1">
        <Param ControlIndex="0">1</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="22" POS="6" BypassState="1">
        <Param ControlIndex="0">65280</Param>
        <Param ControlIndex="1">7424</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="7" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="56 The Cab Charles 2" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="4" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,GI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="114" POS="0" BypassState="1">
      <Param ControlIndex="0">37632</Param>
      <Param ControlIndex="1">24320</Param>
      <Param ControlIndex="2">11264</Param>
      <Param ControlIndex="3">22784</Param>
      <Param ControlIndex="4">35328</Param>
      <Param ControlIndex="5">38144</Param>
      <Param ControlIndex="6">36352</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">35072</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">6</Param>
      <Param ControlIndex="13">6</Param>
      <Param ControlIndex="14">6</Param>
      <Param ControlIndex="15">4</Param>
      <Param ControlIndex="16">5</Param>
      <Param ControlIndex="17">10</Param>
      <Param ControlIndex="18">6</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="22" POS="6" BypassState="1">
        <Param ControlIndex="0">7680</Param>
        <Param ControlIndex="1">16384</Param>
        <Param ControlIndex="2">4352</Param>
        <Param ControlIndex="3">7680</Param>
        <Param ControlIndex="4">33024</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="59" POS="7" BypassState="1">
        <Param ControlIndex="0">0</Param>
        <Param ControlIndex="1">40704</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">33024</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="57 Alkaline Trio" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="0" ToeSetting="32512" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,LI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="103" POS="0" BypassState="1">
      <Param ControlIndex="0">40960</Param>
      <Param ControlIndex="1">52992</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32768</Param>
      <Param ControlIndex="4">51456</Param>
      <Param ControlIndex="5">28416</Param>
      <Param ControlIndex="6">32768</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">1</Param>
      <Param ControlIndex="13">1</Param>
      <Param ControlIndex="14">1</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">1</Param>
      <Param ControlIndex="18">1</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="33" POS="3" BypassState="1">
        <Param ControlIndex="0">2048</Param>
        <Param ControlIndex="1">27904</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">47616</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="58 One Bourbon" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="1280" ToeSetting="16384" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,WI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="109" POS="0" BypassState="1">
      <Param ControlIndex="0">44288</Param>
      <Param ControlIndex="1">35840</Param>
      <Param ControlIndex="2">33024</Param>
      <Param ControlIndex="3">23552</Param>
      <Param ControlIndex="4">52736</Param>
      <Param ControlIndex="5">21760</Param>
      <Param ControlIndex="6">37120</Param>
      <Param ControlIndex="7">46336</Param>
      <Param ControlIndex="8">33024</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">33024</Param>
      <Param ControlIndex="11">33024</Param>
      <Param ControlIndex="12">8</Param>
      <Param ControlIndex="13">8</Param>
      <Param ControlIndex="14">8</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">6</Param>
      <Param ControlIndex="18">8</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="60" POS="0" BypassState="0">
        <Param ControlIndex="0">65280</Param>
        <Param ControlIndex="1">0</Param>
        <Param ControlIndex="2">38400</Param>
        <Param ControlIndex="3">9984</Param>
        <Param ControlIndex="4">43008</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="79" POS="1" BypassState="1">
        <Param ControlIndex="0">27136</Param>
        <Param ControlIndex="1">1792</Param>
        <Param ControlIndex="2">35840</Param>
        <Param ControlIndex="3">30976</Param>
        <Param ControlIndex="4">0</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="75" POS="7" BypassState="1">
        <Param ControlIndex="0">10752</Param>
        <Param ControlIndex="1">36096</Param>
        <Param ControlIndex="2">32512</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">41216</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="59 Pasadena's Phaser" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="3" HeelSetting="28672" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,zI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="93" POS="0" BypassState="1">
      <Param ControlIndex="0">43520</Param>
      <Param ControlIndex="1">36352</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">26112</Param>
      <Param ControlIndex="4">65280</Param>
      <Param ControlIndex="5">0</Param>
      <Param ControlIndex="6">65280</Param>
      <Param ControlIndex="7">28928</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">10</Param>
      <Param ControlIndex="13">10</Param>
      <Param ControlIndex="14">10</Param>
      <Param ControlIndex="15">3</Param>
      <Param ControlIndex="16">4</Param>
      <Param ControlIndex="17">10</Param>
      <Param ControlIndex="18">10</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="0"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="0"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="58" POS="7" BypassState="1">
        <Param ControlIndex="0">5632</Param>
        <Param ControlIndex="1">15872</Param>
        <Param ControlIndex="2">27392</Param>
        <Param ControlIndex="3">1280</Param>
        <Param ControlIndex="4">45056</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="60 Puppet Master" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="1" HeelSetting="32768" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,$I=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="117" POS="0" BypassState="1">
      <Param ControlIndex="0">53504</Param>
      <Param ControlIndex="1">24832</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">25344</Param>
      <Param ControlIndex="4">29184</Param>
      <Param ControlIndex="5">34048</Param>
      <Param ControlIndex="6">20224</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">5</Param>
      <Param ControlIndex="13">5</Param>
      <Param ControlIndex="14">5</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">9</Param>
      <Param ControlIndex="18">5</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="7" POS="0" BypassState="1">
        <Param ControlIndex="0">21504</Param>
        <Param ControlIndex="1">3840</Param>
        <Param ControlIndex="2">20224</Param>
        <Param ControlIndex="3">32512</Param>
        <Param ControlIndex="4">32512</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">18944</Param>
        <Param ControlIndex="1">13568</Param>
        <Param ControlIndex="2">7168</Param>
        <Param ControlIndex="3">39680</Param>
        <Param ControlIndex="4">21504</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="58" POS="7" BypassState="1">
        <Param ControlIndex="0">29440</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">50688</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="61 Sic Clean" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="4" HeelSetting="16384" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,XI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="94" POS="0" BypassState="1">
      <Param ControlIndex="0">45568</Param>
      <Param ControlIndex="1">65280</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">35840</Param>
      <Param ControlIndex="4">60928</Param>
      <Param ControlIndex="5">46592</Param>
      <Param ControlIndex="6">59904</Param>
      <Param ControlIndex="7">38144</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">9</Param>
      <Param ControlIndex="13">9</Param>
      <Param ControlIndex="14">9</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">6</Param>
      <Param ControlIndex="18">9</Param>
      <Param ControlIndex="19">2</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="0"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="75" POS="7" BypassState="1">
        <Param ControlIndex="0">14336</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">37120</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">46592</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="62 Balls to the Wall" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="8192" ToeSetting="32512" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,HI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="109" POS="0" BypassState="1">
      <Param ControlIndex="0">44032</Param>
      <Param ControlIndex="1">33792</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">21760</Param>
      <Param ControlIndex="4">15360</Param>
      <Param ControlIndex="5">61952</Param>
      <Param ControlIndex="6">50944</Param>
      <Param ControlIndex="7">51968</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">8</Param>
      <Param ControlIndex="13">8</Param>
      <Param ControlIndex="14">8</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">8</Param>
      <Param ControlIndex="18">8</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="7" POS="0" BypassState="1">
        <Param ControlIndex="0">36096</Param>
        <Param ControlIndex="1">3840</Param>
        <Param ControlIndex="2">20224</Param>
        <Param ControlIndex="3">32512</Param>
        <Param ControlIndex="4">32512</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="42" POS="6" BypassState="1">
        <Param ControlIndex="0">32000</Param>
        <Param ControlIndex="1">22272</Param>
        <Param ControlIndex="2">7168</Param>
        <Param ControlIndex="3">20480</Param>
        <Param ControlIndex="4">41216</Param>
        <Param ControlIndex="5">32768</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="58" POS="7" BypassState="0">
        <Param ControlIndex="0">43776</Param>
        <Param ControlIndex="1">15872</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">1280</Param>
        <Param ControlIndex="4">45056</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="63 Sic Delay Comp" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="4" HeelSetting="12288" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,KI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="103" POS="0" BypassState="1">
      <Param ControlIndex="0">49664</Param>
      <Param ControlIndex="1">33792</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32768</Param>
      <Param ControlIndex="4">48640</Param>
      <Param ControlIndex="5">32768</Param>
      <Param ControlIndex="6">32768</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">1</Param>
      <Param ControlIndex="13">1</Param>
      <Param ControlIndex="14">1</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">1</Param>
      <Param ControlIndex="18">1</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">33280</Param>
        <Param ControlIndex="1">5888</Param>
        <Param ControlIndex="2">4096</Param>
        <Param ControlIndex="3">25344</Param>
        <Param ControlIndex="4">32768</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="38" POS="7" BypassState="1">
        <Param ControlIndex="0">13568</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="64 Rockabilly Train" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="4" HeelSetting="8192" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,YI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="83" POS="0" BypassState="1">
      <Param ControlIndex="0">30976</Param>
      <Param ControlIndex="1">44288</Param>
      <Param ControlIndex="2">0</Param>
      <Param ControlIndex="3">65280</Param>
      <Param ControlIndex="4">37376</Param>
      <Param ControlIndex="5">52992</Param>
      <Param ControlIndex="6">16640</Param>
      <Param ControlIndex="7">0</Param>
      <Param ControlIndex="8">0</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">0</Param>
      <Param ControlIndex="12">3</Param>
      <Param ControlIndex="13">3</Param>
      <Param ControlIndex="14">3</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">7</Param>
      <Param ControlIndex="18">3</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="11" POS="7" BypassState="1">
        <Param ControlIndex="0">5632</Param>
        <Param ControlIndex="1">14080</Param>
        <Param ControlIndex="2">18688</Param>
        <Param ControlIndex="3">65280</Param>
        <Param ControlIndex="4">28416</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="65 Cheap Deluxe" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="0" ToeSetting="32512" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,JI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="83" POS="0" BypassState="1">
      <Param ControlIndex="0">41728</Param>
      <Param ControlIndex="1">24832</Param>
      <Param ControlIndex="2">0</Param>
      <Param ControlIndex="3">65280</Param>
      <Param ControlIndex="4">35072</Param>
      <Param ControlIndex="5">52992</Param>
      <Param ControlIndex="6">16640</Param>
      <Param ControlIndex="7">0</Param>
      <Param ControlIndex="8">0</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">0</Param>
      <Param ControlIndex="12">3</Param>
      <Param ControlIndex="13">3</Param>
      <Param ControlIndex="14">3</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">3</Param>
      <Param ControlIndex="18">3</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="60" POS="0" BypassState="1">
        <Param ControlIndex="0">22784</Param>
        <Param ControlIndex="1">40192</Param>
        <Param ControlIndex="2">37632</Param>
        <Param ControlIndex="3">29184</Param>
        <Param ControlIndex="4">30720</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="42" POS="6" BypassState="1">
        <Param ControlIndex="0">16640</Param>
        <Param ControlIndex="1">35072</Param>
        <Param ControlIndex="2">7168</Param>
        <Param ControlIndex="3">25344</Param>
        <Param ControlIndex="4">65280</Param>
        <Param ControlIndex="5">32768</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="11" POS="7" BypassState="1">
        <Param ControlIndex="0">7168</Param>
        <Param ControlIndex="1">35584</Param>
        <Param ControlIndex="2">18688</Param>
        <Param ControlIndex="3">65280</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="66 Sensitive" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="1" HeelSetting="20480" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,QI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="94" POS="0" BypassState="1">
      <Param ControlIndex="0">43520</Param>
      <Param ControlIndex="1">65280</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32000</Param>
      <Param ControlIndex="4">57344</Param>
      <Param ControlIndex="5">43776</Param>
      <Param ControlIndex="6">65280</Param>
      <Param ControlIndex="7">38912</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">9</Param>
      <Param ControlIndex="13">9</Param>
      <Param ControlIndex="14">9</Param>
      <Param ControlIndex="15">3</Param>
      <Param ControlIndex="16">4</Param>
      <Param ControlIndex="17">6</Param>
      <Param ControlIndex="18">9</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="60" POS="0" BypassState="1">
        <Param ControlIndex="0">56832</Param>
        <Param ControlIndex="1">53504</Param>
        <Param ControlIndex="2">43264</Param>
        <Param ControlIndex="3">63232</Param>
        <Param ControlIndex="4">28416</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="58" POS="7" BypassState="1">
        <Param ControlIndex="0">16640</Param>
        <Param ControlIndex="1">15872</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">1280</Param>
        <Param ControlIndex="4">45056</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="67 South of Heaven" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="4096" ToeSetting="32512" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,qI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="94" POS="0" BypassState="1">
      <Param ControlIndex="0">50944</Param>
      <Param ControlIndex="1">65280</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32000</Param>
      <Param ControlIndex="4">36352</Param>
      <Param ControlIndex="5">34560</Param>
      <Param ControlIndex="6">50176</Param>
      <Param ControlIndex="7">33024</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">9</Param>
      <Param ControlIndex="13">9</Param>
      <Param ControlIndex="14">9</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">6</Param>
      <Param ControlIndex="18">9</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="60" POS="0" BypassState="1">
        <Param ControlIndex="0">33280</Param>
        <Param ControlIndex="1">60160</Param>
        <Param ControlIndex="2">48640</Param>
        <Param ControlIndex="3">43776</Param>
        <Param ControlIndex="4">26880</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="72" POS="6" BypassState="1">
        <Param ControlIndex="0">9984</Param>
        <Param ControlIndex="1">62976</Param>
        <Param ControlIndex="2">27904</Param>
        <Param ControlIndex="3">32000</Param>
        <Param ControlIndex="4">41216</Param>
        <Param ControlIndex="5">32768</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="36" POS="7" BypassState="1">
        <Param ControlIndex="0">18944</Param>
        <Param ControlIndex="1">29440</Param>
        <Param ControlIndex="2">28160</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">37120</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="68 Twisted Lead" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="4" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="2" />
  <UsbGain>0</UsbGain>
</Preset>`,ZI=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="94" POS="0" BypassState="1">
      <Param ControlIndex="0">50944</Param>
      <Param ControlIndex="1">65280</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32000</Param>
      <Param ControlIndex="4">36352</Param>
      <Param ControlIndex="5">34560</Param>
      <Param ControlIndex="6">50176</Param>
      <Param ControlIndex="7">33024</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">9</Param>
      <Param ControlIndex="13">9</Param>
      <Param ControlIndex="14">9</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">6</Param>
      <Param ControlIndex="18">9</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="60" POS="0" BypassState="1">
        <Param ControlIndex="0">24576</Param>
        <Param ControlIndex="1">36864</Param>
        <Param ControlIndex="2">47616</Param>
        <Param ControlIndex="3">39680</Param>
        <Param ControlIndex="4">29696</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="0"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="36" POS="7" BypassState="1">
        <Param ControlIndex="0">21760</Param>
        <Param ControlIndex="1">29440</Param>
        <Param ControlIndex="2">27392</Param>
        <Param ControlIndex="3">33792</Param>
        <Param ControlIndex="4">38144</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="69 SetYourGoals Gaia" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="2" HeelSetting="20480" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,ef=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="117" POS="0" BypassState="1">
      <Param ControlIndex="0">58368</Param>
      <Param ControlIndex="1">16128</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">25344</Param>
      <Param ControlIndex="4">47872</Param>
      <Param ControlIndex="5">23040</Param>
      <Param ControlIndex="6">64256</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">5</Param>
      <Param ControlIndex="13">5</Param>
      <Param ControlIndex="14">5</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">10</Param>
      <Param ControlIndex="18">5</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="18" POS="5" BypassState="1">
        <Param ControlIndex="0">65280</Param>
        <Param ControlIndex="1">4864</Param>
        <Param ControlIndex="2">9984</Param>
        <Param ControlIndex="3">9728</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">15616</Param>
        <Param ControlIndex="1">24832</Param>
        <Param ControlIndex="2">12800</Param>
        <Param ControlIndex="3">25600</Param>
        <Param ControlIndex="4">22272</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="58" POS="7" BypassState="1">
        <Param ControlIndex="0">31488</Param>
        <Param ControlIndex="1">30976</Param>
        <Param ControlIndex="2">38400</Param>
        <Param ControlIndex="3">3840</Param>
        <Param ControlIndex="4">17408</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="70 This Love" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="4" HeelSetting="12288" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,nf=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="94" POS="0" BypassState="1">
      <Param ControlIndex="0">47616</Param>
      <Param ControlIndex="1">65280</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32000</Param>
      <Param ControlIndex="4">43520</Param>
      <Param ControlIndex="5">23296</Param>
      <Param ControlIndex="6">50176</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">4</Param>
      <Param ControlIndex="13">9</Param>
      <Param ControlIndex="14">9</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">6</Param>
      <Param ControlIndex="18">9</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="26" POS="0" BypassState="1">
        <Param ControlIndex="0">18432</Param>
        <Param ControlIndex="1">65280</Param>
        <Param ControlIndex="2">44032</Param>
        <Param ControlIndex="3">40192</Param>
        <Param ControlIndex="4">11264</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="41" POS="5" BypassState="1">
        <Param ControlIndex="0">65280</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">61184</Param>
        <Param ControlIndex="3">33024</Param>
        <Param ControlIndex="4">48128</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="72" POS="6" BypassState="1">
        <Param ControlIndex="0">32768</Param>
        <Param ControlIndex="1">45824</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">32768</Param>
        <Param ControlIndex="5">32768</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="7" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="71 What the Fuzz!" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="6" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,af=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="94" POS="0" BypassState="1">
      <Param ControlIndex="0">43520</Param>
      <Param ControlIndex="1">65280</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32000</Param>
      <Param ControlIndex="4">64512</Param>
      <Param ControlIndex="5">39424</Param>
      <Param ControlIndex="6">59904</Param>
      <Param ControlIndex="7">39936</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">9</Param>
      <Param ControlIndex="13">9</Param>
      <Param ControlIndex="14">9</Param>
      <Param ControlIndex="15">3</Param>
      <Param ControlIndex="16">4</Param>
      <Param ControlIndex="17">6</Param>
      <Param ControlIndex="18">9</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="60" POS="0" BypassState="1">
        <Param ControlIndex="0">54272</Param>
        <Param ControlIndex="1">52224</Param>
        <Param ControlIndex="2">50432</Param>
        <Param ControlIndex="3">47872</Param>
        <Param ControlIndex="4">45056</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="18" POS="5" BypassState="1">
        <Param ControlIndex="0">32256</Param>
        <Param ControlIndex="1">8448</Param>
        <Param ControlIndex="2">6400</Param>
        <Param ControlIndex="3">6400</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">28928</Param>
        <Param ControlIndex="1">28160</Param>
        <Param ControlIndex="2">4864</Param>
        <Param ControlIndex="3">27904</Param>
        <Param ControlIndex="4">16128</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="58" POS="7" BypassState="1">
        <Param ControlIndex="0">33024</Param>
        <Param ControlIndex="1">15872</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">1280</Param>
        <Param ControlIndex="4">45056</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="72 Wylde '80s Lead" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="4" HeelSetting="24576" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,rf=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="93" POS="0" BypassState="1">
      <Param ControlIndex="0">40192</Param>
      <Param ControlIndex="1">36352</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">26112</Param>
      <Param ControlIndex="4">41984</Param>
      <Param ControlIndex="5">6400</Param>
      <Param ControlIndex="6">50944</Param>
      <Param ControlIndex="7">28928</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">10</Param>
      <Param ControlIndex="13">10</Param>
      <Param ControlIndex="14">10</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">6</Param>
      <Param ControlIndex="18">10</Param>
      <Param ControlIndex="19">0</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">15360</Param>
        <Param ControlIndex="1">28416</Param>
        <Param ControlIndex="2">11264</Param>
        <Param ControlIndex="3">25344</Param>
        <Param ControlIndex="4">32768</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="59" POS="7" BypassState="1">
        <Param ControlIndex="0">12800</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">32768</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="73 Down Laid" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="0" ToeSetting="32512" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,of=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="83" POS="0" BypassState="1">
      <Param ControlIndex="0">37888</Param>
      <Param ControlIndex="1">33792</Param>
      <Param ControlIndex="2">0</Param>
      <Param ControlIndex="3">65280</Param>
      <Param ControlIndex="4">30720</Param>
      <Param ControlIndex="5">30464</Param>
      <Param ControlIndex="6">17664</Param>
      <Param ControlIndex="7">0</Param>
      <Param ControlIndex="8">0</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">46080</Param>
      <Param ControlIndex="11">0</Param>
      <Param ControlIndex="12">3</Param>
      <Param ControlIndex="13">3</Param>
      <Param ControlIndex="14">3</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">0</Param>
      <Param ControlIndex="18">3</Param>
      <Param ControlIndex="19">0</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">7168</Param>
        <Param ControlIndex="1">29696</Param>
        <Param ControlIndex="2">15872</Param>
        <Param ControlIndex="3">0</Param>
        <Param ControlIndex="4">12800</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="11" POS="7" BypassState="1">
        <Param ControlIndex="0">13056</Param>
        <Param ControlIndex="1">33792</Param>
        <Param ControlIndex="2">19712</Param>
        <Param ControlIndex="3">61440</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="74 Juicy Clean" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="4" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,tf=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="106" POS="0" BypassState="1">
      <Param ControlIndex="0">43776</Param>
      <Param ControlIndex="1">28672</Param>
      <Param ControlIndex="2">0</Param>
      <Param ControlIndex="3">65280</Param>
      <Param ControlIndex="4">37888</Param>
      <Param ControlIndex="5">39424</Param>
      <Param ControlIndex="6">17152</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">12032</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">4</Param>
      <Param ControlIndex="13">4</Param>
      <Param ControlIndex="14">4</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">4</Param>
      <Param ControlIndex="18">4</Param>
      <Param ControlIndex="19">0</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="7" POS="0" BypassState="1">
        <Param ControlIndex="0">32512</Param>
        <Param ControlIndex="1">7424</Param>
        <Param ControlIndex="2">8448</Param>
        <Param ControlIndex="3">0</Param>
        <Param ControlIndex="4">32512</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="45" POS="5" BypassState="1">
        <Param ControlIndex="0">48896</Param>
        <Param ControlIndex="1">48384</Param>
        <Param ControlIndex="2">16896</Param>
        <Param ControlIndex="3">16640</Param>
        <Param ControlIndex="4">24064</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">7168</Param>
        <Param ControlIndex="1">29696</Param>
        <Param ControlIndex="2">15872</Param>
        <Param ControlIndex="3">0</Param>
        <Param ControlIndex="4">12800</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="11" POS="7" BypassState="1">
        <Param ControlIndex="0">13056</Param>
        <Param ControlIndex="1">33792</Param>
        <Param ControlIndex="2">19712</Param>
        <Param ControlIndex="3">61440</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="75 Swirlin Diddy" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="3" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,lf=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="121" POS="0" BypassState="1">
      <Param ControlIndex="0">43264</Param>
      <Param ControlIndex="1">47616</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32000</Param>
      <Param ControlIndex="4">40960</Param>
      <Param ControlIndex="5">53248</Param>
      <Param ControlIndex="6">46592</Param>
      <Param ControlIndex="7">39168</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">11</Param>
      <Param ControlIndex="13">11</Param>
      <Param ControlIndex="14">11</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">10</Param>
      <Param ControlIndex="18">11</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">16640</Param>
        <Param ControlIndex="1">18944</Param>
        <Param ControlIndex="2">4608</Param>
        <Param ControlIndex="3">25344</Param>
        <Param ControlIndex="4">32768</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="7" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="76 Live N Dangerous" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="1" HeelSetting="32768" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,sf=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="94" POS="0" BypassState="1">
      <Param ControlIndex="0">43520</Param>
      <Param ControlIndex="1">65280</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32000</Param>
      <Param ControlIndex="4">64512</Param>
      <Param ControlIndex="5">44544</Param>
      <Param ControlIndex="6">59904</Param>
      <Param ControlIndex="7">33536</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">9</Param>
      <Param ControlIndex="13">9</Param>
      <Param ControlIndex="14">9</Param>
      <Param ControlIndex="15">3</Param>
      <Param ControlIndex="16">4</Param>
      <Param ControlIndex="17">6</Param>
      <Param ControlIndex="18">9</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="60" POS="0" BypassState="1">
        <Param ControlIndex="0">55296</Param>
        <Param ControlIndex="1">44800</Param>
        <Param ControlIndex="2">40704</Param>
        <Param ControlIndex="3">37632</Param>
        <Param ControlIndex="4">45056</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="18" POS="5" BypassState="1">
        <Param ControlIndex="0">20224</Param>
        <Param ControlIndex="1">8448</Param>
        <Param ControlIndex="2">5120</Param>
        <Param ControlIndex="3">6400</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="0">
        <Param ControlIndex="0">28928</Param>
        <Param ControlIndex="1">28160</Param>
        <Param ControlIndex="2">4864</Param>
        <Param ControlIndex="3">27904</Param>
        <Param ControlIndex="4">16128</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="75" POS="7" BypassState="1">
        <Param ControlIndex="0">18432</Param>
        <Param ControlIndex="1">38656</Param>
        <Param ControlIndex="2">42496</Param>
        <Param ControlIndex="3">29696</Param>
        <Param ControlIndex="4">17664</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="77 Still of the Nite" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="3" HeelSetting="16384" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,df=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="121" POS="0" BypassState="1">
      <Param ControlIndex="0">43520</Param>
      <Param ControlIndex="1">65280</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32000</Param>
      <Param ControlIndex="4">40192</Param>
      <Param ControlIndex="5">65280</Param>
      <Param ControlIndex="6">54016</Param>
      <Param ControlIndex="7">28416</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">36864</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">11</Param>
      <Param ControlIndex="13">11</Param>
      <Param ControlIndex="14">11</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">10</Param>
      <Param ControlIndex="18">11</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="60" POS="0" BypassState="1">
        <Param ControlIndex="0">55296</Param>
        <Param ControlIndex="1">43776</Param>
        <Param ControlIndex="2">32512</Param>
        <Param ControlIndex="3">39936</Param>
        <Param ControlIndex="4">28672</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="0"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="42" POS="6" BypassState="1">
        <Param ControlIndex="0">16384</Param>
        <Param ControlIndex="1">25600</Param>
        <Param ControlIndex="2">6656</Param>
        <Param ControlIndex="3">25344</Param>
        <Param ControlIndex="4">43264</Param>
        <Param ControlIndex="5">32768</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="7" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="78 Cold Sweat" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="4" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="2" />
  <UsbGain>0</UsbGain>
</Preset>`,mf=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="117" POS="0" BypassState="1">
      <Param ControlIndex="0">56832</Param>
      <Param ControlIndex="1">16896</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">25344</Param>
      <Param ControlIndex="4">29184</Param>
      <Param ControlIndex="5">34048</Param>
      <Param ControlIndex="6">20224</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">5</Param>
      <Param ControlIndex="13">5</Param>
      <Param ControlIndex="14">5</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">9</Param>
      <Param ControlIndex="18">5</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="7" POS="0" BypassState="1">
        <Param ControlIndex="0">21504</Param>
        <Param ControlIndex="1">3840</Param>
        <Param ControlIndex="2">20224</Param>
        <Param ControlIndex="3">32512</Param>
        <Param ControlIndex="4">32512</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">18944</Param>
        <Param ControlIndex="1">13568</Param>
        <Param ControlIndex="2">7168</Param>
        <Param ControlIndex="3">39680</Param>
        <Param ControlIndex="4">17408</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="58" POS="7" BypassState="1">
        <Param ControlIndex="0">26112</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">26368</Param>
        <Param ControlIndex="3">39680</Param>
        <Param ControlIndex="4">65280</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="79 Active Clean" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="4" HeelSetting="16384" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,uf=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="97" POS="0" BypassState="1">
      <Param ControlIndex="0">31488</Param>
      <Param ControlIndex="1">23040</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">41472</Param>
      <Param ControlIndex="4">41472</Param>
      <Param ControlIndex="5">32768</Param>
      <Param ControlIndex="6">45056</Param>
      <Param ControlIndex="7">0</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">7</Param>
      <Param ControlIndex="13">7</Param>
      <Param ControlIndex="14">7</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">7</Param>
      <Param ControlIndex="18">7</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="75" POS="7" BypassState="1">
        <Param ControlIndex="0">14336</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">37120</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">46592</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="80 British Invasion" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="5" HeelSetting="8192" ToeSetting="32512" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,Pf=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="97" POS="0" BypassState="1">
      <Param ControlIndex="0">48128</Param>
      <Param ControlIndex="1">19968</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">52480</Param>
      <Param ControlIndex="4">43776</Param>
      <Param ControlIndex="5">32768</Param>
      <Param ControlIndex="6">26880</Param>
      <Param ControlIndex="7">0</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">7</Param>
      <Param ControlIndex="13">7</Param>
      <Param ControlIndex="14">7</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">12</Param>
      <Param ControlIndex="18">7</Param>
      <Param ControlIndex="19">2</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">18944</Param>
        <Param ControlIndex="1">26112</Param>
        <Param ControlIndex="2">3072</Param>
        <Param ControlIndex="3">0</Param>
        <Param ControlIndex="4">32768</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="75" POS="7" BypassState="1">
        <Param ControlIndex="0">15872</Param>
        <Param ControlIndex="1">32768</Param>
        <Param ControlIndex="2">37120</Param>
        <Param ControlIndex="3">32768</Param>
        <Param ControlIndex="4">46592</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="81 Old Metal Clean" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="4" HeelSetting="12288" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,cf=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="106" POS="0" BypassState="1">
      <Param ControlIndex="0">43520</Param>
      <Param ControlIndex="1">19968</Param>
      <Param ControlIndex="2">0</Param>
      <Param ControlIndex="3">65280</Param>
      <Param ControlIndex="4">39168</Param>
      <Param ControlIndex="5">52224</Param>
      <Param ControlIndex="6">19456</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">4</Param>
      <Param ControlIndex="13">4</Param>
      <Param ControlIndex="14">4</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">4</Param>
      <Param ControlIndex="18">4</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="7" POS="0" BypassState="1">
        <Param ControlIndex="0">28160</Param>
        <Param ControlIndex="1">13312</Param>
        <Param ControlIndex="2">18944</Param>
        <Param ControlIndex="3">32512</Param>
        <Param ControlIndex="4">32512</Param>
      </Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="79" POS="1" BypassState="0">
        <Param ControlIndex="0">64768</Param>
        <Param ControlIndex="1">0</Param>
        <Param ControlIndex="2">64768</Param>
        <Param ControlIndex="3">47104</Param>
        <Param ControlIndex="4">0</Param>
      </Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="43" POS="6" BypassState="1">
        <Param ControlIndex="0">16896</Param>
        <Param ControlIndex="1">27136</Param>
        <Param ControlIndex="2">18944</Param>
        <Param ControlIndex="3">25344</Param>
        <Param ControlIndex="4">56064</Param>
        <Param ControlIndex="5">0</Param>
      </Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="11" POS="7" BypassState="1">
        <Param ControlIndex="0">13056</Param>
        <Param ControlIndex="1">32512</Param>
        <Param ControlIndex="2">16896</Param>
        <Param ControlIndex="3">65280</Param>
        <Param ControlIndex="4">32768</Param>
      </Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="82 Delayed Princeton" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="4" HeelSetting="0" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="2" />
  <UsbGain>0</UsbGain>
</Preset>`,xf=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="241" POS="0" BypassState="1">
      <Param ControlIndex="0">65280</Param>
      <Param ControlIndex="1">33024</Param>
      <Param ControlIndex="2">33024</Param>
      <Param ControlIndex="3">33024</Param>
      <Param ControlIndex="4">33024</Param>
      <Param ControlIndex="5">33024</Param>
      <Param ControlIndex="6">33024</Param>
      <Param ControlIndex="7">33024</Param>
      <Param ControlIndex="8">33024</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">33024</Param>
      <Param ControlIndex="11">33024</Param>
      <Param ControlIndex="12">4</Param>
      <Param ControlIndex="13">13</Param>
      <Param ControlIndex="14">13</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">0</Param>
      <Param ControlIndex="18">13</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="0"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="2" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="83 Basic Studio Pre" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="0" HeelSetting="16384" ToeSetting="32768" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,pf=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="124" POS="0" BypassState="1">
      <Param ControlIndex="0">43520</Param>
      <Param ControlIndex="1">22528</Param>
      <Param ControlIndex="2">0</Param>
      <Param ControlIndex="3">65280</Param>
      <Param ControlIndex="4">32768</Param>
      <Param ControlIndex="5">32768</Param>
      <Param ControlIndex="6">32768</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">12</Param>
      <Param ControlIndex="13">12</Param>
      <Param ControlIndex="14">12</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">5</Param>
      <Param ControlIndex="18">12</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="7" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="84 Basic '57 Champ" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="1" HeelSetting="20480" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,If=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="103" POS="0" BypassState="1">
      <Param ControlIndex="0">43520</Param>
      <Param ControlIndex="1">39168</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32768</Param>
      <Param ControlIndex="4">48640</Param>
      <Param ControlIndex="5">32768</Param>
      <Param ControlIndex="6">32768</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">1</Param>
      <Param ControlIndex="13">1</Param>
      <Param ControlIndex="14">1</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">1</Param>
      <Param ControlIndex="18">1</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="7" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="85 Basic '57 Deluxe" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="1" HeelSetting="20480" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,ff=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="246" POS="0" BypassState="1">
      <Param ControlIndex="0">44032</Param>
      <Param ControlIndex="1">19968</Param>
      <Param ControlIndex="2">33024</Param>
      <Param ControlIndex="3">33024</Param>
      <Param ControlIndex="4">44032</Param>
      <Param ControlIndex="5">31488</Param>
      <Param ControlIndex="6">40192</Param>
      <Param ControlIndex="7">48384</Param>
      <Param ControlIndex="8">33024</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">33024</Param>
      <Param ControlIndex="11">33024</Param>
      <Param ControlIndex="12">4</Param>
      <Param ControlIndex="13">14</Param>
      <Param ControlIndex="14">14</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">9</Param>
      <Param ControlIndex="18">14</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="0"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="2" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="86 Basic '57 Twin" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="0" HeelSetting="16384" ToeSetting="32768" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,hf=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="100" POS="0" BypassState="1">
      <Param ControlIndex="0">43520</Param>
      <Param ControlIndex="1">41472</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32768</Param>
      <Param ControlIndex="4">32768</Param>
      <Param ControlIndex="5">31232</Param>
      <Param ControlIndex="6">41472</Param>
      <Param ControlIndex="7">37120</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">2</Param>
      <Param ControlIndex="13">2</Param>
      <Param ControlIndex="14">2</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">2</Param>
      <Param ControlIndex="18">2</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="7" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="87 Basic '59 Bassman" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="1" HeelSetting="24576" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,Cf=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="106" POS="0" BypassState="1">
      <Param ControlIndex="0">43520</Param>
      <Param ControlIndex="1">21760</Param>
      <Param ControlIndex="2">0</Param>
      <Param ControlIndex="3">65280</Param>
      <Param ControlIndex="4">39168</Param>
      <Param ControlIndex="5">52224</Param>
      <Param ControlIndex="6">19456</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">4</Param>
      <Param ControlIndex="13">4</Param>
      <Param ControlIndex="14">4</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">4</Param>
      <Param ControlIndex="18">4</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="7" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="88 Basic 65Princeton" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="1" HeelSetting="20480" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,gf=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="83" POS="0" BypassState="1">
      <Param ControlIndex="0">43520</Param>
      <Param ControlIndex="1">28928</Param>
      <Param ControlIndex="2">0</Param>
      <Param ControlIndex="3">65280</Param>
      <Param ControlIndex="4">37120</Param>
      <Param ControlIndex="5">52992</Param>
      <Param ControlIndex="6">14336</Param>
      <Param ControlIndex="7">0</Param>
      <Param ControlIndex="8">0</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">0</Param>
      <Param ControlIndex="12">3</Param>
      <Param ControlIndex="13">3</Param>
      <Param ControlIndex="14">3</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">3</Param>
      <Param ControlIndex="18">3</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="7" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="89 Basic '65 Deluxe" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="1" HeelSetting="24576" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,yf=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="117" POS="0" BypassState="1">
      <Param ControlIndex="0">43520</Param>
      <Param ControlIndex="1">22272</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">25344</Param>
      <Param ControlIndex="4">45824</Param>
      <Param ControlIndex="5">47872</Param>
      <Param ControlIndex="6">43520</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">5</Param>
      <Param ControlIndex="13">5</Param>
      <Param ControlIndex="14">5</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">9</Param>
      <Param ControlIndex="18">5</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="7" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="90 Basic '65 Twin" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="1" HeelSetting="20480" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,Sf=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="249" POS="0" BypassState="1">
      <Param ControlIndex="0">41728</Param>
      <Param ControlIndex="1">33024</Param>
      <Param ControlIndex="2">33024</Param>
      <Param ControlIndex="3">33024</Param>
      <Param ControlIndex="4">44032</Param>
      <Param ControlIndex="5">57088</Param>
      <Param ControlIndex="6">40192</Param>
      <Param ControlIndex="7">33024</Param>
      <Param ControlIndex="8">33024</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">33024</Param>
      <Param ControlIndex="11">33024</Param>
      <Param ControlIndex="12">4</Param>
      <Param ControlIndex="13">15</Param>
      <Param ControlIndex="14">15</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">1</Param>
      <Param ControlIndex="18">15</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="0"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="2" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="91 Basic '60s Thrift" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="0" HeelSetting="16384" ToeSetting="32768" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,vf=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="255" POS="0" BypassState="1">
      <Param ControlIndex="0">47616</Param>
      <Param ControlIndex="1">40192</Param>
      <Param ControlIndex="2">33024</Param>
      <Param ControlIndex="3">65280</Param>
      <Param ControlIndex="4">47616</Param>
      <Param ControlIndex="5">38912</Param>
      <Param ControlIndex="6">42496</Param>
      <Param ControlIndex="7">34560</Param>
      <Param ControlIndex="8">33024</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">33024</Param>
      <Param ControlIndex="11">33024</Param>
      <Param ControlIndex="12">4</Param>
      <Param ControlIndex="13">17</Param>
      <Param ControlIndex="14">17</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">10</Param>
      <Param ControlIndex="18">17</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="0"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="2" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="92 Basic Brit Watts" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="0" HeelSetting="16384" ToeSetting="32768" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,Mf=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="97" POS="0" BypassState="1">
      <Param ControlIndex="0">43520</Param>
      <Param ControlIndex="1">41472</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">25344</Param>
      <Param ControlIndex="4">39168</Param>
      <Param ControlIndex="5">32768</Param>
      <Param ControlIndex="6">45056</Param>
      <Param ControlIndex="7">0</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">7</Param>
      <Param ControlIndex="13">7</Param>
      <Param ControlIndex="14">7</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">7</Param>
      <Param ControlIndex="18">7</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="7" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="93 Basic British 60s" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="1" HeelSetting="20480" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,Df=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="121" POS="0" BypassState="1">
      <Param ControlIndex="0">43520</Param>
      <Param ControlIndex="1">65280</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32000</Param>
      <Param ControlIndex="4">43520</Param>
      <Param ControlIndex="5">23296</Param>
      <Param ControlIndex="6">50176</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">11</Param>
      <Param ControlIndex="13">11</Param>
      <Param ControlIndex="14">11</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">8</Param>
      <Param ControlIndex="18">11</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="7" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="94 Basic British 70s" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="1" HeelSetting="12288" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,bf=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="94" POS="0" BypassState="1">
      <Param ControlIndex="0">43520</Param>
      <Param ControlIndex="1">65280</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">32000</Param>
      <Param ControlIndex="4">43520</Param>
      <Param ControlIndex="5">23296</Param>
      <Param ControlIndex="6">50176</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">0</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">9</Param>
      <Param ControlIndex="13">9</Param>
      <Param ControlIndex="14">9</Param>
      <Param ControlIndex="15">1</Param>
      <Param ControlIndex="16">2</Param>
      <Param ControlIndex="17">6</Param>
      <Param ControlIndex="18">9</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="7" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="95 Basic British 80s" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="1" HeelSetting="8192" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,wf=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="252" POS="0" BypassState="1">
      <Param ControlIndex="0">38656</Param>
      <Param ControlIndex="1">35840</Param>
      <Param ControlIndex="2">33024</Param>
      <Param ControlIndex="3">33024</Param>
      <Param ControlIndex="4">40192</Param>
      <Param ControlIndex="5">25600</Param>
      <Param ControlIndex="6">33024</Param>
      <Param ControlIndex="7">33024</Param>
      <Param ControlIndex="8">33024</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">33024</Param>
      <Param ControlIndex="11">33024</Param>
      <Param ControlIndex="12">4</Param>
      <Param ControlIndex="13">16</Param>
      <Param ControlIndex="14">16</Param>
      <Param ControlIndex="15">0</Param>
      <Param ControlIndex="16">0</Param>
      <Param ControlIndex="17">8</Param>
      <Param ControlIndex="18">16</Param>
      <Param ControlIndex="19">0</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="0"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="2" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="96 Basic Brit Colour" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="0" HeelSetting="16384" ToeSetting="32768" PedalMode="0" BypassEffectWhenVolumeMode="1" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="0" />
  <UsbGain>0</UsbGain>
</Preset>`,Bf=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="114" POS="0" BypassState="1">
      <Param ControlIndex="0">53504</Param>
      <Param ControlIndex="1">47872</Param>
      <Param ControlIndex="2">33280</Param>
      <Param ControlIndex="3">21760</Param>
      <Param ControlIndex="4">39168</Param>
      <Param ControlIndex="5">41472</Param>
      <Param ControlIndex="6">39168</Param>
      <Param ControlIndex="7">32768</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">6</Param>
      <Param ControlIndex="13">6</Param>
      <Param ControlIndex="14">6</Param>
      <Param ControlIndex="15">2</Param>
      <Param ControlIndex="16">3</Param>
      <Param ControlIndex="17">12</Param>
      <Param ControlIndex="18">6</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="7" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="97 Basic Super-Sonic" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="1" HeelSetting="12288" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,kf=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="93" POS="0" BypassState="1">
      <Param ControlIndex="0">53248</Param>
      <Param ControlIndex="1">36352</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">26112</Param>
      <Param ControlIndex="4">41984</Param>
      <Param ControlIndex="5">6400</Param>
      <Param ControlIndex="6">50944</Param>
      <Param ControlIndex="7">28928</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">10</Param>
      <Param ControlIndex="13">10</Param>
      <Param ControlIndex="14">10</Param>
      <Param ControlIndex="15">3</Param>
      <Param ControlIndex="16">4</Param>
      <Param ControlIndex="17">10</Param>
      <Param ControlIndex="18">10</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="7" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="98 Basic 90s Stack" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="1" HeelSetting="16384" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,Ff=`\uFEFF<?xml version="1.0" encoding="utf-8"?>
<Preset amplifier="Mustang V2 III/IV/V" ProductId="13">
  <Amplifier>
    <Module ID="109" POS="0" BypassState="1">
      <Param ControlIndex="0">49920</Param>
      <Param ControlIndex="1">41984</Param>
      <Param ControlIndex="2">32768</Param>
      <Param ControlIndex="3">21760</Param>
      <Param ControlIndex="4">39168</Param>
      <Param ControlIndex="5">19456</Param>
      <Param ControlIndex="6">37120</Param>
      <Param ControlIndex="7">36352</Param>
      <Param ControlIndex="8">32768</Param>
      <Param ControlIndex="9">65535</Param>
      <Param ControlIndex="10">32768</Param>
      <Param ControlIndex="11">32768</Param>
      <Param ControlIndex="12">8</Param>
      <Param ControlIndex="13">8</Param>
      <Param ControlIndex="14">8</Param>
      <Param ControlIndex="15">2</Param>
      <Param ControlIndex="16">3</Param>
      <Param ControlIndex="17">8</Param>
      <Param ControlIndex="18">8</Param>
      <Param ControlIndex="19">1</Param>
      <Param ControlIndex="20">0</Param>
      <Param ControlIndex="21">1</Param>
      <Param ControlIndex="22">0</Param>
    </Module>
  </Amplifier>
  <FX>
    <Stompbox ID="1">
      <Module ID="0" POS="0" BypassState="1"></Module>
    </Stompbox>
    <Modulation ID="2">
      <Module ID="0" POS="5" BypassState="1"></Module>
    </Modulation>
    <Delay ID="3">
      <Module ID="0" POS="6" BypassState="1"></Module>
    </Delay>
    <Reverb ID="4">
      <Module ID="0" POS="7" BypassState="1"></Module>
    </Reverb>
  </FX>
  <Band Type="0" Repeat="0">
    <SongFile Location="6">No Band</SongFile>
    <AudioMix>0</AudioMix>
    <Balance>29127</Balance>
    <Speed>100</Speed>
    <Pitch>0</Pitch>
    <Tempo />
    <Transpose />
    <DrumSolo />
    <CountIn />
  </Band>
  <FUSE>
    <Info name="99 Basic 2000 Metal" author="Fender FUSE" rating="0" genre1="-1" genre2="-1" genre3="-1" tags="" fenderid="0"></Info>
    <PedalColors>
      <Color ID="1">14</Color>
      <Color ID="2">1</Color>
      <Color ID="3">2</Color>
      <Color ID="4">10</Color>
    </PedalColors>
  </FUSE>
  <FirstExpressionPedal VolumeModeBehavior="1" ExpressionModeBehavior="1" HeelSetting="16384" ToeSetting="65280" PedalMode="0" BypassEffectWhenVolumeMode="0" VolumeSwitchRevert="0" DefaultPedalState="0" PedalOverrideState="1" ParameterIndex="1" />
  <UsbGain>0</UsbGain>
</Preset>`,Ef=Object.assign({"./presets/blues-jam-picks/M2_00 Liquid Solo.fuse":sp,"./presets/blues-jam-picks/M2_03 Bad Weather.fuse":ip,"./presets/blues-jam-picks/M2_05 Twin Swing.fuse":dp,"./presets/blues-jam-picks/M2_09 Tweed Sugar.fuse":mp,"./presets/blues-jam-picks/M2_10 Derek Champ.fuse":up,"./presets/blues-jam-picks/M2_16 Country Deluxe.fuse":Pp,"./presets/blues-jam-picks/M2_20 JohnnyMarrTremolo.fuse":cp,"./presets/blues-jam-picks/M2_21 Fusion Lead.fuse":xp,"./presets/blues-jam-picks/M2_24 Beauty Clean.fuse":pp,"./presets/blues-jam-picks/M2_27 Dirty Deluxe.fuse":Ip,"./presets/blues-jam-picks/M2_30 Neil Deluxe.fuse":fp,"./presets/blues-jam-picks/M2_31 Touch of Reverb.fuse":hp,"./presets/blues-jam-picks/M2_33 Amin 3rds Solo.fuse":Cp,"./presets/blues-jam-picks/M2_34 Bassman Drive.fuse":gp,"./presets/blues-jam-picks/M2_37 Chimey Deluxe.fuse":yp,"./presets/blues-jam-picks/M2_38 Cranked Princeton.fuse":Sp,"./presets/blues-jam-picks/M2_40 Small Champ.fuse":vp,"./presets/blues-jam-picks/M2_43 Bassman Splash.fuse":Mp,"./presets/blues-jam-picks/M2_47 Gomez Clean.fuse":Dp,"./presets/blues-jam-picks/M2_52 Killer Cortez.fuse":bp,"./presets/blues-jam-picks/M2_56 The Cab Charles 2.fuse":wp,"./presets/blues-jam-picks/M2_58 One Bourbon.fuse":Bp,"./presets/blues-jam-picks/M2_64 Rockabilly Train.fuse":kp,"./presets/blues-jam-picks/M2_65 Cheap Deluxe.fuse":Fp,"./presets/blues-jam-picks/M2_66 Sensitive.fuse":Ep,"./presets/blues-jam-picks/M2_74 Juicy Clean.fuse":Tp,"./presets/blues-jam-picks/M2_75 Swirlin Diddy.fuse":Np,"./presets/blues-jam-picks/M2_82 Delayed Princeton.fuse":jp,"./presets/blues-jam-picks/M2_85 Basic '57 Deluxe.fuse":Op,"./presets/blues-jam-picks/M2_90 Basic '65 Twin.fuse":_p,"./presets/blues-jam-picks/Sample - Twin Jam Lead.fuse":Ap,"./presets/full-collection/M2_00 Liquid Solo.fuse":Rp,"./presets/full-collection/M2_01 Whitechapel Heavy.fuse":Vp,"./presets/full-collection/M2_02 Intro Clean.fuse":Up,"./presets/full-collection/M2_03 Bad Weather.fuse":Gp,"./presets/full-collection/M2_04 E Minor Avenger.fuse":Lp,"./presets/full-collection/M2_05 Twin Swing.fuse":Wp,"./presets/full-collection/M2_06 Pawn King.fuse":zp,"./presets/full-collection/M2_07 Pigs Can Fly.fuse":$p,"./presets/full-collection/M2_08 Johnny Marr Clean.fuse":Xp,"./presets/full-collection/M2_09 Tweed Sugar.fuse":Hp,"./presets/full-collection/M2_10 Derek Champ.fuse":Kp,"./presets/full-collection/M2_11 Green Cliffs.fuse":Yp,"./presets/full-collection/M2_12 60s Sparkle.fuse":Jp,"./presets/full-collection/M2_13 80s Guitar Hero.fuse":Qp,"./presets/full-collection/M2_14 Loud as Leeds.fuse":qp,"./presets/full-collection/M2_15 LeadCommunication.fuse":Zp,"./presets/full-collection/M2_16 Country Deluxe.fuse":eI,"./presets/full-collection/M2_17 The Evil Bassman.fuse":nI,"./presets/full-collection/M2_18 Brighton Rock.fuse":aI,"./presets/full-collection/M2_19 Angry Rodent.fuse":rI,"./presets/full-collection/M2_20 JohnnyMarrTremolo.fuse":oI,"./presets/full-collection/M2_21 Fusion Lead.fuse":tI,"./presets/full-collection/M2_22 C Baritone Clean.fuse":lI,"./presets/full-collection/M2_23 Doom Hand.fuse":sI,"./presets/full-collection/M2_24 Beauty Clean.fuse":iI,"./presets/full-collection/M2_25 Movie Tremolux.fuse":dI,"./presets/full-collection/M2_26 Europa.fuse":mI,"./presets/full-collection/M2_27 Dirty Deluxe.fuse":uI,"./presets/full-collection/M2_28 Aussie Rock.fuse":PI,"./presets/full-collection/M2_29 Metal Octave.fuse":cI,"./presets/full-collection/M2_30 Neil Deluxe.fuse":xI,"./presets/full-collection/M2_31 Touch of Reverb.fuse":pI,"./presets/full-collection/M2_32 Purple Fuzz.fuse":II,"./presets/full-collection/M2_33 Amin 3rds Solo.fuse":fI,"./presets/full-collection/M2_34 Bassman Drive.fuse":hI,"./presets/full-collection/M2_35 Doom Orleans.fuse":CI,"./presets/full-collection/M2_36 Autumns End Scars.fuse":gI,"./presets/full-collection/M2_37 Chimey Deluxe.fuse":yI,"./presets/full-collection/M2_38 Cranked Princeton.fuse":SI,"./presets/full-collection/M2_39 Day of Sighs.fuse":vI,"./presets/full-collection/M2_40 Small Champ.fuse":MI,"./presets/full-collection/M2_41 D of SUM 41.fuse":DI,"./presets/full-collection/M2_42 Bolero.fuse":bI,"./presets/full-collection/M2_43 Bassman Splash.fuse":wI,"./presets/full-collection/M2_44 Mike of A.A.R. 1.fuse":BI,"./presets/full-collection/M2_45 Far Beyond Driven.fuse":kI,"./presets/full-collection/M2_46 Four Year Strong.fuse":FI,"./presets/full-collection/M2_47 Gomez Clean.fuse":EI,"./presets/full-collection/M2_48 Summerset Drive.fuse":TI,"./presets/full-collection/M2_49 Supersonic Burn.fuse":NI,"./presets/full-collection/M2_50 Black Hole Vibe.fuse":jI,"./presets/full-collection/M2_51 Super-Live Album.fuse":OI,"./presets/full-collection/M2_52 Killer Cortez.fuse":_I,"./presets/full-collection/M2_53 British Steel.fuse":AI,"./presets/full-collection/M2_54 Mick The Hoople.fuse":RI,"./presets/full-collection/M2_55 MSG Lead.fuse":VI,"./presets/full-collection/M2_56 The Cab Charles 2.fuse":UI,"./presets/full-collection/M2_57 Alkaline Trio.fuse":GI,"./presets/full-collection/M2_58 One Bourbon.fuse":LI,"./presets/full-collection/M2_59 Pasadena's Phaser.fuse":WI,"./presets/full-collection/M2_60 Puppet Master.fuse":zI,"./presets/full-collection/M2_61 Sic Clean.fuse":$I,"./presets/full-collection/M2_62 Balls to the Wall.fuse":XI,"./presets/full-collection/M2_63 Sic Delay Comp.fuse":HI,"./presets/full-collection/M2_64 Rockabilly Train.fuse":KI,"./presets/full-collection/M2_65 Cheap Deluxe.fuse":YI,"./presets/full-collection/M2_66 Sensitive.fuse":JI,"./presets/full-collection/M2_67 South of Heaven.fuse":QI,"./presets/full-collection/M2_68 Twisted Lead.fuse":qI,"./presets/full-collection/M2_69 SetYourGoals Gaia.fuse":ZI,"./presets/full-collection/M2_70 This Love.fuse":ef,"./presets/full-collection/M2_71 What the Fuzz!.fuse":nf,"./presets/full-collection/M2_72 Wylde '80s Lead.fuse":af,"./presets/full-collection/M2_73 Down Laid.fuse":rf,"./presets/full-collection/M2_74 Juicy Clean.fuse":of,"./presets/full-collection/M2_75 Swirlin Diddy.fuse":tf,"./presets/full-collection/M2_76 Live N Dangerous.fuse":lf,"./presets/full-collection/M2_77 Still of the Nite.fuse":sf,"./presets/full-collection/M2_78 Cold Sweat.fuse":df,"./presets/full-collection/M2_79 Active Clean.fuse":mf,"./presets/full-collection/M2_80 British Invasion.fuse":uf,"./presets/full-collection/M2_81 Old Metal Clean.fuse":Pf,"./presets/full-collection/M2_82 Delayed Princeton.fuse":cf,"./presets/full-collection/M2_83 Basic Studio Pre.fuse":xf,"./presets/full-collection/M2_84 Basic '57 Champ.fuse":pf,"./presets/full-collection/M2_85 Basic '57 Deluxe.fuse":If,"./presets/full-collection/M2_86 Basic '57 Twin.fuse":ff,"./presets/full-collection/M2_87 Basic '59 Bassman.fuse":hf,"./presets/full-collection/M2_88 Basic 65Princeton.fuse":Cf,"./presets/full-collection/M2_89 Basic '65 Deluxe.fuse":gf,"./presets/full-collection/M2_90 Basic '65 Twin.fuse":yf,"./presets/full-collection/M2_91 Basic '60s Thrift.fuse":Sf,"./presets/full-collection/M2_92 Basic Brit Watts.fuse":vf,"./presets/full-collection/M2_93 Basic British 60s.fuse":Mf,"./presets/full-collection/M2_94 Basic British 70s.fuse":Df,"./presets/full-collection/M2_95 Basic British 80s.fuse":bf,"./presets/full-collection/M2_96 Basic Brit Colour.fuse":wf,"./presets/full-collection/M2_97 Basic Super-Sonic.fuse":Bf,"./presets/full-collection/M2_98 Basic 90s Stack.fuse":kf,"./presets/full-collection/M2_99 Basic 2000 Metal.fuse":Ff}),Tf={"blues-jam-picks":"Blues Jam","full-collection":"Full Collection"};let al=null;function Nf(){if(al)return al;const e=[];for(const[n,a]of Object.entries(Ef)){const r=n.split("/"),o=r[r.length-2],l=r[r.length-1].replace(/\.(fuse|xml)$/i,"");try{const s=BP(a,l);s.source=o,s.sourceLabel=Tf[o]||o,s.bundled=!0,e.push(s)}catch(s){console.warn(`Skipped bundled preset ${n}: ${s.message}`)}}return e.sort((n,a)=>n.name.localeCompare(a.name)),al=e,e}async function jf(){return(await xi(()=>import("./communityPresets-BrZS54EQ.js"),[])).default.map(n=>({...n,source:"fuse-community",sourceLabel:"Community",bundled:!0}))}async function Of(){return(await xi(()=>import("./curatedPresets-Bethk3py.js"),[])).default.map(n=>({...n,source:"curated",sourceLabel:"Curated",bundled:!0}))}const le=e=>Math.max(0,Math.min(1,(e||0)/255)),Qd="/guitar/",_f={40:"E2",47:"B2",52:"E3",55:"G3",57:"A3",59:"B3"},Af={rock:{dur:3.9,attack:.005,notes:[[40,0,.6],[47,.03,.6],[52,.06,.6],[40,.75,.5],[47,.78,.5],[52,.81,.5],[40,1.45,.8],[47,1.48,.8],[52,1.51,.8],[40,2.4,1.3],[47,2.43,1.3],[52,2.46,1.3]]},metal:{dur:3.5,attack:.004,notes:[[40,0,.12],[40,.16,.1],[40,.28,.1],[40,.44,.12],[40,.6,.1],[40,.72,.1],[40,.9,.3],[47,.9,.3],[40,1.25,.12],[40,1.41,.1],[40,1.53,.1],[40,1.7,.12],[40,1.86,.1],[40,2.05,.6],[47,2.05,.6],[52,2.05,.6],[40,2.85,.12],[40,3.01,.1],[40,3.13,.4],[47,3.13,.4]]},blues:{dur:3.9,attack:.005,notes:[[59,0,.3],[57,.28,.28],[55,.54,.3],[52,.84,.55],[52,1.45,.28],[55,1.72,.28],[57,1.98,.5],[59,2.45,1.4]]},lead:{dur:4.3,attack:.02,notes:[[55,0,.9],[57,.88,.7],[59,1.55,1.7],[57,3.25,1]]},clean:{dur:3.9,attack:.02,notes:[[40,0,2.2],[47,.35,2],[52,.7,1.8],[55,1.05,1.6],[59,1.45,1.7],[55,1.9,1.3],[52,2.3,1.6]]},funk:{dur:2.9,attack:.004,notes:[[52,0,.09],[55,0,.09],[59,0,.09],[52,.36,.09],[55,.36,.09],[59,.36,.09],[52,.54,.09],[55,.54,.09],[52,.9,.09],[55,.9,.09],[59,.9,.09],[52,1.26,.09],[55,1.26,.09],[59,1.26,.09],[52,1.44,.09],[55,1.44,.09],[52,1.8,.12],[55,1.8,.12],[59,1.8,.12],[52,2.16,.35],[55,2.16,.35],[59,2.16,.35]]},acoustic:{dur:3.9,attack:.005,notes:[[40,0,1.5],[47,.04,1.5],[52,.08,1.5],[55,.12,1.5],[59,.16,1.5],[59,.85,1],[55,.9,1],[52,.95,1],[40,1.6,2],[47,1.64,2],[52,1.68,2],[55,1.72,2],[59,1.76,2]]},ambient:{dur:4.2,attack:.6,notes:[[40,0,3.8],[47,.1,3.7],[52,.2,3.6],[55,.3,3.5],[59,.4,3.4]]}},Rf={rock:"rock riff",metal:"metal chug",blues:"blues lick",lead:"lead line",clean:"clean arpeggio",funk:"funk stabs",acoustic:"strummed chord",ambient:"ambient swell"};function kP(e){const n=(e.tag||"").toLowerCase();if(n){if(/metallica|pantera|slayer|megadeth|maiden|sabbath|iommi|dimebag/.test(n))return"metal";if(/gilmour|floyd|hendrix|clapton|santana|beck|trower|gary moore|king|mayer|frusciante/.test(n))return"lead";if(/knopfler|smiths|marr|u2|edge/.test(n))return"clean";if(/ac\/dc|angus|van halen|zz top|guns|slash|setzer|rush|queen|may/.test(n))return"rock";if(n==="metal")return"metal";if(n==="blues")return"blues";if(n==="lead")return"lead";if(n==="clean")return"clean";if(n==="acoustic")return"acoustic";if(n==="funk")return"funk";if(n.includes("ambient"))return"ambient";if(n.includes("fuzz"))return"lead";if(n.includes("crunch")||n.includes("rock"))return"rock"}const a=e.amp.model,r=(e.amp.gain||0)/255,o={};e.effects.forEach(d=>{o[d.dsp]=d});const l=o[6]&&[26,28,271].includes(o[6].model),s=o[9]&&[58,76,77].includes(o[9].model),i=[103,100,124,83,106,117,246].includes(a);return a===109||r>.7&&a===93?"metal":l?"lead":i&&r<.4?s?"ambient":"clean":o[8]&&r<.7?"lead":r>.55?"rock":"blues"}function Vf(e){return Rf[kP(e)]||"tone"}const Uf=new Set([60,186,272,273]),Gf=new Set([259]),Lf=new Set([26,28,271]),Wf=new Set([73,74,28,244,245]),zf=new Set([7,136]),$f=new Set([24,25]),Xf=new Set([79,41]),Hf=new Set([64,65]),Kf={36:[1,3],38:[.8,3],78:[1,3],59:[1.6,2.4],75:[1.5,2.4],58:[2.4,2],76:[2.2,2],77:[2.9,1.8],33:[.9,2.6],11:[1,2.6]};function Yf(e){const n=new Set([103,100,124,83,106,117,246]),a=new Set([97,121,94,252,255,114]),r=new Set([93,109]);return n.has(e)?[.7,3,70,.6]:r.has(e)?[1.5,-2,130,.15]:a.has(e)?[1.1,1,95,.35]:[.9,0,90,.4]}let FP=null;const EP={};let oo=null;function Jf(e){if(oo)return oo;const n=async a=>e.decodeAudioData(await(await fetch(a)).arrayBuffer());return oo=Promise.all([n(`${Qd}mustang-audio/cab.wav`).then(a=>{FP=a}),...Object.entries(_f).map(([a,r])=>n(`${Qd}mustang-audio/gtr/${r}.mp3`).then(o=>{EP[a]=o}))]),oo}function qd(e,n){const r=new Float32Array(1024);if(e==="fuzz"){const o=4+n*40;for(let l=0;l<1024;l++){const s=l/1024*2-1;r[l]=Math.tanh(o*s)}}else{const o=n*110;for(let l=0;l<1024;l++){const s=l/1024*2-1;r[l]=(1+o)*s/(1+o*Math.abs(s))}}return r}function Qf(e,n,a){const r=Math.floor(e.sampleRate*n),o=e.createBuffer(2,r,e.sampleRate);for(let l=0;l<2;l++){const s=o.getChannelData(l);for(let i=0;i<r;i++)s[i]=(Math.random()*2-1)*Math.pow(1-i/r,a)}return o}let ar=null;const Pr=[];function ds(){if(Pr.forEach(e=>{try{e.stop()}catch{}}),Pr.length=0,!!ar){ar.srcs.forEach(e=>{try{e.stop()}catch{}});try{ar.out.disconnect()}catch{}ar=null}}function qf(e,n,a){const r=e.createGain(),o=a.model;if(Hf.has(o)){const h=.25+le(a.knobs[1])*.35,g=e.createGain();g.gain.value=1-h;const C=e.createOscillator();C.frequency.value=3+le(a.knobs[0])*6;const v=e.createGain();return v.gain.value=h,C.connect(v),v.connect(g.gain),C.start(),Pr.push(C),n.connect(g),g.connect(r),r}if(Xf.has(o)){let h=n;const g=[];for(let u=0;u<4;u++){const P=e.createBiquadFilter();P.type="allpass",P.frequency.value=500+u*400,h.connect(P),h=P,g.push(P)}const C=e.createOscillator();C.frequency.value=.3+le(a.knobs[0])*1.5;const v=e.createGain();return v.gain.value=700,C.connect(v),g.forEach(u=>v.connect(u.frequency)),C.start(),Pr.push(C),n.connect(r),h.connect(r),r}const l=$f.has(o),s=l?.003:.022,i=l?.002:.006,d=e.createDelay(.1);d.delayTime.value=s;const m=e.createOscillator();m.frequency.value=l?.2+le(a.knobs[0])*1.2:.6+le(a.knobs[0])*2;const x=e.createGain();x.gain.value=i,m.connect(x),x.connect(d.delayTime),m.start(),Pr.push(m);const p=e.createGain();p.gain.value=.5;const c=e.createGain();if(c.gain.value=.6,l){const h=e.createGain();h.gain.value=.4,d.connect(h),h.connect(d)}return n.connect(d),d.connect(p),p.connect(r),n.connect(c),c.connect(r),r}async function Zf(e){const n=Ve();n.state==="suspended"&&await n.resume(),await Jf(n),ds();const a=e.amp,[r,o,l,s]=Yf(a.model),i={};e.effects.forEach(A=>{i[A.dsp]=A});const d=n.createGain();let m=d;const x=i[6];let p=0,c="od";if(x){const A=x.model;if(zf.has(A)){const R=n.createDynamicsCompressor();R.threshold.value=-28,R.ratio.value=8,R.attack.value=.003,R.release.value=.15,m.connect(R),m=R}if(Wf.has(A)){const R=n.createBiquadFilter();R.type="peaking",R.frequency.value=620,R.Q.value=6,R.gain.value=14,m.connect(R),m=R}if(Uf.has(A)?(p=.45+le(x.knobs[1])*.4,c="od"):Gf.has(A)?(p=.3+le(x.knobs[0])*.3,c="od"):Lf.has(A)&&(p=.8+le(x.knobs[1])*.2,c="fuzz"),p>0){const R=n.createGain();R.gain.value=1+p*8;const G=n.createWaveShaper();G.curve=qd(c,p),G.oversample="4x";const W=n.createGain();if(W.gain.value=.6/(1+p),A===186){const z=n.createBiquadFilter();z.type="peaking",z.frequency.value=720,z.Q.value=.9,z.gain.value=6,m.connect(R),R.connect(z),z.connect(G)}else m.connect(R),R.connect(G);G.connect(W),m=W}}const h=n.createBiquadFilter();h.type="highpass",h.frequency.value=l;const g=le(a.gain)*r,C=Math.min(1,g*(1-s)+(c==="fuzz"?.15:0)),v=n.createGain();v.gain.value=1+g*(6+(1-s)*6);const u=n.createWaveShaper();u.curve=qd("od",C),u.oversample="4x";const P=n.createBiquadFilter();P.type="lowshelf",P.frequency.value=180,P.gain.value=(le(a.bass)-.5)*22;const I=n.createBiquadFilter();I.type="peaking",I.frequency.value=720,I.Q.value=.8,I.gain.value=(le(a.middle)-.5)*18;const D=n.createBiquadFilter();D.type="highshelf",D.frequency.value=2600,D.gain.value=(le(a.treble)-.5)*20+o;const B=n.createBiquadFilter();B.type="highshelf",B.frequency.value=4800,B.gain.value=(le(a.presence)-.5)*14;const y=n.createConvolver();y.buffer=FP;const f=n.createGain();f.gain.value=6,m.connect(h),h.connect(v),v.connect(u),u.connect(P),P.connect(I),I.connect(D),D.connect(B),B.connect(y),y.connect(f);let k=f;i[7]&&(k=qf(n,f,i[7]));const T=n.createGain();if(T.gain.value=(.4+le(a.volume)*.5)/(1+C*1.5+p),k.connect(T),i[8]){const A=i[8],R=n.createDelay(2);R.delayTime.value=.14+le(A.knobs[0])*.55;const G=n.createGain();G.gain.value=Math.min(.6,.2+le(A.knobs[1])*.45);const W=n.createBiquadFilter();W.type="lowpass",W.frequency.value=A.model===43||A.model===42?2600:6e3;const z=n.createGain();z.gain.value=.22+le(A.knobs[2])*.3,k.connect(R),R.connect(W),W.connect(G),G.connect(R),W.connect(z),z.connect(T)}if(i[9]){const[A,R]=Kf[i[9].model]||[1.6,2.3],G=n.createConvolver();G.buffer=Qf(n,A,R);const W=n.createGain();W.gain.value=.15+le(i[9].knobs[0])*.3,k.connect(G),G.connect(W),W.connect(T)}T.connect(xt());const F=Af[kP(e)],_=n.currentTime+.06,U=[];return F.notes.forEach(([A,R,G])=>{const W=EP[A];if(!W)return;const z=n.createBufferSource();z.buffer=W;const M=n.createGain(),b=_+R,N=Math.min(F.attack,G*.5),w=Math.max(b+N,b+G-.05);M.gain.setValueAtTime(1e-4,b),M.gain.exponentialRampToValueAtTime(1,b+N),M.gain.setValueAtTime(1,w),M.gain.exponentialRampToValueAtTime(.001,b+G),z.connect(M),M.connect(d),z.start(b),z.stop(b+G+.05),U.push(z)}),ar={out:T,srcs:U},F.dur}const Zd="guitar-jam-mustang-lib",rl=300,eh=e=>new Promise(n=>setTimeout(n,e)),nh=e=>e.effects.map(n=>{var a;return(a=aa[n.model])==null?void 0:a.n}).filter(Boolean).join(", ")||"no effects",ah=e=>{var n;return((n=_a[e.amp.model])==null?void 0:n.v2)||e.effects.some(a=>{var r;return(r=aa[a.model])==null?void 0:r.v2})},ms=e=>(Math.round(e/255*100)/10).toFixed(1),rh={6:"Stomp",7:"Mod",8:"Delay",9:"Reverb"},oh={6:"bg-amber-900/40 text-amber-200 border-amber-700/40",7:"bg-sky-900/40 text-sky-200 border-sky-700/40",8:"bg-blue-900/40 text-blue-200 border-blue-700/40",9:"bg-purple-900/40 text-purple-200 border-purple-700/40"};function th({label:e,value:n}){const r=(v,u)=>{const P=u*Math.PI/180;return[28+v*Math.sin(P),28-v*Math.cos(P)]},o=Math.max(0,Math.min(1,n/255)),l=-135+o*270,s=[];for(let v=0;v<=10;v++){const u=-135+v*27,P=v%5===0,[I,D]=r(P?18.5:20,u),[B,y]=r(23.5,u);s.push(t.jsx("line",{x1:I.toFixed(1),y1:D.toFixed(1),x2:B.toFixed(1),y2:y.toFixed(1),stroke:P?"#9ca3af":"#4b5563",strokeWidth:P?1.6:1},v))}const[i,d]=r(23.5,-135),[m,x]=r(23.5,l),p=o*270>180?1:0,[c,h]=r(15,l),[g,C]=r(3,l);return t.jsxs("div",{className:"text-center",style:{flex:1,minWidth:46},children:[t.jsxs("svg",{width:"54",height:"54",viewBox:"0 0 56 56",className:"mx-auto block",children:[s,o>.001&&t.jsx("path",{d:`M${i.toFixed(1)} ${d.toFixed(1)} A23.5 23.5 0 ${p} 1 ${m.toFixed(1)} ${x.toFixed(1)}`,fill:"none",stroke:"#f97316",strokeWidth:"2.5",strokeLinecap:"round"}),t.jsx("circle",{cx:"28",cy:"28",r:"16",fill:"#242320",stroke:"rgba(255,255,255,.14)",strokeWidth:"1"}),t.jsx("circle",{cx:"28",cy:"28",r:"10.5",fill:"#332f2b"}),t.jsx("line",{x1:g.toFixed(1),y1:C.toFixed(1),x2:c.toFixed(1),y2:h.toFixed(1),stroke:"#f4ede0",strokeWidth:"2.6",strokeLinecap:"round"}),t.jsx("circle",{cx:"28",cy:"28",r:"2.4",fill:"#4a4038"})]}),t.jsx("div",{className:"text-[10px] text-gray-500 -mt-0.5",children:e}),t.jsx("div",{className:"text-[11px] text-gray-300 font-medium tabular-nums",children:ms(n)})]})}function lh({p:e}){var o;const n=e.amp,a=[["Gain",n.gain],["Vol",n.volume],["Treble",n.treble],["Middle",n.middle],["Bass",n.bass],["Presence",n.presence],["Master",n.master]],r=[6,7,8,9].map(l=>e.effects.find(s=>s.dsp===l)).filter(Boolean);return t.jsxs("div",{className:"bg-gray-900/60 border border-gray-700 rounded-xl px-4 py-3 space-y-3",children:[t.jsxs("div",{children:[t.jsxs("div",{className:"text-[10px] uppercase tracking-wide text-orange-400 font-bold mb-1",children:["Amp · ",(o=_a[n.model])==null?void 0:o.name]}),t.jsx("div",{className:"flex gap-1 justify-between flex-wrap",children:a.map(([l,s])=>t.jsx(th,{label:l,value:s},l))})]}),t.jsxs("div",{children:[t.jsx("div",{className:"text-[10px] uppercase tracking-wide text-orange-400 font-bold mb-1.5",children:"Signal chain"}),r.length===0?t.jsx("div",{className:"text-gray-500 text-xs",children:"Clean — no effects."}):t.jsx("div",{className:"flex items-center gap-2 flex-wrap",children:r.map((l,s)=>{var i;return t.jsxs("div",{className:"flex items-center gap-2",children:[s>0&&t.jsx(Pt,{size:14,className:"text-gray-600"}),t.jsxs("div",{className:`border rounded-lg px-2.5 py-1.5 ${oh[l.dsp]}`,children:[t.jsxs("div",{className:"text-xs font-semibold",children:[((i=aa[l.model])==null?void 0:i.n)||`0x${l.model.toString(16)}`," ",t.jsxs("span",{className:"opacity-60 font-normal",children:["· ",rh[l.dsp]]})]}),t.jsx("div",{className:"text-[9px] opacity-70 tabular-nums mt-0.5",children:l.knobs.slice(0,6).map(d=>ms(d)).join(" · ")})]})]},s)})}),e.usbGain!=null&&t.jsxs("div",{className:"text-[11px] text-gray-500 mt-2",children:["USB gain: ",ms(e.usbGain)]})]})]})}function sh(){const e=S.useRef(null),[n,a]=S.useState(!1),[r,o]=S.useState("No amp connected"),[l,s]=S.useState({}),[i,d]=S.useState([]),m=S.useRef({}),x=typeof navigator<"u"&&!!navigator.hid,p=S.useCallback((P,I="")=>{d(D=>[...D.slice(-250),{t:P,cls:I}])},[]),c=S.useCallback(async(P,I)=>{p(`→ ${I}: ${Jd(P.slice(0,16))} …`,"tx"),await e.current.sendReport(0,P),await eh(15)},[p]),h=S.useCallback(P=>{const I=new Uint8Array(P.data.buffer,P.data.byteOffset,P.data.byteLength);if(I[0]===28&&I[1]===1&&I[2]===4&&I[3]===0){const D=I[4];let B="";for(let y=16;y<48&&I[y];y++)B+=String.fromCharCode(I[y]);B.trim()&&(m.current={...m.current,[D]:B.trim()},s(m.current))}p(`← ${Jd(I.slice(0,16))}`,"rx")},[p]),g=S.useCallback(async()=>{try{const P=await navigator.hid.requestDevice({filters:[{vendorId:Q1}]});if(!P.length)return;const I=P[0];await I.open(),I.addEventListener("inputreport",h),e.current=I;const D=q1[I.productId]||I.productName||"Fender device";a(!0),o(`${D} — connected`),p(`Connected: ${D} (PID 0x${I.productId.toString(16)})`,"ok");const[B,y]=Z1();await c(B,"init 1"),await c(y,"init 2"),m.current={},s({}),await c(ep(),"request state")}catch(P){p("Connect failed: "+P.message,"err")}},[h,c,p]),C=S.useCallback(async()=>{const P=e.current;if(P)try{P.removeEventListener("inputreport",h),await P.close()}catch{}e.current=null,a(!1),o("No amp connected")},[h]);S.useEffect(()=>()=>{C()},[C]);const v=S.useCallback(async P=>{if(!e.current)throw new Error("Connect the amp first");await c(rp(P.amp),"amp settings"),await c(nl(),"execute");for(const I of[6,7,8,9]){const D=P.effects.find(B=>B.dsp===I)||{model:0,dsp:I,pos:0,knobs:[]};await c(tp(D),D.model?`fx ${aa[D.model].n}`:`clear dsp ${I}`),await c(nl(),"execute")}P.usbGain!=null&&(await c(op(P.usbGain),"usb gain"),await c(nl(),"execute")),p(`Preset "${P.name}" applied ✓`,"ok")},[c,p]),u=S.useCallback(async(P,I,D)=>{if(!e.current)throw new Error("Connect the amp first");await v(P),await c(ap(I,D),"save to bank "+(I+1)),await c(np(I),"select bank"),m.current={...m.current,[I]:D},s(m.current),p(`Saved to bank ${I+1} as "${D}" ✓`,"ok")},[v,c,p]);return{supported:x,connected:n,status:r,banks:l,log:i,connect:g,disconnect:C,applyPreset:v,saveToBank:u,clearLog:()=>d([])}}function ih({preset:e,banks:n,onCancel:a,onSave:r}){const[o,l]=S.useState(0),[s,i]=S.useState(e.name.slice(0,32));return t.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4",onClick:a,children:t.jsxs("div",{className:"bg-gray-800 border border-gray-600 rounded-2xl p-5 w-full max-w-md",onClick:d=>d.stopPropagation(),children:[t.jsx("h3",{className:"text-white font-bold text-lg",style:{fontFamily:"ui-serif, Georgia, serif"},children:"Save to amp memory"}),t.jsx("p",{className:"text-gray-400 text-xs mt-1",children:"This overwrites the chosen bank on the amp."}),t.jsx("label",{className:"block text-[11px] font-bold text-gray-300 mt-4 mb-1",children:"BANK"}),t.jsx("select",{value:o,onChange:d=>l(Number(d.target.value)),className:"w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white",children:Array.from({length:24},(d,m)=>t.jsx("option",{value:m,children:`Bank ${String(m+1).padStart(2,"0")} — ${n[m]||"(empty)"}`},m))}),t.jsx("label",{className:"block text-[11px] font-bold text-gray-300 mt-3 mb-1",children:"NAME (max 32 chars)"}),t.jsx("input",{value:s,maxLength:32,onChange:d=>i(d.target.value),className:"w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white"}),t.jsxs("div",{className:"flex justify-end gap-2 mt-5",children:[t.jsx("button",{onClick:a,className:"px-4 py-2 rounded-lg text-sm font-semibold bg-gray-700 text-gray-200 hover:bg-gray-600",children:"Cancel"}),t.jsx("button",{onClick:()=>r(o,s||"Preset"),className:"px-4 py-2 rounded-lg text-sm font-semibold bg-teal-600 text-white hover:bg-teal-500",children:"Save to Amp"})]})]})})}function dh(){const e=sh(),[n,a]=S.useState(()=>{try{return JSON.parse(localStorage.getItem(Zd)||"[]")}catch{return[]}}),[r,o]=S.useState(""),[l,s]=S.useState("all"),[i,d]=S.useState(null),[m,x]=S.useState(null),[p,c]=S.useState(null),h=S.useRef(null),[g,C]=S.useState(""),[v,u]=S.useState(!1),P=S.useRef(null),I=S.useRef(null),D=S.useMemo(()=>Nf(),[]),[B,y]=S.useState([]),[f,k]=S.useState([]),T=S.useCallback(w=>{C(w),setTimeout(()=>C(""),2600)},[]);S.useEffect(()=>{let w=!0;return jf().then(j=>{w&&y(j)}).catch(()=>{}),Of().then(j=>{w&&k(j)}).catch(()=>{}),()=>{w=!1}},[]),S.useEffect(()=>{try{localStorage.setItem(Zd,JSON.stringify(n))}catch{}},[n]),S.useEffect(()=>{I.current&&(I.current.scrollTop=I.current.scrollHeight)},[e.log]);const F=S.useMemo(()=>[...n.map(j=>({...j,source:"imported",sourceLabel:"Imported",bundled:!1})),...D,...B],[n,D,B]),_=S.useMemo(()=>{const w=l==="curated"?f:F.filter(V=>l==="all"||V.source===l),j=r.toLowerCase();return j?w.filter(V=>{var ne;return V.name.toLowerCase().includes(j)||(((ne=_a[V.amp.model])==null?void 0:ne.name)||"").toLowerCase().includes(j)||(V.tag||"").toLowerCase().includes(j)}):w},[F,f,r,l]),U=S.useMemo(()=>({all:F.length,"blues-jam-picks":F.filter(w=>w.source==="blues-jam-picks").length,"full-collection":F.filter(w=>w.source==="full-collection").length,curated:f.length,"fuse-community":B.length,imported:n.length}),[F,f,B,n]),A=S.useMemo(()=>{const w={};return f.forEach(j=>{j.tag&&(w[j.tag]=(w[j.tag]||0)+1)}),Object.entries(w).sort((j,V)=>V[1]-j[1]).slice(0,12)},[f]),R=S.useCallback(async w=>{let j=0,V=0;const ne=[];for(const Ue of w)try{ne.push(BP(await Ue.text(),Ue.name.replace(/\.(fuse|xml)$/i,""))),j++}catch{V++}ne.length&&a(Ue=>[...ne,...Ue]),T(`Imported ${j} preset${j!==1?"s":""}${V?`, ${V} failed`:""}`)},[T]),G=S.useCallback(async w=>{if(!e.connected){T("Connect the amp first");return}try{await e.applyPreset(w),T(`"${w.name}" is live — Save to a bank to keep it`)}catch{T("Send failed — see log")}},[e,T]),W=S.useCallback((w,j)=>{if(h.current&&clearTimeout(h.current),m===j){ds(),x(null);return}x(j),Zf(w).then(V=>{h.current=setTimeout(()=>x(null),V*1e3+500)}).catch(()=>x(null))},[m]);S.useEffect(()=>()=>{ds(),h.current&&clearTimeout(h.current)},[]);const z=S.useCallback(async(w,j)=>{const V=p;c(null);try{await e.saveToBank(V,w,j),T(`Saved to bank ${w+1}`)}catch{T("Save failed — see log")}},[p,e,T]),M=S.useCallback(w=>{const j=new Blob([lp(w)],{type:"text/xml"}),V=document.createElement("a");V.href=URL.createObjectURL(j),V.download=w.name.replace(/[^\w\- ]/g,"")+".fuse",V.click(),URL.revokeObjectURL(V.href)},[]),b=S.useCallback(w=>{a(j=>j.filter(V=>V!==w))},[]),N=[["all","All"],["curated","Curated"],["blues-jam-picks","Blues Jam"],["full-collection","Full Collection"],["fuse-community","Community"],["imported","Imported"]];return t.jsxs("div",{className:"space-y-6",children:[t.jsxs("div",{className:"rounded-2xl p-5 flex items-center gap-4 flex-wrap bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700",children:[t.jsx("span",{className:`w-4 h-4 rounded-full flex-none transition-all ${e.connected?"bg-orange-500 shadow-[0_0_14px_3px_rgba(249,115,22,0.7)]":"bg-red-900"}`}),t.jsxs("div",{className:"min-w-0",children:[t.jsx("h2",{className:"text-2xl font-bold text-white",style:{fontFamily:"ui-serif, Georgia, serif"},children:"Mustang Preset Loader"}),t.jsx("div",{className:"text-[11px] uppercase tracking-wider text-gray-400 mt-0.5",children:e.status})]}),t.jsx("div",{className:"flex-1"}),t.jsxs("button",{onClick:()=>e.connected?e.disconnect():e.connect(),disabled:!e.supported,className:"flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-orange-600 text-white hover:bg-orange-500 disabled:opacity-40 disabled:cursor-not-allowed",children:[t.jsx(Ix,{size:16}),e.connected?"Disconnect":"Connect Amp"]})]}),!e.supported&&t.jsxs("div",{className:"bg-orange-900/30 border-l-4 border-orange-500 rounded-r-lg px-4 py-3 text-sm text-orange-200",children:["⚠️ WebHID isn't available here. Open guitar-jam in ",t.jsx("b",{children:"Chrome"})," or ",t.jsx("b",{children:"Edge"})," on your Mac (Safari and Firefox don't support WebHID) to talk to the amp. You can still browse, import, and export presets."]}),t.jsxs("section",{children:[t.jsx("h3",{className:"text-lg font-bold text-white mb-1",style:{fontFamily:"ui-serif, Georgia, serif"},children:"Preset Library"}),t.jsxs("p",{className:"text-gray-400 text-xs mb-3",children:[t.jsx("span",{className:"text-teal-300",children:"▶ Preview"})," any tone in your browser (an approximation), send it to your Mustang, save to a memory bank, or export as ",t.jsx("code",{className:"text-teal-400",children:".fuse"}),"."]}),t.jsxs("div",{onClick:()=>{var w;return(w=P.current)==null?void 0:w.click()},onDragOver:w=>{w.preventDefault(),u(!0)},onDragLeave:()=>u(!1),onDrop:w=>{w.preventDefault(),u(!1),R(w.dataTransfer.files)},className:`border-2 border-dashed rounded-xl py-6 text-center cursor-pointer transition-colors ${v?"border-teal-500 bg-teal-900/20":"border-gray-600 text-gray-400 hover:border-gray-500"}`,children:[t.jsx(Sx,{size:20,className:"inline mr-2 -mt-1"}),"Drop ",t.jsx("b",{className:"text-teal-400",children:".fuse"})," files here — or click to browse",t.jsx("input",{ref:P,type:"file",accept:".fuse,.xml",multiple:!0,hidden:!0,onChange:w=>R(w.target.files)})]}),t.jsxs("div",{className:"flex flex-wrap items-center gap-2 mt-4",children:[t.jsxs("div",{className:"relative flex-1 min-w-[180px]",children:[t.jsx(Cx,{size:15,className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"}),t.jsx("input",{value:r,onChange:w=>o(w.target.value),placeholder:"Filter presets…",className:"w-full bg-gray-800 border border-gray-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white"})]}),N.map(([w,j])=>t.jsxs("button",{onClick:()=>s(w),className:`px-3 py-1.5 rounded-lg text-xs font-semibold ${l===w?"bg-teal-600 text-white":"bg-gray-800 text-gray-400 hover:text-gray-200"}`,children:[j," ",t.jsx("span",{className:"opacity-60",children:U[w]})]},w))]}),l==="curated"&&A.length>0&&t.jsxs("div",{className:"flex flex-wrap items-center gap-1.5 mt-2",children:[t.jsx("span",{className:"text-[11px] text-gray-500",children:"Browse:"}),A.map(([w,j])=>t.jsxs("button",{onClick:()=>o(r===w?"":w),className:`px-2 py-1 rounded-md text-[11px] ${r===w?"bg-teal-600 text-white":"bg-gray-800 text-gray-400 hover:text-gray-200"}`,children:[w," ",t.jsx("span",{className:"opacity-60",children:j})]},w))]}),t.jsxs("div",{className:"mt-3 space-y-2",children:[_.length===0&&t.jsx("div",{className:"text-gray-500 text-sm px-1 py-2",children:"No matches."}),_.slice(0,rl).map((w,j)=>{var Ge;const V=`${w.source}-${w.name}-${j}`,ne=i===V,Ue=()=>d(ne?null:V);return t.jsxs("div",{className:"bg-gray-800 border border-gray-700 rounded-xl",children:[t.jsxs("div",{className:"flex items-center gap-3 flex-wrap px-3 py-2.5",children:[t.jsx("button",{onClick:Ue,title:ne?"Hide details":"Show details","aria-expanded":ne,className:"text-gray-500 hover:text-gray-200 flex-none",children:ne?t.jsx(mt,{size:16}):t.jsx(Pt,{size:16})}),t.jsxs("div",{className:"flex-1 min-w-[160px] cursor-pointer",onClick:Ue,children:[t.jsxs("div",{className:"text-white font-bold text-sm flex items-center gap-2 flex-wrap",children:[w.name,w.tag&&t.jsx("span",{className:"text-[9px] bg-teal-900/50 text-teal-300 rounded px-1.5 py-0.5 font-bold tracking-wide",children:w.tag}),ah(w)&&t.jsx("span",{className:"text-[9px] bg-orange-900/40 text-orange-300 rounded px-1.5 py-0.5 font-bold tracking-wide",children:"V2 MODELS"})]}),t.jsxs("div",{className:"text-gray-400 text-[11px]",children:[(Ge=_a[w.amp.model])==null?void 0:Ge.name," · ",nh(w)," ",t.jsxs("span",{className:"text-gray-600",children:["· ",w.sourceLabel]})]})]}),t.jsx("button",{onClick:()=>W(w,V),title:`Preview — ${Vf(w)} (browser approximation)`,"aria-label":"Preview tone",className:`flex items-center gap-1 text-xs font-semibold rounded-md px-2.5 py-1.5 ${m===V?"bg-teal-600 text-white":"bg-gray-700 text-teal-300 hover:bg-gray-600"}`,children:m===V?t.jsx(yx,{size:13}):t.jsx(px,{size:13})}),t.jsxs("button",{onClick:()=>G(w),disabled:!e.connected,title:e.connected?"":"Connect the amp first",className:"flex items-center gap-1 text-xs font-semibold bg-orange-600 text-white rounded-md px-2.5 py-1.5 hover:bg-orange-500 disabled:opacity-40 disabled:cursor-not-allowed",children:[t.jsx(gx,{size:13}),"Send"]}),t.jsxs("button",{onClick:()=>e.connected?c(w):T("Connect the amp first"),disabled:!e.connected,className:"flex items-center gap-1 text-xs font-semibold bg-gray-700 text-gray-200 rounded-md px-2.5 py-1.5 hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed",children:[t.jsx(hx,{size:13}),"Bank…"]}),t.jsxs("button",{onClick:()=>M(w),className:"flex items-center gap-1 text-xs font-semibold bg-gray-700 text-gray-200 rounded-md px-2.5 py-1.5 hover:bg-gray-600",children:[t.jsx(xx,{size:13}),"Export"]}),w.source==="imported"&&t.jsx("button",{onClick:()=>b(w),className:"text-gray-500 hover:text-red-400 rounded-md px-1.5 py-1.5",children:t.jsx(ct,{size:14})})]}),ne&&t.jsx("div",{className:"px-3 pb-3",children:t.jsx(lh,{p:w})})]},V)}),_.length>rl&&t.jsxs("div",{className:"text-gray-500 text-xs px-1 py-2",children:["Showing ",rl," of ",_.length," — refine your search to narrow the list."]})]})]}),t.jsxs("section",{children:[t.jsx("h3",{className:"text-lg font-bold text-white mb-1",style:{fontFamily:"ui-serif, Georgia, serif"},children:"On the Amp"}),t.jsx("p",{className:"text-gray-400 text-xs mb-3",children:"The 24 memory banks stored in your Mustang (read on connect)."}),e.connected?t.jsx("div",{className:"grid gap-2",style:{gridTemplateColumns:"repeat(auto-fill, minmax(150px, 1fr))"},children:Array.from({length:24},(w,j)=>t.jsxs("div",{className:"bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs",children:[t.jsxs("span",{className:"block text-[10px] font-bold text-orange-400",children:["BANK ",String(j+1).padStart(2,"0")]}),e.banks[j]||t.jsx("span",{className:"text-gray-600",children:"—"})]},j))}):t.jsx("div",{className:"bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-gray-500 text-sm",children:"Connect the amp to read its presets."})]}),t.jsx("section",{children:t.jsxs("details",{children:[t.jsxs("summary",{className:"cursor-pointer font-bold text-sm text-gray-300 flex items-center gap-2",children:[t.jsx(fx,{size:14}),"USB Traffic Log"]}),t.jsx("div",{ref:I,className:"mt-2 bg-black/70 rounded-lg px-3 py-2.5 text-[11px] max-h-56 overflow-auto whitespace-pre-wrap break-all font-mono",children:e.log.length===0?t.jsx("span",{className:"text-gray-600",children:"No traffic yet."}):e.log.map((w,j)=>t.jsx("div",{className:w.cls==="tx"?"text-orange-300":w.cls==="rx"?"text-lime-400":w.cls==="err"?"text-red-400":w.cls==="ok"?"text-emerald-300":"text-gray-300",children:w.t},j))})]})}),p&&t.jsx(ih,{preset:p,banks:e.banks,onCancel:()=>c(null),onSave:z}),g&&t.jsx("div",{className:"fixed bottom-5 left-1/2 -translate-x-1/2 bg-gray-950 text-gray-100 border border-gray-700 px-4 py-2.5 rounded-xl text-sm shadow-lg z-50",children:g})]})}const mh=e=>Object.fromEntries(Ct.map(([n])=>{var a;return[n,((a=e==null?void 0:e.ratings)==null?void 0:a[n])??3]})),to=["Record a take","Criteria","Tempo test","Ratings","Notes"],uh=[["pass","Pass","bg-emerald-600 text-white"],["marginal","Marginal","bg-amber-600 text-white"],["fail","Fail","bg-rose-600 text-white"]],Ph={clean:"Every chord rings, no buzz or dead strings",rhythm:"You and the click agree for whole songs",memory:"Eyes closed, hands know where to go",confidence:"You would play this for a stranger right now",recovery:"A flub costs you a beat, not the song"};function ch({week:e,plan:n,existing:a,onSave:r,onCancel:o}){const[l,s]=S.useState(0),[i,d]=S.useState(()=>({week:e,date:nn(new Date),recordedTake:(a==null?void 0:a.recordedTake)||!1,criteria:{...(a==null?void 0:a.criteria)||{}},maxCleanBpm:(a==null?void 0:a.maxCleanBpm)||"",ratings:mh(a),notes:(a==null?void 0:a.notes)||""})),x=[!0,n.criteria.every(c=>i.criteria[c.id]),!!i.maxCleanBpm,!0,!0][l],p=()=>{const c={...i,maxCleanBpm:Number(i.maxCleanBpm)||0};c.score=A1(c,n),r(c)};return t.jsxs("div",{className:"bg-gray-800 border border-teal-700/60 rounded-2xl p-4 space-y-4",children:[t.jsxs("div",{className:"flex items-center justify-between",children:[t.jsxs("div",{children:[t.jsxs("div",{className:"text-teal-400 text-[10px] font-bold tracking-[2px]",children:["WEEK ",e," ASSESSMENT · STEP ",l+1," OF ",to.length]}),t.jsx("div",{className:"text-white font-bold text-lg",style:{fontFamily:"ui-serif, Georgia, serif"},children:to[l]})]}),t.jsx("button",{onClick:o,className:"text-gray-500 hover:text-gray-300 text-sm",children:"Cancel"})]}),t.jsx("div",{className:"flex gap-1",children:to.map((c,h)=>t.jsx("div",{className:`h-1 flex-1 rounded-full ${h<=l?"bg-teal-500":"bg-gray-700"}`},h))}),l===0&&t.jsxs("div",{className:"space-y-3",children:[t.jsx("p",{className:"text-gray-300 text-sm leading-relaxed",children:"Prop your phone up and record a video of this week's target piece — one take, no warm-up run. Watching yourself weekly is the highest-signal habit in this whole program. The recording stays on your phone; just tell the app you did it."}),t.jsx("button",{onClick:()=>d(c=>({...c,recordedTake:!c.recordedTake})),className:`w-full py-3 rounded-xl font-bold text-sm border transition-colors ${i.recordedTake?"bg-emerald-900/40 border-emerald-500 text-emerald-300":"bg-gray-900/50 border-gray-700 text-gray-300 hover:border-gray-500"}`,children:i.recordedTake?"✓ Take recorded and watched back":"Tap when your take is recorded (or skip — be honest)"})]}),l===1&&t.jsxs("div",{className:"space-y-3",children:[t.jsx("p",{className:"text-gray-400 text-xs",children:'Grade honestly — a false pass just moves the problem to a worse week. Marginal means "sometimes."'}),n.criteria.map(c=>t.jsxs("div",{className:"bg-gray-900/50 border border-gray-700 rounded-xl p-3",children:[t.jsx("div",{className:"text-gray-200 text-sm leading-snug mb-2",children:c.label}),t.jsx("div",{className:"flex gap-1.5",children:uh.map(([h,g,C])=>t.jsx("button",{onClick:()=>d(v=>({...v,criteria:{...v.criteria,[c.id]:h}})),className:`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${i.criteria[c.id]===h?C:"bg-gray-700 text-gray-400 hover:bg-gray-600"}`,children:g},h))})]},c.id))]}),l===2&&t.jsxs("div",{className:"space-y-3",children:[t.jsx("p",{className:"text-gray-300 text-sm leading-relaxed",children:b1}),t.jsx(Rr,{defaultBpm:Number(i.maxCleanBpm)||60}),t.jsxs("div",{className:"flex items-center gap-3",children:[t.jsx("label",{className:"text-gray-400 text-sm flex-shrink-0",children:"Last clean BPM"}),t.jsx("input",{type:"number",min:"30",max:"220",value:i.maxCleanBpm,onChange:c=>d(h=>({...h,maxCleanBpm:c.target.value})),className:"w-24 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-lg font-bold text-center"}),t.jsxs("span",{className:"text-gray-500 text-xs",children:["gig goal: ",ci]})]})]}),l===3&&t.jsx("div",{className:"space-y-3",children:Ct.map(([c,h])=>t.jsxs("div",{children:[t.jsxs("div",{className:"flex justify-between items-baseline",children:[t.jsx("span",{className:"text-gray-200 text-sm font-semibold",children:h}),t.jsx("span",{className:"text-teal-400 text-sm font-bold",children:i.ratings[c]})]}),t.jsxs("div",{className:"text-gray-500 text-[11px] mb-1",children:["5 = ",Ph[c]]}),t.jsx("input",{type:"range",min:"1",max:"5",step:"1",value:i.ratings[c],onChange:g=>d(C=>({...C,ratings:{...C.ratings,[c]:Number(g.target.value)}})),className:"w-full accent-teal-500"})]},c))}),l===4&&t.jsxs("div",{className:"space-y-2",children:[t.jsx("p",{className:"text-gray-400 text-xs",children:"What fought back this week? What clicked? One honest paragraph feeds next week's focus."}),t.jsx("textarea",{value:i.notes,onChange:c=>d(h=>({...h,notes:c.target.value})),placeholder:"The G→C change still drags. Song 1 chorus finally feels automatic…",className:"w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-gray-100 text-sm resize-y min-h-[90px]"})]}),t.jsxs("div",{className:"flex justify-between pt-1",children:[t.jsx("button",{onClick:()=>s(c=>c-1),disabled:l===0,className:"px-4 py-2 rounded-lg text-sm font-bold border border-gray-700 text-gray-300 disabled:text-gray-700 disabled:border-gray-800",children:"Back"}),l<to.length-1?t.jsx("button",{onClick:()=>s(c=>c+1),disabled:!x,className:"px-5 py-2 rounded-lg text-sm font-bold bg-teal-600 hover:bg-teal-500 text-white disabled:bg-gray-700 disabled:text-gray-500",children:"Next"}):t.jsxs("button",{onClick:p,className:"px-5 py-2 rounded-lg text-sm font-bold bg-rose-500 hover:bg-rose-400 text-white",children:["Save week ",e," assessment"]})]})]})}const xh=e=>e===null?"#4b5563":e<40?"#f43f5e":e<70?"#f59e0b":"#10b981";function ph({score:e,size:n=150}){const l=(m,x)=>{const p=75+62*Math.cos(m),c=78+62*Math.sin(m),h=75+62*Math.cos(x),g=78+62*Math.sin(x),C=x-m>Math.PI?1:0;return`M ${p.toFixed(1)} ${c.toFixed(1)} A 62 62 0 ${C} 1 ${h.toFixed(1)} ${g.toFixed(1)}`},s=155*Math.PI/180,i=230*Math.PI/180,d=e===null?0:e/100;return t.jsxs("svg",{width:n,height:n*.87,viewBox:"0 0 150 130",children:[t.jsx("path",{d:l(s,s+i),stroke:"#374151",strokeWidth:"10",fill:"none",strokeLinecap:"round"}),d>0&&t.jsx("path",{d:l(s,s+i*d),stroke:xh(e),strokeWidth:"10",fill:"none",strokeLinecap:"round"}),t.jsx("text",{x:"75",y:"78",textAnchor:"middle",fill:e===null?"#6b7280":"#f4f4f5",style:{font:"700 34px ui-serif, Georgia, serif"},children:e===null?"—":e}),t.jsx("text",{x:"75",y:"98",textAnchor:"middle",fill:"#a1a1aa",style:{font:"600 9px sans-serif",letterSpacing:"2px"},children:"GIG READINESS"})]})}function ol({points:e,min:n,max:a,target:r,color:o="#2dd4bf",label:l,unit:s=""}){const m={l:26,r:8,t:10,b:18},x=280-m.l-m.r,p=90-m.t-m.b,c=13,h=u=>m.l+u/c*x,g=u=>m.t+p-(u-n)/(a-n)*p,C=e.map((u,P)=>`${P===0?"M":"L"} ${h(u.week).toFixed(1)} ${g(u.value).toFixed(1)}`).join(" "),v=e.at(-1);return t.jsxs("div",{children:[l&&t.jsxs("div",{className:"flex items-baseline justify-between mb-1",children:[t.jsx("span",{className:"text-gray-500 text-[10px] font-bold tracking-[2px]",children:l}),v&&t.jsxs("span",{className:"text-sm font-bold",style:{color:o},children:[v.value,s]})]}),t.jsxs("svg",{width:"100%",viewBox:"0 0 280 90",style:{display:"block"},children:[[n,a].map(u=>t.jsxs("g",{children:[t.jsx("line",{x1:m.l,y1:g(u),x2:280-m.r,y2:g(u),stroke:"#374151",strokeWidth:"1"}),t.jsx("text",{x:m.l-4,y:g(u)+3,textAnchor:"end",fill:"#6b7280",style:{font:"9px sans-serif"},children:u})]},u)),r!=null&&t.jsxs("g",{children:[t.jsx("line",{x1:m.l,y1:g(r),x2:280-m.r,y2:g(r),stroke:"#f59e0b",strokeWidth:"1",strokeDasharray:"4 3"}),t.jsxs("text",{x:280-m.r,y:g(r)-3,textAnchor:"end",fill:"#f59e0b",style:{font:"9px sans-serif"},children:["goal ",r,s]})]}),[0,4,9,13].map(u=>t.jsxs("text",{x:h(u),y:86,textAnchor:"middle",fill:"#6b7280",style:{font:"9px sans-serif"},children:["w",u]},u)),e.length>1&&t.jsx("path",{d:C,stroke:o,strokeWidth:"2",fill:"none"}),e.map(u=>t.jsx("circle",{cx:h(u.week),cy:g(u.value),r:"3",fill:o},u.week))]})]})}const TP="stage90-sync",Ih=3e3;function xn(){try{const e=localStorage.getItem(TP);if(e)return JSON.parse(e)}catch{}return{url:"",token:"",enabled:!1,lastPush:null,lastPull:null}}function yt(e){try{localStorage.setItem(TP,JSON.stringify(e))}catch{}}function NP(){const e=new Uint8Array(24);return crypto.getRandomValues(e),Array.from(e,n=>n.toString(16).padStart(2,"0")).join("")}const jP=e=>`${e.url.replace(/\/+$/,"")}/sync/${e.token}`,St=e=>e.enabled&&/^https?:\/\//.test(e.url)&&e.token.length>=32;let em=null;async function fi(){const e=xn();if(!St(e))return{ok:!1,reason:"not configured"};const n=localStorage.getItem(Oa);if(!n)return{ok:!1,reason:"nothing to push"};try{const a=JSON.parse(n);a._updatedAt=Date.now();const r=await fetch(jP(e),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});return r.ok?(localStorage.setItem(Oa,JSON.stringify(a)),yt({...xn(),lastPush:Date.now()}),{ok:!0}):{ok:!1,reason:`server ${r.status}`}}catch{return{ok:!1,reason:"network"}}}function fh(){St(xn())&&(clearTimeout(em),em=setTimeout(fi,Ih))}async function hi({force:e=!1}={}){const n=xn();if(!St(n))return"off";try{const a=await fetch(jP(n),{cache:"no-store"});if(!a.ok)return"error";const r=await a.json();if(!r||!r.startDate)return"empty";const o=localStorage.getItem(Oa),l=o?JSON.parse(o):null;return!e&&(l!=null&&l._updatedAt)&&r._updatedAt&&r._updatedAt<=l._updatedAt?"local-newer":(localStorage.setItem(Oa,JSON.stringify(r)),yt({...xn(),lastPull:Date.now()}),"applied")}catch{return"error"}}async function OP(e=2500){return St(xn())?Promise.race([hi(),new Promise(n=>setTimeout(()=>n("timeout"),e))]):"off"}const hh=Object.freeze(Object.defineProperty({__proto__:null,generateToken:NP,getSyncConfig:xn,pullNow:hi,pullOnStartup:OP,pushNow:fi,schedulePush:fh,setSyncConfig:yt},Symbol.toStringTag,{value:"Module"})),nm=e=>{if(!e)return"never";const n=Math.round((Date.now()-e)/6e4);return n<1?"just now":n<60?`${n} min ago`:`${Math.round(n/60)} h ago`};function Ch(){const[e,n]=S.useState(xn),[a,r]=S.useState(""),[o,l]=S.useState(!1),s=x=>{n(x),yt(x)},i=async()=>{l(!0);const x=await fi();l(!1),r(x.ok?"✓ Pushed to cloud":`Push failed: ${x.reason}`),n(xn())},d=async()=>{if(!confirm("Pull from cloud? If the cloud copy is newer it replaces this device's progress."))return;l(!0);const x=await hi({force:!0});if(l(!1),x==="applied"){window.location.reload();return}r(x==="empty"?"Cloud is empty — push from your main device first.":`Pull: ${x}`)},m=/^https?:\/\//.test(e.url)&&e.token.length>=32;return t.jsxs("div",{className:"bg-gray-800 rounded-2xl p-4 space-y-2.5",children:[t.jsxs("div",{className:"flex items-center justify-between",children:[t.jsx("div",{className:"text-gray-500 text-[10px] font-bold tracking-[2px]",children:"CLOUD SYNC"}),t.jsx("button",{onClick:()=>s({...e,enabled:!e.enabled}),disabled:!m,className:`px-2.5 py-1 rounded text-[11px] font-bold ${e.enabled&&m?"bg-emerald-900/50 text-emerald-300 border border-emerald-600":"bg-gray-700 text-gray-400"} disabled:opacity-50`,children:e.enabled&&m?"ON":"OFF"})]}),t.jsx("input",{value:e.url,onChange:x=>s({...e,url:x.target.value.trim()}),placeholder:"Worker URL (https://guitar-sync.….workers.dev)",className:"w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-xs"}),t.jsxs("div",{className:"flex gap-1.5",children:[t.jsx("input",{value:e.token,onChange:x=>s({...e,token:x.target.value.trim()}),placeholder:"Sync token (same on every device)",className:"flex-1 min-w-0 bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 text-xs font-mono"}),t.jsx("button",{onClick:()=>{const x=NP();s({...e,token:x}),r("Token generated — copy it to your other devices.")},className:"px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-gray-700 text-gray-300 hover:bg-gray-600 flex-shrink-0",children:"Generate"})]}),e.enabled&&m&&t.jsxs("div",{className:"flex items-center gap-2",children:[t.jsx("button",{onClick:i,disabled:o,className:"flex-1 py-1.5 rounded-lg text-xs font-bold bg-teal-700 hover:bg-teal-600 text-white disabled:opacity-50",children:"↑ Push now"}),t.jsx("button",{onClick:d,disabled:o,className:"flex-1 py-1.5 rounded-lg text-xs font-bold bg-gray-700 hover:bg-gray-600 text-gray-200 disabled:opacity-50",children:"↓ Pull from cloud"})]}),t.jsx("div",{className:"text-gray-600 text-[10px] leading-snug",children:e.enabled&&m?t.jsxs(t.Fragment,{children:["Auto: pushes after every change, pulls at app launch. Last push ",nm(e.lastPush)," · last pull ",nm(e.lastPull),". Last write wins — practice on one device at a time."]}):t.jsxs(t.Fragment,{children:["Sync across phone / iPad / Mac. Setup takes ~10 min: see ",t.jsx("span",{className:"font-mono",children:"sync-worker/README.md"})," in the repo."]})}),a&&t.jsx("div",{className:"text-teal-400 text-[11px]",children:a})]})}const us=e=>new Date(e+"T00:00:00").toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"});function gh({onStart:e}){const[n,a]=S.useState(()=>Hd(nn(new Date),7*(pi+1)));return t.jsxs("div",{className:"max-w-lg mx-auto bg-gray-800 border border-gray-700 rounded-2xl p-6 space-y-4 text-center",children:[t.jsx("div",{className:"text-4xl",children:"🎤"}),t.jsx("h3",{className:"text-white text-xl font-bold",style:{fontFamily:"ui-serif, Georgia, serif"},children:"Set your gig date"}),t.jsx("p",{className:"text-gray-400 text-sm leading-relaxed",children:"The program is a week-0 placement plus 13 training weeks, each ending in an assessment. Pick the coffee-shop night — everything counts down from here. You can change it later."}),t.jsx("input",{type:"date",value:n,min:Hd(nn(new Date),14),onChange:r=>a(r.target.value),className:"bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-base mx-auto block"}),t.jsx("button",{onClick:()=>e(n),className:"w-full py-3 rounded-xl font-extrabold text-[15px] bg-rose-500 hover:bg-rose-400 text-rose-50",children:"Start the program — week 0 begins today"})]})}function yh({record:e,plan:n,onRedo:a}){const r=n.criteria.reduce((o,l)=>{var i;const s=(i=e.criteria)==null?void 0:i[l.id];return s&&(o[s]+=1),o},{pass:0,marginal:0,fail:0});return t.jsxs("div",{className:"flex items-center gap-3 bg-gray-900/50 border border-gray-700 rounded-xl px-3 py-2.5",children:[t.jsxs("div",{className:"w-10 text-center flex-shrink-0",children:[t.jsxs("div",{className:"text-white font-bold text-sm",children:["w",e.week]}),t.jsx("div",{className:"text-gray-600 text-[9px]",children:us(e.date).split(",")[0]})]}),t.jsxs("div",{className:"flex-1 min-w-0",children:[t.jsx("div",{className:"text-gray-300 text-xs font-semibold truncate",children:n.title}),t.jsxs("div",{className:"flex gap-2 text-[11px] mt-0.5",children:[t.jsxs("span",{className:"text-emerald-400",children:[r.pass," pass"]}),r.marginal>0&&t.jsxs("span",{className:"text-amber-400",children:[r.marginal," marginal"]}),r.fail>0&&t.jsxs("span",{className:"text-rose-400",children:[r.fail," fail"]}),e.maxCleanBpm>0&&t.jsxs("span",{className:"text-gray-500",children:["· ",e.maxCleanBpm," BPM"]})]})]}),t.jsxs("div",{className:"text-right flex-shrink-0",children:[t.jsx("div",{className:"text-teal-400 font-bold text-lg",style:{fontFamily:"ui-serif, Georgia, serif"},children:e.score}),t.jsx("button",{onClick:a,className:"text-gray-600 hover:text-gray-400 text-[10px] underline",children:"redo"})]})]})}function Sh(){const[e,n]=S.useState(Tr),[a,r]=S.useState(null),[o,l]=S.useState(!1);S.useEffect(()=>{gt(e)},[e]);const s=!!e.startDate,i=s?T1(e.startDate):0,d=nr(i),m=vP(i),x=s?DP(e.gigDate):null,p=S.useMemo(()=>R1(e.assessments),[e.assessments]),c=S.useMemo(()=>Object.values(e.assessments).filter(f=>f&&typeof f.score=="number").sort((f,k)=>f.week-k.week),[e.assessments]),h=c.at(-1)||null,g=h?nr(h.week):null,C=h?bP(h,g):[],v=f=>n({...Xd(),startDate:nn(new Date),gigDate:f}),u=f=>{n(k=>({...k,assessments:{...k.assessments,[f.week]:f}})),r(null),window.scrollTo(0,0)},P=()=>{const f=new Blob([JSON.stringify(e)],{type:"application/json"}),k=document.createElement("a");k.href=URL.createObjectURL(f),k.download="stage90-progress.json",k.click()},I=()=>{const f=prompt("Paste your exported Stage Ready progress JSON:");if(f)try{const k=JSON.parse(f);if(!k.startDate)throw new Error("missing startDate");n({...Xd(),...k}),alert("Progress restored.")}catch{alert("Couldn't parse that — make sure it's the exported JSON.")}},D=c.filter(f=>f.maxCleanBpm>0).map(f=>({week:f.week,value:f.maxCleanBpm})),B=c.map(f=>({week:f.week,value:f.score})),y=c.filter(f=>{var k;return(k=f.ratings)==null?void 0:k.confidence}).map(f=>({week:f.week,value:f.ratings.confidence}));return t.jsxs("div",{className:"space-y-6",children:[t.jsxs("div",{className:"text-center",children:[t.jsx("div",{className:"text-teal-400 text-[11px] font-bold tracking-[3px]",children:"STAGE READY 90"}),t.jsxs("h2",{className:"text-3xl sm:text-4xl font-bold text-white mt-1",style:{fontFamily:"ui-serif, Georgia, serif"},children:["Weekly ",t.jsx("span",{className:"text-amber-400 italic font-semibold",children:"Assessment"})]}),t.jsxs("p",{className:"text-gray-400 text-sm mt-2",children:["The goal: ",t.jsx("b",{className:"text-gray-200",children:"a coffee-shop set on gig night"})," — three songs, standing, from memory, recovering without stopping."]})]}),s?t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 bg-gray-800 rounded-2xl p-5",children:[t.jsxs("div",{className:"text-center",children:[t.jsx("div",{className:`font-bold text-5xl leading-none ${x<=14?"text-rose-400":"text-amber-400"}`,style:{fontFamily:"ui-serif, Georgia, serif"},children:Math.max(x,0)}),t.jsx("div",{className:"text-gray-400 text-xs font-semibold mt-1",children:"days to the gig"}),o?t.jsx("input",{type:"date",defaultValue:e.gigDate,onBlur:f=>{f.target.value&&n(k=>({...k,gigDate:f.target.value})),l(!1)},className:"mt-1 bg-gray-900 border border-gray-700 rounded px-2 py-1 text-gray-300 text-xs",autoFocus:!0}):t.jsx("button",{onClick:()=>l(!0),className:"text-gray-600 hover:text-gray-400 text-[11px] underline mt-1",children:us(e.gigDate)})]}),t.jsx(ph,{score:p}),t.jsxs("div",{className:"w-full sm:w-auto sm:min-w-[220px] space-y-2",children:[t.jsx("div",{className:"flex gap-1.5",children:Ho.map(f=>t.jsxs("div",{className:`flex-1 py-1.5 px-1 rounded-lg text-center border ${f===m?"bg-gray-900/60 border-amber-500":"border-gray-700"}`,children:[t.jsx("div",{className:`text-[10px] font-bold ${f===m?"text-amber-400":"text-gray-500"}`,children:f.name}),t.jsxs("div",{className:"text-[9px] text-gray-600",children:["w",f.weeks[0],f.weeks[1]!==f.weeks[0]?`–${f.weeks[1]}`:""]})]},f.name))}),t.jsxs("div",{className:"text-center text-gray-400 text-xs",children:["Week ",t.jsx("b",{className:"text-white",children:i})," of ",pi," · ",c.length," assessment",c.length===1?"":"s"," done"]})]})]}),a!==null&&t.jsx(ch,{week:a,plan:nr(a),existing:e.assessments[a],onSave:u,onCancel:()=>r(null)}),a===null&&t.jsxs("div",{className:"grid gap-5 lg:grid-cols-3 items-start",children:[t.jsxs("div",{className:"lg:col-span-2 space-y-4 min-w-0",children:[t.jsxs("div",{className:"bg-gray-800 rounded-2xl p-4",children:[t.jsxs("div",{className:"text-rose-400 text-[10px] font-bold tracking-[2px] mb-1",children:["THIS WEEK · WEEK ",i," — ",d.title.toUpperCase()]}),t.jsx("p",{className:"text-gray-300 text-sm leading-relaxed mb-3",children:d.focus}),t.jsx("div",{className:"text-gray-500 text-[10px] font-bold tracking-[2px] mb-1.5",children:"THE BAR TO CLEAR"}),t.jsx("ul",{className:"space-y-1.5 mb-4",children:d.criteria.map(f=>t.jsxs("li",{className:"flex gap-2 items-start text-sm text-gray-300 leading-snug",children:[t.jsx("span",{className:"text-amber-400 mt-0.5",children:"◦"})," ",f.label]},f.id))}),t.jsx("button",{onClick:()=>r(i),className:"w-full py-3 rounded-xl font-extrabold text-[15px] bg-teal-600 hover:bg-teal-500 text-white",children:e.assessments[i]?"↻ Redo this week's assessment":`Take the week ${i} assessment`}),e.assessments[i]&&t.jsxs("p",{className:"text-center text-gray-500 text-xs mt-2",children:["Done ",us(e.assessments[i].date)," — score ",e.assessments[i].score]})]}),C.length>0&&t.jsxs("div",{className:"bg-amber-950/30 border border-amber-600/50 rounded-2xl p-4",children:[t.jsxs("div",{className:"text-amber-400 text-[10px] font-bold tracking-[2px] mb-2",children:["INJECTED FOCUS — FROM WEEK ",h.week,"'S ",C.length," MISSED CRITERI",C.length===1?"ON":"A"]}),t.jsx("div",{className:"space-y-2.5",children:C.map(f=>t.jsxs("div",{className:"text-sm leading-snug",children:[t.jsxs("div",{className:`font-semibold ${f.result==="fail"?"text-rose-300":"text-amber-300"}`,children:[f.result==="fail"?"✗":"~"," ",f.label]}),t.jsxs("div",{className:"text-gray-300 mt-0.5 pl-4",children:["→ ",f.fix]})]},f.id))}),t.jsx("p",{className:"text-gray-500 text-[11px] mt-3",children:"Work these into every practice day until next Assessment Day."})]}),c.length>0&&t.jsxs("div",{children:[t.jsx("div",{className:"text-gray-500 text-[10px] font-bold tracking-[2px] mb-2 ml-0.5",children:"ASSESSMENT HISTORY"}),t.jsx("div",{className:"space-y-2",children:[...c].reverse().map(f=>t.jsx(yh,{record:f,plan:nr(f.week),onRedo:()=>r(f.week)},f.week))})]}),ss.filter(f=>f.week<i&&!e.assessments[f.week]).length>0&&t.jsxs("div",{className:"bg-gray-800/60 border border-gray-700 rounded-2xl p-4",children:[t.jsx("div",{className:"text-gray-500 text-[10px] font-bold tracking-[2px] mb-2",children:"MISSED WEEKS"}),t.jsx("div",{className:"flex flex-wrap gap-2",children:ss.filter(f=>f.week<i&&!e.assessments[f.week]).map(f=>t.jsxs("button",{onClick:()=>r(f.week),className:"px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-700 text-gray-300 hover:bg-gray-600",children:["Week ",f.week," · ",f.title]},f.week))}),t.jsx("p",{className:"text-gray-500 text-[11px] mt-2",children:"Life happens. Assess against the missed week's bar so the trend stays honest."})]})]}),t.jsxs("div",{className:"space-y-4 min-w-0",children:[t.jsxs("div",{className:"bg-gray-800 rounded-2xl p-4 space-y-4",children:[t.jsx(ol,{points:B,min:0,max:100,color:"#2dd4bf",label:"WEEKLY SCORE"}),t.jsx(ol,{points:D,min:40,max:140,target:ci,color:"#f59e0b",label:"TEMPO TEST",unit:" BPM"}),t.jsx(ol,{points:y,min:1,max:5,color:"#f43f5e",label:"CONFIDENCE (SELF-RATED)"}),c.length<2&&t.jsx("p",{className:"text-gray-600 text-[11px]",children:"Trends appear once two assessments are in."})]}),h&&t.jsxs("div",{className:"bg-gray-800 rounded-2xl p-4",children:[t.jsxs("div",{className:"text-gray-500 text-[10px] font-bold tracking-[2px] mb-2",children:["LATEST SELF-RATINGS · WEEK ",h.week]}),t.jsx("div",{className:"space-y-1.5",children:Ct.map(([f,k])=>{var T,F;return t.jsxs("div",{className:"flex items-center gap-2",children:[t.jsx("span",{className:"text-gray-400 text-xs w-24 flex-shrink-0",children:k}),t.jsx("div",{className:"flex-1 bg-gray-700 rounded-full h-2",children:t.jsx("div",{className:"bg-teal-500 rounded-full h-2",style:{width:`${(((T=h.ratings)==null?void 0:T[f])||0)/5*100}%`}})}),t.jsx("span",{className:"text-teal-400 text-xs font-bold w-4 text-right",children:((F=h.ratings)==null?void 0:F[f])||"–"})]},f)})})]}),t.jsx(Ch,{}),t.jsxs("div",{className:"text-center pt-1",children:[t.jsx("button",{onClick:P,className:"border border-gray-700 rounded-lg px-3 py-1.5 text-[11px] text-gray-400 mx-1",children:"Export progress"}),t.jsx("button",{onClick:I,className:"border border-gray-700 rounded-lg px-3 py-1.5 text-[11px] text-gray-400 mx-1",children:"Import progress"})]})]})]})]}):t.jsx(gh,{onStart:v})]})}let tl=null;function vh(){var e;return(e=window.YT)!=null&&e.Player?Promise.resolve(window.YT):(tl||(tl=new Promise(n=>{const a=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=()=>{a==null||a(),n(window.YT)};const r=document.createElement("script");r.src="https://www.youtube.com/iframe_api",document.head.appendChild(r)})),tl)}const am=e=>e==null?"–:––":`${Math.floor(e/60)}:${String(Math.floor(e%60)).padStart(2,"0")}`,Mh=[.5,.75,1];function Dh({videoId:e}){const n=S.useRef(null),a=S.useRef(null),[r,o]=S.useState(!1),[l,s]=S.useState(!1),[i,d]=S.useState(null),[m,x]=S.useState(null),[p,c]=S.useState(1),h=S.useRef({a:null,b:null});h.current={a:i,b:m},S.useEffect(()=>{let v=!1,u;o(!1),s(!1),d(null),x(null),c(1);const P=setTimeout(()=>{a.current||s(!0)},8e3);vh().then(D=>{if(v||!n.current)return;n.current.innerHTML="";const B=document.createElement("div");n.current.appendChild(B),u=new D.Player(B,{videoId:e,width:"100%",height:"100%",playerVars:{rel:0,playsinline:1},events:{onReady:()=>{v||(a.current=u,o(!0),clearTimeout(P))},onError:()=>{v||s(!0)}}})});const I=setInterval(()=>{const D=a.current,{a:B,b:y}=h.current;if(!(!D||B==null||y==null||y<=B))try{D.getCurrentTime()>=y&&D.seekTo(B,!0)}catch{}},300);return()=>{v=!0,clearTimeout(P),clearInterval(I);try{u==null||u.destroy()}catch{}a.current=null}},[e]);const g=S.useCallback(v=>{const u=a.current;if(!u)return;const P=u.getCurrentTime();v==="a"?d(P):x(P)},[]),C=v=>{var u;c(v);try{(u=a.current)==null||u.setPlaybackRate(v)}catch{}};return t.jsxs("div",{className:"space-y-3",children:[t.jsxs("div",{className:"relative w-full rounded-xl overflow-hidden bg-black",style:{paddingBottom:"56.25%"},children:[t.jsx("div",{ref:n,className:"absolute inset-0 [&>iframe]:w-full [&>iframe]:h-full"}),l&&t.jsx("div",{className:"absolute inset-0 grid place-items-center text-center p-4",children:t.jsxs("div",{className:"text-gray-400 text-sm",children:["Couldn't load the video — check the link or your connection.",t.jsx("br",{}),t.jsx("span",{className:"text-gray-600 text-xs",children:"The built-in backing vamp below always works offline."})]})})]}),t.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[t.jsx("span",{className:"text-gray-500 text-[10px] font-bold tracking-[2px]",children:"LOOP"}),t.jsxs("button",{onClick:()=>g("a"),disabled:!r,className:`px-3 py-1.5 rounded-lg text-xs font-bold ${i!=null?"bg-teal-600 text-white":"bg-gray-700 text-gray-300 hover:bg-gray-600"} disabled:opacity-40`,children:["A ",am(i)]}),t.jsxs("button",{onClick:()=>g("b"),disabled:!r,className:`px-3 py-1.5 rounded-lg text-xs font-bold ${m!=null?"bg-teal-600 text-white":"bg-gray-700 text-gray-300 hover:bg-gray-600"} disabled:opacity-40`,children:["B ",am(m)]}),(i!=null||m!=null)&&t.jsx("button",{onClick:()=>{d(null),x(null)},className:"px-2.5 py-1.5 rounded-lg text-xs text-gray-400 border border-gray-700",children:"clear"}),t.jsx("span",{className:"text-gray-500 text-[10px] font-bold tracking-[2px] ml-2",children:"SPEED"}),Mh.map(v=>t.jsxs("button",{onClick:()=>C(v),disabled:!r,className:`px-2.5 py-1.5 rounded-lg text-xs font-bold ${p===v?"bg-amber-500 text-stone-900":"bg-gray-700 text-gray-300 hover:bg-gray-600"} disabled:opacity-40`,children:[v,"×"]},v))]}),i!=null&&m!=null&&m<=i&&t.jsx("p",{className:"text-amber-400 text-[11px]",children:"B needs to be after A — the loop is off until it is."})]})}function bh(e){const n=e.trim(),a=n.match(/(?:youtube\.com\/(?:watch\?.*v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/)||n.match(/^([\w-]{11})$/);return a?a[1]:null}const wh=Object.keys(li);function Bh({onAdd:e,onCancel:n}){const[a,r]=S.useState({url:"",title:"",keyIdx:7,scaleType:"Pentatonic Minor",chords:""}),o=bh(a.url),l=s=>i=>r(d=>({...d,[s]:i.target.value}));return t.jsxs("div",{className:"bg-gray-800 border border-gray-700 rounded-2xl p-4 space-y-3",children:[t.jsx("div",{className:"text-teal-400 text-[10px] font-bold tracking-[2px]",children:"ADD A JAM VIDEO"}),t.jsxs("div",{className:"grid sm:grid-cols-2 gap-2",children:[t.jsx("input",{value:a.url,onChange:l("url"),placeholder:"YouTube link (lesson, backing track…)",className:"bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm sm:col-span-2",autoFocus:!0}),t.jsx("input",{value:a.title,onChange:l("title"),placeholder:"Title (e.g. Seriff — A minor jam)",className:"bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm sm:col-span-2"}),t.jsx("select",{value:a.keyIdx,onChange:s=>r(i=>({...i,keyIdx:Number(s.target.value)})),className:"bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm",children:en.map((s,i)=>t.jsxs("option",{value:i,children:["Key of ",s]},s))}),t.jsx("select",{value:a.scaleType,onChange:l("scaleType"),className:"bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm",children:wh.map(s=>t.jsx("option",{value:s,children:s},s))}),t.jsx("input",{value:a.chords,onChange:l("chords"),placeholder:"Chords (Am G F E…)",className:"bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm sm:col-span-2"})]}),a.url&&!o&&t.jsx("p",{className:"text-amber-400 text-[11px]",children:"That doesn't look like a YouTube link or video ID yet."}),t.jsxs("div",{className:"flex gap-2",children:[t.jsx("button",{onClick:()=>o&&e({id:Date.now(),videoId:o,title:a.title.trim()||"Untitled jam",keyIdx:a.keyIdx,scaleType:a.scaleType,chords:a.chords.trim(),sessions:0,last:null}),disabled:!o,className:"px-4 py-1.5 rounded-lg text-sm font-bold bg-teal-600 hover:bg-teal-500 text-white disabled:bg-gray-700 disabled:text-gray-500",children:"Add to library"}),t.jsx("button",{onClick:n,className:"px-4 py-1.5 rounded-lg text-sm text-gray-400 border border-gray-700",children:"Cancel"})]})]})}function kh(){const[e,n]=S.useState(Tr),[a,r]=S.useState(null),[o,l]=S.useState(!1);S.useEffect(()=>{gt(e)},[e]);const s=e.jams||[],i=s.find(p=>p.id===a),d=p=>{n(c=>({...c,jams:[...c.jams||[],p]})),l(!1),r(p.id)},m=p=>{n(c=>({...c,jams:c.jams.filter(h=>h.id!==p)})),a===p&&r(null)},x=p=>n(c=>{var g;const h=nn(new Date);return{...c,jams:c.jams.map(C=>C.id===p?{...C,sessions:(C.sessions||0)+1,last:h}:C),program:{...c.program,activity:{...c.program.activity,[h]:(((g=c.program.activity)==null?void 0:g[h])||0)+1}}}});return i?t.jsxs("div",{className:"space-y-5",children:[t.jsxs("div",{className:"flex items-start gap-3",children:[t.jsx("button",{onClick:()=>r(null),className:"text-gray-400 hover:text-white transition-colors p-1 -ml-1 mt-1",children:t.jsx(ut,{size:22})}),t.jsxs("div",{children:[t.jsx("h2",{className:"text-2xl sm:text-3xl font-bold text-white",style:{fontFamily:"ui-serif, Georgia, serif"},children:i.title}),t.jsxs("div",{className:"text-teal-400 text-sm font-semibold mt-1",children:[en[i.keyIdx]," ",i.scaleType,i.sessions>0&&t.jsxs("span",{className:"text-gray-500 font-normal",children:[" · ",i.sessions," session",i.sessions===1?"":"s"]})]})]})]}),t.jsxs("div",{className:"grid gap-5 lg:grid-cols-3 items-start",children:[t.jsxs("div",{className:"lg:col-span-2 space-y-4 min-w-0",children:[t.jsx("div",{className:"bg-gray-800 rounded-2xl p-4",children:t.jsx(Dh,{videoId:i.videoId})}),t.jsxs("div",{className:"bg-gray-800 rounded-2xl p-4",children:[t.jsxs("div",{className:"text-amber-400 text-[10px] font-bold tracking-[2px] mb-2",children:["WHAT TO PLAY — ",en[i.keyIdx].toUpperCase()," ",i.scaleType.toUpperCase()]}),i.chords&&t.jsx("div",{className:"flex flex-wrap gap-1.5 mb-3",children:i.chords.split(/[\s,|]+/).filter(Boolean).map((p,c)=>t.jsx("span",{className:"text-sm px-2.5 py-1 rounded font-bold font-mono bg-gray-700/70 text-gray-200",children:p},c))}),t.jsx(ui,{initialRoot:i.keyIdx,initialType:i.scaleType,guidedDefault:!0})]}),t.jsxs("button",{onClick:()=>x(i.id),className:"w-full py-3.5 rounded-xl font-extrabold text-[15px] bg-teal-600 hover:bg-teal-500 text-white",children:["✓ Log a jam session (",i.sessions||0," so far",i.last?` · last ${i.last}`:"",")"]}),t.jsx("p",{className:"text-gray-600 text-[11px] text-center -mt-2",children:"Two logged sessions a week is the assessment bar from week 5 on."})]}),t.jsxs("div",{className:"space-y-4 min-w-0",children:[t.jsx(Rr,{defaultBpm:80}),t.jsx(Pi,{}),t.jsxs("div",{className:"bg-gray-800 rounded-2xl p-4",children:[t.jsx("div",{className:"text-gray-500 text-[10px] font-bold tracking-[2px] mb-1.5",children:"HOW TO JAM"}),t.jsxs("ul",{className:"space-y-2 text-gray-400 text-sm leading-snug",children:[t.jsxs("li",{className:"flex gap-2",children:[t.jsx("span",{className:"text-teal-500",children:"›"}),"Comp the chords first — locking with the track beats any solo."]}),t.jsxs("li",{className:"flex gap-2",children:[t.jsx("span",{className:"text-teal-500",children:"›"}),"Loop a hard 8-bar section with A/B and slow it to 0.75×."]}),t.jsxs("li",{className:"flex gap-2",children:[t.jsx("span",{className:"text-teal-500",children:"›"}),"Flub? Keep strumming. Recovery is the skill being trained."]}),t.jsxs("li",{className:"flex gap-2",children:[t.jsx("span",{className:"text-teal-500",children:"›"}),"Melody: stay inside the lit scale boxes — three notes played with intent beat thirty."]})]})]})]})]})]}):t.jsxs("div",{className:"space-y-5",children:[t.jsxs("div",{className:"text-center",children:[t.jsx("div",{className:"text-teal-400 text-[11px] font-bold tracking-[3px]",children:"FOLLOW ALONG"}),t.jsx("h2",{className:"text-3xl sm:text-4xl font-bold text-white mt-1",style:{fontFamily:"ui-serif, Georgia, serif"},children:"Jam Along"}),t.jsx("p",{className:"text-gray-400 text-sm mt-2 max-w-2xl mx-auto",children:"Save the videos you jam with — lessons, backing tracks, play-alongs. Tag each with its key and scale once, and the fretboard shows what to play while the video runs. Loop the hard parts, slow them down."})]}),o?t.jsx(Bh,{onAdd:d,onCancel:()=>l(!1)}):t.jsx("div",{className:"text-center",children:t.jsxs("button",{onClick:()=>l(!0),className:"inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold bg-teal-600 hover:bg-teal-500 text-white",children:[t.jsx(IP,{size:15})," Add a jam video"]})}),s.length===0&&!o&&t.jsxs("p",{className:"text-gray-600 text-sm text-center",children:["Library's empty. Paste any YouTube backing track or lesson —",t.jsx("br",{}),"jam sessions start counting toward the weekly assessment in week 5."]}),t.jsx("div",{className:"grid gap-4 sm:grid-cols-2 lg:grid-cols-3",children:s.map(p=>t.jsxs("div",{className:"relative bg-gray-800 border border-gray-700 hover:border-teal-600 rounded-2xl overflow-hidden transition-colors",children:[t.jsxs("button",{onClick:()=>r(p.id),className:"text-left w-full",children:[t.jsx("img",{src:`https://i.ytimg.com/vi/${p.videoId}/mqdefault.jpg`,alt:"",className:"w-full aspect-video object-cover",loading:"lazy"}),t.jsxs("div",{className:"p-3",children:[t.jsx("div",{className:"text-white font-bold text-sm leading-tight",children:p.title}),t.jsxs("div",{className:"text-teal-400 text-xs font-semibold mt-1",children:[en[p.keyIdx]," ",p.scaleType]}),t.jsx("div",{className:"text-gray-500 text-[11px] mt-0.5",children:p.sessions?`${p.sessions} session${p.sessions===1?"":"s"}${p.last?` · last ${p.last}`:""}`:"not jammed yet"})]})]}),t.jsx("button",{onClick:()=>m(p.id),className:"absolute top-2 right-2 bg-gray-900/80 rounded-full p-1 text-gray-400 hover:text-rose-400",children:t.jsx(ct,{size:14})})]},p.id))})]})}const rm=[{id:"program",label:"Program"},{id:"assessment",label:"Assessment"},{id:"jam",label:"Jam Along"},{id:"songbook",label:"Songbook"},{id:"amp",label:"Amp"}];function Fh(){const[e,n]=S.useState(()=>Math.round(ii()*100)),a=r=>{n(r),Wx(r/100)};return t.jsxs("div",{className:"flex items-center gap-2",children:[t.jsx("button",{onClick:()=>a(e===0?80:0),className:"text-gray-400 hover:text-gray-200","aria-label":e===0?"Unmute":"Mute",children:e===0?t.jsx(Mx,{size:18}):t.jsx(vx,{size:18})}),t.jsx("input",{type:"range",min:0,max:100,value:e,onChange:r=>a(Number(r.target.value)),className:"w-20 sm:w-24 accent-teal-500","aria-label":"Volume"})]})}function Eh(){const[e,n]=S.useState(()=>{const r=new URLSearchParams(window.location.search).get("view");return rm.some(o=>o.id===r)?r:localStorage.getItem("guitar-jam-view")||"program"}),a=r=>{n(r),localStorage.setItem("guitar-jam-view",r)};return S.useEffect(()=>{Lx()},[]),t.jsxs("div",{className:"min-h-screen bg-gray-900",children:[t.jsx("header",{className:"sticky top-0 bg-gray-800/95 backdrop-blur border-b border-gray-700 z-30",children:t.jsxs("div",{className:"max-w-[1600px] mx-auto px-5 py-3 flex items-center justify-between gap-4",children:[t.jsxs("div",{className:"flex items-center gap-4 min-w-0",children:[t.jsx("h1",{className:"text-lg font-bold text-teal-400 flex-shrink-0",children:"🎸 Guitar Practice"}),t.jsx("nav",{className:"flex gap-1 bg-gray-900/60 p-1 rounded-lg",children:rm.map(r=>t.jsx("button",{onClick:()=>a(r.id),className:`px-3 py-1 rounded-md text-sm font-semibold transition-colors ${e===r.id?"bg-teal-600 text-white":"text-gray-400 hover:text-gray-200"}`,children:r.label},r.id))})]}),t.jsx(Fh,{})]})}),t.jsxs("main",{className:"max-w-[1600px] mx-auto px-5 py-6",children:[e==="program"&&t.jsx(z1,{}),e==="assessment"&&t.jsx(Sh,{}),e==="jam"&&t.jsx(kh,{}),e==="songbook"&&t.jsx(J1,{}),e==="amp"&&t.jsx(dh,{})]})]})}OP().finally(()=>{ll.createRoot(document.getElementById("root")).render(t.jsx(qP.StrictMode,{children:t.jsx(Eh,{})}))});
