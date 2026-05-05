import type { Page, Response } from '@playwright/test';

import { TIMEOUTS } from '@src/constants/timeouts';

export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(path: string) {
    await this.page.goto(path);
  }

  async waitForNetworkResponse(urlEndpoint: string): Promise<Response> {
    return this.page.waitForResponse((response) => response.url().endsWith(urlEndpoint), {
      timeout: TIMEOUTS.MEDIUM,
    });
  }
}
