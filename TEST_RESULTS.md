# Test Execution Results — Mini Checkout

**Date of Execution:** 2026-11-22  
**Target URL:** http://localhost:5173  

## Environment

- **OS:** Windows (x64)
- **Node.js:** v24.19.0
- **npm:** 11.17.0
- **Vite:** 8.3.8
- **Playwright:** 1.65.1
- **Browser:** Chromium (Chrome for Testing 159.0.8154.6)

## Automated Test Results

Executed with `npm test` (`npx playwright test`).

```
Running 4 tests using 2 workers

  ok 2 [chromium] › tests/checkout.spec.js:20:3 › Checkout › TC-01: successful checkout flow (780ms)
  ok 1 [chromium] › tests/smoke.spec.js:7:3 › App Shell › page loads and shows the heading (1.0s)
  ok 3 [chromium] › tests/checkout.spec.js:56:3 › Checkout › TC-02: validation — missing customer name (690ms)
  ok 4 [chromium] › tests/checkout.spec.js:86:3 › Checkout › TC-03: quantity stepper and monetary calculation (567ms)

  4 passed (3.1s)
```

### Case Details

- **smoke.spec.js**:
  - Page loads at `/`, page title matches `/Mini Checkout/i`, and `<h1>` heading is visible.
  - Result: **Passed**

- **TC-01: Successful checkout flow**:
  - Added Wireless Mouse to cart, entered "Jane Smith", clicked "Place Order".
  - Verified confirmation screen was visible, displayed "Jane Smith", generated non-empty order reference, and only one confirmation element was rendered.
  - Result: **Passed**
  - Evidence: `test-results/evidence/tc-01-successful-checkout.png`

- **TC-02: Validation — missing customer name**:
  - Added Wireless Mouse to cart, left name empty, clicked "Place Order".
  - Verified validation error was shown, confirmation screen was not shown, and cart item + quantity remained intact.
  - Result: **Passed**
  - Evidence: `test-results/evidence/tc-02-missing-name-validation.png`

- **TC-03: Quantity stepper and monetary calculation**:
  - Added Wireless Mouse, clicked `+` to increase quantity to 2.
  - Verified quantity updated to 2, item line total was ₹1,598, and order total was ₹1,598.
  - Result: **Passed**
  - Evidence: `test-results/evidence/tc-03-quantity-calculation.png`

## Manual Test Results

Executed interactively in a Chromium browser instance.

- **MT-01: Empty cart checkout attempt**:
  - Steps: Opened fresh checkout, did not add products, entered "Test User" as name, clicked "Place Order".
  - Observed behavior: Alert appeared with text `"Your cart is empty. Add at least one item to place an order."`. Order confirmation was not rendered. Button text displayed `"Place Order — ₹0"`.
  - Result: **Passed**
  - Evidence: `test-results/evidence/mt-01-empty-cart.png`

- **MT-02: Rapid double-click submission**:
  - Steps: Opened fresh checkout, added Wireless Mouse, entered "Test User", rapidly double-clicked "Place Order".
  - Observed behavior: `order-confirmation` element count in DOM was 1. `order-reference` element count was 1 (reference `#WAKZXB`). Exactly one order was created.
  - Result: **Passed**
  - Evidence: `test-results/evidence/mt-02-double-click.png`

## Summary of Results

- Automated tests: 4 passed, 0 failed
- Manual tests: 2 passed, 0 failed
- Production build: Success (`npm run build` completed with code 0)

## Defect Log

**No defects were observed in the executed tests.** All validation checks, cart state updates, monetary calculations, and submission guards behaved according to the requirements.

## Known Limitations

- Cart and order state are stored only in React component memory; refreshing the page clears the data.
- The order reference is generated on the client side using a random alphanumeric string, rather than from a database sequence.
- Product list is statically defined in the frontend code.
