import { createContext, useReducer } from 'react'
import { useFilters } from '../hooks/useFilters.hook'
import { cartReducer } from '../reducers/cart.reducer'
export const CartContext = createContext()

export function CartProvider({ children }) {
  const { filteredProducts } = useFilters()
  const [productCartList, dispatch] = useReducer(cartReducer, [])

  const handleRemoveProdctToCart = (product) => {
    dispatch({
      action: 'remove',
      payload: {
        product,
        filteredProducts
      }
    })
  }

  const handleAddProdctToCart = (product) => {
    dispatch({
      action: 'add',
      payload: {
        product,
        filteredProducts
      }
    })
  }

  const clearCartProducts = () =>
    dispatch({
      action: 'clear',
      payload: {
        product: null,
        filteredProducts
      }
    })

  const handler = (action, product) => {
    switch (action) {
      case 'add':
        handleAddProdctToCart(product)
        break
      case 'remove':
        handleRemoveProdctToCart(product)
        break
      case 'clear':
        clearCartProducts()
        break
    }
  }

  return (
    <CartContext.Provider
      value={{
        productCartList,
        handler
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
