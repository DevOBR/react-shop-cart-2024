import { AddToCartIcon, RemoveFromCartIcon } from '../Icons.jsx'
import './products.component.css'

export function Products({ products, productCartList, setProductCartList }) {
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
    const productIndex = products.findIndex((p) => p.id === product.id)

    if (
      productToAddIndex >= 0 &&
      productCartList[productToAddIndex].quantity <
        products[productIndex].quantity
    ) {
      newProductCartList[productToAddIndex].quantity++
      setProductCartList(newProductCartList)
    } else if (productToAddIndex === -1) {
      // if is nww then add it
      setProductCartList([...newProductCartList, { ...product, quantity: 1 }])
    }
  }

  const productAction = (p) => {
    const isInCart = productCartList?.some((prod) => prod.id === p.id)
    if (isInCart) {
      return (
        <>
          <button onClick={() => handleAddProdctToCart(p)}>
            <AddToCartIcon />
          </button>
          <button onClick={() => handleRemoveProdctToCart(p)}>
            <RemoveFromCartIcon />
          </button>
        </>
      )
    } else {
      return (
        <button onClick={() => handleAddProdctToCart(p)}>
          <AddToCartIcon />
        </button>
      )
    }
  }
  return (
    <section className='products'>
      {products &&
        products.map((p) => (
          <ul key={p.id}>
            <li>
              {p.title} - Quantity {p.quantity}
            </li>
            <li>$ {p.price}</li>
            <li>
              <img src={p.thumbnail} alt={p.description} />
            </li>
            <li>{p.description}</li>
            <li className='prod-action-button'>{productAction(p)}</li>
          </ul>
        ))}
    </section>
  )
}
