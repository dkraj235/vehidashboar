import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [orderData, setOrderData] = useState();

  useEffect(() => {
    fetchOrderData().then(data => {
      setOrderData(data);
    });
  }, []);

  const fetchOrderData = async () => {
    let baseUrl;
    if (process.env.NODE_ENV === 'development') {
      baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
    } else {
      baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
    }
    try {
      const response = await axios.get(`${baseUrl}/orders/get-details`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order data:', error);
      return null;
    }
  };

  return (
    <OrderContext.Provider value={{ orderData, setOrderData }}>
      {children}
    </OrderContext.Provider>
  );
};


export { OrderContext, OrderProvider };
