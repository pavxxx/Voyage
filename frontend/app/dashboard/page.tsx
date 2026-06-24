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
    estimated_cost?: number;
}

interface Profile {
    name: string;
    budget: string;
    travel_style: string;
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

                        const costData =
                            await getTripCost(
                                trip.destination
                            );

                        return {
                            ...trip,
                            estimated_cost:
                                costData.estimated_cost
                        };

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
                        {profile.name}
                    </h2>
                </div>

                <div className="flex gap-3">

                    <Link href="/create-trip">
                        <button className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-black hover:bg-orange-400">
                            + New Trip
                        </button>
                    </Link>

                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            window.location.href = "/login";
                        }}
                        className="rounded-xl bg-red-500 px-5 py-3 font-semibold text-white hover:bg-red-600"
                    >
                        Logout
                    </button>

                </div>

            </div>

            <div className="grid gap-6 lg:grid-cols-3">

                <div className="rounded-3xl border border-zinc-800 p-8">
                    <p className="text-zinc-500">
                        Travel Style
                    </p>

                    <h2 className="mt-2 text-3xl font-bold capitalize">
                        {profile.travel_style || "Not Set"}
                    </h2>
                </div>

                <div className="rounded-3xl border border-zinc-800 p-8">
                    <p className="text-zinc-500">
                        Budget Profile
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-orange-400 capitalize">
                        {profile.budget || "Not Set"}
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

                    {trips.length === 0 ? (

                        <div className="rounded-2xl bg-zinc-900 p-6 text-center text-zinc-400">
                            No trips planned yet. Click "+ New Trip" to start your next adventure.
                        </div>

                    ) : (

                        trips.map((trip) => (

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

                                    <div>

                                        <p className="text-orange-400">
                                            Budget: {trip.budget}
                                        </p>

                                        <p className="text-green-400 text-sm">
                                            Estimated Cost: ₹{trip.estimated_cost}
                                        </p>

                                    </div>

                                    <button
                                        onClick={() => handleDelete(trip.id)}
                                        className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))

                    )}
                </div>

            </div>

        </main>
    );
}