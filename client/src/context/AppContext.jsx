/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const openSidebar = () => {
    setShowSidebar(true);
    console.log(showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
    console.log(showSidebar);
  };

  return (
    <AppContext.Provider value={{ openSidebar, closeSidebar, showSidebar }}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  return useContext(AppContext);
};
