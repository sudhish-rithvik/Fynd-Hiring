import { useState, useRef } from 'react'
import { PRODUCTS } from './data/products'
import ProductCard from './components/ProductCard'
import OrderSummary from './components/OrderSummary'
import CheckoutForm from './components/CheckoutForm'
import OrderConfirmation from './components/OrderConfirmation'

function generateOrderRef() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let ref = '#'
  for (let i = 0; i < 6; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

export default function App() {
  const [cart, setCart] = useState({})
  const [customerName, setCustomerName] = useState('')
  const [errors, setErrors] = useState({})
  const [order, setOrder] = useState(null)

  // Synchronous lock to prevent duplicate submissions before React re-renders
  const submittingRef = useRef(false)

  const addToCart = (productId) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] ?? 0) + 1,
    }))
    setErrors((prev) => ({ ...prev, cart: undefined }))
  }

  const increaseQty = (productId) => {
    setCart((prev) => ({ ...prev, [productId]: prev[productId] + 1 }))
  }

  const decreaseQty = (productId) => {
    setCart((prev) => {
      const current = prev[productId] ?? 0
      if (current <= 1) return prev
      return { ...prev, [productId]: current - 1 }
    })
  }

  const removeFromCart = (productId) => {
    setCart((prev) => {
      const next = { ...prev }
      delete next[productId]
      return next
    })
  }

  // Derive cart items and totals directly from state instead of syncing in effects
  const cartItems = PRODUCTS
    .filter((p) => (cart[p.id] ?? 0) > 0)
    .map((p) => ({ product: p, quantity: cart[p.id] }))

  const totalPaise = cartItems.reduce(
    (sum, { product, quantity }) => sum + product.pricePaise * quantity,
    0,
  )

  const cartIsEmpty = cartItems.length === 0

  const handleNameChange = (value) => {
    setCustomerName(value)
    if (value.trim()) {
      setErrors((prev) => ({ ...prev, name: undefined }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Block immediately if already submitting in this tick
    if (submittingRef.current) return

    const newErrors = {}
    if (cartIsEmpty) {
      newErrors.cart = 'Your cart is empty. Add at least one item to place an order.'
    }
    if (!customerName.trim()) {
      newErrors.name = 'Please enter your name to continue.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Set lock synchronously before triggering state update
    submittingRef.current = true

    setOrder({
      ref: generateOrderRef(),
      customerName: customerName.trim(),
      totalPaise,
      items: cartItems,
    })
  }

  const handleBackToHome = () => {
    submittingRef.current = false
    setOrder(null)
    setCart({})
    setCustomerName('')
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Mini Checkout
          </h1>
          <span className="text-sm text-gray-500 flex items-center gap-1.5">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Secure Checkout
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {order ? (
          <OrderConfirmation order={order} onBackToHome={handleBackToHome} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
            <div className="lg:col-span-3 space-y-5">
              <section aria-label="Products">
                <h2 className="text-xs font-semibold text-gray-500 tracking-widest uppercase mb-3 px-1">
                  Products
                </h2>
                <div className="space-y-3">
                  {PRODUCTS.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAdd={addToCart}
                    />
                  ))}
                </div>
              </section>

              <CheckoutForm
                customerName={customerName}
                onNameChange={handleNameChange}
                onSubmit={handleSubmit}
                errors={errors}
                totalPaise={totalPaise}
              />
            </div>

            <div className="lg:col-span-2">
              <div className="sticky top-6">
                <h2 className="text-xs font-semibold text-gray-500 tracking-widest uppercase mb-3 px-1">
                  Your Cart
                </h2>
                <OrderSummary
                  cartItems={cartItems}
                  totalPaise={totalPaise}
                  onIncrease={increaseQty}
                  onDecrease={decreaseQty}
                  onRemove={removeFromCart}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
