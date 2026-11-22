import { formatRupees } from '../utils/money'

export default function CheckoutForm({ customerName, onNameChange, onSubmit, errors, totalPaise }) {
  return (
    <section
      aria-label="Checkout"
      className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900 tracking-wide uppercase">Customer Details</h2>
      </div>

      <form onSubmit={onSubmit} noValidate className="px-5 py-5 space-y-4">
        {errors.cart && (
          <div
            role="alert"
            data-testid="validation-message"
            className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800"
          >
            <span aria-hidden="true" className="mt-0.5 shrink-0">⚠️</span>
            <span>{errors.cart}</span>
          </div>
        )}

        <div>
          <label
            htmlFor="customer-name"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Full Name
            <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>
          </label>
          <input
            id="customer-name"
            data-testid="customer-name"
            type="text"
            value={customerName}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Enter your full name"
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={`w-full px-3.5 py-2.5 border rounded-lg text-sm text-gray-900 placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition
                        ${errors.name
                          ? 'border-red-400 bg-red-50 focus:ring-red-400'
                          : 'border-gray-300 bg-white'
                        }`}
          />
          {errors.name && (
            <p
              id="name-error"
              role="alert"
              data-testid="validation-message"
              className="mt-1.5 flex items-center gap-1 text-xs text-red-600"
            >
              <span aria-hidden="true">●</span>
              {errors.name}
            </p>
          )}
        </div>

        <button
          type="submit"
          data-testid="place-order"
          className="w-full bg-gray-900 text-white font-semibold py-3 px-4 rounded-lg
                     hover:bg-gray-700 active:scale-[0.98] transition-all
                     flex items-center justify-center gap-2"
        >
          <span aria-hidden="true">🛍️</span>
          Place Order — {formatRupees(totalPaise)}
        </button>
      </form>
    </section>
  )
}
