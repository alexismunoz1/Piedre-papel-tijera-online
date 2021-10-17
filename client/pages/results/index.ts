import { Router } from "@vaadin/router";
import { state } from "../../state";
const resultImages = {
   equality: require("url:../../assets/empate.svg"),
   win: require("url:../../assets/ganaste.svg"),
   loose: require("url:../../assets/perdiste.svg"),
};

customElements.define(
   "results-page",
   class initResultsPage extends HTMLElement {
      connectedCallback() {
         this.render();
      }

      render() {
         const { userName, namePlayer1, namePlayer2, scorePlayer1, scorePlayer2, winner } =
            state.getState();

         let image: string;

         if (winner == "tied game") {
            image = resultImages.equality;
            this.style.backgroundColor = `rgba(106, 112, 101, 0.6)`;
         }
         if (winner == "player1") {
            if (userName == namePlayer1) {
               image = resultImages.win;
               this.style.backgroundColor = `rgba(106, 146, 74, 0.6)`;
            }
            if (userName == namePlayer2) {
               image = resultImages.loose;
               this.style.backgroundColor = `rgba(137, 73, 73, 0.6)`;
            }
         }
         if (winner == "player2") {
            if (userName == namePlayer2) {
               image = resultImages.win;
               this.style.backgroundColor = `rgba(106, 146, 74, 0.6)`;
            }
            if (userName == namePlayer1) {
               image = resultImages.loose;
               this.style.backgroundColor = `rgba(137, 73, 73, 0.6)`;
            }
         }

         this.innerHTML = `
            <img class="img-win" src="${image}">

            <div class="score-cont">
               <h4>Puntuacion</h4>
               <p>${namePlayer1}: ${scorePlayer1}<p>
               <p>${namePlayer2}: ${scorePlayer2}<p>
            </div>
            
            <button-comp class="button-back">Volver a jugar</button-comp>
          `;
         this.className = "this-results";

         const style = document.createElement("style");

         style.innerText = `
            .this-results {
               width: 100%;
               height: 100vh;
               padding: 25px 0;
               display: flex;
               align-items: center;
               flex-direction: column;
               justify-content: space-between;
            }
            .img-win {
               width: 180px;
            }
            .score-cont {
               width: 259px;
               display: flex;
               border-radius: 10px;
               background: #ffffff;
               flex-direction: column;
               border: 10px solid #000000;
               font-family: var(--font-odibee-sans);
            }
            .score-cont > h4 {
               font-size: 55px;
               margin: 0 auto;
            }
            .score-cont > p {
               margin: 0 10px 5px 0;
               font-size: 45px;
               text-align: end;
            }
         `;

         const buttonBack = this.querySelector(".button-back");
         buttonBack.addEventListener("click", (e) => {
            e.preventDefault();

            Router.go("/rules");
         });

         this.appendChild(style);
      }
   }
);
