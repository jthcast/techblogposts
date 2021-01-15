import React, { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
  const [colorMode, rawSetColorMode] = useState(undefined);

  useEffect(() => {
    const initialColorValue = localStorage.getItem('color-mode');
    rawSetColorMode(initialColorValue);
  }, []);

  const setColorMode = (newValue: string) => {
    rawSetColorMode(newValue);
    localStorage.setItem('color-mode', newValue);
  };
  return (
    <ThemeContext.Provider value={[colorMode, setColorMode]}>
      {children}
    </ThemeContext.Provider>
  );
};