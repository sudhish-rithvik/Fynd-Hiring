# Mini Checkout and Browser Test Suite

**CHECK** — *Fast, simple and secure checkout*

A single-page checkout flow built with React, Vite, and Tailwind CSS. The app includes a product list, cart adjustments, basic form validation, and duplicate order prevention, tested with Playwright.

## Features

- Product catalogue with two items: Wireless Mouse (Rs 799) and Mechanical Keyboard (Rs 1,499).
- Cart interactions: add to cart, increase/decrease quantities, remove items.
- Minimum quantity guard (stepper stops at 1; items can be removed via the remove button).
- Monetary calculations handled in integer paise to avoid JavaScript floating point errors.
- Name input validation with real-time error clearing when typed.
- Empty cart check preventing checkout submission.
- Double-click protection on the checkout button using a synchronous ref lock.
- Order confirmation view showing order ID, customer name, purchased items, and total.

## Tech Stack

- React 19
- Vite
- Tailwind CSS v4
- Playwright

## Project Layout

```text
src/
  components/
    ProductCard.jsx        # Product listing item
    CartItem.jsx           # Cart entry with stepper controls
    OrderSummary.jsx       # Order items and calculated total
    CheckoutForm.jsx       # Name input and checkout action
    OrderConfirmation.jsx  # Success screen with receipt details
  data/
    products.js            # Product catalogue list
  utils/
    money.js               # Paise to rupees display formatter
  App.jsx                  # Main page and state handler
  main.jsx                 # Entry point
tests/
  checkout.spec.js         # Playwright end-to-end checkout tests
  smoke.spec.js            # Initial page load smoke test
test-results/
  evidence/                # Test screenshots
```

## Setup and Running

### Prerequisites

Node.js v18 or later.

### Install dependencies

```bash
npm install
npx playwright install chromium
```

### Start dev server

```bash
npm run dev
```

The app will run locally at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

## Running Tests

Run all Playwright tests in headless mode (auto-starts the Vite dev server):

```bash
npm test
```

Run tests with Playwright UI:

```bash
npm run test:ui
```

View the latest HTML test report:

```bash
npm run test:report
```

## Notes & Limitations

- State is kept in React component memory. Refreshing the browser resets the cart and form.
- No real payment gateway or backend API is attached; submission is handled entirely client-side.
- Order reference numbers are generated randomly in the frontend for demo purposes.
