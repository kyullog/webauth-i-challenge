import React, { Component } from "react";
import axios from "../axiosCookies";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      message: ""
    };
  }

  changeHandler = e => {
    //keeps whatever is in text inputs in state
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    //create user object to pass to server
    const user = {
      name: this.state.name,
      password: this.state.password
    };
    axios //send post request to register endpoint with user object
      .post(`http://127.0.0.1:2525/api/register`, user)
      .then(res => {
        this.props.updateUsers(); //update user list
        this.props.addToggle();
        this.props.history.push("/users"); //remove add user form
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <input
          name="name"
          type="text"
          placeholder="Username"
          onChange={this.changeHandler}
        />
        <input
          name="password"
          type="text"
          placeholder="Password"
          onChange={this.changeHandler}
        />
        <button type="submit">+</button>
        <p>{this.state.message}</p>
      </form>
    );
  }
}
export default AddUser;
