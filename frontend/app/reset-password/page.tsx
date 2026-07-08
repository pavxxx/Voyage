"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/lib/api";
import { useToast } from "@/context/ToastContext";

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

function CheckIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
            className="w-3 h-3">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

function getPasswordStrength(pw: string): number {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
}

function strengthMeta(score: number) {
    if (score <= 2) return { label: "Weak", color: "#E05A47", width: score === 0 ? "0%" : "33%" };
    if (score === 3) return { label: "Medium", color: "#C97B4B", width: "60%" };
    return { label: "Strong", color: "#8CA882", width: "100%" };
}

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { showToast } = useToast();

    const token = searchParams.get("token") || "";

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Redirect if no token
    useEffect(() => {
        if (!token) {
            router.replace("/forgot-password");
        }
    }, [token, router]);

    const reqs = useMemo(() => ({
        length: password.length >= 8,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
    }), [password]);

    const strengthScore = getPasswordStrength(password);
    const strength = strengthMeta(strengthScore);
    const passwordsMatch = confirm.length === 0 || password === confirm;
    const confirmTouched = confirm.length > 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }
        if (password !== confirm) {
            setError("Passwords do not match.");
            return;
        }
        if (!token) {
            setError("Invalid reset link. Please request a new one.");
            return;
        }

        setIsLoading(true);
        try {
            const data = await resetPassword(token, password);
            if (data.message && data.message.toLowerCase().includes("success")) {
                setSuccess(true);
                showToast("Password updated successfully!", "success");
                setTimeout(() => router.push("/login"), 2500);
            } else {
                setError(data.detail || data.message || "Failed to reset password.");
            }
        } catch {
            setError("Unable to connect to server. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="mt-6 p-5 bg-sage/10 border border-sage/25 rounded-xl fade-in">
                <p className="text-sm font-semibold text-sage mb-1">
                    ✓ Password updated
                </p>
                <p className="text-[0.73rem] text-ink/65 leading-relaxed">
                    Your password has been reset successfully.
                    Redirecting to sign in...
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="mt-6 space-y-3.5" noValidate>

            {error && (
                <div className="p-3 bg-danger/10 border border-danger/25 text-danger rounded-lg text-xs leading-relaxed field-error">
                    {error}
                </div>
            )}

            {/* New Password */}
            <div>
                <label className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink/70 mb-1.5">
                    New Password
                </label>
                <div className="relative">
                    <input
                        id="reset-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border border-ink/8 bg-white px-4 py-3 pr-10 text-sm text-ink placeholder:text-ink/25 transition-all duration-300"
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

                {/* Strength bar */}
                {password.length > 0 && (
                    <div className="mt-2.5 space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="text-[0.55rem] uppercase tracking-widest font-semibold text-ink/40">Strength</span>
                            <span className="text-[0.6rem] font-bold uppercase tracking-wider transition-colors duration-300" style={{ color: strength.color }}>
                                {strength.label}
                            </span>
                        </div>
                        <div className="strength-bar-track">
                            <div className="strength-bar-fill" style={{ width: strength.width, backgroundColor: strength.color }} />
                        </div>
                    </div>
                )}

                {/* Requirements */}
                {password.length > 0 && (
                    <div className="mt-3 grid grid-cols-1 gap-1">
                        {[
                            { met: reqs.length, label: "Minimum 8 characters" },
                            { met: reqs.upper, label: "One uppercase letter" },
                            { met: reqs.lower, label: "One lowercase letter" },
                            { met: reqs.number, label: "One number" },
                            { met: reqs.special, label: "One special character" },
                        ].map(({ met, label }) => (
                            <div key={label} className="flex items-center gap-1.5">
                                <span className={`transition-colors duration-300 ${met ? "text-sage" : "text-ink/30"}`}>
                                    {met ? <CheckIcon /> : (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                                            className="w-3 h-3 opacity-40">
                                            <circle cx="12" cy="12" r="8" />
                                        </svg>
                                    )}
                                </span>
                                <span className={`text-[0.6rem] transition-colors duration-300 ${met ? "text-sage" : "text-ink/40"}`}>
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Confirm Password */}
            <div>
                <label className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink/70 mb-1.5">
                    Confirm Password
                </label>
                <div className="relative">
                    <input
                        id="reset-confirm"
                        type={showConfirm ? "text" : "password"}
                        placeholder="••••••••"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        className={`w-full rounded-lg border bg-white px-4 py-3 pr-10 text-sm text-ink placeholder:text-ink/25 transition-all duration-300 ${
                            confirmTouched && !passwordsMatch
                                ? "border-danger/50"
                                : confirmTouched && passwordsMatch
                                ? "border-sage/50"
                                : "border-ink/8"
                        }`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/35 hover:text-ink/70 transition-colors"
                        aria-label={showConfirm ? "Hide password" : "Show password"}
                        tabIndex={-1}
                    >
                        <EyeIcon open={showConfirm} />
                    </button>
                </div>
                {confirmTouched && !passwordsMatch && (
                    <p className="mt-1.5 text-[0.65rem] text-danger leading-snug field-error">
                        Passwords do not match.
                    </p>
                )}
                {confirmTouched && passwordsMatch && (
                    <p className="mt-1.5 text-[0.65rem] text-sage leading-snug field-error flex items-center gap-1">
                        <CheckIcon /> Passwords match.
                    </p>
                )}
            </div>

            <button
                id="reset-submit"
                type="submit"
                disabled={isLoading || (confirmTouched && !passwordsMatch)}
                className="w-full rounded-lg bg-terra px-4 py-3 font-semibold text-[0.7rem] uppercase tracking-[0.2em] text-ghost transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,123,75,0.25)] hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {isLoading ? "Resetting..." : "Reset Password"}
            </button>

        </form>
    );
}

export default function ResetPasswordPage() {
    return (
        <main className="min-h-screen flex bg-ink">

            {/* ── Left Panel ── */}
            <div className="hidden md:flex md:w-[45%] lg:w-1/2 relative bg-ink coord-texture flex-col justify-between p-10 lg:p-14">

                <div className="relative z-10">
                    <Link href="/" className="font-display text-lg tracking-wide text-terra transition-colors hover:text-sand">
                        Voyage
                    </Link>
                </div>

                <div className="relative z-10 max-w-md">
                    <p className="coord-label mb-5">
                        41.9028° N &nbsp; 12.4964° E
                    </p>

                    <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-semibold leading-[1.08] text-sand">
                        Set a new
                        <br />
                        <span className="italic text-sand/55">course</span>
                        <br />
                        forward.
                    </h2>

                    <p className="mt-5 text-[0.8rem] leading-relaxed text-sand/60 max-w-sm">
                        Choose a strong password to secure your Voyage account.
                    </p>
                </div>

                <div className="relative z-10">
                    <p className="coord-label">
                        -8.3405° S &nbsp; 115.0920° E &nbsp; · &nbsp; 13.7563° N &nbsp; 100.5018° E
                    </p>
                </div>
            </div>

            {/* ── Right Panel ── */}
            <div className="w-full md:w-[55%] lg:w-1/2 bg-ghost flex items-center justify-center px-6 py-10 md:px-10 lg:px-16">

                <div className="w-full max-w-sm fade-in">

                    <div className="md:hidden mb-8">
                        <Link href="/" className="font-display text-lg tracking-wide text-terra">
                            Voyage
                        </Link>
                    </div>

                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-terra mb-1.5">
                        Account Recovery
                    </p>

                    <h1 className="font-display text-3xl font-semibold text-ink leading-tight">
                        Choose a new password
                    </h1>

                    <p className="mt-2 text-[0.75rem] text-ink/60">
                        Make it strong. Your link expires in 30 minutes.
                    </p>

                    <Suspense fallback={
                        <div className="mt-6 text-[0.75rem] text-ink/40">Loading...</div>
                    }>
                        <ResetPasswordForm />
                    </Suspense>

                    <p className="mt-5 text-center text-[0.65rem] text-ink/50">
                        Back to{" "}
                        <Link href="/login" className="text-terra hover:underline font-medium">
                            Sign In
                        </Link>
                    </p>

                </div>

            </div>

        </main>
    );
}
