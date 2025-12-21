import request from 'supertest';
import app from '../../apps/backend-api/src/index';

describe('Auth Routes', () => {
  describe('POST /api/v1/auth/register', () => {
    it('deve registrar um novo usuário', async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          firstName: 'Test',
          lastName: 'User',
          cpf: '12345678901',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body.user.email).toBe('test@example.com');
    });

    it('deve rejeitar email inválido', async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'invalid-email',
          password: 'password123',
          firstName: 'Test',
          lastName: 'User',
          cpf: '12345678901',
        });

      expect(response.status).toBe(400);
    });

    it('deve rejeitar senha muito curta', async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'test@example.com',
          password: 'short',
          firstName: 'Test',
          lastName: 'User',
          cpf: '12345678901',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('deve fazer login com credenciais válidas', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'user@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('accessToken');
    });

    it('deve rejeitar credenciais inválidas', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'invalid@example.com',
          password: 'wrongpassword',
        });

      expect(response.status).toBe(401);
    });
  });
});

describe('Wallet Routes', () => {
  describe('GET /api/v1/wallet/balance', () => {
    it('deve retornar o saldo da carteira', async () => {
      const response = await request(app)
        .get('/api/v1/wallet/balance')
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('disponivel');
    });

    it('deve retornar 401 sem token', async () => {
      const response = await request(app).get('/api/v1/wallet/balance');

      expect(response.status).toBe(401);
    });
  });
});
