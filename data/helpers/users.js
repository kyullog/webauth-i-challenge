const db = require("../dbConfig.js");

module.exports = {
  addUser
};

function addUser(user) {
  return db("users").insert(user);
}
