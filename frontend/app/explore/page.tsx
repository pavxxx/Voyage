"use client";


import { useEffect, useState } from "react";
import { getDestinations } from "@/lib/api";
import Link from "next/link";

interface Destination {
    id: number;
    name: string;
    country: string;
    budget: string;
    description: string;
    image: string;
    imageUrl?: string;
}

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
    "ooty": "11.4102° N  76.6950° E",
    "munnar": "10.0889° N  77.0595° E",
    "kodaikanal": "10.2381° N  77.4892° E"
};

function getCoord(place: string): string {
    const key = place.toLowerCase().trim();
    return COORD_MAP[key] || `${(Math.random() * 90).toFixed(4)}° N  ${(Math.random() * 180).toFixed(4)}° E`;
}

function getImageUrl(name: string, imageFilename?: string): string {
    if (imageFilename) {
        return `/images/${imageFilename}`;
    }
    const filename = name.toLowerCase().trim().replace(/\s+/g, '-');
    return `/images/${filename}.jpg`;
}

export default function ExplorePage() {
    const [selectedBudget, setSelectedBudget] = useState("All");
    const [selectedCountry, setSelectedCountry] = useState("All");
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const data = await getDestinations();
                const mapped: Destination[] = data.map((dest: any) => ({
                    ...dest,
                    imageUrl: getImageUrl(dest.name, dest.image),
                    coordinates: dest.coordinates || getCoord(dest.name)
                }));
                setDestinations(mapped);
            } catch (error) {
                console.error("Failed to fetch destinations:", error);
            }
        };
        fetchDestinations();
    }, []);

    const countries = [
        "All",
        ...new Set(destinations.map((d) => d.country))
    ].sort();
    const filteredDestinations = destinations.filter((dest) => {

        const budgetMatch =
            selectedBudget === "All" ||
            dest.budget === selectedBudget;

        const countryMatch =
            selectedCountry === "All" ||
            dest.country === selectedCountry;

        const searchMatch =
            dest.name
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            dest.country
                .toLowerCase()
                .includes(search.toLowerCase());

        return budgetMatch && countryMatch && searchMatch;

    });

    return (
        <main className="min-h-screen bg-ink text-sand font-body relative overflow-hidden">

            {/* ── Coordinate Texture Background ── */}
            <div className="coord-texture fixed inset-0 pointer-events-none z-0" />

            {/* ── Navigation ── */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-14 py-5 bg-ink/70 backdrop-blur-md border-b border-sand/5">
                <Link href="/" className="font-display text-lg tracking-wide text-terra">
                    Voyage
                </Link>

                <div className="flex items-center gap-6 text-[0.7rem] tracking-[0.2em] uppercase text-sand/70">
                    <Link
                        href="/about"
                        className="hidden sm:block transition-colors duration-300 hover:text-sand"
                    >
                        About
                    </Link>
                    <Link
                        href="/explore"
                        className="text-sand transition-colors duration-300"
                    >
                        Explore
                    </Link>
                    <Link href="/login">
                        <button className="px-5 py-2 rounded-full border border-sand/15 text-sand/95 text-[0.7rem] tracking-[0.2em] uppercase transition-all duration-300 hover:border-terra hover:text-terra">
                            Login
                        </button>
                    </Link>
                </div>
            </nav>

            {/* ── Hero Header ── */}
            <section className="relative z-10 flex flex-col items-center justify-center pt-36 pb-12 px-6 text-center">
                <div className="flex flex-col items-center">

                    <p className="coord-label mb-5 fade-in">
                        48.8566° N &nbsp; 2.3522° E &nbsp; · &nbsp; 35.6762° N &nbsp; 139.6503° E
                    </p>

                    <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-terra fade-in fade-in-delay-1">
                        Explore
                    </p>

                    <h1 className="max-w-4xl font-display text-5xl sm:text-6xl md:text-7xl font-semibold leading-[0.92] text-sand fade-in fade-in-delay-1">
                        Discover Destinations
                    </h1>

                    <p className="mt-6 max-w-xl text-sm leading-relaxed text-sand/65 fade-in fade-in-delay-2 font-light">
                        Explore hand-picked destinations matched to different travel styles,
                        budgets, and experiences. Filter by your budget index below to begin.
                    </p>

                </div>
            </section>

            {/* ── Search Bar ── */}
            <section className="relative z-10 flex justify-center px-6 pb-10">

                <div className="w-full max-w-3xl">

                    <input
                        type="text"
                        placeholder="Search destinations..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-2xl border border-sand/10 bg-ink-light px-6 py-4 text-sand placeholder:text-sand/40 outline-none transition-all duration-300 focus:border-terra"
                    />

                </div>

            </section>

            {/* ── Filter Buttons ── */}
            <section className="relative z-10 flex justify-center gap-4 pb-14 px-6 fade-in fade-in-delay-3">

                {["All", "Budget", "Medium", "Luxury"].map((budgetOpt) => (

                    <button
                        key={budgetOpt}
                        onClick={() => setSelectedBudget(budgetOpt)}
                        className={`px-6 py-2 rounded-full text-[0.65rem] tracking-[0.2em] uppercase border transition-all duration-300 ${selectedBudget === budgetOpt
                            ? "bg-terra border-terra text-ink font-semibold shadow-[0_0_20px_rgba(201,123,75,0.2)]"
                            : "border-sand/15 text-sand/80 bg-sand/3 hover:border-sand/40 hover:text-sand"
                            }`}
                    >
                        {budgetOpt}
                    </button>

                ))}

            </section>

            {/* ── Destinations Grid ── */}
            <section className="relative z-10 mx-auto max-w-7xl px-8 pb-32">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 stagger-in">

                    {filteredDestinations.map((dest) => (

                        <div
                            key={dest.id}
                            className="glass-card card-lift rounded-2xl p-5 border border-sand/5 flex flex-col justify-between"
                        >

                            <div>

                                {/* Photo Container */}

                                <div className="relative mb-5 h-44 rounded-xl overflow-hidden bg-ink-light">

                                    {/* eslint-disable-next-line @next/next/no-img-element */}

                                    <img
                                        src={dest.imageUrl}
                                        alt={dest.name}
                                        className="object-cover w-full h-full grayscale-[10%] opacity-85 hover:scale-105 transition-transform duration-700"
                                    />

                                    <div className="absolute top-3 right-3 rounded-full bg-ink/75 border border-sand/10 px-3 py-1 text-[0.55rem] tracking-[0.15em] uppercase text-terra font-semibold">
                                        {dest.budget}
                                    </div>

                                </div>

                                <h2 className="text-xl font-display font-semibold text-sand leading-snug">
                                    {dest.name}
                                </h2>

                                <p className="mt-1 text-xs text-sand/60 font-light">
                                    {dest.country}
                                </p>

                                <p className="mt-3 text-sm text-sand/50 line-clamp-3">
                                    {dest.description}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="relative z-10 border-t border-sand/5 bg-ink-light/30 backdrop-blur-md px-8 md:px-14 py-16 text-sand/55">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">

                    {/* Brand Column */}
                    <div className="max-w-sm">
                        <Link href="/" className="font-display text-2xl font-semibold tracking-wide text-terra hover:text-terra-glow transition-colors duration-300">
                            Voyage
                        </Link>
                        <p className="mt-4 text-[0.8rem] leading-relaxed text-sand/50 font-body font-light">
                            An intelligent, editorial travel companion designed to analyze your travel preferences, predict itinerary budgets, and guide you beyond the ordinary.
                        </p>
                        <p className="mt-8 text-[0.65rem] tracking-[0.1em] text-sand/35 font-body uppercase">
                            &copy; {new Date().getFullYear()} Voyage. All rights reserved.
                        </p>
                    </div>

                    {/* Links Grid */}
                    <div className="grid grid-cols-3 gap-12 md:gap-20">
                        <div>
                            <h4 className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-terra mb-4">
                                Explore
                            </h4>
                            <ul className="space-y-2 text-[0.75rem] font-body text-sand/55">
                                <li>
                                    <button className="hover:text-sand transition-colors duration-300 cursor-pointer">Destinations</button>
                                </li>
                                <li>
                                    <button className="hover:text-sand transition-colors duration-300 cursor-pointer">Travel DNA</button>
                                </li>
                                <li>
                                    <button className="hover:text-sand transition-colors duration-300 cursor-pointer">Itineraries</button>
                                </li>
                                <li>
                                    <button className="hover:text-sand transition-colors duration-300 cursor-pointer">Pricing</button>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-terra mb-4">
                                Company
                            </h4>
                            <ul className="space-y-2 text-[0.75rem] font-body text-sand/55 font-light">
                                <li>
                                    <Link href="/about" className="hover:text-sand transition-colors duration-300 cursor-pointer">About Us</Link>
                                </li>
                                <li>
                                    <button className="hover:text-sand transition-colors duration-300 cursor-pointer">Journal</button>
                                </li>
                                <li>
                                    <button className="hover:text-sand transition-colors duration-300 cursor-pointer">Careers</button>
                                </li>
                                <li>
                                    <button className="hover:text-sand transition-colors duration-300 cursor-pointer">Contact</button>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-terra mb-4">
                                Legal
                            </h4>
                            <ul className="space-y-2 text-[0.75rem] font-body text-sand/55">
                                <li>
                                    <button className="hover:text-sand transition-colors duration-300 cursor-pointer">Privacy Policy</button>
                                </li>
                                <li>
                                    <button className="hover:text-sand transition-colors duration-300 cursor-pointer">Terms of Service</button>
                                </li>
                                <li>
                                    <button className="hover:text-sand transition-colors duration-300 cursor-pointer">Security</button>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

                {/* Small decorative coordinate bar at footer bottom */}
                <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-sand/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="coord-label">
                        48.8566° N &nbsp; 2.3522° E &nbsp; · &nbsp; 35.6762° N &nbsp; 139.6503° E
                    </p>
                    <p className="coord-label">
                        -33.8688° S &nbsp; 151.2093° E &nbsp; · &nbsp; 25.2048° N &nbsp; 55.2708° E
                    </p>
                </div>
            </footer>

        </main>
    );
}