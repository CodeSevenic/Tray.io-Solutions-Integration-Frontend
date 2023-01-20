import React, { createContext, useState } from 'react';

export const AppContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [userEditModal, setUserEditModal] = useState(false);
  const [hideModal, setHideModal] = useState(false);

  const value = {
    userEditModal,
    setUserEditModal,
    hideModal,
    setHideModal,
  };

  // return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
