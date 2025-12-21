# Detecção de Fraude

## 1. Regras de Detecção

### 1.1 Análise de Transação
```
SCORE = 0
Se valor > média_diária * 3: SCORE += 40
Se transação fora do horário habitual: SCORE += 20
Se localização geográfica diferente: SCORE += 30
Se múltiplas transações em curto período: SCORE += 25

Se SCORE >= 70: Bloquear e solicitar confirmação
Se SCORE >= 50: Requer MFA
Se SCORE < 50: Permitir com monitoramento
```

### 1.2 Anomalia de Login
- Login em múltiplos dispositivos em 5 minutos
- Login de país diferente em 2 horas
- Senha correta, mas padrão de comportamento anormal
- Múltiplas tentativas falhadas (5+)

### 1.3 Account Takeover (ATO)
- Mudança de email ou telefone cadastrado
- Alteração de dados bancários
- Desativação de autenticação 2FA
- Logout de outros dispositivos

## 2. Scoring de Risco

### 2.1 Fatores Considerados
| Fator | Peso | Descrição |
|-------|------|-----------|
| Valor da transação | 30% | Comparado com média histórica |
| Horário | 15% | Fora do padrão usual |
| Localização | 25% | Mudança geográfica |
| Dispositivo | 20% | Novo ou não reconhecido |
| Velocidade | 10% | Transações muito rápidas |

### 2.2 Níveis de Risco
- **Baixo (0-30)**: Permitir
- **Médio (31-60)**: Verificação adicional (MFA)
- **Alto (61-80)**: Requer confirmação do usuário
- **Crítico (81-100)**: Bloquear e notificar

## 3. Machine Learning

### 3.1 Modelo de Detecção
- Treinamento com dados históricos de 12 meses
- Atualização diária do modelo
- Validação cruzada com padrões conhecidos
- Matriz de confusão monitorada continuamente

### 3.2 Features do Modelo
- Valor, horário, localização, dispositivo
- Histórico de 90 dias do usuário
- Dados agregados por merchant
- Padrões sazonais

## 4. Resposta à Fraude Detectada

### 4.1 Ações Automáticas
1. **Baixo risco**: Permitir transação
2. **Médio risco**: 
   - Solicitar confirmação por SMS/Email
   - Verificar com MFA
3. **Alto/Crítico risco**:
   - Bloquear transação
   - Congelar conta
   - Notificar usuário
   - Alertar time de fraude

### 4.2 Escalação Manual
- Fila de revisão para analistas
- Prioridade por valor e risco
- Tempo SLA: 4 horas para investigação
- Relatório de conclusão ao usuário

## 5. Monitoramento Contínuo

### 5.1 Métricas
- Taxa de falsos positivos: < 2%
- Taxa de falsos negativos: < 0.5%
- Cobertura de transações: 100%
- Tempo de detecção: < 50ms

### 5.2 Alertas
```
- Spike de transações fraudulentas: +50% vs período anterior
- Taxa de aprovação anormal: < 80% ou > 99%
- Padrão de APT (Advanced Persistent Threat)
- Ataque coordenado (múltiplas contas)
```

## 6. Lista de Bloqueio/Permitida

### 6.1 Bloqueio (Blacklist)
- CPF com histórico de fraude
- Cartão comprometido
- Merchant suspeito
- Endereço IP associado a fraude

### 6.2 Permitida (Whitelist)
- Transações recorrentes do usuário
- Comerciantes confiáveis
- Transferências entre contas próprias
- Parceiros validados

## 7. Compliance e Regulação

### 7.1 Relatórios Obrigatórios
- Suspeita de Movimentação Financeira (SMF)
- Relatório de Operações Suspeitas (ROS)
- COAF - Conselho de Controle de Atividades Financeiras

### 7.2 Armazenamento de Evidências
- Logs de transação por 5 anos
- Snapshots de risco com timestamp
- Decisões de bloqueio com motivo
- Comunicações com usuário
