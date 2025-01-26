import { Page, expect } from '@playwright/test';

export async function assertURLContains(page: Page, substring: string) {
  await expect(page).toHaveURL(new RegExp(`.*${substring}.*`));
}

export async function assertPageTitle(page: Page, title: string | RegExp) {
  await expect(page).toHaveTitle(title);
}