import { useContext, useId } from 'react'
import { CartIcon, ClearCartIcon } from '../Icons.jsx'
import './cart.component.css'
import { CartContext } from '../../contexts/cart.context.jsx'
export function Cart() {
  const cartCheckboxId = useId()
  const { productCartList, handleAddProdctToCart, clearCartProducts } =
    useContext(CartContext)

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
        <button className='clear-list' onClick={clearCartProducts}>
          <ClearCartIcon />
        </button>
      </section>
    </>
  )
}
