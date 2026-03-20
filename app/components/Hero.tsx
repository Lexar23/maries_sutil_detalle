"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const Hero = () => {
    return (
        <section className="relative min-h-[75vh] flex flex-col items-center justify-center px-6 pt-32 md:pt-40 pb-12 text-center md:px-20 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="z-10"
            >
                <div className="inline-flex items-center gap-1.5 bg-accent/20 px-3 py-1.5 rounded-full text-foreground/80 text-[10px] uppercase tracking-widest font-bold mb-5">
                    <Star className="w-3.5 h-3.5 fill-accent" />
                    Detalles que Perduran
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tighter leading-[1.1]">
                    Elegancia en <br />
                    <span className="text-accent italic font-serif">Cada Detalle</span>
                </h1>

                <p className="text-sm md:text-base text-foreground/60 max-w-xl mx-auto mb-8 leading-relaxed">
                    Descubre nuestra colección exclusiva de detalles y chocolates premium diseñados para celebrar los momentos más importantes.
                </p>

                <div className="flex justify-center items-center">
                    <motion.a
                        href="#catalog"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-accent text-foreground px-8 py-3 rounded-xl text-sm font-bold shadow-lg shadow-accent/20 cursor-pointer uppercase tracking-wider"
                    >
                        Explorar Catálogo
                    </motion.a>
                </div>
            </motion.div>

        </section>
    );
};

export default Hero;
