import { Page, Locator } from '@playwright/test'
import * as assertions from '../utils/assertions';
import CommonActions from '../utils/CommonActions'
import { CONSTANTS } from '../utils/const.ts'

export class SSOPage {
  readonly page: Page
  readonly emailInput: Locator
  readonly signInBtn: Locator
  readonly backToLoginPageLink: Locator
  readonly signInWithSSOHeader: Locator
  readonly ssoEmailErrorMessage: Locator
  readonly actions: CommonActions;

  constructor(page: Page) {
    this.actions = new CommonActions(page)
    this.page = page
    this.emailInput = page.locator('#email')
    this.signInBtn = page.getByRole('button', { name: 'Sign In' }) 
    this.backToLoginPageLink = page.locator('a', { hasText: 'Go back to Login page' })
    this.signInWithSSOHeader = page.locator('h1', { hasText: 'Sign in With SSO' })
    this.ssoEmailErrorMessage = page.getByTestId('emailErrorMessage')
  }

  async enterSsoEmail(validSsoEmail: string){
    await this.actions.fill(this.emailInput, validSsoEmail)
    await this.signInBtn.click()
  }

  async assertSSOPageVisible() {
    await assertions.assertURLContains(this.page, 'ssologin')
    await assertions.assertVisibleElement(this.signInWithSSOHeader)
  }

  async assertSsoEmailErrorMessage(expectedText: string) {
    await assertions.assertErrorMessageVisible(this.ssoEmailErrorMessage, expectedText);
  }
}
