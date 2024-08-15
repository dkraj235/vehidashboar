const cartReducer = (state, action) => {
  switch (action.type) {

    case 'ADD_TO_CART':
      const existingItemIndex = state.cartItems.findIndex((cartItem) => cartItem._id === action.payload._id);
      if (existingItemIndex !== -1) {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex].quantity++;
        return {
          ...state,
          cartItems: updatedCartItems
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }]
        };
      }

    case 'REMOVE_FROM_CART':
      const updatedCartItems = state.cartItems.map((cartItem) =>
        cartItem._id === action.payload
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ).filter((cartItem) => cartItem.quantity > 0);

      return {
        ...state,
        cartItems: updatedCartItems
      };
      case 'INCREASE_QUANTITY':

      const itemIndex = state.cartItems.findIndex((cartItem) => cartItem._id === action.payload);
      if (itemIndex !== -1) {
        const updatedItems = [...state.cartItems];
        updatedItems[itemIndex].quantity++;
        return {
          ...state,
          cartItems: updatedItems
        };
      }
      return state;

    case 'CLEAR_SingleCART':
      const { payload: itemId } = action;
      const updatedCartItm = state.cartItems.map(item => {
        if (item._id === itemId) {
          return { ...item, quantity: 0 };
        }
        return item;
      }).filter(item => item.quantity > 0);
      return {
        ...state,
        cartItems: updatedCartItm
      };

    case 'SET_CART_ITEMS':
      return {
        ...state,
        cartItems: action.payload
      };
    default:
      return state;
  }
};

export default cartReducer;
