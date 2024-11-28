export function cartReducer(state, req) {
  const { action, payload } = req
  const { product, filteredProducts } = payload

  if (action === 'add') {
    const productToAddIndex = state.findIndex((p) => p.id === product.id)
    const newProductCartList = structuredClone(state)
    const productIndex = filteredProducts.findIndex((p) => p.id === product.id)

    if (
      productToAddIndex >= 0 &&
      newProductCartList[productToAddIndex].quantity <
        filteredProducts[productIndex].quantity
    ) {
      newProductCartList[productToAddIndex].quantity++
      return newProductCartList
    } else if (productToAddIndex === -1) {
      // if is nww then add it
      return [...newProductCartList, { ...product, quantity: 1 }]
    }
  } else if (action === 'remove') {
    const productToRemoveIndex = state.findIndex((p) => p.id === product.id)

    const newProductCartList = structuredClone(state)

    if (
      productToRemoveIndex >= 0 &&
      newProductCartList[productToRemoveIndex].quantity > 0
    ) {
      newProductCartList[productToRemoveIndex].quantity--
      if (newProductCartList[productToRemoveIndex].quantity === 0) {
        return newProductCartList.filter(
          (p) => p.id !== newProductCartList[productToRemoveIndex].id
        )
      } else {
        return newProductCartList
      }
    }
  } else if (action === 'clear') {
    return []
  }
  return state
}
