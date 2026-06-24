"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTrip } from "@/lib/api";
import Link from "next/link";

export default function CreateTripPage() {

    const router = useRouter();

    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [budget, setBudget] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();
        setIsLoading(true);

        const token = localStorage.getItem(
            "token"
        );

        if (!token) {
            alert("Please login first");
            setIsLoading(false);
            return;
        }

        try {
            const data = await createTrip(
                {
                    destination,
                    start_date: startDate,
                    end_date: endDate,
                    budget,
                },
                token
            );

            console.log(data);

            router.push("/dashboard");
        } catch (error) {
            console.error(error);
            alert("Failed to create trip");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex bg-ink">

            {/* ── Left Panel — Editorial Dark ── */}
            <div className="hidden md:flex md:w-[45%] lg:w-1/2 relative bg-ink coord-texture flex-col justify-between p-10 lg:p-14">

                <div className="relative z-10">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-terra transition-colors hover:text-sand">
                        <span className="text-base">←</span> Dashboard
                    </Link>
                </div>

                <div className="relative z-10 max-w-md">
                    <p className="coord-label mb-5">
                        35.6762° N &nbsp; 139.6503° E
                    </p>

                    <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-semibold leading-[1.08] text-sand">
                        Chart your
                        <br />
                        <span className="italic text-sand/35">next great</span>
                        <br />
                        adventure.
                    </h2>

                    <p className="mt-5 text-[0.8rem] leading-relaxed text-sand/35 max-w-sm">
                        Set your destination, dates, and budget — and let our AI companion
                        handle the rest with personalized recommendations and cost predictions.
                    </p>
                </div>

                <div className="relative z-10">
                    <p className="coord-label">
                        -8.3405° S &nbsp; 115.0920° E &nbsp; · &nbsp; 25.2048° N &nbsp; 55.2708° E
                    </p>
                </div>
            </div>

            {/* ── Right Panel — Ghost White Form ── */}
            <div className="w-full md:w-[55%] lg:w-1/2 bg-ghost flex items-center justify-center px-6 py-10 md:px-10 lg:px-16">

                <div className="w-full max-w-md fade-in">

                    {/* Mobile Back Link */}
                    <div className="md:hidden mb-6">
                        <Link href="/dashboard" className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-terra hover:underline">
                            <span className="text-base">←</span> Dashboard
                        </Link>
                    </div>

                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-terra mb-1.5">
                        New Journey
                    </p>

                    <h1 className="font-display text-3xl font-semibold text-ink leading-tight">
                        Create a new trip
                    </h1>

                    <p className="mt-2 text-[0.75rem] text-ink/40">
                        Fill in the details below to plan your next adventure.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-6 space-y-3.5"
                    >

                        <div>
                            <label className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink/50 mb-1.5">
                                Destination
                            </label>
                            <input
                                type="text"
                                placeholder="Where are you going?"
                                value={destination}
                                onChange={(e) =>
                                    setDestination(e.target.value)
                                }
                                className="w-full rounded-lg border border-ink/8 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/25 transition-all duration-300"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink/50 mb-1.5">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) =>
                                        setStartDate(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-ink/8 bg-white px-4 py-3 text-sm text-ink transition-all duration-300"
                                />
                            </div>
                            <div>
                                <label className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink/50 mb-1.5">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) =>
                                        setEndDate(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-ink/8 bg-white px-4 py-3 text-sm text-ink transition-all duration-300"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink/50 mb-1.5">
                                Budget
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. moderate, luxury, budget"
                                value={budget}
                                onChange={(e) =>
                                    setBudget(e.target.value)
                                }
                                className="w-full rounded-lg border border-ink/8 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/25 transition-all duration-300"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-lg bg-terra px-4 py-3 font-semibold text-[0.7rem] uppercase tracking-[0.2em] text-ghost transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,123,75,0.25)] hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Creating..." : "Create Trip"}
                        </button>

                    </form>

                </div>

            </div>

        </main>
    );
}