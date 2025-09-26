import { Client, Account, Databases, ID, Query } from "appwrite";

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export { ID, Query };

export const APPWRITE = {
    DB_ID: import.meta.env.VITE_APPWRITE_DATABASE_ID!,
    TODOS_ID: import.meta.env.VITE_APPWRITE_TODOS_COLLECTION_ID!,
};
