export default function DashboardPage() {
    return (
        <main className="min-h-screen bg-black text-white px-10 py-8">

            <div className="mb-12">
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

            <div className="grid gap-6 lg:grid-cols-3">

                <div className="rounded-3xl border border-zinc-800 p-8">
                    <p className="text-zinc-500">Travel Style</p>

                    <h2 className="mt-2 text-3xl font-bold">
                        Solo Explorer
                    </h2>

                    <p className="mt-4 text-zinc-400">
                        Adventure-focused traveler with balanced spending habits.
                    </p>
                </div>

                <div className="rounded-3xl border border-zinc-800 p-8">
                    <p className="text-zinc-500">Budget Profile</p>

                    <h2 className="mt-2 text-3xl font-bold text-orange-400">
                        Medium
                    </h2>

                    <p className="mt-4 text-zinc-400">
                        Optimized recommendations for mid-range travel.
                    </p>
                </div>

                <div className="rounded-3xl border border-zinc-800 p-8">
                    <p className="text-zinc-500">Trips Planned</p>

                    <h2 className="mt-2 text-3xl font-bold">
                        02
                    </h2>

                    <p className="mt-4 text-zinc-400">
                        Upcoming journeys in your travel calendar.
                    </p>
                </div>

            </div>

            <div className="mt-8 rounded-3xl border border-zinc-800 p-8">
                <h2 className="text-2xl font-semibold">
                    Upcoming Trips
                </h2>

                <div className="mt-6 space-y-4">

                    <div className="rounded-2xl bg-zinc-900 p-5">
                        Japan • Dec 1 - Dec 10
                    </div>

                    <div className="rounded-2xl bg-zinc-900 p-5">
                        Kerala • Jan 15 - Jan 22
                    </div>

                </div>
            </div>

        </main>
    );
}