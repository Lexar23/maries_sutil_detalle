"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Menu, X } from "lucide-react";
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
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled
                ? "py-4 bg-white/70 backdrop-blur-xl border-b border-romantic/10 shadow-sm"
                : "py-8 bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-20 flex justify-between items-center text-foreground font-medium">
                {/* Logo Section */}
                <div className="flex-1 flex justify-start">
                    <Link href="/" className="group transition-all hover:opacity-80">
                        <div className="relative h-12 md:h-16 w-24 md:w-32">
                            <Image
                                src="/logo.png"
                                alt="Marie's Sutil Detalle"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm uppercase tracking-widest hover:text-romantic transition-colors duration-300 relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-romantic transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                    <Link
                        href="/#catalog"
                        className="bg-romantic text-white px-6 py-2.5 rounded-full text-xs uppercase tracking-tighter font-black hover:bg-romantic/90 transition-all shadow-lg shadow-romantic/20"
                    >
                        Comprar
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden flex-1 flex justify-end">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 text-foreground"
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-romantic/10 overflow-hidden"
                    >
                        <div className="flex flex-col p-8 gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-xl font-playfair font-bold text-foreground hover:text-romantic transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/#catalog"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="bg-romantic text-white py-4 rounded-2xl font-bold text-center shadow-lg shadow-romantic/20"
                            >
                                Ver Catálogo
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
