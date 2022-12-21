import {  createContext, useEffect, useState } from "react";
import { parseCookies } from 'nookies'

export const userLoginContext = createContext([]);

export function UserProvider ({ children }){
  
  const [verifyUser, setVerifyUser] = useState(false)
  const [userData, setUserData] = useState('');

  useEffect(() => {
    const {tokenVz} = parseCookies();
    
    if(tokenVz !==''){
      setVerifyUser(true);
    }
   
  },[])

  //Provider .. dont forget the children
  return (
    <userLoginContext.Provider value={{verifyUser}}>
      {children}
    </userLoginContext.Provider>
  );
}