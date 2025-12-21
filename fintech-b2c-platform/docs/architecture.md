# Arquitetura do Sistema

## 1. Visão Geral

A Carteira Digital é uma plataforma fintech B2C moderna, segura e escalável construída com arquitetura de microsserviços.

```
┌─────────────────────────────────────────────────────────────┐
│                      Usuários Finais                         │
├──────────────────┬──────────────────┬──────────────────────┤
│   Mobile App     │   Admin Web      │   Partner API        │
│   (React Native) │   (React)        │   (REST/GraphQL)     │
└────────┬─────────┴────────┬─────────┴──────────────┬────────┘
         │                  │                        │
┌────────▼──────────────────▼────────────────────────▼────────┐
│              API Gateway (Nginx)                             │
│  • Rate Limiting • Auth • Logging • Load Balancing          │
└───────┬────────────────────────────────────────────┬────────┘
        │                                            │
┌───────▼─────────────────────┐    ┌────────────────▼───────┐
│   Backend API (Node.js)     │    │   Static Assets         │
│  • REST Endpoints           │    │   • CDN (CloudFront)    │
│  • Business Logic           │    │   • Images              │
│  • Transaction Processing   │    │   • Documents           │
└───────┬─────────────────────┘    └────────────────────────┘
        │
┌───────▼──────────────────────────────────────────────────┐
│              Data Layer                                  │
├──────────────────────────────────┬──────────────────────┤
│  Database                        │  Cache & Queue      │
│  • PostgreSQL (Primary)          │  • Redis            │
│  • Read Replicas                 │  • Bull (Job Queue) │
│  • Backup (S3)                   │  • Elasticsearch    │
└──────────────────────────────────┴──────────────────────┘
        │
┌───────▼──────────────────────────────────────────────────┐
│              External Services                           │
├──────────────────────────────────┬──────────────────────┤
│  Payment Gateway                 │  Communication      │
│  • Stripe / Mercado Pago         │  • SendGrid (Email) │
│  • PagSeguro                     │  • Twilio (SMS)     │
└──────────────────────────────────┴──────────────────────┘
```

## 2. Camadas da Aplicação

### 2.1 Presentation Layer
- **Mobile App**: React Native para iOS/Android
- **Web Admin**: React para gestão interna
- **API Pública**: REST API para parceiros

### 2.2 Business Logic Layer
- Validação de regras de negócio
- Processamento de transações
- Cálculo de tarifas
- Verificação de limites

### 2.3 Data Layer
- PostgreSQL como banco principal
- Redis para cache e fila de jobs
- S3 para backup e documentos
- Elasticsearch para logs e busca

### 2.4 Integration Layer
- Payment gateways (Stripe, Mercado Pago)
- Serviços de comunicação (Email, SMS)
- Provedores de autenticação (Google, Apple)

## 3. Padrões de Projeto

### 3.1 MVC
```
Request → Route → Controller → Service → Repository → Database
                     ↓
                  Middleware
```

### 3.2 CQRS (Command Query Responsibility Segregation)
```
Write: POST/PUT/DELETE → Command Service → Primary DB
Read: GET → Query Service → Read Replica

Benefício: Otimização independente de leitura e escrita
```

### 3.3 Event-Driven
```
Evento de Transação
     ↓
Bull Queue (Job)
     ↓
Processadores:
  • Notificação
  • Auditoria
  • Análise de Fraude
  • Sync com Partners
```

## 4. Escalabilidade

### 4.1 Horizontal Scaling
- Kubernetes com 3+ replicas
- Auto-scaling baseado em CPU/Memory
- Load Balancer distribuindo requisições

### 4.2 Vertical Scaling
- Database: Upgrade de storage/CPU
- Cache: Adicionar nodes ao cluster Redis
- Message Queue: Bull com múltiplos workers

### 4.3 Caching Strategy
```
L1 Cache: In-Memory (Node.js)
  └─ TTL: 5 minutos
    └─ Dados: User profile, Settings

L2 Cache: Redis
  └─ TTL: 30 minutos
    └─ Dados: Saldo, Limite de transação

L3 Cache: CDN
  └─ TTL: 24 horas
    └─ Dados: Static assets, Imagens
```

## 5. Disponibilidade

### 5.1 SLA (Service Level Agreement)
- **API**: 99.9% uptime
- **Mobile App**: 99.5% uptime (depende da app store)

### 5.2 Disaster Recovery
```
RTO (Recovery Time Objective): < 4 horas
RPO (Recovery Point Objective): < 15 minutos

Backup:
  • Diário: Full backup do DB
  • Horário: Incremental
  • Retenção: 30 dias em S3
  • Teste de restore: Semanal
```

### 5.3 High Availability
- Multi-region deployment
- Database replication
- Failover automático
- Health checks contínuos

## 6. Performance

### 6.1 Otimizações
- Gzip compression em todas as respostas
- HTTP/2 push para assets críticos
- Lazy loading de componentes
- Code splitting em bundles pequenos

### 6.2 Métricas
| Métrica | Target | Medição |
|---------|--------|---------|
| TTFB | < 200ms | Tempo até 1º byte |
| FCP | < 1.0s | First Contentful Paint |
| LCP | < 2.5s | Largest Contentful Paint |
| CLS | < 0.1 | Cumulative Layout Shift |
| API Response | < 200ms | p95 de latência |

### 6.3 Monitoramento
- New Relic para APM
- Datadog para infraestrutura
- Sentry para error tracking
- Custom dashboards no Grafana

## 7. CI/CD Pipeline

```
Push código
    ↓
Lint & Format Check
    ↓
Unit Tests
    ↓
Integration Tests
    ↓
SAST (Security Analysis)
    ↓
Build Docker Image
    ↓
Registry (ECR/Docker Hub)
    ↓
Deploy to Staging
    ↓
E2E Tests
    ↓
Manual Approval (Prod)
    ↓
Blue-Green Deployment
    ↓
Smoke Tests
    ↓
Canary Monitoring
```

## 8. Decisões Arquiteturais

### 8.1 Por que Node.js/Express?
- ✅ Rápido desenvolvimento
- ✅ Comunidade grande
- ✅ Fácil integração com JavaScript frontend
- ✅ Escalabilidade com Node clusters

### 8.2 Por que PostgreSQL?
- ✅ ACID compliant
- ✅ JSON support
- ✅ Full-text search
- ✅ Row-level security
- ✅ Open source

### 8.3 Por que Kubernetes?
- ✅ Orquestração automática
- ✅ Auto-healing
- ✅ Scaling automático
- ✅ Rolling updates
- ✅ Multi-cloud compatible

### 8.4 Por que Redis?
- ✅ Performance (in-memory)
- ✅ Estruturas de dados ricas
- ✅ Pub/Sub para eventos
- ✅ TTL automático
- ✅ Persistence opcional

## 9. Roadmap Arquitetural

### Phase 1 (Atual)
- ✅ Monolito escalável
- ✅ PostgreSQL + Redis
- ✅ Kubernetes basic
- ✅ Basic monitoring

### Phase 2 (Q2 2024)
- ⏳ GraphQL gateway
- ⏳ Event sourcing
- ⏳ Kafka para streaming
- ⏳ Advanced analytics

### Phase 3 (Q4 2024)
- 🔮 Microsserviços completos
- 🔮 Blockchain para auditoria
- 🔮 ML models in production
- 🔮 Multi-region active-active
