import { z } from "zod";

const userSchema = z.object({
    username: z.string().min(1, "username is required"),
    firstName: z.string().min(1, "firstName is required"),
    lastName: z.string().min(1, "lastName is required"),
    email: z.string().min(1, "email is required").email(),
    role: z.string().min(1, "role is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export { userSchema };