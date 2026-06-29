"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createTrip, getTripCost } from "@/lib/api";
import Link from "next/link";

export default function CreateTripPage() {

    const router = useRouter();
    const [estimate, setEstimate] = useState<any>(null);
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [budget, setBudget] = useState("");
    const [travelStyle, setTravelStyle] = useState("Solo");
    const [isLoading, setIsLoading] = useState(false);
    const [travellers, setTravellers] = useState(1);

    const handleTravelStyleChange = (val: string) => {
        setTravelStyle(val);
        if (val === "Solo") {
            setTravellers(1);
        } else if (val === "Couple") {
            setTravellers(2);
        } else {
            setTravellers(prev => prev < 2 ? 3 : prev);
        }
    };

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
                    travel_style: travelStyle,
                    travellers,
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

    useEffect(() => {

        if (
            !destination ||
            !startDate ||
            !endDate ||
            !travelStyle
        ) {
            setEstimate(null);
            return;
        }

        const calculateEstimate = async () => {

            const start = new Date(startDate);
            const end = new Date(endDate);

            const diff =
                Math.ceil(
                    (end.getTime() - start.getTime()) /
                    (1000 * 60 * 60 * 24)
                ) + 1;

            if (diff <= 0) return;

            try {

                const data = await getTripCost(
                    destination,
                    diff,
                    budget,
                    travellers
                );

                setEstimate(data);

            } catch (err) {

                console.error(err);

            }

        };

        calculateEstimate();

    }, [
        destination,
        startDate,
        endDate,
        travelStyle,
        budget,
        travellers
    ]);

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
                        <span className="italic text-sand/55">next great</span>
                        <br />
                        adventure.
                    </h2>

                    <p className="mt-5 text-[0.8rem] leading-relaxed text-sand/60 max-w-sm">
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

                    <p className="mt-2 text-[0.75rem] text-ink/60">
                        Fill in the details below to plan your next adventure.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-6 space-y-3.5"
                    >

                        <div>
                            <label className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink/70 mb-1.5">
                                Destination
                            </label>
                            <input
                                type="text"
                                placeholder="Where are you going?"
                                value={destination}
                                onChange={(e) =>
                                    setDestination(e.target.value)
                                }
                                className="w-full rounded-lg border border-ink/8 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 transition-all duration-300"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink/70 mb-1.5">
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
                                <label className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink/70 mb-1.5">
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

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                                <label className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink/70 mb-1.5">
                                    Budget Tier
                                </label>
                                <select
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                    className="w-full rounded-lg border border-ink/8 bg-white px-4 py-3 text-sm text-ink transition-all duration-300"
                                >
                                    <option value="">Select Budget</option>
                                    <option value="Budget">Budget</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Luxury">Luxury</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink/70 mb-1.5">
                                    Travel Type
                                </label>
                                <select
                                    value={travelStyle}
                                    onChange={(e) => handleTravelStyleChange(e.target.value)}
                                    className="w-full rounded-lg border border-ink/8 bg-white px-4 py-3 text-sm text-ink transition-all duration-300"
                                >
                                    <option value="Solo">Solo</option>
                                    <option value="Couple">Couple</option>
                                    <option value="Friends">Friends</option>
                                    <option value="Family">Family</option>
                                </select>
                                {travelStyle === "Family" || travelStyle === "Friends" ? (

                                    <div>

                                        <label className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink/70 mb-1.5">
                                            Number of Travellers
                                        </label>

                                        <input
                                            type="number"
                                            min={2}
                                            value={travellers}
                                            onChange={(e) => setTravellers(Number(e.target.value))}
                                            className="w-full rounded-lg border border-ink/8 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/25 transition-all duration-300"
                                        />

                                    </div>

                                ) : (

                                    <div>

                                        <label className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink/70 mb-1.5">
                                            Travellers
                                        </label>

                                        <input
                                            value={travelStyle === "Solo" ? 1 : 2}
                                            disabled
                                            className="w-full rounded-lg border border-ink/8 bg-ink/5 text-ink/50 px-4 py-3 text-sm transition-all duration-300 cursor-not-allowed"
                                        />

                                    </div>

                                )}
                            </div>
                        </div>

                        {estimate && estimate.message && (
                            <div className="p-3 bg-danger/10 border border-danger/25 text-danger rounded-lg text-xs leading-relaxed font-medium">
                                {estimate.message}
                            </div>
                        )}

                        {estimate && estimate.breakdown && (
                            <div className="receipt-paper p-6 rounded-sm overflow-hidden font-body text-ink">

                                {/* Receipt Head */}
                                <div className="text-center pb-4 border-b border-dashed border-ink/15">
                                    <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-terra">
                                        Voyage Cost Ledger
                                    </p>
                                    <p className="mt-1 text-[0.55rem] font-mono tracking-widest text-ink/40">
                                        EST-NO. {Math.floor(100000 + Math.random() * 900000)} / {new Date().toLocaleDateString('en-IN')}
                                    </p>
                                </div>

                                {/* Receipt Details List */}
                                <div className="mt-5 space-y-3 text-xs">

                                    <div className="flex justify-between items-center">
                                        <span className="uppercase tracking-wider text-[0.65rem] text-ink/60 font-semibold">
                                            Transport (Round-Trip)
                                        </span>
                                        <span className="font-mono text-sm font-semibold text-ink">
                                            ₹{estimate.breakdown.transport.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="uppercase tracking-wider text-[0.65rem] text-ink/60 font-semibold">
                                            Accommodation (Hotel)
                                        </span>
                                        <span className="font-mono text-sm font-semibold text-ink">
                                            ₹{estimate.breakdown.hotel.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="uppercase tracking-wider text-[0.65rem] text-ink/60 font-semibold">
                                            Dining & Food
                                        </span>
                                        <span className="font-mono text-sm font-semibold text-ink">
                                            ₹{estimate.breakdown.food.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="uppercase tracking-wider text-[0.65rem] text-ink/60 font-semibold">
                                            Activities & Tours
                                        </span>
                                        <span className="font-mono text-sm font-semibold text-ink">
                                            ₹{estimate.breakdown.activities.toLocaleString()}
                                        </span>
                                    </div>

                                </div>

                                {/* Dashed Separator */}
                                <div className="my-5 border-t border-dashed border-ink/15" />

                                {/* Grand Total */}
                                <div className="flex justify-between items-end">
                                    <div>
                                        <span className="block text-[0.55rem] font-bold uppercase tracking-widest text-ink/40 leading-none mb-1">
                                            Estimated Total
                                        </span>
                                        <span className="block text-[0.5rem] text-ink/50 italic font-light">
                                            *Taxes and extra fees may apply
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-mono text-3xl font-bold tracking-tight text-ink">
                                            ₹{estimate.estimated_cost.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                {/* Expected Range Section */}
                                {/* Extra Trip Information */}

                                <div className="mt-5 border-t border-dashed border-ink/15 pt-4 space-y-3 text-xs">

                                    <div className="flex justify-between items-center">
                                        <span className="uppercase tracking-wider text-[0.65rem] text-ink/60 font-semibold">
                                            Travellers Count
                                        </span>
                                        <span className="font-mono text-sm font-semibold text-ink">
                                            {travellers}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="uppercase tracking-wider text-[0.65rem] text-ink/60 font-semibold">
                                            Trip Duration
                                        </span>
                                        <span className="font-mono text-sm font-semibold text-ink">
                                            {estimate.days} Days
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center font-semibold pt-2 border-t border-ink/5">
                                        <span className="uppercase tracking-wider text-[0.65rem] text-terra font-bold">
                                            Cost Per Person
                                        </span>
                                        <span className="font-mono text-base font-bold text-terra">
                                            ₹{Math.round(
                                                estimate.estimated_cost / travellers
                                            ).toLocaleString()}
                                        </span>
                                    </div>

                                </div>

                                {/* Expected Range */}

                                <div className="mt-5 pt-4 border-t border-ink/10 bg-ink/[0.02] -mx-6 -mb-6 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">

                                    <span className="text-[0.55rem] font-bold uppercase tracking-[0.25em] text-ink/50">
                                        Expected Range
                                    </span>

                                    <span className="font-mono text-xs font-bold text-terra">
                                        ₹{estimate.estimated_range.min.toLocaleString()} –
                                        ₹{estimate.estimated_range.max.toLocaleString()}
                                    </span>

                                </div>

                            </div>


                        )}

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