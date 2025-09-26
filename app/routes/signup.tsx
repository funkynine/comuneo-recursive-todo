import * as React from "react";
import { type ActionFunctionArgs, redirect } from "react-router";
import { useActionData, useNavigation, Link } from "react-router-dom";
import { SignUpSchema } from "~/core/auth/validation.shemas";
import { SignUpForm } from "~/components/SighUpForm";
import { createUser } from "~/core/api/user/user.server";

type ActionData = { ok: true } | { ok: false; error?: string };

export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData();
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");
    const parsed = SignUpSchema.safeParse({ email, password });

    if (!parsed.success)
        return {
            ok: false,
            error: "Invalid input",
        } as ActionData;

    try {
        await createUser({ email, password });
        return redirect("/login");
    } catch (e: any) {
        return {
            ok: false,
            error: e?.message ?? "Sign up failed",
        } as ActionData;
    }
}

export default function SignUpRoute() {
    const data = useActionData<ActionData>();
    const nav = useNavigation();
    const err = data && "ok" in data && !data.ok ? (data.error ?? null) : null;

    return (
        <div className="px-4">
            <SignUpForm pending={nav.state === "submitting"} error={err} />
            <p className="text-center">
                Already have an account?
                <Link to="/login" className="text-blue-600 hover:underline">
                    Log in
                </Link>
            </p>
        </div>
    );
}
