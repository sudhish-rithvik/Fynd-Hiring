import { formatRupees } from '../utils/money'

export default function OrderConfirmation({ order, onBackToHome }) {
  const { ref, customerName, totalPaise, items } = order

  return (
    <div
      data-testid="order-confirmation"
      className="max-w-lg mx-auto text-center"
    >
      <div
        className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
        aria-hidden="true"
      >
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        Thank you for your purchase
      </h1>

      <p className="text-gray-500 leading-relaxed mb-1">
        We've received your order and will ship it in 5–7 business days.
      </p>
      <p className="text-gray-500 mb-2">
        Ordered by{' '}
        <span className="font-medium text-gray-800">{customerName}</span>
      </p>
      <p className="text-gray-500 mb-8">
        Your order number is{' '}
        <span
          data-testid="order-reference"
          className="font-bold text-gray-900 tracking-wide"
        >
          {ref}
        </span>
      </p>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm text-left overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Order Summary</h2>
        </div>

        <div className="px-6">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex items-center justify-between py-3.5 border-b border-gray-100 last:border-0"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{product.name}</p>
                {quantity > 1 && (
                  <p className="text-xs text-gray-400 mt-0.5">× {quantity}</p>
                )}
              </div>
              <span className="text-sm font-semibold text-gray-900 tabular-nums">
                {formatRupees(product.pricePaise * quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <span className="font-semibold text-gray-900">Total</span>
          <span className="text-lg font-bold text-gray-900 tabular-nums">
            {formatRupees(totalPaise)}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onBackToHome}
        className="border border-gray-900 text-gray-900 font-medium px-8 py-2.5 rounded-lg
                   hover:bg-gray-100 active:scale-95 transition-all"
      >
        Back to Home
      </button>
    </div>
  )
}
