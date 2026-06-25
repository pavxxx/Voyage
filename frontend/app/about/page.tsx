import Link from "next/link";

export default function AboutPage() {
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
                        href="/#features"
                        className="transition-colors duration-300 hover:text-sand"
                    >
                        Features
                    </Link>
                    <Link
                        href="/about"
                        className="text-sand transition-colors duration-300"
                    >
                        About
                    </Link>
                    <Link href="/login">
                        <button className="px-5 py-2 rounded-full border border-sand/15 text-sand/95 text-[0.7rem] tracking-[0.2em] uppercase transition-all duration-300 hover:border-terra hover:text-terra">
                            Login
                        </button>
                    </Link>
                </div>
            </nav>

            {/* ── Hero Section ── */}
            <section className="relative z-10 flex flex-col items-center justify-center pt-36 pb-20 px-6 text-center">
                <div className="flex flex-col items-center">
                    <p className="coord-label mb-5 fade-in">
                        48.8566° N &nbsp; 2.3522° E &nbsp; · &nbsp; 35.6762° N &nbsp; 139.6503° E
                    </p>

                    <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-terra fade-in fade-in-delay-1">
                        About Us
                    </p>

                    <h1 className="max-w-4xl font-display text-5xl sm:text-6xl md:text-7xl font-semibold leading-[0.92] text-sand fade-in fade-in-delay-1">
                        The Art of Mindful Travel
                    </h1>

                    <p className="mt-8 max-w-2xl text-sm leading-relaxed text-sand/65 fade-in fade-in-delay-2 font-light">
                        Voyage is an intelligent, editorial travel companion designed for those who seek depth, context, and beauty in their journeys. We believe travel is not just about check-ins and bucket lists; it is about resonant experiences, cultural immersion, and seamless discovery.
                    </p>
                </div>
            </section>

            {/* ── Our Story Section ── */}
            <section className="relative z-10 mx-auto max-w-5xl px-8 pb-24 grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="font-display text-4xl font-semibold text-sand leading-tight">
                        Why <span className="text-terra">Voyage</span>
                    </h2>
                    <p className="text-sm leading-relaxed text-sand/70 font-body font-light">
                        Modern travel planning is broken. It has become a fragmented maze of chaotic review boards, aggressive advertising, and cookie-cutter itineraries that ignore who you are. We set out to change this by creating a quiet space for travelers.
                    </p>
                    <p className="text-sm leading-relaxed text-sand/70 font-body font-light">
                        Voyage leverages machine learning to understand your unique Travel DNA. Whether you are a slow-traveling coffee enthusiast, an architectural seeker, or an off-grid adventurer, Voyage crafts recommendations that speak directly to your curiosity.
                    </p>
                </div>

                <div className="glass-card rounded-2xl p-8 border border-sand/5 relative overflow-hidden flex flex-col justify-between h-[280px]">
                    <div className="absolute top-0 right-0 p-6 opacity-5 font-display text-[10rem] font-bold select-none leading-none text-sand pointer-events-none">
                        V
                    </div>
                    <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-sage mb-2 font-semibold">The Vision</p>
                        <h3 className="font-display text-2xl font-semibold text-sand mb-4 leading-snug">
                            "Travel is the only thing you buy that makes you richer."
                        </h3>
                    </div>
                    <div>
                        <p className="text-xs text-sand/50 italic">— Voyage</p>
                        <p className="coord-label mt-3">27.1751° N &nbsp; 78.0421° E</p>
                    </div>
                </div>
            </section>

            {/* ── Core Features Section ── */}
            <section className="relative z-10 mx-auto max-w-6xl px-8 pb-24">
                <div className="text-center mb-12">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-terra mb-2">Capabilities</p>
                    <h2 className="font-display text-4xl font-semibold text-sand">Intelligent Architecture</h2>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 stagger-in">
                    <div className="glass-card card-lift rounded-2xl p-6 border border-sand/5 flex flex-col justify-between min-h-[220px]">
                        <div>
                            <div className="w-8 h-8 rounded-full bg-terra/10 flex items-center justify-center text-terra mb-4">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11.5c0-.733.056-1.45.163-2.149m7.443 11.751A17.947 17.947 0 0019 15.75m-1.272-3.17a3 3 0 00-4.242 0M8.272 6.582a12.2 12.2 0 0110.516 0m-10.516 0A12.2 12.2 0 003 11.5c0 2.222.61 4.29 1.671 6.059" />
                                </svg>
                            </div>
                            <h3 className="text-xs font-semibold text-sand tracking-wide uppercase mb-2">Travel DNA</h3>
                            <p className="text-[0.7rem] leading-relaxed text-sand/65 font-light">
                                Analyzes your unique preferences, pace, and lifestyle values to deliver tailormade recommendations.
                            </p>
                        </div>
                        <p className="coord-label mt-4">Personalized Recommendations</p>
                    </div>

                    <div className="glass-card card-lift rounded-2xl p-6 border border-sand/5 flex flex-col justify-between min-h-[220px]">
                        <div>
                            <div className="w-8 h-8 rounded-full bg-sage/10 flex items-center justify-center text-sage mb-4">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xs font-semibold text-sand tracking-wide uppercase mb-2">Cost Prediction</h3>
                            <p className="text-[0.7rem] leading-relaxed text-sand/65 font-light">
                                Uses historical data models to forecast accommodation, travel, and leisure budgets dynamically.
                            </p>
                        </div>
                        <p className="coord-label mt-4">Predictive Budgeting</p>
                    </div>

                    <div className="glass-card card-lift rounded-2xl p-6 border border-sand/5 flex flex-col justify-between min-h-[220px]">
                        <div>
                            <div className="w-8 h-8 rounded-full bg-terra/10 flex items-center justify-center text-terra mb-4">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                            </div>
                            <h3 className="text-xs font-semibold text-sand tracking-wide uppercase mb-2">Trip Management</h3>
                            <p className="text-[0.7rem] leading-relaxed text-sand/65 font-light">
                                Organizes multi-city itineraries, bookings, and interactive schedules in a beautifully minimalist dashboard.
                            </p>
                        </div>
                        <p className="coord-label mt-4">Intuitive Dashboard</p>
                    </div>

                    <div className="glass-card card-lift rounded-2xl p-6 border border-sand/5 flex flex-col justify-between min-h-[220px]">
                        <div>
                            <div className="w-8 h-8 rounded-full bg-sage/10 flex items-center justify-center text-sage mb-4">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xs font-semibold text-sand tracking-wide uppercase mb-2">AI-Driven Insights</h3>
                            <p className="text-[0.7rem] leading-relaxed text-sand/65 font-light">
                                Enriches your travel planning with custom-tailored restaurant recommendations, route directions, and hidden gems.
                            </p>
                        </div>
                        <p className="coord-label mt-4">Gemini AI Assistant</p>
                    </div>
                </div>
            </section>

            {/* ── Tech Stack & Future Road Map Section ── */}
            <section className="relative z-10 mx-auto max-w-5xl px-8 pb-24 grid md:grid-cols-2 gap-12">
                {/* Tech Stack */}
                <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-terra mb-2">Under The Hood</p>
                    <h2 className="font-display text-3xl font-semibold text-sand mb-6">Our Modern Stack</h2>
                    <p className="text-sm leading-relaxed text-sand/65 mb-6 font-light">
                        Voyage is engineered using a robust, modern technology stack that prioritizes speed, high-fidelity interactivity, and server-side optimization.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {["Next.js 16", "React 19", "Tailwind CSS v4", "FastAPI", "SQLAlchemy", "SQLite", "Gemini AI"].map((tech) => (
                            <div key={tech} className="rounded-full border border-sand/10 px-5 py-2 text-xs text-sand/80 bg-sand/3">
                                {tech}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Future AI Features */}
                <div className="glass-card rounded-2xl p-8 border border-sand/5">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-sage mb-2">Next Horizon</p>
                    <h2 className="font-display text-3xl font-semibold text-sand mb-6">Future AI Roadmap</h2>

                    <ul className="space-y-4 font-body text-xs text-sand/75">
                        <li className="flex items-start gap-3">
                            <span className="text-terra mt-0.5">▪</span>
                            <div>
                                <strong className="text-sand block mb-0.5 font-medium">Machine Learning Based Cost Prediction</strong>
                                Refining estimates with deep neural networks analyzing global travel pricing trends in real time.
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-terra mt-0.5">▪</span>
                            <div>
                                <strong className="text-sand block mb-0.5 font-medium">Personalized Itinerary Generation</strong>
                                Instant day-by-day maps generated dynamically by LLMs matching your pace, mood, and weather.
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-terra mt-0.5">▪</span>
                            <div>
                                <strong className="text-sand block mb-0.5 font-medium">Hidden Destination Discovery</strong>
                                An AI discovery model designed specifically to flag less-crowded, high-satisfaction alternatives.
                            </div>
                        </li>
                    </ul>
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