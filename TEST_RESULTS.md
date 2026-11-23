# Test Results — Mini Checkout and Browser Test Suite

- Application: CHECK (Fast, simple and secure checkout)
- Date of Execution: 2026-11-22
- Target URL: http://localhost:5173

## Environment

- Operating System: Windows (x64)
- Node.js: v24.19.0
- npm: 11.17.0
- Vite: 8.3.8
- Playwright: 1.65.1
- Browser: Chromium (Chrome for Testing 159.0.8154.6)

## Automated Tests

Run command: `npm test` (`npx playwright test`)

```text
Running 4 tests using 2 workers

  ok 1 [chromium] › tests/smoke.spec.js:4:3 › App Shell › page loads and shows the heading (1.3s)
  ok 2 [chromium] › tests/checkout.spec.js:4:3 › Checkout › TC-01: successful checkout flow (1.7s)
  ok 3 [chromium] › tests/checkout.spec.js:27:3 › Checkout › TC-02: validation — missing customer name (1.4s)
  ok 4 [chromium] › tests/checkout.spec.js:44:3 › Checkout › TC-03: quantity stepper and monetary calculation (1.4s)

  4 passed (7.2s)
```

### Test Case Breakdown

1. **smoke.spec.js**:
   - Checks that the page loads, the document title contains "Mini Checkout", and the main heading is visible.
   - Result: Passed.

2. **TC-01: Successful checkout flow**:
   - Added Wireless Mouse to cart, entered "Jane Smith", clicked "Place Order".
   - Verified that the confirmation screen appeared, the customer name was shown, an order reference was generated, and only one confirmation was present.
   - Result: Passed.
   - Screenshot: `test-results/evidence/tc-01-successful-checkout.png`

3. **TC-02: Validation — missing customer name**:
   - Added Wireless Mouse to cart, left the name field empty, clicked "Place Order".
   - Verified that a validation message appeared, no confirmation screen was displayed, and the cart contents remained intact.
   - Result: Passed.
   - Screenshot: `test-results/evidence/tc-02-missing-name-validation.png`

4. **TC-03: Quantity stepper & monetary calculation**:
   - Added Wireless Mouse, increased quantity to 2.
   - Verified that quantity updated to 2, line total showed Rs 1,598, and total order price showed Rs 1,598.
   - Result: Passed.
   - Screenshot: `test-results/evidence/tc-03-quantity-calculation.png`

## Manual Tests

Manual scenarios performed in a Chromium browser window:

1. **MT-01: Empty cart checkout attempt**:
   - Action: Opened the app, did not add items, typed "Test User" in the name field, clicked "Place Order".
   - Observed: An alert message appeared stating "Your cart is empty. Add at least one item to place an order." No confirmation screen was shown, and the button read "Place Order — Rs 0".
   - Result: Passed.
   - Screenshot: `test-results/evidence/mt-01-empty-cart.png`

2. **MT-02: Rapid double-click on checkout**:
   - Action: Opened fresh session, added Wireless Mouse, entered "Test User", double-clicked "Place Order" quickly.
   - Observed: Only one order confirmation card was rendered, and a single order reference (#WAKZXB) was created.
   - Result: Passed.
   - Screenshot: `test-results/evidence/mt-02-double-click.png`

## Execution Summary

- Automated tests: 4 passed, 0 failed
- Manual checks: 2 passed, 0 failed
- Production build: Passed (`npm run build` completed with exit code 0)

## Defect Log

No defects were observed in the executed tests. Cart boundaries, calculations, validation states, and the double-click lock behaved according to specifications.

## Limitations

- Cart and order state exist only in component memory; refreshing the page resets the app.
- Order IDs are generated client-side for demonstration purposes.
