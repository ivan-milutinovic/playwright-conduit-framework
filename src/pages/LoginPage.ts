import type { Page, Locator } from '@playwright/test';

import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly signInButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = this.page.getByPlaceholder('Email');
    this.passwordInput = this.page.getByPlaceholder('Password');
    this.signInButton = this.page.getByRole('button', { name: 'Sign in', exact: true });
    this.errorMessage = this.page.locator('.error-messages li');
  }

  async login(email: string, pass: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.signInButton.click();
  }

  async getErrorMessageTexts(): Promise<string[]> {
    return this.errorMessage.allTextContents();
  }
}
