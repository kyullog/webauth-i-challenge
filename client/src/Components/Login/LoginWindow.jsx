import React, { Component } from "react";

import axios from "../../axiosCookies.js";

class LoginWindow extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      message: ""
    };
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    const user = {
      name: this.state.name,
      password: this.state.password
    };
    cookieCar
      .post(`http://127.0.0.1:2525/api/login`, user)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <h2>Please Log In</h2>
        <form onSubmit={this.submitHandler}>
          <input
            type="text"
            value={this.state.name}
            name="name"
            onChange={this.changeHandler}
          />
          <input
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.changeHandler}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default LoginWindow;
