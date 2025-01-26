import { Page, expect, Locator } from '@playwright/test';

export async function assertURLContains(page: Page, substring: string) {
  await expect(page).toHaveURL(new RegExp(`.*${substring}.*`));
}

export async function assertPageTitle(page: Page, title: string | RegExp) {
  await expect(page).toHaveTitle(title);
}


export async function assertErrorMessageVisible(locator: Locator, expectedText: string) {
  await expect(locator).toBeVisible();
  await expect(locator).toHaveText(expectedText);
}

export async function assertVisibleElement(locator: Locator) {
  await expect(locator).toBeVisible()
}