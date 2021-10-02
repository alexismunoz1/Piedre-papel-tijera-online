import firebase from "firebase";

firebase.initializeApp({
   apiKey: "gGIavhQVEtTs8C7fxELxJLEkyvBFvZ2vgjfSO0xx",
   databaseURL: "https://apx-dwf-m6-f5a33-default-rtdb.firebaseio.com/",
   authDomain: "apx-dwf-m6-f5a33.firebaseapp.com",
});

const rtdb = firebase.database();

export { rtdb };
