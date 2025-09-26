import { z as zod } from "zod";

export const SignUpSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8, "Password must be at least 8 characters"),
});

export type SignUpInput = zod.infer<typeof SignUpSchema>;
