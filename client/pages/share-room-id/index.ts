import { Router } from "@vaadin/router";
import { state } from "../../state";

customElements.define(
   "share-room-id-page",
   class initShareRoomId extends HTMLElement {
      connectedCallback() {
         this.render();

         state.subscribe(() => {
            const { namePlayer2 } = state.getState();
            if (namePlayer2 != false && namePlayer2 != undefined) {
               Router.go("/rules");
            }
         });
      }

      render(): void {
         const { roomId } = state.getState();

         this.innerHTML = `
         <div class="text__cont">
             <h2 class="first__text">Compartí el código:</h2>
             <h1 class="code__room-id">${roomId}</h1>
             <h2 class="second__text">Con tu contrincante</h2>
         </div>
         `;
      }
   }
);
