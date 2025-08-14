'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  CreditCard,
  FileText,
  Edit,
  Trash2,
  Download
} from 'lucide-react';
import { ClienteResponse } from '@/lib/types';
import { clientsService, documentsService } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Loading } from '@/components/ui/Loading';
import toast from 'react-hot-toast';

interface ClientDetailsPageProps {
  params: {
    id: string;
  };
}

export default function ClientDetailsPage({ params }: ClientDetailsPageProps) {
  const router = useRouter();
  const [client, setClient] = useState<ClienteResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [generatingDoc, setGeneratingDoc] = useState(false);

  useEffect(() => {
    fetchClient();
  }, [params.id]);

  const fetchClient = async () => {
    try {
      const clientData = await clientsService.getClienteById(params.id);
      setClient(clientData);
    } catch (error: any) {
      toast.error(error.message || 'Cliente não encontrado');
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateDocument = async () => {
    if (!client) return;
    
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
      return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const formatPhone = (phone: number | undefined) => {
    if (!phone) return 'Não informado';
    const phoneStr = phone.toString();
    if (phoneStr.length === 11) {
      return `(${phoneStr.slice(0, 2)}) ${phoneStr.slice(2, 7)}-${phoneStr.slice(7)}`;
    }
    return phoneStr;
  };

  if (loading) {
    return <Loading size="lg" text="Carregando detalhes do cliente..." />;
  }

  if (!client) {
    return (
      <div className="text-center py-12">
        <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Cliente não encontrado
        </h3>
        <Button onClick={() => router.push('/')}>
          Voltar para lista
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="secondary"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          
          <div className="flex items-center space-x-2">
            <User className="h-6 w-6 text-primary-600" />
            <h1 className="text-2xl font-bold">{client.nome}</h1>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="primary"
            onClick={handleGenerateDocument}
            loading={generatingDoc}
          >
            <FileText className="h-4 w-4" />
            Gerar Documento
          </Button>
          
          <Button variant="secondary">
            <Edit className="h-4 w-4" />
            Editar
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Data de Cadastro</p>
                <p className="font-semibold">{formatDate(client.dataCadastro)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${
                client.expiraEmBreve ? 'bg-yellow-100' : 'bg-green-100'
              }`}>
                <Calendar className={`h-4 w-4 ${
                  client.expiraEmBreve ? 'text-yellow-600' : 'text-green-600'
                }`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className={`font-semibold ${
                  client.expiraEmBreve ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {client.expiraEmBreve ? 'Expira em breve' : 'Em dia'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <CreditCard className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Processo</p>
                <p className="font-semibold">{client.statusProcesso}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informações Pessoais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Informações Pessoais</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <User className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Nome Completo</p>
                  <p className="font-medium">{client.nome}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">E-mail</p>
                  <p className="font-medium">{client.email}</p>
                </div>
              </div>

              {client.telefone && (
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Telefone</p>
                    <p className="font-medium">{formatPhone(client.telefone)}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Cadastrado em</p>
                  <p className="font-medium">{formatDate(client.dataCadastro)}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CreditCard className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">ID do Cliente</p>
                  <p className="font-medium font-mono">{client.id}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ações Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Ações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={handleGenerateDocument}
              loading={generatingDoc}
              className="h-16 flex-col space-y-1"
            >
              <FileText className="h-6 w-6" />
              <span>Gerar Documento</span>
            </Button>

            <Button
              variant="secondary"
              className="h-16 flex-col space-y-1"
              onClick={() => toast.info('Funcionalidade em desenvolvimento')}
            >
              <Edit className="h-6 w-6" />
              <span>Editar Cliente</span>
            </Button>

            <Button
              variant="secondary"
              className="h-16 flex-col space-y-1"
              onClick={() => toast.info('Funcionalidade em desenvolvimento')}
            >
              <Download className="h-6 w-6" />
              <span>Baixar Histórico</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Histórico de Documentos */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Documentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              Histórico de documentos será implementado em breve
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
