const express = require("express");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const db = require("./data/helpers/users.js");

const server = express();
server.use(helmet(), express.json());

server.use(
  session({
    name: "webauth",
    secret: "Don't tell the secret",
    cookie: {
      maxAge: 60 * 1000,
      secure: false
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false
  })
);

function restricted(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res
      .status(400)
      .json({ message: "Please login with authorized credentials" });
  }
}

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

server.post("/api/login", async (req, res) => {
  try {
    let { name, password } = req.body;
    const user = await db.findUser({ name });

    if (user) {
      const passCheck = bcrypt.compareSync(password, user.password);

      if (passCheck) {
        req.session.user = user;
        res.status(200).json({ message: `Welcome ${user.name}` });
      } else {
        res.status(400).json({ message: "Please provide proper credentials" });
      }
    } else {
      res.status(400).json({ message: "Please provide proper credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status({ error: "There was a problem logging you in" });
  }
});

server.get("/api/users", restricted, async (req, res) => {
  try {
    const users = await db.getUsers();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "There was a problem getting the users" });
  }
});

server.get("/api/logout", async (req, res) => {
  try {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res.status(400).json({ message: "Could not logout" });
        } else {
          res.send("Goodbye!");
        }
      });
    }
  } catch (err) {
    res.status(400).json({ message: "There was a problem logging out" });
  }
});

module.exports = server;
