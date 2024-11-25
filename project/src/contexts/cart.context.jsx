import { createContext, useState } from 'react'
import { useFilters } from '../hooks/useFilters.hook'

export const CartContext = createContext()
export function CartProvider({ children }) {
  const [productCartList, setProductCartList] = useState([])
  const { filteredProducts } = useFilters()

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
    const productIndex = filteredProducts.findIndex((p) => p.id === product.id)

    if (
      productToAddIndex >= 0 &&
      productCartList[productToAddIndex].quantity <
        filteredProducts[productIndex].quantity
    ) {
      newProductCartList[productToAddIndex].quantity++
      setProductCartList(newProductCartList)
    } else if (productToAddIndex === -1) {
      // if is nww then add it
      setProductCartList([...newProductCartList, { ...product, quantity: 1 }])
    }
  }

  const clearCartProducts = () => setProductCartList([])

  return (
    <CartContext.Provider
      value={{
        productCartList,
        handleAddProdctToCart,
        handleRemoveProdctToCart,
        clearCartProducts
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
