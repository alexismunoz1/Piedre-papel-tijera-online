import { Router } from "@vaadin/router";
import { state } from "../../state";

customElements.define(
   "singup-page",
   class initSingupPage extends HTMLElement {
      connectedCallback() {
         const { rtdbRoomId } = state.getState() as { rtdbRoomId: string };

         if (rtdbRoomId != undefined) {
            state.suscribeRtdbRoom(rtdbRoomId);
         }

         this.render();

         const buttonStart = this.querySelector(".form__button");

         buttonStart.addEventListener("click", (e) => {
            e.preventDefault();

            const namePlayer = document
               .querySelector(".form__input-name")
               .shadowRoot.querySelector("input").value;

            state.createUser(namePlayer).then(() => {
               const union: boolean = state.getState().union;

               if (union == false) {
                  state.createRoom(namePlayer).then((res) => {
                     res.json().then((newRoomRes) => {
                        const currentState = state.getState();
                        const roomId = newRoomRes.id;
                        const { rtdbRoomId } = newRoomRes;

                        state.setState({
                           ...currentState,
                           userName: namePlayer,
                           roomId,
                           rtdbRoomId,
                        });

                        state.suscribeRtdbRoom(rtdbRoomId);
                        Router.go("/share_room_id");
                     });
                  });
               } else if (union == true) {
                  state.verificateUsers(rtdbRoomId).then((verifyRes) => {
                     const namePlayer1 = verifyRes.player1.userName;
                     const namePlayer2 = verifyRes.player2.userName;

                     if (namePlayer2 == false && namePlayer != namePlayer1) {
                        state.assignNamePlayer2(namePlayer, rtdbRoomId).then(() => {
                           const currentState = state.getState();

                           state.setState({
                              ...currentState,
                              userName: namePlayer,
                           });

                           Router.go("/rules");
                        });
                     } else if (namePlayer == namePlayer1 || namePlayer == namePlayer2) {
                        const currentState = state.getState();

                        state.setState({
                           ...currentState,
                           userName: namePlayer,
                        });

                        Router.go("/rules");
                     } else if (namePlayer != namePlayer1 || namePlayer != namePlayer2) {
                        console.log("El nombre no coincide con el de ninguno de los dos jugadores");
                     }
                  });
               }
            });
         });
      }

      render(): void {
         this.innerHTML = `
            <img-title class="img-title"></img-title>
            
            <form class="form__cont">
                <input-comp type="text" class="form__input-name">Tu nombre</input-comp>
                <button-comp class="form__button">Empezar</button-comp>
            </form>

            <div class="hands">
               <hand-scissor></hand-scissor>
               <hand-stone></hand-stone>
               <hand-paper></hand-paper>
            </div>
         `;
         this.className = "this-const";

         const style = document.createElement("style");
         style.innerText = `
            .this-const {
               width: 100%;
               position: absolute;
               bottom: 0;
               text-align: center;
            }
            .img-title {
               width: 284px;
               margin: 0 auto;
            }
            .form__cont {
               display: flex;
               flex-direction: column;
               align-items: center;
            }
            .form__button {
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
