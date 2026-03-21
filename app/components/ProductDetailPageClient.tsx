'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag, CheckCircle2, Star, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/app/context/CartContext';
import Navbar from '@/app/components/Navbar';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import { Product as DBProduct, ProductVariant, BoxContent } from '@/app/interfaces/product';
import { categories } from '@/app/lib/categories';

interface ProductDetailPageClientProps {
  product: DBProduct;
}

export default function ProductDetailPageClient({ product }: ProductDetailPageClientProps) {
  const [selectedTier, setSelectedTier] = useState<'diamond' | 'gold'>('diamond');
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  // Get active variant data
  const diamondVariant = product.diamond_variant;
  const goldVariant = product.gold_variant;

  const hasGold = goldVariant && goldVariant.price > 0;
  const activeVariant = selectedTier === 'diamond' ? diamondVariant : goldVariant;
  const activePrice = selectedTier === 'diamond' ? product.price : (product.price_gold || product.price);

  // Fallback if no variants
  const variantToDisplay: ProductVariant | null = activeVariant || {
    contents: product.contents || [],
    cost_box: 0,
    cost_labor: 0,
    price: activePrice || 0,
  };

  const handleAddToCart = () => {
    const tierLabel = selectedTier === 'diamond' ? 'Diamante' : 'Oro';
    addToCart({
      id: product.id,
      name: product.name,
      price: activePrice || 0,
      quantity: 1,
      image: product.image_url || '/logo.png',
      tier: tierLabel,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const categoryName = categories.find(c => c.id === product.category)?.name || 'Detalle';

  const whatsappMessage = `Hola! Quiero pedir la caja: ${product.name} (${selectedTier === 'diamond' ? 'Diamante' : 'Oro'})`;

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-16">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Image Section */}
          <div className="relative aspect-square rounded-[2rem] overflow-hidden glass-card shadow-xl">
            <Image
              src={product.image_url || '/logo.png'}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col gap-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-accent font-bold tracking-widest uppercase text-[10px] mb-3">
                <Star className="w-3.5 h-3.5 fill-accent" />
                Colección {categoryName}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight tracking-tight">
                {product.name}
              </h1>
              <p className="text-foreground/60 leading-relaxed">{product.description}</p>
            </div>

            {/* Tier Selector */}
            {hasGold && (
              <div className="flex gap-3 p-0.5 bg-white/40 backdrop-blur-sm rounded-xl border border-white max-w-fit">
                <button
                  onClick={() => setSelectedTier('diamond')}
                  className={`px-6 py-2.5 rounded-lg font-bold transition-all duration-300 text-sm ${
                    selectedTier === 'diamond'
                      ? 'bg-purple-100 text-purple-700 shadow-sm'
                      : 'text-foreground/40 hover:text-foreground/70'
                  }`}
                >
                  💎 Diamante
                </button>
                <button
                  onClick={() => setSelectedTier('gold')}
                  className={`px-6 py-2.5 rounded-lg font-bold transition-all duration-300 text-sm ${
                    selectedTier === 'gold'
                      ? 'bg-yellow-100 text-yellow-700 shadow-sm'
                      : 'text-foreground/40 hover:text-foreground/70'
                  }`}
                >
                  🥇 Oro
                </button>
              </div>
            )}

            {/* Price Section */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/50">Precio</span>
              <p className="text-4xl font-black text-accent">₡{activePrice?.toLocaleString('es-CR')}</p>
            </div>

            {/* Contents Section */}
            {variantToDisplay && variantToDisplay.contents && variantToDisplay.contents.length > 0 && (
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/50">Contenido</span>
                <div className="glass-card rounded-2xl p-4 space-y-3">
                  {variantToDisplay.contents.map((item: BoxContent, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 pb-3 border-b border-white/20 last:border-b-0">
                      {item.image && (
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">{item.name}</p>
                        <p className="text-xs text-foreground/50">Cantidad: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Chat
              </a>
              <button
                onClick={handleAddToCart}
                className={`py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-sm ${
                  added
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                    : 'bg-accent text-foreground shadow-lg shadow-accent/20 hover:opacity-90 active:scale-95'
                }`}
              >
                {added ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Agregado
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    Carrito
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppButton />
    </main>
  );
}
