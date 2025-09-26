import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should navigate to login page', async ({ page }) => {
    await page.goto('/login');

    await expect(page.locator('h1')).toHaveText('Log in');

    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();

    await expect(page.getByRole('link', { name: 'Create one' })).toBeVisible();
  });

  test('should navigate to signup page', async ({ page }) => {
    await page.goto('/signup');

    await expect(page.locator('h1')).toHaveText('Sign up');

    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Create account' })).toBeVisible();

    await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
  });

  test('should show error message for invalid login', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('wrongpassword');

    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page.locator('.text-red-600')).toBeVisible();
  });
});
