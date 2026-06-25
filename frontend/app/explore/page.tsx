"use client";

import { useState } from "react";
import Link from "next/link";

const DESTINATIONS = [
    {
        name: "Tokyo",
        country: "Japan",
        budget: "High",
        coordinates: "35.6762° N  139.6503° E",
        imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
        name: "Bangkok",
        country: "Thailand",
        budget: "Budget",
        coordinates: "13.7563° N  100.5018° E",
        imageUrl: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
        name: "Seoul",
        country: "South Korea",
        budget: "Medium",
        coordinates: "37.5665° N  126.9780° E",
        imageUrl: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
        name: "Dubai",
        country: "UAE",
        budget: "High",
        coordinates: "25.2048° N  55.2708° E",
        imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
        name: "Singapore",
        country: "Singapore",
        budget: "High",
        coordinates: "1.3521° N  103.8198° E",
        imageUrl: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
        name: "Ladakh",
        country: "India",
        budget: "Budget",
        coordinates: "34.1526° N  77.5771° E",
        imageUrl: "https://images.unsplash.com/photo-1596120236172-231999844ade?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
        name: "Iceland",
        country: "Iceland",
        budget: "High",
        coordinates: "64.9631° N  19.0208° W",
        imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
        name: "Rome",
        country: "Italy",
        budget: "Medium",
        coordinates: "41.9028° N  12.4964° E",
        imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
        name: "Kyoto",
        country: "Japan",
        budget: "Medium",
        coordinates: "35.0116° N  135.7681° E",
        imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
        name: "Istanbul",
        country: "Turkey",
        budget: "Medium",
        coordinates: "41.0082° N  28.9784° E",
        imageUrl: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
        name: "New Zealand",
        country: "New Zealand",
        budget: "High",
        coordinates: "-40.9006° S  174.8860° E",
        imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
        name: "Ooty",
        country: "India",
        budget: "Budget",
        coordinates: "11.4102° N  76.6950° E",
        imageUrl: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
        name: "Munnar",
        country: "India",
        budget: "Budget",
        coordinates: "10.0889° N  77.0595° E",
        imageUrl: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
        name: "Kodaikanal",
        country: "India",
        budget: "Budget",
        coordinates: "10.2381° N  77.4892° E",
        imageUrl: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
        name: "Paris",
        country: "France",
        budget: "High",
        coordinates: "48.8566° N  2.3522° E",
        imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
        name: "London",
        country: "United Kingdom",
        budget: "High",
        coordinates: "51.5074° N  0.1278° W",
        imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&h=400&q=80"
    }
];

export default function ExplorePage() {
    const [selectedBudget, setSelectedBudget] = useState("All");

    const filteredDestinations = selectedBudget === "All"
        ? DESTINATIONS
        : DESTINATIONS.filter(dest => dest.budget === selectedBudget);

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
                        Explore hand-picked destinations matched to different travel styles, budgets, and experiences. Filter by your budget index below to begin.
                    </p>
                </div>
            </section>

            {/* ── Filter Buttons ── */}
            <section className="relative z-10 flex justify-center gap-4 pb-14 px-6 fade-in fade-in-delay-3">
                {["All", "Budget", "Medium", "High"].map((budgetOpt) => (
                    <button
                        key={budgetOpt}
                        onClick={() => setSelectedBudget(budgetOpt)}
                        className={`px-6 py-2 rounded-full text-[0.65rem] tracking-[0.2em] uppercase border transition-all duration-300 ${
                            selectedBudget === budgetOpt
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
                            key={dest.name}
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
                            </div>

                            <div className="mt-6 pt-4 border-t border-sand/5 flex items-center justify-between">
                                <p className="coord-label">
                                    {dest.coordinates.split("  ")[0]}
                                </p>
                                <p className="coord-label">
                                    {dest.coordinates.split("  ")[1]}
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