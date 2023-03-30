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
      await expect(page.locator('#app-name')).toHaveText(/^Self management$/)
    })

    test('Has email label', async ({ page }) => {
      await expect(page.locator('#label-for-email')).toHaveText(/^Email$/)
    })

    test('Has password label', async ({ page }) => {
      await expect(page.locator('#label-for-password')).toHaveText(/^Password$/)
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
      const emailInput = page.locator('#email')
      await expect(emailInput).toHaveAttribute('type', 'text')
      await expect(emailInput).toHaveAttribute('name', 'email')
    })

    test('Check password input', async ({ page }) => {
      const passwordInput = page.locator('#password')
      await expect(passwordInput).toHaveAttribute('type', 'password')
      await expect(passwordInput).toHaveAttribute('name', 'password')
    })
  })
})

test.describe('Check login', () => {
  test('Check email', async ({ page }) => {
    await page
      .getByRole('button', {
        exact: true,
        name: 'Login',
      })
      .click()
    const emailErrorLabel = page.locator('#errors-for-email')
    await expect(emailErrorLabel).toContainText(/Please enter valid email/)
  })

  test('Check password', async ({ page }) => {
    await page.getByRole('button').click()
    const passwordErrorLabel = page.locator('#errors-for-password')
    await expect(passwordErrorLabel).toContainText(
      /This field must contains at least 6 character\(s\)/
    )
  })

  test('Check invalid email or password', async ({ page }) => {
    const emailInput = page.locator('#email')
    await emailInput.type('invalid.user@example.com')
    const passwordInput = page.locator('#password')
    await passwordInput.type('123456')
    await page.getByRole('button').click()
    const passwordErrorLabel = page.locator('#errors-for-password')
    await expect(passwordErrorLabel).toContainText(/Invalid email or password/)
  })

  test('Check valid email or password', async ({ page }) => {
    const emailInput = page.locator('#email')
    await emailInput.type('user.local@example.com')
    const passwordInput = page.locator('#password')
    await passwordInput.type('123456')
    await page.getByRole('button').click()
    await expect(page).toHaveURL(/^.+\/$/)
  })
})
