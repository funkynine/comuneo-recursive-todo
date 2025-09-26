import type { Todo } from "~/core/types/todo.interface";

export function parentKey(pid: string | null | "" | undefined) {
    return pid === null || pid === undefined || pid === "" ? "" : pid;
}

export function groupByParent(todos: Todo[]) {
    const mapTodos = new Map<string | "", Todo[]>();
    for (const todo of todos) {
        const key = parentKey(todo.parentId);
        if (!mapTodos.has(key)) mapTodos.set(key, []);
        mapTodos.get(key)!.push(todo);
    }
    for (const arr of mapTodos.values()) arr.sort((a, b) => a.title.localeCompare(b.title));
    return mapTodos;
}

export function collectDescendants(all: Todo[], rootId: string) {
    const byParent = groupByParent(all);
    const acc = new Set<string>();
    const dfs = (id: string) => {
        acc.add(id);
        for (const element of byParent.get(id) ?? []) dfs(element.$id);
    };
    dfs(rootId);
    return acc;
}
