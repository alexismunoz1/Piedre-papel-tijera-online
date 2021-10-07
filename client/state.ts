import { rtdb } from "./rtdb";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";

type movement = "stone" | "paper" | "scissor";

export const state = {
   data: {
      union: false,
   },
   listeners: [],

   getState() {
      return this.data;
   },

   setState(newState): void {
      this.data = newState;
      for (const cb of this.listeners) {
         cb();
      }
      console.log(`I'm the state, i changed:`, this.data);
   },

   subscribe(callback: (any) => any) {
      this.listeners.push(callback);
   },

   suscribeRtdbRoom(rtdbRoomId: string): void {
      const rtdbRoomRef = rtdb.ref(`/gameRooms/rooms/${rtdbRoomId}`);
      rtdbRoomRef.on("value", (snap) => {
         const currentState = state.getState();
         const rtdbPlayer1 = snap.val().player1;
         const rtdbPlayer2 = snap.val().player2;
         const namePlayer1 = rtdbPlayer1.userName;
         const namePlayer2 = rtdbPlayer2.userName;
         const readyPlayer1 = rtdbPlayer1.ready;
         const readyPlayer2 = rtdbPlayer2.ready;

         state.setState({
            ...currentState,
            namePlayer1,
            namePlayer2,
            readyPlayer1,
            readyPlayer2,
         });
      });
   },

   createUser(userName: string): Promise<any> {
      return fetch(`${API_BASE_URL}/singup`, {
         method: "post",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            userName,
         }),
      });
   },

   createRoom(userName: string): Promise<any> {
      return fetch(`${API_BASE_URL}/createroom`, {
         method: "post",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            userName,
         }),
      });
   },

   validateRoomId(roomId: string): Promise<any> {
      return fetch(`${API_BASE_URL}/checkId/${roomId}`, {
         method: "get",
      }).then((res) => res.json());
   },

   verificateUsers(rtdbRoomId: string): Promise<any> {
      return fetch(`${API_BASE_URL}/verifyUser/${rtdbRoomId}`, {
         method: "get",
      }).then((res) => res.json());
   },

   assignNamePlayer2(userName: string, rtdbRoomId: string): Promise<any> {
      return fetch(`${API_BASE_URL}/assignNamePlayer2/${rtdbRoomId}`, {
         method: "post",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            userName,
         }),
      });
   },

   setReady(namePlayer: string, rtdbRoomId: string, ready: boolean): Promise<any> {
      let player: string;
      if (namePlayer == this.data.namePlayer1) {
         player = "player1";
      } else {
         player = "player2";
      }
      return fetch(`${API_BASE_URL}/setReady`, {
         method: "post",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            player,
            rtdbRoomId,
            ready,
         }),
      });
   },
};
