'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { Chocolate, NewChocolate } from '@/app/interfaces/chocolate';

// Seed data to auto-populate the table if empty
const SEED_CHOCOLATES: NewChocolate[] = [
  { name: 'Ferrero Rocher',         image: '/chocolates/ferrero.png',    unit_price: 600,  is_active: true },
  { name: 'Raffaello',              image: '/chocolates/raffaello.png',  unit_price: 500,  is_active: true },
  { name: 'Copper Kettle (Oscuro)', image: '/chocolates/copper.png',     unit_price: 700,  is_active: true },
  { name: "Nugget Hershey's",       image: '/chocolates/nugget.jpg',     unit_price: 350,  is_active: true },
  { name: "Mini Hershey's",         image: '/chocolates/mini1.png',      unit_price: 200,  is_active: true },
  { name: 'Kiss',                   image: '/chocolates/kiss1.png',      unit_price: 200,  is_active: true },
  { name: 'Guayabitas',             image: '/chocolates/guayabita.png',  unit_price: 150,  is_active: true },
  { name: 'Tutto',                  image: '/chocolates/Tutto.webp',     unit_price: 250,  is_active: true },
  { name: 'Trufa Oscura',           image: '/chocolates/trufa.png',      unit_price: 400,  is_active: true },
];

interface ChocolateContextType {
  chocolates: Chocolate[];
  loading: boolean;
  error: string | null;
  fetchChocolates: () => Promise<void>;
  addChocolate: (data: NewChocolate) => Promise<{ success: boolean; error?: string }>;
  updateChocolate: (id: string, data: Partial<NewChocolate>) => Promise<{ success: boolean; error?: string }>;
  deleteChocolate: (id: string) => Promise<{ success: boolean; error?: string }>;
}

const ChocolateContext = createContext<ChocolateContextType | undefined>(undefined);

export function ChocolateProvider({ children }: { children: React.ReactNode }) {
  const [chocolates, setChocolates] = useState<Chocolate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChocolates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('chocolates')
        .select('*')
        .order('name');

      if (err) throw err;

      // Auto-seed if the table is empty
      if (data && data.length === 0) {
        const { data: seeded, error: seedErr } = await supabase
          .from('chocolates')
          .insert(SEED_CHOCOLATES)
          .select();
        if (!seedErr && seeded) setChocolates(seeded);
      } else {
        setChocolates(data ?? []);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Error cargando chocolates';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChocolates();
  }, [fetchChocolates]);

  const addChocolate = async (data: NewChocolate) => {
    try {
      const { error: err } = await supabase.from('chocolates').insert([data]);
      if (err) return { success: false, error: err.message };
      await fetchChocolates();
      return { success: true };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Error' };
    }
  };

  const updateChocolate = async (id: string, data: Partial<NewChocolate>) => {
    try {
      const { error: err } = await supabase
        .from('chocolates')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (err) return { success: false, error: err.message };
      await fetchChocolates();
      return { success: true };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Error' };
    }
  };

  const deleteChocolate = async (id: string) => {
    try {
      const { error: err } = await supabase
        .from('chocolates')
        .delete()
        .eq('id', id);
      if (err) return { success: false, error: err.message };
      await fetchChocolates();
      return { success: true };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Error' };
    }
  };

  return (
    <ChocolateContext.Provider value={{
      chocolates, loading, error,
      fetchChocolates, addChocolate, updateChocolate, deleteChocolate,
    }}>
      {children}
    </ChocolateContext.Provider>
  );
}

export function useChocolates() {
  const ctx = useContext(ChocolateContext);
  if (!ctx) throw new Error('useChocolates must be used inside ChocolateProvider');
  return ctx;
}
