'use client';

import { useState, useEffect } from 'react';
import { Activity, Check, X, RefreshCw } from 'lucide-react';
import { healthCheck } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Loading } from '@/components/ui/Loading';

interface ServiceStatus {
  clients: boolean;
  documents: boolean;
  overall: boolean;
}

export default function StatusPage() {
  const [status, setStatus] = useState<ServiceStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);

  const checkStatus = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    else setChecking(true);

    try {
      const result = await healthCheck.checkAllServices();
      setStatus(result);
    } catch (error) {
      setStatus({
        clients: false,
        documents: false,
        overall: false,
      });
    } finally {
      setLoading(false);
      setChecking(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const handleRefresh = () => {
    checkStatus(false);
  };

  if (loading) {
    return <Loading size="lg" text="Verificando status dos serviços..." />;
  }

  const ServiceStatusCard = ({ 
    name, 
    isHealthy, 
    url, 
    description 
  }: { 
    name: string; 
    isHealthy: boolean; 
    url: string; 
    description: string; 
  }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {isHealthy ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : (
            <X className="h-5 w-5 text-red-500" />
          )}
          <span>{name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
            isHealthy 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {isHealthy ? 'Online' : 'Offline'}
          </div>
          <p className="text-sm text-gray-600">{description}</p>
          <p className="text-xs text-gray-400">{url}</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Activity className="h-6 w-6 text-primary-600" />
          <h1 className="text-2xl font-bold">Status dos Serviços</h1>
        </div>
        
        <Button
          variant="secondary"
          onClick={handleRefresh}
          loading={checking}
        >
          <RefreshCw className="h-4 w-4" />
          Verificar Novamente
        </Button>
      </div>

      {/* Status Geral */}
      <Card className={`border-2 ${
        status?.overall 
          ? 'border-green-200 bg-green-50' 
          : 'border-red-200 bg-red-50'
      }`}>
        <CardContent className="flex items-center space-x-4 py-6">
          <div className={`p-3 rounded-full ${
            status?.overall 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {status?.overall ? (
              <Check className="h-6 w-6" />
            ) : (
              <X className="h-6 w-6" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold">
              Sistema {status?.overall ? 'Operacional' : 'Com Problemas'}
            </h2>
            <p className="text-sm text-gray-600">
              {status?.overall 
                ? 'Todos os serviços estão funcionando normalmente.' 
                : 'Um ou mais serviços estão indisponíveis.'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Status Individual dos Serviços */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ServiceStatusCard
          name="API de Clientes"
          isHealthy={status?.clients || false}
          url="http://localhost:8080"
          description="Gerenciamento de clientes, cadastro e consultas"
        />
        
        <ServiceStatusCard
          name="API de Documentos"
          isHealthy={status?.documents || false}
          url="http://localhost:8082"
          description="Geração de documentos personalizados"
        />
      </div>

      {/* Informações Adicionais */}
      <Card>
        <CardHeader>
          <CardTitle>Como Iniciar os Serviços</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div>
              <h4 className="font-medium">1. API de Clientes (Porta 8080):</h4>
              <code className="bg-gray-100 px-2 py-1 rounded">
                cd api--sigacore-service && go run cmd/main.go
              </code>
            </div>
            
            <div>
              <h4 className="font-medium">2. API de Documentos (Porta 8082):</h4>
              <code className="bg-gray-100 px-2 py-1 rounded">
                cd api--sigadocs-service && go run main.go
              </code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
