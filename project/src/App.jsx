import { useState } from 'react'
import { Products } from './components/products/products.component.jsx'
import { Filters } from './components/filters/filters.component.jsx'
import { Cart } from './components/cart/cart.component.jsx'
import { useFilters } from './hooks/useFilters.hook.js'
import './App.css'

export function App() {
  const [minPrice, setMinPrice] = useState(0)
  const [category, setCategory] = useState('all')
  const [productCartList, setProductCartList] = useState([])
  const { filteredProducts } = useFilters({ minPrice, category })

  return (
    <main>
      <Filters
        minPrice={minPrice}
        category={category}
        setMinPrice={setMinPrice}
        setCategory={setCategory}
      />
      <Products
        products={filteredProducts}
        productCartList={productCartList}
        setProductCartList={setProductCartList}
      />
      <Cart
        productCartList={productCartList}
        filteredProducts={filteredProducts}
        setProductCartList={setProductCartList}
      />
    </main>
  )
}
