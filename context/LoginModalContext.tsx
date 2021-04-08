import React, { createContext, useState } from 'react';

export const LoginModalContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>(undefined);

export const LoginModalProvider = ({ children }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <LoginModalContext.Provider value={[isOpen, setOpen]}>
      {children}
    </LoginModalContext.Provider>
  );
};