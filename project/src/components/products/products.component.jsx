import './products.component.css'

export function Products({ products, productAction }) {
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
