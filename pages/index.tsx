import type { NextPage } from 'next'
import { Login } from '../containers/Login'

import { useEffect, useState } from "react";
import { Home } from '../containers/Home';


const Index: NextPage = () => {
  const [acessToken, setAccessToken] = useState('');

  useEffect(() => {
    if(typeof window !== 'undefined') {
      const token = localStorage.getItem('acessToken');
      if(token) {
        setAccessToken(token);
      }
    }
  }, [setAccessToken]);

  return (
      !acessToken ? <Login setAccessToken={setAccessToken} /> : <Home setAccessToken={setAccessToken} />
  )
}

export default Index
