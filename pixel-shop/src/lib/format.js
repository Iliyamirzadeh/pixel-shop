export function formatPrice(price) {
  return price.toLocaleString('fa-IR')
}

export function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatOrderCode(id) {
  return `PX-${String(id).padStart(5, '0')}`
}