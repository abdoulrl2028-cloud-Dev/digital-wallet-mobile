# Modelagem de Ameaças (STRIDE)

## 1. Spoofing (Falsificação de Identidade)

### 1.1 Ameaça
- Atacante falsifica identidade de usuário
- Cria conta com dados falsos
- Utiliza documento roubado

### 1.2 Mitigação
- ✅ Validação de CPF via verificação de dígitos
- ✅ KYC (Know Your Customer) com documento + biometria
- ✅ Análise de comportamento para detecção de fraude
- ✅ 2FA para confirmação de identidade

### 1.3 Detecção
```
Se tentativas_falhas > 5 em 1 hora:
  Bloquear conta
  Solicitar verificação por email
  Notificar usuário
```

## 2. Tampering (Manipulação de Dados)

### 2.1 Ameaça
- Modificação de transações em banco de dados
- Alteração de saldo
- Mudança de destinatário

### 2.2 Mitigação
- ✅ Criptografia em repouso (AES-256)
- ✅ Hash de integridade (SHA-256)
- ✅ Assinatura digital de transações
- ✅ Verificação de checksum em leitura

### 2.3 Implementação
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY,
  amount DECIMAL,
  recipient_id UUID,
  checksum VARCHAR(64), -- hash SHA256
  signature VARCHAR(512), -- assinatura RSA
  created_at TIMESTAMP,
  CONSTRAINT validate_integrity CHECK (
    checksum = sha256(CONCAT(id, amount, recipient_id, created_at))
  )
);
```

## 3. Repudiation (Repúdio)

### 3.1 Ameaça
- Usuário nega ter realizado transação
- Seller nega ter recebido pagamento
- Disputas sobre transações

### 3.2 Mitigação
- ✅ Assinatura digital (RSA 2048-bit)
- ✅ Logs imutáveis em blockchain
- ✅ Timestamps certificados
- ✅ Captura de confirmação do usuário

### 3.3 Prova de Não-Repúdio
```
Transação assinada com chave privada do usuário:
  Sign(transaction_id + amount + timestamp, private_key)
  
Verificado com chave pública:
  Verify(signature, transaction_data, public_key) = TRUE
  
Testemunha: Blockchain com hash da transação
```

## 4. Information Disclosure (Divulgação de Informação)

### 4.1 Ameaça
- Vazamento de dados pessoais
- Exposição de transações
- Leak de CPF/documento
- Acesso a dados de terceiros

### 4.2 Mitigação
- ✅ Criptografia em trânsito (TLS 1.3)
- ✅ Criptografia em repouso (AES-256)
- ✅ Data masking em logs (XXX.XXX.XXX-XX para CPF)
- ✅ RBAC com princípio do menor privilégio

### 4.3 Exemplo de Data Masking
```javascript
// Antes
console.log(`Transação de ${user.cpf} no valor de R$${amount}`);
// 123.456.789-00

// Depois
console.log(`Transação de ${maskCPF(user.cpf)} no valor de R$${amount}`);
// XXX.456.XXX-XX
```

## 5. Denial of Service (Negação de Serviço)

### 5.1 Ameaça
- DDoS na API
- Flood de requisições
- Ataque a banco de dados
- Esgotamento de recurso

### 5.2 Mitigação
- ✅ Rate limiting (100 req/min por IP)
- ✅ WAF (Web Application Firewall)
- ✅ CDN com proteção DDoS
- ✅ Auto-scaling de servidores
- ✅ Circuit breaker para serviços

### 5.3 Configuração
```nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=100r/m;
limit_req zone=api burst=20 nodelay;

# Timeout de conexão
proxy_connect_timeout 5s;
proxy_send_timeout 10s;
proxy_read_timeout 30s;
```

## 6. Elevation of Privilege (Elevação de Privilégio)

### 6.1 Ameaça
- Usuário comum acessa dados de admin
- Bypass de autenticação
- SQL injection para mudança de role
- Exploração de vulnerabilidade

### 6.2 Mitigação
- ✅ RBAC com verificação em cada endpoint
- ✅ Prepared statements (PREVENT SQL injection)
- ✅ Input validation rigorosa
- ✅ Auditoria de mudanças de role

### 6.3 Implementação
```javascript
// Middleware de autorização
async function checkPermission(req, res, next) {
  const requiredRole = req.route.roles;
  const userRole = req.user.role;
  
  if (!requiredRole.includes(userRole)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
}

// Uso
router.delete('/api/v1/users/:id', 
  checkPermission(['admin']), 
  deleteUser
);
```

## 7. Matriz de Risco

| Ameaça | Probabilidade | Impacto | Risco | Status |
|--------|---------------|---------|-------|--------|
| Spoofing | Médio | Alto | Alto | ✅ Mitigado |
| Tampering | Baixo | Crítico | Alto | ✅ Mitigado |
| Repúdio | Médio | Alto | Alto | ✅ Mitigado |
| Disclosure | Médio | Crítico | Crítico | ✅ Mitigado |
| DoS | Alto | Médio | Alto | ✅ Mitigado |
| Escalação | Baixo | Crítico | Alto | ✅ Mitigado |

## 8. Testes de Segurança

### 8.1 Pentesting
- Simulação de ataque por profissional especializado
- Teste em staging antes de produção
- Frequência: Trimestral
- Escopo: API, Mobile, Web

### 8.2 Fuzzing
- Teste com dados aleatórios/malformados
- Cobertura: Todos os endpoints
- Frequência: Contínua (pipeline CI/CD)

### 8.3 SAST/DAST
- Static Analysis: Varredura de código
- Dynamic Analysis: Teste em runtime
- Ferramentas: SonarQube, OWASP ZAP

## 9. Plano de Resposta

### 9.1 Descoberta de Vulnerabilidade
1. Reporte responsável ao time de segurança
2. Análise dentro de 24 horas
3. Criação de patch
4. Teste e deployment em staging
5. Deploy em produção após validação

### 9.2 Incidente de Segurança
1. Isolamento imediato do sistema afetado
2. Análise forense dos logs
3. Notificação a stakeholders
4. Comunicação com usuários afetados
5. Patch e deploy de fix
6. Post-mortem e lições aprendidas
