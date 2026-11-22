export function inputClass(hasError) {
  return `w-full rounded-xl border bg-ink px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted ${
    hasError ? 'border-red-500/60 focus:border-red-400' : 'border-line focus:border-pixel'
  }`
}