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
            <img-title class="img-title"></img-title>

            <div class="button-cont">
               <button-comp class="button__new-game">New game</button-comp>
               <button-comp class="button__enter-room">Enter a room</button-comp>
            </div>
                  
            <div class="hands">
               <hand-scissor></hand-scissor>
               <hand-stone></hand-stone>
               <hand-paper></hand-paper>
            </div>
         `;
         this.className = "this-cont";

         const style = document.createElement("style");

         style.innerText = `
            .this-cont {
               display: flex;
               flex-direction: column;
               justify-content: center;
            }
            .img-title{
               width: 284px;
               margin: 0 auto 56px auto;
            }
            .button-cont {
               display: flex;
               flex-direction: column; 
            }
            .button__enter-room {
               margin: 20px 0 39px 0;
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
