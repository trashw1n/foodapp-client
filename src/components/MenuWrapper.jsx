import React from 'react';
import Menu from './Menu';
import {CartProvider}  from '../contexts/CartContext';

function MenuWrapper() {
  return (
    <CartProvider>
        <Menu />
    </CartProvider>
  )
}

export default MenuWrapper