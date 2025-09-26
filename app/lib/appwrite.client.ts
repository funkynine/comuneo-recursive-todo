import { Client, Account, Databases, ID, Query } from "appwrite";

interface EnvInterface {
    VITE_APPWRITE_ENDPOINT?: string;
    VITE_APPWRITE_PROJECT_NAME?: string;
    VITE_APPWRITE_PROJECT_ID?: string;
    VITE_APPWRITE_DATABASE_ID?: string;
    VITE_APPWRITE_TODOS_COLLECTION_ID?: string;
}

// TODO: Fix issue with env file (temp solution)
// Safely access environment variables with fallbacks
const env: EnvInterface | ImportMetaEnv = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {
    VITE_APPWRITE_ENDPOINT: 'https://fra.cloud.appwrite.io/v1',
    VITE_APPWRITE_PROJECT_NAME: 'comuneo-recursive-todo',
    VITE_APPWRITE_PROJECT_ID: '68d65c5a0024a7396fd3',
    VITE_APPWRITE_DATABASE_ID: '68d65e370017b055acc0',
    VITE_APPWRITE_TODOS_COLLECTION_ID: 'todo-table-id',
} as EnvInterface;

const ENDPOINT = env.VITE_APPWRITE_ENDPOINT || '';
const PROJECT_ID = env.VITE_APPWRITE_PROJECT_ID || '';
const DATABASE_ID = env.VITE_APPWRITE_DATABASE_ID || '';
const TODOS_COLLECTION_ID = env.VITE_APPWRITE_TODOS_COLLECTION_ID || '';

// Validate required environment variables
if (!ENDPOINT || !PROJECT_ID) {
    console.error("Missing required Appwrite environment variables. Make sure VITE_APPWRITE_ENDPOINT and VITE_APPWRITE_PROJECT_ID are defined.");
}

const client = new Client()
    .setEndpoint(ENDPOINT || "")
    .setProject(PROJECT_ID || "");

export const account = new Account(client);
export const databases = new Databases(client);
export { ID, Query };

export const APPWRITE = {
    DB_ID: DATABASE_ID || "",
    TODOS_ID: TODOS_COLLECTION_ID || "",
};
