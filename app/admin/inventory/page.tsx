'use client';

import { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Product, NewProduct } from '../../interfaces/product';
import ProductModal from '../components/ProductModal';
import { Plus, Edit2, Trash2, Search, AlertCircle, Database } from 'lucide-react';
import Image from 'next/image';
import Modal from '../../components/UI/Modal';

export default function InventoryPage() {
  const { products, loading, error, addProduct, updateProduct, deleteProduct, fetchProducts } = useProducts();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (product?: Product) => {
    setEditingProduct(product || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSaveProduct = async (productData: NewProduct) => {
    setIsSubmitting(true);
    let result;
    
    if (editingProduct) {
      result = await updateProduct(editingProduct.id, productData);
    } else {
      result = await addProduct(productData);
    }

    if (result.success) {
      handleCloseModal();
      fetchProducts();
      setModalConfig({
        isOpen: true,
        type: 'success',
        title: '¡Guardado!',
        message: 'El producto se ha guardado correctamente en tu catálogo.'
      });
    } else {
      setModalConfig({
        isOpen: true,
        type: 'error',
        title: 'Error al guardar',
        message: result.error || 'Ocurrió un error inesperado.'
      });
    }
    
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    setModalConfig({
      isOpen: true,
      type: 'confirm',
      title: '¿Eliminar producto?',
      message: 'Esta acción no se puede deshacer y el producto desaparecerá del catálogo público.',
      onConfirm: async () => {
        const result = await deleteProduct(id);
        if (result.success) {
          setModalConfig({
            isOpen: true,
            type: 'success',
            title: 'Eliminado',
            message: 'El producto ha sido borrado con éxito.'
          });
        } else {
          setModalConfig({
            isOpen: true,
            type: 'error',
            title: 'Error',
            message: `Error al eliminar: ${result.error}`
          });
        }
      }
    });
  };

  const migrateData = async () => {
    setModalConfig({
      isOpen: true,
      type: 'confirm',
      title: '¿Sincronizar Catálogo?',
      message: 'Se subirán las cajitas con su contenido de chocolates a la base de datos. Los productos ya existentes (mismo slug) se omitirán.',
      onConfirm: async () => {
        setIsSubmitting(true);
        try {
          const { products: staticProducts } = await import('../../lib/products');

          let successCount = 0;
          let errorCount = 0;

          for (const p of staticProducts) {
            const parsedPrice = parseInt(p.tiers[0]?.price.replace(/[^0-9]/g, '') || '0') || 0;
            const contents = p.tiers[0]?.ingredients?.map((ing) => ({
              name: ing.name,
              quantity: ing.quantity,
              image: ing.image,
            })) || [];

            const result = await addProduct({
              name: p.name,
              slug: p.id,
              description: p.description,
              price: parsedPrice,
              stock: 10,
              category: p.categoryId,
              image_url: p.image,
              is_active: true,
              contents,
            });

            if (result.success) {
              successCount++;
            } else {
              if (result.error?.includes('duplicate') || result.error?.includes('unique') || result.error?.includes('already exists')) {
                successCount++; // already in DB
              } else {
                console.error(`Error al subir ${p.name}:`, result.error);
                errorCount++;
              }
            }
          }

          setModalConfig({
            isOpen: true,
            type: errorCount > 0 ? 'warning' : 'success',
            title: errorCount > 0 ? 'Sincronización Parcial' : '¡Catálogo Sincronizado!',
            message: `Proceso finalizado:\n- ${successCount} cajitas listas.\n- ${errorCount} errores detectados.`
          });
          fetchProducts(true);
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'Error desconocido';
          setModalConfig({
            isOpen: true,
            type: 'error',
            title: 'Error fatal',
            message: `Error durante la sincronización: ${message}`
          });
        } finally {
          setIsSubmitting(false);
        }
      }
    });
  };

  if (loading && products.length === 0) {
    return <div className="text-gray-500 animate-pulse">Cargando inventario...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in relative min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-letra tracking-tight">Inventario de Productos</h1>
          <p className="text-gray-500 mt-1">Gestiona los productos disponibles en Marie&apos;s Sutil Detalle.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={migrateData}
            disabled={isSubmitting}
            className="bg-gray-800 hover:bg-black text-white px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-medium transition-colors disabled:opacity-50"
          >
            Subir Datos Estáticos
          </button>
          
          <button 
            onClick={() => handleOpenModal()}
            className="bg-accent hover:opacity-90 text-letra font-semibold px-6 py-3 rounded-full flex items-center gap-2 shadow-sm transition-all"
          >
            <Plus size={20} />
            Nuevo Producto
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 border border-red-100">
          <AlertCircle size={20} />
          <p>{error} - <span className="text-sm">Recuerda configurar correctamente las variables de entorno de Supabase.</span></p>
        </div>
      )}

      {/* Buscador */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
        <Search className="text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Buscar por nombre o categoría..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent focus:outline-none text-letra"
        />
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-sm font-medium text-gray-500">
                <th className="px-6 py-4">Cajita</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Precio</th>
                <th className="px-6 py-4">Categoría</th>
                <th className="px-6 py-4">🍫 Contenido</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No se encontraron productos en el inventario.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden relative border border-gray-200 shrink-0">
                          {p.image_url ? (
                            <Image
                              src={p.image_url}
                              alt={p.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">N/A</div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-letra">{p.name}</p>
                          <p className="text-xs text-gray-400">{p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full font-medium ${
                        p.stock > 10 ? 'bg-green-100 text-green-700' :
                        p.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {p.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium">₡{p.price.toLocaleString('es-CR')}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-semibold text-gray-600 capitalize">
                        {p.category === 'amor' ? '❤️ Amor' :
                         p.category === 'boda' ? '💍 Boda' :
                         p.category === 'babyshower' ? '🍼 Babyshower' : p.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {p.contents && p.contents.length > 0 ? (
                        <div className="flex items-center gap-1 flex-wrap">
                          {p.contents.slice(0, 3).map((c: { name: string; quantity: number; image: string }, idx: number) => (
                            <div key={idx} className="relative w-6 h-6 rounded-full overflow-hidden border border-gray-100 bg-white" title={`${c.quantity}x ${c.name}`}>
                              <Image src={c.image} alt={c.name} fill className="object-contain p-0.5" />
                            </div>
                          ))}
                          {p.contents.length > 3 && (
                            <span className="text-[10px] text-gray-400 font-bold">+{p.contents.length - 3}</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-300 italic">Sin definir</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex w-fit items-center gap-1.5 px-3 py-1 rounded-full border ${
                        p.is_active ? 'bg-primary/30 border-primary text-letra' : 'bg-gray-100 border-gray-200 text-gray-500'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${p.is_active ? 'bg-accent' : 'bg-gray-400'}`}></span>
                        {p.is_active ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenModal(p)}
                        className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}

            </tbody>
          </table>
        </div>
      </div>

      <ProductModal 
        key={editingProduct?.id || (isModalOpen ? 'new' : 'closed')}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
        product={editingProduct}
        loading={isSubmitting}
      />

      <Modal 
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        onConfirm={modalConfig.onConfirm}
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
        confirmText={modalConfig.type === 'confirm' ? 'Confirmar' : 'Aceptar'}
      />
    </div>
  );
}
