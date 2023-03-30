import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('login')
})

test('Check URL', async ({ page }) => {
  await expect(page).toHaveURL(/^.+\/login$/)
})

test.describe('Check UI', () => {
  test.describe('Check text', () => {
    test('Has app name', async ({ page }) => {
      await expect(page.locator('id=app-name')).toHaveText(/^Self management$/)
    })

    test('Has email label', async ({ page }) => {
      await expect(page.locator('id=label-for-email')).toHaveText(/^Email$/)
    })

    test('Has password label', async ({ page }) => {
      await expect(page.locator('id=label-for-password')).toHaveText(
        /^Password$/
      )
    })

    test('Has register label', async ({ page }) => {
      const form = page.locator('form')

      await expect(form.locator('p')).toContainText(/No account\?/)
      await expect(form.locator('p').locator('a')).toContainText(/Register/)
    })

    test('Login label', async ({ page }) => {
      await expect(page.locator('button')).toHaveText('Login')
    })
  })

  test.describe('Check element type', () => {
    test('Check email input', async ({ page }) => {
      const emailInput = page.locator('id=email')
      await expect(emailInput).toHaveAttribute('type', 'text')
      await expect(emailInput).toHaveAttribute('name', 'email')
    })

    test('Check password input', async ({ page }) => {
      const passwordInput = page.locator('id=password')
      await expect(passwordInput).toHaveAttribute('type', 'password')
      await expect(passwordInput).toHaveAttribute('name', 'password')
    })
  })
})
