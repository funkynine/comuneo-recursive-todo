import { test, expect } from '@playwright/test';

test.describe('Error Handling', () => {
  test('should show validation error for empty email on login', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Password').fill('password');
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page).toHaveURL('/login');

    const emailInput = page.getByLabel('Email');
    await expect(emailInput).toBeFocused();

    const isInvalid = await emailInput.evaluate(el => el.matches(':invalid'));
    expect(isInvalid).toBeTruthy();
  });

  test('should show validation error for empty password on login', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Email').fill('test@example.com');
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page).toHaveURL('/login');

    const passwordInput = page.getByLabel('Password');
    await expect(passwordInput).toBeFocused();

    const isInvalid = await passwordInput.evaluate(el => el.matches(':invalid'));
    expect(isInvalid).toBeTruthy();
  });

  test('should show validation error for invalid email format', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Email').fill('invalid-email');
    await page.getByLabel('Password').fill('password');
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page).toHaveURL('/login');

    const emailInput = page.getByLabel('Email');

    const isInvalid = await emailInput.evaluate(el => el.matches(':invalid'));
    expect(isInvalid).toBeTruthy();
  });

  test('should show validation error for short password on signup', async ({ page }) => {
    await page.goto('/signup');

    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('short');
    await page.getByRole('button', { name: 'Create account' }).click();

    await expect(page).toHaveURL('/signup');

    const passwordInput = page.getByLabel('Password');

    const isInvalid = await passwordInput.evaluate(el => el.matches(':invalid'));
    expect(isInvalid).toBeTruthy();
  });

  test.skip('should handle server errors gracefully', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Email').fill('server-error@example.com');
    await page.getByLabel('Password').fill('password');

    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page.locator('.text-red-600')).toBeVisible();
    await expect(page.locator('.text-red-600')).toContainText('error');
  });
});
