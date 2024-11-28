import { useContext } from 'react'
import { Filters } from '../filters/filters.component.jsx'
import { AddToCartIcon, RemoveFromCartIcon } from '../Icons.jsx'
import './products.component.css'
import { CartContext } from '../../contexts/cart.context.jsx'

export function Products({ products }) {
  const { productCartList, handler } = useContext(CartContext)

  const productAction = (addProduct, RemoveProduct, isInCart) => {
    return (
      <>
        <button onClick={addProduct}>
          <AddToCartIcon />
        </button>

        {isInCart && (
          <button onClick={RemoveProduct}>
            <RemoveFromCartIcon />
          </button>
        )}
      </>
    )
  }

  return (
    <>
      <Filters />
      <section className='products'>
        {products &&
          products.map((p) => (
            <ul key={p.id}>
              <li>
                {p.title} - Quantity: {p.quantity}
              </li>
              <li>$ {p.price}</li>
              <li>
                <img src={p.thumbnail} alt={p.description} />
              </li>
              <li>{p.description}</li>
              <li className='prod-action-button'>
                {productAction(
                  () => handler('add', p),
                  () => handler('remove', p),
                  productCartList?.some((prod) => prod.id === p.id)
                )}
              </li>
            </ul>
          ))}
      </section>
    </>
  )
}
