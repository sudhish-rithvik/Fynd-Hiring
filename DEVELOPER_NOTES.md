# Developer Notes & Technical Handover

This document outlines key technical decisions, architectural patterns, and areas to review before technical discussions.

---

## 1. Technical Decisions

### Why React?
- The project requirement specifies a component-based architecture for a single-page checkout.
- React's declarative state model makes it straightforward to maintain the cart state and re-render only the components that depend on it (e.g., cart items, order summary totals, form button text).
- Reusable components (`ProductCard`, `CartItem`, `OrderSummary`, `CheckoutForm`, `OrderConfirmation`) separate presentation from business rules.

### Why Integer Paise for Money?
- JavaScript represents numbers using IEEE 754 double-precision floating-point arithmetic. Operations like `0.1 + 0.2` result in `0.30000000000000004`.
- In ecommerce, floating-point inaccuracies cause visible display bugs (e.g., `₹1499.0000000000002`) and rounding mismatches between line totals and order totals.
- By storing and calculating all amounts as integer paise (e.g., `79900` for ₹799), all calculations are exact integer additions and multiplications.
- Conversion to rupees happens only at the display boundary inside `src/utils/money.js`.

### Why Derive Cart Totals Instead of Storing Them?
- Instead of keeping a separate `total` in React state and updating it via `useEffect` whenever items change, totals are derived during render:
  ```javascript
  const totalPaise = cartItems.reduce(
    (sum, { product, quantity }) => sum + product.pricePaise * quantity,
    0,
  )
  ```
- Storing derived values in state introduces the risk of state desynchronization and extra render cycles. Deriving directly from the `cart` object guarantees that the total is always mathematically consistent with the cart items.

### How the `useRef` Submission Lock Works
- A common bug in web forms is double submission from rapid consecutive clicks.
- Relying solely on `disabled={isSubmitting}` is vulnerable because React state updates are asynchronous and batched. If a user clicks twice in rapid succession, both click events can be fired before React has re-rendered the disabled button.
- `useRef` creates a mutable reference that persists across renders without triggering a re-render itself.
- In `handleSubmit`:
  ```javascript
  if (submittingRef.current) return
  // Validation checks...
  submittingRef.current = true
  setOrder(...)
  ```
  The check and lock assignment happen synchronously in the same event tick. Any subsequent click before or during the re-render is immediately blocked.

### Why Playwright Web-First Assertions?
- Playwright's web-first assertions (e.g., `await expect(locator).toBeVisible()`) automatically poll the DOM until the condition is met or a timeout occurs.
- This avoids arbitrary sleeps (`page.waitForTimeout()`) which make tests slow, brittle, and prone to race conditions across different machines.
- Using semantic locator strategies (`getByRole`, `getByLabel`, `getByTestId`) tests the interface the way real users and assistive technology experience it.

---

## 2. Key Edge Cases Handled

1. **Quantity lower bound**: The `-` button in the cart is disabled when quantity is 1, and the decrease handler explicitly guards against values `<= 1`.
2. **Empty cart checkout**: Submitting with an empty cart displays a clear warning and prevents submission.
3. **Blank / Whitespace-only name**: The name field is trimmed before validation, preventing submissions with spaces.
4. **Validation cleanup**: Name validation errors clear dynamically as the user types; cart validation errors clear when a product is added.
5. **Cart preservation**: If validation fails, all existing cart items, quantities, and input fields remain intact.

---

## 3. Current Limitations

- **No Persistence**: Cart and order data are held in component memory. Refreshing the browser resets the session.
- **Client-only Order Reference**: Order IDs are generated using random alphanumeric characters (`generateOrderRef()`) rather than a sequence or UUID from a backend service.
- **No Backend**: No API calls, database writes, or authentication.

---

## 4. Areas to Personally Review Before Your Interview

Make sure you are comfortable explaining and walking through the following:

- [ ] **State Flow**: How adding an item in `ProductCard` triggers `addToCart` in `App.jsx`, updates the `cart` dictionary, derives `cartItems`, and re-renders `OrderSummary`.
- [ ] **Currency Calculation**: How `pricePaise * quantity` computes the line item total, and how `formatRupees` uses integer division (`Math.floor(paise / 100)`) and remainder (`paise % 100`).
- [ ] **Ref vs. State**: Why `submittingRef` protects against double-clicks while `useState` alone cannot guarantee synchronous locking.
- [ ] **Playwright Test Runner**: How `webServer` in `playwright.config.js` coordinates with the Vite dev server, and why tests run in isolated browser contexts.
- [ ] **Tailwind v4 Setup**: Why `@tailwindcss/postcss` and `@import "tailwindcss"` are used instead of legacy Tailwind directives.
