import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { useAuth } from "~/core/hooks/useAuth";
import { useTodos } from "~/core/hooks/useTodos";
import { AddForm } from "~/components/AddForm";
import { TodoTree } from "~/components/TodoTree";

export default function Index() {
    const nav = useNavigate();
    const { user, loading: authLoading, logout } = useAuth();
    const {
        todos,
        add,
        toggle,
        remove,
        loading: todosLoading,
        error,
        setError,
    } = useTodos(user?.$id ?? null);

    useEffect(() => {
        if (!authLoading && !user) nav("/login", { replace: true });
    }, [authLoading, user, nav]);

    if (authLoading || todosLoading) return <p className="p-6">Loading…</p>;

    return (
        <div className="mx-auto max-w-3xl p-6 font-sans">
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Recursive To-Do</h1>
                <button
                    onClick={() => logout().then(() => nav("/login", { replace: true }))}
                    className="rounded-xl border px-3 py-1"
                >
                    Log out
                </button>
            </div>

            {error && (
                <div className="mb-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-red-700">
                    {error}{" "}
                    <button className="ml-3 underline" onClick={() => setError(null)}>
                        dismiss
                    </button>
                </div>
            )}

            <AddForm onAdd={(title) => add(title, null)} placeholder="Add a task…" />

            <TodoTree
                todos={todos}
                onAdd={(pid, title) => add(title, pid)}
                onToggle={toggle}
                onDelete={remove}
            />
        </div>
    );
}