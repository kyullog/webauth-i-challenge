const express = require("express");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const db = require("./data/helpers/users.js");

const server = express();
server.use(helmet(), cookieParser(), express.json());

server.use(
  session({
    name: "notsession",
    secret: "why is there a secret?",
    cookie: {
      maxAge: 60 * 1000,
      secure: true
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false
  })
);

function restricted(req, res, next) {
  if (req.cookies.session === "authorized") {
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
    const user = req.body;
    if (user.name && user.password) {
      const found = await db.findUser(user);
      if (found) {
        const match = bcrypt.compareSync(user.password, found.password);

        if (match) {
          req.session.name = user.name;
          res
            .status(200)
            .cookie("session", "authorized")
            .json({ message: "Logged in!" });
        } else {
          res.status(400).json({ message: "None shall pass!" });
        }
      } else {
        res.status(400).json({ message: "Please provide correct credentials" });
      }
    } else {
      res.status(400).json({ message: "Please provide valid credentials" });
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

module.exports = server;
