import { Hono } from "hono";
import { UserService } from "./users.service";
const users = new Hono();

users.get("/", async (c) => {
  const users = await UserService.getAll();
  return c.json(users);
});

users.get("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const user = await UserService.getOne(id);
  return c.json(user);
});

users.post("/", async (c) => {
  const user = await c.req.json();
  return c.json(await UserService.create(user));
});

users.put("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const user = await c.req.json();
  console.log(id);
  console.log(user);
  return c.json({ message: "Hi from put method" });
});

users.delete("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const user = await UserService.delete(id);
  console.log(user);
  return c.json({ message: "User deleted succesfully" });
});

export default users;
