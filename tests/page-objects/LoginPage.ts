import { Page, expect, BrowserContext, Locator } from '@playwright/test'

export class LoginPage {
  readonly page: Page
//   readonly ringItem: Locator

  constructor(page: Page) {
    this.page = page
    // this.ringItem = page.getByText('Ring', { exact: true })
  }

}