import { Router } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import logger from '../utils/logger';

const router = Router();

/**
 * GET /api/v1/users/profile
 * Obtém o perfil do usuário logado
 */
router.get('/profile', async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.user?.id;

    res.json({
      id: userId,
      email: req.user?.email,
      firstName: 'Usuário',
      lastName: 'Teste',
      cpf: '123.456.789-00',
      phone: '(11) 98765-4321',
      birthDate: '1990-01-01',
      address: {
        street: 'Rua Exemplo',
        number: '123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
      },
      createdAt: new Date(),
      lastLogin: new Date(),
      status: 'active',
    });

    logger.info(`Perfil consultado do usuário: ${userId}`);
  } catch (error) {
    logger.error('Erro ao buscar perfil:', error);
    res.status(500).json({ error: 'Erro ao buscar perfil' });
  }
});

/**
 * PUT /api/v1/users/profile
 * Atualiza o perfil do usuário
 */
router.put('/profile', async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.user?.id;
    const { firstName, lastName, phone, address } = req.body;

    // Implementar validação e update no banco de dados

    res.json({
      message: 'Perfil atualizado com sucesso',
      user: {
        id: userId,
        firstName,
        lastName,
        phone,
        address,
      },
    });

    logger.info(`Perfil atualizado do usuário: ${userId}`);
  } catch (error) {
    logger.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ error: 'Erro ao atualizar perfil' });
  }
});

/**
 * PUT /api/v1/users/password
 * Altera a senha do usuário
 */
router.put('/password', async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.user?.id;
    const { currentPassword, newPassword } = req.body;

    // Implementar validação de senha atual e update

    res.json({
      message: 'Senha alterada com sucesso',
    });

    logger.info(`Senha alterada do usuário: ${userId}`);
  } catch (error) {
    logger.error('Erro ao alterar senha:', error);
    res.status(500).json({ error: 'Erro ao alterar senha' });
  }
});

export default router;
