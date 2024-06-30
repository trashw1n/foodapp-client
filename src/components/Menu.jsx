import React, { useEffect, useState } from 'react';
import MenuItem from './MenuItem';
import Cart from './Cart';
import '../styles/Menu.css';
import axios from 'axios';

function Menu() {
  const [category, setCategory] = useState('all');
  const [cartVisible, setCartVisible] = useState(false);
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    const fetchMenu = async () => {
      try{
        const response = await axios.get(
          process.env.REACT_APP_FETCH_ORDERS_URL + `\\?category=${category}`,
          {
            withCredentials: true
          }
        );
        if(response.status === 200){
          setMenu(response.data.items);
        }
      } catch(err){
        console.log(err.stack);
      }
    }
    fetchMenu();
  }, [category])
  return (
    <div>
      {cartVisible && <Cart setCartVisible={setCartVisible}/>}
      <div className='navbar'>
        <div className='select-container'>
          <select className="category-selector" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All Items</option>
            <option value="appetizers">Appetizers</option>
            <option value="drinks">Drinks</option>
            <option value="desserts">Desserts</option>
            <option value="main courses">Main Courses</option>
          </select>
        </div>
          {!cartVisible && <button className="toggle-cart-visible" onClick={() => setCartVisible(!cartVisible)}>
            🛒
          </button>}
      </div>
      <div className='menu-card-container'>
        {menu.map(
          ({id, item, cost}) => <MenuItem key={id} item={item} cost={cost} id={id}/>
        )}
      </div>
    </div>
  )
}

export default Menu