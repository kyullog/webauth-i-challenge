const db = require("../dbConfig.js");

module.exports = {
  addUser,
  findUser,
  getUsers,
  removeUser
};

function addUser(user) {
  return db("users").insert(user);
}

function findUser(user) {
  return db("users")
    .where({
      name: user.name
    })
    .first();
}

function getUsers() {
  return db("users");
}

function removeUser(id) {
  return db("users")
    .where({ id })
    .del();
}
