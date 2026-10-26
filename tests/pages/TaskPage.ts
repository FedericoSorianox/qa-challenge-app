import { type Page, type Locator } from '@playwright/test';

export class TaskPage {
    readonly page: Page;
    // Login locators
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginError: Locator;
    readonly logoutButton: Locator;
    // Task Tracker locators
    readonly taskInput: Locator;
    readonly addButton: Locator;
    readonly errorMessage: Locator;
    readonly pendingCounter: Locator;
    readonly taskItems: Locator;
    readonly taskTitle: Locator;
    readonly taskCheckbox: Locator;
    readonly deleteButton: Locator;

    // Initializes the page instance and maps all UI locators
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByLabel('Username');
        this.passwordInput = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.loginError = page.getByTestId('login-error');
        this.logoutButton = page.getByTestId('logout-btn');

        this.taskInput = page.getByLabel('Task title');
        this.addButton = page.getByRole('button', { name: 'Add task' });
        this.errorMessage = page.getByTestId('error-msg');
        this.pendingCounter = page.getByTestId('pending-counter');
        this.taskItems = page.getByTestId('task-item');
        this.taskTitle = page.getByTestId('task-title');
        this.taskCheckbox = page.getByTestId('task-checkbox');
        this.deleteButton = page.getByTestId('delete-task-btn');
    }

    // Navigates to the root URL of the application
    async goto() {
        await this.page.goto('/');
    }

    // Submits login credentials to authenticate the user
    async login(username: string, pass: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(pass);
        await this.loginButton.click();
    }

    // Fills the task input field and submits the form
    async addTask(title: string) {
        await this.taskInput.fill(title);
        await this.addButton.click();
    }

    // Toggles the completion checkbox for a task at a given index
    async toggleTaskAt(index = 0) {
        await this.taskCheckbox.nth(index).click();
    }

    // Clicks the delete button for a task at a given index
    async deleteTaskAt(index = 0) {
        await this.deleteButton.nth(index).click();
    }
}