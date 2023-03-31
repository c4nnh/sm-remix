import test, { expect } from '@playwright/test'

test('App title', async ({ page }) => {
  await page.goto('')
  await expect(page).toHaveTitle(/Self management/)
})
