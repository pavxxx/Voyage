"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
    getMyTrips,
    deleteTrip,
    getRecommendations
} from "@/lib/api";

interface Trip {
    id: number;
    destination: string;
    start_date: string;
    end_date: string;
    budget: string;
}

export default function DashboardPage() {

    const [trips, setTrips] = useState<Trip[]>([]);
    const [personality, setPersonality] = useState("");
    const [recommendations, setRecommendations] = useState<string[]>([]);

    useEffect(() => {

        const fetchData = async () => {

            const token = localStorage.getItem(
                "token"
            );

            if (!token) return;

            const tripData = await getMyTrips(
                token
            );

            setTrips(tripData);

            const recData =
                await getRecommendations(
                    token
                );

            setPersonality(
                recData.personality
            );

            setRecommendations(
                recData.recommendations
            );
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
        <main className="min-h-screen bg-black text-white px-10 py-8">

            <div className="flex items-center justify-between mb-12">

                <div>
                    <p className="text-sm tracking-[0.25em] text-orange-400 uppercase">
                        Dashboard
                    </p>

                    <h1 className="mt-3 text-6xl font-bold">
                        Good Evening,
                    </h1>

                    <h2 className="text-6xl font-bold text-zinc-500">
                        Pavithra
                    </h2>
                </div>

                <Link href="/create-trip">
                    <button className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-black hover:bg-orange-400">
                        + New Trip
                    </button>
                </Link>

            </div>

            <div className="grid gap-6 lg:grid-cols-3">

                <div className="rounded-3xl border border-zinc-800 p-8">
                    <p className="text-zinc-500">
                        Travel Style
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        Solo Explorer
                    </h2>
                </div>

                <div className="rounded-3xl border border-zinc-800 p-8">
                    <p className="text-zinc-500">
                        Budget Profile
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-orange-400">
                        Medium
                    </h2>
                </div>

                <div className="rounded-3xl border border-zinc-800 p-8">
                    <p className="text-zinc-500">
                        Trips Planned
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {trips.length}
                    </h2>
                </div>

            </div>

            <div className="mt-8 rounded-3xl border border-zinc-800 p-8">

                <h2 className="text-2xl font-semibold">
                    Travel Personality
                </h2>

                <p className="mt-4 text-4xl font-bold text-orange-400 capitalize">
                    {personality}
                </p>

            </div>

            <div className="mt-8 rounded-3xl border border-zinc-800 p-8">

                <h2 className="text-2xl font-semibold">
                    Recommended For You
                </h2>

                <div className="mt-4 space-y-3">

                    {recommendations.map((place) => (

                        <div
                            key={place}
                            className="rounded-xl bg-zinc-900 p-4"
                        >
                            {place}
                        </div>

                    ))}

                </div>

            </div>

            <div className="mt-8 rounded-3xl border border-zinc-800 p-8">

                <h2 className="text-2xl font-semibold">
                    My Trips
                </h2>

                <div className="mt-6 space-y-4">

                    {trips.map((trip) => (

                        <div
                            key={trip.id}
                            className="rounded-2xl bg-zinc-900 p-5"
                        >
                            <h3 className="text-xl font-semibold">
                                {trip.destination}
                            </h3>

                            <p className="text-zinc-400">
                                {trip.start_date} - {trip.end_date}
                            </p>

                            <div className="mt-3 flex items-center justify-between">

                                <p className="text-orange-400">
                                    Budget: {trip.budget}
                                </p>

                                <button
                                    onClick={() =>
                                        handleDelete(
                                            trip.id
                                        )
                                    }
                                    className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </main>
    );
}