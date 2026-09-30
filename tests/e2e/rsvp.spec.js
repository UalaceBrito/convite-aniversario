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

  test('mantém o seletor de acompanhantes no mesmo estilo dos campos de texto', async ({
    page,
  }) => {
    await page.goto('/#rsvp');

    const select = page.locator('#acompanhantes');
    const input = page.locator('#nome');
    await expect(select).toHaveCSS(
      'background-color',
      await input.evaluate((element) => getComputedStyle(element).backgroundColor),
    );
    await expect(select).toHaveCSS('background-repeat', 'no-repeat');
    await expect(select).toHaveCSS('background-position', 'calc(100% - 16px) 50%');
  });
});
