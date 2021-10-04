import { stat } from "fs";
import * as express from "express";
import { firestore, rtdb } from "./rtdb";
import * as cors from "cors";
import * as path from "path";
import { nanoid } from "nanoid";

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

const userCollection = firestore.collection("users");
const roomCollection = firestore.collection("rooms");

// Method to verify the development environment
app.get("/env", (req, res) => {
   res.json({
      enviorment: process.env.NODE_ENV,
   });
});

/*Method to create a new user, if the username entered 
already exists, it will return an error 400*/
app.post("/singup", (req, res) => {
   const { userName } = req.body;
   userCollection
      .where("userName", "==", userName)
      .get()
      .then((result) => {
         if (result.empty) {
            userCollection
               .add({
                  userName,
               })
               .then((newPlayerRef) => {
                  res.status(200).json({
                     id: newPlayerRef.id,
                     new: true,
                  });
               });
         } else {
            res.status(400).json({
               message: "player already exists",
            });
         }
      });
});

//Method to create a new room
app.post("/createroom", (req, res) => {
   const { userName } = req.body;
   const roomRef = rtdb.ref(`/gameRooms/rooms/${nanoid()}`);
   roomRef
      .set({
         player1: {
            userName,
            score: 0,
            ready: false,
            choice: "none",
            chose: false,
            winner: "none",
         },
         player2: {
            userName: false,
            score: 0,
            ready: false,
            choice: "none",
            chose: false,
            winner: "none",
         },
      })
      .then((rtdbRes) => {
         const randomNum = 1000 + Math.floor(Math.random() * 999);
         const roomId = randomNum.toString();
         roomCollection
            .doc(roomId)
            .set({
               rtdbRoomId: roomRef.key,
            })
            .then(() => {});
         res.status(200).json({
            id: roomId,
            rtdbRoomId: roomRef.key,
         });
      });
});

app.get("/checkId/:roomId", (req, res) => {
   const { roomId } = req.params;
   roomCollection
      .doc(roomId.toString())
      .get()
      .then((doc) => {
         return res.status(200).json({
            rtdbRoomId: doc.get("rtdbRoomId"),
            exists: doc.exists,
         });
      });
});

app.get("/verifyUser/:rtdbRoomId", (req, res) => {
   const { rtdbRoomId } = req.params;
   const reference = rtdb.ref(`gameRooms/rooms/${rtdbRoomId}`);

   reference.once("value", (snap) => {
      res.status(200).json(snap.val());
   });
});

app.post("/assignNamePlayer2/:rtdbRoomId", (req, res) => {
   const { rtdbRoomId } = req.params;
   const { userName } = req.body;
   const roomRef = rtdb.ref(`/gameRooms/rooms/${rtdbRoomId}/player2`);
   roomRef
      .update({
         userName,
      })
      .then((res) => {
         res.status(200).json(`Push nombre jugador: ${userName}`);
      });
});

app.get("*", (req, res) => {
   res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, () => {
   console.log(`App running in the port:${port}`);
});
