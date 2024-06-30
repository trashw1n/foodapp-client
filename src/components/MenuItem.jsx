import React, { useState } from 'react';
import '../styles/MenuItem.css';
import { useCart } from '../contexts/CartContext';

function MenuItem({item, cost, id}) {
  const {addToCart, cart} = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const addHandler = () => {
    const cart_items = cart.map(item => item.id);
    if(!cart_items.includes(id)){
      addToCart({ id, item, cost })
      setAddedToCart(true);
    }
  }
    return (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{item}</h5>
            <p className="card-text">Cost: ${cost}</p>
            <button 
              className={`btn btn-primary-${addedToCart?'added':'notadded'}`}  
              onClick={() =>addHandler()}
            >
              {addedToCart? 'Added to Cart':'Add to Cart'}
            </button>
          </div>
        </div>
    );
}

export default MenuItem