// Formats integer paise into INR currency display format (e.g., 79900 -> "₹799")
export function formatRupees(paise) {
  const rupees = Math.floor(paise / 100)
  const remainder = paise % 100
  if (remainder === 0) {
    return `₹${rupees.toLocaleString('en-IN')}`
  }
  const decimal = String(remainder).padStart(2, '0')
  return `₹${rupees.toLocaleString('en-IN')}.${decimal}`
}
