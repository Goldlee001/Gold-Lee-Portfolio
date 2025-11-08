"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 px-6 sm:px-12 text-center md:text-left overflow-hidden bg-gradient-to-b from-ninja-white to-white dark:from-ninja-dark dark:to-black"
    >
      {/* 💫 Floating Orbs */}
      <motion.div
        initial={false}
        className="absolute top-20 left-10 w-64 h-64 bg-[#2CA8E2]/20 rounded-full blur-3xl"
        animate={{ x: [0, 50, -50, 0], y: [0, -30, 30, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
      />
      <motion.div
        initial={false}
        className="absolute bottom-20 right-10 w-80 h-80 bg-[#2CA8E2]/10 rounded-full blur-3xl"
        animate={{ x: [0, -60, 60, 0], y: [0, 30, -30, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut' }}
      />

      {/* 👋 Intro */}
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-xl space-y-5"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
          Hi 👋, I’m <span className="text-[#2CA8E2]">GOLD LEE</span>
        </h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg sm:text-xl text-gray-600 dark:text-gray-300"
        >
          A passionate{" "}
          <span className="text-[#2CA8E2] font-semibold">
            Full-Stack Developer
          </span>{" "}
          crafting dynamic, creative digital experiences.
        </motion.h2>

        {/* 🔘 Buttons */}
        <div className="flex justify-center md:justify-start gap-4 pt-4">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-[#2CA8E2] text-white px-6 py-3 rounded-full shadow-md hover:bg-[#2492c7] transition"
          >
            View My Work
            <ArrowRight className="w-4 h-4" />
          </motion.a>

          <motion.a
            href="/resume.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 border border-[#2CA8E2] text-[#2CA8E2]
            dark:text-[#2CA8E2] dark:border-[#2CA8E2]
            px-6 py-3 rounded-full hover:bg-[#2CA8E2] hover:text-white transition"
          >
            <Download className="w-4 h-4" />
            Resume
          </motion.a>
        </div>

        {/* 🌐 Social Icons */}
        <div className="flex justify-center md:justify-start gap-5 pt-8">
          <SocialIcon href="https://github.com/yourusername" label="GitHub">
            <Github />
          </SocialIcon>
          <SocialIcon href="https://linkedin.com/in/yourusername" label="LinkedIn">
            <Linkedin />
          </SocialIcon>
          <SocialIcon href="mailto:goldlee@example.com" label="Email">
            <Mail />
          </SocialIcon>
        </div>
      </motion.div>

      {/* 🖼️ Profile Image */}
      <motion.div
        initial={false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10"
      >
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-[#2CA8E2] shadow-lg">
          <Image
            src="/images/profile.jpg"
            alt="GOLD LEE portrait"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* ✨ Glowing Ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "0 0 0px #2CA8E2",
              "0 0 25px #2CA8E2",
              "0 0 0px #2CA8E2",
            ],
          }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        />
      </motion.div>
    </section>
  );
}

interface SocialIconProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

function SocialIcon({ href, label, children }: SocialIconProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.2, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className="p-3 rounded-full bg-[#2CA8E2]/10 hover:bg-[#2CA8E2]/20 dark:bg-[#2CA8E2]/10 dark:hover:bg-[#2CA8E2]/20 transition"
    >
      <span className="text-[#2CA8E2] w-6 h-6 flex items-center justify-center">
        {children}
      </span>
    </motion.a>
  );
}
