import { Hono } from "hono";
const users = new Hono();

users.get("/", c => {
  return c.json("Hello World");
});

export default users;
