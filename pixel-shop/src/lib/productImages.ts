const modules = import.meta.glob<string>('../assets/products/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
})

const images = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => {
    const name = path.split('/').pop()?.replace(/\.[^.]+$/, '')
    return [name, url]
  })
)

export function getProductImage(id: number): string | undefined {
  return images[String(id)]
}