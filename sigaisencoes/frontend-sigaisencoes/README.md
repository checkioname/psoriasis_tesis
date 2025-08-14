# 🚀 SigaIsenções Frontend

Interface React/Next.js para gerenciamento de clientes e geração de documentos.

## ✨ Funcionalidades

- 📋 **Listagem de Clientes**: Visualize todos os clientes cadastrados
- ➕ **Cadastro de Clientes**: Formulário completo e dedicado para novos clientes
- 👤 **Detalhes do Cliente**: Página detalhada com informações completas
- 📄 **Geração de Documentos**: Gere documentos personalizados com um clique
- 🔐 **Sistema de Login**: Autenticação de usuários com demo
- 🔍 **Status dos Serviços**: Monitore a saúde das APIs
- 🚫 **Página 404**: Tratamento elegante de páginas não encontradas
- 📱 **Design Responsivo**: Interface adaptada para mobile e desktop
- 🧭 **Navegação Intuitiva**: Links e breadcrumbs entre páginas

## 🛠️ Tecnologias

- **React 18** com hooks modernos
- **Next.js 14** com App Router
- **TypeScript** para type safety
- **Tailwind CSS** para estilização
- **Axios** para requisições HTTP
- **React Hot Toast** para notificações
- **Lucide React** para ícones

## 🚀 Como Executar

### Pré-requisitos

1. **Node.js 18+** instalado
2. **APIs Backend** rodando:
   - API de Clientes: `http://localhost:8080`
   - API de Documentos: `http://localhost:8082`

### Instalação

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Acessar aplicação
# http://localhost:3000
```

### Scripts Disponíveis

```bash
npm run dev      # Desenvolvimento
npm run build    # Build para produção
npm run start    # Servidor de produção
npm run lint     # Linter
```

## 📋 Estrutura do Projeto

```
frontend-sigaisencoes/
├── app/                    # App Router (Next.js 13+)
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx          # Página inicial (clientes)
│   └── status/           # Página de status
├── components/            # Componentes React
│   ├── ui/               # Componentes base
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Loading.tsx
│   └── clients/          # Componentes específicos
│       ├── ClientCard.tsx
│       ├── ClientForm.tsx
│       └── ClientList.tsx
├── lib/                  # Utilitários
│   ├── api.ts           # Serviços de API
│   └── types.ts         # Tipos TypeScript
└── public/              # Arquivos estáticos
```

## 🔗 Integração com APIs

### API de Clientes (Porto 8080)

```typescript
// Listar clientes
const clients = await clientsService.getClientes(0, 10);

// Buscar por ID
const client = await clientsService.getClienteById('123');

// Criar cliente
await clientsService.createCliente(clientData);
```

### API de Documentos (Porto 8082)

```typescript
// Gerar documento
const result = await documentsService.generateDocument('123');
```

## 🎨 Interface

### Páginas Principais

#### 🏠 **Página Principal (`/`)**
- Lista todos os clientes em cards responsivos
- Botão "Novo Cliente" para página dedicada
- Botão "Ver Detalhes" em cada card
- Geração de documentos diretamente do card
- Atualização em tempo real

#### ➕ **Página de Cadastro (`/cadastro`)**
- Formulário completo e organizado por seções
- Validação em tempo real
- Integração com API de CEP (ViaCEP)
- Dados pessoais, contato, endereço, CNH e serviços

#### 👤 **Página de Detalhes (`/cliente/[id]`)**
- Informações completas do cliente
- Cards de status e processo
- Ações rápidas (gerar documento, editar)
- Histórico de documentos (futuro)

#### 🔐 **Página de Login (`/login`)**
- Autenticação segura
- Credenciais de demonstração
- Toggle de visibilidade de senha
- "Lembrar de mim" e "Esqueci senha"

#### 📊 **Página de Status (`/status`)**
- Monitora saúde das APIs
- Status visual (verde/vermelho)
- Instruções para iniciar serviços
- Atualização manual

#### 🚫 **Página 404 (`/not-found`)**
- Design elegante para páginas não encontradas
- Links úteis de navegação
- Ações de recuperação

### Formulário de Cliente
- Campos validados
- Interface intuitiva
- Feedback visual de erros
- Submit assíncrono

### Página de Status
- Monitora saúde das APIs
- Status visual (verde/vermelho)
- Instruções para iniciar serviços
- Atualização manual

## 🔧 Configuração

### Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp env.example .env.local

# Editar URLs se necessário
NEXT_PUBLIC_CLIENTS_API_URL=http://localhost:8081
NEXT_PUBLIC_DOCS_API_URL=http://localhost:8082
```

### CORS

As APIs já estão configuradas com CORS para aceitar requisições do frontend:

```go
// API de Clientes (porta 8081) e API de Documentos (porta 8082)
cors.Handler(cors.Options{
    AllowedOrigins:   []string{"http://localhost:3000", "http://127.0.0.1:3000"},
    AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
    AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token", "X-Requested-With"},
    AllowCredentials: true,
    MaxAge:           300,
})
```

## 🧪 Testando

### Teste Manual

1. **Iniciar Backend APIs**:
   ```bash
   # Terminal 1: API Clientes
   cd api--sigacore-service && go run cmd/main.go

   # Terminal 2: API Documentos  
   cd api--sigadocs-service && go run main.go
   ```

2. **Iniciar Frontend**:
   ```bash
   npm run dev
   ```

3. **Testar Funcionalidades**:
   - Acesse `http://localhost:3000`
   - Verifique status em `/status`
   - Crie um cliente
   - Gere um documento

### Verificação de Conectividade

A página `/status` mostra o status dos serviços em tempo real.

## 📦 Build e Deploy

```bash
# Build para produção
npm run build

# Iniciar servidor de produção
npm start
```

## 🎯 Próximas Funcionalidades

- [ ] Autenticação de usuários
- [ ] Download direto de documentos
- [ ] Busca e filtros avançados
- [ ] Histórico de documentos gerados
- [ ] Edição de clientes
- [ ] Paginação para muitos clientes
- [ ] Bulk operations
- [ ] Dashboard com métricas

## 🐛 Solução de Problemas

### APIs não respondem
- Verifique se os serviços estão rodando nas portas corretas
- Confirme as URLs nas variáveis de ambiente
- Verifique logs dos serviços backend

### Erros de CORS
- Configure CORS nas APIs backend
- Verifique origins permitidas

### Componentes não carregam
- Confirme que todas as dependências foram instaladas
- Verifique se não há erros de TypeScript

## 📄 Licença

Este projeto é parte do sistema SigaIsenções.
