"use client";
import { useEffect, useState } from "react";
import { login } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined" && window.location.search.includes("signup_success=true")) {
            setSignupSuccess(true);
        }
    }, []);

    const handleLogin = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = await login(
                email,
                password
            );

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
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex bg-ink">

            {/* ── Left Panel — Editorial Dark ── */}
            <div className="hidden md:flex md:w-[45%] lg:w-1/2 relative bg-ink coord-texture flex-col justify-between p-10 lg:p-14">

                <div className="relative z-10">
                    <Link href="/" className="font-display text-lg tracking-wide text-terra transition-colors hover:text-sand">
                        Voyage
                    </Link>
                </div>

                <div className="relative z-10 max-w-md">
                    <p className="coord-label mb-5">
                        51.5074° N &nbsp; 0.1278° W
                    </p>

                    <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-semibold leading-[1.08] text-sand">
                        Every journey
                        <br />
                        <span className="italic text-sand/55">begins with a</span>
                        <br />
                        single step.
                    </h2>

                    <p className="mt-5 text-[0.8rem] leading-relaxed text-sand/60 max-w-sm">
                        Sign in to access your personalized travel recommendations,
                        trip history, and AI-powered planning tools.
                    </p>
                </div>

                <div className="relative z-10">
                    <p className="coord-label">
                        -33.8688° S &nbsp; 151.2093° E &nbsp; · &nbsp; 41.0082° N &nbsp; 28.9784° E
                    </p>
                </div>
            </div>

            {/* ── Right Panel — Ghost White Form ── */}
            <div className="w-full md:w-[55%] lg:w-1/2 bg-ghost flex items-center justify-center px-6 py-10 md:px-10 lg:px-16">

                <div className="w-full max-w-sm fade-in">

                    {/* Mobile Logo */}
                    <div className="md:hidden mb-8">
                        <Link href="/" className="font-display text-lg tracking-wide text-terra">
                            Voyage
                        </Link>
                    </div>

                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-terra mb-1.5">
                        Welcome back
                    </p>

                    <h1 className="font-display text-3xl font-semibold text-ink leading-tight">
                        Sign in to your account
                    </h1>

                    <p className="mt-2 text-[0.75rem] text-ink/60">
                        Continue planning your next adventure with Voyage.
                    </p>

                    {signupSuccess && (
                        <div className="mt-4 p-3 bg-sage/10 border border-sage/20 text-sage rounded-lg text-xs leading-relaxed font-medium">
                            Account created successfully! Please sign in below.
                        </div>
                    )}

                    <form
                        onSubmit={handleLogin}
                        className="mt-6 space-y-3.5"
                    >
                        <div>
                            <label className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink/70 mb-1.5">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                className="w-full rounded-lg border border-ink/8 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/25 transition-all duration-300"
                            />
                        </div>

                        <div>
                            <label className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink/70 mb-1.5">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                className="w-full rounded-lg border border-ink/8 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/25 transition-all duration-300"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-lg bg-terra px-4 py-3 font-semibold text-[0.7rem] uppercase tracking-[0.2em] text-ghost transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,123,75,0.25)] hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </button>

                    </form>

                    <p className="mt-5 text-center text-[0.65rem] text-ink/50">
                        Don&apos;t have an account?{" "}

                        <Link
                            href="/signup"
                            className="text-terra hover:underline font-medium"
                        >
                            Sign Up
                        </Link>
                    </p>

                </div>

            </div>

        </main>
    );
}