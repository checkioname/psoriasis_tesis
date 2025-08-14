'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulação de login - substituir por integração real
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (formData.email === 'admin@sigaisencoes.com' && formData.password === 'admin123') {
        toast.success('Login realizado com sucesso!');
        
        // Simular armazenamento de token
        localStorage.setItem('auth-token', 'mock-jwt-token');
        localStorage.setItem('user-data', JSON.stringify({
          name: 'Administrador',
          email: formData.email,
          role: 'admin'
        }));
        
        router.push('/');
      } else {
        toast.error('Credenciais inválidas');
      }
    } catch (error) {
      toast.error('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 px-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">SigaIsenções</h1>
          <p className="text-gray-600 mt-2">Faça login para acessar o sistema</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 justify-center">
              <LogIn className="h-5 w-5" />
              <span>Entrar</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Sua senha"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onChange={(e) => handleChange('rememberMe', e.target.checked)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="rememberMe" className="text-sm text-gray-600">
                    Lembrar de mim
                  </label>
                </div>

                <button
                  type="button"
                  className="text-sm text-primary-600 hover:text-primary-500"
                  onClick={() => toast.info('Funcionalidade em desenvolvimento')}
                >
                  Esqueceu a senha?
                </button>
              </div>

              <Button
                type="submit"
                loading={loading}
                className="w-full"
              >
                <LogIn className="h-4 w-4" />
                Entrar
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2 font-medium">
                Credenciais de demonstração:
              </p>
              <div className="text-xs text-gray-500 space-y-1">
                <p><strong>Email:</strong> admin@sigaisencoes.com</p>
                <p><strong>Senha:</strong> admin123</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Não tem uma conta?{' '}
            <button
              onClick={() => toast.info('Funcionalidade em desenvolvimento')}
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              Entre em contato
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
