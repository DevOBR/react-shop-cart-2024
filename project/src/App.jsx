import { useEffect, useState } from 'react'
import { products as productsInitiate } from './mocks/products.json'
import { AddToCartIcon, RemoveFromCartIcon } from './components/Icons.jsx'
import { Products } from './components/products/products.component.jsx'
import { Filters } from './components/filters/filters.component.jsx'
import { Cart } from './components/cart/cart.component.jsx'
import './App.css'

export function App() {
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
      <Filters
        minPrice={minPrice}
        category={category}
        handleMinPrice={handleMinPrice}
        handleCategory={handleCategory}
      />
      <Products products={productList} productAction={productAction} />
      <Cart
        productCartList={productCartList}
        handleAddProdctToCart={handleAddProdctToCart}
        setProductCartList={setProductCartList}
      />
    </main>
  )
}
