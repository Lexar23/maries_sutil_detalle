"use client";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Hero = () => {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-40 md:pt-52 pb-12 text-center md:px-20 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="z-10"
            >
                <div className="inline-flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full text-foreground/80 text-sm font-medium mb-6">
                    <Heart className="w-4 h-4 fill-accent" />
                    Especial de San Valentín
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                    El <span className="text-romantic">Detalle Perfecto</span> <br /> para Enamorar
                </h1>

                <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-10">
                    Cajas con los mejores chocolates, diseñadas para derretir corazones.
                    Haz que este 14 de febrero sea inolvidable.
                </p>

                <div className="flex justify-center items-center">
                    <motion.a
                        href="#catalog"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-romantic text-white px-10 py-4 rounded-xl text-lg font-bold shadow-lg shadow-romantic/30 cursor-pointer"
                    >
                        Ver Catálogo
                    </motion.a>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="mt-16 w-full max-w-lg z-10"
            >
                {/* SVG Chocolate Box */}
                <svg viewBox="0 0 500 400" className="w-full drop-shadow-2xl">
                    <defs>
                        <linearGradient id="boxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: "#8b5e34", stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: "#5d4037", stopOpacity: 1 }} />
                        </linearGradient>
                        <filter id="shadow">
                            <feDropShadow dx="0" dy="5" stdDeviation="5" floodOpacity="0.3" />
                        </filter>
                    </defs>

                    {/* Main Box Body */}
                    <motion.rect
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2 }}
                        x="50" y="100" width="400" height="250" rx="20" fill="url(#boxGradient)"
                    />

                    {/* Box Lid (open-ish) */}
                    <motion.path
                        d="M50 120 L450 120 L470 70 L30 70 Z"
                        fill="#a67c52"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                    />

                    {/* Ribbons */}
                    <motion.path
                        d="M230 100 L230 350 M270 100 L270 350"
                        stroke="#ff4d6d"
                        strokeWidth="30"
                        fill="none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                    />

                    {/* Bow */}
                    <motion.path
                        d="M250 100 C 200 50, 150 100, 250 100 C 350 100, 300 50, 250 100"
                        fill="#ff4d6d"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1.2 }}
                        transition={{ delay: 1.8, type: "spring" }}
                    />

                    {/* Individual Chocolates */}
                    <g transform="translate(100, 150)">
                        {[0, 1, 2].map(row => (
                            [0, 1, 2, 3].map(col => (
                                <motion.circle
                                    key={`${row}-${col}`}
                                    cx={col * 100} cy={row * 80} r="25"
                                    fill={col % 2 === 0 ? "#3e2723" : "#5d4037"}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 2 + (row * 0.2) + (col * 0.1) }}
                                />
                            ))
                        ))}
                    </g>

                    <motion.path
                        d="M250 170 C 270 150 300 150 300 180 C 300 210 250 240 250 240 C 250 240 200 210 200 180 C 200 150 230 150 250 170"
                        fill="#ffccd5"
                        stroke="#ff4d6d"
                        strokeWidth="2"
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: 3 }}
                    />
                </svg>
            </motion.div>
        </section>
    );
};

export default Hero;
