import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [
            remix(), 
            tsconfigPaths()
        ],
        define: {
            'import.meta.env': JSON.stringify({
                MODE: mode,
                DEV: mode === 'development',
                PROD: mode === 'production',

                VITE_APPWRITE_ENDPOINT: env.VITE_APPWRITE_ENDPOINT || '',
                VITE_APPWRITE_PROJECT_ID: env.VITE_APPWRITE_PROJECT_ID || '',
                VITE_APPWRITE_DATABASE_ID: env.VITE_APPWRITE_DATABASE_ID || '',
                VITE_APPWRITE_TODOS_COLLECTION_ID: env.VITE_APPWRITE_TODOS_COLLECTION_ID || '',
            }),
        }
    };
});
