import React from 'react'

const AdminOrder = ({orderData, toggleVisibility}) => {

    const {buyer, date, num, products} = orderData;

  return (
    <div className='adminOrdDis'>
        <div className='adminOrdDis__ButtonTop'>
            <button onClick={toggleVisibility}>X</button>
        </div>
        <div className='adminOrdDis__head'>
            <p>{buyer.name}</p>
            <p>{date}</p>
            <p style={{fontWeight: 'bold'}}>{num}</p>
        </div>
        <div className='adminOrdDis__products'>
            <h2>Products</h2>
            {products.map(product => (
              <div key={product._id} className='product'>
                <p>{product.description}</p>
                <p>{product.quantity} kg</p>
              </div>
            ))}
        </div>
        <div className='adminOrdDis__ButtonBottom'>
            <button>Confirm</button>
            <button>Reject</button>
        </div>
    </div>
  )
}

export default AdminOrder