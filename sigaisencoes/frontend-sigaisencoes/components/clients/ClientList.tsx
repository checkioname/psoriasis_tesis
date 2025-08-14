'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw, Users, Plus } from 'lucide-react';
import { ClienteResponse } from '@/lib/types';
import { clientsService } from '@/lib/api';
import { ClientCard } from './ClientCard';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import toast from 'react-hot-toast';

export function ClientList() {
  const router = useRouter();
  const [clients, setClients] = useState<ClienteResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchClients = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    else setRefreshing(true);

    try {
      const response = await clientsService.getClientes(0, 50);
      setClients(response.clientes || []);
    } catch (error: any) {
      toast.error(error.message || 'Erro ao carregar clientes');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleRefresh = () => {
    fetchClients(false);
  };

  if (loading) {
    return <Loading size="lg" text="Carregando clientes..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6 text-primary-600" />
          <h1 className="text-2xl font-bold">Clientes</h1>
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
            {clients.length}
          </span>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="primary"
            onClick={() => router.push('/cadastro')}
          >
            <Plus className="h-4 w-4" />
            Novo Cliente
          </Button>
          
          <Button
            variant="secondary"
            onClick={handleRefresh}
            loading={refreshing}
          >
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </Button>
        </div>
      </div>

      {clients.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum cliente encontrado
          </h3>
          <p className="text-gray-500">
            Comece criando seu primeiro cliente.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {clients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      )}
    </div>
  );
}
