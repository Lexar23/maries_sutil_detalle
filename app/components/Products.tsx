"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, ShoppingBag, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useProducts } from "../context/ProductContext";
import { Product as DBProduct } from "../interfaces/product";
import { categories, CategoryId } from "../lib/categories";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }: { product: DBProduct }) => {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);
    const [selectedTier, setSelectedTier] = useState<'diamond' | 'gold'>('diamond');

    const diamondPrice = product.diamond_variant?.price ?? product.price ?? 0;
    const goldPrice = product.gold_variant?.price ?? product.price_gold ?? 0;

    // Only show tier UI when BOTH variants have a price AND they differ
    const hasGold = goldPrice > 0 && diamondPrice > 0 && goldPrice !== diamondPrice;

    const displayPrice = hasGold && selectedTier === 'gold' ? goldPrice : diamondPrice;

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: displayPrice,
            quantity: 1,
            image: product.image_url || "/logo.png",
            // Only add tier label when there are actually two options
            tier: hasGold ? (selectedTier === 'diamond' ? 'Diamante' : 'Oro') : undefined,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="glass-card rounded-[2.5rem] p-5 flex flex-col hover:shadow-xl transition-all duration-500 group border-white/40"
        >
            <div className="relative w-full aspect-square mb-5 overflow-hidden rounded-2xl bg-white/50">
                <Image
                    src={product.image_url || "/logo.png"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
            </div>

            <div className="flex-1">
                <h3 className="text-lg font-bold tracking-tight mb-1">{product.name}</h3>
                <p className="text-foreground/50 text-xs mb-3 line-clamp-2 leading-relaxed">{product.description}</p>

                {/* Tier selector — only when both versions exist */}
                {hasGold && (
                    <div className="flex gap-2 mb-3">
                        <button
                            onClick={() => setSelectedTier('diamond')}
                            className={`flex-1 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                                selectedTier === 'diamond'
                                    ? 'bg-purple-100 text-purple-700 shadow-sm'
                                    : 'bg-white/40 text-gray-400 hover:bg-white/70'
                            }`}
                        >
                            💎 Diamante
                        </button>
                        <button
                            onClick={() => setSelectedTier('gold')}
                            className={`flex-1 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                                selectedTier === 'gold'
                                    ? 'bg-yellow-100 text-yellow-700 shadow-sm'
                                    : 'bg-white/40 text-gray-400 hover:bg-white/70'
                            }`}
                        >
                            🥇 Oro
                        </button>
                    </div>
                )}

                {/* Price — clean when only one version, labelled when two */}
                <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-accent font-black text-lg">₡{displayPrice.toLocaleString('es-CR')}</span>
                    {hasGold && (
                        <span className="text-[10px] text-gray-400 font-medium">
                            {selectedTier === 'diamond' ? '(Diamante)' : '(Oro)'}
                        </span>
                    )}
                </div>
            </div>


            <div className="grid grid-cols-2 gap-2.5 mt-auto">
                <Link
                    href={`/product/${product.slug}`}
                    className="bg-white/40 backdrop-blur-md text-foreground py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 hover:bg-white transition-colors border border-white/20 text-[10px] uppercase tracking-wider"
                >
                    <Info className="w-3.5 h-3.5 opacity-50" />
                    Detalles
                </Link>
                <button
                    onClick={handleAddToCart}
                    className={`py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all shadow-md text-[10px] uppercase tracking-wider ${
                        added
                        ? "bg-green-500 text-white shadow-green-100"
                        : "bg-accent text-foreground shadow-accent/10 hover:opacity-90 active:scale-95"
                    }`}
                >
                    {added ? (
                        <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Listo
                        </>
                    ) : (
                        <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            Carrito
                        </>
                    )}
                </button>
            </div>
        </motion.div>
    );
};


const Products = () => {
    const { products: dbProducts, loading } = useProducts();
    const [selectedCategory, setSelectedCategory] = useState<CategoryId | "all">("all");

    const filteredProducts = selectedCategory === "all"
        ? dbProducts.filter(p => p.is_active)
        : dbProducts.filter(p => p.category === selectedCategory && p.is_active);

    if (loading && dbProducts.length === 0) {
        return (
            <div className="py-24 text-center">
                <div className="animate-spin w-10 h-10 border-4 border-accent border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-gray-400 font-medium">Cargando nuestra colección...</p>
            </div>
        );
    }

    return (
        <section id="catalog" className="py-24 px-6 md:px-20 bg-soft/20 relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Nuestra Colección</h2>
                    <p className="text-foreground/60 max-w-xl mx-auto text-sm md:text-base">
                        Los mejores chocolates para crear experiencias únicas en cada caja.
                    </p>
                </div>

                {/* Categories Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    <button
                        onClick={() => setSelectedCategory("all")}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === "all"
                            ? "bg-accent text-foreground shadow-lg shadow-accent/20"
                            : "bg-white/50 hover:bg-white text-foreground/70"
                            }`}
                    >
                        Todos
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat.id
                                ? "bg-accent text-foreground shadow-lg shadow-accent/20"
                                : "bg-white/50 hover:bg-white text-foreground/70"
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-foreground/40 text-lg">Próximamente tendremos opciones para esta categoría.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Products;
