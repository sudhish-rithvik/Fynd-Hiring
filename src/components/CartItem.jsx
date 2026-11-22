import { formatRupees } from '../utils/money'

export default function CartItem({ product, quantity, onIncrease, onDecrease, onRemove }) {
  const { id, name, pricePaise } = product
  const lineTotalPaise = pricePaise * quantity

  return (
    <div
      data-testid={`cart-item-${id}`}
      className="flex items-center gap-3 py-3.5 border-b border-gray-100 last:border-0"
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 leading-snug truncate">{name}</p>
        <p className="text-xs text-gray-400 mt-0.5">{formatRupees(pricePaise)} each</p>
      </div>

      <div className="flex items-center gap-1.5 shrink-0" role="group" aria-label={`Quantity for ${name}`}>
        <button
          type="button"
          onClick={() => onDecrease(id)}
          disabled={quantity <= 1}
          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 text-sm
                     hover:bg-gray-100 active:bg-gray-200 transition-colors
                     disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label={`Decrease quantity of ${name}`}
        >
          −
        </button>

        <span
          className="w-5 text-center text-sm font-semibold text-gray-900 tabular-nums"
          aria-label={`${quantity} in cart`}
        >
          {quantity}
        </span>

        <button
          type="button"
          onClick={() => onIncrease(id)}
          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 text-sm
                     hover:bg-gray-100 active:bg-gray-200 transition-colors"
          aria-label={`Increase quantity of ${name}`}
        >
          +
        </button>
      </div>

      <div className="shrink-0 w-16 text-right">
        <p className="text-sm font-semibold text-gray-900 tabular-nums">{formatRupees(lineTotalPaise)}</p>
      </div>

      <button
        type="button"
        onClick={() => onRemove(id)}
        className="shrink-0 w-6 h-6 flex items-center justify-center rounded text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
        aria-label={`Remove ${name} from cart`}
      >
        ✕
      </button>
    </div>
  )
}
