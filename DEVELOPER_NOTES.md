# Developer Notes — Mini Checkout and Browser Test Suite (CHECK)

This document covers the reasoning behind implementation decisions, how edge cases are handled, and talking points for a code walkthrough.

---

## Technical Decisions

### Why React?
The assignment required a single-page checkout with modular components. React provides clean state management for this: when the cart changes, the cart list, order summary, and place order button re-render predictably based on common state.

### Why use integer paise instead of floating-point numbers?
Standard JavaScript numbers follow IEEE 754 floating-point arithmetic. Operations like `0.1 + 0.2` return `0.30000000000000004`. In e-commerce, storing prices as fractional rupees easily introduces rounding errors into line items and total amounts. 

By storing prices in paise (for example `79900` for Rs 799 and `149900` for Rs 1,499), all additions and multiplications remain standard integer math. Formatting into rupees (`formatRupees`) is done only when presenting the value in the UI.

### Why derive totals instead of saving them in state?
Instead of tracking `total` in state and using a `useEffect` to synchronize it whenever `cart` changes, `totalPaise` is calculated directly during render:

```javascript
const totalPaise = cartItems.reduce(
  (sum, { product, quantity }) => sum + product.pricePaise * quantity,
  0,
)
```

Deriving the total guarantees it never goes out of sync with cart items, removes the need for redundant state, and avoids an extra render cycle.

### How does the useRef duplicate submission lock work?
Disabling a submit button using React state (`disabled={isSubmitting}`) is not completely safe against very fast double-clicks. Because React state updates and re-renders are scheduled asynchronously, two rapid clicks can fire before React has re-rendered the button into a disabled state.

To guard against this, `submittingRef = useRef(false)` is used as a synchronous lock:

```javascript
if (submittingRef.current) return

// Validate inputs...

submittingRef.current = true
setOrder(...)
```

The check and assignment run synchronously in the same execution tick. Any immediate second click hitting the handler is blocked before a second order can be initiated.

### Why Playwright web-first assertions?
Instead of adding fixed delay timers (like `waitForTimeout`), Playwright's web-first assertions (`await expect(locator).toBeVisible()`) poll the DOM until the condition passes or times out. This makes the tests less flaky across different machine speeds.

---

## Handled Edge Cases

1. **Cart quantity floor**: Decrementing an item stops at 1 (the minus button disables). To remove an item completely, the user must click the explicit remove (`X`) button.
2. **Empty cart submission**: Attempting to checkout with an empty cart shows a warning message and blocks submission.
3. **Whitespace-only customer name**: Customer name input is trimmed before checking (`!customerName.trim()`), preventing submissions with spaces.
4. **Validation cleanup**: Name validation clears as soon as the user starts typing valid text; cart validation clears as soon as an item is added.
5. **State preservation on error**: If submission fails validation, existing cart items and entered text remain intact.

---

## Current Scope & Limitations

- **In-memory state**: Refreshing the browser resets the session.
- **Client-only order reference**: Order IDs are generated using a random alphanumeric string (`#XXXXXX`) on the client side.
- **No external services**: Payment gateways, user accounts, and persistent backend storage were deliberately omitted in accordance with the project prompt.

---

## Quick Review Checklist for Interviews

- [ ] Be ready to walk through how adding an item in `ProductCard` updates the `cart` state in `App.jsx`, derives `cartItems`, and updates `OrderSummary`.
- [ ] Understand why `pricePaise * quantity` prevents float precision issues and how `formatRupees` works.
- [ ] Be able to explain why `useRef` handles race-condition double clicks better than `useState` alone.
- [ ] Know how `playwright.config.js` uses `webServer` to run tests against the local Vite development build.
