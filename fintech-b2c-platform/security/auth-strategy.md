# Estratégia de Autenticação e Autorização

## 1. Autenticação

### 1.1 Fluxo de Login
- Usuário envia email e senha
- Backend valida credenciais no banco de dados
- Senha é verificada com hash bcrypt (10 rounds)
- JWT é gerado com duração de 7 dias
- Refresh token é armazenado de forma segura

### 1.2 Autenticação Multi-Factor (MFA)
- Implementação via TOTP (Time-based One-Time Password)
- Código 6 dígitos enviado por email ou SMS
- Válido por 30 segundos
- Máximo 5 tentativas antes de bloqueio temporário

### 1.3 OAuth 2.0
- Suporte para autenticação via Google e Apple
- Redirecionamento seguro com PKCE
- Armazenamento seguro de tokens

## 2. Autorização

### 2.1 Controle de Acesso Baseado em Papel (RBAC)
```
┌─────────────┐
│    User     │
└──────┬──────┘
       │
       ├─── Admin (acesso total)
       ├─── Manager (gerenciamento de usuários)
       └─── User (operações básicas)
```

### 2.2 Permissões por Endpoint
- `GET /api/v1/wallet/balance` - Requer autenticação
- `POST /api/v1/transactions` - Requer autenticação + limite de transação
- `GET /api/v1/admin/users` - Requer role=admin

## 3. Token JWT

### 3.1 Payload
```json
{
  "userId": "uuid-do-usuario",
  "email": "user@example.com",
  "role": "user",
  "iat": 1234567890,
  "exp": 1234654290
}
```

### 3.2 Segurança
- Assinado com HMAC SHA-256
- Secret de 32+ caracteres
- Regeneração a cada 7 dias
- Blacklist de tokens revogados em Redis

## 4. Segurança de Senha

### 4.1 Requisitos
- Mínimo 12 caracteres
- Letra maiúscula (A-Z)
- Letra minúscula (a-z)
- Número (0-9)
- Caractere especial (!@#$%^&*)
- Sem padrões comuns (password123, qwerty, etc)

### 4.2 Armazenamento
- Hash bcrypt com 10+ rounds
- Jamais armazenar em texto plano
- Migração automática de algoritmo se necessário

## 5. Proteção contra Ataques

### 5.1 Rate Limiting
- Login: 5 tentativas por minuto
- API: 100 requisições por minuto por IP
- Transferência: 10 por hora

### 5.2 CSRF (Cross-Site Request Forgery)
- Token CSRF em cada formulário
- Validação de Origin header
- SameSite cookie attribute

### 5.3 SQL Injection
- Parameterized queries (Prisma ORM)
- Input validation em todos os endpoints
- Escape de caracteres especiais

### 5.4 XSS (Cross-Site Scripting)
- Content Security Policy headers
- Input sanitization
- Output encoding
- No eval() ou innerHTML com dados de usuário

## 6. Sessão e Cookies

### 6.1 Configuração
- HttpOnly flag (sem acesso via JavaScript)
- Secure flag (apenas HTTPS)
- SameSite=Strict
- Expiração: 7 dias
- Path=/api

### 6.2 Limpeza
- Logout invalida a sessão
- Timeout automático após inatividade
- Revogação imediata de token em suspeita

## 7. Auditoria

### 7.1 Logging
- Todas as autenticações (login/logout)
- Tentativas falhadas de acesso
- Mudanças de role/permissão
- Acesso a dados sensíveis
- IP, User-Agent, Timestamp

### 7.2 Retenção
- Logs mantidos por 90 dias
- Armazenamento seguro em S3 com criptografia
- Acesso restrito a auditores

## 8. Conformidade

### 8.1 LGPD
- Direito ao esquecimento (dados deletáveis)
- Consentimento explícito para cookies
- Privacy Policy acessível
- Dados pessoais não compartilhados

### 8.2 PCI-DSS
- Dados de cartão criptografados em trânsito e em repouso
- Nunca armazenar CVV
- Segmentação de rede
- Autenticação forte

## 9. Resposta a Incidentes

### 9.1 Plano de Ação
1. Detecção automática de atividades suspeitas
2. Alertas em tempo real para time de segurança
3. Bloqueio automático de conta
4. Notificação ao usuário
5. Investigação forense

### 9.2 Escalação
- Nível 1: Monitoramento automático
- Nível 2: Revisão por segurança
- Nível 3: Direção e compliance
- Nível 4: Notificação regulatória
