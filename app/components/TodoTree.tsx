import * as React from "react";
import { TodoNode } from "./TodoNode";
import { groupByParent, parentKey } from "~/core/heplers/tree";
import type { Todo } from "~/core/types/todo.interface";

interface TodoTreeProps {
    todos: Todo[];
    onAdd(parentId: string | null, title: string): void;
    onToggle(id: string, next: boolean): void;
    onDelete(id: string): void;
}

export function TodoTree({
    todos,
    onAdd,
    onToggle,
    onDelete,
}: TodoTreeProps) {
    const byParent = React.useMemo(() => groupByParent(todos), [todos]);

    function renderList(pid: string | null, level = 0) {
        const items = byParent.get(parentKey(pid)) ?? [];
        if (!items.length) return null;

        return (
            <ul
                className={
                    level === 0 ? "list-none pl-0" : "ml-2 list-none border-l border-gray-200 pl-4"
                }
            >
                {items.map((item) => (
                    <TodoNode
                        key={item.$id}
                        item={item}
                        onAddSub={(title) => onAdd(item.$id, title)}
                        onToggle={(next) => onToggle(item.$id, next)}
                        onDelete={() => onDelete(item.$id)}
                    >
                        {renderList(item.$id, level + 1)}
                    </TodoNode>
                ))}
            </ul>
        );
    }

    return renderList(null, 0);
}
