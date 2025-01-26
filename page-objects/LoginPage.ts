import { Page, expect, BrowserContext, Locator } from '@playwright/test'
import CommonActions from '../utils/CommonActions'

export class LoginPage {
  readonly actions: CommonActions;
  readonly page: Page
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly signInBtn: Locator
  readonly ssoLoginBtn: Locator
  readonly loginErrorMessage: Locator
  readonly loginHeader: Locator

  constructor(page: Page) {
    this.actions = new CommonActions(page)
    this.page = page
    this.emailInput = page.locator('#email')
    this.passwordInput = page.locator('#password')
    this.signInBtn = page.getByRole('button', { name: 'Sign In' }) 
    this.ssoLoginBtn = page.getByTestId('ssoLoginButton')
    this.loginErrorMessage = page.locator('#loginErrorMessage')
    this.loginHeader = page.locator('h1', { hasText: 'Login' })
  }

  async login(email: string, password: string) {
    await this.actions.fill(this.emailInput, email)
    await this.actions.fill(this.passwordInput, password)
    await this.actions.click(this.signInBtn)
  }
}