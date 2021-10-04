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
         const style = document.createElement("style");
         this.innerHTML = `
        <h1 class="title">Piedra <br> Papel o<br>Tijera </h1>

        <div class="button-cont">
            <button class="button__new-game">New game</button>
            <button class="button__enter-room">Enter a room</button>
        </div>`;

         this.appendChild(style);
      }
   }
);
