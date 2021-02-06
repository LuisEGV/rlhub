import React from "react";
import Card from "./components/Card.js";
import Landing from "./pages/Landing.js";

function App() {
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
