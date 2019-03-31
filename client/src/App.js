import React, { Component } from "react";
import { Route } from "react-router-dom";
import LoginWindow from "./Components/Login/LoginWindow";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/login" exact component={LoginWindow} />
      </div>
    );
  }
}

export default App;
