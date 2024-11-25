import { products as productsInitiate } from '../mocks/products.json'
export function useFilters({ minPrice, category }) {
  const filteredProducts = productsInitiate.filter((p) => {
    return (
      p.price >= minPrice && (p.category === category || category === 'all')
    )
  })

  return { filteredProducts }
}
