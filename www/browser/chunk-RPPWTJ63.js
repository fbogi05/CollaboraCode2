import{b as p}from"./chunk-TEFO7EE4.js";import{d as v}from"./chunk-FQ65QLOX.js";var D=(e,t,o,l,c,a)=>v(void 0,null,function*(){var s;if(e)return e.attachViewToDom(t,o,c,l);if(!a&&typeof o!="string"&&!(o instanceof HTMLElement))throw new Error("framework delegate is missing");let i=typeof o=="string"?(s=t.ownerDocument)===null||s===void 0?void 0:s.createElement(o):o;return l&&l.forEach(m=>i.classList.add(m)),c&&Object.assign(i,c),t.appendChild(i),yield new Promise(m=>p(i,m)),i}),E=(e,t)=>{if(t){if(e){let o=t.parentElement;return e.removeViewFromDom(o,t)}t.remove()}return Promise.resolve()},y=()=>{let e,t;return{attachViewToDom:(m,V,...C)=>v(void 0,[m,V,...C],function*(c,a,s={},i=[]){var f,h;e=c;let n;if(a){let d=typeof a=="string"?(f=e.ownerDocument)===null||f===void 0?void 0:f.createElement(a):a;i.forEach(r=>d.classList.add(r)),Object.assign(d,s),e.appendChild(d),n=d,yield new Promise(r=>p(d,r))}else if(e.children.length>0&&(e.tagName==="ION-MODAL"||e.tagName==="ION-POPOVER")&&!(n=e.children[0]).classList.contains("ion-delegate-host")){let r=(h=e.ownerDocument)===null||h===void 0?void 0:h.createElement("div");r.classList.add("ion-delegate-host"),i.forEach(u=>r.classList.add(u)),r.append(...e.children),e.appendChild(r),n=r}let w=document.querySelector("ion-app")||document.body;return t=document.createComment("ionic teleport"),e.parentNode.insertBefore(t,e),w.appendChild(e),n!=null?n:e}),removeViewFromDom:()=>(e&&t&&(t.parentNode.insertBefore(e,t),t.remove()),Promise.resolve())}};export{D as a,E as b,y as c};
