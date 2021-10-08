import * as admin from "firebase-admin";
const serviceAccount = require("./key.json");

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount as any),
   databaseURL: "https://apx-dwf-m6-f5a33-default-rtdb.firebaseio.com/",
   projectId: "apx-dwf-m6-f5a33",
});

const firestore = admin.firestore();
const rtdb = admin.database();

export { firestore, rtdb };
