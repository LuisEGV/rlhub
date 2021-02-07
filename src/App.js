import React from "react";
import Card from "./components/Card.js";
import Landing from "./pages/Landing.js";
import "firebase/firestore";

import app from "./utils/firebase.js";

const db = app.firestore();

let hello = async () => {
  const citiesRef = db.collection("users");
  const snapshot = await citiesRef
    .where("email", "==", "luis.egvillarreal@gmail.com")
    .get();
  if (snapshot.empty) {
    console.log("No matching documents.");
    return;
  }

  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
  console.log(snapshot);
};

function App() {
  hello();
  return (
    <div class="relative bg-white overflow-hidden">
      <Landing />
      <div class="grid grid-cols-3 gap-4">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default App;
