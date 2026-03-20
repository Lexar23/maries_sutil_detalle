'use client';

import AdminSidebar from './components/AdminSidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ProductProvider } from '../context/ProductContext';
import { ChocolateProvider } from '../context/ChocolateContext';
import AuthWrapper from './components/AuthWrapper';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  return (
    <AuthWrapper>
      <ProductProvider>
        <ChocolateProvider>
          <div className="flex min-h-screen bg-gray-50 text-letra font-sans antialiased">
            {!isLoginPage && <AdminSidebar />}

            <main className="flex-1 p-8 overflow-y-auto">
              {!isLoginPage ? (
                <>
                  <div className="max-w-6xl mx-auto hidden md:block">{children}</div>

                  {/* Mobile Warning */}
                  <div className="md:hidden flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold">Modo Escritorio Recomendado</h2>
                    <p className="text-gray-600">
                      Para una mejor experiencia administrando el inventario y tu dashboard, te recomendamos usar un ordenador o tablet grande.
                    </p>
                    <Link href="/" className="mt-8 text-accent underline font-medium">Volver a la tienda</Link>
                  </div>
                </>
              ) : (
                children
              )}
            </main>
          </div>
        </ChocolateProvider>
      </ProductProvider>
    </AuthWrapper>
  );
}
