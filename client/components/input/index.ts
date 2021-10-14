customElements.define(
   "input-comp",
   class InputComp extends HTMLElement {
      shadow: ShadowRoot;
      constructor() {
         super();
         this.shadow = this.attachShadow({ mode: "open" });
         this.render();
      }
      render() {
         const input = document.createElement("input");
         const style = document.createElement("style");
         const texto = this.textContent;
         input.className = "input-el";
         input.placeholder = this.textContent;

         style.innerText = `
            .input-el {
               width: 296px;
               height: 66px;
               border: 10px solid #182460;
               border-radius: 10px; 
               color: black;
               font-size: 45px;
               background: #FFFFFF;
               font-family: var(--font-odibee-sans);
            }`;

         input.textContent = this.textContent;
         this.shadow.appendChild(input);
         this.shadow.appendChild(style);
      }
   }
);
