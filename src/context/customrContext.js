import React, { createContext, useState, useEffect } from 'react';

const CustomerContext = createContext();

const CustomerProvider = ({ children }) => {
  const [customerData, setCustomerData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomerData().then(
      data => {
        setCustomerData(data);
        setLoading(false);
      },
      error => {
        setError(error);
        setLoading(false);
      }
    );
  }, []);

  const fetchCustomerData = async () => {
    let baseUrl;
    if (process.env.NODE_ENV === 'development') {
      baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
    } else {
      baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
    }
    const response = await fetch(`${baseUrl}/customer/details`);
    const data = await response.json();
    return data;
  };

  return (
    <CustomerContext.Provider value={{ customerData, setCustomerData }}>
      {children}
    </CustomerContext.Provider>
  );
};

export { CustomerContext, CustomerProvider };
