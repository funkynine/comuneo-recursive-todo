import { test, expect } from '@playwright/test';

test.describe('UI Components', () => {
  test('should render login form correctly', async ({ page }) => {
    await page.goto('/login');

    const form = page.locator('form');
    await expect(form).toBeVisible();

    const emailInput = page.getByLabel('Email');
    await expect(emailInput).toHaveClass(/rounded-xl/);
    await expect(emailInput).toHaveClass(/border/);

    const passwordInput = page.getByLabel('Password');
    await expect(passwordInput).toHaveClass(/rounded-xl/);
    await expect(passwordInput).toHaveClass(/border/);

    const loginButton = page.getByRole('button', { name: 'Log in' });
    await expect(loginButton).toHaveClass(/rounded-xl/);
    await expect(loginButton).toHaveClass(/bg-black/);
    await expect(loginButton).toHaveClass(/text-white/);
  });

  test('should render signup form correctly', async ({ page }) => {
    await page.goto('/signup');

    const form = page.locator('form');
    await expect(form).toBeVisible();

    const emailInput = page.getByLabel('Email');
    await expect(emailInput).toHaveClass(/rounded-xl/);
    await expect(emailInput).toHaveClass(/border/);

    const passwordInput = page.getByLabel('Password');
    await expect(passwordInput).toHaveClass(/rounded-xl/);
    await expect(passwordInput).toHaveClass(/border/);

    const signupButton = page.getByRole('button', { name: 'Create account' });
    await expect(signupButton).toHaveClass(/rounded-xl/);
    await expect(signupButton).toHaveClass(/bg-black/);
    await expect(signupButton).toHaveClass(/text-white/);
  });

  test.skip('should render todo list correctly', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('h1')).toHaveText('Recursive To-Do');

    const addForm = page.getByPlaceholder('Add a task…').locator('..').locator('..');
    await expect(addForm).toBeVisible();

    const todoItems = page.locator('.todo-item');
    if (await todoItems.count() > 0) {
      await expect(todoItems.first()).toBeVisible();

      const checkbox = todoItems.first().locator('input[type="checkbox"]');
      await expect(checkbox).toBeVisible();

      const deleteButton = todoItems.first().locator('button[aria-label="Delete"]');
      await expect(deleteButton).toBeVisible();
    }
  });
});
