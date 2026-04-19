import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests', // test directory
  fullyParallel: true, // runs tests in parallel
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 5 : undefined,
  reporter: [['html', { open: 'on-failure' }]], // report format and when to open it

  // base URL for the application under test
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup-chromium',
      testDir: './fixtures',
      testMatch: '**/global.setup.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'setup-firefox',
      testDir: './fixtures',
      testMatch: '**/global.setup.ts',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'setup-webkit',
      testDir: './fixtures',
      testMatch: '**/global.setup.ts',
      use: { ...devices['Desktop Safari'] },
    },

    // Authenticated projects
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'storageState.setup-chromium.json',
      },
      dependencies: ['setup-chromium'],
      testIgnore: '**/unauthenticated/**',
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'storageState.setup-firefox.json',
      },
      dependencies: ['setup-firefox'],
      testIgnore: '**/unauthenticated/**',
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        storageState: 'storageState.setup-webkit.json',
      },
      dependencies: ['setup-webkit'],
      testIgnore: '**/unauthenticated/**',
    },

    // Unauthenticated projects
    {
      name: 'chromium-unauthenticated',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/unauthenticated/**',
    },
    {
      name: 'firefox-unauthenticated',
      use: { ...devices['Desktop Firefox'] },
      testMatch: '**/unauthenticated/**',
    },
    {
      name: 'webkit-unauthenticated',
      use: { ...devices['Desktop Safari'] },
      testMatch: '**/unauthenticated/**',
    },
  ],
});
