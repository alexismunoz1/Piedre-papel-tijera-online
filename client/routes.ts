import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));

router.setRoutes([
   { path: "/", component: "home-page" },
   { path: "/singup", component: "singup-page" },
   { path: "/enter_room", component: "enter-room-page" },
   { path: "/share_room_id", component: "share-room-id-page" },
   { path: "/rules", component: "rules-page" },
   { path: "/waiting_room", component: "waiting-room-page" },
   { path: "/play_game", component: "play-game-page" },
]);
