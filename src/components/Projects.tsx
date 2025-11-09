"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl?: string;
  codeUrl?: string;
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [broken, setBroken] = useState<boolean[]>([]);

  const projects: Project[] = [
    {
      title: "Gold Lee Portfolio",
      description:
        "A modern, animated personal portfolio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.",
      image: "/images/gold.png",
      tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
      liveUrl: "https://yourportfolio.com",
      codeUrl: "https://github.com/yourgithub/portfolio",
    },
    {
      title: "Admin Dashboard",
      description:
        "A responsive admin panel featuring file uploads, analytics, and MongoDB integration.",
      image: "/images/gold.png",
      tech: ["React", "MongoDB", "Express", "Node.js"],
      liveUrl: "https://admindemo.com",
      codeUrl: "https://github.com/yourgithub/admin-dashboard",
    },
    {
      title: "E-commerce Store",
      description:
        "An online store with secure checkout, product filters, and dynamic cart functionality.",
      image: "/images/gold.png",
      tech: ["Next.js", "Stripe", "MongoDB", "Tailwind"],
      liveUrl: "https://mystore.com",
      codeUrl: "https://github.com/yourgithub/ecommerce",
    },
  ];

  // Ensure broken state matches projects length
  if (broken.length !== projects.length) {
    // initialize once per render mismatch
    // eslint-disable-next-line react-hooks/rules-of-hooks
    setBroken(projects.map(() => false));
  }

  // Initialize/resize broken state once to match projects length
  useEffect(() => {
    setBroken((prev) => (prev.length === projects.length ? prev : projects.map(() => false)));
  }, [projects.length]);

  return (
    <section
      id="projects"
      className="relative min-h-screen py-24 px-6 md:px-16 bg-gray-50 dark:bg-gray-950"
    >
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center mb-12"
      >
        Featured <span className="text-[#2CA8E2]">Projects</span>
      </motion.h2>

      {/* Projects Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-[0_0_15px_#2CA8E280] transition-all duration-300"
          >
            {/* Thumbnail */}
            <div
              className="relative w-full h-52 cursor-pointer"
              onClick={() => setSelected(project)}
            >
              <Image
                src={broken[index] ? "/images/gold.png" : project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                onError={() =>
                  setBroken((prev) => {
                    const next = prev.length ? [...prev] : projects.map(() => false);
                    next[index] = true;
                    return next;
                  })
                }
              />
            </div>

            {/* Info */}
            <div className="p-5">
              <h3 className="text-lg font-semibold text-[#2CA8E2] mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded-full bg-[#2CA8E2]/10 text-[#2CA8E2]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 hover:text-[#2CA8E2]"
                  >
                    <ExternalLink className="w-4 h-4" /> Live
                  </a>
                )}
                {project.codeUrl && (
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 hover:text-[#2CA8E2]"
                  >
                    <Github className="w-4 h-4" /> Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Preview */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-6"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-xl w-full shadow-2xl border border-gray-200 dark:border-gray-800"
          >
            <h3 className="text-2xl font-semibold text-[#2CA8E2] mb-3">
              {selected.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {selected.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {selected.tech.map((t, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded-full bg-[#2CA8E2]/10 text-[#2CA8E2]"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              {selected.liveUrl && (
                <a
                  href={selected.liveUrl}
                  target="_blank"
                  className="flex items-center gap-1 text-[#2CA8E2] hover:underline"
                >
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
              {selected.codeUrl && (
                <a
                  href={selected.codeUrl}
                  target="_blank"
                  className="flex items-center gap-1 text-[#2CA8E2] hover:underline"
                >
                  <Github className="w-4 h-4" /> Source Code
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
