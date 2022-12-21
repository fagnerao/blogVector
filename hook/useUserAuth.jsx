import { useState, useEffect, useContext } from 'react';
import { userLoginContext } from '../pages/contexts/userDataContext'
import Router from 'next/router';

const useUserAuth = () => {
  const verifyUser = useContext(userLoginContext);
  const [isOnline, setIsOnline] = useState(false);

  setIsOnline(verifyUser);
  useEffect(() => {

    if(isOnline != true){
      Router.push('/')
    };
  },[])

  return isOnline;
}
export default useUserAuth;