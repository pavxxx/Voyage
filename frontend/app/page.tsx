import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      <nav className="fixed top-0 left-0 right-0 flex items-center justify-between px-12 py-6">
        <h1 className="text-xl font-bold text-orange-400">
          Smart Travel Companion
        </h1>

        <div className="flex gap-8 text-zinc-300">

          <button>Features</button>

          <button>About</button>

          <Link href="/login">
            <button className="hover:text-orange-400 transition">
              Login
            </button>
          </Link>

        </div>
      </nav>

      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">

        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-orange-400">
          AI Powered Travel Planning
        </p>

        <h1 className="max-w-5xl text-6xl font-bold leading-tight md:text-8xl">
          Travel Smarter.
          <br />
          Explore Deeper.
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-zinc-400">
          Your intelligent travel companion that learns your preferences,
          predicts costs, discovers hidden gems, and helps you plan better
          journeys.
        </p>

        <div className="mt-10 flex gap-4">

          <Link href="/login">
            <button className="rounded-full bg-orange-500 px-8 py-4 font-semibold text-black transition hover:bg-orange-400">
              Start Planning
            </button>
          </Link>

          <button className="rounded-full border border-zinc-700 px-8 py-4 transition hover:border-orange-500">
            Learn More
          </button>

        </div>

        <div className="mt-24 grid grid-cols-3 gap-6">

          <div className="rounded-2xl border border-zinc-800 p-6">
            <h2 className="text-3xl font-bold text-orange-400">
              100+
            </h2>
            <p className="text-zinc-400">
              Destinations
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 p-6">
            <h2 className="text-3xl font-bold text-orange-400">
              AI
            </h2>
            <p className="text-zinc-400">
              Personalized Planning
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 p-6">
            <h2 className="text-3xl font-bold text-orange-400">
              24/7
            </h2>
            <p className="text-zinc-400">
              Smart Assistance
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}