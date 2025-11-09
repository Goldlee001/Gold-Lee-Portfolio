import Header from "@/components/Header";
import StickyNav from "@/components/StickyNav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100">
      {/* Header with mic + notification + theme toggle */}

      {/* Sticky Navigation */}
      <div className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-black/50 border-b border-gray-200 dark:border-gray-800">
      </div>

      {/* Hero Section */}
      <Hero />

<About />
<Skills />
<Projects />
<Experience />
<Education />
<Contact />


    </main>
  );
}
