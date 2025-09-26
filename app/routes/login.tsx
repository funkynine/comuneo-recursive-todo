import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { LoginForm } from "~/components/LoginForm";
import { useAuth } from "~/core/hooks/useAuth";

export default function LoginRoute() {
    const nav = useNavigate();
    const { login } = useAuth();
    const [err, setErr] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErr(null);
        setLoading(true);
        const form = new FormData(e.currentTarget);

        try {
            await login(String(form.get("email") || ""), String(form.get("password") || ""));
            nav("/", { replace: true });
        } catch (e: any) {
            setErr(e?.message ?? "Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="px-4">
            <LoginForm pending={loading} error={err} onSubmit={onSubmit} />
            <p className="text-center">
                No account?{" "}
                <Link to="/signup" className="text-blue-600 hover:underline">
                    Create one
                </Link>
            </p>
        </div>
    );
}
