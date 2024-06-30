import React from 'react';
import '../styles/OrderItem.css';

function OrderItem({table, items, done}) {
  return (
    <div className="card-container">
      <div className="card-header">
        <h3>Order for Table: {table}</h3>
      </div>
      <div className="card-content">
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.item} - ${item.cost}
            </li>
          ))}
        </ul>
      </div>
      <div className="card-footer">
        <button className="done-button" onClick={() => done(table)}>Order Done</button>
      </div>
    </div>
  )
}

export default OrderItem