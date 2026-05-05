import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

import { TIMEOUTS } from '@src/constants/timeouts';
import { USER_STORAGE } from '@src/constants/paths';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: TIMEOUTS.LONG,
  expect: {
    timeout: TIMEOUTS.DEFAULT_EXPECT,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['list']],

  use: {
    baseURL: process.env.STAGING_URL,
    actionTimeout: TIMEOUTS.SHORT,
    navigationTimeout: TIMEOUTS.MEDIUM,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  },

  projects: [
    {
      name: 'setup',
      testMatch: '**/auth.setup.ts',
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: USER_STORAGE,
      },
      dependencies: ['setup'],
    },
  ],
});
