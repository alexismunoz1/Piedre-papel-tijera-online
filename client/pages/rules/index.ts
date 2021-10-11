import { Router } from "@vaadin/router";
import { state } from "../../state";

customElements.define(
   "rules-page",
   class initRulesPage extends HTMLElement {
      connectedCallback() {
         const { userName, namePlayer1, namePlayer2, rtdbRoomId } = state.getState();
         state.backToFalse(userName);

         if (namePlayer1 == userName) {
            state.setReadyPlayers(namePlayer1, rtdbRoomId, false);
         }
         if (namePlayer2 == userName) {
            state.setReadyPlayers(namePlayer2, rtdbRoomId, false);
         }

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
            <h4 class="text-rules">
               Presioná jugar y elegí: piedra, 
               papel o tijera antes de que pasen los 3 segundos.
            </h4>
            
            <button class="button-play">Jugar</button>
            
            <div class="hands">
               <hand-scissor></hand-scissor>
               <hand-stone></hand-stone>
               <hand-paper></hand-paper>
            </div>
         `;

         const style = document.createElement("style");
         style.innerText = `
               .hands {
                  width: 100%;
                  display: flex;
                  justify-content: space-evenly;
               }
         `;

         this.appendChild(style);

         const { userName, rtdbRoomId, namePlayer1, namePlayer2 } = state.getState();
         let waitingPlayer: string;
         if (userName == namePlayer1) {
            waitingPlayer = namePlayer2;
         }
         if (userName == namePlayer2) {
            waitingPlayer = namePlayer1;
         }

         const buttonPlay = this.querySelector(".button-play");
         buttonPlay.addEventListener("click", (e) => {
            e.preventDefault();
            state.setReadyPlayers(userName, rtdbRoomId, true);

            this.innerHTML = `
               <h3>Esperando a que ${waitingPlayer} presione ¡Jugar!...<h3>
               <div class="hands">
                  <hand-scissor></hand-scissor>
                  <hand-stone></hand-stone>
                  <hand-paper></hand-paper>
               </div>
            `;
         });
      }
   }
);
