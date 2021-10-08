import { Router } from "@vaadin/router";

customElements.define(
   "home-page",
   class initHomePage extends HTMLElement {
      connectedCallback() {
         this.render();
         const buttonNewGame = this.querySelector(".button__new-game");
         buttonNewGame.addEventListener("click", (e) => {
            e.preventDefault();
            Router.go("/singup");
         });

         const buttonEnterRoom = this.querySelector(".button__enter-room");

         buttonEnterRoom.addEventListener("click", (e) => {
            e.preventDefault();
            Router.go("/enter_room");
         });
      }

      render(): void {
         this.innerHTML = `
            <h1 class="title">Piedra <br> Papel o<br>Tijera </h1>

            <div class="button-cont">
               <button-comp class="button__new-game">New game</button-comp>
               <button class="button__enter-room">Enter a room</button>
            </div>
                  
            <div class="hands">
               <hand-scissor></hand-scissor>
               <hand-stone></hand-stone>
               <hand-paper></hand-paper>
            </div>
         `;

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
