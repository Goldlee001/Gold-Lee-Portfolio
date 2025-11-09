"use client";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function HeroBackground() {
  const [mounted, setMounted] = useState(false);
  const ORB_COUNT = 5;
  const STAR_COUNT = 40;

  const indicesOrbs = useMemo(() => Array.from({ length: ORB_COUNT }, (_, i) => i), []);
  const indicesStars = useMemo(() => Array.from({ length: STAR_COUNT }, (_, i) => i), []);

  const [orbs, setOrbs] = useState<{ width: number; height: number; top: string; left: string }[]>([]);
  const [stars, setStars] = useState<{ top: string; left: string; duration: number; delay: number }[]>([]);

  useEffect(() => {
    setMounted(true);

    const genOrbs = indicesOrbs.map((i) => ({
      width: 200 + i * 50,
      height: 200 + i * 50,
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 80}%`,
    }));

    const genStars = indicesStars.map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 5,
    }));

    setOrbs(genOrbs);
    setStars(genStars);
  }, [indicesOrbs, indicesStars]);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Orbs */}
      {orbs.map((o, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full blur-3xl opacity-40"
          style={{
            background: `radial-gradient(circle at center, rgba(44,168,226,0.6), transparent 70%)`,
            width: `${o.width}px`,
            height: `${o.height}px`,
            top: o.top,
            left: o.left,
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.5, 0.8, 0.6, 0.5],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Twinkling Stars */}
      {stars.map((s, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute rounded-full bg-white dark:bg-cyan-400"
          style={{
            width: "2px",
            height: "2px",
            top: s.top,
            left: s.left,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.8, 1.4, 0.8],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
