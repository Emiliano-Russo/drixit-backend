const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config.json");
const db = require("./users");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.listen(config.port);

function userExists(user) {
  return db.users.find((u) => u.email == user.email && u.password == user.password);
}

app.post(config.loginRoute, (req, res) => {
  const user = req.body;
  if (!userExists(user)) res.status(401).send("failed login");
  jwt.sign(user, "secretKey", function name(err, token) {
    res.json({
      jwt: token,
    });
  });
});

app.get(config.userInfo, (req, res) => {
  const token = req.query.token;
  const user = jwt.decode(token);
  if (!userExists(user)) res.status(401).send("invalid token");
  else res.send(user);
});
