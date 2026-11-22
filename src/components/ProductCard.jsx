import { formatRupees } from '../utils/money'

export default function ProductCard({ product, onAdd }) {
  const { id, name, description, pricePaise, icon } = product

  return (
    <article
      data-testid={`product-card-${id}`}
      className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div
        className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-2xl shrink-0"
        aria-hidden="true"
      >
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 leading-snug">{name}</h3>
        <p className="text-sm text-gray-500 mt-0.5 truncate">{description}</p>
        <p className="text-lg font-bold text-gray-900 mt-1">{formatRupees(pricePaise)}</p>
      </div>

      <button
        type="button"
        onClick={() => onAdd(id)}
        className="shrink-0 bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-gray-700 active:scale-95 transition-all"
        aria-label={`Add ${name} to cart`}
      >
        Add to Cart
      </button>
    </article>
  )
}
