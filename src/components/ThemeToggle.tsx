"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title="Toggle theme"
      className={`
        p-1.5 rounded-full transition-all duration-300
        border border-ninja-steel/30 shadow-sm
        hover:scale-105 active:scale-95
        ${theme === "dark"
          ? "bg-ninja-blue-dark hover:bg-ninja-steel/40"
          : "bg-ninja-dark hover:bg-ninja-glow/10"
        }
      `}
    >
      {theme === "dark" ? (
        <Sun className="w-3.5 h-3.5 text-ninja-glow drop-shadow-[0_0_3px_#2CA8E2]" />
      ) : (
        <Moon className="w-3.5 h-3.5 text-ninja-gray hover:text-ninja-glow transition-colors" />
      )}
    </button>
  );
}
