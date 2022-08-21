require("dotenv").config();
import express from "express";
import { UserClient, UserDto } from "./types";
import jwt from "jsonwebtoken";
import { list } from "./users";
import bodyParser from "body-parser";
import cors from "cors";
import { routes } from "./routes";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.listen(process.env.PORT);

function getUser(userDto: UserDto): UserClient | undefined {
  const users = list();
  return users.find((u: UserClient) => u.email == userDto.email && u.password == userDto.password);
}

app.post(routes.loginRoute, (req, res) => {
  const userDto = req.body;
  const secretKey: jwt.Secret = process.env.SECRET_KEY ? process.env.SECRET_KEY : "secret";
  if (!getUser(userDto)) res.status(401).send("failed login");
  jwt.sign(userDto, secretKey, (err: Error | null, encoded: string | undefined) => {
    res.json({
      jwt: encoded,
    });
  });
});

app.get(routes.userInfo, (req, res) => {
  const token: string = req.query.token as string;
  const userDto: UserDto = jwt.decode(token) as UserDto;
  const user = getUser(userDto);
  return user ? res.send(user) : res.status(401).send("invalid token");
});
