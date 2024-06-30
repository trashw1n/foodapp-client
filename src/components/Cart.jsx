import React, { useState } from 'react';
import {useCart} from '../contexts/CartContext';
import '../styles/Cart.css';
import axios from 'axios';
import CartItem from './CartItem';

function Cart({setCartVisible}) {
    const {cart, emptyCart} = useCart();
    const [msg, setMsg] = useState('');
    const [isValid, setIsValid] = useState('valid');
    const [tableNumber, setTableNumber] = useState('');
    const placeOrder = async () => {
        const table = tableNumber.length > 0? parseInt(tableNumber):0;
        if(table < 1 || table > 10 || table === undefined){
            setMsg('please enter a valid table number');
            setIsValid('invalid');
            return;
        }
        if(cart.length === 0){
            setMsg('please enter something in your cart');
            setIsValid('invalid');
            return;
        }
        const item_ids = cart.map(item => item.id);
        try{
            const response = await axios.post(
                process.env.REACT_APP_PLACEORDER_URL, 
                {items: item_ids, table_num: table},
                {withCredentials: true}
            );
            if(response.status === 200){
                emptyCart();
                setMsg('table successfully booked!');
                setIsValid('valid');
            }
        } catch(err){
            setMsg('some error occurred');
            setIsValid('invalid');
        }
    }
    return (
        <div className="modal">
        <div className="modal-content">
        <div className="modal-header">
            <h2 className="modal-title">Your Cart</h2>
            <button className="close-button" onClick={() => setCartVisible(prev => !prev)}>Close</button>
        </div>
        <div className="modal-body">
            {cart.map(({id, item, cost}) => <CartItem key={id} id={id} item={item} cost={cost}/>)}
        </div>
        <div className="modal-footer">
            <label htmlFor='table-number'>Book Table Number (1-10): </label>
            <input 
                className='table-number' 
                type='text' 
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
            />
            <h2 className='total-cost'>To Pay: Rs.
                {cart.reduce((running, curr) => running + curr.cost, 0)}
            </h2>
            <button className="place-order-button" onClick={placeOrder}>Place Order</button>
            <p className={`msg-${isValid}`}>{msg}</p>
        </div>
        </div>
    </div>
    )
}

export default Cart