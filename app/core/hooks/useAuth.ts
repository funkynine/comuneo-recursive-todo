import { useState, useCallback, useEffect } from "react";
import { account } from "~/lib/appwrite.client";

export type AuthState = {
    user: { $id: string; email?: string } | null;
    loading: boolean;
    error: string | null;
    login(email: string, password: string): Promise<void>;
    logout(): Promise<void>;
    refresh(): Promise<void>;
};

export function useAuth(): AuthState {
    const [user, setUser] = useState<AuthState["user"]>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refresh = useCallback(async () => {
        try {
            const me = await account.get();
            setUser({ $id: me.$id, email: (me as any).email });
            setError(null);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void refresh();
    }, [refresh]);

    const login = useCallback(
        async (email: string, password: string) => {
            setError(null);

            const createSession = account.createEmailPasswordSession;
            await createSession.call(account, email, password);
            await refresh();
        },
        [refresh],
    );

    const logout = useCallback(async () => {
        await account.deleteSession("current");
        setUser(null);
    }, []);

    return { user, loading, error, login, logout, refresh };
}
