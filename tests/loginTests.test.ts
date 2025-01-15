
import { BrowserContext, Page, expect, Locator, test } from '@playwright/test'
import { PageManager } from './page-objects/PomManager'
let pm: PageManager

test.describe('login page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    pm = new PageManager(page)
  })

  test('ring – ar consistency ', async ({ context }) => {
    // await pm.onLoginPage().tryOnLink.click()
  })

})