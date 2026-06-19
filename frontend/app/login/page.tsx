"use client";
import { useState } from "react";
import { login } from "@/lib/api";
import { useRouter } from "next/navigation";
export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            const data = await login(
                email,
                password
            );

            console.log(data);

            if (data.access_token) {

                localStorage.setItem(
                    "token",
                    data.access_token
                );

                router.push("/dashboard");

            } else {

                alert(
                    data.message ||
                    "Login failed"
                );

            }

        } catch (error) {

            console.error(error);

            alert("Server error");

        }
    };

    return (
        <main className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 p-8">

                <h1 className="mb-2 text-3xl font-bold text-white">
                    Welcome Back
                </h1>

                <p className="mb-8 text-zinc-400">
                    Sign in to your Smart Travel Companion account.
                </p>

                <form
                    onSubmit={handleLogin}
                    className="space-y-4"
                >

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="w-full rounded-xl border border-zinc-700 bg-black p-4 text-white"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="w-full rounded-xl border border-zinc-700 bg-black p-4 text-white"
                    />

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-orange-500 p-4 font-semibold text-black transition hover:bg-orange-400"
                    >
                        Login
                    </button>

                </form>

            </div>
        </main>
    );
}