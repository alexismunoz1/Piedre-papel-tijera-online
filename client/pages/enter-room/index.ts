import { Router } from "@vaadin/router";
import { state } from "../../state";

customElements.define(
   "enter-room-page",
   class initEnterRoom extends HTMLElement {
      connectedCallback() {
         this.render();

         const buttonCode = this.querySelector(".form-button");

         buttonCode.addEventListener("click", (e) => {
            const currentState = state.getState();
            const inputCodeId = (<HTMLInputElement>document.querySelector(".form-input")).value;

            state.validateRoomId(inputCodeId).then((res) => {
               if (res.exists == true) {
                  state.setState({
                     ...currentState,
                     union: res.exists,
                     roomId: inputCodeId,
                     rtdbRoomId: res.rtdbRoomId,
                  });

                  Router.go("/singup");
               } else {
                  state.setState({
                     ...currentState,
                     union: res.exists,
                  });
               }
            });
         });
      }

      render(): void {
         this.innerHTML = `
            <h1 class="title">Piedra <br> Papel o<br>Tijera </h1>

            <div class="form-cont">
               <input type="text" class="form-input" placeholder="codigo" />
               <button class="form-button">Ingresa a la sala</button>
            </div>
         `;
      }
   }
);
