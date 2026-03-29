import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { userSchema } from "./users.schema";
import { z } from "zod/v4";

export const CreateUserDTO = createInsertSchema(userSchema, {
  name: (schema) => schema.min(2, "Name is required"),
  email: (schema) => schema.min(2, "Email is required"),
  password: (schema) => schema.min(8, "Min of 8 character")
});

export const UpdateUserDTO = CreateUserDTO.partial();

const baseSchema = createSelectSchema(userSchema);

export const UserResponseSchema = baseSchema.omit({ password: true });

export type UserDTO = z.infer<typeof UserResponseSchema>;
