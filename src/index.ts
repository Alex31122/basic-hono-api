import { Hono } from "hono";
import users from "./modules/users/users.routes";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/HI", (c) => {
  return c.json({ message: "HI THERE" });
});

app.post("/", async (c) => {
  return await c.req.json();
});

app.route("/users", users);

export default app;
