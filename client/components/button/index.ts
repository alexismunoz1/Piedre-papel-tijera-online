customElements.define(
   "button-comp",
   class Button extends HTMLElement {
      shadow: ShadowRoot;
      constructor() {
         super();
         this.shadow = this.attachShadow({ mode: "open" });
         this.render();
      }
      render() {
         const button = document.createElement("button");
         const style = document.createElement("style");
         button.className = "button-el";
         button.textContent = this.textContent;

         style.innerText = `
            .button-el {
              color: #fff;
              width: 320px;
              height: 87px;
              font-size: 45px;
              text-align: center;
              border-radius: 10px;
              background: var(--color-blue-btn);
              border: 10px solid var(--color-blue-border);
              font-family: var(--font-odibee-sans);
            }`;

         this.shadow.appendChild(button);
         this.shadow.appendChild(style);
      }
   }
);
