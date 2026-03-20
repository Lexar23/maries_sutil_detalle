"use client";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import { Star, Users, Coffee } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
    return (
        <main className="relative min-h-screen bg-background text-foreground">
            <Navbar />

            <section className="relative z-10 pt-32 pb-24 px-6 md:px-20 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-5xl md:text-7xl font-bold font-playfair mb-6">Nuestra Historia</h1>
                    <p className="text-xl text-foreground/60 max-w-3xl mx-auto">
                        En Marie&apos;s Sutil Detalle, creemos que cada chocolate cuenta una historia de amor y dedicación.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
                    <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src="/amor/luxury.jpg"
                            alt="Nuestro proceso"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold font-playfair">Calidad en cada Detalle</h2>
                        <p className="text-lg text-foreground/70 leading-relaxed">
                            Comenzamos con un sueño simple: reunir los chocolates más exquisitos para crear momentos inolvidables.
                            Hoy, seguimos manteniendo esa esencia, cuidando personalmente cada pieza que forma parte de nuestra colección.
                        </p>
                        <p className="text-lg text-foreground/70 leading-relaxed">
                            Buscamos la perfección en cada detalle, asegurando que cada caja que sale de nuestro taller sea un regalo de lujo listo para enamorar.
                        </p>
                        <div className="grid grid-cols-2 gap-6 pt-6">
                            <div className="flex items-center gap-3">
                                <CheckIcon />
                                <span className="font-bold">Máxima Calidad</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckIcon />
                                <span className="font-bold">Cuidado Personalizado</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckIcon />
                                <span className="font-bold">Diseño Exclusivo</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckIcon />
                                <span className="font-bold">Pasión por el Detalle</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-20 border-y border-accent/20">
                    <div className="text-center group">
                        <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <Star className="text-romantic fill-romantic" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Excelencia</h3>
                        <p className="text-foreground/60 text-sm">Buscamos la perfección en cada acabado y sabor.</p>
                    </div>
                    <div className="text-center group">
                        <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <Users className="text-romantic fill-romantic" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Cercanía</h3>
                        <p className="text-foreground/60 text-sm">Tu satisfacción y la sonrisa de quien recibe el regalo es nuestra meta.</p>
                    </div>
                    <div className="text-center group">
                        <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <Coffee className="text-romantic fill-romantic" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Tradición</h3>
                        <p className="text-foreground/60 text-sm">Respetamos el tiempo y el arte de la chocolatería pura.</p>
                    </div>
                </div>
            </section>

            <Footer />

            <WhatsAppButton />
        </main>
    );
}

const CheckIcon = () => (
    <svg
        className="w-6 h-6 text-romantic"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);
