import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));

router.setRoutes([
   { path: "/", component: "home-page" },
   { path: "/singup", component: "singup-page" },
   { path: "/enter_room", component: "enter-room-page" },
]);
