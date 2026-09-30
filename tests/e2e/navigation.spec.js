import { test, expect } from '@playwright/test';

test.describe('Navegação', () => {
  test('renderiza o header e o hero', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Meu Aniversário');
    await expect(page.getByRole('link', { name: /confirmar presença/i })).toBeVisible();
  });

  test('menu mobile abre e fecha', async ({ page }) => {
    await page.setViewportSize({ width: 480, height: 800 });
    await page.goto('/');
    const toggle = page.locator('#navToggle');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('contagem regressiva está renderizada', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-unit="dias"]')).not.toHaveText('');
  });

  test('carrega os dados da programação e da galeria via Fetch', async ({ page }) => {
    const dataRequests = [];
    page.on('request', (request) => {
      if (request.url().includes('/data/')) dataRequests.push(request.url());
    });

    await page.goto('/');
    await expect(page.locator('[data-schedule] .schedule__item')).toHaveCount(5);
    await expect(page.locator('[data-gallery] .gallery__item')).toHaveCount(6);
    await expect(page.locator('[data-event-name]').first()).toHaveText('Uálace Brito');
    expect(dataRequests).toHaveLength(3);
  });

  test('adapta o convite ao celular sem rolagem horizontal', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    await expect(page.locator('.hero__title')).toBeVisible();
    await expect(page.locator('[data-gallery] .gallery__item')).toHaveCount(6);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
  });
});
