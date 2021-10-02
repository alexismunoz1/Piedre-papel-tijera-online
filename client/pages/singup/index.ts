import { Router } from "@vaadin/router";
import { state } from "../../state";

customElements.define(
   "singup-page",
   class initSingupPage extends HTMLElement {
      connectedCallback() {
         this.render();

         const buttonStart = this.querySelector(".form__button");
         buttonStart.addEventListener("click", (e) => {
            e.preventDefault();

            const inputNamePlayer = (<HTMLInputElement>document.querySelector(".form__input-name"))
               .value;
            state.createUser(inputNamePlayer).then(() => {
               const union: boolean = state.getState().union;
               if (union == false) {
                  state.createRoom(inputNamePlayer).then((res) => {
                     res.json().then((newRoomRes) => {
                        const currentState = state.getState();
                        const roomId = newRoomRes.id;
                        const rtdbRoomId = newRoomRes.rtdbRoomId;

                        console.log("Se ha creado una sala");
                        console.log("roomId:", roomId);
                        console.log("rtdbRoomId:", rtdbRoomId);

                        
                     });
                  });
               }
            });
         });
      }

      render(): void {
         const style = document.createElement("style");

         this.innerHTML = `
            <h1 class="titulo">Piedra <br> Papel o<br>Tijera </h1>
            
            <form class="form__cont">
                <p class="form__text">Your name</p>
                <input type="text" class="form__input-name" placeholder="name" />
                <button class="form__button">Start</button>
            </form>
          `;

         this.appendChild(style);
      }
   }
);
