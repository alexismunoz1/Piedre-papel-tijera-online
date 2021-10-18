import * as express from "express";
import { firestore, rtdb } from "./rtdb";
import * as cors from "cors";
import * as path from "path";
import { nanoid } from "nanoid";

const port = process.env.PORT || 3000;
const app = express();
const usersColl = firestore.collection("users");
const roomsColl = firestore.collection("rooms");

app.use(express.json());
app.use(express.static("dist"));
app.use(cors());

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
   usersColl
      .where("userName", "==", userName)
      .get()
      .then((result) => {
         if (result.empty) {
            usersColl
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

//Method to create a new room, generate a complex id
//for the room and also a short id of the room to share
app.post("/createroom", (req, res) => {
   const { userName } = req.body;
   const roomRef = rtdb.ref(`/gameRooms/rooms/${nanoid()}`);
   roomRef
      .set({
         player1: {
            userName,
            score: 0,
            ready: false,
            moveChoise: "none",
            chose: false,
         },
         player2: {
            userName: false,
            score: 0,
            ready: false,
            moveChoise: "none",
            chose: false,
         },
      })
      .then((rtdbRes) => {
         //Method to create a short roomId
         const randomNum = 1000 + Math.floor(Math.random() * 999);
         const roomId = randomNum.toString();
         roomsColl
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

//Method to check the short id of a room
app.get("/checkId/:roomId", (req, res) => {
   const { roomId } = req.params;
   roomsColl
      .doc(roomId.toString())
      .get()
      .then((doc) => {
         return res.status(200).json({
            rtdbRoomId: doc.get("rtdbRoomId"),
            exists: doc.exists,
         });
      });
});

//Method to obtain the data of the two players in the room
app.get("/verifyUser/:rtdbRoomId", (req, res) => {
   const { rtdbRoomId } = req.params;
   const reference = rtdb.ref(`gameRooms/rooms/${rtdbRoomId}`);

   reference.once("value", (snap) => {
      res.status(200).json(snap.val());
   });
});

//Method for naming the second player
app.post("/assignNamePlayer2/:rtdbRoomId", (req, res) => {
   const { rtdbRoomId } = req.params;
   const { userName } = req.body;
   const roomRef = rtdb.ref(`/gameRooms/rooms/${rtdbRoomId}/player2`);
   roomRef.update(
      {
         userName,
      },
      () => {
         res.status(200).json(`Push player name: ${userName}`);
      }
   );
});

//Method to indicate that the player is ready
app.post("/setReady", (req, res) => {
   const { player, rtdbRoomId, ready } = req.body;
   const roomRef = rtdb.ref(`/gameRooms/rooms/${rtdbRoomId}/${player}`);
   roomRef
      .update({
         ready,
      })
      .then(() => {
         res.status(200).json(`ready: ${ready}`);
      });
});

//Method to update the user's move
app.post("/setPlay/:player", (req, res) => {
   const { player } = req.params;
   const { move, rtdbRoomId } = req.body;
   const roomRef = rtdb.ref(`/gameRooms/rooms/${rtdbRoomId}/${player}`);
   roomRef
      .update({
         moveChoise: move,
         chose: true,
      })
      .then(() => {
         res.status(200).json(`The choise was ${move}`);
      });
});

//Method to update player's score
app.post("/setScore/:player", (req, res) => {
   const { player } = req.params;
   const { score, rtdbRoomId } = req.body;
   const roomRef = rtdb.ref(`/gameRooms/rooms/${rtdbRoomId}/${player}`);
   roomRef
      .update({
         score,
      })
      .then(() => {
         res.status(200).json({
            message: `Poin to player: ${player}`,
         });
      });
});

//Method to update who won the round
app.post("/setWinner/:winner", (req, res) => {
   const { winner } = req.params;
   const { rtdbRoomId } = req.body;
   const roomRef = rtdb.ref(`/gameRooms/rooms/${rtdbRoomId}`);
   roomRef
      .update({
         winner,
      })
      .then(() => {
         res.status(200).json({
            message: "Winning set",
         });
      });
});

//Method to update the starting value of the parameters, "moveChoise", "chose" and "ready"
app.post("/backToFalse/:player", (req, res) => {
   const { player } = req.params;
   const { rtdbRoomId } = req.body;
   const roomRef = rtdb.ref(`/gameRooms/rooms/${rtdbRoomId}/${player}`);
   roomRef
      .update({
         moveChoise: "none",
         chose: false,
         ready: false,
      })
      .then(() => {
         res.status(200).json({
            message: "ready and chose, they went back to false",
         });
      });
});

app.get("*", (req, res) => {
   res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, () => {
   console.log(`App running in the port:${port}`);
});
