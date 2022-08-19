const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const config = require("./config.json");
const app = express();

app.use(bodyParser.json());
app.listen(config.port);

app.post(config.loginRoute, (req, res) => {
  const user = req.body;
  jwt.sign(user, "secretKey", function name(err, token) {
    res.json({
      token,
    });
  });
});

app.get(config.userInfo, (req, res) => {
  console.log("user info");
});
