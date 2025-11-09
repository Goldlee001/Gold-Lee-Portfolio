"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Skills() {
  const skills = [
    { name: "React", icon: "/icons/react.svg" },
    { name: "Next.js", icon: "/icons/nextjs.svg" },
    { name: "TypeScript", icon: "/icons/typescript.svg" },
    { name: "Tailwind CSS", icon: "/icons/tailwind.svg" },
    { name: "Node.js", icon: "/icons/nodejs.svg" },
    { name: "MongoDB", icon: "/icons/mongodb.svg" },
    { name: "Framer Motion", icon: "/icons/framer.svg" },
    { name: "Git", icon: "/icons/git.svg" },
  ];

  return (
    <section
      id="skills"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 sm:px-12 py-24 overflow-hidden
                 bg-gradient-to-b from-ninja-white to-white dark:from-ninja-dark dark:to-black transition-colors duration-500"
    >
      {/* 💫 Floating Background Glow */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#2CA8E2]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#2CA8E2]/10 rounded-full blur-3xl" />

      {/* 🧠 Header */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-extrabold mb-16 text-gray-900 dark:text-white"
      >
        My <span className="text-[#2CA8E2]">Tech Stack</span>
      </motion.h2>

      {/* ⚙️ Skills Grid (4x2 layout) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 md:gap-14">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center gap-3 cursor-pointer group"
          >
            {/* 🧩 Skill Icon */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center
                         bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700
                         transition-all duration-300 group-hover:shadow-[0_0_25px_#2CA8E2aa]"
            >
              <Image
                src={skill.icon}
                alt={skill.name}
                width={48}
                height={48}
                className="object-contain"
              />
            </div>

            {/* 🏷 Skill Name */}
            <span className="text-base font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#2CA8E2] transition">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
