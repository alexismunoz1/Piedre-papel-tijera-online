import { Router } from "@vaadin/router";
import { stat } from "fs";
import { state } from "../../state";

customElements.define(
   "share-room-id-page",
   class initShareRoomId extends HTMLElement {
      connectedCallback() {
         this.render();
      }

      render(): void {
         const roomId = state.getState().roomId;
         this.innerHTML = `
         <div class="text__cont">
             <h2 class="first__text">Compartí el código:</h2>
             <h1 class="code__room-id">${roomId}</h1>
             <h2 class="second__text">Con tu contrincante</h2>
         </div>`;
      }
   }
);
