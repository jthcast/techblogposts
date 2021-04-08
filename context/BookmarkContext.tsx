import React, { createContext, useContext, useEffect, useState } from 'react';
import { API } from '../lib/utils/api';
import { LoginContext } from './LoginContext';

export const BookmarkContext = createContext<[string[], React.Dispatch<React.SetStateAction<string[]>>]>(undefined);

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<string[]>(undefined);
  const [loginInfo, setLogin] = useContext(LoginContext);

  const getBookmarks = async (uid: string) => {
    const fetchData = await fetch(`/api/bookmark?uid=${uid}&getType=children`, {
      method: 'GET',
    });
    const result: API = await fetchData.json();
    const { isError, statusCode, message, data } = result;
    if(isError){
      console.error(message);
      return;
    }
    const bookmarksArray = data.reduce((acc, bookmark) => {
      const { parent } = bookmark._source;
      acc.push(parent);
      return acc;
    }, []);
    setBookmarks(bookmarksArray);
  };

  useEffect(() => {
    if(loginInfo){
      getBookmarks(loginInfo.uid);
      return;
    }
    setBookmarks(null);
  }, [loginInfo]);

  return (
    <BookmarkContext.Provider value={[bookmarks, setBookmarks]}>
      {children}
    </BookmarkContext.Provider>
  );
};