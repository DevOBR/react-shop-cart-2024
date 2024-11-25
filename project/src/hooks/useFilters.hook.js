import { useContext } from 'react'
import { products as productsInitiate } from '../mocks/products.json'
import { FiltersContext } from '../contexts/filter.context'

export function useFilters() {
  const { filters } = useContext(FiltersContext)

  const filteredProducts = productsInitiate.filter((p) => {
    return (
      p.price >= filters.minPrice &&
      (p.category === filters.category || filters.category === 'all')
    )
  })

  return { filteredProducts }
}
