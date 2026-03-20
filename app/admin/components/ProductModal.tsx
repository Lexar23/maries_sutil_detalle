'use client';
import { useState, useRef, useEffect } from 'react';
import {
  Product, NewProduct, ProductVariant, BoxContent,
  AVAILABLE_CHOCOLATES, calcSuggestedPrice, emptyVariant,
} from '../../interfaces/product';
import {
  X, Image as ImageIcon, Loader2, CheckCircle,
  Plus, Minus, Package, Sparkles, ChevronRight,
} from 'lucide-react';
import { useProducts } from '@/app/context/ProductContext';
import Image from 'next/image';
import Modal from '../../components/UI/Modal';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: NewProduct | Product) => void;
  product?: Product | null;
  loading?: boolean;
}

type TabId = 'general' | 'diamond' | 'gold';

// ── Shared Variant Editor ────────────────────────────────────────────────────
interface VariantEditorProps {
  variant: ProductVariant;
  onChange: (v: ProductVariant) => void;
  tierLabel: string;
  tierColor: string;
  tierEmoji: string;
}

function VariantEditor({ variant, onChange, tierLabel, tierColor, tierEmoji }: VariantEditorProps) {
  const chocCost = variant.contents.reduce(
    (s, c) => s + c.quantity * (c.unit_price ?? 0), 0
  );
  const totalCost = chocCost + variant.cost_box + variant.cost_labor;
  const suggestedPrice = calcSuggestedPrice(variant.contents, variant.cost_box, variant.cost_labor);

  const isSelected = (name: string) => variant.contents.some(c => c.name === name);

  const toggleChocolate = (choc: BoxContent) => {
    if (isSelected(choc.name)) {
      onChange({ ...variant, contents: variant.contents.filter(c => c.name !== choc.name) });
    } else {
      onChange({ ...variant, contents: [...variant.contents, { ...choc, quantity: 1 }] });
    }
  };

  const updateQty = (name: string, delta: number) => {
    onChange({
      ...variant,
      contents: variant.contents.map(c =>
        c.name === name ? { ...c, quantity: Math.max(1, c.quantity + delta) } : c
      ),
    });
  };

  const setCost = (field: 'cost_box' | 'cost_labor', val: string) => {
    onChange({ ...variant, [field]: parseFloat(val) || 0 });
  };

  const useSuggested = () => onChange({ ...variant, price: suggestedPrice });

  const totalUnits = variant.contents.reduce((s, c) => s + c.quantity, 0);

  return (
    <div className="space-y-6">
      {/* Tier badge */}
      <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl border ${tierColor}`}>
        <span className="text-2xl">{tierEmoji}</span>
        <div>
          <p className="font-black text-sm text-letra">Versión {tierLabel}</p>
          <p className="text-[11px] text-letra/60">
            {totalUnits} chocolates · Precio final:{' '}
            <strong>₡{(variant.price || 0).toLocaleString('es-CR')}</strong>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: Chocolate picker */}
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">
            🍫 Contenido de la Caja
          </h3>

          {/* Selected with qty controls */}
          {variant.contents.length > 0 && (
            <div className="mb-4 bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              {variant.contents.map((item) => (
                <div key={item.name} className="flex items-center px-4 py-2.5 gap-3 border-b border-gray-50 last:border-0">
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-0.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-letra truncate">{item.name}</p>
                    <p className="text-[10px] text-gray-400">
                      ₡{item.unit_price}/u · Total: ₡{(item.quantity * item.unit_price).toLocaleString('es-CR')}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => updateQty(item.name, -1)}
                      className="w-6 h-6 rounded-md bg-gray-100 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors"
                    >
                      <Minus size={10} />
                    </button>
                    <span className="w-6 text-center font-black text-xs">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.name, 1)}
                      className="w-6 h-6 rounded-md bg-gray-100 hover:bg-green-50 hover:text-green-600 flex items-center justify-center transition-colors"
                    >
                      <Plus size={10} />
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleChocolate(item)}
                      className="w-6 h-6 rounded-md bg-red-50 text-red-400 hover:bg-red-100 ml-0.5 flex items-center justify-center transition-colors"
                    >
                      <X size={10} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Chocolate grid */}
          <div className="grid grid-cols-3 gap-2">
            {AVAILABLE_CHOCOLATES.map((choc) => {
              const selected = isSelected(choc.name);
              return (
                <button
                  key={choc.name}
                  type="button"
                  onClick={() => toggleChocolate(choc)}
                  className={`relative flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all text-center ${
                    selected
                      ? 'border-accent bg-accent/10'
                      : 'border-gray-100 bg-gray-50/50 hover:border-accent/40'
                  }`}
                >
                  {selected && (
                    <div className="absolute top-1.5 right-1.5 bg-accent rounded-full p-0.5">
                      <CheckCircle size={8} className="text-white" />
                    </div>
                  )}
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white border border-gray-100">
                    <Image src={choc.image} alt={choc.name} fill className="object-contain p-1" />
                  </div>
                  <span className="text-[9px] font-bold leading-tight text-letra/80">{choc.name}</span>
                  <span className="text-[9px] text-gray-400">₡{choc.unit_price}</span>
                </button>
              );
            })}
          </div>

          {variant.contents.length === 0 && (
            <div className="text-center py-4 text-gray-300 mt-2">
              <Package size={28} className="mx-auto mb-1 opacity-40" />
              <p className="text-xs">Selecciona los chocolates</p>
            </div>
          )}
        </div>

        {/* RIGHT: Price Calculator */}
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">
            🧮 Calculadora de Precio
          </h3>

          <div className="bg-gray-50/80 rounded-2xl border border-gray-100 overflow-hidden">
            {/* Cost inputs */}
            <div className="p-4 space-y-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-500 w-28 shrink-0">📦 Cajita (₡)</span>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={variant.cost_box || ''}
                  onChange={(e) => setCost('cost_box', e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent bg-white"
                  placeholder="0"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-500 w-28 shrink-0">👐 Mano de obra (₡)</span>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={variant.cost_labor || ''}
                  onChange={(e) => setCost('cost_labor', e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent bg-white"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Cost breakdown */}
            <div className="p-4 space-y-2 text-xs border-b border-gray-100">
              <div className="flex justify-between text-gray-500">
                <span>🍫 Chocolates</span>
                <span className="font-mono font-bold">₡{chocCost.toLocaleString('es-CR')}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>📦 Cajita</span>
                <span className="font-mono font-bold">₡{variant.cost_box.toLocaleString('es-CR')}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>👐 Mano de obra</span>
                <span className="font-mono font-bold">₡{variant.cost_labor.toLocaleString('es-CR')}</span>
              </div>
              <div className="flex justify-between font-bold text-letra border-t border-dashed border-gray-200 pt-2 mt-2">
                <span>Costo total</span>
                <span className="font-mono">₡{totalCost.toLocaleString('es-CR')}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-[10px]">
                <span>+ 40% utilidad</span>
                <span className="font-mono">₡{Math.round(totalCost * 0.40).toLocaleString('es-CR')}</span>
              </div>
            </div>

            {/* Suggested price + button */}
            <div className="p-4 bg-accent/5 border-b border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-letra">✨ Precio Sugerido</span>
                <span className="text-lg font-black text-accent">
                  ₡{suggestedPrice.toLocaleString('es-CR')}
                </span>
              </div>
              <button
                type="button"
                onClick={useSuggested}
                className="w-full py-2 rounded-xl bg-accent text-letra text-xs font-black flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95"
              >
                <Sparkles size={13} />
                Usar precio sugerido
                <ChevronRight size={13} />
              </button>
              <p className="text-[9px] text-gray-400 text-center mt-2">
                (costo × 1.40, redondeado al siguiente ₡100)
              </p>
            </div>

            {/* Final editable price */}
            <div className="p-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">
                💰 Precio Final {tierLabel} (₡)
              </label>
              <input
                type="number"
                min="0"
                step="100"
                value={variant.price || ''}
                onChange={(e) => onChange({ ...variant, price: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 rounded-xl border-2 border-accent/30 text-lg font-black text-letra focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent bg-white text-center"
                placeholder="0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Modal ────────────────────────────────────────────────────────────────
export default function ProductModal({
  isOpen, onClose, onSave, product, loading,
}: ProductModalProps) {
  const { uploadImage } = useProducts();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('general');

  const [formData, setFormData] = useState<Partial<Product> | NewProduct>({
    name: '', slug: '', description: '',
    price: 0, price_gold: 0,
    stock: 10, category: 'amor',
    image_url: '', is_active: true,
  });

  const [diamond, setDiamond] = useState<ProductVariant>(emptyVariant());
  const [gold, setGold] = useState<ProductVariant>(emptyVariant());

  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean; title: string; message: string;
    type: 'info' | 'success' | 'warning' | 'error';
  }>({ isOpen: false, title: '', message: '', type: 'info' });

  useEffect(() => {
    if (product) {
      setFormData(product);
      setDiamond(product.diamond_variant ?? emptyVariant());
      setGold(product.gold_variant ?? emptyVariant());
    } else if (isOpen) {
      setFormData({
        name: '', slug: '', description: '',
        price: 0, price_gold: 0,
        stock: 10, category: 'amor',
        image_url: '', is_active: true,
      });
      setDiamond(emptyVariant());
      setGold(emptyVariant());
    }
    setActiveTab('general');
  }, [product, isOpen]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const result = await uploadImage(file);
    if (result.success && result.url) {
      setFormData(prev => ({ ...prev, image_url: result.url }));
    } else {
      setModalConfig({ isOpen: true, type: 'error', title: 'Error de Imagen', message: result.error ?? 'Error desconocido' });
    }
    setUploading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (name === 'name' && !product) {
      setFormData(prev => ({
        ...prev, name: value,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      }));
      return;
    }
    if (type === 'number') setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    else if (type === 'checkbox') setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    else setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const payload: NewProduct | Product = {
      ...(formData as NewProduct | Product),
      price: diamond.price,       // Diamond price = main catalog price
      price_gold: gold.price,
      diamond_variant: diamond,
      gold_variant: gold,
      contents: diamond.contents, // backward compat
    };
    onSave(payload);
  };

  if (!isOpen) return null;

  const tabs: { id: TabId; label: string; emoji: string; badge?: string }[] = [
    { id: 'general', label: 'Cajita', emoji: '📦' },
    { id: 'diamond', label: 'Diamante', emoji: '💎', badge: diamond.price ? `₡${(diamond.price / 1000).toFixed(1)}K` : undefined },
    { id: 'gold', label: 'Oro', emoji: '🥇', badge: gold.price ? `₡${(gold.price / 1000).toFixed(1)}K` : undefined },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 text-letra font-sans">
      <div className="bg-white rounded-[2.5rem] w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl">

        {/* Header */}
        <div className="px-8 pt-8 pb-0 flex justify-between items-center">
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
            <span className="w-2 h-7 bg-accent rounded-full" />
            {product ? 'Editar Cajita' : 'Nueva Cajita'}
          </h2>
          <button onClick={onClose} className="p-3 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-8 pt-4 pb-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-accent/15 text-letra border-b-2 border-accent'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>{tab.emoji}</span>
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="bg-accent/80 text-letra text-[9px] font-black px-1.5 py-0.5 rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
          <div className="flex-1 border-b-2 border-transparent" />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">

          {/* ── GENERAL TAB ─────────────────────────────────────────────── */}
          {activeTab === 'general' && (
            <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
              {/* Image */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 block">
                  Imagen Principal de la Cajita
                </label>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="relative w-full sm:w-44 h-44 rounded-[1.5rem] bg-gray-50 border-4 border-dashed border-gray-100 overflow-hidden flex items-center justify-center group hover:border-accent/30 transition-all shrink-0">
                    {formData.image_url ? (
                      <>
                        <Image src={formData.image_url} alt="Preview" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-white text-letra px-4 py-2 rounded-xl text-xs font-bold">
                            Cambiar
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-4">
                        <ImageIcon className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-accent text-letra px-4 py-2 rounded-xl text-xs font-bold">
                          Subir Foto
                        </button>
                      </div>
                    )}
                    {uploading && (
                      <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-accent animate-spin" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 block">URL Directa (opcional)</label>
                      <input type="text" name="image_url" value={formData.image_url || ''} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent bg-gray-50/50"
                        placeholder="Ej: /boda/floralia/1.png" />
                    </div>
                    <div className="p-3 bg-primary/20 rounded-xl border border-primary/30 text-[11px] text-letra/70">
                      <strong>Tip:</strong> Imágenes cuadradas (1:1) se ven mejor en el catálogo.
                    </div>
                  </div>
                </div>
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nombre de la Cajita</label>
                  <input required name="name" value={formData.name} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm font-medium"
                    placeholder="Ej. Luxury Box" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Slug</label>
                  <input required name="slug" value={formData.slug} onChange={handleChange} readOnly={!!product}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100/50 text-sm text-gray-400 cursor-not-allowed"
                    placeholder="luxury-box" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Stock (Unidades)</label>
                  <input required type="number" name="stock" min="0" value={formData.stock} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Categoría / Ocasión</label>
                  <select name="category" value={formData.category} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm font-medium">
                    <option value="amor">❤️ Amor & Amistad</option>
                    <option value="boda">💍 Bodas & Eventos</option>
                    <option value="babyshower">🍼 Baby Shower</option>
                  </select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Descripción</label>
                  <textarea name="description" rows={2} value={formData.description} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm font-medium resize-none"
                    placeholder="Describe la cajita..." />
                </div>
              </div>

              {/* Price summary (read from variants) */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">💎 Precio Diamante</p>
                  <p className="text-xl font-black text-letra">
                    {diamond.price ? `₡${diamond.price.toLocaleString('es-CR')}` : <span className="text-gray-300">No definido</span>}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">🥇 Precio Oro</p>
                  <p className="text-xl font-black text-yellow-600">
                    {gold.price ? `₡${gold.price.toLocaleString('es-CR')}` : <span className="text-gray-300">No definido</span>}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="is_active" name="is_active" checked={formData.is_active} onChange={handleChange} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent" />
                </div>
                <div>
                  <label htmlFor="is_active" className="text-sm font-bold cursor-pointer">Cajita Activa</label>
                  <p className="text-[10px] text-gray-400">Visible para los clientes en el catálogo.</p>
                </div>
              </div>
            </form>
          )}

          {/* ── DIAMOND TAB ─────────────────────────────────────────────── */}
          {activeTab === 'diamond' && (
            <VariantEditor
              variant={diamond}
              onChange={setDiamond}
              tierLabel="Diamante"
              tierColor="border-purple-200 bg-purple-50/50"
              tierEmoji="💎"
            />
          )}

          {/* ── GOLD TAB ────────────────────────────────────────────────── */}
          {activeTab === 'gold' && (
            <VariantEditor
              variant={gold}
              onChange={setGold}
              tierLabel="Oro"
              tierColor="border-yellow-200 bg-yellow-50/50"
              tierEmoji="🥇"
            />
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-gray-100 flex justify-between items-center gap-4">
          <p className="text-[10px] text-gray-400 hidden sm:block">
            Define los chocolates y costos en las pestañas 💎 Diamante y 🥇 Oro
          </p>
          <div className="flex gap-3 ml-auto">
            <button type="button" onClick={onClose}
              className="px-6 py-3 rounded-2xl font-bold text-gray-400 hover:text-black hover:bg-gray-50 transition-all text-sm">
              Cancelar
            </button>
            <button
              type={activeTab === 'general' ? 'submit' : 'button'}
              form={activeTab === 'general' ? 'product-form' : undefined}
              onClick={activeTab !== 'general' ? handleSubmit : undefined}
              disabled={loading || uploading}
              className="px-8 py-3 rounded-2xl font-black bg-[#0c0c0c] text-white flex items-center gap-2 hover:opacity-90 transition-all shadow-lg disabled:opacity-50 active:scale-95 text-sm min-w-[150px] justify-center"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle size={16} className="text-[#e2a9f1]" />}
              <span>{loading ? 'Guardando...' : product ? 'Guardar Cambios' : 'Crear Cajita'}</span>
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
        confirmText="Entendido"
      />
    </div>
  );
}
