"use client";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import FloatingHearts from "@/app/components/FloatingHearts";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function FAQPage() {
    const faqs = [
        {
            q: "¿Hacen envíos a todo el país?",
            a: "Sí, realizamos envíos seguros y refrigerados a todas las provincias de Costa Rica. El tiempo de entrega oscila entre 24 y 48 horas."
        },
        {
            q: "¿Puedo personalizar el mensaje dentro de la caja?",
            a: "¡Absolutamente! Al momento de realizar tu pedido por WhatsApp, indícanos el mensaje y nosotros incluiremos una tarjeta elegante sin costo adicional."
        },
        {
            q: "¿Los chocolates contienen trazas de nueces?",
            a: "Nuestros productos se elaboran en una instalación que procesa frutos secos. Aunque tenemos controles estrictos, no podemos garantizar la ausencia total de trazas."
        },
        {
            q: "¿Cómo debo conservar mis bombones?",
            a: "Para mantener su frescura y brillo, recomendamos guardarlos en un lugar fresco y seco (entre 15°C y 18°C), lejos de la luz solar directa y olores fuertes."
        },
        {
            q: "¿Tienen opciones sin azúcar o veganas?",
            a: "Actualmente contamos con una línea limitada de bombones amargos (70% o más cacao) que son naturalmente veganos. Para opciones sin azúcar, consulta nuestro catálogo especial de temporada."
        }
    ];

    return (
        <main className="relative min-h-screen bg-background text-foreground">
            <Navbar />
            <FloatingHearts />

            <section className="relative z-10 pt-32 pb-24 px-6 md:px-20 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-5xl md:text-7xl font-bold font-playfair mb-6">Preguntas Frecuentes</h1>
                    <p className="text-xl text-foreground/60">Todo lo que necesitas saber sobre tus detalles más dulces.</p>
                </motion.div>

                <div className="space-y-6">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-card rounded-3xl p-8 hover:shadow-xl transition-all"
                        >
                            <div className="flex items-start gap-4">
                                <PlusCircle className="w-6 h-6 text-romantic shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-xl font-bold mb-3">{faq.q}</h3>
                                    <p className="text-foreground/70 leading-relaxed">{faq.a}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center glass-card rounded-3xl p-12">
                    <h2 className="text-2xl font-bold font-playfair mb-4">¿Aún tienes dudas?</h2>
                    <p className="text-foreground/60 mb-8">Nuestro equipo de atención al cliente está listo para ayudarte.</p>
                    <button className="bg-romantic text-white px-10 py-4 rounded-2xl font-bold hover:shadow-lg shadow-romantic/20 transition-all">
                        Contactar Soporte
                    </button>
                </div>
            </section>

            <Footer />

            <WhatsAppButton />
        </main>
    );
}
