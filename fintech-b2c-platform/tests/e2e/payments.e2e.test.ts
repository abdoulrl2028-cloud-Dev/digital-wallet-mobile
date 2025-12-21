import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Payment Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login antes de cada teste
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'user@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button:text("Entrar")');
    await page.waitForURL(`${BASE_URL}/home`);
  });

  test('deve exibir lista de métodos de pagamento', async ({ page }) => {
    await page.click('text=Pagamentos');
    await page.waitForURL(`${BASE_URL}/payments`);

    const paymentMethodsList = await page.locator('text=Métodos de pagamento');
    await expect(paymentMethodsList).toBeVisible();
  });

  test('deve adicionar novo método de pagamento', async ({ page }) => {
    await page.click('text=Pagamentos');
    await page.click('button:text("Adicionar método")');

    await page.fill('input[placeholder="Número do cartão"]', '4532015112830366');
    await page.fill('input[placeholder="Validade"]', '12/25');
    await page.fill('input[placeholder="CVV"]', '123');

    await page.click('button:text("Confirmar")');

    const successMessage = await page.locator('text=Cartão adicionado com sucesso');
    await expect(successMessage).toBeVisible();
  });

  test('deve realizar pagamento com cartão', async ({ page }) => {
    await page.click('text=Pagamentos');
    
    const paymentButton = await page.locator('button:has-text("Pagar com cartão"):first');
    await paymentButton.click();

    await page.fill('input[placeholder="Valor"]', '50.00');
    await page.fill('input[placeholder="Descrição"]', 'Compras online');

    await page.click('button:text("Confirmar")');

    const successMessage = await page.locator('text=Pagamento processado com sucesso');
    await expect(successMessage).toBeVisible();
  });

  test('deve rejeitar pagamento acima do limite', async ({ page }) => {
    await page.click('text=Pagamentos');
    await page.click('button:text("Pagar com cartão")');

    await page.fill('input[placeholder="Valor"]', '100000.00');

    await page.click('button:text("Confirmar")');

    const errorMessage = await page.locator('text=Limite de crédito insuficiente');
    await expect(errorMessage).toBeVisible();
  });
});

test.describe('Transaction History', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'user@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button:text("Entrar")');
  });

  test('deve exibir histórico de transações', async ({ page }) => {
    await page.click('text=Histórico');
    await page.waitForURL(`${BASE_URL}/transactions`);

    const transactionList = await page.locator('text=Transações');
    await expect(transactionList).toBeVisible();
  });

  test('deve filtrar transações por data', async ({ page }) => {
    await page.click('text=Histórico');
    
    await page.fill('input[placeholder="Data inicial"]', '01/01/2024');
    await page.fill('input[placeholder="Data final"]', '31/12/2024');

    await page.click('button:text("Filtrar")');

    const results = await page.locator('text=Transações filtradas');
    await expect(results).toBeVisible();
  });
});
