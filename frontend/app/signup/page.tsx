"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

/** Eye icon — inline SVG, no external dep */
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

/** Check icon for requirements */
function CheckIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
            className="w-3 h-3">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

/** Circle icon for unmet requirements */
function CircleIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
            className="w-3 h-3 opacity-40">
            <circle cx="12" cy="12" r="8" />
        </svg>
    );
}

/** Compute password strength score 0–5 */
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

/** Strength label + color */
function strengthMeta(score: number) {
    if (score <= 1) return { label: "Weak", color: "#E05A47", width: "20%" };
    if (score <= 2) return { label: "Weak", color: "#E05A47", width: "33%" };
    if (score === 3) return { label: "Medium", color: "#C97B4B", width: "60%" };
    if (score === 4) return { label: "Strong", color: "#8CA882", width: "80%" };
    return { label: "Strong", color: "#8CA882", width: "100%" };
}

export default function SignupPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        budget: "Budget",
        travel_style: "Solo",
        food_score: 3,
        adventure_score: 3,
        culture_score: 3,
        shopping_score: 3,
    });

    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [loading, setLoading] = useState(false);

    // Per-field errors
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmError, setConfirmError] = useState("");
    const [generalError, setGeneralError] = useState("");

    // Password requirement checks
    const reqs = useMemo(() => ({
        length: form.password.length >= 8,
        upper: /[A-Z]/.test(form.password),
        lower: /[a-z]/.test(form.password),
        number: /[0-9]/.test(form.password),
        special: /[^A-Za-z0-9]/.test(form.password),
    }), [form.password]);

    const strengthScore = getPasswordStrength(form.password);
    const strength = strengthMeta(strengthScore);

    // Confirm match
    const passwordsMatch = confirmPassword === "" || form.password === confirmPassword;
    const confirmTouched = confirmPassword.length > 0;
    const bothMatch = form.password === confirmPassword && confirmPassword.length > 0;

    // Disable Create Account if passwords don't match (when confirm is filled)
    const submitDisabled =
        loading ||
        (confirmTouched && !bothMatch);

    const update = (key: string, value: string | number) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Clear errors
        setEmailError("");
        setPasswordError("");
        setConfirmError("");
        setGeneralError("");

        // Client-side validation
        if (!form.email.includes("@")) {
            setEmailError("Please enter a valid email address.");
            return;
        }
        if (form.password.length < 8) {
            setPasswordError("Password must be at least 8 characters.");
            return;
        }
        if (form.password !== confirmPassword) {
            setConfirmError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok) {
                router.push("/login?signup_success=true");
            } else {
                const detail: string = data.detail || data.message || "";
                if (detail.toLowerCase().includes("email") || detail.toLowerCase().includes("already")) {
                    setEmailError("This email is already registered. Try signing in.");
                } else {
                    setGeneralError(detail || "Signup failed. Please try again.");
                }
            }
        } catch {
            setGeneralError("Something went wrong. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    const Slider = ({ label, keyName, value }: { label: string; keyName: string; value: number }) => (
        <div className="space-y-1.5">
            <div className="flex justify-between text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-ink/75">
                <span>{label}</span>
                <span className="font-mono text-terra font-bold">{value}</span>
            </div>
            <input
                type="range"
                min={1}
                max={5}
                value={value}
                onChange={(e) => update(keyName, Number(e.target.value))}
                className="w-full h-1 bg-ink/10 rounded-lg appearance-none cursor-pointer accent-terra focus:outline-none"
            />
        </div>
    );

    return (
        <main className="min-h-screen flex bg-ink">

            {/* ── Left Panel — Editorial Dark ── */}
            <div className="hidden md:flex md:w-[40%] lg:w-[45%] xl:w-1/2 relative bg-ink coord-texture flex-col justify-between p-10 lg:p-14">

                <div className="relative z-10">
                    <Link href="/" className="font-display text-lg tracking-wide text-terra transition-colors hover:text-sand">
                        Voyage
                    </Link>
                </div>

                <div className="relative z-10 max-w-md font-body">
                    <p className="coord-label mb-5">
                        35.6762° N &nbsp; 139.6503° E
                    </p>

                    <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-semibold leading-[1.08] text-sand">
                        Set course for
                        <br />
                        <span className="italic text-sand/55">unexplored</span>
                        <br />
                        horizons.
                    </h2>

                    <p className="mt-5 text-[0.8rem] leading-relaxed text-sand/60 max-w-sm font-light">
                        Create an account to configure your Travel DNA, get personalized AI recommendations,
                        and calculate real-time itinerary budgets.
                    </p>
                </div>

                <div className="relative z-10">
                    <p className="coord-label">
                        48.8566° N &nbsp; 2.3522° E &nbsp; · &nbsp; 1.3521° N &nbsp; 103.8198° E
                    </p>
                </div>
            </div>

            {/* ── Right Panel — Ghost White Form ── */}
            <div className="w-full md:w-[60%] lg:w-[55%] xl:w-1/2 bg-ghost flex items-center justify-center px-6 py-10 md:px-10 lg:px-16 overflow-y-auto">

                <div className="w-full max-w-lg fade-in my-auto">

                    {/* Mobile Logo */}
                    <div className="md:hidden mb-8">
                        <Link href="/" className="font-display text-lg tracking-wide text-terra">
                            Voyage
                        </Link>
                    </div>

                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-terra mb-1.5">
                        Start Planning
                    </p>

                    <h1 className="font-display text-3xl font-semibold text-ink leading-tight">
                        Create your account
                    </h1>

                    <p className="mt-2 text-[0.75rem] text-ink/60">
                        Join Voyage and configure your travel persona.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>

                        {/* General error */}
                        {generalError && (
                            <div className="p-3 bg-danger/10 border border-danger/25 text-danger rounded-lg text-xs leading-relaxed field-error">
                                {generalError}
                            </div>
                        )}

                        {/* ─── Section 1: Account Details ─── */}
                        <div className="space-y-3.5">
                            <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-ink/40 border-b border-ink/5 pb-1">
                                Account Details
                            </h3>

                            {/* Full Name */}
                            <div>
                                <label className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink/70 mb-1.5">
                                    Full Name
                                </label>
                                <input
                                    id="signup-name"
                                    type="text"
                                    placeholder="Jane Doe"
                                    value={form.name}
                                    onChange={(e) => update("name", e.target.value)}
                                    required
                                    className="w-full rounded-lg border border-ink/8 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/25 transition-all duration-300"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink/70 mb-1.5">
                                    Email
                                </label>
                                <input
                                    id="signup-email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={form.email}
                                    onChange={(e) => {
                                        update("email", e.target.value);
                                        if (emailError) setEmailError("");
                                    }}
                                    required
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
                                <label className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink/70 mb-1.5">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="signup-password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={form.password}
                                        onChange={(e) => {
                                            update("password", e.target.value);
                                            if (passwordError) setPasswordError("");
                                        }}
                                        required
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

                                {/* Password Strength Bar */}
                                {form.password.length > 0 && (
                                    <div className="mt-2.5 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[0.55rem] uppercase tracking-widest font-semibold text-ink/40">
                                                Strength
                                            </span>
                                            <span
                                                className="text-[0.6rem] font-bold uppercase tracking-wider transition-colors duration-300"
                                                style={{ color: strength.color }}
                                            >
                                                {strength.label}
                                            </span>
                                        </div>
                                        <div className="strength-bar-track">
                                            <div
                                                className="strength-bar-fill"
                                                style={{
                                                    width: strength.width,
                                                    backgroundColor: strength.color,
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Password Requirements */}
                                {form.password.length > 0 && (
                                    <div className="mt-3 grid grid-cols-1 gap-1">
                                        {[
                                            { met: reqs.length, label: "Minimum 8 characters" },
                                            { met: reqs.upper, label: "One uppercase letter" },
                                            { met: reqs.lower, label: "One lowercase letter" },
                                            { met: reqs.number, label: "One number" },
                                            { met: reqs.special, label: "One special character" },
                                        ].map(({ met, label }) => (
                                            <div
                                                key={label}
                                                className="flex items-center gap-1.5"
                                            >
                                                <span
                                                    className={`transition-colors duration-300 ${
                                                        met ? "text-sage" : "text-ink/30"
                                                    }`}
                                                >
                                                    {met ? <CheckIcon /> : <CircleIcon />}
                                                </span>
                                                <span
                                                    className={`text-[0.6rem] transition-colors duration-300 ${
                                                        met ? "text-sage" : "text-ink/40"
                                                    }`}
                                                >
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
                                        id="signup-confirm-password"
                                        type={showConfirm ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                            if (confirmError) setConfirmError("");
                                        }}
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
                                {confirmError && (
                                    <p className="mt-1.5 text-[0.65rem] text-danger leading-snug field-error">
                                        {confirmError}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* ─── Section 2: Travel Style & Budget ─── */}
                        <div className="space-y-3.5">
                            <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-ink/40 border-b border-ink/5 pb-1">
                                Travel Profile
                            </h3>

                            <div className="grid grid-cols-2 gap-3.5">
                                <div>
                                    <label className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink/70 mb-1.5">
                                        Budget Tier
                                    </label>
                                    <select
                                        value={form.budget}
                                        onChange={(e) => update("budget", e.target.value)}
                                        className="w-full rounded-lg border border-ink/8 bg-white px-4 py-3 text-sm text-ink transition-all duration-300 appearance-none"
                                    >
                                        <option>Budget</option>
                                        <option>Medium</option>
                                        <option>Luxury</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink/70 mb-1.5">
                                        Travel Style
                                    </label>
                                    <select
                                        value={form.travel_style}
                                        onChange={(e) => update("travel_style", e.target.value)}
                                        className="w-full rounded-lg border border-ink/8 bg-white px-4 py-3 text-sm text-ink transition-all duration-300 appearance-none"
                                    >
                                        <option>Solo</option>
                                        <option>Couple</option>
                                        <option>Friends</option>
                                        <option>Family</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* ─── Section 3: Travel DNA ─── */}
                        <div className="space-y-3.5">
                            <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-ink/40 border-b border-ink/5 pb-1">
                                Travel DNA Scores
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                                <Slider label="Food Score" keyName="food_score" value={form.food_score} />
                                <Slider label="Adventure Score" keyName="adventure_score" value={form.adventure_score} />
                                <Slider label="Culture Score" keyName="culture_score" value={form.culture_score} />
                                <Slider label="Shopping Score" keyName="shopping_score" value={form.shopping_score} />
                            </div>
                        </div>

                        <button
                            id="signup-submit"
                            type="submit"
                            disabled={submitDisabled}
                            className="w-full rounded-lg bg-terra px-4 py-3 font-semibold text-[0.7rem] uppercase tracking-[0.2em] text-ghost transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,123,75,0.25)] hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>

                    </form>

                    <p className="mt-6 text-center text-[0.65rem] text-ink/50">
                        Already have an account?{" "}
                        <Link href="/login" className="text-terra hover:underline font-medium">
                            Sign In
                        </Link>
                    </p>

                </div>

            </div>

        </main>
    );
}
