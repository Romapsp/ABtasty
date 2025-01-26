import { Page, Locator } from '@playwright/test'

export class SSOPage {
  readonly page: Page
  readonly emailInput: Locator
  readonly signInBtn: Locator
  readonly backToLoginPageLink: Locator
  readonly signInWithSSOHeader: Locator
  readonly ssoEmailErrorMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.emailInput = page.locator('#email')
    this.signInBtn = page.getByRole('button', { name: 'Sign In' }) 
    this.backToLoginPageLink = page.locator('a', { hasText: 'Go back to Login page' })
    this.signInWithSSOHeader = page.locator('h1', { hasText: 'Sign in With SSO' })
    this.ssoEmailErrorMessage = page.getByTestId('emailErrorMessage')
  }

  async enterSsoEmail(email: string){
    await this.emailInput.fill(email)
    await this.signInBtn.click()
  }

}
