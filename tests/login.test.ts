import { expect, test } from '@playwright/test'
import { PageManager } from '../page-objects/PomManager.ts'
import { CONSTANTS } from '../utils/const.ts'
let pm: PageManager

test.describe('Login page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    pm = new PageManager(page)
  })

  test('Successful Login with Valid Credentials (MFA Enabled)', async () => {
    await pm.onLoginPage().login(CONSTANTS.validEmailWithMfa, CONSTANTS.validPassword)
    await pm.onMFAPage().enterMfaCode(CONSTANTS.validMfaCode)
    await pm.onDashboardPage().assertSuccessfulLogin()
  })

  test('Successful Login with Valid Credentials (MFA Disabled)', async () => {
    await pm.onLoginPage().login(CONSTANTS.validEmailWithoutMfa, CONSTANTS.validPassword)
    await pm.onDashboardPage().assertSuccessfulLogin()
  })

  test('Incorrect Email with Correct Password', async () => {
    await pm.onLoginPage().login(CONSTANTS.invalidEmail, CONSTANTS.validPassword)
    await pm.onLoginPage().assertLoginErrorMessage(CONSTANTS.wrongCredentialsText);
  })

  test('Unsuccessful Login with Incorrect MFA Code', async () => {
    await pm.onLoginPage().login(CONSTANTS.validEmailWithMfa, CONSTANTS.validPassword)
    await pm.onMFAPage().enterMfaCode(CONSTANTS.invalidMfaCode)
    await pm.onLoginPage().assertLoginErrorMessage(CONSTANTS.wrongMfaCodeText);
  })

  test('Correct Email with Incorrect Password', async () => {
    await pm.onLoginPage().login(CONSTANTS.validEmailWithoutMfa, CONSTANTS.invalidPassword)
    await pm.onLoginPage().assertLoginErrorMessage(CONSTANTS.wrongCredentialsText);
  })

  test('Verify Functionality of the "Login with SSO" Button', async () => {
    await pm.onLoginPage().ssoLoginBtn.click()
    await pm.onSSOPage().assertSSOPageVisible()
  })

  test('Verify Back Link Navigation', async () => {
    await pm.onLoginPage().ssoLoginBtn.click()
    await pm.onSSOPage().backToLoginPageLink.click()
    await pm.onLoginPage().assertLoginPageVisible()
  })

  test('Verify Behavior for Unrecognized Email on SSO Screen', async () => {
    await pm.onLoginPage().ssoLoginBtn.click()
    await pm.onSSOPage().enterSsoEmail(CONSTANTS.validSsoEmail)
    await pm.onSSOPage().assertSsoEmailErrorMessage(CONSTANTS.wrongSsoEmailText)
  })
})