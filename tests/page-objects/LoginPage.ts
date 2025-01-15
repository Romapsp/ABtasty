import { Page, expect, BrowserContext, Locator } from '@playwright/test'

export class LoginPage {
  readonly page: Page
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly signInBtn: Locator
  readonly ssoLoginBtn: Locator

  constructor(page: Page) {
    this.page = page
    this.emailInput = page.locator('#email')
    this.passwordInput = page.locator('#password')
    this.signInBtn = page.getByRole('button', { name: 'Sign In' }) 
    this.ssoLoginBtn = page.getByTestId('ssoLoginButton')
  }

  async enterEmail(email: string) {
    await this.emailInput.fill(email)
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password)
  }

  async fillInForm(email: string, password: string ) {
    await this.enterEmail(email)
    await this.enterPassword(password)
    await this.signInBtn.click()
  }
}