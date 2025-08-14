import axios from 'axios';
import { Cliente, ClienteListResponse, ClienteResponse, DocumentResponse } from './types';

// Configuração do Axios
const clientsApi = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const docsApi = axios.create({
  baseURL: 'http://localhost:8082',
  timeout: 30000, // Maior timeout para geração de documentos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors para tratamento de erros
clientsApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na API de Clientes:', error);
    return Promise.reject(error);
  }
);

docsApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na API de Documentos:', error);
    return Promise.reject(error);
  }
);

// Serviços da API de Clientes
export const clientsService = {
  // Listar clientes
  async getClientes(page: number = 0, size: number = 10): Promise<ClienteListResponse> {
    try {
      const response = await clientsApi.get(`/clientes?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      throw new Error('Falha ao buscar clientes');
    }
  },

  // Buscar cliente por ID
  async getClienteById(id: string): Promise<ClienteResponse> {
    try {
      const response = await clientsApi.get(`/clientes/detalhes?id=${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Cliente não encontrado');
    }
  },

  // Criar cliente
  async createCliente(cliente: Cliente): Promise<{ message: string; status: string }> {
    try {
      const response = await clientsApi.post('/clientes', cliente);
      return response.data;
    } catch (error) {
      throw new Error('Falha ao criar cliente');
    }
  },

  // Verificar saúde da API
  async checkHealth(): Promise<boolean> {
    try {
      await clientsApi.get('/health');
      return true;
    } catch {
      return false;
    }
  },
};

// Serviços da API de Documentos
export const documentsService = {
  // Gerar documento
  async generateDocument(clientId: string): Promise<DocumentResponse> {
    try {
      const response = await docsApi.post(`/documents/generate/${clientId}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data?.error || 'Falha ao gerar documento');
      }
      throw new Error('Erro de conexão com o serviço de documentos');
    }
  },

  // Verificar saúde da API
  async checkHealth(): Promise<boolean> {
    try {
      await docsApi.get('/health');
      return true;
    } catch {
      return false;
    }
  },
};

// Função utilitária para testar conectividade
export const healthCheck = {
  async checkAllServices(): Promise<{
    clients: boolean;
    documents: boolean;
    overall: boolean;
  }> {
    const [clientsHealthy, documentsHealthy] = await Promise.all([
      clientsService.checkHealth(),
      documentsService.checkHealth(),
    ]);

    return {
      clients: clientsHealthy,
      documents: documentsHealthy,
      overall: clientsHealthy && documentsHealthy,
    };
  },
};
