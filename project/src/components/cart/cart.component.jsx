import { useContext, useId } from 'react'
import { CartIcon, ClearCartIcon } from '../Icons.jsx'
import { CartContext } from '../../contexts/cart.context.jsx'
import './cart.component.css'

export function Cart() {
  const cartCheckboxId = useId()
  const { productCartList, handler } = useContext(CartContext)

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
                  <button onClick={() => handler('add', p)}>+</button>
                </footer>
              </li>
            ))}
        </ul>
        <button className='clear-list' onClick={() => handler('clear')}>
          <ClearCartIcon />
        </button>
      </section>
    </>
  )
}
