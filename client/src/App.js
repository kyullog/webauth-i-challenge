import React, { Component } from "react";
import LoginWindow from "./Login/LoginWindow";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginWindow />
      </div>
    );
  }
}

export default App;
