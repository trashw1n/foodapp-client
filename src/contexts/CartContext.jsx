import React, {useState, useContext, createContext} from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);
    const addToCart = item => {
        setCart(prevCart => [...prevCart, item]);
    }
    const emptyCart = () => setCart([]);
    return (
        <CartContext.Provider value={{cart, addToCart, emptyCart}}>
            {children}
        </CartContext.Provider>
    );
}
