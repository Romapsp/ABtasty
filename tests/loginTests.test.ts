
import { BrowserContext, Page, expect, Locator, test } from '@playwright/test'
import { PageManager } from './page-objects/PomManager'
let pm: PageManager

test.describe('Login page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    pm = new PageManager(page)
  })

  test('Successful Login with Valid Credentials (MFA Enabled)', async ({page}) => {
    await pm.onLoginPage().fillInForm('test@example.com', 'password')
    await pm.onMFAPage().enterMfaCode(123456)
    await expect(page).toHaveURL(/.*dashboard/)
    await expect(page).toHaveTitle(/AB Tasty/)
  })

  test('Successful Login with Valid Credentials (MFA Disabled)', async ({page}) => {
    await pm.onLoginPage().fillInForm('test2@example.com', 'password')
    await expect(page).toHaveURL(/.*dashboard/)
    await expect(page).toHaveTitle(/AB Tasty/)
  })

  test('Incorrect Email with Correct Password', async () => {
    await pm.onLoginPage().fillInForm('test3@example.com', 'password') // incorrect email
    await expect(pm.onLoginPage().loginErrorMessage).toBeVisible()
    await expect(pm.onLoginPage().loginErrorMessage).toHaveText('Please enter a valid email or password')
  })

  test('Unsuccessful Login with Incorrect MFA Code', async () => {
    await pm.onLoginPage().fillInForm('test@example.com', 'password')
    await pm.onMFAPage().enterMfaCode(666666)
    await expect(pm.onMFAPage().loginErrorMessage).toBeVisible()
    await expect(pm.onMFAPage().loginErrorMessage).toHaveText('Oops! The code you entered is incorrect. Please try again')
  })

  test('Correct Email with Incorrect Password', async () => {
    await pm.onLoginPage().fillInForm('test@example.com', 'password1') // incorrect password
    await expect(pm.onLoginPage().loginErrorMessage).toBeVisible()
    await expect(pm.onLoginPage().loginErrorMessage).toHaveText('Please enter a valid email or password')
  })

  test('Verify Functionality of the "Login with SSO" Button', async ({ page }) => {
    await pm.onLoginPage().ssoLoginBtn.click()
    await expect(pm.onSSOPage().signInWithSSOHeader).toBeVisible()
    await expect(page).toHaveURL(/.*ssologin/)
  })

  test('Verify Back Link Navigation', async ({ page }) => {
    await pm.onLoginPage().ssoLoginBtn.click()
    await pm.onSSOPage().backToLoginPageLink.click()
    await expect(pm.onLoginPage().loginHeader).toBeVisible()
    await expect(page).toHaveURL(/.*login/)
  })

  test('Verify Behavior for Unrecognized Email on SSO Screen', async ({ page }) => {
    await pm.onLoginPage().ssoLoginBtn.click()
    await pm.onSSOPage().enterSsoEmail('test@example.com')
    await expect(pm.onSSOPage().ssoEmailErrorMessage).toBeVisible()
    await expect(pm.onSSOPage().ssoEmailErrorMessage).toHaveText('Please enter a valid email')
  })
})