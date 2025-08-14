// Tipos TypeScript para as APIs

export interface Cliente {
  id?: string;
  fullName: string;
  email: string;
  cpf: string;
  rg?: string;
  issuingAgency?: string;
  birthDate?: string;
  address?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  municipality?: string;
  zipCode?: string;
  state?: string;
  cell1?: string;
  cell2?: string;
  driver?: boolean;
  cnh?: string;
  municipalityCnh?: string;
  cnhValidity?: string;
  ipi?: string;
  icms?: string;
  ipva?: string;
  roadTax?: string;
  defisCard?: string;
  packageIpiIcmsIpva?: string;
  packageIpiRodizioDefis?: string;
}

export interface ClienteResponse {
  id: string;
  nome: string;
  email: string;
  dataCadastro: string;
  telefone?: number;
  expiraEmBreve: boolean;
  statusProcesso: string;
}

export interface ClienteListResponse {
  total_records?: number;
  clientes: ClienteResponse[];
}

export interface DocumentResponse {
  success: boolean;
  message: string;
  filename?: string;
  path?: string;
  clientId?: number;
  error?: string;
  status?: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}
