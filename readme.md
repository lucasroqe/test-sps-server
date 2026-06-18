# test-sps-server

API REST para cadastro de usuários com autenticação JWT.

## Stack

- Node.js + Express
- SQLite (better-sqlite3)
- JWT para autenticação

## Como rodar

1. Clone o repositório e entre na pasta:
```bash
git clone <url>
cd test-sps-server
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto com o conteúdo:
```
JWT_SECRET= chave_super_secreta

PORT=3000
```

4. Rode o servidor:
```bash
npm run dev
```

O servidor sobe em `http://localhost:3000`. O banco é criado automaticamente na primeira execução, já com um usuário admin pré-cadastrado:
```
email: admin@spsgroup.com.br

password: 1234
```

## Rotas

| Método | Rota | Protegida | Descrição |
|--------|------|-----------|-----------|
| POST | /login | Não | Autentica e retorna o token JWT |
| POST | /users | Sim | Cria um novo usuário |
| GET | /users | Sim | Lista todos os usuários |
| PUT | /users/:id | Sim | Atualiza um usuário |
| DELETE | /users/:id | Sim | Remove um usuário |

Rotas protegidas exigem o header:
```
Authorization | Bearer <token>
```