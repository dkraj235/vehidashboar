import React, { useEffect, useState } from 'react'
import { createContext } from 'react'

const SettingDataContext = createContext();

const SettingDataProvider = ({ children }) => {
  const [settingData, setSettingData] = useState();
  useEffect(() => {
    fetchSettingsData().then(data => {
      setSettingData(data);
    });
  }, []);

  const fetchSettingsData = async () => {
    let baseUrl;
    if (process.env.NODE_ENV === 'development') {
      baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
    } else {
      baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
    }

    const response = await fetch(`${baseUrl}/settings/businessDetails`);
    const data = await response.json();
    return data;
  };

  return (
    <SettingDataContext.Provider value={{ settingData, setSettingData }}>
      {children}
    </SettingDataContext.Provider>
  );
}

export { SettingDataContext, SettingDataProvider }