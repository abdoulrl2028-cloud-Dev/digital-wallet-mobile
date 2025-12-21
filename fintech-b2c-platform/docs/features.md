# Funcionalidades Principais

## 1. Onboarding

### 1.1 Registro
- [ ] Criar conta com email
- [ ] Validar CPF
- [ ] Definir senha forte
- [ ] Verificar email
- [ ] Foto de documento
- [ ] Selfie (reconhecimento facial)
- [ ] Comprovante de residência
- [ ] Aceitar termos e LGPD

### 1.2 KYC (Know Your Customer)
- [ ] Validação de documento via OCR
- [ ] Validação facial (liveness detection)
- [ ] Análise de risco (PEP, COAF)
- [ ] Score de crédito (terceiros)
- [ ] Aprovação automática ou manual

### 1.3 Ativação
- [ ] Confirmação de email
- [ ] Confirmação de telefone
- [ ] Setup de PIN de segurança
- [ ] Cadastro de chave PIX
- [ ] Primeiro depósito

## 2. Carteira (Wallet)

### 2.1 Saldo
- [ ] Visualizar saldo total
- [ ] Visualizar disponível vs bloqueado
- [ ] Histórico de saldo por data
- [ ] Extrato em PDF
- [ ] Notificações de movimentação

### 2.2 Operações
- [x] Transferência entre contas
- [x] Pagamento de contas
- [ ] Recarga de celular
- [ ] Compra de vale-refeição
- [ ] Empréstimo pessoal

## 3. Transferências

### 3.1 PIX
- [ ] Transferência por chave PIX
- [ ] Transferência por CPF
- [ ] Transferência por telefone
- [ ] Agendamento de PIX
- [ ] Devolução de PIX recebido

### 3.2 TED/DOC
- [ ] Consultar banco receptor
- [ ] Validar conta e agência
- [ ] Transferência TED (até 2h)
- [ ] Transferência DOC (próximo dia útil)
- [ ] Histórico de beneficiários

### 3.3 Segurança
- [ ] Confirmação de identidade do receptor
- [ ] Limite de transferência por tipo
- [ ] Rate limiting por IP
- [ ] Análise de fraude
- [ ] Comprovante assinado digitalmente

## 4. Pagamentos

### 4.1 Boletos
- [ ] Ler código de barras
- [ ] Digitar número de boleto
- [ ] Visualizar dados do boleto
- [ ] Pagar boleto
- [ ] Agendar pagamento
- [ ] Histórico de boletos pagos

### 4.2 Contas
- [ ] Cadastrar conta para pagamento
- [ ] Débito automático
- [ ] Consultar faturas
- [ ] Histórico de pagamentos

### 4.3 Recebimentos
- [ ] Gerar QR Code PIX
- [ ] Compartilhar link de pagamento
- [ ] Notificação ao receber
- [ ] Extrato de recebimentos

## 5. Cartão de Crédito

### 5.1 Gerenciamento
- [ ] Solicitar cartão físico
- [ ] Cartão virtual
- [ ] Ativar/Desativar cartão
- [ ] Definir limite
- [ ] Bloquear cartão

### 5.2 Fatura
- [ ] Visualizar fatura
- [ ] Parcelar fatura
- [ ] Pagar fatura (total ou parcial)
- [ ] Extrato detalhado
- [ ] Aviso de vencimento

### 5.3 Segurança
- [ ] 3D Secure
- [ ] Controle de compras online
- [ ] Código CVV virtual
- [ ] Limite por comerciante

## 6. Investimentos (Fase 2)

### 6.1 Poupança
- [ ] Abrir poupança
- [ ] Depósito automático
- [ ] Simulador de juros
- [ ] Histórico de rendimento
- [ ] Saque da poupança

### 6.2 Investimentos
- [ ] CDB
- [ ] Tesouro Direto
- [ ] Ações (corretora parceira)
- [ ] Fundos mútuos
- [ ] Criptomoedas (opcional)

## 7. Configurações

### 7.1 Perfil
- [ ] Editar dados pessoais
- [ ] Alterar senha
- [ ] Alterar email
- [ ] Alterar telefone
- [ ] Foto de perfil

### 7.2 Segurança
- [ ] Ativar 2FA
- [ ] Códigos de recuperação
- [ ] Reconhecimento biométrico
- [ ] Dispositivos confiáveis
- [ ] Histórico de login

### 7.3 Privacidade
- [ ] Consentimento de cookies
- [ ] Preferências de notificação
- [ ] Dados compartilhados
- [ ] Revogação de acesso a apps
- [ ] LGPD - Solicitar dados

### 7.4 Suporte
- [ ] Chat ao vivo
- [ ] Email de suporte
- [ ] FAQ e Help Center
- [ ] Reportar problema
- [ ] Feedback da aplicação

## 8. Notificações

### 8.1 Transações
- [ ] Alerta de saque
- [ ] Alerta de transferência recebida
- [ ] Alerta de pagamento
- [ ] Alerta de compra com débito
- [ ] Alerta de compra com crédito

### 8.2 Conta
- [ ] Alerta de login
- [ ] Alerta de senha alterada
- [ ] Alerta de limite alterado
- [ ] Alerta de cartão bloqueado
- [ ] Aviso de vencimento de fatura

### 8.3 Canais
- [ ] Push notification (app)
- [ ] Email
- [ ] SMS
- [ ] WhatsApp (opcional)
- [ ] In-app message

## 9. Admin Web

### 9.1 Dashboard
- [ ] Métricas em tempo real
- [ ] Transações diárias
- [ ] Novos usuários
- [ ] Receita
- [ ] Taxa de ativação

### 9.2 Usuários
- [ ] Listar usuários
- [ ] Buscar usuário
- [ ] Ver detalhes
- [ ] Bloquear/Desbloquear
- [ ] Resetar senha
- [ ] Ajustar limite

### 9.3 Operações
- [ ] Listar transações
- [ ] Filtrar por tipo/status
- [ ] Reversão de transação
- [ ] Análise de fraude
- [ ] Escalação manual

### 9.4 Relatórios
- [ ] Receita por dia/mês
- [ ] Taxa de churn
- [ ] Valor por transação
- [ ] Métodos de pagamento
- [ ] Exportar para Excel

### 9.5 Configurações
- [ ] Limites de transação
- [ ] Taxas de operações
- [ ] Mensagens de sistema
- [ ] Agendamentos
- [ ] Integrações externas

## 10. API Pública

### 10.1 Autenticação
- [ ] OAuth 2.0
- [ ] API Key
- [ ] JWT tokens

### 10.2 Endpoints
- [ ] GET /balance
- [ ] POST /transfer
- [ ] GET /transactions
- [ ] POST /payment
- [ ] GET /user/profile

### 10.3 Webhook
- [ ] Transaction completed
- [ ] Payment received
- [ ] User updated
- [ ] Fraud alert
- [ ] Rate limit exceeded
