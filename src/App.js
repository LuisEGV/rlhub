import React, { useState, useEffect } from "react";
import Landing from "./pages/Landing.js";
import "firebase/firestore";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Environment from "./pages/Environment.js";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/env:id" component={Environment} />
      </Switch>
    </Router>
  );
}

export default App;
