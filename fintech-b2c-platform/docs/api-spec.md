# Especificação de API

## 1. Autenticação

### 1.1 Register
```
POST /api/v1/auth/register

Request:
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "João",
  "lastName": "Silva",
  "cpf": "123.456.789-00",
  "phone": "(11) 98765-4321"
}

Response (201):
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "João",
    "lastName": "Silva",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}

Errors:
400: Email inválido ou já cadastrado
422: Dados insuficientes ou inválidos
500: Erro interno do servidor
```

### 1.2 Login
```
POST /api/v1/auth/login

Request:
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response (200):
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "refresh_token_here",
  "expiresIn": 604800,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "João"
  }
}

Errors:
400: Email ou senha obrigatória
401: Credenciais inválidas
429: Muitas tentativas (rate limiting)
```

### 1.3 Refresh Token
```
POST /api/v1/auth/refresh

Headers:
Authorization: Bearer {refreshToken}

Response (200):
{
  "accessToken": "new_access_token",
  "expiresIn": 604800
}

Errors:
401: Token inválido ou expirado
```

## 2. Wallet (Carteira)

### 2.1 Get Balance
```
GET /api/v1/wallet/balance

Headers:
Authorization: Bearer {accessToken}

Response (200):
{
  "total": 2500.50,
  "disponivel": 2000.00,
  "bloqueado": 500.50,
  "currency": "BRL",
  "lastUpdated": "2024-01-15T10:30:00Z"
}

Errors:
401: Não autenticado
404: Carteira não encontrada
```

### 2.2 Get Statement
```
GET /api/v1/wallet/statement?startDate=2024-01-01&endDate=2024-01-31&limit=20&offset=0

Headers:
Authorization: Bearer {accessToken}

Response (200):
{
  "transactions": [
    {
      "id": "txn_uuid",
      "type": "transfer",
      "amount": 100.00,
      "recipientName": "João Silva",
      "status": "completed",
      "description": "Transferência",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 50,
  "limit": 20,
  "offset": 0,
  "hasMore": true
}

Errors:
400: Parâmetros inválidos
401: Não autenticado
```

## 3. Transactions

### 3.1 Create Transfer
```
POST /api/v1/transactions/transfer

Headers:
Authorization: Bearer {accessToken}
Content-Type: application/json

Request:
{
  "recipientCpf": "987.654.321-00",
  "amount": 100.00,
  "description": "Pagamento de almoço"
}

Response (201):
{
  "id": "txn_uuid",
  "status": "pending",
  "amount": 100.00,
  "recipientCpf": "987.654.321-00",
  "createdAt": "2024-01-15T10:30:00Z",
  "estimatedCompletionTime": "2024-01-15T11:30:00Z"
}

Errors:
400: Dados inválidos (CPF, valor)
402: Saldo insuficiente
403: Limite de transação excedido
422: Formato incorreto
429: Muitas transações em pouco tempo
```

### 3.2 Get Transaction Details
```
GET /api/v1/transactions/{id}

Headers:
Authorization: Bearer {accessToken}

Response (200):
{
  "id": "txn_uuid",
  "type": "transfer",
  "amount": 100.00,
  "recipientName": "João Silva",
  "recipientCpf": "987.654.321-00",
  "status": "completed",
  "description": "Transferência",
  "createdAt": "2024-01-15T10:30:00Z",
  "completedAt": "2024-01-15T11:30:00Z",
  "receipt": {
    "id": "rcpt_uuid",
    "url": "s3://receipts/txn_uuid.pdf"
  }
}

Errors:
401: Não autenticado
404: Transação não encontrada
```

## 4. User Profile

### 4.1 Get Profile
```
GET /api/v1/users/profile

Headers:
Authorization: Bearer {accessToken}

Response (200):
{
  "id": "user_uuid",
  "email": "user@example.com",
  "firstName": "João",
  "lastName": "Silva",
  "cpf": "123.456.789-00",
  "phone": "(11) 98765-4321",
  "birthDate": "1990-01-15",
  "address": {
    "street": "Rua Exemplo",
    "number": "123",
    "complement": "Apt 456",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01234-567"
  },
  "status": "active",
  "createdAt": "2024-01-01T00:00:00Z",
  "lastLogin": "2024-01-15T10:30:00Z"
}

Errors:
401: Não autenticado
404: Usuário não encontrado
```

### 4.2 Update Profile
```
PUT /api/v1/users/profile

Headers:
Authorization: Bearer {accessToken}
Content-Type: application/json

Request:
{
  "firstName": "João",
  "lastName": "Silva da Santos",
  "phone": "(11) 99999-8888",
  "address": {
    "street": "Rua Nova",
    "number": "999",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01999-999"
  }
}

Response (200):
{
  "message": "Perfil atualizado com sucesso",
  "user": { /* dados atualizados */ }
}

Errors:
400: Dados inválidos
401: Não autenticado
409: Conflito (ex: email já registrado)
```

## 5. Error Response Format

Todos os erros seguem este formato:

```json
{
  "error": "Descrição do erro",
  "code": "ERROR_CODE",
  "statusCode": 400,
  "timestamp": "2024-01-15T10:30:00Z",
  "path": "/api/v1/wallet/balance",
  "details": {
    "field": "email",
    "message": "Email inválido"
  }
}
```

## 6. Rate Limiting

```
Headers de Response:
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1705318200

Limites por Endpoint:
POST /auth/login: 5 por minuto
POST /transactions: 10 por hora
GET /wallet: 100 por minuto
Default: 100 por minuto
```

## 7. Versioning

API usa versioning por URL:
- `/api/v1/` - Versão 1 (atual)
- `/api/v2/` - Versão 2 (future)

Backward compatibility mantida por 6 meses após deprecação.

## 8. Documentation Tools

- Swagger/OpenAPI: `/api/docs`
- Postman Collection: `/api/postman-collection.json`
- GraphQL Schema: `/api/graphql-schema.graphql`
