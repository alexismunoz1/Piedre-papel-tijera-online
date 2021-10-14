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
               <h2 class="text">Compartí el código:</h2>
               <h1 class="code__room-id">${roomId}</h1>
               <h2 class="text">Con tu contrincante</h2>
            </div>

            <div class="hands">
               <hand-scissor></hand-scissor>
               <hand-stone></hand-stone>
               <hand-paper></hand-paper>
            </div>`;
         this.className = "share-romm-id-cont";

         const style = document.createElement("style");
         style.innerText = `
               .share-romm-id-cont {
                  width: 100%;
                  position: absolute;
                  bottom: 0;
               }
               .text__cont {
                  text-align: center;
                  margin: 150px 0;
                  font-style: normal;
                  font-family: var(--font-odibee-sans);
               }
               .text {
                  font-size: 35px;
                  font-weight: 600;
               }
               .code__room-id {
                  font-size: 48px;
                  font-weight: bold;
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
