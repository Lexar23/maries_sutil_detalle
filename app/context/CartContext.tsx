'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  tier?: string;     // 'Diamante' | 'Oro' — only set when product has two versions
  color?: string | null;
  design?: string | null;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, tier: string, color?: string | null, design?: string | null) => void;
  updateQuantity: (id: string, tier: string, quantity: number, color?: string | null, design?: string | null) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // LocalStorage sync
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem: CartItem) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => 
        item.id === newItem.id && 
        item.tier === newItem.tier && 
        (item.color || null) === (newItem.color || null) && 
        (item.design || null) === (newItem.design || null)
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += newItem.quantity;
        return updatedCart;
      }
      return [...prevCart, newItem];
    });
    setIsOpen(true);
  };

  const removeFromCart = (id: string, tier: string, color?: string | null, design?: string | null) => {
    setCart(prevCart => prevCart.filter(item => 
      !(item.id === id && item.tier === tier && (item.color || null) === (color || null) && (item.design || null) === (design || null))
    ));
  };

  const updateQuantity = (id: string, tier: string, quantity: number, color?: string | null, design?: string | null) => {
    if (quantity < 1) return;
    setCart(prevCart => prevCart.map(item => 
      (item.id === id && item.tier === tier && (item.color || null) === (color || null) && (item.design || null) === (design || null))
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      isOpen,
      setIsOpen
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
