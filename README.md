# Senior QE Take-Home Challenge — Minimal Automation

A lightweight React application (Authentication + Release Task Tracker) paired with an end-to-end Playwright test suite using the Page Object Model (POM) pattern and a GitHub Actions CI pipeline.

## Tech Stack & Design Decisions
- **Vite + React (TypeScript):** Fast bootstrapping with minimal boilerplate.
- **Playwright + TypeScript:** Reliable auto-waiting, native TypeScript support, and built-in `webServer` management (automatically spins up the React dev server on port `5173` before running tests).
- **Page Object Model (`tests/pages/TaskPage.ts`):** Encapsulates UI locators and page interactions, keeping test specs clean, readable, and focused on assertions.
- **Resilient Locators:** Combines user-facing accessible locators (`getByLabel`, `getByRole`) with dedicated `data-testid` attributes.

## Test Coverage (`tests/tasks.spec.ts`)
1. **Authentication (Negative):** Blocks access and displays an error message on invalid login credentials.
2. **Happy Path (Auth + CRUD):** Authenticates (`admin` / `qa123`), creates a new task, resets input, and increments the pending counter.
3. **Input Validation (Negative):** Prevents adding empty or whitespace-only tasks and displays validation feedback.
4. **State Lifecycle:** Marks a task as completed (verifying counter update and strike-through styling) and deletes it from the DOM.

## Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright Chromium binary
npx playwright install chromium

# 3. Run automated tests (automatically starts the app server)
npx playwright test

# Optional: Run the app manually in the browser (Demo login: admin / qa123)
npm run dev