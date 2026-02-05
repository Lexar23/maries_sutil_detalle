"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Catálogo", href: "/#catalog" },
        { name: "Nosotros", href: "/about" },
        { name: "FAQ", href: "/faq" },
        { name: "Contacto", href: "/contact" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled
                ? "py-3 bg-white/95 backdrop-blur-md shadow-md border-b border-romantic/10"
                : "py-6 bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="relative z-[110] transition-transform hover:scale-105 active:scale-95">
                    <div className="relative h-12 md:h-16 w-32 md:w-40">
                        <Image
                            src="/logo.png"
                            alt="Marie's Sutil Detalle"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-bold uppercase tracking-widest text-foreground hover:text-romantic transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-romantic transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                    <Link
                        href="/#catalog"
                        className="bg-romantic text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-romantic/20 hover:bg-romantic/90 hover:-translate-y-0.5 transition-all"
                    >
                        Comprar
                    </Link>
                </nav>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden relative z-[110] p-3 text-romantic bg-white rounded-2xl shadow-lg border border-romantic/10"
                    aria-label="Menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-[105] bg-white flex flex-col items-center justify-center p-10 gap-8"
                    >
                        <div className="absolute top-0 left-0 w-full h-full bg-[#fbeee6]/50 -z-10" />

                        <div className="relative w-32 h-32 mb-8">
                            <Image
                                src="/logo.png"
                                alt="Marie's Sutil Detalle"
                                fill
                                className="object-contain"
                            />
                        </div>

                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-3xl font-playfair font-black text-foreground hover:text-romantic transition-all"
                            >
                                {link.name}
                            </Link>
                        ))}

                        <Link
                            href="/#catalog"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="mt-4 bg-romantic text-white px-12 py-5 rounded-3xl font-black text-xl shadow-2xl shadow-romantic/30 hover:scale-105 active:scale-95 transition-all"
                        >
                            Ver Catálogo
                        </Link>

                        <div className="mt-12 flex gap-4 text-romantic/30">
                            <Heart size={20} className="animate-pulse" />
                            <Heart size={20} className="animate-pulse delay-75" />
                            <Heart size={20} className="animate-pulse delay-150" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
