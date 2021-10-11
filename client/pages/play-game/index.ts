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
         const { userName, rtdbRoomId, chosePlayer1, chosePlayer2 } = state.getState();

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
                  state.setMovePlayers("scissor", userName, rtdbRoomId).then(() => {
                     state.whoWins();
                  });
               }
               if (type == "stone") {
                  state.setMovePlayers("stone", userName, rtdbRoomId).then(() => {
                     state.whoWins();
                  });
               }
               if (type == "paper") {
                  state.setMovePlayers("paper", userName, rtdbRoomId).then(() => {
                     state.whoWins();
                  });
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
            if (this.counter == 0 && (chosePlayer1 == true || chosePlayer2 == true)) {
               clearInterval(countdown);
               Router.go("/results");
            }
         }, 1000);

         this.appendChild(style);
      }
   }
);
