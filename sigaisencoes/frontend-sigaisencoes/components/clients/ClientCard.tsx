'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Calendar, FileText, Eye } from 'lucide-react';
import { ClienteResponse } from '@/lib/types';
import { documentsService } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import toast from 'react-hot-toast';

interface ClientCardProps {
  client: ClienteResponse;
}

export function ClientCard({ client }: ClientCardProps) {
  const router = useRouter();
  const [generatingDoc, setGeneratingDoc] = useState(false);

  const handleGenerateDocument = async () => {
    setGeneratingDoc(true);
    try {
      const response = await documentsService.generateDocument(client.id);
      if (response.success) {
        toast.success(`Documento gerado: ${response.filename}`);
      } else {
        toast.error('Falha ao gerar documento');
      }
    } catch (error: any) {
      toast.error(error.message || 'Erro ao gerar documento');
    } finally {
      setGeneratingDoc(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('pt-BR');
    } catch {
      return dateString;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <User className="h-5 w-5 text-gray-500" />
              <h3 className="font-semibold text-lg">{client.nome}</h3>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>{client.email}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Cadastro: {formatDate(client.dataCadastro)}</span>
              </div>
              
              {client.telefone && (
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Telefone:</span>
                  <span>{client.telefone}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4 mt-4">
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                client.expiraEmBreve 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {client.expiraEmBreve ? '⚠️ Expira em breve' : '✅ Em dia'}
              </div>
              
              <div className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {client.statusProcesso}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => router.push(`/cliente/${client.id}`)}
              className="whitespace-nowrap"
            >
              <Eye className="h-4 w-4" />
              Ver Detalhes
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleGenerateDocument}
              loading={generatingDoc}
              className="whitespace-nowrap"
            >
              <FileText className="h-4 w-4" />
              Gerar Documento
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
