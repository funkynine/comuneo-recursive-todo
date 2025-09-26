import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should redirect from home to login when not authenticated', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL('/login');
    await expect(page.locator('h1')).toHaveText('Log in');
  });

  test('should navigate from login to signup', async ({ page }) => {
    await page.goto('/login');

    await page.getByRole('link', { name: 'Create one' }).click();

    await expect(page).toHaveURL('/signup');
    await expect(page.locator('h1')).toHaveText('Sign up');
  });

  test('should navigate from signup to login', async ({ page }) => {
    await page.goto('/signup');

    await page.getByRole('link', { name: 'Log in' }).click();

    await expect(page).toHaveURL('/login');
    await expect(page.locator('h1')).toHaveText('Log in');
  });

  test.skip('should navigate from home to login after logout', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Log out' }).click();

    await expect(page).toHaveURL('/login');
    await expect(page.locator('h1')).toHaveText('Log in');
  });
});
