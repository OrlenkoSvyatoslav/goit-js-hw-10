import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i as o}from"./assets/vendor-77e16229.js";const t=document.querySelector(".form");t.addEventListener("submit",a);function a(s){s.preventDefault();const i=t.elements.delay.value,r=t.elements.state.value;function n(e,m){return new Promise((l,u)=>{setTimeout(()=>{m==="fulfilled"&&l(e),u(e)},i),t.reset()})}n(i,r).then(e=>{o.success({title:"OK",message:`✅ Fulfilled promise in ${e}ms`,position:"topRight"})}).catch(e=>{o.error({title:"Error",message:`❌ Rejected promise in ${e}ms`,position:"topRight"})})}
//# sourceMappingURL=commonHelpers2.js.map