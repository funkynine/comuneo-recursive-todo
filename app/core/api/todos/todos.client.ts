import { databases as db, APPWRITE, ID, Query } from "~/lib/appwrite.client";
import type { Todo } from "../../types/todo.interface";

export async function listTodos(ownerId: string) {
    const res = await db.listDocuments<Todo>(APPWRITE.DB_ID, APPWRITE.TODOS_ID, [
        Query.equal("ownerId", ownerId),
        Query.limit(1000),
    ]);
    return res.documents;
}

export async function createTodo(
    ownerId: string,
    title: string,
    parentId: string | null | "" = "",
) {
    return db.createDocument<Todo>(APPWRITE.DB_ID, APPWRITE.TODOS_ID, ID.unique(), {
        title,
        completed: false,
        parentId: parentId ?? "",
        ownerId,
    });
}

export async function updateTodo(
    id: string,
    patch: Partial<Pick<Todo, "title" | "completed" | "parentId">>,
) {
    return db.updateDocument(APPWRITE.DB_ID, APPWRITE.TODOS_ID, id, patch);
}

export async function deleteTodo(id: string) {
    return db.deleteDocument(APPWRITE.DB_ID, APPWRITE.TODOS_ID, id);
}
