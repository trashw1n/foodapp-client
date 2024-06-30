import React from 'react'

function CartItem({id, item, cost}) {
  return (
    <div className="card">
        <div className="card-body">
        <h5 className="card-title">Item: {item}</h5>
        <p className="card-text">Cost: ${cost}</p>
        </div>
    </div>
  )
}

export default CartItem