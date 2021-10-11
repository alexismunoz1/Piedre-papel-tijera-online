import { Router } from "@vaadin/router";
import { state } from "../../state";

customElements.define(
   "results-page",
   class initResultsPage extends HTMLElement {
      connectedCallback() {
         this.render();
      }

      render() {
         const { namePlayer1, namePlayer2, scorePlayer1, scorePlayer2 } = state.getState();

         this.innerHTML = `
            <h1>Resultados<h1>
            <h2>${namePlayer1}: ${scorePlayer1}<h2>
            <h2>${namePlayer2}: ${scorePlayer2}<h2>
            <button class="button-back">Volver a jugar</button>
          `;

         const buttonBack = this.querySelector(".button-back");
         buttonBack.addEventListener("click", (e) => {
            e.preventDefault();

            Router.go("/rules");
         });
      }
   }
);
