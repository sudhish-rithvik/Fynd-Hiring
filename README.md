# Mini Checkout

A single-page checkout interface built for an engineering hiring assignment. The app simulates an ecommerce checkout flow with a shopping cart, customer validation, order placement, and automated end-to-end tests using Playwright.

## Features

- **Product Catalogue**: Two synthetic items (Wireless Mouse at ₹799, Mechanical Keyboard at ₹1,499).
- **Shopping Cart**: Add products, adjust quantities (stepper guarded against values <= 0), remove items, and view line-item totals.
- **Derived Order Total**: Totals are calculated on the fly in integer paise to avoid JavaScript floating-point errors.
- **Form Validation**: Requires non-whitespace customer name and at least one cart item before placing an order. Validation errors clear once corrected.
- **Duplicate Order Protection**: Uses a synchronous `useRef` lock on submission to prevent multiple orders if the place order button is clicked repeatedly before React re-renders.
- **Order Confirmation**: Displays order reference number, customer name, purchased items summary, and final total.

## Technology Used

- **React 19**: Component state and rendering
- **Vite 6**: Local development server and production bundler
- **Tailwind CSS v4**: UI styling and responsive layouts
- **Playwright**: End-to-end browser automation

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── ProductCard.jsx       # Catalogue item card
│   │   ├── CartItem.jsx          # Cart row with stepper and remove button
│   │   ├── OrderSummary.jsx      # Summary list and calculated total
│   │   ├── CheckoutForm.jsx      # Customer details and submission
│   │   └── OrderConfirmation.jsx # Post-purchase confirmation screen
│   ├── data/
│   │   └── products.js           # Catalogue data with integer paise pricing
│   ├── utils/
│   │   └── money.js              # Currency formatting helper
│   ├── App.jsx                   # Main layout and cart/order state
│   ├── index.css                 # Tailwind stylesheet
│   └── main.jsx                  # React DOM entry point
├── tests/
│   ├── checkout.spec.js          # Core checkout flow tests (TC-01, TC-02, TC-03)
│   └── smoke.spec.js             # Basic app load test
├── test-results/
│   └── evidence/                 # Screenshots from automated and manual runs
├── playwright.config.js          # Playwright runner and dev server settings
├── TEST_PLAN.md                  # Test scenarios and QA strategy
├── TEST_RESULTS.md               # Actual execution logs and findings
└── DEVELOPER_NOTES.md            # Technical decisions and review notes
```

## Installation

Ensure Node.js (v18+) is installed.

```bash
git clone <repo-url>
cd "Fynd Hiring"
npm install
npx playwright install chromium
```

## Running Locally

Start the Vite development server:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

To generate a production build:

```bash
npm run build
```

## Running Browser Tests

Run all Playwright tests (Playwright automatically launches the local dev server if it is not already running):

```bash
npm test
```

To run tests in interactive UI mode:

```bash
npm run test:ui
```

To view the generated HTML report:

```bash
npm run test:report
```

## Known Limitations

- **Client-only State**: The cart and placed orders are stored in React component memory; refreshing the page resets the app.
- **Simulated Checkout**: No external payment gateway, authentication, or persistent backend database is integrated.
- **Fixed Catalogue**: The catalogue is static and limited to the two specified hardware products.
