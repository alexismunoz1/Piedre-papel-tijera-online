import { Router } from "@vaadin/router";
import { state } from "../../state";

customElements.define(
   "waiting-room-page",
   class initWaitingRoomPage extends HTMLElement {
      connectedCallback() {
         // state.subscribe(() => {
         //    const { readyPlayer1, readyPlayer2 } = state.getState();
         //    if (readyPlayer1 == true && readyPlayer2 == true) {
         //       console.log(
         //          "currentState.readyPlayer1 == true && currentState.readyPlayer2 == true"
         //       );
         //       Router.go("/play_game");
         //    } else {
         //       this.render();
         //    }
         // });
         this.render();
      }

      render(): void {
         this.innerHTML = `
            <h3>Esperando a que Usuario presione ¡Jugar!...<h3>
          `;
      }
   }
);
