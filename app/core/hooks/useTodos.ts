import { useState, useEffect } from "react";
import type { Todo } from "~/core/types/todo.interface";
import { createTodo, deleteTodo, listTodos, updateTodo } from "~/core/api/todos/todos.client";
import { collectDescendants } from "~/core/heplers/tree";

export function useTodos(userId: string | null) {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(!!userId);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) {
            setTodos([]);
            setLoading(false);
            return;
        }

        (async () => {
            try {
                setLoading(true);
                setTodos(await listTodos(userId));
            } catch {
                setError("Failed to load todos");
            } finally {
                setLoading(false);
            }
        })();
    }, [userId]);

    async function add(title: string, parentId: string | null = null) {
        if (!userId) return;
        const optimistic = {
            $id: `tmp_${crypto.randomUUID()}`,
            title,
            completed: false,
            parentId: parentId ?? "",
            ownerId: userId,
        } as Todo;

        setTodos((t) => [optimistic, ...t]);

        try {
            const created = await createTodo(userId, title, parentId ?? "");
            setTodos((t) => [created, ...t.filter((x) => x.$id !== optimistic.$id)]);
        } catch {
            setTodos((t) => t.filter((x) => x.$id !== optimistic.$id));
            setError("Failed to add todo");
        }
    }

    async function toggle(id: string, next: boolean) {
        const prev = todos;
        setTodos((t) => t.map((x) => (x.$id === id ? { ...x, completed: next } : x)));
        try {
            await updateTodo(id, { completed: next });
        } catch {
            setTodos(prev);
            setError("Failed to update");
        }
    }

    async function remove(id: string) {
        const ids = collectDescendants(todos, id);
        const prev = todos;
        setTodos((t) => t.filter((x) => !ids.has(x.$id)));
        try {
            for (const del of ids) await deleteTodo(del);
        } catch {
            setTodos(prev);
            setError("Failed to delete");
        }
    }

    return { todos, add, toggle, remove, loading, error, setError };
}
