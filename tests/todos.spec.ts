import {test, expect, type Page} from '@playwright/test';

async function login(page: Page) {
  await page.goto('/login');
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Log in' }).click();

  await page.waitForURL('/');
}

test.describe('Todo Management', () => {
  test.skip('should display the todo list page', async ({ page }) => {
    await login(page);

    await expect(page.locator('h1')).toHaveText('Recursive To-Do');

    await expect(page.getByPlaceholder('Add a task…')).toBeVisible();

    await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();
  });

  test.skip('should add a new todo', async ({ page }) => {
    await login(page);

    const initialTodoCount = await page.locator('.todo-item').count();

    await page.getByPlaceholder('Add a task…').fill('New test todo');
    await page.keyboard.press('Enter');

    await expect(page.locator('.todo-item')).toHaveCount(initialTodoCount + 1);
    await expect(page.locator('.todo-item').last()).toContainText('New test todo');
  });

  test.skip('should toggle a todo', async ({ page }) => {
    await login(page);

    if (await page.locator('.todo-item').count() === 0) {
      await page.getByPlaceholder('Add a task…').fill('Todo to toggle');
      await page.keyboard.press('Enter');
    }

    const firstTodo = page.locator('.todo-item').first();

    const initialCompletedState = await firstTodo.locator('input[type="checkbox"]').isChecked();

    await firstTodo.locator('input[type="checkbox"]').click();

    // @ts-ignore
    await expect(firstTodo.locator('input[type="checkbox"]')).toBeChecked(!initialCompletedState);
  });

  test.skip('should delete a todo', async ({ page }) => {
    await login(page);

    if (await page.locator('.todo-item').count() === 0) {
      await page.getByPlaceholder('Add a task…').fill('Todo to delete');
      await page.keyboard.press('Enter');
    }

    const initialTodoCount = await page.locator('.todo-item').count();

    await page.locator('.todo-item').first().locator('button[aria-label="Delete"]').click();

    await expect(page.locator('.todo-item')).toHaveCount(initialTodoCount - 1);
  });

  test.skip('should add a subtask to a todo', async ({ page }) => {
    await login(page);

    if (await page.locator('.todo-item').count() === 0) {
      await page.getByPlaceholder('Add a task…').fill('Parent todo');
      await page.keyboard.press('Enter');
    }

    await page.locator('.todo-item').first().locator('button', { hasText: 'Add subtask' }).click();

    await page.locator('.subtask-form input').fill('New subtask');
    await page.keyboard.press('Enter');

    await expect(page.locator('.todo-item .todo-item')).toBeVisible();
    await expect(page.locator('.todo-item .todo-item')).toContainText('New subtask');
  });
});
