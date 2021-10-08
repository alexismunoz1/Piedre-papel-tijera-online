const papel = require("url:../../assets/papel.svg");

customElements.define(
  "hand-paper",
  class Papel extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }
    render() {
      const style = document.createElement("style");
      this.shadow.innerHTML = `
                <img class="hand-paper" src="${papel}">
            `;

      style.innerHTML = `
            .hand-paper {
                height: 100%;
                width:100%
            }
            `;
      this.shadow.appendChild(style);
    }
  }
);
