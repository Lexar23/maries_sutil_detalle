'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, PackageSearch, Settings, ArrowLeft, ShoppingCart, LogOut } from 'lucide-react';
import { supabase } from '@/app/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const links = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Pedidos', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Inventario', href: '/admin/inventory', icon: PackageSearch },
    { name: 'Ajustes', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white/80 backdrop-blur-md border-r border-accent/20 min-h-screen flex flex-col pt-8">
      <div className="px-6 mb-8">
        <h2 className="text-xl font-bold text-letra">Admin Panel</h2>
        <p className="text-xs text-gray-500 mt-1">Marie&apos;s Sutil Detalle</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-primary text-letra font-semibold shadow-sm' 
                  : 'text-gray-600 hover:bg-primary/50 hover:text-letra'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-accent' : ''} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-accent/20 space-y-4">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-letra transition-colors px-2"
        >
          <ArrowLeft size={16} />
          Volver a la tienda
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 text-sm text-red-400 hover:text-red-500 transition-colors px-2 mt-2"
        >
          <LogOut size={16} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
