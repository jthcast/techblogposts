import React, { createContext, useState } from 'react';

export const HeaderMessageContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>(undefined);

export const HeaderMessageProvider = ({ children }) => {
  const [isMessageShow, setMessageShow] = useState(true);

  return (
    <HeaderMessageContext.Provider value={[isMessageShow, setMessageShow]}>
      {children}
    </HeaderMessageContext.Provider>
  );
};