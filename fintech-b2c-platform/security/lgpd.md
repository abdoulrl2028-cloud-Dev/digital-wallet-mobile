# Conformidade LGPD (Lei Geral de Proteção de Dados)

## 1. Princípios Fundamentais

### 1.1 Coleta de Dados
- ✅ Consentimento prévio e informado
- ✅ Finalidade clara e específica
- ✅ Mínimo necessário (Data Minimization)
- ✅ Informação ao usuário na coleta

### 1.2 Direitos do Titular
1. **Direito de Acesso**
   - Endpoint: `GET /api/v1/gdpr/export`
   - Formato: JSON
   - Tempo: até 30 dias
   - Gratuito

2. **Direito de Retificação**
   - Corrigir dados incorretos
   - Endpoint: `PUT /api/v1/profile`
   - Auditoria de mudanças

3. **Direito ao Esquecimento**
   - Endpoint: `DELETE /api/v1/gdpr/delete`
   - Remoção completa de dados pessoais
   - Retenção: Apenas para conformidade legal
   - Prazo: 30-60 dias

4. **Direito de Portabilidade**
   - Transferir dados para outro serviço
   - Endpoint: `GET /api/v1/gdpr/export?format=csv`
   - Formato: CSV, JSON
   - Sem custo

5. **Oposição ao Processamento**
   - Bloquear análise de comportamento
   - Recusa de marketing
   - Enforcement imediato

## 2. Armazenamento de Dados

### 2.1 Categorização
- **Essencial**: Necessário para operação (5 anos)
- **Analítico**: Para melhoria do serviço (2 anos)
- **Marketing**: Para comunicações (1 ano)
- **Backup**: Apenas cópia de segurança (1 ano)

### 2.2 Política de Retenção
```sql
-- Deletar automaticamente após período
DELETE FROM users WHERE deleted_at < NOW() - INTERVAL '30 days';
DELETE FROM transactions WHERE created_at < NOW() - INTERVAL '5 years';
DELETE FROM marketing_consent WHERE created_at < NOW() - INTERVAL '1 year';
```

## 3. Criptografia e Segurança

### 3.1 Dados Pessoais Sensíveis
- CPF: AES-256 (chave armazenada em HSM)
- Telefone: AES-256
- Endereço: AES-256
- Informações bancárias: AES-256

### 3.2 Transmissão
- HTTPS TLS 1.2+ obrigatório
- Certificado válido (renovado anualmente)
- HSTS (HTTP Strict-Transport-Security)

## 4. Processamento de Dados

### 4.1 Bases Legais
1. **Consentimento**: Para marketing e analytics
2. **Contrato**: Para fornecimento de serviço
3. **Obrigação Legal**: Conformidade regulatória
4. **Interesse Legítimo**: Fraude prevention
5. **Proteção de Vida**: Identificação de riscos

### 4.2 Processamento por Terceiros
- ✅ Contrato de Processamento de Dados (DPA)
- ✅ Cláusulas de confidencialidade
- ✅ Direitos de auditoria
- ✅ Fluxo internacional documentado (se aplicável)

## 5. Privacy by Design

### 5.1 Implementação
- Coleta de dados desabilitada por padrão
- Transparência nas configurações
- Análise de impacto de privacidade (AIPD)
- Pseudonimização de dados quando possível

### 5.2 Pseudonimização
```
Dado original: CPF 123.456.789-00
Pseudonimizado: hash_sha256('123.456.789-00' + salt)
Recuperável: Apenas com chave privada
```

## 6. Notificação de Incidente

### 6.1 Protocolo
- **Detecção**: Alertas automáticos do SIEM
- **Análise**: Investigação em < 24 horas
- **Notificação**: 
  - ANPD (se vazamento)
  - Usuários afetados (< 72 horas)
  - Imprensa (se público)

### 6.2 Comunicação
```
Assunto: Notificação de Incidente de Segurança

Prezado usuário,

Identificamos um incidente de segurança que pode ter afetado seus dados.

Dados afetados: [listar]
Data do incidente: [data]
Descoberto em: [data]
Ações tomadas: [descrever]

Próximos passos:
1. Altere sua senha imediatamente
2. Monitore sua conta
3. Contate suporte se tiver dúvidas
```

## 7. Consentimento

### 7.1 Gerenciamento
```javascript
// Consentimento é explícito e documentado
const consentimento = {
  essencial: true,        // Funcional, obrigatório
  marketing: false,       // Pode ser alterado
  analytics: true,        // Pode ser alterado
  terceiros: false,       // Pode ser alterado
  data: '2024-01-15',
  ip: '192.168.1.1',
  user_agent: '...',
  versao_termos: '1.0'
};
```

### 7.2 Solicitação de Consentimento
- Ao criar conta
- A cada trimestre (reconfirmação)
- Após mudança nos termos
- Ao acessar novo recurso que usa dados

## 8. Avaliação de Impacto (AIPD)

### 8.1 Quando Realizar
- Novo processamento em larga escala
- Processamento de dados sensíveis
- Monitoramento sistemático
- Automatização de decisões

### 8.2 Elementos
- Descrição do processamento
- Necessidade e proporcionalidade
- Riscos aos titulares
- Medidas de mitigação
- Respaldo de especialista

## 9. Encarregado de Proteção de Dados (DPO)

### 9.1 Contato
- Email: dpo@carteira-digital.com
- Telefone: +55 11 3000-0000
- Endereço: Rua Exemplo, 123 - São Paulo, SP

### 9.2 Responsabilidades
- Supervisão de conformidade
- Ponto de contato com ANPD
- Responder solicitações de titulares
- Treinamento de equipe
- Auditorias internas

## 10. Documentação

### 10.1 Registros a Manter
- Consentimentos coletados
- Fluxos de dados
- Avaliações de impacto (AIPD)
- Incidentes e breaches
- Solicitações de direitos

### 10.2 Retenção
- 5 anos de logs de consentimento
- Permanente para incidentes
- 7 anos para conformidade fiscal

## 11. Referências

- [LGPD - Lei 13.709/2018](http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)
- [ANPD - Autoridade Nacional de Proteção de Dados](https://www.gov.br/cidadania/pt-br/acesso-a-informacao/institucional/anpd)
- [GDPR (referência)](https://gdpr-info.eu/)
