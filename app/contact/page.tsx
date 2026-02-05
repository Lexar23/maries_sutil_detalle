"use client";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import FloatingHearts from "@/app/components/FloatingHearts";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ContactForm() {
    const searchParams = useSearchParams();
    const selectedProduct = searchParams.get("product");

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Info Card */}
            <div className="space-y-8">
                <div className="glass-card rounded-3xl p-10 space-y-10">
                    <h2 className="text-3xl font-bold font-playfair">Información de Pedidos</h2>
                    <p className="text-foreground/60 italic">
                        "Todos nuestros pedidos se coordinan de forma personalizada por WhatsApp o mediante este formulario para asegurar que cada detalle sea perfecto."
                    </p>
                    <div className="space-y-6">
                        <div className="flex items-center gap-6 group">
                            <a href="https://wa.me/50687880937" target="_blank" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300">
                                <Phone className="w-6 h-6" />
                            </a>
                            <div>
                                <p className="text-sm text-foreground/40 font-bold uppercase tracking-wider">WhatsApp Directo</p>
                                <p className="text-xl font-medium">+506 8788-0937</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 group">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-romantic group-hover:text-white transition-all duration-300">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-foreground/40 font-bold uppercase tracking-wider">Email</p>
                                <p className="text-xl font-medium">hola@mariesutil.com</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 group">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-romantic group-hover:text-white transition-all duration-300">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-foreground/40 font-bold uppercase tracking-wider">Ubicación</p>
                                <p className="text-xl font-medium">San José, Costa Rica</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Card */}
            <div className="glass-card rounded-3xl p-10">
                <h2 className="text-3xl font-bold font-playfair mb-8">Hacer una Consulta</h2>
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground/60 px-2">Nombre</label>
                            <input type="text" className="w-full bg-white/50 border border-white/40 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-romantic/20 transition-all" placeholder="Juan Pérez" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground/60 px-2">Producto de interés</label>
                            <input
                                type="text"
                                defaultValue={selectedProduct || ""}
                                className="w-full bg-white/50 border border-white/40 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-romantic/20 transition-all font-medium text-romantic"
                                placeholder="Ej: Luxury Love"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground/60 px-2">Mensaje o Dedicatoria</label>
                        <textarea rows={6} className="w-full bg-white/50 border border-white/40 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-romantic/20 transition-all resize-none" placeholder="Hola, me interesa este detalle..."></textarea>
                    </div>
                    <button type="button" className="w-full bg-romantic text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-romantic/20 flex items-center justify-center gap-2 hover:bg-romantic/90 transition-all">
                        Enviar por WhatsApp
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function ContactPage() {
    return (
        <main className="relative min-h-screen bg-background text-foreground">
            <Navbar />
            <FloatingHearts />

            <section className="relative z-10 pt-32 pb-24 px-6 md:px-20 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-bold font-playfair mb-6">Contáctanos</h1>
                    <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
                        ¿Quieres un pedido personalizado? Escríbenos y coordinaremos cada detalle de tu sorpresa.
                    </p>
                </motion.div>

                <Suspense fallback={<div className="text-center py-20">Cargando formulario...</div>}>
                    <ContactForm />
                </Suspense>
            </section>

            <Footer />

            <WhatsAppButton />
        </main>
    );
}
