const imgTitle = require("url:../../assets/imgWelcome.svg");

customElements.define(
   "img-title",
   class TitleComp extends HTMLElement {
      shadow: ShadowRoot;
      constructor() {
         super();
         this.shadow = this.attachShadow({ mode: "open" });
         this.render();
      }
      render() {
         const style = document.createElement("style");
         this.shadow.innerHTML = `
                <img class="img-title" src="${imgTitle}">
            `;

         style.innerText = `
            .img-title {
                width: 284px;
                margin: 60px auto 56px auto;
            }
            `;
         this.shadow.appendChild(style);
      }
   }
);
