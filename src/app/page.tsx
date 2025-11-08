import Header from "@/components/Header";
import StickyNav from "@/components/StickyNav";
import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100">
      {/* Header with mic + notification + theme toggle */}

      {/* Sticky Navigation */}
      <div className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-black/50 border-b border-gray-200 dark:border-gray-800">
      </div>

      {/* Hero Section */}
      <Hero />

      {/* Example other section */}
      <section id="projects" className="min-h-screen px-6 py-24 bg-gray-50 dark:bg-gray-950">
        <h2 className="text-3xl font-bold text-center mb-6 text-purple-600 dark:text-purple-400">
          Projects
        </h2>
        <p className="max-w-2xl mx-auto text-center text-gray-600 dark:text-gray-400">
          This is where your future projects will be displayed.
        </p>
      </section>
    </main>
  );
}
