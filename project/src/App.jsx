import { useEffect, useId, useState } from 'react'
import { products as productsInitiate } from './mocks/products.json'
import { CartIcon, ClearCartIcon, AddToCartIcon } from './components/Icons.jsx'
import './App.css'

export function App() {
  const filterInputPicee = useId()
  const filterSelectCategories = useId()
  const cartCheckboxId = useId()
  const [minPrice, setMinPrice] = useState(0)
  const [category, setCategory] = useState('all')
  const [productList, setProductList] = useState()
  const handleMinPrice = (e) => {
    setMinPrice(e.target.value)
  }

  const handleCategory = (e) => {
    setCategory(e.target.value)
  }

  useEffect(() => {
    const filteredProducts = productsInitiate.filter((p) => {
      return (
        p.price >= minPrice && (p.category === category || category === 'all')
      )
    })

    setProductList(filteredProducts)
  }, [minPrice, category])

  return (
    <main>
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
            <option value='sunglasses'>sunglasses</option>
            <option value='smartphones'>Smartphones</option>
          </select>
        </div>
      </section>
      <section className='products'>
        {productList &&
          productList.map((p) => (
            <ul key={p.id}>
              <li>{p.title}</li>
              <li>$ {p.price}</li>
              <li>
                <img src={p.thumbnail} alt={p.description} />
              </li>
              <li>{p.description}</li>
              <li className='prod-action-button'>
                <p>Quantity - {p.quantity}</p>
                <button>
                  <AddToCartIcon />
                </button>
              </li>
            </ul>
          ))}
      </section>

      {/* cart */}
      <label htmlFor={cartCheckboxId} className='cart-button'>
        <CartIcon />
      </label>
      <input type='checkbox' id={cartCheckboxId} hidden />
      <section className='cart'>
        <ul>
          {productList &&
            productList.map((p) => (
              <li key={p.id}>
                <img src={p.thumbnail} alt={p.title} />
                <div>
                  <strong>{p.title}</strong> - ${p.price}
                </div>

                <footer>
                  <small>Qty: 1</small>
                  <button>+</button>
                </footer>
              </li>
            ))}
        </ul>
        <button className='clear-list'>
          <ClearCartIcon />
        </button>
      </section>
    </main>
  )
}
