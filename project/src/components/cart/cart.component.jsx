import { useId } from 'react'
import { CartIcon, ClearCartIcon } from '../Icons.jsx'
import './cart.component.css'
export function Cart({
  productCartList,
  handleAddProdctToCart,
  setProductCartList
}) {
  const cartCheckboxId = useId()
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
