import React from "react";
import axios from "../axiosCookies";

const DeleteButton = props => {
  const deleteUser = () => {
    const id = props.user;
    axios
      .delete(`http://127.0.0.1:2525/api/remove/${id}`)
      .then(res => props.update())
      .catch(err => console.log(err));
  };

  return <button onClick={deleteUser}>Remove User</button>;
};

export default DeleteButton;
