import { Router } from "@vaadin/router";
import { state } from "../../state";

customElements.define(
   "rules-page",
   class initRulesPage extends HTMLElement {
      connectedCallback() {
         this.render();

         state.subscribe(() => {
            const { readyPlayer1, readyPlayer2 } = state.getState();

            if (readyPlayer1 == true && readyPlayer2 == true) {
               Router.go("/play_game");
            }
         });
      }

      render(): void {
         this.innerHTML = `
            <h4 class="text-rules">Presioná jugar
            y elegí: piedra, papel o tijera antes 
            de que pasen los 3 segundos.<h4>
            
            <button class="button-play">Jugar</button>
         `;

         const { userName, rtdbRoomId } = state.getState();
         const buttonPlay = this.querySelector(".button-play");

         buttonPlay.addEventListener("click", (e) => {
            e.preventDefault();

            state.setReadyPlayers(userName, rtdbRoomId, true);

            this.innerHTML = `
               <h3>Esperando a que Usuario presione ¡Jugar!...<h3>
            `;
         });
      }
   }
);
