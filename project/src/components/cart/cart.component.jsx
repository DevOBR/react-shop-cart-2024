import { useId } from 'react'
import { CartIcon, ClearCartIcon } from '../Icons.jsx'
import './cart.component.css'
export function Cart({
  productCartList,
  filteredProducts,
  setProductCartList
}) {
  const cartCheckboxId = useId()

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

  return (
    <>
      <input type='checkbox' id={cartCheckboxId} hidden />
      <label htmlFor={cartCheckboxId} className='cart-button'>
        <CartIcon />
      </label>
      <section className='cart'>
        <ul>
          {productCartList &&
            productCartList.map((p) => (
              <li key={p.id}>
                <img src={p.thumbnail} alt={p.title} />
                <div>
                  <strong>{p.title}</strong> - ${p.price}
                </div>

                <footer>
                  <small>Quantity: {p.quantity}</small>
                  <button onClick={() => handleAddProdctToCart(p)}>+</button>
                </footer>
              </li>
            ))}
        </ul>
        <button className='clear-list' onClick={() => setProductCartList([])}>
          <ClearCartIcon />
        </button>
      </section>
    </>
  )
}
