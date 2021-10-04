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
         cb(newState);
      }
      console.log(`Cambie, data:`, this.data);
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

   assignNamePlayer2(namePlayer: string, rtdbRoomId: string): Promise<any> {
      return fetch(`${API_BASE_URL}/assignNamePlayer2/${rtdbRoomId}`, {
         method: "post",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            namePlayer,
         }),
      });
   },
};
