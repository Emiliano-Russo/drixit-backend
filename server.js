require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./routes.json");
const db = require("./users");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.listen(process.env.PORT);

function userExists(user) {
  return db.users.find((u) => u.email == user.email && u.password == user.password);
}

app.post(config.loginRoute, (req, res) => {
  const user = req.body;
  if (!userExists(user)) res.status(401).send("failed login");
  jwt.sign(user, process.env.SECRET_KEY, function name(err, token) {
    res.json({
      jwt: token,
    });
  });
});

app.get(config.userInfo, (req, res) => {
  const token = req.query.token;
  const user = jwt.decode(token);
  return userExists(user) ? res.send(user) : res.status(401).send("invalid token");
});
