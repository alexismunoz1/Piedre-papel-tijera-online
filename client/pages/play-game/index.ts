import { Router } from "@vaadin/router";
import { state } from "../../state";

customElements.define(
   "play-game-page",
   class initPlayGamePage extends HTMLElement {
      connectedCallback() {
         this.render();
      }

      render(): void {
         let counter = 3;

         this.innerHTML = `
            <h1>Play game page<h1>

            <div class="counter-el">${counter}</div>
            
            <div class="hands">
               <hand-scissor></hand-scissor>
               <hand-stone></hand-stone>
               <hand-paper></hand-paper>
            </div>
         `;

         const countdown = setInterval(() => {
            counter--;
            const counterEl = this.querySelector(".counter-el");
            counterEl.textContent = String(counter);

            if (counter < 0) {
               clearInterval(countdown);
               Router.go("/rules");
            }
         }, 1000);

         const style = document.createElement("style");
         style.innerText = `
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
