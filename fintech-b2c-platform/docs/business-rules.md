# Regras de Negócio

## 1. Transações

### 1.1 Transferência
- **Limite mínimo**: R$ 0,01
- **Limite máximo**: R$ 50.000,00 por transação
- **Limite diário**: R$ 100.000,00 por usuário
- **Horário**: 24/7 (sem limite de horário)
- **Taxa**: R$ 0,00 para contas na mesma instituição
- **Taxa interbancária**: R$ 12,00 por transferência
- **Tempo de processamento**: Até 2 horas em dias úteis

### 1.2 Pagamento
- **Limite de cartão de crédito**: Até 30 dias de faturamento
- **Limite de débito**: Saldo disponível
- **Juros**: 2.99% ao mês (cartão de crédito)
- **Multa de atraso**: 2% + 0.03% ao dia
- **Taxa de cancelamento**: Gratuita até 48 horas antes

### 1.3 Validação de Transação
```
TRANSAÇÃO VÁLIDA SE:
  ✓ Saldo disponível >= valor + taxas
  ✓ Destinatário válido (CPF ou CNPJ)
  ✓ Valor dentro dos limites
  ✓ Horário permitido
  ✓ Sem fraude detectada
  ✓ Conta não bloqueada
```

## 2. Limites de Crédito

### 2.1 Cálculo
```javascript
limiteCredito = min(
  50000,                           // Limite máximo
  salarioMensal * 3,              // 3x salário
  saldoPoupanca * 0.5,            // 50% da poupança
  200000 * (creditScore / 1000)   // Baseado em score
)
```

### 2.2 Atualização
- **Automática**: Mensalmente no dia 1
- **Manual**: Após análise de crédito
- **Revisão**: Anual ou após eventos de risco

## 3. Taxas e Tarifas

### 3.1 Operacionais
| Operação | Tarifa | Desconto |
|----------|--------|----------|
| Transferência PIX | R$ 0,00 | - |
| Transferência TED | R$ 12,00 | - |
| Transferência DOC | R$ 6,00 | - |
| Saque | R$ 7,00 | -50% em 3 saques/mês |
| Extrato | R$ 0,00 | - |
| 2ª via de cartão | R$ 35,00 | - |

### 3.2 Anuidades
- **Conta corrente**: Gratuita
- **Cartão de crédito**: Gratuito (1º ano)
- **Cartão de crédito**: R$ 100,00 (próximos anos)
- **Premium**: R$ 29,90/mês (sem taxas)

## 4. Segurança e Validação

### 4.1 KYC (Know Your Customer)
- CPF válido
- Documento de identidade
- Comprovante de residência
- Cadastro de dados bancários

### 4.2 Limites por Score
| Score | Limite | 2FA | Análise |
|-------|--------|-----|---------|
| < 300 | R$ 1.000 | Sim | Manual |
| 300-600 | R$ 10.000 | Opcional | Auto |
| 600-800 | R$ 50.000 | Opcional | Auto |
| > 800 | R$ 100.000 | Opcional | Auto |

### 4.3 Bloqueios Automáticos
- 3 senhas incorretas: Bloqueio por 30 minutos
- 5 transações suspeitas: Bloqueio temporário
- Movimentações anormais: Bloqueio com análise
- COAF suspeitas: Bloqueio imediato

## 5. Planos e Tiers

### 5.1 Plano Básico (Free)
- ✓ Até R$ 2.000 de movimentação/mês
- ✓ 10 transferências/mês
- ✓ Sem cartão de débito
- ✓ Suporte por email (48h)

### 5.2 Plano Plus
- ✓ Até R$ 50.000 de movimentação/mês
- ✓ Transferências ilimitadas
- ✓ Cartão de débito + crédito
- ✓ Cashback 0.5%
- ✓ R$ 9,90/mês

### 5.3 Plano Premium
- ✓ Movimentação ilimitada
- ✓ Todas as operações
- ✓ Gerenciador de investimentos
- ✓ Cashback 2%
- ✓ Suporte prioritário (2h)
- ✓ R$ 29,90/mês

## 6. Referências e Cashback

### 6.1 Programa de Referência
- Bônus por indicação: R$ 50 + R$ 50 para indicado
- Máximo: R$ 500/mês por usuário
- Depósito automático em T+1
- Sem conversão de taxa

### 6.2 Cashback
```
Transações:
  - PIX: 0.5% (até R$ 10/transação)
  - Débito: 1.0% (até R$ 20/transação)
  - Crédito: 2.0% (até R$ 50/transação)

Acumulação:
  - Saque: Crédito em T+1
  - Mínimo para saque: R$ 10
  - Sem expiração
```

## 7. Retenção Fiscal

### 7.1 IR (Imposto de Renda)
- **Poupança**: Isento (até limite)
- **Investimentos**: Progressivo (15%-22.5%)
- **Ganho com CFDs**: Ordinário (27.5%)

### 7.2 IOF (Imposto sobre Operações Financeiras)
- **Transferência internacional**: 0.38%
- **Cartão de crédito**: 0%-50% (según operação)
- **Empréstimo**: 0.38%-3.38%

## 8. Conformidade

### 8.1 Lei de Usura
- Limite de juros: 50% ao ano para PF
- Multa máxima: 2% do valor da obrigação

### 8.2 Estatuto do Idoso
- Desconto de 10% em taxas para > 60 anos
- Simplificação de autenticação para > 80 anos

### 8.3 Lei de Inclusão
- Isenção de taxas para PCD
- Interface acessível (WCAG 2.1 AA)

## 9. Procedimentos

### 9.1 Atraso de Pagamento
```
Dia 1-5: Aviso por email + SMS
Dia 6-30: Juros 2.99% ao mês + multa 2%
Dia 31+: Protesto + negativação de CPF + multa 0.03% diária
```

### 9.2 Cancelamento de Conta
- Prazo: 30 dias para processamento
- Exigência: Saldo R$ 0
- Retenção: Últimos 6 meses de extratos
- Dados: Mantidos por 5 anos (conformidade fiscal)

## 10. Revisão

- **Frequência**: Anual
- **Aprovação**: Compliance + Diretoria
- **Comunicação**: 30 dias de antecedência
- **Grandfather clause**: Clientes ativos mantêm termos antigos
