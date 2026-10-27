# QA Challenge App

A small React task tracker with a login screen, built with Vite and TypeScript. The repository also includes tests written with Playwright.

## Requirements

- Node.js 
- npm

## Run the app locally

From the project directory, install the dependencies and start the Vite development server:

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite (by default, `http://localhost:5173`). 

Sign in with the demo credentials:
Username: admin
Password: qa123


The app keeps its task and login state in memory, reloading the page resets it.

## Run the tests locally

Install the Playwright Chromium browser once after installing the npm dependencies:
npx playwright install chromium

Run the end-to-end suite:
npx playwright test


Playwright starts the Vite server on port `5173` automatically for the test run and reuses an existing server when available. 
The tests run in Chromium.

To open the generated HTML report after a run:
npx playwright show-report


## Test coverage

The Playwright suite in `tests/tasks.spec.ts` covers these five browser scenarios:

- Invalid login shows an error and does not reveal the task tracker.
- Valid login with the demo credentials reveals the task tracker.
- Adding a task displays its title, clears the input, and increments the pending task count.
- Submitting an empty or whitespace only title shows a validation error and does not create a task.
- Completing a task decrements the pending count and applies strikethrough styling. Deleting it removes it from the list.

## Other checks

The package also provides these scripts:
npm run build  # Type-check and create a production build

