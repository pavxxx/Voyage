"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTrip } from "@/lib/api";

export default function CreateTripPage() {

    const router = useRouter();

    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [budget, setBudget] = useState("");

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        const token = localStorage.getItem(
            "token"
        );

        if (!token) {
            alert("Please login first");
            return;
        }

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

        alert("Trip created successfully!");

        router.push("/dashboard");
    };

    return (
        <main className="min-h-screen bg-black text-white flex items-center justify-center">

            <div className="w-full max-w-xl rounded-3xl border border-zinc-800 p-8">

                <h1 className="mb-6 text-4xl font-bold">
                    Create Trip
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        placeholder="Destination"
                        value={destination}
                        onChange={(e) =>
                            setDestination(e.target.value)
                        }
                        className="w-full rounded-xl bg-zinc-900 p-4"
                    />

                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) =>
                            setStartDate(e.target.value)
                        }
                        className="w-full rounded-xl bg-zinc-900 p-4"
                    />

                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) =>
                            setEndDate(e.target.value)
                        }
                        className="w-full rounded-xl bg-zinc-900 p-4"
                    />

                    <input
                        type="text"
                        placeholder="Budget"
                        value={budget}
                        onChange={(e) =>
                            setBudget(e.target.value)
                        }
                        className="w-full rounded-xl bg-zinc-900 p-4"
                    />

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-orange-500 p-4 font-semibold text-black hover:bg-orange-400"
                    >
                        Create Trip
                    </button>

                </form>

            </div>

        </main>
    );
}