import React, { Component } from "react";
import { Route } from "react-router-dom";
import LoginWindow from "./Components/Login/LoginWindow";
import UserList from "./Components/UserList";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/login" exact component={LoginWindow} />
        <Route path="/users" component={UserList} />
      </div>
    );
  }
}

export default App;
