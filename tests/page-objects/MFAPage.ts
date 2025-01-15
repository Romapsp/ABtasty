import { Page, Locator } from '@playwright/test'

export class MFAPage {
  readonly page: Page
  readonly mfaInput: Locator
  readonly OkBtn: Locator

  constructor(page: Page) {
    this.page = page
    this.mfaInput = page.locator('#mfa-code')
    this.OkBtn = page.locator('button[type="Ok"]')
  }

  async enterMfaCode(code: number){
    await this.mfaInput.fill(code.toString()) // fill method doesn't accept number, so I've converted to string
    await this.OkBtn.click()
  }

}
