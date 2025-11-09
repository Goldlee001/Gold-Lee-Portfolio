"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Home,
  FolderKanban,
  Wrench,
  User,
  Mail,
} from "lucide-react";
import Greeting from "./Greeting";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import { useActiveSection } from "@/hooks/useActiveSection";

export default function Header() {
  const [visits, setVisits] = useState<number>(0);

  useEffect(() => {
    async function recordAndLoadVisits() {
      try {
        await fetch("/api/visits", { method: "POST" });
      } catch (e) {
        // ignore; analytics best-effort
      }
      try {
        const res = await fetch("/api/visits");
        const data = await res.json();
        // API returns { today, week, total }
        if (typeof data?.total === "number") setVisits(data.total);
      } catch (e) {
        console.error(e);
      }
    }
    recordAndLoadVisits();
  }, []);

  const NAV_ITEMS = [
    { id: "home", label: "Home", icon: <Home className="w-4 h-4" /> },
    { id: "about", label: "About", icon: <User className="w-4 h-4" /> },
    { id: "skills", label: "Skills", icon: <Wrench className="w-4 h-4" /> },
    { id: "projects", label: "Projects", icon: <FolderKanban className="w-4 h-4" /> },
    { id: "contact", label: "Contact", icon: <Mail className="w-4 h-4" /> },
  ];

  const active = useActiveSection(NAV_ITEMS.map((i) => i.id));

  return (
    <>
      {/* 🌟 Desktop Header (top) */}
      <motion.header
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden md:flex items-center justify-between px-6 py-3 border-b backdrop-blur-xl shadow-lg bg-ninja-white/90 border-ninja-steel dark:bg-ninja-dark/90 dark:border-ninja-steel/60 sticky top-0 z-50"
      >
        {/* Left: Logo */}
        <div className="flex items-center gap-3 select-none">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full dark:bg-[radial-gradient(circle_at_center,rgba(44,168,226,0.35)_0%,transparent_70%)]" />
            <Image
              src="/logo.png"
              alt="Gold Lee Logo"
              fill
              className="object-contain transition-all duration-500 drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_0_10px_#2CA8E2]"
              priority
            />
          </div>
        </div>

        {/* Center: Navigation */}
        <nav className="flex items-center gap-6">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`${isActive ? "text-[#2CA8E2]" : "text-gray-700 dark:text-gray-300 hover:text-[#2CA8E2]"} flex flex-col items-center justify-center text-[11px] font-medium transition-all duration-200`}
              >
                <div
                  className={`${isActive ? "bg-[#2CA8E2]/15 dark:bg-[#2CA8E2]/20" : "hover:bg-gray-100 dark:hover:bg-gray-800"} p-1.5 rounded-full transition-all duration-300`}
                >
                  {item.icon}
                </div>
                <span className="mt-1">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right: Greeting, Bell, Theme */}
        <div className="flex items-center gap-3">
          <Greeting />
          <div className="relative cursor-pointer">
            <Bell
              className="w-4 h-4 transition-colors duration-300 text-ninja-steel hover:text-ninja-glow dark:text-ninja-white dark:hover:text-ninja-glow"
            />
            {visits > 0 && (
              <span
                className="absolute -top-2 -right-2 text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center shadow-md bg-ninja-glow text-ninja-dark"
              >
                {visits}
              </span>
            )}
          </div>
          <ThemeToggle />
        </div>
      </motion.header>

      {/* 📱 Mobile Header (top) */}
      <motion.header
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex md:hidden items-center justify-between px-4 py-2 border-b backdrop-blur-xl shadow-sm bg-ninja-white/90 border-ninja-steel/40 dark:bg-ninja-dark/90 dark:border-ninja-steel/60 fixed top-0 left-0 right-0 z-50"
      >
        {/* Left: Logo */}
        <div className="relative w-9 h-9">
          <Image
            src="/logo.png"
            alt="Gold Lee Logo"
            fill
            className="object-contain transition-all duration-300"
            priority
          />
        </div>

        {/* Right: Greeting, Bell, Theme */}
        <div className="flex items-center gap-2">
          <Greeting />
<div className="relative cursor-pointer">
  <Bell className="w-4 h-4 text-ninja-steel dark:text-ninja-white" />
  {visits > 0 && (
    <span className="absolute -top-1 -right-1 text-[9px] font-semibold rounded-full w-3.5 h-3.5 flex items-center justify-center bg-ninja-glow text-ninja-dark">
      {visits}
    </span>
  )}
</div>

          <ThemeToggle />
        </div>
      </motion.header>

      {/* 📱 Mobile Navbar (bottom) */}
      <motion.nav
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden items-center justify-around py-2 border-t border-ninja-steel/40 backdrop-blur-xl bg-ninja-white/90 dark:bg-ninja-dark/90 shadow-[0_-2px_10px_rgba(0,0,0,0.15)]"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`${isActive ? "text-[#2CA8E2]" : "text-gray-700 dark:text-gray-300 hover:text-[#2CA8E2]"} flex flex-col items-center text-[10px] font-medium transition-all duration-200`}
            >
              <div
                className={`${isActive ? "bg-[#2CA8E2]/15 dark:bg-[#2CA8E2]/20" : "hover:bg-gray-100 dark:hover:bg-gray-800"} p-1.5 rounded-full transition-all duration-300`}
              >
                {item.icon}
              </div>
            </a>
          );
        })}
      </motion.nav>
    </>
  );
}
