const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config.json");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.listen(config.port);

app.post(config.loginRoute, (req, res) => {
  const user = req.body;
  jwt.sign(user, "secretKey", function name(err, token) {
    res.json({
      jwt: token,
    });
  });
});

app.get(config.userInfo, (req, res) => {
  const token = req.query.token;
  const result = jwt.decode(token);
  res.send(result);
});
