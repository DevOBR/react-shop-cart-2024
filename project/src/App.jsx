import { useEffect, useId, useState } from 'react'
import { products as productsInitiate } from './mocks/products.json'
import {
  CartIcon,
  ClearCartIcon,
  AddToCartIcon,
  RemoveFromCartIcon
} from './components/Icons.jsx'
import './App.css'

export function App() {
  const filterInputPicee = useId()
  const filterSelectCategories = useId()
  const cartCheckboxId = useId()
  const [minPrice, setMinPrice] = useState(0)
  const [category, setCategory] = useState('all')
  const [productList, setProductList] = useState()
  const [productCartList, setProductCartList] = useState([])

  const productAction = (p) => {
    const isInCart = productCartList?.some((prod) => prod.id === p.id)
    if (isInCart) {
      return (
        <>
          <button onClick={() => handleAddProdctToCart(p)}>
            <AddToCartIcon />
          </button>
          <button onClick={() => handleRemoveProdctToCart(p)}>
            <RemoveFromCartIcon />
          </button>
        </>
      )
    } else {
      return (
        <button onClick={() => handleAddProdctToCart(p)}>
          <AddToCartIcon />
        </button>
      )
    }
  }

  const handleRemoveProdctToCart = (product) => {
    const productToRemoveIndex = productCartList.findIndex(
      (p) => p.id === product.id
    )

    const newProductCartList = structuredClone(productCartList)

    if (
      productToRemoveIndex >= 0 &&
      productCartList[productToRemoveIndex].quantity > 0
    ) {
      newProductCartList[productToRemoveIndex].quantity--
      if (newProductCartList[productToRemoveIndex].quantity === 0) {
        setProductCartList(
          newProductCartList.filter(
            (p) => p.id !== newProductCartList[productToRemoveIndex].id
          )
        )
      } else {
        setProductCartList(newProductCartList)
      }
    }
  }

  const handleAddProdctToCart = (product) => {
    const productToAddIndex = productCartList.findIndex(
      (p) => p.id === product.id
    )

    const newProductCartList = structuredClone(productCartList)
    const productIndex = productList.findIndex((p) => p.id === product.id)

    if (
      productToAddIndex >= 0 &&
      productCartList[productToAddIndex].quantity <
        productList[productIndex].quantity
    ) {
      newProductCartList[productToAddIndex].quantity++
      setProductCartList(newProductCartList)
    } else if (productToAddIndex === -1) {
      // if is nww then add it
      setProductCartList([...newProductCartList, { ...product, quantity: 1 }])
    }
  }

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
              <li>
                {p.title} - Quantity {p.quantity}
              </li>
              <li>$ {p.price}</li>
              <li>
                <img src={p.thumbnail} alt={p.description} />
              </li>
              <li>{p.description}</li>
              <li className='prod-action-button'>{productAction(p)}</li>
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
          {productCartList &&
            productCartList.map((p) => (
              <li key={p.id}>
                <img src={p.thumbnail} alt={p.title} />
                <div>
                  <strong>{p.title}</strong> - ${p.price}
                </div>

                <footer>
                  <small>Quantity: {p.quantity}</small>
                  <button onClick={() => handleAddProdctToCart(p)}>+</button>
                </footer>
              </li>
            ))}
        </ul>
        <button className='clear-list' onClick={() => setProductCartList([])}>
          <ClearCartIcon />
        </button>
      </section>
    </main>
  )
}
