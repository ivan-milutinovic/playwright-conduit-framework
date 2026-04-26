import { test as setup, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

import { USER_STORAGE } from '@src/constants/paths';

setup('authenticate as user via API', async ({ request }) => {
  const response = await request.post('/api/users/login', {
    data: {
      user: {
        email: process.env.CONDUIT_EMAIL,
        password: process.env.CONDUIT_PASSWORD,
      },
    },
  });

  expect(response.ok()).toBeTruthy();

  const responseBody = await response.json();
  const token = responseBody.user.token;

  const authState = {
    cookies: [],
    origins: [
      {
        origin: process.env.STAGING_URL as string,
        localStorage: [
          {
            name: 'jwtToken',
            value: token,
          },
        ],
      },
    ],
  };

  const dirPath = path.dirname(USER_STORAGE);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(USER_STORAGE, JSON.stringify(authState));
});
