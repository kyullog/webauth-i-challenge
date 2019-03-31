import React, { Component } from "react";
import axios from "../axiosCookies.js";

class UserList extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      error: ""
    };
  }

  async componentDidMount() {
    axios
      .get(`http://127.0.0.1:2525/api/users`)
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        {this.state.users.map(user => {
          return (
            <div className="user-card" key={user.id}>
              <h2>{user.name}</h2>
              <p>{user.password}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default UserList;
