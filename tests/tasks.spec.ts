import { test, expect } from '@playwright/test';
import { TaskPage } from './pages/TaskPage';

test.describe('Task Tracker Core Suite', () => {
  let taskPage: TaskPage;

  // Sets up the Page Object and navigates to the app before each test
  test.beforeEach(async ({ page }) => {
    taskPage = new TaskPage(page);
    await taskPage.goto();
  });

  // Verifies that invalid credentials display an error and block access
  test('Invalid login attempt', async () => {
    await taskPage.login('wrongUser', 'wrongPass');

    await expect(taskPage.loginError).toHaveText('Invalid credentials');
    await expect(taskPage.pendingCounter).not.toBeVisible();
  });

  // Verifies that invalid credentials display an error and block access
  test('Valid Login', async () => {
    await taskPage.login('admin', 'qa123');

    await expect(taskPage.loginError).not.toBeVisible();
    await expect(taskPage.pendingCounter).toBeVisible();
  });

  test.describe('Authenticated task actions', () => {
    test.beforeEach(async () => {
      await taskPage.login('admin', 'qa123');
    });

    // Verifies valid login and adding a new task updates the pending counter
    test('Add a new task, and update the pending counter', async () => {
      await expect(taskPage.pendingCounter).toHaveText('Pending tasks: 0');

      await taskPage.addTask('Run smoke test suite');

      await expect(taskPage.taskItems).toHaveCount(1);
      await expect(taskPage.taskTitle).toHaveText('Run smoke test suite');
      await expect(taskPage.pendingCounter).toHaveText('Pending tasks: 1');
      await expect(taskPage.taskInput).toHaveValue('');
    });

    // Verifies that submitting whitespace shows a validation error and prevents task creation
    test('Prevent adding empty or whitespace tasks', async () => {
      await taskPage.addTask('   ');

      await expect(taskPage.errorMessage).toHaveText('Task title cannot be empty');
      await expect(taskPage.taskItems).toHaveCount(0);
    });

    // Verifies completing a task updates styles/counter and deleting removes it from DOM
    test('Complete a task and then delete it, updating state accordingly', async () => {
      await taskPage.addTask('Sign off release candidate');

      await taskPage.toggleTaskAt(0);
      await expect(taskPage.pendingCounter).toHaveText('Pending tasks: 0');
      await expect(taskPage.taskTitle).toHaveCSS('text-decoration-line', 'line-through');

      await taskPage.deleteTaskAt(0);
      await expect(taskPage.taskItems).toHaveCount(0);
    });
  });
});