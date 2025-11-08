"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Home, FolderKanban, Wrench, User, Mail } from "lucide-react";

type NavItem = { id: string; label: string; icon: React.ReactNode };

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", icon: <Home className="w-5 h-5" /> },
  { id: "projects", label: "Projects", icon: <FolderKanban className="w-5 h-5" /> },
  { id: "skills", label: "Skills", icon: <Wrench className="w-5 h-5" /> },
  { id: "about", label: "About", icon: <User className="w-5 h-5" /> },
  { id: "contact", label: "Contact", icon: <Mail className="w-5 h-5" /> },
];

export default function StickyNav() {
  const active = useActiveSection(NAV_ITEMS.map((i) => i.id));

  // close menu on resize if needed
  useEffect(() => {
    const onResize = () => window.scrollY; // dummy effect to avoid warnings
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.nav
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="
        fixed bottom-0 left-0 right-0 
        z-50 
        bg-white/70 dark:bg-gray-900/70 
        backdrop-blur border-t border-gray-200 dark:border-gray-800
        sm:sticky sm:top-0 sm:bottom-auto
      "
    >
      <div className="max-w-3xl mx-auto flex items-center justify-around h-14 sm:justify-center sm:gap-8">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`flex flex-col items-center justify-center text-xs font-medium transition-all duration-200
                ${
                  isActive
                    ? "text-purple-600 dark:text-purple-300"
                    : "text-gray-700 dark:text-gray-300 hover:text-purple-500"
                }`}
            >
              <div
                className={`p-2 rounded-full ${
                  isActive
                    ? "bg-purple-100 dark:bg-purple-900/40"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {item.icon}
              </div>
              <span className="hidden sm:inline text-sm mt-1">{item.label}</span>
            </a>
          );
        })}
      </div>
    </motion.nav>
  );
}
