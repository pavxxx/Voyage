"use client";
import { useEffect, useState } from "react";
import { login } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

/** Inline eye-toggle icon — no external library needed */
function EyeIcon({ open }: { open: boolean }) {
    if (open) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
                className="w-4 h-4">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        );
    }
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
            className="w-4 h-4">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
            <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
    );
}

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Per-field inline errors
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [generalError, setGeneralError] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined" && window.location.search.includes("signup_success=true")) {
            setSignupSuccess(true);
        }
    }, []);

    const clearErrors = () => {
        setEmailError("");
        setPasswordError("");
        setGeneralError("");
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        clearErrors();
        setIsLoading(true);

        try {
            const data = await login(email, password);

            if (data.access_token) {
                localStorage.setItem("token", data.access_token);
                router.push("/dashboard");
            } else {
                // Map server messages to per-field errors
                const msg: string = data.message || "";
                if (msg.toLowerCase().includes("not found") || msg.toLowerCase().includes("user not found")) {
                    setEmailError("No account found with this email address.");
                } else if (
                    msg.toLowerCase().includes("invalid password") ||
                    msg.toLowerCase().includes("incorrect") ||
                    msg.toLowerCase().includes("wrong")
                ) {
                    setPasswordError("Incorrect password. Please try again.");
                } else {
                    setGeneralError(msg || "Login failed. Please try again.");
                }
            }
        } catch {
            setGeneralError("Unable to connect to server. Please try again.");
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

                    {/* Signup success banner */}
                    {signupSuccess && (
                        <div className="mt-4 p-3 bg-sage/10 border border-sage/20 text-sage rounded-lg text-xs leading-relaxed font-medium">
                            ✓ Account created successfully! Please sign in below.
                        </div>
                    )}

                    {/* General error banner */}
                    {generalError && (
                        <div className="mt-4 p-3 bg-danger/10 border border-danger/25 text-danger rounded-lg text-xs leading-relaxed field-error">
                            {generalError}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="mt-6 space-y-3.5" noValidate>

                        {/* Email */}
                        <div>
                            <label className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink/70 mb-1.5">
                                Email
                            </label>
                            <input
                                id="login-email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (emailError) setEmailError("");
                                }}
                                className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/25 transition-all duration-300 ${
                                    emailError ? "border-danger/50" : "border-ink/8"
                                }`}
                            />
                            {emailError && (
                                <p className="mt-1.5 text-[0.65rem] text-danger leading-snug field-error">
                                    {emailError}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink/70">
                                    Password
                                </label>
                                <Link
                                    href="/forgot-password"
                                    className="text-[0.6rem] text-terra hover:underline font-medium transition-colors"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    id="login-password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (passwordError) setPasswordError("");
                                    }}
                                    className={`w-full rounded-lg border bg-white px-4 py-3 pr-10 text-sm text-ink placeholder:text-ink/25 transition-all duration-300 ${
                                        passwordError ? "border-danger/50" : "border-ink/8"
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/35 hover:text-ink/70 transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    tabIndex={-1}
                                >
                                    <EyeIcon open={showPassword} />
                                </button>
                            </div>
                            {passwordError && (
                                <p className="mt-1.5 text-[0.65rem] text-danger leading-snug field-error">
                                    {passwordError}
                                </p>
                            )}
                        </div>

                        <button
                            id="login-submit"
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-lg bg-terra px-4 py-3 font-semibold text-[0.7rem] uppercase tracking-[0.2em] text-ghost transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,123,75,0.25)] hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Signing In..." : "Sign In"}
                        </button>

                    </form>

                    <p className="mt-5 text-center text-[0.65rem] text-ink/50">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-terra hover:underline font-medium">
                            Sign Up
                        </Link>
                    </p>

                </div>

            </div>

        </main>
    );
}