import React from "react";
import Landing from "./pages/Landing.js";
import "firebase/firestore";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Environment from "./pages/Environment.js";
import Register from "./pages/Register.js";
import About from "./pages/About.js";
import Login from "./pages/Login.js";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/rlhub" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
        <Route path="/env/:id" component={Environment} />
        <Route exact path="/*" component={Landing} />
      </Switch>
    </Router>
  );
}

export default App;
