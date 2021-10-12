const piedra = require("url:../../assets/piedra.svg");

customElements.define(
   "hand-stone",
   class Piedra extends HTMLElement {
      shadow: ShadowRoot;
      constructor() {
         super();
         this.shadow = this.attachShadow({ mode: "open" });
         this.render();
      }
      render() {
         const style = document.createElement("style");
         this.shadow.innerHTML = `
            <img class="hand-stone" src="${piedra}">
        `;

         style.innerText = `
            .hand-stone {
              height: 100%;
              width:100%
            }
        `;

         this.shadow.appendChild(style);
      }
   }
);
