import { test, expect } from '@playwright/test'

test.describe('App Shell', () => {
  test('page loads and shows the heading', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/Mini Checkout and Browser Test Suite/i)

    const heading = page.getByRole('heading', { name: 'CHECK' })
    await expect(heading).toBeVisible()
  })
})
