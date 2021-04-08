import React, { createContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { openDB } from 'idb';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  creationTime: string;
  providerId: string;
}

interface UserDB {
  uid: string;
  email: string;
  displayName: string;
  createdAt: string;
  providerData: firebase.UserInfo[];
}

export const LoginContext = createContext<[User, (value: boolean) => void]>(undefined);

export const LoginProvider = ({ children }) => {
  const [loginInfo, setLoginInfo] = useState<User>(undefined);

  const checkLogin = async () => {
    try{
      const db = await openDB('firebaseLocalStorageDb');
      const dataRequest = await db.get('firebaseLocalStorage', `firebase:authUser:${process.env.FB_AUTH_API_KEY}:[DEFAULT]`);
      db.close();
      if(dataRequest){
        const data: UserDB = dataRequest.value;
        const { uid, email, displayName, createdAt, providerData } = data;
        const { providerId } = providerData[0];
        const creationTime = new Date(parseInt(createdAt)).toString();
        setLoginInfo({
          uid,
          email,
          displayName,
          creationTime,
          providerId
        });
        return;
      }
      setLoginInfo(null);
    }catch(error){
      setLoginInfo(null);
    }
  };

  const writeLoginSession = () => {
    const currentUser = firebase.auth().currentUser;
    const { uid, email, displayName, metadata, providerData } = currentUser;
    const { creationTime } = metadata;
    const { providerId } = providerData[0];
    const user = {
      uid,
      email,
      displayName,
      creationTime,
      providerId
    }
    setLoginInfo(user);
  };

  const deleteLoginSession = () => {
    setLoginInfo(null);
  };

  const setLoginHandling = (value: boolean) => {
    if(value){
      writeLoginSession();
      return;
    }
    deleteLoginSession();
  };
  
  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <LoginContext.Provider value={[loginInfo, setLoginHandling]}>
      {children}
    </LoginContext.Provider>
  );
};