import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-ink text-sand">

      {/* ── Coordinate Texture Background ── */}
      <div className="coord-texture fixed inset-0 pointer-events-none z-0" />

      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-14 py-5 bg-ink/70 backdrop-blur-md border-b border-sand/5">
        <Link href="/" className="font-display text-lg tracking-wide text-terra">
          Voyage
        </Link>

        <div className="flex items-center gap-6 text-[0.7rem] tracking-[0.2em] uppercase text-sand/50">
          <button className="hidden sm:block transition-colors duration-300 hover:text-sand">
            Features
          </button>
          <button className="hidden sm:block transition-colors duration-300 hover:text-sand">
            About
          </button>
          <Link href="/login">
            <button className="px-5 py-2 rounded-full border border-sand/15 text-sand/80 text-[0.7rem] tracking-[0.2em] uppercase transition-all duration-300 hover:border-terra hover:text-terra">
              Login
            </button>
          </Link>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">

        <div className="flex flex-col items-center">
          {/* Decorative Coordinate String */}
          <p className="coord-label mb-5 fade-in">
            27.1751° N &nbsp; 78.0421° E &nbsp; · &nbsp; 48.8566° N &nbsp; 2.3522° E
          </p>

          <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-terra fade-in fade-in-delay-1">
            AI-Powered Travel Planning
          </p>

          <h1 className="max-w-4xl font-display text-5xl sm:text-6xl md:text-7xl font-semibold leading-[0.92] text-sand fade-in fade-in-delay-1">
            Travel Smarter.
            <br />
            <span className="text-sand/15 italic">Explore Deeper.</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-sand/45 fade-in fade-in-delay-2">
            Your intelligent travel companion that learns your preferences,
            predicts costs, discovers hidden gems, and helps you plan better
            journeys — anywhere on the planet.
          </p>

          <div className="mt-8 flex gap-4 fade-in fade-in-delay-3">
            <Link href="/login">
              <button className="group relative rounded-full bg-terra px-7 py-3 font-semibold text-ink text-[0.7rem] uppercase tracking-[0.2em] transition-all duration-400 hover:shadow-[0_0_40px_rgba(201,123,75,0.35)] hover:scale-[1.03]">
                Start Planning
                <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            </Link>

            <button className="rounded-full border border-sand/12 px-7 py-3 text-[0.7rem] uppercase tracking-[0.2em] text-sand/60 transition-all duration-300 hover:border-terra hover:text-terra">
              Learn More
            </button>
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div className="mt-14 grid grid-cols-3 gap-4 w-full max-w-2xl stagger-in">
          <div className="glass-card card-lift rounded-xl p-4 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-terra">
              100+
            </h2>
            <p className="mt-0.5 text-[0.55rem] uppercase tracking-[0.25em] text-sand/35">
              Destinations
            </p>
          </div>

          <div className="glass-card card-lift rounded-xl p-4 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-sage">
              AI
            </h2>
            <p className="mt-0.5 text-[0.55rem] uppercase tracking-[0.25em] text-sand/35">
              Personalized
            </p>
          </div>

          <div className="glass-card card-lift rounded-xl p-4 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-terra">
              24/7
            </h2>
            <p className="mt-0.5 text-[0.55rem] uppercase tracking-[0.25em] text-sand/35">
              Assistance
            </p>
          </div>
        </div>

        {/* Bottom decorative coordinate */}
        <p className="coord-label mt-10 mb-6 fade-in fade-in-delay-3">
          40.7128° N &nbsp; 74.0060° W &nbsp; · &nbsp; 35.6762° N &nbsp; 139.6503° E
        </p>

      </section>

    </main>
  );
}