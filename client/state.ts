import { user } from "firebase-functions/v1/auth";
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

   initLocalStorage() {
      const localData = JSON.parse(localStorage.getItem("data"));
      console.log(localData, "mostrar local data");
      if (localData != null) {
         this.setState({
            ...localData,
         });
         const { rtdbRoomId } = state.getState();
         this.suscribeRtdbRoom(rtdbRoomId);
      }
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
         const chosePlayer1 = rtdbPlayer2.chose;
         const chosePlayer2 = rtdbPlayer2.ready;
         const movePlayer1 = rtdbPlayer1.moveChoise;
         const movePlayer2 = rtdbPlayer2.moveChoise;
         const scorePlayer1 = rtdbPlayer1.score;
         const scorePlayer2 = rtdbPlayer2.score;
         const { winner } = snap.val();

         state.setState({
            ...currentState,
            namePlayer1,
            namePlayer2,
            readyPlayer1,
            readyPlayer2,
            chosePlayer1,
            chosePlayer2,
            movePlayer1,
            movePlayer2,
            scorePlayer1,
            scorePlayer2,
            winner,
         });

         const afterUpgrade = state.getState();
         localStorage.setItem(
            "data",
            JSON.stringify({
               ...afterUpgrade,
            })
         );
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

   setReadyPlayers(namePlayer: string, rtdbRoomId: string, ready: boolean): Promise<any> {
      const { namePlayer1, namePlayer2 } = state.getState();
      let player: string;
      if (namePlayer == namePlayer1) {
         player = "player1";
      }
      if (namePlayer == namePlayer2) {
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

   setMovePlayers(move: movement, player: string, rtdbRoomId: string): Promise<any> {
      const { userName, namePlayer1, namePlayer2, movePlayer1, movePlayer2 } = state.getState();
      if (userName == namePlayer1) {
         player = "player1";
      }
      if (userName == namePlayer2) {
         player = "player2";
      }

      return fetch(`${API_BASE_URL}/setPlay/${player}`, {
         method: "post",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            move,
            rtdbRoomId,
         }),
      });
   },

   whoWins() {
      const { chosePlayer1, chosePlayer2, movePlayer1, movePlayer2, rtdbRoomId } = state.getState();
      let { scorePlayer1, scorePlayer2 } = state.getState();

      if (chosePlayer1 == true && chosePlayer2 == true) {
         if (movePlayer1 == movePlayer2) {
            // Tied game
            this.setWinerRtdb("tied game", rtdbRoomId);
         }
         if (
            // Player 1 wins
            (movePlayer1 == "scissor" && movePlayer2 == "paper") ||
            (movePlayer1 == "stone" && movePlayer2 == "scissor") ||
            (movePlayer1 == "paper" && movePlayer2 == "stone")
         ) {
            scorePlayer1 = scorePlayer1 + 1;

            this.setScoreRtdb("player1", scorePlayer1, rtdbRoomId);
            this.setWinerRtdb("player1", rtdbRoomId);
         }
         if (
            // Player 2 wins
            (movePlayer2 == "scissor" && movePlayer1 == "paper") ||
            (movePlayer2 == "stone" && movePlayer1 == "scissor") ||
            (movePlayer2 == "paper" && movePlayer1 == "stone")
         ) {
            scorePlayer2 = scorePlayer2 + 1;

            this.setScoreRtdb("player2", scorePlayer2, rtdbRoomId);
            this.setWinerRtdb("player2", rtdbRoomId);
         }
      }
   },

   setScoreRtdb(player: string, score: number, rtdbRoomId: string): void {
      fetch(`${API_BASE_URL}/setScore/${player}`, {
         method: "post",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            rtdbRoomId,
            score,
         }),
      });
   },

   setWinerRtdb(winner: string, rtdbRoomId: string): void {
      fetch(`${API_BASE_URL}/setWinner/${winner}`, {
         method: "post",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            rtdbRoomId,
         }),
      });
   },

   backToFalse(player: string): Promise<any> {
      const { userName, namePlayer1, namePlayer2, rtdbRoomId } = state.getState();
      if (userName == namePlayer1) {
         player = "player1";
      }
      if (userName == namePlayer2) {
         player = "player2";
      }
      return fetch(`${API_BASE_URL}/backToFalse/${player}`, {
         method: "post",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            rtdbRoomId,
         }),
      });
   },
};
