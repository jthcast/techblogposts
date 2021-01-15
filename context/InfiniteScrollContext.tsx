import React, { createContext, useEffect, useState } from 'react';

export const InfiniteScrollContext = createContext(undefined);

export const InfiniteScrollProvider = ({ children }) => {
  const [isInfiniteLoad, rawSetInfiniteLoad] = useState('off');

  useEffect(() => {
    const initialInfiniteScrollState = localStorage.getItem('techblogposts-infiniteScrollState');
    rawSetInfiniteLoad(initialInfiniteScrollState === 'on' ? 'on' : 'off');
  }, []);

  const setInfiniteLoad = (newValue: string) => {
    rawSetInfiniteLoad(newValue);
    localStorage.setItem('techblogposts-infiniteScrollState', newValue);
  };
  return (
    <InfiniteScrollContext.Provider value={[isInfiniteLoad, setInfiniteLoad]}>
      {children}
    </InfiniteScrollContext.Provider>
  );
};