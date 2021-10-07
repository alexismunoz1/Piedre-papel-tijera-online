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

            const namePlayer = (<HTMLInputElement>document.querySelector(".form__input-name"))
               .value;

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
