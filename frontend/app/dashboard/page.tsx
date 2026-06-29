"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
    getMyTrips,
    deleteTrip,
    getRecommendations,
    getProfile,
    getTripCost
} from "@/lib/api";

interface Trip {
    id: number;
    destination: string;
    start_date: string;
    end_date: string;
    budget: string;
    travel_style?: string;
    travellers?: number;
    estimated_cost?: number;
}

interface Profile {
    name: string;
    budget: string;
    travel_style: string;
}

/* Coordinate labels for destination cards */
const COORD_MAP: Record<string, string> = {
    "paris": "48.8566° N  2.3522° E",
    "tokyo": "35.6762° N  139.6503° E",
    "new york": "40.7128° N  74.0060° W",
    "sydney": "-33.8688° S  151.2093° E",
    "london": "51.5074° N  0.1278° W",
    "istanbul": "41.0082° N  28.9784° E",
    "dubai": "25.2048° N  55.2708° E",
    "singapore": "1.3521° N  103.8198° E",
    "rome": "41.9028° N  12.4964° E",
    "bali": "-8.3405° S  115.0920° E",
    "goa": "15.2993° N  74.1240° E",
    "mumbai": "19.0760° N  72.8777° E",
    "delhi": "28.7041° N  77.1025° E",
    "jaipur": "26.9124° N  75.7873° E",
    "bangkok": "13.7563° N  100.5018° E",
    "rio de janeiro": "-22.9068° S  43.1729° W",
    "moscow": "55.7558° N  37.6173° E",
    "san francisco": "37.7749° N  122.4194° W",
};

function getCoord(place: string): string {
    const key = place.toLowerCase().trim();
    return COORD_MAP[key] || `${(Math.random() * 90).toFixed(4)}° N  ${(Math.random() * 180).toFixed(4)}° E`;
}

function getImageUrl(place: string): string {
    const filename = place.toLowerCase().trim().replace(/\s+/g, '-');
    return `/images/${filename}.jpg`;
}

export default function DashboardPage() {

    const [trips, setTrips] = useState<Trip[]>([]);
    const [personality, setPersonality] = useState("");
    const [recommendations, setRecommendations] = useState<string[]>([]);

    const [profile, setProfile] = useState<Profile>({
        name: "",
        budget: "",
        travel_style: ""
    });

    useEffect(() => {

        const fetchData = async () => {

            const token = localStorage.getItem(
                "token"
            );

            if (!token) return;

            try {

                const [
                    tripData,
                    recData,
                    profileData
                ] = await Promise.all([
                    getMyTrips(token),
                    getRecommendations(token),
                    getProfile(token)
                ]);

                const tripsWithCost = await Promise.all(

                    tripData.map(async (trip: Trip) => {
                        const start = new Date(trip.start_date);
                        const end = new Date(trip.end_date);
                        const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1);

                        const travellers = trip.travellers || 1;

                        try {
                            const costData = await getTripCost(
                                trip.destination,
                                days,
                                trip.budget || "Medium",
                                travellers
                            );

                            return {
                                ...trip,
                                estimated_cost: costData.estimated_cost
                            };
                        } catch (err) {
                            console.error(`Failed to fetch cost for trip to ${trip.destination}:`, err);
                            return {
                                ...trip,
                                estimated_cost: 0
                            };
                        }
                    })

                );

                setTrips(tripsWithCost);

                setPersonality(
                    recData.personality
                );

                setRecommendations(
                    recData.recommendations
                );

                setProfile({
                    name: profileData.name || "",
                    budget: profileData.budget || "",
                    travel_style:
                        profileData.travel_style || ""
                });

            } catch (error) {

                console.error(
                    "Dashboard fetch error:",
                    error
                );

            }
        };

        fetchData();

    }, []);

    const handleDelete = async (
        tripId: number
    ) => {

        const token = localStorage.getItem(
            "token"
        );

        if (!token) return;

        await deleteTrip(
            tripId,
            token
        );

        setTrips(
            trips.filter(
                (trip) =>
                    trip.id !== tripId
            )
        );
    };

    return (
        <main className="min-h-screen bg-ink text-sand">

            {/* ── Top Nav Bar ── */}
            <nav className="flex items-center justify-between px-6 md:px-10 lg:px-14 py-4 border-b border-sand/6">
                <Link href="/" className="font-display text-lg tracking-wide text-terra">
                    Voyage
                </Link>

                <div className="flex items-center gap-2.5">
                    <Link href="/create-trip">
                        <button className="rounded-full bg-terra px-5 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ink transition-all duration-300 hover:shadow-[0_0_25px_rgba(201,123,75,0.3)] hover:scale-[1.03]">
                            + New Trip
                        </button>
                    </Link>

                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            window.location.href = "/login";
                        }}
                        className="rounded-full border border-sand/20 px-5 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-sand/65 transition-all duration-300 hover:border-danger hover:text-danger"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* ── Hero Header ── */}
            <header className="relative coord-texture px-6 md:px-10 lg:px-14 pt-8 pb-10">
                <div className="relative z-10">
                    <p className="coord-label mb-2 fade-in">
                        27.1751° N &nbsp; 78.0421° E
                    </p>

                    <div className="flex items-end gap-4 mb-3">
                        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[0.88] text-sand fade-in">
                            Explore
                        </h1>
                        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[0.88] text-sand/15 italic fade-in fade-in-delay-1">
                            Beyond.
                        </h2>
                    </div>

                    <p className="max-w-lg text-[0.8rem] leading-relaxed text-sand/60 fade-in fade-in-delay-2">
                        Personalized destinations, intelligent recommendations,
                        and smarter trip planning powered by your travel profile.
                    </p>
                </div>
            </header>

            <div className="px-6 md:px-10 lg:px-14 pb-10">

                {/* ── Profile Stat Cards ── */}
                <div className="grid gap-4 grid-cols-3 stagger-in">

                    <div className="glass-card card-lift rounded-xl p-5 lg:p-6">
                        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-sand/55 mb-2">
                            Travel Style
                        </p>
                        <h3 className="font-display text-2xl md:text-3xl font-semibold capitalize text-sage">
                            {profile.travel_style || "Not Set"}
                        </h3>
                    </div>

                    <div className="glass-card card-lift rounded-xl p-5 lg:p-6">
                        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-sand/55 mb-2">
                            Budget Profile
                        </p>
                        <h3 className="font-display text-2xl md:text-3xl font-semibold capitalize text-terra">
                            {profile.budget || "Not Set"}
                        </h3>
                    </div>

                    <div className="glass-card card-lift rounded-xl p-5 lg:p-6">
                        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-sand/55 mb-2">
                            Trips Planned
                        </p>
                        <h3 className="font-display text-2xl md:text-3xl font-semibold text-sand">
                            {trips.length}
                        </h3>
                    </div>

                </div>

                {/* ── Travel DNA Banner ── */}
                <div className="mt-6 relative overflow-hidden rounded-xl border-l-[3px] border-terra glass-card p-6 md:p-8 coord-texture fade-in">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-terra mb-2">
                                Travel DNA
                            </p>
                            <h2 className="font-display text-3xl md:text-4xl font-semibold capitalize text-sand">
                                {personality || <span className="text-sand/20 italic">Analyzing...</span>}
                            </h2>
                        </div>
                        <p className="text-[0.75rem] text-sand/55 max-w-xs md:text-right">
                            Recommendations are generated using your travel preferences and style.
                        </p>
                    </div>
                </div>

                {/* ── Recommendations ── */}
                <div className="mt-8 fade-in">
                    <div className="flex items-end justify-between mb-5">
                        <div>
                            <p className="coord-label mb-1">Curated for you</p>
                            <h2 className="font-display text-2xl md:text-3xl font-semibold text-sand">
                                Recommended Destinations
                            </h2>
                        </div>
                    </div>

                    {recommendations.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 stagger-in">
                            {recommendations.map((place, i) => (
                                <div
                                    key={place}
                                    className="group card-lift rounded-xl overflow-hidden border border-sand/6 bg-ink-light transition-all duration-400 hover:border-terra/40"
                                >
                                    {/* Image Header with Gradient Overlay */}
                                    <div className="h-32 relative overflow-hidden">
                                        <img 
                                            src={getImageUrl(place)} 
                                            alt={place} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-ink-light via-ink-light/40 to-transparent" />
                                        <p className="absolute bottom-2.5 left-3.5 coord-label z-10">
                                            {getCoord(place)}
                                        </p>
                                    </div>

                                    <div className="p-5">
                                        <h3 className="font-display text-xl font-semibold text-sand group-hover:text-terra transition-colors duration-300">
                                            {place}
                                        </h3>
                                        <p className="mt-1.5 text-[0.7rem] text-sand/55">
                                            Recommended for your travel personality.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="glass-card rounded-xl p-8 text-center">
                            <p className="font-display text-xl text-sand/20 italic">
                                Complete your profile to unlock personalized recommendations.
                            </p>
                        </div>
                    )}
                </div>

                {/* ── My Trips ── */}
                <div className="mt-8 fade-in">
                    <div className="flex items-end justify-between mb-5">
                        <div>
                            <p className="coord-label mb-1">Your itineraries</p>
                            <h2 className="font-display text-2xl md:text-3xl font-semibold text-sand">
                                My Trips
                            </h2>
                        </div>
                    </div>

                    <div className="space-y-3 stagger-in">

                        {trips.length === 0 ? (

                            <div className="glass-card rounded-xl p-8 text-center">
                                <p className="font-display text-xl text-sand/20 italic">
                                    No trips planned yet.
                                </p>
                                <p className="mt-1.5 text-[0.7rem] text-sand/15">
                                    Click &quot;+ New Trip&quot; to start your next adventure.
                                </p>
                            </div>

                        ) : (

                            trips.map((trip) => (

                                <div
                                    key={trip.id}
                                    className="glass-card card-lift rounded-xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-3"
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-1.5">
                                            <h3 className="font-display text-xl font-semibold text-sand truncate">
                                                {trip.destination}
                                            </h3>
                                            <span className="coord-label hidden lg:inline shrink-0">
                                                {getCoord(trip.destination)}
                                            </span>
                                        </div>

                                        <p className="text-[0.7rem] text-sand/55 tracking-wide">
                                            {trip.start_date} &nbsp;→&nbsp; {trip.end_date}
                                        </p>

                                        <div className="mt-2 flex items-center gap-5">
                                            <p className="text-[0.8rem] font-medium text-terra">
                                                Budget: {trip.budget}
                                            </p>
                                            <p className="text-[0.8rem] font-medium text-sage">
                                                Est. Cost: ₹{trip.estimated_cost?.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleDelete(trip.id)}
                                        className="self-start md:self-center rounded-full border border-danger/40 px-4 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-danger/80 transition-all duration-300 hover:bg-danger hover:text-ghost hover:border-danger"
                                    >
                                        Delete
                                    </button>
                                </div>

                            ))

                        )}

                    </div>
                </div>

                {/* ── Footer Coordinate ── */}
                <div className="mt-12 mb-4 text-center">
                    <p className="coord-label">
                        55.7558° N &nbsp; 37.6173° E &nbsp; · &nbsp; -22.9068° S &nbsp; 43.1729° W &nbsp; · &nbsp; 1.3521° N &nbsp; 103.8198° E
                    </p>
                </div>

            </div>

        </main>
    );
}