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
    // {
    //   name: 'setup',
    //   testDir: './fixtures',
    //   testMatch: '**/global.setup.ts',
    // },
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // storageState: 'storageState.json'
      },
      // dependencies: ['setup'],
      // testIgnore: '**/unauthenticated/**',
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        // storageState: 'storageState.json'
      },
      // dependencies: ['setup'],
      // testIgnore: '**/unauthenticated/**',
    },
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        // storageState: 'storageState.json'
      },
      // dependencies: ['setup'],
      // testIgnore: '**/unauthenticated/**',
    }
  ],
});
