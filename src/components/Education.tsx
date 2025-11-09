"use client";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export default function Education() {
  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of Innovation",
      period: "2017 - 2021",
      details:
        "Focused on software engineering, algorithms, and web technologies. Graduated with honors and led a team project building a full-stack student portal.",
    },
    {
      degree: "Web Development Certification",
      school: "FreeCodeCamp / Coursera",
      period: "2021",
      details:
        "Completed professional training in React, Node.js, and modern web tooling. Strengthened my skills in responsive and dynamic interfaces.",
    },
  ];

  return (
    <section
      id="education"
      className="relative min-h-screen py-24 px-6 md:px-16 bg-white dark:bg-black overflow-hidden"
    >
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center mb-16"
      >
        My <span className="text-[#2CA8E2]">Education</span>
      </motion.h2>

      {/* Timeline */}
      <div className="relative max-w-3xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-5 md:left-1/2 transform md:-translate-x-1/2 h-full border-l-2 border-[#2CA8E2]/30"></div>

        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className={`relative mb-12 flex flex-col md:flex-row items-start ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Icon */}
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full bg-[#2CA8E2] text-white absolute left-0 md:left-1/2 transform md:-translate-x-1/2 ${
                index % 2 === 0 ? "md:-translate-y-3" : "md:translate-y-3"
              }`}
            >
              <GraduationCap className="w-5 h-5" />
            </div>

            {/* Content Card */}
            <div
              className={`md:w-1/2 mt-8 md:mt-0 ${
                index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-md hover:shadow-[0_0_15px_#2CA8E250] transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-[#2CA8E2]">
                  {edu.degree}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                  {edu.school} | <span>{edu.period}</span>
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {edu.details}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
