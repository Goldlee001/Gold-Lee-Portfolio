"use client";
import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="relative flex flex-col md:flex-row items-center justify-center gap-12 px-6 sm:px-12 py-24 overflow-hidden bg-gradient-to-b from-ninja-white to-white dark:from-ninja-dark dark:to-black transition-colors duration-500"
    >
      {/* 🔵 Glowing Background Orbs */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-[#2CA8E2]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#2CA8E2]/10 rounded-full blur-3xl" />

      {/* 🥷 Ninja Image */}
      <div className="relative w-full md:w-[380px] h-[500px] flex-shrink-0 flex justify-center items-center">
        <div className="relative w-[300px] h-[500px]">
          <Image
            src="/images/gold.jpg"
            alt="About image"
            fill
                className="object-contain opacity-60 saturate-150
                           drop-shadow-[0_0_8px_#2CA8E2] dark:drop-shadow-[0_0_12px_#2CA8E2]"
                priority
          />
        </div>
      </div>

      {/* 🧠 About Text */}
      <div className="relative z-10 max-w-xl text-center md:text-left space-y-5">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2CA8E2]">
          About Me
        </h2>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          I'm <span className="text-[#2CA8E2] font-semibold">GOLD LEE</span> — a
          passionate and detail-driven <span className="font-semibold">Full-Stack Developer</span> 
          who thrives on transforming bold ideas into interactive, high-performance digital products.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Like a ninja, I move with precision and purpose — writing clean,
          efficient code while maintaining an eye for beautiful and intuitive
          user experiences. I believe every project should balance design, logic,
          and emotion to truly connect with people.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          My expertise spans <span className="text-[#2CA8E2] font-medium">Next.js</span>,
          <span className="text-[#2CA8E2] font-medium"> React</span>,{" "}
          <span className="text-[#2CA8E2] font-medium">TypeScript</span>, and{" "}
          <span className="text-[#2CA8E2] font-medium">Tailwind CSS</span>. I enjoy
          bringing animations to life with <span className="text-[#2CA8E2] font-medium">Framer Motion</span>,
          making interfaces feel dynamic and alive.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Beyond coding, I’m deeply interested in UI/UX design, problem-solving,
          and creating systems that merge aesthetics with functionality. I’m also
          an advocate for learning, mentorship, and open-source collaboration.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          When I’m not writing code, you’ll probably find me exploring new
          technologies, sketching new ideas, or refining my craft — because just
          like a ninja, mastery comes through constant practice and discipline.
        </p>
      </div>
    </section>
  );
}
