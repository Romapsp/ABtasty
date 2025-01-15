
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

})