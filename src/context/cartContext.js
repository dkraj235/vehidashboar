import React, { createContext, useReducer, useEffect } from 'react';
import cartReducer from './cartReducer';
const CartContext = createContext();

const CartProvider = ({ children }) => {
   const [cartState, dispatch] = useReducer(cartReducer, { cartItems: [] });

   useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      dispatch({ type: 'SET_CART_ITEMS', payload: JSON.parse(cartItems) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartState.cartItems));
  }, [cartState.cartItems]);

  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
