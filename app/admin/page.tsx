'use client';

import { useProducts } from '../hooks/useProducts';
import { useOrders } from '../hooks/useOrders';
import { PackageOpen, DollarSign, TrendingUp, AlertCircle, ShoppingBag, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const { products, loading: productsLoading } = useProducts();
  const { orders, loading: ordersLoading } = useOrders();

  const loading = productsLoading || ordersLoading;

  // Inventory Metrics
  const totalProducts = products.length;
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
  const lowStockProducts = products.filter(p => p.stock < 5).length;
  const inventoryValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);

  // Sales Metrics
  const successfulOrders = orders.filter(o => o.status === 'confirmed' || o.status === 'delivered');
  const totalSalesCount = successfulOrders.length;
  const totalRevenue = successfulOrders.reduce((acc, o) => acc + o.total_price, 0);
  const pendingRequests = orders.filter(o => o.status === 'pending').length;

  if (loading) {
    return (
      <div className="flex flex-col gap-8 animate-pulse">
        <div className="h-10 w-48 bg-gray-200 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-32 bg-gray-100 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    { 
      title: 'Ventas Totales', 
      value: `₡${totalRevenue.toLocaleString('es-CR')}`, 
      subValue: `${totalSalesCount} pedidos exitosos`,
      icon: DollarSign, 
      color: 'text-green-600', 
      bg: 'bg-green-50',
      border: 'border-green-100'
    },
    { 
      title: 'Pendientes de Revisión', 
      value: pendingRequests, 
      subValue: 'Nuevos pedidos por confirmar',
      icon: Clock, 
      color: 'text-yellow-600', 
      bg: 'bg-yellow-50',
      border: 'border-yellow-100'
    },
    { 
      title: 'Artículos en Stock', 
      value: totalStock, 
      subValue: `${totalProducts} variedades de productos`,
      icon: PackageOpen, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50',
      border: 'border-blue-100'
    },
    { 
      title: 'Alertas de Stock', 
      value: lowStockProducts, 
      subValue: 'Productos por agotarse',
      icon: AlertCircle, 
      color: 'text-red-600', 
      bg: 'bg-red-50',
      border: 'border-red-100'
    },
  ];

  return (
    <div className="space-y-10 animate-fade-in max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-letra tracking-tight">Panel de Control</h1>
          <p className="text-gray-500 mt-2 font-medium">Resumen operativo de Marie&apos;s Sutil Detalle.</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-bold text-gray-600">Sincronizado con Supabase</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-white p-7 rounded-[2rem] border ${stat.border} shadow-sm transition-all hover:shadow-xl hover:shadow-gray-100 group`}
            >
              <div className="flex flex-col h-full justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-letra tracking-tighter mb-1">{stat.value}</h3>
                  <p className="text-sm font-bold text-gray-800">{stat.title}</p>
                  <p className="text-xs text-gray-400 mt-2 font-medium">{stat.subValue}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16" />
          
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div>
              <h2 className="text-xl font-black text-letra">Pedidos Recientes</h2>
              <p className="text-sm text-gray-400 font-medium">Últimos movimientos detectados</p>
            </div>
            <a href="/admin/orders" className="text-accent font-bold text-sm hover:underline">Ver todos</a>
          </div>

          <div className="space-y-4 relative z-10">
            {orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <ShoppingBag size={48} className="mb-4 opacity-10" />
                <p>No hay pedidos registrados aún</p>
              </div>
            ) : (
              orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-5 bg-gray-50/50 rounded-2xl border border-gray-100 hover:border-accent/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
                      <ShoppingBag size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-letra">{order.customer_name}</p>
                      <p className="text-xs text-gray-400 font-medium">₡{order.total_price.toLocaleString('es-CR')}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold">{new Date(order.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-[#0c0c0c] text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-accent/20 to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-xl font-black mb-2">Salud del Inventario</h2>
            <p className="text-gray-400 text-sm font-medium mb-8">Estado actual de tus existencias</p>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                  <span>Valor de Inventario</span>
                  <span className="text-accent">₡{inventoryValue.toLocaleString('es-CR')}</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: '100%' }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                  <span>Productos Críticos</span>
                  <span className={lowStockProducts > 0 ? 'text-red-400' : 'text-green-400'}>{lowStockProducts}</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${lowStockProducts > 0 ? 'bg-red-500' : 'bg-green-500'}`} 
                    style={{ width: `${Math.min((lowStockProducts / totalProducts) * 100, 100)}%` }} 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
             <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                   <AlertCircle size={20} className="text-accent" />
                </div>
                <div>
                   <p className="text-xs font-bold text-white">Recomendación</p>
                   <p className="text-[10px] text-gray-400">
                     {lowStockProducts > 0 
                       ? `Tienes ${lowStockProducts} productos pidiendo stock urgente.` 
                       : "¡Todo luce perfecto! Tu stock está saludable."}
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
