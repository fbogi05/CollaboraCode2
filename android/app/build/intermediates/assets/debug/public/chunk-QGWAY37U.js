import{a}from"./chunk-HYHL4X3T.js";var c=function(e){return e.Heavy="HEAVY",e.Medium="MEDIUM",e.Light="LIGHT",e}(c||{});var n={getEngine(){let e=window.TapticEngine;if(e)return e;let t=a();if(t!=null&&t.isPluginAvailable("Haptics"))return t.Plugins.Haptics},available(){if(!this.getEngine())return!1;let t=a();return(t==null?void 0:t.getPlatform())==="web"?typeof navigator<"u"&&navigator.vibrate!==void 0:!0},isCordova(){return window.TapticEngine!==void 0},isCapacitor(){return a()!==void 0},impact(e){let t=this.getEngine();if(!t)return;let s=this.isCapacitor()?e.style:e.style.toLowerCase();t.impact({style:s})},notification(e){let t=this.getEngine();if(!t)return;let s=this.isCapacitor()?e.type:e.type.toLowerCase();t.notification({type:s})},selection(){let e=this.isCapacitor()?c.Light:"light";this.impact({style:e})},selectionStart(){let e=this.getEngine();e&&(this.isCapacitor()?e.selectionStart():e.gestureSelectionStart())},selectionChanged(){let e=this.getEngine();e&&(this.isCapacitor()?e.selectionChanged():e.gestureSelectionChanged())},selectionEnd(){let e=this.getEngine();e&&(this.isCapacitor()?e.selectionEnd():e.gestureSelectionEnd())}},i=()=>n.available(),o=()=>{i()&&n.selection()},g=()=>{i()&&n.selectionStart()},l=()=>{i()&&n.selectionChanged()},u=()=>{i()&&n.selectionEnd()},d=e=>{i()&&n.impact(e)};export{c as a,o as b,g as c,l as d,u as e,d as f};
