import { Hono } from "hono";
import { LoginService } from "./login.service";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const login = new Hono();

const tokenSchema = z.object({
  token: z.string(),
});

login.get("/", async (c) => {
  return c.json(await LoginService.setjwt());
});

login.post("/", zValidator("json", tokenSchema), async (c) => {
  const body = c.req.valid("json");
  const payload = await LoginService.verifyjwt(body.token, "mySecretKey");
  if (!payload) {
    return c.json(
      {
        success: false,
        message: "Session has expired or the token is invalid",
      },
      401,
    );
  }
  return c.json({ success: true, message: "Welcome", user: payload });
});

export default login;
