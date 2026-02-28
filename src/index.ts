import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/HI", (c) => {
  return c.json({ message: "HI THERE" });
});

export default app;
