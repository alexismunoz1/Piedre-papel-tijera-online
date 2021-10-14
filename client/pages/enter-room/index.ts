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
            const inputCodeId = document
               .querySelector(".form-input")
               .shadowRoot.querySelector("input").value;

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
            <img-title class="img-title"></img-title>

            <div class="form-cont">
               <input-comp type="text" class="form-input">código</input-comp>
               <button-comp class="form-button">Ingresa a la sala</button-comp>
            </div>

            <div class="hands">
               <hand-scissor></hand-scissor>
               <hand-stone></hand-stone>
               <hand-paper></hand-paper>
            </div>`;
         this.className = "this-const";

         const style = document.createElement("style");

         style.innerText = `
            .this-const {
               display: flex;
               flex-direction: column;
               align-items: center;
               justify-content: center;
               width: 100%;
               position: absolute;
               bottom: 0;
            }
            .img-title {
               width: 284px;
               margin: 0 auto;
            }
            .form-cont {
               display: flex;
               flex-direction: column;
               align-items: center;
            }
            .form-button {
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
