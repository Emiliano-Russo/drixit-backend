import { UserClient } from "./types";

export function list(): UserClient[] {
  return [
    {
      email: "jake@gmail.com",
      password: "1234",
      name: "Jake",
      lastName: "Williams",
      dni: "28984653",
    },
    {
      email: "paul@gmail.com",
      password: "1234",
      name: "Paul",
      lastName: "Jones",
      dni: "30572635",
    },
  ];
}
