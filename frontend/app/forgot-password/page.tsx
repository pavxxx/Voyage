"use client";

import { useState } from "react";
import Link from "next/link";
import { forgotPassword } from "@/lib/api";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError("");

        // Basic client-side email validation
        if (!email.includes("@") || !email.includes(".")) {
            setEmailError("Please enter a valid email address.");
            return;
        }

        setIsLoading(true);
        try {
            await forgotPassword(email);
            // Always show success — backend never reveals if email exists
            setSubmitted(true);
        } catch {
            setEmailError("Unable to connect to server. Please try again.");
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
                        27.1751° N &nbsp; 78.0421° E
                    </p>

                    <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-semibold leading-[1.08] text-sand">
                        Lost your
                        <br />
                        <span className="italic text-sand/55">bearings?</span>
                        <br />
                        We&apos;ll help.
                    </h2>

                    <p className="mt-5 text-[0.8rem] leading-relaxed text-sand/60 max-w-sm">
                        Enter the email associated with your account and we&apos;ll
                        send you a secure reset link.
                    </p>
                </div>

                <div className="relative z-10">
                    <p className="coord-label">
                        48.8566° N &nbsp; 2.3522° E &nbsp; · &nbsp; 35.6762° N &nbsp; 139.6503° E
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
                        Account Recovery
                    </p>

                    <h1 className="font-display text-3xl font-semibold text-ink leading-tight">
                        Reset your password
                    </h1>

                    <p className="mt-2 text-[0.75rem] text-ink/60">
                        We&apos;ll send a secure link to your registered email address.
                    </p>

                    {submitted ? (
                        /* ── Success State ── */
                        <div className="mt-6 p-5 bg-sage/10 border border-sage/25 rounded-xl fade-in">
                            <p className="text-sm font-semibold text-sage mb-1">
                                ✓ Reset link sent
                            </p>
                            <p className="text-[0.73rem] text-ink/65 leading-relaxed">
                                If <span className="font-medium text-ink/80">{email}</span> is registered,
                                you&apos;ll receive a password reset link shortly.
                                Check your inbox (and spam folder).
                            </p>
                            <p className="mt-3 text-[0.65rem] text-ink/40">
                                The link expires in 30 minutes.
                            </p>
                        </div>
                    ) : (
                        /* ── Form State ── */
                        <form onSubmit={handleSubmit} className="mt-6 space-y-3.5" noValidate>

                            <div>
                                <label className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink/70 mb-1.5">
                                    Email Address
                                </label>
                                <input
                                    id="forgot-email"
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

                            <button
                                id="forgot-submit"
                                type="submit"
                                disabled={isLoading}
                                className="w-full rounded-lg bg-terra px-4 py-3 font-semibold text-[0.7rem] uppercase tracking-[0.2em] text-ghost transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,123,75,0.25)] hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Sending..." : "Send Reset Link"}
                            </button>

                        </form>
                    )}

                    <p className="mt-5 text-center text-[0.65rem] text-ink/50">
                        Remembered it?{" "}
                        <Link href="/login" className="text-terra hover:underline font-medium">
                            Sign In
                        </Link>
                    </p>

                </div>

            </div>

        </main>
    );
}
