const db = require("../dbConfig.js");

module.exports = {
  addUser,
  findUser
};

function addUser(user) {
  return db("users").insert(user);
}

function findUser(user) {
  return db("users").where({ user });
}
