import * as React from "react";
import { Form } from "react-router-dom";

export function SignUpForm({ pending, error }: { pending: boolean; error?: string | null }) {
    return (
        <div className="mx-auto my-16 max-w-md font-sans">
            <h1 className="mb-6 text-2xl font-semibold">Sign up</h1>
            <Form method="post" replace className="space-y-4">
                <label className="block">
                    <span className="block text-sm text-gray-600">Email</span>
                    <input
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring"
                    />
                </label>
                <label className="block">
                    <span className="block text-sm text-gray-600">Password</span>
                    <input
                        name="password"
                        type="password"
                        required
                        minLength={8}
                        className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring"
                    />
                </label>
                <button
                    type="submit"
                    disabled={pending}
                    className="w-full rounded-xl bg-black py-2 text-white disabled:opacity-50"
                >
                    {pending ? "Creating..." : "Create account"}
                </button>
            </Form>
            {error && <p className="mt-4 text-red-600">{error}</p>}
        </div>
    );
}
