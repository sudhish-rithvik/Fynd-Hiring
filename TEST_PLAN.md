# Test Plan — Mini Checkout

This test plan defines the testing strategy for the single-page checkout application. It focuses on functional correctness, monetary accuracy, input validation, and race conditions around duplicate order submission.

## Scope

### In Scope
- Product display and cart operations (add, increment, decrement, remove).
- Cart price calculation and total computation using integer paise.
- Customer name input validation and empty cart handling.
- Prevention of duplicate order submission under rapid clicks.
- Order confirmation rendering with customer name and order reference.

### Out of Scope
- Backend database persistence and authentication.
- Real payment gateway processing.
- Cross-browser matrix testing (Chromium is the target browser).

## Critical Risks and Focus Areas

1. **Duplicate Orders on Rapid Clicks**: A user rapidly clicking "Place Order" could trigger multiple order creations if the submission lock relies only on asynchronous state updates.
2. **Floating-point Rounding Errors**: Performing price multiplication or addition with floating-point rupees can cause precision artifacts (e.g., 0.1 + 0.2 = 0.30000000000000004).
3. **Checkout with Empty Cart or Blank Name**: Users submitting invalid form states could bypass validation if boundaries are not strictly checked.
4. **Invalid Cart Quantities**: Decreasing an item count below 1 could cause zero or negative values in the order total.

## Test Scenarios

### TC-01: Successful Checkout Flow
- **What is being tested**: End-to-end checkout completion with valid cart items and customer name.
- **Why it is important**: Validates the core happy path required for a customer to complete an order.
- **How it is tested**: Automated via Playwright (`tests/checkout.spec.js`).
  1. Add Wireless Mouse (₹799) to cart.
  2. Enter "Jane Smith" into Full Name field.
  3. Click "Place Order".
- **Expected result**:
  - The order confirmation component is displayed.
  - The customer's name is shown.
  - A unique, non-empty order reference number is displayed.
  - Exactly one confirmation screen exists in the DOM.

### TC-02: Missing Customer Name Validation
- **What is being tested**: Form validation when attempting to place an order without entering a name.
- **Why it is important**: Ensures incomplete orders cannot be placed and informs the user what needs correction.
- **How it is tested**: Automated via Playwright (`tests/checkout.spec.js`).
  1. Add Wireless Mouse to cart.
  2. Leave the Full Name field blank.
  3. Click "Place Order".
- **Expected result**:
  - A visible validation message appears stating the name is required.
  - No order confirmation is rendered.
  - Existing cart contents and quantities are preserved.

### TC-03: Quantity Stepper and Price Calculation
- **What is being tested**: Incrementing item quantity and verifying unit, line item, and overall order totals.
- **Why it is important**: Verifies that integer-paise calculations scale correctly with quantity and format cleanly into rupees.
- **How it is tested**: Automated via Playwright (`tests/checkout.spec.js`).
  1. Add Wireless Mouse (₹799, 79,900 paise) to cart.
  2. Increase quantity to 2.
- **Expected result**:
  - Displayed quantity updates to 2.
  - Line total reflects ₹1,598 (79,900 × 2 = 1,59,800 paise).
  - Order total in the summary reflects ₹1,598.

### MT-01: Empty Cart Checkout Attempt
- **What is being tested**: Behavior when submitting the checkout form with no items in the cart.
- **Why it is important**: Confirms that orders cannot be placed without products, even if a customer name is filled in.
- **How it is tested**: Manual test in a browser.
  1. Open a fresh session with an empty cart.
  2. Enter a customer name.
  3. Click "Place Order".
- **Expected result**:
  - An alert appears indicating that the cart is empty.
  - No order is placed and no confirmation screen appears.

### MT-02: Rapid Double-Click Submission Protection
- **What is being tested**: Synchronous submission lock behavior under rapid consecutive clicks.
- **Why it is important**: Verifies that the `useRef` lock blocks the second event immediately, preventing duplicate orders before React re-renders.
- **How it is tested**: Manual test in a browser.
  1. Add an item to cart and enter a name.
  2. Trigger a rapid double-click on the "Place Order" button.
- **Expected result**:
  - Only one order confirmation is rendered.
  - Only one order reference is generated.

## Automation vs. Manual Rationale

- **Automated (TC-01, TC-02, TC-03)**: Standard, repeatable flows that benefit from regression testing on every build.
- **Manual (MT-01, MT-02)**: Used for exploratory validation and checking rapid event timing in a live browser session.
