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
    axios
      .post(`http://127.0.0.1:2525/api/login`, user)
      .then(res => {
        if (res.status === 200) {
          this.props.history.push("/users");
        } else {
          this.setState({ message: res.data.message });
        }
      })
      .catch(err => this.setState({ message: err.message }));
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
            placeholder="Username"
          />
          <input
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.changeHandler}
            placeholder="Password"
          />
          <button type="submit">Submit</button>
          <p>{this.state.message}</p>
        </form>
      </div>
    );
  }
}

export default LoginWindow;
