# Test Plan — Mini Checkout

This plan outlines the testing approach for the single-page checkout flow. It covers functional checks, monetary calculations, validation rules, and duplicate submission prevention.

## Scope

### In Scope
- Product display and cart modifications (add item, increment, decrement, delete).
- Price calculations using integer paise.
- Input validation (empty cart, missing or blank customer name).
- Double-click prevention on order submission.
- Order confirmation view and order reference display.

### Out of Scope
- Backend databases and user authentication.
- Payment gateway integration.
- Cross-browser testing beyond Chromium.

## Focus Areas & Potential Pitfalls

1. **Duplicate orders on double-click**: Users double-clicking the checkout button could create duplicate orders if the lock depends solely on asynchronous UI state.
2. **Floating-point rounding**: Direct calculations using floating-point rupee values can introduce rounding inaccuracies.
3. **Submitting empty or invalid forms**: Submitting without selecting items or without entering a name should be blocked with clear feedback.
4. **Negative or zero item quantities**: Decrementing cart items must never drop the quantity below 1.

## Test Scenarios

### TC-01: Successful Checkout Flow
- **What is tested**: Complete checkout with a valid item and customer name.
- **Why it matters**: Verifies the main purchase path works end to end.
- **How it is tested**: Automated via Playwright (`tests/checkout.spec.js`).
  1. Add Wireless Mouse (Rs 799) to cart.
  2. Enter "Jane Smith" in the Full Name input.
  3. Click "Place Order".
- **Expected outcome**:
  - The confirmation screen is shown.
  - "Jane Smith" is displayed on the receipt.
  - A non-empty order reference code is present.
  - Only one confirmation screen exists in the DOM.

### TC-02: Missing Customer Name Validation
- **What is tested**: Submitting the form with an empty name field.
- **Why it matters**: Makes sure orders cannot be placed without customer details.
- **How it is tested**: Automated via Playwright (`tests/checkout.spec.js`).
  1. Add Wireless Mouse to cart.
  2. Leave the name field blank.
  3. Click "Place Order".
- **Expected outcome**:
  - A validation message indicates that the name is required.
  - No confirmation screen is shown.
  - The cart contents and item count remain preserved.

### TC-03: Quantity Stepper & Price Calculation
- **What is tested**: Increasing item quantity and checking line totals and order totals.
- **Why it matters**: Verifies that price calculations scale correctly with quantity using integer paise.
- **How it is tested**: Automated via Playwright (`tests/checkout.spec.js`).
  1. Add Wireless Mouse (Rs 799, 79900 paise) to cart.
  2. Click the plus button to set quantity to 2.
- **Expected outcome**:
  - Displayed quantity is 2.
  - Line total displays Rs 1,598 (79,900 x 2 = 1,59,800 paise).
  - Total order price displays Rs 1,598.

### MT-01: Empty Cart Checkout Attempt
- **What is tested**: Attempting to place an order when no items have been added.
- **Why it matters**: Confirms that orders cannot be placed with an empty cart.
- **How it is tested**: Manual browser check.
  1. Open the app with an empty cart.
  2. Type a customer name.
  3. Click "Place Order".
- **Expected outcome**:
  - A warning indicates the cart is empty.
  - No order confirmation is generated.

### MT-02: Rapid Double-Click Protection
- **What is tested**: Clicking the checkout button twice in rapid succession.
- **Why it matters**: Verifies that the synchronous `useRef` lock blocks the second click before React re-renders.
- **How it is tested**: Manual browser check.
  1. Add an item and enter a customer name.
  2. Quickly double-click the "Place Order" button.
- **Expected outcome**:
  - Only one order confirmation is created.
  - Only one unique order reference is displayed.

## Test Types

- **Automated tests (TC-01 to TC-03)**: Core flows automated via Playwright for quick and consistent regression testing.
- **Manual tests (MT-01, MT-02)**: Used to manually confirm empty cart alerts and verify double-click event handling in a live browser.
