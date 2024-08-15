const Reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, isLoggedIn: true, token: action.payload.token };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return { ...state, isLoggedIn: false, token: null, user: null, orders: [] };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_ORDERS':
      return { ...state, Orders: action.payload.data };
    case 'SET_LOADING':
      return {
        ...state, loading: action.payload,
      };
    case 'SET_BACKEND_ERROR':
      return {
        ...state,
        backendError: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
