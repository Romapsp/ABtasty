
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

  test('Unsuccessful Login with Invalid Credentials', async () => {
    await pm.onLoginPage().fillInForm('test3@example.com', 'password')
    await expect(pm.onLoginPage().loginErrorMessage).toBeVisible()
    await expect(pm.onLoginPage().loginErrorMessage).toHaveText('Please enter a valid email or password')
  })

})