import { Router } from "@vaadin/router";
import { state } from "../../state";

customElements.define(
   "rules-page",
   class initRulesPage extends HTMLElement {
      connectedCallback() {
         this.render();
      }

      render(): void {
         const { userName, rtdbRoomId } = state.getState();

         this.innerHTML = `
            <h4 class="text-rules">Presioná jugar
            y elegí: piedra, papel o tijera antes 
            de que pasen los 3 segundos.<h4>
            
            <button class="button-play">Jugar</button>
         `;

         const buttonPlay = this.querySelector(".button-play");

         buttonPlay.addEventListener("click", (e) => {
            e.preventDefault();
            // state.setReady(userName, rtdbRoomId, true);
            Router.go("/waiting_room");
         });
      }
   }
);
