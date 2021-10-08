import { Router } from "@vaadin/router";
import { state } from "../../state";

customElements.define(
   "play-game-page",
   class initPlayGamePage extends HTMLElement {
      counter: number = 3;

      connectedCallback() {
         this.render();
      }

      render(): void {
         const { userName, namePlayer1, namePlayer2, rtdbRoomId, chosePlayer1, chosePlayer2 } =
            state.getState();

         this.innerHTML = `
            <h1>Play game page<h1>

            <div class="counter-el">${this.counter}</div>
            
            <div class="hands">
               <hand-scissor class="scissor"></hand-scissor>
               <hand-stone class="stone"></hand-stone>
               <hand-paper class="paper"></hand-paper>
            </div>
         `;
         this.classList.add("page");

         const style = document.createElement("style");
         style.innerText = `
               .hands {
                  width: 100%;
                  display: flex;
                  justify-content: space-evenly;
               }
         `;

         const countdownEl = this.querySelector(".counter-el");
         const handsCont = this.querySelector(".hands").children;
         const handsDiv = this.querySelector(".hands");

         for (const hands of handsCont) {
            hands.addEventListener("click", () => {
               const type = hands.getAttribute("class");

               if (type == "scissor") {
                  console.log(`${userName} ha elegido "scissor"`);
                  state.setMovePlayers("scissor", userName, rtdbRoomId);
               } else if (type == "stone") {
                  console.log(`${userName} ha elegido "stone"`);
                  state.setMovePlayers("stone", userName, rtdbRoomId);
               } else if (type == "paper") {
                  console.log(`${userName} ha elegido "paper"`);
                  state.setMovePlayers("paper", userName, rtdbRoomId);
               }
            });
         }

         const countdown = setInterval(() => {
            this.counter--;
            const counterEl = this.querySelector(".counter-el");
            counterEl.textContent = String(this.counter);

            if (this.counter == 0 && (chosePlayer1 == false || chosePlayer2 == false)) {
               clearInterval(countdown);
               Router.go("/rules");
            }
         }, 1000);

         this.appendChild(style);
      }
   }
);
