import { Router } from "@vaadin/router";
import { state } from "../../state";
const imgRules = require("url:../../assets/rules.svg");

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
            <data-comp></data-comp>

            <img class="img-rules" src="${imgRules}">
            
            <button-comp class="button-play">Jugar</button-comp>
            
            <div class="hands">
               <hand-scissor></hand-scissor>
               <hand-stone></hand-stone>
               <hand-paper></hand-paper>
            </div>
         `;
         this.className = "this-const";

         const style = document.createElement("style");
         style.innerText = `
            .this-const {
               width: 100%;
               position: absolute;
               bottom: 0;
               display: flex;
               flex-direction: column;
            }
            .img-rules {
               width: 280px;
               margin: 20px auto;
            }
            .button-play {
               margin: 0 auto 40px auto;
            }
            .hands {
               width: 100%;
               display: flex;
               justify-content: space-evenly;
            }
         `;

         this.appendChild(style);

         const { userName, rtdbRoomId } = state.getState();

         const buttonPlay = this.querySelector(".button-play");
         buttonPlay.addEventListener("click", (e) => {
            e.preventDefault();
            state.setReadyPlayers(userName, rtdbRoomId, true);
            this.waitingRoom();
         });
      }

      waitingRoom() {
         const { userName, namePlayer1, namePlayer2 } = state.getState();
         let waitingPlayer: string;
         if (userName == namePlayer1) {
            waitingPlayer = namePlayer2;
         }
         if (userName == namePlayer2) {
            waitingPlayer = namePlayer1;
         }

         this.innerHTML = `
         <data-comp></data-comp>

         <p class="text-waiting">Esperando a que < ${waitingPlayer} > presione ¡Jugar!...<p>

         <div class="hands">
            <hand-scissor></hand-scissor>
            <hand-stone></hand-stone>
            <hand-paper></hand-paper>
         </div>
      `;
         this.className = "this-const-waiting";

         const style = document.createElement("style");
         style.innerText = `
            .this-const-waiting {
               width: 100%;
               position: absolute;
               bottom: 0;
               display: flex;
               flex-direction: column;
            }
            .text-waiting {
               font-size: 35px;
               font-family: var(--font-odibee-sans);
               text-align: center;
               margin: 150px auto;
            }
            .hands {
               width: 100%;
               display: flex;
               justify-content: space-evenly;
            }
         `;

         this.appendChild(style);
      }
   }
);
