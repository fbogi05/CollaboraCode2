import{f as r,g as i}from"./chunk-TUPZHSRC.js";import{m as a,n as m}from"./chunk-55SJLU3W.js";import"./chunk-KXQE5HXR.js";import{b as s}from"./chunk-TEFO7EE4.js";import{d as n}from"./chunk-FQ65QLOX.js";var y=()=>{let e=window;e.addEventListener("statusTap",()=>{a(()=>{let c=e.innerWidth,d=e.innerHeight,o=document.elementFromPoint(c/2,d/2);if(!o)return;let t=r(o);t&&new Promise(p=>s(t,p)).then(()=>{m(()=>n(void 0,null,function*(){t.style.setProperty("--overflow","hidden"),yield i(t,300),t.style.removeProperty("--overflow")}))})})})};export{y as startStatusTap};
