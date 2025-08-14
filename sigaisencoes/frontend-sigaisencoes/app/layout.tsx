import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SigaIsenções - Gestão de Clientes',
  description: 'Sistema para gestão de clientes e geração de documentos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <h1 className="text-xl font-bold text-primary-600">
                    SigaIsenções
                  </h1>
                </div>
                <nav className="flex space-x-4">
                  <a 
                    href="/" 
                    className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Clientes
                  </a>
                  <a 
                    href="/cadastro" 
                    className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Cadastro
                  </a>
                  <a 
                    href="/status" 
                    className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Status
                  </a>
                  <a 
                    href="/login" 
                    className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </a>
                </nav>
              </div>
            </div>
          </header>
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
        
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: '#10b981',
              },
            },
            error: {
              style: {
                background: '#ef4444',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
