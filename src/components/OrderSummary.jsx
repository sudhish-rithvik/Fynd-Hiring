import CartItem from './CartItem'
import { formatRupees } from '../utils/money'

export default function OrderSummary({ cartItems, totalPaise, onIncrease, onDecrease, onRemove }) {
  const isEmpty = cartItems.length === 0

  return (
    <section
      aria-label="Order Summary"
      className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900 tracking-wide uppercase">Order Summary</h2>
      </div>

      <div className="px-5">
        {isEmpty ? (
          <div className="py-10 text-center">
            <p className="text-3xl mb-2" aria-hidden="true">🛒</p>
            <p className="text-sm text-gray-400">Your cart is empty</p>
          </div>
        ) : (
          <div>
            {cartItems.map(({ product, quantity }) => (
              <CartItem
                key={product.id}
                product={product}
                quantity={quantity}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onRemove={onRemove}
              />
            ))}
          </div>
        )}
      </div>

      <div className="px-5 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">Total</span>
        <span
          data-testid="order-total"
          className="text-xl font-bold text-gray-900 tabular-nums"
        >
          {formatRupees(totalPaise)}
        </span>
      </div>
    </section>
  )
}
