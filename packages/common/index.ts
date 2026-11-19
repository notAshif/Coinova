import z from "zod";

export const signUpSchema = z.object({
    username: z.string(),
    email: z.email(),
    password: z.string().min(8, { message: "password must be 8 character long." }),
});

export const loginSchema = z.object({
    email: z.email(),
    password: z.string(),
});