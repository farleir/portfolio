
# Portfólio Pessoal & Blog - @farleir (Next.js Edition)

Este é o código-fonte completo para um portal pessoal, blog e área de projetos, construído com uma stack moderna e de alta performance, projetada para ser implantada na infraestrutura serverless da Cloudflare.

Esta versão segue estritamente as melhores práticas do Next.js App Router, priorizando segurança, performance e qualidade de código.

## Stack Tecnológica

- **Framework Full-Stack**: [Next.js 14+ (App Router)](https://nextjs.org/)
- **Linguagem**: [TypeScript (Strict)](https://www.typescriptlang.org/)
- **Plataforma de Deploy**: [Cloudflare Pages](https://pages.cloudflare.com/)
- **Banco de Dados**: [Cloudflare D1 (SQLite)](https://developers.cloudflare.com/d1/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Autenticação**: [Auth.js v5](https://authjs.dev/)
- **Estilização e UI**: [Tailwind CSS](https://tailwindcss.com/) + [Shadcn/ui](https://ui.shadcn.com/)
- **IA**: [Google Gemini API](https://ai.google.dev/) (executada de forma segura no servidor via Server Actions)

---

## Funcionalidades

- **Páginas Públicas**: Home, Projetos e Blog.
- **Assistente de IA**: Um chatbot na home page que usa a API Gemini para responder perguntas sobre o perfil de Farleir.
- **Painel de Administração (`/admin`)**: Uma área segura para gerenciar projetos e posts do blog (CRUD completo) usando Server Actions.

---

## 🚀 Setup e Desenvolvimento Local

Siga os passos abaixo para configurar o ambiente de desenvolvimento.

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 20.x ou superior)
- [Git](https://git-scm.com/)
- Uma conta na [Cloudflare](https://cloudflare.com/)

### 2. Clonar o Repositório

```bash
git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
cd SEU_REPOSITORIO
```

### 3. Instalar Dependências

```bash
npm install
```

### 4. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env.local` e preencha as variáveis:

```bash
cp .env.example .env.local
```

**Arquivo `.env.local`:**
```env
# Segredo para Auth.js (gere um com `openssl rand -base64 32`)
AUTH_SECRET="SEU_AUTH_SECRET"
AUTH_URL="http://localhost:8788"

# Provedor de Autenticação GitHub
AUTH_GITHUB_ID="SEU_GITHUB_CLIENT_ID"
AUTH_GITHUB_SECRET="SEU_GITHUB_CLIENT_SECRET"

# Chave de API para o Assistente de IA
GOOGLE_API_KEY="SUA_CHAVE_DA_API_GEMINI"

# Credenciais para Drizzle Kit (para interagir com o D1 remoto)
# Necessário para `db:push`, `db:generate`, etc.
CLOUDFLARE_ACCOUNT_ID="SEU_CLOUDFLARE_ACCOUNT_ID"
CLOUDFLARE_DATABASE_ID="SEU_CLOUDFLARE_DATABASE_ID"
CLOUDFLARE_D1_TOKEN="SEU_CLOUDFLARE_D1_API_TOKEN"
```
> **Nota:** Você pode encontrar `ACCOUNT_ID` e `DATABASE_ID` no painel do seu banco D1 na Cloudflare. O `D1_TOKEN` pode ser criado em `My Profile > API Tokens`.

### 5. Configurar o Banco de Dados Cloudflare D1

Este projeto utiliza o [Wrangler](https://developers.cloudflare.com/workers/wrangler/), a CLI da Cloudflare.

**a. Autenticação no Wrangler:**
```bash
npx wrangler login
```

**b. Criar o Banco de Dados D1 (se ainda não existir):**
```bash
# O nome 'personal' já está configurado no wrangler.toml
npx wrangler d1 create personal
```

**c. Aplicar o Schema SQL no Banco Remoto:**
Execute o schema inicial no seu banco de dados D1 na Cloudflare.
```bash
npx wrangler d1 execute personal --file=./db/schema.sql
```

**d. Iniciar o Servidor de Desenvolvimento:**
O comando `dev` utiliza `wrangler pages dev` para emular o ambiente da Cloudflare Pages.
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:8788`.

---

## 📦 Deploy na Cloudflare Pages

### 1. Publicar no GitHub

Faça o commit e push do seu código para um repositório no GitHub.

### 2. Conectar o Repositório ao Cloudflare Pages

1. No painel da Cloudflare, vá para **Workers & Pages**.
2. Clique em **Create application** > **Pages** > **Connect to Git**.
3. Selecione seu repositório.
4. Nas configurações de build, use as seguintes opções:
   - **Framework preset**: `Next.js`
   - **Variável de ambiente NODE_VERSION**: `20` ou superior.

### 3. Vincular o Banco de Dados D1

1. Vá para as configurações do seu projeto no Cloudflare Pages (`Settings` > `Functions`).
2. Em **D1 database bindings**, clique em **Add binding**.
3. **Variable name**: `DB`
4. **D1 database**: `personal` (selecione o banco que você criou).

### 4. Configurar Variáveis de Ambiente em Produção

1. Em `Settings` > `Environment variables`, adicione as mesmas variáveis do seu arquivo `.env.example` (`AUTH_SECRET`, `AUTH_GITHUB_ID`, etc.).
2. Adicione também a variável `AUTH_URL` com a URL final do seu site.
3. Clique em **Save and Deploy**.

Seu site será implantado automaticamente a cada `push` na branch principal.
