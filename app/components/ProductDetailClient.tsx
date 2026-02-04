"use client";
import { Product } from "@/app/lib/products";
import Image from "next/image";
import Link from "next/link";
import { Heart, ArrowLeft, MessageCircle, CheckCircle2 } from "lucide-react";
import FloatingHearts from "@/app/components/FloatingHearts";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import Navbar from "@/app/components/Navbar";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { benchmark } from "@/app/lib/benchmark";

export default function ProductDetailClient({ product }: { product: Product }) {
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [currentImage, setCurrentImage] = useState(product.image);

    useEffect(() => {
        benchmark.start("product-detail-init");
        if (product?.colors && product.colors.length > 0) {
            setSelectedColor(product.colors[0].name);
            setCurrentImage(product.colors[0].image);
        }
        benchmark.end("product-detail-init");
    }, [product]);

    const getColorHex = (colorString: string) => {
        switch (colorString.toLowerCase()) {
            case "rosa": return "#ffb7c5";
            case "rojo": return "#ff4d6d";
            case "vino": return "#800020";
            default: return "#cccccc";
        }
    };

    const handleColorChange = (colorName: string, colorImage: string) => {
        benchmark.start(`color-change-${colorName}`);
        setSelectedColor(colorName);
        setCurrentImage(colorImage);
        benchmark.end(`color-change-${colorName}`);
    };

    const whatsappMessage = selectedColor
        ? `Hola! Quiero pedir la caja: ${product.name} en color ${selectedColor}`
        : `Hola! Quiero pedir la caja: ${product.name}`;

    return (
        <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
            <Navbar />
            <FloatingHearts />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-white/60 text-foreground/70 hover:text-romantic hover:bg-white/90 transition-all mb-12 group shadow-sm hover:shadow-md"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
                        <span className="text-sm font-bold tracking-tight">Volver al catálogo</span>
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Image Gallery */}
                    <div className="relative aspect-square rounded-3xl overflow-hidden glass-card shadow-2xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentImage}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.4 }}
                                className="relative w-full h-full"
                            >
                                <Image
                                    src={currentImage}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>
                        </AnimatePresence>
                        {product.category === "Luxury" && (
                            <div className="absolute top-8 right-8 bg-romantic text-white font-bold px-6 py-2 rounded-full shadow-xl z-20">
                                COLECCIÓN PREMIUM
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 text-romantic font-bold tracking-widest uppercase text-sm mb-4">
                            <Heart className="w-4 h-4 fill-romantic" />
                            {product.category} Series
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold font-playfair mb-6 leading-tight">
                            {product.name}
                        </h1>

                        <p className="text-4xl font-black text-romantic mb-8">
                            {product.price}
                        </p>

                        {/* Color Selection */}
                        {product.colors && product.colors.length > 1 && (
                            <div className="mb-10">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    Escoge un color: <span className="text-romantic">{selectedColor}</span>
                                </h3>
                                <div className="flex gap-4">
                                    {product.colors.map((color) => (
                                        <button
                                            key={color.name}
                                            onClick={() => handleColorChange(color.name, color.image)}
                                            className={`group relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${selectedColor === color.name
                                                ? 'border-romantic scale-110 shadow-lg'
                                                : 'border-transparent hover:border-romantic/40'
                                                }`}
                                        >
                                            <span
                                                className="w-8 h-8 rounded-full shadow-inner"
                                                style={{ backgroundColor: getColorHex(color.name) }}
                                            />
                                            {selectedColor === color.name && (
                                                <div className="absolute -top-1 -right-1 bg-romantic text-white rounded-full p-0.5 shadow-sm">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="glass-card rounded-2xl p-8 mb-10 border-white/40">
                            <h2 className="text-xl font-bold mb-4">Descripción</h2>
                            <p className="text-foreground/70 leading-relaxed text-lg">
                                {product.description} Este detalle ha sido pensado con los más altos estándares de calidad para ofrecerte lo mejor.
                                Cada pieza es una manifestación de cariño y buen gusto, perfecta para sorprender a esa persona especial en este San Valentín.
                            </p>

                            <ul className="mt-8 space-y-4">
                                <li className="flex items-center gap-3 text-foreground/80 font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-romantic" />
                                    Chocolates de Alta Calidad
                                </li>
                                <li className="flex items-center gap-3 text-foreground/80 font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-romantic" />
                                    Empaque de Lujo Sustentable
                                </li>
                                <li className="flex items-center gap-3 text-foreground/80 font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-romantic" />
                                    Entrega a Tiempo Garantizada
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-4">
                            <Link
                                href={`https://wa.me/50687880937?text=${encodeURIComponent(whatsappMessage)}`}
                                target="_blank"
                                className="flex-1 bg-romantic text-white py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 hover:bg-romantic/90 transition-all shadow-xl shadow-romantic/30 text-center"
                            >
                                <MessageCircle className="w-6 h-6" />
                                Pedir por WhatsApp
                            </Link>
                        </div>


                        <p className="text-xs text-foreground/40 mt-8 text-center italic">
                            * Los tiempos de entrega pueden variar según la ubicación. Disponibilidad limitada por temporada.
                        </p>
                    </div>
                </div>
            </div>

            <WhatsAppButton />
        </main>
    );
}
