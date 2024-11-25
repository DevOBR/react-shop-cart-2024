import { useId } from 'react'
import './filters.component.css'

export function Filters({
  minPrice,
  category,
  handleMinPrice,
  handleCategory
}) {
  const filterInputPicee = useId()
  const filterSelectCategories = useId()

  return (
    <section className='filters'>
      <div>
        <label htmlFor={filterInputPicee}>Price</label>
        <input
          id={filterInputPicee}
          type='range'
          min='0'
          max='1000'
          value={minPrice}
          onChange={handleMinPrice}
        />
        <span>${minPrice}</span>
      </div>
      <div>
        <label htmlFor={filterSelectCategories}>Categories</label>
        <select
          name='categories'
          id={filterSelectCategories}
          onChange={handleCategory}
          value={category}
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
