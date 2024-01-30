import{a as E}from"./chunk-XIRS6IZN.js";import{a as L,b as P,c as b,d as _,e as m,h as R}from"./chunk-VMLYDLCA.js";import{a as V}from"./chunk-RPPWTJ63.js";import{a as p,c as T}from"./chunk-UUKFIRS2.js";import{c as I,d as B,g as k,h as y,k as C}from"./chunk-55SJLU3W.js";import{p as c,v as A}from"./chunk-TEFO7EE4.js";import{d as f}from"./chunk-FQ65QLOX.js";var G=1,x=2,S=3,g=class{constructor(t,n){this.component=t,this.params=n,this.state=G}init(t){return f(this,null,function*(){if(this.state=x,!this.element){let n=this.component;this.element=yield V(this.delegate,t,n,["ion-page","ion-page-invisible"],this.params)}})}_destroy(){c(this.state!==S,"view state must be ATTACHED");let t=this.element;t&&(this.delegate?this.delegate.removeViewFromDom(t.parentElement,t):t.remove()),this.nav=void 0,this.state=S}},O=(e,t,n)=>!e||e.component!==t?!1:A(e.params,n),q=(e,t)=>e?e instanceof g?e:new g(e,t):null,N=e=>e.map(t=>t instanceof g?t:"component"in t?q(t.component,t.componentProps===null?void 0:t.componentProps):q(t,void 0)).filter(t=>t!==null),j=":host{left:0;right:0;top:0;bottom:0;position:absolute;contain:layout size style;z-index:0}",D=class{constructor(e){C(this,e),this.ionNavWillLoad=y(this,"ionNavWillLoad",7),this.ionNavWillChange=y(this,"ionNavWillChange",3),this.ionNavDidChange=y(this,"ionNavDidChange",3),this.transInstr=[],this.gestureOrAnimationInProgress=!1,this.useRouter=!1,this.isTransitioning=!1,this.destroyed=!1,this.views=[],this.didLoad=!1,this.delegate=void 0,this.swipeGesture=void 0,this.animated=!0,this.animation=void 0,this.rootParams=void 0,this.root=void 0}swipeGestureChanged(){this.gesture&&this.gesture.enable(this.swipeGesture===!0)}rootChanged(){this.root!==void 0&&this.didLoad!==!1&&(this.useRouter||this.root!==void 0&&this.setRoot(this.root,this.rootParams))}componentWillLoad(){if(this.useRouter=document.querySelector("ion-router")!==null&&this.el.closest("[no-router]")===null,this.swipeGesture===void 0){let e=T(this);this.swipeGesture=p.getBoolean("swipeBackEnabled",e==="ios")}this.ionNavWillLoad.emit()}componentDidLoad(){return f(this,null,function*(){this.didLoad=!0,this.rootChanged(),this.gesture=(yield import("./chunk-JRZTBONU.js")).createSwipeBackGesture(this.el,this.canStart.bind(this),this.onStart.bind(this),this.onMove.bind(this),this.onEnd.bind(this)),this.swipeGestureChanged()})}connectedCallback(){this.destroyed=!1}disconnectedCallback(){for(let e of this.views)m(e.element,b),e._destroy();this.gesture&&(this.gesture.destroy(),this.gesture=void 0),this.transInstr.length=0,this.views.length=0,this.destroyed=!0}push(e,t,n,s){return this.insert(-1,e,t,n,s)}insert(e,t,n,s,i){return this.insertPages(e,[{component:t,componentProps:n}],s,i)}insertPages(e,t,n,s){return this.queueTrns({insertStart:e,insertViews:t,opts:n},s)}pop(e,t){return this.removeIndex(-1,1,e,t)}popTo(e,t,n){let s={removeStart:-1,removeCount:-1,opts:t};return typeof e=="object"&&e.component?(s.removeView=e,s.removeStart=1):typeof e=="number"&&(s.removeStart=e+1),this.queueTrns(s,n)}popToRoot(e,t){return this.removeIndex(1,-1,e,t)}removeIndex(e,t=1,n,s){return this.queueTrns({removeStart:e,removeCount:t,opts:n},s)}setRoot(e,t,n,s){return this.setPages([{component:e,componentProps:t}],n,s)}setPages(e,t,n){return t!=null||(t={}),t.animated!==!0&&(t.animated=!1),this.queueTrns({insertStart:0,insertViews:e,removeStart:0,removeCount:-1,opts:t},n)}setRouteId(e,t,n,s){let i=this.getActiveSync();if(O(i,e,t))return Promise.resolve({changed:!1,element:i.element});let r,o=new Promise(h=>r=h),a,d={updateURL:!1,viewIsReady:h=>{let u,w=new Promise(l=>u=l);return r({changed:!0,element:h,markVisible:()=>f(this,null,function*(){u(),yield a})}),w}};if(n==="root")a=this.setRoot(e,t,d);else{let h=this.views.find(u=>O(u,e,t));h?a=this.popTo(h,Object.assign(Object.assign({},d),{direction:"back",animationBuilder:s})):n==="forward"?a=this.push(e,t,Object.assign(Object.assign({},d),{animationBuilder:s})):n==="back"&&(a=this.setRoot(e,t,Object.assign(Object.assign({},d),{direction:"back",animated:!0,animationBuilder:s})))}return o}getRouteId(){return f(this,null,function*(){let e=this.getActiveSync();if(e)return{id:e.element.tagName,params:e.params,element:e.element}})}getActive(){return f(this,null,function*(){return this.getActiveSync()})}getByIndex(e){return f(this,null,function*(){return this.views[e]})}canGoBack(e){return f(this,null,function*(){return this.canGoBackSync(e)})}getPrevious(e){return f(this,null,function*(){return this.getPreviousSync(e)})}getLength(){return this.views.length}getActiveSync(){return this.views[this.views.length-1]}canGoBackSync(e=this.getActiveSync()){return!!(e&&this.getPreviousSync(e))}getPreviousSync(e=this.getActiveSync()){if(!e)return;let t=this.views,n=t.indexOf(e);return n>0?t[n-1]:void 0}queueTrns(e,t){return f(this,null,function*(){var n,s;if(this.isTransitioning&&(!((n=e.opts)===null||n===void 0)&&n.skipIfBusy))return!1;let i=new Promise((r,o)=>{e.resolve=r,e.reject=o});if(e.done=t,e.opts&&e.opts.updateURL!==!1&&this.useRouter){let r=document.querySelector("ion-router");if(r){let o=yield r.canTransition();if(o===!1)return!1;if(typeof o=="string")return r.push(o,e.opts.direction||"back"),!1}}return((s=e.insertViews)===null||s===void 0?void 0:s.length)===0&&(e.insertViews=void 0),this.transInstr.push(e),this.nextTrns(),i})}success(e,t){if(this.destroyed){this.fireError("nav controller was destroyed",t);return}if(t.done&&t.done(e.hasCompleted,e.requiresTransition,e.enteringView,e.leavingView,e.direction),t.resolve(e.hasCompleted),t.opts.updateURL!==!1&&this.useRouter){let n=document.querySelector("ion-router");if(n){let s=e.direction==="back"?"back":"forward";n.navChanged(s)}}}failed(e,t){if(this.destroyed){this.fireError("nav controller was destroyed",t);return}this.transInstr.length=0,this.fireError(e,t)}fireError(e,t){t.done&&t.done(!1,!1,e),t.reject&&!this.destroyed?t.reject(e):t.resolve(!1)}nextTrns(){if(this.isTransitioning)return!1;let e=this.transInstr.shift();return e?(this.runTransition(e),!0):!1}runTransition(e){return f(this,null,function*(){try{this.ionNavWillChange.emit(),this.isTransitioning=!0,this.prepareTI(e);let t=this.getActiveSync(),n=this.getEnteringView(e,t);if(!t&&!n)throw new Error("no views in the stack to be removed");n&&n.state===G&&(yield n.init(this.el)),this.postViewInit(n,t,e);let s=(e.enteringRequiresTransition||e.leavingRequiresTransition)&&n!==t;s&&e.opts&&t&&(e.opts.direction==="back"&&(e.opts.animationBuilder=e.opts.animationBuilder||(n==null?void 0:n.animationBuilder)),t.animationBuilder=e.opts.animationBuilder);let i;s?i=yield this.transition(n,t,e):i={hasCompleted:!0,requiresTransition:!1},this.success(i,e),this.ionNavDidChange.emit()}catch(t){this.failed(t,e)}this.isTransitioning=!1,this.nextTrns()})}prepareTI(e){var t,n,s;let i=this.views.length;if((t=e.opts)!==null&&t!==void 0||(e.opts={}),(n=(s=e.opts).delegate)!==null&&n!==void 0||(s.delegate=this.delegate),e.removeView!==void 0){c(e.removeStart!==void 0,"removeView needs removeStart"),c(e.removeCount!==void 0,"removeView needs removeCount");let a=this.views.indexOf(e.removeView);if(a<0)throw new Error("removeView was not found");e.removeStart+=a}e.removeStart!==void 0&&(e.removeStart<0&&(e.removeStart=i-1),e.removeCount<0&&(e.removeCount=i-e.removeStart),e.leavingRequiresTransition=e.removeCount>0&&e.removeStart+e.removeCount===i),e.insertViews&&((e.insertStart<0||e.insertStart>i)&&(e.insertStart=i),e.enteringRequiresTransition=e.insertStart===i);let r=e.insertViews;if(!r)return;c(r.length>0,"length can not be zero");let o=N(r);if(o.length===0)throw new Error("invalid views to insert");for(let a of o){a.delegate=e.opts.delegate;let d=a.nav;if(d&&d!==this)throw new Error("inserted view was already inserted");if(a.state===S)throw new Error("inserted view was already destroyed")}e.insertViews=o}getEnteringView(e,t){let n=e.insertViews;if(n!==void 0)return n[n.length-1];let s=e.removeStart;if(s!==void 0){let i=this.views,r=s+e.removeCount;for(let o=i.length-1;o>=0;o--){let a=i[o];if((o<s||o>=r)&&a!==t)return a}}}postViewInit(e,t,n){var s,i,r;c(t||e,"Both leavingView and enteringView are null"),c(n.resolve,"resolve must be valid"),c(n.reject,"reject must be valid");let o=n.opts,{insertViews:a,removeStart:d,removeCount:h}=n,u;if(d!==void 0&&h!==void 0){c(d>=0,"removeStart can not be negative"),c(h>=0,"removeCount can not be negative"),u=[];for(let l=d;l<d+h;l++){let v=this.views[l];v!==void 0&&v!==e&&v!==t&&u.push(v)}(s=o.direction)!==null&&s!==void 0||(o.direction="back")}let w=this.views.length+((i=a==null?void 0:a.length)!==null&&i!==void 0?i:0)-(h!=null?h:0);if(c(w>=0,"final balance can not be negative"),w===0)throw console.warn("You can't remove all the pages in the navigation stack. nav.pop() is probably called too many times.",this,this.el),new Error("navigation stack needs at least one root page");if(a){let l=n.insertStart;for(let v of a)this.insertViewAt(v,l),l++;n.enteringRequiresTransition&&((r=o.direction)!==null&&r!==void 0||(o.direction="forward"))}if(u&&u.length>0){for(let l of u)m(l.element,L),m(l.element,P),m(l.element,b);for(let l of u)this.destroyView(l)}}transition(e,t,n){return f(this,null,function*(){let s=n.opts,i=s.progressAnimation?u=>{u!==void 0&&!this.gestureOrAnimationInProgress?(this.gestureOrAnimationInProgress=!0,u.onFinish(()=>{this.gestureOrAnimationInProgress=!1},{oneTimeCallback:!0}),u.progressEnd(0,0,0)):this.sbAni=u}:void 0,r=T(this),o=e.element,a=t&&t.element,d=Object.assign(Object.assign({mode:r,showGoBack:this.canGoBackSync(e),baseEl:this.el,progressCallback:i,animated:this.animated&&p.getBoolean("animated",!0),enteringEl:o,leavingEl:a},s),{animationBuilder:s.animationBuilder||this.animation||p.get("navAnimation")}),{hasCompleted:h}=yield _(d);return this.transitionFinish(h,e,t,s)})}transitionFinish(e,t,n,s){let i=e?t:n;return i&&this.unmountInactiveViews(i),{hasCompleted:e,requiresTransition:!0,enteringView:t,leavingView:n,direction:s.direction}}insertViewAt(e,t){let n=this.views,s=n.indexOf(e);s>-1?(c(e.nav===this,"view is not part of the nav"),n.splice(s,1),n.splice(t,0,e)):(c(!e.nav,"nav is used"),e.nav=this,n.splice(t,0,e))}removeView(e){c(e.state===x||e.state===S,"view state should be loaded or destroyed");let t=this.views,n=t.indexOf(e);c(n>-1,"view must be part of the stack"),n>=0&&t.splice(n,1)}destroyView(e){e._destroy(),this.removeView(e)}unmountInactiveViews(e){if(this.destroyed)return;let t=this.views,n=t.indexOf(e);for(let s=t.length-1;s>=0;s--){let i=t[s],r=i.element;r&&(s>n?(m(r,b),this.destroyView(i)):s<n&&R(r,!0))}}canStart(){return!this.gestureOrAnimationInProgress&&!!this.swipeGesture&&!this.isTransitioning&&this.transInstr.length===0&&this.canGoBackSync()}onStart(){this.gestureOrAnimationInProgress=!0,this.pop({direction:"back",progressAnimation:!0})}onMove(e){this.sbAni&&this.sbAni.progressStep(e)}onEnd(e,t,n){if(this.sbAni){this.sbAni.onFinish(()=>{this.gestureOrAnimationInProgress=!1},{oneTimeCallback:!0});let s=e?-.001:.001;e?s+=E([0,0],[.32,.72],[0,1],[1,1],t)[0]:(this.sbAni.easing("cubic-bezier(1, 0, 0.68, 0.28)"),s+=E([0,0],[1,0],[.68,.28],[1,1],t)[0]),this.sbAni.progressEnd(e?1:0,s,n)}else this.gestureOrAnimationInProgress=!1}render(){return I("slot",null)}get el(){return k(this)}static get watchers(){return{swipeGesture:["swipeGestureChanged"],root:["rootChanged"]}}};D.style=j;var W=(e,t,n,s,i)=>{let r=e.closest("ion-nav");if(r){if(t==="forward"){if(n!==void 0)return r.push(n,s,{skipIfBusy:!0,animationBuilder:i})}else if(t==="root"){if(n!==void 0)return r.setRoot(n,s,{skipIfBusy:!0,animationBuilder:i})}else if(t==="back")return r.pop({skipIfBusy:!0,animationBuilder:i})}return Promise.resolve(!1)},Q=class{constructor(e){C(this,e),this.onClick=()=>W(this.el,this.routerDirection,this.component,this.componentProps,this.routerAnimation),this.component=void 0,this.componentProps=void 0,this.routerDirection="forward",this.routerAnimation=void 0}render(){return I(B,{onClick:this.onClick})}get el(){return k(this)}};export{D as ion_nav,Q as ion_nav_link};
