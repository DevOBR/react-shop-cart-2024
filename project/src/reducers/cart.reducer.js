import { CART_ACTIONS } from '../consts/const'

const actions = {
  [CART_ACTIONS.ADD]: (state, filteredProducts, product) => {
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
    } else return newProductCartList
  },
  [CART_ACTIONS.REMOVE]: (state, filteredProducts, product) => {
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
      }
    }

    return newProductCartList
  },
  [CART_ACTIONS.CLEAR]: () => []
}

export function cartReducer(state, req) {
  const { action, payload } = req
  const { product, filteredProducts } = payload

  const updateState = actions[action]
  return updateState ? updateState(state, filteredProducts, product) : state
}
