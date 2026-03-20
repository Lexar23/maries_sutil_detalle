'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';

export interface Order {
  id: string;
  created_at: string;
  customer_name: string;
  customer_phone: string;
  items: any[];
  total_price: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  delivery_date?: string;
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al cargar pedidos';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
      return { success: true };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al actualizar pedido';
      return { success: false, error: message };
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setOrders(prev => prev.filter(o => o.id !== id));
      return { success: true };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al eliminar pedido';
      return { success: false, error: message };
    }
  };

  return {
    orders,
    loading,
    error,
    fetchOrders,
    updateOrderStatus,
    deleteOrder
  };
};
