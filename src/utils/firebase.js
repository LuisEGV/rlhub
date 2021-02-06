import firebase from "firebase";
require("firebase/auth");
require("firebase/storage");
require("firebase/firestore");

var admin = require("firebase-admin");

const firebaseConfig = admin.initializeApp({
  apiKey: "AIzaSyCQGe77t_B0kSRT4uks9ybt0hR2q7ItjaI",
  databaseURL: "https://rlhub-4e357-default-rtdb.firebaseio.com",
  projectId: "rlhub-4e357",
});

const app = firebase.initializeApp(firebaseConfig);
export default app;
