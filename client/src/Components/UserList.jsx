import React, { Component } from "react";
import { Route } from "react-router-dom";
import AddUser from "./AddUser";
import DeleteButton from "./DeleteButton";
import axios from "../axiosCookies.js";

class UserList extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      error: "",
      addToggle: false
    };
  }

  fetchData = () => {
    axios
      .get(`http://127.0.0.1:2525/api/users`)
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.fetchData();
  }

  clickHandler = e => {
    this.toggleAddForm();
    this.props.history.push("/users/adduser");
  };

  toggleAddForm = () => {
    this.setState({ addToggle: !this.state.addToggle });
  };

  render() {
    return (
      <div className="app-border">
        <h2>User List</h2>
        <div className="list-wrapper">
          {this.state.users.map(user => {
            return (
              <div className="user-card" key={user.id}>
                <h2>Username: {user.name}</h2>
                <p>Password: {user.password}</p>
                <DeleteButton user={user.id} update={this.fetchData} />
              </div>
            );
          })}
          {!this.state.addToggle && (
            <button onClick={this.clickHandler} children="Add User" />
          )}
          <Route
            path="/users/adduser"
            render={props => (
              <AddUser
                history={props.history}
                updateUsers={this.fetchData}
                addToggle={this.toggleAddForm}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default UserList;
