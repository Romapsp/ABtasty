import { Page, Locator, expect } from '@playwright/test'
import * as assertions from '../utils/assertions';


export class DashboardPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async assertSuccessfulLogin() {
    await assertions.assertURLContains(this.page, 'dashboard');
    await assertions.assertPageTitle(this.page, /AB Tasty/);
  }

  
}