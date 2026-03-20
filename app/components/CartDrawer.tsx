'use client'; // Premium Checkout Experience

import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { supabase } from '../lib/supabaseClient';
import Modal from './UI/Modal';

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [loading, setLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    deliveryDate: '',
  });
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        customer_name: customerInfo.name,
        customer_phone: customerInfo.phone,
        delivery_date: customerInfo.deliveryDate,
        items: cart,
        total_price: cartTotal,
        status: 'pending'
      };

      const { error } = await supabase
        .from('orders')
        .insert([orderData]);

      if (error) throw error;

      // Prepare WhatsApp message
      let message = `*Nuevo Pedido - Marie's Sutil Detalle*\n\n`;
      message += `*Cliente:* ${customerInfo.name}\n`;
      message += `*Teléfono:* ${customerInfo.phone}\n`;
      message += `*Fecha de Entrega:* ${customerInfo.deliveryDate}\n\n`;
      message += `*Pedido:*\n`;
      
      cart.forEach(item => {
        message += `- ${item.name} (${item.tier}) x${item.quantity}`;
        if (item.color) message += ` | Color: ${item.color}`;
        if (item.design) message += ` | Diseño: ${item.design}`;
        message += ` - ₡${(item.price * item.quantity).toLocaleString('es-CR')}\n`;
      });

      message += `\n*Total:* ₡${cartTotal.toLocaleString('es-CR')}`;

      const whatsappUrl = `https://wa.me/50670682440?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      setStep('success');
      clearCart();
    } catch (err: any) {
      console.error('Error creating order:', err);
      setModalConfig({
        isOpen: true,
        type: 'error',
        title: 'Error en el pedido',
        message: 'Hubo un problema al procesar tu solicitud. Por favor intenta de nuevo.'
      });
    } finally {
      setLoading(false);
    }
  };

  const closeAndReset = () => {
    onClose();
    setTimeout(() => {
      setStep('cart');
      setCustomerInfo({ name: '', phone: '', deliveryDate: '' });
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeAndReset}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* Modal Container - Using a fixed height for stability on mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl flex flex-col h-[600px] max-h-[85vh] overflow-hidden border border-white/20 relative z-[160]"
      >
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-gray-100 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/30 rounded-2xl text-accent">
              <ShoppingBag size={24} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-letra">Tu Carrito</h2>
              <p className="text-[10px] font-black uppercase tracking-widest text-accent">{cart.length} items</p>
            </div>
          </div>
          <button onClick={closeAndReset} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
          {step === 'cart' && (
            <div className="space-y-4">
              {cart.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-gray-400 font-bold">Carrito vacío</p>
                  <button onClick={closeAndReset} className="text-accent underline mt-2 font-bold">Ver Catálogo</button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white border shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm truncate">{item.name}</h4>
                      {item.tier && <p className="text-[10px] text-gray-400 font-bold uppercase">{item.tier}</p>}
                      <div className="mt-2 flex justify-between items-center">
                        <div className="flex items-center bg-white rounded-lg border p-1">
                          <button onClick={() => updateQuantity(item.id, item.tier ?? '', item.quantity - 1, item.color, item.design)} className="px-2"><Minus size={12} /></button>
                          <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.tier ?? '', item.quantity + 1, item.color, item.design)} className="px-2"><Plus size={12} /></button>
                        </div>
                        <p className="font-bold text-sm">₡{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id, item.tier ?? '', item.color, item.design)} className="text-gray-300 hover:text-red-500"><Trash2 size={16} /></button>
                  </div>
                ))
              )}
            </div>
          )}

          {step === 'checkout' && (
            <form id="order-form" onSubmit={handleCheckout} className="space-y-6">
              <input 
                required placeholder="Nombre completo" 
                className="w-full bg-gray-50 border rounded-2xl p-4 font-bold text-sm outline-none focus:border-accent"
                value={customerInfo.name}
                onChange={e => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
              />
              <input 
                required placeholder="WhatsApp (Ej: 8888-8888)" 
                className="w-full bg-gray-50 border rounded-2xl p-4 font-bold text-sm outline-none focus:border-accent"
                value={customerInfo.phone}
                onChange={e => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
              />
              <input 
                required type="date"
                className="w-full bg-gray-50 border rounded-2xl p-4 font-bold text-sm outline-none focus:border-accent"
                value={customerInfo.deliveryDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => setCustomerInfo(prev => ({ ...prev, deliveryDate: e.target.value }))}
              />
              <div className="p-4 bg-primary/20 rounded-2xl text-[11px] font-medium leading-relaxed">
                Confirmaremos los detalles finales y el envío por WhatsApp al recibir tu solicitud.
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="py-12 text-center space-y-6">
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto"><CheckCircle2 size={40} /></div>
              <h3 className="text-2xl font-black">¡Pedido Enviado!</h3>
              <p className="text-gray-500 text-sm">Por favor envía el mensaje en WhatsApp para finalizar.</p>
              <button onClick={closeAndReset} className="w-full bg-letra text-white py-4 rounded-2xl font-bold">Cerrar</button>
            </div>
          )}
        </div>

        {/* Footer Area */}
        {cart.length > 0 && step !== 'success' && (
          <div className="p-6 sm:p-8 border-t border-gray-100 shrink-0">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-black uppercase text-gray-400">Total</span>
              <span className="text-2xl font-black">₡{cartTotal.toLocaleString()}</span>
            </div>
            {step === 'cart' ? (
              <button onClick={() => setStep('checkout')} className="w-full bg-accent text-letra py-4 rounded-2xl font-black text-lg shadow-xl shadow-accent/20">Continuar</button>
            ) : (
              <div className="flex gap-4">
                <button onClick={() => setStep('cart')} className="flex-1 bg-gray-50 py-4 rounded-2xl font-black text-gray-400">Volver</button>
                <button form="order-form" type="submit" disabled={loading} className="flex-[2] bg-accent py-4 rounded-2xl font-black text-lg">Solicitar Orden</button>
              </div>
            )}
          </div>
        )}
      </motion.div>

      <Modal 
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
        confirmText="OK"
      />
    </div>
  );
}
