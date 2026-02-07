"use client";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { products } from "../lib/products";
import { benchmark } from "../lib/benchmark";

const Products = () => {
    benchmark.start("catalog-render");

    const getColorHex = (colorString: string) => {
        switch (colorString.toLowerCase()) {
            case "rosa": return "#ffb7c5";
            case "rojo": return "#ff4d6d";
            case "vino": return "#800020";
            default: return "#cccccc";
        }
    };

    benchmark.end("catalog-render");

    return (
        <section id="catalog" className="py-24 px-6 md:px-20 bg-soft/20 relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 font-playfair">Nuestra Colección</h2>
                    <p className="text-foreground/60 max-w-xl mx-auto">
                        Los mejores chocolates para crear experiencias únicas en cada caja.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card rounded-3xl p-6 flex flex-col hover:shadow-2xl transition-all duration-500 group"
                        >
                            <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-2xl bg-white/50">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {product.category === "Luxury" && (
                                    <div className="absolute top-4 right-4 bg-romantic text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                        PREMIUM
                                    </div>
                                )}
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold font-playfair">{product.name}</h3>
                                    <span className="text-romantic font-black">{product.price}</span>
                                </div>
                                <p className="text-foreground/60 text-sm mb-4 line-clamp-2">{product.description}</p>

                                {product.colors && product.colors.length > 1 && (
                                    <div className="flex gap-2 mb-6">
                                        {product.colors.map(color => (
                                            <div
                                                key={color.name}
                                                className="w-4 h-4 rounded-full border border-black/10 shadow-sm"
                                                style={{ backgroundColor: getColorHex(color.name) }}
                                                title={color.name}
                                            />
                                        ))}
                                        <span className="text-[10px] text-foreground/40 font-bold uppercase tracking-tighter self-center ml-1">
                                            {product.colors.length} colores
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <Link
                                    href={`/product/${product.id}`}
                                    className="bg-white/50 backdrop-blur-md text-foreground py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white transition-colors border border-white/20 text-sm"
                                >
                                    <Info className="w-4 h-4" />
                                    Detalles
                                </Link>
                                <Link
                                    href={`https://wa.me/50670682440?text=${encodeURIComponent(`Hola! Quiero pedir la caja: ${product.name}`)}`}
                                    target="_blank"
                                    className="bg-romantic text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-romantic/90 transition-all shadow-lg shadow-romantic/20 text-sm"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Pedir
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;
