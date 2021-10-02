import { Router } from "@vaadin/router";
import { state } from "../../state";

customElements.define(
   "enter-room-page",
   class initEnterRoom extends HTMLElement {
      connectedCallback() {
         this.render();
      }

      render() {
         this.innerHTML = `
        <header class="header"></header>
 
        <main class="main">
           <h1 class="main__title">Soy un titulo</h1>
        </main>
        
        <footer class="footer"></footer>
        `;

         const mainTitle = this.querySelector(".main__title");
         const texto: string = "";

         if (texto == "hola") {
            mainTitle.textContent = `
             Hola, soy otro título.
           `;
         } else if (texto == "chau") {
            mainTitle.textContent = `
             Chau, soy otro título.
          `;
         } else {
            mainTitle.textContent = `
                El título sigue igual.
            `;
         }
      }
   }
);
