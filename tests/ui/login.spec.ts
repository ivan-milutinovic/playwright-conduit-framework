import { test, expect } from '@src/fixtures/fixtures';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Authentication Security Verification', () => {
  test('should reject login with invalid credentials', async ({ loginPage }) => {
    // Navigacija mora uključivati Hash ruter
    await loginPage.navigateTo('/#/login');

    const responsePromise = loginPage.waitForNetworkResponse('/users/login');

    await loginPage.login('qa_automation_invalid@example.com', 'wrong_password_123');

    const response = await responsePromise;

    expect(response.status()).toBeGreaterThanOrEqual(400);
    expect(response.status()).toBeLessThan(500);

    const errorMessage = await loginPage.getErrorMessageTexts();
    expect(errorMessage.length).toBeGreaterThan(0);
    //Wrong email/password combination or Email not found sign in first
    expect(errorMessage.join(' ')).toContain('Email not found sign in first');
  });
});
