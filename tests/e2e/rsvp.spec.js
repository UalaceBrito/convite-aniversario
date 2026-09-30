import { test, expect } from '@playwright/test';

test.describe('RSVP', () => {
  test('valida campos obrigatórios', async ({ page }) => {
    await page.goto('/#rsvp');
    await page.getByRole('button', { name: /confirmar presença/i }).click();
    await expect(page.locator('#erro-nome')).toHaveText(/informe seu nome/i);
    await expect(page.locator('#erro-email')).toHaveText(/informe seu e-mail/i);
  });

  test('valida formato de e-mail', async ({ page }) => {
    await page.goto('/#rsvp');
    await page.locator('#nome').fill('Maria Silva');
    await page.locator('#email').fill('invalido');
    await page.getByRole('button', { name: /confirmar presença/i }).click();
    await expect(page.locator('#erro-email')).toHaveText(/e-mail válido/i);
  });

  test('submete com sucesso', async ({ page }) => {
    await page.goto('/#rsvp');
    await page.locator('#nome').fill('Maria Silva');
    await page.locator('#email').fill('maria@email.com');
    await page.getByRole('button', { name: /confirmar presença/i }).click();
    await expect(page.locator('#formSuccess')).toBeVisible();
    await expect(page.locator('#successName')).toHaveText('Maria Silva');
  });
});
