import { Router } from "@vaadin/router";
import { state } from "../../state";

customElements.define(
   "rules-page",
   class initRulesPage extends HTMLElement {
      connectedCallback() {
         this.render();
      }

      render() {
         this.innerHTML = `
            <h1>Rules<h1>
         `;
      }
   }
);
