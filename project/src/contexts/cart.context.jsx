import { createContext, useReducer } from 'react'
import { useFilters } from '../hooks/useFilters.hook'
import { cartReducer } from '../reducers/cart.reducer'

export const CartContext = createContext()

export function CartProvider({ children }) {
  const { filteredProducts } = useFilters()
  const [productCartList, dispatch] = useReducer(cartReducer, [])

  const handler = (action, product) => {
    dispatch({
      action,
      payload: {
        product,
        filteredProducts
      }
    })
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
