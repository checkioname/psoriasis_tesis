'use client';

import { useRouter } from 'next/navigation';
import { Home, ArrowLeft, Search, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-4">
            <AlertTriangle className="h-12 w-12 text-red-600" />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Página não encontrada
          </h2>
          <p className="text-gray-600">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        {/* Actions Card */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 mb-4">
                O que você pode fazer:
              </h3>
              
              <div className="space-y-3">
                <Button
                  onClick={() => router.push('/')}
                  className="w-full"
                >
                  <Home className="h-4 w-4" />
                  Ir para página inicial
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => router.back()}
                  className="w-full"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar para página anterior
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => router.push('/status')}
                  className="w-full"
                >
                  <Search className="h-4 w-4" />
                  Verificar status do sistema
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="text-sm text-gray-500">
          <p className="mb-4">Links úteis:</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => router.push('/')}
              className="text-primary-600 hover:text-primary-500"
            >
              Clientes
            </button>
            <button
              onClick={() => router.push('/cadastro')}
              className="text-primary-600 hover:text-primary-500"
            >
              Cadastro
            </button>
            <button
              onClick={() => router.push('/status')}
              className="text-primary-600 hover:text-primary-500"
            >
              Status
            </button>
            <button
              onClick={() => router.push('/login')}
              className="text-primary-600 hover:text-primary-500"
            >
              Login
            </button>
          </div>
        </div>

        {/* Error Code */}
        <div className="mt-8 text-xs text-gray-400">
          Código de erro: 404 - Página não encontrada
        </div>
      </div>
    </div>
  );
}
