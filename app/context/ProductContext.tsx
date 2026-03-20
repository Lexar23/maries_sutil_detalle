'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Product, NewProduct } from '../interfaces/product';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: (force?: boolean) => Promise<void>;
  addProduct: (productData: NewProduct) => Promise<{ success: boolean; data?: any; error?: string }>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<{ success: boolean; data?: any; error?: string }>;
  deleteProduct: (id: string) => Promise<{ success: boolean; error?: string }>;
  uploadImage: (file: File) => Promise<{ success: boolean; url?: string; error?: string }>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchProducts = useCallback(async (force = false) => {
    if (hasLoaded && !force) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
      setHasLoaded(true);
      setError(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [hasLoaded]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = async (productData: NewProduct) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select();

      if (error) throw error;
      if (data) setProducts(prev => [data[0], ...prev]);
      return { success: true, data };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) throw error;
      if (data) {
        setProducts(prev => prev.map(p => (p.id === id ? data[0] : p)));
      }
      return { success: true, data };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setProducts(prev => prev.filter(p => p.id !== id));
      return { success: true };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File) => {
    try {
      setLoading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      return { success: true, url: publicUrl };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al subir imagen';
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      error,
      fetchProducts,
      addProduct,
      updateProduct,
      deleteProduct,
      uploadImage
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
