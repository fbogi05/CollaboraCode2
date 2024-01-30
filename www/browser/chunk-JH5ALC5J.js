import{d as m,f as u,i as x}from"./chunk-TUPZHSRC.js";import{a as g,c as p}from"./chunk-G3AXONIP.js";import{a as l,c as o}from"./chunk-UUKFIRS2.js";import{c as t,d as c,g as b,h as E,k as a,m as T,n as d}from"./chunk-55SJLU3W.js";import"./chunk-KXQE5HXR.js";import"./chunk-TEFO7EE4.js";import{d as r}from"./chunk-FQ65QLOX.js";var y="ion-infinite-scroll{display:none;width:100%}.infinite-scroll-enabled{display:block}",L=class{constructor(i){a(this,i),this.ionInfinite=E(this,"ionInfinite",7),this.thrPx=0,this.thrPc=0,this.didFire=!1,this.isBusy=!1,this.onScroll=()=>{let n=this.scrollEl;if(!n||!this.canStart())return 1;let e=this.el.offsetHeight;if(e===0)return 2;let s=n.scrollTop,S=n.scrollHeight,h=n.offsetHeight,f=this.thrPc!==0?h*this.thrPc:this.thrPx;return(this.position==="bottom"?S-e-s-f-h:s-e-f)<0&&!this.didFire?(this.isLoading=!0,this.didFire=!0,this.ionInfinite.emit(),3):4},this.isLoading=!1,this.threshold="15%",this.disabled=!1,this.position="bottom"}thresholdChanged(){let i=this.threshold;i.lastIndexOf("%")>-1?(this.thrPx=0,this.thrPc=parseFloat(i)/100):(this.thrPx=parseFloat(i),this.thrPc=0)}disabledChanged(){let i=this.disabled;i&&(this.isLoading=!1,this.isBusy=!1),this.enableScrollEvents(!i)}connectedCallback(){return r(this,null,function*(){let i=u(this.el);if(!i){x(this.el);return}this.scrollEl=yield m(i),this.thresholdChanged(),this.disabledChanged(),this.position==="top"&&d(()=>{this.scrollEl&&(this.scrollEl.scrollTop=this.scrollEl.scrollHeight-this.scrollEl.clientHeight)})})}disconnectedCallback(){this.enableScrollEvents(!1),this.scrollEl=void 0}complete(){return r(this,null,function*(){let i=this.scrollEl;if(!(!this.isLoading||!i))if(this.isLoading=!1,this.position==="top"){this.isBusy=!0;let n=i.scrollHeight-i.scrollTop;requestAnimationFrame(()=>{T(()=>{let s=i.scrollHeight-n;requestAnimationFrame(()=>{d(()=>{i.scrollTop=s,this.isBusy=!1,this.didFire=!1})})})})}else this.didFire=!1})}canStart(){return!this.disabled&&!this.isBusy&&!!this.scrollEl&&!this.isLoading}enableScrollEvents(i){this.scrollEl&&(i?this.scrollEl.addEventListener("scroll",this.onScroll):this.scrollEl.removeEventListener("scroll",this.onScroll))}render(){let i=o(this),n=this.disabled;return t(c,{class:{[i]:!0,"infinite-scroll-loading":this.isLoading,"infinite-scroll-enabled":!n}})}get el(){return b(this)}static get watchers(){return{threshold:["thresholdChanged"],disabled:["disabledChanged"]}}};L.style=y;var v="ion-infinite-scroll-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;min-height:84px;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.infinite-loading{margin-left:0;margin-right:0;margin-top:0;margin-bottom:32px;display:none;width:100%}.infinite-loading-text{-webkit-margin-start:32px;margin-inline-start:32px;-webkit-margin-end:32px;margin-inline-end:32px;margin-top:4px;margin-bottom:0}.infinite-scroll-loading ion-infinite-scroll-content>.infinite-loading{display:block}.infinite-scroll-content-ios .infinite-loading-text{color:var(--ion-color-step-600, #666666)}.infinite-scroll-content-ios .infinite-loading-spinner .spinner-lines-ios line,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-lines-small-ios line,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-crescent circle{stroke:var(--ion-color-step-600, #666666)}.infinite-scroll-content-ios .infinite-loading-spinner .spinner-bubbles circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-circles circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-dots circle{fill:var(--ion-color-step-600, #666666)}",C="ion-infinite-scroll-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;min-height:84px;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.infinite-loading{margin-left:0;margin-right:0;margin-top:0;margin-bottom:32px;display:none;width:100%}.infinite-loading-text{-webkit-margin-start:32px;margin-inline-start:32px;-webkit-margin-end:32px;margin-inline-end:32px;margin-top:4px;margin-bottom:0}.infinite-scroll-loading ion-infinite-scroll-content>.infinite-loading{display:block}.infinite-scroll-content-md .infinite-loading-text{color:var(--ion-color-step-600, #666666)}.infinite-scroll-content-md .infinite-loading-spinner .spinner-lines-md line,.infinite-scroll-content-md .infinite-loading-spinner .spinner-lines-small-md line,.infinite-scroll-content-md .infinite-loading-spinner .spinner-crescent circle{stroke:var(--ion-color-step-600, #666666)}.infinite-scroll-content-md .infinite-loading-spinner .spinner-bubbles circle,.infinite-scroll-content-md .infinite-loading-spinner .spinner-circles circle,.infinite-scroll-content-md .infinite-loading-spinner .spinner-dots circle{fill:var(--ion-color-step-600, #666666)}",H=class{constructor(i){a(this,i),this.customHTMLEnabled=l.get("innerHTMLTemplatesEnabled",p),this.loadingSpinner=void 0,this.loadingText=void 0}componentDidLoad(){if(this.loadingSpinner===void 0){let i=o(this);this.loadingSpinner=l.get("infiniteLoadingSpinner",l.get("spinner",i==="ios"?"lines":"crescent"))}}renderLoadingText(){let{customHTMLEnabled:i,loadingText:n}=this;return i?t("div",{class:"infinite-loading-text",innerHTML:g(n)}):t("div",{class:"infinite-loading-text"},this.loadingText)}render(){let i=o(this);return t(c,{class:{[i]:!0,[`infinite-scroll-content-${i}`]:!0}},t("div",{class:"infinite-loading"},this.loadingSpinner&&t("div",{class:"infinite-loading-spinner"},t("ion-spinner",{name:this.loadingSpinner})),this.loadingText!==void 0&&this.renderLoadingText()))}};H.style={ios:v,md:C};export{L as ion_infinite_scroll,H as ion_infinite_scroll_content};
