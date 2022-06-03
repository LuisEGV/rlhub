import React from "react";
import Landing from "./pages/Landing.js";
import "firebase/firestore";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Environment from "./pages/Environment.js";
import Register from "./pages/Register.js";
import About from "./pages/About.js";
import Login from "./pages/Login.js";
import GraphPage from "./pages/Graph.js";
import Grid from "./pages/Grid.js";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/rlhub" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
        <Route path="/graph" component={GraphPage} />
        <Route path="/env/:id" component={Environment} />
        <Route path="/grid" component={Grid} />
        <Route exact path="/*" component={Landing} />
      </Switch>
    </Router>
  );
}

export default App;
