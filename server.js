const express = require("express");
const app = express();

app.listen(3010);

app.post("/login", (req, res) => {
  console.log("login here!");
  res.send("Take the token: oias9812j");
});
