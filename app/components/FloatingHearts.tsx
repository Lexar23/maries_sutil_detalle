"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { benchmark } from "../lib/benchmark";

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; delay: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    benchmark.start("floating-hearts-init");
    const newHearts = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 10,
      duration: Math.random() * 10 + 10,
      size: Math.random() * 20 + 15,
    }));
    setHearts(newHearts);
    benchmark.end("floating-hearts-init");
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {hearts.map((heart) => (
        <motion.svg
          key={heart.id}
          initial={{ y: "110vh", opacity: 0, rotate: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.4, 0.4, 0],
            rotate: 360
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear"
          }}
          style={{
            left: heart.left,
            width: heart.size,
            height: heart.size,
            position: "absolute"
          }}
          viewBox="0 0 24 24"
          fill="rgba(255, 77, 109, 0.4)"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </motion.svg>
      ))}
    </div>
  );
};

export default FloatingHearts;
