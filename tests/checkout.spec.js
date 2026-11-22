import { test, expect } from '@playwright/test'

test.describe('Checkout', () => {
  test('TC-01: successful checkout flow', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('button', { name: 'Add Wireless Mouse to cart' }).click()
    await page.getByLabel('Full Name').fill('Jane Smith')
    await page.getByTestId('place-order').click()

    await expect(page.getByTestId('order-confirmation')).toBeVisible()
    await expect(page.getByText('Jane Smith', { exact: false })).toBeVisible()

    const orderRef = page.getByTestId('order-reference')
    await expect(orderRef).toBeVisible()
    const refText = (await orderRef.textContent()).trim()
    expect(refText.length).toBeGreaterThan(1)

    await expect(page.getByTestId('order-confirmation')).toHaveCount(1)

    await page.screenshot({
      path: 'test-results/evidence/tc-01-successful-checkout.png',
      fullPage: true,
    })
  })

  test('TC-02: validation — missing customer name', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('button', { name: 'Add Wireless Mouse to cart' }).click()
    await page.getByTestId('place-order').click()

    await expect(page.getByTestId('validation-message')).toBeVisible()
    await expect(page.getByTestId('order-confirmation')).not.toBeVisible()
    await expect(page.getByTestId('cart-item-mouse')).toBeVisible()
    await expect(page.locator('[aria-label="1 in cart"]')).toBeVisible()

    await page.screenshot({
      path: 'test-results/evidence/tc-02-missing-name-validation.png',
      fullPage: true,
    })
  })

  test('TC-03: quantity stepper and monetary calculation', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('button', { name: 'Add Wireless Mouse to cart' }).click()
    await page.getByRole('button', { name: 'Increase quantity of Wireless Mouse' }).click()

    await expect(page.locator('[aria-label="2 in cart"]')).toBeVisible()
    await expect(page.getByTestId('cart-item-mouse')).toContainText('₹1,598')
    await expect(page.getByTestId('order-total')).toHaveText('₹1,598')

    await page.screenshot({
      path: 'test-results/evidence/tc-03-quantity-calculation.png',
      fullPage: true,
    })
  })
})
