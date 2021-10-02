import { Router } from "@vaadin/router";
import { state } from "../../state";

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
      }

      render(): void {
         const style = document.createElement("style");
         this.innerHTML = `
        <h1 class="titulo">Piedra <br> Papel o<br>Tijera </h1>

        <div class="button-cont">
            <button class="button__new-game">New game</button>
            <button class="button__enter-room">Enter a room</button>
        </div>`;

         this.appendChild(style);
      }
   }
);
