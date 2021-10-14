import { state } from "../../state";

customElements.define(
   "data-comp",
   class DataComp extends HTMLElement {
      shadow: ShadowRoot;
      constructor() {
         super();
         this.shadow = this.attachShadow({ mode: "open" });
         this.render();
      }
      render() {
         const { namePlayer1, namePlayer2, scorePlayer1, scorePlayer2, roomId } = state.getState();

         const div = document.createElement("div");
         div.innerHTML = `
            <div class="cont-name-score">
               <p>${namePlayer1}: ${scorePlayer1}</p>
               <p>${namePlayer2}: ${scorePlayer2}</p>
            </div>
            <div class="cont-room">
               <p>Sala</p>
               <p>${roomId}</p>
            </div>
         `;
         div.className = "data-comp";

         const style = document.createElement("style");
         style.innerText = `
            .data-comp {
               display: flex;
               flex-direction: row;
               justify-content: space-around;
               font-size: 24px;
               font-family: var(--font-odibee-sans);
            }
            .cont-name-score {
            }
            .cont-room {

            }
            `;

         this.shadow.appendChild(div);
         this.shadow.appendChild(style);
      }
   }
);
