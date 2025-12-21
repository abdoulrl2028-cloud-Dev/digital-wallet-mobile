import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Login Flow', () => {
  test('deve fazer login com sucesso', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    await page.fill('input[type="email"]', 'user@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button:text("Entrar")');

    await page.waitForURL(`${BASE_URL}/home`);
    expect(await page.title()).toContain('Home');
  });

  test('deve exibir erro com credenciais inválidas', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    await page.fill('input[type="email"]', 'invalid@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button:text("Entrar")');

    const errorMessage = await page.locator('text=Credenciais inválidas');
    await expect(errorMessage).toBeVisible();
  });

  test('deve validar email inválido', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    await page.fill('input[type="email"]', 'invalid-email');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button:text("Entrar")');

    const errorMessage = await page.locator('text=Email inválido');
    await expect(errorMessage).toBeVisible();
  });
});

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Login antes de cada teste
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'user@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button:text("Entrar")');
    await page.waitForURL(`${BASE_URL}/home`);
  });

  test('deve exibir o saldo', async ({ page }) => {
    const balanceText = await page.locator('text=R$ 2.500,00');
    await expect(balanceText).toBeVisible();
  });

  test('deve navegar para página de transferência', async ({ page }) => {
    await page.click('text=Transferir');
    await page.waitForURL(`${BASE_URL}/transfer`);
    expect(await page.title()).toContain('Transferir');
  });

  test('deve realizar uma transferência', async ({ page }) => {
    await page.click('text=Transferir');
    
    await page.fill('input[placeholder="CPF do destinatário"]', '123.456.789-00');
    await page.fill('input[placeholder="Valor"]', '100.00');
    await page.fill('input[placeholder="Descrição"]', 'Pagamento de almoço');
    
    await page.click('button:text("Transferir")');
    
    const successMessage = await page.locator('text=Transferência realizada com sucesso');
    await expect(successMessage).toBeVisible();
  });
});

test.describe('Security', () => {
  test('deve fazer logout', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'user@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button:text("Entrar")');
    await page.waitForURL(`${BASE_URL}/home`);

    await page.click('button:text("Sair")');
    await page.waitForURL(`${BASE_URL}/login`);
  });

  test('deve bloquear acesso sem autenticação', async ({ page }) => {
    await page.goto(`${BASE_URL}/home`);
    await page.waitForURL(`${BASE_URL}/login`);
  });
});
