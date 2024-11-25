import { Products } from './components/products/products.component.jsx'
import { Cart } from './components/cart/cart.component.jsx'
import { useFilters } from './hooks/useFilters.hook.js'
import './App.css'
import { CartProvider } from './contexts/cart.context.jsx'

export function App() {
  const { filteredProducts } = useFilters()

  return (
    <main>
      <CartProvider>
        <Products products={filteredProducts} />
        <Cart />
      </CartProvider>
    </main>
  )
}
