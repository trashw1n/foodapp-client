import React, { useState } from 'react';
import '../styles/StaffDashboard.css';
import OrderItem from './OrderItem';
import axios from 'axios';

function StaffDashboard() {
  const [orders, setOrders] = useState({});
  const [msg, setMsg] = useState(['', 'invisible']);
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_FETCH_ORDERS_URL,
        {withCredentials: true}
      );
      if(response.status === 200){
        setOrders(response.data.orders);
      }
    } catch (error) {
      
    }
  }
  const doneOrder = async (table) => {
    try {
      const response = await axios.delete(
        process.env.REACT_APP_COMPLETEORDER_URL + `\\?table_num=${table}`,
        {
          withCredentials: true
        }
      );
      if(response.status == 200){
        const newOrders = {...orders};
        delete newOrders[table];
        setOrders(newOrders);
        setMsg(['order completed successfully!', 'visible-success']);
        setTimeout(() => setMsg(['', 'invisible']), 2000);
      }
    } catch (error) {
      setMsg(['some error occurred', 'visible-fail']);
      setTimeout(() => setMsg(['', 'invisible']), 2000);
    }
  }
  return (
    <div>
      <button className="fetch-orders-btn" onClick={() => fetchOrders()}>
        Fetch New Orders
      </button>
      <p className={`msg-${msg[1]}`}>{msg[0]}</p>
      <div className='order-container'>
        {Object.keys(orders).map(
          table => <OrderItem key={table} items={orders[table]} table={table} done={doneOrder}/>
        )}
      </div>
    </div>
  )
}

export default StaffDashboard