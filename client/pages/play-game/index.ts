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
         const { userName, rtdbRoomId } = state.getState();

         this.innerHTML = `
            <div class="counter-ellipse">
               <div class="counter-el">${this.counter}</div>
            </div>

            <div class="hands-top">
               <hand-scissor class="scissor-top hand-display-none"></hand-scissor>
               <hand-stone class="stone-top hand-display-none"></hand-stone>
               <hand-paper class="paper-top hand-display-none"></hand-paper>
            </div>
            
            <div class="hands">
               <hand-scissor class="scissor"></hand-scissor>
               <hand-stone class="stone"></hand-stone>
               <hand-paper class="paper"></hand-paper>
            </div>
         `;
         this.className = "this-cont-game";

         const style = document.createElement("style");
         style.innerText = `
            .this-cont-game {
               width: 100%;
               height: 100vh;
               display: flex;
               align-items: center;
               flex-direction: column;
               justify-content: space-between;
            }
            .counter-ellipse {
               width: 240px;
               height: 240px;
               border-radius: 50%;
               border: 23px solid hsl(307deg 2% 16% / 20%);
               border-top-color: #242828;
               display: flex;
               align-items: center;
               justify-content: center;
               margin: 0 auto 123px auto;
               animation: spin 1s linear infinite;
            }
            @keyframes spin {
               to {
                  transform: rotate(360deg);
               }
            }
            .counter-el {
               font-weight: bold;
               font-size: 100px;
               font-family: var(--font-odibee-sans);
            }
            .scissor,
            .stone,
            .paper {
               width: 90px;
            }
            .hands {
               width: 100%;
               display: flex;
               justify-content: space-evenly;
            }
            .active-hands {
               height: 157px;
            }
            .actived {
               display: inherit;
               transform: translateY(-30px);
               transition: all 0.5s;
            }
            .disabled {
               opacity: 60%;
               transform: translateY(30px);
               transition: 0.5s;
            }
            .hands-top {
               display: none;
            }
            .actived-hands-top {
               width: 100%;
               height: 157px;
               display: flex;
               justify-content: center;
               transform: rotate(180deg);
            }
            .hand-display-none {
               display: none;
            }
            .actived-hand-top {
               display: flex;
               transform: translateY(-30px);
               transition: all 0.5s;
            }
         `;

         const handsCont = this.querySelector(".hands").children;
         const countdownEl = this.querySelector(".counter-ellipse");
         const handsDiv = this.querySelector(".hands");
         const handsTop = this.querySelector(".hands-top");
         const handScissorTop = this.querySelector(".scissor-top");
         const handStoneTop = this.querySelector(".stone-top");
         const handPaperTop = this.querySelector(".paper-top");

         for (const hands of handsCont) {
            hands.addEventListener("click", () => {
               const type = hands.getAttribute("class");

               if (type == "scissor") {
                  state.setMovePlayers("scissor", userName, rtdbRoomId).then(() => {
                     state.whoWins();
                  });
                  this.activateHands("scissor");
               }
               if (type == "stone") {
                  state.setMovePlayers("stone", userName, rtdbRoomId).then(() => {
                     state.whoWins();
                  });
                  this.activateHands("stone");
               }
               if (type == "paper") {
                  state.setMovePlayers("paper", userName, rtdbRoomId).then(() => {
                     state.whoWins();
                  });
                  this.activateHands("paper");
               }
            });
         }

         const countdown = setInterval(() => {
            const counterEl = this.querySelector(".counter-el");
            counterEl.textContent = String(this.counter);
            this.counter--;

            const {
               namePlayer1,
               namePlayer2,
               movePlayer1,
               movePlayer2,
               chosePlayer1,
               chosePlayer2,
            } = state.getState();

            let moveOpposingPlayer: string;

            if (userName == namePlayer1) {
               moveOpposingPlayer = movePlayer2;
            }
            if (userName == namePlayer2) {
               moveOpposingPlayer = movePlayer1;
            }

            if (this.counter == 0) {
               clearInterval(countdown);
               countdownEl.remove();

               if (chosePlayer1 == true && chosePlayer2 == true) {
                  handsDiv.classList.add("active-hands");
                  handsTop.classList.add("actived-hands-top");

                  if (moveOpposingPlayer == "scissor") {
                     handScissorTop.classList.add("actived-hand-top");
                  }

                  if (moveOpposingPlayer == "stone") {
                     handStoneTop.classList.add("actived-hand-top");
                  }

                  if (moveOpposingPlayer == "paper") {
                     handPaperTop.classList.add("actived-hand-top");
                  }

                  setTimeout(() => {
                     Router.go("/results");
                  }, 1500);
               } else if (chosePlayer1 == false || chosePlayer2 == false) {
                  Router.go("/rules");
               }
            }
         }, 1500);

         this.appendChild(style);
      }

      activateHands(param): void {
         const handsCont = this.querySelector(".hands").children;
         const handScissor = this.querySelector(".scissor");
         const handStone = this.querySelector(".stone");
         const handPaper = this.querySelector(".paper");

         for (const hand of handsCont) {
            hand.classList.add("disabled");
         }

         if (param == "scissor") {
            handScissor.classList.remove("disabled");
            handScissor.classList.add("actived");
            setTimeout(() => {
               handStone.classList.add("hand-display-none");
               handPaper.classList.add("hand-display-none");
            }, 1500);
         }

         if (param == "stone") {
            handStone.classList.remove("disabled");
            handStone.classList.add("actived");
            setTimeout(() => {
               handScissor.classList.add("hand-display-none");
               handPaper.classList.add("hand-display-none");
            }, 1500);
         }

         if (param == "paper") {
            handPaper.classList.remove("disabled");
            handPaper.classList.add("actived");
            setTimeout(() => {
               handScissor.classList.add("hand-display-none");
               handStone.classList.add("hand-display-none");
            }, 1500);
         }
      }
   }
);
