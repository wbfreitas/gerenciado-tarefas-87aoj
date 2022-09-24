import type { NextPage } from 'next'
import { Login } from '../containers/Login'

import { useEffect, useState } from "react";
import { Home } from '../containers/Home';
import { SignIn } from '../containers/SignIn';


const Index: NextPage = () => {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    if(typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if(token) {
        setAccessToken(token);
      }
    }
  }, [setAccessToken]);

  return (
      //!accessToken ? <Login setAccessToken={setAccessToken} /> : <Home setAccessToken={setAccessToken} />
      <SignIn />
  )
}

export default Index
