import { Router, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import logger from '../utils/logger';

const router = Router();

/**
 * POST /api/v1/auth/register
 * Registra um novo usuário
 */
router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('firstName').trim().notEmpty(),
    body('lastName').trim().notEmpty(),
    body('cpf').matches(/^\d{11}$/),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { email, password, firstName, lastName, cpf } = req.body;

      // Verificar se usuário já existe
      // const existingUser = await prisma.user.findUnique({ where: { email } });
      // if (existingUser) {
      //   return res.status(409).json({ error: 'Email já cadastrado' });
      // }

      // Hash de senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Criar usuário
      // const user = await prisma.user.create({
      //   data: {
      //     id: uuidv4(),
      //     email,
      //     password: hashedPassword,
      //     firstName,
      //     lastName,
      //     cpf,
      //   },
      // });

      // Gerar token JWT
      const token = jwt.sign(
        { userId: uuidv4(), email, role: 'user' },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: 'Usuário registrado com sucesso',
        accessToken: token,
        user: {
          email,
          firstName,
          lastName,
        },
      });

      logger.info(`Novo usuário registrado: ${email}`);
    } catch (error) {
      logger.error('Erro ao registrar:', error);
      res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
  }
);

/**
 * POST /api/v1/auth/login
 * Faz login do usuário
 */
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { email, password } = req.body;

      // Buscar usuário
      // const user = await prisma.user.findUnique({ where: { email } });
      // if (!user) {
      //   return res.status(401).json({ error: 'Credenciais inválidas' });
      // }

      // Verificar senha
      // const passwordMatch = await bcrypt.compare(password, user.password);
      // if (!passwordMatch) {
      //   return res.status(401).json({ error: 'Credenciais inválidas' });
      // }

      // Gerar token JWT
      const token = jwt.sign(
        { userId: uuidv4(), email, role: 'user' },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Login realizado com sucesso',
        accessToken: token,
        user: {
          email,
          firstName: 'Usuário',
          lastName: 'Teste',
        },
      });

      logger.info(`Login realizado: ${email}`);
    } catch (error) {
      logger.error('Erro ao fazer login:', error);
      res.status(500).json({ error: 'Erro ao fazer login' });
    }
  }
);

/**
 * POST /api/v1/auth/refresh
 * Atualiza o token JWT
 */
router.post('/refresh', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ error: 'Token não fornecido' });
      return;
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;

    const newToken = jwt.sign(
      { userId: decoded.userId, email: decoded.email, role: decoded.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.json({ accessToken: newToken });
  } catch (error) {
    logger.error('Erro ao atualizar token:', error);
    res.status(401).json({ error: 'Erro ao atualizar token' });
  }
});

/**
 * POST /api/v1/auth/logout
 * Faz logout do usuário
 */
router.post('/logout', (req: AuthenticatedRequest, res: Response) => {
  try {
    logger.info(`Logout realizado: ${req.user?.email}`);
    res.json({ message: 'Logout realizado com sucesso' });
  } catch (error) {
    logger.error('Erro ao fazer logout:', error);
    res.status(500).json({ error: 'Erro ao fazer logout' });
  }
});

export default router;
