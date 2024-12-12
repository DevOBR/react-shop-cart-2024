import { createContext, useReducer } from 'react'
import { useFilters } from '../hooks/useFilters.hook'
import { cartReducer } from '../reducers/cart.reducer'
const storedCarList = JSON.parse(window.sessionStorage.getItem('shop-car'))

export const CartContext = createContext()

export function CartProvider({ children }) {
  const { filteredProducts } = useFilters()
  const [productCartList, dispatch] = useReducer(cartReducer, storedCarList)

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
