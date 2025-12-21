import { Router } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import logger from '../utils/logger';

const router = Router();

/**
 * GET /api/v1/wallet/balance
 * Obtém o saldo da carteira do usuário
 */
router.get('/balance', async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.user?.id;

    // const wallet = await prisma.wallet.findFirst({
    //   where: { userId },
    // });

    res.json({
      total: 2500.50,
      disponivel: 2000.00,
      bloqueado: 500.50,
    });

    logger.info(`Saldo consultado para usuário: ${userId}`);
  } catch (error) {
    logger.error('Erro ao buscar saldo:', error);
    res.status(500).json({ error: 'Erro ao buscar saldo' });
  }
});

/**
 * POST /api/v1/wallet/transfer
 * Realiza uma transferência entre contas
 */
router.post('/transfer', async (req: AuthenticatedRequest, res) => {
  try {
    const { recipientCpf, amount, description } = req.body;

    if (!recipientCpf || !amount || amount <= 0) {
      res.status(400).json({ error: 'Dados inválidos' });
      return;
    }

    // Implementar lógica de transferência
    const transactionId = `TRX-${Date.now()}`;

    res.status(201).json({
      transactionId,
      status: 'pending',
      amount,
      recipientCpf,
      description,
      createdAt: new Date(),
    });

    logger.info(`Transferência iniciada: ${transactionId} de R$${amount}`);
  } catch (error) {
    logger.error('Erro ao processar transferência:', error);
    res.status(500).json({ error: 'Erro ao processar transferência' });
  }
});

/**
 * GET /api/v1/wallet/statement
 * Obtém o extrato da carteira
 */
router.get('/statement', async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.user?.id;
    const { startDate, endDate, limit = 10, offset = 0 } = req.query;

    // Implementar lógica de filtro

    res.json({
      transactions: [
        {
          id: 'TRX-001',
          type: 'transfer',
          amount: 100.00,
          description: 'Transferência enviada',
          status: 'completed',
          createdAt: new Date(),
        },
        {
          id: 'TRX-002',
          type: 'payment',
          amount: 50.00,
          description: 'Pagamento de fatura',
          status: 'completed',
          createdAt: new Date(),
        },
      ],
      total: 2,
      limit,
      offset,
    });

    logger.info(`Extrato consultado para usuário: ${userId}`);
  } catch (error) {
    logger.error('Erro ao buscar extrato:', error);
    res.status(500).json({ error: 'Erro ao buscar extrato' });
  }
});

export default router;
