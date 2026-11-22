import { test, expect } from '@playwright/test'

test.describe('App Shell', () => {
  test('page loads and shows the heading', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/Mini Checkout/i)

    const heading = page.getByRole('heading', { name: /Mini Checkout/i })
    await expect(heading).toBeVisible()
  })
})
