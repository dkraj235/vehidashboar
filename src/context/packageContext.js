import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const PackageContext = createContext();

const PackageProvider = ({ children }) => {
  const [packageData, setPackageData] = useState();
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPackageData();
  }, []);

  const fetchPackageData = async () => {
    let baseUrl;
    if (process.env.NODE_ENV === 'development') {
      baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
    } else {
      baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
    }
    try {
      const response = await axios.get(`${baseUrl}/packages/get-package`);
      setPackageData(response.data);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching package data:', error);
      setError(error)
      setLoading(false)
    }
  };

  return (
    <PackageContext.Provider value={{ packageData, setPackageData }}>
      {children}
    </PackageContext.Provider>
  );
};

export { PackageContext, PackageProvider };
