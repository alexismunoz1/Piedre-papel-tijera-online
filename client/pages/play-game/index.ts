import { Router } from "@vaadin/router";
import { state } from "../../state";

customElements.define(
   "play-game-page",
   class initPlayGamePage extends HTMLElement {
      connectedCallback() {
         this.render();
      }

      render(): void {
         this.innerHTML = `
             <h1>Play game page<h1>
         `;
      }
   }
);
