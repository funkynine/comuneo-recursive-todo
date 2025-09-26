import type { Models } from "node-appwrite";
import { getUsers } from "~/lib/appwrite.server";

export type CreateUserInput = {
    email: string;
    password: string;
    name?: string;
};

function normalizeEmail(email: string) {
    return email.trim().toLowerCase();
}

function mapAppwriteError(err: unknown): Error {
    const e = err as { message?: string; code?: number };
    if (e?.code === 409) return new Error("A user with this email already exists.");

    return new Error(e?.message ?? "Failed to create user");
}

export async function createUser(input: CreateUserInput): Promise<Models.User<Models.Preferences>> {
    const { email, password, name } = input;

    if (!password || password.length < 8) {
        throw new Error("Password must be at least 8 characters long.");
    }

    const users = getUsers();

    try {
        const { ID } = await import("node-appwrite");

        return await users.create(
            ID.unique(),
            normalizeEmail(email),
            name || undefined,
            password,
        );
    } catch (err) {
        throw mapAppwriteError(err);
    }
}
