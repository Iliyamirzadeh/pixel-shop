export function formatPrice(price: number) {
  return price.toLocaleString('fa-IR')
}

export function formatDate(isoString: string) {
  return new Date(isoString).toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatOrderCode(id: number) {
  return `PX-${String(id).padStart(5, '0')}`
}