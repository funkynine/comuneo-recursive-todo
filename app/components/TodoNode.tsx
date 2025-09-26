import * as React from "react";
import { AddForm } from "./AddForm";
import type { Todo } from "~/core/types/todo.interface";

export function TodoNode({
    item,
    children,
    onAddSub,
    onToggle,
    onDelete,
}: {
    item: Todo;
    children?: React.ReactNode;
    onAddSub(title: string): void;
    onToggle(next: boolean): void;
    onDelete(): void;
}) {
    const [openAdd, setOpenAdd] = React.useState(false);

    return (
        <li className="my-1">
            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={(e) => onToggle(e.currentTarget.checked)}
                />
                <span className={item.completed ? "text-gray-500 line-through" : ""}>
                    {item.title}
                </span>
                <button onClick={onDelete} className="ml-auto text-sm text-red-600 hover:underline">
                    Delete
                </button>
            </label>

            {!openAdd && (
                <button
                    onClick={() => setOpenAdd(true)}
                    className="mt-1 text-sm text-gray-700 hover:underline"
                >
                    + Add sub-task
                </button>
            )}

            {openAdd && (
                <div className="mt-2">
                    <AddForm
                        onAdd={(t) => {
                            onAddSub(t);
                            setOpenAdd(false);
                        }}
                        placeholder="Sub-task title…"
                    />
                    <button
                        type="button"
                        onClick={() => setOpenAdd(false)}
                        className="text-sm text-gray-600 hover:underline"
                    >
                        Cancel
                    </button>
                </div>
            )}

            {children}
        </li>
    );
}
