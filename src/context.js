import React, { createContext, useState } from 'react';

export const AppContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [userEditModal, setUserEditModal] = useState(false);

  const value = {
    userEditModal,
    setUserEditModal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
