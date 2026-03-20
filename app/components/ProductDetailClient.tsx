"use client";
import { Product } from "@/app/lib/products";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MessageCircle, CheckCircle2, Star } from "lucide-react";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import Navbar from "@/app/components/Navbar";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "@/app/lib/categories";
import { useCart } from "@/app/context/CartContext";
import { ShoppingBag } from "lucide-react";

export default function ProductDetailClient({ product }: { product: Product }) {
    const [selectedTier, setSelectedTier] = useState(product.tiers[0]);
    const [selectedColor, setSelectedColor] = useState<string | null>(
        product?.colors && product.colors.length > 0 ? product.colors[0].name : null
    );
    const [selectedDesign, setSelectedDesign] = useState<string | null>(
        product?.designs && product.designs.length > 0 ? product.designs[0].name : null
    );
    const [currentImage, setCurrentImage] = useState(
        product?.colors && product.colors.length > 0
            ? product.colors[0].image
            : product?.designs && product.designs.length > 0
                ? product.designs[0].image
                : product.image
    );

    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        const priceNumber = parseInt(selectedTier.price.replace(/[^0-9]/g, '')) || 0;
        
        addToCart({
            id: product.id,
            name: product.name,
            price: priceNumber,
            quantity: 1,
            image: currentImage,
            tier: selectedTier.type,
            color: selectedColor,
            design: selectedDesign
        });

        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const getColorHex = (colorString: string) => {
        switch (colorString.toLowerCase()) {
            case "rosa": return "#ffb7c5";
            case "rojo": return "#d32f2f";
            case "vino": return "#5d001e";
            default: return "#cccccc";
        }
    };

    const handleColorChange = (colorName: string, colorImage: string) => {
        setSelectedColor(colorName);
        setCurrentImage(colorImage);
    };

    const handleDesignChange = (designName: string, designImage: string) => {
        setSelectedDesign(designName);
        setCurrentImage(designImage);
    };

    let whatsappMessage = `Hola! Quiero pedir la caja: ${product.name} (${selectedTier.type})`;
    if (selectedColor) {
        whatsappMessage += ` en color ${selectedColor}`;
    } else if (selectedDesign) {
        whatsappMessage += ` en diseño ${selectedDesign}`;
    }

    const categoryName = categories.find(c => c.id === product.categoryId)?.name || "Detalle";

    return (
        <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
            <Navbar />

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-16">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/60 text-foreground/70 hover:text-accent hover:bg-white/90 transition-all mb-8 group shadow-sm hover:shadow-md"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-bold tracking-tight">Volver al catálogo</span>
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-start">
                    {/* Image Gallery */}
                    <div className="relative aspect-square rounded-[2rem] overflow-hidden glass-card shadow-xl max-w-sm mx-auto lg:mx-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentImage}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.02 }}
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

                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col lg:pt-2">
                        <div className="flex items-center gap-2 text-accent font-bold tracking-widest uppercase text-[10px] mb-3">
                            <Star className="w-3.5 h-3.5 fill-accent" />
                            Colección {categoryName}
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight tracking-tight">
                            {product.name}
                        </h1>

                        <p className="text-3xl font-black text-accent mb-8">
                            {selectedTier.price}
                        </p>

                        {/* Selection Controls */}
                        <div className="flex flex-col sm:flex-row gap-6 mb-10">
                            {/* Tier Selection */}
                            {product.tiers.length > 1 && (
                                <div className="flex-1">
                                    <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/30 mb-3">
                                        Contenido
                                    </h3>
                                    <div className="flex p-0.5 bg-white/40 backdrop-blur-sm rounded-xl border border-white max-w-[200px]">
                                        {product.tiers.map((tier) => (
                                            <button
                                                key={tier.type}
                                                onClick={() => setSelectedTier(tier)}
                                                className={`flex-1 py-1.5 rounded-lg font-bold transition-all duration-300 text-[11px] ${selectedTier.type === tier.type
                                                    ? "bg-accent text-foreground shadow-sm"
                                                    : "text-foreground/40 hover:text-foreground/70"
                                                    }`}
                                            >
                                                {tier.type}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Color Selection */}
                            {product.colors && product.colors.length > 1 && (
                                <div className="flex-1">
                                    <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/30 mb-3">
                                        Color: <span className="text-accent">{selectedColor}</span>
                                    </h3>
                                    <div className="flex gap-2.5 items-center">
                                        {product.colors.map((color) => (
                                            <button
                                                key={color.name}
                                                onClick={() => handleColorChange(color.name, color.image)}
                                                className={`group relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${selectedColor === color.name
                                                    ? 'border-accent scale-110'
                                                    : 'border-transparent'
                                                    }`}
                                            >
                                                <span
                                                    className="w-5.5 h-5.5 rounded-full shadow-inner border border-black/5"
                                                    style={{ backgroundColor: getColorHex(color.name) }}
                                                />
                                                {selectedColor === color.name && (
                                                    <div className="absolute -top-0.5 -right-0.5 bg-accent text-foreground rounded-full p-0.5 shadow-sm">
                                                        <CheckCircle2 className="w-2 h-2" />
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Design Selection */}
                            {product.designs && product.designs.length > 1 && (
                                <div className="flex-1 mt-4 sm:mt-0">
                                    <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/30 mb-3">
                                        Diseño: <span className="text-accent">{selectedDesign}</span>
                                    </h3>
                                    <div className="flex flex-wrap gap-2.5 items-center">
                                        {product.designs.map((design) => (
                                            <button
                                                key={design.name}
                                                onClick={() => handleDesignChange(design.name, design.image)}
                                                className={`group relative flex items-center justify-center w-12 h-12 rounded-xl border-2 overflow-hidden transition-all duration-300 ${
                                                    selectedDesign === design.name
                                                        ? 'border-accent shadow-sm scale-110'
                                                        : 'border-white/40 hover:border-accent/50'
                                                }`}
                                            >
                                                <Image
                                                    src={design.image}
                                                    alt={design.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                                {selectedDesign === design.name && (
                                                    <div className="absolute top-0 right-0 bg-accent text-foreground rounded-full p-0.5 shadow-sm z-10 m-0.5">
                                                        <CheckCircle2 className="w-2.5 h-2.5" />
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-foreground/50 italic mt-3 bg-white/30 p-2 rounded-lg border border-white/20">
                                        * Las figuras y diseños mostrados se incluyen de forma aleatoria en tu pedido dependiendo del stock.
                                    </p>
                                </div>
                            )}

                            {/* Gallery Selection */}
                            {product.images && product.images.length > 1 && (
                                <div className="flex-1 mt-4 sm:mt-0">
                                    <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/30 mb-3">
                                        Vistas
                                    </h3>
                                    <div className="flex flex-wrap gap-2.5 items-center">
                                        {product.images.map((img, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentImage(img)}
                                                className={`group relative flex items-center justify-center w-12 h-12 rounded-xl border-2 overflow-hidden transition-all duration-300 ${
                                                    currentImage === img
                                                        ? 'border-accent shadow-sm scale-110'
                                                        : 'border-white/40 hover:border-accent/50'
                                                }`}
                                            >
                                                <Image
                                                    src={img}
                                                    alt={`Vista ${idx + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>



                        <div className="glass-card rounded-[1.5rem] p-6 mb-8 border-white/40">
                            <div className="flex justify-between items-center mb-5">
                                <h2 className="text-sm font-bold uppercase tracking-wider">Incluye:</h2>
                                <span className="bg-accent/10 text-accent px-2 py-0.5 rounded-full text-[8px] font-bold tracking-widest uppercase">
                                    {selectedTier.ingredients.length} Elementos
                                </span>
                            </div>

                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {selectedTier.ingredients.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 bg-white/40 p-2.5 rounded-xl border border-white/60 hover:bg-accent/5 transition-all">
                                        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-accent/10 bg-white p-1 shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[8px] text-accent font-black uppercase tracking-tighter">
                                                {item.quantity} {item.quantity > 1 ? 'Unidades' : 'Unidad'}
                                            </span>
                                            <span className="text-foreground/80 font-bold leading-tight text-xs">
                                                {item.name}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col gap-4">
                            <button
                                onClick={handleAddToCart}
                                className={`flex-1 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95 ${
                                    added 
                                    ? "bg-green-500 text-white shadow-green-100" 
                                    : "bg-accent text-foreground shadow-accent/20 hover:opacity-90"
                                }`}
                            >
                                {added ? (
                                    <>
                                        <CheckCircle2 className="w-5 h-5" />
                                        ¡Añadido al carrito!
                                    </>
                                ) : (
                                    <>
                                        <ShoppingBag className="w-5 h-5" />
                                        Añadir al carrito
                                    </>
                                )}
                            </button>
                        </div>


                        <div className="mt-6 flex flex-col gap-3">
                            <p className="text-[10px] text-foreground/40 text-center italic">
                                * Disponibilidad limitada por temporada.
                            </p>
                            <div className="flex items-start gap-3 bg-accent/10 border border-accent/30 rounded-2xl px-4 py-3">
                                <span className="text-accent text-lg shrink-0">🗓️</span>
                                <p className="text-xs text-foreground/70 leading-snug">
                                    <span className="font-bold text-foreground">Pedidos en grandes cantidades</span> deben agendarse con{" "}
                                    <span className="font-bold text-accent">al menos 1 mes de anticipación</span>.
                                    Escríbenos para coordinar tu pedido especial.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <WhatsAppButton />
        </main>
    );
}

