# DevBills — Interface

Front-end do DevBills, uma aplicação de controle financeiro pessoal (receitas e despesas). Feito com React, TypeScript, Vite e Tailwind CSS, com login pelo Google via Firebase Auth.

## Funcionalidades

- **Login com Google** (Firebase Auth), com a sessão mantida ao recarregar a página
- **Dashboard** com saldo, receitas e despesas do mês, gráfico de despesas por categoria e histórico dos últimos 6 meses
- **Transações**: listagem por mês, busca por descrição, filtros por tipo e categoria e totais do período filtrado
- **Criar, editar e excluir** transações, com validação no formulário
- Layout responsivo com menu para celular, página 404 e notificações (toasts)

## Pré-requisitos

- Node.js 20+
- A [API do DevBills](../devbills-api) rodando

## Configuração

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Copie `.env.example` para `.env` e preencha:

   ```env
   VITE_API_URL=http://localhost:3001/api
   VITE_FIREBASE_API_KEY=
   VITE_FIREBASE_AUTH_DOMAIN=
   VITE_FIREBASE_PROJECT_ID=
   VITE_FIREBASE_STORAGE_BUCKET=
   VITE_FIREBASE_MESSAGING_SENDER_ID=
   VITE_FIREBASE_APP_ID=
   ```

3. Inicie em modo desenvolvimento:

   ```bash
   npm run dev
   ```

## Scripts

| Comando           | Descrição                                   |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Servidor de desenvolvimento (Vite)          |
| `npm run build`   | Checagem de tipos + build de produção       |
| `npm run preview` | Serve o build de produção localmente        |
| `npm run lint`    | ESLint                                      |

## Rotas

| Rota                     | Acesso  | Descrição             |
| ------------------------ | ------- | --------------------- |
| `/`                      | Pública | Página inicial        |
| `/login`                 | Pública | Login com Google      |
| `/dashboard`             | Privada | Resumo e gráficos     |
| `/transacoes`            | Privada | Lista de transações   |
| `/transacoes/nova`       | Privada | Nova transação        |
| `/transacoes/:id/editar` | Privada | Editar transação      |

## Estrutura

```
src/
├── components/   # Button, Card, Input, Select, Header, Footer, Spinner...
├── config/       # inicialização do Firebase
├── context/      # AuthContext (estado de autenticação)
├── layout/       # AppLayout (Header + conteúdo + Footer)
├── pages/        # Home, Login, Dashboard, Transações, Formulário, 404
├── routes/       # rotas públicas e privadas
├── services/     # cliente axios (com token do Firebase) e chamadas à API
├── types/        # tipos TypeScript
└── utils/        # formatadores e CSS global (tema Tailwind)
```
