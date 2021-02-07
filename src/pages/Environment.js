import React from "react";
import Header from "../components/Header.js";

function Environment(props) {
  console.log(this.props.match.params.id);
  return (
    <div>
      <Header />
    </div>
  );
}

export default Environment;
