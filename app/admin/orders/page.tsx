'use client';

import { useState } from 'react';
import { useOrders, Order } from '../../hooks/useOrders';
import { Package, Phone, Calendar, Clock, CheckCircle, XCircle, Trash2, AlertCircle, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Modal from '../../components/UI/Modal';

export default function OrdersPage() {
  const { orders, loading, error, updateOrderStatus, deleteOrder } = useOrders();
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error' | 'confirm';
    onConfirm?: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'confirmed': return 'Confirmado';
      case 'delivered': return 'Entregado';
      case 'cancelled': return 'Cancelado';
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    setModalConfig({
      isOpen: true,
      type: 'confirm',
      title: 'Eliminar Pedido',
      message: '¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.',
      onConfirm: async () => {
        const res = await deleteOrder(id);
        if (res && 'error' in res && res.error) {
          setModalConfig({
            isOpen: true,
            type: 'error',
            title: 'Error',
            message: res.error
          });
        }
      }
    });
  };

  if (loading && orders.length === 0) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 bg-gray-200 rounded-xl w-1/4"></div>
        <div className="h-64 bg-gray-200 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-extrabold text-letra tracking-tight">Pedidos Recibidos</h1>
        <p className="text-gray-500 mt-1">Gestiona las solicitudes de tus clientes y el estado de entrega.</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 border border-red-100">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-200">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No hay pedidos registrados aún.</p>
          </div>
        ) : (
          orders.map((order) => (
            <motion.div 
              layout
              key={order.id} 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6 md:p-8">
                {/* Header Card */}
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                      <span className="text-gray-300 text-xs">#{order.id.slice(0, 8)}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-letra">{order.customer_name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <a href={`tel:${order.customer_phone}`} className="flex items-center gap-1.5 hover:text-accent transition-colors">
                        <Phone size={14} />
                        {order.customer_phone}
                      </a>
                      <div className="flex items-center gap-1.5 font-bold text-accent">
                        <Calendar size={14} />
                        Entrega: {order.delivery_date || 'No especificada'}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        Pedido el: {new Date(order.created_at).toLocaleDateString('es-CR')}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {new Date(order.created_at).toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateOrderStatus(order.id, 'confirmed');
                      }}
                      className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
                      title="Confirmar Pedido"
                    >
                      <CheckCircle size={20} />
                    </button>
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateOrderStatus(order.id, 'delivered');
                      }}
                      className="p-2.5 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors"
                      title="Marcar como Entregado"
                    >
                      <CheckCircle size={20} />
                    </button>
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateOrderStatus(order.id, 'cancelled');
                      }}
                      className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                      title="Cancelar Pedido"
                    >
                      <XCircle size={20} />
                    </button>
                    <button 
                      type="button"
                      onClick={(e) => handleDelete(e, order.id)}
                      className="p-2.5 text-gray-400 hover:text-red-500 transition-colors"
                      title="Eliminar Registro"
                    >
                      <Trash2 size={20} />
                    </button>
                    <a 
                      href={`https://wa.me/${order.customer_phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 bg-green-500 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-green-100"
                    >
                      WhatsApp
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                {/* Items List */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Detalle de Productos</h4>
                  <div className="divide-y divide-gray-200">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-4 flex justify-between items-center gap-4">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 bg-white rounded-lg border border-gray-100 flex items-center justify-center text-xl shrink-0">
                            🎁
                          </div>
                          <div>
                            <p className="font-bold text-sm">{item.name} <span className="text-accent ml-2 text-xs">x{item.quantity}</span></p>
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">
                              {item.tier} {item.color ? `| Color: ${item.color}` : ''} {item.design ? `| Diseño: ${item.design}` : ''}
                            </p>
                          </div>
                        </div>
                        <p className="font-bold text-sm text-letra">
                          ₡{(item.price * item.quantity).toLocaleString('es-CR')}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                    <span className="font-bold text-letra">Total del Pedido</span>
                    <span className="text-xl font-black text-accent">₡{order.total_price.toLocaleString('es-CR')}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <Modal 
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        onConfirm={modalConfig.onConfirm}
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
        confirmText={modalConfig.type === 'confirm' ? 'Eliminar' : 'Entendido'}
      />
    </div>
  );
}
