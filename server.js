const express = require("express");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const db = require("./data/helpers/users.js");

const server = express();
server.use(helmet(), express.json());

server.post("/api/register", async (req, res) => {
  try {
    const user = req.body;
    if (user.name && user.password) {
      const hashword = bcrypt.hashSync(user.password, 10);
      user.password = hashword;

      const added = await db.addUser(user);
      console.log(added);
      res.status(201).json(added);
    } else {
      res.status(400).json({ message: "Please provide credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = server;
