import { sign, verify } from "hono/jwt";

export const LoginService = {
  setjwt: async () => {
    const payload = {
      sub: "user123",
      role: "admin",
      exp: Math.floor(Date.now() / 1000) + 60 * 5,
    };
    const secret = "mySecretKey";
    const token = await sign(payload, secret, "HS256");
    return token;
  },

  verifyjwt: async (tokenToVerify: string, secretKey: string) => {
    try {
      const decodedPayload = await verify(tokenToVerify, secretKey, "HS256");
      return decodedPayload;
    } catch (error) {
      console.error("Login Service error: Token invalido o expirado");
      return null;
    }
  },
};
