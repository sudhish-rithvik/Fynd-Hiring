// @ts-check
import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright configuration.
 * Tests run against the Vite dev server (port 5173).
 * The webServer block starts the dev server automatically before tests run.
 *
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',

  /* Maximum time one test can run */
  timeout: 30_000,

  /* Fail the build on CI if any test.only is accidentally committed */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Reporter */
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],

  /* Temporary test worker output / traces */
  outputDir: 'test-results/raw',

  use: {
    /* Base URL — matches the Vite dev server */
    baseURL: 'http://localhost:5173',

    /* Capture screenshot on failure */
    screenshot: 'only-on-failure',

    /* Collect trace on first retry */
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Start Vite dev server before running tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
})
