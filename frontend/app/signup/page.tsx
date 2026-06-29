"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_URL = "http://127.0.0.1:8000";

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
        shopping_score: 3
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const update = (key: string, value: string | number) => {
        setForm(prev => ({ ...prev, [key]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_URL}/user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (res.ok) {
                router.push("/login?signup_success=true");
            } else {
                setError(data.detail || data.message || "Signup failed. Please try again.");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    }

    const Slider = ({ label, keyName, value }: { label: string, keyName: string, value: number }) => (
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
                        Create an account to configure your Travel DNA, get personalized AI recommendations, and calculate real-time itinerary budgets.
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

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-6"
                    >
                        {error && (
                            <div className="p-3 bg-danger/10 border border-danger/25 text-danger rounded-lg text-xs leading-relaxed">
                                {error}
                            </div>
                        )}

                        {/* Section 1: Account Details */}
                        <div className="space-y-3.5">
                            <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-ink/40 border-b border-ink/5 pb-1">
                                Account Details
                            </h3>

                            <div>
                                <label className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink/70 mb-1.5">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Jane Doe"
                                    value={form.name}
                                    onChange={e => update("name", e.target.value)}
                                    required
                                    className="w-full rounded-lg border border-ink/8 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/25 transition-all duration-300"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div>
                                    <label className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink/70 mb-1.5">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        value={form.email}
                                        onChange={e => update("email", e.target.value)}
                                        required
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
                                        value={form.password}
                                        onChange={e => update("password", e.target.value)}
                                        required
                                        className="w-full rounded-lg border border-ink/8 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/25 transition-all duration-300"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Travel Style & Budget */}
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
                                        onChange={e => update("budget", e.target.value)}
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
                                        onChange={e => update("travel_style", e.target.value)}
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

                        {/* Section 3: Travel DNA */}
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
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-terra px-4 py-3 font-semibold text-[0.7rem] uppercase tracking-[0.2em] text-ghost transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,123,75,0.25)] hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>

                    </form>

                    <p className="mt-6 text-center text-[0.65rem] text-ink/50">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-terra hover:underline font-medium"
                        >
                            Sign In
                        </Link>
                    </p>

                </div>

            </div>

        </main>
    );
}
