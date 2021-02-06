import React from "react";
import Card from "./components/Card.js";
import Landing from "./pages/Landing.js";
import "firebase/firestore";

import app from "./utils/firebase.js";

const db = app.firestore();

function App() {
  var citiesRef = db.collection("users");
  console.log(citiesRef);
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
