import React, { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
  const [colorMode, rawSetColorMode] = useState(undefined);

  const checkSystemPreference = () => {
    const isClient = typeof window !== 'undefined';
    if (isClient) {
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');
      if (systemPreference.matches) {
        rawSetColorMode('dark');
        localStorage.setItem('color-mode', 'dark');
        return;
      }
      rawSetColorMode('light');
      localStorage.setItem('color-mode', 'light');
    }
  }

  useEffect(() => {
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');
    systemPreference.addEventListener('change', checkSystemPreference);

    return () => {
      systemPreference.removeEventListener('change', checkSystemPreference);
    };
  }, [checkSystemPreference]);

  useEffect(() => {
    const initialColorValue = localStorage.getItem('color-mode');

    if (initialColorValue) {
      rawSetColorMode(initialColorValue);
      return;
    }
    checkSystemPreference();
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