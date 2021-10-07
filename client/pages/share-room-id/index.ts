import { Router } from "@vaadin/router";
import { state } from "../../state";

customElements.define(
   "share-room-id-page",
   class initShareRoomId extends HTMLElement {
      connectedCallback() {
         state.subscribe(() => {
            const currentState = state.getState();

            if (currentState.namePlayer2 != false) {
               Router.go("/rules");
            }
         });

         this.render();
      }

      render(): void {
         const { roomId } = state.getState();

         this.innerHTML = `
         <div class="text__cont">
             <h2 class="first__text">Compartí el código:</h2>
             <h1 class="code__room-id">${roomId}</h1>
             <h2 class="second__text">Con tu contrincante</h2>
         </div>`;
      }
   }
);
