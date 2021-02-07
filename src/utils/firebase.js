import firebase from "firebase";
require("firebase/auth");
require("firebase/storage");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyCQGe77t_B0kSRT4uks9ybt0hR2q7ItjaI",
  authDomain: "rlhub-4e357.firebaseapp.com",
  projectId: "rlhub-4e357",
  storageBucket: "rlhub-4e357.appspot.com",
  messagingSenderId: "636588444453",
  appId: "1:636588444453:web:e3edcfea8b735243e9e8cc",
  measurementId: "G-13XPJNX2Q4",
};

const app = firebase.initializeApp(firebaseConfig);
export default app;
