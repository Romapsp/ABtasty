import { Page, Locator } from '@playwright/test'

export default class CommonActions {
  
    readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async fill(locator: Locator , text: string) {
    await locator.fill(text)
  }

  async click(locator: Locator){
    await locator.click()
  }
  
}
