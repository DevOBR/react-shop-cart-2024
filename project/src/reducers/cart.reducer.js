import { CART_ACTIONS } from '../consts/const'

const actions = {
  [CART_ACTIONS.ADD]: (state, filteredProducts, product) => {
    const productToAddIndex = state.findIndex((p) => p.id === product.id)
    let newProductCartList = structuredClone(state)
    const productIndex = filteredProducts.findIndex((p) => p.id === product.id)
    if (
      productToAddIndex >= 0 &&
      newProductCartList[productToAddIndex].quantity <
        filteredProducts[productIndex].quantity
    ) {
      newProductCartList[productToAddIndex].quantity++
    } else if (productToAddIndex === -1) {
      // if is nww then add it
      newProductCartList = [...newProductCartList, { ...product, quantity: 1 }]
    }

    window.sessionStorage.setItem(
      'shop-car',
      JSON.stringify(newProductCartList)
    )
    return newProductCartList
  },
  [CART_ACTIONS.REMOVE]: (state, filteredProducts, product) => {
    const productToRemoveIndex = state.findIndex((p) => p.id === product.id)
    let newProductCartList = structuredClone(state)

    if (
      productToRemoveIndex >= 0 &&
      newProductCartList[productToRemoveIndex].quantity > 0
    ) {
      newProductCartList[productToRemoveIndex].quantity--
      if (newProductCartList[productToRemoveIndex].quantity === 0) {
        newProductCartList = newProductCartList.filter(
          (p) => p.id !== newProductCartList[productToRemoveIndex].id
        )
      }
    }
    window.sessionStorage.setItem(
      'shop-car',
      JSON.stringify(newProductCartList)
    )
    return newProductCartList
  },
  [CART_ACTIONS.CLEAR]: () => {
    window.sessionStorage.removeItem('shop-car')
    return []
  }
}

export function cartReducer(state, req) {
  const { action, payload } = req
  const { product, filteredProducts } = payload

  const updateState = actions[action]
  return updateState ? updateState(state, filteredProducts, product) : state
}
