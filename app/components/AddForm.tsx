import {type FormEvent, useState} from "react";

export function AddForm({
    onAdd,
    placeholder,
}: {
    onAdd: (title: string) => void;
    placeholder: string;
}) {
    const [title, setTitle] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!title.trim()) return;
        onAdd(title.trim());
        setTitle("");
    }

    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
            className="mb-4 flex gap-2"
        >
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={placeholder}
                className="flex-1 rounded-xl border px-3 py-2 outline-none focus:ring"
            />
            <button type="submit" className="rounded-xl bg-black px-4 py-2 text-white">
                Add
            </button>
        </form>
    );
}
