import { Client, Users, Databases } from "node-appwrite";

export function getServerClient() {
    const client = new Client()
        .setEndpoint(process.env.APPWRITE_ENDPOINT || process.env.VITE_APPWRITE_ENDPOINT || "")
        .setProject(process.env.APPWRITE_PROJECT_ID || process.env.VITE_APPWRITE_PROJECT_ID || "")
        .setKey(process.env.APPWRITE_API_KEY!);
    return client;
}

export function getUsers() {
    return new Users(getServerClient());
}

export function getDatabases() {
    return new Databases(getServerClient());
}
