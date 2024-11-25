import { useContext, useId } from 'react'
import './filters.component.css'
import { FiltersContext } from '../../contexts/filter.context'

export function Filters() {
  const { filters, setFilters } = useContext(FiltersContext)
  const filterInputPicee = useId()
  const filterSelectCategories = useId()

  const handleMinPrice = (e) => {
    setFilters({ ...filters, minPrice: e.target.value })
  }

  const handleCategory = (e) => {
    setFilters({ ...filters, category: e.target.value })
  }

  return (
    <section className='filters'>
      <div>
        <label htmlFor={filterInputPicee}>Price</label>
        <input
          id={filterInputPicee}
          type='range'
          min='0'
          max='1000'
          value={filters.minPrice}
          onChange={handleMinPrice}
        />
        <span>${filters.minPrice}</span>
      </div>
      <div>
        <label htmlFor={filterSelectCategories}>Categories</label>
        <select
          name='categories'
          id={filterSelectCategories}
          onChange={handleCategory}
          value={filters.category}
        >
          <option value='all'>All</option>
          <option value='laptops'>Laptops</option>
          <option value='sunglasses'>Sunglasses</option>
          <option value='smartphones'>Smartphones</option>
        </select>
      </div>
    </section>
  )
}
